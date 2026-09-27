import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CookieConsentBanner.css';

const CookieConsentBanner = () => {
    const [hasConsented, setHasConsented] = useState(true); // default true to avoid flash before check

    useEffect(() => {
        const storedConsent = localStorage.getItem('seenomad_cookie_consent');
        if (!storedConsent) {
            setHasConsented(false);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('seenomad_cookie_consent', JSON.stringify({
            accepted: true,
            analytics: true,
            marketing: true,
            adsense: true,
            date: new Date().toISOString()
        }));
        setHasConsented(true);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('seenomad_cookie_consent', JSON.stringify({
            accepted: true,
            analytics: false,
            marketing: false,
            adsense: false,
            date: new Date().toISOString()
        }));
        setHasConsented(true);
    };

    if (hasConsented) return null;

    return (
        <div className="cookie-consent-overlay" role="dialog" aria-live="polite" aria-label="Cookie Consent Notice">
            <div className="cookie-consent-card">
                <div className="cookie-icon-col">
                    <div className="cookie-badge">
                        <Cookie size={22} className="cookie-spin-icon" />
                    </div>
                </div>

                <div className="cookie-content-col">
                    <div className="cookie-title-row">
                        <h4 className="cookie-title">SeeNomad Privacy & Cookie Choices</h4>
                        <span className="cookie-compliance-pill">GDPR & AdSense Compliant</span>
                    </div>
                    <p className="cookie-desc">
                        We and our advertising partners (including Google AdSense) use cookies and similar technologies to store and access device information, deliver personalized travel recommendations, prevent fraud, and serve non-intrusive, relevant advertisements. You can accept all or customize preferences at any time in our{' '}
                        <Link to="/legal?tab=cookies" className="cookie-link">
                            Cookie Policy
                        </Link>{' '}
                        and{' '}
                        <Link to="/legal?tab=privacy" className="cookie-link">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>

                <div className="cookie-actions-col">
                    <button
                        type="button"
                        onClick={handleAcceptAll}
                        className="cookie-btn cookie-btn-accept"
                    >
                        Accept All
                    </button>
                    <button
                        type="button"
                        onClick={handleAcceptEssential}
                        className="cookie-btn cookie-btn-essential"
                    >
                        Essential Only
                    </button>
                    <Link
                        to="/legal?tab=cookies"
                        onClick={() => setHasConsented(true)}
                        className="cookie-btn cookie-btn-manage"
                    >
                        <Settings size={14} /> Preferences
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;
