import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles, Calendar,
    ArrowLeft, Bookmark, Share2, Plane, Compass,
    Clock, DollarSign, Zap, CheckCircle2, AlertCircle,
    ThumbsUp, Globe, TrendingUp, TrendingDown, Shield, Info, Wifi, Repeat,
    Check, X, ExternalLink, Sun, CloudSun, CloudRain, Wind,
    Building2, Smartphone, ArrowLeftRight, Heart, Navigation, Coffee
} from 'lucide-react';
import { allDestinations } from '../../../data/destinationsData';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useSavedStore } from '../../../store/savedStore';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useToastStore } from '../../../store/toastStore';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { getDestinationDomainName, getDestinationDomainStatus } from '../../../utils/destinationDomainUtils';
import SEOManager, { useDestinationOGPreview } from '../../../components/SEOManager';
import OGPreviewCard from '../../../components/common/OGPreviewCard';
import CompareDestinationsModal from './CompareDestinationsModal';
import { Image, UGCImage } from '../../../components/common/Image';
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const {
        compareDestinations,
        toggleCompareDestination,
        isCompareModalOpen,
        setIsCompareModalOpen
    } = useDestinationStore();

    const [activeTab, setActiveTab] = useState('overview');
    const [tempUnit, setTempUnit] = useState('C'); // 'C' | 'F'
    const [budgetMode, setBudgetMode] = useState('nomad'); // 'budget' | 'nomad' | 'founder'
    const [stayMonths, setStayMonths] = useState(1);
    const [liked, setLiked] = useState(false);
    const [xpClaimed, setXpClaimed] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const toSlug = (text) => (text || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destination = allDestinations.find(
        (d) => toSlug(d.name) === (id || '').toLowerCase() || String(d.id) === String(id)
    );

    const isSaved = useSavedStore((state) =>
        destination ? state.isSaved(destination.id || destination.name) : false
    );
    const toggleSave = useSavedStore((state) => state.toggleSave);

    // Scroll to top when switching between destination detail pages
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveTab('overview');
    }, [id]);

    const intel = destination ? getDestinationIntelligence(destination) : null;
    const domainName = destination ? getDestinationDomainName(destination) : '';
    const domainStatus = destination ? getDestinationDomainStatus(destination) : 'Available';
    const ogPreview = useDestinationOGPreview(destination);
    const isCompared = destination ? compareDestinations.includes(destination.id) : false;

    const relatedDestinations = allDestinations
        .filter((d) => d.id !== destination?.id && d.category === destination?.category)
        .slice(0, 4);

    if (!destination || !intel) {
        return (
            <div className="destination-not-found">
                <AlertCircle size={48} color="#ef4444" />
                <h2>Destination Intelligence Not Found</h2>
                <p>The requested destination could not be located in our global index.</p>
                <button onClick={() => navigate('/explore/destinations')} className="back-btn">
                    <ArrowLeft size={18} />
                    <span>Return to Global Destinations</span>
                </button>
            </div>
        );
    }

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.location}`)}`;

    // Temperature formatting helper
    const formatTemp = (cVal) => {
        const num = typeof cVal === 'number' ? cVal : parseInt(String(cVal).replace(/[^0-9.-]/g, ''), 10);
        if (isNaN(num)) return cVal;
        return tempUnit === 'C' ? `${num}°C` : `${Math.round((num * 9) / 5 + 32)}°F`;
    };

    const getWeatherIcon = (iconName, size = 18) => {
        switch (iconName) {
            case 'Sun': return <Sun size={size} className="weather-svg sun" />;
            case 'CloudSun': return <CloudSun size={size} className="weather-svg cloudsun" />;
            case 'CloudRain': return <CloudRain size={size} className="weather-svg rain" />;
            case 'Wind': return <Wind size={size} className="weather-svg wind" />;
            default: return <Sun size={size} className="weather-svg sun" />;
        }
    };

    // Budget tier multiplier
    const multiplier = budgetMode === 'budget' ? 0.76 : budgetMode === 'founder' ? 1.55 : 1.0;
    const baseMonthly = parseInt(String(intel.costs.totalEstimated || destination.price || '1450').replace(/[^0-9]/g, ''), 10) || 1450;
    const adjustedMonthly = Math.round(baseMonthly * multiplier);
    const totalStayEstimate = adjustedMonthly * stayMonths;

    const aiConfidence = destination.matchScore ? parseInt(destination.matchScore, 10) : 96;
    const highlights = destination.highlights && destination.highlights.length > 0
        ? destination.highlights
        : ['Digital Nomad Hub', 'Fast Fiber Internet', 'Coworking Culture', 'Vibrant Expat Scene'];

    // Generate neighborhood hubs tailored to the destination
    const neighborhoods = [
        {
            name: `Central ${destination.name} Quarter`,
            vibe: 'Walkable Core · Specialty Cafes · Architecture',
            wifi: `${intel.internet.downloadMbps + 30} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.52)}/mo`,
            tag: 'Most Popular'
        },
        {
            name: `${destination.name} Creative & Tech District`,
            vibe: '24/7 Coworking · Startup Studios · Nightlife',
            wifi: `${intel.internet.downloadMbps + 65} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.56)}/mo`,
            tag: 'Fastest Fiber'
        },
        {
            name: `Scenic & Quiet Residential Zone`,
            vibe: 'Long-Stay Villas · Wellness · Peaceful Focus',
            wifi: `${intel.internet.downloadMbps} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.42)}/mo`,
            tag: 'Best Value'
        }
    ];

    const handleClaimXP = () => {
        if (xpClaimed) return;
        setXpClaimed(true);
        if (addXP) addXP(500);
        addToast(`Claimed +500 XP for exploring ${destination.name}! ⚡`, 'success');
    };

    const handleCompareToggle = () => {
        toggleCompareDestination(destination.id);
        addToast(
            isCompared
                ? `Removed ${destination.name} from comparison`
                : `Added ${destination.name} to Compare Side-by-Side`,
            'info'
        );
    };

    const TABS = [
        { id: 'overview', label: 'Overview & Brief', icon: Compass },
        { id: 'costs', label: 'Cost of Living', icon: DollarSign },
        { id: 'connectivity', label: 'Wi-Fi & Coworking', icon: Wifi },
        { id: 'climate', label: 'Climate & Forecast', icon: Sun },
        { id: 'visa', label: 'Visa & Logistics', icon: ShieldCheck },
        { id: 'community', label: 'Neighborhoods & Vibe', icon: Users }
    ];

    return (
        <div className="dest-expand-page">
            <SEOManager destination={destination} />

            {/* 1. Cinematic Expanded Hero Banner */}
            <section className="dest-expand-hero">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    className="dest-expand-hero-img"
                    priority={true}
                    sizes="100vw"
                />
                <div className="dest-expand-hero-scrim" />

                <div className="dest-expand-hero-inner">
                    {/* Top Navigation & Quick Action Bar */}
                    <div className="dest-expand-top-bar">
                        <button
                            type="button"
                            onClick={() => navigate('/explore/destinations')}
                            className="dest-back-pill-btn"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Destinations</span>
                        </button>

                        <div className="dest-hero-top-actions">
                            <button
                                type="button"
                                className={`dest-action-chip ${isCompared ? 'active' : ''}`}
                                onClick={handleCompareToggle}
                                title="Compare Side-by-Side"
                            >
                                <ArrowLeftRight size={15} />
                                <span>{isCompared ? 'Selected for Compare' : 'Compare City'}</span>
                            </button>

                            {compareDestinations.length > 0 && (
                                <button
                                    type="button"
                                    className="dest-action-chip primary-compare"
                                    onClick={() => setIsCompareModalOpen(true)}
                                >
                                    <span>Open Compare ({compareDestinations.length})</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className={`dest-action-chip ${isSaved ? 'saved' : ''}`}
                                onClick={() => {
                                    toggleSave(destination);
                                    addToast(
                                        isSaved
                                            ? `Removed ${destination.name} from Favorites`
                                            : `Saved ${destination.name} to My Favorites`,
                                        'success'
                                    );
                                }}
                            >
                                <Heart size={15} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : 'currentColor'} />
                                <span>{isSaved ? 'Saved' : 'Save'}</span>
                            </button>

                            <button
                                type="button"
                                className="dest-action-chip"
                                onClick={() => setShowShareModal(true)}
                            >
                                <Share2 size={15} />
                                <span>Share</span>
                            </button>

                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dest-action-chip"
                                title="Open in Google Maps"
                            >
                                <ExternalLink size={15} />
                                <span>Google Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Hero Main Title & Editorial Metadata */}
                    <div className="dest-expand-hero-bottom">
                        <div className="dest-hero-title-block">
                            <div className="dest-hero-kicker-row">
                                <span className="dest-kicker-live">
                                    <span className="dest-pulse-dot" />
                                    {destination.liveViewers || '1.4k'} Nomads Active
                                </span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-text">{destination.category || 'Global Hub'}</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-text">{aiConfidence}% Compatibility Match</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-domain">
                                    <Globe size={12} />
                                    {domainName} ({domainStatus})
                                </span>
                            </div>

                            <h1 className="dest-expand-title">{destination.name}</h1>

                            <div className="dest-hero-location-line">
                                <MapPin size={16} className="pin-accent" />
                                <span>{destination.location}</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-rating-inline">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <strong>{destination.rating || '4.8'}</strong>
                                    <span>({destination.reviewsCount || '142'} verified nomad reviews)</span>
                                </span>
                            </div>
                        </div>

                        {/* Hero Right: Instant Telemetry Summary Strip */}
                        <div className="dest-hero-quick-metrics">
                            <div className="hero-metric-box">
                                <span className="hm-label">Monthly Living</span>
                                <span className="hm-value">{intel.costs.totalEstimated}<small>/mo</small></span>
                                <span className="hm-sub">{intel.costs.rating}</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Fiber Download</span>
                                <span className="hm-value">{intel.internet.downloadMbps}<small> Mbps</small></span>
                                <span className="hm-sub">{intel.internet.stabilityScore} Uptime</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Local Weather</span>
                                <span className="hm-value">{formatTemp(intel.weather.tempC)}</span>
                                <span className="hm-sub">{intel.weather.condition}</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Safety & Entry</span>
                                <span className="hm-value">{intel.lifestyle.safetyScore}</span>
                                <span className="hm-sub">{destination.visaApprovalRate || '96%'} Visa Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Sticky Interactive Section Switcher Bar */}
            <div className="dest-expand-tabs-shell">
                <div className="dest-expand-tabs-bar" role="tablist" aria-label="Destination Detail Sections">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`dest-expand-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={15} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Global Unit & Lifestyle Mode Controls */}
                <div className="dest-expand-quick-toggles">
                    <div className="unit-segmented-toggle" role="group" aria-label="Temperature Unit">
                        <button
                            type="button"
                            className={tempUnit === 'C' ? 'active' : ''}
                            onClick={() => setTempUnit('C')}
                        >
                            °C
                        </button>
                        <button
                            type="button"
                            className={tempUnit === 'F' ? 'active' : ''}
                            onClick={() => setTempUnit('F')}
                        >
                            °F
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Main Two-Column Expanded Intelligence Workspace */}
            <div className="dest-expand-workspace">
                {/* Left Primary Column */}
                <div className="dest-expand-main-col">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="dest-tab-stage"
                        >
                            {/* TAB 1: OVERVIEW & BRIEF (Also shows complete Executive Summary of all metrics) */}
                            {activeTab === 'overview' && (
                                <div className="dest-section-stack">
                                    {/* Executive Summary Card */}
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">01. Executive Brief</span>
                                                <h2 className="dest-section-title">About {destination.name}, {destination.location}</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className={`dest-xp-claim-btn ${xpClaimed ? 'claimed' : ''}`}
                                                onClick={handleClaimXP}
                                            >
                                                <Zap size={14} />
                                                <span>{xpClaimed ? '500 XP Claimed ✓' : 'Claim +500 XP'}</span>
                                            </button>
                                        </div>

                                        <p className="dest-editorial-prose">
                                            {destination.aiInsight || `${destination.name} is a premier ${destination.category.toLowerCase()} destination in ${destination.location}, renowned for its balance of high-output remote work infrastructure, ${intel.internet.downloadMbps} Mbps fiber connectivity, and vibrant international community.`}
                                            {' '}Whether you are planning a 30-day workcation or a multi-month basecamp, {destination.name} delivers reliable coworking ecosystems, {intel.weather.condition.toLowerCase()} weather ({formatTemp(intel.weather.tempC)}), and an estimated monthly living baseline of {intel.costs.totalEstimated}.
                                        </p>

                                        <div className="dest-highlights-inline">
                                            {highlights.map((item, idx) => (
                                                <span key={idx} className="dest-highlight-tag">
                                                    <CheckCircle2 size={13} className="tag-check" />
                                                    <span>{item}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 6-Metric Complete Telemetry Grid */}
                                    <div className="dest-kpi-matrix-grid">
                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('connectivity')}>
                                            <div className="kpi-tile-top">
                                                <Wifi size={18} className="kpi-icon sky" />
                                                <span className="kpi-status-text">{intel.internet.stabilityScore} Stable</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.internet.downloadMbps} Mbps</div>
                                            <div className="kpi-tile-label">Fiber Download ({intel.internet.pingMs}ms ping)</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('costs')}>
                                            <div className="kpi-tile-top">
                                                <DollarSign size={18} className="kpi-icon emerald" />
                                                <span className="kpi-status-text">{intel.costs.rating}</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.costs.totalEstimated}/mo</div>
                                            <div className="kpi-tile-label">All-Inclusive Nomad Baseline</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('climate')}>
                                            <div className="kpi-tile-top">
                                                {getWeatherIcon(intel.weather.conditionIcon, 18)}
                                                <span className="kpi-status-text">Humidity {intel.weather.humidity}</span>
                                            </div>
                                            <div className="kpi-tile-val">{formatTemp(intel.weather.tempC)}</div>
                                            <div className="kpi-tile-label">{intel.weather.condition}</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('visa')}>
                                            <div className="kpi-tile-top">
                                                <Shield size={18} className="kpi-icon indigo" />
                                                <span className="kpi-status-text">Verified 2026</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.lifestyle.safetyScore}</div>
                                            <div className="kpi-tile-label">Safety & Walkability Index</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('visa')}>
                                            <div className="kpi-tile-top">
                                                <Globe size={18} className="kpi-icon teal" />
                                                <span className="kpi-status-text">{destination.visaApprovalRate || '96%'} Approval</span>
                                            </div>
                                            <div className="kpi-tile-val">{destination.visaFriendly ? 'Visa-Friendly' : 'Standard Visa'}</div>
                                            <div className="kpi-tile-label">{intel.lifestyle.visaStatus}</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('community')}>
                                            <div className="kpi-tile-top">
                                                <Users size={18} className="kpi-icon amber" />
                                                <span className="kpi-status-text">Active Hub</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.lifestyle.nomadCommunity.split(' ')[0]}</div>
                                            <div className="kpi-tile-label">{intel.lifestyle.nomadCommunity}</div>
                                        </div>
                                    </div>

                                    {/* Quick Preview of Cost Breakdown + Top Coworking Spaces on Overview */}
                                    <div className="dest-dual-preview-grid">
                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header compact">
                                                <div>
                                                    <span className="dest-section-eyebrow">02. Monthly Budget Snapshot</span>
                                                    <h3 className="dest-subsection-title">Living Cost Breakdown</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="dest-text-link-btn"
                                                    onClick={() => setActiveTab('costs')}
                                                >
                                                    Full Calculator →
                                                </button>
                                            </div>
                                            <div className="dest-mini-list">
                                                {intel.costs.breakdown.slice(0, 4).map((item, i) => (
                                                    <div key={i} className="dest-mini-row">
                                                        <div className="mini-row-left">
                                                            <span className="mini-row-title">{item.category}</span>
                                                            <span className="mini-row-note">{item.note}</span>
                                                        </div>
                                                        <span className="mini-row-amount">{item.amount}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header compact">
                                                <div>
                                                    <span className="dest-section-eyebrow">03. Verified Workspaces</span>
                                                    <h3 className="dest-subsection-title">Top Coworking Hubs</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="dest-text-link-btn"
                                                    onClick={() => setActiveTab('connectivity')}
                                                >
                                                    Speed Telemetry →
                                                </button>
                                            </div>
                                            <div className="dest-mini-list">
                                                {intel.internet.topCoworking.map((cw, i) => (
                                                    <div key={i} className="dest-mini-row">
                                                        <div className="mini-row-left">
                                                            <span className="mini-row-title">{cw.name}</span>
                                                            <span className="mini-row-note">Verified Dual-Fiber · {cw.speed}</span>
                                                        </div>
                                                        <span className="mini-row-amount">{cw.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: COST OF LIVING & INTERACTIVE BUDGET SIMULATOR */}
                            {activeTab === 'costs' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Interactive Cost Simulator</span>
                                                <h2 className="dest-section-title">Cost of Living in {destination.name}</h2>
                                            </div>
                                            <div className="dest-budget-tier-pills" role="group" aria-label="Lifestyle Tier">
                                                {[
                                                    { id: 'budget', label: 'Backpacker / Lean' },
                                                    { id: 'nomad', label: 'Standard Nomad' },
                                                    { id: 'founder', label: 'Executive / Luxury' }
                                                ].map((tier) => (
                                                    <button
                                                        key={tier.id}
                                                        type="button"
                                                        className={`budget-tier-btn ${budgetMode === tier.id ? 'active' : ''}`}
                                                        onClick={() => setBudgetMode(tier.id)}
                                                    >
                                                        {tier.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="dest-cost-summary-banner">
                                            <div className="cost-banner-main">
                                                <span className="cost-banner-label">Estimated Monthly Total ({budgetMode.toUpperCase()})</span>
                                                <div className="cost-banner-price">
                                                    ${adjustedMonthly.toLocaleString()}
                                                    <span>/ month (USD)</span>
                                                </div>
                                            </div>
                                            <div className="cost-banner-trend">
                                                <span className={`trend-indicator ${intel.costs.trend?.direction || 'stable'}`}>
                                                    {intel.costs.trend?.direction === 'falling' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                                                    {intel.costs.trend?.change || '+0.5%'} ({intel.costs.trend?.period || 'QoQ'})
                                                </span>
                                                <p className="trend-desc">{intel.costs.trend?.description}</p>
                                            </div>
                                        </div>

                                        <div className="dest-cost-breakdown-table">
                                            {intel.costs.breakdown.map((item, idx) => {
                                                const rawNum = parseFloat(String(item.amount).replace(/[^0-9.]/g, '')) || 0;
                                                const suffix = item.amount.includes('/cup') ? '/cup' : '/mo';
                                                const scaledVal = suffix === '/cup'
                                                    ? `$${(rawNum * (budgetMode === 'budget' ? 0.85 : budgetMode === 'founder' ? 1.35 : 1)).toFixed(2)}${suffix}`
                                                    : `$${Math.round(rawNum * multiplier).toLocaleString()}${suffix}`;

                                                return (
                                                    <div key={idx} className="cost-table-row">
                                                        <div className="cost-row-info">
                                                            <span className="cost-row-cat">{item.category}</span>
                                                            <span className="cost-row-note">{item.note}</span>
                                                        </div>
                                                        <div className="cost-row-right">
                                                            {item.trend && (
                                                                <span className={`cost-micro-trend ${item.trend.direction}`}>
                                                                    {item.trend.change} · {item.trend.label}
                                                                </span>
                                                            )}
                                                            <span className="cost-row-val">{scaledVal}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: WI-FI, FIBER & COWORKING INFRASTRUCTURE */}
                            {activeTab === 'connectivity' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Remote Work Infrastructure</span>
                                                <h2 className="dest-section-title">Fiber Speeds, 5G & Coworking Hubs</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/explore/speed-test')}
                                            >
                                                <Wifi size={14} />
                                                <span>Open Wi-Fi Speed Map</span>
                                            </button>
                                        </div>

                                        <div className="dest-net-telemetry-row">
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Avg Fiber Download</span>
                                                <span className="net-stat-val">{intel.internet.downloadMbps} <small>Mbps</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Avg Fiber Upload</span>
                                                <span className="net-stat-val">{intel.internet.uploadMbps} <small>Mbps</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Network Latency</span>
                                                <span className="net-stat-val">{intel.internet.pingMs} <small>ms</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Power & Line Uptime</span>
                                                <span className="net-stat-val">{intel.internet.stabilityScore}</span>
                                            </div>
                                        </div>

                                        <h3 className="dest-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.85rem' }}>
                                            Verified Coworking & Coliving Spaces in {destination.name}
                                        </h3>
                                        <div className="dest-cowork-cards-grid">
                                            {intel.internet.topCoworking.map((space, idx) => (
                                                <div key={idx} className="dest-cowork-card">
                                                    <div className="cowork-card-top">
                                                        <Building2 size={18} className="cowork-icon" />
                                                        <span className="cowork-speed-tag">{space.speed}</span>
                                                    </div>
                                                    <h4 className="cowork-name">{space.name}</h4>
                                                    <p className="cowork-meta">Ergonomic chairs · 24/7 Biometric Access · Soundproof Zoom Pods</p>
                                                    <div className="cowork-footer">
                                                        <span className="cowork-price">{space.price}</span>
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${space.name} ${destination.name}`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="cowork-map-link"
                                                        >
                                                            <span>Locate</span>
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: CLIMATE, SEASONALITY & 5-DAY FORECAST */}
                            {activeTab === 'climate' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Meteorological & Seasonal Guide</span>
                                                <h2 className="dest-section-title">Weather & Best Months to Visit {destination.name}</h2>
                                            </div>
                                            <span className="dest-season-badge">
                                                <Calendar size={14} />
                                                <span>Peak Season: {intel.weather.bestSeason}</span>
                                            </span>
                                        </div>

                                        <div className="dest-weather-hero-strip">
                                            <div className="weather-now-main">
                                                {getWeatherIcon(intel.weather.conditionIcon, 36)}
                                                <div>
                                                    <div className="weather-now-temp">{formatTemp(intel.weather.tempC)}</div>
                                                    <div className="weather-now-cond">{intel.weather.condition}</div>
                                                </div>
                                            </div>
                                            <div className="weather-now-details">
                                                <div>
                                                    <span>High / Low</span>
                                                    <strong>{formatTemp(intel.weather.highC)} / {formatTemp(intel.weather.lowC)}</strong>
                                                </div>
                                                <div>
                                                    <span>Humidity</span>
                                                    <strong>{intel.weather.humidity}</strong>
                                                </div>
                                                <div>
                                                    <span>UV Index</span>
                                                    <strong>{intel.weather.uvIndex}</strong>
                                                </div>
                                                <div>
                                                    <span>Rain Probability</span>
                                                    <strong>{intel.weather.rainChance}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="dest-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.85rem' }}>
                                            5-Day Local Outlook
                                        </h3>
                                        <div className="dest-forecast-grid">
                                            {intel.weather.forecast.map((dayItem, idx) => (
                                                <div key={idx} className="dest-forecast-day-card">
                                                    <span className="fc-day">{dayItem.day}</span>
                                                    {getWeatherIcon(dayItem.icon, 22)}
                                                    <span className="fc-temp">{formatTemp(dayItem.temp)}</span>
                                                    <span className="fc-cond">{dayItem.condition}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 5: VISA, SAFETY & ENTRY LOGISTICS */}
                            {activeTab === 'visa' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Border & Legal Telemetry</span>
                                                <h2 className="dest-section-title">Visa Guidelines, Safety & Local Logistics</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/explore/visa')}
                                            >
                                                <Shield size={14} />
                                                <span>Open Visa Intelligence Hub</span>
                                            </button>
                                        </div>

                                        <div className="dest-logistics-grid">
                                            <div className="dest-logistic-item">
                                                <ShieldCheck size={20} className="log-icon emerald" />
                                                <div>
                                                    <h4>Visa & Remote Work Pathway</h4>
                                                    <p>{intel.lifestyle.visaStatus}</p>
                                                    <span className="log-meta">Approval Confidence: {destination.visaApprovalRate || '96%'}</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Shield size={20} className="log-icon sky" />
                                                <div>
                                                    <h4>Safety & Urban Security</h4>
                                                    <p>Safety Index: {intel.lifestyle.safetyScore}</p>
                                                    <span className="log-meta">Solo traveler & night-walk vetted</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Navigation size={20} className="log-icon purple" />
                                                <div>
                                                    <h4>Walkability & Transit</h4>
                                                    <p>{intel.lifestyle.walkability}</p>
                                                    <span className="log-meta">Ride-hailing, metro & micro-mobility active</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Smartphone size={20} className="log-icon amber" />
                                                <div>
                                                    <h4>eSIM & Mobile Connectivity</h4>
                                                    <p>{intel.internet.mobileCoverage}</p>
                                                    <span className="log-meta">Instant airport & digital eSIM provisioning</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 6: NEIGHBORHOODS & NOMAD COMMUNITY */}
                            {activeTab === 'community' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Where to Stay & Connect</span>
                                                <h2 className="dest-section-title">Top Nomad Neighborhoods in {destination.name}</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/community')}
                                            >
                                                <Users size={14} />
                                                <span>Join City Community</span>
                                            </button>
                                        </div>

                                        <div className="dest-neighborhoods-list">
                                            {neighborhoods.map((hood, idx) => (
                                                <div key={idx} className="dest-neighborhood-card">
                                                    <div className="hood-main">
                                                        <div className="hood-title-row">
                                                            <h4>{hood.name}</h4>
                                                            <span className="hood-tag">{hood.tag}</span>
                                                        </div>
                                                        <p className="hood-vibe">{hood.vibe}</p>
                                                    </div>
                                                    <div className="hood-metrics">
                                                        <div>
                                                            <span>Avg Rent</span>
                                                            <strong>{hood.rent}</strong>
                                                        </div>
                                                        <div>
                                                            <span>Fiber Speed</span>
                                                            <strong>{hood.wifi}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Sticky Sidecar: Stay Estimator, Quick Actions & Similar Hubs */}
                <aside className="dest-expand-sidecar">
                    {/* Interactive Stay & Trip Planner Card */}
                    <div className="dest-sidecar-card">
                        <div className="sidecar-card-header">
                            <span className="dest-section-eyebrow">Trip & Budget Planner</span>
                            <h3>Plan Your Stay in {destination.name}</h3>
                        </div>

                        <div className="sidecar-price-hero">
                            <div className="sp-amount">${totalStayEstimate.toLocaleString()}</div>
                            <div className="sp-period">
                                est. for {stayMonths} {stayMonths === 1 ? 'month' : 'months'} ({budgetMode})
                            </div>
                        </div>

                        {/* Stay Duration Selector */}
                        <div className="sidecar-duration-control">
                            <div className="duration-label-row">
                                <span>Stay Duration</span>
                                <strong>{stayMonths} {stayMonths === 1 ? 'Month' : 'Months'}</strong>
                            </div>
                            <div className="duration-pills">
                                {[1, 2, 3, 6].map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        className={`duration-pill-btn ${stayMonths === m ? 'active' : ''}`}
                                        onClick={() => setStayMonths(m)}
                                    >
                                        {m} {m === 1 ? 'Mo' : 'Mos'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sidecar-cta-stack">
                            <button
                                type="button"
                                className="sidecar-primary-btn"
                                onClick={() => navigate(`/explore/triipper?destination=${encodeURIComponent(destination.name)}`)}
                            >
                                <Sparkles size={15} />
                                <span>Build AI Itinerary for {destination.name}</span>
                            </button>

                            <button
                                type="button"
                                className="sidecar-secondary-btn"
                                onClick={handleCompareToggle}
                            >
                                <ArrowLeftRight size={15} />
                                <span>{isCompared ? 'In Comparison Slot ✓' : 'Compare Side-by-Side'}</span>
                            </button>

                            <button
                                type="button"
                                className="sidecar-outline-btn"
                                onClick={() => navigate('/explore/visa')}
                            >
                                <ShieldCheck size={15} />
                                <span>Check Visa Requirements</span>
                            </button>
                        </div>
                    </div>

                    {/* Similar Destinations Intelligence */}
                    <div className="dest-sidecar-card">
                        <div className="sidecar-card-header">
                            <span className="dest-section-eyebrow">Comparable Hubs</span>
                            <h3>Similar Destinations</h3>
                        </div>

                        <div className="dest-similar-list">
                            {relatedDestinations.map((rel) => {
                                const relIntel = getDestinationIntelligence(rel);
                                return (
                                    <button
                                        key={rel.id}
                                        type="button"
                                        className="dest-similar-item"
                                        onClick={() => navigate(`/explore/destinations/${toSlug(rel.name)}`)}
                                    >
                                        <UGCImage
                                            src={rel.image}
                                            alt={rel.name}
                                            className="similar-thumb"
                                            loading="lazy"
                                            sizes="64px"
                                        />
                                        <div className="similar-info">
                                            <div className="similar-top-row">
                                                <h4>{rel.name}</h4>
                                                <span className="similar-price">{rel.price}</span>
                                            </div>
                                            <span className="similar-loc">{rel.location}</span>
                                            <span className="similar-meta">
                                                {relIntel.internet.downloadMbps} Mbps · ★ {rel.rating || '4.8'}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Side-by-Side Compare Destinations Modal */}
            <CompareDestinationsModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
            />

            {/* Social Sharing & Open Graph Preview Modal */}
            <AnimatePresence>
                {showShareModal && ogPreview && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            className="bg-neutral-900 border border-neutral-700/60 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl overflow-hidden relative"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                                        <Share2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Share {destination.name} Intelligence</h3>
                                        <p className="text-xs text-neutral-400">Verified cost of living, fiber speeds & nomad guide</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <OGPreviewCard
                                title={ogPreview.ogTitle}
                                category={destination.category || 'Nomad Destination'}
                                description={ogPreview.ogDescription}
                                stats={ogPreview.preview?.stats}
                                backgroundImageUrl={destination.image}
                                canonicalUrl={ogPreview.canonical}
                                interactive={true}
                                showActions={true}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DestinationDetail;
