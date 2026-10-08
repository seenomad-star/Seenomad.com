import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Star,
    Search,
    Wifi,
    Shield,
    DollarSign,
    Compass,
    Sparkles,
    MapPin,
    Bookmark,
    GitBranch,
    Plane,
    Bot,
    CheckCircle2,
    X,
    Plus,
    Globe
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/DestinationGuides.css';

const SPECIALIST_AGENTS = [
    {
        id: 'all',
        name: 'Unified 4-Agent Playbook',
        role: 'Complete City Synthesis',
        icon: Sparkles,
        desc: 'Combines fiber telemetry, DNV visa rules, living costs, and local gems.'
    },
    {
        id: 'connectivity',
        name: 'Connectivity & Desk Agent',
        role: 'Fiber, 5G & Coworking',
        icon: Wifi,
        desc: 'Audits symmetrical fiber speeds, eSIM priority, and 24/7 ergonomic hubs.'
    },
    {
        id: 'visa',
        name: 'Visa & Legal Agent',
        role: 'DNV, Tax & Entry Rules',
        icon: Shield,
        desc: 'Tracks visa-free windows, nomad residency permits, and arrival protocols.'
    },
    {
        id: 'culture',
        name: 'Neighborhood & Local Agent',
        role: 'Cost, Safety & Hidden Spots',
        icon: Compass,
        desc: 'Maps walkable districts, monthly rent tiers, etiquette, and culinary trails.'
    }
];

