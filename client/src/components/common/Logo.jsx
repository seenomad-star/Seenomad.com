import React from 'react';
import { Compass, ChevronDown } from 'lucide-react';
import logoImage from '../../assets/images/seenomad-logo.jpg';
import './Logo.css';

const Logo = ({
    size = 'medium',
    showText = true,
    showHub = false,
    isHubOpen = false,
    onHubClick,
    className = '',
    onClick
}) => {
    const sizeClasses = {
        small: 'logo-small',
        medium: 'logo-medium',
        large: 'logo-large'
    };

    return (
        <div className={`seenomad-brand-group ${showHub ? 'with-hub' : ''} ${className}`}>
            <div
                className={`seenomad-logo ${sizeClasses[size]}`}
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
                title="Seenomad Home"
            >
                <div className="logo-image-wrapper">
                    <img src={logoImage} alt="Seenomad Logo" className="logo-image" />
                    {showHub && (
                        <button
                            type="button"
                            className="mobile-hub-badge-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onHubClick?.();
                            }}
                            title="Open Seenomad Travel Hub"
                            aria-label="Open Seenomad Travel Hub"
                        >
                            <Compass size={11} className="mobile-hub-icon" />
                        </button>
                    )}
                </div>

                {showText && (
                    <div className="logo-text">
                        <span className="logo-name">Seenomad</span>
                        <span className="logo-badge">V3</span>
                    </div>
                )}
            </div>

            {showHub && (
                <button
                    type="button"
                    className={`brand-hub-btn ${isHubOpen ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onHubClick?.();
                    }}
                    aria-label="Toggle Travel Hub & Trip Launcher"
                    aria-expanded={isHubOpen}
                    title="Explore Destinations, Visas, AI Agents & Travel Hub"
                >
                    <span className="brand-hub-divider" aria-hidden="true" />
                    <Compass size={15} className="brand-hub-icon" />
                    <span className="brand-hub-label">Travel Hub</span>
                    <ChevronDown size={13} className={`brand-hub-chevron ${isHubOpen ? 'open' : ''}`} />
                </button>
            )}
        </div>
    );
};

export default Logo;
