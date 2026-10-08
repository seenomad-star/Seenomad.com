import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Luggage,
    Globe,
    MapPin,
    Calendar,
    Plane,
    Train,
    GitBranch,
    Palmtree,
    UserCheck,
    ShieldCheck,
    Scale,
    Plus,
    Search,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    Download,
    Trash2,
    Map,
    X,
    Wifi
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../../../styles/MyTripsJourney.css';

const JOURNEY_TABS = [
    { id: 'all', label: 'All Trips & Expeditions' },
    { id: 'upcoming', label: 'Active & Upcoming Departures' },
    { id: 'stamps', label: 'Passport Country Ledger' },
    { id: 'vault', label: 'Synced Passes, Escrows & Shields' },
    { id: 'milestones', label: 'Nomad Odyssey Milestones' }
];

const INITIAL_EXPEDITIONS = [
    {
        id: 'trip-jp-2026',
        status: 'Active Expedition',
        title: 'Japan Golden Corridor & 10Gbps Fiber Circuit',
        window: 'Nov 10 – Nov 28, 2026 (18 Days)',
        corridor: ['🇯🇵 Tokyo (Shibuya)', '🚅 Kyoto (Higashiyama)', '🍜 Osaka (Namba)'],
        pnrCode: 'NH-842 / JR-GREEN-77',
        accommodation: 'Shibuya Loft + Kyoto Machiya Townhouse (Verified by Fixer Kenji)',
        fiberSpeed: '890 Mbps Symmetric Verified',
        budgetUSD: 2840,
        spentUSD: 1920,
        visaRegime: 'Japan 6-Month Nomad Visa / 90-Day Waiver (Tax-Exempt <183d)',
        xpEarned: 1450,
        notes: 'Paired with Kyoto Machiya Matcha Workshop & Kenji Takahashi Zero-Key-Money Lease Audit.'
    },
    {
        id: 'trip-pt-2026',
        status: 'Upcoming Departure',
        title: 'Iberian Atlantic Surf, D8 Residency & Fado Circuit',
        window: 'Dec 04 – Jan 15, 2027 (42 Days)',
        corridor: ['🇵🇹 Lisbon (Alfama & Príncipe Real)', '🌊 Ericeira Reserve', '🍷 Porto (Ribeira)'],
        pnrCode: 'TP-204 / CP-ALFA-19',
        accommodation: 'Outsite Ericeira Coliving + Alfama River-View Loft',
        fiberSpeed: '620 Mbps Ethernet Verified',
        budgetUSD: 3450,
        spentUSD: 1480,
        visaRegime: 'Portugal D8 / IFICI 20% Special Regime (42 / 183 Days Tracked)',
        xpEarned: 1800,
        notes: 'Includes Ericeira Dawn Patrol Surf Coaching, Alfama Tasca Fado Night & Gonçalo NIF Escrow.'
    },
    {
        id: 'trip-id-2026',
        status: 'Planned Route',
        title: 'Singapore Hub & Bali Regenerative Reef / Silver Loop',
        window: 'Feb 02 – Mar 10, 2027 (36 Days)',
        corridor: ['🇸🇬 Singapore (Tanjong Pagar)', '🇮🇩 Ubud (Celuk)', '🤿 Nusa Penida & Uluwatu'],
        pnrCode: 'SQ-318 / FASTBOAT-NP',
        accommodation: 'Batu Bolong Eco-Villa + Ubud Jungle Studio',
        fiberSpeed: '340 Mbps Dual-WAN + Starlink Backup',
        budgetUSD: 2690,
        spentUSD: 940,
        visaRegime: 'Indonesia E33G Remote Worker KITAS (0% Foreign-Source Tax)',
        xpEarned: 1650,
        notes: 'Synced with Nusa Penida Coral Reef Restoration Dive & BIMC Cashless Direct-Bill Medical Shield.'
    }
];

