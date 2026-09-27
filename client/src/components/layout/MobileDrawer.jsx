import React, { useEffect, useRef, useCallback } from 'react';
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
    X,
    ChevronRight,
    Bookmark,
    Flame
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useToastStore } from '../../store/toastStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useSavedStore } from '../../store/savedStore';
import { useDestinationStore } from '../../store/destinationFilterStore';
import ThemeToggle from '../common/ThemeToggle';
import DomainStatusFilterGroup from './DomainStatusFilterGroup';
import SidebarDestinationList from './SidebarDestinationList';
import '../../styles/MobileDrawer.css';

/**
 * MobileDrawer Component
 * A mobile-friendly sliding navigation drawer that slides smoothly from the left
 * when the toggle button is triggered. Contains full travel navigation,
 * quick actions, user passport profile, and utility controls.
 */
const MobileDrawer = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobileSidebarOpen, toggleMobileSidebar } = useNavStore();
    const { addToast } = useToastStore();
    const { rank, level, xp } = useNomadOSStore();
    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const { domainStatus, setDomainStatus } = useDestinationStore();
    const savedCount = savedDestinations.length;

    // Support both store-driven and prop-driven state
    const isOpen = propIsOpen !== undefined ? propIsOpen : isMobileSidebarOpen;
    const handleClose = useCallback(() => {
        if (propOnClose) {
            propOnClose();
        } else {
            toggleMobileSidebar(false);
        }
    }, [propOnClose, toggleMobileSidebar]);

    /**
     * Mobile filter logic for Destinations domain status
     */
    const handleDomainStatusFilter = (statusId) => {
        const nextStatus = domainStatus === statusId ? 'all' : statusId;
        setDomainStatus(nextStatus);

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

        handleClose();
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

        handleClose();
    };

    const drawerRef = useRef(null);
    const touchStartXRef = useRef(null);
    const touchCurrentXRef = useRef(null);

    // Lock body scrolling when drawer is open on mobile
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    // Touch swipe left to dismiss
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
            // Swiped left by at least 45px
            if (diffX < -45) {
                handleClose();
            }
        }
        touchStartXRef.current = null;
        touchCurrentXRef.current = null;
    };

    // Grouped navigation structure
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
        navigate('/ai-agents');
        addToast('Opening AI Travel Concierge to plan your next journey! 🗺️', 'success');
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
                        <span>Plan Trip</span>
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
                                    const isDestinations = item.to === '/explore/destinations';
                                    return (
                                        <li key={iIdx} className={`mobile-nav-item ${isDestinations ? 'mobile-destinations-item' : ''}`}>
                                            {isDestinations ? (
                                                <NavLink
                                                    to={item.to}
                                                    end={false}
                                                    className={({ isActive }) => {
                                                        const isItemActive = isActive ||
                                                            location.pathname.startsWith('/explore/destinations') ||
                                                            location.pathname === '/explore' ||
                                                            location.pathname.startsWith('/destinations');
                                                        return `mobile-nav-link mobile-destinations-nav-link ${isItemActive ? 'active' : ''}`;
                                                    }}
                                                    onClick={handleClose}
                                                    aria-label="Destinations - Explore 195+ Countries"
                                                >
                                                    <div className="mobile-nav-icon-wrap mobile-destinations-icon-wrap">
                                                        <item.icon size={20} className="mobile-nav-icon" />
                                                    </div>
                                                    <div className="mobile-destinations-text-group">
                                                        <span className="mobile-destinations-title">Destinations</span>
                                                        <span className="mobile-destinations-subtitle">Explore 195+ Countries</span>
                                                    </div>
                                                    <span className="mobile-destinations-badge-pill">
                                                        195+
                                                    </span>
                                                </NavLink>
                                            ) : (
                                                <NavLink
                                                    to={item.to}
                                                    end={item.exact}
                                                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
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
                                                        <span className={`mobile-nav-badge badge-${item.badgeType || 'default'}`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </NavLink>
                                            )}
                                            {isDestinations && (
                                                <>
                                                    <DomainStatusFilterGroup
                                                        activeStatus={domainStatus}
                                                        onSelectStatus={handleDomainStatusFilter}
                                                        onClear={handleClearDomainFilter}
                                                        onStatusChange={handleClose}
                                                        className="drawer-domain-filter"
                                                    />
                                                    <SidebarDestinationList
                                                        activeDomainStatus={domainStatus}
                                                        onSelectDestination={handleClose}
                                                        isMobile={true}
                                                        defaultExpanded={true}
                                                    />
                                                </>
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