const INITIAL_GUIDES = [
    {
        id: 'guide-tokyo-kyoto',
        title: 'Tokyo & Kyoto: High-Speed Fiber, Shinkansen & Artisan Workspaces',
        city: 'Tokyo & Kyoto',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        author: 'Atlas 4-Agent Collective × Kenji S.',
        rating: 4.98,
        reads: '18.4k reads',
        monthlyCost: 2350,
        wifiMbps: 680,
        visaDays: '180 Days (Japan DNV)',
        safetyScore: '5.0/5',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Shibuya / Daikanyama', 'Shinjuku West', 'Karasuma Oike (Kyoto)'],
        workspaces: ['Shibuya Sky Co-Lab (680 Mbps)', 'Tsutaya Books T-Site Lounge', 'Kyoto Machiya Hub'],
        agentBriefs: {
            all: 'World-class 680 Mbps fiber reliability, effortless Shinkansen rail between Tokyo and Kyoto, and 2026 Japan Digital Nomad Visa (6 months).',
            connectivity: '680 Mbps symmetrical fiber at Shibuya Co-Lab; Docomo/SoftBank 5G eSIM covers 99.8% of rail corridors including Shinkansen.',
            visa: '90-day visa-free entry for 70+ passports or 6-month Japan Digital Nomad Visa with remote income & health insurance proof.',
            culture: 'Base in Daikanyama for quiet tree-lined cafes or Karasuma Oike in Kyoto for restored Machiya townhouses; IC Suica on phone works everywhere.'
        },
        secretTip: 'Book Seat 12E on the Nozomi Shinkansen for an unobstructed Mt. Fuji panorama with 100W AC power.'
    },
    {
        id: 'guide-lisbon-ericeira',
        title: 'Lisbon & Ericeira: Atlantic Surf, D8 Residency & Biophilic Hubs',
        city: 'Lisbon & Ericeira',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        author: 'Atlas 4-Agent Collective × Sofia M.',
        rating: 4.95,
        reads: '22.1k reads',
        monthlyCost: 2150,
        wifiMbps: 460,
        visaDays: '90–365 Days (Schengen / D8)',
        safetyScore: '4.9/5',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Cais do Sodré', 'Príncipe Real', 'Ericeira Ribeira d’Ilhas'],
        workspaces: ['Second Home Lisboa (460 Mbps)', 'Outsite Cais do Sodré', 'Cru Creative Hub'],
        agentBriefs: {
            all: 'Europe’s premier Atlantic nomad hub pairing 300+ sunny days, biophilic coworking lofts, and world-reserve surf 40 minutes north.',
            connectivity: '460 Mbps fiber across Cais do Sodré and Príncipe Real; MEO/Vodafone 5G delivers 280 Mbps along the coastal cliffs.',
            visa: '90/180-day Schengen rule or Portugal D8 Digital Nomad Visa (renewable 1-year temporary stay or 2-year residency permit).',
            culture: 'Morning deep work in Príncipe Real followed by a 45-minute express bus to Ericeira for sunset surf and fresh grilled sea bass.'
        },
        secretTip: 'Pick up a Viva Viagem Navegante monthly pass (€40) for unlimited metro, historic trams, ferries, and Cascais coastal trains.'
    },
    {
        id: 'guide-bali-pererenan',
        title: 'Pererenan, Canggu & Ubud: Tropical Villas, Dual-ISP Fiber & Wellness',
        city: 'Bali (Canggu & Ubud)',
        country: 'Indonesia',
        flag: '🇮🇩',
        region: 'asia',
        author: 'Atlas 4-Agent Collective × Maya R.',
        rating: 4.92,
        reads: '31.6k reads',
        monthlyCost: 1580,
        wifiMbps: 310,
        visaDays: '60–365 Days (B211A / E33G)',
        safetyScore: '4.7/5',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Pererenan Beach', 'Berawa', 'Ubud Penestanan'],
        workspaces: ['Tribal Bali Pererenan (310 Mbps)', 'Outpost Ubud & Canggu', 'Biliq Seminyak'],
        agentBriefs: {
            all: 'Unbeatable quality-of-life ratio with private pool coliving villas, 24/7 creator coworking spaces, and Indonesia’s E33G Remote Worker KITAS.',
            connectivity: 'Top coliving hubs run dual GlobalXtreme + Biznet fiber lines with automatic Starlink failover and backup generators.',
            visa: '30-day e-VOA extendable to 60 days online, 180-day B211A visit visa, or 1-year E33G Remote Worker Visa.',
            culture: 'Choose Pererenan or Seseh over central Canggu for quieter coastal lanes while staying 5 minutes from top cafes and gyms.'
        },
        secretTip: 'Verify dual-ISP backup before booking monthly villas during rainy season; Tribal and Outpost guarantee 99.9% uptime.'
    },
    {
        id: 'guide-medellin',
        title: 'Medellín: Eternal Spring Climate, EST Timezone & Leafy Cafe Hubs',
        city: 'Medellín',
        country: 'Colombia',
        flag: '🇨🇴',
        region: 'americas',
        author: 'Atlas 4-Agent Collective × Mateo G.',
        rating: 4.89,
        reads: '14.9k reads',
        monthlyCost: 1450,
        wifiMbps: 340,
        visaDays: '180–730 Days (Colombia DNV)',
        safetyScore: '4.5/5',
        image: 'https://images.unsplash.com/photo-1599413987323-f73f0276228e?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Laureles (Segundo Parque)', 'El Poblado (Provenza)', 'Envigado'],
        workspaces: ['Selina Cowork Provenza', 'Semilla Cafe Coworking', 'Tinkko Milla de Oro'],
        agentBriefs: {
            all: 'Year-round 24°C spring weather, zero timezone lag with US East Coast teams, and one of Latin America’s most accessible 2-year nomad visas.',
            connectivity: '300–400 Mbps Movistar/Tigo fiber in modern Poblado and Laureles apartments; abundant garden cafes with fast Wi-Fi.',
            visa: '90 days on arrival (extendable to 180 days/year) or Colombia V-Type Digital Nomad Visa valid for up to 2 years.',
            culture: 'Laureles offers flat, tree-lined circular boulevards with authentic neighborhood bakeries and high walkability.'
        },
        secretTip: 'Use the Civica metro card to ride the Metrocable up to Parque Arví on Sunday mornings for cool mountain pine trails.'
    },
    {
        id: 'guide-taipei',
        title: 'Taipei: Gold Card Residency, 600 Mbps Fiber & Night Market Culture',
        city: 'Taipei',
        country: 'Taiwan',
        flag: '🇹🇼',
        region: 'asia',
        author: 'Atlas 4-Agent Collective × Chloe L.',
        rating: 4.96,
        reads: '12.3k reads',
        monthlyCost: 1790,
        wifiMbps: 610,
        visaDays: '90–1095 Days (Gold Card)',
        safetyScore: '5.0/5',
        image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Da’an District', 'Xinyi', 'Zhongshan'],
        workspaces: ['CIT Taipei Innovation Hub', 'The Hive Taipei', 'Louisa Coffee Flagships'],
        agentBriefs: {
            all: 'Ultra-safe, 24/7 city with 600+ Mbps broadband, mountain hot springs 30 minutes by MRT, and the 3-year Employment Gold Card.',
            connectivity: 'Chunghwa Telecom fiber averages 610 Mbps; free iTaiwan Wi-Fi and 5G blanket every MRT station and mountain trail.',
            visa: '90-day visa-free entry, new 6-month Digital Nomad Visitor Visa, or the 1-to-3 year Taiwan Employment Gold Card.',
            culture: 'Rent a YouBike 2.0 with an EasyCard along the Tamsui Riverside after a night market feast at Raohe or Ningxia.'
        },
        secretTip: 'Keep your receipt lottery numbers (Uniform Invoice)—every coffee or convenience store purchase enters Taiwan’s bi-monthly cash draw.'
    },
    {
        id: 'guide-alpine-swiss',
        title: 'Zurich & Zermatt: Alpine Panorama Rail, Deep Focus & Precision Hubs',
        city: 'Zurich & Zermatt',
        country: 'Switzerland',
        flag: '🇨🇭',
        region: 'europe',
        author: 'Atlas 4-Agent Collective × Lukas W.',
        rating: 4.94,
        reads: '9.8k reads',
        monthlyCost: 3400,
        wifiMbps: 750,
        visaDays: '90 Days (Schengen)',
        safetyScore: '5.0/5',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=700&auto=format&fit=crop&q=80',
        neighborhoods: ['Zurich Kreis 4 & Viadukt', 'Seefeld Lakefront', 'Zermatt Car-Free Village'],
        workspaces: ['Impact Hub Zurich Viadukt', 'Kraftwerk Selnau', 'Cervo Mountain Lounge'],
        agentBriefs: {
            all: 'Unmatched Swiss rail punctuality, 750 Mbps fiber workspaces built under historic stone viaducts, and car-free Matterhorn views.',
            connectivity: 'Swisscom 10Gbps fiber infrastructure and uninterrupted 5G coverage even at 3,000m elevation on the Gornergrat railway.',
            visa: 'Standard 90/180-day Schengen allowance; ideal for high-output executive sprints and European summer retreats.',
            culture: 'Purchase the Swiss Half Fare Card on arrival—it cuts intercity trains, lake steamers, and alpine cable cars by 50%.'
        },
        secretTip: 'Work from the SBB Restaurant Car between Zurich and Chur—order a coffee for a panoramic table with power sockets.'
    }
];

