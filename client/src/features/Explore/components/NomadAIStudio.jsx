import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Cpu, Zap, Bug, Wand2, Compass, Globe, ShieldCheck,
    Rocket, Activity, Trophy, Gift, CheckCircle2, ArrowRight,
    Search, Link2, MapPin, Clock, DollarSign, Wifi, Calendar,
    Play, Pause, Plus, Check, ExternalLink, Layers, MessageSquare,
    TrendingUp, RefreshCw, SlidersHorizontal, Landmark, FileText
} from 'lucide-react';
import { useUserProfileStore } from '../../../store/userProfileStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useNavStore } from '../../../store/navStore';
import { useToastStore } from '../../../store/toastStore';
import './NomadAIStudio.css';

// 4 Merged AI Engines Metadata
const AI_ENGINES = [
    {
        id: 'all',
        label: 'Unified AI Command Center',
        shortLabel: 'All 4 AI Engines',
        icon: Layers,
        color: '#38BDF8',
        badge: '4-in-1 Mesh',
        desc: 'Simultaneous view of Triipper AI, Super Agent, AI Digital Twin & Travel Bug AI.'
    },
    {
        id: 'triipper',
        label: 'Triipper AI Planner',
        shortLabel: 'Triipper AI',
        icon: Wand2,
        color: '#A855F7',
        badge: 'Itinerary Copilot',
        desc: 'Moment-to-moment AI day plans, coworking routing & concierge synthesis.'
    },
    {
        id: 'super-agent',
        label: 'Super Agent & Vault',
        shortLabel: 'Super Agent',
        icon: Cpu,
        color: '#10B981',
        badge: '3-Node Mesh',
        desc: 'Autonomous fare sniper, embassy slot monitor, safety intel & perks vault.'
    },
    {
        id: 'digital-twin',
        label: 'AI Digital Twin',
        shortLabel: 'AI Digital Twin',
        icon: Rocket,
        color: '#3B82F6',
        badge: '24/7 Autopilot',
        desc: 'Background booking autopilot, Monte Carlo relocation sim & Nomad DNA sync.'
    },
    {
        id: 'travel-bug',
        label: 'Travel Bug AI',
        shortLabel: 'Travel Bug (AI)',
        icon: Bug,
        color: '#F59E0B',
        badge: 'Link-to-Map',
        desc: 'Extract verified GPS coordinates, cafes & hidden gems from Reels, TikToks & Shorts.'
    }
];

