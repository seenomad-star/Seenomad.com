import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, SlidersHorizontal, Sun, CloudSun, Snowflake, Wind, Flame,
    DollarSign, Wifi, Globe2, RotateCcw, Check, Sparkles, Compass,
    Zap, ShieldCheck
} from 'lucide-react';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useNavStore } from '../../../store/navStore';
import './ExploreFilterDrawer.css';

export const CLIMATE_OPTIONS = [
    {
        id: 'tropical',
        label: 'Tropical & Beach',
        tempRange: '26°C – 32°C',
        desc: 'Year-round island warmth, ocean breeze & coastal hubs',
        icon: Sun
    },
    {
        id: 'mediterranean',
        label: 'Warm & Coastal',
        tempRange: '20°C – 27°C',
        desc: 'Sun-drenched coastal cities with mild winters',
        icon: CloudSun
    },
    {
        id: 'temperate',
        label: 'Mild & Temperate',
        tempRange: '15°C – 23°C',
        desc: 'Crisp spring-like city weather & cultural capitals',
        icon: Wind
    },
    {
        id: 'alpine',
        label: 'Alpine & Cold / Snow',
        tempRange: '-2°C – 16°C',
        desc: 'High-altitude mountain peaks, ski resorts & crisp air',
        icon: Snowflake
    },
    {
        id: 'arid',
        label: 'Arid & Desert Oasis',
        tempRange: '28°C – 36°C',
        desc: 'Dry desert sunshine, low humidity & starry nights',
        icon: Flame
    }
];

export const COST_INDEX_TIERS = [
    {
        id: 'budget',
        label: 'Ultra-Budget Index',
        range: '≤ $1,000 / mo',
        indexScore: 'Index 25–45',
        desc: 'High purchasing power, affordable villas & street food'
    },
    {
        id: 'mid-range',
        label: 'Moderate Nomad Index',
        range: '$1,000 – $2,500 / mo',
        indexScore: 'Index 46–75',
        desc: 'Balanced European & Asian hubs with modern amenities'
    },
    {
        id: 'luxury',
        label: 'Premium / Global Tier',
        range: '$2,500+ / mo',
        indexScore: 'Index 76–100',
        desc: 'Tier-1 financial capitals, luxury islands & ski resorts'
    }
];

export const INTERNET_SPEED_TIERS = [
    {
        id: 'standard',
        label: '50+ Mbps (Remote Ready)',
        minMbps: 50,
        desc: 'Smooth HD video calls, Slack & cloud workflows'
    },
    {
        id: 'fast',
        label: '100+ Mbps (High-Speed Fiber)',
        minMbps: 100,
        desc: 'Fast large file transfers, 4K streaming & multi-device'
    },
    {
        id: 'ultrafast',
        label: '200+ Mbps (Gigabit / Tech Hub)',
        minMbps: 200,
        desc: 'Ultra-low latency fiber for engineering & video production'
    }
];

export const REGION_OPTIONS = [
    { id: 'asia', label: 'Asia & Pacific' },
    { id: 'europe', label: 'Europe' },
    { id: 'americas', label: 'Americas' },
    { id: 'africa', label: 'Africa & Middle East' },
    { id: 'oceania', label: 'Oceania' }
];

