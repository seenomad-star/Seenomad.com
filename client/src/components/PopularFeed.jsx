import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Compass,
    Flame,
    Trophy,
    MapPin,
    Star,
    Camera,
    Lightbulb,
    Users,
    TrendingUp,
    Wifi,
    DollarSign,
    ShieldCheck,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Plus,
    Search,
    X,
    CheckCircle2,
    Award,
    Sparkles,
    ArrowRight,
    Clock,
    ThumbsUp,
    UserPlus,
    Check
} from 'lucide-react';
import { useNavStore } from '../store/navStore';
import { useToastStore } from '../store/toastStore';
import { useSavedStore } from '../store/savedStore';
import '../styles/popular/PopularFeed.css';

// 1. Trending Destinations Data (Matches Reference Screenshot + Live Nomad Telemetry)
const TRENDING_DESTINATIONS = [
    {
        id: 'bali-indonesia',
        city: 'Bali',
        country: 'Indonesia',
        flag: '🇮🇩',
        region: 'Asia',
        isHot: true,
        rankDelta: '+14%',
        rating: 4.9,
        reviewsCount: 1420,
        monthlyCost: 1450,
        wifiMbps: 245,
        visaTag: '60d e-VOA / Remote KITAS',
        vibe: 'Tropical Coliving & Surf',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80',
        lat: '-8.4095° S',
        lng: '115.1889° E'
    },
    {
        id: 'kyoto-japan',
        city: 'Kyoto',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'Asia',
        isHot: true,
        rankDelta: '+22%',
        rating: 4.95,
        reviewsCount: 980,
        monthlyCost: 1950,
        wifiMbps: 340,
        visaTag: '90d Visa-Free / 6m J-Skip',
        vibe: 'Historic Machiya & Fiber',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&auto=format&fit=crop&q=80',
        lat: '35.0116° N',
        lng: '135.7681° E'
    },
    {
        id: 'santorini-greece',
        city: 'Santorini',
        country: 'Greece',
        flag: '🇬🇷',
        region: 'Europe',
        isHot: false,
        rankDelta: '+9%',
        rating: 4.85,
        reviewsCount: 865,
        monthlyCost: 2450,
        wifiMbps: 185,
        visaTag: 'Schengen 90d / Greece DNV',
        vibe: 'Caldera Views & Aegean Sun',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&auto=format&fit=crop&q=80',
        lat: '36.3932° N',
        lng: '25.4615° E'
    },
    {
        id: 'machu-picchu-peru',
        city: 'Machu Picchu & Cusco',
        country: 'Peru',
        flag: '🇵🇪',
        region: 'Americas',
        isHot: true,
        rankDelta: '+18%',
        rating: 4.92,
        reviewsCount: 740,
        monthlyCost: 1180,
        wifiMbps: 160,
        visaTag: '90d Visa-Free / 1-Yr Nomad',
        vibe: 'Andean Heritage & EST Timezone',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=900&auto=format&fit=crop&q=80',
        lat: '-13.1631° S',
        lng: '-72.5450° W'
    },
    {
        id: 'amalfi-coast-italy',
        city: 'Amalfi Coast',
        country: 'Italy',
        flag: '🇮🇹',
        region: 'Europe',
        isHot: false,
        rankDelta: '+11%',
        rating: 4.88,
        reviewsCount: 910,
        monthlyCost: 2680,
        wifiMbps: 210,
        visaTag: 'Schengen 90d / Italy Nomad Visa',
        vibe: 'Coastal Gastronomy & Villas',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&auto=format&fit=crop&q=80',
        lat: '40.6333° N',
        lng: '14.6029° E'
    },
    {
        id: 'lisbon-portugal',
        city: 'Lisbon',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'Europe',
        isHot: true,
        rankDelta: '+16%',
        rating: 4.91,
        reviewsCount: 1580,
        monthlyCost: 2150,
        wifiMbps: 365,
        visaTag: 'Schengen 90d / Portugal D8',
        vibe: 'Atlantic Founder Hub & Surf',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&auto=format&fit=crop&q=80',
        lat: '38.7223° N',
        lng: '-9.1393° W'
    },
    {
        id: 'medellin-colombia',
        city: 'Medellín',
        country: 'Colombia',
        flag: '🇨🇴',
        region: 'Americas',
        isHot: true,
        rankDelta: '+19%',
        rating: 4.87,
        reviewsCount: 1120,
        monthlyCost: 1320,
        wifiMbps: 335,
        visaTag: '90d Stamp / 2-Yr V-Visa',
        vibe: 'Eternal Spring & EST Match',
        image: 'https://images.unsplash.com/photo-1599413987323-f44692045779?w=900&auto=format&fit=crop&q=80',
        lat: '6.2442° N',
        lng: '-75.5812° W'
    }
];