// Curated Moment-to-Moment AI Itineraries for Triipper AI
const TRIIPPER_PRESETS = {
    'Tokyo, Japan': {
        flag: '🇯🇵',
        vibe: 'Deep Work & Culinary Immersion',
        dailyBudget: '$145/day',
        avgWifi: '410 Mbps',
        days: [
            {
                day: 1,
                title: 'Shibuya Fiber Sprint & Izakaya Alleys',
                moments: [
                    { time: '08:30', slot: 'Morning Deep Work', place: 'WeWork渋谷スクランブルスクエア (Shibuya Scramble)', meta: '480 Mbps Fiber • Specialty Pour-Over', cost: '$28' },
                    { time: '13:00', slot: 'Midday Immersion', place: 'Meiji Jingu Forest Walk & Harajuku Backstreets', meta: 'Cultural Reset • 45m Walk', cost: '$15' },
                    { time: '15:30', slot: 'Afternoon Sprint', place: 'Tsutaya Books Daikanyama Lounge', meta: '290 Mbps • Quiet Design Library', cost: '$18' },
                    { time: '19:30', slot: 'Evening Social', place: 'Ebisu Yokocho Artisanal Izakaya Hop', meta: 'Local Gastronomy • Verified Spot', cost: '$55' }
                ]
            },
            {
                day: 2,
                title: 'Shinjuku Tech Hub & TeamLab Digital Art',
                moments: [
                    { time: '09:00', slot: 'Morning Deep Work', place: 'Roam Shinjuku Coliving Workdeck', meta: '520 Mbps • Dual-Monitor Booth', cost: '$25' },
                    { time: '14:00', slot: 'Afternoon Exploration', place: 'TeamLab Planets Toyosu & Waterfront', meta: 'Immersive Digital Art', cost: '$38' },
                    { time: '18:00', slot: 'Sunset Viewpoint', place: 'Shibuya Sky 46F Helipad Lounge', meta: 'Golden Hour Panorama', cost: '$22' },
                    { time: '20:30', slot: 'Late Dinner', place: 'Omoide Yokocho Yakitori Counter', meta: 'Authentic Heritage Alley', cost: '$42' }
                ]
            }
        ]
    },
    'Lisbon, Portugal': {
        flag: '🇵🇹',
        vibe: 'Atlantic Surf, Biophilic Coworking & Founders',
        dailyBudget: '$118/day',
        avgWifi: '360 Mbps',
        days: [
            {
                day: 1,
                title: 'Chiado Biophilic Sprint & Tagus Sunset',
                moments: [
                    { time: '09:00', slot: 'Morning Deep Work', place: 'Second Home Lisboa (Mercado da Ribeira)', meta: '450 Mbps • 1,000+ Plants', cost: '$25' },
                    { time: '13:00', slot: 'Seafood Lunch', place: 'Time Out Market & Cais do Sodré', meta: 'Atlantic Grill • 5m Walk', cost: '$24' },
                    { time: '15:00', slot: 'Afternoon Calls', place: 'Outsite Cais do Sodré Quiet Pod', meta: '350 Mbps • US EST Overlap', cost: '$18' },
                    { time: '19:00', slot: 'Sunset & Tapas', place: 'Miradouro de Santa Catarina & Bairro Alto', meta: 'Live Acoustic & River View', cost: '$40' }
                ]
            },
            {
                day: 2,
                title: 'Carcavelos Dawn Patrol &LX Factory Creative Hub',
                moments: [
                    { time: '07:30', slot: 'Morning Surf', place: 'Carcavelos Beach Atlantic Swell', meta: '25m Coastal Train from Cais', cost: '$22' },
                    { time: '10:30', slot: 'Deep Work Block', place: 'LACS Conde d’Óbidos Waterfront Hub', meta: '380 Mbps • Tagus Harbor Deck', cost: '$24' },
                    { time: '16:30', slot: 'Creative Walk', place: 'LX Factory & Ler Devagar Bookstore', meta: 'Industrial Artisan Quarter', cost: '$15' },
                    { time: '20:00', slot: 'Founder Dinner', place: 'Príncipe Real Modern Tasca', meta: 'Nomad Mastermind Table', cost: '$48' }
                ]
            }
        ]
    },
    'Bali (Canggu & Ubud)': {
        flag: '🇮🇩',
        vibe: 'Tropical Pool Villa, Dual-Fiber & Biohacking',
        dailyBudget: '$85/day',
        avgWifi: '260 Mbps',
        days: [
            {
                day: 1,
                title: 'Pererenan Fiber Villa & Echo Beach Sunset',
                moments: [
                    { time: '08:30', slot: 'Morning Deep Work', place: 'Outpost Canggu / Tribal Coworking Pool', meta: '280 Mbps Dual-ISP • Cold Plunge', cost: '$16' },
                    { time: '12:30', slot: 'Organic Bowl', place: 'Crate Cafe / Shady Shack Canggu', meta: 'High-Protein Nomad Fuel', cost: '$14' },
                    { time: '14:30', slot: 'Afternoon Focus', place: 'BWork Bali Soundproof Focus Zone', meta: '310 Mbps • Ergonomic Mesh Chairs', cost: '$18' },
                    { time: '18:00', slot: 'Sunset & Recovery', place: 'La Brisa Echo Beach & Sauna Session', meta: 'Oceanfront Sundowner', cost: '$35' }
                ]
            },
            {
                day: 2,
                title: 'Ubud Ridge Walk, Sound Healing & Jungle Cafe',
                moments: [
                    { time: '07:30', slot: 'Morning Trail', place: 'Campuhan Ridge Walk & Karsa Spa', meta: 'Lush Rice Terrace Trek', cost: '$20' },
                    { time: '10:30', slot: 'Jungle Work Block', place: 'Outpost Ubud Penestanan Hub', meta: '240 Mbps • Garden Booths', cost: '$15' },
                    { time: '16:00', slot: 'Biohacking Reset', place: 'Pyramids of Chi Sound Healing Dome', meta: 'Ancient Acoustic Recovery', cost: '$28' },
                    { time: '19:30', slot: 'Farm-to-Table', place: 'Locavore NXT / Alchemy Ubud', meta: 'Artisanal Balinese Tasting', cost: '$32' }
                ]
            }
        ]
    },
    'Medellín, Colombia': {
        flag: '🇨🇴',
        vibe: 'Eternal Spring EST Overlap & Specialty Coffee',
        dailyBudget: '$92/day',
        avgWifi: '310 Mbps',
        days: [
            {
                day: 1,
                title: 'Provenza Leafy Cafes & El Poblado Rooftops',
                moments: [
                    { time: '08:30', slot: 'Morning Deep Work', place: 'Semilla Cafe & Coworking El Poblado', meta: '320 Mbps • Single-Origin Geisha Coffee', cost: '$14' },
                    { time: '12:30', slot: 'Bandeja & Grill', place: 'Mondongo’s / Carmen Provenza', meta: 'Botanical Courtyard Lunch', cost: '$22' },
                    { time: '14:30', slot: 'Afternoon US Sync', place: 'Selina / Tinkko Coworking Tower', meta: '350 Mbps • Zero Jetlag EST', cost: '$16' },
                    { time: '19:00', slot: 'Rooftop Vista', place: 'Envy Rooftop & Provenza Pedestrian Strip', meta: 'Aburrá Valley Night Views', cost: '$36' }
                ]
            }
        ]
    }
};

