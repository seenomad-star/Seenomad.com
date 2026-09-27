import React, { useState, useMemo } from 'react';

/**
 * Standard responsive breakpoint widths for user-generated images.
 * Aligns with modern mobile, tablet, and desktop display viewports & Retina densities.
 */
export const DEFAULT_UGC_WIDTHS = [360, 480, 640, 768, 1080, 1280, 1600];
export const DEFAULT_AVATAR_WIDTHS = [48, 72, 96, 128, 192, 256];

/**
 * Fallback placeholder when a user-generated content image fails to load.
 */
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
export const DEFAULT_FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

/**
 * Generates responsive srcset attribute string for image URLs (Unsplash, Cloudinary, Imgix, CDN, or custom services).
 * 
 * @param {string} src - Source image URL
 * @param {number[]} [widths=DEFAULT_UGC_WIDTHS] - Array of target pixel widths
 * @param {object} [options={}] - Transformation options (quality, format, fit)
 * @returns {string} Comma-separated srcset string, e.g. "url?w=480 480w, url?w=768 768w"
 */
export function generateResponsiveSrcSet(src, widths = DEFAULT_UGC_WIDTHS, options = {}) {
  if (!src || typeof src !== 'string') return '';
  // Data URLs, Blobs, and SVGs are vector/static and do not need responsive widths
  if (src.startsWith('data:') || src.startsWith('blob:') || src.endsWith('.svg') || src.includes('.svg?')) {
    return '';
  }

  const quality = options.quality || 80;
  const fit = options.fit || 'crop';

  // 1. Unsplash CDN Images (most common in SeeNomad UGC posts & destinations)
  if (src.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(src);
      return widths
        .map((w) => {
          const u = new URL(urlObj.toString());
          u.searchParams.set('w', String(w));
          u.searchParams.set('auto', 'format');
          u.searchParams.set('fit', fit);
          u.searchParams.set('q', String(quality));
          return `${u.toString()} ${w}w`;
        })
        .join(', ');
    } catch {
      const baseUrl = src.split('?')[0];
      return widths
        .map((w) => `${baseUrl}?w=${w}&auto=format&fit=${fit}&q=${quality} ${w}w`)
        .join(', ');
    }
  }

  // 2. Cloudinary CDN Images
  if (src.includes('res.cloudinary.com')) {
    const uploadIndex = src.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const prefix = src.slice(0, uploadIndex + 8);
      const suffix = src.slice(uploadIndex + 8);
      return widths
        .map((w) => `${prefix}w_${w},f_auto,q_${quality},c_limit/${suffix} ${w}w`)
        .join(', ');
    }
  }

  // 3. URLs with existing query parameters for width (e.g. ?w=... or ?width=...)
  if (src.includes('w=') || src.includes('width=')) {
    try {
      const urlObj = new URL(src);
      const paramName = urlObj.searchParams.has('w') ? 'w' : 'width';
      return widths
        .map((w) => {
          const u = new URL(urlObj.toString());
          u.searchParams.set(paramName, String(w));
          if (!u.searchParams.has('auto')) u.searchParams.set('auto', 'format');
          return `${u.toString()} ${w}w`;
        })
        .join(', ');
    } catch {
      // Fall through
    }
  }

  // 4. Other remote HTTP/HTTPS images supporting standard w parameter
  if (src.startsWith('http://') || src.startsWith('https://')) {
    try {
      const urlObj = new URL(src);
      // Only append if it's an image hosting service or generic queryable CDN
      if (urlObj.hostname.includes('cdn') || urlObj.hostname.includes('img') || urlObj.hostname.includes('static')) {
        return widths
          .map((w) => {
            const u = new URL(urlObj.toString());
            u.searchParams.set('w', String(w));
            u.searchParams.set('auto', 'format');
            return `${u.toString()} ${w}w`;
          })
          .join(', ');
      }
    } catch {
      // Fall through
    }
  }

  return '';
}

