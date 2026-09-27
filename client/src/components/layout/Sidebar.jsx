import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Compass,
    Globe,
    Map,
    Video,
    Sparkles,
    Calendar,
    Bot,
    Tag,
    Leaf,
    TrendingUp,
    Users,
    Trophy,
    Award,
    Luggage,
    Settings as SettingsIcon,
    LifeBuoy,
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
    Plane,
    ChevronRight,
    MapPin,
    Bookmark,
    Flame
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useSavedStore } from '../../store/savedStore';
import { useDestinationStore } from '../../store/destinationFilterStore';
import ThemeToggle from '../common/ThemeToggle';
import DomainStatusFilterGroup from './DomainStatusFilterGroup';
import SidebarDestinationList from './SidebarDestinationList';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToastStore();
    const { rank, level, xp } = useNomadOSStore();
    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const savedCount = savedDestinations.length;
    const { domainStatus, setDomainStatus } = useDestinationStore();
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
            left: rect.right + 12,
        });
    };

    const hideTooltip = () => {
        setActiveTooltip(null);
    };

    // Auto-dismiss tooltip when sidebar state changes or window scrolls/resizes
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

    // Grouped navigation structure authentic to a premier global travel platform
    const navSections = [
        {
            title: 'Explore & Discover',
            items: [
                { icon: Compass, label: 'Travel Feed', to: '/', exact: true, description: 'Live nomad stories & updates' },
                { icon: Globe, label: 'Destinations', to: '/explore/destinations', badge: '195+', badgeType: 'info', description: 'City guides & hidden gems' },
                { icon: Bookmark, label: 'Saved Wishlist', to: '/saved', badge: savedCount > 0 ? `${savedCount}` : null, badgeType: 'accent', description: 'Bookmarked spots & stays' },
                { icon: Map, label: 'Interactive Map', to: '/explore?view=map', badge: 'Live', badgeType: 'accent', description: 'Pins & route visualization' },
                { icon: Flame, label: 'Trending & Popular', to: '/popular', badge: 'Hot', badgeType: 'hot', description: 'Hot discussions & top community stories' },
                { icon: Calendar, label: 'Festivals & Events', to: '/event-festival', description: 'Global cultural gatherings' },
            ]
        },
        {
            title: 'Plan & Travel',
            items: [
                { icon: Bot, label: 'AI Concierge', to: '/ai-agents', badge: 'AI', badgeType: 'ai', description: 'Smart itineraries & visa help' },
                { icon: Tag, label: 'Deals & Stays', to: '/business-partner', badge: 'Perks', badgeType: 'success', description: 'Nomad stays & partner discounts' },
                { icon: Leaf, label: 'Eco Voluntourism', to: '/learning-voluntourism', description: 'Impact journeys & retreats' },
                { icon: TrendingUp, label: 'Travel Trends', to: '/insights-analytics', description: 'Safety & cost of living index' },
            ]
        },
        {
            title: 'Community & Quests',
            items: [
                { icon: Users, label: 'Nomad Community', to: '/community', badge: 'Meet', badgeType: 'info', description: 'Travel buddies & city hubs' },
                { icon: Trophy, label: 'Travel Quests', to: '/travel-games', description: 'Country checklists & challenges' },
                { icon: Award, label: 'Passport Stamps', to: '/user/achievements', badge: 'XP', badgeType: 'accent', description: 'Milestones & verified stamps' },
                { icon: Luggage, label: 'My Trips', to: '/user/travel-journey', description: 'Saved routes & bucket list' },
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
        navigate('/ai-agents');
        addToast('Opening AI Travel Concierge to plan your next journey! 🗺️', 'success');
    };

    /**
     * JavaScript logic in Sidebar to filter the list of displayed destinations
     * based on user selection in the domain status button group (Available, Taken, Premium).
     * This updates the global filter store and URL parameters, triggering immediate
     * reactive re-filtering of the displayed destinations list in Destinations.jsx.
     */
    const handleDomainStatusFilter = (statusId) => {
        const nextStatus = domainStatus === statusId ? 'all' : statusId;

        // 1. Update centralized store state
        setDomainStatus(nextStatus);

        // 2. Sync URL query parameters and navigate if necessary
        const isDestinationsRoute =
            location.pathname.startsWith('/explore/destinations') ||
            location.pathname === '/explore' ||
            location.pathname.startsWith('/destinations');

        const searchParams = new URLSearchParams(location.search);
        if (nextStatus === 'all') {
            searchParams.delete('domainStatus');
            searchParams.delete('status');
        } else {
            searchParams.set('domainStatus', nextStatus);
        }
        const newSearch = searchParams.toString();
        const targetSearch = newSearch ? `?${newSearch}` : '';

        if (!isDestinationsRoute) {
            navigate(`/explore/destinations${targetSearch}`);
        } else {
            navigate(
                {
                    pathname: location.pathname,
                    search: targetSearch
                },
                { replace: true }
            );
        }

        // Close mobile drawer / sidebar if on small screen
        if (isMobile && toggleSidebar) {
            toggleSidebar();
        }
    };

    const handleClearDomainFilter = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setDomainStatus('all');

        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('domainStatus');
        searchParams.delete('status');
        const newSearch = searchParams.toString();
        const targetSearch = newSearch ? `?${newSearch}` : '';

        navigate(
            {
                pathname: location.pathname,
                search: targetSearch
            },
            { replace: true }
        );

        if (isMobile && toggleSidebar) {
            toggleSidebar();
        }
    };

    const sidebarClass = isMobile
        ? `travel-sidebar mobile ${isMobileOpen ? 'mobile-open' : ''}`
        : `travel-sidebar ${effectiveCollapsed ? 'collapsed' : ''}`;

    return (
        <aside className={sidebarClass} aria-label="Main Navigation">
            {/* Sidebar Action / Control Header (Brand is anchored in preferred Top Navbar) */}
            <div className={`travel-sidebar-header ${effectiveCollapsed ? 'collapsed-header' : ''}`}>
                {!effectiveCollapsed ? (
                    <>
                        <div className="sidebar-header-label-wrapper">
                            <span className="sidebar-header-label">Workspace</span>
                        </div>

                        {!isMobile && (
                            <button
                                type="button"
                                className="sidebar-toggle-btn sidebar-collapse-toggle"
                                onClick={toggleSidebar}
                                title="Collapse sidebar (⌘B)"
                                aria-label="Collapse sidebar"
                            >
                                <PanelLeftClose size={16} />
                            </button>
                        )}
                        {isMobile && (
                            <button
                                type="button"
                                className="sidebar-close-mobile-btn"
                                onClick={toggleSidebar}
                                title="Close navigation menu"
                                aria-label="Close navigation menu"
                            >
                                <PanelLeftClose size={18} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="sidebar-collapsed-header-inner">
                        {!isMobile && (
                            <button
                                type="button"
                                className="sidebar-toggle-btn sidebar-collapse-toggle collapsed-toggle"
                                onClick={() => {
                                    hideTooltip();
                                    toggleSidebar();
                                }}
                                onMouseEnter={(e) => showTooltip(e, 'Expand Sidebar', { subtext: 'Shortcut: ⌘B' })}
                                onMouseLeave={hideTooltip}
                                aria-label="Expand sidebar"
                            >
                                <PanelLeftOpen size={16} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Sections */}
            <nav className="travel-sidebar-nav">
                {navSections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="nav-section-group">
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
                                const isDestinations = item.to === '/explore/destinations';
                                
                                return (
                                    <li 
                                        key={itemIdx}
                                        className={`nav-section-item ${isDestinations ? 'destinations-nav-section-item' : ''}`}
                                    >
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => {
                                                let activeClass = '';
                                                if (isMap) {
                                                    activeClass = location.search.includes('view=map') ? 'active' : '';
                                                } else if (isHome) {
                                                    activeClass = location.pathname === '/' ? 'active' : '';
                                                } else if (isDestinations) {
                                                    activeClass = (isActive || location.pathname.startsWith('/explore/destinations') || location.pathname === '/explore' || location.pathname.startsWith('/destinations')) ? 'active' : '';
                                                } else {
                                                    activeClass = isActive ? 'active' : '';
                                                }
                                                return `travel-nav-link ${isDestinations ? 'destinations-nav-link' : ''} ${activeClass}`;
                                            }}
                                            onClick={() => {
                                                hideTooltip();
                                                if (isMobile) toggleSidebar();
                                            }}
                                            onMouseEnter={(e) => showTooltip(e, item.label, {
                                                subtext: item.description,
                                                badge: item.badge,
                                                badgeType: item.badgeType
                                            })}
                                            onMouseLeave={hideTooltip}
                                            aria-label={item.label}
                                        >
                                            <div className={`nav-icon-container ${isDestinations ? 'destinations-icon-container' : ''}`}>
                                                <item.icon size={isDestinations ? 20 : 19} className="nav-item-icon" />
                                            </div>

                                            {!effectiveCollapsed && (
                                                <div className={`nav-item-content ${isDestinations ? 'destinations-item-content' : ''}`}>
                                                    <div className={isDestinations ? 'destinations-text-group' : 'nav-text-group'}>
                                                        <span className={`nav-item-label ${isDestinations ? 'destinations-item-label' : ''}`}>{item.label}</span>
                                                        {isDestinations && (
                                                            <span className="destinations-item-sub">Explore 195+ Countries</span>
                                                        )}
                                                    </div>
                                                    {item.badge && (
                                                        <span className={`nav-badge nav-badge-${item.badgeType} ${isDestinations ? 'destinations-badge-pill' : ''}`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </NavLink>
                                        {isDestinations && (
                                            <>
                                                <DomainStatusFilterGroup
                                                    collapsed={effectiveCollapsed}
                                                    activeStatus={domainStatus}
                                                    onSelectStatus={handleDomainStatusFilter}
                                                    onClear={handleClearDomainFilter}
                                                    onStatusChange={() => {
                                                        if (isMobile) toggleSidebar();
                                                    }}
                                                />
                                                {!effectiveCollapsed && (
                                                    <SidebarDestinationList
                                                        activeDomainStatus={domainStatus}
                                                        onSelectDestination={() => {
                                                            if (isMobile && toggleSidebar) toggleSidebar();
                                                        }}
                                                        isMobile={Boolean(isMobile)}
                                                        defaultExpanded={true}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Travel Action Button (Share Story & Plan Trip) */}
            <div className="travel-sidebar-actions">
                {!effectiveCollapsed ? (
                    <div className="action-button-group">
                        <button
                            type="button"
                            className="travel-primary-action-btn"
                            onClick={handleCreateAction}
                            title="Share your travel photos, tips or story"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            <span>Share Travel Story</span>
                        </button>
                        <button
                            type="button"
                            className="travel-secondary-action-btn"
                            onClick={handleQuickPlan}
                            title="Plan your next itinerary with AI Concierge"
                        >
                            <Plane size={15} />
                            <span>Plan a Trip</span>
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
                        onMouseEnter={(e) => showTooltip(e, 'Share Travel Story', { subtext: 'Post photos, tips or guides' })}
                        onMouseLeave={hideTooltip}
                        aria-label="Share Travel Story"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {/* Traveler Mini Passport Status Card at Bottom */}
            <div className="traveler-passport-footer">
                <NavLink
                    to="/user/profile"
                    className="traveler-passport-card"
                    onClick={() => {
                        hideTooltip();
                        if (isMobile) toggleSidebar();
                    }}
                    onMouseEnter={(e) => showTooltip(e, 'Traveler Profile', { subtext: `Alex Rover • Lvl ${level || 4} • ${rank || 'Global Explorer'}` })}
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
                            <ChevronRight size={15} />
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
                            <SettingsIcon size={13} />
                            <span>Settings</span>
                        </NavLink>
                        <span className="micro-util-sep">|</span>
                        <NavLink 
                            to="/support-utility" 
                            className="micro-util-link"
                            title="Travel Support & SOS"
                            onClick={() => isMobile && toggleSidebar()}
                        >
                            <LifeBuoy size={13} />
                            <span>Help</span>
                        </NavLink>
                        <span className="micro-util-sep">|</span>
                        <ThemeToggle 
                            variant="pill" 
                            size={13} 
                            className="sidebar-theme-toggle"
                        />
                    </div>
                ) : (
                    <div 
                        className="sidebar-collapsed-theme-wrap"
                        onMouseEnter={(e) => showTooltip(e, 'Theme Mode', { subtext: 'Toggle Light / Dark mode' })}
                        onMouseLeave={hideTooltip}
                    >
                        <ThemeToggle 
                            variant="icon" 
                            size={16} 
                            className="sidebar-collapsed-theme-btn"
                            title=""
                        />
                    </div>
                )}
            </div>

            {/* Text-based tooltip rendered via Portal to escape any overflow constraints */}
            {effectiveCollapsed && typeof document !== 'undefined' && activeTooltip && createPortal(
                <div
                    className="sidebar-text-tooltip"
                    style={{
                        top: `${activeTooltip.top}px`,
                        left: `${activeTooltip.left}px`,
                    }}
                    role="tooltip"
                >
                    <div className="sidebar-tooltip-content">
                        <span className="sidebar-tooltip-title">{activeTooltip.text}</span>
                        {activeTooltip.badge && (
                            <span className={`sidebar-tooltip-badge nav-badge-${activeTooltip.badgeType || 'info'}`}>
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
