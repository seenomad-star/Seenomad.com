import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    Compass,
    Map,
    Video,
    Sparkles,
    Calendar,
    Tag,
    TrendingUp,
    Users,
    Trophy,
    Award,
    Settings as SettingsIcon,
    LifeBuoy,
    Plus,
    Plane,
    ChevronRight,
    Flame,
    Backpack,
    ShieldCheck,
    Building2,
    Star,
    Gift,
    Newspaper
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import ThemeToggle from '../common/ThemeToggle';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToastStore();
    const { rank, level } = useNomadOSStore();
    const [activeTooltip, setActiveTooltip] = useState(null);

    // On mobile screens, the drawer must ALWAYS display all options, labels, and badges fully
    const effectiveCollapsed = isMobile ? false : isCollapsed;

    const showTooltip = (e, text, options = {}) => {
        if (!effectiveCollapsed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setActiveTooltip({
            text,
            subtext: options.subtext,
            badge: options.badge,
            badgeType: options.badgeType,
            top: rect.top + rect.height / 2,
            left: rect.right + 12
        });
    };

    const hideTooltip = () => {
        setActiveTooltip(null);
    };

    useEffect(() => {
        if (!effectiveCollapsed) {
            setActiveTooltip(null);
        }
    }, [effectiveCollapsed]);

    useEffect(() => {
        const handleDismiss = () => setActiveTooltip(null);
        window.addEventListener('scroll', handleDismiss, true);
        window.addEventListener('resize', handleDismiss);
        return () => {
            window.removeEventListener('scroll', handleDismiss, true);
            window.removeEventListener('resize', handleDismiss);
        };
    }, []);

    // Minimal, modern travel-themed grouped navigation containing every feature
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
                    description: 'Live traveler stories, photos & dispatches'
                },
                {
                    icon: Compass,
                    label: 'Explore',
                    to: '/explore/destinations',
                    isExploreHero: true,
                    badge: '195+',
                    badgeType: 'info',
                    description: 'Discover 195+ countries, cities & nomad hubs'
                },
                {
                    icon: Flame,
                    label: 'Trending & Popular',
                    to: '/popular',
                    badge: 'Hot',
                    badgeType: 'hot',
                    description: 'Trending destinations & viral community posts'
                },
                {
                    icon: Video,
                    label: 'Reels',
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
                    description: 'Interactive global map & route visualization'
                }
            ]
        },
        {
            title: 'TRAVEL TOOLS',
            isFeaturedSection: true,
            items: [
                {
                    icon: Backpack,
                    label: 'Trip & Itinerary Builder',
                    to: '/explore/trip-builder',
                    isFeaturedTool: true,
                    badge: 'Studio',
                    badgeType: 'info',
                    description: 'Modular itinerary builder, templates & live budget OS'
                },
                {
                    icon: Sparkles,
                    label: 'Nomad AI Tools',
                    to: '/explore/ai-studio',
                    isFeaturedTool: true,
                    badge: '4-in-1 AI',
                    badgeType: 'ai',
                    description: 'Unified Triipper AI, Super Agent, Twin & Travel Bug'
                },
                {
                    icon: ShieldCheck,
                    label: 'Visa Info',
                    to: '/explore/visa',
                    badge: '2026',
                    badgeType: 'success',
                    description: 'Visa requirement summary, DNV eligibility & embassy FAQ'
                },
                {
                    icon: Plane,
                    label: 'Book Travel',
                    to: '/explore/seenomad-multi',
                    badge: 'Multi-City',
                    badgeType: 'info',
                    description: 'Multi-part expedition booking & Schengen route planner'
                },
                {
                    icon: Plane,
                    label: 'Flight Tracker',
                    to: '/explore/flights-visa',
                    badge: 'Live',
                    badgeType: 'accent',
                    description: 'Live flight corridors, onward tickets & transit rules'
                },
                {
                    icon: Building2,
                    label: 'Hotel Finder',
                    to: '/explore/compare-destinations',
                    badge: 'Stays',
                    badgeType: 'info',
                    description: 'Compare coliving hubs, hotels, fiber & living costs'
                }
            ]
        },
        {
            title: 'QUESTS & REWARDS',
            items: [
                {
                    icon: Trophy,
                    label: 'Challenges',
                    to: '/explore/challenges',
                    badge: 'XP',
                    badgeType: 'warning',
                    description: 'Active travel challenges & city quests'
                },
                {
                    icon: Award,
                    label: 'Milestones',
                    to: '/user/achievements',
                    badge: 'Stamps',
                    badgeType: 'accent',
                    description: 'Verified passport stamps & travel milestones'
                },
                {
                    icon: TrendingUp,
                    label: 'Leaderboard',
                    to: '/explore/rivalry',
                    badge: 'Rank',
                    badgeType: 'hot',
                    description: 'Global traveler leaderboard & rankings'
                },
                {
                    icon: Gift,
                    label: 'Rewards',
                    to: '/explore/passport-perks',
                    badge: 'Perks',
                    badgeType: 'success',
                    description: 'Nomad perks, eSIM discounts, DNA & passport vault'
                }
            ]
        },
        {
            title: 'COMMUNITY & PULSE',
            items: [
                {
                    icon: Users,
                    label: 'Community',
                    to: '/community',
                    badge: 'Meet',
                    badgeType: 'info',
                    description: 'Global traveler community, buddies & city hubs'
                },
                {
                    icon: Star,
                    label: 'Reviews',
                    to: '/explore/culture-community',
                    badge: 'Tips',
                    badgeType: 'info',
                    description: 'Verified traveler reviews, local tips & guardians'
                },
                {
                    icon: Newspaper,
                    label: 'Travel News',
                    to: '/insights-analytics',
                    description: 'Global travel news, safety index & cost trends'
                },
                {
                    icon: Tag,
                    label: 'Travel Deals',
                    to: '/business-partner',
                    badge: 'Save',
                    badgeType: 'success',
                    description: 'Exclusive flight, hotel & coliving partner deals'
                },
                {
                    icon: Calendar,
                    label: 'Events',
                    to: '/event-festival',
                    description: 'Global cultural festivals, pop-up villages & meetups'
                }
            ]
        }
    ];

    const handleCreateAction = () => {
        if (isMobile) toggleSidebar();
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 220, behavior: 'smooth' });
        addToast('Ready to share your travel story! ✨', 'info');
    };

    const handleQuickPlan = (e) => {
        e.stopPropagation();
        if (isMobile) toggleSidebar();
        navigate('/explore/trip-builder');
        addToast('Opening Trip & Itinerary Builder Studio! 🗺️', 'success');
    };

    const sidebarClass = isMobile
        ? `travel-sidebar mobile ${isMobileOpen ? 'mobile-open' : ''}`
        : `travel-sidebar ${effectiveCollapsed ? 'collapsed' : ''}`;

    return (
        <aside className={sidebarClass} aria-label="Main Navigation">
            {/* Navigation Sections */}
            <nav className="travel-sidebar-nav">
                {navSections.map((section, sectionIdx) => (
                    <div
                        key={sectionIdx}
                        className={`nav-section-group ${section.isFeaturedSection ? 'nav-section-featured-tools' : ''}`}
                    >
                        {!effectiveCollapsed ? (
                            <div className="nav-section-title">
                                <span>{section.title}</span>
                            </div>
                        ) : (
                            <div className="nav-section-divider" />
                        )}

                        <ul className="nav-section-list">
                            {section.items.map((item, itemIdx) => {
                                const isHome = item.to === '/';
                                const isMap = item.to.includes('view=map');
                                const isExploreHero = Boolean(item.isExploreHero);
                                const isFeaturedTool = Boolean(item.isFeaturedTool);

                                return (
                                    <li
                                        key={itemIdx}
                                        className={`nav-section-item ${isExploreHero ? 'destinations-nav-section-item' : ''} ${isFeaturedTool ? 'featured-tool-nav-item' : ''}`}
                                    >
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => {
                                                let activeClass = '';
                                                if (isMap) {
                                                    activeClass = location.search.includes('view=map') ? 'active' : '';
                                                } else if (isHome) {
                                                    activeClass = location.pathname === '/' ? 'active' : '';
                                                } else if (isExploreHero) {
                                                    activeClass =
                                                        (isActive ||
                                                            location.pathname.startsWith('/explore/destinations') ||
                                                            location.pathname === '/explore' ||
                                                            location.pathname.startsWith('/destinations')) &&
                                                        !location.search.includes('view=map')
                                                            ? 'active'
                                                            : '';
                                                } else {
                                                    activeClass = isActive ? 'active' : '';
                                                }
                                                return `travel-nav-link ${isExploreHero ? 'destinations-nav-link' : ''} ${isFeaturedTool ? 'featured-tool-nav-link' : ''} ${activeClass}`;
                                            }}
                                            onClick={() => {
                                                hideTooltip();
                                                if (isMobile) toggleSidebar();
                                            }}
                                            onMouseEnter={(e) =>
                                                showTooltip(e, item.label, {
                                                    subtext: item.description,
                                                    badge: item.badge,
                                                    badgeType: item.badgeType
                                                })
                                            }
                                            onMouseLeave={hideTooltip}
                                            aria-label={item.label}
                                        >
                                            <div
                                                className={`nav-icon-container ${isExploreHero ? 'destinations-icon-container' : ''} ${isFeaturedTool ? 'featured-tool-icon-container' : ''}`}
                                            >
                                                <item.icon size={17} className="nav-item-icon" />
                                            </div>

                                            {!effectiveCollapsed && (
                                                <div className="nav-item-content">
                                                    <span
                                                        className={`nav-item-label ${isExploreHero ? 'destinations-item-label' : ''}`}
                                                    >
                                                        {item.label}
                                                    </span>
                                                    {item.badge && (
                                                        <span
                                                            className={`nav-badge nav-badge-${item.badgeType} ${isExploreHero ? 'destinations-badge-pill' : ''}`}
                                                        >
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Compact Travel Action Strip + Mini Traveler Passport Footer */}
            <div className="traveler-passport-footer">
                {!effectiveCollapsed ? (
                    <div className="sidebar-compact-cta-row">
                        <button
                            type="button"
                            className="travel-primary-action-btn compact"
                            onClick={handleCreateAction}
                            title="Share your travel story, review or photo"
                        >
                            <Plus size={15} strokeWidth={2.5} />
                            <span>Share Story</span>
                        </button>
                        <button
                            type="button"
                            className="travel-secondary-action-btn compact"
                            onClick={handleQuickPlan}
                            title="Open Trip & Itinerary Builder"
                        >
                            <Plane size={14} />
                            <span>Plan Trip</span>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="travel-collapsed-action-btn"
                        onClick={() => {
                            hideTooltip();
                            handleCreateAction();
                        }}
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Share Travel Story', { subtext: 'Post photos, tips or guides' })
                        }
                        onMouseLeave={hideTooltip}
                        aria-label="Share Travel Story"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                    </button>
                )}

                <NavLink
                    to="/user/profile"
                    className="traveler-passport-card"
                    onClick={() => {
                        hideTooltip();
                        if (isMobile) toggleSidebar();
                    }}
                    onMouseEnter={(e) =>
                        showTooltip(e, 'Traveler Profile', {
                            subtext: `Alex Rover • Lvl ${level || 4} • ${rank || 'Global Explorer'}`
                        })
                    }
                    onMouseLeave={hideTooltip}
                    aria-label="Traveler Profile: Alex Rover"
                >
                    <div className="traveler-avatar-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                            alt="Alex Rover"
                            className="traveler-avatar-img"
                        />
                        <span className="traveler-status-dot" title="Active Explorer"></span>
                    </div>

                    {!effectiveCollapsed && (
                        <div className="traveler-details">
                            <div className="traveler-name-row">
                                <span className="traveler-name">Alex Rover</span>
                                <span className="traveler-level-pill">Lvl {level || 4}</span>
                            </div>
                            <div className="traveler-meta-row">
                                <span className="traveler-role">{rank || 'Global Explorer'}</span>
                                <span className="traveler-dot-sep">•</span>
                                <span className="traveler-stat">14 Countries</span>
                            </div>
                        </div>
                    )}

                    {!effectiveCollapsed && (
                        <div className="traveler-arrow">
                            <ChevronRight size={14} />
                        </div>
                    )}
                </NavLink>

                {/* Micro Utility Links & Quick Theme Switcher */}
                {!effectiveCollapsed ? (
                    <div className="sidebar-micro-utilities">
                        <NavLink
                            to="/settings"
                            className="micro-util-link"
                            title="Travel Preferences & Settings"
                            onClick={() => isMobile && toggleSidebar()}
                        >
                            <SettingsIcon size={12} />
                            <span>Settings</span>
                        </NavLink>
                        <span className="micro-util-sep">•</span>
                        <NavLink
                            to="/support-utility"
                            className="micro-util-link"
                            title="Travel Support & SOS"
                            onClick={() => isMobile && toggleSidebar()}
                        >
                            <LifeBuoy size={12} />
                            <span>Help</span>
                        </NavLink>
                        <span className="micro-util-sep">•</span>
                        <ThemeToggle variant="pill" size={12} className="sidebar-theme-toggle" />
                    </div>
                ) : (
                    <div
                        className="sidebar-collapsed-theme-wrap"
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Theme Mode', { subtext: 'Toggle Light / Dark mode' })
                        }
                        onMouseLeave={hideTooltip}
                    >
                        <ThemeToggle
                            variant="icon"
                            size={15}
                            className="sidebar-collapsed-theme-btn"
                            title=""
                        />
                    </div>
                )}
            </div>

            {/* Text-based tooltip rendered via Portal to escape any overflow constraints */}
            {effectiveCollapsed &&
                typeof document !== 'undefined' &&
                activeTooltip &&
                createPortal(
                    <div
                        className="sidebar-text-tooltip"
                        style={{
                            top: `${activeTooltip.top}px`,
                            left: `${activeTooltip.left}px`
                        }}
                        role="tooltip"
                    >
                        <div className="sidebar-tooltip-content">
                            <span className="sidebar-tooltip-title">{activeTooltip.text}</span>
                            {activeTooltip.badge && (
                                <span
                                    className={`sidebar-tooltip-badge nav-badge-${activeTooltip.badgeType || 'info'}`}
                                >
                                    {activeTooltip.badge}
                                </span>
                            )}
                        </div>
                        {activeTooltip.subtext && (
                            <span className="sidebar-tooltip-subtext">{activeTooltip.subtext}</span>
                        )}
                        <div className="sidebar-tooltip-arrow" />
                    </div>,
                    document.body
                )}
        </aside>
    );
};

export default Sidebar;
