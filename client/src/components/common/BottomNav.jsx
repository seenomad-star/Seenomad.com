import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Globe,
    Video,
    Plane,
    Luggage,
    Sparkles,
    X,
    Map,
    Search,
    ShieldCheck,
    ChevronRight,
    Bookmark,
    Menu,
    Tag,
    Calendar,
    DollarSign,
    UserCheck,
    Users,
    Camera,
    Trophy,
    TrendingUp,
    Compass,
    LayoutGrid,
    Radar,
    Building2,
    GitBranch,
    Star,
    Gift,
    BookOpen,
    Palmtree,
    Shield,
    Navigation,
    Newspaper,
    Mic,
    GraduationCap,
    Brain,
    Award,
    Megaphone
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useSavedStore } from '../../store/savedStore';
import './BottomNav.css';

/**
 * Complete categorized catalog of all 27 website modules & features
 * so the Hub button provides instant 1-tap access to the entire website.
 */
const ECOSYSTEM_CATEGORIES = [
    {
        id: 'popular',
        label: 'Featured',
        items: [
            { title: 'Travel Deals', desc: '-42% stays, flights & perks', path: '/explore/travel-deals', icon: Tag, glow: 'map-glow', color: 'text-emerald', badge: 'Save' },
            { title: 'Events & Festivals', desc: 'Global festivals & pop-up villages', path: '/event-festival', icon: Calendar, glow: 'search-glow', color: 'text-pink', badge: 'Live' },
            { title: 'Community Hub', desc: 'Nomad hubs, buddies & meetups', path: '/community', icon: Users, glow: 'meetup-glow', color: 'text-purple', badge: 'Meet' },
            { title: 'Book Travel', desc: 'Flights, hotels, trains & stays', path: '/explore/book-travel', icon: Plane, glow: 'ai-glow', color: 'text-cyan', badge: 'Book' },
            { title: 'My Trips & Journey', desc: 'Saved trips & itinerary vault', path: '/user/travel-journey', icon: Luggage, glow: 'story-glow', color: 'text-orange', badge: 'Trips' },
            { title: 'Visa & DNV Hub', desc: '2026 entry & embassy rules', path: '/explore/visa', icon: ShieldCheck, glow: 'visa-glow', color: 'text-amber', badge: '2026' },
            { title: 'Tax & 183d Calc', desc: 'Residency & tax estimator', path: '/explore/tax-calculator', icon: DollarSign, glow: 'meetup-glow', color: 'text-purple', badge: '183d' },
            { title: '3D Travel Map', desc: '360° portals & drone tours', path: '/explore/travel-map', icon: Map, glow: 'ai-glow', color: 'text-cyan', badge: '3D' },
            { title: 'Trip Builder', desc: 'Modular route & budget OS', path: '/explore/trip-builder', icon: Compass, glow: 'map-glow', color: 'text-emerald', badge: 'Studio' },
            { title: '4-in-1 AI Studio', desc: 'Triipper, Twin & Super Agent', path: '/explore/ai-studio', icon: Sparkles, glow: 'ai-glow', color: 'text-cyan', badge: 'AI' }
        ]
    },
    {
        id: 'explore-feed',
        label: 'Feed & Explore',
        items: [
            { title: 'Home Feed', desc: 'Live traveler stories & dispatches', path: '/', icon: Home, glow: 'ai-glow', color: 'text-cyan', badge: 'Live' },
            { title: 'Explore 195+ Hubs', desc: 'Countries, cities & cost index', path: '/explore/destinations', icon: Globe, glow: 'map-glow', color: 'text-emerald', badge: '195+' },
            { title: 'Trending & Popular', desc: 'Viral posts & hot destinations', path: '/popular', icon: TrendingUp, glow: 'story-glow', color: 'text-orange', badge: 'Hot' },
            { title: '360° Travel Vibes', desc: 'Short-form video & trip cloning', path: '/explore/vibes', icon: Video, glow: 'search-glow', color: 'text-pink', badge: 'Vibe' },
            { title: '3D Travel Map', desc: 'Virtual places & 4D time-travel', path: '/explore/travel-map', icon: Map, glow: 'ai-glow', color: 'text-cyan', badge: '3D' }
        ]
    },
    {
        id: 'travel-tools',
        label: 'Travel Tools',
        items: [
            { title: 'Book Travel', desc: 'Flights, stays, trains & cabs', path: '/explore/book-travel', icon: Plane, glow: 'ai-glow', color: 'text-cyan', badge: 'Book' },
            { title: 'Flight Tracker', desc: 'Live flight corridors & transit', path: '/explore/flights-visa', icon: Radar, glow: 'map-glow', color: 'text-emerald', badge: 'Live' },
            { title: 'Hotel & Stay Finder', desc: 'Coliving hubs, fiber & hotels', path: '/explore/hotel-finder', icon: Building2, glow: 'meetup-glow', color: 'text-purple', badge: 'Stays' },
            { title: 'Visa Info & Embassy', desc: 'DNV eligibility & embassy FAQ', path: '/explore/visa', icon: ShieldCheck, glow: 'visa-glow', color: 'text-amber', badge: '2026' },
            { title: 'Tax & Compliance', desc: '183-day tracker & tax estimator', path: '/explore/tax-calculator', icon: DollarSign, glow: 'meetup-glow', color: 'text-purple', badge: '183d' },
            { title: 'Itinerary Builder', desc: 'Day-by-day multi-stop planner', path: '/explore/planner', icon: GitBranch, glow: 'ai-glow', color: 'text-cyan', badge: 'Routes' },
            { title: 'Trip Builder Studio', desc: 'Modular trip templates & budget', path: '/explore/trip-builder', icon: Compass, glow: 'map-glow', color: 'text-emerald', badge: 'Studio' },
            { title: 'Nomad AI Studio', desc: 'Triipper, Super Agent & Twin', path: '/explore/ai-studio', icon: Sparkles, glow: 'ai-glow', color: 'text-cyan', badge: '4-in-1' },
            { title: 'Verified Reviews', desc: 'Traveler ratings & safety tips', path: '/explore/reviews', icon: Star, glow: 'visa-glow', color: 'text-amber', badge: '4.9★' },
            { title: 'Passport & Rewards', desc: 'Partner eSIMs & coliving perks', path: '/explore/passport-perks', icon: Gift, glow: 'map-glow', color: 'text-emerald', badge: 'Perks' },
            { title: 'Destination Guides', desc: 'Curated city & neighborhood guides', path: '/explore/trivenly', icon: BookOpen, glow: 'ai-glow', color: 'text-cyan', badge: 'Guides' },
            { title: 'Local Experiences', desc: 'Workshops & cultural immersions', path: '/learning-voluntourism', icon: Palmtree, glow: 'story-glow', color: 'text-orange', badge: 'Local' },
            { title: 'Local Fixers & Agents', desc: '0% markup verified local agents', path: '/explore/guardians', icon: UserCheck, glow: 'story-glow', color: 'text-orange', badge: 'Fixers' },
            { title: 'Safety & Insurance', desc: 'Medical insurance & SOS radar', path: '/support-utility', icon: Shield, glow: 'map-glow', color: 'text-emerald', badge: 'Safety' },
            { title: 'Nearby Work Cafes', desc: 'WiFi speed map & coworking', path: '/explore/speed-test', icon: Navigation, glow: 'ai-glow', color: 'text-cyan', badge: 'Radar' }
        ]
    },
    {
        id: 'planning-social',
        label: 'Planning & Social',
        items: [
            { title: 'My Trips & Journey', desc: 'Saved itineraries & trip logs', path: '/user/travel-journey', icon: Luggage, glow: 'story-glow', color: 'text-orange', badge: 'Active' },
            { title: 'Travel Deals', desc: 'Error-fare flights & partner deals', path: '/explore/travel-deals', icon: Tag, glow: 'map-glow', color: 'text-emerald', badge: 'Save' },
            { title: 'Events & Festivals', desc: 'Global festivals & pop-up villages', path: '/event-festival', icon: Calendar, glow: 'search-glow', color: 'text-pink', badge: 'Live' },
            { title: 'Travel News & Pulse', desc: 'Global travel news & cost index', path: '/insights-analytics', icon: Newspaper, glow: 'ai-glow', color: 'text-cyan', badge: 'Pulse' },
            { title: 'Community Hub', desc: 'Global traveler chat & buddies', path: '/community', icon: Users, glow: 'meetup-glow', color: 'text-purple', badge: 'Meet' }
        ]
    },
    {
        id: 'media-quests-biz',
        label: 'Media, Quests & Biz',
        items: [
            { title: 'Photography Gallery', desc: 'Global travel photo dispatches', path: '/content-media/photography', icon: Camera, glow: 'search-glow', color: 'text-pink', badge: 'Photo' },
            { title: 'Nomad Podcasts', desc: 'Audio dispatches & interviews', path: '/content-media/podcasts', icon: Mic, glow: 'meetup-glow', color: 'text-purple', badge: 'Audio' },
            { title: 'Learning Academy', desc: 'Remote work & language courses', path: '/content-media/learning', icon: GraduationCap, glow: 'map-glow', color: 'text-emerald', badge: 'Learn' },
            { title: 'Travel Quiz & Trivia', desc: 'Geography & visa trivia for XP', path: '/content-media/travel-quiz', icon: Brain, glow: 'visa-glow', color: 'text-amber', badge: '+XP' },
            { title: 'Post Templates', desc: 'Viral reel & carousel hooks', path: '/content-media/post-templates', icon: LayoutGrid, glow: 'story-glow', color: 'text-orange', badge: 'Viral' },
            { title: 'Challenges & Quests', desc: 'Active city quests & rewards', path: '/explore/challenges', icon: Trophy, glow: 'visa-glow', color: 'text-amber', badge: 'XP' },
            { title: 'Passport Milestones', desc: 'Verified stamps & achievements', path: '/user/achievements', icon: Award, glow: 'ai-glow', color: 'text-cyan', badge: 'Stamps' },
            { title: 'Global Leaderboard', desc: 'Traveler rankings & rivalry', path: '/explore/rivalry', icon: TrendingUp, glow: 'story-glow', color: 'text-orange', badge: 'Rank' },
            { title: 'Creator Monetization', desc: 'Tips, brand deals & affiliate', path: '/business-partner/monetize', icon: DollarSign, glow: 'map-glow', color: 'text-emerald', badge: '+24%' },
            { title: 'Creator Earnings', desc: 'Payouts, ledger & tax invoices', path: '/business-partner/creator-earnings', icon: DollarSign, glow: 'ai-glow', color: 'text-cyan', badge: 'Payout' },
            { title: 'Ad Manager & B2B', desc: 'Promote stays & corporate travel', path: '/business-partner/ad-manager', icon: Megaphone, glow: 'meetup-glow', color: 'text-purple', badge: 'B2B' }
        ]
    }
];