// Viral Link Presets for Travel Bug AI
const VIRAL_REEL_PRESETS = [
    {
        id: 'reel-bali',
        tag: '#BaliHiddenGems',
        url: 'https://www.instagram.com/reel/C8xBaliNomadGems/',
        videoTitle: '3 Secret Fiber Cafes & Rice Terrace Spas in Ubud & Canggu',
        creator: '@nomadlens.io',
        locations: [
            {
                name: 'Karsa Spa & Campuhan Sanctuary',
                address: 'Jl. Markandia, Bangkiang Sidem, Ubud, Bali',
                category: 'Wellness & Thermal Recovery',
                highlights: 'Lush 2km ridge trail leading to open-air flower baths & massage pavilions.',
                coordinates: { lat: -8.4912, lng: 115.2584 },
                wifiMbps: 140,
                viralScore: 96
            },
            {
                name: 'Cretya Ubud 3-Tier Jungle Pool & Work Lounge',
                address: 'Tegallalang, Gianyar Regency, Bali',
                category: 'Viewpoint & Day Club',
                highlights: 'Three-tiered emerald infinity pools overlooking UNESCO rice terraces.',
                coordinates: { lat: -8.4351, lng: 115.2792 },
                wifiMbps: 195,
                viralScore: 99
            },
            {
                name: 'BWork Canggu Rooftop Focus Lab',
                address: 'Jl. Nelayan No. 9C, Canggu, Bali',
                category: '24/7 Fiber Coworking',
                highlights: 'Dual 300Mbps fiber lines, podcast studio, ice bath & rooftop barrel sauna.',
                coordinates: { lat: -8.6542, lng: 115.1348 },
                wifiMbps: 310,
                viralScore: 95
            }
        ]
    },
    {
        id: 'reel-tokyo',
        tag: '#TokyoFiberCafes',
        url: 'https://www.tiktok.com/@tokyonomad/video/7392819401',
        videoTitle: 'Tokyo 1Gbps Work Cafes & Hidden Listening Bars',
        creator: '@tokyo.sprint',
        locations: [
            {
                name: 'Daikanyama T-Site Anjin Library Lounge',
                address: '17-5 Sarugakucho, Shibuya City, Tokyo',
                category: 'Design Library & Cafe',
                highlights: 'Architect-designed forest library with power at every table & vintage magazines.',
                coordinates: { lat: 35.6489, lng: 139.6996 },
                wifiMbps: 390,
                viralScore: 97
            },
            {
                name: 'Bar Martha Ebisu Vinyl Sanctuary',
                address: '1-22-23 Ebisu, Shibuya City, Tokyo',
                category: 'Hi-Fi Vinyl Listening Bar',
                highlights: 'Over 6,000 curated records played on custom Tannoy acoustic speakers.',
                coordinates: { lat: 35.6462, lng: 139.7135 },
                wifiMbps: 120,
                viralScore: 94
            }
        ]
    },
    {
        id: 'reel-lisbon',
        tag: '#LisbonCoWorking',
        url: 'https://www.instagram.com/reel/C9LisbonAtlanticBase/',
        videoTitle: 'Lisbon Biophilic Lofts & Secret Atlantic Cliff Sunsets',
        creator: '@atlantic.nomad',
        locations: [
            {
                name: 'Second Home Lisboa Greenhouse',
                address: 'Mercado da Ribeira, Av. 24 de Julho, Lisbon',
                category: 'Biophilic Coworking Hub',
                highlights: 'Filled with 2,000+ tropical plants above Time Out Market with 450Mbps fiber.',
                coordinates: { lat: 38.7069, lng: -9.1456 },
                wifiMbps: 450,
                viralScore: 98
            },
            {
                name: 'Azenhas do Mar Cliffside Tide Pool',
                address: 'Sintra Coastline, 35m from Lisbon',
                category: 'Natural Ocean Pool & Seafood',
                highlights: 'Whitewashed village carved into Atlantic cliffs with natural ocean swimming pool.',
                coordinates: { lat: 38.8406, lng: -9.4651 },
                wifiMbps: 160,
                viralScore: 96
            }
        ]
    }
];

