import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Sparkles,
    Users,
    Wifi,
    MapPin,
    Clock,
    Bookmark,
    Ticket,
    GitBranch,
    Plane,
    Tag,
    Plus,
    Search,
    CheckCircle2,
    Download,
    X,
    Globe,
    ArrowRight,
    Tent,
    Music,
    Compass
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/EventFestival.css';

const EVENT_CATEGORIES = [
    { id: 'all', label: 'All Festivals & Pop-Ups' },
    { id: 'popup-villages', label: 'Pop-Up Nomad Villages' },
    { id: 'cultural-festivals', label: 'Heritage & Cultural Festivals' },
    { id: 'music-arts', label: 'Music, Sound & Light' },
    { id: 'summits', label: 'Creator & Tech Summits' },
    { id: 'saved', label: 'Saved Lineup' },
    { id: 'passes', label: 'My Festival Passes' }
];

const INITIAL_EVENTS_AND_VILLAGES = [
    {
        id: 'evt-zuzalu-alpine-popup',
        category: 'popup-villages',
        typeLabel: '30-DAY POP-UP VILLAGE',
        venueKicker: 'Alpine Longevity & AI Residency · Zermatt / St. Moritz',
        title: 'Helvetia Pop-Up Nomad Village — 4-Week Co-Living Town, AI Hackathons & Glacier Trails',
        hub: 'Zermatt, Switzerland',
        dates: 'Jun 02 – Jun 30, 2027',
        priceUSD: 1290,
        unit: '/ 30-day village residency pass',
        fiberSpec: '1,200 Mbps Swisscom Fiber + 24/7 Deep-Work Chalet',
        workSchedule: 'Quiet Deep-Work 08:30–16:30 CET · Unconferences & Fondue 17:30+',
        nomadsAttending: 284,
        passCode: 'SN-VIL-ZRM27',
        xpReward: 1450,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
        description:
            'A temporary 300-person co-living village taking over four interconnected Alpine chalets with dedicated 4K monitor work pods, daily cold plunges, and founder roundtables.',
        syllabus: [
            'Weeks 1–2: Open-Source AI & Remote Infrastructure Sprints + Matterhorn Ridge Hikes',
            'Week 3: Global Tax, Sovereign Mobility & Longevity Symposium',
            'Week 4: Demo Day, Alpine Thermal Spa Takeover & Glacier Rail Departure'
        ]
    },
    {
        id: 'evt-kyoto-gion-matsuri',
        category: 'cultural-festivals',
        typeLabel: 'UNESCO HERITAGE FESTIVAL',
        venueKicker: 'Shijo-Karasuma & Higashiyama · Kyoto, Japan',
        title: 'Gion Matsuri Yamaboko Float Procession & Yoiyama Lantern Night VIP Machiya Access',
        hub: 'Kyoto, Japan',
        dates: 'Jul 14 – Jul 24, 2027',
        priceUSD: 245,
        unit: '/ 10-day Machiya rooftop & coworking pass',
        fiberSpec: '1,000 Mbps NURO Fiber Sanctuary 2 Blocks from Procession',
        workSchedule: 'Air-Conditioned Machiya Work Pod 08:00–17:00 JST · Lantern Walks 18:30+',
        nomadsAttending: 192,
        passCode: 'SN-FEST-GION27',
        xpReward: 1100,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
        description:
            'Experience Japan’s most celebrated 1,100-year-old festival from a private heritage machiya balcony with daytime gigabit coworking, yukata fitting, and street-food guild tastings.',
        syllabus: [
            'Jul 14–16 (Yoiyama Nights): Pedestrian street lantern immersion & private tea ceremony',
            'Jul 17 (Saki Matsuri): Reserved 2nd-floor viewing gallery for the 23-float Yamaboko parade',
            'Jul 24 (Ato Matsuri): Silent artisan textiles tour & Kamo River sake social'
        ]
    },
    {
        id: 'evt-sonar-offweek-barcelona',
        category: 'music-arts',
        typeLabel: 'ELECTRONIC ART & SOUND',
        venueKicker: 'Fira Montjuïc & Poblenou Tech District · Barcelona',
        title: 'Sónar +D Creative Tech & Off-Week Coastal Electronic Odyssey (Nomad Pro Delegate)',
        hub: 'Barcelona, Spain',
        dates: 'Jun 17 – Jun 20, 2027',
        priceUSD: 320,
        unit: '/ 4-day Sónar +D Delegate & VIP Night Pass',
        fiberSpec: '850 Mbps Poblenou Loft + Acoustic Podcast Booths',
        workSchedule: 'Sónar+D Morning Labs 10:00–15:00 CEST · Sunset & Night Showcases',
        nomadsAttending: 418,
        passCode: 'SN-SONAR-BCN27',
        xpReward: 980,
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80',
        description:
            'Combines daytime spatial-audio, generative art, and creator economy panels at Sónar+D with fast-track entry to nighttime electronic showcases across Barcelona.',
        syllabus: [
            'Day 1: Sónar+D AI Audio & Visual Art Keynotes + Poblenou Rooftop Mixer',
            'Day 2: Fast-Track Sónar by Day Village + Fira Gran Via Overnight Showcase',
            'Day 3: Sitges Coastal Boat Recovery Session & Tapas Guild Dinner'
        ]
    },
    {
        id: 'evt-medellin-feria-flores',
        category: 'cultural-festivals',
        typeLabel: 'CULTURAL & BOTANICAL CARNIVAL',
        venueKicker: 'El Poblado & Santa Elena Highlands · Medellín',
        title: 'Feria de las Flores — Silleteros Flower Parade, Coffee Finca Residency & Salsa Nights',
        hub: 'Medellín, Colombia',
        dates: 'Aug 01 – Aug 10, 2027',
        priceUSD: 280,
        unit: '/ 10-day festival + coworking villa pass',
        fiberSpec: '600 Mbps Provenza Coworking Sanctuary + Backup Power',
        workSchedule: 'US-Eastern Synced Work Block 08:00–15:30 COT · Parades & Finca Evenings',
        nomadsAttending: 246,
        passCode: 'SN-FLORES-MDE27',
        xpReward: 940,
        image: 'https://images.unsplash.com/photo-1599413987323-b1c92a2e62c5?auto=format&fit=crop&w=900&q=80',
        description:
            'Work on US time zones from a soundproofed Provenza garden loft by day, then visit Santa Elena flower farms and watch the iconic Desfile de Silleteros from reserved tribunes.',
        syllabus: [
            'Aug 02: Private overnight trip to Santa Elena organic flower fincas with local growers',
            'Aug 06: Classic Car & Chiva Parade + Rooftop Geisha Coffee Cupping',
            'Aug 10: Grand Desfile de Silleteros VIP Box & Laureles live salsa finale'
        ]
    },
    {
        id: 'evt-web-summit-lisbon-village',
        category: 'summits',
        typeLabel: 'CREATOR & FOUNDER SUMMIT',
        venueKicker: 'Parque das Nações & Cais do Sodré · Lisbon',
        title: 'Atlantic Nomad & Creator Summit + Pink Street Night Crawl (All-Access Pass)',
        hub: 'Lisbon, Portugal',
        dates: 'Nov 09 – Nov 14, 2026',
        priceUSD: 490,
        unit: '/ 6-day summit + Riverside Work Lounge',
        fiberSpec: '1,000 Mbps Symmetric Tagus River Lounge + Deal Rooms',
        workSchedule: 'Private Call Pods All Day · Keynotes 11:00–16:00 WET · Night Crawls 19:00+',
        nomadsAttending: 530,
        passCode: 'SN-SUMMIT-LIS26',
        xpReward: 1250,
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=80',
        description:
            'Where solo founders, travel filmmakers, and remote engineering leads converge in Lisbon for dealmaking, D8 visa clinics, and curated neighborhood dinner clubs.',
        syllabus: [
            'Days 1–2: Creator Monetization, Brand Deal Syndicates & Sovereign Tax Clinics',
            'Days 3–4: Investor Speed-Matching + LX Factory Private Warehouse Night',
            'Days 5–6: Ericeira Atlantic Surf & Cliffside Seafood Closing Banquet'
        ]
    },
    {
        id: 'evt-oaxaca-dia-muertos-popup',
        category: 'popup-villages',
        typeLabel: 'CULTURAL POP-UP RESIDENCY',
        venueKicker: 'Jalatlaco & Xochimilco Artisans · Oaxaca, Mexico',
        title: 'Día de los Muertos 21-Day Creative Residency — Mezcal Palenques, Woodblock Print & Starlink Courtyard',
        hub: 'Oaxaca City, Mexico',
        dates: 'Oct 20 – Nov 09, 2026',
        priceUSD: 890,
        unit: '/ 21-day courtyard residency & cultural pass',
        fiberSpec: '350 Mbps Dual-Starlink Mesh + Shaded Colonial Work Courtyard',
        workSchedule: 'Deep-Work Courtyard 08:00–16:00 CST · Candlelight Comparsas & Mezcal 18:00+',
        nomadsAttending: 168,
        passCode: 'SN-OAX-MUERTOS26',
        xpReward: 1320,
        image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=900&q=80',
        description:
            'Live and work alongside 160 creators in a colonial Jalatlaco courtyard with redundant Starlink Wi-Fi, traditional marigold altar building, and respectful small-group cemetery vigils.',
        syllabus: [
            'Week 1: Zapotec natural indigo dyeing & ancestral clay workshop in Teotitlán',
            'Oct 31 – Nov 02: Xoxocotlán candlelight vigil, pan de muerto bake & brass comparsas',
            'Week 3: Sierra Norte cloud-forest hike & artisanal mezcal palenque harvest'
        ]
    }
];

