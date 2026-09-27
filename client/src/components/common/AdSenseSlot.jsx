import React, { useEffect, useRef, useState } from 'react';
import { Megaphone, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import './AdSenseSlot.css';

/**
 * AdSenseSlot - Google AdSense Policy Compliant Display Ad Container
 * 
 * Supports:
 * - format: 'horizontal' (728x90 leaderboard / in-feed)
 * - format: 'rectangle' (300x250 or 336x280)
 * - format: 'vertical' (300x600 half-page / sidebar)
 * - format: 'auto' (Fluid responsive banner)
 */
const AdSenseSlot = ({
    client = 'ca-pub-0000000000000000',
    slot = '1234567890',
    format = 'auto',
    responsive = 'true',
    className = '',
    label = 'Advertisement'
}) => {
    const adRef = useRef(null);
    const [adLoaded, setAdLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle && client !== 'ca-pub-0000000000000000') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdLoaded(true);
            }
        } catch (e) {
            console.warn('AdSenseSlot initialized in sandbox/preview mode:', e);
            setHasError(true);
        }
    }, [client, slot]);

    // Format dimensions
    const formatStyles = {
        horizontal: { minHeight: '90px' },
        rectangle: { minHeight: '250px', maxWidth: '336px' },
        vertical: { minHeight: '600px', maxWidth: '300px' },
        auto: { minHeight: '100px' }
    };

    const isPreviewOrSandbox = client === 'ca-pub-0000000000000000' || !adLoaded;

    return (
        <div className={`adsense-wrapper adsense-format-${format} ${className}`}>
            {/* Google AdSense Policy Mandatory Label */}
            <div className="adsense-label-row">
                <span className="adsense-mandatory-label">{label}</span>
                <a 
                    href="/legal?tab=adsense" 
                    className="adsense-disclosure-link" 
                    title="Learn more about SeeNomad advertising policies"
                >
                    Ad Choices <ExternalLink size={10} />
                </a>
            </div>

            <div className="adsense-slot-container" style={formatStyles[format] || {}}>
                {isPreviewOrSandbox ? (
                    <div className="adsense-preview-placeholder">
                        <div className="adsense-placeholder-badge">
                            <Megaphone size={16} />
                            <span>Google AdSense Slot</span>
                        </div>
                        <div className="adsense-placeholder-content">
                            <span className="adsense-slot-spec">Format: {format.toUpperCase()} • Responsive</span>
                            <p className="adsense-slot-hint">
                                Compliant with Google AdSense Policies. Live ads render here once your Publisher ID (ca-pub-XXXXX) is active.
                            </p>
                        </div>
                        <div className="adsense-placeholder-footer">
                            <span className="adsense-badge-verified">
                                <ShieldCheck size={12} /> Google Publisher Ready
                            </span>
                        </div>
                    </div>
                ) : (
                    <ins
                        ref={adRef}
                        className="adsbygoogle"
                        style={{ display: 'block', width: '100%', height: '100%' }}
                        data-ad-client={client}
                        data-ad-slot={slot}
                        data-ad-format={format}
                        data-full-width-responsive={responsive}
                    />
                )}
            </div>
        </div>
    );
};

export default AdSenseSlot;