/**
 * Custom Image Component
 * 
 * Performance-focused image component that:
 * - Automatically applies `loading="lazy"` (and `decoding="async"`)
 * - Automatically generates responsive `srcset` descriptors for UGC images
 * - Supports `priority={true}` for LCP hero images (`loading="eager"` + `fetchpriority="high"`)
 * - Protects against Cumulative Layout Shift (CLS) via `aspectRatio`
 * - Gracefully handles load failures with fallback images
 * - Smoothly fades in once loaded to eliminate layout flash
 *
 * @param {object} props
 * @param {string} props.src - Image source URL
 * @param {string} [props.alt=''] - Image alt description
 * @param {string} [props.loading='lazy'] - 'lazy' | 'eager'
 * @param {boolean} [props.priority=false] - When true, sets loading="eager" & fetchpriority="high"
 * @param {string} [props.decoding='async'] - 'async' | 'sync' | 'auto'
 * @param {number[]} [props.widths] - Target responsive widths for srcset
 * @param {string} [props.sizes] - Responsive sizes query string
 * @param {string} [props.srcSet] - Custom srcset override
 * @param {string} [props.fallbackSrc] - Custom fallback on error
 * @param {string|number} [props.aspectRatio] - CSS aspect-ratio string (e.g. '16/9', '4/3', '1/1')
 * @param {string} [props.className=''] - Image element class names
 * @param {string} [props.containerClassName=''] - Wrapper container class names
 * @param {boolean} [props.wrapper=false] - Whether to render an outer aspect-ratio wrapper
 * @param {boolean} [props.fadeIn=true] - Smooth fade-in transition on load
 * @param {Function} [props.onLoad] - OnLoad callback
 * @param {Function} [props.onError] - OnError callback
 */
export const Image = ({
  src,
  alt = '',
  loading = 'lazy',
  priority = false,
  decoding = 'async',
  widths = DEFAULT_UGC_WIDTHS,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px',
  srcSet: customSrcSet,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  aspectRatio,
  className = '',
  containerClassName = '',
  wrapper = false,
  fadeIn = true,
  onLoad,
  onError,
  style = {},
  ...restProps
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync internal src state if prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Compute responsive srcset attribute automatically
  const computedSrcSet = useMemo(() => {
    if (customSrcSet) return customSrcSet;
    if (hasError) return '';
    return generateResponsiveSrcSet(currentSrc, widths);
  }, [currentSrc, customSrcSet, widths, hasError]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  // Determine eager vs lazy
  const effectiveLoading = priority ? 'eager' : loading;
  const effectiveFetchPriority = priority ? 'high' : (restProps.fetchPriority || 'auto');

  // Combined style for layout shift prevention and smooth fade-in
  const imageStyle = {
    ...style,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(fadeIn ? {
      transition: 'opacity 0.25s ease-in-out',
      opacity: isLoaded ? 1 : 0.7
    } : {})
  };

  const imageElement = (
    <img
      src={currentSrc}
      alt={alt || 'User content'}
      loading={effectiveLoading}
      decoding={decoding}
      fetchPriority={effectiveFetchPriority}
      srcSet={computedSrcSet || undefined}
      sizes={computedSrcSet ? sizes : undefined}
      onLoad={handleLoad}
      onError={handleError}
      className={className}
      style={imageStyle}
      {...restProps}
    />
  );

  if (wrapper || aspectRatio) {
    return (
      <div
        className={`relative overflow-hidden bg-neutral-900/40 ${containerClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {imageElement}
      </div>
    );
  }

  return imageElement;
};

/**
 * UGCImage Component
 * Specialized preset for user-generated dispatches, travel photos, and multi-photo carousel items.
 */
export const UGCImage = ({
  src,
  alt = 'Nomad travel dispatch photo',
  widths = DEFAULT_UGC_WIDTHS,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 768px, 900px',
  loading = 'lazy',
  className = '',
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      widths={widths}
      sizes={sizes}
      loading={loading}
      className={className}
      {...props}
    />
  );
};

/**
 * AvatarImage Component
 * Specialized preset for traveler avatars, profile pictures, and author thumbnails.
 */
export const AvatarImage = ({
  src,
  alt = 'Traveler Avatar',
  widths = DEFAULT_AVATAR_WIDTHS,
  sizes = '48px',
  fallbackSrc = DEFAULT_FALLBACK_AVATAR,
  className = 'rounded-full object-cover',
  loading = 'lazy',
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      widths={widths}
      sizes={sizes}
      fallbackSrc={fallbackSrc}
      loading={loading}
      className={className}
      {...props}
    />
  );
};

export default Image;