// 2. Top Rated Traveler Reviews
const INITIAL_REVIEWS = [
    {
        id: 'rev-1',
        author: 'Elena Rostova',
        handle: '@elena_roams',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        role: 'Staff Product Designer',
        destination: 'Kyoto, Japan',
        flag: '🇯🇵',
        rating: 5,
        verifiedStay: '30-Day Machiya Sprint',
        timeAgo: '2h ago',
        title: 'Karasuma Oike is the ultimate quiet deep-work neighborhood in Kyoto',
        comment:
            'Spent 4 weeks working US/APAC overlap from a restored Machiya townhouse. Symmetrical 1Gbps fiber, 6:30 AM walks through Fushimi Inari before tourists arrive, and $9 Michelin-bib ramen lunches.',
        wifiVerified: '410 Mbps',
        monthlySpend: '$1,920/mo',
        likes: 184,
        comments: 29,
        tags: ['Fiber Verified', 'Quiet Base', 'Solo Safe']
    },
    {
        id: 'rev-2',
        author: 'Marcus Vance',
        handle: '@mvance_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        role: 'AI Systems Architect',
        destination: 'Bali, Indonesia',
        flag: '🇮🇩',
        rating: 5,
        verifiedStay: '60-Day e-VOA Stay',
        timeAgo: '5h ago',
        title: 'Pererenan over central Canggu: Dual-ISP fiber + zero traffic stress',
        comment:
            'Moving 10 minutes north to Pererenan transformed my Bali workcation. Outpost & Tribal have backup generators and dual fiber lines, and the morning surf at Echo Beach is unbeaten.',
        wifiVerified: '265 Mbps',
        monthlySpend: '$1,480/mo',
        likes: 246,
        comments: 41,
        tags: ['Coliving', 'Surf & Code', 'Dual ISP']
    },
    {
        id: 'rev-3',
        author: 'Sophia Chen',
        handle: '@sophia_builds',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        role: 'Indie Founder',
        destination: 'Lisbon, Portugal',
        flag: '🇵🇹',
        rating: 5,
        verifiedStay: '45-Day Atlantic Base',
        timeAgo: '1d ago',
        title: 'Second Home Lisboa + Outsite Cais do Sodré made our founder offsite effortless',
        comment:
            'Working surrounded by 1,000+ plants above Time Out Market gave our team incredible energy. Easy 30-minute train ride to Carcavelos for afternoon surf before US East Coast calls.',
        wifiVerified: '380 Mbps',
        monthlySpend: '$2,180/mo',
        likes: 159,
        comments: 22,
        tags: ['Founder Hub', 'Schengen D8', 'Biophilic']
    },
    {
        id: 'rev-4',
        author: 'Liam O’Connor',
        handle: '@liam_trek',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        role: 'Remote FinTech Lead',
        destination: 'Santorini & Athens, Greece',
        flag: '🇬🇷',
        rating: 4.8,
        verifiedStay: '21-Day Shoulder Season',
        timeAgo: '2d ago',
        title: 'Book Oia & Fira in October or May for 50% lower villa rates & fast 5G',
        comment:
            'Shoulder season in Santorini is a hidden nomad hack. Caldera terrace cafés are calm, 5G eSIM speeds hit 210 Mbps, and sunset views after standup feel surreal.',
        wifiVerified: '210 Mbps',
        monthlySpend: '$2,350/mo',
        likes: 118,
        comments: 17,
        tags: ['Shoulder Season', '5G eSIM', 'Scenic']
    }
];

// 3. Global Explorer Leaderboard
const LEADERBOARD_EXPLORERS = [
    {
        rank: 1,
        name: 'Elena Rostova',
        handle: '@elena_roams',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        countries: 48,
        reviews: 94,
        speedTests: 142,
        xp: 48920,
        badge: 'Sovereign Pathfinder'
    },
    {
        rank: 2,
        name: 'Marcus Vance',
        handle: '@mvance_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        countries: 41,
        reviews: 82,
        speedTests: 119,
        xp: 44150,
        badge: 'Fiber Cartographer'
    },
    {
        rank: 3,
        name: 'Sophia Chen',
        handle: '@sophia_builds',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        countries: 37,
        reviews: 76,
        speedTests: 98,
        xp: 39800,
        badge: 'Consular Insider'
    },
    {
        rank: 4,
        name: 'Alex Rover (You)',
        handle: '@alex_rover',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        countries: 14,
        reviews: 28,
        speedTests: 35,
        xp: 18450,
        badge: 'Global Explorer',
        isCurrentUser: true
    },
    {
        rank: 5,
        name: 'Mateo Silva',
        handle: '@mateo_andes',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        countries: 29,
        reviews: 54,
        speedTests: 77,
        xp: 31200,
        badge: 'Guardian Scout'
    }
];

