import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlatformBanner.css';

const PlatformBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="platform-banner-card">
            <div className="platform-banner-content">
                <div className="platform-banner-badge">
                    <Sparkles size={11} className="badge-sparkle" />
                    <span>KNOWLEDGE ECONOMY PLATFORM</span>
                </div>
                <h3 className="platform-banner-title">
                    The Infrastructure Layer for Global Travel Intelligence
                </h3>
                <p className="platform-banner-text">
                    Explore curated nomad itineraries, real-time visa updates, verified cafe speeds, and community-driven guides.
                </p>
                <button
                    type="button"
                    className="platform-banner-action"
                    onClick={() => navigate('/explore')}
                >
                    <span>Explore</span>
                    <ArrowRight size={14} />
                </button>
            </div>
            <div className="platform-banner-glow" aria-hidden="true" />
        </div>
    );
};

export default PlatformBanner;
