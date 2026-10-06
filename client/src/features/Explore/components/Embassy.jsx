import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark, Search, MapPin, Phone, Mail, Globe, Clock, ChevronRight,
    Building2, Plane, AlertCircle, CheckCircle2,
    ExternalLink, ShieldCheck, FileText, Copy, Check, ArrowRight,
    X, Compass, RotateCcw, ChevronDown, ChevronUp, LifeBuoy, PhoneCall,
    Navigation, Maximize2, Minimize2
} from 'lucide-react';
import { useNavStore } from '../../../store/navStore';
import { useToastStore } from '../../../store/toastStore';
import { GLOBAL_EMBASSY_COUNTRIES } from '../data/globalEmbassyCountries';
import './Embassy.css';

const SERVICE_FILTERS = [
    { id: 'all', label: 'All Countries', icon: Globe },
    { id: 'nomad-visa', label: 'Digital Nomad Visas', icon: Plane },
    { id: 'visa-services', label: 'Fast-Track E-Visa', icon: FileText },
    { id: 'emergency', label: '24/7 Emergency Consular', icon: AlertCircle },
    { id: 'passport', label: 'Passport & Notary', icon: ShieldCheck }
];

const REGIONS = ['All Regions', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const highlightText = (text, query) => {
    const cleanQuery = (query || '').trim();
    if (!cleanQuery) return text;
    const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = String(text).split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, idx) =>
        part.toLowerCase() === cleanQuery.toLowerCase() ? (
            <mark key={idx} className="emb-search-highlight">{part}</mark>
        ) : (
            part
        )
    );
};

const projectLatLngToPercent = (lat = 20, lng = 0) => {
    const x = Math.min(94, Math.max(6, ((lng + 180) / 360) * 100));
    const y = Math.min(88, Math.max(12, ((75 - lat) / 135) * 100));
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
};

