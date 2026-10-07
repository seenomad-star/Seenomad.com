import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    DollarSign,
    Shield,
    Wifi,
    ArrowRightLeft,
    Flame,
    Zap,
    CheckCircle2,
    Activity,
    SlidersHorizontal,
    Thermometer,
    Sun,
    CloudSun,
    Snowflake,
    Palmtree,
    Mountain,
    Building2,
    Laptop,
    Star,
    RotateCcw,
    Users,
    Clock,
    Crown,
    Trophy,
    Calendar,
    BookOpen,
    BarChart3,
    Bookmark,
    Sparkles,
    Compass,
    Check,
    Search,
    X,
    ArrowUpDown,
    LayoutGrid,
    List,
    Landmark,
    Phone,
    FileText,
    Plane,
    Map,
    Cpu,
    Dna,
    ShoppingBag,
    Briefcase,
    Rocket,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useNavStore } from '../../../store/navStore';
import { allDestinations } from '../../../data/destinationsData';
import './NomadDock.css';

// Explore Sub-Feature Metadata & Specific Filter Catalog for Vertical Pill • Page Filters
const EXPLORE_PAGE_FILTER_CATALOG = {
    'seenomad-multi': {
        title: 'Multi-Part Expedition Studio',
        icon: Map,
        placeholder: 'Search circuit templates, cities, transit legs...',
        filters: [
            { id: 'all', label: 'All Circuits' },
            { id: 'europe-schengen', label: 'Schengen 90d Safe' },
            { id: 'asia-corridor', label: 'Asia Fiber Corridor' },
            { id: 'americas-loop', label: 'Americas Timezone' },
            { id: 'rail-friendly', label: 'High-Speed Rail' },
            { id: 'under-2500', label: 'Under $2,500/mo Avg' }
        ],
        metrics: [
            { val: '4-Leg', lbl: 'Consecutive Routing' },
            { val: '90/180d', lbl: 'Schengen Guard' }
        ]
    },
    'triipper': {
        title: 'Triipper AI Itinerary Copilot',
        icon: Sparkles,
        placeholder: 'Search AI trip templates, durations, styles...',
        filters: [
            { id: 'all', label: 'All AI Plans' },
            { id: 'workcation', label: 'Deep Workcation' },
            { id: 'adventure', label: 'Adventure & Surf' },
            { id: 'cultural', label: 'Cultural Immersion' },
            { id: 'budget-lean', label: 'Lean Backpacker' },
            { id: 'luxury-exec', label: 'Executive Retreat' }
        ],
        metrics: [
            { val: 'Instant', lbl: 'Day-by-Day Plan' },
            { val: '98%', lbl: 'Budget Accuracy' }
        ]
    },
    'cultural-compass': {
        title: 'Cultural Compass & Etiquette',
        icon: Compass,
        placeholder: 'Search local customs, tipping, dress codes...',
        filters: [
            { id: 'all', label: 'All Guides' },
            { id: 'etiquette', label: 'Social Etiquette' },
            { id: 'tipping', label: 'Tipping & Payments' },
            { id: 'phrases', label: 'Essential Phrases' },
            { id: 'taboos', label: 'Local Laws & Taboos' },
            { id: 'business', label: 'Business Culture' }
        ],
        metrics: [
            { val: '195+', lbl: 'Cultural Briefs' },
            { val: 'Verified', lbl: 'Local Guardians' }
        ]
    },
    'story-studio': {
        title: 'Nomad Story Studio',
        icon: Rocket,
        placeholder: 'Search creator templates, reels, travelogs...',
        filters: [
            { id: 'all', label: 'All Formats' },
            { id: 'reels', label: '9:16 Vertical Reels' },
            { id: 'photo-essay', label: 'Photo Journals' },
            { id: 'cost-breakdown', label: 'Monthly Spend Logs' },
            { id: 'gear-setup', label: 'Nomad Tech Desk' }
        ],
        metrics: [
            { val: '4K HDR', lbl: 'Creator Export' },
            { val: '+250 XP', lbl: 'Per Published Story' }
        ]
    },
    'guardians': {
        title: 'Local Guardians Network',
        icon: ShieldCheck,
        placeholder: 'Search verified local fixers, translators, hosts...',
        filters: [
            { id: 'all', label: 'All Guardians' },
            { id: 'emergency-fixer', label: '24/7 Emergency Fixers' },
            { id: 'housing-scout', label: 'Lease & Apartment Scouts' },
            { id: 'translator', label: 'Legal & Medical Translators' },
            { id: 'verified-pro', label: 'Identity Verified' }
        ],
        metrics: [
            { val: '< 10m', lbl: 'Avg Response Time' },
            { val: '4.9★', lbl: 'Trust Rating' }
        ]
    },
    'super-agent': {
        title: 'Super Agent Autonomous Hub',
        icon: Cpu,
        placeholder: 'Search autonomous travel tasks, flight monitors...',
        filters: [
            { id: 'all', label: 'All Agents' },
            { id: 'flight-sniper', label: 'Fare Drop Sniper' },
            { id: 'visa-monitor', label: 'Embassy Slot Monitor' },
            { id: 'accommodation', label: 'Coliving Negotiator' },
            { id: 'tax-residency', label: '183-Day Tax Tracker' }
        ],
        metrics: [
            { val: '24/7', lbl: 'Autonomous Watch' },
            { val: 'Active', lbl: 'Multi-Agent Mesh' }
        ]
    },
    'challenges': {
        title: 'Viral Nomad Challenges',
        icon: Trophy,
        placeholder: 'Search active bounties, streaks, city quests...',
        filters: [
            { id: 'all', label: 'All Challenges' },
            { id: 'high-xp', label: '1,000+ XP Bounties' },
            { id: 'photo-quest', label: 'Landmark Verification' },
            { id: 'speed-test', label: 'Wi-Fi Speed Bounties' },
            { id: 'culinary', label: 'Street Food Quests' }
        ],
        metrics: [
            { val: '2.5x', lbl: 'XP Multiplier' },
            { val: 'Live', lbl: 'Global Leaderboard' }
        ]
    },
    'perks': {
        title: 'Nomad Perks & Partner Deals',
        icon: ShoppingBag,
        placeholder: 'Search eSIMs, lounge passes, coliving discounts...',
        filters: [
            { id: 'all', label: 'All Perks' },
            { id: 'esim', label: 'Global Data eSIMs' },
            { id: 'coworking-pass', label: 'Coworking Day Passes' },
            { id: 'coliving-deals', label: 'Monthly Stay Discounts' },
            { id: 'insurance', label: 'Nomad Health & Gear' },
            { id: 'lounge', label: 'Airport Lounge Access' }
        ],
        metrics: [
            { val: 'Up to 40%', lbl: 'Member Savings' },
            { val: 'Instant', lbl: 'Code Redemption' }
        ]
    },
    'discovery': {
        title: 'Discovery Hub & Hidden Gems',
        icon: Rocket,
        placeholder: 'Search emerging hubs, off-grid islands, towns...',
        filters: [
            { id: 'all', label: 'All Gems' },
            { id: 'emerging-2026', label: 'Emerging 2026 Hubs' },
            { id: 'under-1000', label: 'Under $1,000/mo' },
            { id: 'coastal-quiet', label: 'Uncrowded Coastlines' },
            { id: 'mountain-retreat', label: 'Alpine & Highland' }
        ],
        metrics: [
            { val: '120+', lbl: 'Off-Grid Spots' },
            { val: 'Starlink', lbl: 'Verified Ready' }
        ]
    },
    'dna': {
        title: 'Nomad DNA & Persona Profile',
        icon: Dna,
        placeholder: 'Filter compatibility traits, climate & pace...',
        filters: [
            { id: 'all', label: 'Full DNA Matrix' },
            { id: 'chronotype', label: 'Timezone & Chronotype' },
            { id: 'climate-match', label: 'Biometric Climate Fit' },
            { id: 'budget-velocity', label: 'Spend Velocity' },
            { id: 'social-density', label: 'Community Density' }
        ],
        metrics: [
            { val: '96%', lbl: 'Match Precision' },
            { val: 'Dynamic', lbl: 'Trait Weighting' }
        ]
    },
    'events': {
        title: 'Nomad Events & Pop-Up Villages',
        icon: Users,
        placeholder: 'Search pop-up cities, hacker houses, meetups...',
        filters: [
            { id: 'all', label: 'All Gatherings' },
            { id: 'popup-city', label: 'Pop-Up Villages' },
            { id: 'conferences', label: 'Nomad Summits' },
            { id: 'cowork-meetup', label: 'Weekly Coffee & Cowork' },
            { id: 'founder-dinner', label: 'Founder Masterminds' }
        ],
        metrics: [
            { val: '85+', lbl: 'Active Cities' },
            { val: 'Verified', lbl: 'RSVP Guestlists' }
        ]
    },
    'passport': {
        title: 'Nomad Sovereign Passport & Vault',
        icon: Shield,
        placeholder: 'Search stamps, residency days, tax thresholds...',
        filters: [
            { id: 'all', label: 'All Records' },
            { id: 'schengen-clock', label: 'Schengen 90/180 Clock' },
            { id: 'tax-183', label: '183-Day Tax Thresholds' },
            { id: 'visa-expiry', label: 'Visa Renewal Alerts' },
            { id: 'stamps', label: 'Verified NFT Stamps' }
        ],
        metrics: [
            { val: 'AES-256', lbl: 'Zero-Knowledge Vault' },
            { val: 'Live', lbl: 'Day Counter' }
        ]
    },
    'twin': {
        title: 'AI Digital Twin Simulation',
        icon: Cpu,
        placeholder: 'Simulate relocation scenarios, cost & lifestyle...',
        filters: [
            { id: 'all', label: 'All Simulations' },
            { id: 'cost-projection', label: '12-Month Savings Sim' },
            { id: 'tax-optimization', label: 'Tax Residency Comparison' },
            { id: 'quality-of-life', label: 'Wellness & Productivity' }
        ],
        metrics: [
            { val: '10,000x', lbl: 'Monte Carlo Runs' },
            { val: 'Real-Time', lbl: 'Telemetry Sync' }
        ]
    },
    'trivenly': {
        title: 'Trivenly Creator & Guide Market',
        icon: Briefcase,
        placeholder: 'Search vetted local guides, lut packs, blueprints...',
        filters: [
            { id: 'all', label: 'All Marketplace' },
            { id: 'city-playbooks', label: 'Nomad City Playbooks' },
            { id: 'relocation-consult', label: '1-on-1 Visa Consults' },
            { id: 'apartment-tours', label: 'Live Video Flat Checks' },
            { id: 'top-rated', label: '4.9★ Top Creators' }
        ],
        metrics: [
            { val: 'Escrow', lbl: 'Protected Booking' },
            { val: '100%', lbl: 'Verified Locals' }
        ]
    },
    'flights-visa': {
        title: 'Flights & Visa Pairing Matrix',
        icon: Plane,
        placeholder: 'Search routes, onward tickets, transit rules...',
        filters: [
            { id: 'all', label: 'All Routes' },
            { id: 'visa-free-hops', label: 'Visa-Free Direct Hops' },
            { id: 'onward-ticket', label: 'Verifiable Onward Ticket' },
            { id: 'no-transit-visa', label: 'Zero Transit Visa Needed' },
            { id: 'star-alliance', label: 'Nomad Frequent Flyer' }
        ],
        metrics: [
            { val: 'Live', lbl: 'IATA Timatic Sync' },
            { val: 'Instant', lbl: 'Route Clearance' }
        ]
    },
    'travel-bug': {
        title: 'Travel Bug AI Discovery Engine',
        icon: Zap,
        placeholder: 'Search spontaneous flight drops, mystery hops...',
        filters: [
            { id: 'all', label: 'All Sparks' },
            { id: 'weekend-escape', label: '72-Hour Micro-Trips' },
            { id: 'error-fares', label: 'Flash Fare Anomalies' },
            { id: 'warm-now', label: '28°C+ Right Now' },
            { id: 'high-match', label: '95%+ AI Vibe Match' }
        ],
        metrics: [
            { val: 'Real-Time', lbl: 'Anomaly Scanner' },
            { val: 'Instant', lbl: '1-Click Pack List' }
        ]
    },
    'trip-builder': {
        title: 'Modular Trip Builder & Resource Studio',
        icon: Palmtree,
        placeholder: 'Search flights, coliving, 24/7 coworking, visa & insurance...',
        filters: [
            { id: 'all', label: 'All Resource Modules' },
            { id: 'transit', label: 'Flights & Rail Transit' },
            { id: 'coliving', label: 'Coliving & Verified Stays' },
            { id: 'coworking', label: '24/7 Fiber & eSIMs' },
            { id: 'insurance', label: 'Visa & Medical Cover' },
            { id: 'activities', label: 'Local Fixers & Immersion' }
        ],
        metrics: [
            { val: 'Live', lbl: 'Budget & Burn Sync' },
            { val: 'Verified', lbl: 'Nomad Resource Hub' }
        ]
    },
    'ai-studio': {
        title: 'Nomad AI Command Studio (4-in-1)',
        icon: Sparkles,
        placeholder: 'Filter AI engines: Triipper, Super Agent, Twin, Travel Bug...',
        filters: [
            { id: 'all', label: 'All 4 AI Engines' },
            { id: 'triipper', label: 'Triipper AI Planner' },
            { id: 'super-agent', label: 'Super Agent & Vault' },
            { id: 'digital-twin', label: 'AI Digital Twin' },
            { id: 'travel-bug', label: 'Travel Bug (Link-to-Map)' }
        ],
        metrics: [
            { val: '4-in-1', lbl: 'Unified AI Mesh' },
            { val: '24/7', lbl: 'Autopilot Active' }
        ]
    },
    'culture-community': {
        title: 'Culture, Local Guardians & Events Suite (4-in-1)',
        icon: Users,
        placeholder: 'Filter Cultural Compass, Guardians, Events & Story Studio...',
        filters: [
            { id: 'all', label: 'All 4 Community Modules' },
            { id: 'cultural-compass', label: 'Cultural Compass' },
            { id: 'guardians', label: 'Local Guardians' },
            { id: 'events', label: 'Nomad Events' },
            { id: 'story-studio', label: 'Story Studio' }
        ],
        metrics: [
            { val: '4-in-1', lbl: 'Community Suite' },
            { val: '195+', lbl: 'Verified Briefs' }
        ]
    },
    'passport-perks': {
        title: 'Passport, DNA, Perks & Challenges Suite (4-in-1)',
        icon: Shield,
        placeholder: 'Filter Nomad Passport, DNA Matrix, Perks & Challenges...',
        filters: [
            { id: 'all', label: 'All 4 Identity Modules' },
            { id: 'passport', label: 'Nomad Passport' },
            { id: 'dna', label: 'Nomad DNA' },
            { id: 'perks', label: 'Nomad Perks' },
            { id: 'challenges', label: 'Viral Challenges' }
        ],
        metrics: [
            { val: '4-in-1', lbl: 'Identity & Perks' },
            { val: 'Up to 40%', lbl: 'Partner Savings' }
        ]
    },
    'connectivity-market': {
        title: 'Connectivity, Discovery & Market Suite (4-in-1)',
        icon: Wifi,
        placeholder: 'Filter Speed Test Map, Discovery, Trivenly & Flights...',
        filters: [
            { id: 'all', label: 'All 4 Infrastructure Modules' },
            { id: 'speed-test', label: 'Speed Test Map' },
            { id: 'discovery', label: 'Discovery Hub' },
            { id: 'trivenly', label: 'Trivenly Market' },
            { id: 'flights-visa', label: 'Flights & Visa' }
        ],
        metrics: [
            { val: '4-in-1', lbl: 'Connectivity Suite' },
            { val: '100+ Mbps', lbl: 'Verified Fiber' }
        ]
    }
};

