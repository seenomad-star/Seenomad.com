import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    X, SlidersHorizontal, Sun, CloudSun, Snowflake, Flame,
    DollarSign, Wifi, Globe2, RotateCcw, Check, Sparkles,
    Zap, Thermometer, TrendingDown
} from 'lucide-react';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useNavStore } from '../../../store/navStore';
import './ExploreFilterSlidePanel.css';

export const CLIMATE_TYPES = [
    {
        id: 'tropical',
        label: 'Tropical & Coastal',
        range: '26°C – 32°C',
        desc: 'Warm beaches, islands & monsoon breezes',
        icon: Sun
    },
    {
        id: 'temperate',
        label: 'Temperate & Mild',
        range: '18°C – 25°C',
        desc: 'Mediterranean & eternal spring cities',
        icon: CloudSun
    },
    {
        id: 'arid',
        label: 'Arid & Desert Sun',
        range: '28°C – 36°C',
        desc: 'Dry oases, low humidity & desert hubs',
        icon: Flame
    },
    {
        id: 'alpine',
        label: 'Alpine & Cool',
        range: '5°C – 17°C',
        desc: 'Mountain retreats, crisp air & snow peaks',
        icon: Snowflake
    }
];

export const COST_OF_LIVING_TIERS = [
    {
        id: 'budget',
        label: 'Low Cost Index',
        sub: 'Under $1,200 / mo',
        badge: 'High Savings',
        maxCost: 1200
    },
    {
        id: 'mid-range',
        label: 'Moderate Index',
        sub: '$1,200 – $2,200 / mo',
        badge: 'Balanced Value',
        maxCost: 2200
    },
    {
        id: 'luxury',
        label: 'Premium / Western',
        sub: '$2,200+ / mo',
        badge: 'Global Hubs',
        maxCost: 5000
    }
];

export const INTERNET_SPEED_TIERS = [
    {
        id: 'standard',
        label: '50+ Mbps',
        sub: 'HD Calls & Remote Work',
        minMbps: 50
    },
    {
        id: 'fast',
        label: '150+ Mbps',
        sub: 'Fast Fiber & Cloud Sync',
        minMbps: 150
    },
    {
        id: 'ultrafast',
        label: '250+ Mbps',
        sub: 'Gigabit Hubs & 4K Creator',
        minMbps: 250
    }
];

export const REGIONS_LIST = [
    { id: 'asia', label: 'Asia' },
    { id: 'europe', label: 'Europe' },
    { id: 'americas', label: 'Americas' },
    { id: 'africa', label: 'Africa' },
    { id: 'oceania', label: 'Oceania' }
];

