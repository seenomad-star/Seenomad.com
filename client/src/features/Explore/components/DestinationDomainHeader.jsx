import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Globe,
    Compass,
    Sparkles,
    Shield,
    Wifi,
    DollarSign,
    Zap,
    MapPin,
    ArrowRight,
    ArrowLeftRight,
    SlidersHorizontal,
    Palmtree,
    Mountain,
    Laptop,
    CheckCircle2
} from 'lucide-react';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import './DestinationDomainHeader.css';

const QUICK_PRESETS = [
    { id: 'nomad-hub', label: 'Top Nomad Hubs', icon: Laptop, badge: 'Hot' },
    { id: 'beach', label: 'Beach Paradises', icon: Palmtree },
    { id: 'mountain', label: 'Mountain Escapes', icon: Mountain },
    { id: 'cheap', label: 'Budget Under $1k', icon: DollarSign, badge: 'Save' },
    { id: 'fast-internet', label: '100+ Mbps Wi-Fi', icon: Wifi },
    { id: 'visa-friendly', label: 'Visa-Friendly', icon: Shield, badge: 'Easy' },
    { id: 'trending', label: 'Trending Worldwide', icon: Zap }
];

const DestinationDomainHeader = ({
    activeFilters = [],
    onSelectPreset,
    totalDestinations = 195
}) => {
    const navigate = useNavigate();
    const { setIsCompareModalOpen, setIsFilterDrawerOpen } = useDestinationStore();

    return (
        <header className="destination-domain-hero" role="banner" aria-label="Destinations Domain Overview">
            <div className="domain-hero-glow aura-blue"></div>
            <div className="domain-hero-glow aura-purple"></div>

            <div className="domain-hero-main">
                <div className="domain-title-content">
                    <h1 className="domain-title">
                        Explore Global Destinations <span className="title-gradient">& Nomad Hubs</span>
                    </h1>
                    <p className="domain-subtitle">
                        Discover verified cost-of-living data, fiber internet speeds, community vibes, and real-time visa guidelines for nomadic explorers and global citizens.
                    </p>
                </div>

                {/* Key Metric Counters */}
                <div className="domain-stats-grid">
                    <div className="domain-stat-card">
                        <div className="stat-number">195+</div>
                        <div className="stat-label">Countries Indexed</div>
                    </div>
                    <div className="domain-stat-card">
                        <div className="stat-number">850+</div>
                        <div className="stat-label">Nomad Cities</div>
                    </div>
                    <div className="domain-stat-card highlight">
                        <div className="stat-number">98.4%</div>
                        <div className="stat-label">Visa Accuracy</div>
                    </div>
                    <div className="domain-stat-card">
                        <div className="stat-number">100+ Mbps</div>
                        <div className="stat-label">Avg Hub Speed</div>
                    </div>
                </div>
            </div>

            {/* Quick Filter Curations Bar */}
            <div className="domain-preset-strip">
                <span className="preset-strip-title">Quick Discovery:</span>
                <div className="preset-chips-scroll">
                    {QUICK_PRESETS.map((preset) => {
                        const Icon = preset.icon;
                        const isSelected = activeFilters.includes(preset.id);
                        return (
                            <button
                                key={preset.id}
                                type="button"
                                onClick={() => onSelectPreset && onSelectPreset(preset.id)}
                                className={`domain-preset-chip ${isSelected ? 'active' : ''}`}
                                aria-pressed={isSelected}
                            >
                                <Icon size={13} />
                                <span>{preset.label}</span>
                                {preset.badge && (
                                    <span className="preset-chip-badge">{preset.badge}</span>
                                )}
                                {isSelected && <CheckCircle2 size={12} className="check-icon" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Domain Feature Navigation Bar */}
            <div className="domain-feature-nav-bar">
                <div className="feature-nav-links">
                    <button
                        type="button"
                        onClick={() => setIsFilterDrawerOpen(true)}
                        className="feature-nav-btn ai-special"
                    >
                        <SlidersHorizontal size={14} />
                        <span>Filter by Climate, Cost & Speed</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsCompareModalOpen(true)}
                        className="feature-nav-btn ai-special"
                    >
                        <ArrowLeftRight size={14} />
                        <span>Compare Destinations</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/explore/visa')}
                        className="feature-nav-btn"
                    >
                        <Shield size={14} />
                        <span>Visa Intelligence Hub</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/explore/speed-test')}
                        className="feature-nav-btn"
                    >
                        <Wifi size={14} />
                        <span>Nomad Wi-Fi Speed Map</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/explore/multi-city')}
                        className="feature-nav-btn"
                    >
                        <Compass size={14} />
                        <span>Multi-City Route Planner</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/explore/triipper')}
                        className="feature-nav-btn ai-special"
                    >
                        <Sparkles size={14} />
                        <span>Triipper AI Copilot</span>
                        <ArrowRight size={12} className="arrow" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DestinationDomainHeader;
