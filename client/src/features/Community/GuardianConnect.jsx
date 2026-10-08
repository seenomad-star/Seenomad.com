import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    UserCheck,
    ShieldCheck,
    Star,
    Clock,
    Wifi,
    FileCheck2,
    Building2,
    Siren,
    Sparkles,
    Search,
    Plus,
    Bookmark,
    CheckCircle2,
    GitBranch,
    Plane,
    X,
    SlidersHorizontal,
    Scale,
    Lock,
    Calculator,
    Compass
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/TravelAgentsHub.css';

const AGENT_SPECIALTIES = [
    { id: 'all', label: 'All Verified Guardians & Fixers' },
    { id: 'flat-scout', label: 'Lease Arbitrage & Fiber Verification' },
    { id: 'visa-legal', label: 'DNV Visa, Tax ID & Consular Fixers' },
    { id: 'route-desk', label: 'Zero-Markup Route & Retreat Desk' },
    { id: 'crisis-sos', label: '24/7 Medical, Customs & SOS Response' },
    { id: 'saved', label: 'Saved Roster' },
    { id: 'contracts', label: 'Active Escrow Missions' }
];

const INITIAL_AGENTS = [
    {
        id: 'ag-1',
        name: 'Gonçalo Ferreira, LL.M.',
        role: 'Portuguese D8 Visa, NIF & Lease Arbitrage Fixer',
        specialty: 'visa-legal',
        city: 'Lisbon & Ericeira',
        country: 'Portugal',
        flag: '🇵🇹',
        languages: 'English, Portuguese, Spanish',
        responseSla: '7 min avg SLA',
        rating: 4.99,
        missionsCompleted: 642,
        avgClientSavings: 840,
        flatFee: 65,
        retainerFee: 160,
        xpReward: 550,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        bio: 'Former immigration counsel & local housing negotiator. Secures NIF tax numbers in 24h, vets Finanças-registered rental contracts, and negotiates direct Portuguese landlord rates.',
        verifiedDeliverables: 'NIF + Bank Setup · Live Apartment Video & Ethernet Ping · AIMA Appointment Escort',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Pre-arrival document audit, power-of-attorney NIF issuance & neighborhood shortlist' },
            { step: 'Phase 02', desc: 'On-ground apartment inspection: 4K walkthrough, router speed test & acoustic dB log' },
            { step: 'Phase 03', desc: 'Direct landlord lease negotiation in Portuguese (0% OTA markup) & key handoff' }
        ]
    },
    {
        id: 'ag-2',
        name: 'Kenji Takahashi',
        role: 'Machiya Lease Scout, Fiber Engineer & Ward Office Fixer',
        specialty: 'flat-scout',
        city: 'Kyoto & Tokyo',
        country: 'Japan',
        flag: '🇯🇵',
        languages: 'English, Japanese (JLPT N1 Native)',
        responseSla: '5 min avg SLA',
        rating: 5.0,
        missionsCompleted: 518,
        avgClientSavings: 920,
        flatFee: 55,
        retainerFee: 145,
        xpReward: 500,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        bio: 'Bypasses foreigner key-money (Reikin) markups by contracting directly with Kyoto & Shibuya property owners. Performs on-site 10Gbps NURO fiber and ergonomic chair verification.',
        verifiedDeliverables: 'Zero Key-Money Lease · Live Speedtest.net Proof · Ward Office Resident Registration',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Curate 4 foreigner-friendly monthly apartments bypassing 35% agency fees' },
            { step: 'Phase 02', desc: 'Live video call from inside the unit showing fiber ping, desk ergonomics & natural light' },
            { step: 'Phase 03', desc: 'Bilingual lease translation, Suica/JR Pass optimization & pocket Wi-Fi backup delivery' }
        ]
    },
    {
        id: 'ag-3',
        name: 'Putu Wijaya & Banjar Legal Team',
        role: 'Villa Construction Audit, KITAS Visa & 24/7 Emergency Fixer',
        specialty: 'crisis-sos',
        city: 'Canggu, Uluwatu & Ubud',
        country: 'Indonesia',
        flag: '🇮🇩',
        languages: 'English, Bahasa Indonesia, Balinese',
        responseSla: '4 min avg SLA',
        rating: 4.98,
        missionsCompleted: 789,
        avgClientSavings: 1150,
        flatFee: 45,
        retainerFee: 120,
        xpReward: 600,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        bio: 'Protects remote workers from hidden adjacent villa construction noise, inflated tourist leases, and customs/medical emergencies across Bali.',
        verifiedDeliverables: '360° Construction Noise Audit · B211A / E33G Remote Worker Visa · 24/7 Clinic & Scooter SOS',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Radius inspection around target villa to verify zero jackhammer/construction sites' },
            { step: 'Phase 02', desc: 'Direct Banjar owner price negotiation + Biznet Dual-WAN fiber uptime check' },
            { step: 'Phase 03', desc: 'VIP Ngurah Rai airport fast-track, SIM activation & 24/7 WhatsApp SOS retainer' }
        ]
    },
    {
        id: 'ag-4',
        name: 'Valentina Restrepo',
        role: 'El Poblado Lease Negotiator & Multi-Andean Route Architect',
        specialty: 'flat-scout',
        city: 'Medellín & Santa Marta',
        country: 'Colombia',
        flag: '🇨🇴',
        languages: 'English, Spanish, French',
        responseSla: '6 min avg SLA',
        rating: 4.97,
        missionsCompleted: 430,
        avgClientSavings: 780,
        flatFee: 48,
        retainerFee: 125,
        xpReward: 480,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
        bio: 'Secures high-floor Manila and Provenza penthouses without co-signer (fiador) hurdles, and coordinates private coffee-region transfers and nomad visa paperwork.',
        verifiedDeliverables: 'No-Fiador Direct Lease · 300Mbps Movistar Fiber Check · Migration Colombia V-Visa Filing',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Shortlist quiet, security-vetted buildings in Laureles or El Poblado at local COP rates' },
            { step: 'Phase 02', desc: 'On-site video verification of fiber upload stability, backup power & street noise' },
            { step: 'Phase 03', desc: 'Direct COP lease signing + private armored airport pickup & Cédula de Extranjería prep' }
        ]
    },
    {
        id: 'ag-5',
        name: 'Elena Vance-Rousseau',
        role: 'Global RTW Fare Desk, Corporate Workation & Retreat Architect',
        specialty: 'route-desk',
        city: 'Global GDS Desk (Zurich / Singapore)',
        country: 'Global',
        flag: '🌍',
        languages: 'English, German, French, Mandarin',
        responseSla: '8 min avg SLA',
        rating: 4.99,
        missionsCompleted: 910,
        avgClientSavings: 1420,
        flatFee: 75,
        retainerFee: 210,
        xpReward: 700,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
        bio: 'IATA-accredited GDS specialist who turns AI-generated multi-city itineraries into wholesale-ticketed Star Alliance/Oneworld corridors and 10–40 person founder retreats.',
        verifiedDeliverables: '0% Markup Wholesale Airfares · Multi-Stop Open-Jaw Ticketing · Team Offsite Villa Buyouts',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Import your SeeNomad ChronoRoute™ or AI Studio itinerary for GDS fare-bucket audit' },
            { step: 'Phase 02', desc: 'Construct hidden stopover & open-jaw routing saving 22–40% on business/flex cabins' },
            { step: 'Phase 03', desc: '24/7 active PNR flight disruption monitoring, instant rebooking & lounge pass issuance' }
        ]
    },
    {
        id: 'ag-6',
        name: 'Mateo & Sofia Alverez',
        role: 'Beckham Law Tax Fixer, NIE Fast-Track & Balearic/Canary Scout',
        specialty: 'visa-legal',
        city: 'Barcelona, Madrid & Las Palmas',
        country: 'Spain',
        flag: '🇪🇸',
        languages: 'English, Spanish, Catalan',
        responseSla: '6 min avg SLA',
        rating: 4.98,
        missionsCompleted: 504,
        avgClientSavings: 960,
        flatFee: 60,
        retainerFee: 155,
        xpReward: 520,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
        bio: 'Eliminates Spanish bureaucratic bottlenecks: secures Cita Previa NIE slots, files Spain Digital Nomad Visas (UGE-CE), and verifies seasonal rentals under LAU Article 3.',
        verifiedDeliverables: 'UGE-CE Nomad Visa Filing · Cita Previa NIE Slot · Seasonal Lease Legal Review',
        escrowMilestones: [
            { step: 'Phase 01', desc: 'Apostille & sworn translation (Traductor Jurado) audit for Spanish DNV eligibility' },
            { step: 'Phase 02', desc: 'Direct UGE-CE electronic submission in Spain for 3-year residency authorization' },
            { step: 'Phase 03', desc: 'Accompanied police station TIE fingerprint appointment & Autónomo/Beckham Law registration' }
        ]
    }
];

