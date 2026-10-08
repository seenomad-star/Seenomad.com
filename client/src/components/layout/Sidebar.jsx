import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
    Settings as SettingsIcon,
    LifeBuoy,
    Plus,
    Plane,
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
    Luggage,
    Search,
    X,
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
import { useToastStore } from '../../store/toastStore';
import '../../styles/Sidebar.css';

/* ==========================================================================
   Distinct Modern Line-Art SVG Icons for Core Navigation Categories & Headers
   ========================================================================== */

export const LineArtExploreIcon = ({ size = 18, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg line-art-explore ${className}`}
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.6 12h18.8" strokeDasharray="2 1.5" />
        <path d="M12 2.5c2.6 2.7 4 6 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-6-4-9.5s1.4-6.8 4-9.5z" />
        <polygon points="14.8 9.2 10.4 10.6 9.2 14.8 13.6 13.4 14.8 9.2" />
    </svg>
);

export const LineArtTripBuilderIcon = ({ size = 18, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg line-art-trip-builder ${className}`}
        aria-hidden="true"
    >
        <circle cx="5.5" cy="6.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="6.5" r="2" />
        <path d="M8 6.5h4.5a3 3 0 0 1 0 6h-5a3 3 0 0 0 0 6H16" />
        <path d="M17.5 4.5v-1M17.5 9.5v-1" />
    </svg>
);

export const LineArtAIStudioIcon = ({ size = 18, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg line-art-ai-studio ${className}`}
        aria-hidden="true"
    >
        <path d="M12 2.5l2.2 5.3 5.3 2.2-5.3 2.2-2.2 5.3-2.2-5.3-5.3-2.2 5.3-2.2L12 2.5z" />
        <path d="M19 16.5l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1 1-2.3z" />
        <circle cx="5" cy="19" r="1.5" />
        <path d="M6.2 17.8l2.3-2.3" />
    </svg>
);

export const LineArtTrendingIcon = ({ size = 18, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg line-art-trending ${className}`}
        aria-hidden="true"
    >
        <path d="M13 3c.5 3.2-1.8 5.2-1.8 8 0 1.7 1.3 3 3 3s3-1.5 3-3.5c0-1.2-.5-2.5-1.2-3.5 3.2 1.5 5 4.6 5 8.2 0 4.4-3.6 7.8-8.5 7.8S4 19.6 4 15c0-4.2 2.8-7.4 5.5-9.5-.2 1.6.5 2.8 1.5 3.3C11.2 6.5 12 4.6 13 3z" />
        <path d="M9.5 16.5l2.2-2.2 1.8 1.8 3-3" />
    </svg>
);

export const LineArtPlanningSectionIcon = ({ size = 13, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg ${className}`}
        aria-hidden="true"
    >
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="M8 15h3l2-2 3 3" />
    </svg>
);

export const LineArtQuestsSectionIcon = ({ size = 13, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg ${className}`}
        aria-hidden="true"
    >
        <path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 8.9 9.1 8 12 2z" />
    </svg>
);

