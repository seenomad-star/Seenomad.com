/**
 * SEO Configuration & Route Metadata Catalog
 * Centralized mapping of application routes to SEO metadata objects.
 */

export const DEFAULT_SEO = {
  siteName: 'SeeNomad',
  title: 'SeeNomad – Digital Nomad Feed & Travel Intelligence',
  description: 'Connect with a global community of digital nomads. Access real-time city signals, Schengen visa calculations, vetted coliving hubs, and nomad meetups.',
  keywords: 'digital nomad, nomad intelligence, remote work destinations, schengen calculator, nomad community, nomad feed, global mobility',
  author: 'SeeNomad',
  twitterHandle: '@SeeNomad',
  defaultImage: '/seenomad-logo.jpg',
  defaultImageWidth: '1200',
  defaultImageHeight: '630',
  defaultImageAlt: 'SeeNomad – Global Digital Nomad Feed & Travel Intelligence Platform',
  defaultImageType: 'image/jpeg',
  ogType: 'website',
  defaultRobots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
};

/**
 * Default Organization Profile for Google Knowledge Graph & Entity Recognition
 */
export const DEFAULT_ORGANIZATION = {
  name: 'SeeNomad',
  legalName: 'SeeNomad Network Inc.',
  alternateName: ['SeeNomad Platform', 'SeeNomad Travel Intelligence', 'SeeNomad Hub'],
  description: 'Global digital nomad and travel intelligence platform featuring real-time destination insights, visa compliance calculators, curated coliving spaces, and verified nomad meetups.',
  url: 'https://seenomad.com',
  logo: '/seenomad-logo.jpg',
  email: 'seenomad@gmail.com',
  telephone: '+1-800-SEE-NOMAD',
  sameAs: [
    'https://twitter.com/SeeNomad',
    'https://x.com/SeeNomad',
    'https://instagram.com/seenomad',
    'https://linkedin.com/company/seenomad',
    'https://facebook.com/seenomad',
    'https://youtube.com/@seenomad',
    'https://github.com/seenomad'
  ],
  contactPoints: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'seenomad@gmail.com',
      url: '/support-utility',
      availableLanguage: ['English', 'Spanish', 'French', 'German'],
      areaServed: 'Worldwide'
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'support@seenomad.com',
      url: '/support-utility',
      availableLanguage: ['English'],
      areaServed: 'Worldwide'
    },
    {
      '@type': 'ContactPoint',
      contactType: 'partnerships & inquiries',
      email: 'partners@seenomad.com',
      url: '/partner-with-us',
      availableLanguage: ['English'],
      areaServed: 'Worldwide'
    }
  ],
  knowsAbout: [
    'Digital Nomad Visas',
    'Schengen 90/180 Rule Compliance',
    'Remote Work Destinations',
    'Coliving and Coworking Spaces',
    'Travel Intelligence & Cost of Living',
    'Global Nomad Community'
  ]
};

/**
 * Route-specific Metadata Dictionary
 * Maps route paths to specific SEO metadata objects (titles, descriptions, keywords, schemas)
 */