const GuideMarketplace = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [guides, setGuides] = useState(INITIAL_GUIDES);
    const [activeAgentLens, setActiveAgentLens] = useState('all');
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'asia' | 'europe' | 'americas' | 'budget' | 'saved'
    const [searchQuery, setSearchQuery] = useState('');
    const [savedIds, setSavedIds] = useState({ 'guide-tokyo-kyoto': true });
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showSynthDrawer, setShowSynthDrawer] = useState(false);

    // Custom Multi-Agent Synthesis State
    const [synthCity, setSynthCity] = useState('');
    const [synthCountry, setSynthCountry] = useState('');
    const [synthRegion, setSynthRegion] = useState('europe');
    const [synthBudget, setSynthBudget] = useState('1950');

    const handleToggleSave = (guide) => {
        const next = !savedIds[guide.id];
        setSavedIds((prev) => ({ ...prev, [guide.id]: next }));
        addToast(
            next
                ? `Saved "${guide.city}" playbook to your library!`
                : `Removed "${guide.city}" from saved playbooks`,
            'info'
        );
    };

    const handleSynthesizeGuide = (e) => {
        e.preventDefault();
        if (!synthCity.trim()) return;

        const cityClean = synthCity.trim();
        const countryClean = synthCountry.trim() || 'Global Hub';
        const newGuide = {
            id: `guide-${Date.now()}`,
            title: `${cityClean}: 4-Agent Custom Nomad & Connectivity Playbook`,
            city: cityClean,
            country: countryClean,
            flag: '🌐',
            region: synthRegion,
            author: 'Synthesized by SeeNomad 4-Agent Engine',
            rating: 5.0,
            reads: 'Just Synthesized',
            monthlyCost: Number(synthBudget) || 1950,
            wifiMbps: 420,
            visaDays: '90–180 Days Verified',
            safetyScore: '4.9/5',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&auto=format&fit=crop&q=80',
            neighborhoods: [`${cityClean} Creative Quarter`, 'Central Old Town', 'Waterfront Tech Hub'],
            workspaces: [`${cityClean} Fiber Co-Lab (420 Mbps)`, 'Artisan Roastery & Desk Lounge'],
            agentBriefs: {
                all: `Custom 4-agent synthesis for ${cityClean}, ${countryClean} calibrated for $${synthBudget}/mo budget and 400+ Mbps remote work.`,
                connectivity: `Verified 420 Mbps fiber hubs and 5G eSIM coverage across ${cityClean}'s primary coworking districts.`,
                visa: `Standard visa-free entry plus remote worker permit pathways verified by the Visa & Legal Agent.`,
                culture: `Walkable central neighborhoods with specialty coffee, local markets, and evening nomad meetups.`
            },
            secretTip: `Clone this ${cityClean} playbook directly into the Itinerary Builder to auto-populate daily work and transit blocks.`
        };

        setGuides((prev) => [newGuide, ...prev]);
        setSavedIds((prev) => ({ ...prev, [newGuide.id]: true }));
        setSynthCity('');
        setSynthCountry('');
        setShowSynthDrawer(false);
        addToast(`4-Agent Engine synthesized "${cityClean}" Destination Playbook!`, 'success');
    };

    const filteredGuides = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return guides.filter((g) => {
            if (activeFilter === 'saved' && !savedIds[g.id]) return false;
            if (activeFilter === 'budget' && g.monthlyCost > 1850) return false;
            if (['asia', 'europe', 'americas'].includes(activeFilter) && g.region !== activeFilter) {
                return false;
            }
            if (q) {
                const hay = `${g.title} ${g.city} ${g.country} ${g.neighborhoods.join(' ')} ${g.workspaces.join(' ')}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [guides, activeFilter, savedIds, searchQuery]);

    return (
        <div className="dg-hub-shell">
            {/* 1. Top Hero & 4-Agent Specialist Switcher */}
            <header className="dg-hero-banner">
                <div className="dg-hero-top">
                    <div>
                        <span className="dg-kicker">
                            <BookOpen size={13} />
                            SeeNomad AtlasPlaybooks™ · Multi-Agent Verified City Guides
                        </span>
                        <h1 className="dg-title">
                            Destination Guides, Neighborhood Playbooks & Creator Blueprints
                        </h1>
                        <p className="dg-subtitle">
                            Every playbook is continuously audited by 4 specialized SeeNomad AI Agents—covering verified fiber speeds, 2026 visa pathways, neighborhood living costs, and local insider gems.
                        </p>
                    </div>

                    <div className="dg-hero-actions">
                        <button
                            type="button"
                            className="dg-btn dg-btn-primary"
                            onClick={() => setShowSynthDrawer((prev) => !prev)}
                        >
                            <Bot size={15} />
                            {showSynthDrawer ? 'Close Agent Synthesizer' : 'Synthesize Custom City Guide'}
                        </button>
                        <button
                            type="button"
                            className="dg-btn"
                            onClick={() => navigate('/explore/planner')}
                        >
                            <GitBranch size={14} />
                            Itinerary Builder
                        </button>
                    </div>
                </div>

                {/* 4 Specialist Agents Interactive Lens Selector */}
                <div className="dg-agents-grid" role="tablist" aria-label="Select specialist agent lens">
                    {SPECIALIST_AGENTS.map((agent) => {
                        const AgentIcon = agent.icon;
                        const isActive = activeAgentLens === agent.id;
                        return (
                            <button
                                key={agent.id}
                                type="button"
                                className={`dg-agent-card ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveAgentLens(agent.id)}
                            >
                                <div className="dg-agent-icon">
                                    <AgentIcon size={17} />
                                </div>
                                <div className="dg-agent-text">
                                    <h4>{agent.name}</h4>
                                    <p>{agent.desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* 2. Expandable Multi-Agent Custom City Playbook Synthesizer */}
            {showSynthDrawer && (
                <form className="dg-synth-panel" onSubmit={handleSynthesizeGuide}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.95rem' }}>
                            <Sparkles size={15} style={{ display: 'inline', marginRight: 6, color: '#38bdf8' }} />
                            Deploy 4 Specialist Agents to Build a Custom City Playbook
                        </strong>
                        <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>
                            Connectivity + Visa + Cost + Culture Agents
                        </span>
                    </div>

                    <div className="dg-synth-form">
                        <input
                            type="text"
                            className="dg-input"
                            placeholder="Target City (e.g. Seoul, Barcelona, Cape Town)..."
                            value={synthCity}
                            onChange={(e) => setSynthCity(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="dg-input"
                            placeholder="Country (e.g. South Korea)"
                            value={synthCountry}
                            onChange={(e) => setSynthCountry(e.target.value)}
                        />
                        <select
                            className="dg-select"
                            value={synthRegion}
                            onChange={(e) => setSynthRegion(e.target.value)}
                        >
                            <option value="asia">Asia-Pacific</option>
                            <option value="europe">Europe & Schengen</option>
                            <option value="americas">Americas</option>
                        </select>
                        <input
                            type="number"
                            className="dg-input"
                            placeholder="Target Monthly Budget ($)"
                            value={synthBudget}
                            onChange={(e) => setSynthBudget(e.target.value)}
                        />
                        <button type="submit" className="dg-btn dg-btn-primary">
                            <Plus size={14} />
                            Generate Playbook
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Filter Tabs & Search Bar */}
            <section className="dg-toolbar" aria-label="Filter destination guides">
                <div className="dg-filter-tabs" role="tablist">
                    {[
                        { id: 'all', label: 'All Playbooks' },
                        { id: 'asia', label: 'Asia-Pacific' },
                        { id: 'europe', label: 'Europe' },
                        { id: 'americas', label: 'Americas' },
                        { id: 'budget', label: 'Under $1,850/mo' },
                        { id: 'saved', label: `Saved (${Object.values(savedIds).filter(Boolean).length})` }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`dg-filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="dg-search-box">
                    <Search size={14} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search Tokyo, Lisbon, Bali, D8 Visa, Shibuya..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search destination guides"
                    />
                </div>
            </section>

            {/* 4. Destination Guides Grid */}
            <section className="dg-guides-grid" aria-label="Destination playbooks catalog">
                {filteredGuides.map((guide) => {
                    const isSaved = !!savedIds[guide.id];
                    const activeBrief =
                        guide.agentBriefs[activeAgentLens] || guide.agentBriefs.all;

                    return (
                        <article key={guide.id} className="dg-guide-card">
                            <div>
                                <div className="dg-card-media">
                                    <img src={guide.image} alt={guide.city} loading="lazy" />
                                    <div className="dg-card-overlay-top">
                                        <span className="dg-region-tag">
                                            {guide.flag} {guide.city}, {guide.country}
                                        </span>
                                        <button
                                            type="button"
                                            className={`dg-save-icon-btn ${isSaved ? 'saved' : ''}`}
                                            onClick={() => handleToggleSave(guide)}
                                            title={isSaved ? 'Saved in library' : 'Save playbook'}
                                            aria-label="Bookmark playbook"
                                        >
                                            <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                        </button>
                                    </div>
                                </div>

                                <div className="dg-card-body">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.72rem',
                                            color: '#94a3b8'
                                        }}
                                    >
                                        <span>{guide.author}</span>
                                        <span>
                                            <Star
                                                size={12}
                                                fill="#F59E0B"
                                                color="#F59E0B"
                                                style={{ display: 'inline', marginRight: 3 }}
                                            />
                                            <strong>{guide.rating}</strong> ({guide.reads})
                                        </span>
                                    </div>

                                    <h3 className="dg-card-title">{guide.title}</h3>

                                    {/* Unboxed Telemetry Strip */}
                                    <div className="dg-telemetry-strip">
                                        <span>
                                            <strong>${guide.monthlyCost}/mo</strong>
                                        </span>
                                        <span>·</span>
                                        <span>
                                            <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                            <strong>{guide.wifiMbps} Mbps</strong>
                                        </span>
                                        <span>·</span>
                                        <span>{guide.visaDays}</span>
                                        <span>·</span>
                                        <span>Safety {guide.safetyScore}</span>
                                    </div>

                                    {/* Dynamic Specialist Agent Brief */}
                                    <div className="dg-agent-lens-callout">
                                        {activeBrief}
                                    </div>

                                    <div className="dg-neighborhoods-line">
                                        <MapPin size={11} style={{ display: 'inline', marginRight: 4, color: '#38bdf8' }} />
                                        <strong>Top Districts:</strong> {guide.neighborhoods.join(' · ')}
                                    </div>
                                </div>
                            </div>

                            <div className="dg-card-footer">
                                <button
                                    type="button"
                                    className="dg-btn dg-btn-primary"
                                    onClick={() => setSelectedGuide(guide)}
                                >
                                    <BookOpen size={13} />
                                    Read Playbook
                                </button>

                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        type="button"
                                        className="dg-btn"
                                        onClick={() => {
                                            addToast(`Cloned "${guide.city}" blueprint to Itinerary Builder!`, 'success');
                                            navigate('/explore/planner');
                                        }}
                                    >
                                        <GitBranch size={13} />
                                        Clone Trip
                                    </button>
                                    <button
                                        type="button"
                                        className="dg-btn"
                                        onClick={() => navigate('/explore/book-travel')}
                                    >
                                        <Plane size={13} />
                                        Book
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            {/* 5. Interactive Full Playbook Reader Modal */}
            {selectedGuide && (
                <div
                    className="dg-modal-backdrop"
                    onClick={() => setSelectedGuide(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedGuide.city} Playbook`}
                >
                    <div
                        className="dg-modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="dg-kicker">
                                    {selectedGuide.flag} {selectedGuide.country} · Verified 4-Agent City Playbook
                                </span>
                                <h2 style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem' }}>
                                    {selectedGuide.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="dg-btn"
                                onClick={() => setSelectedGuide(null)}
                                aria-label="Close playbook"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        <div className="dg-modal-grid">
                            <div className="dg-modal-section">
                                <h4>📡 Connectivity & Workspaces</h4>
                                <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    {selectedGuide.agentBriefs.connectivity}
                                </p>
                                <div style={{ marginTop: '0.45rem', fontSize: '0.73rem', color: '#94a3b8' }}>
                                    <strong>Verified Hubs:</strong> {selectedGuide.workspaces.join(', ')}
                                </div>
                            </div>

                            <div className="dg-modal-section">
                                <h4>🛂 Visa, Residency & Entry</h4>
                                <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    {selectedGuide.agentBriefs.visa}
                                </p>
                                <div style={{ marginTop: '0.45rem', fontSize: '0.73rem', color: '#94a3b8' }}>
                                    <strong>Stay Window:</strong> {selectedGuide.visaDays}
                                </div>
                            </div>

                            <div className="dg-modal-section">
                                <h4>🏡 Neighborhoods & Monthly Budget</h4>
                                <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    {selectedGuide.agentBriefs.culture}
                                </p>
                                <div style={{ marginTop: '0.45rem', fontSize: '0.73rem', color: '#94a3b8' }}>
                                    <strong>Est. Monthly Spend:</strong> ${selectedGuide.monthlyCost}/mo
                                </div>
                            </div>
                        </div>

                        <div className="dg-modal-section">
                            <h4>✨ Insider Pro Tip</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.45 }}>
                                {selectedGuide.secretTip}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.55rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                className="dg-btn"
                                onClick={() => {
                                    setSelectedGuide(null);
                                    navigate('/explore/visa');
                                }}
                            >
                                Check Visa Eligibility
                            </button>
                            <button
                                type="button"
                                className="dg-btn dg-btn-primary"
                                onClick={() => {
                                    addToast(`Cloned "${selectedGuide.city}" playbook into Itinerary Builder!`, 'success');
                                    setSelectedGuide(null);
                                    navigate('/explore/planner');
                                }}
                            >
                                <GitBranch size={14} />
                                Open in Itinerary Builder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuideMarketplace;
