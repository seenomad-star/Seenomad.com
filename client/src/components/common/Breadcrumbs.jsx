import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    ChevronRight,
    Compass,
    Globe,
    Bookmark,
    Flame,
    Users,
    Bot,
    Trophy,
    Calendar,
    BarChart3,
    BookOpen,
    Shield,
    Briefcase,
    Settings,
    User,
    Sparkles,
    ArrowLeft,
    Copy,
    Check,
    MapPin,
    FileText,
    Video
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import './Breadcrumbs.css';

/**
 * Route dictionary for human-friendly breadcrumb segments, icons, and badges.
 */
const ROUTE_CONFIG = {
    'explore': {
        name: 'Explore',
        icon: Compass
    },
    'destinations': {
        name: 'Global Destinations',
        icon: Globe,
        badge: '195+'
    },
    'visa': {
        name: 'Visa Requirements',
        icon: Shield,
        badge: '2026'
    },
    'visas': {
        name: 'Nomad Visas',
        icon: Shield
    },
    'coworking': {
        name: 'Coworking & Cafes',
        icon: Compass
    },
    'coliving': {
        name: 'Coliving Hubs',
        icon: Compass
    },
    'saved': {
        name: 'Saved Wishlist',
        icon: Bookmark
    },
    'favorites': {
        name: 'Saved Wishlist',
        icon: Bookmark
    },
    'popular': {
        name: 'Trending & Popular',
        icon: Flame,
        badge: 'Hot'
    },
    'community': {
        name: 'Nomad Community',
        icon: Users
    },
    'meetups': {
        name: 'Global Meetups',
        icon: Users
    },
    'bounty-board': {
        name: 'Bounty Board',
        icon: Trophy
    },
    'collab-board': {
        name: 'Collab Projects',
        icon: Users
    },
    'creator-studio': {
        name: 'Creator Studio',
        icon: Video
    },
    'ai-agents': {
        name: 'AI Travel Agents',
        icon: Bot,
        badge: 'AI Copilot'
    },
    'travel-games': {
        name: 'Quests & Rewards',
        icon: Trophy,
        badge: 'XP'
    },
    'event-festival': {
        name: 'Festivals & Events',
        icon: Calendar
    },
    'learning-voluntourism': {
        name: 'Eco Voluntourism',
        icon: BookOpen
    },
    'insights-analytics': {
        name: 'Travel Trends & Analytics',
        icon: BarChart3
    },
    'support-utility': {
        name: 'Utilities & Toolkit',
        icon: Shield
    },
    'business-partner': {
        name: 'Partner Hub & Deals',
        icon: Briefcase
    },
    'download-app': {
        name: 'Download App',
        icon: Sparkles
    },
    'partner-with-us': {
        name: 'Partner With Us',
        icon: Briefcase
    },
    'about': {
        name: 'About SeeNomad',
        icon: Compass
    },
    'legal': {
        name: 'Legal & Policies',
        icon: FileText
    },
    'settings': {
        name: 'Settings',
        icon: Settings
    },
    'user': {
        name: 'Nomad Hub',
        icon: User
    },
    'profile': {
        name: 'Traveler Profile',
        icon: User
    },
    'achievements': {
        name: 'Passport Stamps',
        icon: Trophy
    },
    'travel-journey': {
        name: 'My Trips',
        icon: Compass
    },
    'notifications': {
        name: 'Notifications',
        icon: Sparkles
    }
};

/**
 * Breadcrumbs Component
 * Dynamically updates based on the user's current route and search context.
 * Enhances site navigation context with semantic markup, rich icons,
 * interactive parent links, and quick navigation utilities.
 */
