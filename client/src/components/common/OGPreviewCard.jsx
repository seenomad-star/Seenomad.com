import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download, Copy, Check, Sparkles, RefreshCw, Image as ImageIcon, ExternalLink, Code } from 'lucide-react';
import {
  renderBrandedOGCanvas,
  generateOGImageBlob,
  downloadOGImage,
  OG_DIMENSIONS
} from '../../utils/ogImageGenerator';

/**
 * OGPreviewCard Component
 * 
 * Interactive component that renders an automated, high-resolution (1200x630)
 * branded Open Graph card using HTML5 Canvas for real-time social sharing previews.
 */
export const OGPreviewCard = ({
  title = 'SeeNomad – Digital Nomad Feed & Travel Intelligence',
  category = 'Travel Intelligence',
  description = 'Connect with a global nomad community. Access real-time city signals, Schengen visa calculations, vetted coliving hubs, and nomad meetups.',
  stats = null,
  backgroundImageUrl = null,
  canonicalUrl = null,
  className = '',
  showActions = true,
  interactive = true
}) => {
  const canvasRef = useRef(null);
  const [isRendering, setIsRendering] = useState(true);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'tags'

  const shareUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://seenomad.com');

  const renderCard = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsRendering(true);
    try {
      await renderBrandedOGCanvas(canvasRef.current, {
        title,
        category,
        description,
        stats,
        backgroundImageUrl
      });
    } catch (err) {
      console.error('Error rendering OG Preview Canvas:', err);
    } finally {
      setIsRendering(false);
    }
  }, [title, category, description, stats, backgroundImageUrl]);

  useEffect(() => {
    renderCard();
  }, [renderCard]);

  const handleDownload = () => {
    const slug = (title || 'seenomad')
      .toLowerCase()
      .replace(/[^\w-]+/g, '-')
      .slice(0, 40);
    downloadOGImage({
      title,
      category,
      description,
      stats,
      backgroundImageUrl
    }, `${slug}-og-card.png`);
  };

  const handleCopyImage = async () => {
    try {
      const blob = await generateOGImageBlob({
        title,
        category,
        description,
        stats,
        backgroundImageUrl
      });
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new window.ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      } else {
        // Fallback: download if copy image is not supported by browser
        handleDownload();
      }
    } catch (err) {
      console.warn('Clipboard copy image not supported, initiating download instead:', err);
      handleDownload();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMetaTags = () => {
    const metaString = [
      `<meta property="og:type" content="article" />`,
      `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`,
      `<meta property="og:description" content="${(description || '').replace(/"/g, '&quot;')}" />`,
      `<meta property="og:url" content="${shareUrl}" />`,
      `<meta property="og:image" content="${shareUrl}/og-image.png" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${title.replace(/"/g, '&quot;')}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`,
      `<meta name="twitter:description" content="${(description || '').replace(/"/g, '&quot;')}" />`
    ].join('\n');

    navigator.clipboard.writeText(metaString);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className={`og-preview-card-container rounded-2xl bg-neutral-900 border border-neutral-800 p-4 text-white ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Automated Open Graph Card</h4>
            <span className="text-[11px] text-neutral-400">1200 × 630 px • High-Resolution Social Preview</span>
          </div>
        </div>

        {interactive && (
          <div className="flex items-center bg-neutral-950 p-0.5 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-2.5 py-1 rounded-md transition ${activeTab === 'card' ? 'bg-neutral-800 text-teal-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`px-2.5 py-1 rounded-md transition ${activeTab === 'tags' ? 'bg-neutral-800 text-teal-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Meta Tags
            </button>
          </div>
        )}
      </div>

      {/* Main Preview Area */}
      <div className="my-3.5 relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-inner">
        {activeTab === 'card' ? (
          <div className="relative aspect-[1.905/1] w-full flex items-center justify-center">
            {isRendering && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 z-10">
                <RefreshCw className="animate-spin text-teal-400" size={24} />
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain select-none"
              style={{ maxHeight: '420px' }}
            />
          </div>
        ) : (
          <div className="p-4 font-mono text-xs text-neutral-300 overflow-x-auto bg-neutral-950 leading-relaxed max-h-[320px]">
            <div className="text-neutral-500 mb-2">// Injected Open Graph and Twitter Card tags</div>
            <p className="text-teal-300">&lt;meta property=&quot;og:type&quot; content=&quot;article&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta property=&quot;og:title&quot; content=&quot;{title}&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta property=&quot;og:description&quot; content=&quot;{description}&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta property=&quot;og:image:width&quot; content=&quot;1200&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta property=&quot;og:image:height&quot; content=&quot;630&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta property=&quot;og:image:alt&quot; content=&quot;{title}&quot; /&gt;</p>
            <p className="text-teal-300">&lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot; /&gt;</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition shadow-sm"
              title="Download 1200x630 high-res card for social media"
            >
              <Download size={14} />
              <span>Download Card</span>
            </button>
            <button
              onClick={handleCopyImage}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-medium transition border border-neutral-700/60"
              title="Copy card image to clipboard"
            >
              {copiedImage ? <Check size={14} className="text-teal-400" /> : <ImageIcon size={14} />}
              <span>{copiedImage ? 'Image Copied!' : 'Copy Image'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-medium transition border border-neutral-700/60"
              title="Copy page canonical share link"
            >
              {copiedLink ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Link'}</span>
            </button>
            <button
              onClick={handleCopyMetaTags}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-medium transition border border-neutral-700/60"
              title="Copy HTML meta tags"
            >
              {copiedTags ? <Check size={14} className="text-teal-400" /> : <Code size={14} />}
              <span>{copiedTags ? 'Tags Copied' : 'Meta Tags'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OGPreviewCard;
