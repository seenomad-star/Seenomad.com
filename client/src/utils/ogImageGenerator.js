import { useState, useEffect, useCallback } from 'react';

/**
 * Open Graph Branded Image Generator
 * 
 * High-performance canvas-based utility that generates 1200x630 branded social cards
 * complete with SeeNomad branding, dynamic page title, category pill, stats metrics,
 * and high-contrast social card visuals for Twitter, LinkedIn, Slack, Facebook, etc.
 */

export const OG_DIMENSIONS = {
  width: 1200,
  height: 630
};

/**
 * Utility to wrap text on an HTML5 2D Canvas context
 */
export function wrapCanvasText(ctx, text, maxWidth, maxLines = 3) {
  if (!text) return [];
  const words = String(text).split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = `${currentLine} ${word}`;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    if (lines.length >= maxLines - 1 && words.length > lines.join(' ').split(' ').length) {
      // Truncate with ellipsis if overflowing
      while (ctx.measureText(currentLine + '...').width > maxWidth && currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1).trim();
      }
      lines.push(currentLine + '...');
    } else {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Utility to draw rounded rectangles on canvas
 */
export function drawRoundRect(ctx, x, y, width, height, radius) {
  const r = typeof radius === 'number' ? radius : 8;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Loads an image from a URL or data URI with CORS handling
 */
export function loadCanvasImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Renders the branded 1200x630 card onto the provided canvas
 * 
 * @param {HTMLCanvasElement} canvas - Target canvas
 * @param {object} options - Configuration options
 * @returns {Promise<HTMLCanvasElement>} Resolves with the rendered canvas
 */
export async function renderBrandedOGCanvas(canvas, options = {}) {
  const {
    title = 'SeeNomad – Digital Nomad Feed & Travel Intelligence',
    category = 'Travel Intelligence',
    description = 'Connect with a global nomad community. Access real-time city signals, Schengen visa calculations, vetted coliving hubs, and nomad meetups.',
    siteName = 'SeeNomad',
    domain = 'seenomad.com',
    tagline = 'Live Nomad Intelligence & Community Feed',
    badgeText = null,
    stats = null,
    backgroundImageUrl = null,
    overlayOpacity = 0.82
  } = options;

  canvas.width = OG_DIMENSIONS.width;
  canvas.height = OG_DIMENSIONS.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Base Gradient Background
  const bgGradient = ctx.createLinearGradient(0, 0, OG_DIMENSIONS.width, OG_DIMENSIONS.height);
  bgGradient.addColorStop(0, '#07090e');
  bgGradient.addColorStop(0.5, '#0b0f19');
  bgGradient.addColorStop(1, '#05070a');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, OG_DIMENSIONS.width, OG_DIMENSIONS.height);

  // 2. Optional Background Image with Dark Vignette
  if (backgroundImageUrl) {
    const bgImg = await loadCanvasImage(backgroundImageUrl);
    if (bgImg) {
      ctx.save();
      // Draw image to fill with aspect ratio cover
      const hRatio = OG_DIMENSIONS.width / bgImg.width;
      const vRatio = OG_DIMENSIONS.height / bgImg.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (OG_DIMENSIONS.width - bgImg.width * ratio) / 2;
      const centerShiftY = (OG_DIMENSIONS.height - bgImg.height * ratio) / 2;
      ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, centerShiftX, centerShiftY, bgImg.width * ratio, bgImg.height * ratio);

      // Dark overlay
      ctx.fillStyle = `rgba(8, 10, 15, ${overlayOpacity})`;
      ctx.fillRect(0, 0, OG_DIMENSIONS.width, OG_DIMENSIONS.height);
      ctx.restore();
    }
  }

  // 3. Tech Mesh / Grid Lines for Depth
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < OG_DIMENSIONS.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, OG_DIMENSIONS.height);
    ctx.stroke();
  }
  for (let y = 0; y < OG_DIMENSIONS.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(OG_DIMENSIONS.width, y);
    ctx.stroke();
  }

  // 4. Ambient Glowing Radial Orbs
  // Top-Right Teal / Cyan Orb
  const radialGlow1 = ctx.createRadialGradient(OG_DIMENSIONS.width - 150, 120, 10, OG_DIMENSIONS.width - 150, 120, 450);
  radialGlow1.addColorStop(0, 'rgba(20, 184, 166, 0.28)');
  radialGlow1.addColorStop(0.5, 'rgba(6, 182, 212, 0.12)');
  radialGlow1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow1;
  ctx.fillRect(0, 0, OG_DIMENSIONS.width, OG_DIMENSIONS.height);

  // Bottom-Left Indigo / Emerald Orb
  const radialGlow2 = ctx.createRadialGradient(160, OG_DIMENSIONS.height - 100, 10, 160, OG_DIMENSIONS.height - 100, 420);
  radialGlow2.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
  radialGlow2.addColorStop(0.5, 'rgba(99, 102, 241, 0.10)');
  radialGlow2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow2;
  ctx.fillRect(0, 0, OG_DIMENSIONS.width, OG_DIMENSIONS.height);

  // 5. Card Inner Frame & Glowing Outer Border
  const pad = 36;
  const frameWidth = OG_DIMENSIONS.width - pad * 2;
  const frameHeight = OG_DIMENSIONS.height - pad * 2;
  drawRoundRect(ctx, pad, pad, frameWidth, frameHeight, 24);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Subtle corner accent lines
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 2.5;
  // Top Left corner bracket
  ctx.beginPath();
  ctx.moveTo(pad, pad + 32);
  ctx.lineTo(pad, pad + 8);
  ctx.quadraticCurveTo(pad, pad, pad + 8, pad);
  ctx.lineTo(pad + 32, pad);
  ctx.stroke();

  // Top Right corner bracket
  ctx.beginPath();
  ctx.moveTo(pad + frameWidth - 32, pad);
  ctx.lineTo(pad + frameWidth - 8, pad);
  ctx.quadraticCurveTo(pad + frameWidth, pad, pad + frameWidth, pad + 8);
  ctx.lineTo(pad + frameWidth, pad + 32);
  ctx.stroke();

  // 6. Header Row: Logo & Category Badge
  const headerY = pad + 40;

  // Draw SeeNomad Logo Mark
  const logoX = pad + 44;
  const logoY = headerY;
  const logoRadius = 22;

  // Logo glow circle
  const logoGlow = ctx.createRadialGradient(logoX, logoY, 2, logoX, logoY, 28);
  logoGlow.addColorStop(0, 'rgba(20, 184, 166, 0.5)');
  logoGlow.addColorStop(1, 'rgba(20, 184, 166, 0)');
  ctx.fillStyle = logoGlow;
  ctx.beginPath();
  ctx.arc(logoX, logoY, 28, 0, Math.PI * 2);
  ctx.fill();

  // Logo circle badge
  drawRoundRect(ctx, logoX - logoRadius, logoY - logoRadius, logoRadius * 2, logoRadius * 2, 12);
  const logoBgGrad = ctx.createLinearGradient(logoX - logoRadius, logoY - logoRadius, logoX + logoRadius, logoY + logoRadius);
  logoBgGrad.addColorStop(0, '#0d9488');
  logoBgGrad.addColorStop(1, '#047857');
  ctx.fillStyle = logoBgGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Compass star / "N" emblem inside logo
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(logoX, logoY - 11);
  ctx.lineTo(logoX + 7, logoY + 11);
  ctx.lineTo(logoX, logoY + 6);
  ctx.lineTo(logoX - 7, logoY + 11);
  ctx.closePath();
  ctx.fill();

  // Logo Brand Name
  ctx.font = '700 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(siteName, logoX + logoRadius + 14, logoY);

  // Live Pulse Dot & Subtitle next to Logo
  ctx.beginPath();
  ctx.arc(logoX + logoRadius + 14 + ctx.measureText(siteName).width + 12, logoY - 1, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#10b981';
  ctx.fill();

  // Category Pill Badge (Top Right)
  const categoryText = String(badgeText || category).toUpperCase();
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const catTextWidth = ctx.measureText(categoryText).width;
  const pillW = catTextWidth + 36;
  const pillH = 34;
  const pillX = OG_DIMENSIONS.width - pad - 44 - pillW;
  const pillY = headerY - pillH / 2;

  // Pill Background
  drawRoundRect(ctx, pillX, pillY, pillW, pillH, 17);
  ctx.fillStyle = 'rgba(20, 184, 166, 0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.35)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Pill glowing dot
  ctx.beginPath();
  ctx.arc(pillX + 16, pillY + pillH / 2, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#2dd4bf';
  ctx.fill();

  // Pill text
  ctx.fillStyle = '#2dd4bf';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryText, pillX + 26, pillY + pillH / 2 + 1);

  // 7. Main Hero Content: Title & Description
  const contentX = pad + 44;
  const contentMaxW = frameWidth - 88;
  const titleY = headerY + 70;

  // Dynamic Font Size based on Title Length
  const titleFontSize = title.length > 55 ? 44 : 52;
  const titleLineHeight = titleFontSize + 14;
  ctx.font = `800 ${titleFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

  const titleLines = wrapCanvasText(ctx, title, contentMaxW, 3);
  let currentY = titleY;

  titleLines.forEach((line) => {
    // Subtle text shadow for high contrast over any background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(line, contentX, currentY);

    currentY += titleLineHeight;
  });

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Description / Subtitle
  if (description) {
    currentY += 12;
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#94a3b8';
    const descLines = wrapCanvasText(ctx, description, contentMaxW, 2);
    descLines.forEach((descLine) => {
      ctx.fillText(descLine, contentX, currentY);
      currentY += 28;
    });
  }

  // 8. Bottom Bar: Metrics Pills + Domain Watermark
  const footerY = OG_DIMENSIONS.height - pad - 48;

  // Metrics Pills
  let pillOffset = contentX;
  const metricsList = [];

  if (stats && typeof stats === 'object') {
    Object.entries(stats).forEach(([k, v]) => {
      if (v) metricsList.push({ label: k, value: String(v) });
    });
  } else {
    // Default nomad signals
    metricsList.push({ label: 'Intelligence', value: 'Live Signals' });
    metricsList.push({ label: 'Platform', value: 'Schengen & Visas' });
    metricsList.push({ label: 'Network', value: 'Global Hubs' });
  }

  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  metricsList.slice(0, 3).forEach((item) => {
    const text = `${item.value}`;
    const badgeW = ctx.measureText(text).width + 24;
    const badgeH = 34;

    drawRoundRect(ctx, pillOffset, footerY - badgeH / 2, badgeW, badgeH, 10);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, pillOffset + badgeW / 2, footerY);

    pillOffset += badgeW + 12;
  });

  // Domain Watermark & Security Lock on Right
  const domainText = `${domain}`;
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(domainText, OG_DIMENSIONS.width - pad - 44, footerY - 10);

  // Tagline below domain
  ctx.font = '400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(tagline, OG_DIMENSIONS.width - pad - 44, footerY + 12);

  return canvas;
}

/**
 * Generates an Open Graph Image as a Base64 Data URL (PNG)
 * 
 * @param {object} options - Generation options (title, category, description, stats, etc.)
 * @returns {Promise<string>} Base64 Data URL string
 */
export async function generateOGImageDataURL(options = {}) {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  await renderBrandedOGCanvas(canvas, options);
  return canvas.toDataURL('image/png', 0.95);
}

/**
 * Generates an Open Graph Image as a Blob
 * 
 * @param {object} options - Generation options
 * @returns {Promise<Blob>} Image Blob
 */
export async function generateOGImageBlob(options = {}) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  await renderBrandedOGCanvas(canvas, options);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
  });
}

/**
 * Initiates an automatic browser file download of the generated 1200x630 card
 * 
 * @param {object} options - Card generation options
 * @param {string} [filename='seenomad-social-card.png'] - Download filename
 */
export async function downloadOGImage(options = {}, filename = 'seenomad-social-card.png') {
  const dataUrl = await generateOGImageDataURL(options);
  if (!dataUrl) return;

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * React Hook for automated Open Graph image generation and caching
 * 
 * @param {object} options - Options containing title, category, description, stats, etc.
 * @returns {object} { ogImageUrl, isLoading, error, refresh, download }
 */
export function useAutoOGImage(options = {}) {
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { title, category, description, stats, backgroundImageUrl, enabled = true, ...restOptions } = options;

  const generate = useCallback(async () => {
    if (!enabled || typeof document === 'undefined') return;
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateOGImageDataURL({
        title,
        category,
        description,
        stats,
        backgroundImageUrl,
        ...restOptions
      });
      setOgImageUrl(url);
    } catch (err) {
      console.error('Failed to generate Open Graph image canvas:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, description, stats, backgroundImageUrl, enabled]);

  useEffect(() => {
    generate();
  }, [generate]);

  const download = useCallback((filename) => {
    downloadOGImage({
      title,
      category,
      description,
      stats,
      backgroundImageUrl,
      ...options
    }, filename || `${(title || 'seenomad').toLowerCase().replace(/[^\w-]+/g, '-')}-card.png`);
  }, [title, category, description, stats, backgroundImageUrl, options]);

  return {
    ogImageUrl,
    isLoading,
    error,
    refresh: generate,
    download
  };
}

export default {
  OG_DIMENSIONS,
  renderBrandedOGCanvas,
  generateOGImageDataURL,
  generateOGImageBlob,
  downloadOGImage,
  useAutoOGImage
};