export const SEO_ROUTE_MAP = {
  '/': {
    title: 'SeeNomad – Digital Nomad Feed & Travel Intelligence',
    description: 'Connect with a global community of digital nomads. Access real-time city signals, Schengen visa calculations, vetted coliving hubs, and nomad meetups.',
    keywords: 'digital nomad, nomad intelligence, remote work destinations, schengen calculator, nomad community, nomad feed, global mobility',
    ogType: 'website',
    schemaType: 'WebApplication',
    generateSchema: (canonicalUrl) => ({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SeeNomad',
      url: canonicalUrl,
      applicationCategory: 'TravelApplication',
      operatingSystem: 'All',
      description: 'Global digital nomad and travel intelligence platform featuring destinations, visas, AI agents, and community.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      creator: {
        '@type': 'Organization',
        name: 'SeeNomad Network',
        url: canonicalUrl
      }
    })
  },
  '/popular': {
    title: 'Trending Nomad Dispatches & Popular Hubs | SeeNomad',
    description: 'Explore the most upvoted dispatches, hot nomad destinations, and viral discussions from remote workers traveling across the globe.',
    keywords: 'trending nomad spots, popular digital nomad cities, top remote work hubs, traveler dispatches, seenomad trending',
    ogType: 'website'
  },
  '/explore': {
    title: 'Nomad City Explorer & Global Cost Index | SeeNomad',
    description: 'Compare worldwide destinations by cost of living, verified WiFi speeds, nomad vibe, weather, and safety to choose your next remote work base.',
    keywords: 'nomad city guide, digital nomad destinations, cost of living index, nomad wifi speeds, remote work safety scores',
    ogType: 'website',
    schemaType: 'CollectionPage'
  },
  '/explore/destinations': {
    title: 'Top Nomad Destinations & Cost of Living | SeeNomad',
    description: 'Search and compare top-rated nomad hubs like Chiang Mai, Lisbon, Bali, and Medellin with vetted internet speeds, rent costs, and neighborhood guides.',
    keywords: 'best nomad destinations, digital nomad cities, chiang mai nomad, lisbon remote work, bali coworking, medellin nomad guide',
    ogType: 'website',
    schemaType: 'ItemPage'
  },
  '/explore/visa': {
    title: 'Visa Intelligence & Schengen 90/180 Calculator | SeeNomad',
    description: 'Track Schengen 90/180 compliance, calculate 183-day tax residency risks, and check digital nomad visa rules across 80+ countries worldwide.',
    keywords: 'schengen calculator, 90 180 rule calculator, digital nomad visa, 183 day tax residency, visa compliance, remote work visa',
    ogType: 'website',
    schemaType: 'GovernmentService',
    generateSchema: (canonicalUrl) => ({
      '@context': 'https://schema.org',
      '@type': 'GovernmentService',
      name: 'SeeNomad Visa Intelligence & Compliance Hub',
      serviceType: 'Visa and Schengen Calculator',
      description: 'Real-time Schengen 90/180 day-count tracking, 183-day tax residency indicators, and global digital nomad visa rules.',
      url: canonicalUrl,
      provider: {
        '@type': 'Organization',
        name: 'SeeNomad'
      }
    })
  },
  '/explore/embassy': {
    title: 'Global Embassy & Consulate Directory | SeeNomad',
    description: 'Find official contact information, emergency phone lines, and operating hours for embassies and diplomatic missions worldwide.',
    keywords: 'embassy finder, consulate directory, emergency travel contacts, diplomatic missions, passport emergency',
    ogType: 'website'
  },
  '/explore/coworking': {
    title: 'Coworking Spaces & High-Speed WiFi Cafes | SeeNomad',
    description: 'Locate top coworking spaces and nomad cafes with verified gigabit fiber, ergonomic setups, and community day passes.',
    keywords: 'coworking spaces, nomad cafes, high speed wifi, remote work desks, day pass coworking',
    ogType: 'website'
  },
  '/explore/coliving': {
    title: 'Curated Nomad Coliving & Monthly Stays | SeeNomad',
    description: 'Find flexible co-living communities with shared workspaces, social dinners, and high-speed internet designed for remote workers.',
    keywords: 'coliving spaces, nomad monthly stays, remote work accommodation, community living for nomads',
    ogType: 'website'
  },
  '/ai-agents': {
    title: 'Nomad AI Concierge & Travel Agents | SeeNomad',
    description: 'Get instant assistance from AI agents specialized in visa regulations, budget planning, local safety, and personalized nomad itineraries.',
    keywords: 'nomad ai, travel ai agent, visa questions ai, remote work assistant, seenomad concierge',
    ogType: 'website'
  },
  '/travel-games': {
    title: 'Nomad Travel Games, Quests & Quizzes | SeeNomad',
    description: 'Earn NMD tokens and climb global leaderboards through nomad geography trivia, street-view challenges, and destination puzzles.',
    keywords: 'travel trivia, nomad games, geo guesser, earn NMD tokens, nomad quests, travel quizzes',
    ogType: 'website'
  },
  '/community': {
    title: 'Digital Nomad Community & Flash Meetups | SeeNomad',
    description: 'Connect with remote workers nearby, join city circles, coordinate spontaneous coworking meetups, and expand your global nomad network.',
    keywords: 'nomad community, flash meetups, nomad circles, remote worker networking, nomad events nearby',
    ogType: 'website',
    schemaType: 'CollectionPage'
  },
  '/creator-studio': {
    title: 'Creator Studio & Nomad Rewards | SeeNomad',
    description: 'Publish verified travel guides, contribute city signals, unlock creator perks, and monetize your nomad content.',
    keywords: 'creator studio, nomad rewards, travel blogging, verified city dispatches, nomad badges',
    ogType: 'website'
  },
  '/business-partner': {
    title: 'Nomad B2B Partnerships & Collabs | SeeNomad',
    description: 'Partner with SeeNomad to reach thousands of global remote workers, list nomad housing, coworking spaces, and travel insurance.',
    keywords: 'nomad partnerships, advertise to remote workers, sponsor seenomad, travel brands',
    ogType: 'website'
  },
  '/learning-voluntourism': {
    title: 'Learning & Voluntourism Hub | SeeNomad',
    description: 'Discover skill-exchange residencies, eco-restoration projects, and cultural immersion opportunities while working remotely.',
    keywords: 'voluntourism, skill exchange, nomad volunteering, cultural immersion, eco projects for remote workers',
    ogType: 'website'
  },
  '/event-festival': {
    title: 'Global Nomad Festivals & Remote Summits | SeeNomad',
    description: 'Browse upcoming digital nomad festivals, coliving retreats, and web summits across Europe, Southeast Asia, and Latin America.',
    keywords: 'nomad festivals, remote work summits, nomad unconference, coliving retreats, nomad gatherings',
    ogType: 'website',
    schemaType: 'Event'
  },
  '/support-utility': {
    title: 'Nomad Utility Kit & Emergency Tools | SeeNomad',
    description: 'Access emergency travel resources, currency converters, timezone calculators, and essential digital nomad utility toolkits.',
    keywords: 'nomad utilities, currency converter, travel tools, timezone sync, emergency nomad kit',
    ogType: 'website'
  },
  '/insights-analytics': {
    title: 'Nomad Intelligence & Mobility Trends | SeeNomad',
    description: 'Analyze global mobility data, seasonal nomad migration flows, flight price indices, and evolving digital nomad visa trends.',
    keywords: 'nomad trends, remote work analytics, digital nomad migration, mobility insights, travel data',
    ogType: 'website'
  },
  '/download-app': {
    title: 'Download SeeNomad – Mobile & PWA App | SeeNomad',
    description: 'Install SeeNomad as a fast Progressive Web App with offline access to visa calculations, emergency tools, and saved destination guides.',
    keywords: 'seenomad app, download seenomad, pwa install, offline nomad tools, travel app',
    ogType: 'website'
  },
  '/partner-with-us': {
    title: 'Partner with SeeNomad | Global Mobility Platform',
    description: 'Connect your brand with the fastest-growing global digital nomad network. Explore sponsorship, affiliate, and co-marketing opportunities.',
    keywords: 'partner with seenomad, nomad sponsorship, remote work marketing, b2b travel partnership',
    ogType: 'website'
  },
  '/about': {
    title: 'About SeeNomad – Intelligence for the Free-Moving World',
    description: 'Learn about SeeNomad’s mission to equip digital nomads with borderless intelligence, reliable visa tracking, and authentic community connections.',
    keywords: 'about seenomad, digital nomad mission, nomad tech startup, seenomad story',
    ogType: 'website',
    schemaType: 'Organization',
    generateSchema: (canonicalUrl) => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SeeNomad',
      url: canonicalUrl,
      logo: `${typeof window !== 'undefined' ? window.location.origin : ''}/seenomad-logo.jpg`,
      description: 'Global digital nomad and travel intelligence platform featuring destinations, visas, AI agents, and community.'
    })
  },
  '/legal': {
    title: 'Legal, Terms & Privacy Policy | SeeNomad',
    description: 'Review the SeeNomad terms of service, privacy commitment, data protection guidelines, and disclaimer regarding visa regulations.',
    keywords: 'terms of service, privacy policy, legal disclaimer, nomad data protection, seenomad legal',
    ogType: 'website'
  },
  '/saved': {
    title: 'Saved Destinations & Stored Itineraries | SeeNomad',
    description: 'Manage your bucket-list nomad hubs, bookmarked visa guides, and saved trip plans in your personal SeeNomad workspace.',
    keywords: 'saved destinations, nomad bookmarks, favorite nomad cities, travel bucket list',
    ogType: 'website'
  },
  '/settings': {
    title: 'Account & Experience Preferences | SeeNomad',
    description: 'Customize your SeeNomad interface, notification triggers, privacy settings, and home base country for tax and visa calculations.',
    keywords: 'nomad settings, account preferences, dark mode, privacy controls',
    ogType: 'website'
  },
  '/user': {
    title: 'Nomad Profile & Travel Passport | SeeNomad',
    description: 'View your verified nomad passport, travel stats, country count, earned badges, and NMD reward ledger balance.',
    keywords: 'nomad profile, travel passport, nomad achievements, NMD tokens, seenomad user',
    ogType: 'profile'
  },
  '/notifications': {
    title: 'Nomad Pulse & Activity Notifications | SeeNomad',
    description: 'Stay up to date with community mentions, flash meetup invites, visa regulatory updates, and daily streak rewards.',
    keywords: 'nomad notifications, meetup alerts, visa updates, streak reminders',
    ogType: 'website'
  }
};