const NomadDock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dockRef = useRef(null);

    const { dailyStreak, dailyXP } = useNomadOSStore();
    const {
        searchQuery,
        setSearchQuery,
        selectedFilters,
        toggleFilter,
        setSelectedFilters,
        advancedFilters,
        toggleAdvancedFilter,
        setMinInternetSpeed,
        setMaxMonthlyCost,
        domainStatus,
        setDomainStatus,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        resetFilters,
        setIsFilterDrawerOpen,
        compareDestinations,
        setIsCompareModalOpen
    } = useDestinationStore();

    const {
        globalSearchQuery,
        globalActiveFilters,
        setGlobalActiveFilters,
        setGlobalSearchQuery
    } = useNavStore();

    const [activeTool, setActiveTool] = useState(null);
    const [pinnedTool, setPinnedTool] = useState(null);
    const [destinationsFoundCount, setDestinationsFoundCount] = useState(allDestinations.length);

    // Embassy-specific filter state synced with Embassy.jsx via custom events
    const [embassyFilters, setEmbassyFilters] = useState({
        search: '',
        region: 'All Regions',
        service: 'all',
        citizenPassport: 'Global Nomad Passport',
        waitTime: 'all',
        count: 10
    });

    // Sync live destinations count from Destinations page
    useEffect(() => {
        const handleCountUpdate = (e) => {
            if (typeof e.detail?.count === 'number') {
                setDestinationsFoundCount(e.detail.count);
            }
        };
        const handleEmbassyCount = (e) => {
            if (typeof e.detail?.count === 'number') {
                setEmbassyFilters((prev) => ({ ...prev, count: e.detail.count }));
            }
        };
        const handleEmbassySearchSync = (e) => {
            if (typeof e.detail?.search === 'string') {
                setEmbassyFilters((prev) => ({ ...prev, search: e.detail.search }));
            }
        };
        window.addEventListener('destinations:count', handleCountUpdate);
        window.addEventListener('embassy:count', handleEmbassyCount);
        window.addEventListener('embassy:search-sync', handleEmbassySearchSync);
        return () => {
            window.removeEventListener('destinations:count', handleCountUpdate);
            window.removeEventListener('embassy:count', handleEmbassyCount);
            window.removeEventListener('embassy:search-sync', handleEmbassySearchSync);
        };
    }, []);

    const updateEmbassyFilter = (patch) => {
        setEmbassyFilters((prev) => {
            const next = { ...prev, ...patch };
            window.dispatchEvent(new CustomEvent('embassy:filter-change', { detail: next }));
            return next;
        });
    };

    const dailyGoal = 100;
    const progress = Math.min((dailyXP / dailyGoal) * 100, 100);

    // Close pinned popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dockRef.current && !dockRef.current.contains(e.target)) {
                setPinnedTool(null);
                setActiveTool(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close open tool on route change
    useEffect(() => {
        setPinnedTool(null);
        setActiveTool(null);
    }, [location.pathname]);

    const pathname = location.pathname.toLowerCase();

    // Determine exact page context for every Explore navbar feature and global module
    const getPageContext = () => {
        if (pathname.includes('/explore/embassy')) return 'embassy';
        if (pathname.includes('/compare')) return 'compare';
        if (pathname.includes('/explore/visa') || pathname.startsWith('/visa')) return 'visa';
        if (pathname.includes('/explore/speed-test')) return 'speed-test';
        if (pathname.includes('/explore/seenomad-multi') || pathname.includes('/explore/multi-')) return 'seenomad-multi';
        if (pathname.includes('/explore/ai-studio') || pathname.includes('/explore/nomad-ai')) return 'ai-studio';
        if (pathname.includes('/explore/triipper')) return 'ai-studio';
        if (pathname.includes('/explore/cultural-compass')) return 'cultural-compass';
        if (pathname.includes('/explore/story-studio')) return 'story-studio';
        if (pathname.includes('/explore/guardians') || pathname.includes('/explore/local-guardians')) return 'guardians';
        if (pathname.includes('/explore/super-agent')) return 'super-agent';
        if (pathname.includes('/explore/challenges') || pathname.includes('/explore/viral-challenges')) return 'challenges';
        if (pathname.includes('/explore/perks') || pathname.includes('/explore/nomad-perks')) return 'perks';
        if (pathname.includes('/explore/discovery')) return 'discovery';
        if (pathname.includes('/explore/dna') || pathname.includes('/explore/nomad-dna')) return 'dna';
        if (pathname.includes('/explore/events') || pathname.includes('/explore/nomad-events')) return 'events-explore';
        if (pathname.includes('/explore/passport') || pathname.includes('/explore/nomad-passport')) return 'passport';
        if (pathname.includes('/explore/twin') || pathname.includes('/explore/ai-digital-twin')) return 'twin';
        if (pathname.includes('/explore/trivenly')) return 'trivenly';
        if (pathname.includes('/explore/flights-visa')) return 'flights-visa';
        if (pathname.includes('/explore/travel-bug')) return 'travel-bug';
        if (pathname.includes('/explore/trip-builder')) return 'trip-builder';
        if (pathname.startsWith('/explore') || pathname.startsWith('/destinations')) return 'destinations';
        if (pathname === '/' || pathname.startsWith('/feed')) return 'feed';
        if (pathname.startsWith('/popular')) return 'popular';
        if (pathname.startsWith('/saved') || pathname.startsWith('/favorites')) return 'saved';
        if (pathname.startsWith('/travel-games')) return 'games';
        if (pathname.startsWith('/event-festival')) return 'events';
        if (pathname.startsWith('/learning-voluntourism')) return 'learning';
        if (pathname.startsWith('/community')) return 'community';
        if (pathname.startsWith('/insights-analytics')) return 'analytics';
        return 'destinations';
    };

    const pageContext = getPageContext();

    // Sync helper for toggling destination / global filters
    const handleToggleQuickFilter = (filterId) => {
        toggleFilter(filterId);
        const next = globalActiveFilters.includes(filterId)
            ? globalActiveFilters.filter((f) => f !== filterId)
            : [...globalActiveFilters, filterId];
        setGlobalActiveFilters(next);

        window.dispatchEvent(new CustomEvent('nomaddock:filter', { detail: { filterId, pageContext } }));
    };

    const handleResetAllPageFilters = () => {
        resetFilters();
        setGlobalActiveFilters([]);
        setGlobalSearchQuery('');
        if (pageContext === 'embassy') {
            const resetEmb = {
                search: '',
                region: 'All Regions',
                service: 'all',
                citizenPassport: 'Global Nomad Passport',
                waitTime: 'all',
                count: 10
            };
            setEmbassyFilters(resetEmb);
            window.dispatchEvent(new CustomEvent('embassy:filter-change', { detail: resetEmb }));
        }
        window.dispatchEvent(new CustomEvent('nomaddock:reset', { detail: { pageContext } }));
    };

    const climates = advancedFilters?.climates || [];
    const budgetRanges = advancedFilters?.budgetRanges || [];
    const internetSpeeds = advancedFilters?.internetSpeeds || [];
    const regions = advancedFilters?.regions || [];
    const minInternetSpeed = advancedFilters?.minInternetSpeed ?? 0;
    const maxMonthlyCost = advancedFilters?.maxMonthlyCost ?? 5000;

    const embassyActiveCount =
        (embassyFilters.search ? 1 : 0) +
        (embassyFilters.region !== 'All Regions' ? 1 : 0) +
        (embassyFilters.service !== 'all' ? 1 : 0) +
        (embassyFilters.waitTime !== 'all' ? 1 : 0) +
        (embassyFilters.citizenPassport !== 'Global Nomad Passport' ? 1 : 0);

    const totalActiveFilters =
        pageContext === 'embassy'
            ? embassyActiveCount
            : selectedFilters.length +
              globalActiveFilters.length +
              climates.length +
              budgetRanges.length +
              internetSpeeds.length +
              regions.length +
              (minInternetSpeed > 0 ? 1 : 0) +
              (maxMonthlyCost < 5000 ? 1 : 0) +
              (domainStatus && domainStatus !== 'all' ? 1 : 0) +
              (searchQuery || globalSearchQuery ? 1 : 0);

    // Build page-specific filter tools dynamically based on current route
    const getPageSpecificFilterTools = () => {
        // 1. EMBASSY DIRECTORY & CONSULAR INTELLIGENCE SPECIFIC VERTICAL PILL FILTERS
        if (pageContext === 'embassy') {
            return [
                {
                    id: 'filter-embassy-search',
                    icon: Search,
                    badgeCount: (embassyFilters.search ? 1 : 0) + (embassyFilters.citizenPassport !== 'Global Nomad Passport' ? 1 : 0),
                    label: 'Global Embassy Search & Passport',
                    subtitle: `${embassyFilters.count} Diplomatic Jurisdictions Active`,
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-search-input-wrap">
                                <Search size={14} className="dock-search-icon" />
                                <input
                                    type="text"
                                    value={embassyFilters.search}
                                    onChange={(e) => updateEmbassyFilter({ search: e.target.value })}
                                    placeholder="Search country, chancery, D8, DTV..."
                                    className="dock-search-input"
                                />
                                {embassyFilters.search && (
                                    <button
                                        type="button"
                                        className="dock-search-clear"
                                        onClick={() => updateEmbassyFilter({ search: '' })}
                                        aria-label="Clear embassy search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            <div className="dock-sub-label">CITIZENSHIP / PASSPORT ORIGIN</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    'Global Nomad Passport',
                                    'United States',
                                    'United Kingdom',
                                    'European Union',
                                    'India',
                                    'Canada / Australia'
                                ].map((pass) => {
                                    const isSelected = embassyFilters.citizenPassport === pass;
                                    return (
                                        <button
                                            key={pass}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => updateEmbassyFilter({ citizenPassport: pass })}
                                        >
                                            <span>{pass === 'Global Nomad Passport' ? 'All Passports' : pass}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-embassy-services',
                    icon: Landmark,
                    badgeCount: embassyFilters.service !== 'all' ? 1 : 0,
                    label: 'Consular & Visa Services Filter',
                    subtitle: 'Filter Missions by Diplomatic Capability',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'all', label: 'All Diplomatic Missions', sub: 'Full Global Embassy Directory', icon: Globe },
                                    { id: 'nomad-visa', label: 'Digital Nomad Visa Desks', sub: 'D8, DTV, E33G, VITEM XIV, Startup Law', icon: Plane },
                                    { id: 'visa-services', label: 'Fast-Track e-Visa Hubs', sub: 'Online visa issuance & biometric slots', icon: FileText },
                                    { id: 'emergency', label: '24/7 Emergency Citizen Desk', sub: 'Lost passport & crisis evacuation', icon: AlertCircle },
                                    { id: 'passport', label: 'Passport Renewal & Notary', sub: 'Apostille, legalization & extra pages', icon: ShieldCheck },
                                    { id: 'citizenship', label: 'Residency & Golden Visa', sub: 'Long-term PR & Golden Visa desks', icon: Crown }
                                ].map((srv) => {
                                    const Icon = srv.icon;
                                    const isSelected = embassyFilters.service === srv.id;
                                    return (
                                        <button
                                            key={srv.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => updateEmbassyFilter({ service: srv.id })}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{srv.label}</span>
                                                <span className="row-sub">{srv.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-embassy-regions',
                    icon: Globe,
                    badgeCount: (embassyFilters.region !== 'All Regions' ? 1 : 0) + (embassyFilters.waitTime !== 'all' ? 1 : 0),
                    label: 'Jurisdiction Region & Wait Time',
                    subtitle: 'Filter by World Region & Processing Speed',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-sub-label">DIPLOMATIC JURISDICTION REGION</div>
                            <div className="dock-filter-chips-grid">
                                {['All Regions', 'Europe', 'Asia', 'Americas', 'Middle East'].map((reg) => {
                                    const isSelected = embassyFilters.region === reg;
                                    return (
                                        <button
                                            key={reg}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => updateEmbassyFilter({ region: reg })}
                                        >
                                            <span>{reg}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="dock-sub-label" style={{ marginTop: '0.6rem' }}>APPOINTMENT & PROCESSING SPEED</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'Any Speed' },
                                    { id: 'instant', label: 'Instant / 72h e-Visa' },
                                    { id: 'fast', label: 'Under 10 Days' },
                                    { id: 'high-approval', label: '95%+ Approval Rate' }
                                ].map((wt) => {
                                    const isSelected = embassyFilters.waitTime === wt.id;
                                    return (
                                        <button
                                            key={wt.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => updateEmbassyFilter({ waitTime: wt.id })}
                                        >
                                            <span>{wt.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-embassy-hotlines',
                    icon: Phone,
                    badgeCount: 0,
                    label: 'Emergency Consular Hotlines',
                    subtitle: 'Direct 24/7 Diplomatic Dispatch Numbers',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { country: '🇵🇹 Portugal Chancery', phone: '+351 21 792 9700' },
                                    { country: '🇯🇵 Japan MOFA Consular', phone: '+81 3-3580-3311' },
                                    { country: '🇮🇩 Indonesia Kemlu Desk', phone: '+62 21 344 1508' },
                                    { country: '🇹🇭 Thailand Consular Call', phone: '+66 2 203 5000' },
                                    { country: '🇪🇸 Spain MAEC Emergency', phone: '+34 91 379 9700' }
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="dock-filter-row-btn"
                                        onClick={() => {
                                            navigator.clipboard?.writeText(item.phone);
                                        }}
                                        title="Click to copy emergency number"
                                    >
                                        <Phone size={13} className="row-icon" />
                                        <div className="row-text">
                                            <span className="row-title">{item.country}</span>
                                            <span className="row-sub">{item.phone} (Click to copy)</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                }
            ];
        }

        // 2. DESTINATIONS & COMPARE DESTINATIONS SPECIFIC VERTICAL PILL FILTERS
        if (pageContext === 'destinations' || pageContext === 'compare') {
            return [
                {
                    id: 'filter-search-sort',
                    icon: Search,
                    badgeCount: (searchQuery ? 1 : 0) + (sortBy && sortBy !== 'featured' ? 1 : 0),
                    label: 'Search, Sort & View Controls',
                    subtitle: `${destinationsFoundCount} ${destinationsFoundCount === 1 ? 'destination' : 'destinations'} found`,
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-search-input-wrap">
                                <Search size={14} className="dock-search-icon" />
                                <input
                                    type="text"
                                    value={searchQuery || ''}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setGlobalSearchQuery(e.target.value);
                                    }}
                                    placeholder="Search destinations, countries, vibes..."
                                    className="dock-search-input"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="dock-search-clear"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setGlobalSearchQuery('');
                                        }}
                                        aria-label="Clear search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            <div className="dock-status-meta-row">
                                <span className="dock-results-count-pill">
                                    <strong>{destinationsFoundCount}</strong> destinations found
                                </span>
                                <button
                                    type="button"
                                    className="dock-compare-link-btn"
                                    onClick={() => {
                                        setIsCompareModalOpen(true);
                                        setPinnedTool(null);
                                        setActiveTool(null);
                                    }}
                                >
                                    <ArrowRightLeft size={12} />
                                    <span>Compare Side-by-Side</span>
                                </button>
                            </div>

                            {compareDestinations && compareDestinations.length > 0 && (
                                <div className="dock-compare-slots-box">
                                    <div className="dock-compare-slots-row">
                                        {[0, 1].map((slotIdx) => {
                                            const destId = compareDestinations[slotIdx];
                                            const found = allDestinations.find((d) => d.id === Number(destId));
                                            return found ? (
                                                <span key={slotIdx} className="dock-compare-slot-chip">
                                                    {found.name}
                                                </span>
                                            ) : (
                                                <span key={slotIdx} className="dock-compare-slot-chip empty">
                                                    Select 2nd City
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <button
                                        type="button"
                                        className="dock-compare-side-by-side-btn"
                                        onClick={() => {
                                            setIsCompareModalOpen(true);
                                            setPinnedTool(null);
                                            setActiveTool(null);
                                        }}
                                    >
                                        <ArrowRightLeft size={12} />
                                        <span>Compare Side-by-Side</span>
                                    </button>
                                </div>
                            )}

                            <div className="dock-sub-label">SORT & VIEW LAYOUT</div>
                            <div className="dock-sort-view-row">
                                <div className="dock-sort-select-wrap">
                                    <ArrowUpDown size={13} className="dock-sort-icon" />
                                    <select
                                        value={sortBy || 'featured'}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="dock-sort-select"
                                        aria-label="Sort destinations"
                                    >
                                        <option value="featured">Featured / Match</option>
                                        <option value="rating">Highest Rated (★)</option>
                                        <option value="popular">Most Popular / Live</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Alphabetical (A-Z)</option>
                                    </select>
                                </div>
                                <div className="dock-view-toggle-group">
                                    <button
                                        type="button"
                                        className={`dock-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                        title="Grid View"
                                    >
                                        <LayoutGrid size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className={`dock-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                        title="List View"
                                    >
                                        <List size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-categories',
                    icon: Compass,
                    badgeCount: selectedFilters.length,
                    label: 'Category & Vibe Filter Pills',
                    subtitle: `${destinationsFoundCount} destinations found`,
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'ALL' },
                                    { id: 'my-favorites', label: 'MY FAVORITES ★' },
                                    { id: 'cheap', label: 'CHEAP', sub: '<$1K' },
                                    { id: 'fast-internet', label: 'FAST INTERNET', sub: '100+ MBPS' },
                                    { id: 'warm-climate', label: 'WARM CLIMATE', sub: '25°C+' },
                                    { id: 'beach', label: 'BEACHES' },
                                    { id: 'mountain', label: 'MOUNTAINS' },
                                    { id: 'city', label: 'TECH CITIES' },
                                    { id: 'visa-friendly', label: 'VISA FREE' },
                                    { id: 'nomad-hub', label: 'NOMAD HUBS' },
                                    { id: 'trending', label: 'TRENDING' },
                                    { id: 'nightlife', label: 'NIGHTLIFE' }
                                ].map((item) => {
                                    const isActive = item.id === 'all'
                                        ? selectedFilters.length === 0
                                        : selectedFilters.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => {
                                                if (item.id === 'all') {
                                                    setSelectedFilters([]);
                                                    setGlobalActiveFilters([]);
                                                } else {
                                                    handleToggleQuickFilter(item.id);
                                                }
                                            }}
                                        >
                                            <span>{item.label}</span>
                                            {item.sub && (
                                                <span className="dock-chip-mini-badge">{item.sub}</span>
                                            )}
                                            {isActive && item.id !== 'all' && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-climate',
                    icon: Thermometer,
                    badgeCount: climates.length,
                    label: 'Climate Type Filter',
                    subtitle: 'Filter by Weather & Seasonality',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'tropical', label: 'Tropical & Coastal', sub: '26°C – 32°C', icon: Sun },
                                    { id: 'temperate', label: 'Temperate & Mild', sub: '18°C – 25°C', icon: CloudSun },
                                    { id: 'arid', label: 'Arid & Desert Sun', sub: '28°C – 36°C', icon: Flame },
                                    { id: 'alpine', label: 'Alpine & Cool', sub: '5°C – 17°C', icon: Snowflake }
                                ].map((c) => {
                                    const Icon = c.icon;
                                    const isSelected = climates.includes(c.id);
                                    return (
                                        <button
                                            key={c.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('climates', c.id)}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{c.label}</span>
                                                <span className="row-sub">{c.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-cost',
                    icon: DollarSign,
                    badgeCount: budgetRanges.length + (maxMonthlyCost < 5000 ? 1 : 0),
                    label: 'Cost-of-Living Index',
                    subtitle: maxMonthlyCost < 5000 ? `Ceiling: ≤ $${maxMonthlyCost.toLocaleString()}/mo` : 'Monthly Budget Ceiling & Tiers',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-slider-box">
                                <div className="dock-slider-top">
                                    <span>Max Monthly Cost</span>
                                    <strong>{maxMonthlyCost >= 5000 ? 'Any ($5k+)' : `$${maxMonthlyCost.toLocaleString()}/mo`}</strong>
                                </div>
                                <input
                                    type="range"
                                    min="600"
                                    max="5000"
                                    step="100"
                                    value={maxMonthlyCost}
                                    onChange={(e) => setMaxMonthlyCost(Number(e.target.value))}
                                    className="dock-range-slider"
                                />
                            </div>
                            <div className="dock-filter-list">
                                {[
                                    { id: 'budget', label: 'Low Cost Index', sub: 'Under $1,200 / mo' },
                                    { id: 'mid-range', label: 'Moderate Index', sub: '$1,200 – $2,200 / mo' },
                                    { id: 'luxury', label: 'Premium / Western', sub: '$2,200+ / mo' }
                                ].map((tier) => {
                                    const isSelected = budgetRanges.includes(tier.id);
                                    return (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('budgetRanges', tier.id)}
                                        >
                                            <DollarSign size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tier.label}</span>
                                                <span className="row-sub">{tier.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-wifi',
                    icon: Wifi,
                    badgeCount: internetSpeeds.length + (minInternetSpeed > 0 ? 1 : 0),
                    label: 'Internet Speed Filter',
                    subtitle: minInternetSpeed > 0 ? `Minimum: ${minInternetSpeed}+ Mbps` : 'Fiber & Remote Work Connectivity',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-slider-box">
                                <div className="dock-slider-top">
                                    <span>Min Download Speed</span>
                                    <strong>{minInternetSpeed > 0 ? `${minInternetSpeed}+ Mbps` : 'Any Speed'}</strong>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="250"
                                    step="25"
                                    value={minInternetSpeed}
                                    onChange={(e) => setMinInternetSpeed(Number(e.target.value))}
                                    className="dock-range-slider"
                                />
                            </div>
                            <div className="dock-filter-list">
                                {[
                                    { id: 'standard', label: '50+ Mbps', sub: 'HD Calls & Remote Work' },
                                    { id: 'fast', label: '150+ Mbps', sub: 'Fast Fiber & Cloud Sync' },
                                    { id: 'ultrafast', label: '250+ Mbps', sub: 'Gigabit Hubs & 4K Creator' }
                                ].map((tier) => {
                                    const isSelected = internetSpeeds.includes(tier.id);
                                    return (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('internetSpeeds', tier.id)}
                                        >
                                            <Wifi size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tier.label}</span>
                                                <span className="row-sub">{tier.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-regions-status',
                    icon: Globe,
                    badgeCount: regions.length + (domainStatus && domainStatus !== 'all' ? 1 : 0),
                    label: 'Region & Visa / Domain Filter',
                    subtitle: 'World Regions & Availability',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-sub-label">WORLD REGIONS</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'asia', label: 'Asia' },
                                    { id: 'europe', label: 'Europe' },
                                    { id: 'americas', label: 'Americas' },
                                    { id: 'africa', label: 'Africa' },
                                    { id: 'oceania', label: 'Oceania' }
                                ].map((reg) => {
                                    const isSelected = regions.includes(reg.id);
                                    return (
                                        <button
                                            key={reg.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('regions', reg.id)}
                                        >
                                            <span>{reg.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="dock-sub-label" style={{ marginTop: '0.6rem' }}>DOMAIN STATUS</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All' },
                                    { id: 'available', label: 'Available' },
                                    { id: 'premium', label: 'Premium' },
                                    { id: 'taken', label: 'Taken' }
                                ].map((st) => {
                                    const isSelected = (domainStatus || 'all') === st.id;
                                    return (
                                        <button
                                            key={st.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => setDomainStatus(st.id)}
                                        >
                                            <span>{st.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-drawer-launch',
                    icon: SlidersHorizontal,
                    badgeCount: totalActiveFilters,
                    label: 'Full Filter Drawer & Compare',
                    subtitle: 'Open Slide-Out Panel or Compare Tool',
                    content: (
                        <div className="dock-filter-panel">
                            <button
                                type="button"
                                className="dock-cta-btn primary"
                                onClick={() => {
                                    setIsFilterDrawerOpen(true);
                                    setPinnedTool(null);
                                    setActiveTool(null);
                                }}
                            >
                                <SlidersHorizontal size={14} />
                                <span>Open Slide-Out Filter Panel</span>
                            </button>
                            <button
                                type="button"
                                className="dock-cta-btn secondary"
                                onClick={() => {
                                    setIsCompareModalOpen(true);
                                    setPinnedTool(null);
                                    setActiveTool(null);
                                }}
                            >
                                <ArrowRightLeft size={14} />
                                <span>Compare Destinations Side-by-Side</span>
                            </button>
                            {totalActiveFilters > 0 && (
                                <button
                                    type="button"
                                    className="dock-cta-btn reset"
                                    onClick={handleResetAllPageFilters}
                                >
                                    <RotateCcw size={13} />
                                    <span>Reset All Active Filters ({totalActiveFilters})</span>
                                </button>
                            )}
                        </div>
                    )
                }
            ];
        }

        // 3. OTHER EXPLORE NAVBAR PAGES (SeeNomad Multi, Triipper AI, Cultural Compass, Story Studio, Local Guardians, Super Agent, Viral Challenges, Nomad Perks, Discovery Hub, Nomad DNA, Nomad Events, Nomad Passport, AI Digital Twin, Trivenly Market, Flights & Visa, Travel Bug, Trip Builder)
        const exploreCatalogKey = pageContext === 'events-explore' ? 'events' : pageContext;
        if (EXPLORE_PAGE_FILTER_CATALOG[exploreCatalogKey]) {
            const cfg = EXPLORE_PAGE_FILTER_CATALOG[exploreCatalogKey];
            const FeatureIcon = cfg.icon;
            return [
                {
                    id: `filter-${exploreCatalogKey}-search`,
                    icon: Search,
                    badgeCount: globalSearchQuery ? 1 : 0,
                    label: `${cfg.title} Search`,
                    subtitle: 'Instant Page-Specific Keyword Filter',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-search-input-wrap">
                                <Search size={14} className="dock-search-icon" />
                                <input
                                    type="text"
                                    value={globalSearchQuery || ''}
                                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                                    placeholder={cfg.placeholder}
                                    className="dock-search-input"
                                />
                                {globalSearchQuery && (
                                    <button
                                        type="button"
                                        className="dock-search-clear"
                                        onClick={() => setGlobalSearchQuery('')}
                                        aria-label="Clear search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                            <div className="dock-domain-kpi-grid" style={{ marginTop: '0.5rem' }}>
                                {cfg.metrics.map((m, i) => (
                                    <div key={i} className="dock-kpi-card">
                                        <span className="dock-kpi-value">{m.val}</span>
                                        <span className="dock-kpi-label">{m.lbl}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                },
                {
                    id: `filter-${exploreCatalogKey}-pills`,
                    icon: FeatureIcon,
                    badgeCount: globalActiveFilters.length,
                    label: `${cfg.title} Filters`,
                    subtitle: 'Page-Specific Filter Controls',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {cfg.filters.map((f) => {
                                    const isActive = f.id === 'all'
                                        ? globalActiveFilters.length === 0
                                        : globalActiveFilters.includes(f.id);
                                    return (
                                        <button
                                            key={f.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => {
                                                if (f.id === 'all') {
                                                    setGlobalActiveFilters([]);
                                                } else {
                                                    handleToggleQuickFilter(f.id);
                                                }
                                            }}
                                        >
                                            <span>{f.label}</span>
                                            {isActive && f.id !== 'all' && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: `filter-${exploreCatalogKey}-regions`,
                    icon: Globe,
                    badgeCount: regions.length,
                    label: 'Target Region Filter',
                    subtitle: `Filter ${cfg.title} by Region`,
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'asia', label: 'Asia' },
                                    { id: 'europe', label: 'Europe' },
                                    { id: 'americas', label: 'Americas' },
                                    { id: 'africa', label: 'Africa' },
                                    { id: 'oceania', label: 'Oceania' }
                                ].map((reg) => {
                                    const isSelected = regions.includes(reg.id);
                                    return (
                                        <button
                                            key={reg.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('regions', reg.id)}
                                        >
                                            <span>{reg.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'visa') {
            return [
                {
                    id: 'visa-search-filter',
                    icon: Search,
                    badgeCount: globalSearchQuery ? 1 : 0,
                    label: 'Search Country Visas & Permits',
                    subtitle: 'Filter by Country, Permit Type or Capital',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-search-input-wrap">
                                <Search size={14} className="dock-search-icon" />
                                <input
                                    type="text"
                                    value={globalSearchQuery || ''}
                                    onChange={(e) => {
                                        setGlobalSearchQuery(e.target.value);
                                        window.dispatchEvent(new CustomEvent('visa:filter-change', { detail: { search: e.target.value } }));
                                    }}
                                    placeholder="Search country visa, nomad permit, e-Visa..."
                                    className="dock-search-input"
                                />
                                {globalSearchQuery && (
                                    <button
                                        type="button"
                                        className="dock-search-clear"
                                        onClick={() => {
                                            setGlobalSearchQuery('');
                                            window.dispatchEvent(new CustomEvent('visa:filter-change', { detail: { search: '' } }));
                                        }}
                                        aria-label="Clear visa search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'visa-status-filters',
                    icon: ShieldCheck,
                    badgeCount: selectedFilters.length,
                    label: 'Visa Pathway & Tax Filters',
                    subtitle: 'Digital Nomad, Visa-Free, e-Visa & 0% Tax',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'all', label: 'All Visa Pathways (85+)', sub: 'Global Sovereign Visa Directory' },
                                    { id: 'nomad-visa', label: 'Digital Nomad Visas (1–5 Yr)', sub: 'Remote work residency permits' },
                                    { id: 'visa-free', label: 'Visa-Free / Instant eTA', sub: 'Immediate airport entry' },
                                    { id: 'e-visa', label: 'Fast-Track Online e-Visa', sub: '24–72h electronic approval' },
                                    { id: 'voa', label: 'Visa on Arrival (VOA)', sub: 'Stamped at international arrival' },
                                    { id: 'zero-tax', label: '0% Foreign Income Tax', sub: 'Territorial / tax-exempt regimes' }
                                ].map((v) => {
                                    const isSelected = selectedFilters.includes(v.id);
                                    return (
                                        <button
                                            key={v.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => {
                                                handleToggleQuickFilter(v.id);
                                                window.dispatchEvent(new CustomEvent('visa:filter-change', { detail: { category: v.id } }));
                                            }}
                                        >
                                            <Shield size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{v.label}</span>
                                                <span className="row-sub">{v.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'visa-region-speed-filters',
                    icon: Globe,
                    badgeCount: 0,
                    label: 'Region & Approval Speed',
                    subtitle: 'Filter by World Region or Schengen 90/180d',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-sub-label">WORLD REGIONS</div>
                            <div className="dock-filter-chips-grid">
                                {['All Regions', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'].map((reg) => (
                                    <button
                                        key={reg}
                                        type="button"
                                        className="dock-filter-chip"
                                        onClick={() => window.dispatchEvent(new CustomEvent('visa:filter-change', { detail: { region: reg } }))}
                                    >
                                        <span>{reg}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="dock-sub-label" style={{ marginTop: '0.6rem' }}>APPROVAL SPEED & ZONE</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All Speeds' },
                                    { id: 'instant', label: 'Instant / 24–72h' },
                                    { id: 'under-7d', label: 'Under 7 Days' },
                                    { id: 'schengen', label: 'Schengen 90/180d' }
                                ].map((sp) => (
                                    <button
                                        key={sp.id}
                                        type="button"
                                        className="dock-filter-chip"
                                        onClick={() => window.dispatchEvent(new CustomEvent('visa:filter-change', { detail: { speed: sp.id } }))}
                                    >
                                        <span>{sp.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'speed-test') {
            return [
                {
                    id: 'speed-map-filters',
                    icon: Wifi,
                    badgeCount: selectedFilters.length,
                    label: 'Wi-Fi Spot Filters',
                    subtitle: 'Filter Speed Test Map by Workspace Type',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All Spots' },
                                    { id: 'coworking', label: 'Coworking Spaces' },
                                    { id: 'cafe', label: 'Work Cafes' },
                                    { id: 'coliving', label: 'Coliving Hubs' },
                                    { id: 'hotel', label: 'Nomad Hotels' },
                                    { id: '100mbps', label: 'Blazing 100+ Mbps' }
                                ].map((item) => {
                                    const isActive = selectedFilters.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(item.id)}
                                        >
                                            <span>{item.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'popular') {
            return [
                {
                    id: 'popular-discover-filters',
                    icon: Flame,
                    badgeCount: globalActiveFilters.length,
                    label: 'Trending & Popular Hub Filters',
                    subtitle: 'Switch Sections & Filter by Region',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-sub-label">DISCOVER SECTIONS</div>
                            <div className="dock-filter-list">
                                {[
                                    { id: 'overview', label: 'All Trending & Popular', sub: 'Full 6-in-1 Discover Hub', icon: Compass },
                                    { id: 'destinations', label: 'Trending Destinations', sub: 'Bali, Kyoto, Santorini & Hot Hubs', icon: Flame },
                                    { id: 'reviews', label: 'Traveler Reviews', sub: 'Verified Ratings & Experiences', icon: Star },
                                    { id: 'leaderboard', label: 'Top Travelers Leaderboard', sub: 'XP Rankings & Passport Badges', icon: Trophy },
                                    { id: 'photos', label: 'Community Photos', sub: 'Curated Travel Photography', icon: Sparkles },
                                    { id: 'tips', label: 'Travel Tips & Hacks', sub: 'Pro Packing, Money & Safety', icon: ShieldCheck }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    const isSelected = globalActiveFilters.includes(tab.id);
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => {
                                                setGlobalActiveFilters([tab.id]);
                                            }}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tab.label}</span>
                                                <span className="row-sub">{tab.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'feed' || pageContext === 'community') {
            return [
                {
                    id: 'feed-stream-filters',
                    icon: Flame,
                    badgeCount: globalActiveFilters.length,
                    label: pageContext === 'community' ? 'Community Hub Filters' : 'Travel Feed Filters',
                    subtitle: 'Page-Specific Stream & Content Filters',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'trending', label: 'Trending Dispatches', sub: 'Viral stories & top upvotes', icon: Flame },
                                    { id: 'following', label: 'Following Circle', sub: 'Updates from nomads you follow', icon: Users },
                                    { id: 'recent', label: 'Recent / Live', sub: 'Real-time chronological stream', icon: Clock },
                                    { id: 'vlogs', label: 'Video Vlogs & Reels', sub: 'Cinematic travel shorts', icon: Sparkles },
                                    { id: 'events', label: 'Meetups & Events', sub: 'Local nomad gatherings', icon: Calendar }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    const isSelected = globalActiveFilters.includes(tab.id);
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => {
                                                handleToggleQuickFilter(tab.id);
                                                const btn = document.getElementById(`tab-filter-${tab.id}`);
                                                if (btn) btn.click();
                                            }}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tab.label}</span>
                                                <span className="row-sub">{tab.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'saved') {
            return [
                {
                    id: 'saved-favorites-filters',
                    icon: Bookmark,
                    badgeCount: selectedFilters.length,
                    label: 'My Favorites Filters',
                    subtitle: 'Filter Saved Collection in Local Profile',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All Saved' },
                                    { id: 'Beach', label: 'Beach & Island' },
                                    { id: 'City', label: 'Metropolis' },
                                    { id: 'visa', label: 'Visa-Free' },
                                    { id: 'budget', label: 'Under $1,500/mo' }
                                ].map((cat) => {
                                    const isActive = selectedFilters.includes(cat.id);
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(cat.id)}
                                        >
                                            <span>{cat.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'games') {
            return [
                {
                    id: 'games-quest-filters',
                    icon: Trophy,
                    badgeCount: globalActiveFilters.length,
                    label: 'Travel Quests & Games Filters',
                    subtitle: 'Filter by Genre, Rewards & Mode',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'free', label: 'Free to Play' },
                                    { id: 'trending', label: 'Trending Quests' },
                                    { id: 'tournaments', label: 'Live Tournaments' },
                                    { id: 'high-rewards', label: 'High XP Rewards' },
                                    { id: 'multiplayer', label: 'Multiplayer Co-op' }
                                ].map((gf) => {
                                    const isActive = globalActiveFilters.includes(gf.id);
                                    return (
                                        <button
                                            key={gf.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(gf.id)}
                                        >
                                            <span>{gf.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'events') {
            return [
                {
                    id: 'events-festival-filters',
                    icon: Calendar,
                    badgeCount: globalActiveFilters.length,
                    label: 'Events & Festivals Filters',
                    subtitle: 'Filter Global Gatherings & Tickets',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'upcoming-events', label: 'Upcoming Events' },
                                    { id: 'music-festivals', label: 'Music Festivals' },
                                    { id: 'cultural-festivals', label: 'Cultural Festivals' },
                                    { id: 'food--drink', label: 'Food & Drink' },
                                    { id: 'conferences', label: 'Nomad Conferences' },
                                    { id: 'ai-picks', label: 'AI Event Picks' }
                                ].map((ef) => {
                                    const isActive = globalActiveFilters.includes(ef.id);
                                    return (
                                        <button
                                            key={ef.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(ef.id)}
                                        >
                                            <span>{ef.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'learning') {
            return [
                {
                    id: 'learning-voluntourism-filters',
                    icon: BookOpen,
                    badgeCount: globalActiveFilters.length,
                    label: 'Learning & Voluntourism Filters',
                    subtitle: 'Filter Courses, Eco-Projects & Scholarships',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'courses', label: 'Courses' },
                                    { id: 'workshops', label: 'Workshops' },
                                    { id: 'language-learning', label: 'Language Learning' },
                                    { id: 'volunteer-projects', label: 'Volunteer Projects' },
                                    { id: 'eco-tourism', label: 'Eco-Tourism' },
                                    { id: 'scholarships', label: 'Scholarships' }
                                ].map((lf) => {
                                    const isActive = globalActiveFilters.includes(lf.id);
                                    return (
                                        <button
                                            key={lf.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(lf.id)}
                                        >
                                            <span>{lf.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        return [
            {
                id: 'analytics-filters',
                icon: BarChart3,
                badgeCount: globalActiveFilters.length,
                label: 'Page Filters & Telemetry',
                subtitle: 'Filter Insights & Metrics',
                content: (
                    <div className="dock-filter-panel">
                        <div className="dock-filter-chips-grid">
                            {[
                                { id: 'user-insights', label: 'User Insights' },
                                { id: 'market-trends', label: 'Market Trends' },
                                { id: 'predictions', label: 'Predictions' },
                                { id: 'ai-picks', label: 'AI Insights' }
                            ].map((af) => {
                                const isActive = globalActiveFilters.includes(af.id);
                                return (
                                    <button
                                        key={af.id}
                                        type="button"
                                        className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                        onClick={() => handleToggleQuickFilter(af.id)}
                                    >
                                        <span>{af.label}</span>
                                        {isActive && <Check size={11} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        ];
    };

    const pageFilterTools = getPageSpecificFilterTools();

    const tools = [
        {
            id: 'live-intel',
            icon: () => (
                <div className="dock-live-intel-icon">
                    <span className="live-pulse-dot-dock"></span>
                    <Activity size={17} className="intel-activity-icon" />
                </div>
            ),
            label: pageContext === 'embassy'
                ? 'Global Embassy Directory & Consular Intelligence'
                : 'Explore Global Destinations & Nomad Hubs',
            subtitle: pageContext === 'embassy'
                ? 'Diplomatic Missions • Verified 2026'
                : 'Live Travel Intelligence • Verified 2026',
            content: pageContext === 'embassy' ? (
                <div className="tool-detail dock-domain-hub-panel">
                    <div className="intel-verified-pill">
                        <span className="live-pulse-dot-dock"></span>
                        <span>Diplomatic & Consular Intelligence • 2026</span>
                    </div>
                    <p className="dock-domain-desc">
                        Instant access to 1,420+ embassies, high commissions, 24/7 citizen emergency hotlines, and digital nomad visa desks worldwide.
                    </p>
                    <div className="dock-domain-kpi-grid">
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">1,420+</span>
                            <span className="dock-kpi-label">Global Missions</span>
                        </div>
                        <div className="dock-kpi-card highlight">
                            <span className="dock-kpi-value">96.4%</span>
                            <span className="dock-kpi-label">Nomad Visa Rate</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">58+</span>
                            <span className="dock-kpi-label">Nomad Visas</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">24/7</span>
                            <span className="dock-kpi-label">Emergency Desks</span>
                        </div>
                    </div>
                    <div className="dock-sub-label" style={{ marginTop: '0.35rem' }}>QUICK CONSULAR FILTERS:</div>
                    <div className="dock-filter-chips-grid">
                        {[
                            { id: 'nomad-visa', label: 'Nomad Visa Desks' },
                            { id: 'visa-services', label: 'Fast e-Visa' },
                            { id: 'emergency', label: '24/7 Emergency' },
                            { id: 'passport', label: 'Passport & Notary' },
                            { id: 'citizenship', label: 'Golden Visa / PR' }
                        ].map((item) => {
                            const isSelected = embassyFilters.service === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                    onClick={() => updateEmbassyFilter({ service: isSelected ? 'all' : item.id })}
                                >
                                    <span>{item.label}</span>
                                    {isSelected && <Check size={11} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="tool-detail dock-domain-hub-panel">
                    <div className="intel-verified-pill">
                        <span className="live-pulse-dot-dock"></span>
                        <span>Live Travel Intelligence • Verified 2026</span>
                    </div>
                    <p className="dock-domain-desc">
                        Discover verified cost-of-living data, fiber internet speeds, community vibes, and real-time visa guidelines for nomadic explorers and global citizens.
                    </p>

                    <div className="dock-domain-kpi-grid">
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">195+</span>
                            <span className="dock-kpi-label">Countries Indexed</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">850+</span>
                            <span className="dock-kpi-label">Nomad Cities</span>
                        </div>
                        <div className="dock-kpi-card highlight">
                            <span className="dock-kpi-value">98.4%</span>
                            <span className="dock-kpi-label">Visa Accuracy</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">100+ Mbps</span>
                            <span className="dock-kpi-label">Avg Hub Speed</span>
                        </div>
                    </div>

                    <div className="dock-sub-label" style={{ marginTop: '0.35rem' }}>QUICK DISCOVERY:</div>
                    <div className="dock-filter-chips-grid">
                        {[
                            { id: 'nomad-hub', label: 'Top Nomad Hubs', badge: 'Hot' },
                            { id: 'beach', label: 'Beach Paradises' },
                            { id: 'mountain', label: 'Mountain Escapes' },
                            { id: 'cheap', label: 'Budget Under $1k', badge: 'Save' },
                            { id: 'fast-internet', label: '100+ Mbps Wi-Fi' },
                            { id: 'visa-friendly', label: 'Visa-Friendly', badge: 'Easy' },
                            { id: 'trending', label: 'Trending Worldwide' }
                        ].map((preset) => {
                            const isSelected = selectedFilters.includes(preset.id);
                            return (
                                <button
                                    key={preset.id}
                                    type="button"
                                    className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                    onClick={() => {
                                        handleToggleQuickFilter(preset.id);
                                        if (!pathname.startsWith('/explore/destinations')) {
                                            navigate('/explore/destinations');
                                        }
                                    }}
                                >
                                    <span>{preset.label}</span>
                                    {preset.badge && (
                                        <span className="dock-chip-mini-badge">{preset.badge}</span>
                                    )}
                                    {isSelected && <Check size={11} />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="dock-sub-label" style={{ marginTop: '0.35rem' }}>EXPLORE TOOLS & HUBS:</div>
                    <div className="dock-domain-actions-list">
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                setIsFilterDrawerOpen(true);
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <SlidersHorizontal size={13} />
                            <span>Filter by Climate, Cost & Speed</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                setIsCompareModalOpen(true);
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <ArrowRightLeft size={13} />
                            <span>Compare Destinations</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/embassy');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Landmark size={13} />
                            <span>Global Embassy Directory</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/visa');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Shield size={13} />
                            <span>Visa Intelligence Hub</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/speed-test');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Wifi size={13} />
                            <span>Nomad Wi-Fi Speed Map</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/seenomad-multi');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Compass size={13} />
                            <span>Multi-City Route Planner</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                navigate('/explore/triipper');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Sparkles size={13} />
                            <span>Triipper AI Copilot</span>
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 'user',
            icon: () => (
                <div className="dock-user-avatar">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="User" />
                    <div className="status-indicator online"></div>
                </div>
            ),
            label: 'Elite Explorer',
            subtitle: 'Nomad Profile & Streak',
            content: (
                <div className="tool-detail">
                    <div className="user-badge">ELITE</div>
                    <span className="user-status">Exploring</span>
                    <div className="dock-user-stats">
                        <div className="stat-row">
                            <Flame size={12} className="text-orange" />
                            <span>{dailyStreak} DAY STREAK</span>
                        </div>
                        <div className="stat-row">
                            <Zap size={12} className="text-blue" />
                            <span>{dailyXP}/{dailyGoal} XP</span>
                        </div>
                        <div className="dock-progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        ...pageFilterTools
    ];

    const currentOpenTool = pinnedTool || activeTool;

    return (
        <aside
            ref={dockRef}
            className="nomad-dock-wrapper vertical-pill vertical-bar"
            id="vertical-pill-bar"
            data-component="Vertical Pill"
            data-page-context={pageContext}
            aria-label="Vertical Pill / Vertical Bar — Page-Specific Filters & Live Travel Intelligence"
        >
            <div className="nomad-dock vertical-pill-container">
                <div
                    className="vertical-pill-header-badge"
                    title="Vertical Pill / Vertical Bar — Live Travel Intelligence • Verified 2026"
                >
                    <span className="live-pulse-dot-dock"></span>
                    <span className="vertical-pill-tag-text">26</span>
                </div>

                {tools.map((tool) => {
                    const isOpen = currentOpenTool === tool.id;
                    const badgeCount = Number(tool.badgeCount || 0);
                    const hasBadge = badgeCount > 0;

                    return (
                        <div
                            key={tool.id}
                            className={`dock-item-container ${isOpen ? 'active' : ''} ${hasBadge ? 'has-active-filters' : ''} ${tool.id === 'user' ? 'user-top' : ''} ${tool.id === 'live-intel' ? 'live-intel-top' : ''} ${tool.id}`}
                            onMouseEnter={() => {
                                if (!pinnedTool && window.innerWidth > 900) setActiveTool(tool.id);
                            }}
                            onMouseLeave={() => {
                                if (!pinnedTool && window.innerWidth > 900) setActiveTool(null);
                            }}
                        >
                            <motion.button
                                type="button"
                                className={`dock-item ${tool.id} ${hasBadge ? 'filter-active' : ''}`}
                                whileHover={{ scale: 1.06, x: 2 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => {
                                    setPinnedTool((prev) => (prev === tool.id ? null : tool.id));
                                    setActiveTool((prev) => (prev === tool.id && pinnedTool === tool.id ? null : tool.id));
                                }}
                                style={{
                                    color: tool.id === 'live-intel' ? '#10b981' : 'inherit'
                                }}
                                aria-label={hasBadge ? `${tool.label} (${badgeCount} active)` : tool.label}
                                title={hasBadge ? `${tool.label} • ${badgeCount} active` : tool.label}
                                aria-expanded={isOpen}
                            >
                                {typeof tool.icon === 'function' ? <tool.icon /> : <tool.icon size={16} />}
                                {hasBadge && (
                                    <span
                                        className="dock-filter-count-badge"
                                        aria-label={`${badgeCount} active filters`}
                                    >
                                        {badgeCount > 9 ? '9+' : badgeCount}
                                    </span>
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        className="dock-tooltip dock-interactive-popover"
                                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -8, scale: 0.96 }}
                                        transition={{ duration: 0.16 }}
                                        onMouseEnter={() => {
                                            if (!pinnedTool) setActiveTool(tool.id);
                                        }}
                                        onMouseLeave={() => {
                                            if (!pinnedTool) setActiveTool(null);
                                        }}
                                    >
                                        <div className="tooltip-bar-name">
                                            <span>VERTICAL PILL • PAGE FILTERS</span>
                                            {totalActiveFilters > 0 && tool.id.startsWith('filter-') && (
                                                <button
                                                    type="button"
                                                    className="dock-inline-reset-btn"
                                                    onClick={handleResetAllPageFilters}
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                        <div className="tooltip-header">{tool.label}</div>
                                        {tool.subtitle && (
                                            <div className="tooltip-subtitle">{tool.subtitle}</div>
                                        )}
                                        {tool.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {totalActiveFilters > 0 && (
                    <button
                        type="button"
                        className="dock-quick-clear-pill"
                        onClick={handleResetAllPageFilters}
                        title={`Clear all ${totalActiveFilters} active filters`}
                    >
                        <RotateCcw size={13} />
                        <span>{totalActiveFilters}</span>
                    </button>
                )}
            </div>
        </aside>
    );
};

export default NomadDock;