const Breadcrumbs = ({
    className = '',
    showHome = true,
    showActions = true,
    showOnHome = false,
    customCrumbs = null
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [copied, setCopied] = useState(false);

    // Compute breadcrumb items based on current path and search params
    const breadcrumbItems = useMemo(() => {
        if (customCrumbs && Array.isArray(customCrumbs)) {
            return customCrumbs;
        }

        const pathnames = location.pathname.split('/').filter(Boolean);
        const searchParams = new URLSearchParams(location.search);

        const items = [];

        // Build path step by step
        let accumulatedPath = '';
        for (let i = 0; i < pathnames.length; i++) {
            const segment = pathnames[i];
            accumulatedPath += `/${segment}`;

            const config = ROUTE_CONFIG[segment.toLowerCase()];
            const rawLabel = segment
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const isLastPathSegment = i === pathnames.length - 1;

            items.push({
                path: accumulatedPath,
                label: config?.name || rawLabel,
                icon: config?.icon || Compass,
                badge: config?.badge || null,
                isCurrent: isLastPathSegment && !location.search
            });
        }

        // Contextual query crumb (e.g. search filter or active view)
        const searchQuery = searchParams.get('search');
        const domainStatus = searchParams.get('domainStatus');
        const viewMode = searchParams.get('view');
        const category = searchParams.get('category');

        if (searchQuery) {
            items.push({
                path: `${location.pathname}?search=${encodeURIComponent(searchQuery)}`,
                label: `"${searchQuery}"`,
                icon: MapPin,
                badge: 'Search',
                isCurrent: true
            });
        } else if (domainStatus && domainStatus !== 'all') {
            const statusCapitalized = domainStatus.charAt(0).toUpperCase() + domainStatus.slice(1);
            items.push({
                path: `${location.pathname}?domainStatus=${domainStatus}`,
                label: `${statusCapitalized} Hubs`,
                icon: Globe,
                badge: 'Filter',
                isCurrent: true
            });
        } else if (viewMode === 'map') {
            items.push({
                path: `${location.pathname}?view=map`,
                label: 'Interactive Map',
                icon: Compass,
                badge: 'Live',
                isCurrent: true
            });
        } else if (category) {
            const catCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
            items.push({
                path: `${location.pathname}?category=${category}`,
                label: `${catCapitalized} Spots`,
                icon: Compass,
                badge: 'Category',
                isCurrent: true
            });
        }

        // If at root '/', provide clear context
        if (items.length === 0) {
            items.push({
                path: '/',
                label: 'Live Travel Feed',
                icon: Compass,
                badge: 'Live',
                isCurrent: true
            });
        }

        // Mark the last item strictly as current
        if (items.length > 0) {
            items.forEach((item, idx) => {
                item.isCurrent = idx === items.length - 1;
            });
        }

        return items;
    }, [location.pathname, location.search, customCrumbs]);

    // Copy current route URL to clipboard
    const handleCopyLink = async () => {
        try {
            const fullUrl = window.location.href;
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            addToast('Route URL copied to clipboard! 📋', 'success');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            addToast('Unable to copy link', 'error');
        }
    };

    // Go back or up one level
    const handleGoBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else if (breadcrumbItems.length > 1) {
            navigate(breadcrumbItems[breadcrumbItems.length - 2].path);
        } else {
            navigate('/');
        }
    };

    const isRoot = location.pathname === '/' && !location.search;
    if (isRoot && !showOnHome) return null;

    return (
        <aside
            className={`dynamic-breadcrumbs-container ${isRoot ? 'is-root' : ''} ${className}`}
            role="region"
            aria-label="Navigation trail"
        >
            {/* Semantic Breadcrumbs Navigation */}
            <nav className="dynamic-breadcrumbs-nav" aria-label="Breadcrumb">
                <ol className="dynamic-breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
                    {/* Home Link */}
                    {showHome && (
                        <li
                            className="breadcrumb-crumb-item"
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            <Link
                                to="/"
                                className="breadcrumb-crumb-link breadcrumb-home-link"
                                title="Return to SeeNomad Home"
                                itemProp="item"
                            >
                                <Home size={15} className="breadcrumb-crumb-icon" />
                                <span itemProp="name">Home</span>
                            </Link>
                            <meta itemProp="position" content="1" />
                            <span className="breadcrumb-separator" aria-hidden="true">
                                <ChevronRight size={13} />
                            </span>
                        </li>
                    )}

                    {/* Dynamic Path Crumbs */}
                    {breadcrumbItems.map((crumb, index) => {
                        const IconComponent = crumb.icon || Compass;
                        const positionNumber = (showHome ? 2 : 1) + index;

                        return (
                            <li
                                key={crumb.path || index}
                                className={`breadcrumb-crumb-item ${crumb.isCurrent ? 'is-active' : ''}`}
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/ListItem"
                            >
                                {crumb.isCurrent ? (
                                    <div
                                        className="breadcrumb-current-pill"
                                        aria-current="page"
                                        title={`Current Page: ${crumb.label}`}
                                    >
                                        <IconComponent size={14} className="breadcrumb-current-icon" />
                                        <span className="breadcrumb-current-text" itemProp="name">
                                            {crumb.label}
                                        </span>
                                        {crumb.badge && (
                                            <span className="breadcrumb-meta-badge">
                                                {crumb.badge}
                                            </span>
                                        )}
                                        {crumb.path === '/' && (
                                            <span className="breadcrumb-live-indicator" title="Live Nomad Feed">
                                                <span className="breadcrumb-live-dot" />
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to={crumb.path}
                                            className="breadcrumb-crumb-link"
                                            title={`Navigate to ${crumb.label}`}
                                            itemProp="item"
                                        >
                                            <IconComponent size={14} className="breadcrumb-crumb-icon" />
                                            <span itemProp="name">{crumb.label}</span>
                                        </Link>
                                        <span className="breadcrumb-separator" aria-hidden="true">
                                            <ChevronRight size={13} />
                                        </span>
                                    </>
                                )}
                                <meta itemProp="position" content={String(positionNumber)} />
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Quick Navigation Utilities (Back & Share / Copy Link) */}
            {showActions && (
                <div className="breadcrumb-actions" role="toolbar" aria-label="Breadcrumb actions">
                    <button
                        type="button"
                        className="breadcrumb-action-btn"
                        onClick={handleGoBack}
                        title="Go back to previous page"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={14} />
                    </button>
                    <button
                        type="button"
                        className={`breadcrumb-action-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopyLink}
                        title={copied ? "Link copied!" : "Copy page route link"}
                        aria-label="Copy route URL"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Breadcrumbs;
