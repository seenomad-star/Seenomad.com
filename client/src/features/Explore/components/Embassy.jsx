import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark, Search, MapPin, Phone, Mail, Globe, Clock, ChevronRight,
    Building2, Plane, AlertCircle, CheckCircle2,
    ExternalLink, ShieldCheck, FileText, Copy, Check, ArrowRight,
    X, Compass, RotateCcw
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

const Embassy = ({ activeFilters = [] }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const setDockConfig = useNavStore((state) => state.setDockConfig);

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
        return GLOBAL_EMBASSY_COUNTRIES.filter((item) => {
            const q = searchQuery.trim().toLowerCase();
            if (q) {
                const matchText = `${item.name} ${item.capital} ${item.visaPathway} ${item.region} ${item.highlights.join(' ')}`.toLowerCase();
                if (!matchText.includes(q)) return false;
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
    }, [searchQuery, embassiesOf, activeLetter, selectedRegion, selectedService, waitTimeFilter, activeFilters]);

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

            {/* 2. Interactive Search, Embassies Of / Located In, A-Z & Service Controls */}
            <section className="embassy-controls-bar" aria-label="Embassy Search and Filter Controls">
                <div className="embassy-search-row">
                    <div className="embassy-search-input-wrap">
                        <Search size={17} className="emb-search-icon" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search any country card, capital city, or visa pathway (e.g. Afghanistan, Albania, Portugal, Japan, Vietnam)..."
                            className="embassy-search-input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="emb-clear-btn"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                <X size={14} />
                            </button>
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

            {/* 3. Global Country Cards Grid */}
            <section className="embassy-cards-grid" aria-label="Global Embassy Country Cards">
                {filteredEmbassies.map((country) => (
                    <motion.article
                        key={country.id}
                        className="embassy-intel-card country-card"
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
                                <div>
                                    <h2 className="emb-country-name">{country.name}</h2>
                                    <div className="emb-capital-meta">
                                        <MapPin size={12} />
                                        <span>Chancery: {country.capital}</span>
                                        <span>·</span>
                                        <span>{locatedIn === 'All Host Locations' ? `Wait: ${country.appointmentWait}` : `In ${locatedIn}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Body: Visa Pathway & Direct Consular Contact Telemetry */}
                        <div className="emb-card-body">
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
                                    className="emb-card-btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCountry(country);
                                    }}
                                >
                                    <FileText size={13} />
                                    <span>Visa & Consular Dossier</span>
                                </button>

                                <button
                                    type="button"
                                    className="emb-card-btn-primary"
                                    onClick={(e) => handleOpenMissionsPage(e, country)}
                                >
                                    <span>View Missions</span>
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
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
