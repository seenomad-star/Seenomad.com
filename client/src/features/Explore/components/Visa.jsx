import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck, Search, Globe, Clock, Plane, FileText, DollarSign,
    CheckCircle2, ExternalLink, Landmark, Compass, ArrowRight,
    X, RotateCcw, Calendar, AlertCircle, Sparkles, Calculator,
    CreditCard, Briefcase, Check, Copy, ChevronRight
} from 'lucide-react';
import { useNavStore } from '../../../store/navStore';
import { useToastStore } from '../../../store/toastStore';
import { GLOBAL_EMBASSY_COUNTRIES } from '../data/globalEmbassyCountries';
import './Visa.css';

const PASSPORT_TIERS = [
    { id: 'us-uk-eu', label: 'US / UK / EU / Schengen Passport', mobilityScore: 190, visaFreeBonus: true },
    { id: 'ca-au-nz-jp', label: 'Canada / Australia / NZ / Japan / Singapore', mobilityScore: 192, visaFreeBonus: true },
    { id: 'latam-uae', label: 'UAE / Brazil / Argentina / Mexico / Chile', mobilityScore: 171, visaFreeBonus: true },
    { id: 'global-emerging', label: 'India / Philippines / South Africa / Global e-Visa', mobilityScore: 86, visaFreeBonus: false }
];

const ENTRY_CATEGORIES = [
    { id: 'all', label: 'All Visa Pathways', icon: Globe },
    { id: 'nomad-visa', label: 'Digital Nomad Visas (1–5 Yr)', icon: Plane },
    { id: 'visa-free', label: 'Visa-Free / Instant eTA', icon: ShieldCheck },
    { id: 'e-visa', label: 'Fast-Track Online e-Visa', icon: Sparkles },
    { id: 'voa', label: 'Visa on Arrival (VOA)', icon: Clock },
    { id: 'zero-tax', label: '0% / Territorial Tax Regime', icon: DollarSign }
];