// 4. Community Travel Photos Gallery
const TRAVEL_PHOTOS = [
    {
        id: 'ph-1',
        title: 'Sunrise over Fushimi Inari Torii Gates',
        location: 'Kyoto, Japan 🇯🇵',
        author: 'Elena Rostova',
        camera: 'Sony A7C II • 35mm f/1.4',
        likes: 642,
        image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=900&auto=format&fit=crop&q=80'
    },
    {
        id: 'ph-2',
        title: 'Caldera Blue Domes Golden Hour',
        location: 'Oia, Santorini, Greece 🇬🇷',
        author: 'Liam O’Connor',
        camera: 'Leica Q3 • 28mm',
        likes: 518,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&auto=format&fit=crop&q=80'
    },
    {
        id: 'ph-3',
        title: ' Tegallalang Rice Terraces Morning Mist',
        location: 'Ubud, Bali, Indonesia 🇮🇩',
        author: 'Marcus Vance',
        camera: 'DJI Air 3S • 24mm',
        likes: 734,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80'
    },
    {
        id: 'ph-4',
        title: 'Cloud Forest Above Machu Picchu Citadel',
        location: 'Cusco Region, Peru 🇵🇪',
        author: 'Mateo Silva',
        camera: 'Fujifilm X-T5 • 23mm',
        likes: 890,
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=900&auto=format&fit=crop&q=80'
    },
    {
        id: 'ph-5',
        title: 'Positano Cliffside Lanterns at Dusk',
        location: 'Amalfi Coast, Italy 🇮🇹',
        author: 'Sophia Chen',
        camera: 'iPhone 16 Pro Max • ProRAW',
        likes: 475,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&auto=format&fit=crop&q=80'
    },
    {
        id: 'ph-6',
        title: 'Tram 28 Climbing Alfama Cobblestones',
        location: 'Lisbon, Portugal 🇵🇹',
        author: 'Elena Rostova',
        camera: 'Ricoh GR IIIx • 40mm',
        likes: 612,
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&auto=format&fit=crop&q=80'
    }
];

// 5. Verified Travel Tips & Nomad Hacks
const INITIAL_TRAVEL_TIPS = [
    {
        id: 'tip-1',
        category: 'Visa & Border Hack',
        destination: 'Bali, Indonesia 🇮🇩',
        title: 'Pre-book the 60-Day B211A / e-VOA online to skip the 45-minute DPS arrival queue',
        body: 'Apply on the official Molina Immigration portal 5 days before departure. Your passport scans straight through the automated e-Gates at Ngurah Rai Airport in 30 seconds.',
        author: 'Marcus Vance',
        saves: 312,
        helpfulCount: 428
    },
    {
        id: 'tip-2',
        category: 'Rail & Workspace',
        destination: 'Tokyo & Kyoto, Japan 🇯🇵',
        title: 'Book Car 7 (S-Work Car) on the Nozomi Shinkansen for Zoom calls & power outlets',
        body: 'JR Central’s S-Work carriage allows quiet voice calls, offers upgraded N700S Wi-Fi, and lets you rent a partition lap-desk at no extra seat fee with SmartEX.',
        author: 'Elena Rostova',
        saves: 285,
        helpfulCount: 391
    },
    {
        id: 'tip-3',
        category: 'Banking & Zero FX',
        destination: 'Global Nomad Tip 🌐',
        title: 'Always decline ATM "Conversion" and carry Charles Schwab + Wise physical cards',
        body: 'Selecting "Continue Without Conversion" forces the local card network (Visa/Mastercard) wholesale rate instead of a 7–11% dynamic currency markup.',
        author: 'Sophia Chen',
        saves: 540,
        helpfulCount: 619
    },
    {
        id: 'tip-4',
        category: 'Altitude & Connectivity',
        destination: 'Cusco & Machu Picchu, Peru 🇵🇪',
        title: 'Acclimate 48h in Sacred Valley (Ollantaytambo) before working from Cusco',
        body: 'Ollantaytambo sits 600m lower than Cusco, has fiber-connected boutique lodges, and sits right on the PeruRail/IncaRail line to Aguas Calientes.',
        author: 'Mateo Silva',
        saves: 194,
        helpfulCount: 247
    }
];