const INITIAL_VISITED_STAMPS = [
    {
        code: 'JP',
        name: 'Japan',
        emoji: '🇯🇵',
        year: 2026,
        cities: ['Tokyo', 'Kyoto', 'Osaka', 'Fukuoka'],
        daysLogged: 90,
        taxLimit: 180,
        peakWifiMbps: 940,
        xp: 1200
    },
    {
        code: 'PT',
        name: 'Portugal',
        emoji: '🇵🇹',
        year: 2026,
        cities: ['Lisbon', 'Ericeira', 'Porto', 'Lagos'],
        daysLogged: 110,
        taxLimit: 183,
        peakWifiMbps: 680,
        xp: 1100
    },
    {
        code: 'ID',
        name: 'Indonesia',
        emoji: '🇮🇩',
        year: 2025,
        cities: ['Canggu', 'Ubud', 'Uluwatu', 'Nusa Penida'],
        daysLogged: 85,
        taxLimit: 183,
        peakWifiMbps: 340,
        xp: 950
    },
    {
        code: 'CO',
        name: 'Colombia',
        emoji: '🇨🇴',
        year: 2025,
        cities: ['Medellín', 'Santa Elena', 'Guatapé', 'Cartagena'],
        daysLogged: 60,
        taxLimit: 183,
        peakWifiMbps: 410,
        xp: 850
    },
    {
        code: 'ES',
        name: 'Spain',
        emoji: '🇪🇸',
        year: 2025,
        cities: ['Barcelona', 'Madrid', 'Las Palmas', 'Valencia'],
        daysLogged: 48,
        taxLimit: 183,
        peakWifiMbps: 790,
        xp: 900
    },
    {
        code: 'TH',
        name: 'Thailand',
        emoji: '🇹🇭',
        year: 2024,
        cities: ['Bangkok', 'Chiang Mai', 'Koh Phangan'],
        daysLogged: 55,
        taxLimit: 180,
        peakWifiMbps: 820,
        xp: 800
    }
];

const ODYSSEY_MILESTONES = [
    {
        id: 'm-1',
        title: 'ChronoRoute™ Multi-Continent Architect',
        desc: 'Planned and executed 3+ multi-city corridors with verified fiber telemetry.',
        xp: 1000,
        unlocked: true
    },
    {
        id: 'm-2',
        title: 'Sovereign Tax & 183-Day Strategist',
        desc: 'Logged 300+ days across 6 countries with zero accidental tax-residency breaches.',
        xp: 1250,
        unlocked: true
    },
    {
        id: 'm-3',
        title: 'Regenerative Coral & Heritage Patron',
        desc: 'Completed verified eco-voluntourism and artisan studio workshops in 3 hubs.',
        xp: 850,
        unlocked: true
    },
    {
        id: 'm-4',
        title: 'Gigabit Fiber Pioneer',
        desc: 'Verified a ≥1,000 Mbps symmetric fiber connection in 5 distinct capitals.',
        xp: 1500,
        unlocked: false
    }
];

