import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    ChevronRight,
    ChevronLeft,
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
    Copy,
    Check,
    MapPin,
    FileText,
    Video,
    Map,
    Plane,
    Building2,
    Landmark,
    Backpack,
    GitBranch,
    Camera,
    Mic,
    GraduationCap,
    Brain,
    LayoutGrid,
    List,
    DollarSign,
    Megaphone,
    Wallet,
    MessageCircle,
    Bell,
    Wifi,
    Star,
    Gift,
    MoreHorizontal
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { useDestinationStore } from '../../store/destinationFilterStore';
import { useNavStore } from '../../store/navStore';
import './Breadcrumbs.css';

/**
 * Comprehensive Route Dictionary for Feature & Nested Page Orientation
 */
export const ROUTE_CONFIG = {
    'explore': { name: 'Explore', icon: Compass, defaultPath: '/explore/destinations' },
    'destinations': { name: 'Destinations', icon: Globe, parent: { label: 'Explore', path: '/explore/destinations', icon: Compass } },
    'vibes': { name: 'Travel Vibes', icon: Video, parent: { label: 'Discover', path: '/popular', icon: Flame } },
    'shorts': { name: 'Travel Vibes', icon: Video, parent: { label: 'Discover', path: '/popular', icon: Flame } },
    'travel-map': { name: '3D Travel Map', icon: Map, parent: { label: 'Explore', path: '/explore/destinations', icon: Compass } },
    'map': { name: '3D Travel Map', icon: Map, parent: { label: 'Explore', path: '/explore/destinations', icon: Compass } },
    'ar-hub': { name: 'AR & WebXR Hub', icon: Sparkles, parent: { label: '3D Travel Map', path: '/explore/travel-map', icon: Map } },
    'risk': { name: 'Safety & Risk Map', icon: Shield, parent: { label: '3D Travel Map', path: '/explore/travel-map', icon: Map } },
    'book-travel': { name: 'Flights & Multi-Mode', icon: Plane, parent: { label: 'Book Travel', path: '/explore/book-travel', icon: Plane } },
    'hotel-finder': { name: 'Hotels & Coliving', icon: Building2, parent: { label: 'Book Travel', path: '/explore/book-travel', icon: Plane } },
    'flights-visa': { name: 'Live Flight Tracker', icon: Plane, parent: { label: 'Book Travel', path: '/explore/book-travel', icon: Plane } },
    'seenomad-multi': { name: 'Multi-Modal Studio', icon: Compass, parent: { label: 'Book Travel', path: '/explore/book-travel', icon: Plane } },
    'visa': { name: 'Visa Checker', icon: Shield, parent: { label: 'Visa & Tax', path: '/explore/visa', icon: Shield } },
    'visas': { name: 'Nomad Visas', icon: Shield, parent: { label: 'Visa & Tax', path: '/explore/visa', icon: Shield } },
    'visa-intelligence': { name: 'DNV Intelligence', icon: Shield, parent: { label: 'Visa & Tax', path: '/explore/visa', icon: Shield } },
    'tax-calculator': { name: 'Tax & Compliance Calculator', icon: DollarSign, parent: { label: 'Visa & Tax', path: '/explore/visa', icon: Shield } },
    'tax-compliance': { name: 'Tax & Compliance Calculator', icon: DollarSign, parent: { label: 'Visa & Tax', path: '/explore/visa', icon: Shield } },
    'embassy': { name: 'Embassy Directory', icon: Landmark, parent: { label: 'Visa & Embassy', path: '/explore/visa', icon: Shield } },
    'vault': { name: 'Passport Vault', icon: Shield, parent: { label: 'Visa & Embassy', path: '/explore/visa', icon: Shield } },
    'trip-builder': { name: 'Trip Builder Studio', icon: Backpack, parent: { label: 'Trip Studio', path: '/explore/trip-builder', icon: Backpack } },
    'planner': { name: 'Itinerary Planner', icon: GitBranch, parent: { label: 'Trip Studio', path: '/explore/trip-builder', icon: Backpack } },
    'multi-city': { name: 'Multi-City Route', icon: Map, parent: { label: 'Trip Studio', path: '/explore/trip-builder', icon: Backpack } },
    'diy': { name: 'DIY & Packing Hub', icon: Compass, parent: { label: 'Trip Studio', path: '/explore/trip-builder', icon: Backpack } },
    'ai-studio': { name: '4-in-1 AI Command', icon: Sparkles, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'nomad-ai': { name: 'Nomad AI Copilot', icon: Bot, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'triipper': { name: 'Triipper Route AI', icon: Compass, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'super-agent': { name: 'Super Agent Concierge', icon: Shield, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'twin': { name: 'Digital Twin Sim', icon: User, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'travel-bug': { name: 'Travel Bug Scout', icon: Flame, parent: { label: 'AI Studio', path: '/explore/ai-studio', icon: Bot } },
    'reviews': { name: 'Verified Reviews', icon: Star, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'passport-perks': { name: 'Rewards & Perks', icon: Gift, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'perks': { name: 'Rewards & Perks', icon: Gift, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'trivenly': { name: 'Destination Guides', icon: BookOpen, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'guardians': { name: 'Local Travel Agents', icon: Users, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'speed-test': { name: 'Nearby Wi-Fi & Cafes', icon: Wifi, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'cultural-compass': { name: 'Cultural Compass', icon: Compass, parent: { label: 'Travel Tools', path: '/explore/reviews', icon: Compass } },
    'compare-destinations': { name: 'Compare Hubs', icon: Compass, parent: { label: 'Explore', path: '/explore/destinations', icon: Compass } },
    'compare': { name: 'Compare Hubs', icon: Compass, parent: { label: 'Explore', path: '/explore/destinations', icon: Compass } },
    'challenges': { name: 'Active Challenges', icon: Trophy, parent: { label: 'Quests & Rank', path: '/explore/challenges', icon: Trophy } },
    'viral-challenges': { name: 'Viral Quests', icon: Trophy, parent: { label: 'Quests & Rank', path: '/explore/challenges', icon: Trophy } },
    'rivalry': { name: 'Global Leaderboard', icon: BarChart3, parent: { label: 'Quests & Rank', path: '/explore/challenges', icon: Trophy } },
    'rewards': { name: 'Referral Bounties', icon: Gift, parent: { label: 'Quests & Rank', path: '/explore/challenges', icon: Trophy } },
    'coworking': { name: 'Coworking & Cafes', icon: Wifi },
    'coliving': { name: 'Coliving Hubs', icon: Building2 },
    'saved': { name: 'Saved Destinations', icon: Bookmark, parent: { label: 'Traveler Hub', path: '/user/profile', icon: User } },
    'favorites': { name: 'Saved Destinations', icon: Bookmark, parent: { label: 'Traveler Hub', path: '/user/profile', icon: User } },
    'popular': { name: 'Trending & Popular', icon: Flame, parent: { label: 'Discover', path: '/popular', icon: Flame } },
    'community': { name: 'Community Hub', icon: Users },
    'meetups': { name: 'Global Meetups', icon: Users },
    'circles': { name: 'Nomad Circles', icon: Users },
    'bounty-board': { name: 'Bounty Board', icon: Trophy },
    'collab-board': { name: 'Collab Projects', icon: Users },
    'creator-studio': { name: 'Creator Studio', icon: Video },
    'ai-agents': { name: 'AI Travel Agents', icon: Bot },
    'travel-games': { name: 'Travel Games', icon: Trophy },
    'event-festival': { name: 'Events & Festivals', icon: Calendar },
    'learning-voluntourism': { name: 'Local Experiences', icon: BookOpen },
    'insights-analytics': { name: 'Travel News & Trends', icon: BarChart3 },
    'support-utility': { name: 'Safety & Insurance', icon: Shield },
    'business-partner': { name: 'Business Hub', icon: Briefcase, defaultPath: '/business-partner/monetize' },
    'monetize': { name: 'Monetize', icon: DollarSign },
    'creator-earnings': { name: 'Creator Earnings', icon: DollarSign },
    'analytics': { name: 'Analytics & ROI', icon: BarChart3 },
    'ad-manager': { name: 'Ad Manager', icon: Megaphone },
    'corporate': { name: 'Corporate Retreats', icon: Building2 },
    'overview': { name: 'Deals & Partners', icon: Gift },
    'content-media': { name: 'Content & Media', icon: Camera, defaultPath: '/content-media/photography' },
    'photography': { name: 'Photography', icon: Camera },
    'podcasts': { name: 'Podcasts', icon: Mic },
    'learning': { name: 'Learning Academy', icon: GraduationCap },
    'travel-quiz': { name: 'Travel Quiz', icon: Brain },
    'post-templates': { name: 'Post Templates', icon: LayoutGrid },
    'content-calendar': { name: 'Content Calendar', icon: Calendar },
    'download-app': { name: 'Download App', icon: Sparkles },
    'partner-with-us': { name: 'Partner With Us', icon: Briefcase },
    'about': { name: 'About SeeNomad', icon: Compass },
    'legal': { name: 'Legal & Privacy', icon: FileText },
    'settings': { name: 'Settings', icon: Settings, parent: { label: 'Traveler Hub', path: '/user/profile', icon: User } },
    'user': { name: 'Traveler Hub', icon: User, defaultPath: '/user/profile' },
    'profile': { name: 'My Profile', icon: User },
    'saved-vibes': { name: 'Saved Vibes', icon: Video },
    'achievements': { name: 'Milestones & Stamps', icon: Trophy },
    'travel-journey': { name: 'My Trips', icon: Compass },
    'wallet': { name: 'Wallet & Payouts', icon: Wallet },
    'messages': { name: 'Messages', icon: MessageCircle },
    'xp-tracker': { name: 'XP Tracker', icon: Sparkles },
    'notifications': { name: 'Notifications', icon: Bell, parent: { label: 'Traveler Hub', path: '/user/profile', icon: User } }
};

const formatSegmentLabel = (seg = '') =>
    String(seg)
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

/**
 * Dynamically builds the breadcrumb hierarchy based on active feature, nested page, and query context.
 */
export const resolveGlobalBreadcrumbs = (pathname = '/', search = '', customCrumbs = null, moduleNavItems = []) => {
    if (customCrumbs && Array.isArray(customCrumbs) && customCrumbs.length > 0) {
        return customCrumbs;
    }

    const segments = pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(search);
    const items = [];

    // Root ('/')
    if (segments.length === 0) {
        items.push({
            path: '/',
            label: 'Home Feed',
            icon: Sparkles,
            isCurrent: !search
        });
    } else if (segments[0] === 'explore' && segments.length >= 2) {
        // Smart Feature Grouping inside /explore/* so users see the exact Sidebar Feature Category -> Active Nested Page
        const subSeg = segments[1].toLowerCase();
        const subConfig = ROUTE_CONFIG[subSeg];

        if (subConfig?.parent) {
            if (subConfig.parent.label !== subConfig.name) {
                items.push({
                    path:
                        subConfig.parent.path === `/explore/${segments[1]}`
                            ? '/explore/destinations'
                            : subConfig.parent.path,
                    label: subConfig.parent.label,
                    icon: subConfig.parent.icon || Compass,
                    isCurrent: false
                });
            }
        } else {
            items.push({
                path: '/explore/destinations',
                label: 'Explore',
                icon: Compass,
                isCurrent: false
            });
        }

        // Second segment (the active feature or nested tool)
        let accPath = `/explore/${segments[1]}`;
        items.push({
            path: accPath,
            label: subConfig?.name || formatSegmentLabel(segments[1]),
            icon: subConfig?.icon || Compass,
            isCurrent: segments.length === 2 && !search
        });

        // Deeper segments (e.g. /explore/destinations/bali)
        for (let i = 2; i < segments.length; i++) {
            const seg = segments[i];
            accPath += `/${seg}`;
            const cfg = ROUTE_CONFIG[seg.toLowerCase()];
            items.push({
                path: accPath,
                label: cfg?.name || formatSegmentLabel(seg),
                icon: cfg?.icon || MapPin,
                isCurrent: i === segments.length - 1 && !search
            });
        }
    } else {
        // Standard multi-segment routes (/content-media/*, /business-partner/*, /community/*, /user/*, etc.)
        let accPath = '';
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            accPath += `/${seg}`;
            const cfg = ROUTE_CONFIG[seg.toLowerCase()];

            // Inject logical parent hub for top-level single-segment pages if defined
            if (i === 0 && segments.length === 1 && cfg?.parent && cfg.parent.label !== cfg.name) {
                items.push({
                    path: cfg.parent.path,
                    label: cfg.parent.label,
                    icon: cfg.parent.icon || Compass,
                    isCurrent: false
                });
            }

            // Try matching against dynamic moduleNavItems if not in static dictionary
            let dynamicLabel = cfg?.name;
            if (!dynamicLabel && Array.isArray(moduleNavItems) && moduleNavItems.length > 0) {
                for (const navItem of moduleNavItems) {
                    if (typeof navItem === 'object' && navItem.label) {
                        const slug = navItem.slug || navItem.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        if (slug === seg.toLowerCase() || navItem.path === accPath) {
                            dynamicLabel = navItem.label;
                            break;
                        }
                    }
                }
            }

            items.push({
                path: cfg?.defaultPath && i < segments.length - 1 ? cfg.defaultPath : accPath,
                label: dynamicLabel || formatSegmentLabel(seg),
                icon: cfg?.icon || Compass,
                isCurrent: i === segments.length - 1 && !search
            });
        }
    }

    // Dynamic Query / Tab / Filter Nested Crumb
    const activeTab = searchParams.get('tab');
    const viewQuery = searchParams.get('view');
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');
    const domainStatus = searchParams.get('domainStatus');

    if (activeTab) {
        const tabCfg = ROUTE_CONFIG[activeTab.toLowerCase()];
        items.push({
            path: `${pathname}?tab=${encodeURIComponent(activeTab)}`,
            label: tabCfg?.name || formatSegmentLabel(activeTab),
            icon: tabCfg?.icon || Bookmark,
            isCurrent: true
        });
    } else if (viewQuery === 'map') {
        items.push({
            path: `${pathname}?view=map`,
            label: '360° Spatial Map',
            icon: Map,
            isCurrent: true
        });
    } else if (searchQuery) {
        items.push({
            path: `${pathname}?search=${encodeURIComponent(searchQuery)}`,
            label: `"${searchQuery}"`,
            icon: MapPin,
            isCurrent: true
        });
    } else if (categoryQuery && categoryQuery !== 'all') {
        items.push({
            path: `${pathname}?category=${encodeURIComponent(categoryQuery)}`,
            label: formatSegmentLabel(categoryQuery),
            icon: Compass,
            isCurrent: true
        });
    } else if (domainStatus && domainStatus !== 'all') {
        items.push({
            path: `${pathname}?domainStatus=${encodeURIComponent(domainStatus)}`,
            label: `${formatSegmentLabel(domainStatus)} Hubs`,
            icon: Globe,
            isCurrent: true
        });
    }

    // Ensure only the final crumb is marked current
    items.forEach((item, index) => {
        item.isCurrent = index === items.length - 1;
    });

    return items;
};

/**
 * Ultra-Compact Global Breadcrumb Navigation Component
 * Dynamically updates based on the active feature and nested page while consuming minimal vertical space (22px).
 */
const Breadcrumbs = ({
    className = '',
    isSidebarCollapsed = false,
    showHome = true,
    showActions = true,
    showOnHome = true,
    customCrumbs = null
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { viewMode, setViewMode } = useDestinationStore();
    const { moduleNavItems } = useNavStore();
    const [copied, setCopied] = useState(false);
    const [expandCollapsed, setExpandCollapsed] = useState(false);

    const breadcrumbItems = useMemo(
        () => resolveGlobalBreadcrumbs(location.pathname, location.search, customCrumbs, moduleNavItems),
        [location.pathname, location.search, customCrumbs, moduleNavItems]
    );

    const isRoot = location.pathname === '/' && !location.search;
    if (isRoot && !showOnHome) return null;

    const showDestinationViewToggle = location.pathname.startsWith('/explore/destinations');

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            addToast('Page link copied', 'success');
            setTimeout(() => setCopied(false), 1800);
        } catch {
            addToast('Unable to copy link', 'error');
        }
    };

    const handleGoBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else if (breadcrumbItems.length > 1) {
            navigate(breadcrumbItems[breadcrumbItems.length - 2].path);
        } else {
            navigate('/');
        }
    };

    // Collapse middle crumbs when trail is deep (> 3 items) unless user expanded
    const shouldCollapseMiddle = breadcrumbItems.length > 3 && !expandCollapsed;
    const visibleItems = shouldCollapseMiddle
        ? [
              breadcrumbItems[0],
              { isEllipsis: true, hiddenCount: breadcrumbItems.length - 2 },
              breadcrumbItems[breadcrumbItems.length - 1]
          ]
        : breadcrumbItems;

    return (
        <nav
            className={`address-bar-container dynamic-breadcrumbs-container ${
                !isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'
            } ${isRoot ? 'is-root' : ''} ${className}`}
            aria-label="Breadcrumb"
        >
            <div className="breadcrumb-strip-left">
                {showActions && (
                    <button
                        type="button"
                        className="breadcrumb-micro-btn"
                        onClick={handleGoBack}
                        disabled={isRoot}
                        title="Go back"
                        aria-label="Go back"
                    >
                        <ChevronLeft size={12} />
                    </button>
                )}

                <ol
                    className="dynamic-breadcrumbs-list breadcrumb-trail"
                    itemScope
                    itemType="https://schema.org/BreadcrumbList"
                >
                    {showHome && (
                        <li
                            className="breadcrumb-crumb-item breadcrumb-item"
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            <Link
                                to="/"
                                className="breadcrumb-crumb-link breadcrumb-link root-link"
                                title="SeeNomad Home"
                                itemProp="item"
                            >
                                <Home size={11} className="breadcrumb-crumb-icon" />
                                <span className="breadcrumb-home-text" itemProp="name">Home</span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </li>
                    )}

                    {visibleItems.map((crumb, index) => {
                        if (crumb.isEllipsis) {
                            return (
                                <React.Fragment key="breadcrumb-ellipsis">
                                    <li className="breadcrumb-separator" aria-hidden="true">
                                        <ChevronRight size={10} />
                                    </li>
                                    <li className="breadcrumb-crumb-item">
                                        <button
                                            type="button"
                                            className="breadcrumb-ellipsis-btn"
                                            onClick={() => setExpandCollapsed(true)}
                                            title={`Show ${crumb.hiddenCount} hidden level(s)`}
                                            aria-label="Expand full path"
                                        >
                                            <MoreHorizontal size={11} />
                                        </button>
                                    </li>
                                </React.Fragment>
                            );
                        }

                        const IconComponent = crumb.icon || Compass;
                        const positionNumber = (showHome ? 2 : 1) + index;

                        return (
                            <React.Fragment key={`${crumb.path || 'crumb'}-${crumb.label || ''}-${index}`}>
                                <li className="breadcrumb-separator" aria-hidden="true">
                                    <ChevronRight size={10} />
                                </li>
                                <li
                                    className={`breadcrumb-crumb-item breadcrumb-item ${
                                        crumb.isCurrent ? 'is-active is-current active-crumb' : ''
                                    }`}
                                    itemProp="itemListElement"
                                    itemScope
                                    itemType="https://schema.org/ListItem"
                                    aria-current={crumb.isCurrent ? 'page' : undefined}
                                >
                                    {crumb.isCurrent ? (
                                        <span
                                            className="breadcrumb-current-text current-title"
                                            title={crumb.label}
                                            itemProp="name"
                                        >
                                            <IconComponent size={11} className="breadcrumb-current-icon" />
                                            <span>{crumb.label}</span>
                                        </span>
                                    ) : (
                                        <Link
                                            to={crumb.path}
                                            className="breadcrumb-crumb-link breadcrumb-link"
                                            title={crumb.label}
                                            itemProp="item"
                                        >
                                            <IconComponent size={11} className="breadcrumb-crumb-icon" />
                                            <span itemProp="name">{crumb.label}</span>
                                        </Link>
                                    )}
                                    <meta itemProp="position" content={String(positionNumber)} />
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ol>
            </div>

            {showActions && (
                <div className="breadcrumb-actions">
                    {showDestinationViewToggle && (
                        <div className="breadcrumb-view-switch" role="group" aria-label="Layout view">
                            <button
                                type="button"
                                className={`breadcrumb-micro-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid view"
                                aria-label="Grid view"
                            >
                                <LayoutGrid size={11} />
                            </button>
                            <button
                                type="button"
                                className={`breadcrumb-micro-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List view"
                                aria-label="List view"
                            >
                                <List size={11} />
                            </button>
                        </div>
                    )}
                    <button
                        type="button"
                        className={`breadcrumb-micro-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopyLink}
                        title={copied ? 'Link copied' : 'Copy page link'}
                        aria-label="Copy route URL"
                    >
                        {copied ? <Check size={11} /> : <Copy size={11} />}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Breadcrumbs;
