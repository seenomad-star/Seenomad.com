import React, { useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Compass,
    Map,
    Video,
    Sparkles,
    Calendar,
    Bot,
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
    Flame,
    Backpack,
    ShieldCheck,
    Wifi,
    Building2,
    Star,
    Gift,
    Newspaper
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useToastStore } from '../../store/toastStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useSavedStore } from '../../store/savedStore';
import ThemeToggle from '../common/ThemeToggle';
import '../../styles/MobileDrawer.css';

/**
 * MobileDrawer Component
 * Synchronized with Sidebar.jsx to provide all grouped features on mobile screens.
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

    // Synchronized 4-group navigation structure
    const navSections = [
        {
            title: 'Feed, Explore & Trending',
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
                    icon: Compass,
                    label: 'Explore',
                    to: '/explore/destinations',
                    isExploreHero: true,
                    badge: '195+',
                    badgeType: 'info',
                    description: 'Discover 195+ Countries & Hubs'
                },
                {
                    icon: Flame,
                    label: 'Trending & Popular',
                    to: '/popular',
                    badge: 'Hot',
                    badgeType: 'hot',
                    description: 'Hot destinations & top community stories'
                },
                {
                    icon: Video,
                    label: 'Reels & Shorts',
                    to: '/explore/shorts',
                    badge: '9:16',
                    badgeType: 'accent',
                    description: 'Vertical travel reels & creator shorts'
                },
                {
                    icon: Map,
                    label: 'Travel Map',
                    to: '/explore?view=map',
                    badge: '3D Pin',
                    badgeType: 'info',
                    description: 'Interactive global map & route pins'
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
            title: 'Travel Tools & AI Studio',
            items: [
                {
                    icon: Backpack,
                    label: 'Trip & Itinerary Builder',
                    to: '/explore/trip-builder',
                    badge: 'Builder',
                    badgeType: 'info',
                    description: 'Modular itinerary studio & templates'
                },
                {
                    icon: Sparkles,
                    label: 'Nomad AI Tools',
                    to: '/explore/ai-studio',
                    badge: '4-in-1 AI',
                    badgeType: 'ai',
                    description: 'Triipper, Super Agent, Twin & Travel Bug'
                },
                {
                    icon: ShieldCheck,
                    label: 'Visa Info & Embassy',
                    to: '/explore/visa',
                    badge: '2026',
                    badgeType: 'success',
                    description: 'Visa requirement summary & consular FAQ'
                },
                {
                    icon: Plane,
                    label: 'Book Travel & Multi-City',
                    to: '/explore/seenomad-multi',
                    badge: '4-Leg',
                    badgeType: 'accent',
                    description: 'Multi-part expedition booking & routing'
                },
                {
                    icon: Plane,
                    label: 'Flight Tracker & Matrix',
                    to: '/explore/flights-visa',
                    badge: 'Live',
                    badgeType: 'info',
                    description: 'Flight corridors & onward ticket rules'
                },
                {
                    icon: Building2,
                    label: 'Hotel & Coliving Finder',
                    to: '/explore/compare-destinations',
                    badge: 'Stays',
                    badgeType: 'info',
                    description: 'Compare coliving stays, hotels & costs'
                },
                {
                    icon: Wifi,
                    label: 'Wi-Fi Speed & Market',
                    to: '/explore/connectivity-market',
                    badge: 'Fiber',
                    badgeType: 'success',
                    description: 'Workspace speed map & local guides'
                },
                {
                    icon: Bot,
                    label: 'AI Travel Concierge',
                    to: '/ai-agents',
                    badge: 'Copilot',
                    badgeType: 'ai',
                    description: '24/7 autonomous travel copilot'
                }
            ]
        },
        {
            title: 'Challenges, Milestones & Rewards',
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
                    label: 'Milestones & Passport',
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
                    description: 'Global explorer leaderboard'
                },
                {
                    icon: Gift,
                    label: 'Rewards & Perks',
                    to: '/explore/passport-perks',
                    badge: '40% Off',
                    badgeType: 'success',
                    description: 'Nomad rewards, eSIM deals & perks'
                }
            ]
        },
        {
            title: 'Community, News, Deals & Events',
            items: [
                {
                    icon: Users,
                    label: 'Community & Guardians',
                    to: '/community',
                    badge: 'Meet',
                    badgeType: 'info',
                    description: 'Traveler community & local guardians'
                },
                {
                    icon: Star,
                    label: 'Reviews & Travel Tips',
                    to: '/explore/culture-community',
                    badge: 'Verified',
                    badgeType: 'info',
                    description: 'Traveler reviews, etiquette & local tips'
                },
                {
                    icon: Newspaper,
                    label: 'Travel News & Trends',
                    to: '/insights-analytics',
                    badge: 'Intel',
                    badgeType: 'info',
                    description: 'Global travel news & safety analytics'
                },
                {
                    icon: Tag,
                    label: 'Travel Deals',
                    to: '/business-partner',
                    badge: 'Deals',
                    badgeType: 'success',
                    description: 'Flight, hotel & coliving partner deals'
                },
                {
                    icon: Calendar,
                    label: 'Events & Festivals',
                    to: '/event-festival',
                    badge: '85+ Cities',
                    badgeType: 'accent',
                    description: 'Global cultural gatherings & pop-ups'
                },
                {
                    icon: Luggage,
                    label: 'My Trips & Journey',
                    to: '/user/travel-journey',
                    description: 'Saved routes & bucket list'
                }
            ]
        }
    ];

    const handleCreateAction = () => {
        handleClose();
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 220, behavior: 'smooth' });
        addToast('Ready to share your travel story! ✨', 'info');
    };

    const handleQuickPlan = (e) => {
        e.stopPropagation();
        handleClose();
        navigate('/explore/trip-builder');
        addToast('Opening Trip & Itinerary Builder Studio! 🗺️', 'success');
    };

    return (
        <aside
            className={`mobile-drawer-root ${isOpen ? 'is-open' : 'is-closed'}`}
            aria-hidden={!isOpen}
            id="mobile-navigation-drawer"
        >
            {/* Backdrop overlay */}
            <div
                className="mobile-drawer-backdrop"
                onClick={handleClose}
                aria-label="Close navigation drawer"
            />

            {/* Sliding Drawer Panel */}
            <div
                ref={drawerRef}
                className="mobile-drawer-panel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
            >
                {/* Drawer Header */}
                <div className="mobile-drawer-header">
                    <div className="mobile-drawer-brand">
                        <div className="mobile-drawer-logo-icon">
                            <Compass size={22} className="brand-compass-icon" />
                        </div>
                        <div className="mobile-drawer-brand-text">
                            <span className="mobile-drawer-brand-name">SeeNomad</span>
                            <span className="mobile-drawer-brand-badge">Travel OS</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mobile-drawer-close-btn"
                        onClick={handleClose}
                        aria-label="Close navigation menu"
                        title="Close navigation menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Quick Traveler Passport Strip */}
                <div className="mobile-drawer-user-card">
                    <NavLink
                        to="/user/profile"
                        className="mobile-drawer-profile-link"
                        onClick={handleClose}
                        title="View Traveler Profile"
                    >
                        <div className="mobile-user-avatar-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                alt="Alex Rover avatar"
                                className="mobile-user-avatar-img"
                            />
                            <span className="mobile-user-status-dot" title="Active Explorer"></span>
                        </div>
                        <div className="mobile-user-info">
                            <div className="mobile-user-name-row">
                                <span className="mobile-user-name">Alex Rover</span>
                                <span className="mobile-user-badge">Lvl {level || 4}</span>
                            </div>
                            <div className="mobile-user-meta">
                                <span className="mobile-user-rank">{rank || 'Global Explorer'}</span>
                                <span className="mobile-user-dot">•</span>
                                <span className="mobile-user-stat">14 Countries</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="mobile-user-chevron" />
                    </NavLink>
                </div>

                {/* Primary Quick Actions */}
                <div className="mobile-drawer-actions">
                    <button
                        type="button"
                        className="mobile-action-btn mobile-action-primary"
                        onClick={handleCreateAction}
                    >
                        <Plus size={16} />
                        <span>Share Story</span>
                    </button>
                    <button
                        type="button"
                        className="mobile-action-btn mobile-action-ai"
                        onClick={handleQuickPlan}
                    >
                        <Sparkles size={15} />
                        <span>Trip Builder</span>
                    </button>
                </div>

                {/* Scrollable Navigation Items */}
                <div className="mobile-drawer-scroll-body">
                    {navSections.map((section, sIdx) => (
                        <div key={sIdx} className="mobile-nav-section">
                            <div className="mobile-nav-section-title">
                                <span>{section.title}</span>
                            </div>
                            <ul className="mobile-nav-list">
                                {section.items.map((item, iIdx) => {
                                    const isExploreHero = Boolean(item.isExploreHero);
                                    return (
                                        <li
                                            key={iIdx}
                                            className={`mobile-nav-item ${isExploreHero ? 'mobile-destinations-item' : ''}`}
                                        >
                                            {isExploreHero ? (
                                                <NavLink
                                                    to={item.to}
                                                    end={false}
                                                    className={({ isActive }) => {
                                                        const isItemActive =
                                                            isActive ||
                                                            location.pathname.startsWith('/explore/destinations') ||
                                                            location.pathname === '/explore' ||
                                                            location.pathname.startsWith('/destinations');
                                                        return `mobile-nav-link mobile-destinations-nav-link ${isItemActive ? 'active' : ''}`;
                                                    }}
                                                    onClick={handleClose}
                                                    aria-label="Explore - Discover 195+ Countries"
                                                >
                                                    <div className="mobile-nav-icon-wrap mobile-destinations-icon-wrap">
                                                        <item.icon size={20} className="mobile-nav-icon" />
                                                    </div>
                                                    <div className="mobile-destinations-text-group">
                                                        <span className="mobile-destinations-title">Explore</span>
                                                        <span className="mobile-destinations-subtitle">
                                                            Discover 195+ Countries
                                                        </span>
                                                    </div>
                                                    <span className="mobile-destinations-badge-pill">195+</span>
                                                </NavLink>
                                            ) : (
                                                <NavLink
                                                    to={item.to}
                                                    end={item.exact}
                                                    className={({ isActive }) =>
                                                        `mobile-nav-link ${isActive ? 'active' : ''}`
                                                    }
                                                    onClick={handleClose}
                                                >
                                                    <div className="mobile-nav-icon-wrap">
                                                        <item.icon size={20} className="mobile-nav-icon" />
                                                    </div>
                                                    <div className="mobile-nav-text-group">
                                                        <span className="mobile-nav-label">{item.label}</span>
                                                        <span className="mobile-nav-desc">{item.description}</span>
                                                    </div>
                                                    {item.badge && (
                                                        <span
                                                            className={`mobile-nav-badge badge-${item.badgeType || 'default'}`}
                                                        >
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </NavLink>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Drawer Footer Utilities */}
                <div className="mobile-drawer-footer">
                    <div className="mobile-drawer-util-row">
                        <NavLink
                            to="/settings"
                            className="mobile-drawer-util-link"
                            onClick={handleClose}
                        >
                            <SettingsIcon size={16} />
                            <span>Settings</span>
                        </NavLink>
                        <span className="mobile-drawer-util-divider">|</span>
                        <NavLink
                            to="/support-utility"
                            className="mobile-drawer-util-link"
                            onClick={handleClose}
                        >
                            <LifeBuoy size={16} />
                            <span>Help & Support</span>
                        </NavLink>
                    </div>

                    <div className="mobile-drawer-theme-row">
                        <span className="mobile-drawer-theme-label">Theme Appearance</span>
                        <ThemeToggle variant="pill" size={15} />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default MobileDrawer;
