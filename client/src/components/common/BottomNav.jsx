import React, { useState, useEffect } from 'react';
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
    UserCheck
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useSavedStore } from '../../store/savedStore';
import './BottomNav.css';

/**
 * BottomNav Component — Ultra-Compact Mobile TravelOS Bar
 * Represents SeeNomad's core ecosystem pillars while occupying minimal vertical screen space (46px):
 * 1. Feed ('/') — Social feed & traveler dispatches
 * 2. Explore ('/explore/destinations') — 195+ countries, guides & 3D map
 * 3. Vibes ('/explore/vibes') — 360° short-form travel vibes
 * 4. Center Hub (AI & Tools Launchpad) — Instant sheet for AI Studio, Visa/Tax, Deals, Festivals & Fixers
 * 5. Book ('/explore/book-travel') — Flights, coliving stays & partner deals
 * 6. Trips ('/user/travel-journey') — My Trips & Journey vault + saved count
 */
const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        toggleSearch,
        userLevel = 12,
        userXP = 4250,
        hasNewInsights,
        isMobileSidebarOpen,
        toggleMobileSidebar
    } = useNavStore();

    const [isActionDeckOpen, setIsActionDeckOpen] = useState(false);
    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const savedCount = savedDestinations.length;

    // Auto-close quick action deck on route change
    useEffect(() => {
        setIsActionDeckOpen(false);
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
    const isFeedActive = pathname === '/' || pathname.startsWith('/feed') || pathname.startsWith('/popular');
    const isExploreActive =
        pathname.startsWith('/explore/destinations') ||
        pathname.startsWith('/destinations') ||
        pathname.startsWith('/explore/trivenly') ||
        pathname.startsWith('/explore/travel-map');
    const isVibesActive = pathname.startsWith('/explore/vibes') || pathname.startsWith('/explore/shorts');
    const isBookActive =
        pathname.startsWith('/explore/book-travel') ||
        pathname.startsWith('/explore/hotel-finder') ||
        pathname.startsWith('/explore/flights-visa') ||
        pathname.startsWith('/explore/travel-deals');
    const isTripsActive =
        pathname.startsWith('/user/travel-journey') ||
        pathname.startsWith('/explore/planner') ||
        pathname.startsWith('/explore/trip-builder') ||
        pathname.startsWith('/saved');

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
            {/* 1. Backdrop Overlay for TravelOS Quick Launch Deck */}
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

            {/* 2. Compact TravelOS Ecosystem Quick Sheet */}
            <AnimatePresence>
                {isActionDeckOpen && (
                    <motion.div
                        id="mobile-action-deck"
                        className="mobile-action-deck"
                        role="dialog"
                        aria-modal="true"
                        aria-label="SeeNomad Ecosystem Quick Tools"
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
                                    <h4 className="deck-title">SeeNomad Command Hub</h4>
                                    <span className="deck-subtitle">AI Studio, Visas, Tax, Deals & 3D Map</span>
                                </div>
                            </div>
                            <button
                                className="deck-close-btn"
                                onClick={() => setIsActionDeckOpen(false)}
                                aria-label="Close quick tools"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="action-deck-grid">
                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/ai-studio')}
                            >
                                <div className="tile-icon-wrapper ai-glow">
                                    <Sparkles size={17} className="text-cyan" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">4-in-1 AI Studio</span>
                                    <span className="tile-desc">Triipper, Twin & Super Agent</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/travel-deals')}
                            >
                                <div className="tile-icon-wrapper map-glow">
                                    <Tag size={17} className="text-emerald" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Travel Deals</span>
                                    <span className="tile-desc">-42% partner stays & flights</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/visa')}
                            >
                                <div className="tile-icon-wrapper visa-glow">
                                    <ShieldCheck size={17} className="text-amber" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Visa & DNV Hub</span>
                                    <span className="tile-desc">2026 entry & embassy rules</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/tax-calculator')}
                            >
                                <div className="tile-icon-wrapper meetup-glow">
                                    <DollarSign size={17} className="text-purple" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Tax & 183d Calc</span>
                                    <span className="tile-desc">Residency & tax estimator</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/event-festival')}
                            >
                                <div className="tile-icon-wrapper search-glow">
                                    <Calendar size={17} className="text-pink" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Festivals & Villages</span>
                                    <span className="tile-desc">Global pop-up residencies</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/guardians')}
                            >
                                <div className="tile-icon-wrapper story-glow">
                                    <UserCheck size={17} className="text-orange" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Local Fixers</span>
                                    <span className="tile-desc">0% markup escrow agents</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={() => handleNavClick('/explore/travel-map')}
                            >
                                <div className="tile-icon-wrapper ai-glow">
                                    <Map size={17} className="text-cyan" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">3D Travel Map</span>
                                    <span className="tile-desc">360° portals & drone tours</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>

                            <button
                                className="deck-tile"
                                onClick={handleOpenSearch}
                            >
                                <div className="tile-icon-wrapper map-glow">
                                    <Search size={17} className="text-emerald" />
                                </div>
                                <div className="tile-text">
                                    <span className="tile-name">Global Search</span>
                                    <span className="tile-desc">Find hubs, stays & creators</span>
                                </div>
                                <ChevronRight size={14} className="tile-arrow" />
                            </button>
                        </div>

                        <div className="action-deck-footer">
                            <button
                                type="button"
                                className="footer-status-pill clickable"
                                onClick={() => handleNavClick('/saved')}
                            >
                                <Bookmark size={13} />
                                <span>Saved Wishlist ({savedCount})</span>
                            </button>

                            <button
                                type="button"
                                className="footer-status-pill clickable"
                                onClick={handleOpenFullSidebar}
                            >
                                <Menu size={13} />
                                <span>All 27 Modules · Lvl {userLevel} ({userXP} XP)</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Ultra-Slim Mobile Bottom Dock (Minimum Screen Footprint) */}
            <div className="mobile-bottom-nav-container">
                <nav
                    id="mobile-bottom-nav"
                    className="mobile-bottom-nav"
                    role="navigation"
                    aria-label="Mobile primary navigation dock"
                >
                    {/* 1. Feed */}
                    <button
                        id="mobile-nav-feed"
                        type="button"
                        className={`nav-item ${isFeedActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/')}
                        aria-label="Home Feed"
                        title="Home Feed"
                        aria-current={isFeedActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Home size={18} className="nav-icon" />
                            {hasNewInsights && <span className="nav-dot-badge" />}
                        </div>
                    </button>

                    {/* 2. Explore (195+ Hubs & Guides) */}
                    <button
                        id="mobile-nav-destinations"
                        type="button"
                        className={`nav-item ${isExploreActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/destinations')}
                        aria-label="Explore Destinations"
                        title="Explore Destinations"
                        aria-current={isExploreActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Globe size={18} className="nav-icon" />
                            <span className="nav-live-dot" />
                        </div>
                    </button>

                    {/* 3. Vibes (360° Video Feed) */}
                    <button
                        id="mobile-nav-vibes"
                        type="button"
                        className={`nav-item ${isVibesActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/vibes')}
                        aria-label="Travel Vibes"
                        title="Travel Vibes"
                        aria-current={isVibesActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Video size={18} className="nav-icon" />
                        </div>
                    </button>

                    {/* 4. Center Compact Hub Launcher (AI Studio, Visas, Tax, Deals & All Tools) */}
                    <div className="nav-center-slot">
                        <button
                            type="button"
                            id="mobile-nav-center-action"
                            className={`nav-center-btn ${isActionDeckOpen ? 'is-open' : ''}`}
                            onClick={handleCenterDockClick}
                            aria-expanded={isActionDeckOpen}
                            aria-label={isActionDeckOpen ? 'Close Command Hub' : 'Open AI & Travel Tools Hub'}
                            title="AI Studio, Deals, Visas & Tools"
                        >
                            {isActionDeckOpen ? (
                                <X size={18} className="center-icon" />
                            ) : (
                                <Sparkles size={18} className="center-icon" />
                            )}
                        </button>
                    </div>

                    {/* 5. Book (Flights, Stays & Deals) */}
                    <button
                        id="mobile-nav-book"
                        type="button"
                        className={`nav-item ${isBookActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/explore/book-travel')}
                        aria-label="Book Flights, Stays & Deals"
                        title="Book Flights & Stays"
                        aria-current={isBookActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Plane size={18} className="nav-icon" />
                        </div>
                    </button>

                    {/* 6. My Trips & Journey */}
                    <button
                        id="mobile-nav-trips"
                        type="button"
                        className={`nav-item ${isTripsActive && !isActionDeckOpen ? 'active' : ''}`}
                        onClick={() => handleNavClick('/user/travel-journey')}
                        aria-label="My Trips & Journey"
                        title="My Trips & Journey"
                        aria-current={isTripsActive ? 'page' : undefined}
                    >
                        <div className="nav-icon-container">
                            <Luggage size={18} className="nav-icon" />
                            {savedCount > 0 && <span className="nav-count-badge">{savedCount}</span>}
                        </div>
                    </button>
                </nav>
            </div>
        </>
    );
};

export default BottomNav;