const ExploreFilterDrawer = ({ isOpen, onClose, matchingCount = 0 }) => {
    const {
        advancedFilters,
        toggleAdvancedFilter,
        setMinInternetSpeed,
        setMaxMonthlyCost,
        selectedFilters,
        setSelectedFilters,
        resetFilters
    } = useDestinationStore();

    const { setGlobalSearchQuery, setGlobalActiveFilters } = useNavStore();

    const climates = advancedFilters.climates || [];
    const budgetRanges = advancedFilters.budgetRanges || [];
    const internetSpeeds = advancedFilters.internetSpeeds || [];
    const regions = advancedFilters.regions || [];
    const minInternetSpeed = advancedFilters.minInternetSpeed || 0;
    const maxMonthlyCost = advancedFilters.maxMonthlyCost || 12000;

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [isOpen]);

    const handleResetAll = () => {
        resetFilters();
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
    };

    const activeCount =
        climates.length +
        budgetRanges.length +
        internetSpeeds.length +
        regions.length +
        (minInternetSpeed > 0 ? 1 : 0) +
        (maxMonthlyCost < 12000 ? 1 : 0) +
        selectedFilters.length;

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="explore-filter-drawer-backdrop" onClick={onClose}>
                    <motion.aside
                        className="explore-filter-drawer-panel"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filter Destinations by Climate, Cost of Living, and Internet Speed"
                    >
                        {/* 1. Drawer Header */}
                        <header className="filter-drawer-header">
                            <div className="filter-drawer-title-group">
                                <div className="filter-drawer-icon-box">
                                    <SlidersHorizontal size={18} />
                                </div>
                                <div>
                                    <h2 className="filter-drawer-title">Destination Intelligence Filters</h2>
                                    <p className="filter-drawer-subtitle">
                                        Narrow down hubs by climate type, cost-of-living index & fiber speed
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="filter-drawer-close-btn"
                                onClick={onClose}
                                aria-label="Close filter panel"
                            >
                                <X size={18} />
                            </button>
                        </header>

                        {/* 2. Scrollable Filter Sections */}
                        <div className="filter-drawer-body">
                            {/* SECTION A: CLIMATE TYPE */}
                            <section className="filter-drawer-section" aria-label="Climate Type Filter">
                                <div className="filter-section-head">
                                    <div className="filter-section-label">
                                        <Sun size={16} className="f-sec-icon amber" />
                                        <h3>Climate Type & Weather Profile</h3>
                                    </div>
                                    {climates.length > 0 && (
                                        <span className="filter-section-active-count">
                                            {climates.length} selected
                                        </span>
                                    )}
                                </div>

                                <div className="climate-cards-grid">
                                    {CLIMATE_OPTIONS.map((climate) => {
                                        const Icon = climate.icon;
                                        const isSelected = climates.includes(climate.id);
                                        return (
                                            <button
                                                key={climate.id}
                                                type="button"
                                                className={`climate-filter-card ${isSelected ? 'active' : ''}`}
                                                onClick={() => toggleAdvancedFilter('climates', climate.id)}
                                                aria-pressed={isSelected}
                                            >
                                                <div className="climate-card-header-row">
                                                    <div className="climate-card-icon-wrap">
                                                        <Icon size={16} />
                                                    </div>
                                                    <div className="climate-card-title-block">
                                                        <span className="climate-card-name">{climate.label}</span>
                                                        <span className="climate-card-temp">{climate.tempRange}</span>
                                                    </div>
                                                    <div className={`climate-check-circle ${isSelected ? 'checked' : ''}`}>
                                                        {isSelected && <Check size={12} />}
                                                    </div>
                                                </div>
                                                <p className="climate-card-desc">{climate.desc}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* SECTION B: COST-OF-LIVING INDEX */}
                            <section className="filter-drawer-section" aria-label="Cost of Living Index Filter">
                                <div className="filter-section-head">
                                    <div className="filter-section-label">
                                        <DollarSign size={16} className="f-sec-icon emerald" />
                                        <h3>Cost-of-Living Index & Monthly Ceiling</h3>
                                    </div>
                                    <span className="filter-section-val-readout">
                                        {maxMonthlyCost < 12000 ? `Up to $${maxMonthlyCost.toLocaleString()}/mo` : 'Any Budget'}
                                    </span>
                                </div>

                                {/* Max Monthly Cost Slider */}
                                <div className="filter-slider-box">
                                    <div className="slider-top-labels">
                                        <span>Max Monthly Living Cost</span>
                                        <strong>
                                            {maxMonthlyCost >= 12000 ? 'No Limit ($12,000+)' : `$${maxMonthlyCost.toLocaleString()} / mo`}
                                        </strong>
                                    </div>
                                    <input
                                        type="range"
                                        min="400"
                                        max="12000"
                                        step="100"
                                        value={maxMonthlyCost}
                                        onChange={(e) => setMaxMonthlyCost(Number(e.target.value))}
                                        className="filter-range-slider emerald-slider"
                                        aria-label="Maximum monthly cost of living"
                                    />
                                    <div className="slider-scale-marks">
                                        <span>$400/mo</span>
                                        <span>$1,500/mo</span>
                                        <span>$3,000/mo</span>
                                        <span>$6,000/mo</span>
                                        <span>$12k+</span>
                                    </div>
                                </div>

                                {/* Cost Index Tiers */}
                                <div className="cost-tiers-stack">
                                    {COST_INDEX_TIERS.map((tier) => {
                                        const isSelected = budgetRanges.includes(tier.id);
                                        return (
                                            <button
                                                key={tier.id}
                                                type="button"
                                                className={`cost-tier-option-btn ${isSelected ? 'active' : ''}`}
                                                onClick={() => toggleAdvancedFilter('budgetRanges', tier.id)}
                                                aria-pressed={isSelected}
                                            >
                                                <div className="cost-tier-left">
                                                    <div className="cost-tier-title-line">
                                                        <span className="cost-tier-name">{tier.label}</span>
                                                        <span className="cost-tier-index-tag">{tier.indexScore}</span>
                                                    </div>
                                                    <span className="cost-tier-desc">{tier.desc}</span>
                                                </div>
                                                <div className="cost-tier-right">
                                                    <span className="cost-tier-range">{tier.range}</span>
                                                    <div className={`climate-check-circle ${isSelected ? 'checked' : ''}`}>
                                                        {isSelected && <Check size={12} />}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* SECTION C: INTERNET SPEED & CONNECTIVITY */}
                            <section className="filter-drawer-section" aria-label="Internet Speed Filter">
                                <div className="filter-section-head">
                                    <div className="filter-section-label">
                                        <Wifi size={16} className="f-sec-icon sky" />
                                        <h3>Verified Internet Speed & Fiber</h3>
                                    </div>
                                    <span className="filter-section-val-readout">
                                        {minInternetSpeed > 0 ? `${minInternetSpeed}+ Mbps` : 'Any Speed'}
                                    </span>
                                </div>

                                {/* Minimum Download Speed Slider */}
                                <div className="filter-slider-box">
                                    <div className="slider-top-labels">
                                        <span>Minimum Fiber Download Speed</span>
                                        <strong>{minInternetSpeed > 0 ? `${minInternetSpeed}+ Mbps` : 'Any Speed'}</strong>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="250"
                                        step="25"
                                        value={minInternetSpeed}
                                        onChange={(e) => setMinInternetSpeed(Number(e.target.value))}
                                        className="filter-range-slider sky-slider"
                                        aria-label="Minimum internet download speed in Mbps"
                                    />
                                    <div className="slider-scale-marks">
                                        <span>Any</span>
                                        <span>50 Mbps</span>
                                        <span>100 Mbps</span>
                                        <span>175 Mbps</span>
                                        <span>250+ Mbps</span>
                                    </div>
                                </div>

                                {/* Speed Tier Presets */}
                                <div className="speed-tiers-stack">
                                    {INTERNET_SPEED_TIERS.map((tier) => {
                                        const isSelected = internetSpeeds.includes(tier.id);
                                        return (
                                            <button
                                                key={tier.id}
                                                type="button"
                                                className={`speed-tier-option-btn ${isSelected ? 'active' : ''}`}
                                                onClick={() => toggleAdvancedFilter('internetSpeeds', tier.id)}
                                                aria-pressed={isSelected}
                                            >
                                                <div className="speed-tier-info">
                                                    <span className="speed-tier-name">{tier.label}</span>
                                                    <span className="speed-tier-desc">{tier.desc}</span>
                                                </div>
                                                <div className={`climate-check-circle ${isSelected ? 'checked' : ''}`}>
                                                    {isSelected && <Check size={12} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* SECTION D: GLOBAL REGIONS */}
                            <section className="filter-drawer-section" aria-label="World Region Filter">
                                <div className="filter-section-head">
                                    <div className="filter-section-label">
                                        <Globe2 size={16} className="f-sec-icon purple" />
                                        <h3>World Region</h3>
                                    </div>
                                </div>

                                <div className="region-chips-wrap">
                                    {REGION_OPTIONS.map((region) => {
                                        const isSelected = regions.includes(region.id);
                                        return (
                                            <button
                                                key={region.id}
                                                type="button"
                                                className={`region-filter-btn ${isSelected ? 'active' : ''}`}
                                                onClick={() => toggleAdvancedFilter('regions', region.id)}
                                                aria-pressed={isSelected}
                                            >
                                                {isSelected && <Check size={12} />}
                                                <span>{region.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>

                        {/* 3. Sticky Drawer Footer */}
                        <footer className="filter-drawer-footer">
                            <button
                                type="button"
                                className="filter-drawer-reset-btn"
                                onClick={handleResetAll}
                                disabled={activeCount === 0}
                            >
                                <RotateCcw size={14} />
                                <span>Reset All {activeCount > 0 ? `(${activeCount})` : ''}</span>
                            </button>

                            <button
                                type="button"
                                className="filter-drawer-apply-btn"
                                onClick={onClose}
                            >
                                <span>Show {matchingCount} {matchingCount === 1 ? 'Destination' : 'Destinations'}</span>
                            </button>
                        </footer>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ExploreFilterDrawer;