const ExploreFilterSlidePanel = ({ totalResults = 0 }) => {
    const {
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        advancedFilters,
        toggleAdvancedFilter,
        setMinInternetSpeed,
        setMaxMonthlyCost,
        resetFilters,
        selectedFilters,
        domainStatus,
        searchQuery
    } = useDestinationStore();

    const { setGlobalSearchQuery, setGlobalActiveFilters } = useNavStore();

    const climates = advancedFilters.climates || [];
    const budgetRanges = advancedFilters.budgetRanges || [];
    const internetSpeeds = advancedFilters.internetSpeeds || [];
    const regions = advancedFilters.regions || [];
    const minInternetSpeed = advancedFilters.minInternetSpeed ?? 0;
    const maxMonthlyCost = advancedFilters.maxMonthlyCost ?? 5000;

    // Close on Escape key & lock body scroll when open
    useEffect(() => {
        if (!isFilterDrawerOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsFilterDrawerOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isFilterDrawerOpen, setIsFilterDrawerOpen]);

    if (!isFilterDrawerOpen) return null;

    const handleResetAll = () => {
        resetFilters();
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
    };

    const activeDrawerFilterCount =
        climates.length +
        budgetRanges.length +
        internetSpeeds.length +
        regions.length +
        (minInternetSpeed > 0 ? 1 : 0) +
        (maxMonthlyCost < 5000 ? 1 : 0) +
        selectedFilters.length +
        (domainStatus && domainStatus !== 'all' ? 1 : 0) +
        (searchQuery ? 1 : 0);

    const handleInternetTierClick = (tier) => {
        toggleAdvancedFilter('internetSpeeds', tier.id);
    };

    const drawerContent = (
        <div
            className="explore-filter-drawer-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsFilterDrawerOpen(false);
                }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Destination Filter Panel"
        >
            <aside className="explore-filter-slide-panel" id="explore-filter-slide-panel">
                {/* Sticky Top Header */}
                <header className="filter-slide-header">
                    <div className="filter-slide-title-group">
                        <div className="filter-slide-icon-badge">
                            <SlidersHorizontal size={18} />
                        </div>
                        <div>
                            <h2 className="filter-slide-title">Filter Destinations</h2>
                            <p className="filter-slide-subtitle">
                                Narrow by climate type, cost-of-living index & fiber speed
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="filter-slide-close-btn"
                        onClick={() => setIsFilterDrawerOpen(false)}
                        aria-label="Close filter panel"
                    >
                        <X size={18} />
                    </button>
                </header>

                {/* Scrollable Filter Sections */}
                <div className="filter-slide-body">
                    {/* 1. Climate Type Section */}
                    <section className="filter-slide-section">
                        <div className="filter-section-header">
                            <div className="filter-section-label">
                                <Thermometer size={15} className="section-icon climate-icon" />
                                <span>Climate Type</span>
                            </div>
                            {climates.length > 0 && (
                                <span className="filter-section-count">{climates.length} selected</span>
                            )}
                        </div>
                        <div className="climate-cards-grid">
                            {CLIMATE_TYPES.map((climate) => {
                                const Icon = climate.icon;
                                const isSelected = climates.includes(climate.id);
                                return (
                                    <button
                                        key={climate.id}
                                        type="button"
                                        onClick={() => toggleAdvancedFilter('climates', climate.id)}
                                        className={`climate-filter-card ${isSelected ? 'active' : ''}`}
                                        aria-pressed={isSelected}
                                    >
                                        <div className="climate-card-top">
                                            <div className={`climate-icon-wrap ${climate.id}`}>
                                                <Icon size={16} />
                                            </div>
                                            <span className="climate-temp-badge">{climate.range}</span>
                                        </div>
                                        <div className="climate-card-title">{climate.label}</div>
                                        <div className="climate-card-desc">{climate.desc}</div>
                                        {isSelected && (
                                            <div className="climate-card-check">
                                                <Check size={12} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* 2. Cost-of-Living Index Section */}
                    <section className="filter-slide-section">
                        <div className="filter-section-header">
                            <div className="filter-section-label">
                                <DollarSign size={15} className="section-icon cost-icon" />
                                <span>Cost-of-Living Index</span>
                            </div>
                            <span className="filter-live-value">
                                {maxMonthlyCost < 5000 ? `Up to $${maxMonthlyCost.toLocaleString()}/mo` : 'Any Budget'}
                            </span>
                        </div>

                        {/* Monthly Cost Ceiling Slider */}
                        <div className="filter-range-control">
                            <div className="range-labels-row">
                                <span>Max Monthly Living Cost</span>
                                <strong>
                                    {maxMonthlyCost >= 5000
                                        ? '$5,000+ / mo (No Limit)'
                                        : `≤ $${maxMonthlyCost.toLocaleString()} / mo`}
                                </strong>
                            </div>
                            <input
                                type="range"
                                min={800}
                                max={5000}
                                step={100}
                                value={maxMonthlyCost}
                                onChange={(e) => setMaxMonthlyCost(Number(e.target.value))}
                                className="explore-range-slider cost-slider"
                                aria-label="Maximum monthly cost of living"
                            />
                            <div className="range-ticks">
                                <span>$800</span>
                                <span>$1,500</span>
                                <span>$2,500</span>
                                <span>$3,500</span>
                                <span>$5,000+</span>
                            </div>
                        </div>

                        {/* Cost Index Tier Cards */}
                        <div className="cost-tiers-stack">
                            {COST_OF_LIVING_TIERS.map((tier) => {
                                const isSelected = budgetRanges.includes(tier.id);
                                return (
                                    <button
                                        key={tier.id}
                                        type="button"
                                        onClick={() => toggleAdvancedFilter('budgetRanges', tier.id)}
                                        className={`cost-tier-item ${isSelected ? 'active' : ''}`}
                                        aria-pressed={isSelected}
                                    >
                                        <div className="cost-tier-left">
                                            <div className="cost-tier-checkbox">
                                                {isSelected && <Check size={12} />}
                                            </div>
                                            <div>
                                                <div className="cost-tier-title">{tier.label}</div>
                                                <div className="cost-tier-sub">{tier.sub}</div>
                                            </div>
                                        </div>
                                        <span className={`cost-tier-badge ${tier.id}`}>
                                            <TrendingDown size={11} />
                                            {tier.badge}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* 3. Internet Speed & Connectivity Section */}
                    <section className="filter-slide-section">
                        <div className="filter-section-header">
                            <div className="filter-section-label">
                                <Wifi size={15} className="section-icon wifi-icon" />
                                <span>Internet Speed (Fiber & 5G)</span>
                            </div>
                            <span className="filter-live-value wifi">
                                {minInternetSpeed > 0 ? `${minInternetSpeed}+ Mbps` : 'Any Speed'}
                            </span>
                        </div>

                        {/* Minimum Download Speed Slider */}
                        <div className="filter-range-control">
                            <div className="range-labels-row">
                                <span>Minimum Download Speed</span>
                                <strong>
                                    {minInternetSpeed === 0
                                        ? 'All Speeds'
                                        : `≥ ${minInternetSpeed} Mbps`}
                                </strong>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={250}
                                step={25}
                                value={minInternetSpeed}
                                onChange={(e) => setMinInternetSpeed(Number(e.target.value))}
                                className="explore-range-slider wifi-slider"
                                aria-label="Minimum internet download speed in Mbps"
                            />
                            <div className="range-ticks">
                                <span>Any</span>
                                <span>50 Mbps</span>
                                <span>125 Mbps</span>
                                <span>200 Mbps</span>
                                <span>250+ Mbps</span>
                            </div>
                        </div>

                        {/* Speed Tier Chips */}
                        <div className="internet-tiers-grid">
                            {INTERNET_SPEED_TIERS.map((tier) => {
                                const isSelected = internetSpeeds.includes(tier.id);
                                return (
                                    <button
                                        key={tier.id}
                                        type="button"
                                        onClick={() => handleInternetTierClick(tier)}
                                        className={`internet-tier-card ${isSelected ? 'active' : ''}`}
                                        aria-pressed={isSelected}
                                    >
                                        <div className="internet-tier-header">
                                            <Zap size={13} className="tier-zap-icon" />
                                            <span className="internet-tier-speed">{tier.label}</span>
                                            {isSelected && <Check size={12} className="tier-check" />}
                                        </div>
                                        <span className="internet-tier-desc">{tier.sub}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* 4. Global Regions Section */}
                    <section className="filter-slide-section">
                        <div className="filter-section-header">
                            <div className="filter-section-label">
                                <Globe2 size={15} className="section-icon region-icon" />
                                <span>World Region</span>
                            </div>
                            {regions.length > 0 && (
                                <span className="filter-section-count">{regions.length} selected</span>
                            )}
                        </div>
                        <div className="region-pills-wrap">
                            {REGIONS_LIST.map((reg) => {
                                const isSelected = regions.includes(reg.id);
                                return (
                                    <button
                                        key={reg.id}
                                        type="button"
                                        onClick={() => toggleAdvancedFilter('regions', reg.id)}
                                        className={`slide-region-pill ${isSelected ? 'active' : ''}`}
                                        aria-pressed={isSelected}
                                    >
                                        {isSelected && <Check size={12} />}
                                        <span>{reg.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Sticky Footer Actions */}
                <footer className="filter-slide-footer">
                    <button
                        type="button"
                        onClick={handleResetAll}
                        className="filter-slide-reset-btn"
                        disabled={activeDrawerFilterCount === 0}
                    >
                        <RotateCcw size={14} />
                        <span>Reset All</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsFilterDrawerOpen(false)}
                        className="filter-slide-apply-btn"
                        id="apply-slide-filters-btn"
                    >
                        <Sparkles size={15} />
                        <span>
                            Show {totalResults} {totalResults === 1 ? 'Destination' : 'Destinations'}
                        </span>
                    </button>
                </footer>
            </aside>
        </div>
    );

    return createPortal(drawerContent, document.body);
};

export default ExploreFilterSlidePanel;
