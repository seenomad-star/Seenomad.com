import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    X, MapPin, Star, Wifi, DollarSign, CloudSun, Sun, CloudRain, Wind,
    ShieldCheck, Users, Activity, Globe, Heart, Share2, ExternalLink,
    TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, MoveRight,
    Zap, Check, ArrowRight, Sparkles, Building2, Coffee,
    Smartphone, Compass, Info
} from 'lucide-react';
import { getDestinationIntelligence } from '../../../../utils/destinationIntelligenceUtils';
import { getDestinationDomainName, getDestinationDomainStatus } from '../../../../utils/destinationDomainUtils';
import useCardActions from '../../../../hooks/useCardActions';
import './DestinationIntelligenceDrawer.css';

const DestinationIntelligenceDrawer = ({ dest, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('weather');
    const [tempUnit, setTempUnit] = useState('C'); // 'C' | 'F'
    const [budgetMode, setBudgetMode] = useState('nomad'); // 'budget' | 'nomad' | 'founder'
    const [copiedShare, setCopiedShare] = useState(false);

    const intel = getDestinationIntelligence(dest);
    const domainName = getDestinationDomainName(dest);
    const domainStatus = getDestinationDomainStatus(dest);
    const { state, handlers } = useCardActions(dest);

    // Slug generation for navigation
    const toSlug = (text) => (text || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destinationSlug = toSlug(dest?.name || '');

    // Keyboard & body scroll listeners
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

    if (!isOpen || !dest || !intel) return null;

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dest.name}, ${dest.location}`)}`;

    const handleNavigateFull = () => {
        onClose();
        if (destinationSlug) {
            navigate(`/explore/destinations/${destinationSlug}`);
        }
    };

    const handleShare = (e) => {
        handlers.shareContent(e, `Intelligence Report for ${dest.name}`);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
    };

    // Temperature formatting helper with clean Celsius <-> Fahrenheit conversion
    const renderTemp = (celsius, fahrenheit) => {
        if (celsius === undefined || celsius === null) return '--';
        const cNum = typeof celsius === 'number' ? celsius : parseInt(String(celsius).replace(/[^0-9.-]/g, ''), 10);
        if (isNaN(cNum)) return celsius;
        if (tempUnit === 'C') {
            return `${cNum}°C`;
        }
        const fNum = typeof fahrenheit === 'number' 
            ? fahrenheit 
            : Math.round((cNum * 9) / 5 + 32);
        return `${fNum}°F`;
    };

    // Weather icon selector
    const getWeatherIcon = (iconName, size = 20) => {
        switch (iconName) {
            case 'Sun': return <Sun size={size} className="weather-icon-sun" />;
            case 'CloudSun': return <CloudSun size={size} className="weather-icon-cloudsun" />;
            case 'CloudRain': return <CloudRain size={size} className="weather-icon-rain" />;
            case 'Wind': return <Wind size={size} className="weather-icon-wind" />;
            default: return <Sun size={size} className="weather-icon-sun" />;
        }
    };

    // Dynamic cost multiplier based on budget mode
    const getMultiplier = () => {
        if (budgetMode === 'budget') return 0.75;
        if (budgetMode === 'founder') return 1.6;
        return 1.0;
    };

    const multiplier = getMultiplier();
    const baseMonthly = parseInt(intel.costs.totalEstimated.replace(/[^0-9]/g, ''), 10) || 1400;
    const adjustedTotal = Math.round(baseMonthly * multiplier);

    // Economic shift & cost velocity telemetry
    const costTrend = intel.costs?.trend || {
        direction: 'stable',
        change: '±0.0%',
        period: 'Quarterly',
        label: 'Stable Economic Index',
        description: 'Consistent local inflation and balanced nomad accommodation rates.'
    };

    const drawerContent = (
        <div className="intelligence-drawer-portal">
            {/* Backdrop Blur */}
            <motion.div
                className="intelligence-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-over Content Container */}
            <motion.aside
                className="intelligence-drawer-panel"
                role="dialog"
                aria-modal="true"
                aria-label={`In-Depth Intelligence Report for ${dest.name}`}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
                {/* 1. Header Banner & Hero Canvas */}
                <div className="drawer-header-hero">
                    <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="drawer-hero-bg" 
                        loading="lazy"
                    />
                    <div className="drawer-hero-scrim" />

                    {/* Top Action Bar */}
                    <div className="drawer-top-nav">
                        <div className="drawer-nav-badges">
                            <span className="drawer-category-badge">{dest.category}</span>
                            <div className="drawer-domain-chip">
                                <Globe size={11} />
                                <span>{domainName}</span>
                                <span className={`domain-dot dot-${domainStatus.toLowerCase()}`} />
                            </div>
                        </div>

                        <div className="drawer-nav-actions">
                            <button
                                type="button"
                                className={`drawer-icon-btn ${state.isSaved ? 'is-saved' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlers.toggleSave(e);
                                }}
                                title={state.isSaved ? "Saved to Wishlist" : "Save Destination"}
                                aria-label="Save"
                            >
                                <Heart size={15} fill={state.isSaved ? "#ef4444" : "none"} color={state.isSaved ? "#ef4444" : "currentColor"} />
                            </button>

                            <button
                                type="button"
                                className="drawer-icon-btn"
                                onClick={handleShare}
                                title="Share Intelligence"
                                aria-label="Share"
                            >
                                {copiedShare ? <Check size={15} color="#10b981" /> : <Share2 size={15} />}
                            </button>

                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="drawer-icon-btn"
                                title="Open Google Maps"
                                aria-label="Maps"
                            >
                                <ExternalLink size={15} />
                            </a>

                            <button
                                type="button"
                                className="drawer-close-btn"
                                onClick={onClose}
                                title="Close Slide-Over (Esc)"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Destination Title & Location Summary */}
                    <div className="drawer-hero-content">
                        <div className="drawer-title-row">
                            <h2 className="drawer-dest-name">{dest.name}</h2>
                            <div className="drawer-rating-pill">
                                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                                <span>{dest.rating || '4.8'}</span>
                                <span className="rating-count">({dest.reviewsCount || '124'})</span>
                            </div>
                        </div>

                        <div className="drawer-location-row">
                            <MapPin size={13} className="pin-icon" />
                            <span>{dest.location}</span>
                            <span className="sep">·</span>
                            <span className="community-stat">{dest.travelers || '1.4k'} Nomads Exploring</span>
                        </div>
                    </div>
                </div>

                {/* 2. Interactive Navigation Tabs */}
                <div className="drawer-tabs-bar" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'weather'}
                        className={`drawer-tab-btn ${activeTab === 'weather' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weather')}
                    >
                        <CloudSun size={14} />
                        <span>Weather</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'internet'}
                        className={`drawer-tab-btn ${activeTab === 'internet' ? 'active' : ''}`}
                        onClick={() => setActiveTab('internet')}
                    >
                        <Wifi size={14} />
                        <span>Internet & Wi-Fi</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'costs'}
                        className={`drawer-tab-btn ${activeTab === 'costs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('costs')}
                    >
                        <DollarSign size={14} />
                        <span>Cost of Living</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'lifestyle'}
                        className={`drawer-tab-btn ${activeTab === 'lifestyle' ? 'active' : ''}`}
                        onClick={() => setActiveTab('lifestyle')}
                    >
                        <ShieldCheck size={14} />
                        <span>Living & Safety</span>
                    </button>
                </div>

                {/* 3. Tab Content Scroll Area */}
                <div className="drawer-body-scroll">
                    <AnimatePresence mode="wait">
                        {/* TAB 1: LOCAL WEATHER & FORECAST */}
                        {activeTab === 'weather' && (
                            <motion.div
                                key="tab-weather"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="drawer-tab-pane"
                            >
                                <div className="intel-section-heading">
                                    <div className="heading-left">
                                        <CloudSun size={16} className="section-icon blue" />
                                        <h4>Local Climate & Forecast</h4>
                                    </div>
                                    <div className="unit-toggle" role="group" aria-label="Temperature unit scale">
                                        <button
                                            type="button"
                                            className={`unit-btn ${tempUnit === 'C' ? 'active' : ''}`}
                                            onClick={() => setTempUnit('C')}
                                            title="Switch temperature display to Celsius (°C)"
                                            aria-pressed={tempUnit === 'C'}
                                            aria-label="Display in Celsius"
                                        >
                                            °C
                                        </button>
                                        <button
                                            type="button"
                                            className={`unit-btn ${tempUnit === 'F' ? 'active' : ''}`}
                                            onClick={() => setTempUnit('F')}
                                            title="Switch temperature display to Fahrenheit (°F)"
                                            aria-pressed={tempUnit === 'F'}
                                            aria-label="Display in Fahrenheit"
                                        >
                                            °F
                                        </button>
                                    </div>
                                </div>

                                {/* Main Weather Card */}
                                <div className="weather-primary-card">
                                    <div className="weather-main-row">
                                        <div className="weather-temp-block">
                                            <div className="weather-temp-display-wrap">
                                                <span className="weather-temp-number">
                                                    {renderTemp(intel.weather.tempC, intel.weather.tempF)}
                                                </span>
                                                <span className="weather-scale-indicator">
                                                    {tempUnit === 'C' ? 'Celsius' : 'Fahrenheit'}
                                                </span>
                                            </div>
                                            <span className="weather-condition-text">{intel.weather.condition}</span>
                                        </div>
                                        <div className="weather-hero-icon-wrap">
                                            {getWeatherIcon(intel.weather.conditionIcon, 44)}
                                        </div>
                                    </div>

                                    {/* Weather Sub-Metrics */}
                                    <div className="weather-metrics-grid">
                                        <div className="weather-sub-item">
                                            <span className="sub-lbl">Daily Range</span>
                                            <span className="sub-val">
                                                {renderTemp(intel.weather.lowC)} – {renderTemp(intel.weather.highC)}
                                            </span>
                                        </div>
                                        <div className="weather-sub-item">
                                            <span className="sub-lbl">Humidity</span>
                                            <span className="sub-val">{intel.weather.humidity}</span>
                                        </div>
                                        <div className="weather-sub-item">
                                            <span className="sub-lbl">UV Index</span>
                                            <span className="sub-val">{intel.weather.uvIndex}</span>
                                        </div>
                                        <div className="weather-sub-item">
                                            <span className="sub-lbl">Precipitation</span>
                                            <span className="sub-val">{intel.weather.rainChance}</span>
                                        </div>
                                    </div>

                                    <div className="weather-season-note">
                                        <Sparkles size={13} className="sparkle-gold" />
                                        <span><strong>Best Traveling Season:</strong> {intel.weather.bestSeason}</span>
                                    </div>
                                </div>

                                {/* 5-Day Outlook Strip */}
                                <div className="forecast-strip-container">
                                    <h5>5-Day Traveling Outlook</h5>
                                    <div className="forecast-cards-row">
                                        {intel.weather.forecast.map((fc, idx) => (
                                            <div key={idx} className="forecast-day-card">
                                                <span className="forecast-day-name">{fc.day}</span>
                                                <div className="forecast-day-icon">
                                                    {getWeatherIcon(fc.icon, 18)}
                                                </div>
                                                <span className="forecast-day-temp">
                                                    {renderTemp(parseInt(fc.temp, 10))}
                                                </span>
                                                <span className="forecast-day-cond">{fc.condition}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 2: INTERNET SPEEDS & COWORKING INFRASTRUCTURE */}
                        {activeTab === 'internet' && (
                            <motion.div
                                key="tab-internet"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="drawer-tab-pane"
                            >
                                <div className="intel-section-heading">
                                    <div className="heading-left">
                                        <Wifi size={16} className="section-icon green" />
                                        <h4>Connectivity & Tech Speeds</h4>
                                    </div>
                                    <span className="verified-badge">
                                        <Check size={11} /> Verified Speedtests
                                    </span>
                                </div>

                                {/* Speedtest Dashboard Card */}
                                <div className="speedtest-hero-card">
                                    <div className="speedtest-primary-row">
                                        <div className="speed-stat-major">
                                            <span className="speed-label">Median Download</span>
                                            <div className="speed-value-wrap">
                                                <span className="speed-number">{intel.internet.downloadMbps}</span>
                                                <span className="speed-unit">Mbps</span>
                                            </div>
                                            <div className="speed-bar-track">
                                                <div 
                                                    className="speed-bar-fill" 
                                                    style={{ width: `${Math.min(100, (intel.internet.downloadMbps / 300) * 100)}%` }} 
                                                />
                                            </div>
                                        </div>

                                        <div className="speed-side-grid">
                                            <div className="speed-side-cell">
                                                <span className="side-lbl">Upload Speed</span>
                                                <span className="side-val">{intel.internet.uploadMbps} Mbps</span>
                                            </div>
                                            <div className="speed-side-cell">
                                                <span className="side-lbl">Latency (Ping)</span>
                                                <span className="side-val">{intel.internet.pingMs} ms</span>
                                            </div>
                                            <div className="speed-side-cell">
                                                <span className="side-lbl">Fiber Stability</span>
                                                <span className="side-val">{intel.internet.stabilityScore}</span>
                                            </div>
                                            <div className="speed-side-cell">
                                                <span className="side-lbl">5G / eSIM</span>
                                                <span className="side-val status-green">Ready</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mobile-coverage-strip">
                                        <Smartphone size={13} className="phone-icon" />
                                        <span><strong>Cellular Network:</strong> {intel.internet.mobileCoverage}</span>
                                    </div>
                                </div>

                                {/* Verified Coworking Spaces */}
                                <div className="coworking-list-container">
                                    <h5>Top Nomad Coworking Hubs & Cafes</h5>
                                    <div className="coworking-spaces-list">
                                        {intel.internet.topCoworking.map((cw, idx) => (
                                            <div key={idx} className="coworking-item-card">
                                                <div className="cw-left">
                                                    <div className="cw-icon-box">
                                                        <Building2 size={16} />
                                                    </div>
                                                    <div className="cw-details">
                                                        <span className="cw-name">{cw.name}</span>
                                                        <span className="cw-speed">
                                                            <Wifi size={11} /> {cw.speed} dedicated fiber
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="cw-price-pill">{cw.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 3: COST OF LIVING & NOMAD BUDGET ESTIMATOR */}
                        {activeTab === 'costs' && (
                            <motion.div
                                key="tab-costs"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="drawer-tab-pane"
                            >
                                <div className="intel-section-heading">
                                    <div className="heading-left">
                                        <DollarSign size={16} className="section-icon amber" />
                                        <h4>Living Cost Breakdown</h4>
                                    </div>
                                    <div className="heading-badges-row">
                                        <span className="cost-tier-badge">{intel.costs.rating}</span>
                                        <span className={`heading-trend-pill trend-${costTrend.direction}`}>
                                            {costTrend.direction === 'rising' && <ArrowUpRight size={12} className="trend-arrow rising" />}
                                            {costTrend.direction === 'falling' && <ArrowDownRight size={12} className="trend-arrow falling" />}
                                            {costTrend.direction === 'stable' && <MoveRight size={11} className="trend-arrow stable" />}
                                            <span>{costTrend.change}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Total Budget Box with Visual Trend Indicator */}
                                <div className="cost-summary-card">
                                    <div className="cost-summary-left">
                                        <span className="cost-summary-label">Estimated Monthly Living Cost</span>
                                        <div className="cost-summary-amount">
                                            <span className="currency-symbol">$</span>
                                            <span className="cost-number">{adjustedTotal.toLocaleString()}</span>
                                            <span className="cost-period">/month</span>
                                        </div>

                                        {/* Visual Trend Indicator (Rising / Falling / Stable) */}
                                        <div 
                                            className={`cost-trend-badge trend-${costTrend.direction}`}
                                            title={`${costTrend.label}: ${costTrend.description} (${costTrend.change} ${costTrend.period})`}
                                            aria-label={`Living cost trend: ${costTrend.change} ${costTrend.direction} ${costTrend.period}`}
                                        >
                                            <div className="trend-indicator-icon-box">
                                                {costTrend.direction === 'rising' && <ArrowUpRight size={13} className="trend-icon rising" />}
                                                {costTrend.direction === 'falling' && <ArrowDownRight size={13} className="trend-icon falling" />}
                                                {costTrend.direction === 'stable' && <MoveRight size={12} className="trend-icon stable" />}
                                            </div>
                                            <div className="trend-badge-text-wrap">
                                                <span className="trend-change-val">{costTrend.change}</span>
                                                <span className="trend-direction-label">
                                                    {costTrend.direction === 'rising' ? 'Rising Trend' : costTrend.direction === 'falling' ? 'Falling (Savings)' : 'Stable Index'}
                                                </span>
                                                <span className="trend-period-text">· {costTrend.period}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Persona Mode Switcher */}
                                    <div className="budget-mode-selector" role="group" aria-label="Budget style">
                                        <button
                                            type="button"
                                            className={`mode-btn ${budgetMode === 'budget' ? 'active' : ''}`}
                                            onClick={() => setBudgetMode('budget')}
                                            title="Budget Backpacking / Coliving"
                                        >
                                            Frugal
                                        </button>
                                        <button
                                            type="button"
                                            className={`mode-btn ${budgetMode === 'nomad' ? 'active' : ''}`}
                                            onClick={() => setBudgetMode('nomad')}
                                            title="Standard Nomad Lifestyle"
                                        >
                                            Standard
                                        </button>
                                        <button
                                            type="button"
                                            className={`mode-btn ${budgetMode === 'founder' ? 'active' : ''}`}
                                            onClick={() => setBudgetMode('founder')}
                                            title="Luxury Founder / Private Villa"
                                        >
                                            Founder
                                        </button>
                                    </div>
                                </div>

                                {/* Economic Shift Telemetry Callout */}
                                {costTrend.description && (
                                    <div className={`economic-shift-banner trend-${costTrend.direction}`}>
                                        <div className="shift-banner-top">
                                            <div className="shift-banner-title-wrap">
                                                {costTrend.direction === 'rising' && <TrendingUp size={14} className="shift-trend-icon rising" />}
                                                {costTrend.direction === 'falling' && <TrendingDown size={14} className="shift-trend-icon falling" />}
                                                {costTrend.direction === 'stable' && <MoveRight size={13} className="shift-trend-icon stable" />}
                                                <span className="shift-title">Economic Shift: {costTrend.label}</span>
                                            </div>
                                            <span className="shift-tag-pill">{costTrend.period}</span>
                                        </div>
                                        <p className="shift-desc-text">{costTrend.description}</p>
                                    </div>
                                )}

                                {/* Granular Itemized Breakdown with Line-Item Trend Indicators */}
                                <div className="expense-breakdown-list">
                                    <div className="expense-list-header">
                                        <h5>Itemized Monthly Averages</h5>
                                        <span className="expense-velocity-hint">
                                            <TrendingUp size={11} className="hint-icon" />
                                            <span>Quarterly shift indicators</span>
                                        </span>
                                    </div>
                                    {intel.costs.breakdown.map((item, idx) => {
                                        // Adjust numeric amount if monthly
                                        let displayAmount = item.amount;
                                        if (item.amount.includes('/mo')) {
                                            const num = parseInt(item.amount.replace(/[^0-9]/g, ''), 10);
                                            if (!isNaN(num)) {
                                                displayAmount = `$${Math.round(num * multiplier).toLocaleString()}/mo`;
                                            }
                                        }

                                        const itemTrend = item.trend || { direction: 'stable', change: '0.0%', label: 'Stable' };

                                        return (
                                            <div key={idx} className="expense-row-item">
                                                <div className="expense-info">
                                                    <span className="expense-category">{item.category}</span>
                                                    <span className="expense-note">{item.note}</span>
                                                </div>
                                                <div className="expense-right-cluster">
                                                    <span className="expense-amount-tag">{displayAmount}</span>
                                                    {item.trend && (
                                                        <span 
                                                            className={`item-trend-indicator trend-${itemTrend.direction}`}
                                                            title={`${itemTrend.label || 'Trend'}: ${itemTrend.detail || ''} (${itemTrend.change})`}
                                                            aria-label={`${item.category} trend: ${itemTrend.change} ${itemTrend.direction}`}
                                                        >
                                                            {itemTrend.direction === 'rising' && <ArrowUpRight size={11} className="item-arrow rising" />}
                                                            {itemTrend.direction === 'falling' && <ArrowDownRight size={11} className="item-arrow falling" />}
                                                            {itemTrend.direction === 'stable' && <MoveRight size={10} className="item-arrow stable" />}
                                                            <span className="item-trend-text">{itemTrend.change}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 4: LIVING, SAFETY & VISA GUIDELINES */}
                        {activeTab === 'lifestyle' && (
                            <motion.div
                                key="tab-lifestyle"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="drawer-tab-pane"
                            >
                                <div className="intel-section-heading">
                                    <div className="heading-left">
                                        <ShieldCheck size={16} className="section-icon purple" />
                                        <h4>Safety, Visas & Community</h4>
                                    </div>
                                </div>

                                <div className="lifestyle-grid">
                                    <div className="lifestyle-card">
                                        <div className="ls-card-header">
                                            <ShieldCheck size={16} className="icon-green" />
                                            <span>Safety Score</span>
                                        </div>
                                        <span className="ls-metric-val">{intel.lifestyle.safetyScore}</span>
                                        <span className="ls-metric-desc">Low violent crime; standard night precautions</span>
                                    </div>

                                    <div className="lifestyle-card">
                                        <div className="ls-card-header">
                                            <Compass size={16} className="icon-blue" />
                                            <span>Walkability</span>
                                        </div>
                                        <span className="ls-metric-val">{intel.lifestyle.walkability}</span>
                                        <span className="ls-metric-desc">Transit, scooter rentals & pedestrian hubs</span>
                                    </div>

                                    <div className="lifestyle-card">
                                        <div className="ls-card-header">
                                            <Users size={16} className="icon-orange" />
                                            <span>Nomad Community</span>
                                        </div>
                                        <span className="ls-metric-val">{intel.lifestyle.nomadCommunity}</span>
                                        <span className="ls-metric-desc">Frequent meetups, hackathons & mastermind dinners</span>
                                    </div>

                                    <div className="lifestyle-card">
                                        <div className="ls-card-header">
                                            <Zap size={16} className="icon-purple" />
                                            <span>Visa Feasibility</span>
                                        </div>
                                        <span className="ls-metric-val">{intel.lifestyle.visaStatus}</span>
                                        <span className="ls-metric-desc">Seamless arrival options for remote workers</span>
                                    </div>
                                </div>

                                {/* Highlights recap */}
                                <div className="drawer-perks-box">
                                    <h5>Key City Intelligence Highlights</h5>
                                    <div className="drawer-perks-tags">
                                        {(dest.highlights && dest.highlights.length > 0 ? dest.highlights : ['Fiber Gigabit Internet', 'Coworking Culture', 'Year-Round Warmth']).map((h, i) => (
                                            <span key={i} className="drawer-perk-chip">
                                                <Sparkles size={11} />
                                                <span>{h}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 4. Pinned Drawer Footer CTA */}
                <div className="drawer-footer-cta">
                    <div className="footer-price-meta">
                        <span className="footer-cost-title">Est. Living Cost</span>
                        <div className="footer-cost-row">
                            <span className="cost-val">${adjustedTotal.toLocaleString()}</span>
                            <span className="cost-unit">/mo</span>
                            {costTrend && (
                                <span 
                                    className={`footer-cost-trend trend-${costTrend.direction}`}
                                    title={`Economic Shift: ${costTrend.change} ${costTrend.period} (${costTrend.label})`}
                                    aria-label={`Living cost trend: ${costTrend.change} ${costTrend.direction}`}
                                >
                                    {costTrend.direction === 'rising' && <ArrowUpRight size={11} className="ft-arrow" />}
                                    {costTrend.direction === 'falling' && <ArrowDownRight size={11} className="ft-arrow" />}
                                    {costTrend.direction === 'stable' && <MoveRight size={10} className="ft-arrow" />}
                                    <span>{costTrend.change}</span>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="footer-actions-group">
                        <button
                            type="button"
                            className={`drawer-secondary-cta ${state.isSaved ? 'active-saved' : ''}`}
                            onClick={(e) => {
                                handlers.toggleSave(e);
                            }}
                            title={state.isSaved ? 'Remove from My Favorites' : 'Save to My Favorites in your local profile'}
                        >
                            <Bookmark size={14} fill={state.isSaved ? 'currentColor' : 'none'} />
                            <span>{state.isSaved ? 'In My Favorites' : 'Save to Favorites'}</span>
                        </button>

                        <button
                            type="button"
                            className="drawer-secondary-cta"
                            onClick={(e) => {
                                handlers.claimXP(e);
                            }}
                            title="Claim Nomad XP"
                        >
                            <Zap size={14} className="zap-gold" />
                            <span>{state.xpClaimed ? 'XP Claimed' : '+50 XP'}</span>
                        </button>

                        <button
                            type="button"
                            className="drawer-primary-cta"
                            onClick={handleNavigateFull}
                            title="Open full interactive destination intelligence workstation"
                        >
                            <span>Open Full Intel Hub</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </motion.aside>
        </div>
    );

    return createPortal(drawerContent, document.body);
};

export default DestinationIntelligenceDrawer;