/**
 * BottomNav Component — Fixed Mobile-Only 5-Icon Bottom Navigation Bar
 * Strictly maximum 5 items on the single-line bar:
 * 1. Home ('/') — Social Feed & Dispatches
 * 2. Explore ('/explore/destinations') — 195+ Destinations, Map & Guides
 * 3. Vibes ('/explore/vibes') — 360° Immersive Short-Form Video Feed
 * 4. AI ('/explore/ai-studio') — 4-in-1 Nomad AI Studio (Triipper, Super Agent, Twin, Travel Bug)
 * 5. Hub Launcher — Opens the All-Modules Ecosystem Hub giving instant access to all 27 features
 */
const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        toggleSearch,
        userLevel = 12,
        hasNewInsights,
        isMobileSidebarOpen,
        toggleMobileSidebar,
        moduleNavItems = [],
        moduleBasePath = ''
    } = useNavStore();

    const [isActionDeckOpen, setIsActionDeckOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('popular');
    const [hubQuery, setHubQuery] = useState('');
    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const savedCount = savedDestinations.length;

    // Auto-close quick action deck on route change
    useEffect(() => {
        setIsActionDeckOpen(false);
        setHubQuery('');
    }, [location.pathname]);

    // Handle Escape key to close action deck
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isActionDeckOpen) {
                setIsActionDeckOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActionDeckOpen]);

    const pathname = location.pathname;

    // Active route matchers for the 5-button mobile bar:
    // 1. Home
    const isHomeActive =
        pathname === '/' ||
        pathname.startsWith('/feed') ||
        pathname.startsWith('/popular');

    // 2. Vibes
    const isVibesActive =
        pathname.startsWith('/explore/vibes') ||
        pathname.startsWith('/explore/shorts');

    // 3. AI Studio & AI Agents
    const isAIActive =
        pathname.startsWith('/explore/ai-studio') ||
        pathname.startsWith('/explore/nomad-ai') ||
        pathname.startsWith('/explore/triipper') ||
        pathname.startsWith('/explore/super-agent') ||
        pathname.startsWith('/explore/travel-bug') ||
        pathname.startsWith('/explore/twin') ||
        pathname.startsWith('/ai-agents');

    // 4. Explore (195+ Destinations, Map & Guides)
    const isExploreActive =
        !isVibesActive &&
        !isAIActive &&
        (pathname.startsWith('/explore/destinations') ||
            pathname.startsWith('/destinations') ||
            pathname.startsWith('/explore/travel-map') ||
            pathname.startsWith('/explore/map') ||
            pathname.startsWith('/explore/compare'));

    // 5. Highlight Hub icon when user is inside any feature launched from the Hub (Deals, Events, Community, Book, Visas, Media, Business, etc.)
    const isHubFeatureActive =
        !isHomeActive &&
        !isExploreActive &&
        !isVibesActive &&
        !isAIActive;

    const displayedModules = useMemo(() => {
        const q = hubQuery.trim().toLowerCase();
        if (q) {
            const seen = new Set();
            const matches = [];
            ECOSYSTEM_CATEGORIES.forEach((cat) => {
                cat.items.forEach((item) => {
                    if (
                        !seen.has(item.path) &&
                        (item.title.toLowerCase().includes(q) ||
                            item.desc.toLowerCase().includes(q) ||
                            (item.badge && item.badge.toLowerCase().includes(q)))
                    ) {
                        seen.add(item.path);
                        matches.push(item);
                    }
                });
            });
            return matches;
        }
        const foundCategory = ECOSYSTEM_CATEGORIES.find((cat) => cat.id === activeCategory);
        return foundCategory ? foundCategory.items : ECOSYSTEM_CATEGORIES[0].items;
    }, [activeCategory, hubQuery]);

    const handleNavClick = (path) => {
        setIsActionDeckOpen(false);
        if (isMobileSidebarOpen) {
            toggleMobileSidebar(false);
        }
        navigate(path);
    };

    const handleOpenSearch = () => {
        setIsActionDeckOpen(false);
        if (isMobileSidebarOpen) {
            toggleMobileSidebar(false);
        }
        toggleSearch(true);
    };

    const handleCenterDockClick = (e) => {
        e.stopPropagation();
        if (isMobileSidebarOpen) {
            toggleMobileSidebar(false);
        }
        setIsActionDeckOpen((prev) => !prev);
    };

    const handleOpenFullSidebar = () => {
        setIsActionDeckOpen(false);
        toggleMobileSidebar(true);
    };

    return (
        <>
            {/* 1. Backdrop Overlay for All-Modules Ecosystem Hub */}
            <AnimatePresence>
                {isActionDeckOpen && (
                    <motion.div
                        id="mobile-action-deck-backdrop"
                        className="mobile-action-deck-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        onClick={() => setIsActionDeckOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* 2. Complete All-Modules Website Hub Sheet (Access to All 27 Features & Sub-Views) */}
            <AnimatePresence>
                {isActionDeckOpen && (
                    <motion.div
                        id="mobile-action-deck"
                        className="mobile-action-deck"
                        role="dialog"
                        aria-modal="true"
                        aria-label="SeeNomad All Modules & Features Hub"
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 360 }}
                    >
                        <div className="action-deck-handle" onClick={() => setIsActionDeckOpen(false)} />

                        <div className="action-deck-header">
                            <div className="deck-title-group">
                                <div className="deck-beacon">
                                    <span className="deck-beacon-dot" />
                                </div>
                                <div>
                                    <h4 className="deck-title">SeeNomad All-Modules Hub</h4>
                                    <span className="deck-subtitle">27 features · Deals, Events, Community, Booking, Visas & Media</span>
                                </div>
                            </div>
                            <button
                                className="deck-close-btn"
                                onClick={() => setIsActionDeckOpen(false)}
                                aria-label="Close all-modules hub"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Quick Filter Input + Category Tabs for All 27 Website Modules */}
                        <div className="deck-filter-controls">
                            <div className="deck-search-input-wrap">
                                <Search size={13} className="deck-search-icon" />
                                <input
                                    type="text"
                                    value={hubQuery}
                                    onChange={(e) => setHubQuery(e.target.value)}
                                    placeholder="Jump to any feature (Deals, Visa, Tax, Events, Trips...)"
                                    className="deck-search-input"
                                    aria-label="Filter website modules"
                                />
                                {hubQuery && (
                                    <button
                                        type="button"
                                        className="deck-search-clear"
                                        onClick={() => setHubQuery('')}
                                        aria-label="Clear filter"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>

                            {!hubQuery && (
                                <div className="deck-category-tabs" role="tablist">
                                    {ECOSYSTEM_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={activeCategory === cat.id}
                                            className={`deck-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(cat.id)}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Contextual Sub-View Strip (Replaces Desktop ModuleNavbar Ribbon on Mobile) */}
                        {!hubQuery && moduleNavItems && moduleNavItems.length > 0 && (
                            <div className="deck-context-subnav">
                                <span className="deck-context-label">
                                    <Compass size={11} /> Active Page Sub-Tabs
                                </span>
                                <div className="deck-context-pills">
                                    {moduleNavItems.map((item) => {
                                        const targetPath = item.path || `${moduleBasePath}/${item.slug}`.replace(/\/+/g, '/');
                                        const isSubActive = pathname === targetPath || pathname.startsWith(`${targetPath}/`);
                                        return (
                                            <button
                                                key={item.slug || item.label}
                                                type="button"
                                                className={`deck-context-pill ${isSubActive ? 'active' : ''}`}
                                                onClick={() => handleNavClick(targetPath)}
                                            >
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Module Cards Grid */}
                        <div className="action-deck-grid">
                            {displayedModules.map((mod) => {
                                const IconComponent = mod.icon;
                                const isCurrentMod = pathname === mod.path || (mod.path !== '/' && pathname.startsWith(mod.path));
                                return (
                                    <button
                                        key={`${activeCategory}-${mod.path}-${mod.title}`}
                                        type="button"
                                        className={`deck-tile ${isCurrentMod ? 'active-tile' : ''}`}
                                        onClick={() => handleNavClick(mod.path)}
                                    >
                                        <div className={`tile-icon-wrapper ${mod.glow}`}>
                                            <IconComponent size={16} className={mod.color} />
                                        </div>
                                        <div className="tile-text">
                                            <div className="tile-name-row">
                                                <span className="tile-name">{mod.title}</span>
                                                {mod.badge && <span className="tile-mini-badge">{mod.badge}</span>}
                                            </div>
                                            <span className="tile-desc">{mod.desc}</span>
                                        </div>
                                        <ChevronRight size={13} className="tile-arrow" />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="action-deck-footer">
                            <button
                                type="button"
                                className="footer-status-pill clickable"
                                onClick={handleOpenSearch}
                            >
                                <Search size={13} />
                                <span>Global Search</span>
                            </button>

                            <button
                                type="button"
                                className="footer-status-pill clickable"
                                onClick={() => handleNavClick('/saved')}
                            >
                                <Bookmark size={13} />
                                <span>Saved ({savedCount})</span>
                            </button>

                            <button
                                type="button"
                                className="footer-status-pill clickable"
                                onClick={handleOpenFullSidebar}
                            >
                                <Menu size={13} />
                                <span>Full Drawer · Lvl {userLevel}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Fixed Mobile-Only Single-Line 5-Icon Bottom Navigation Bar */}
            <div className="mobile-bottom-nav-container">
                <nav
                    id="mobile-bottom-nav"
                    className="mobile-bottom-nav"
                    role="navigation"
                    aria-label="Mobile primary navigation bar"
                >
                    {/* 1. Home */}
                    <button
                        id="mobile-nav-home"
                        type="button"
                        className={`nav-item ${isHomeActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/')}
                        aria-label="Home Feed"
                        title="Home Feed"
                        aria-current={isHomeActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Home size={18} className="nav-icon" />
                            {hasNewInsights && <span className="nav-dot-badge" />}
                        </div>
                    </button>

                    {/* 2. Explore (195+ Destinations & 3D Map) */}
                    <button
                        id="mobile-nav-explore"
                        type="button"
                        className={`nav-item ${isExploreActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/destinations')}
                        aria-label="Explore Destinations & Map"
                        title="Explore Destinations & Map"
                        aria-current={isExploreActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Globe size={18} className="nav-icon" />
                            <span className="nav-live-dot" />
                        </div>
                    </button>

                    {/* 3. Vibes (360° Immersive Short-Form Video Feed) */}
                    <button
                        id="mobile-nav-vibes"
                        type="button"
                        className={`nav-item ${isVibesActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/vibes')}
                        aria-label="360° Travel Vibes"
                        title="360° Travel Vibes"
                        aria-current={isVibesActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Video size={18} className="nav-icon" />
                        </div>
                    </button>

                    {/* 4. AI (4-in-1 Nomad AI Studio: Triipper, Super Agent, Twin, Travel Bug) */}
                    <button
                        id="mobile-nav-ai"
                        type="button"
                        className={`nav-item ${isAIActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/ai-studio')}
                        aria-label="Nomad AI Studio"
                        title="Nomad AI Studio"
                        aria-current={isAIActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Sparkles size={18} className="nav-icon" />
                        </div>
                    </button>

                    {/* 5. Hub Button (All 27 Modules: Deals, Events, Community, Booking, Visas, Trips, Media & Business) */}
                    <div className="nav-center-slot">
                        <button
                            type="button"
                            id="mobile-nav-hub"
                            className={`nav-center-btn ${isActionDeckOpen ? 'is-open' : ''} ${isHubFeatureActive && !isActionDeckOpen ? 'has-active-module' : ''}`}
                            onClick={handleCenterDockClick}
                            aria-expanded={isActionDeckOpen}
                            aria-label={isActionDeckOpen ? 'Close All-Modules Hub' : 'Open All-Modules Hub (27 Features)'}
                            title="All Modules Hub (Deals, Events, Community, Booking, Visas & More)"
                        >
                            <div className="nav-icon-container">
                                {isActionDeckOpen ? (
                                    <X size={17} className="center-icon" />
                                ) : (
                                    <LayoutGrid size={17} className="center-icon" />
                                )}
                                {!isActionDeckOpen && savedCount > 0 && (
                                    <span className="nav-count-badge">{savedCount}</span>
                                )}
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default BottomNav;
