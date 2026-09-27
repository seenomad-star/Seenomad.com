import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EarlyAccessBanner.css';

const STORAGE_KEY = 'seenomad_early_access_dismissed_v3';

const EarlyAccessBanner = () => {
    const [isDismissed, setIsDismissed] = useState(true);

    useEffect(() => {
        try {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (!dismissed) {
                setIsDismissed(false);
            }
        } catch {
            setIsDismissed(false);
        }
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
            // ignore
        }
    };

    if (isDismissed) return null;

    return (
        <aside className="early-access-banner" aria-label="Early Access Preview Notice">
            <div className="banner-inner">
                <div className="banner-content">
                    <span className="banner-kicker">
                        <Sparkles size={14} className="banner-icon" />
                        <span>Seenomad v3 Early Access</span>
                    </span>
                    <span className="banner-separator" aria-hidden="true">·</span>
                    <span className="banner-message">
                        Featuring real-time community pulse, rolling Schengen 90/180 day tracker, and daily NMD token rewards.
                    </span>
                </div>
                <div className="banner-actions">
                    <Link to="/explore/visa" className="banner-link">
                        Try Schengen Tracker <ArrowRight size={13} />
                    </Link>
                    <button 
                        type="button" 
                        onClick={handleDismiss} 
                        className="banner-close-btn"
                        aria-label="Dismiss early access notification"
                    >
                        <X size={15} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default EarlyAccessBanner;