const Embassy = ({ activeFilters = [] }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const setDockConfig = useNavStore((state) => state.setDockConfig);
    const searchInputRef = useRef(null);
    const mapWidgetRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [embassiesOf, setEmbassiesOf] = useState('All Countries');
    const [locatedIn, setLocatedIn] = useState('All Host Locations');
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [selectedService, setSelectedService] = useState('all');
    const [waitTimeFilter, setWaitTimeFilter] = useState('all');
    const [activeLetter, setActiveLetter] = useState('');
    const [citizenPassport, setCitizenPassport] = useState('Global Nomad Passport');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [copiedField, setCopiedField] = useState('');
    const [quickHelpMap, setQuickHelpMap] = useState({});
    const [mapCountryId, setMapCountryId] = useState('portugal');
    const [activeMissionIndex, setActiveMissionIndex] = useState(0);
    const [isMapExpanded, setIsMapExpanded] = useState(true);

    const toggleQuickHelp = (e, countryId) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setQuickHelpMap((prev) => ({
            ...prev,
            [countryId]: !prev[countryId]
        }));
    };

    const handleSearchInputChange = (val) => {
        setSearchQuery(val);
        if (val.trim() && embassiesOf !== 'All Countries') {
            setEmbassiesOf('All Countries');
        }
        window.dispatchEvent(new CustomEvent('embassy:search-sync', { detail: { search: val } }));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA' && document.activeElement?.tagName !== 'SELECT') {
                e.preventDefault();
                searchInputRef.current?.focus();
            } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current && searchQuery) {
                setSearchQuery('');
                window.dispatchEvent(new CustomEvent('embassy:search-sync', { detail: { search: '' } }));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchQuery]);

    useEffect(() => {
        setDockConfig({
            module: 'Embassy',
            placeholder: 'Search embassies, visa pathways, hotlines...',
            quickFilters: [
                { id: 'nomad-visa', label: 'Nomad Visas', icon: 'Plane' },
                { id: 'visa-services', label: 'E-Visa Hubs', icon: 'FileText' },
                { id: 'emergency', label: 'Emergency 24/7', icon: 'AlertCircle' },
                { id: 'passport', label: 'Passport Services', icon: 'Shield' }
            ]
        });

        const handleDockEmbassyFilter = (e) => {
            const detail = e.detail || {};
            if (detail.search !== undefined) setSearchQuery(detail.search);
            if (detail.region !== undefined) setSelectedRegion(detail.region);
            if (detail.service !== undefined) setSelectedService(detail.service);
            if (detail.waitTime !== undefined) setWaitTimeFilter(detail.waitTime);
            if (detail.citizenPassport !== undefined) setCitizenPassport(detail.citizenPassport);
            if (detail.letter !== undefined) setActiveLetter(detail.letter);
        };

        window.addEventListener('embassy:filter-change', handleDockEmbassyFilter);
        return () => window.removeEventListener('embassy:filter-change', handleDockEmbassyFilter);
    }, [setDockConfig]);

    const filteredEmbassies = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        const filtered = GLOBAL_EMBASSY_COUNTRIES.filter((item) => {
            if (q) {
                const nameMatch = item.name.toLowerCase().includes(q);
                const capitalMatch = item.capital.toLowerCase().includes(q);
                const pathwayMatch = item.visaPathway.toLowerCase().includes(q);
                const regionMatch = item.region.toLowerCase().includes(q);
                if (!nameMatch && !capitalMatch && !pathwayMatch && !regionMatch) return false;
            }
            if (embassiesOf !== 'All Countries' && item.name !== embassiesOf) {
                return false;
            }
            if (activeLetter && !item.name.toUpperCase().startsWith(activeLetter)) {
                return false;
            }
            if (selectedRegion !== 'All Regions' && item.region !== selectedRegion) {
                return false;
            }
            if (selectedService !== 'all' && !item.services.includes(selectedService)) {
                return false;
            }
            if (waitTimeFilter === 'instant') {
                const isInstant = item.processingTime.toLowerCase().includes('hour') || item.processingTime.toLowerCase().includes('instant') || item.appointmentWait.toLowerCase().includes('instant') || item.appointmentWait.toLowerCase().includes('online');
                if (!isInstant) return false;
            }
            if (waitTimeFilter === 'fast') {
                const isFast = item.processingTime.includes('3–') || item.processingTime.includes('5–') || item.processingTime.includes('1–') || item.processingTime.toLowerCase().includes('hour') || item.processingTime.toLowerCase().includes('instant');
                if (!isFast) return false;
            }
            if (waitTimeFilter === 'high-approval') {
                const rate = parseFloat(item.visaApprovalRate) || 0;
                if (rate < 95) return false;
            }
            if (activeFilters && activeFilters.length > 0) {
                const hasActive = activeFilters.some((f) => item.services.includes(f));
                if (!hasActive) return false;
            }
            return true;
        });

        if (!q) return filtered;

        // Prioritize country cards whose name starts with the query, then name includes, then capital/pathway matches
        return [...filtered].sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStarts = aName.startsWith(q) ? 0 : aName.includes(q) ? 1 : 2;
            const bStarts = bName.startsWith(q) ? 0 : bName.includes(q) ? 1 : 2;
            if (aStarts !== bStarts) return aStarts - bStarts;
            return aName.localeCompare(bName);
        });
    }, [searchQuery, embassiesOf, activeLetter, selectedRegion, selectedService, waitTimeFilter, activeFilters]);

    const activeMapCountry = useMemo(() => {
        const fromId = GLOBAL_EMBASSY_COUNTRIES.find((c) => c.id === mapCountryId);
        if (fromId && filteredEmbassies.some((c) => c.id === fromId.id)) {
            return fromId;
        }
        return filteredEmbassies[0] || GLOBAL_EMBASSY_COUNTRIES[0];
    }, [mapCountryId, filteredEmbassies]);

    const activeMission = useMemo(() => {
        const list = activeMapCountry?.missionsAbroad || [];
        return list[activeMissionIndex] || list[0] || null;
    }, [activeMapCountry, activeMissionIndex]);

    const handleSelectCountryOnMap = (e, country, scrollToMap = false) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setMapCountryId(country.id);
        setActiveMissionIndex(0);
        setIsMapExpanded(true);
        if (scrollToMap && mapWidgetRef.current) {
            mapWidgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('embassy:count', { detail: { count: filteredEmbassies.length } }));
    }, [filteredEmbassies.length]);

    const handleCopy = (e, text, label) => {
        if (e && e.stopPropagation) e.stopPropagation();
        navigator.clipboard?.writeText(text);
        setCopiedField(label);
        addToast(`Copied ${label}: ${text}`, 'success');
        setTimeout(() => setCopiedField(''), 2000);
    };

    const handleOpenMissionsPage = (e, country) => {
        if (e && e.stopPropagation) e.stopPropagation();
        navigate(`/explore/embassy/embassy-of-${country.id}`);
    };

    const handleResetAll = () => {
        setSearchQuery('');
        setEmbassiesOf('All Countries');
        setLocatedIn('All Host Locations');
        setSelectedRegion('All Regions');
        setSelectedService('all');
        setWaitTimeFilter('all');
        setActiveLetter('');
    };

    return (
        <div className="embassy-intel-page">
            {/* 1. Hero Header Banner */}
            <header className="embassy-hero-banner">
                <div className="embassy-hero-left">
                    <div className="embassy-hero-eyebrow">
                        <Landmark size={14} />
                        <span>Diplomatic & Visa Intelligence</span>
                        <span className="eyebrow-sep">·</span>
                        <span>{GLOBAL_EMBASSY_COUNTRIES.length} Sovereign Country Cards</span>
                    </div>

                    <h1 className="embassy-hero-title">
                        Global Embassy Directory & Consular Intelligence
                    </h1>

                    <p className="embassy-hero-subtitle">
                        Explore every country card with direct consular hotlines, verified digital nomad visa pathways, appointment wait times, and diplomatic missions worldwide.
                    </p>

                    {/* Telemetry Summary Bar */}
                    <div className="embassy-telemetry-strip">
                        <div className="emb-metric-cell">
                            <span className="emb-metric-val">{filteredEmbassies.length}</span>
                            <span className="emb-metric-lbl">Country Cards Shown</span>
                        </div>
                        <div className="emb-metric-divider" />
                        <div className="emb-metric-cell">
                            <span className="emb-metric-val">1,420+</span>
                            <span className="emb-metric-lbl">Verified Missions</span>
                        </div>
                        <div className="emb-metric-divider" />
                        <div className="emb-metric-cell">
                            <span className="emb-metric-val">96.4%</span>
                            <span className="emb-metric-lbl">Avg Visa Approval</span>
                        </div>
                        <div className="emb-metric-divider" />
                        <div className="emb-metric-cell">
                            <span className="emb-metric-val">24/7</span>
                            <span className="emb-metric-lbl">Emergency Consular Desks</span>
                        </div>
                    </div>
                </div>

                {/* Quick Bridge to Multi-Part Expedition Studio & Visa Hub */}
                <div className="embassy-hero-actions">
                    <button
                        type="button"
                        className="emb-btn-primary"
                        onClick={() => navigate('/explore/seenomad-multi')}
                    >
                        <Compass size={16} />
                        <span>Launch Multi-Part Expedition Studio</span>
                        <ArrowRight size={15} />
                    </button>

                    <button
                        type="button"
                        className="emb-btn-secondary"
                        onClick={() => navigate('/explore/visa')}
                    >
                        <ShieldCheck size={16} />
                        <span>Open Visa Eligibility Matrix</span>
                    </button>
                </div>
            </header>

            {/* 2. Interactive Real-Time Country Search, Embassies Of / Located In, A-Z & Service Controls */}
            <section className="embassy-controls-bar" aria-label="Embassy Search and Filter Controls">
                <div className="embassy-search-row">
                    <div className={`embassy-search-input-wrap ${searchQuery ? 'is-searching' : ''}`}>
                        <Search size={17} className="emb-search-icon" />
                        <input
                            ref={searchInputRef}
                            type="search"
                            value={searchQuery}
                            onChange={(e) => handleSearchInputChange(e.target.value)}
                            placeholder="Filter country cards by name in real time (e.g. Portugal, Japan, Germany, Brazil)..."
                            className="embassy-search-input"
                            aria-label="Search country cards by name"
                            autoComplete="off"
                        />
                        <span className="emb-search-count-pill" aria-live="polite">
                            {filteredEmbassies.length} / {GLOBAL_EMBASSY_COUNTRIES.length}
                        </span>
                        {searchQuery ? (
                            <button
                                type="button"
                                className="emb-clear-btn"
                                onClick={() => handleSearchInputChange('')}
                                aria-label="Clear search"
                                title="Clear search (Esc)"
                            >
                                <X size={14} />
                            </button>
                        ) : (
                            <kbd className="emb-search-kbd" title="Press / to search">/</kbd>
                        )}
                    </div>

                    {/* Embassies Of Selector */}
                    <div className="embassy-select-group">
                        <label htmlFor="embassies-of-select">Embassies Of</label>
                        <select
                            id="embassies-of-select"
                            value={embassiesOf}
                            onChange={(e) => setEmbassiesOf(e.target.value)}
                            className="embassy-select"
                        >
                            <option value="All Countries">All Countries ({GLOBAL_EMBASSY_COUNTRIES.length})</option>
                            {GLOBAL_EMBASSY_COUNTRIES.map((c) => (
                                <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Located In Selector */}
                    <div className="embassy-select-group">
                        <label htmlFor="located-in-select">Located In</label>
                        <select
                            id="located-in-select"
                            value={locatedIn}
                            onChange={(e) => setLocatedIn(e.target.value)}
                            className="embassy-select"
                        >
                            <option value="All Host Locations">All Host Locations</option>
                            <option value="United States">United States (Washington / NY)</option>
                            <option value="United Kingdom">United Kingdom (London)</option>
                            <option value="India">India (New Delhi / Mumbai)</option>
                            <option value="Japan">Japan (Tokyo)</option>
                            <option value="Germany">Germany (Berlin)</option>
                            <option value="Singapore">Singapore</option>
                            <option value="United Arab Emirates">UAE (Abu Dhabi / Dubai)</option>
                        </select>
                    </div>

                    {/* Region Filter */}
                    <div className="embassy-select-group">
                        <label htmlFor="region-filter-select">Region</label>
                        <select
                            id="region-filter-select"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="embassy-select"
                        >
                            {REGIONS.map((reg) => (
                                <option key={reg} value={reg}>{reg}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* A–Z Country Index Bar */}
                <div className="embassy-az-bar" role="group" aria-label="Filter Country Cards by First Letter">
                    <button
                        type="button"
                        className={`emb-az-btn ${activeLetter === '' ? 'active' : ''}`}
                        onClick={() => setActiveLetter('')}
                    >
                        ALL
                    </button>
                    {ALPHABET.map((letter) => (
                        <button
                            key={letter}
                            type="button"
                            className={`emb-az-btn ${activeLetter === letter ? 'active' : ''}`}
                            onClick={() => setActiveLetter(activeLetter === letter ? '' : letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Segmented Service Filter Buttons */}
                <div className="embassy-service-tabs-row">
                    <div className="embassy-service-tabs" role="tablist" aria-label="Consular Service Filters">
                        {SERVICE_FILTERS.map((srv) => {
                            const Icon = srv.icon;
                            const isActive = selectedService === srv.id;
                            return (
                                <button
                                    key={srv.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`emb-service-tab ${isActive ? 'active' : ''}`}
                                    onClick={() => setSelectedService(srv.id)}
                                >
                                    <Icon size={14} />
                                    <span>{srv.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {(searchQuery || embassiesOf !== 'All Countries' || activeLetter || selectedRegion !== 'All Regions' || selectedService !== 'all' || waitTimeFilter !== 'all') && (
                        <button
                            type="button"
                            className="emb-reset-inline-btn"
                            onClick={handleResetAll}
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </section>

            {/* 2.5 Interactive Global Consulate & Diplomatic Network Map Widget */}
            {activeMapCountry && (
                <section
                    ref={mapWidgetRef}
                    className={`embassy-map-widget ${isMapExpanded ? 'is-expanded' : 'is-collapsed'}`}
                    aria-label="Interactive Global Consulate Locations Map"
                >
                    <div className="emb-map-widget-header">
                        <div className="emb-map-header-left">
                            <span className="emb-map-flag">{activeMapCountry.flag}</span>
                            <div>
                                <div className="emb-map-eyebrow">
                                    <Globe size={12} />
                                    <span>Interactive Consulate & Diplomatic Network Map</span>
                                    <span className="eyebrow-sep">·</span>
                                    <span>{activeMapCountry.missionsAbroad.length} Key Hubs Plotted ({activeMapCountry.embassyCount} Total Worldwide)</span>
                                </div>
                                <h2 className="emb-map-title">
                                    {activeMapCountry.name} Consulates & Diplomatic Missions
                                </h2>
                            </div>
                        </div>

                        <div className="emb-map-header-controls">
                            <div className="emb-map-country-picker">
                                <label htmlFor="map-country-select">Selected Country:</label>
                                <select
                                    id="map-country-select"
                                    value={activeMapCountry.id}
                                    onChange={(e) => {
                                        setMapCountryId(e.target.value);
                                        setActiveMissionIndex(0);
                                    }}
                                    className="emb-map-select"
                                >
                                    {GLOBAL_EMBASSY_COUNTRIES.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.flag} {c.name} ({c.capital})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                className="emb-map-collapse-btn"
                                onClick={() => setIsMapExpanded((prev) => !prev)}
                                aria-expanded={isMapExpanded}
                            >
                                {isMapExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                                <span>{isMapExpanded ? 'Collapse Map' : 'Expand Map'}</span>
                            </button>
                        </div>
                    </div>

                    {isMapExpanded && (
                        <div className="emb-map-widget-body">
                            {/* Left: Interactive World Vector Canvas with diplomatic flight arcs & clickable consulate pins */}
                            <div className="emb-map-canvas" role="region" aria-label={`World map highlighting consulates of ${activeMapCountry.name}`}>
                                <svg
                                    viewBox="0 0 1000 500"
                                    className="emb-world-svg"
                                    preserveAspectRatio="xMidYMid slice"
                                >
                                    <defs>
                                        <linearGradient id="embArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
                                        </linearGradient>
                                        <pattern id="embMapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" />
                                        </pattern>
                                    </defs>

                                    {/* Tactical Grid Background */}
                                    <rect width="1000" height="500" fill="url(#embMapGrid)" />

                                    {/* Equator & Tropics Reference Lines */}
                                    <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(56, 189, 248, 0.14)" strokeDasharray="6 6" strokeWidth="1" />
                                    <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="6 6" strokeWidth="1" />

                                    {/* Stylized Continents Silhouette Paths */}
                                    <g className="emb-map-continents" fill="rgba(30, 41, 59, 0.85)" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1.2">
                                        {/* North America */}
                                        <path d="M 85 75 L 235 65 L 305 135 L 265 215 L 210 245 L 155 210 L 95 145 Z" />
                                        {/* South America */}
                                        <path d="M 245 260 L 335 280 L 365 355 L 315 445 L 270 435 L 250 340 Z" />
                                        {/* Europe */}
                                        <path d="M 445 75 L 575 65 L 605 135 L 555 175 L 455 170 L 435 125 Z" />
                                        {/* Africa */}
                                        <path d="M 450 190 L 575 190 L 620 275 L 575 395 L 510 405 L 475 315 L 435 245 Z" />
                                        {/* Asia */}
                                        <path d="M 590 70 L 865 75 L 905 185 L 835 275 L 725 275 L 635 225 L 585 145 Z" />
                                        {/* Oceania / Australia */}
                                        <path d="M 770 325 L 895 320 L 915 405 L 820 425 L 765 385 Z" />
                                    </g>

                                    {/* Curved Diplomatic Connection Arcs from Home Chancery to Consulates Abroad */}
                                    {(() => {
                                        const chancery = activeMapCountry.missionsAbroad[0];
                                        const homePos = projectLatLngToPercent(chancery?.lat, chancery?.lng);
                                        const hx = homePos.x * 10;
                                        const hy = homePos.y * 5;

                                        return activeMapCountry.missionsAbroad.slice(1).map((mission, idx) => {
                                            const pos = projectLatLngToPercent(mission.lat, mission.lng);
                                            const mx = pos.x * 10;
                                            const my = pos.y * 5;
                                            const cx = (hx + mx) / 2;
                                            const cy = Math.min(hy, my) - 48;
                                            const isSelectedArc = activeMissionIndex === idx + 1;

                                            return (
                                                <path
                                                    key={mission.id || idx}
                                                    d={`M ${hx} ${hy} Q ${cx} ${cy} ${mx} ${my}`}
                                                    fill="none"
                                                    stroke="url(#embArcGrad)"
                                                    strokeWidth={isSelectedArc ? '2.6' : '1.4'}
                                                    strokeDasharray={isSelectedArc ? 'none' : '5 5'}
                                                    opacity={isSelectedArc ? 0.95 : 0.45}
                                                />
                                            );
                                        });
                                    })()}
                                </svg>

                                {/* Interactive Consulate Pin Markers Overlay */}
                                {activeMapCountry.missionsAbroad.map((mission, idx) => {
                                    const pos = projectLatLngToPercent(mission.lat, mission.lng);
                                    const isSelectedPin = activeMissionIndex === idx;
                                    const isChancery = !!mission.isChancery;

                                    return (
                                        <button
                                            key={mission.id || idx}
                                            type="button"
                                            className={`emb-map-pin ${isSelectedPin ? 'selected' : ''} ${isChancery ? 'chancery' : 'consulate'}`}
                                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                            onClick={() => setActiveMissionIndex(idx)}
                                            aria-label={`${mission.city}, ${mission.country} - ${mission.type}`}
                                        >
                                            <span className="pin-pulse" />
                                            <span className="pin-core">
                                                {isChancery ? <Landmark size={11} /> : <MapPin size={11} />}
                                            </span>
                                            <span className="pin-label">{mission.city}</span>
                                        </button>
                                    );
                                })}

                                {/* Map Legend Overlay */}
                                <div className="emb-map-legend">
                                    <span className="legend-item">
                                        <span className="legend-dot chancery" />
                                        Home Chancery ({activeMapCountry.capital})
                                    </span>
                                    <span className="legend-item">
                                        <span className="legend-dot consulate" />
                                        Consulates & Embassies Abroad
                                    </span>
                                </div>
                            </div>

                            {/* Right: Selected Consulate Inspector & Quick Switcher */}
                            <div className="emb-map-inspector">
                                {activeMission && (
                                    <div className="emb-inspector-active-card">
                                        <div className="insp-badge-row">
                                            <span className={`insp-type-badge ${activeMission.isChancery ? 'hq' : ''}`}>
                                                {activeMission.type}
                                            </span>
                                            <span className="insp-status-dot">
                                                <span className="dot" />
                                                {activeMission.status}
                                            </span>
                                        </div>

                                        <h3 className="insp-city-title">
                                            {activeMapCountry.flag} {activeMapCountry.name} Mission in {activeMission.city}
                                        </h3>
                                        <p className="insp-host-country">
                                            <MapPin size={12} />
                                            <span>{activeMission.address || `${activeMission.city}, ${activeMission.country}`}</span>
                                        </p>

                                        <div className="insp-telemetry-row">
                                            <div className="insp-tel-item">
                                                <span>Consular Switchboard</span>
                                                <strong>{activeMission.phone}</strong>
                                            </div>
                                            <div className="insp-tel-actions">
                                                <button
                                                    type="button"
                                                    className="qh-action-icon-btn"
                                                    onClick={(e) => handleCopy(e, activeMission.phone, `${activeMission.city} Mission Phone`)}
                                                    title="Copy mission phone"
                                                >
                                                    {copiedField === `${activeMission.city} Mission Phone` ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeMapCountry.name} Embassy Consulate ${activeMission.city} ${activeMission.country}`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="qh-action-icon-btn call"
                                                    title="Open in Google Maps"
                                                >
                                                    <Navigation size={12} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="emb-inspector-list-header">
                                    <span>Select Consulate Location to Highlight on Map</span>
                                    <span>{activeMissionIndex + 1} / {activeMapCountry.missionsAbroad.length}</span>
                                </div>

                                <div className="emb-inspector-locations-list" role="listbox" aria-label="Consulate Locations">
                                    {activeMapCountry.missionsAbroad.map((mission, idx) => {
                                        const isActive = activeMissionIndex === idx;
                                        return (
                                            <button
                                                key={mission.id || idx}
                                                type="button"
                                                role="option"
                                                aria-selected={isActive}
                                                className={`emb-insp-loc-btn ${isActive ? 'active' : ''}`}
                                                onClick={() => setActiveMissionIndex(idx)}
                                            >
                                                <div className="loc-btn-left">
                                                    <span className={`loc-pin-indicator ${mission.isChancery ? 'hq' : ''}`} />
                                                    <div>
                                                        <strong>{mission.city}, {mission.country}</strong>
                                                        <span>{mission.type}</span>
                                                    </div>
                                                </div>
                                                <span className="loc-coords">
                                                    {mission.lat > 0 ? `${mission.lat.toFixed(1)}°N` : `${Math.abs(mission.lat).toFixed(1)}°S`}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* 3. Global Country Cards Grid */}
            <section className="embassy-cards-grid" aria-label="Global Embassy Country Cards">
                {filteredEmbassies.map((country) => {
                    const isQuickHelpOpen = !!quickHelpMap[country.id];
                    const cleanPhoneHref = `tel:${(country.emergencyHotline || '').replace(/[^+\d]/g, '')}`;
                    return (
                    <motion.article
                        key={country.id}
                        className={`embassy-intel-card country-card ${isQuickHelpOpen ? 'quick-help-active' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedCountry(country)}
                    >
                        {/* Card Hero Header */}
                        <div className="emb-card-media">
                            <img
                                src={country.image}
                                alt={`${country.name} Diplomatic Hub`}
                                className="emb-card-img"
                                loading="lazy"
                            />
                            <div className="emb-card-scrim" />

                            <div className="emb-card-top-bar">
                                <span className="emb-region-tag">
                                    {country.region} · {country.embassyCount} Missions · {country.visaTypeCount} Visa Types
                                </span>
                                <span className="emb-approval-tag">
                                    <ShieldCheck size={12} />
                                    {country.visaApprovalRate} Approval
                                </span>
                            </div>

                            <div className="emb-card-title-row">
                                <span className="emb-flag" aria-hidden="true">{country.flag}</span>
                                <div className="emb-card-title-text">
                                    <h2 className="emb-country-name">{highlightText(country.name, searchQuery)}</h2>
                                    <div className="emb-capital-meta">
                                        <MapPin size={12} />
                                        <span>Chancery: {highlightText(country.capital, searchQuery)}</span>
                                        <span>·</span>
                                        <span>{locatedIn === 'All Host Locations' ? `Wait: ${country.appointmentWait}` : `In ${locatedIn}`}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={`emb-quick-help-toggle ${isQuickHelpOpen ? 'active' : ''}`}
                                    onClick={(e) => toggleQuickHelp(e, country.id)}
                                    aria-expanded={isQuickHelpOpen}
                                    aria-controls={`quick-help-panel-${country.id}`}
                                    title="Toggle Quick Help emergency contacts & immediate consular support"
                                >
                                    <LifeBuoy size={13} className="qh-icon" />
                                    <span>Quick Help</span>
                                    {isQuickHelpOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                            </div>
                        </div>

                        {/* Card Body: Visa Pathway & Direct Consular Contact Telemetry */}
                        <div className="emb-card-body">
                            {/* Expandable Quick Help Panel: Emergency Contacts & Immediate Consular Support */}
                            <AnimatePresence initial={false}>
                                {isQuickHelpOpen && (
                                    <motion.div
                                        id={`quick-help-panel-${country.id}`}
                                        className="emb-quick-help-drawer"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.22, ease: 'easeOut' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="qh-drawer-header">
                                            <div className="qh-status-badge">
                                                <span className="qh-pulse-dot" />
                                                <span>24/7 Emergency Consular Response</span>
                                            </div>
                                            <span className="qh-capital-tag">{country.capital} Desk</span>
                                        </div>

                                        {/* Emergency Contact Numbers */}
                                        <div className="qh-emergency-grid">
                                            <div className="qh-number-card urgent">
                                                <div className="qh-num-meta">
                                                    <span className="qh-num-label">Citizen Crisis & SOS Desk</span>
                                                    <strong className="qh-num-val">{country.emergencyHotline}</strong>
                                                </div>
                                                <div className="qh-num-actions">
                                                    <a
                                                        href={cleanPhoneHref}
                                                        className="qh-action-icon-btn call"
                                                        title={`Call ${country.name} Emergency Desk`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <PhoneCall size={12} />
                                                    </a>
                                                    <button
                                                        type="button"
                                                        className="qh-action-icon-btn"
                                                        onClick={(e) => handleCopy(e, country.emergencyHotline, `${country.name} SOS Line`)}
                                                        title="Copy emergency number"
                                                    >
                                                        {copiedField === `${country.name} SOS Line` ? <Check size={12} /> : <Copy size={12} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="qh-number-card">
                                                <div className="qh-num-meta">
                                                    <span className="qh-num-label">Local Police / Medical / Fire</span>
                                                    <strong className="qh-num-val">112 / 911 Universal Dispatch</strong>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="qh-action-icon-btn"
                                                    onClick={(e) => handleCopy(e, '112', `${country.name} Local Emergency`)}
                                                    title="Copy local emergency number"
                                                >
                                                    {copiedField === `${country.name} Local Emergency` ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Immediate Consular Support Resources */}
                                        <div className="qh-resources-block">
                                            <span className="qh-resources-title">Immediate Consular Support Resources</span>
                                            <div className="qh-resources-grid">
                                                <button
                                                    type="button"
                                                    className="qh-resource-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(e, country.consularEmail, `${country.name} Emergency Passport Desk`);
                                                    }}
                                                >
                                                    <ShieldCheck size={13} className="qh-res-icon" />
                                                    <div>
                                                        <strong>Lost / Stolen Passport</strong>
                                                        <span>Emergency Travel Doc (ETD)</span>
                                                    </div>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="qh-resource-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCountry(country);
                                                    }}
                                                >
                                                    <Building2 size={13} className="qh-res-icon" />
                                                    <div>
                                                        <strong>Hospital & Legal Aid</strong>
                                                        <span>Verified English-Speaking List</span>
                                                    </div>
                                                </button>

                                                <a
                                                    href={country.officialPortal}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="qh-resource-btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={13} className="qh-res-icon" />
                                                    <div>
                                                        <strong>Official Consular Portal</strong>
                                                        <span>Direct E-Visa & Advisory</span>
                                                    </div>
                                                </a>

                                                <button
                                                    type="button"
                                                    className="qh-resource-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(e, country.address, `${country.name} Chancery Address`);
                                                    }}
                                                >
                                                    <MapPin size={13} className="qh-res-icon" />
                                                    <div>
                                                        <strong>Copy Chancery Address</strong>
                                                        <span>{country.address}</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="emb-pathway-box">
                                <div className="pathway-top">
                                    <span className="pathway-label">Primary Visa & Consular Pathway</span>
                                    <span className="pathway-time">
                                        <Clock size={11} />
                                        {country.processingTime}
                                    </span>
                                </div>
                                <div className="pathway-name">{country.visaPathway}</div>
                            </div>

                            {/* Direct Consular Contact Intelligence */}
                            <div className="emb-contact-list">
                                <div className="emb-contact-row">
                                    <div className="contact-left">
                                        <Phone size={13} className="contact-icon emerald" />
                                        <div>
                                            <span className="contact-lbl">24/7 Consular & Emergency Hotline</span>
                                            <strong className="contact-val">{country.emergencyHotline}</strong>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="emb-copy-btn"
                                        onClick={(e) => handleCopy(e, country.emergencyHotline, `${country.name} Hotline`)}
                                        title="Copy hotline number"
                                    >
                                        {copiedField === `${country.name} Hotline` ? <Check size={13} /> : <Copy size={13} />}
                                    </button>
                                </div>

                                <div className="emb-contact-row">
                                    <div className="contact-left">
                                        <Mail size={13} className="contact-icon sky" />
                                        <div>
                                            <span className="contact-lbl">Diplomatic Visa & Citizen Desk</span>
                                            <strong className="contact-val">{country.consularEmail}</strong>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="emb-copy-btn"
                                        onClick={(e) => handleCopy(e, country.consularEmail, `${country.name} Consular Email`)}
                                        title="Copy consular email"
                                    >
                                        {copiedField === `${country.name} Consular Email` ? <Check size={13} /> : <Copy size={13} />}
                                    </button>
                                </div>

                                <div className="emb-contact-row">
                                    <div className="contact-left">
                                        <Clock size={13} className="contact-icon amber" />
                                        <div>
                                            <span className="contact-lbl">Consular Operating Hours</span>
                                            <strong className="contact-val">{country.operatingHours}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="emb-highlights-row">
                                {country.highlights.map((h, i) => (
                                    <span key={i} className="emb-highlight-item">
                                        <CheckCircle2 size={11} className="hl-check" />
                                        <span>{h}</span>
                                    </span>
                                ))}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="emb-card-footer">
                                <button
                                    type="button"
                                    className={`emb-card-btn-map ${activeMapCountry?.id === country.id ? 'active' : ''}`}
                                    onClick={(e) => handleSelectCountryOnMap(e, country, true)}
                                    title={`Highlight ${country.name} consulates on the interactive map`}
                                >
                                    <MapPin size={13} />
                                    <span>Map ({country.missionsAbroad.length})</span>
                                </button>

                                <button
                                    type="button"
                                    className="emb-card-btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCountry(country);
                                    }}
                                >
                                    <FileText size={13} />
                                    <span>Dossier</span>
                                </button>

                                <button
                                    type="button"
                                    className="emb-card-btn-primary"
                                    onClick={(e) => handleOpenMissionsPage(e, country)}
                                >
                                    <span>Missions</span>
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.article>
                    );
                })}
            </section>

            {/* Empty State */}
            {filteredEmbassies.length === 0 && (
                <div className="embassy-empty-state">
                    <Landmark size={36} />
                    <h3>No Country Cards Match Your Current Filter</h3>
                    <p>Try clearing your search query, selecting ALL letters, or switching back to All Regions.</p>
                    <button
                        type="button"
                        className="emb-btn-primary"
                        onClick={handleResetAll}
                    >
                        Reset Embassy Filters
                    </button>
                </div>
            )}

            {/* 4. Expanded Country Consular Dossier Modal */}
            <AnimatePresence>
                {selectedCountry && (
                    <motion.div
                        className="embassy-dossier-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCountry(null)}
                    >
                        <motion.div
                            className="embassy-dossier-modal"
                            initial={{ opacity: 0, scale: 0.96, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedCountry.name} Visa and Consular Dossier`}
                        >
                            <div className="dossier-header">
                                <div className="dossier-title-group">
                                    <span className="dossier-flag">{selectedCountry.flag}</span>
                                    <div>
                                        <span className="dossier-eyebrow">Official Consular & Visa Intelligence</span>
                                        <h2>{selectedCountry.name} Diplomatic Dossier</h2>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="dossier-close-btn"
                                    onClick={() => setSelectedCountry(null)}
                                    aria-label="Close dossier"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="dossier-body">
                                <div className="dossier-kpi-grid">
                                    <div className="dossier-kpi-box">
                                        <span>Primary Pathway</span>
                                        <strong>{selectedCountry.visaPathway}</strong>
                                    </div>
                                    <div className="dossier-kpi-box">
                                        <span>Processing Window</span>
                                        <strong>{selectedCountry.processingTime}</strong>
                                    </div>
                                    <div className="dossier-kpi-box">
                                        <span>24/7 Emergency Desk</span>
                                        <strong>{selectedCountry.emergencyHotline}</strong>
                                    </div>
                                    <div className="dossier-kpi-box">
                                        <span>Chancery Address</span>
                                        <strong>{selectedCountry.address}</strong>
                                    </div>
                                </div>

                                <div className="dossier-two-col">
                                    <div className="dossier-section">
                                        <h3>Key Diplomatic Missions & Consulates ({selectedCountry.embassyCount} Worldwide)</h3>
                                        <div className="dossier-missions-list">
                                            {selectedCountry.missionsAbroad.map((m, idx) => (
                                                <div key={idx} className="dossier-mission-item">
                                                    <div>
                                                        <h4>{selectedCountry.name} {m.type} in {m.city}, {m.country}</h4>
                                                        <span className="mission-status">{m.status}</span>
                                                    </div>
                                                    <div className="mission-phone">
                                                        <Phone size={12} />
                                                        <span>{m.phone}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="dossier-section">
                                        <h3>Mandatory Visa & Consular Checklist</h3>
                                        <ul className="dossier-checklist">
                                            {selectedCountry.checklist.map((item, idx) => (
                                                <li key={idx}>
                                                    <CheckCircle2 size={15} className="chk-icon" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="dossier-footer">
                                <a
                                    href={selectedCountry.officialPortal}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="emb-btn-secondary"
                                >
                                    <Globe size={15} />
                                    <span>Official E-Visa Portal</span>
                                    <ExternalLink size={13} />
                                </a>

                                <div className="dossier-footer-right">
                                    <button
                                        type="button"
                                        className="emb-btn-secondary"
                                        onClick={() => {
                                            const target = selectedCountry;
                                            setSelectedCountry(null);
                                            navigate(`/explore/seenomad-multi?country=${encodeURIComponent(target.name)}`);
                                        }}
                                    >
                                        <Compass size={15} />
                                        <span>Add to Multi-Part Expedition</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="emb-btn-primary"
                                        onClick={(e) => {
                                            const target = selectedCountry;
                                            setSelectedCountry(null);
                                            handleOpenMissionsPage(e, target);
                                        }}
                                    >
                                        <span>Open All {selectedCountry.name} Missions</span>
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Embassy;
