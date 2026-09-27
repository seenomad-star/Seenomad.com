import React, { useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  resolveRouteSEO,
  SEO_ROUTE_MAP,
  DEFAULT_SEO,
  DEFAULT_ORGANIZATION,
  buildWebSiteSchema,
  buildWebSiteSearchAction,
  buildOrganizationSchema,
  buildBreadcrumbListSchema,
  BREADCRUMB_NAME_MAP,
  generateDestinationOGPreview,
  toDestinationSlug
} from '../config/seoConfig';
import { allDestinations } from '../data/destinationsData';
import {
  renderBrandedOGCanvas,
  generateOGImageDataURL,
  generateOGImageBlob,
  downloadOGImage,
  useAutoOGImage,
  OG_DIMENSIONS
} from '../utils/ogImageGenerator';

// Re-export constants and helpers for convenience and backwards-compatibility
export {
  SEO_ROUTE_MAP,
  DEFAULT_SEO,
  DEFAULT_ORGANIZATION,
  buildWebSiteSchema,
  buildWebSiteSearchAction,
  buildOrganizationSchema,
  buildBreadcrumbListSchema,
  BREADCRUMB_NAME_MAP,
  generateDestinationOGPreview,
  toDestinationSlug,
  renderBrandedOGCanvas,
  generateOGImageDataURL,
  generateOGImageBlob,
  downloadOGImage,
  useAutoOGImage,
  OG_DIMENSIONS
};
export const ROUTE_METADATA = SEO_ROUTE_MAP;

/**
 * Hook to generate dynamic Open Graph meta tag previews based on
 * the currently viewed destination or travel guide page content.
 *
 * @param {object} destinationOrGuide - Destination or travel guide item
 * @param {object} [options={}] - Custom options
 * @returns {object|null} Open Graph preview object with metadata, preview card, and schema
 */
export const useDestinationOGPreview = (destinationOrGuide, options = {}) => {
  return useMemo(() => {
    if (!destinationOrGuide) return null;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://seenomad.com';
    return generateDestinationOGPreview(destinationOrGuide, origin, options);
  }, [destinationOrGuide, options]);
};

/**
 * Inner component that dynamically handles <Helmet> tags based on React Router location.
 * Injects standard meta tags, Open Graph cards, Twitter cards, and Schema.org JSON-LD
 * structured data for 'WebSite' (with Google Sitelinks SearchAction), 'Organization' (with
 * official logo, contact points, and social media profile links), 'BreadcrumbList', and route-specific entities.
 * Automatically generates dynamic Open Graph previews for destination and travel guide pages.
 */