export const LineArtBusinessSectionIcon = ({ size = 13, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg ${className}`}
        aria-hidden="true"
    >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

export const LineArtContentMediaSectionIcon = ({ size = 13, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`line-art-svg ${className}`}
        aria-hidden="true"
    >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3.5" />
    </svg>
);

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToastStore();
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [quickFilter, setQuickFilter] = useState('');

    // On mobile screens, the drawer must ALWAYS display all options, labels, and badges fully
    const effectiveCollapsed = isMobile ? false : isCollapsed;

    // Interactive Tooltip Handler — works on hover and focus in both Expanded and Collapsed modes
    const showTooltip = (e, text, options = {}) => {
        if (isMobile) return;
        const targetEl = e.currentTarget;
        if (!targetEl) return;

        // Find the parent pill or button so the tooltip always anchors cleanly to the right edge of the sidebar item
        const anchorEl = targetEl.closest('.nav-link-pill, .travel-create-btn, .nomad-passport-card, .utility-icon-btn, .utility-theme-slot') || targetEl;
        const rect = anchorEl.getBoundingClientRect();
        const sidebarEl = targetEl.closest('.travel-sidebar');
        const sidebarRect = sidebarEl ? sidebarEl.getBoundingClientRect() : rect;

        // Clamp vertical position so tooltip never overflows top or bottom of the viewport
        const rawTop = rect.top + rect.height / 2;
        const clampedTop = Math.max(48, Math.min(window.innerHeight - 48, rawTop));

        setActiveTooltip({
            text,
            category: options.category,
            subtext: options.subtext,
            badge: options.badge,
            badgeType: options.badgeType,
            top: clampedTop,
            left: sidebarRect.right + 10
        });
    };

    const hideTooltip = () => {
        setActiveTooltip(null);
    };

    useEffect(() => {
        const handleDismiss = () => setActiveTooltip(null);
        window.addEventListener('scroll', handleDismiss, true);
        window.addEventListener('resize', handleDismiss);
        return () => {
            window.removeEventListener('scroll', handleDismiss, true);
            window.removeEventListener('resize', handleDismiss);
        };
    }, []);

    // Complete 27-feature travel navigation with distinct line-art category icons
    const navSections = useMemo(
        () => [
            {
                id: 'feed-explore',
                title: 'FEED & EXPLORE',
                sectionIcon: LineArtExploreIcon,
                accentTone: 'ocean',
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
                        icon: LineArtExploreIcon,
                        label: 'Explore',
                        to: '/explore/destinations',
                        isExploreHero: true,
                        categoryTone: 'explore',
                        badge: '195+',
                        badgeType: 'info',
                        description: 'Discover 195+ countries, cities & nomad hubs'
                    },
                    {
                        icon: LineArtTrendingIcon,
                        label: 'Trending & Popular',
                        to: '/popular',
                        categoryTone: 'trending',
                        badge: 'Hot',
                        badgeType: 'hot',
                        description: 'Trending destinations & viral community posts'
                    },
                    {
                        icon: Video,
                        label: 'Vibes',
                        to: '/explore/vibes',
                        badge: 'Live Vibe',
                        badgeType: 'accent',
                        description: 'Immersive 360° sensory travel vibes, ambient soundscapes & instant trip cloning'
                    },
                    {
                        icon: Map,
                        label: 'Travel Map',
                        to: '/explore/travel-map',
                        badge: '3D Portal',
                        badgeType: 'info',
                        description: 'Universal 360° virtual places, drone tour autopilot & 4D time-travel map'
                    }
                ]
            },
            {
                id: 'travel-tools',
                title: 'TRAVEL TOOLS',
                sectionIcon: LineArtTripBuilderIcon,
                accentTone: 'studio',
                isFeaturedSection: true,
                items: [
                    {
                        icon: Plane,
                        label: 'Book Travel',
                        to: '/explore/book-travel',
                        badge: 'Book',
                        badgeType: 'info',
                        description: 'Book flights, hotels, holidays, trains, buses & cabs'
                    },
                    {
                        icon: Radar,
                        label: 'Flight Tracker',
                        to: '/explore/flights-visa',
                        badge: 'Live',
                        badgeType: 'accent',
                        description: 'Live flight corridors, onward tickets & transit rules'
                    },
                    {
                        icon: Building2,
                        label: 'Hotel Finder',
                        to: '/explore/hotel-finder',
                        badge: 'Stays',
                        badgeType: 'info',
                        description: 'Compare coliving hubs, hotels, fiber & living costs'
                    },
                    {
                        icon: FileText,
                        label: 'Visa Info',
                        to: '/explore/visa',
                        badge: '2026',
                        badgeType: 'success',
                        description: 'Visa requirement summary, DNV eligibility & embassy FAQ'
                    },
                    {
                        icon: GitBranch,
                        label: 'Itinerary Builder',
                        to: '/explore/planner',
                        badge: 'Routes',
                        badgeType: 'info',
                        description: 'Day-by-day route planner & multi-stop scheduler'
                    },
                    {
                        icon: Star,
                        label: 'Reviews',
                        to: '/explore/reviews',
                        badge: 'Verified',
                        badgeType: 'info',
                        description: 'Verified traveler reviews, ratings & cultural tips'
                    },
                    {
                        icon: Gift,
                        label: 'Rewards',
                        to: '/explore/passport-perks',
                        badge: 'Perks',
                        badgeType: 'success',
                        description: 'Nomad rewards, partner eSIMs & coliving discounts'
                    },
                    {
                        icon: BookOpen,
                        label: 'Destination Guides',
                        to: '/explore/trivenly',
                        badge: 'Guides',
                        badgeType: 'info',
                        description: 'Curated city playbooks, neighborhood & cost guides'
                    },
                    {
                        icon: Palmtree,
                        label: 'Local Experiences',
                        to: '/learning-voluntourism',
                        badge: 'Local',
                        badgeType: 'accent',
                        description: 'Authentic cultural workshops, courses & local immersions'
                    },
                    {
                        icon: UserCheck,
                        label: 'Travel Agents',
                        to: '/explore/guardians',
                        badge: 'Fixers',
                        badgeType: 'info',
                        description: 'Verified local travel agents, fixers & AI concierges'
                    },
                    {
                        icon: Shield,
                        label: 'Insurance',
                        to: '/support-utility',
                        badge: 'Safety',
                        badgeType: 'success',
                        description: 'Nomad travel medical insurance, SOS & safety monitor'
                    },
                    {
                        icon: Navigation,
                        label: 'Nearby Places',
                        to: '/explore/speed-test',
                        badge: 'Radar',
                        badgeType: 'accent',
                        description: 'Nearby work cafes, coworking spots, ATMs & hubs'
                    },
                    {
                        icon: LineArtTripBuilderIcon,
                        label: 'Trip Builder',
                        to: '/explore/trip-builder',
                        isFeaturedTool: true,
                        categoryTone: 'trip-builder',
                        badge: 'Studio',
                        badgeType: 'info',
                        description: 'Modular trip builder, templates & live budget OS'
                    },
                    {
                        icon: LineArtAIStudioIcon,
                        label: 'Nomad AI Studio',
                        to: '/explore/ai-studio',
                        isFeaturedTool: true,
                        categoryTone: 'ai-studio',
                        badge: '4-in-1 AI',
                        badgeType: 'ai',
                        description: 'Unified Triipper AI, Super Agent, Twin & Travel Bug'
                    }
                ]
            },
            {
                id: 'trip-planning',
                title: 'TRIP PLANNING',
                sectionIcon: LineArtPlanningSectionIcon,
                accentTone: 'emerald',
                items: [
                    {
                        icon: Luggage,
                        label: 'My Trips & Journey',
                        to: '/user/travel-journey',
                        badge: 'Active',
                        badgeType: 'info',
                        description: 'Saved itineraries, upcoming departures & trip logs'
                    },
                    {
                        icon: Tag,
                        label: 'Travel Deals',
                        to: '/business-partner/overview',
                        badge: 'Save',
                        badgeType: 'success',
                        description: 'Exclusive flight, hotel & coliving partner deals'
                    },
                    {
                        icon: Calendar,
                        label: 'Events & Festivals',
                        to: '/event-festival',
                        badge: 'Live',
                        badgeType: 'accent',
                        description: 'Global cultural festivals, pop-up villages & meetups'
                    },
                    {
                        icon: Newspaper,
                        label: 'Travel News',
                        to: '/insights-analytics',
                        badge: 'Pulse',
                        badgeType: 'info',
                        description: 'Global travel news, safety index & cost trends'
                    },
                    {
                        icon: Users,
                        label: 'Community',
                        to: '/community',
                        badge: 'Meet',
                        badgeType: 'info',
                        description: 'Global traveler community, buddies & city hubs'
                    }
                ]
            },
            {
                id: 'content-media',
                title: 'CONTENT & MEDIA',
                sectionIcon: LineArtContentMediaSectionIcon,
                accentTone: 'violet',
                items: [
                    {
                        icon: Camera,
                        label: 'Photography',
                        to: '/content-media/photography',
                        badge: 'Gallery',
                        badgeType: 'accent',
                        description: 'Explore & share stunning travel photography from around the world'
                    },
                    {
                        icon: Mic,
                        label: 'Podcasts',
                        to: '/content-media/podcasts',
                        badge: 'Audio',
                        badgeType: 'info',
                        description: 'Nomad radio dispatches, creator interviews & field stories'
                    },
                    {
                        icon: GraduationCap,
                        label: 'Learning',
                        to: '/content-media/learning',
                        badge: 'Academy',
                        badgeType: 'success',
                        description: 'Masterclasses on travel photography, remote work & languages'
                    },
                    {
                        icon: Brain,
                        label: 'Travel Quiz',
                        to: '/content-media/travel-quiz',
                        badge: 'XP',
                        badgeType: 'warning',
                        description: 'Test your geography, visa & nomad trivia for bonus XP'
                    },
                    {
                        icon: LayoutGrid,
                        label: 'Post Templates',
                        to: '/content-media/post-templates',
                        badge: 'Viral',
                        badgeType: 'hot',
                        description: 'Ready-to-use carousel, reel & itinerary hooks for creators'
                    },
                    {
                        icon: Calendar,
                        label: 'Content Calendar',
                        to: '/content-media/content-calendar',
                        badge: 'Plan',
                        badgeType: 'info',
                        description: 'Schedule reels, photo drops, guides & podcast episodes'
                    }
                ]
            },
            {
                id: 'quests-rankings',
                title: 'QUESTS & RANKINGS',
                sectionIcon: LineArtQuestsSectionIcon,
                accentTone: 'amber',
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
                    }
                ]
            },
            {
                id: 'business-hub',
                title: 'BUSINESS',
                sectionIcon: LineArtBusinessSectionIcon,
                accentTone: 'ocean',
                items: [
                    {
                        icon: DollarSign,
                        label: 'Monetize',
                        to: '/business-partner/monetize',
                        badge: '+24%',
                        badgeType: 'success',
                        description: 'Tips, subscriptions, brand deals, digital products & affiliate'
                    },
                    {
                        icon: DollarSign,
                        label: 'Creator Earnings',
                        to: '/business-partner/creator-earnings',
                        badge: '$48.9k',
                        badgeType: 'info',
                        description: 'Creator payouts, revenue ledger & tax-ready invoices'
                    },
                    {
                        icon: TrendingUp,
                        label: 'Analytics',
                        to: '/business-partner/analytics',
                        badge: 'RPM',
                        badgeType: 'accent',
                        description: 'Audience geography, conversion funnel & content ROI'
                    },
                    {
                        icon: Megaphone,
                        label: 'Ad Manager',
                        to: '/business-partner/ad-manager',
                        badge: 'Ads',
                        badgeType: 'info',
                        description: 'Promote stays, tours & creator reels across SeeNomad'
                    },
                    {
                        icon: Building2,
                        label: 'Corporate',
                        to: '/business-partner/corporate',
                        badge: 'B2B',
                        badgeType: 'info',
                        description: 'Corporate team retreats, policy manager & bulk invoicing'
                    }
                ]
            }
        ],
        []
    );

    const filteredSections = useMemo(() => {
        const q = quickFilter.trim().toLowerCase();
        if (!q) return navSections;
        return navSections
            .map((section) => ({
                ...section,
                items: section.items.filter(
                    (item) =>
                        item.label.toLowerCase().includes(q) ||
                        (item.description && item.description.toLowerCase().includes(q)) ||
                        (item.badge && item.badge.toLowerCase().includes(q))
                )
            }))
            .filter((section) => section.items.length > 0);
    }, [navSections, quickFilter]);

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
            {/* Compact Quick Filter Bar (Expanded Mode Only) */}
            {!effectiveCollapsed && (
                <div className="sidebar-quick-search-wrap">
                    <div className="sidebar-quick-search-box">
                        <Search size={13} className="sidebar-search-icon" />
                        <input
                            type="text"
                            value={quickFilter}
                            onChange={(e) => setQuickFilter(e.target.value)}
                            placeholder="Jump to tool or feature..."
                            aria-label="Filter sidebar navigation"
                        />
                        {quickFilter && (
                            <button
                                type="button"
                                className="sidebar-search-clear"
                                onClick={() => setQuickFilter('')}
                                aria-label="Clear filter"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation Sections */}
            <nav className="travel-sidebar-nav">
                {filteredSections.map((section, sectionIdx) => {
                    const SectionIcon = section.sectionIcon;
                    return (
                        <div
                            key={sectionIdx}
                            className={`nav-section-group ${
                                section.isFeaturedSection ? 'nav-section-featured-tools' : ''
                            }`}
                        >
                            {!effectiveCollapsed ? (
                                <div className={`nav-section-title tone-${section.accentTone || 'ocean'}`}>
                                    <span
                                        className="nav-section-title-left"
                                        onMouseEnter={(e) =>
                                            showTooltip(e, section.title, {
                                                subtext: `${section.items.length} features in this travel group`,
                                                badge: `${section.items.length} items`,
                                                badgeType: 'info'
                                            })
                                        }
                                        onMouseLeave={hideTooltip}
                                    >
                                        {SectionIcon && (
                                            <span
                                                className="nav-section-header-icon"
                                                title={section.title}
                                            >
                                                <SectionIcon size={12} />
                                            </span>
                                        )}
                                        <span className="nav-section-title-text">{section.title}</span>
                                    </span>
                                    <span className="nav-section-count">{section.items.length}</span>
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
                                    const toneClass = item.categoryTone ? `category-tone-${item.categoryTone}` : '';

                                    return (
                                        <li
                                            key={itemIdx}
                                            className={`nav-section-item ${
                                                isExploreHero ? 'destinations-nav-section-item' : ''
                                            } ${isFeaturedTool ? 'featured-tool-nav-item' : ''}`}
                                        >
                                            <NavLink
                                                to={item.to}
                                                end={item.exact}
                                                aria-label={`${item.label}${item.description ? ` — ${item.description}` : ''}`}
                                                onClick={() => {
                                                    hideTooltip();
                                                    if (isMobile) toggleSidebar();
                                                }}
                                                onMouseEnter={(e) =>
                                                    showTooltip(e, item.label, {
                                                        category: section.title,
                                                        subtext: item.description,
                                                        badge: item.badge,
                                                        badgeType: item.badgeType
                                                    })
                                                }
                                                onMouseLeave={hideTooltip}
                                                onFocus={(e) =>
                                                    showTooltip(e, item.label, {
                                                        category: section.title,
                                                        subtext: item.description,
                                                        badge: item.badge,
                                                        badgeType: item.badgeType
                                                    })
                                                }
                                                onBlur={hideTooltip}
                                                className={({ isActive }) => {
                                                    let active = isActive;

                                                    if (isHome) {
                                                        active = location.pathname === '/';
                                                    } else if (item.to === '/explore/travel-map' || isMap) {
                                                        active =
                                                            location.pathname.startsWith('/explore/travel-map') ||
                                                            location.pathname.startsWith('/explore/map') ||
                                                            (location.pathname.startsWith('/explore') &&
                                                                location.search.includes('view=map'));
                                                    } else if (item.to === '/explore/destinations') {
                                                        active =
                                                            (location.pathname === '/explore' ||
                                                                location.pathname.startsWith(
                                                                    '/explore/destinations'
                                                                )) &&
                                                            !location.search.includes('view=map');
                                                    } else if (item.to === '/explore/vibes') {
                                                        active =
                                                            location.pathname.startsWith('/explore/vibes') ||
                                                            location.pathname.startsWith('/explore/shorts');
                                                    } else if (item.to === '/explore/ai-studio') {
                                                        active =
                                                            location.pathname.startsWith('/explore/ai-studio') ||
                                                            location.pathname.startsWith('/explore/nomad-ai') ||
                                                            location.pathname.startsWith('/explore/triipper') ||
                                                            location.pathname.startsWith('/explore/super-agent') ||
                                                            location.pathname.startsWith('/explore/twin') ||
                                                            location.pathname.startsWith('/explore/ai-digital-twin') ||
                                                            location.pathname.startsWith('/explore/travel-bug');
                                                    } else if (item.to === '/explore/culture-community') {
                                                        active =
                                                            location.pathname.startsWith(
                                                                '/explore/culture-community'
                                                            ) ||
                                                            location.pathname.startsWith('/explore/cultural-compass') ||
                                                            location.pathname.startsWith('/explore/story-studio');
                                                    } else if (item.to === '/explore/guardians') {
                                                        active =
                                                            location.pathname.startsWith('/explore/guardians') ||
                                                            location.pathname.startsWith('/explore/local-guardians');
                                                    } else if (item.to === '/explore/passport-perks') {
                                                        active =
                                                            location.pathname.startsWith('/explore/passport-perks') ||
                                                            location.pathname.startsWith('/explore/passport') ||
                                                            location.pathname.startsWith('/explore/dna') ||
                                                            location.pathname.startsWith('/explore/perks');
                                                    } else if (item.to === '/explore/trivenly') {
                                                        active =
                                                            location.pathname.startsWith('/explore/trivenly') ||
                                                            location.pathname.startsWith('/explore/marketplace');
                                                    } else if (item.to === '/explore/speed-test') {
                                                        active =
                                                            location.pathname.startsWith('/explore/speed-test') ||
                                                            location.pathname.startsWith(
                                                                '/explore/connectivity-market'
                                                            ) ||
                                                            location.pathname.startsWith('/explore/discovery');
                                                    }

                                                    return `nav-link-pill ${active ? 'active' : ''} ${
                                                        isExploreHero ? 'destinations-prominent-pill' : ''
                                                    } ${isFeaturedTool ? 'featured-tool-pill' : ''} ${toneClass}`;
                                                }}
                                            >
                                                <span
                                                    className={`nav-icon-box ${
                                                        isExploreHero ? 'destinations-icon-container' : ''
                                                    } ${isFeaturedTool ? 'featured-tool-icon-box' : ''} ${toneClass}`}
                                                    title={`${item.label}${item.description ? ` — ${item.description}` : ''}`}
                                                    data-tooltip={item.label}
                                                    onMouseEnter={(e) => {
                                                        e.stopPropagation();
                                                        showTooltip(e, item.label, {
                                                            category: section.title,
                                                            subtext: item.description,
                                                            badge: item.badge,
                                                            badgeType: item.badgeType
                                                        });
                                                    }}
                                                >
                                                    <item.icon
                                                        size={isExploreHero ? 16 : 15}
                                                        strokeWidth={isExploreHero || isFeaturedTool ? 2.1 : 1.85}
                                                        className={isExploreHero ? 'destinations-globe-icon' : ''}
                                                    />
                                                </span>

                                                {!effectiveCollapsed && (
                                                    <div className="nav-label-group">
                                                        <span className="nav-label-text" title={item.label}>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                )}

                                                {!effectiveCollapsed && item.badge && (
                                                    <span
                                                        className={`nav-pill-badge badge-${item.badgeType || 'info'} ${
                                                            isExploreHero ? 'destinations-hero-badge' : ''
                                                        }`}
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
                    );
                })}
            </nav>

            {/* Footer Section: Minimal Travel Action Row + Utility Links */}
            <div className="travel-sidebar-footer">
                {/* Compact Dual Action Row */}
                <div className={`sidebar-cta-group ${effectiveCollapsed ? 'collapsed' : ''}`}>
                    <button
                        className="travel-create-btn primary-cta"
                        onClick={handleCreateAction}
                        aria-label="Share Story — Post a travel update, photo or review"
                        title="Share Story — Post a travel update, photo or review"
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Share Story', {
                                category: 'QUICK ACTION',
                                subtext: 'Post a travel update, photo or review',
                                badge: '+50 XP',
                                badgeType: 'accent'
                            })
                        }
                        onMouseLeave={hideTooltip}
                        onFocus={(e) =>
                            showTooltip(e, 'Share Story', {
                                category: 'QUICK ACTION',
                                subtext: 'Post a travel update, photo or review',
                                badge: '+50 XP',
                                badgeType: 'accent'
                            })
                        }
                        onBlur={hideTooltip}
                    >
                        <span className="create-btn-icon">
                            <Plus size={15} strokeWidth={2.5} />
                        </span>
                        {!effectiveCollapsed && <span className="create-btn-label">Share Story</span>}
                    </button>

                    <button
                        className="travel-create-btn secondary-cta"
                        onClick={handleQuickPlan}
                        aria-label="Plan Trip — Launch modular Trip & Itinerary Builder"
                        title="Plan Trip — Launch modular Trip & Itinerary Builder"
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Plan Trip', {
                                category: 'QUICK ACTION',
                                subtext: 'Launch modular Trip & Itinerary Builder',
                                badge: 'AI Studio',
                                badgeType: 'info'
                            })
                        }
                        onMouseLeave={hideTooltip}
                        onFocus={(e) =>
                            showTooltip(e, 'Plan Trip', {
                                category: 'QUICK ACTION',
                                subtext: 'Launch modular Trip & Itinerary Builder',
                                badge: 'AI Studio',
                                badgeType: 'info'
                            })
                        }
                        onBlur={hideTooltip}
                    >
                        <span className="create-btn-icon">
                            <Plane size={14} strokeWidth={2.2} />
                        </span>
                        {!effectiveCollapsed && <span className="create-btn-label">Plan Trip</span>}
                    </button>
                </div>

                {/* Bottom Utility Bar */}
                <div className={`sidebar-utility-bar ${effectiveCollapsed ? 'collapsed' : ''}`}>
                    <NavLink
                        to="/settings"
                        onClick={() => {
                            hideTooltip();
                            if (isMobile) toggleSidebar();
                        }}
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Settings', {
                                category: 'PREFERENCES',
                                subtext: 'Account, privacy & notification preferences'
                            })
                        }
                        onMouseLeave={hideTooltip}
                        onFocus={(e) =>
                            showTooltip(e, 'Settings', {
                                category: 'PREFERENCES',
                                subtext: 'Account, privacy & notification preferences'
                            })
                        }
                        onBlur={hideTooltip}
                        className={({ isActive }) => `utility-icon-btn ${isActive ? 'active' : ''}`}
                        aria-label="Settings"
                    >
                        <SettingsIcon size={15} />
                        {!effectiveCollapsed && <span>Settings</span>}
                    </NavLink>

                    <NavLink
                        to="/support-utility"
                        onClick={() => {
                            hideTooltip();
                            if (isMobile) toggleSidebar();
                        }}
                        onMouseEnter={(e) =>
                            showTooltip(e, 'Help & Safety Center', {
                                category: 'SUPPORT',
                                subtext: '24/7 emergency assistance & travel support'
                            })
                        }
                        onMouseLeave={hideTooltip}
                        onFocus={(e) =>
                            showTooltip(e, 'Help & Safety Center', {
                                category: 'SUPPORT',
                                subtext: '24/7 emergency assistance & travel support'
                            })
                        }
                        onBlur={hideTooltip}
                        className={({ isActive }) => `utility-icon-btn ${isActive ? 'active' : ''}`}
                        aria-label="Help & Support"
                    >
                        <LifeBuoy size={15} />
                        {!effectiveCollapsed && <span>Help & Safety</span>}
                    </NavLink>
                </div>
            </div>

            {/* Interactive Portal Tooltip for Sidebar Navigation Icons & Items */}
            {activeTooltip &&
                createPortal(
                    <div
                        className="sidebar-portal-tooltip"
                        role="tooltip"
                        style={{
                            top: `${activeTooltip.top}px`,
                            left: `${activeTooltip.left}px`
                        }}
                    >
                        <span className="sidebar-tooltip-arrow" aria-hidden="true" />
                        {activeTooltip.category && (
                            <span className="tooltip-category-kicker">{activeTooltip.category}</span>
                        )}
                        <div className="tooltip-header-row">
                            <span className="tooltip-title">{activeTooltip.text}</span>
                            {activeTooltip.badge && (
                                <span className={`tooltip-badge badge-${activeTooltip.badgeType || 'info'}`}>
                                    {activeTooltip.badge}
                                </span>
                            )}
                        </div>
                        {activeTooltip.subtext && <span className="tooltip-subtext">{activeTooltip.subtext}</span>}
                    </div>,
                    document.body
                )}
        </aside>
    );
};

export default Sidebar;
