import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Tag,
    Plane,
    Building2,
    Train,
    Wifi,
    Sparkles,
    Search,
    Bookmark,
    Clock,
    CheckCircle2,
    GitBranch,
    ShieldCheck,
    Copy,
    ArrowRight,
    Download,
    Plus,
    X,
    SlidersHorizontal,
    Luggage,
    Flame,
    Zap,
    Globe
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../../../styles/TravelDealsHub.css';

const DEAL_CATEGORIES = [
    { id: 'all', label: 'All Exclusive Deals' },
    { id: 'stays', label: 'Partner Coliving & Stays' },
    { id: 'flights', label: 'Error-Fare & Nomad Flights' },
    { id: 'rail', label: 'Rail Passes & Transit' },
    { id: 'esim', label: 'eSIM & Lounge Perks' },
    { id: 'saved', label: 'Saved Watchlist' },
    { id: 'claimed', label: 'Locked Vouchers' }
];

const INITIAL_PARTNER_DEALS = [
    {
        id: 'deal-lisbon-outsite',
        category: 'stays',
        partner: 'Outsite × SeeNomad Syndicate',
        title: 'Lisbon Cais do Sodré — 28-Night Coliving Loft + Private Herman Miller Studio',
        hub: 'Lisbon, Portugal',
        region: 'Europe',
        discountLabel: '38% OFF MONTHLY',
        dealPrice: 1490,
        retailPrice: 2400,
        unit: '/ 28 nights (Zero OTA Fee)',
        fiberSpeed: '1,000 Mbps Symmetric Fiber',
        cancellation: 'Free Flex-Date Shift up to 7d prior',
        seatsLeft: '4 Syndicate Rooms Left',
        expiryWindow: 'Ends in 3d 14h',
        promoCode: 'SN-OUTSITE-LIS38',
        xpBonus: 850,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
        includedPerks: '24/7 Coworking Pass · Airport eSIM Pickup · Weekly Rooftop Supper · D8 Lease Certificate',
        description:
            'Negotiated direct allotment with Outsite Cais do Sodré. Includes dual-WAN fiber redundancy, acoustic phone booths, and zero Airbnb/OTA service markups.'
    },
    {
        id: 'deal-ana-tokyo-flight',
        category: 'flights',
        partner: 'ANA All Nippon × Star Alliance Nomad Desk',
        title: 'Open-Jaw Flex Corridor: San Francisco / London → Tokyo Haneda (HND) + 2× 23kg Bags',
        hub: 'Tokyo & Kyoto, Japan',
        region: 'Asia',
        discountLabel: '$440 OFF FARE',
        dealPrice: 685,
        retailPrice: 1125,
        unit: '/ roundtrip flex ticket',
        fiberSpeed: 'In-Flight Wi-Fi Voucher Included',
        cancellation: '2 Free Date Changes (180-Day Validity)',
        seatsLeft: '7 Fare Buckets Left',
        expiryWindow: 'Flash Window: 19h left',
        promoCode: 'SN-ANA-HND685',
        xpBonus: 920,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80',
        includedPerks: '2 Free Date Shifts · 2× 23kg Checked Tech/Surf Bags · Narita/Haneda Lounge Pass',
        description:
            'Exclusive long-stay nomad fare class allowing you to shift your return date twice with zero penalty—engineered for 90-day visa-free or 6-month Japan Nomad Visa stays.'
    },
    {
        id: 'deal-bali-tribal-villa',
        category: 'stays',
        partner: 'Tribal & Canggu Eco-Villas Collective',
        title: 'Canggu Pererenan — Private Pool Villa + Solar UPS Backup & 24/7 Coworking Desk',
        hub: 'Canggu, Bali',
        region: 'Asia',
        discountLabel: '42% OFF LONG-STAY',
        dealPrice: 1180,
        retailPrice: 2050,
        unit: '/ 30 nights all-inclusive',
        fiberSpeed: '450 Mbps Dual-ISP + Starlink Backup',
        cancellation: '100% Escrowed Until On-Ground Check-In',
        seatsLeft: '3 Villas Left for Nov–Feb',
        expiryWindow: 'Ends in 4d 08h',
        promoCode: 'SN-BALI-VILLA42',
        xpBonus: 780,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
        includedPerks: 'Daily Breakfast · Scooter Helmet & Rack · 4K Monitor Loaner · Free Laundry',
        description:
            'Pre-inspected by SeeNomad Local Guardians for zero neighboring construction noise, solar battery backup during grid dips, and dedicated ergonomic desk setup.'
    },
    {
        id: 'deal-kyoto-machiya-stay',
        category: 'stays',
        partner: 'Kamo River Heritage Machiya Guild',
        title: 'Kyoto Higashiyama — Restored Townhouse Studio + NURO 2Gbps Fiber & Bike Rental',
        hub: 'Kyoto, Japan',
        region: 'Asia',
        discountLabel: '35% OFF PARTNER RATE',
        dealPrice: 1340,
        retailPrice: 2060,
        unit: '/ 21 nights private townhouse',
        fiberSpeed: '1,240 Mbps NURO Direct Fiber',
        cancellation: 'Free Reschedule up to 10d prior',
        seatsLeft: '2 Townhouses Left',
        expiryWindow: 'Ends in 2d 21h',
        promoCode: 'SN-KYOTO-MACHIYA35',
        xpBonus: 890,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
        includedPerks: 'Tokaido Shinkansen Seat Upgrade · Artisan Tea Welcome · Unlimited City Bike',
        description:
            'Authentic cedar-wood Kyoto machiya retrofitted with enterprise NURO fiber and shoji acoustic insulation—ideal for deep-focus sprints and evening Gion walks.'
    },
    {
        id: 'deal-eurail-shinkansen',
        category: 'rail',
        partner: 'Eurail × JR Central High-Speed Rail Alliance',
        title: '1st-Class Panorama Rail Pass (15 Travel Days / 2 Months) + Quiet Coaching Seat',
        hub: '33 European Countries / Japan',
        region: 'Global',
        discountLabel: '30% OFF 1ST CLASS',
        dealPrice: 465,
        retailPrice: 665,
        unit: '/ 2-month flex pass',
        fiberSpeed: 'Onboard 5G Rail Repeater + Power At Seat',
        cancellation: 'Exchangeable Before Activation',
        seatsLeft: '14 Partner Passes Left',
        expiryWindow: 'Ends in 6d 11h',
        promoCode: 'SN-RAIL-FIRST30',
        xpBonus: 640,
        image: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=900&q=80',
        includedPerks: 'Zero Seat Reservation Fees on 6 Corridors · Station Lounge Access · Eurostar Discount',
        description:
            'Turn cross-border transit days into productive deep-work blocks with guaranteed quiet-car power outlets, panoramic Alpine/coastal routes, and station lounge entry.'
    },
    {
        id: 'deal-avianca-medellin-flight',
        category: 'flights',
        partner: 'Avianca × LATAM Americas Nomad Corridor',
        title: 'Miami / NYC / Madrid → Medellín (MDE) + Bogotá Stopover & Onward Return Proof',
        hub: 'Medellín, Colombia',
        region: 'Americas',
        discountLabel: '44% OFF ERROR FARE',
        dealPrice: 310,
        retailPrice: 555,
        unit: '/ roundtrip w/ onward certificate',
        fiberSpeed: 'VIP Avianca Lounge Wi-Fi Included',
        cancellation: 'Instant 24h Hold + Flex Return Shift',
        seatsLeft: '5 Seats Left at $310',
        expiryWindow: 'Flash Alert: 11h left',
        promoCode: 'SN-MDE-FLY310',
        xpBonus: 720,
        image: 'https://images.unsplash.com/photo-1599413987323-b1c92a2e62c5?auto=format&fit=crop&w=900&q=80',
        includedPerks: 'Verifiable Onward Ticket Certificate · 1× 23kg Bag · El Dorado Lounge Access',
        description:
            'Includes an automated immigration-ready onward return PNR certificate required at check-in for Colombia tourist and Digital Nomad Visa V arrivals.'
    },
    {
        id: 'deal-holafly-priority-pass',
        category: 'esim',
        partner: 'Airalo / Holafly × Priority Pass Nomad Bundle',
        title: '180-Day Global Unlimited 5G eSIM (142 Countries) + 6 Airport Lounge Visits',
        hub: '142 Countries Worldwide',
        region: 'Global',
        discountLabel: '45% OFF BUNDLE',
        dealPrice: 129,
        retailPrice: 235,
        unit: '/ 6-month global connectivity pack',
        fiberSpeed: '5G Unthrottled Hotspot Tethering',
        cancellation: 'Instant QR Activation Anytime in 12 Months',
        seatsLeft: '22 Bundles Left',
        expiryWindow: 'Ends in 5d 04h',
        promoCode: 'SN-ESIM-LOUNGE45',
        xpBonus: 550,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        includedPerks: 'Unlimited Laptop Hotspot · 6 Priority Pass Lounge Entries · Zero Roaming Surprises',
        description:
            'Land in any capital with instant 5G tethering before you leave the jetbridge, paired with 6 international airport lounge passes for shower, espresso, and gigabit Wi-Fi.'
    }
];