const GuardianConnect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [agents] = useState(INITIAL_AGENTS);
    const [activeSpecialty, setActiveSpecialty] = useState('all');
    const [activeCountry, setActiveCountry] = useState('All');
    const [sortBy, setSortBy] = useState('savings-desc');
    const [searchQuery, setSearchQuery] = useState('');

    // Interactive Arbitrage Calculator State (Right Rail Moat Tool)
    const [calcOtaMonthly, setCalcOtaMonthly] = useState(2400);
    const [calcMonths, setCalcMonths] = useState(2);

    // Custom Bounty / Mission Request Drawer
    const [showBountyDrawer, setShowBountyDrawer] = useState(false);
    const [bountyTitle, setBountyTitle] = useState('');
    const [bountyCity, setBountyCity] = useState('');
    const [bountyCategory, setBountyCategory] = useState('flat-scout');
    const [bountyBudget, setBountyBudget] = useState('65');

    const [liveBounties, setLiveBounties] = useState([
        {
            id: 'b-101',
            title: 'Verify 2BR Loft in Alfama + 500Mbps Ethernet Test',
            city: 'Lisbon, Portugal',
            budget: 55,
            status: '2 Fixers Bidding · Escrow Ready'
        },
        {
            id: 'b-102',
            title: 'Accompanied Kyoto Ward Office Move-In & Bank Setup',
            city: 'Kyoto, Japan',
            budget: 60,
            status: 'Matched in 4 mins'
        }
    ]);

    // Saved Agents & Active Escrow Contracts
    const [savedAgentIds, setSavedAgentIds] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_saved_agents');
            return raw ? JSON.parse(raw) : { 'ag-1': true, 'ag-2': true };
        } catch {
            return { 'ag-1': true, 'ag-2': true };
        }
    });

    const [activeContracts, setActiveContracts] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_agent_contracts');
            return raw
                ? JSON.parse(raw)
                : {
                      'ag-2': {
                          contractId: 'ESC-JP-9042',
                          tier: 'single',
                          targetDate: '2026-11-15',
                          brief: 'Verify Higashiyama machiya fiber speed + negotiate zero Reikin lease',
                          totalEscrow: 55
                      }
                  };
        } catch {
            return {};
        }
    });

    const [selectedAgent, setSelectedAgent] = useState(null);
    const [missionTier, setMissionTier] = useState('single'); // 'single' | 'retainer'
    const [missionDate, setMissionDate] = useState('2026-11-20');
    const [missionBrief, setMissionBrief] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_saved_agents', JSON.stringify(savedAgentIds));
        } catch {
            // ignore storage errors
        }
    }, [savedAgentIds]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_agent_contracts', JSON.stringify(activeContracts));
        } catch {
            // ignore storage errors
        }
    }, [activeContracts]);

    // Sync query parameters if user navigates from Visa or Destination Guides
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const spec = params.get('specialty');
        const country = params.get('country');
        if (spec) setActiveSpecialty(spec);
        if (country) setActiveCountry(country);
    }, [location.search]);

    const handleToggleSave = (agent, e) => {
        if (e) e.stopPropagation();
        const next = !savedAgentIds[agent.id];
        setSavedAgentIds((prev) => ({ ...prev, [agent.id]: next }));
        addToast(
            next
                ? `Added ${agent.name} to your Saved Fixer Roster`
                : `Removed ${agent.name} from Saved Roster`,
            'info'
        );
    };

    const handlePostBounty = (e) => {
        e.preventDefault();
        if (!bountyTitle.trim()) return;

        const created = {
            id: `b-${Date.now()}`,
            title: bountyTitle.trim(),
            city: bountyCity.trim() || 'Lisbon, Portugal',
            budget: Number(bountyBudget) || 60,
            status: 'Broadcasting to Verified Local Fixers (<6 min SLA)'
        };

        setLiveBounties((prev) => [created, ...prev]);
        setBountyTitle('');
        setBountyCity('');
        setShowBountyDrawer(false);
        addToast(
            `Dispatched Mission Bounty "${created.title}" ($${created.budget} Escrow) to local fixers!`,
            'success'
        );
    };

    const handleConfirmEscrowMission = (e) => {
        e.preventDefault();
        if (!selectedAgent) return;

        const fee = missionTier === 'retainer' ? selectedAgent.retainerFee : selectedAgent.flatFee;
        const contractId = `ESC-${selectedAgent.country.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        setActiveContracts((prev) => ({
            ...prev,
            [selectedAgent.id]: {
                contractId,
                tier: missionTier,
                targetDate: missionDate,
                brief:
                    missionBrief.trim() ||
                    `On-ground ${selectedAgent.verifiedDeliverables.split('·')[0].trim()} verification`,
                totalEscrow: fee
            }
        }));

        addToast(
            `Locked Escrow Contract ${contractId} with ${selectedAgent.name} ($${fee} held until proof delivered)! +${selectedAgent.xpReward} XP`,
            'success'
        );
        setMissionBrief('');
        setSelectedAgent(null);
    };

    const handleReleaseOrCancelContract = (agentId, agentName) => {
        setActiveContracts((prev) => {
            const copy = { ...prev };
            delete copy[agentId];
            return copy;
        });
        addToast(`Cancelled Escrow Mission with ${agentName}. 100% of escrow funds returned.`, 'info');
        setSelectedAgent(null);
    };

    const handleSyncWithItinerary = (agent, e) => {
        if (e) e.stopPropagation();
        try {
            const existingRaw = localStorage.getItem('seenomad_queued_itinerary_items');
            const existing = existingRaw ? JSON.parse(existingRaw) : [];
            const nextQueue = [
                {
                    id: `fixer-${agent.id}-${Date.now()}`,
                    title: `Local Fixer Audit: ${agent.name} (${agent.city})`,
                    city: agent.city.split('&')[0].trim(),
                    cost: agent.flatFee,
                    time: 'Arrival Day · 10:00 Local',
                    category: 'stay'
                },
                ...existing
            ];
            localStorage.setItem('seenomad_queued_itinerary_items', JSON.stringify(nextQueue.slice(0, 20)));
        } catch {
            // ignore storage errors
        }
        addToast(`Attached ${agent.name} arrival audit to ChronoRoute™ Itinerary Builder!`, 'success');
        navigate('/explore/planner');
    };

    const filteredAgents = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const list = agents.filter((ag) => {
            if (activeSpecialty === 'saved' && !savedAgentIds[ag.id]) return false;
            if (activeSpecialty === 'contracts' && !activeContracts[ag.id]) return false;
            if (
                activeSpecialty !== 'all' &&
                activeSpecialty !== 'saved' &&
                activeSpecialty !== 'contracts' &&
                ag.specialty !== activeSpecialty
            ) {
                return false;
            }
            if (activeCountry !== 'All' && ag.country !== activeCountry) {
                return false;
            }
            if (q) {
                const hay = `${ag.name} ${ag.role} ${ag.city} ${ag.country} ${ag.bio} ${ag.verifiedDeliverables}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

        return [...list].sort((a, b) => {
            if (sortBy === 'savings-desc') return b.avgClientSavings - a.avgClientSavings;
            if (sortBy === 'fee-asc') return a.flatFee - b.flatFee;
            if (sortBy === 'rating-desc') return b.rating - a.rating;
            return b.missionsCompleted - a.missionsCompleted;
        });
    }, [agents, activeSpecialty, activeCountry, savedAgentIds, activeContracts, searchQuery, sortBy]);

    // Arbitrage Calculator Math
    const totalOtaCost = calcOtaMonthly * calcMonths;
    const directLocalRent = Math.round(totalOtaCost * 0.72); // 28% saved bypassing tourist OTA markups
    const fixerFlatFee = 55;
    const netTravelerSavings = totalOtaCost - directLocalRent - fixerFlatFee;

    const totalSavedCount = Object.values(savedAgentIds).filter(Boolean).length;
    const totalContractCount = Object.keys(activeContracts).length;

    return (
        <div className="ta-hub-shell">
            {/* 1. Editorial Hero Banner & Zero-Markup Escrow Telemetry */}
            <header className="ta-hero-banner">
                <div className="ta-hero-top">
                    <div>
                        <span className="ta-kicker">
                            <ShieldCheck size={13} />
                            SeeNomad Sovereign Guardian™ Protocol · Zero-Commission Escrow Fixers
                        </span>
                        <h1 className="ta-title">
                            Verified Local Fixers, Lease Arbitrage Scouts & Consular Travel Agents
                        </h1>
                        <p className="ta-subtitle">
                            Traditional travel agencies charge 15–30% hidden markups. SeeNomad Guardians work on transparent flat-fee escrow: they physically inspect apartments before you sign, run live Ethernet fiber tests, negotiate local-language leases, and fast-track DNV visas.
                        </p>
                    </div>

                    <div className="ta-hero-actions">
                        <button
                            type="button"
                            className="ta-btn ta-btn-primary"
                            onClick={() => setShowBountyDrawer((prev) => !prev)}
                        >
                            <Plus size={15} />
                            {showBountyDrawer ? 'Close Bounty Studio' : 'Dispatch Custom Fixer Bounty'}
                        </button>
                        <button
                            type="button"
                            className="ta-btn"
                            onClick={() => navigate('/explore/ai-studio')}
                        >
                            <Sparkles size={14} />
                            AI Route + Human Audit
                        </button>
                        <button
                            type="button"
                            className="ta-btn"
                            onClick={() => navigate('/explore/visa')}
                        >
                            <FileCheck2 size={14} />
                            2026 Visa Rules
                        </button>
                    </div>
                </div>

                {/* Unboxed Telemetry & Hub Switcher */}
                <div className="ta-kpi-row">
                    <div className="ta-kpi-metrics">
                        <span>
                            Commission Markup: <strong>0% (100% Wholesale Pass-Through)</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Avg Lease & Flight Savings: <strong>$890 / trip</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Escrow Protection: <strong>Released Only After Video/Speed Proof</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Active Missions: <strong>{totalContractCount} Escrow Locked</strong>
                        </span>
                    </div>

                    <div className="ta-corridor-switcher" role="group" aria-label="Filter by Country Corridor">
                        {['All', 'Portugal', 'Japan', 'Indonesia', 'Colombia', 'Spain', 'Global'].map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={`ta-corridor-btn ${activeCountry === c ? 'active' : ''}`}
                                onClick={() => setActiveCountry(c)}
                            >
                                {c === 'All' ? '🌍 All Corridors' : c}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 2. Dispatch Custom Fixer Bounty Drawer */}
            {showBountyDrawer && (
                <form className="ta-drawer" onSubmit={handlePostBounty}>
                    <div className="ta-drawer-header">
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Lock size={15} color="#38bdf8" />
                            Broadcast an On-Ground Fixer Bounty (Smart-Escrow Protected)
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Funds remain locked in escrow until your local Guardian uploads verified video/speed proof
                        </span>
                    </div>

                    <div className="ta-form-grid">
                        <label className="ta-field-label">
                            <span>Mission Objective</span>
                            <input
                                type="text"
                                className="ta-input"
                                placeholder="e.g. Inspect 2BR loft in Canggu + test Biznet fiber & neighbor noise"
                                value={bountyTitle}
                                onChange={(e) => setBountyTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label className="ta-field-label">
                            <span>Target City & Neighborhood</span>
                            <input
                                type="text"
                                className="ta-input"
                                placeholder="e.g. Canggu, Bali or Shibuya, Tokyo"
                                value={bountyCity}
                                onChange={(e) => setBountyCity(e.target.value)}
                                required
                            />
                        </label>

                        <label className="ta-field-label">
                            <span>Required Fixer Specialty</span>
                            <select
                                className="ta-select"
                                value={bountyCategory}
                                onChange={(e) => setBountyCategory(e.target.value)}
                            >
                                <option value="flat-scout">Apartment Video & Fiber Verification</option>
                                <option value="visa-legal">DNV Visa, Tax ID & Consular Escort</option>
                                <option value="route-desk">Wholesale Multi-City Flight & Villa Desk</option>
                                <option value="crisis-sos">24/7 Emergency, Customs & Medical Fixer</option>
                            </select>
                        </label>

                        <label className="ta-field-label">
                            <span>Flat Escrow Bounty (USD)</span>
                            <input
                                type="number"
                                min="25"
                                max="1000"
                                className="ta-input"
                                value={bountyBudget}
                                onChange={(e) => setBountyBudget(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="ta-btn ta-btn-primary">
                            <CheckCircle2 size={14} />
                            Broadcast Bounty
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Specialty & SLA Filter Toolbar */}
            <section className="ta-toolbar" aria-label="Filter verified travel agents and fixers">
                <div className="ta-toolbar-row">
                    <div className="ta-tabs" role="tablist">
                        {AGENT_SPECIALTIES.map((spec) => {
                            const count =
                                spec.id === 'saved'
                                    ? totalSavedCount
                                    : spec.id === 'contracts'
                                    ? totalContractCount
                                    : null;
                            return (
                                <button
                                    key={spec.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeSpecialty === spec.id}
                                    className={`ta-tab ${activeSpecialty === spec.id ? 'active' : ''}`}
                                    onClick={() => setActiveSpecialty(spec.id)}
                                >
                                    {spec.label}
                                    {count !== null ? ` (${count})` : ''}
                                </button>
                            );
                        })}
                    </div>

                    <div className="ta-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search NIF, machiya lease, Bali KITAS, GDS airfare, Spain NIE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search travel agents and fixers"
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
                </div>

                <div className="ta-toolbar-row">
                    <div className="ta-meta-strip">
                        <span>
                            <strong>Why SeeNomad Moat Beats OTAs:</strong> Direct local-language landlord contracts · Physical router speed-test proof · Bar-certified immigration counsel
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <SlidersHorizontal size={13} color="#94a3b8" />
                        <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>Sort:</span>
                        <select
                            className="ta-select"
                            style={{ width: 'auto', padding: '0.32rem 0.65rem', fontSize: '0.73rem' }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort travel agents"
                        >
                            <option value="savings-desc">Highest Client Savings ($/trip)</option>
                            <option value="rating-desc">Highest Verified Rating (4.98+)</option>
                            <option value="fee-asc">Lowest Flat Audit Fee</option>
                            <option value="missions-desc">Most Missions Completed</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 4. Main Split Workspace: Verified Fixers Grid + Arbitrage Calculator & Live Bounties */}
            <div className="ta-workspace-layout">
                {/* Left Column: Agent Cards */}
                <section className="ta-grid" aria-label="Verified travel agents and local fixers">
                    {filteredAgents.length === 0 ? (
                        <div
                            className="ta-side-panel"
                            style={{ gridColumn: '1 / -1', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1.5rem' }}
                        >
                            <UserCheck size={28} color="#38bdf8" />
                            <h3 style={{ margin: '0.35rem 0 0 0', fontSize: '1.05rem' }}>
                                No Guardians Match Your Current Filter
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', maxWidth: 420 }}>
                                Reset your specialty or corridor filter to browse all verified local fixers, lease scouts, and consular specialists.
                            </p>
                            <button
                                type="button"
                                className="ta-btn ta-btn-primary"
                                onClick={() => {
                                    setActiveSpecialty('all');
                                    setActiveCountry('All');
                                    setSearchQuery('');
                                }}
                            >
                                Show All Verified Guardians
                            </button>
                        </div>
                    ) : (
                        filteredAgents.map((agent) => {
                            const isSaved = !!savedAgentIds[agent.id];
                            const contract = activeContracts[agent.id];

                            return (
                                <article key={agent.id} className="ta-card">
                                    <div>
                                        <div className="ta-card-header">
                                            <div className="ta-agent-identity">
                                                <div className="ta-avatar-wrap">
                                                    <img src={agent.avatar} alt={agent.name} loading="lazy" />
                                                    <span className="ta-online-dot" title="Online · Instant Dispatch" />
                                                </div>
                                                <div>
                                                    <h3
                                                        className="ta-agent-name"
                                                        onClick={() => setSelectedAgent(agent)}
                                                    >
                                                        {agent.flag} {agent.name}
                                                    </h3>
                                                    <div className="ta-agent-role">{agent.role}</div>
                                                    <div className="ta-meta-strip" style={{ marginTop: '0.2rem' }}>
                                                        <span>{agent.city}</span>
                                                        <span aria-hidden="true">·</span>
                                                        <span>
                                                            <Star
                                                                size={11}
                                                                fill="#F59E0B"
                                                                color="#F59E0B"
                                                                style={{ display: 'inline', marginRight: 2 }}
                                                            />
                                                            <strong>{agent.rating}</strong> ({agent.missionsCompleted} missions)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className={`ta-save-btn ${isSaved ? 'saved' : ''}`}
                                                onClick={(e) => handleToggleSave(agent, e)}
                                                aria-label="Save agent to roster"
                                            >
                                                <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>

                                        <div className="ta-card-body">
                                            {/* Unboxed Telemetry Line */}
                                            <div className="ta-meta-strip">
                                                <span>
                                                    <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {agent.responseSla}
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span>{agent.languages}</span>
                                                <span aria-hidden="true">·</span>
                                                <span style={{ color: '#10b981', fontWeight: 700 }}>
                                                    Avg Saved: ${agent.avgClientSavings}
                                                </span>
                                            </div>

                                            <p className="ta-card-bio">{agent.bio}</p>

                                            {/* Moat Deliverables Box */}
                                            <div className="ta-moat-box">
                                                <div className="ta-moat-row">
                                                    <strong style={{ color: '#38bdf8' }}>Verified Escrow Deliverables:</strong>
                                                    <span style={{ color: '#10b981', fontWeight: 700 }}>
                                                        +{agent.xpReward} XP
                                                    </span>
                                                </div>
                                                <div style={{ color: '#cbd5e1', lineHeight: 1.4 }}>
                                                    {agent.verifiedDeliverables}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ta-card-footer">
                                        <div>
                                            <span className="ta-price-display">${agent.flatFee}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                                                {' '}
                                                flat mission · ${agent.retainerFee}/mo 24/7
                                            </span>
                                            {contract && (
                                                <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>
                                                    Escrow {contract.contractId} · ${contract.totalEscrow} Locked
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button
                                                type="button"
                                                className="ta-btn"
                                                onClick={(e) => handleSyncWithItinerary(agent, e)}
                                                title="Attach arrival audit to ChronoRoute Itinerary Builder"
                                            >
                                                + Itinerary
                                            </button>
                                            <button
                                                type="button"
                                                className={`ta-btn ${contract ? 'ta-btn-emerald' : 'ta-btn-primary'}`}
                                                onClick={() => setSelectedAgent(agent)}
                                            >
                                                {contract ? (
                                                    <>
                                                        <CheckCircle2 size={13} />
                                                        Active Escrow
                                                    </>
                                                ) : (
                                                    'Deploy Fixer'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </section>

                {/* Right Column: Lease Arbitrage Calculator & Live Bounty Feed */}
                <aside className="ta-side-rail" aria-label="Lease Arbitrage Calculator and Live Fixer Bounties">
                    {/* Interactive Moat Calculator: Tourist OTA vs Local Fixer Direct Lease */}
                    <div className="ta-side-panel">
                        <h3 className="ta-side-title">
                            <span>
                                <Calculator
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Direct Lease Arbitrage Calculator
                            </span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.42 }}>
                            See how much a local Fixer saves you by negotiating a direct landlord lease versus paying tourist OTA platform markups.
                        </p>

                        <label className="ta-field-label">
                            <span>Quoted Monthly OTA Rent: ${calcOtaMonthly}/mo</span>
                            <input
                                type="range"
                                min="900"
                                max="6000"
                                step="100"
                                value={calcOtaMonthly}
                                onChange={(e) => setCalcOtaMonthly(Number(e.target.value))}
                            />
                        </label>

                        <label className="ta-field-label">
                            <span>Stay Duration: {calcMonths} {calcMonths === 1 ? 'Month' : 'Months'}</span>
                            <input
                                type="range"
                                min="1"
                                max="6"
                                step="1"
                                value={calcMonths}
                                onChange={(e) => setCalcMonths(Number(e.target.value))}
                            />
                        </label>

                        <div className="ta-savings-breakdown">
                            <div className="ta-savings-row">
                                <span>Tourist OTA Total ({calcMonths} mo):</span>
                                <strong>${totalOtaCost.toLocaleString()}</strong>
                            </div>
                            <div className="ta-savings-row">
                                <span>Fixer Direct Local Lease (~28% lower):</span>
                                <strong>${directLocalRent.toLocaleString()}</strong>
                            </div>
                            <div className="ta-savings-row">
                                <span>One-Time Fixer Inspection & Lease Fee:</span>
                                <strong>${fixerFlatFee}</strong>
                            </div>
                            <div
                                className="ta-savings-row"
                                style={{
                                    paddingTop: '0.4rem',
                                    borderTop: '1px solid rgba(16, 185, 129, 0.3)',
                                    color: '#10b981',
                                    fontSize: '0.82rem'
                                }}
                            >
                                <strong>Your Net Arbitrage Savings:</strong>
                                <strong>+${netTravelerSavings.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Live On-Ground Bounty Dispatch Feed */}
                    <div className="ta-side-panel">
                        <div className="ta-side-title">
                            <span>
                                <Scale
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Live Fixer Mission Bounties
                            </span>
                            <button
                                type="button"
                                className="ta-btn"
                                style={{ padding: '0.24rem 0.55rem', fontSize: '0.68rem' }}
                                onClick={() => setShowBountyDrawer(true)}
                            >
                                + Post
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {liveBounties.map((b) => (
                                <div key={b.id} className="ta-bounty-item">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                                        <strong>{b.title}</strong>
                                        <strong style={{ color: '#38bdf8', flexShrink: 0 }}>${b.budget}</strong>
                                    </div>
                                    <div style={{ fontSize: '0.69rem', color: '#94a3b8' }}>
                                        {b.city} · <span style={{ color: '#10b981' }}>{b.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="ta-btn"
                            style={{ width: '100%', marginTop: '0.2rem' }}
                            onClick={() => navigate('/support-utility')}
                        >
                            <Siren size={14} />
                            Open 24/7 Emergency SOS & Medical Desk
                        </button>
                    </div>
                </aside>
            </div>

            {/* 5. Smart-Escrow Mission Contract & Fixer Dispatch Modal */}
            {selectedAgent && (
                <div
                    className="ta-modal-backdrop"
                    onClick={() => setSelectedAgent(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="ta-modal-title"
                >
                    <form
                        className="ta-modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleConfirmEscrowMission}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="ta-kicker">
                                    {selectedAgent.flag} {selectedAgent.city} · Smart-Escrow Protected Mission
                                </span>
                                <h3 id="ta-modal-title" style={{ margin: '0.25rem 0 0 0', fontSize: '1.18rem' }}>
                                    Deploy {selectedAgent.name}
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="ta-btn"
                                onClick={() => setSelectedAgent(null)}
                                aria-label="Close modal"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="ta-meta-strip">
                            <span>
                                <strong>{selectedAgent.role}</strong>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{selectedAgent.responseSla}</span>
                            <span aria-hidden="true">·</span>
                            <span style={{ color: '#10b981', fontWeight: 700 }}>
                                Avg Client Savings: ${selectedAgent.avgClientSavings}
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.81rem', lineHeight: 1.5, color: '#cbd5e1' }}>
                            {selectedAgent.bio}
                        </p>

                        {/* 3-Step Escrow Milestone Protocol */}
                        {selectedAgent.escrowMilestones && (
                            <div className="ta-escrow-steps">
                                <strong style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                                    3-Phase Smart-Escrow Verification Protocol
                                </strong>
                                {selectedAgent.escrowMilestones.map((m, idx) => (
                                    <div key={idx} className="ta-escrow-step">
                                        <span className="ta-escrow-num">{m.step}</span>
                                        <span>{m.desc}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="ta-form-grid">
                            <label className="ta-field-label">
                                <span>Select Engagement Tier</span>
                                <select
                                    className="ta-select"
                                    value={missionTier}
                                    onChange={(e) => setMissionTier(e.target.value)}
                                >
                                    <option value="single">
                                        Single Flat-Fee Audit / Fixer Mission (${selectedAgent.flatFee})
                                    </option>
                                    <option value="retainer">
                                        Full-Month 24/7 Concierge & Legal Retainer (${selectedAgent.retainerFee})
                                    </option>
                                </select>
                            </label>

                            <label className="ta-field-label">
                                <span>Target Arrival / Inspection Date</span>
                                <input
                                    type="date"
                                    className="ta-input"
                                    value={missionDate}
                                    onChange={(e) => setMissionDate(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <label className="ta-field-label">
                            <span>Specific Apartment URL, Visa Type, or Flight Route to Audit</span>
                            <input
                                type="text"
                                className="ta-input"
                                placeholder="Paste listing link, neighborhood preference, or visa question..."
                                value={missionBrief}
                                onChange={(e) => setMissionBrief(e.target.value)}
                            />
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            {activeContracts[selectedAgent.id] ? (
                                <button
                                    type="button"
                                    className="ta-btn"
                                    onClick={() => handleReleaseOrCancelContract(selectedAgent.id, selectedAgent.name)}
                                >
                                    Cancel Escrow ({activeContracts[selectedAgent.id].contractId})
                                </button>
                            ) : (
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                    100% money-back escrow if proof is not delivered within 24 hours
                                </span>
                            )}

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    className="ta-btn"
                                    onClick={(e) => handleSyncWithItinerary(selectedAgent, e)}
                                >
                                    + Sync to Itinerary
                                </button>
                                <button type="submit" className="ta-btn ta-btn-primary">
                                    <Lock size={14} />
                                    {activeContracts[selectedAgent.id]
                                        ? `Update Escrow ($${missionTier === 'retainer' ? selectedAgent.retainerFee : selectedAgent.flatFee})`
                                        : `Lock Escrow & Deploy ($${missionTier === 'retainer' ? selectedAgent.retainerFee : selectedAgent.flatFee})`}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GuardianConnect;