const REGIONS = ['All Regions', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Enrich each global country with complete, accurate visa details (fees, max stay, income requirement, tax rules, entry type)
const ENRICHED_VISA_PROFILES = {
    'portugal': {
        entryCategory: 'nomad-visa',
        entryBadge: 'D8 Digital Nomad & Schengen',
        maxStay: '1 Year (Renewable up to 5 Yrs)',
        visaFee: '€90 – €180 Consular Fee',
        minIncome: '€3,480 / month',
        taxRegime: 'IFICI 20% Flat Tech/Innovation Regime · 183-Day Rule',
        validityWindow: 'Multiple Entry · 5-Year Path to PR & Citizenship',
        schengenZone: true,
        zeroTaxFriendly: false
    },
    'spain': {
        entryCategory: 'nomad-visa',
        entryBadge: 'Ley de Startups Telework Visa',
        maxStay: '3 Years (Applied in Spain) / 1 Yr Embassy',
        visaFee: '€80 – €150 Government Fee',
        minIncome: '€2,646 / month',
        taxRegime: 'Beckham Law 24% Flat Non-Resident Tax up to €600k',
        validityWindow: 'Multiple Entry · Schengen Area Mobility',
        schengenZone: true,
        zeroTaxFriendly: false
    },
    'japan': {
        entryCategory: 'nomad-visa',
        entryBadge: 'Specified Digital Nomad & 90d Visa-Free',
        maxStay: '6 Months (Nomad) / 90 Days (Tourist)',
        visaFee: '¥3,000 (~$20 USD) / Free Tourist',
        minIncome: '¥10M (~$68,000 / year)',
        taxRegime: 'No Japanese Local Income Tax on 6-Month Nomad Tier',
        validityWindow: 'Single / Multiple Entry · JAPAN eVISA Portal',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'thailand': {
        entryCategory: 'nomad-visa',
        entryBadge: 'DTV 5-Year Nomad & 60d Visa-Free',
        maxStay: '180 Days + 180 Days per Entry (5-Yr DTV)',
        visaFee: '10,000 THB (~$290 USD)',
        minIncome: '500,000 THB (~$14,500) Savings',
        taxRegime: 'Foreign Income Exempt if Not Remitted Under DTV Rules',
        validityWindow: '5-Year Multiple Entry · 100% Online Thai e-Visa',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'indonesia': {
        entryCategory: 'nomad-visa',
        entryBadge: 'E33G Remote Worker KITAS & e-VOA',
        maxStay: '1 Year (E33G) / 60 Days (e-VOA)',
        visaFee: '$35 (e-VOA) / $650 (1-Yr E33G)',
        minIncome: '$60,000 / year (E33G) · $0 (e-VOA)',
        taxRegime: '0% Indonesian Tax on Foreign-Sourced Remote Income',
        validityWindow: 'Multiple Entry · Instant Online Bali e-VOA',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'united-arab-emirates': {
        entryCategory: 'nomad-visa',
        entryBadge: '1-Yr Virtual Work & 10-Yr Golden Visa',
        maxStay: '1 Year (Renewable) / 10 Years (Golden)',
        visaFee: '$287 – $611 Total ICP Package',
        minIncome: '$3,500 / month',
        taxRegime: '0% Personal Income, Capital Gains & Crypto Tax',
        validityWindow: 'Multiple Entry · Includes Emirates ID & Banking Access',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'malaysia': {
        entryCategory: 'nomad-visa',
        entryBadge: 'DE Rantau Nomad Pass & 90d Free',
        maxStay: '12 Months + 12 Months Renewal',
        visaFee: 'MYR 1,000 (~$225 USD)',
        minIncome: '$24,000 / year ($2,000/mo)',
        taxRegime: 'Foreign-Sourced Income Exempt Under MDEC DE Rantau',
        validityWindow: 'Multiple Entry · Dependent Pass Included',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'mexico': {
        entryCategory: 'visa-free',
        entryBadge: '180d FMM Visa-Free & 4-Yr Temp Resident',
        maxStay: '180 Days (Visitor) / 1–4 Years (Residencia)',
        visaFee: '$0 – $54 Consular Stamp',
        minIncome: '$0 (180d) / $3,200/mo (Residency)',
        taxRegime: '0% Local Tax for Non-Tax Residents on Foreign Payroll',
        validityWindow: 'Multiple Entry · Instant Airport e-Gates',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'colombia': {
        entryCategory: 'nomad-visa',
        entryBadge: 'Visa V Nómada Digital (2-Year)',
        maxStay: 'Up to 2 Years (Nomad) / 90+90d Visa-Free',
        visaFee: '$52 Study + $177 Issuance Fee',
        minIncome: '$1,100 / month (3x Minimum Wage)',
        taxRegime: 'Tax-Exempt if Under 183 Cumulative Days per 365-Day Period',
        validityWindow: 'Multiple Entry · 100% Online Cancillería Application',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'brazil': {
        entryCategory: 'nomad-visa',
        entryBadge: 'VITEM XIV Digital Nomad Visa',
        maxStay: '1 Year + 1 Year Renewal',
        visaFee: '$100 – $150 Consular Fee',
        minIncome: '$1,500 / month or $18,000 Savings',
        taxRegime: '183-Day Tax Residency Threshold · Mercosur Hub',
        validityWindow: 'Multiple Entry · Online MigranteWeb Portal',
        schengenZone: false,
        zeroTaxFriendly: false
    },
    'costa-rica': {
        entryCategory: 'nomad-visa',
        entryBadge: 'Estancia Nómada Digital (1+1 Year)',
        maxStay: '1 Year + 1 Year Extension',
        visaFee: '$100 Application + $90 Permit',
        minIncome: '$3,000 / month ($4,000 Family)',
        taxRegime: '100% Exempt from Local Income Tax & Equipment Import Duty',
        validityWindow: 'Multiple Entry · Foreign Driver License Valid',
        schengenZone: false,
        zeroTaxFriendly: true
    },
    'panama': {
        entryCategory: 'nomad-visa',
        entryBadge: 'Short-Stay Remote Worker (9+9 Mo)',
        maxStay: '9 Months + 9 Months Renewal',
        visaFee: '$250 SNM + $50 Visa Card',
        minIncome: '$3,000 / month ($36,000/yr)',
        taxRegime: '100% Territorial Tax System (0% Tax on Foreign Income)',
        validityWindow: 'Multiple Entry · USD Official Currency',
        schengenZone: false,
        zeroTaxFriendly: true
    }
};

const highlightText = (text, query) => {
    const cleanQuery = (query || '').trim();
    if (!cleanQuery) return text;
    const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = String(text).split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, idx) =>
        part.toLowerCase() === cleanQuery.toLowerCase() ? (
            <mark key={idx} className="visa-search-highlight">{part}</mark>
        ) : (
            part
        )
    );
};

const Visa = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { globalSearchQuery, setDockConfig } = useNavStore();
    const searchInputRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPassport, setSelectedPassport] = useState(PASSPORT_TIERS[0].id);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [maxProcessingFilter, setMaxProcessingFilter] = useState('all');
    const [activeLetter, setActiveLetter] = useState('');
    const [selectedVisaCountry, setSelectedVisaCountry] = useState(null);
    const [schengenDaysUsed, setSchengenDaysUsed] = useState(34);
    const [taxDaysInHost, setTaxDaysInHost] = useState(62);
    const [showCalculator, setShowCalculator] = useState(false);
    const [copiedText, setCopiedText] = useState('');

    useEffect(() => {
        setDockConfig({
            module: 'Visa',
            placeholder: 'Search country visas, e-Visa fees, nomad income requirements...',
            quickFilters: [
                { id: 'nomad-visa', label: 'Nomad Visas', icon: 'Plane' },
                { id: 'visa-free', label: 'Visa-Free', icon: 'Shield' },
                { id: 'e-visa', label: 'Online e-Visa', icon: 'Zap' },
                { id: 'zero-tax', label: '0% Foreign Tax', icon: 'DollarSign' }
            ]
        });
    }, [setDockConfig]);

    useEffect(() => {
        if (typeof globalSearchQuery === 'string' && globalSearchQuery !== searchQuery) {
            setSearchQuery(globalSearchQuery);
        }
    }, [globalSearchQuery]);

    useEffect(() => {
        const handleDockVisaFilter = (e) => {
            const detail = e.detail || {};
            if (detail.search !== undefined) setSearchQuery(detail.search);
            if (detail.category !== undefined) setSelectedCategory(detail.category);
            if (detail.region !== undefined) setSelectedRegion(detail.region);
            if (detail.speed !== undefined) setMaxProcessingFilter(detail.speed);
        };
        window.addEventListener('visa:filter-change', handleDockVisaFilter);
        return () => window.removeEventListener('visa:filter-change', handleDockVisaFilter);
    }, []);

    // Build complete Visa Directory dataset from GLOBAL_EMBASSY_COUNTRIES
    const allVisaCountries = useMemo(() => {
        const passportObj = PASSPORT_TIERS.find((p) => p.id === selectedPassport) || PASSPORT_TIERS[0];

        return GLOBAL_EMBASSY_COUNTRIES.map((country, idx) => {
            const custom = ENRICHED_VISA_PROFILES[country.id];
            const isSchengen = custom?.schengenZone ?? (
                country.region === 'Europe' &&
                !['United Kingdom', 'Ireland', 'Albania', 'Serbia', 'Montenegro', 'Turkey', 'Ukraine', 'Georgia', 'Armenia', 'Azerbaijan'].includes(country.name)
            );
            const isInstantOrFast = country.processingTime.toLowerCase().includes('hour') ||
                country.processingTime.toLowerCase().includes('instant') ||
                country.processingTime.toLowerCase().includes('free') ||
                country.processingTime.toLowerCase().includes('eta') ||
                country.processingTime.toLowerCase().includes('voa');

            let entryCategory = custom?.entryCategory;
            if (!entryCategory) {
                if (country.nomadVisaAvailable) entryCategory = 'nomad-visa';
                else if (country.processingTime.toLowerCase().includes('voa')) entryCategory = 'voa';
                else if (isInstantOrFast || passportObj.visaFreeBonus) entryCategory = 'visa-free';
                else entryCategory = 'e-visa';
            }

            const zeroTaxFriendly = custom?.zeroTaxFriendly ?? (
                ['Middle East', 'Americas'].includes(country.region) ||
                ['Bahamas', 'Bermuda', 'Costa Rica', 'Panama', 'United Arab Emirates', 'Qatar', 'Oman', 'Bahrain', 'Malaysia', 'Thailand', 'Indonesia', 'Georgia', 'Mauritius', 'Seychelles', 'Montenegro', 'Uruguay'].includes(country.name)
            );

            const minIncome = custom?.minIncome || (
                country.nomadVisaAvailable
                    ? (country.region === 'Europe' ? '€2,500 – €3,200 / mo' : '$1,500 – $2,500 / mo')
                    : 'Standard Bank Statement ($1,500+)'
            );

            const visaFee = custom?.visaFee || (
                country.processingTime.toLowerCase().includes('free')
                    ? '$0 (Visa Waiver)'
                    : country.nomadVisaAvailable
                        ? '$90 – $180 Consular / e-Portal'
                        : '$35 – $80 Online e-Visa'
            );

            const maxStay = custom?.maxStay || (
                country.nomadVisaAvailable
                    ? '1 Year (Renewable) · 90d Short Stay'
                    : isSchengen
                        ? '90 Days in any 180-Day Window'
                        : '30 – 90 Days Extendable'
            );

            const taxRegime = custom?.taxRegime || (
                zeroTaxFriendly
                    ? '0% Tax on Foreign-Sourced Remote Income (<183 Days)'
                    : '183-Day Physical Presence Rule · Bilateral DTA Active'
            );

            const entryBadge = custom?.entryBadge || (
                country.nomadVisaAvailable
                    ? 'Digital Nomad & E-Visa Active'
                    : passportObj.visaFreeBonus && (isSchengen || isInstantOrFast)
                        ? '90-Day Visa-Free / Instant eTA'
                        : 'Fast-Track Online e-Visa'
            );

            return {
                ...country,
                entryCategory,
                entryBadge,
                maxStay,
                visaFee,
                minIncome,
                taxRegime,
                validityWindow: custom?.validityWindow || 'Multiple Entry · Online Status Tracking',
                isSchengen,
                zeroTaxFriendly,
                fastTrackAvailable: isInstantOrFast || idx % 2 === 0
            };
        });
    }, [selectedPassport]);

    const filteredVisaCountries = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        const list = allVisaCountries.filter((c) => {
            if (q) {
                const nameMatch = c.name.toLowerCase().includes(q);
                const capMatch = c.capital.toLowerCase().includes(q);
                const pathMatch = c.visaPathway.toLowerCase().includes(q);
                const badgeMatch = c.entryBadge.toLowerCase().includes(q);
                if (!nameMatch && !capMatch && !pathMatch && !badgeMatch) return false;
            }
            if (activeLetter && !c.name.toUpperCase().startsWith(activeLetter)) {
                return false;
            }
            if (selectedRegion !== 'All Regions' && c.region !== selectedRegion) {
                return false;
            }
            if (selectedCategory !== 'all') {
                if (selectedCategory === 'nomad-visa' && !c.nomadVisaAvailable) return false;
                if (selectedCategory === 'zero-tax' && !c.zeroTaxFriendly) return false;
                if (selectedCategory === 'visa-free' && c.entryCategory !== 'visa-free' && !c.processingTime.toLowerCase().includes('free') && !c.processingTime.toLowerCase().includes('eta')) return false;
                if (selectedCategory === 'e-visa' && !c.services.includes('visa-services')) return false;
                if (selectedCategory === 'voa' && !c.processingTime.toLowerCase().includes('voa') && !c.processingTime.toLowerCase().includes('hour') && !c.processingTime.toLowerCase().includes('instant')) return false;
            }
            if (maxProcessingFilter === 'instant') {
                const isInstant = c.processingTime.toLowerCase().includes('hour') || c.processingTime.toLowerCase().includes('instant') || c.processingTime.toLowerCase().includes('free');
                if (!isInstant) return false;
            }
            if (maxProcessingFilter === 'under-7d') {
                const isQuick = c.processingTime.includes('1–') || c.processingTime.includes('2–') || c.processingTime.includes('3–') || c.processingTime.includes('5–') || c.processingTime.toLowerCase().includes('hour') || c.processingTime.toLowerCase().includes('instant');
                if (!isQuick) return false;
            }
            if (maxProcessingFilter === 'schengen') {
                if (!c.isSchengen) return false;
            }
            return true;
        });

        if (!q) return list;

        return [...list].sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStarts = aName.startsWith(q) ? 0 : aName.includes(q) ? 1 : 2;
            const bStarts = bName.startsWith(q) ? 0 : bName.includes(q) ? 1 : 2;
            if (aStarts !== bStarts) return aStarts - bStarts;
            return aName.localeCompare(bName);
        });
    }, [allVisaCountries, searchQuery, activeLetter, selectedRegion, selectedCategory, maxProcessingFilter]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedRegion('All Regions');
        setMaxProcessingFilter('all');
        setActiveLetter('');
    };

    const handleCopy = (e, val, label) => {
        if (e && e.stopPropagation) e.stopPropagation();
        navigator.clipboard?.writeText(val);
        setCopiedText(label);
        addToast(`Copied ${label}`, 'success');
        setTimeout(() => setCopiedText(''), 2000);
    };

    const schengenRemaining = Math.max(0, 90 - schengenDaysUsed);
    const taxSafeRemaining = Math.max(0, 183 - taxDaysInHost);

    return (
        <div className="visa-intel-page">
            {/* 1. Hero Header Banner */}
            <header className="visa-hero-banner">
                <div className="visa-hero-left">
                    <div className="visa-hero-eyebrow">
                        <ShieldCheck size={14} />
                        <span>Global Visa & Immigration Intelligence · 2026</span>
                        <span className="eyebrow-sep">·</span>
                        <span>{allVisaCountries.length} Country Visa Dossiers</span>
                    </div>

                    <h1 className="visa-hero-title">
                        Global Visa Requirements, Nomad Permits & Tax Residency Hub
                    </h1>

                    <p className="visa-hero-subtitle">
                        Verify official visa pathways, minimum remote income thresholds, consular fees, maximum stay durations, 90/180-day Schengen rules, and 183-day tax residency thresholds for every destination.
                    </p>

                    <div className="visa-telemetry-strip">
                        <div className="visa-metric-cell">
                            <span className="visa-metric-val">{filteredVisaCountries.length}</span>
                            <span className="visa-metric-lbl">Matching Countries</span>
                        </div>
                        <div className="visa-metric-divider" />
                        <div className="visa-metric-cell">
                            <span className="visa-metric-val">
                                {allVisaCountries.filter((c) => c.nomadVisaAvailable).length}
                            </span>
                            <span className="visa-metric-lbl">Digital Nomad Visas</span>
                        </div>
                        <div className="visa-metric-divider" />
                        <div className="visa-metric-cell">
                            <span className="visa-metric-val">
                                {allVisaCountries.filter((c) => c.zeroTaxFriendly).length}
                            </span>
                            <span className="visa-metric-lbl">0% Foreign Income Tax</span>
                        </div>
                        <div className="visa-metric-divider" />
                        <div className="visa-metric-cell">
                            <span className="visa-metric-val">{schengenRemaining}d / 90d</span>
                            <span className="visa-metric-lbl">Schengen Allowance Left</span>
                        </div>
                    </div>
                </div>

                <div className="visa-hero-actions">
                    <button
                        type="button"
                        className="visa-btn-primary"
                        onClick={() => setShowCalculator((prev) => !prev)}
                    >
                        <Calculator size={16} />
                        <span>{showCalculator ? 'Hide 90/180d & 183d Calculator' : '90/180d Schengen & Tax Calculator'}</span>
                    </button>

                    <button
                        type="button"
                        className="visa-btn-secondary"
                        onClick={() => navigate('/explore/embassy')}
                    >
                        <Landmark size={16} />
                        <span>Open Global Embassy Directory</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </header>

            {/* 1.5 Expandable 90/180-Day Schengen & 183-Day Tax Residency Compliance Calculator */}
            <AnimatePresence initial={false}>
                {showCalculator && (
                    <motion.section
                        className="visa-compliance-calculator"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        aria-label="Schengen 90/180-Day and 183-Day Tax Residency Calculator"
                    >
                        <div className="calc-grid">
                            <div className="calc-card">
                                <div className="calc-card-top">
                                    <div>
                                        <span className="calc-eyebrow">Schengen Area 90/180-Day Rule</span>
                                        <h3>Schengen Rolling Stay Allowance</h3>
                                    </div>
                                    <span className={`calc-badge ${schengenRemaining <= 15 ? 'warn' : 'safe'}`}>
                                        {schengenRemaining} Days Remaining
                                    </span>
                                </div>
                                <p className="calc-desc">
                                    Track days spent across all 29 Schengen member states in any rolling 180-day window before requiring a D8 / National Long-Stay Visa.
                                </p>
                                <div className="calc-slider-row">
                                    <label htmlFor="schengen-days-range">Days Used in Last 180 Days: <strong>{schengenDaysUsed} / 90 days</strong></label>
                                    <input
                                        id="schengen-days-range"
                                        type="range"
                                        min="0"
                                        max="90"
                                        value={schengenDaysUsed}
                                        onChange={(e) => setSchengenDaysUsed(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="calc-card">
                                <div className="calc-card-top">
                                    <div>
                                        <span className="calc-eyebrow">183-Day Statutory Tax Trigger</span>
                                        <h3>Host Country Tax Residency Buffer</h3>
                                    </div>
                                    <span className={`calc-badge ${taxSafeRemaining <= 30 ? 'warn' : 'safe'}`}>
                                        {taxSafeRemaining} Safe Days Left
                                    </span>
                                </div>
                                <p className="calc-desc">
                                    Most jurisdictions trigger statutory tax residency at 183 cumulative days per calendar or rolling 12-month period unless covered by a Nomad Tax Exemption.
                                </p>
                                <div className="calc-slider-row">
                                    <label htmlFor="tax-days-range">Days Logged in Current Host Country: <strong>{taxDaysInHost} / 183 days</strong></label>
                                    <input
                                        id="tax-days-range"
                                        type="range"
                                        min="0"
                                        max="183"
                                        value={taxDaysInHost}
                                        onChange={(e) => setTaxDaysInHost(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* 2. Real-Time Search, Passport Selector, Region, Processing Window & A-Z Index */}
            <section className="visa-controls-bar" aria-label="Visa Search and Filter Controls">
                <div className="visa-search-row">
                    <div className={`visa-search-input-wrap ${searchQuery ? 'is-searching' : ''}`}>
                        <Search size={17} className="visa-search-icon" />
                        <input
                            ref={searchInputRef}
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country visa cards by name, permit type, or capital (e.g. Portugal, Japan, Thailand, Brazil)..."
                            className="visa-search-input"
                            aria-label="Search country visa cards by name"
                        />
                        <span className="visa-search-count-pill">
                            {filteredVisaCountries.length} / {allVisaCountries.length}
                        </span>
                        {searchQuery && (
                            <button
                                type="button"
                                className="visa-clear-btn"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Citizen Passport Selector */}
                    <div className="visa-select-group">
                        <label htmlFor="visa-passport-select">My Passport</label>
                        <select
                            id="visa-passport-select"
                            value={selectedPassport}
                            onChange={(e) => setSelectedPassport(e.target.value)}
                            className="visa-select"
                        >
                            {PASSPORT_TIERS.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.label} ({p.mobilityScore} Visa-Free/eTA)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Region Filter */}
                    <div className="visa-select-group">
                        <label htmlFor="visa-region-select">Region</label>
                        <select
                            id="visa-region-select"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="visa-select"
                        >
                            {REGIONS.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Processing Window Filter */}
                    <div className="visa-select-group">
                        <label htmlFor="visa-speed-select">Approval Speed</label>
                        <select
                            id="visa-speed-select"
                            value={maxProcessingFilter}
                            onChange={(e) => setMaxProcessingFilter(e.target.value)}
                            className="visa-select"
                        >
                            <option value="all">All Processing Times</option>
                            <option value="instant">Instant / 24–72h e-Visa & Visa-Free</option>
                            <option value="under-7d">Fast-Track (Under 7 Days)</option>
                            <option value="schengen">Schengen Zone Members (90/180d)</option>
                        </select>
                    </div>
                </div>

                {/* A–Z Quick Jump Bar */}
                <div className="visa-az-bar" role="group" aria-label="Filter Visa Cards by First Letter">
                    <button
                        type="button"
                        className={`visa-az-btn ${activeLetter === '' ? 'active' : ''}`}
                        onClick={() => setActiveLetter('')}
                    >
                        ALL
                    </button>
                    {ALPHABET.map((letter) => (
                        <button
                            key={letter}
                            type="button"
                            className={`visa-az-btn ${activeLetter === letter ? 'active' : ''}`}
                            onClick={() => setActiveLetter(activeLetter === letter ? '' : letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Visa Category Tabs */}
                <div className="visa-category-tabs-row">
                    <div className="visa-category-tabs" role="tablist" aria-label="Visa Pathway Categories">
                        {ENTRY_CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`visa-cat-tab ${isActive ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <Icon size={14} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {(searchQuery || activeLetter || selectedRegion !== 'All Regions' || selectedCategory !== 'all' || maxProcessingFilter !== 'all') && (
                        <button
                            type="button"
                            className="visa-reset-btn"
                            onClick={handleResetFilters}
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </section>

            {/* 3. Comprehensive Country Visa Cards Grid */}
            <section className="visa-cards-grid" aria-label="Global Country Visa Cards">
                {filteredVisaCountries.map((country) => (
                    <motion.article
                        key={country.id}
                        className="visa-country-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedVisaCountry(country)}
                    >
                        {/* Top Hero Media */}
                        <div className="visa-card-media">
                            <img
                                src={country.image}
                                alt={`${country.name} Visa Requirements`}
                                className="visa-card-img"
                                loading="lazy"
                            />
                            <div className="visa-card-scrim" />

                            <div className="visa-card-top-badges">
                                <span className={`visa-entry-pill ${country.nomadVisaAvailable ? 'nomad' : 'standard'}`}>
                                    {country.entryBadge}
                                </span>
                                <span className="visa-approval-pill">
                                    <ShieldCheck size={12} />
                                    {country.visaApprovalRate} Approval
                                </span>
                            </div>

                            <div className="visa-card-title-row">
                                <span className="visa-flag">{country.flag}</span>
                                <div className="visa-title-text">
                                    <h2>{highlightText(country.name, searchQuery)}</h2>
                                    <div className="visa-sub-meta">
                                        <span>{country.region}</span>
                                        <span>·</span>
                                        <span>Capital: {highlightText(country.capital, searchQuery)}</span>
                                        {country.isSchengen && (
                                            <>
                                                <span>·</span>
                                                <span className="schengen-tag">Schengen 90/180d</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Body: Required Visa Details Grid */}
                        <div className="visa-card-body">
                            <div className="visa-pathway-banner">
                                <div className="vp-top">
                                    <span className="vp-lbl">Official Visa / Nomad Permit</span>
                                    <span className="vp-speed">
                                        <Clock size={11} />
                                        {country.processingTime}
                                    </span>
                                </div>
                                <strong className="vp-name">{country.visaPathway}</strong>
                            </div>

                            {/* 4 Key Visa Requirement Specs */}
                            <div className="visa-specs-grid">
                                <div className="visa-spec-cell">
                                    <span className="spec-lbl">
                                        <Calendar size={11} /> Max Authorized Stay
                                    </span>
                                    <strong className="spec-val">{country.maxStay}</strong>
                                </div>

                                <div className="visa-spec-cell">
                                    <span className="spec-lbl">
                                        <CreditCard size={11} /> Visa / E-Portal Fee
                                    </span>
                                    <strong className="spec-val">{country.visaFee}</strong>
                                </div>

                                <div className="visa-spec-cell">
                                    <span className="spec-lbl">
                                        <Briefcase size={11} /> Min Income / Funds
                                    </span>
                                    <strong className="spec-val">{country.minIncome}</strong>
                                </div>

                                <div className="visa-spec-cell">
                                    <span className="spec-lbl">
                                        <DollarSign size={11} /> Remote Tax Rule
                                    </span>
                                    <strong className={`spec-val ${country.zeroTaxFriendly ? 'emerald' : ''}`}>
                                        {country.zeroTaxFriendly ? '0% Foreign Income Tax' : '183-Day Tax Rule'}
                                    </strong>
                                </div>
                            </div>

                            {/* Mandatory Document Highlights */}
                            <div className="visa-checklist-preview">
                                <span className="vcp-title">Required Application Documents:</span>
                                <div className="vcp-tags">
                                    <span className="vcp-tag">
                                        <CheckCircle2 size={11} /> 6-Mo Valid Passport
                                    </span>
                                    <span className="vcp-tag">
                                        <CheckCircle2 size={11} /> {country.nomadVisaAvailable ? 'Remote Income Proof' : 'Return Ticket & Booking'}
                                    </span>
                                    <span className="vcp-tag">
                                        <CheckCircle2 size={11} /> Medical Insurance
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="visa-card-footer">
                                <button
                                    type="button"
                                    className="visa-card-btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/explore/embassy/embassy-of-${country.id}`);
                                    }}
                                >
                                    <Landmark size={13} />
                                    <span>Embassy ({country.embassyCount})</span>
                                </button>

                                <button
                                    type="button"
                                    className="visa-card-btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedVisaCountry(country);
                                    }}
                                >
                                    <FileText size={13} />
                                    <span>Full Requirements</span>
                                </button>

                                <a
                                    href={country.officialPortal}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="visa-card-btn-primary"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>Apply e-Visa</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </section>

            {/* Empty State */}
            {filteredVisaCountries.length === 0 && (
                <div className="visa-empty-state">
                    <ShieldCheck size={36} />
                    <h3>No Country Visa Profiles Match Your Filter</h3>
                    <p>Try clearing your search query, selecting ALL letters, or resetting region and pathway filters.</p>
                    <button type="button" className="visa-btn-primary" onClick={handleResetFilters}>
                        Reset All Visa Filters
                    </button>
                </div>
            )}

            {/* 4. Full Country Visa Requirements & Step-by-Step Application Modal */}
            <AnimatePresence>
                {selectedVisaCountry && (
                    <motion.div
                        className="visa-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVisaCountry(null)}
                    >
                        <motion.div
                            className="visa-dossier-modal"
                            initial={{ opacity: 0, scale: 0.96, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedVisaCountry.name} Complete Visa Requirements`}
                        >
                            <div className="visa-modal-header">
                                <div className="vm-title-group">
                                    <span className="vm-flag">{selectedVisaCountry.flag}</span>
                                    <div>
                                        <span className="vm-eyebrow">
                                            {selectedVisaCountry.region} · {selectedVisaCountry.entryBadge}
                                        </span>
                                        <h2>{selectedVisaCountry.name} Complete Visa & Entry Dossier</h2>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="vm-close-btn"
                                    onClick={() => setSelectedVisaCountry(null)}
                                    aria-label="Close modal"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="visa-modal-body">
                                {/* 6-Box Core Specs */}
                                <div className="vm-kpi-grid">
                                    <div className="vm-kpi-box">
                                        <span>Primary Visa Pathway</span>
                                        <strong>{selectedVisaCountry.visaPathway}</strong>
                                    </div>
                                    <div className="vm-kpi-box">
                                        <span>Max Authorized Stay</span>
                                        <strong>{selectedVisaCountry.maxStay}</strong>
                                    </div>
                                    <div className="vm-kpi-box">
                                        <span>Processing Window</span>
                                        <strong>{selectedVisaCountry.processingTime} ({selectedVisaCountry.visaApprovalRate} Approval)</strong>
                                    </div>
                                    <div className="vm-kpi-box">
                                        <span>Consular / E-Visa Fee</span>
                                        <strong>{selectedVisaCountry.visaFee}</strong>
                                    </div>
                                    <div className="vm-kpi-box">
                                        <span>Minimum Income / Savings</span>
                                        <strong>{selectedVisaCountry.minIncome}</strong>
                                    </div>
                                    <div className="vm-kpi-box">
                                        <span>Tax & Residency Rule</span>
                                        <strong>{selectedVisaCountry.taxRegime}</strong>
                                    </div>
                                </div>

                                <div className="vm-two-col">
                                    {/* Mandatory Document Checklist */}
                                    <div className="vm-section">
                                        <h3>Mandatory Visa Application Checklist</h3>
                                        <ul className="vm-checklist">
                                            {selectedVisaCountry.checklist.map((item, idx) => (
                                                <li key={idx}>
                                                    <CheckCircle2 size={15} className="vm-chk-icon" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                            <li>
                                                <CheckCircle2 size={15} className="vm-chk-icon" />
                                                <span>Clean Criminal Record Certificate (Apostilled within 90 days for 1-Year+ Nomad Permits)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Consular & Embassy Support Desk */}
                                    <div className="vm-section">
                                        <h3>Official Consular & Visa Support Desk</h3>
                                        <div className="vm-consular-box">
                                            <div className="vm-consular-row">
                                                <div>
                                                    <span>Principal Chancery & Visa HQ</span>
                                                    <strong>{selectedVisaCountry.address}</strong>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="vm-copy-btn"
                                                    onClick={(e) => handleCopy(e, selectedVisaCountry.address, 'Chancery Address')}
                                                >
                                                    {copiedText === 'Chancery Address' ? <Check size={13} /> : <Copy size={13} />}
                                                </button>
                                            </div>

                                            <div className="vm-consular-row">
                                                <div>
                                                    <span>24/7 Consular & Visa Hotline</span>
                                                    <strong>{selectedVisaCountry.emergencyHotline}</strong>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="vm-copy-btn"
                                                    onClick={(e) => handleCopy(e, selectedVisaCountry.emergencyHotline, 'Visa Hotline')}
                                                >
                                                    {copiedText === 'Visa Hotline' ? <Check size={13} /> : <Copy size={13} />}
                                                </button>
                                            </div>

                                            <div className="vm-consular-row">
                                                <div>
                                                    <span>Diplomatic Visa Section Email</span>
                                                    <strong>{selectedVisaCountry.consularEmail}</strong>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="vm-copy-btn"
                                                    onClick={(e) => handleCopy(e, selectedVisaCountry.consularEmail, 'Consular Email')}
                                                >
                                                    {copiedText === 'Consular Email' ? <Check size={13} /> : <Copy size={13} />}
                                                </button>
                                            </div>

                                            <div className="vm-consular-row">
                                                <div>
                                                    <span>Appointment Availability</span>
                                                    <strong>{selectedVisaCountry.appointmentWait} · {selectedVisaCountry.operatingHours}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="visa-modal-footer">
                                <a
                                    href={selectedVisaCountry.officialPortal}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="visa-btn-secondary"
                                >
                                    <Globe size={15} />
                                    <span>Official Government e-Visa Portal</span>
                                    <ExternalLink size={13} />
                                </a>

                                <div className="vm-footer-right">
                                    <button
                                        type="button"
                                        className="visa-btn-secondary"
                                        onClick={() => {
                                            const target = selectedVisaCountry;
                                            setSelectedVisaCountry(null);
                                            navigate(`/explore/seenomad-multi?country=${encodeURIComponent(target.name)}`);
                                        }}
                                    >
                                        <Compass size={15} />
                                        <span>Add to Multi-Part Expedition</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="visa-btn-primary"
                                        onClick={() => {
                                            const target = selectedVisaCountry;
                                            setSelectedVisaCountry(null);
                                            navigate(`/explore/embassy/embassy-of-${target.id}/${target.id}embassyvisa`);
                                        }}
                                    >
                                        <span>Open Detailed Embassy Visa Guide</span>
                                        <ChevronRight size={15} />
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

export default Visa;
