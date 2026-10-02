import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Share2, Copy, Check, ExternalLink, Globe, Sparkles,
    Send, MessageCircle, Twitter, Linkedin, Mail, Smartphone,
    MapPin, Star, DollarSign, Zap
} from 'lucide-react';
import { getDestinationDomainName } from '../../../../utils/destinationDomainUtils';
import './DestinationShareDialog.css';

const DestinationShareDialog = ({ dest, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [hasSharedNative, setHasSharedNative] = useState(false);

    // Slug generation for direct canonical link
    const toSlug = (text) => (text || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destinationSlug = toSlug(dest?.name || '');

    // Canonical direct share URL
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = destinationSlug 
        ? `${origin}/explore/destinations/${destinationSlug}` 
        : (typeof window !== 'undefined' ? window.location.href : '');

    const shareTitle = `Explore ${dest?.name || 'Destination'} on SeeNomad`;
    const shareText = `Discover verified cost-of-living data, fiber internet speeds, and nomad community vibes in ${dest?.name || 'this city'}!`;

    const domainName = dest ? getDestinationDomainName(dest) : '';

    // Check if Web Share API is supported and can share
    const isNativeShareSupported = typeof navigator !== 'undefined' && Boolean(navigator.share);

    // Keyboard & scroll lock listener
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !dest) return null;

    // Direct Copy to Clipboard with fallback
    const handleCopyLink = async () => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = shareUrl;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2400);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // Native Web Share API trigger
    const handleNativeShare = async () => {
        if (!isNativeShareSupported) return;

        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl
            });
            setHasSharedNative(true);
            setTimeout(() => setHasSharedNative(false), 3000);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.warn('Native share error or dismissed:', err);
            }
        }
    };

    // Social Sharing Links
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(`${shareTitle} - ${shareText}`);

    const socialChannels = [
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: '#25D366',
            url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
        },
        {
            name: 'X (Twitter)',
            icon: Twitter,
            color: '#1DA1F2',
            url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        },
        {
            name: 'Telegram',
            icon: Send,
            color: '#0088cc',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            color: '#0077b5',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        },
        {
            name: 'Email',
            icon: Mail,
            color: '#ea4335',
            url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\nExplore here: ${shareUrl}`)}`
        }
    ];

    const dialogContent = (
        <div className="share-dialog-portal">
            {/* Backdrop */}
            <motion.div
                className="share-dialog-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
                className="share-dialog-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-dialog-title"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            >
                {/* Header */}
                <div className="share-dialog-header">
                    <div className="share-header-left">
                        <div className="share-header-icon-wrap">
                            <Share2 size={18} />
                        </div>
                        <div>
                            <h3 id="share-dialog-title" className="share-dialog-title">Share Destination</h3>
                            <p className="share-dialog-sub">Invite travel mates or share verified city intelligence</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="share-dialog-close-btn"
                        onClick={onClose}
                        title="Close (Esc)"
                        aria-label="Close dialog"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Destination Preview Card */}
                <div className="share-dest-preview">
                    <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="share-dest-img" 
                        loading="lazy" 
                    />
                    <div className="share-dest-meta">
                        <div className="share-dest-title-row">
                            <span className="share-dest-name">{dest.name}</span>
                            <div className="share-dest-rating">
                                <Star size={11} fill="#f59e0b" color="#f59e0b" />
                                <span>{dest.rating || '4.8'}</span>
                            </div>
                        </div>

                        <div className="share-dest-location">
                            <MapPin size={11} className="pin-icon" />
                            <span>{dest.location}</span>
                            <span className="sep">·</span>
                            <span className="share-category">{dest.category}</span>
                        </div>

                        <div className="share-dest-tags">
                            <span className="share-domain-tag">
                                <Globe size={10} />
                                <span>{domainName}</span>
                            </span>
                            <span className="share-price-tag">
                                {dest.price || '$1,400'}/mo est.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Primary Action 1: Native Share API (if available on platform) */}
                {isNativeShareSupported && (
                    <div className="share-native-section">
                        <button
                            type="button"
                            className="share-native-btn"
                            onClick={handleNativeShare}
                            title="Open native device sharing menu (AirDrop, Messages, etc.)"
                        >
                            <Smartphone size={16} className="native-phone-icon" />
                            <div className="native-btn-text">
                                <span className="btn-main-label">
                                    {hasSharedNative ? 'Shared Successfully!' : 'Share via Device Sheet'}
                                </span>
                                <span className="btn-sub-label">AirDrop, System Apps, Nearby Share</span>
                            </div>
                            <ExternalLink size={14} className="native-ext-icon" />
                        </button>
                    </div>
                )}

                {/* Primary Action 2: Direct Link Copy Field */}
                <div className="share-link-section">
                    <label htmlFor="share-direct-url" className="share-field-label">
                        Direct Canonical Link
                    </label>
                    <div className="share-input-group">
                        <input
                            id="share-direct-url"
                            type="text"
                            readOnly
                            value={shareUrl}
                            className="share-url-input"
                            onFocus={(e) => e.target.select()}
                            aria-label="Direct destination URL"
                        />
                        <button
                            type="button"
                            className={`share-copy-btn ${copied ? 'is-copied' : ''}`}
                            onClick={handleCopyLink}
                            title="Copy link to clipboard"
                            aria-label={copied ? "Link copied" : "Copy link to clipboard"}
                        >
                            {copied ? (
                                <>
                                    <Check size={14} />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Primary Action 3: Quick Direct Social Channels */}
                <div className="share-social-section">
                    <span className="share-social-label">Quick Share to Channels</span>
                    <div className="share-social-grid">
                        {socialChannels.map((channel) => {
                            const IconComponent = channel.icon;
                            return (
                                <a
                                    key={channel.name}
                                    href={channel.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-social-btn"
                                    title={`Share on ${channel.name}`}
                                    aria-label={`Share on ${channel.name}`}
                                >
                                    <div 
                                        className="social-icon-box"
                                        style={{ backgroundColor: `${channel.color}20`, color: channel.color }}
                                    >
                                        <IconComponent size={15} />
                                    </div>
                                    <span className="social-name">{channel.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Note & XP Reward Callout */}
                <div className="share-dialog-footer">
                    <div className="share-reward-callout">
                        <Zap size={13} className="zap-icon" />
                        <span>Share intelligence to earn <strong>+25 Explorer XP</strong></span>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return createPortal(dialogContent, document.body);
};

export default DestinationShareDialog;