/**
 * Backward-compatibility alias
 */
export const ROUTE_METADATA = SEO_ROUTE_MAP;

/**
 * Resolves route metadata with exact matches, prefix matching, and formatted fallbacks.
 * Merges with DEFAULT_SEO to ensure fallback values are always present.
 *
 * @param {string} pathname - Current window or router pathname
 * @returns {object} Resolved SEO metadata object
 */
export function resolveRouteSEO(pathname) {
  const cleanPath = pathname || '/';

  // 1. Direct match
  if (SEO_ROUTE_MAP[cleanPath]) {
    return {
      ...DEFAULT_SEO,
      ...SEO_ROUTE_MAP[cleanPath]
    };
  }

  // 2. Prefix match (e.g., /explore/destinations/bali)
  const matchedRoute = Object.keys(SEO_ROUTE_MAP)
    .filter((route) => route !== '/' && cleanPath.startsWith(route))
    .sort((a, b) => b.length - a.length)[0];

  if (matchedRoute) {
    const parentMeta = SEO_ROUTE_MAP[matchedRoute];
    const subPath = cleanPath.slice(matchedRoute.length).replace(/^\/+/, '');
    if (subPath) {
      const formattedSubPath = subPath
        .split('/')
        .map((seg) => seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()))
        .join(' - ');

      return {
        ...DEFAULT_SEO,
        ...parentMeta,
        title: `${formattedSubPath} | ${parentMeta.title.split('|')[0].trim() || DEFAULT_SEO.siteName}`,
        description: `Explore ${formattedSubPath} details, digital nomad insights, cost of living metrics, and community reports on SeeNomad.`
      };
    }
    return {
      ...DEFAULT_SEO,
      ...parentMeta
    };
  }

  // 3. Fallback for dynamic / unmatched routes
  const segments = cleanPath.split('/').filter(Boolean);
  const formattedTitle = segments.length > 0
    ? segments.map((seg) => seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())).join(' • ')
    : 'Travel Intelligence';

  return {
    ...DEFAULT_SEO,
    title: `${formattedTitle} | ${DEFAULT_SEO.siteName}`,
    description: 'SeeNomad is the live digital nomad intelligence platform for remote workers, world travelers, and location-independent professionals.',
    keywords: DEFAULT_SEO.keywords,
    ogType: DEFAULT_SEO.ogType
  };
}

