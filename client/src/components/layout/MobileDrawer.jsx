import React, { useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Map,
    Video,
    Calendar,
    Tag,
    TrendingUp,
    Users,
    Trophy,
    Award,
    Luggage,
    Settings as SettingsIcon,
    LifeBuoy,
    Plus,
    Plane,
    X,
    ChevronRight,
    Bookmark,
    Building2,
    Star,
    Gift,
    Newspaper,
    BookOpen,
    UserCheck,
    Shield,
    Navigation,
    FileText,
    GitBranch,
    Radar,
    Palmtree,
    DollarSign,
    Megaphone,
    Camera,
    Mic,
    GraduationCap,
    Brain,
    LayoutGrid
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useToastStore } from '../../store/toastStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useSavedStore } from '../../store/savedStore';
import {
    LineArtExploreIcon,
    LineArtTripBuilderIcon,
    LineArtAIStudioIcon,
    LineArtTrendingIcon
} from './Sidebar';
import '../../styles/MobileDrawer.css';

/**
 * MobileDrawer Component
 * Synchronized with Sidebar.jsx and MobileDrawer.css so it remains strictly hidden
 * on desktop (>900px) and renders a responsive sliding drawer on mobile/tablet (<=900px).
 */
const MobileDrawer = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobileSidebarOpen, toggleMobileSidebar } = useNavStore();
    const { addToast } = useToastStore();
    const { rank, level } = useNomadOSStore();
    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const savedCount = savedDestinations.length;

    const isOpen = propIsOpen !== undefined ? propIsOpen : isMobileSidebarOpen;
    const handleClose = useCallback(() => {
        if (propOnClose) {
            propOnClose();
        } else {
            toggleMobileSidebar(false);
        }
    }, [propOnClose, toggleMobileSidebar]);

    const drawerRef = useRef(null);
    const touchStartXRef = useRef(null);
    const touchCurrentXRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchCurrentXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchCurrentXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartXRef.current !== null && touchCurrentXRef.current !== null) {
            const diffX = touchCurrentXRef.current - touchStartXRef.current;
            if (diffX < -45) {
                handleClose();
            }
        }
        touchStartXRef.current = null;
        touchCurrentXRef.current = null;
    };

    // Synchronized 4-group navigation structure matching Sidebar.jsx
    const navSections = [
        {
            title: 'FEED & EXPLORE',
            items: [
                {
                    icon: Home,
                    label: 'Home Feed',
                    to: '/',
                    exact: true,
                    badge: 'Live',
                    badgeType: 'accent',
                    description: 'Live nomad stories, reviews & updates'
                },
                {
                    icon: LineArtExploreIcon,
                    label: 'Explore',
                    to: '/explore/destinations',
                    isExploreHero: true,
                    badge: '195+',
                    badgeType: 'info',
                    description: 'Discover 195+ Countries & Hubs'
                },
                {
                    icon: LineArtTrendingIcon,
                    label: 'Trending & Popular',
                    to: '/popular',
                    badge: 'Hot',
                    badgeType: 'hot',
                    description: 'Hot destinations & top community stories'
                },
                {
                    icon: Video,
                    label: 'Vibes',
                    to: '/explore/vibes',
                    badge: 'Live Vibe',
                    badgeType: 'accent',
                    description: 'Sensory travel vibes, ambient soundscapes & trip cloning'
                },
                {
                    icon: Map,
                    label: 'Travel Map',
                    to: '/explore/travel-map',
                    badge: '3D Portal',
                    badgeType: 'info',
                    description: '360° virtual places, drone tour autopilot & 4D spatial map'
                },
                {
                    icon: Bookmark,
                    label: 'Saved & Favorites',
                    to: '/saved',
                    badge: savedCount > 0 ? `${savedCount}` : null,
                    badgeType: 'accent',
                    description: 'Bookmarked spots & stays'
                }
            ]
        },
        {
            title: 'TRAVEL TOOLS',
            items: [
                {
                    icon: Plane,
                    label: 'Book Travel',
                    to: '/explore/book-travel',
                    badge: 'Book',
                    badgeType: 'info',
                    description: 'Flights, Hotels, Holidays, Trains, Buses & Cabs'
                },
                {
                    icon: Radar,
                    label: 'Flight Tracker',
                    to: '/explore/flights-visa',
                    badge: 'Live',
                    badgeType: 'accent',
                    description: 'Flight corridors & onward ticket rules'
                },
                {
                    icon: Building2,
                    label: 'Hotel Finder',
                    to: '/explore/hotel-finder',
                    badge: 'Stays',
                    badgeType: 'info',
                    description: 'Compare coliving stays, hotels & costs'
                },
                {
                    icon: FileText,
                    label: 'Visa Info',
                    to: '/explore/visa',
                    badge: '2026',
                    badgeType: 'success',
                    description: 'Visa requirement summary & consular FAQ'
                },
                {
                    icon: GitBranch,
                    label: 'Itinerary Builder',
                    to: '/explore/planner',
                    badge: 'Routes',
                    badgeType: 'info',
                    description: 'Day-by-day route planner & scheduler'
                },
                {
                    icon: Star,
                    label: 'Reviews',
                    to: '/explore/reviews',
                    badge: 'Verified',
                    badgeType: 'info',
                    description: 'Verified traveler reviews & ratings'
                },
                {
                    icon: Gift,
                    label: 'Rewards',
                    to: '/explore/passport-perks',
                    badge: 'Perks',
                    badgeType: 'success',
                    description: 'Nomad perks, eSIMs & partner discounts'
                },
                {
                    icon: BookOpen,
                    label: 'Destination Guides',
                    to: '/explore/trivenly',
                    badge: 'Playbooks',
                    badgeType: 'info',
                    description: 'Curated city playbooks & local guides'
                },
                {
                    icon: Palmtree,
                    label: 'Local Experiences',
                    to: '/learning-voluntourism',
                    badge: 'Curated',
                    badgeType: 'accent',
                    description: 'Cultural workshops, courses & immersions'
                },
                {
                    icon: UserCheck,
                    label: 'Travel Agents',
                    to: '/explore/guardians',
                    badge: 'Fixers',
                    badgeType: 'info',
                    description: 'Verified local travel agents & fixers'
                },
                {
                    icon: Shield,
                    label: 'Insurance',
                    to: '/support-utility',
                    badge: 'Safety',
                    badgeType: 'success',
                    description: 'Nomad medical insurance & safety monitor'
                },
                {
                    icon: Navigation,
                    label: 'Nearby Places',
                    to: '/explore/speed-test',
                    badge: 'Radar',
                    badgeType: 'accent',
                    description: 'Nearby work cafes, coworking spots & hubs'
                },
                {
                    icon: LineArtTripBuilderIcon,
                    label: 'Trip Builder',
                    to: '/explore/trip-builder',
                    badge: 'Studio',
                    badgeType: 'info',
                    description: 'Modular trip builder & templates'
                },
                {
                    icon: LineArtAIStudioIcon,
                    label: 'Nomad AI Studio',
                    to: '/explore/ai-studio',
                    badge: '4-in-1 AI',
                    badgeType: 'ai',
                    description: 'Triipper, Super Agent, Twin & Travel Bug'
                }
            ]
        },
        {
            title: 'TRIP PLANNING',
            items: [
                {
                    icon: Luggage,
                    label: 'My Trips & Journey',
                    to: '/user/travel-journey',
                    badge: 'Active',
                    badgeType: 'info',
                    description: 'Saved itineraries & travel map'
                },
                {
                    icon: Tag,
                    label: 'Travel Deals',
                    to: '/business-partner/overview',
                    badge: 'Save',
                    badgeType: 'success',
                    description: 'Exclusive partner stays & flights'
                },
                {
                    icon: Calendar,
                    label: 'Events & Festivals',
                    to: '/event-festival',
                    description: 'Global festivals & pop-up villages'
                },
                {
                    icon: Newspaper,
                    label: 'Travel News',
                    to: '/insights-analytics',
                    description: 'Global travel news & cost index'
                },
                {
                    icon: Users,
                    label: 'Community',
                    to: '/community',
                    badge: 'Meet',
                    badgeType: 'info',
                    description: 'Travel buddies & local chapters'
                }
            ]
        },
        {
            title: 'CONTENT & MEDIA',
            items: [
                {
                    icon: Camera,
                    label: 'Photography',
                    to: '/content-media/photography',
                    badge: 'Gallery',
                    badgeType: 'accent',
                    description: 'Explore & share stunning travel photography'
                },
                {
                    icon: Mic,
                    label: 'Podcasts',
                    to: '/content-media/podcasts',
                    badge: 'Audio',
                    badgeType: 'info',
                    description: 'Nomad radio dispatches & creator interviews'
                },
                {
                    icon: GraduationCap,
                    label: 'Learning',
                    to: '/content-media/learning',
                    badge: 'Academy',
                    badgeType: 'success',
                    description: 'Masterclasses on photography, remote work & languages'
                },
                {
                    icon: Brain,
                    label: 'Travel Quiz',
                    to: '/content-media/travel-quiz',
                    badge: 'XP',
                    badgeType: 'warning',
                    description: 'Test your geography & nomad trivia for bonus XP'
                },
                {
                    icon: LayoutGrid,
                    label: 'Post Templates',
                    to: '/content-media/post-templates',
                    badge: 'Viral',
                    badgeType: 'hot',
                    description: 'Ready-to-use carousel, reel & itinerary hooks'
                },
                {
                    icon: Calendar,
                    label: 'Content Calendar',
                    to: '/content-media/content-calendar',
                    badge: 'Plan',
                    badgeType: 'info',
                    description: 'Schedule reels, photo drops & podcast episodes'
                }
            ]
        },
        {
            title: 'QUESTS & RANKINGS',
            items: [
                {
                    icon: Trophy,
                    label: 'Challenges',
                    to: '/explore/challenges',
                    badge: '2.5x XP',
                    badgeType: 'warning',
                    description: 'Viral nomad challenges & city quests'
                },
                {
                    icon: Award,
                    label: 'Milestones',
                    to: '/user/achievements',
                    badge: 'Stamps',
                    badgeType: 'accent',
                    description: 'Verified passport stamps & milestones'
                },
                {
                    icon: TrendingUp,
                    label: 'Leaderboard',
                    to: '/explore/rivalry',
                    badge: 'Rank',
                    badgeType: 'hot',
                    description: 'Global nomad XP rankings'
                }
            ]
        },
        {
            title: 'BUSINESS',
            items: [
                {
                    icon: DollarSign,
                    label: 'Monetize',
                    to: '/business-partner/monetize',
                    badge: '+24%',
                    badgeType: 'success',
                    description: 'Tips, subscriptions, brand deals & digital products'
                },
                {
                    icon: DollarSign,
                    label: 'Creator Earnings',
                    to: '/business-partner/creator-earnings',
                    badge: '$48.9k',
                    badgeType: 'info',
                    description: 'Creator payouts, revenue ledger & invoices'
                },
                {
                    icon: TrendingUp,
                    label: 'Analytics',
                    to: '/business-partner/analytics',
                    badge: 'RPM',
                    badgeType: 'accent',
                    description: 'Audience geography, conversions & content ROI'
                },
                {
                    icon: Megaphone,
                    label: 'Ad Manager',
                    to: '/business-partner/ad-manager',
                    badge: 'Ads',
                    badgeType: 'info',
                    description: 'Promote stays, tours & creator reels'
                },
                {
                    icon: Building2,
                    label: 'Corporate',
                    to: '/business-partner/corporate',
                    badge: 'B2B',
                    badgeType: 'info',
                    description: 'Corporate retreats, policy manager & invoicing'
                }
            ]
        }
    ];

    const handleNavigate = (path) => {
        navigate(path);
        handleClose();
    };

    const handleShareStory = () => {
        handleClose();
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 220, behavior: 'smooth' });
        addToast('Ready to share your travel story! ✨', 'info');
    };

    const handlePlanTrip = () => {
        handleClose();
        navigate('/explore/trip-builder');
        addToast('Opening Trip & Itinerary Builder Studio! 🗺️', 'success');
    };

    return (
        <div className={`mobile-drawer-root ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
            <div
                className="mobile-drawer-backdrop"
                onClick={handleClose}
                aria-hidden="true"
            />

            <aside
                ref={drawerRef}
                className="mobile-drawer-panel"
                aria-label="Mobile Navigation Drawer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* 1. Drawer Header */}
                <div className="mobile-drawer-header">
                    <div
                        className="mobile-drawer-brand"
                        onClick={() => handleNavigate('/')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/')}
                    >
                        <div className="mobile-drawer-logo-icon">
                            <Plane size={18} />
                        </div>
                        <div className="mobile-drawer-brand-text">
                            <span className="mobile-drawer-brand-name">SeeNomad</span>
                            <span className="mobile-drawer-brand-badge">Global Travel OS</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mobile-drawer-close-btn"
                        onClick={handleClose}
                        aria-label="Close navigation menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 2. Primary Quick Actions */}
                <div className="mobile-drawer-actions">
                    <button
                        type="button"
                        className="mobile-action-btn mobile-action-primary"
                        onClick={handleShareStory}
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        <span>Share Story</span>
                    </button>
                    <button
                        type="button"
                        className="mobile-action-btn mobile-action-ai"
                        onClick={handlePlanTrip}
                    >
                        <Plane size={15} strokeWidth={2.2} />
                        <span>Plan Trip</span>
                    </button>
                </div>

                {/* 4. Scrollable Navigation List */}
                <nav className="mobile-drawer-scroll-body">
                    {navSections.map((section, sIdx) => (
                        <div key={sIdx} className="mobile-nav-section">
                            <div className="mobile-nav-section-title">{section.title}</div>
                            <ul className="mobile-nav-list">
                                {section.items.map((item, iIdx) => {
                                    const isHome = item.to === '/';
                                    const isMap = item.to.includes('view=map');
                                    const isExploreHero = Boolean(item.isExploreHero);

                                    return (
                                        <li
                                            key={iIdx}
                                            className={`mobile-nav-item ${isExploreHero ? 'mobile-destinations-item' : ''}`}
                                        >
                                            <NavLink
                                                to={item.to}
                                                end={item.exact}
                                                onClick={handleClose}
                                                className={({ isActive }) => {
                                                    let active = isActive;
                                                    if (isHome) {
                                                        active = location.pathname === '/';
                                                    } else if (isMap) {
                                                        active =
                                                            location.pathname.startsWith('/explore') &&
                                                            location.search.includes('view=map');
                                                    } else if (item.to === '/explore/destinations') {
                                                        active =
                                                            (location.pathname === '/explore' ||
                                                                location.pathname.startsWith('/explore/destinations')) &&
                                                            !location.search.includes('view=map');
                                                    }
                                                    return `mobile-nav-link ${active ? 'active' : ''} ${
                                                        isExploreHero ? 'mobile-destinations-nav-link' : ''
                                                    }`;
                                                }}
                                            >
                                                <span
                                                    className={`mobile-nav-icon-wrap ${
                                                        isExploreHero ? 'mobile-destinations-icon-wrap' : ''
                                                    }`}
                                                >
                                                    <item.icon size={18} strokeWidth={2} className="mobile-nav-icon" />
                                                </span>
                                                <div
                                                    className={`mobile-nav-text-group ${
                                                        isExploreHero ? 'mobile-destinations-text-group' : ''
                                                    }`}
                                                >
                                                    <span
                                                        className={`mobile-nav-label ${
                                                            isExploreHero ? 'mobile-destinations-title' : ''
                                                        }`}
                                                    >
                                                        {item.label}
                                                    </span>
                                                    {item.description && (
                                                        <span
                                                            className={`mobile-nav-desc ${
                                                                isExploreHero ? 'mobile-destinations-subtitle' : ''
                                                            }`}
                                                        >
                                                            {item.description}
                                                        </span>
                                                    )}
                                                </div>
                                                {item.badge && (
                                                    <span
                                                        className={`mobile-nav-badge badge-${
                                                            item.badgeType || 'info'
                                                        } ${isExploreHero ? 'mobile-destinations-badge-pill' : ''}`}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* 5. Drawer Footer */}
                <div className="mobile-drawer-footer">
                    <div className="mobile-drawer-util-row">
                        <NavLink
                            to="/settings"
                            onClick={handleClose}
                            className="mobile-drawer-util-link"
                        >
                            <SettingsIcon size={16} />
                            <span>Settings & Theme</span>
                        </NavLink>
                        <span className="mobile-drawer-util-divider">•</span>
                        <NavLink
                            to="/support-utility"
                            onClick={handleClose}
                            className="mobile-drawer-util-link"
                        >
                            <LifeBuoy size={16} />
                            <span>Help & Safety</span>
                        </NavLink>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default MobileDrawer;
