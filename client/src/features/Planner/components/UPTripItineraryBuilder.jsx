import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, MapPin, Plane, Train, Bed, Wifi, Utensils,
    Compass, Sparkles, Plus, Trash2, ArrowUp, ArrowDown,
    CheckCircle2, DollarSign, Clock, Users, Share2, Download,
    Map, GitBranch, Briefcase, Bookmark, Check, Search, Filter,
    ChevronDown, ChevronRight, ExternalLink, Printer, Landmark,
    Camera, ShieldCheck, Sun, Car, RefreshCw, Layers
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import { useItineraryStore } from '../../../store/itineraryStore';
import { uttarPradeshDestinations } from '../../../data/uttarPradeshDestinationsData';
import { UTTAR_PRADESH_ITINERARY_PRESETS } from '../../../data/uttarPradeshItineraries';
import '../../../styles/ItineraryBuilder.css';

// All 75 districts of Uttar Pradesh
const UP_DISTRICTS = [
    'All 75 Districts',
    'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya',
    'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki',
    'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli',
    'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad',
    'Gautam Buddha Nagar (Noida)', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur',
    'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj',
    'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri (Lakhimpur Kheri)',
    'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura',
    'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
    'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar',
    'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra',
    'Sultanpur', 'Unnao', 'Varanasi'
];

// UP Tourism Circuits
const UP_CIRCUITS = [
    'All Circuits',
    'Spiritual & Heritage',
    'Mughal & Architecture',
    'Nawabi & Awadh',
    'Buddhist Circuit',
    'Bundelkhand Circuit',
    'Wildlife & Eco-Tourism',
    'Crafts & ODOP'
];

const CATEGORY_META = {
    culture: { label: 'Culture & Darshan', icon: Compass, color: '#f59e0b' },
    transit: { label: 'Transit & Rail', icon: Train, color: '#38bdf8' },
    dining: { label: 'Food & Cuisine', icon: Utensils, color: '#ec4899' },
    stay: { label: 'Stay & Heritage Hotel', icon: Bed, color: '#a855f7' },
    work: { label: 'Cowork & Fiber', icon: Wifi, color: '#10b981' }
};