const Offers = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('savings');
    const [showAlertDrawer, setShowAlertDrawer] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState(null);

    // Stay + Flight Arbitrage Calculator State
    const [calcNights, setCalcNights] = useState(28);
    const [calcHub, setCalcHub] = useState('Lisbon (-38% Syndicate)');

    // Custom Deal Alert Form State
    const [alertRoute, setAlertRoute] = useState('');
    const [alertMaxPrice, setAlertMaxPrice] = useState('650');
    const [alertCategory, setAlertCategory] = useState('stays');

    // Persisted Partner Deals
    const [deals, setDeals] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_partner_deals_v2');
            return raw ? JSON.parse(raw) : INITIAL_PARTNER_DEALS;
        } catch {
            return INITIAL_PARTNER_DEALS;
        }
    });

    // Persisted Saved Watchlist
    const [savedDealIds, setSavedDealIds] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_saved_deals');
            return raw ? JSON.parse(raw) : ['deal-lisbon-outsite', 'deal-ana-tokyo-flight'];
        } catch {
            return ['deal-lisbon-outsite', 'deal-ana-tokyo-flight'];
        }
    });

    // Persisted Claimed / Locked Vouchers
    const [claimedDeals, setClaimedDeals] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_claimed_deals');
            return raw
                ? JSON.parse(raw)
                : {
                      'deal-lisbon-outsite': {
                          voucherCode: 'SN-OUTSITE-LIS38',
                          lockedAt: '2026-10-06',
                          savingsUSD: 910
                      }
                  };
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_partner_deals_v2', JSON.stringify(deals));
        } catch {
            // ignore storage errors
        }
    }, [deals]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_saved_deals', JSON.stringify(savedDealIds));
        } catch {
            // ignore storage errors
        }
    }, [savedDealIds]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_claimed_deals', JSON.stringify(claimedDeals));
        } catch {
            // ignore storage errors
        }
    }, [claimedDeals]);

    const toggleSaveDeal = (deal) => {
        const exists = savedDealIds.includes(deal.id);
        const updated = exists
            ? savedDealIds.filter((id) => id !== deal.id)
            : [...savedDealIds, deal.id];
        setSavedDealIds(updated);
        addToast(
            exists
                ? `Removed "${deal.title}" from Deal Watchlist`
                : `Saved "${deal.title}" to Deal Watchlist`,
            exists ? 'info' : 'success'
        );
    };

    const handleClaimVoucher = (deal) => {
        const savingsUSD = Math.max(0, deal.retailPrice - deal.dealPrice);
        const nextClaimed = {
            ...claimedDeals,
            [deal.id]: {
                voucherCode: deal.promoCode,
                title: deal.title,
                hub: deal.hub,
                dealPrice: deal.dealPrice,
                savingsUSD,
                lockedAt: new Date().toISOString().slice(0, 10)
            }
        };
        setClaimedDeals(nextClaimed);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(deal.promoCode).catch(() => {});
        }
        addToast(
            `Locked Partner Rate (${deal.promoCode}) — Saved $${savingsUSD.toLocaleString()}! Code copied.`,
            'success'
        );
    };

    const handlePushDealToTrips = (deal) => {
        try {
            const rawQueue = localStorage.getItem('seenomad_queued_itinerary_items');
            const queue = rawQueue ? JSON.parse(rawQueue) : [];
            const item = {
                id: `deal-stop-${Date.now()}`,
                title: `${deal.title} (${deal.discountLabel})`,
                hub: deal.hub,
                priceUSD: deal.dealPrice,
                promoCode: deal.promoCode,
                source: 'SeeNomad Travel Deals'
            };
            localStorage.setItem('seenomad_queued_itinerary_items', JSON.stringify([item, ...queue]));
        } catch {
            // ignore storage errors
        }
        addToast(`Synced "${deal.hub}" partner rate to My Trips & Itinerary Builder!`, 'success');
    };

    const handleCreateDealAlert = (e) => {
        e.preventDefault();
        if (!alertRoute.trim()) return;

        const targetDeal = Number(alertMaxPrice) || 650;
        const retailEst = Math.round(targetDeal * 1.48);
        const created = {
            id: `deal-custom-${Date.now()}`,
            category: alertCategory,
            partner: 'SeeNomad Syndicate Price-Drop Radar',
            title: `${alertRoute.trim()} — Verified Partner Rate Lock & Flex Baggage`,
            hub: alertRoute.trim(),
            region: 'Custom Watch',
            discountLabel: '32% SYNDICATE TARGET',
            dealPrice: targetDeal,
            retailPrice: retailEst,
            unit: alertCategory === 'flights' ? '/ flex roundtrip' : '/ 28 nights partner rate',
            fiberSpeed: '500+ Mbps Verified Partner SLA',
            cancellation: 'Free Date Shift + Price-Drop Protection',
            seatsLeft: 'Live Syndicate Watch Active',
            expiryWindow: '24/7 Radar Armed',
            promoCode: `SN-WATCH-${Math.floor(100 + Math.random() * 899)}`,
            xpBonus: 600,
            image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80',
            includedPerks: 'Zero OTA Markup · Instant Price-Drop Alert · Flex Cancellation',
            description:
                'Custom Syndicate deal watch created by you. Locks wholesale partner inventory as soon as the corridor hits your target threshold.'
        };

        setDeals((prev) => [created, ...prev]);
        setAlertRoute('');
        setShowAlertDrawer(false);
        addToast(`Armed live price-drop radar for "${created.hub}"!`, 'success');
    };

    const handleExportDealsDossier = () => {
        const payload = {
            exportedAt: new Date().toISOString(),
            platform: 'SeeNomad NomadYield™ — Exclusive Partner Stays & Flights',
            claimedVouchers: claimedDeals,
            watchlistIds: savedDealIds,
            availableDealsCount: deals.length
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seenomad-travel-deals-vouchers.json';
        a.click();
        URL.revokeObjectURL(url);
        addToast('Exported locked partner vouchers & Travel Deals dossier!', 'success');
    };

    const filteredDeals = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const list = deals.filter((d) => {
            if (activeCategory === 'saved' && !savedDealIds.includes(d.id)) return false;
            if (activeCategory === 'claimed' && !claimedDeals[d.id]) return false;
            if (
                activeCategory !== 'all' &&
                activeCategory !== 'saved' &&
                activeCategory !== 'claimed' &&
                d.category !== activeCategory
            ) {
                return false;
            }
            if (!q) return true;
            const hay = `${d.title} ${d.partner} ${d.hub} ${d.promoCode} ${d.includedPerks} ${d.description}`.toLowerCase();
            return hay.includes(q);
        });

        return [...list].sort((a, b) => {
            if (sortBy === 'price-asc') return a.dealPrice - b.dealPrice;
            if (sortBy === 'xp') return b.xpBonus - a.xpBonus;
            return b.retailPrice - b.dealPrice - (a.retailPrice - a.dealPrice);
        });
    }, [deals, activeCategory, searchQuery, sortBy, savedDealIds, claimedDeals]);

    const totalClaimedSavings = useMemo(() => {
        return Object.values(claimedDeals).reduce((sum, item) => sum + (item.savingsUSD || 0), 0);
    }, [claimedDeals]);

    const totalPotentialSavings = useMemo(() => {
        return deals.reduce((sum, d) => sum + Math.max(0, d.retailPrice - d.dealPrice), 0);
    }, [deals]);

    const estimatedStayArbitrage = useMemo(() => {
        const baseDailyRetail = calcHub.includes('Lisbon') ? 88 : calcHub.includes('Tokyo') ? 96 : 74;
        const discountFactor = calcHub.includes('Lisbon') ? 0.38 : calcHub.includes('Tokyo') ? 0.35 : 0.42;
        const retailTotal = Math.round(baseDailyRetail * calcNights);
        const syndicateTotal = Math.round(retailTotal * (1 - discountFactor));
        return {
            retailTotal,
            syndicateTotal,
            saved: retailTotal - syndicateTotal
        };
    }, [calcNights, calcHub]);

    return (
        <div className="tdh-shell">
            {/* 1. Editorial Hero Banner & Live Arbitrage Telemetry */}
            <header className="tdh-hero-banner">
                <div className="tdh-hero-top">
                    <div className="tdh-hero-copy">
                        <span className="tdh-kicker">
                            <Tag size={13} />
                            SeeNomad NomadYield™ · Wholesale Coliving Stays, Error-Fare Flights & Syndicate Perks
                        </span>
                        <h1 className="tdh-title">
                            Exclusive Partner Stays, Flex Flights & Group-Buy Travel Deals
                        </h1>
                        <p className="tdh-subtitle">
                            Bypass 18–25% OTA commissions with direct-negotiated monthly coliving allotments, open-jaw digital nomad flight corridors with free date shifts, 1st-class high-speed rail passes, and global 5G eSIM bundles.
                        </p>
                    </div>

                    <div className="tdh-hero-actions">
                        <button
                            type="button"
                            className="tdh-btn tdh-btn-primary"
                            onClick={() => setShowAlertDrawer((prev) => !prev)}
                        >
                            <Plus size={15} />
                            {showAlertDrawer ? 'Close Price Radar' : 'Create Deal Alert'}
                        </button>
                        <button
                            type="button"
                            className="tdh-btn"
                            onClick={() => navigate('/explore/book-travel')}
                        >
                            <Plane size={14} />
                            Book Travel Desk
                        </button>
                        <button
                            type="button"
                            className="tdh-btn"
                            onClick={() => navigate('/user/travel-journey')}
                        >
                            <Luggage size={14} />
                            My Trips Vault
                        </button>
                        <button
                            type="button"
                            className="tdh-btn"
                            onClick={handleExportDealsDossier}
                        >
                            <Download size={14} />
                            Export Vouchers
                        </button>
                    </div>
                </div>

                {/* Unboxed Hero Telemetry Row */}
                <div className="tdh-kpi-row">
                    <div className="tdh-kpi-metrics">
                        <span>
                            Live Partner Allotments: <strong>{deals.length} Verified Deals</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Pool Arbitrage Available:{' '}
                            <strong style={{ color: '#10b981' }}>${totalPotentialSavings.toLocaleString()} Total Savings</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Your Locked Vouchers:{' '}
                            <strong style={{ color: '#38bdf8' }}>
                                {Object.keys(claimedDeals).length} Active (${totalClaimedSavings.toLocaleString()} Saved)
                            </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            OTA Markup Charged: <strong>0% Direct Syndicate Rate</strong>
                        </span>
                    </div>
                </div>
            </header>

            {/* 2. Custom Deal Alert / Corridor Watch Drawer */}
            {showAlertDrawer && (
                <form className="tdh-drawer" onSubmit={handleCreateDealAlert}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={15} color="#10b981" />
                            Arm a Custom Syndicate Stay or Flight Error-Fare Radar
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Automatically locks partner inventory when your target route or coliving hub drops below threshold
                        </span>
                    </div>

                    <div className="tdh-form-grid">
                        <label className="tdh-field-label">
                            <span>Destination Hub or Flight Corridor</span>
                            <input
                                type="text"
                                className="tdh-input"
                                placeholder="e.g. Tokyo → Lisbon Open-Jaw or Barcelona 28d Loft"
                                value={alertRoute}
                                onChange={(e) => setAlertRoute(e.target.value)}
                                required
                            />
                        </label>

                        <label className="tdh-field-label">
                            <span>Deal Category</span>
                            <select
                                className="tdh-select"
                                value={alertCategory}
                                onChange={(e) => setAlertCategory(e.target.value)}
                            >
                                <option value="stays">Partner Coliving & Stays</option>
                                <option value="flights">Error-Fare & Nomad Flights</option>
                                <option value="rail">Rail Passes & Transit</option>
                                <option value="esim">eSIM & Lounge Perks</option>
                            </select>
                        </label>

                        <label className="tdh-field-label">
                            <span>Target Max Rate (USD)</span>
                            <input
                                type="number"
                                className="tdh-input"
                                value={alertMaxPrice}
                                onChange={(e) => setAlertMaxPrice(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="tdh-btn tdh-btn-primary">
                            <CheckCircle2 size={14} />
                            Activate Price Radar
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Category Tabs & Search / Sort Toolbar */}
            <section className="tdh-toolbar" aria-label="Filter exclusive partner stays and flight deals">
                <div className="tdh-tabs" role="tablist">
                    {DEAL_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === cat.id}
                            className={`tdh-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                            {cat.id === 'saved' && ` (${savedDealIds.length})`}
                            {cat.id === 'claimed' && ` (${Object.keys(claimedDeals).length})`}
                        </button>
                    ))}
                </div>

                <div className="tdh-search-controls">
                    <div className="tdh-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search Outsite, ANA, Tokyo, Lisbon, eSIM, rail..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search travel deals"
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
                        className="tdh-select"
                        style={{ width: 'auto', minWidth: 155 }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort travel deals"
                    >
                        <option value="savings">Sort: Highest Savings ($)</option>
                        <option value="price-asc">Sort: Lowest Partner Rate</option>
                        <option value="xp">Sort: Highest Odyssey XP</option>
                    </select>
                </div>
            </section>

            {/* 4. Split Workspace: Partner Deals Grid + Live Arbitrage Side Rail */}
            <div className="tdh-workspace-layout">
                {/* Left Column: Partner Deals Cards Grid */}
                <div>
                    {filteredDeals.length === 0 ? (
                        <div className="tdh-side-panel" style={{ textAlign: 'center', padding: '2.4rem 1.5rem' }}>
                            <strong style={{ fontSize: '1rem' }}>No matching partner deals in this filter</strong>
                            <p style={{ margin: '0.35rem 0 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                Try clearing your search query or switching back to All Exclusive Deals.
                            </p>
                            <div>
                                <button
                                    type="button"
                                    className="tdh-btn tdh-btn-primary"
                                    onClick={() => {
                                        setActiveCategory('all');
                                        setSearchQuery('');
                                    }}
                                >
                                    Reset Deal Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="tdh-deals-grid">
                            {filteredDeals.map((deal) => {
                                const isSaved = savedDealIds.includes(deal.id);
                                const isClaimed = Boolean(claimedDeals[deal.id]);
                                const savingsUSD = Math.max(0, deal.retailPrice - deal.dealPrice);

                                return (
                                    <article key={deal.id} className="tdh-deal-card">
                                        <div className="tdh-card-media">
                                            <img src={deal.image} alt={deal.title} loading="lazy" />
                                            <div className="tdh-media-overlay">
                                                <div className="tdh-media-top">
                                                    <span className="tdh-discount-tag">{deal.discountLabel}</span>
                                                    <button
                                                        type="button"
                                                        className={`tdh-save-btn ${isSaved ? 'saved' : ''}`}
                                                        onClick={() => toggleSaveDeal(deal)}
                                                        aria-label={isSaved ? 'Remove from watchlist' : 'Save to watchlist'}
                                                    >
                                                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                                    </button>
                                                </div>

                                                <div className="tdh-media-bottom">
                                                    <span>{deal.hub}</span>
                                                    <span>
                                                        <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                        {deal.expiryWindow}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tdh-card-body">
                                            <div>
                                                <span className="tdh-partner-kicker">{deal.partner}</span>
                                                <h3 className="tdh-card-title">{deal.title}</h3>
                                            </div>

                                            {/* Unboxed Telemetry Metadata */}
                                            <div className="tdh-meta-strip">
                                                <span>
                                                    <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {deal.fiberSpeed}
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span>{deal.seatsLeft}</span>
                                                <span aria-hidden="true">·</span>
                                                <span style={{ color: '#10b981', fontWeight: 700 }}>+{deal.xpBonus} XP</span>
                                            </div>

                                            <p className="tdh-card-desc">{deal.description}</p>

                                            <div className="tdh-perks-line">
                                                <strong>Included:</strong> {deal.includedPerks}
                                            </div>

                                            <div className="tdh-card-footer">
                                                <div className="tdh-price-block">
                                                    <div className="tdh-price-row">
                                                        <span className="tdh-deal-price">${deal.dealPrice.toLocaleString()}</span>
                                                        <span className="tdh-retail-price">${deal.retailPrice.toLocaleString()}</span>
                                                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800 }}>
                                                            Save ${savingsUSD}
                                                        </span>
                                                    </div>
                                                    <span className="tdh-price-unit">{deal.unit}</span>
                                                </div>

                                                <div className="tdh-card-actions">
                                                    <button
                                                        type="button"
                                                        className="tdh-btn"
                                                        onClick={() => setSelectedDeal(deal)}
                                                    >
                                                        Inspect
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="tdh-btn"
                                                        onClick={() => handlePushDealToTrips(deal)}
                                                        title="Sync with My Trips & Itinerary Builder"
                                                    >
                                                        <GitBranch size={13} />
                                                        Add to Trip
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`tdh-btn ${isClaimed ? 'tdh-btn-sky' : 'tdh-btn-primary'}`}
                                                        onClick={() => handleClaimVoucher(deal)}
                                                    >
                                                        <CheckCircle2 size={13} />
                                                        {isClaimed ? `Locked: ${deal.promoCode}` : 'Lock Rate'}
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

                {/* Right Column: Live Stay+Flight Arbitrage Calculator & Claimed Vouchers Vault */}
                <aside className="tdh-side-rail" aria-label="Stay and Flight Arbitrage Estimator and Voucher Vault">
                    {/* Interactive Stay + Flight Yield Estimator */}
                    <div className="tdh-side-panel">
                        <h3 className="tdh-side-title">
                            <span>
                                <SlidersHorizontal
                                    size={15}
                                    color="#10b981"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Long-Stay Arbitrage Calculator
                            </span>
                        </h3>

                        <label className="tdh-field-label">
                            <span>Select Partner Coliving Hub</span>
                            <select
                                className="tdh-select"
                                value={calcHub}
                                onChange={(e) => setCalcHub(e.target.value)}
                            >
                                <option value="Lisbon (-38% Syndicate)">Lisbon Cais do Sodré (-38% Syndicate)</option>
                                <option value="Tokyo (-35% Machiya)">Kyoto / Tokyo Heritage (-35% Partner)</option>
                                <option value="Bali (-42% Villa)">Canggu Pool Villa (-42% Long-Stay)</option>
                            </select>
                        </label>

                        <label className="tdh-field-label">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Stay Duration</span>
                                <strong style={{ color: '#10b981' }}>{calcNights} Nights</strong>
                            </div>
                            <input
                                type="range"
                                min="14"
                                max="90"
                                step="7"
                                value={calcNights}
                                onChange={(e) => setCalcNights(Number(e.target.value))}
                            />
                        </label>

                        <div className="tdh-vault-row">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Standard OTA Retail + Fees:</span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>
                                    ${estimatedStayArbitrage.retailTotal.toLocaleString()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <strong>SeeNomad Syndicate Rate:</strong>
                                <strong style={{ color: '#10b981', fontSize: '0.88rem' }}>
                                    ${estimatedStayArbitrage.syndicateTotal.toLocaleString()}
                                </strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, color: '#38bdf8', fontWeight: 700 }}>
                                <span>Net Nomad Arbitrage Saved:</span>
                                <span>+${estimatedStayArbitrage.saved.toLocaleString()} USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Locked Partner Vouchers Vault */}
                    <div className="tdh-side-panel">
                        <h3 className="tdh-side-title">
                            <span>
                                <ShieldCheck
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Locked Partner Vouchers ({Object.keys(claimedDeals).length})
                            </span>
                        </h3>

                        {Object.entries(claimedDeals).map(([id, item]) => (
                            <div key={id} className="tdh-vault-row">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ color: '#10b981' }}>{item.voucherCode}</strong>
                                    <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>
                                        Saved ${item.savingsUSD || 910}
                                    </span>
                                </div>
                                <span style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>
                                    {item.title || 'Lisbon Cais do Sodré — 28-Night Coliving Loft'}
                                </span>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="tdh-btn tdh-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => navigate('/explore/passport-perks')}
                        >
                            <Zap size={14} />
                            Open Nomad Rewards & Perks Vault
                        </button>
                    </div>

                    {/* Direct Ecosystem Cross-Links */}
                    <div className="tdh-side-panel">
                        <h3 className="tdh-side-title">
                            <span>
                                <Globe
                                    size={15}
                                    color="#10b981"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Verify Before You Book
                            </span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.45 }}>
                            Want a local fixer to test the exact room Wi-Fi speed or check tax residency thresholds before locking a 28-night stay?
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <button
                                type="button"
                                className="tdh-btn"
                                style={{ width: '100%', justifyContent: 'space-between' }}
                                onClick={() => navigate('/explore/guardians')}
                            >
                                <span>Deploy Local Fixer Apartment Audit</span>
                                <ArrowRight size={13} />
                            </button>
                            <button
                                type="button"
                                className="tdh-btn"
                                style={{ width: '100%', justifyContent: 'space-between' }}
                                onClick={() => navigate('/explore/tax-calculator')}
                            >
                                <span>Check 183-Day Tax Compliance</span>
                                <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* 5. Deal Inspection & Rate Breakdown Modal */}
            {selectedDeal && (
                <div className="tdh-modal-backdrop" onClick={() => setSelectedDeal(null)}>
                    <div className="tdh-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="tdh-kicker">{selectedDeal.partner}</span>
                                <h2 style={{ margin: '0.25rem 0 0', fontSize: '1.18rem', fontWeight: 800 }}>
                                    {selectedDeal.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="tdh-btn"
                                onClick={() => setSelectedDeal(null)}
                                aria-label="Close modal"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        <div className="tdh-meta-strip">
                            <span>
                                <strong>Hub:</strong> {selectedDeal.hub}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                                <strong>Connectivity:</strong> {selectedDeal.fiberSpeed}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                                <strong>Policy:</strong> {selectedDeal.cancellation}
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.55, color: '#cbd5e1' }}>
                            {selectedDeal.description}
                        </p>

                        <div className="tdh-perks-line">
                            <strong>Syndicate Bundle Inclusions:</strong> {selectedDeal.includedPerks}
                        </div>

                        <div className="tdh-vault-row">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Syndicate Voucher Code:</span>
                                <strong style={{ color: '#10b981' }}>{selectedDeal.promoCode}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <span>Member Rate vs. Retail:</span>
                                <strong>
                                    ${selectedDeal.dealPrice.toLocaleString()} (Retail ${selectedDeal.retailPrice.toLocaleString()})
                                </strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <span>Remaining Allotment:</span>
                                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{selectedDeal.seatsLeft}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.55rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                className="tdh-btn"
                                onClick={() => {
                                    handlePushDealToTrips(selectedDeal);
                                    setSelectedDeal(null);
                                }}
                            >
                                <GitBranch size={14} />
                                Push to My Trips & Itinerary
                            </button>
                            <button
                                type="button"
                                className="tdh-btn tdh-btn-primary"
                                onClick={() => {
                                    handleClaimVoucher(selectedDeal);
                                    setSelectedDeal(null);
                                }}
                            >
                                <Copy size={14} />
                                Lock Rate & Copy Code ({selectedDeal.promoCode})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offers;