/**
 * Builds a Schema.org SearchAction structured data object for Sitelinks searchbox.
 * Conforms to Google Search Central guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 *
 * @param {string} origin - Site origin (e.g., https://seenomad.com)
 * @param {string} [urlTemplate] - Search query URL template
 * @returns {object} Schema.org SearchAction specification
 */
export function buildWebSiteSearchAction(origin = 'https://seenomad.com', urlTemplate = null) {
  const template = urlTemplate || `${origin}/explore?q={search_term_string}`;
  return {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: template
    },
    'query-input': 'required name=search_term_string'
  };
}

/**
 * Builds Schema.org JSON-LD structured data for the 'WebSite' type.
 * Enables Google Sitelinks searchbox and sitewide identity recognition.
 *
 * @param {string} origin - Site origin (e.g., https://seenomad.com)
 * @param {object} [options] - Configuration options
 * @param {string} [options.searchUrlTemplate] - Custom search URL template
 * @param {boolean} [options.includeSearchAction=true] - Whether to include SearchAction
 * @returns {object} Schema.org WebSite specification
 */
export function buildWebSiteSchema(origin = 'https://seenomad.com', options = {}) {
  const {
    searchUrlTemplate = `${origin}/explore?q={search_term_string}`,
    includeSearchAction = true
  } = options;

  const siteUrl = origin.endsWith('/') ? origin : `${origin}/`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: DEFAULT_SEO.siteName,
    alternateName: ['SeeNomad Travel Intelligence', 'SeeNomad App', 'SeeNomad Platform'],
    url: siteUrl,
    description: DEFAULT_SEO.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${origin}/#organization`
    }
  };

  if (includeSearchAction) {
    websiteSchema.potentialAction = [
      buildWebSiteSearchAction(origin, searchUrlTemplate)
    ];
  }

  return websiteSchema;
}