const SEORouteHead = ({
  title: propTitle,
  description: propDescription,
  keywords: propKeywords,
  canonical: propCanonical,
  ogType: propOgType,
  ogImage: propOgImage,
  ogImageWidth: propOgImageWidth,
  ogImageHeight: propOgImageHeight,
  ogImageAlt: propOgImageAlt,
  ogImageType: propOgImageType,
  ogImageSecureUrl: propOgImageSecureUrl,
  autoGenerateOGImage = false,
  ogImageCardOptions = {},
  destination = null,
  travelGuide = null,
  destinationOptions = {},
  noindex = false,
  jsonLd: propJsonLd,
  websiteSchema: customWebSiteSchema,
  organizationSchema: customOrganizationSchema,
  organizationOptions,
  organizationName,
  organizationLogo,
  organizationContactPoint,
  organizationContactPoints,
  contactPoint,
  contactPoints,
  socialLinks,
  organizationSameAs,
  organizationEmail,
  organizationTelephone,
  breadcrumbSchema: customBreadcrumbSchema,
  breadcrumbItems = null,
  searchUrlTemplate,
  includeWebSiteSchema = true,
  includeOrganizationSchema = true,
  includeBreadcrumbSchema = true,
  includeSearchAction = true
}) => {
  const location = useLocation();
  const pathname = location?.pathname || '/';
  const routeDefaults = resolveRouteSEO(pathname);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://seenomad.com';

  // Resolve dynamic Destination / Travel Guide if provided or matching /explore/destinations/:id
  const targetDestination = useMemo(() => {
    if (destination || travelGuide) {
      return destination || travelGuide;
    }
    if (pathname.startsWith('/explore/destinations/')) {
      const slugFromUrl = pathname.replace('/explore/destinations/', '').split('/')[0].split('?')[0];
      if (slugFromUrl && Array.isArray(allDestinations)) {
        return allDestinations.find(
          (d) => toDestinationSlug(d.name) === slugFromUrl || String(d.id) === slugFromUrl
        );
      }
    }
    return null;
  }, [destination, travelGuide, pathname]);

  // Generate dynamic Open Graph preview & tags bundle for destination/guide
  const destinationOG = useMemo(() => {
    if (!targetDestination) return null;
    return generateDestinationOGPreview(targetDestination, origin, destinationOptions);
  }, [targetDestination, origin, destinationOptions]);

  const title = propTitle || (destinationOG ? destinationOG.title : routeDefaults.title);
  const description = propDescription || (destinationOG ? destinationOG.description : routeDefaults.description);
  const keywords = propKeywords || (destinationOG ? destinationOG.keywords : routeDefaults.keywords);
  const canonical = propCanonical || (destinationOG ? destinationOG.canonical : `${origin}${pathname}`);
  const ogType = propOgType || (destinationOG ? destinationOG.ogType : (routeDefaults.ogType || DEFAULT_SEO.ogType));

  // Automated canvas-based branded card image generation (if enabled)
  const targetCategory = targetDestination?.category || routeDefaults.category || 'Travel Intelligence';
  const targetStats = targetDestination?.stats || destinationOptions?.stats || null;
  const { ogImageUrl: autoCanvasOGUrl } = useAutoOGImage({
    title,
    category: targetCategory,
    description,
    stats: targetStats,
    backgroundImageUrl: targetDestination?.image || destinationOptions?.backgroundImageUrl || null,
    enabled: Boolean(autoGenerateOGImage),
    ...ogImageCardOptions
  });

  const rawOgImage = autoCanvasOGUrl || propOgImage || (destinationOG ? destinationOG.ogImage : `${origin}${DEFAULT_SEO.defaultImage}`);
  const ogImage = rawOgImage.startsWith('http') || rawOgImage.startsWith('data:')
    ? rawOgImage
    : `${origin}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`;

  // Standard Open Graph image width, height, alt, type, and secure_url
  const ogImageWidth = String(
    propOgImageWidth ||
    destinationOG?.openGraph?.['og:image:width'] ||
    routeDefaults.ogImageWidth ||
    DEFAULT_SEO.defaultImageWidth ||
    '1200'
  );

  const ogImageHeight = String(
    propOgImageHeight ||
    destinationOG?.openGraph?.['og:image:height'] ||
    routeDefaults.ogImageHeight ||
    DEFAULT_SEO.defaultImageHeight ||
    '630'
  );

  const ogImageAlt = propOgImageAlt ||
    destinationOG?.openGraph?.['og:image:alt'] ||
    routeDefaults.ogImageAlt ||
    routeDefaults.imageAlt ||
    `${title} – ${DEFAULT_SEO.siteName}`;

  const ogImageType = propOgImageType ||
    destinationOG?.openGraph?.['og:image:type'] ||
    routeDefaults.ogImageType ||
    (ogImage.endsWith('.png') ? 'image/png' : ogImage.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg');

  const ogImageSecureUrl = propOgImageSecureUrl ||
    (ogImage.startsWith('https://')
      ? ogImage
      : ogImage.startsWith('http://')
        ? ogImage.replace('http://', 'https://')
        : `${origin.replace('http:', 'https:')}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`);

  const robots = noindex
    ? 'noindex, nofollow'
    : routeDefaults.defaultRobots || DEFAULT_SEO.defaultRobots;

  // 1. Build Schema.org 'WebSite' structured data with Sitelinks SearchAction
  const websiteSchema = customWebSiteSchema || (
    includeWebSiteSchema
      ? buildWebSiteSchema(origin, {
          searchUrlTemplate,
          includeSearchAction
        })
      : null
  );

  // 2. Build Schema.org 'Organization' structured data with logo, contact points, and social media links
  const organizationSchema = customOrganizationSchema || (
    includeOrganizationSchema
      ? buildOrganizationSchema(origin, {
          name: organizationName,
          logo: organizationLogo,
          contactPoints: organizationContactPoints || contactPoints,
          contactPoint: organizationContactPoint || contactPoint,
          socialLinks: socialLinks || organizationSameAs,
          email: organizationEmail,
          telephone: organizationTelephone,
          ...organizationOptions
        })
      : null
  );

  // 3. Build Schema.org 'BreadcrumbList' structured data
  const breadcrumbSchema = customBreadcrumbSchema || (
    includeBreadcrumbSchema
      ? buildBreadcrumbListSchema(pathname, origin, breadcrumbItems)
      : null
  );

  // 4. Build Schema.org Route-specific structured data
  let pageStructuredData = propJsonLd;
  if (!pageStructuredData && destinationOG?.schema) {
    pageStructuredData = destinationOG.schema;
  } else if (!pageStructuredData && routeDefaults.generateSchema) {
    pageStructuredData = routeDefaults.generateSchema(canonical);
  } else if (!pageStructuredData) {
    pageStructuredData = {
      '@context': 'https://schema.org',
      '@type': routeDefaults.schemaType || 'WebApplication',
      name: title,
      description: description,
      url: canonical,
      publisher: {
        '@id': `${origin}/#organization`
      }
    };
  }

  return (
    <Helmet>
      {/* HTML Language & Document Title */}
      <html lang="en" />
      <title>{title}</title>

      {/* Standard Meta Tags */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={DEFAULT_SEO.author} />

      {/* Canonical URL Tag */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Social Sharing */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      {/* Open Graph Image & Standard Dimensions/Alt Metadata */}
      <meta property="og:image" content={ogImage} />
      {ogImageSecureUrl && <meta property="og:image:secure_url" content={ogImageSecureUrl} />}
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:alt" content={ogImageAlt} />
      {ogImageType && <meta property="og:image:type" content={ogImageType} />}
      {destinationOG?.openGraph?.['article:section'] && (
        <meta property="article:section" content={destinationOG.openGraph['article:section']} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Schema.org WebSite Structured Data (Google Sitelinks SearchAction) */}
      {websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* Schema.org Organization Structured Data */}
      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}

      {/* Schema.org BreadcrumbList Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Schema.org Route-specific Structured Data */}
      {pageStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(pageStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * SEOManager Component
 * 
 * Wraps children with HelmetProvider and injects dynamic route-specific
 * meta tags, canonical URLs, Open Graph data, and Schema.org JSON-LD
 * structured data (WebSite with SearchAction, Organization, BreadcrumbList,
 * and route entities) using react-helmet-async powered by client/src/config/seoConfig.js.
 * Also generates dynamic Open Graph previews for destination and travel guide pages.
 */
const SEOManager = ({
  children,
  title,
  description,
  keywords,
  canonical,
  ogType,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  ogImageType,
  ogImageSecureUrl,
  autoGenerateOGImage = false,
  ogImageCardOptions = {},
  destination,
  travelGuide,
  destinationOptions,
  noindex = false,
  jsonLd,
  websiteSchema,
  organizationSchema,
  organizationOptions,
  organizationName,
  organizationLogo,
  organizationContactPoint,
  organizationContactPoints,
  contactPoint,
  contactPoints,
  socialLinks,
  organizationSameAs,
  organizationEmail,
  organizationTelephone,
  breadcrumbSchema,
  breadcrumbItems,
  searchUrlTemplate,
  includeWebSiteSchema = true,
  includeOrganizationSchema = true,
  includeBreadcrumbSchema = true,
  includeSearchAction = true
}) => {
  return (
    <HelmetProvider>
      <SEORouteHead
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        ogType={ogType}
        ogImage={ogImage}
        ogImageWidth={ogImageWidth}
        ogImageHeight={ogImageHeight}
        ogImageAlt={ogImageAlt}
        ogImageType={ogImageType}
        ogImageSecureUrl={ogImageSecureUrl}
        autoGenerateOGImage={autoGenerateOGImage}
        ogImageCardOptions={ogImageCardOptions}
        destination={destination}
        travelGuide={travelGuide}
        destinationOptions={destinationOptions}
        noindex={noindex}
        jsonLd={jsonLd}
        websiteSchema={websiteSchema}
        organizationSchema={organizationSchema}
        organizationOptions={organizationOptions}
        organizationName={organizationName}
        organizationLogo={organizationLogo}
        organizationContactPoint={organizationContactPoint}
        organizationContactPoints={organizationContactPoints}
        contactPoint={contactPoint}
        contactPoints={contactPoints}
        socialLinks={socialLinks}
        organizationSameAs={organizationSameAs}
        organizationEmail={organizationEmail}
        organizationTelephone={organizationTelephone}
        breadcrumbSchema={breadcrumbSchema}
        breadcrumbItems={breadcrumbItems}
        searchUrlTemplate={searchUrlTemplate}
        includeWebSiteSchema={includeWebSiteSchema}
        includeOrganizationSchema={includeOrganizationSchema}
        includeBreadcrumbSchema={includeBreadcrumbSchema}
        includeSearchAction={includeSearchAction}
      />
      {children}
    </HelmetProvider>
  );
};

export default SEOManager;