const SEASONAL_MIGRATION_CALENDAR = [
    {
        season: 'Q1 (Jan – Mar)',
        corridor: 'Patagonia Pop-Up → Rio Carnival → Chiang Mai Burning-Season Exit',
        highlight: 'Southern Hemisphere Summer & Tropical Festival Window'
    },
    {
        season: 'Q2 (Apr – Jun)',
        corridor: 'Kyoto Cherry Blossom → Barcelona Sónar+D → Zermatt Alpine Pop-Up Village',
        highlight: 'Mediterranean & Alpine Co-Living Residency Peak'
    },
    {
        season: 'Q3 (Jul – Sep)',
        corridor: 'Kyoto Gion Matsuri → Medellín Feria de las Flores → Bali Renewal Summit',
        highlight: 'High-Altitude Andes & East Asian Heritage Festivals'
    },
    {
        season: 'Q4 (Oct – Dec)',
        corridor: 'Oaxaca Día de los Muertos → Lisbon Creator Summit → Cape Town Coastal Pop-Up',
        highlight: 'Autumn Transatlantic Summit & Cultural Immersion Season'
    }
];

const EventFestival = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('attendees');
    const [showHostDrawer, setShowHostDrawer] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Host a Pop-Up Village / Gathering Form State
    const [newTitle, setNewTitle] = useState('');
    const [newHub, setNewHub] = useState('');
    const [newDates, setNewDates] = useState('Sep 10 – Oct 05, 2027');
    const [newCategory, setNewCategory] = useState('popup-villages');
    const [newPrice, setNewPrice] = useState('680');

    // Persisted Events & Pop-Up Villages
    const [events, setEvents] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_events_villages_v2');
            return raw ? JSON.parse(raw) : INITIAL_EVENTS_AND_VILLAGES;
        } catch {
            return INITIAL_EVENTS_AND_VILLAGES;
        }
    });

    // Persisted Saved Lineup
    const [savedEventIds, setSavedEventIds] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_saved_events');
            return raw ? JSON.parse(raw) : ['evt-zuzalu-alpine-popup', 'evt-kyoto-gion-matsuri'];
        } catch {
            return ['evt-zuzalu-alpine-popup', 'evt-kyoto-gion-matsuri'];
        }
    });

    // Persisted Reserved Festival / Village Passes
    const [reservedPasses, setReservedPasses] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_festival_passes');
            return raw
                ? JSON.parse(raw)
                : {
                      'evt-web-summit-lisbon-village': {
                          passCode: 'SN-SUMMIT-LIS26',
                          title: 'Atlantic Nomad & Creator Summit (Lisbon)',
                          hub: 'Lisbon, Portugal',
                          dates: 'Nov 09 – Nov 14, 2026',
                          priceUSD: 490
                      }
                  };
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_events_villages_v2', JSON.stringify(events));
        } catch {
            // ignore storage errors
        }
    }, [events]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_saved_events', JSON.stringify(savedEventIds));
        } catch {
            // ignore storage errors
        }
    }, [savedEventIds]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_festival_passes', JSON.stringify(reservedPasses));
        } catch {
            // ignore storage errors
        }
    }, [reservedPasses]);

    const toggleSaveEvent = (evt) => {
        const exists = savedEventIds.includes(evt.id);
        const next = exists
            ? savedEventIds.filter((id) => id !== evt.id)
            : [...savedEventIds, evt.id];
        setSavedEventIds(next);
        addToast(
            exists
                ? `Removed "${evt.title}" from Saved Lineup`
                : `Saved "${evt.title}" to your Festival & Village Lineup`,
            exists ? 'info' : 'success'
        );
    };

    const handleReservePass = (evt) => {
        const next = {
            ...reservedPasses,
            [evt.id]: {
                passCode: evt.passCode,
                title: evt.title,
                hub: evt.hub,
                dates: evt.dates,
                priceUSD: evt.priceUSD,
                reservedAt: new Date().toISOString().slice(0, 10)
            }
        };
        setReservedPasses(next);
        addToast(
            `Confirmed Festival/Village Pass (${evt.passCode}) for ${evt.hub} (+${evt.xpReward} XP)!`,
            'success'
        );
    };

    const handleSyncEventToTrips = (evt) => {
        try {
            const rawQueue = localStorage.getItem('seenomad_queued_itinerary_items');
            const queue = rawQueue ? JSON.parse(rawQueue) : [];
            const item = {
                id: `fest-stop-${Date.now()}`,
                title: `${evt.title} (${evt.dates})`,
                hub: evt.hub,
                priceUSD: evt.priceUSD,
                passCode: evt.passCode,
                source: 'SeeNomad Events & Pop-Up Villages'
            };
            localStorage.setItem('seenomad_queued_itinerary_items', JSON.stringify([item, ...queue]));
        } catch {
            // ignore storage errors
        }
        addToast(`Synced "${evt.hub}" (${evt.dates}) to My Trips & Itinerary Builder!`, 'success');
    };

    const handleCreatePopUpVillage = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newHub.trim()) return;

        const created = {
            id: `evt-custom-${Date.now()}`,
            category: newCategory,
            typeLabel: newCategory === 'popup-villages' ? 'COMMUNITY POP-UP VILLAGE' : 'NOMAD FESTIVAL GATHERING',
            venueKicker: `Verified Fiber Sanctuary · ${newHub.trim()}`,
            title: newTitle.trim(),
            hub: newHub.trim(),
            dates: newDates,
            priceUSD: Number(newPrice) || 680,
            unit: '/ all-access residency pass',
            fiberSpec: '800+ Mbps Verified Mesh + Deep-Work Sanctuary',
            workSchedule: 'Quiet Work Blocks 09:00–16:30 Local · Evening Cultural Sessions',
            nomadsAttending: 48,
            passCode: `SN-POP-${Math.floor(100 + Math.random() * 899)}`,
            xpReward: 1100,
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
            description:
                'Community-launched pop-up village and festival residency with verified coworking bandwidth, group accommodation allotment, and curated local immersions.',
            syllabus: [
                'Week 1: Arrival Orientation, Speed-Test Audit & Welcome Supper',
                'Week 2: Deep-Work Sprints, Local Artisan Immersion & Sunset Hike',
                'Week 3: Demo Showcase & Next-Corridor Group Departure'
            ]
        };

        setEvents((prev) => [created, ...prev]);
        setNewTitle('');
        setNewHub('');
        setShowHostDrawer(false);
        addToast(`Published Pop-Up Village "${created.title}" in ${created.hub}!`, 'success');
    };

    const handleExportFestivalCalendar = () => {
        const payload = {
            exportedAt: new Date().toISOString(),
            platform: 'SeeNomad FestivalPulse™ — Global Festivals & Pop-Up Villages',
            reservedPasses,
            savedEventIds,
            seasonalMigrationCalendar: SEASONAL_MIGRATION_CALENDAR
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seenomad-festivals-popup-villages.json';
        a.click();
        URL.revokeObjectURL(url);
        addToast('Exported Festival Passes & Pop-Up Village Calendar JSON!', 'success');
    };

    const filteredEvents = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const list = events.filter((evt) => {
            if (activeCategory === 'saved' && !savedEventIds.includes(evt.id)) return false;
            if (activeCategory === 'passes' && !reservedPasses[evt.id]) return false;
            if (
                activeCategory !== 'all' &&
                activeCategory !== 'saved' &&
                activeCategory !== 'passes' &&
                evt.category !== activeCategory
            ) {
                return false;
            }
            if (!q) return true;
            const hay = `${evt.title} ${evt.hub} ${evt.venueKicker} ${evt.fiberSpec} ${evt.description}`.toLowerCase();
            return hay.includes(q);
        });

        return [...list].sort((a, b) => {
            if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
            if (sortBy === 'xp') return b.xpReward - a.xpReward;
            return b.nomadsAttending - a.nomadsAttending;
        });
    }, [events, activeCategory, searchQuery, sortBy, savedEventIds, reservedPasses]);

    const totalNomadsConverging = useMemo(
        () => events.reduce((sum, e) => sum + e.nomadsAttending, 0),
        [events]
    );

    return (
        <div className="efp-shell">
            {/* 1. Editorial Hero Banner & Live Festival / Pop-Up Village Telemetry */}
            <header className="efp-hero-banner">
                <div className="efp-hero-top">
                    <div className="efp-hero-copy">
                        <span className="efp-kicker">
                            <Calendar size={13} />
                            SeeNomad FestivalPulse™ · Global Cultural Festivals, 30-Day Pop-Up Villages & Creator Summits
                        </span>
                        <h1 className="efp-title">
                            Global Festivals, Pop-Up Nomad Villages & Seasonal Gatherings
                        </h1>
                        <p className="efp-subtitle">
                            Time your global migrations around UNESCO cultural festivals, 30-day co-living pop-up villages (Zuzalu-style residencies), electronic art showcases, and founder summits—complete with verified daytime deep-work sanctuaries and group stay allotments.
                        </p>
                    </div>

                    <div className="efp-hero-actions">
                        <button
                            type="button"
                            className="efp-btn efp-btn-primary"
                            onClick={() => setShowHostDrawer((prev) => !prev)}
                        >
                            <Plus size={15} />
                            {showHostDrawer ? 'Close Village Studio' : 'Launch Pop-Up Village'}
                        </button>
                        <button
                            type="button"
                            className="efp-btn"
                            onClick={() => navigate('/explore/travel-deals')}
                        >
                            <Tag size={14} />
                            Festival Stay Deals
                        </button>
                        <button
                            type="button"
                            className="efp-btn"
                            onClick={() => navigate('/user/travel-journey')}
                        >
                            <Compass size={14} />
                            My Trips Vault
                        </button>
                        <button
                            type="button"
                            className="efp-btn"
                            onClick={handleExportFestivalCalendar}
                        >
                            <Download size={14} />
                            Export Calendar
                        </button>
                    </div>
                </div>

                {/* Unboxed Hero Telemetry Row */}
                <div className="efp-kpi-row">
                    <div className="efp-kpi-metrics">
                        <span>
                            Verified Gatherings: <strong>{events.length} Global Festivals & Pop-Up Villages</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            SeeNomad Crew Attending:{' '}
                            <strong style={{ color: '#c084fc' }}>{totalNomadsConverging.toLocaleString()} Verified Nomads</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Daytime Work Guarantee:{' '}
                            <strong style={{ color: '#10b981' }}>100% Soundproofed Gigabit Work Pods</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Your Active Passes: <strong style={{ color: '#38bdf8' }}>{Object.keys(reservedPasses).length} Reserved</strong>
                        </span>
                    </div>
                </div>
            </header>

            {/* 2. Launch a Pop-Up Nomad Village / Festival Gathering Drawer */}
            {showHostDrawer && (
                <form className="efp-drawer" onSubmit={handleCreatePopUpVillage}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={15} color="#c084fc" />
                            Launch a 21–30 Day Pop-Up Nomad Village or Festival Crew House
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Publishes directly to the global nomad calendar with group stay & coworking verification
                        </span>
                    </div>

                    <div className="efp-form-grid">
                        <label className="efp-field-label">
                            <span>Pop-Up Village or Festival Title</span>
                            <input
                                type="text"
                                className="efp-input"
                                placeholder="e.g. Aegean Island 30-Day AI & Sailing Pop-Up Village"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label className="efp-field-label">
                            <span>Host City & Country</span>
                            <input
                                type="text"
                                className="efp-input"
                                placeholder="e.g. Paros, Greece or Florianópolis, Brazil"
                                value={newHub}
                                onChange={(e) => setNewHub(e.target.value)}
                                required
                            />
                        </label>

                        <label className="efp-field-label">
                            <span>Residency / Festival Dates</span>
                            <input
                                type="text"
                                className="efp-input"
                                value={newDates}
                                onChange={(e) => setNewDates(e.target.value)}
                            />
                        </label>

                        <label className="efp-field-label">
                            <span>Gathering Format</span>
                            <select
                                className="efp-select"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            >
                                <option value="popup-villages">Pop-Up Nomad Villages</option>
                                <option value="cultural-festivals">Heritage & Cultural Festivals</option>
                                <option value="music-arts">Music, Sound & Light</option>
                                <option value="summits">Creator & Tech Summits</option>
                            </select>
                        </label>

                        <label className="efp-field-label">
                            <span>Pass Rate (USD)</span>
                            <input
                                type="number"
                                className="efp-input"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="efp-btn efp-btn-primary">
                            <CheckCircle2 size={14} />
                            Publish Gathering
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Category Filter Tabs & Search Toolbar */}
            <section className="efp-toolbar" aria-label="Filter global festivals and pop-up nomad villages">
                <div className="efp-tabs" role="tablist">
                    {EVENT_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === cat.id}
                            className={`efp-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                            {cat.id === 'saved' && ` (${savedEventIds.length})`}
                            {cat.id === 'passes' && ` (${Object.keys(reservedPasses).length})`}
                        </button>
                    ))}
                </div>

                <div className="efp-search-controls">
                    <div className="efp-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search Kyoto, Zermatt, Sónar, Oaxaca, pop-up village..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search festivals and pop-up villages"
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

                    <select
                        className="efp-select"
                        style={{ width: 'auto', minWidth: 165 }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort events"
                    >
                        <option value="attendees">Sort: Most Nomads Attending</option>
                        <option value="price-asc">Sort: Lowest Pass Price</option>
                        <option value="xp">Sort: Highest Odyssey XP</option>
                    </select>
                </div>
            </section>

            {/* 4. Split Workspace: Festivals & Pop-Up Villages Grid + Seasonal Migration Radar */}
            <div className="efp-workspace-layout">
                {/* Left Column: Festivals & Pop-Up Villages Grid */}
                <div>
                    {filteredEvents.length === 0 ? (
                        <div className="efp-side-panel" style={{ textAlign: 'center', padding: '2.4rem 1.5rem' }}>
                            <strong style={{ fontSize: '1rem' }}>No festivals or pop-up villages match this filter</strong>
                            <p style={{ margin: '0.35rem 0 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                Reset your search or switch back to All Festivals & Pop-Ups to view the global calendar.
                            </p>
                            <div>
                                <button
                                    type="button"
                                    className="efp-btn efp-btn-primary"
                                    onClick={() => {
                                        setActiveCategory('all');
                                        setSearchQuery('');
                                    }}
                                >
                                    Show All Gatherings
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="efp-events-grid">
                            {filteredEvents.map((evt) => {
                                const isSaved = savedEventIds.includes(evt.id);
                                const isReserved = Boolean(reservedPasses[evt.id]);

                                return (
                                    <article key={evt.id} className="efp-event-card">
                                        <div className="efp-card-media">
                                            <img src={evt.image} alt={evt.title} loading="lazy" />
                                            <div className="efp-media-overlay">
                                                <div className="efp-media-top">
                                                    <span className="efp-type-tag">{evt.typeLabel}</span>
                                                    <button
                                                        type="button"
                                                        className={`efp-save-btn ${isSaved ? 'saved' : ''}`}
                                                        onClick={() => toggleSaveEvent(evt)}
                                                        aria-label={isSaved ? 'Remove from saved lineup' : 'Save to lineup'}
                                                    >
                                                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                                    </button>
                                                </div>

                                                <div className="efp-media-bottom">
                                                    <span>
                                                        <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                        {evt.hub}
                                                    </span>
                                                    <span>
                                                        <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                        {evt.dates}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="efp-card-body">
                                            <div>
                                                <span className="efp-venue-kicker">{evt.venueKicker}</span>
                                                <h3 className="efp-card-title">{evt.title}</h3>
                                            </div>

                                            {/* Unboxed Telemetry Metadata */}
                                            <div className="efp-meta-strip">
                                                <span>
                                                    <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {evt.fiberSpec}
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span>
                                                    <Users size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {evt.nomadsAttending} Nomads
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span style={{ color: '#10b981', fontWeight: 700 }}>+{evt.xpReward} XP</span>
                                            </div>

                                            <p className="efp-card-desc">{evt.description}</p>

                                            <div className="efp-work-pod-line">
                                                <strong>Remote-Work Cadence:</strong> {evt.workSchedule}
                                            </div>

                                            <div className="efp-card-footer">
                                                <div className="efp-price-block">
                                                    <span className="efp-pass-price">${evt.priceUSD.toLocaleString()}</span>
                                                    <span className="efp-pass-unit">{evt.unit}</span>
                                                </div>

                                                <div className="efp-card-actions">
                                                    <button
                                                        type="button"
                                                        className="efp-btn"
                                                        onClick={() => setSelectedEvent(evt)}
                                                    >
                                                        Syllabus
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="efp-btn"
                                                        onClick={() => handleSyncEventToTrips(evt)}
                                                        title="Sync with My Trips & Itinerary Builder"
                                                    >
                                                        <GitBranch size={13} />
                                                        Add to Trip
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`efp-btn ${isReserved ? 'efp-btn-emerald' : 'efp-btn-primary'}`}
                                                        onClick={() => handleReservePass(evt)}
                                                    >
                                                        <Ticket size={13} />
                                                        {isReserved ? `Pass: ${evt.passCode}` : 'Reserve Pass'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right Column: Seasonal Migration Calendar, Active Passes & Ecosystem Links */}
                <aside className="efp-side-rail" aria-label="Seasonal Migration Radar and Festival Passes">
                    {/* Reserved Festival & Pop-Up Village Passes Vault */}
                    <div className="efp-side-panel">
                        <h3 className="efp-side-title">
                            <span>
                                <Ticket
                                    size={15}
                                    color="#c084fc"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Reserved Village & Festival Passes ({Object.keys(reservedPasses).length})
                            </span>
                        </h3>

                        {Object.entries(reservedPasses).map(([id, item]) => (
                            <div key={id} className="efp-vault-row">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ color: '#10b981' }}>{item.passCode}</strong>
                                    <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 700 }}>
                                        ${item.priceUSD} Pass
                                    </span>
                                </div>
                                <strong style={{ fontSize: '0.75rem' }}>{item.hub}</strong>
                                <span style={{ color: '#94a3b8', fontSize: '0.71rem' }}>{item.dates}</span>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="efp-btn efp-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => navigate('/explore/book-travel')}
                        >
                            <Plane size={14} />
                            Book Festival Flights & Stays
                        </button>
                    </div>

                    {/* 2026–2027 Global Nomad Migration Calendar */}
                    <div className="efp-side-panel">
                        <h3 className="efp-side-title">
                            <span>
                                <Globe
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Seasonal Nomad Migration Corridors
                            </span>
                        </h3>

                        {SEASONAL_MIGRATION_CALENDAR.map((q) => (
                            <div key={q.season} className="efp-vault-row">
                                <strong style={{ color: '#c084fc' }}>{q.season}</strong>
                                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{q.corridor}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{q.highlight}</span>
                            </div>
                        ))}
                    </div>

                    {/* Cross-Module Ecosystem Links */}
                    <div className="efp-side-panel">
                        <h3 className="efp-side-title">
                            <span>
                                <Tent
                                    size={15}
                                    color="#10b981"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Coordinate Your Festival Crew
                            </span>
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <button
                                type="button"
                                className="efp-btn"
                                style={{ width: '100%', justifyContent: 'space-between' }}
                                onClick={() => navigate('/community')}
                            >
                                <span>Join Festival Nomad Crew Circles</span>
                                <ArrowRight size={13} />
                            </button>
                            <button
                                type="button"
                                className="efp-btn"
                                style={{ width: '100%', justifyContent: 'space-between' }}
                                onClick={() => navigate('/learning-voluntourism')}
                            >
                                <span>Browse Local Cultural Workshops</span>
                                <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* 5. Event / Pop-Up Village Syllabus & Work-Pod Inspection Modal */}
            {selectedEvent && (
                <div className="efp-modal-backdrop" onClick={() => setSelectedEvent(null)}>
                    <div className="efp-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="efp-kicker">{selectedEvent.venueKicker}</span>
                                <h2 style={{ margin: '0.25rem 0 0', fontSize: '1.16rem', fontWeight: 800 }}>
                                    {selectedEvent.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="efp-btn"
                                onClick={() => setSelectedEvent(null)}
                                aria-label="Close modal"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        <div className="efp-meta-strip">
                            <span>
                                <strong>Hub:</strong> {selectedEvent.hub}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                                <strong>Dates:</strong> {selectedEvent.dates}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                                <strong>Bandwidth:</strong> {selectedEvent.fiberSpec}
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.55, color: '#cbd5e1' }}>
                            {selectedEvent.description}
                        </p>

                        <div className="efp-work-pod-line">
                            <strong>Remote-Work Schedule:</strong> {selectedEvent.workSchedule}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <strong style={{ fontSize: '0.84rem' }}>Week-by-Week / Day-by-Day Program Syllabus:</strong>
                            {selectedEvent.syllabus.map((step, idx) => (
                                <div key={idx} className="efp-vault-row">
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.55rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                className="efp-btn"
                                onClick={() => {
                                    handleSyncEventToTrips(selectedEvent);
                                    setSelectedEvent(null);
                                }}
                            >
                                <GitBranch size={14} />
                                Add to My Trips & Itinerary
                            </button>
                            <button
                                type="button"
                                className="efp-btn efp-btn-primary"
                                onClick={() => {
                                    handleReservePass(selectedEvent);
                                    setSelectedEvent(null);
                                }}
                            >
                                <Ticket size={14} />
                                Reserve Pass (${selectedEvent.priceUSD} · {selectedEvent.passCode})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventFestival;