const TravelMap = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewTripDrawer, setShowNewTripDrawer] = useState(false);

    // Expeditions State (Persisted)
    const [expeditions, setExpeditions] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_user_expeditions');
            return raw ? JSON.parse(raw) : INITIAL_EXPEDITIONS;
        } catch {
            return INITIAL_EXPEDITIONS;
        }
    });

    // Country Passport Stamps State (Persisted)
    const [visitedStamps, setVisitedStamps] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_visited_stamps');
            return raw ? JSON.parse(raw) : INITIAL_VISITED_STAMPS;
        } catch {
            return INITIAL_VISITED_STAMPS;
        }
    });

    // New Trip / Country Stamp Form State
    const [newTripTitle, setNewTripTitle] = useState('');
    const [newTripHubs, setNewTripHubs] = useState('');
    const [newTripWindow, setNewTripWindow] = useState('Mar 18 – Apr 05, 2027 (18 Days)');
    const [newTripBudget, setNewTripBudget] = useState('2400');
    const [newTripStatus, setNewTripStatus] = useState('Upcoming Departure');

    // Pre-Departure Readiness Checklist
    const [readinessChecks, setReadinessChecks] = useState({
        eSimActivated: true,
        consularInsurancePdf: true,
        fixerLeaseAudit: true,
        onwardTicketVerified: false,
        taxPresenceUnder183: true
    });

    // Pull Live Synced Data from Local Experiences, Travel Agents, Insurance & Itinerary Queue
    const syncedData = useMemo(() => {
        let reservedExperiences = {};
        let fixerContracts = {};
        let activeInsurance = {};
        let queuedItineraryItems = [];

        try {
            reservedExperiences = JSON.parse(localStorage.getItem('seenomad_reserved_experiences') || '{}');
            fixerContracts = JSON.parse(localStorage.getItem('seenomad_agent_contracts') || '{}');
            activeInsurance = JSON.parse(localStorage.getItem('seenomad_active_insurance') || '{}');
            queuedItineraryItems = JSON.parse(localStorage.getItem('seenomad_queued_itinerary_items') || '[]');
        } catch {
            // ignore storage errors
        }

        return {
            reservedExperiences,
            fixerContracts,
            activeInsurance,
            queuedItineraryItems
        };
    }, [activeTab]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_user_expeditions', JSON.stringify(expeditions));
        } catch {
            // ignore storage errors
        }
    }, [expeditions]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_visited_stamps', JSON.stringify(visitedStamps));
        } catch {
            // ignore storage errors
        }
    }, [visitedStamps]);

    const handleCreateExpedition = (e) => {
        e.preventDefault();
        if (!newTripTitle.trim()) return;

        const hubsArray = newTripHubs
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        const created = {
            id: `trip-${Date.now()}`,
            status: newTripStatus,
            title: newTripTitle.trim(),
            window: newTripWindow,
            corridor: hubsArray.length > 0 ? hubsArray : ['🌍 Primary Hub', '🚅 Secondary Hub'],
            pnrCode: `SN-PNR-${Math.floor(100 + Math.random() * 900)}`,
            accommodation: 'Coliving & Verified Fiber Loft',
            fiberSpeed: '500+ Mbps Target',
            budgetUSD: Number(newTripBudget) || 2400,
            spentUSD: 0,
            visaRegime: 'Nomad Visa / 90-Day Waiver (<183d Compliant)',
            xpEarned: 1200,
            notes: 'Custom expedition created in OdysseyOS™ My Trips & Journey.'
        };

        setExpeditions((prev) => [created, ...prev]);

        // Also log country stamp if not already present
        if (hubsArray.length > 0) {
            const firstHub = hubsArray[0];
            setVisitedStamps((prev) => [
                {
                    code: `C${Date.now().toString().slice(-2)}`,
                    name: firstHub,
                    emoji: '🌍',
                    year: 2026,
                    cities: hubsArray,
                    daysLogged: 21,
                    taxLimit: 183,
                    peakWifiMbps: 550,
                    xp: 650
                },
                ...prev
            ]);
        }

        setNewTripTitle('');
        setNewTripHubs('');
        setShowNewTripDrawer(false);
        addToast(`Created Expedition "${created.title}" and synced with Itinerary Builder!`, 'success');
    };

    const handleDeleteExpedition = (id, title) => {
        setExpeditions((prev) => prev.filter((t) => t.id !== id));
        addToast(`Removed "${title}" from My Trips`, 'info');
    };

    const handleExportJourneyDossier = () => {
        const payload = {
            exportedAt: new Date().toISOString(),
            platform: 'SeeNomad OdysseyOS™ — My Trips & Journey Ledger',
            expeditions,
            visitedStamps,
            syncedBookings: syncedData
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seenomad-my-trips-journey.json';
        a.click();
        URL.revokeObjectURL(url);
        addToast('Exported complete My Trips & Journey JSON dossier!', 'success');
    };

    const filteredExpeditions = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return expeditions.filter((t) => {
            if (!q) return true;
            const hay = `${t.title} ${t.corridor.join(' ')} ${t.accommodation} ${t.visaRegime} ${t.notes}`.toLowerCase();
            return hay.includes(q);
        });
    }, [expeditions, searchQuery]);

    const totalCountriesCount = visitedStamps.length;
    const totalCitiesCount = visitedStamps.reduce((sum, c) => sum + c.cities.length, 0);
    const totalDaysAbroad = visitedStamps.reduce((sum, c) => sum + c.daysLogged, 0);
    const totalJourneyXP =
        visitedStamps.reduce((sum, c) => sum + c.xp, 0) +
        expeditions.reduce((sum, e) => sum + e.xpEarned, 0);

    const activePassesCount = Object.keys(syncedData.reservedExperiences).length;
    const activeEscrowsCount = Object.keys(syncedData.fixerContracts).length;
    const activeShieldsCount = Object.keys(syncedData.activeInsurance).length;

    return (
        <div className="mtj-hub-shell">
            {/* 1. Editorial Hero Banner & Live Expedition Telemetry */}
            <header className="mtj-hero-banner">
                <div className="mtj-hero-top">
                    <div>
                        <span className="mtj-kicker">
                            <Luggage size={13} />
                            SeeNomad OdysseyOS™ · Unified Trip Command, Live Booking Vault & Passport Ledger
                        </span>
                        <h1 className="mtj-title">
                            My Trips, Active Departures & Global Nomad Journey
                        </h1>
                        <p className="mtj-subtitle">
                            Your single command center synchronizing multi-city expeditions from the Itinerary Builder, reserved Local Experiences passes, Local Fixer smart-escrow contracts, AegisShield™ insurance policies, and your 183-day country presence log.
                        </p>
                    </div>

                    <div className="mtj-hero-actions">
                        <button
                            type="button"
                            className="mtj-btn mtj-btn-primary"
                            onClick={() => setShowNewTripDrawer((prev) => !prev)}
                        >
                            <Plus size={15} />
                            {showNewTripDrawer ? 'Close Trip Logger' : 'Log New Trip / Stamp'}
                        </button>
                        <button
                            type="button"
                            className="mtj-btn"
                            onClick={() => navigate('/explore/planner')}
                        >
                            <GitBranch size={14} />
                            Open Itinerary Builder
                        </button>
                        <button
                            type="button"
                            className="mtj-btn"
                            onClick={() => navigate('/explore/travel-map')}
                        >
                            <Map size={14} />
                            3D Travel Map
                        </button>
                        <button
                            type="button"
                            className="mtj-btn"
                            onClick={handleExportJourneyDossier}
                        >
                            <Download size={14} />
                            Export Ledger
                        </button>
                    </div>
                </div>

                {/* Unboxed Telemetry Row */}
                <div className="mtj-kpi-row">
                    <div className="mtj-kpi-metrics">
                        <span>
                            Active & Planned Trips: <strong>{expeditions.length} Corridors</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Passport Ledger: <strong>{totalCountriesCount} Countries · {totalCitiesCount} Hubs</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Logged Presence: <strong>{totalDaysAbroad} Days Abroad</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Synced Vault:{' '}
                            <strong style={{ color: '#10b981' }}>
                                {activePassesCount} Passes · {activeEscrowsCount} Escrows · {activeShieldsCount} Shields
                            </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Lifetime Odyssey XP: <strong style={{ color: '#38bdf8' }}>{totalJourneyXP.toLocaleString()} XP</strong>
                        </span>
                    </div>
                </div>
            </header>

            {/* 2. Log New Expedition / Country Stamp Drawer */}
            {showNewTripDrawer && (
                <form className="mtj-drawer" onSubmit={handleCreateExpedition}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={15} color="#38bdf8" />
                            Log a New Multi-City Expedition or Country Stamp
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Automatically updates your 183-Day Tax Presence Log and ChronoRoute™ queue
                        </span>
                    </div>

                    <div className="mtj-form-grid">
                        <label className="mtj-field-label">
                            <span>Expedition Title</span>
                            <input
                                type="text"
                                className="mtj-input"
                                placeholder="e.g. Alpine Glacier & Northern Italy Rail Loop"
                                value={newTripTitle}
                                onChange={(e) => setNewTripTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label className="mtj-field-label">
                            <span>Route Stops (Comma-Separated)</span>
                            <input
                                type="text"
                                className="mtj-input"
                                placeholder="e.g. Zurich, Zermatt, Milan, Bologna"
                                value={newTripHubs}
                                onChange={(e) => setNewTripHubs(e.target.value)}
                                required
                            />
                        </label>

                        <label className="mtj-field-label">
                            <span>Travel Dates & Duration</span>
                            <input
                                type="text"
                                className="mtj-input"
                                value={newTripWindow}
                                onChange={(e) => setNewTripWindow(e.target.value)}
                            />
                        </label>

                        <label className="mtj-field-label">
                            <span>Trip Status</span>
                            <select
                                className="mtj-select"
                                value={newTripStatus}
                                onChange={(e) => setNewTripStatus(e.target.value)}
                            >
                                <option value="Active Expedition">Active Expedition</option>
                                <option value="Upcoming Departure">Upcoming Departure</option>
                                <option value="Completed Journey">Completed Journey</option>
                            </select>
                        </label>

                        <label className="mtj-field-label">
                            <span>Estimated Budget (USD)</span>
                            <input
                                type="number"
                                className="mtj-input"
                                value={newTripBudget}
                                onChange={(e) => setNewTripBudget(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="mtj-btn mtj-btn-primary">
                            <CheckCircle2 size={14} />
                            Save Expedition
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Navigation Tabs & Search Filter Toolbar */}
            <section className="mtj-toolbar" aria-label="Filter trips and journey ledger">
                <div className="mtj-tabs" role="tablist">
                    {JOURNEY_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            className={`mtj-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mtj-search-box">
                    <Search size={14} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search Tokyo, Lisbon, machiya, D8 visa, PNR..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search trips and countries"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#94a3b8',
                                cursor: 'pointer',
                                padding: 0
                            }}
                            aria-label="Clear search"
                        >
                            <X size={13} />
                        </button>
                    )}
                </div>
            </section>

            {/* 4. Main Split Workspace: Expeditions / Stamps + Live Synced Booking Vault */}
            <div className="mtj-workspace-layout">
                {/* Left Column: Dynamic View Based on Selected Tab */}
                <div className="mtj-cards-stack">
                    {/* A. Active & Upcoming Multi-City Expeditions */}
                    {(activeTab === 'all' || activeTab === 'upcoming') && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ margin: 0, fontSize: '1.04rem', fontWeight: 800 }}>
                                    Active & Upcoming Multi-City Expeditions ({filteredExpeditions.length})
                                </h2>
                                <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>
                                    Synced with ChronoRoute™ Day-by-Day Itinerary Builder
                                </span>
                            </div>

                            {filteredExpeditions.map((trip) => {
                                const budgetPct = Math.min(100, Math.round((trip.spentUSD / trip.budgetUSD) * 100));
                                return (
                                    <article key={trip.id} className="mtj-trip-card">
                                        <div className="mtj-trip-top">
                                            <div>
                                                <span className="mtj-kicker">
                                                    {trip.status} · {trip.window} · PNR: {trip.pnrCode}
                                                </span>
                                                <h3 className="mtj-trip-title">{trip.title}</h3>
                                            </div>

                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#38bdf8' }}>
                                                    ${trip.spentUSD.toLocaleString()} / ${trip.budgetUSD.toLocaleString()}
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                                                    +{trip.xpEarned} Odyssey XP
                                                </div>
                                            </div>
                                        </div>

                                        {/* Multi-Stop Corridor Flow */}
                                        <div className="mtj-stops-flow">
                                            {trip.corridor.map((stop, idx) => (
                                                <React.Fragment key={idx}>
                                                    <span>{stop}</span>
                                                    {idx < trip.corridor.length - 1 && (
                                                        <ArrowRight size={13} color="#38bdf8" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        {/* Unboxed Telemetry Metadata */}
                                        <div className="mtj-meta-strip">
                                            <span>
                                                <strong>Stays:</strong> {trip.accommodation}
                                            </span>
                                            <span aria-hidden="true">·</span>
                                            <span>
                                                <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                {trip.fiberSpeed}
                                            </span>
                                            <span aria-hidden="true">·</span>
                                            <span>
                                                <strong>Compliance:</strong> {trip.visaRegime}
                                            </span>
                                        </div>

                                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                                            {trip.notes}
                                        </p>

                                        <div className="mtj-trip-footer">
                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                                Budget Utilization: <strong>{budgetPct}%</strong> committed
                                            </span>

                                            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                                                <button
                                                    type="button"
                                                    className="mtj-btn"
                                                    onClick={() => handleDeleteExpedition(trip.id, trip.title)}
                                                    aria-label="Remove trip"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mtj-btn"
                                                    onClick={() => navigate('/explore/book-travel')}
                                                >
                                                    <Plane size={13} />
                                                    Manage Flights/Stays
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mtj-btn mtj-btn-primary"
                                                    onClick={() => navigate('/explore/planner')}
                                                >
                                                    <GitBranch size={13} />
                                                    Edit Day-by-Day Route
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </>
                    )}

                    {/* B. Passport Country Stamp Ledger */}
                    {(activeTab === 'all' || activeTab === 'stamps') && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: activeTab === 'all' ? '0.6rem' : 0 }}>
                                <h2 style={{ margin: 0, fontSize: '1.04rem', fontWeight: 800 }}>
                                    Verified Passport Country Ledger & 183-Day Presence ({visitedStamps.length} Countries)
                                </h2>
                                <button
                                    type="button"
                                    className="mtj-btn"
                                    style={{ padding: '0.32rem 0.7rem', fontSize: '0.72rem' }}
                                    onClick={() => navigate('/explore/tax-calculator')}
                                >
                                    <Scale size={13} />
                                    Open Tax & 183d Calculator
                                </button>
                            </div>

                            <div className="mtj-stamps-grid">
                                {visitedStamps.map((stamp) => {
                                    const pct = Math.min(100, Math.round((stamp.daysLogged / stamp.taxLimit) * 100));
                                    return (
                                        <div key={stamp.code} className="mtj-stamp-card">
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <strong style={{ fontSize: '0.96rem' }}>
                                                        {stamp.emoji} {stamp.name}
                                                    </strong>
                                                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                                                        +{stamp.xp} XP
                                                    </span>
                                                </div>

                                                <div className="mtj-meta-strip" style={{ marginTop: '0.25rem' }}>
                                                    <span>{stamp.daysLogged} / {stamp.taxLimit}d tax threshold</span>
                                                    <span aria-hidden="true">·</span>
                                                    <span>{stamp.peakWifiMbps} Mbps peak</span>
                                                </div>

                                                <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '0.45rem' }}>
                                                    <strong>Hubs:</strong> {stamp.cities.join(' · ')}
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: 6,
                                                    borderRadius: 999,
                                                    background: 'rgba(255,255,255,0.08)',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${pct}%`,
                                                        height: '100%',
                                                        background: pct > 80 ? '#f59e0b' : '#38bdf8'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* C. Synced Ecosystem Vault Tab */}
                    {activeTab === 'vault' && (
                        <div className="mtj-trip-card">
                            <h3 style={{ margin: 0, fontSize: '1.05rem' }}>
                                Live Cross-Platform Booking & Protection Vault
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.79rem', color: '#94a3b8' }}>
                                Every pass, fixer escrow, and insurance shield you activate across SeeNomad automatically syncs here.
                            </p>

                            <div className="mtj-stamps-grid">
                                <div className="mtj-stamp-card">
                                    <strong>Local Experience Passes ({activePassesCount})</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {activePassesCount > 0
                                            ? `Active Pass Codes: ${Object.values(syncedData.reservedExperiences)
                                                  .map((p) => p.passCode)
                                                  .join(', ')}`
                                            : 'No active workshop or eco passes reserved yet.'}
                                    </span>
                                    <button
                                        type="button"
                                        className="mtj-btn"
                                        onClick={() => navigate('/learning-voluntourism')}
                                    >
                                        <Palmtree size={13} /> Browse Local Experiences
                                    </button>
                                </div>

                                <div className="mtj-stamp-card">
                                    <strong>Local Fixer Escrow Missions ({activeEscrowsCount})</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {activeEscrowsCount > 0
                                            ? `Active Contracts: ${Object.values(syncedData.fixerContracts)
                                                  .map((c) => c.contractId)
                                                  .join(', ')}`
                                            : 'No active local fixer escrow contracts.'}
                                    </span>
                                    <button
                                        type="button"
                                        className="mtj-btn"
                                        onClick={() => navigate('/explore/guardians')}
                                    >
                                        <UserCheck size={13} /> Deploy a Local Guardian
                                    </button>
                                </div>

                                <div className="mtj-stamp-card">
                                    <strong>AegisShield™ Insurance Policies ({activeShieldsCount})</strong>
                                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {activeShieldsCount > 0
                                            ? `Active Shields: ${Object.values(syncedData.activeInsurance)
                                                  .map((s) => s.policyId)
                                                  .join(', ')}`
                                            : 'No active parametric or medical shields.'}
                                    </span>
                                    <button
                                        type="button"
                                        className="mtj-btn"
                                        onClick={() => navigate('/support-utility')}
                                    >
                                        <ShieldCheck size={13} /> Manage Insurance & SOS
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* D. Nomad Odyssey Milestones Tab */}
                    {activeTab === 'milestones' && (
                        <div className="mtj-stamps-grid">
                            {ODYSSEY_MILESTONES.map((m) => (
                                <div key={m.id} className="mtj-stamp-card">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>{m.title}</strong>
                                            <span style={{ fontSize: '0.72rem', color: m.unlocked ? '#10b981' : '#94a3b8', fontWeight: 700 }}>
                                                {m.unlocked ? `✓ Earned (+${m.xp} XP)` : `Locked (${m.xp} XP)`}
                                            </span>
                                        </div>
                                        <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                                            {m.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Live Ecosystem Sync Vault & Pre-Departure Readiness */}
                <aside className="mtj-side-rail" aria-label="Synced Bookings Vault and Pre-Departure Checklist">
                    {/* Synced Ecosystem Passes, Escrows & Shields */}
                    <div className="mtj-side-panel">
                        <h3 className="mtj-side-title">
                            <span>
                                <ShieldCheck
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Live Synced Trip Vault
                            </span>
                        </h3>

                        <div className="mtj-vault-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>AegisShield™ Medical & Flight</strong>
                                <span style={{ color: '#10b981', fontWeight: 700 }}>{activeShieldsCount} Live</span>
                            </div>
                            <span style={{ color: '#94a3b8' }}>
                                Cashless Hospital QR & 48s Flight Delay Oracle armed
                            </span>
                        </div>

                        <div className="mtj-vault-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Sovereign Fixer Escrow</strong>
                                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{activeEscrowsCount} Locked</span>
                            </div>
                            <span style={{ color: '#94a3b8' }}>
                                On-ground apartment fiber & lease verification active
                            </span>
                        </div>

                        <div className="mtj-vault-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Cultural Experience Passes</strong>
                                <span style={{ color: '#10b981', fontWeight: 700 }}>{activePassesCount} Reserved</span>
                            </div>
                            <span style={{ color: '#94a3b8' }}>
                                Remote-work-timed workshops & immersions
                            </span>
                        </div>

                        {syncedData.queuedItineraryItems.length > 0 && (
                            <div className="mtj-vault-item">
                                <strong>Queued Itinerary Stops ({syncedData.queuedItineraryItems.length})</strong>
                                <span style={{ color: '#cbd5e1' }}>
                                    Latest: {syncedData.queuedItineraryItems[0]?.title}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Interactive Pre-Departure Readiness Checklist */}
                    <div className="mtj-side-panel">
                        <h3 className="mtj-side-title">
                            <span>
                                <CheckCircle2
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Pre-Departure Flight Readiness
                            </span>
                        </h3>

                        {[
                            ['eSimActivated', 'Global eSIM & Dual-WAN Backup Activated'],
                            ['consularInsurancePdf', 'Consular Sin-Copago Insurance PDF Downloaded'],
                            ['fixerLeaseAudit', 'Local Fixer Apartment Speed & Noise Proof Verified'],
                            ['onwardTicketVerified', 'Return / Onward Flight PNR Verified for Boarding'],
                            ['taxPresenceUnder183', '183-Day Rolling Tax Presence Buffer Confirmed']
                        ].map(([key, label]) => (
                            <label key={key} className="mtj-check-row">
                                <input
                                    type="checkbox"
                                    checked={!!readinessChecks[key]}
                                    onChange={() =>
                                        setReadinessChecks((prev) => ({
                                            ...prev,
                                            [key]: !prev[key]
                                        }))
                                    }
                                />
                                <span
                                    style={{
                                        textDecoration: readinessChecks[key] ? 'line-through' : 'none',
                                        color: readinessChecks[key] ? '#94a3b8' : 'inherit'
                                    }}
                                >
                                    {label}
                                </span>
                            </label>
                        ))}

                        <button
                            type="button"
                            className="mtj-btn mtj-btn-primary"
                            style={{ width: '100%', marginTop: '0.25rem' }}
                            onClick={() => navigate('/explore/trivenly')}
                        >
                            Open Destination Playbooks
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TravelMap;