/**
 * Builds Schema.org JSON-LD structured data for the 'Organization' type.
 * Enhances brand entity recognition, logo rich results, contact points,
 * and social media Knowledge Graph connectivity in Google search results.
 *
 * @param {string} origin - Site origin (e.g., https://seenomad.com)
 * @param {object} [options] - Custom organization options and overrides
 * @returns {object} Schema.org Organization specification
 */
export function buildOrganizationSchema(origin = 'https://seenomad.com', options = {}) {
  const defaults = DEFAULT_ORGANIZATION;
  const siteUrl = origin.endsWith('/') ? origin.slice(0, -1) : origin;

  const name = options.name || defaults.name;
  const legalName = options.legalName || defaults.legalName;
  const alternateName = options.alternateName || defaults.alternateName;
  const description = options.description || DEFAULT_SEO.description || defaults.description;
  const email = options.email || defaults.email;
  const telephone = options.telephone || defaults.telephone;
  const sameAs = options.sameAs || options.socialLinks || defaults.sameAs;

  // Resolve Logo
  let logoObj;
  const rawLogo = options.logo || defaults.logo;
  if (typeof rawLogo === 'string') {
    const fullLogoUrl = rawLogo.startsWith('http') ? rawLogo : `${siteUrl}${rawLogo.startsWith('/') ? '' : '/'}${rawLogo}`;
    logoObj = {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#logo`,
      url: fullLogoUrl,
      contentUrl: fullLogoUrl,
      caption: `${name} Official Logo`
    };
  } else if (rawLogo && typeof rawLogo === 'object') {
    logoObj = rawLogo;
  } else {
    const defaultLogoUrl = `${siteUrl}${DEFAULT_SEO.defaultImage}`;
    logoObj = {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#logo`,
      url: defaultLogoUrl,
      contentUrl: defaultLogoUrl,
      caption: `${name} Official Logo`
    };
  }

  // Resolve Contact Points
  const rawContactPoints = options.contactPoints || options.contactPoint || defaults.contactPoints;
  const contactPointsArray = Array.isArray(rawContactPoints)
    ? rawContactPoints
    : rawContactPoints
      ? [rawContactPoints]
      : [];

  const formattedContactPoints = contactPointsArray.map((cp) => {
    const cpUrl = cp.url
      ? (cp.url.startsWith('http') ? cp.url : `${siteUrl}${cp.url.startsWith('/') ? '' : '/'}${cp.url}`)
      : undefined;

    return {
      '@type': 'ContactPoint',
      contactType: cp.contactType || 'customer support',
      email: cp.email || email,
      ...(telephone ? { telephone: cp.telephone || telephone } : {}),
      ...(cpUrl ? { url: cpUrl } : {}),
      availableLanguage: cp.availableLanguage || ['English'],
      areaServed: cp.areaServed || 'Worldwide'
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name,
    legalName,
    alternateName,
    url: siteUrl,
    logo: logoObj,
    image: typeof logoObj === 'object' ? logoObj.url : `${siteUrl}${DEFAULT_SEO.defaultImage}`,
    description,
    email,
    ...(telephone ? { telephone } : {}),
    sameAs,
    contactPoint: formattedContactPoints,
    knowsAbout: options.knowsAbout || defaults.knowsAbout
  };
}

/**
 * Route Segment to Friendly Breadcrumb Name dictionary
 */
export const BREADCRUMB_NAME_MAP = {
  'explore': 'Explore',
  'destinations': 'Destinations',
  'visa': 'Visa Requirements',
  'visas': 'Nomad Visas',
  'embassy': 'Embassy Directory',
  'coworking': 'Coworking Spaces',
  'coliving': 'Coliving Hubs',
  'saved': 'Saved Wishlist',
  'favorites': 'Saved Wishlist',
  'popular': 'Trending & Popular',
  'community': 'Community',
  'meetups': 'Global Meetups',
  'circles': 'Nomad Circles',
  'bounty-board': 'Bounty Board',
  'collab-board': 'Collab Board',
  'creator-studio': 'Creator Studio',
  'ai-agents': 'AI Travel Agents',
  'travel-games': 'Travel Games & Quests',
  'business-partner': 'Business & Partner',
  'learning-voluntourism': 'Learning & Volunteering',
  'event-festival': 'Events & Festivals',
  'support-utility': 'Support & Utilities',
  'insights-analytics': 'Insights & Analytics',
  'download-app': 'Download App',
  'partner-with-us': 'Partner With Us',
  'about': 'About Us',
  'legal': 'Legal & Policy',
  'settings': 'Settings',
  'user': 'Nomad Profile',
  'notifications': 'Notifications'
};

/**
 * Builds Schema.org JSON-LD structured data for the 'BreadcrumbList' type.
 * Enhances search results with navigable hierarchy indicators and sitelink breadcrumbs.
 *
 * @param {string} pathname - Current route path (e.g. /explore/destinations/bali)
 * @param {string} origin - Site origin (e.g. https://seenomad.com)
 * @param {Array<{name: string, url: string}>} [customItems] - Optional explicit breadcrumb chain
 * @returns {object} Schema.org BreadcrumbList specification
 */
export function buildBreadcrumbListSchema(pathname = '/', origin = 'https://seenomad.com', customItems = null) {
  if (customItems && Array.isArray(customItems) && customItems.length > 0) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: customItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${origin}${item.url.startsWith('/') ? '' : '/'}${item.url}`
      }))
    };
  }

  const cleanPath = (pathname || '/').split('?')[0].split('#')[0];
  const segments = cleanPath.split('/').filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`
    }
  ];

  let accumulatedPath = '';
  segments.forEach((seg, idx) => {
    accumulatedPath += `/${seg}`;
    const name = BREADCRUMB_NAME_MAP[seg.toLowerCase()] ||
      seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name,
      item: `${origin}${accumulatedPath}`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * Helper to convert destination or guide name to URL-friendly slug
 */
export function toDestinationSlug(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Generates dynamic Open Graph meta tag previews and structured metadata
 * based on the currently viewed destination or travel guide page content.
 *
 * @param {object} destinationOrGuide - Destination item or travel guide object
 * @param {string} [origin='https://seenomad.com'] - Current origin for absolute URLs
 * @param {object} [customOptions={}] - Optional overrides for title, description, image, etc.
 * @returns {object} Open Graph preview object, meta tags collection, and schema
 */
export function generateDestinationOGPreview(destinationOrGuide, origin = 'https://seenomad.com', customOptions = {}) {
  if (!destinationOrGuide || typeof destinationOrGuide !== 'object') {
    return null;
  }

  const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
  const name = destinationOrGuide.name || destinationOrGuide.title || 'Global Nomad Destination';
  const location = destinationOrGuide.location || destinationOrGuide.country || destinationOrGuide.region || 'World';
  const category = destinationOrGuide.category || destinationOrGuide.tag || 'Nomad Destination';
  const rawImage = destinationOrGuide.image || destinationOrGuide.heroImage || destinationOrGuide.ogImage || DEFAULT_SEO.defaultImage;
  const imageUrl = rawImage.startsWith('http') ? rawImage : `${cleanOrigin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
  
  const slug = destinationOrGuide.slug || toDestinationSlug(name);
  const canonicalUrl = customOptions.canonical || `${cleanOrigin}/explore/destinations/${slug}`;

  // Signals
  const rating = destinationOrGuide.rating ? Number(destinationOrGuide.rating) : null;
  const price = destinationOrGuide.price || destinationOrGuide.costOfLiving || destinationOrGuide.budget || null;
  const aiInsight = destinationOrGuide.aiInsight || destinationOrGuide.insight || destinationOrGuide.description || destinationOrGuide.summary || null;
  const visaApprovalRate = destinationOrGuide.visaApprovalRate || null;
  const visaFriendly = destinationOrGuide.visaFriendly;
  const liveViewers = destinationOrGuide.liveViewers || null;

  // Title: 40-60 chars optimal
  const ogTitle = customOptions.title ||
    `${name}, ${location} – Nomad Travel Guide & Intel | ${DEFAULT_SEO.siteName}`;

  // Description: 130-160 chars optimal with compelling call-to-action & live signals
  let ogDescription = customOptions.description;
  if (!ogDescription) {
    const parts = [];
    if (aiInsight) {
      parts.push(aiInsight);
    }
    const specs = [];
    if (price) specs.push(`Est. ${price}`);
    if (rating) specs.push(`⭐ ${rating}/5`);
    if (visaApprovalRate) specs.push(`${visaApprovalRate} visa approval`);
    else if (visaFriendly) specs.push('Visa friendly');

    if (specs.length > 0) {
      parts.push(`(${specs.join(' • ')})`);
    }

    parts.push(`Explore verified WiFi, coliving hubs, and nomad meetups for ${name} on SeeNomad.`);
    ogDescription = parts.join(' ');
    if (ogDescription.length > 160) {
      ogDescription = ogDescription.slice(0, 157) + '...';
    }
  }

  // Keywords
  const keywords = customOptions.keywords || [
    name.toLowerCase(),
    `${name.toLowerCase()} travel guide`,
    `${name.toLowerCase()} digital nomad`,
    `${location.toLowerCase()} remote work`,
    `${category.toLowerCase()} destinations`,
    `cost of living ${name.toLowerCase()}`,
    'schengen calculator',
    'seenomad guide'
  ].join(', ');

  // Open Graph Image metadata specifications
  const ogImageWidth = customOptions.ogImageWidth || customOptions.imageWidth || DEFAULT_SEO.defaultImageWidth || '1200';
  const ogImageHeight = customOptions.ogImageHeight || customOptions.imageHeight || DEFAULT_SEO.defaultImageHeight || '630';
  const ogImageAlt = customOptions.ogImageAlt || customOptions.imageAlt ||
    `Travel intelligence and nomad city guide for ${name}, ${location}`;
  const ogImageType = customOptions.ogImageType || customOptions.imageType ||
    (imageUrl.endsWith('.png') ? 'image/png' : imageUrl.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg');

  // Full Open Graph tag bundle
  const openGraph = {
    'og:type': customOptions.ogType || 'article',
    'og:title': ogTitle,
    'og:description': ogDescription,
    'og:url': canonicalUrl,
    'og:image': imageUrl,
    'og:image:secure_url': imageUrl,
    'og:image:alt': ogImageAlt,
    'og:image:width': String(ogImageWidth),
    'og:image:height': String(ogImageHeight),
    'og:image:type': ogImageType,
    'og:site_name': customOptions.siteName || DEFAULT_SEO.siteName,
    'og:locale': 'en_US',
    'article:section': category,
    'article:tag': [name, location, category, 'Digital Nomad', 'Travel Guide'],
    'article:published_time': customOptions.publishedTime || new Date().toISOString()
  };

  // Twitter Card bundle
  const twitter = {
    'twitter:card': 'summary_large_image',
    'twitter:site': customOptions.twitterHandle || DEFAULT_SEO.twitterHandle,
    'twitter:creator': customOptions.twitterHandle || DEFAULT_SEO.twitterHandle,
    'twitter:title': ogTitle,
    'twitter:description': ogDescription,
    'twitter:image': imageUrl,
    'twitter:image:alt': ogImageAlt
  };

  // Schema.org TouristDestination / TravelGuide JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${canonicalUrl}#destination`,
    name,
    description: ogDescription,
    url: canonicalUrl,
    image: [imageUrl],
    containedInPlace: {
      '@type': 'Place',
      name: location
    },
    touristType: [
      'Digital Nomad',
      'Remote Worker',
      'Solo Traveler',
      'Slow Traveler'
    ],
    ...(rating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(rating),
        bestRating: '5',
        reviewCount: String(destinationOrGuide.experiencesShared || '128')
      }
    } : {}),
    ...(price ? {
      offers: {
        '@type': 'Offer',
        price: String(price).replace(/[^0-9.]/g, '') || '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: canonicalUrl
      }
    } : {}),
    subjectOf: {
      '@type': 'TravelGuide',
      name: `${name} Digital Nomad Intelligence Guide`,
      about: {
        '@type': 'TouristDestination',
        name
      },
      publisher: {
        '@id': `${cleanOrigin}/#organization`
      },
      inLanguage: 'en-US'
    }
  };

  // Pre-compiled list of meta tags for easy iteration
  const metaTags = [
    { property: 'og:type', content: openGraph['og:type'] },
    { property: 'og:site_name', content: openGraph['og:site_name'] },
    { property: 'og:title', content: openGraph['og:title'] },
    { property: 'og:description', content: openGraph['og:description'] },
    { property: 'og:url', content: openGraph['og:url'] },
    { property: 'og:image', content: openGraph['og:image'] },
    { property: 'og:image:secure_url', content: openGraph['og:image:secure_url'] },
    { property: 'og:image:alt', content: openGraph['og:image:alt'] },
    { property: 'og:image:width', content: openGraph['og:image:width'] },
    { property: 'og:image:height', content: openGraph['og:image:height'] },
    { property: 'og:image:type', content: openGraph['og:image:type'] },
    { property: 'og:locale', content: openGraph['og:locale'] },
    { property: 'article:section', content: openGraph['article:section'] },
    { name: 'twitter:card', content: twitter['twitter:card'] },
    { name: 'twitter:site', content: twitter['twitter:site'] },
    { name: 'twitter:creator', content: twitter['twitter:creator'] },
    { name: 'twitter:title', content: twitter['twitter:title'] },
    { name: 'twitter:description', content: twitter['twitter:description'] },
    { name: 'twitter:image', content: twitter['twitter:image'] },
    { name: 'twitter:image:alt', content: twitter['twitter:image:alt'] }
  ];

  // Visual Card Preview Model
  const preview = {
    platform: 'Open Graph (Social Sharing)',
    displayDomain: (new URL(canonicalUrl)).hostname,
    cardType: 'summary_large_image',
    title: ogTitle,
    description: ogDescription,
    image: imageUrl,
    url: canonicalUrl,
    badge: category,
    metaTagsCount: metaTags.length,
    stats: {
      rating: rating ? `${rating} ★` : null,
      price: price || null,
      viewers: liveViewers || null,
      visa: visaFriendly ? 'Visa Friendly' : (visaApprovalRate ? `${visaApprovalRate} Approval` : null)
    }
  };

  return {
    title: ogTitle,
    description: ogDescription,
    keywords,
    canonical: canonicalUrl,
    ogType: openGraph['og:type'],
    ogImage: imageUrl,
    ogTitle,
    ogDescription,
    openGraph,
    twitter,
    schema,
    metaTags,
    preview
  };
}

export default SEO_ROUTE_MAP;