const NomadAIStudio = ({ defaultEngine = 'all' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToastStore();
    const { rewards, claimReward, logTouchpoint } = useUserProfileStore();
    const { saveToVault, trackViralSpot } = useNomadOSStore();
    const { globalActiveFilters, globalSearchQuery } = useNavStore();

    // Detect engine from URL path or prop
    const initialEngine = useMemo(() => {
        const p = location.pathname.toLowerCase();
        if (p.includes('triipper')) return 'triipper';
        if (p.includes('super-agent')) return 'super-agent';
        if (p.includes('twin')) return 'digital-twin';
        if (p.includes('travel-bug')) return 'travel-bug';
        return defaultEngine;
    }, [location.pathname, defaultEngine]);

    const [activeEngine, setActiveEngine] = useState(initialEngine);

    useEffect(() => {
        setActiveEngine(initialEngine);
    }, [initialEngine]);

    // Sync with Vertical Pill • Page Filters (NomadDock)
    useEffect(() => {
        if (Array.isArray(globalActiveFilters) && globalActiveFilters.length > 0) {
            const match = globalActiveFilters.find((f) =>
                ['all', 'triipper', 'super-agent', 'digital-twin', 'travel-bug'].includes(f)
            );
            if (match) setActiveEngine(match);
        }
    }, [globalActiveFilters]);

    // =========================================================================
    // 1. TRIIPPER AI STATE
    // =========================================================================
    const [triipperDest, setTriipperDest] = useState('Tokyo, Japan');
    const [triipperDays, setTriipperDays] = useState(14);
    const [triipperBudget, setTriipperBudget] = useState('Balanced Nomad ($110–$150/d)');
    const [triipperStyle, setTriipperStyle] = useState('Deep Work & Culinary');
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
    const [conciergePrompt, setConciergePrompt] = useState('');
    const [conciergeHistory, setConciergeHistory] = useState([
        {
            role: 'ai',
            text: 'Triipper Copilot online. Ask me to customize any day block, verify Schengen days, or pair coworking spaces near your stay.'
        }
    ]);

    const activeTriipperPlan = TRIIPPER_PRESETS[triipperDest] || TRIIPPER_PRESETS['Tokyo, Japan'];

    const handleRegenerateTriipper = () => {
        setIsGeneratingPlan(true);
        setTimeout(() => {
            setIsGeneratingPlan(false);
            if (addToast) {
                addToast(`Triipper AI synthesized ${triipperDays}-day ${triipperDest} itinerary`, 'success');
            }
        }, 700);
    };

    const handleSendConcierge = (e) => {
        e.preventDefault();
        if (!conciergePrompt.trim()) return;
        const userMsg = conciergePrompt.trim();
        setConciergePrompt('');
        setConciergeHistory((prev) => [
            ...prev,
            { role: 'user', text: userMsg },
            {
                role: 'ai',
                text: `Updated ${triipperDest} routing for "${userMsg}": prioritized 300+ Mbps verified fiber lounges within a 10-minute walk and synced transit hops with your ${triipperBudget} target.`
            }
        ]);
    };

    // =========================================================================
    // 2. SUPER AGENT & VAULT STATE
    // =========================================================================
    const [agentNodes, setAgentNodes] = useState([
        {
            id: 'node-atlas',
            name: 'Atlas • Geo-Route & Fare Drop Sniper',
            role: 'Flight & High-Speed Rail Arbitrage',
            active: true,
            metric: '-18% Avg Fare Saved',
            statusText: 'Monitoring 14 Star Alliance & Oneworld nomad corridors for error fares.'
        },
        {
            id: 'node-sentinel',
            name: 'Sentinel • Consular & Safety Watch',
            role: 'Embassy Slot & Schengen 90/180d Guard',
            active: true,
            metric: '0 Border Alerts',
            statusText: 'Scanning VFS/BLS chancery appointment cancellations & local travel advisories.'
        },
        {
            id: 'node-remi',
            name: 'Remi • Coliving & Perks Negotiator',
            role: 'Mid-Term Lease & Fiber Verification',
            active: true,
            metric: '320+ Mbps Verified',
            statusText: 'Cross-checking Outsite, Flatio & Second Home monthly discounts.'
        }
    ]);

    const unclaimedCount = (rewards || []).filter((r) => !r.claimed).length;

    const handleToggleNode = (nodeId) => {
        setAgentNodes((prev) =>
            prev.map((n) => (n.id === nodeId ? { ...n, active: !n.active } : n))
        );
    };

    // =========================================================================
    // 3. AI DIGITAL TWIN STATE
    // =========================================================================
    const [isAutopilot, setIsAutopilot] = useState(true);
    const [twinTaskInput, setTwinTaskInput] = useState('');
    const [twinSimScenario, setTwinSimScenario] = useState('lisbon-madeira');
    const [twinLogs, setTwinLogs] = useState([
        { id: 1, action: 'Locked 14% corporate discount on ANA Tokyo NRT flexible return ticket', status: 'success', tag: 'SAVED $128' },
        { id: 2, action: 'Verified 90/180-day Schengen window for Lisbon + Madeira circuit (45d used, 45d remaining)', status: 'success', tag: 'COMPLIANT' },
        { id: 3, action: 'Matching chronotype (Peak Focus 08:30–13:30) with quiet biophilic coworking pods', status: 'ongoing', tag: 'SYNCING' }
    ]);

    const handleAddTwinTask = (e) => {
        e.preventDefault();
        if (!twinTaskInput.trim()) return;
        const newTask = {
            id: Date.now(),
            action: twinTaskInput.trim(),
            status: 'success',
            tag: 'AUTOPILOT QUEUED'
        };
        setTwinLogs((prev) => [newTask, ...prev]);
        setTwinTaskInput('');
        if (addToast) {
            addToast('Autonomous task dispatched to your AI Digital Twin', 'success');
        }
    };

    const twinSimMetrics = useMemo(() => {
        if (twinSimScenario === 'bali-bangkok') {
            return { monthlyBurn: '$1,850', annualTaxSaved: '$14,200', qolScore: '96 / 100', fiberReliability: '98.4%' };
        }
        if (twinSimScenario === 'medellin-cdmx') {
            return { monthlyBurn: '$2,100', annualTaxSaved: '$11,800', qolScore: '94 / 100', fiberReliability: '97.9%' };
        }
        return { monthlyBurn: '$2,450', annualTaxSaved: '$16,500', qolScore: '98 / 100', fiberReliability: '99.6%' };
    }, [twinSimScenario]);

    // =========================================================================
    // 4. TRAVEL BUG AI (LINK-TO-MAP EXTRACTOR) STATE
    // =========================================================================
    const [reelLink, setReelLink] = useState(VIRAL_REEL_PRESETS[0].url);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedData, setExtractedData] = useState(VIRAL_REEL_PRESETS[0]);

    const handleExtractSpots = (presetOverride = null) => {
        const targetPreset =
            presetOverride ||
            VIRAL_REEL_PRESETS.find((p) => reelLink.toLowerCase().includes(p.id.replace('reel-', ''))) ||
            VIRAL_REEL_PRESETS[0];

        if (presetOverride) {
            setReelLink(presetOverride.url);
        }

        setIsExtracting(true);
        setTimeout(() => {
            setExtractedData(targetPreset);
            setIsExtracting(false);
            if (trackViralSpot && targetPreset.locations?.[0]) {
                trackViralSpot(targetPreset.locations[0].name);
            }
            if (logTouchpoint) {
                logTouchpoint('Extraction', 'Travel Bug AI');
            }
            if (addToast) {
                addToast(`Travel Bug AI extracted ${targetPreset.locations.length} verified spots!`, 'success');
            }
        }, 650);
    };

    const handleSaveSpotToVault = (loc) => {
        if (saveToVault) {
            saveToVault({ id: Date.now(), videoTitle: extractedData.videoTitle, locations: [loc] });
        }
        if (addToast) {
            addToast(`Saved "${loc.name}" (${loc.coordinates.lat}, ${loc.coordinates.lng}) to Nomad Vault`, 'success');
        }
    };

    const showTriipper = activeEngine === 'all' || activeEngine === 'triipper';
    const showSuperAgent = activeEngine === 'all' || activeEngine === 'super-agent';
    const showDigitalTwin = activeEngine === 'all' || activeEngine === 'digital-twin';
    const showTravelBug = activeEngine === 'all' || activeEngine === 'travel-bug';

    return (
        <div className="nomad-ai-studio-page">
            {/* 1. Unified Command Header & 4-Engine Switcher */}
            <header className="ai-studio-header">
                <div className="ai-studio-hero-row">
                    <div className="ai-studio-brand">
                        <div className="ai-studio-pills">
                            <span className="ai-mesh-pill">
                                <Sparkles size={13} /> SEENOMAD UNIFIED AI COMMAND STUDIO
                            </span>
                            <span className="ai-live-pill">
                                <span className="pulse-dot" /> 4 Autonomous Engines Synced
                            </span>
                        </div>
                        <h1>Nomad AI Intelligence Suite</h1>
                        <p>
                            One unified workspace combining <strong>Triipper AI</strong> (moment-to-moment itineraries),{' '}
                            <strong>Super Agent</strong> (autonomous route & consular watch),{' '}
                            <strong>AI Digital Twin</strong> (24/7 autopilot & relocation simulator), and{' '}
                            <strong>Travel Bug AI</strong> (viral video link-to-map extraction).
                        </p>
                    </div>

                    <div className="ai-studio-quick-bridges">
                        <button
                            type="button"
                            className="ai-bridge-btn primary"
                            onClick={() => navigate('/explore/trip-builder')}
                        >
                            <Compass size={15} />
                            <span>Open Trip Builder</span>
                            <ArrowRight size={14} />
                        </button>
                        <button
                            type="button"
                            className="ai-bridge-btn"
                            onClick={() => navigate('/explore/visa')}
                        >
                            <ShieldCheck size={15} />
                            <span>Visa Hub</span>
                        </button>
                        <button
                            type="button"
                            className="ai-bridge-btn"
                            onClick={() => navigate('/explore/embassy')}
                        >
                            <Landmark size={15} />
                            <span>Embassy Directory</span>
                        </button>
                    </div>
                </div>

                {/* Engine Selector Tabs */}
                <div className="ai-engine-switcher" role="tablist" aria-label="AI Studio Engines">
                    {AI_ENGINES.map((eng) => {
                        const Icon = eng.icon;
                        const isActive = activeEngine === eng.id;
                        return (
                            <button
                                key={eng.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`ai-engine-tab ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveEngine(eng.id)}
                                style={
                                    isActive
                                        ? {
                                              borderColor: eng.color,
                                              boxShadow: `0 8px 25px ${eng.color}25`
                                          }
                                        : undefined
                                }
                            >
                                <div
                                    className="eng-icon-box"
                                    style={{ background: `${eng.color}20`, color: eng.color }}
                                >
                                    <Icon size={18} />
                                </div>
                                <div className="eng-tab-text">
                                    <div className="eng-tab-top">
                                        <strong>{eng.label}</strong>
                                        <span
                                            className="eng-badge"
                                            style={{ background: `${eng.color}18`, color: eng.color }}
                                        >
                                            {eng.badge}
                                        </span>
                                    </div>
                                    <span className="eng-desc">{eng.desc}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* 2. Dynamic AI Engines Grid */}
            <div className={`ai-engines-workspace ${activeEngine === 'all' ? 'grid-mode' : 'single-mode'}`}>
                {/* =========================================================
                    ENGINE 1: TRIIPPER AI PLANNER & COPILOT CONCIERGE
                   ========================================================= */}
                {showTriipper && (
                    <section className="ai-module-card triipper-module" aria-label="Triipper AI Planner">
                        <div className="ai-mod-header">
                            <div className="ai-mod-title-group">
                                <div className="ai-mod-icon purple">
                                    <Wand2 size={20} />
                                </div>
                                <div>
                                    <div className="ai-mod-title-row">
                                        <h2>Triipper AI • Moment-to-Moment Planner</h2>
                                        <span className="ai-mod-tag purple">Itinerary & Copilot</span>
                                    </div>
                                    <p>Curates high-speed coworking blocks, cultural resets, and sunset dining</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="ai-mod-action-btn"
                                onClick={() => navigate('/explore/trip-builder')}
                            >
                                <span>Export to Trip Builder</span>
                                <ArrowRight size={13} />
                            </button>
                        </div>

                        {/* Parameter Controls */}
                        <div className="triipper-controls-grid">
                            <div className="ai-field">
                                <label>DESTINATION CORRIDOR</label>
                                <select
                                    value={triipperDest}
                                    onChange={(e) => setTriipperDest(e.target.value)}
                                >
                                    {Object.keys(TRIIPPER_PRESETS).map((city) => (
                                        <option key={city} value={city}>
                                            {TRIIPPER_PRESETS[city].flag} {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="ai-field">
                                <label>DURATION</label>
                                <select
                                    value={triipperDays}
                                    onChange={(e) => setTriipperDays(Number(e.target.value))}
                                >
                                    <option value={7}>7 Days Sprint</option>
                                    <option value={14}>14 Days Workcation</option>
                                    <option value={30}>30 Days Nomad Base</option>
                                    <option value={45}>45 Days Expedition</option>
                                </select>
                            </div>
                            <div className="ai-field">
                                <label>BUDGET TIER</label>
                                <select
                                    value={triipperBudget}
                                    onChange={(e) => setTriipperBudget(e.target.value)}
                                >
                                    <option value="Lean Indie ($65–$95/d)">Lean Indie ($65–$95/d)</option>
                                    <option value="Balanced Nomad ($110–$150/d)">Balanced Nomad ($110–$150/d)</option>
                                    <option value="Executive Luxury ($220+/d)">Executive Luxury ($220+/d)</option>
                                </select>
                            </div>
                            <div className="ai-field">
                                <label>WORK & LIFESTYLE VIBE</label>
                                <div className="ai-field-inline">
                                    <select
                                        value={triipperStyle}
                                        onChange={(e) => setTriipperStyle(e.target.value)}
                                    >
                                        <option value="Deep Work & Culinary">Deep Work & Culinary</option>
                                        <option value="Surf, Wellness & Fiber">Surf, Wellness & Fiber</option>
                                        <option value="Founder Networking">Founder Networking</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="ai-synth-btn"
                                        onClick={handleRegenerateTriipper}
                                        disabled={isGeneratingPlan}
                                    >
                                        <RefreshCw size={13} className={isGeneratingPlan ? 'spin' : ''} />
                                        <span>{isGeneratingPlan ? 'Synthesizing...' : 'Synthesize'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Curated Day-by-Day Moment Timeline */}
                        <div className="triipper-days-list">
                            {activeTriipperPlan.days.map((d) => (
                                <div key={d.day} className="triipper-day-card">
                                    <div className="t-day-head">
                                        <span className="t-day-badge">DAY {d.day}</span>
                                        <h4>{d.title}</h4>
                                        <span className="t-day-meta">
                                            <Wifi size={12} /> {activeTriipperPlan.avgWifi} • {activeTriipperPlan.dailyBudget}
                                        </span>
                                    </div>
                                    <div className="t-moments-grid">
                                        {d.moments.map((m, idx) => (
                                            <div key={idx} className="t-moment-item">
                                                <div className="t-moment-top">
                                                    <span className="t-time">{m.time}</span>
                                                    <span className="t-slot">{m.slot}</span>
                                                    <span className="t-cost">{m.cost}</span>
                                                </div>
                                                <strong className="t-place">{m.place}</strong>
                                                <span className="t-meta">{m.meta}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Interactive AI Copilot Concierge Bar */}
                        <div className="triipper-copilot-box">
                            <div className="copilot-messages">
                                {conciergeHistory.slice(-2).map((msg, i) => (
                                    <div key={i} className={`copilot-msg ${msg.role}`}>
                                        <Sparkles size={13} />
                                        <span>{msg.text}</span>
                                    </div>
                                ))}
                            </div>
                            <form className="copilot-input-row" onSubmit={handleSendConcierge}>
                                <input
                                    type="text"
                                    value={conciergePrompt}
                                    onChange={(e) => setConciergePrompt(e.target.value)}
                                    placeholder={`Ask Triipper Copilot to customize ${triipperDest} (e.g., "Swap afternoon for 24/7 quiet pod")...`}
                                />
                                <button type="submit">
                                    <MessageSquare size={14} /> Ask Copilot
                                </button>
                            </form>
                        </div>
                    </section>
                )}

                {/* =========================================================
                    ENGINE 2: SUPER AGENT CONSOLE & PERKS VAULT
                   ========================================================= */}
                {showSuperAgent && (
                    <section className="ai-module-card super-agent-module" aria-label="Super Agent Console and Vault">
                        <div className="ai-mod-header">
                            <div className="ai-mod-title-group">
                                <div className="ai-mod-icon emerald">
                                    <Cpu size={20} />
                                </div>
                                <div>
                                    <div className="ai-mod-title-row">
                                        <h2>Super Agent • Multi-Node Mesh & Vault</h2>
                                        <span className="ai-mod-tag emerald">
                                            {agentNodes.filter((n) => n.active).length}/3 Nodes Active
                                        </span>
                                    </div>
                                    <p>Proactive fare arbitrage, embassy appointment watch, and claimable nomad perks</p>
                                </div>
                            </div>
                            {unclaimedCount > 0 && (
                                <span className="ai-vault-alert-pill">
                                    <Gift size={13} /> {unclaimedCount} Unclaimed Perks
                                </span>
                            )}
                        </div>

                        {/* 3 Specialized Autonomous Nodes */}
                        <div className="sa-nodes-list">
                            {agentNodes.map((node) => (
                                <div
                                    key={node.id}
                                    className={`sa-node-card ${node.active ? 'is-active' : 'is-paused'}`}
                                >
                                    <div className="sa-node-top">
                                        <div>
                                            <h4>{node.name}</h4>
                                            <span className="sa-node-role">{node.role}</span>
                                        </div>
                                        <div className="sa-node-right">
                                            <span className="sa-node-metric">{node.metric}</span>
                                            <button
                                                type="button"
                                                className={`sa-toggle-btn ${node.active ? 'on' : 'off'}`}
                                                onClick={() => handleToggleNode(node.id)}
                                            >
                                                {node.active ? <Pause size={12} /> : <Play size={12} />}
                                                <span>{node.active ? 'Active' : 'Paused'}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="sa-node-desc">{node.statusText}</p>
                                </div>
                            ))}
                        </div>

                        {/* Super Agent Collected Perks & Rewards Vault */}
                        <div className="sa-vault-section">
                            <div className="sa-vault-head">
                                <h3>
                                    <Trophy size={15} className="text-amber" /> Super Agent Rewards & Perks Vault
                                </h3>
                                <span>Earned via autonomous optimizations</span>
                            </div>
                            <div className="sa-rewards-grid">
                                {(rewards || []).map((reward) => (
                                    <div
                                        key={reward.id}
                                        className={`sa-reward-card ${reward.claimed ? 'claimed' : ''}`}
                                    >
                                        <div className="sa-reward-info">
                                            <strong>{reward.title}</strong>
                                            <span>
                                                {reward.type === 'credits'
                                                    ? `+${reward.value} Nomad Credits (NC)`
                                                    : reward.desc}
                                            </span>
                                        </div>
                                        {reward.claimed ? (
                                            <span className="sa-claimed-pill">
                                                <Check size={12} /> Claimed
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="sa-claim-btn"
                                                onClick={() => {
                                                    claimReward(reward.id);
                                                    if (addToast) {
                                                        addToast(`Claimed "${reward.title}" from Super Agent Vault!`, 'success');
                                                    }
                                                }}
                                            >
                                                Claim Perk
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* =========================================================
                    ENGINE 3: AI DIGITAL TWIN & RELOCATION SIMULATOR
                   ========================================================= */}
                {showDigitalTwin && (
                    <section className="ai-module-card digital-twin-module" aria-label="AI Digital Twin Autopilot">
                        <div className="ai-mod-header">
                            <div className="ai-mod-title-group">
                                <div className="ai-mod-icon blue">
                                    <Rocket size={20} />
                                </div>
                                <div>
                                    <div className="ai-mod-title-row">
                                        <h2>AI Digital Twin • 24/7 Autopilot & Simulator</h2>
                                        <span className={`ai-mod-tag ${isAutopilot ? 'blue' : 'muted'}`}>
                                            {isAutopilot ? 'AUTOPILOT ENGAGED' : 'STANDBY'}
                                        </span>
                                    </div>
                                    <p>Simulates 12-month tax/cost outcomes and executes background travel tasks</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`dt-autopilot-btn ${isAutopilot ? 'active' : ''}`}
                                onClick={() => setIsAutopilot(!isAutopilot)}
                            >
                                <Zap size={14} />
                                <span>{isAutopilot ? 'Autopilot Engaged' : 'Engage Autopilot'}</span>
                            </button>
                        </div>

                        {/* Monte Carlo Relocation & Tax Simulation Matrix */}
                        <div className="dt-sim-box">
                            <div className="dt-sim-top">
                                <span className="dt-sim-lbl">10,000x MONTE CARLO RELOCATION SIMULATION:</span>
                                <div className="dt-sim-pills">
                                    {[
                                        { id: 'lisbon-madeira', label: '🇵🇹 Lisbon + Madeira' },
                                        { id: 'bali-bangkok', label: '🇮🇩 Bali + Bangkok' },
                                        { id: 'medellin-cdmx', label: '🇨🇴 Medellín + CDMX' }
                                    ].map((sc) => (
                                        <button
                                            key={sc.id}
                                            type="button"
                                            className={`dt-sim-pill ${twinSimScenario === sc.id ? 'active' : ''}`}
                                            onClick={() => setTwinSimScenario(sc.id)}
                                        >
                                            {sc.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="dt-sim-metrics-grid">
                                <div className="dt-sim-metric">
                                    <span>PROJECTED BURN</span>
                                    <strong>{twinSimMetrics.monthlyBurn}/mo</strong>
                                </div>
                                <div className="dt-sim-metric">
                                    <span>EST. TAX SAVED (DNV)</span>
                                    <strong className="text-emerald">{twinSimMetrics.annualTaxSaved}/yr</strong>
                                </div>
                                <div className="dt-sim-metric">
                                    <span>NOMAD DNA FIT</span>
                                    <strong className="text-sky">{twinSimMetrics.qolScore}</strong>
                                </div>
                                <div className="dt-sim-metric">
                                    <span>FIBER UPTIME</span>
                                    <strong>{twinSimMetrics.fiberReliability}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Autonomous Twin Activity Log & Task Dispatcher */}
                        <div className="dt-logs-section">
                            <h4>Autonomous Twin Execution Log</h4>
                            <div className="dt-logs-list">
                                {twinLogs.map((log) => (
                                    <div key={log.id} className="dt-log-row">
                                        <CheckCircle2 size={14} className="dt-log-icon" />
                                        <span className="dt-log-text">{log.action}</span>
                                        <span className="dt-log-tag">{log.tag}</span>
                                    </div>
                                ))}
                            </div>
                            <form className="dt-task-form" onSubmit={handleAddTwinTask}>
                                <input
                                    type="text"
                                    value={twinTaskInput}
                                    onChange={(e) => setTwinTaskInput(e.target.value)}
                                    placeholder="Assign background task to Digital Twin (e.g., Monitor Tokyo -> Lisbon business class miles)..."
                                />
                                <button type="submit">
                                    <Plus size={14} /> Dispatch Task
                                </button>
                            </form>
                        </div>
                    </section>
                )}

                {/* =========================================================
                    ENGINE 4: TRAVEL BUG AI (LINK-TO-MAP EXTRACTOR)
                   ========================================================= */}
                {showTravelBug && (
                    <section className="ai-module-card travel-bug-module" aria-label="Travel Bug AI Link-to-Map Extractor">
                        <div className="ai-mod-header">
                            <div className="ai-mod-title-group">
                                <div className="ai-mod-icon amber">
                                    <Bug size={20} />
                                </div>
                                <div>
                                    <div className="ai-mod-title-row">
                                        <h2>Travel Bug AI • Viral Link-to-Map Extractor</h2>
                                        <span className="ai-mod-tag amber">Vision & Audio AI</span>
                                    </div>
                                    <p>Paste any TikTok, Instagram Reel, or YouTube Short to extract verified GPS spots & Wi-Fi speeds</p>
                                </div>
                            </div>
                        </div>

                        {/* Link Input & Viral Presets */}
                        <div className="tb-extractor-box">
                            <div className="tb-link-input-row">
                                <Link2 size={16} className="tb-link-icon" />
                                <input
                                    type="text"
                                    value={reelLink}
                                    onChange={(e) => setReelLink(e.target.value)}
                                    placeholder="Paste TikTok, Instagram Reel, or Short link here..."
                                />
                                <button
                                    type="button"
                                    className="tb-extract-btn"
                                    onClick={() => handleExtractSpots()}
                                    disabled={isExtracting}
                                >
                                    <Zap size={14} />
                                    <span>{isExtracting ? 'Scanning Frames...' : 'Extract Spots'}</span>
                                </button>
                            </div>

                            <div className="tb-viral-presets">
                                <span className="tb-viral-lbl">
                                    <TrendingUp size={12} /> Instant Viral Presets:
                                </span>
                                {VIRAL_REEL_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        className={`tb-viral-chip ${extractedData?.id === preset.id ? 'active' : ''}`}
                                        onClick={() => handleExtractSpots(preset)}
                                    >
                                        {preset.tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Extracted Locations Stack */}
                        {extractedData && (
                            <div className="tb-extracted-results">
                                <div className="tb-res-header">
                                    <div>
                                        <strong>{extractedData.videoTitle}</strong>
                                        <span>Source: {extractedData.creator}</span>
                                    </div>
                                    <span className="tb-res-count">
                                        {extractedData.locations.length} Verified GPS Pins
                                    </span>
                                </div>

                                <div className="tb-spots-list">
                                    {extractedData.locations.map((loc) => (
                                        <div key={loc.name} className="tb-spot-card">
                                            <div className="tb-spot-main">
                                                <div className="tb-spot-top">
                                                    <span className="tb-spot-cat">{loc.category}</span>
                                                    <span className="tb-spot-viral">
                                                        🔥 {loc.viralScore}% Match
                                                    </span>
                                                    {loc.wifiMbps > 0 && (
                                                        <span className="tb-spot-wifi">
                                                            <Wifi size={11} /> {loc.wifiMbps} Mbps
                                                        </span>
                                                    )}
                                                </div>
                                                <h4>{loc.name}</h4>
                                                <p className="tb-spot-desc">{loc.highlights}</p>
                                                <span className="tb-spot-addr">
                                                    <MapPin size={11} /> {loc.address} ({loc.coordinates.lat}, {loc.coordinates.lng})
                                                </span>
                                            </div>
                                            <div className="tb-spot-actions">
                                                <button
                                                    type="button"
                                                    className="tb-save-vault-btn"
                                                    onClick={() => handleSaveSpotToVault(loc)}
                                                >
                                                    <CheckCircle2 size={13} />
                                                    <span>Save to Vault</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="tb-open-map-btn"
                                                    onClick={() =>
                                                        window.open(
                                                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                                `${loc.name} ${loc.address}`
                                                            )}`,
                                                            '_blank',
                                                            'noopener,noreferrer'
                                                        )
                                                    }
                                                >
                                                    <ExternalLink size={12} />
                                                    <span>Map</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default NomadAIStudio;