export const UPTripItineraryBuilder = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const {
        activePresetId,
        tripTitle,
        startDate,
        travelers,
        pace,
        targetBudget,
        targetBudgetInr,
        currency,
        selectedDayIndex,
        days,
        setCurrency,
        setSelectedDayIndex,
        setTripMetadata,
        addDestinationToDay,
        addStop,
        removeStop,
        moveStop,
        moveStopToDay,
        toggleStopBooked,
        addDay,
        removeDay,
        updateDay,
        loadPreset,
        resetToUPDefault,
        optimizeWithAI,
        clearItinerary
    } = useItineraryStore();

    // UP Destination Catalog Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('All 75 Districts');
    const [selectedCircuit, setSelectedCircuit] = useState('All Circuits');
    const [destinationCategory, setDestinationCategory] = useState('All');
    const [targetDaySelector, setTargetDaySelector] = useState(0);

    // Active View
    const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'transit-matrix' | 'budget-odop'
    const [showAddCustomStopForm, setShowAddCustomStopForm] = useState(false);
    const [showUPCatalogDrawer, setShowUPCatalogDrawer] = useState(true);

    // Custom stop form inputs
    const [customTitle, setCustomTitle] = useState('');
    const [customTime, setCustomTime] = useState('14:00 - 16:30');
    const [customCategory, setCustomCategory] = useState('culture');
    const [customLocation, setCustomLocation] = useState('');
    const [customCost, setCustomCost] = useState('15');
    const [customWifi, setCustomWifi] = useState('100');
    const [customNote, setCustomNote] = useState('');

    // Pre-departure travel tips checklist
    const [checklist, setChecklist] = useState({
        darshanPass: true,
        templeDress: true,
        railBooking: true,
        pethaAttar: false,
        cashRikshaw: true,
        localGuide: false
    });

    const activeDay = days[selectedDayIndex] || days[0];

    // Filter UP Destinations
    const filteredUPDestinations = useMemo(() => {
        return uttarPradeshDestinations.filter((dest) => {
            const matchesQuery =
                !searchQuery.trim() ||
                dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (dest.district && dest.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (dest.highlights && dest.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                (dest.localCuisine && dest.localCuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (dest.odop && dest.odop.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesDistrict =
                selectedDistrict === 'All 75 Districts' ||
                (dest.district && dest.district.toLowerCase() === selectedDistrict.toLowerCase()) ||
                (dest.location && dest.location.toLowerCase().includes(selectedDistrict.toLowerCase()));

            const matchesCircuit =
                selectedCircuit === 'All Circuits' ||
                (dest.upCircuit && dest.upCircuit.toLowerCase().includes(selectedCircuit.toLowerCase()));

            const matchesCategory =
                destinationCategory === 'All' ||
                (dest.category && dest.category.toLowerCase().includes(destinationCategory.toLowerCase()));

            return matchesQuery && matchesDistrict && matchesCircuit && matchesCategory;
        });
    }, [searchQuery, selectedDistrict, selectedCircuit, destinationCategory]);

    // Trip Telemetry Computations
    const telemetry = useMemo(() => {
        let totalCostUsd = 0;
        let totalCostInr = 0;
        let totalStops = 0;
        let bookedStops = 0;
        let upStopsCount = 0;
        const byCategory = { culture: 0, transit: 0, dining: 0, stay: 0, work: 0 };
        const visitedDistricts = new Set();
        const odopCrafts = new Set();

        days.forEach((day) => {
            if (day.district) visitedDistricts.add(day.district);
            day.stops.forEach((stop) => {
                const cUsd = Number(stop.cost) || 0;
                const cInr = Number(stop.costInr) || cUsd * 83;
                totalCostUsd += cUsd;
                totalCostInr += cInr;
                totalStops += 1;
                if (stop.booked) bookedStops += 1;
                if (stop.district) {
                    visitedDistricts.add(stop.district);
                    upStopsCount += 1;
                }
                if (stop.odop) odopCrafts.add(stop.odop);

                const cat = byCategory[stop.category] !== undefined ? stop.category : 'culture';
                byCategory[cat] += cUsd;
            });
        });

        const activeCost = currency === 'INR' ? totalCostInr : totalCostUsd;
        const budgetTarget = currency === 'INR' ? targetBudgetInr : targetBudget;

        return {
            totalCostUsd,
            totalCostInr,
            activeCost,
            budgetTarget,
            totalStops,
            bookedStops,
            upStopsCount,
            visitedDistrictsCount: visitedDistricts.size,
            districtsList: Array.from(visitedDistricts),
            odopCraftsCount: odopCrafts.size,
            odopList: Array.from(odopCrafts),
            byCategory,
            perPersonCost: Math.round(activeCost / Math.max(1, travelers)),
            dailyAvg: Math.round(activeCost / Math.max(1, days.length))
        };
    }, [days, travelers, currency, targetBudget, targetBudgetInr]);

    // Add selected UP destination
    const handleAddUPDestination = (destination, targetDay = null) => {
        const destDayIdx = targetDay !== null ? targetDay : (targetDaySelector < days.length ? targetDaySelector : selectedDayIndex);
        const { stop, dayNumber } = addDestinationToDay(destination, destDayIdx);
        addToast(`Added "${stop.title}" to Day ${dayNumber}! 📍`, 'success');
    };

    // Create custom stop
    const handleCreateCustomStop = (e) => {
        e.preventDefault();
        if (!customTitle.trim()) return;

        addStop(selectedDayIndex, {
            title: customTitle.trim(),
            time: customTime || '14:00 - 16:30',
            category: customCategory,
            location: customLocation.trim() || activeDay.city,
            district: activeDay.district || 'Uttar Pradesh',
            cost: Number(customCost) || 0,
            wifiMbps: Number(customWifi) || 0,
            note: customNote.trim() || 'Custom planned stop.'
        });

        setCustomTitle('');
        setCustomLocation('');
        setCustomNote('');
        setShowAddCustomStopForm(false);
        addToast(`Added custom stop to Day ${activeDay.dayNumber}`, 'success');
    };

    // AI sequence optimization
    const handleAIOptimize = () => {
        optimizeWithAI();
        addToast('ChronoRoute™ AI re-sequenced UP stops for sunrise darshan, aarti & travel flow!', 'success');
    };

    // Export Itinerary
    const handleExportItinerary = () => {
        const payload = {
            tripTitle,
            state: 'Uttar Pradesh, India',
            startDate,
            travelers,
            pace,
            currency,
            telemetry,
            days
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tripTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-up-itinerary.json`;
        a.click();
        URL.revokeObjectURL(url);
        addToast('Exported complete Uttar Pradesh itinerary JSON', 'success');
    };

    // Print / PDF
    const handlePrintItinerary = () => {
        window.print();
    };

    // Share link
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            addToast('Itinerary link copied to clipboard! 📋', 'success');
        } catch {
            addToast('Ready to share', 'info');
        }
    };

    return (
        <div className="itinerary-builder-shell up-itinerary-builder">
            {/* 1. Header Command Bar */}
            <header className="ib-command-header">
                <div className="ib-header-top-row">
                    <div className="ib-title-area">
                        <span className="ib-kicker">
                            <GitBranch size={13} />
                            SeeNomad ChronoRoute™ · Uttar Pradesh Day-by-Day Travel Itinerary Builder
                        </span>
                        <div className="ib-title-input-row">
                            <input
                                type="text"
                                className="ib-title-input"
                                value={tripTitle}
                                onChange={(e) => setTripMetadata({ tripTitle: e.target.value })}
                                aria-label="Trip title"
                            />
                        </div>
                        <p className="ib-subtitle">
                            Select destinations from across all 75 districts of Uttar Pradesh. Organize temples, monuments, Ghat aartis, and ODOP artisan craft trails into a day-by-day travel plan.
                        </p>
                    </div>

                    <div className="ib-header-actions">
                        {/* Currency Toggle */}
                        <div className="ib-currency-pill-switch" style={{ display: 'flex', gap: '0.2rem', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', padding: '0.15rem' }}>
                            <button
                                type="button"
                                className={`ib-btn ${currency === 'USD' ? 'ib-btn-primary' : ''}`}
                                style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                                onClick={() => setCurrency('USD')}
                            >
                                $ USD
                            </button>
                            <button
                                type="button"
                                className={`ib-btn ${currency === 'INR' ? 'ib-btn-primary' : ''}`}
                                style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                                onClick={() => setCurrency('INR')}
                            >
                                ₹ INR
                            </button>
                        </div>

                        <button
                            type="button"
                            className="ib-btn ib-btn-ai"
                            onClick={handleAIOptimize}
                            title="Chronologically order morning darshan, sightseeing, and evening aartis"
                        >
                            <Sparkles size={14} />
                            AI Sequence
                        </button>

                        <button
                            type="button"
                            className="ib-btn"
                            onClick={() => navigate('/explore/travel-map')}
                        >
                            <Map size={14} />
                            Interactive Map
                        </button>

                        <button
                            type="button"
                            className="ib-btn"
                            onClick={handlePrintItinerary}
                            title="Print or Save as PDF"
                        >
                            <Printer size={14} />
                            Print / PDF
                        </button>

                        <button
                            type="button"
                            className="ib-btn"
                            onClick={handleExportItinerary}
                        >
                            <Download size={14} />
                            Export
                        </button>

                        <button
                            type="button"
                            className="ib-btn"
                            onClick={handleShare}
                        >
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </div>

                {/* Preset Templates Selector & Parameters */}
                <div className="ib-controls-bar">
                    <div className="ib-template-pills" role="tablist" aria-label="Uttar Pradesh Curated Expeditions">
                        {UTTAR_PRADESH_ITINERARY_PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                type="button"
                                className={`ib-template-chip ${activePresetId === preset.id ? 'active' : ''}`}
                                onClick={() => {
                                    loadPreset(preset);
                                    addToast(`Loaded "${preset.name}" (${preset.circuit})`, 'info');
                                }}
                            >
                                <span>{preset.badge}</span>
                                <span>·</span>
                                <span>{preset.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="ib-meta-inputs">
                        <label className="ib-meta-field">
                            <Calendar size={13} />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setTripMetadata({ startDate: e.target.value })}
                                aria-label="Start date"
                            />
                        </label>
                        <label className="ib-meta-field">
                            <Users size={13} />
                            <select
                                value={travelers}
                                onChange={(e) => setTripMetadata({ travelers: Number(e.target.value) })}
                                aria-label="Travelers"
                            >
                                <option value={1}>1 Solo Pilgrim / Nomad</option>
                                <option value={2}>2 Travelers / Couple</option>
                                <option value={4}>4 Family / Friends Group</option>
                                <option value={8}>8 Yatra Tour Group</option>
                            </select>
                        </label>
                        <label className="ib-meta-field">
                            <DollarSign size={13} />
                            <span>Budget:</span>
                            <input
                                type="number"
                                style={{ width: '80px' }}
                                value={currency === 'INR' ? targetBudgetInr : targetBudget}
                                onChange={(e) => {
                                    const val = Number(e.target.value) || 0;
                                    if (currency === 'INR') {
                                        setTripMetadata({ targetBudgetInr: val, targetBudget: Math.round(val / 83) });
                                    } else {
                                        setTripMetadata({ targetBudget: val, targetBudgetInr: val * 83 });
                                    }
                                }}
                                aria-label="Budget"
                            />
                        </label>
                    </div>
                </div>
            </header>

            {/* 2. Subbar Strip: Key Performance Indicators & View Switcher */}
            <div className="ib-subbar-row">
                <div className="ib-kpi-strip">
                    <span className="ib-kpi-item">
                        Days: <strong>{days.length} Days</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="ib-kpi-item">
                        UP Stops: <strong>{telemetry.totalStops}</strong> ({telemetry.bookedStops} Booked)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="ib-kpi-item">
                        Districts: <strong>{telemetry.visitedDistrictsCount}</strong> of 75
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="ib-kpi-item">
                        ODOP Crafts: <strong>{telemetry.odopCraftsCount}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                        className={`ib-kpi-item ${
                            telemetry.activeCost > telemetry.budgetTarget ? 'over-budget' : 'under-budget'
                        }`}
                    >
                        Total: <strong>{currency === 'INR' ? `₹${telemetry.totalCostInr.toLocaleString()}` : `$${telemetry.totalCostUsd.toLocaleString()}`}</strong> / {currency === 'INR' ? `₹${telemetry.budgetTarget.toLocaleString()}` : `$${telemetry.budgetTarget.toLocaleString()}`}
                    </span>
                </div>

                <div className="ib-view-tabs" role="tablist" aria-label="Itinerary view options">
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'timeline' ? 'active' : ''}`}
                        onClick={() => setActiveView('timeline')}
                    >
                        <Calendar size={13} />
                        Day-by-Day Schedule
                    </button>
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'transit-matrix' ? 'active' : ''}`}
                        onClick={() => setActiveView('transit-matrix')}
                    >
                        <Train size={13} />
                        UP Inter-District Transit
                    </button>
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'budget-odop' ? 'active' : ''}`}
                        onClick={() => setActiveView('budget-odop')}
                    >
                        <Landmark size={13} />
                        Budget & ODOP Craft Tracker
                    </button>
                </div>
            </div>

            {/* 3A. MAIN WORKSPACE: DAY-BY-DAY TIMELINE & UP DESTINATION SELECTOR */}
            {activeView === 'timeline' && activeDay && (
                <div className="ib-workspace-grid" style={{ gridTemplateColumns: showUPCatalogDrawer ? '240px 1fr 340px' : '240px 1fr' }}>
                    {/* LEFT COLUMN: DAY SELECTOR SIDEBAR */}
                    <aside className="ib-days-sidebar" aria-label="Itinerary day selector">
                        <div className="ib-panel-heading">
                            <span>Itinerary Days ({days.length})</span>
                            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>{pace}</span>
                        </div>
                        <div className="ib-days-list">
                            {days.map((d, idx) => {
                                const dayCostUsd = d.stops.reduce((sum, s) => sum + (Number(s.cost) || 0), 0);
                                const dayCostInr = d.stops.reduce((sum, s) => sum + (Number(s.costInr) || (Number(s.cost) || 0) * 83), 0);
                                return (
                                    <button
                                        key={d.id}
                                        type="button"
                                        className={`ib-day-nav-btn ${selectedDayIndex === idx ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedDayIndex(idx);
                                            setTargetDaySelector(idx);
                                        }}
                                    >
                                        <div className="ib-day-nav-left">
                                            <span className="ib-day-num">
                                                Day {d.dayNumber} · {d.flag || '🇮🇳'}
                                            </span>
                                            <span className="ib-day-city">{d.city || `${d.district} District`}</span>
                                        </div>
                                        <span className="ib-day-meta">
                                            {d.stops.length} stops · {currency === 'INR' ? `₹${dayCostInr.toLocaleString()}` : `$${dayCostUsd}`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            className="ib-add-day-btn"
                            onClick={() => {
                                addDay(activeDay.city, activeDay.district);
                                addToast(`Added Day ${days.length + 1} to your itinerary`, 'success');
                            }}
                        >
                            <Plus size={14} />
                            Add Day {days.length + 1}
                        </button>
                    </aside>

                    {/* CENTER COLUMN: SELECTED DAY TIMELINE CANVAS */}
                    <section className="ib-day-canvas" aria-label={`Day ${activeDay.dayNumber} plan`}>
                        <div className="ib-day-canvas-header">
                            <div className="ib-day-header-info">
                                <h3>
                                    <span>{activeDay.flag || '🇮🇳'}</span>
                                    <span>
                                        Day {activeDay.dayNumber}: {activeDay.city || `${activeDay.district} District`}
                                    </span>
                                </h3>
                                <div className="ib-day-header-sub" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span>
                                        <Train size={12} style={{ display: 'inline', marginRight: 4 }} />
                                        {activeDay.transitMode}
                                    </span>
                                    <span>·</span>
                                    <span>{activeDay.weather}</span>
                                    <span>·</span>
                                    <span>
                                        Day Spend: {currency === 'INR'
                                            ? `₹${activeDay.stops.reduce((acc, s) => acc + (Number(s.costInr) || (Number(s.cost) || 0) * 83), 0).toLocaleString()}`
                                            : `$${activeDay.stops.reduce((acc, s) => acc + (Number(s.cost) || 0), 0)}`}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                <button
                                    type="button"
                                    className="ib-btn"
                                    onClick={() => setShowUPCatalogDrawer((prev) => !prev)}
                                    title="Toggle Uttar Pradesh Destination Selector"
                                >
                                    <Layers size={13} />
                                    {showUPCatalogDrawer ? 'Hide UP Catalog' : 'Select UP Places'}
                                </button>
                                <button
                                    type="button"
                                    className="ib-btn ib-btn-primary"
                                    onClick={() => setShowAddCustomStopForm((prev) => !prev)}
                                >
                                    <Plus size={14} />
                                    {showAddCustomStopForm ? 'Close' : 'Add Custom'}
                                </button>
                                {days.length > 1 && (
                                    <button
                                        type="button"
                                        className="ib-icon-btn delete"
                                        onClick={() => {
                                            removeDay(selectedDayIndex);
                                            addToast(`Removed Day ${activeDay.dayNumber}`, 'info');
                                        }}
                                        title={`Delete Day ${activeDay.dayNumber}`}
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Inline Custom Stop Creation Form */}
                        {showAddCustomStopForm && (
                            <form className="ib-add-stop-form" onSubmit={handleCreateCustomStop}>
                                <div className="ib-form-grid">
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Stop title (e.g. Ganga Aarti Boat, Hotel Check-in, Breakfast)..."
                                        value={customTitle}
                                        onChange={(e) => setCustomTitle(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Time slot (e.g. 06:00 - 08:30)"
                                        value={customTime}
                                        onChange={(e) => setCustomTime(e.target.value)}
                                    />
                                    <select
                                        className="ib-form-select"
                                        value={customCategory}
                                        onChange={(e) => setCustomCategory(e.target.value)}
                                    >
                                        <option value="culture">Culture & Darshan</option>
                                        <option value="transit">Transit & Rail</option>
                                        <option value="dining">Food & Cuisine</option>
                                        <option value="stay">Stay & Heritage Hotel</option>
                                        <option value="work">Cowork & Fiber</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Location / Landmark / District"
                                        value={customLocation}
                                        onChange={(e) => setCustomLocation(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="ib-form-input"
                                        placeholder="Cost in USD"
                                        value={customCost}
                                        onChange={(e) => setCustomCost(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="ib-form-input"
                                        placeholder="Wi-Fi Mbps (optional)"
                                        value={customWifi}
                                        onChange={(e) => setCustomWifi(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        style={{ flex: 1 }}
                                        placeholder="Notes, temple dress codes, boat charges, or local sweets to try..."
                                        value={customNote}
                                        onChange={(e) => setCustomNote(e.target.value)}
                                    />
                                    <button type="submit" className="ib-btn ib-btn-primary">
                                        <Check size={14} />
                                        Save Stop to Day {activeDay.dayNumber}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STOPS TIMELINE FOR THE SELECTED DAY */}
                        <div className="ib-stops-timeline">
                            {activeDay.stops.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                    <MapPin size={32} style={{ color: '#38bdf8', margin: '0 auto 0.6rem', display: 'block' }} />
                                    <h4 style={{ margin: '0 0 0.3rem', fontSize: '1.05rem', fontWeight: 700 }}>No stops planned for Day {activeDay.dayNumber} yet</h4>
                                    <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: '#94a3b8' }}>
                                        Browse the Uttar Pradesh Destination Selector on the right, filter by any of the 75 districts, and click "+ Add to Day {activeDay.dayNumber}"!
                                    </p>
                                    <button
                                        type="button"
                                        className="ib-btn ib-btn-primary"
                                        onClick={() => setShowUPCatalogDrawer(true)}
                                    >
                                        <Compass size={14} />
                                        Explore 101 UP Destinations
                                    </button>
                                </div>
                            ) : (
                                activeDay.stops.map((stop, sIdx) => {
                                    const catInfo = CATEGORY_META[stop.category] || CATEGORY_META.culture;
                                    const CatIcon = catInfo.icon;
                                    const costDisplay = currency === 'INR'
                                        ? `₹${(Number(stop.costInr) || (Number(stop.cost) || 0) * 83).toLocaleString()}`
                                        : `$${stop.cost}`;

                                    return (
                                        <article
                                            key={stop.id}
                                            className={`ib-stop-card ${stop.booked ? 'is-booked' : ''}`}
                                        >
                                            <div className="ib-stop-time-col">
                                                <span className="ib-stop-time">{stop.time}</span>
                                                <span className="ib-stop-cat-label">
                                                    <CatIcon size={11} style={{ display: 'inline', marginRight: 3, color: catInfo.color }} />
                                                    {catInfo.label}
                                                </span>
                                            </div>

                                            <div className="ib-stop-body">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                                                    {stop.image && (
                                                        <img
                                                            src={stop.image}
                                                            alt={stop.title}
                                                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="ib-stop-title" style={{ margin: 0 }}>
                                                            {stop.destinationId ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => navigate(`/explore/destinations/${stop.destinationId}`)}
                                                                    style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', fontWeight: 'inherit', textAlign: 'left', cursor: 'pointer', textDecoration: 'underline' }}
                                                                >
                                                                    {stop.title}
                                                                </button>
                                                            ) : (
                                                                stop.title
                                                            )}
                                                        </h4>
                                                        <div className="ib-stop-meta-line" style={{ marginTop: '0.2rem' }}>
                                                            <span>
                                                                <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                                {stop.location}
                                                            </span>
                                                            <span>·</span>
                                                            <span>{costDisplay}</span>
                                                            {stop.wifiMbps > 0 && (
                                                                <>
                                                                    <span>·</span>
                                                                    <span>
                                                                        <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                                        {stop.wifiMbps} Mbps
                                                                    </span>
                                                                </>
                                                            )}
                                                            <span>·</span>
                                                            <span>{stop.booked ? 'Booked ✓' : 'Planned'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Local ODOP & Cuisine Badges if available */}
                                                {(stop.odop || stop.localCuisine) && (
                                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                                                        {stop.odop && (
                                                            <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                                                🏺 ODOP: {stop.odop}
                                                            </span>
                                                        )}
                                                        {stop.localCuisine && (
                                                            <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                                                                🍽️ Taste: {stop.localCuisine}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {stop.note && <p className="ib-stop-note" style={{ marginTop: '0.4rem' }}>{stop.note}</p>}
                                            </div>

                                            {/* Stop Action Bar */}
                                            <div className="ib-stop-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
                                                <button
                                                    type="button"
                                                    className={`ib-icon-btn ${stop.booked ? 'booked-active' : ''}`}
                                                    onClick={() => toggleStopBooked(selectedDayIndex, stop.id)}
                                                    title={stop.booked ? 'Marked as Booked' : 'Mark as Booked'}
                                                    aria-label="Toggle booked status"
                                                >
                                                    <CheckCircle2 size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ib-icon-btn"
                                                    onClick={() => moveStop(selectedDayIndex, sIdx, 'up')}
                                                    disabled={sIdx === 0}
                                                    title="Move earlier in day"
                                                    aria-label="Move stop up"
                                                >
                                                    <ArrowUp size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ib-icon-btn"
                                                    onClick={() => moveStop(selectedDayIndex, sIdx, 'down')}
                                                    disabled={sIdx === activeDay.stops.length - 1}
                                                    title="Move later in day"
                                                    aria-label="Move stop down"
                                                >
                                                    <ArrowDown size={14} />
                                                </button>

                                                {/* Move to another day dropdown */}
                                                {days.length > 1 && (
                                                    <select
                                                        style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.08)', color: 'inherit', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '0.15rem' }}
                                                        value={selectedDayIndex}
                                                        onChange={(e) => {
                                                            const targetIdx = Number(e.target.value);
                                                            moveStopToDay(selectedDayIndex, stop.id, targetIdx);
                                                            addToast(`Moved stop to Day ${targetIdx + 1}`, 'info');
                                                        }}
                                                        title="Move to another Day"
                                                    >
                                                        {days.map((d, dIdx) => (
                                                            <option key={d.id} value={dIdx}>
                                                                Day {d.dayNumber}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}

                                                <button
                                                    type="button"
                                                    className="ib-icon-btn delete"
                                                    onClick={() => {
                                                        removeStop(selectedDayIndex, stop.id);
                                                        addToast('Removed stop from day plan', 'info');
                                                    }}
                                                    title="Delete stop"
                                                    aria-label="Remove stop"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    </section>

                    {/* RIGHT COLUMN: INTERACTIVE UTTAR PRADESH DESTINATION SELECTOR */}
                    {showUPCatalogDrawer && (
                        <aside className="ib-discovery-panel" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }} aria-label="Uttar Pradesh destination selector">
                            <div className="ib-panel-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Select UP Destinations</span>
                                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>
                                    {filteredUPDestinations.length} Available
                                </span>
                            </div>

                            {/* Destination Search & District Filters */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.75rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={13} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        style={{ paddingLeft: '26px', fontSize: '0.76rem', width: '100%', boxSizing: 'border-box' }}
                                        placeholder="Search by name, district, ODOP or dish..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* District Selector: Covers all 75 districts */}
                                <select
                                    className="ib-form-select"
                                    style={{ fontSize: '0.74rem' }}
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                >
                                    {UP_DISTRICTS.map((dist) => (
                                        <option key={dist} value={dist}>
                                            📍 {dist}
                                        </option>
                                    ))}
                                </select>

                                {/* Circuit Selector */}
                                <select
                                    className="ib-form-select"
                                    style={{ fontSize: '0.74rem' }}
                                    value={selectedCircuit}
                                    onChange={(e) => setSelectedCircuit(e.target.value)}
                                >
                                    {UP_CIRCUITS.map((circ) => (
                                        <option key={circ} value={circ}>
                                            🏛️ {circ}
                                        </option>
                                    ))}
                                </select>

                                {/* Target Day Selector */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                                    <span>Target Day:</span>
                                    <select
                                        className="ib-form-select"
                                        style={{ width: '120px', fontSize: '0.72rem', padding: '0.15rem 0.3rem' }}
                                        value={targetDaySelector}
                                        onChange={(e) => setTargetDaySelector(Number(e.target.value))}
                                    >
                                        {days.map((d, i) => (
                                            <option key={d.id} value={i}>
                                                Day {d.dayNumber} ({d.city})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* UP Destinations Cards List */}
                            <div className="ib-discovery-list">
                                {filteredUPDestinations.slice(0, 30).map((dest) => (
                                    <div key={dest.id} className="ib-discovery-card" style={{ padding: '0.65rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            {dest.image && (
                                                <img
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.3rem' }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.25 }}>
                                                        {dest.name}
                                                    </h4>
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                                                    📍 {dest.district} District {dest.upCircuit ? `· ${dest.upCircuit}` : ''}
                                                </div>
                                                {dest.odop && (
                                                    <div style={{ fontSize: '0.67rem', color: '#fbbf24', marginTop: '0.15rem' }}>
                                                        🏺 ODOP: {dest.odop}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.35rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#10b981' }}>
                                                {currency === 'INR' ? `₹${(parseInt(String(dest.price || '15').replace(/[^0-9]/g, ''), 10) * 83).toLocaleString()}` : `${dest.price || '$15'}`}
                                            </span>

                                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                <button
                                                    type="button"
                                                    className="ib-btn"
                                                    style={{ padding: '0.2rem 0.45rem', fontSize: '0.68rem' }}
                                                    onClick={() => navigate(`/explore/destinations/${dest.id}`)}
                                                    title="View full destination page"
                                                >
                                                    Details →
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ib-btn ib-btn-primary"
                                                    style={{ padding: '0.2rem 0.55rem', fontSize: '0.68rem' }}
                                                    onClick={() => handleAddUPDestination(dest, targetDaySelector)}
                                                >
                                                    + Day {days[targetDaySelector]?.dayNumber || activeDay.dayNumber}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredUPDestinations.length === 0 && (
                                    <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
                                        No Uttar Pradesh destinations match your filter. Try choosing "All 75 Districts" or clearing the search.
                                    </div>
                                )}
                            </div>
                        </aside>
                    )}
                </div>
            )}

            {/* 3B. UP INTER-DISTRICT TRANSIT MATRIX VIEW */}
            {activeView === 'transit-matrix' && (
                <div className="ib-matrix-grid">
                    <div className="ib-matrix-card" style={{ gridColumn: 'span 2' }}>
                        <div className="ib-panel-heading">
                            <span>High-Speed Transit Corridors Across Uttar Pradesh</span>
                            <Train size={14} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800 }}>VANDE BHARAT EXPRESS</div>
                                <h4 style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>Varanasi ⇄ Ayodhya ⇄ Lucknow</h4>
                                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0 }}>
                                    Duration: <strong>2h 10m</strong> to Ayodhya · <strong>4h 10m</strong> to Lucknow. Ultra-fast semi-high-speed rail with 180° rotatable seats and onboard meals.
                                </p>
                            </div>
                            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800 }}>AGRA-LUCKNOW EXPRESSWAY</div>
                                <h4 style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>Agra ⇄ Kannauj ⇄ Lucknow</h4>
                                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0 }}>
                                    Duration: <strong>3h 15m</strong> (302 km). Access Kannauj perfume belt, Mainpuri, and Firozabad glass hub directly off the expressway.
                                </p>
                            </div>
                            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 800 }}>PURVANCHAL EXPRESSWAY</div>
                                <h4 style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>Lucknow ⇄ Ayodhya ⇄ Ghazipur</h4>
                                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0 }}>
                                    Duration: <strong>3h 45m</strong> (340 km). Connects central Awadh to eastern UP districts with direct exits for Sultanpur, Azamgarh, and Mau.
                                </p>
                            </div>
                            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ fontSize: '0.72rem', color: '#ec4899', fontWeight: 800 }}>BUNDELKHAND EXPRESSWAY</div>
                                <h4 style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>Etawah ⇄ Jhansi ⇄ Chitrakoot</h4>
                                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0 }}>
                                    Duration: <strong>3h 30m</strong> (296 km). Direct access to Rani Lakshmibai’s fortress in Jhansi, Kalinjar Fort in Banda, and holy groves of Chitrakoot.
                                </p>
                            </div>
                        </div>
                    </div>

                    {days.map((d, idx) => (
                        <div key={d.id} className="ib-matrix-card">
                            <div className="ib-panel-heading">
                                <span>Day {d.dayNumber} Corridor</span>
                                <span>{d.flag || '🇮🇳'}</span>
                            </div>
                            <h3 style={{ margin: '0.2rem 0', fontSize: '1rem', fontWeight: 800 }}>{d.city || `${d.district} District`}</h3>
                            <p style={{ margin: '0.2rem 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                                Transit Mode: <strong>{d.transitMode}</strong>
                            </p>
                            <p style={{ margin: '0.2rem 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                                Planned Stops: <strong>{d.stops.length} destinations</strong>
                            </p>
                            <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    className="ib-btn ib-btn-primary"
                                    onClick={() => {
                                        setSelectedDayIndex(idx);
                                        setActiveView('timeline');
                                    }}
                                >
                                    Open Day {d.dayNumber} Timeline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 3C. BUDGET & ODOP CRAFTS TRACKER VIEW */}
            {activeView === 'budget-odop' && (
                <div className="ib-matrix-grid">
                    {/* Category Spend */}
                    <div className="ib-matrix-card">
                        <div className="ib-panel-heading">
                            <span>Travel Budget Telemetry</span>
                            <span>{currency === 'INR' ? `₹${telemetry.totalCostInr.toLocaleString()}` : `$${telemetry.totalCostUsd}`}</span>
                        </div>
                        {Object.entries(CATEGORY_META).map(([catKey, meta]) => {
                            const amountUsd = telemetry.byCategory[catKey] || 0;
                            const amountInr = amountUsd * 83;
                            const amount = currency === 'INR' ? amountInr : amountUsd;
                            const pct = telemetry.activeCost > 0
                                ? Math.min(100, Math.round((amount / telemetry.activeCost) * 100))
                                : 0;

                            return (
                                <div key={catKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.4rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                                        <span>{meta.label}</span>
                                        <strong>
                                            {currency === 'INR' ? `₹${amount.toLocaleString()}` : `$${amount}`} ({pct}%)
                                        </strong>
                                    </div>
                                    <div className="ib-progress-track">
                                        <div className="ib-progress-fill" style={{ width: `${pct}%`, background: meta.color }} />
                                    </div>
                                </div>
                            );
                        })}
                        <p style={{ margin: '0.6rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                            Per Person ({travelers}x): <strong>{currency === 'INR' ? `₹${telemetry.perPersonCost.toLocaleString()}` : `$${telemetry.perPersonCost}`}</strong> · Daily Avg: <strong>{currency === 'INR' ? `₹${telemetry.dailyAvg.toLocaleString()}/day` : `$${telemetry.dailyAvg}/day`}</strong>
                        </p>
                    </div>

                    {/* ODOP Craft Checklist for visited districts */}
                    <div className="ib-matrix-card">
                        <div className="ib-panel-heading">
                            <span>One District One Product (ODOP) Crafts on your Route</span>
                            <Landmark size={14} />
                        </div>
                        <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0 0 0.5rem' }}>
                            Support local GI-tagged artisans across Uttar Pradesh during your trip:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {telemetry.odopList.length === 0 ? (
                                <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                                    Select destinations to automatically discover authentic district ODOP crafts!
                                </div>
                            ) : (
                                telemetry.odopList.map((craft, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem 0.6rem', borderRadius: '6px' }}>
                                        <span style={{ color: '#fbbf24' }}>🏺</span>
                                        <span style={{ fontWeight: 600 }}>{craft}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pre-Departure Checklist */}
                    <div className="ib-matrix-card">
                        <div className="ib-panel-heading">
                            <span>Uttar Pradesh Travel Preparedness Checklist</span>
                            <Briefcase size={14} />
                        </div>
                        {[
                            { id: 'darshanPass', label: 'Sugam Darshan & Ram Janmabhoomi QR pass saved offline' },
                            { id: 'templeDress', label: 'Modest traditional attire packed (dhoti/kurta/saree for Garbha Griha)' },
                            { id: 'railBooking', label: 'Vande Bharat / Shatabdi confirmed PNR on IRCTC' },
                            { id: 'pethaAttar', label: 'Agra Panchhi Petha & Kannauj Mitti Attar souvenir shopping planned' },
                            { id: 'cashRikshaw', label: 'Cash / UPI ready for local e-rickshaws and Ghat boatmen' },
                            { id: 'localGuide', label: 'Certified UP Tourism heritage guide arranged for monuments' }
                        ].map((item) => (
                            <label
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.78rem',
                                    cursor: 'pointer',
                                    marginTop: '0.4rem'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!checklist[item.id]}
                                    onChange={() =>
                                        setChecklist((prev) => ({
                                            ...prev,
                                            [item.id]: !prev[item.id]
                                        }))
                                    }
                                />
                                <span>{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UPTripItineraryBuilder;