const PopularFeed = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { globalSearchQuery, globalActiveFilters } = useNavStore();
    const { toggleSaveDestination, isDestinationSaved } = useSavedStore();

    // Primary Discover Tabs matching the user's reference screenshot
    const [activeTab, setActiveTab] = useState('trending');
    const [regionFilter, setRegionFilter] = useState('All');
    const [localSearch, setLocalSearch] = useState('');

    // Interactive state for Reviews, Tips, Likes & Modal
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [tips, setTips] = useState(INITIAL_TRAVEL_TIPS);
    const [likedIds, setLikedIds] = useState({});
    const [followedHandles, setFollowedHandles] = useState({
        '@elena_roams': true,
        '@mvance_dev': true
    });
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({
        destination: 'Bali, Indonesia',
        title: '',
        comment: '',
        rating: 5,
        wifiVerified: '250 Mbps',
        monthlySpend: '$1,600/mo'
    });

    const discoverTabs = [
        { id: 'trending', label: 'Trending', icon: Flame },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'map', label: 'Map', icon: MapPin },
        { id: 'reviews', label: 'Reviews', icon: Star, count: reviews.length },
        { id: 'photos', label: 'Photos', icon: Camera, count: TRAVEL_PHOTOS.length },
        { id: 'tips', label: 'Travel Tips', icon: Lightbulb, count: tips.length },
        { id: 'following', label: 'Following', icon: Users }
    ];

    // Sync with NomadDock Vertical Pill • Page Filters
    useEffect(() => {
        if (Array.isArray(globalActiveFilters) && globalActiveFilters.length > 0) {
            const last = globalActiveFilters[globalActiveFilters.length - 1];
            if (last === 'following') setActiveTab('following');
            else if (last === 'vlogs') setActiveTab('photos');
            else if (last === 'recent') setActiveTab('reviews');
            else if (last === 'trending') setActiveTab('trending');
        }
    }, [globalActiveFilters]);

    const effectiveQuery = (localSearch || globalSearchQuery || '').trim().toLowerCase();

    const filteredDestinations = useMemo(() => {
        return TRENDING_DESTINATIONS.filter((d) => {
            if (regionFilter !== 'All' && d.region !== regionFilter) return false;
            if (effectiveQuery) {
                const hay = `${d.city} ${d.country} ${d.vibe} ${d.visaTag} ${d.region}`.toLowerCase();
                if (!hay.includes(effectiveQuery)) return false;
            }
            return true;
        });
    }, [regionFilter, effectiveQuery]);

    const filteredReviews = useMemo(() => {
        return reviews.filter((r) => {
            if (activeTab === 'following' && !followedHandles[r.handle]) return false;
            if (effectiveQuery) {
                const hay = `${r.destination} ${r.title} ${r.comment} ${r.author} ${(r.tags || []).join(' ')}`.toLowerCase();
                if (!hay.includes(effectiveQuery)) return false;
            }
            return true;
        });
    }, [reviews, activeTab, followedHandles, effectiveQuery]);

    const handleToggleLike = (id) => {
        setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleToggleFollow = (handle, name) => {
        setFollowedHandles((prev) => {
            const next = !prev[handle];
            if (addToast) {
                addToast(next ? `Following ${name}` : `Unfollowed ${name}`, 'info');
            }
            return { ...prev, [handle]: next };
        });
    };

    const handlePublishReview = (e) => {
        e.preventDefault();
        if (!newReview.title.trim() || !newReview.comment.trim()) return;

        const flagMap = {
            'Bali, Indonesia': '🇮🇩',
            'Kyoto, Japan': '🇯🇵',
            'Santorini, Greece': '🇬🇷',
            'Machu Picchu, Peru': '🇵🇪',
            'Amalfi Coast, Italy': '🇮🇹',
            'Lisbon, Portugal': '🇵🇹',
            'Medellín, Colombia': '🇨🇴'
        };

        const created = {
            id: `rev-${Date.now()}`,
            author: 'Alex Rover (You)',
            handle: '@alex_rover',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
            role: 'Global Explorer • Lvl 4',
            destination: newReview.destination,
            flag: flagMap[newReview.destination] || '🌍',
            rating: Number(newReview.rating) || 5,
            verifiedStay: 'Verified Nomad Dispatch',
            timeAgo: 'Just now',
            title: newReview.title.trim(),
            comment: newReview.comment.trim(),
            wifiVerified: newReview.wifiVerified || '250 Mbps',
            monthlySpend: newReview.monthlySpend || '$1,800/mo',
            likes: 1,
            comments: 0,
            tags: ['Verified Review', '2026 Dispatch']
        };

        setReviews((prev) => [created, ...prev]);
        setFollowedHandles((prev) => ({ ...prev, '@alex_rover': true }));
        setNewReview({
            destination: 'Bali, Indonesia',
            title: '',
            comment: '',
            rating: 5,
            wifiVerified: '250 Mbps',
            monthlySpend: '$1,600/mo'
        });
        setIsReviewModalOpen(false);
        if (addToast) {
            addToast('Published your verified traveler review! (+50 XP)', 'success');
        }
    };

    return (
        <div className="discover-popular-page">
            {/* 1. Hero Header (Matches Reference "Discover: Explore reviews, photos & tips from travelers worldwide") */}
            <header className="discover-hero-header">
                <div className="discover-hero-left">
                    <div className="discover-compass-badge">
                        <Compass size={26} />
                    </div>
                    <div>
                        <div className="discover-title-row">
                            <h1>Discover & Trending</h1>
                            <span className="discover-live-pill">
                                <span className="pulse-dot" /> Live Global Pulse
                            </span>
                        </div>
                        <p>Explore trending destinations, verified reviews, photos & tips from travelers worldwide</p>
                    </div>
                </div>

                <div className="discover-hero-actions">
                    <div className="discover-search-box">
                        <Search size={15} className="d-search-icon" />
                        <input
                            type="text"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            placeholder="Search Bali, Kyoto, reviews, fiber tips..."
                        />
                        {localSearch && (
                            <button
                                type="button"
                                className="d-search-clear"
                                onClick={() => setLocalSearch('')}
                                aria-label="Clear search"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        className="discover-write-btn"
                        onClick={() => setIsReviewModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>Write a Review</span>
                    </button>
                </div>
            </header>

            {/* 2. Reference Pill Tab Bar: Trending | Leaderboard | Map | Reviews | Photos | Travel Tips | Following */}
            <div className="discover-tabs-bar">
                <div className="discover-tabs-scroll" role="tablist" aria-label="Discover Categories">
                    {discoverTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                id={`tab-filter-${tab.id}`}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`discover-pill-tab ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={15} className="tab-icon" />
                                <span>{tab.label}</span>
                                {tab.count !== undefined && (
                                    <span className="tab-count-badge">{tab.count}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Region Quick Filter */}
                <div className="discover-region-pills">
                    {['All', 'Asia', 'Europe', 'Americas'].map((reg) => (
                        <button
                            key={reg}
                            type="button"
                            className={`d-region-chip ${regionFilter === reg ? 'active' : ''}`}
                            onClick={() => setRegionFilter(reg)}
                        >
                            {reg}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Dynamic Tab Content */}
            <div className="discover-main-workspace">
                {/* SECTION A: TRENDING DESTINATIONS CAROUSEL / GRID (Shown on 'trending' tab) */}
                {activeTab === 'trending' && (
                    <section className="discover-section-block" aria-label="Trending Destinations">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <TrendingUp size={19} className="text-sky" />
                                <h2>Trending Destinations</h2>
                                <span className="d-sec-sub">Real-time velocity across 195+ nomad hubs</span>
                            </div>
                            <button
                                type="button"
                                className="d-sec-link-btn"
                                onClick={() => navigate('/explore/destinations')}
                            >
                                <span>Explore All 195+ Countries</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="trending-destinations-grid">
                            {filteredDestinations.map((dest) => {
                                const saved = isDestinationSaved ? isDestinationSaved(dest.id) : false;
                                return (
                                    <article
                                        key={dest.id}
                                        className="trending-dest-card"
                                        onClick={() => navigate(`/explore/destinations`)}
                                    >
                                        <img
                                            src={dest.image}
                                            alt={`${dest.city}, ${dest.country}`}
                                            className="trending-dest-img"
                                            loading="lazy"
                                        />
                                        <div className="trending-dest-overlay" />

                                        {/* Top Badges: HOT Pill + Growth Delta + Bookmark */}
                                        <div className="trending-dest-top">
                                            <div className="td-badges-left">
                                                {dest.isHot && (
                                                    <span className="td-hot-badge">
                                                        <Flame size={12} fill="currentColor" /> HOT
                                                    </span>
                                                )}
                                                <span className="td-delta-badge">{dest.rankDelta}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`td-save-btn ${saved ? 'saved' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (toggleSaveDestination) {
                                                        toggleSaveDestination(dest);
                                                    }
                                                    if (addToast) {
                                                        addToast(
                                                            saved
                                                                ? `Removed ${dest.city} from Favorites`
                                                                : `Saved ${dest.city}, ${dest.country} to Favorites!`,
                                                            'info'
                                                        );
                                                    }
                                                }}
                                                aria-label={`Save ${dest.city}`}
                                            >
                                                <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>

                                        {/* Bottom Info Overlay */}
                                        <div className="trending-dest-bottom">
                                            <div className="td-title-row">
                                                <div>
                                                    <h3>{dest.city}</h3>
                                                    <span className="td-country">
                                                        {dest.flag} {dest.country}
                                                    </span>
                                                </div>
                                                <span className="td-rating-pill">
                                                    <Star size={11} fill="currentColor" /> {dest.rating}
                                                </span>
                                            </div>

                                            <div className="td-telemetry-row">
                                                <span>
                                                    <DollarSign size={11} /> ${dest.monthlyCost}/mo
                                                </span>
                                                <span>
                                                    <Wifi size={11} /> {dest.wifiMbps} Mbps
                                                </span>
                                            </div>

                                            <div className="td-card-actions">
                                                <button
                                                    type="button"
                                                    className="td-action-chip"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate('/explore/trip-builder');
                                                    }}
                                                >
                                                    Plan Trip →
                                                </button>
                                                <button
                                                    type="button"
                                                    className="td-action-chip secondary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate('/explore/visa');
                                                    }}
                                                >
                                                    {dest.visaTag}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* SECTION B: INTERACTIVE MAP VIEW (Shown when 'map' tab is selected) */}
                {activeTab === 'map' && (
                    <section className="discover-section-block" aria-label="Trending Destinations Map">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <MapPin size={19} className="text-sky" />
                                <h2>Global Trending Hotspots Map</h2>
                                <span className="d-sec-sub">Live telemetry pins with fiber speeds & visa windows</span>
                            </div>
                            <button
                                type="button"
                                className="d-sec-link-btn"
                                onClick={() => navigate('/explore?view=map')}
                            >
                                <span>Open Full 3D Interactive Map</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="discover-map-grid">
                            {filteredDestinations.map((dest, idx) => (
                                <div key={dest.id} className="discover-map-pin-card">
                                    <div className="dm-pin-num">#{idx + 1}</div>
                                    <img src={dest.image} alt={dest.city} className="dm-thumb" />
                                    <div className="dm-info">
                                        <div className="dm-top">
                                            <h4>
                                                {dest.flag} {dest.city}, {dest.country}
                                            </h4>
                                            <span className="dm-coords">
                                                {dest.lat}, {dest.lng}
                                            </span>
                                        </div>
                                        <p className="dm-vibe">{dest.vibe}</p>
                                        <div className="dm-metrics">
                                            <span>
                                                <Wifi size={12} /> {dest.wifiMbps} Mbps
                                            </span>
                                            <span>
                                                <DollarSign size={12} /> ${dest.monthlyCost}/mo
                                            </span>
                                            <span>
                                                <ShieldCheck size={12} /> {dest.visaTag}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="dm-launch-btn"
                                        onClick={() => navigate('/explore/trip-builder')}
                                    >
                                        Load in Builder
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SECTION C: LEADERBOARD (Shown when 'leaderboard' tab is selected) */}
                {activeTab === 'leaderboard' && (
                    <section className="discover-section-block" aria-label="Global Traveler Leaderboard">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <Trophy size={19} className="text-amber" />
                                <h2>Top Global Explorers Leaderboard</h2>
                                <span className="d-sec-sub">Ranked by verified reviews, speed tests & countries visited</span>
                            </div>
                        </div>

                        <div className="discover-leaderboard-list">
                            {LEADERBOARD_EXPLORERS.map((ex) => {
                                const isFollowing = Boolean(followedHandles[ex.handle]);
                                return (
                                    <div
                                        key={ex.rank}
                                        className={`d-leader-row ${ex.isCurrentUser ? 'is-me' : ''}`}
                                    >
                                        <div className={`d-leader-rank rank-${ex.rank}`}>#{ex.rank}</div>
                                        <img src={ex.avatar} alt={ex.name} className="d-leader-avatar" />
                                        <div className="d-leader-main">
                                            <div className="d-leader-name-line">
                                                <h4>{ex.name}</h4>
                                                <span className="d-leader-handle">{ex.handle}</span>
                                                <span className="d-leader-badge">{ex.badge}</span>
                                            </div>
                                            <div className="d-leader-stats">
                                                <span>🌍 {ex.countries} Countries</span>
                                                <span>⭐ {ex.reviews} Verified Reviews</span>
                                                <span>📶 {ex.speedTests} Speed Tests</span>
                                            </div>
                                        </div>
                                        <div className="d-leader-xp">
                                            <strong>{ex.xp.toLocaleString()} XP</strong>
                                        </div>
                                        {!ex.isCurrentUser && (
                                            <button
                                                type="button"
                                                className={`d-follow-btn ${isFollowing ? 'following' : ''}`}
                                                onClick={() => handleToggleFollow(ex.handle, ex.name)}
                                            >
                                                {isFollowing ? <Check size={13} /> : <UserPlus size={13} />}
                                                <span>{isFollowing ? 'Following' : 'Follow'}</span>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* SECTION D: PHOTOS GALLERY (Shown when 'photos' tab is selected) */}
                {activeTab === 'photos' && (
                    <section className="discover-section-block" aria-label="Traveler Photos">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <Camera size={19} className="text-sky" />
                                <h2>Community Visual Dispatches</h2>
                                <span className="d-sec-sub">High-resolution field photography from nomads worldwide</span>
                            </div>
                        </div>

                        <div className="discover-photos-grid">
                            {TRAVEL_PHOTOS.map((photo) => {
                                const liked = Boolean(likedIds[photo.id]);
                                return (
                                    <article key={photo.id} className="discover-photo-card">
                                        <div className="d-photo-img-wrap">
                                            <img src={photo.image} alt={photo.title} loading="lazy" />
                                            <span className="d-photo-loc">{photo.location}</span>
                                        </div>
                                        <div className="d-photo-body">
                                            <h4>{photo.title}</h4>
                                            <div className="d-photo-meta">
                                                <span>By {photo.author}</span>
                                                <span>•</span>
                                                <span>{photo.camera}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`d-like-pill ${liked ? 'liked' : ''}`}
                                                onClick={() => handleToggleLike(photo.id)}
                                            >
                                                <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
                                                <span>{photo.likes + (liked ? 1 : 0)}</span>
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* SECTION E: TRAVEL TIPS (Shown when 'tips' tab is selected) */}
                {activeTab === 'tips' && (
                    <section className="discover-section-block" aria-label="Verified Travel Tips">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <Lightbulb size={19} className="text-amber" />
                                <h2>Field-Tested Travel Tips & Nomad Hacks</h2>
                                <span className="d-sec-sub">Curated border, rail, banking & workspace tips</span>
                            </div>
                        </div>

                        <div className="discover-tips-grid">
                            {tips.map((tip) => {
                                const helpful = Boolean(likedIds[tip.id]);
                                return (
                                    <article key={tip.id} className="discover-tip-card">
                                        <div className="d-tip-top">
                                            <span className="d-tip-cat">{tip.category}</span>
                                            <span className="d-tip-dest">{tip.destination}</span>
                                        </div>
                                        <h4>{tip.title}</h4>
                                        <p>{tip.body}</p>
                                        <div className="d-tip-footer">
                                            <span className="d-tip-author">Shared by {tip.author}</span>
                                            <button
                                                type="button"
                                                className={`d-helpful-btn ${helpful ? 'active' : ''}`}
                                                onClick={() => handleToggleLike(tip.id)}
                                            >
                                                <ThumbsUp size={13} />
                                                <span>Helpful ({tip.helpfulCount + (helpful ? 1 : 0)})</span>
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* SECTION F: TOP RATED REVIEWS (Shown on 'trending', 'reviews', and 'following' tabs) */}
                {(activeTab === 'trending' || activeTab === 'reviews' || activeTab === 'following') && (
                    <section className="discover-section-block" aria-label="Top Rated Reviews">
                        <div className="discover-section-header">
                            <div className="d-sec-title">
                                <Star size={19} className="text-amber" />
                                <h2>
                                    {activeTab === 'following'
                                        ? 'Dispatches from Travelers You Follow'
                                        : 'Top Rated Reviews & Field Reports'}
                                </h2>
                                <span className="d-sec-sub">
                                    Verified Wi-Fi speeds, monthly burn rates & neighborhood intel
                                </span>
                            </div>
                            <button
                                type="button"
                                className="d-sec-link-btn"
                                onClick={() => setIsReviewModalOpen(true)}
                            >
                                <Plus size={14} />
                                <span>Write a Review →</span>
                            </button>
                        </div>

                        <div className="discover-reviews-grid">
                            {filteredReviews.map((rev) => {
                                const liked = Boolean(likedIds[rev.id]);
                                const isFollowing = Boolean(followedHandles[rev.handle]);
                                return (
                                    <article key={rev.id} className="discover-review-card">
                                        <div className="d-rev-header">
                                            <img src={rev.avatar} alt={rev.author} className="d-rev-avatar" />
                                            <div className="d-rev-author-info">
                                                <div className="d-rev-name-row">
                                                    <h4>{rev.author}</h4>
                                                    <span className="d-rev-verified">
                                                        <CheckCircle2 size={12} /> {rev.verifiedStay}
                                                    </span>
                                                </div>
                                                <span className="d-rev-role">
                                                    {rev.role} • {rev.timeAgo}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`d-follow-btn small ${isFollowing ? 'following' : ''}`}
                                                onClick={() => handleToggleFollow(rev.handle, rev.author)}
                                            >
                                                {isFollowing ? 'Following' : '+ Follow'}
                                            </button>
                                        </div>

                                        <div className="d-rev-dest-strip">
                                            <span className="d-rev-dest-pill">
                                                {rev.flag} {rev.destination}
                                            </span>
                                            <span className="d-rev-stars">
                                                {'★'.repeat(Math.round(rev.rating))} {rev.rating.toFixed(1)}
                                            </span>
                                            <span className="d-rev-telemetry">
                                                <Wifi size={12} /> {rev.wifiVerified}
                                            </span>
                                            <span className="d-rev-telemetry emerald">
                                                <DollarSign size={12} /> {rev.monthlySpend}
                                            </span>
                                        </div>

                                        <h3 className="d-rev-title">{rev.title}</h3>
                                        <p className="d-rev-comment">{rev.comment}</p>

                                        <div className="d-rev-tags">
                                            {(rev.tags || []).map((t, idx) => (
                                                <span key={idx} className="d-rev-tag">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="d-rev-footer">
                                            <button
                                                type="button"
                                                className={`d-rev-action ${liked ? 'liked' : ''}`}
                                                onClick={() => handleToggleLike(rev.id)}
                                            >
                                                <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                                                <span>{rev.likes + (liked ? 1 : 0)} Helpful</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="d-rev-action"
                                                onClick={() => navigate('/explore/trip-builder')}
                                            >
                                                <Sparkles size={14} />
                                                <span>Add City to Trip Builder</span>
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>

            {/* Write a Review Modal */}
            {isReviewModalOpen && (
                <div
                    className="discover-modal-backdrop"
                    onClick={() => setIsReviewModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="discover-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="discover-modal-header">
                            <div>
                                <h3>Write a Verified Traveler Review</h3>
                                <p>Share your workspace Wi-Fi speed, monthly spend, and neighborhood tips</p>
                            </div>
                            <button
                                type="button"
                                className="discover-modal-close"
                                onClick={() => setIsReviewModalOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handlePublishReview} className="discover-modal-form">
                            <div className="d-form-row">
                                <label>
                                    Destination
                                    <select
                                        value={newReview.destination}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, destination: e.target.value })
                                        }
                                    >
                                        <option value="Bali, Indonesia">🇮🇩 Bali, Indonesia</option>
                                        <option value="Kyoto, Japan">🇯🇵 Kyoto, Japan</option>
                                        <option value="Santorini, Greece">🇬🇷 Santorini, Greece</option>
                                        <option value="Machu Picchu, Peru">🇵🇪 Machu Picchu, Peru</option>
                                        <option value="Amalfi Coast, Italy">🇮🇹 Amalfi Coast, Italy</option>
                                        <option value="Lisbon, Portugal">🇵🇹 Lisbon, Portugal</option>
                                        <option value="Medellín, Colombia">🇨🇴 Medellín, Colombia</option>
                                    </select>
                                </label>
                                <label>
                                    Verified Wi-Fi Speed
                                    <input
                                        type="text"
                                        value={newReview.wifiVerified}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, wifiVerified: e.target.value })
                                        }
                                        placeholder="e.g. 320 Mbps"
                                    />
                                </label>
                                <label>
                                    Monthly Spend
                                    <input
                                        type="text"
                                        value={newReview.monthlySpend}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, monthlySpend: e.target.value })
                                        }
                                        placeholder="e.g. $1,750/mo"
                                    />
                                </label>
                            </div>

                            <label>
                                Review Headline
                                <input
                                    type="text"
                                    required
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    placeholder="Summarize your stay, best coworking cafe, or neighborhood tip..."
                                />
                            </label>

                            <label>
                                Detailed Field Report
                                <textarea
                                    rows={4}
                                    required
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="Share details on Wi-Fi reliability, safety, visa experience, and local spots..."
                                />
                            </label>

                            <div className="discover-modal-actions">
                                <button
                                    type="button"
                                    className="d-btn-cancel"
                                    onClick={() => setIsReviewModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="d-btn-submit">
                                    <Sparkles size={15} />
                                    <span>Publish Verified Review (+50 XP)</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularFeed;
