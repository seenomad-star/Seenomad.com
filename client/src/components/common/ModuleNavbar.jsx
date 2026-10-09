import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Compass,
    Flame,
    Video,
    Map,
    Plane,
    Building2,
    Palmtree,
    ShieldCheck,
    Landmark,
    GitBranch,
    Backpack,
    Sparkles,
    Star,
    Gift,
    BookOpen,
    UserCheck,
    Shield,
    Wifi,
    Trophy,
    Award,
    TrendingUp,
    Camera,
    Mic,
    GraduationCap,
    Brain,
    LayoutGrid,
    Calendar,
    DollarSign,
    Megaphone,
    Users,
    Bookmark,
    User,
    Wallet,
    MessageCircle,
    Bell,
    Settings
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import '../../features/Explore/styles/ExploreNavbar.css';

/**
 * Contextual Sidebar Feature Sub-Navigation Resolver
 * Guarantees that EVERY feature available in the Sidebar has its own tailored,
 * multi-part sub-navigation bar (just like Explore has Destinations, Embassy, Visa, etc.).
 */
const getContextualFeatureSubNav = (pathname, search = '') => {
    const fullUrl = `${pathname}${search}`;

    // 1. HOME FEED ('/')
    if (pathname === '/') {
        return {
            categoryLabel: 'Home Feed',
            basePath: '',
            items: [
                { label: 'For You Feed', path: '/', icon: <Home />, exact: true },
                { label: 'Trending & Popular', path: '/popular', icon: <Flame /> },
                { label: 'Travel Vibes', path: '/explore/vibes', icon: <Video /> },
                { label: '3D Travel Map', path: '/explore/travel-map', icon: <Map /> },
                { label: 'Community Hub', path: '/community', icon: <Users /> },
                { label: 'Saved & Wishlist', path: '/saved', icon: <Bookmark /> }
            ]
        };
    }

    // 2. TRENDING & POPULAR ('/popular')
    if (pathname.startsWith('/popular')) {
        return {
            categoryLabel: 'Trending',
            basePath: '/popular',
            items: [
                { label: 'Hot Destinations', path: '/popular', icon: <Flame />, exact: true },
                { label: 'Viral Travel Vibes', path: '/explore/vibes', icon: <Video /> },
                { label: 'Global Leaderboard', path: '/explore/rivalry', icon: <TrendingUp /> },
                { label: 'Active Challenges', path: '/explore/challenges', icon: <Trophy /> },
                { label: 'Explore 195+ Hubs', path: '/explore/destinations', icon: <Compass /> }
            ]
        };
    }

    // 3. VIBES ('/explore/vibes' | '/explore/shorts')
    if (pathname.startsWith('/explore/vibes') || pathname.startsWith('/explore/shorts')) {
        return {
            categoryLabel: 'Travel Vibes',
            basePath: '/explore',
            items: [
                { label: 'Vertical Vibes Feed', path: '/explore/vibes', icon: <Video /> },
                { label: 'Saved Vibes Vault', path: '/user/saved-vibes', icon: <Bookmark /> },
                { label: '3D Spatial Portals', path: '/explore/travel-map', icon: <Map /> },
                { label: 'Photography Gallery', path: '/content-media/photography', icon: <Camera /> },
                { label: 'Viral Post Templates', path: '/content-media/post-templates', icon: <LayoutGrid /> },
                { label: 'Clone to Trip Builder', path: '/explore/trip-builder', icon: <Backpack /> }
            ]
        };
    }

    // 4. TRAVEL MAP ('/explore/travel-map' | '/explore/map' | '?view=map')
    if (
        pathname.startsWith('/explore/travel-map') ||
        pathname.startsWith('/explore/map') ||
        fullUrl.includes('view=map')
    ) {
        return {
            categoryLabel: 'Travel Map',
            basePath: '/explore',
            items: [
                { label: '360° Spatial Portals', path: '/explore/travel-map', icon: <Map /> },
                { label: 'AR & WebXR Reality Hub', path: '/explore/ar-hub', icon: <Sparkles /> },
                { label: 'Wi-Fi & Nearby Radar', path: '/explore/speed-test', icon: <Wifi /> },
                { label: 'Safety & Risk Map', path: '/explore/risk', icon: <Shield /> },
                { label: 'My Travel Journey', path: '/user/travel-journey', icon: <Compass /> },
                { label: 'Explore Destinations', path: '/explore/destinations', icon: <Palmtree /> }
            ]
        };
    }

    // 5. BOOK TRAVEL, FLIGHT TRACKER & HOTEL FINDER
    if (
        pathname.startsWith('/explore/book-travel') ||
        pathname.startsWith('/explore/hotel-finder') ||
        pathname.startsWith('/explore/flights-visa') ||
        pathname.startsWith('/explore/seenomad-multi')
    ) {
        return {
            categoryLabel: 'Book Travel',
            basePath: '/explore',
            items: [
                { label: 'Flights & Multi-Mode', path: '/explore/book-travel', icon: <Plane /> },
                { label: 'Hotels & Coliving Stays', path: '/explore/hotel-finder', icon: <Building2 /> },
                { label: 'Live Flight Tracker', path: '/explore/flights-visa', icon: <Compass /> },
                { label: 'Verified Reviews', path: '/explore/reviews', icon: <Star /> },
                { label: 'Visa & Entry Rules', path: '/explore/visa', icon: <ShieldCheck /> },
                { label: 'Travel Deals & Perks', path: '/business-partner/overview', icon: <Gift /> }
            ]
        };
    }

    // 6. VISA INFO, TAX COMPLIANCE & EMBASSY DIRECTORY
    if (
        pathname.startsWith('/explore/visa') ||
        pathname.startsWith('/explore/tax-calculator') ||
        pathname.startsWith('/explore/tax-compliance') ||
        pathname.startsWith('/explore/embassy') ||
        pathname.startsWith('/explore/vault')
    ) {
        return {
            categoryLabel: 'Visa & Tax',
            basePath: '/explore',
            items: [
                { label: 'Visa Checker (2026)', path: '/explore/visa', icon: <ShieldCheck /> },
                { label: 'Tax & Compliance Calc', path: '/explore/tax-calculator', icon: <DollarSign /> },
                { label: 'Embassy Directory', path: '/explore/embassy', icon: <Landmark /> },
                { label: 'DNV Intelligence Hub', path: '/explore/visa-intelligence', icon: <Compass /> },
                { label: 'Passport Vault', path: '/explore/vault', icon: <Shield /> },
                { label: 'Safety & Insurance', path: '/support-utility', icon: <ShieldCheck /> }
            ]
        };
    }

    // 7. ITINERARY BUILDER & TRIP BUILDER STUDIO
    if (
        pathname.startsWith('/explore/planner') ||
        pathname.startsWith('/explore/trip-builder') ||
        pathname.startsWith('/explore/multi-city') ||
        pathname.startsWith('/explore/diy')
    ) {
        return {
            categoryLabel: 'Trip Studio',
            basePath: '/explore',
            items: [
                { label: 'Trip Builder Studio', path: '/explore/trip-builder', icon: <Backpack /> },
                { label: 'Day-by-Day Itinerary', path: '/explore/planner', icon: <GitBranch /> },
                { label: 'Multi-City Route', path: '/explore/multi-city', icon: <Map /> },
                { label: 'DIY & Packing Hub', path: '/explore/diy', icon: <Compass /> },
                { label: 'AI Trip Architect', path: '/explore/ai-studio', icon: <Sparkles /> },
                { label: 'Book Route Flights', path: '/explore/book-travel', icon: <Plane /> }
            ]
        };
    }

    // 8. NOMAD AI STUDIO
    if (
        pathname.startsWith('/explore/ai-studio') ||
        pathname.startsWith('/explore/nomad-ai') ||
        pathname.startsWith('/explore/triipper') ||
        pathname.startsWith('/explore/travel-bug') ||
        pathname.startsWith('/explore/super-agent') ||
        pathname.startsWith('/explore/twin') ||
        pathname.startsWith('/ai-agents')
    ) {
        return {
            categoryLabel: 'AI Studio',
            basePath: '/explore',
            items: [
                { label: '4-in-1 AI Command', path: '/explore/ai-studio', icon: <Sparkles /> },
                { label: 'Triipper Route AI', path: '/explore/triipper', icon: <Compass /> },
                { label: 'Super Agent Concierge', path: '/explore/super-agent', icon: <ShieldCheck /> },
                { label: 'Digital Twin Sim', path: '/explore/twin', icon: <UserCheck /> },
                { label: 'Travel Bug Scout', path: '/explore/travel-bug', icon: <Flame /> },
                { label: 'AI Agent Hub', path: '/ai-agents', icon: <Brain /> }
            ]
        };
    }

    // 9. REVIEWS, REWARDS, DESTINATION GUIDES, TRAVEL AGENTS & NEARBY PLACES
    if (
        pathname.startsWith('/explore/reviews') ||
        pathname.startsWith('/explore/passport-perks') ||
        pathname.startsWith('/explore/perks') ||
        pathname.startsWith('/explore/trivenly') ||
        pathname.startsWith('/explore/marketplace') ||
        pathname.startsWith('/explore/guardians') ||
        pathname.startsWith('/explore/speed-test') ||
        pathname.startsWith('/explore/connectivity-market') ||
        pathname.startsWith('/explore/culture-community')
    ) {
        return {
            categoryLabel: 'Travel Tools',
            basePath: '/explore',
            items: [
                { label: 'Verified Reviews', path: '/explore/reviews', icon: <Star /> },
                { label: 'Rewards & Perks', path: '/explore/passport-perks', icon: <Gift /> },
                { label: 'Destination Guides', path: '/explore/trivenly', icon: <BookOpen /> },
                { label: 'Local Travel Agents', path: '/explore/guardians', icon: <UserCheck /> },
                { label: 'Nearby Wi-Fi & Cafes', path: '/explore/speed-test', icon: <Wifi /> },
                { label: 'Cultural Compass', path: '/explore/cultural-compass', icon: <Compass /> }
            ]
        };
    }

    // 10. QUESTS & RANKINGS (Challenges, Milestones, Leaderboard)
    if (
        pathname.startsWith('/explore/challenges') ||
        pathname.startsWith('/explore/viral-challenges') ||
        pathname.startsWith('/explore/rivalry') ||
        pathname.startsWith('/explore/rewards') ||
        pathname.startsWith('/user/achievements') ||
        pathname.startsWith('/user/xp-tracker')
    ) {
        return {
            categoryLabel: 'Quests & Rank',
            basePath: '',
            items: [
                { label: 'Active Challenges', path: '/explore/challenges', icon: <Trophy /> },
                { label: 'Milestones & Stamps', path: '/user/achievements', icon: <Award /> },
                { label: 'Global Leaderboard', path: '/explore/rivalry', icon: <TrendingUp /> },
                { label: 'XP & Level Tracker', path: '/user/xp-tracker', icon: <Sparkles /> },
                { label: 'Referral Bounties', path: '/explore/rewards', icon: <Gift /> }
            ]
        };
    }

    // 11. CONTENT & MEDIA ('/content-media/*')
    if (pathname.startsWith('/content-media')) {
        return {
            categoryLabel: 'Content & Media',
            basePath: '/content-media',
            items: [
                { label: 'Photography', path: '/content-media/photography', icon: <Camera /> },
                { label: 'Podcasts', path: '/content-media/podcasts', icon: <Mic /> },
                { label: 'Learning Academy', path: '/content-media/learning', icon: <GraduationCap /> },
                { label: 'Travel Quiz', path: '/content-media/travel-quiz', icon: <Brain /> },
                { label: 'Post Templates', path: '/content-media/post-templates', icon: <LayoutGrid /> },
                { label: 'Content Calendar', path: '/content-media/content-calendar', icon: <Calendar /> }
            ]
        };
    }

    // 12. BUSINESS & MONETIZATION ('/business-partner/*')
    if (pathname.startsWith('/business-partner')) {
        return {
            categoryLabel: 'Business Hub',
            basePath: '/business-partner',
            items: [
                { label: 'Monetize', path: '/business-partner/monetize', icon: <DollarSign /> },
                { label: 'Creator Earnings', path: '/business-partner/creator-earnings', icon: <DollarSign /> },
                { label: 'Analytics & ROI', path: '/business-partner/analytics', icon: <TrendingUp /> },
                { label: 'Ad Manager', path: '/business-partner/ad-manager', icon: <Megaphone /> },
                { label: 'Corporate Retreats', path: '/business-partner/corporate', icon: <Building2 /> },
                { label: 'Travel Deals & Partners', path: '/business-partner/overview', icon: <Gift /> }
            ]
        };
    }

    // 13. LOCAL EXPERIENCES & LEARNING ('/learning-voluntourism/*' | '/explore/local-experiences' | '/explore/cultural-compass')
    if (
        pathname.startsWith('/learning-voluntourism') ||
        pathname.startsWith('/explore/local-experiences') ||
        pathname.startsWith('/explore/cultural-compass')
    ) {
        return {
            categoryLabel: 'Experiences',
            basePath: '/learning-voluntourism',
            items: [
                { label: 'All Immersions', path: '/learning-voluntourism', icon: <Palmtree />, exact: true },
                { label: 'Destination Playbooks', path: '/explore/trivenly', icon: <BookOpen /> },
                { label: 'Courses & Academy', path: '/content-media/learning', icon: <GraduationCap /> },
                { label: 'Local Fixers & Agents', path: '/explore/guardians', icon: <UserCheck /> },
                { label: 'Events & Festivals', path: '/event-festival', icon: <Calendar /> },
                { label: 'Itinerary Builder', path: '/explore/planner', icon: <GitBranch /> }
            ]
        };
    }

    // 14. EVENTS & FESTIVALS ('/event-festival/*' | '/explore/events' | '/explore/nomad-events' | '/explore/festivals')
    if (
        pathname.startsWith('/event-festival') ||
        pathname.startsWith('/explore/events') ||
        pathname.startsWith('/explore/nomad-events') ||
        pathname.startsWith('/explore/festivals')
    ) {
        return {
            categoryLabel: 'Events & Villages',
            basePath: '/event-festival',
            items: [
                { label: 'Festivals & Pop-Up Villages', path: '/event-festival', icon: <Calendar />, exact: true },
                { label: 'My Trips & Journey', path: '/user/travel-journey', icon: <Compass /> },
                { label: 'Festival Stay Deals', path: '/explore/travel-deals', icon: <Gift /> },
                { label: 'Local Experiences', path: '/learning-voluntourism', icon: <Palmtree /> },
                { label: 'Community Meetups', path: '/community/meetups', icon: <Users /> },
                { label: 'Book Event Travel', path: '/explore/book-travel', icon: <Plane /> }
            ]
        };
    }

    // 14B. INSURANCE & SAFETY ('/support-utility/*' | '/explore/insurance' | '/explore/risk')
    if (
        pathname.startsWith('/support-utility') ||
        pathname.startsWith('/explore/insurance') ||
        pathname.startsWith('/explore/risk')
    ) {
        return {
            categoryLabel: 'Insurance & SOS',
            basePath: '/support-utility',
            items: [
                { label: 'Parametric & Medical Shield', path: '/support-utility', icon: <Shield />, exact: true },
                { label: 'Safety & Risk Radar', path: '/explore/risk', icon: <ShieldCheck /> },
                { label: '24/7 Local Fixers', path: '/explore/guardians', icon: <UserCheck /> },
                { label: 'Visa Proof & Rules', path: '/explore/visa', icon: <Landmark /> },
                { label: 'Passport Vault', path: '/explore/vault', icon: <Shield /> }
            ]
        };
    }

    // 14C. MY TRIPS, JOURNEY & EXCLUSIVE TRAVEL DEALS ('/user/travel-journey' | '/explore/travel-deals' | '/explore/deals' | '/user/offers')
    if (
        pathname.startsWith('/user/travel-journey') ||
        pathname.startsWith('/explore/travel-deals') ||
        pathname.startsWith('/explore/deals') ||
        pathname.startsWith('/user/offers')
    ) {
        return {
            categoryLabel: 'Trip Planning',
            basePath: '',
            items: [
                { label: 'My Trips & Journey', path: '/user/travel-journey', icon: <Compass /> },
                { label: 'Exclusive Travel Deals', path: '/explore/travel-deals', icon: <Gift /> },
                { label: 'Day-by-Day Itinerary', path: '/explore/planner', icon: <GitBranch /> },
                { label: 'Book Flights & Stays', path: '/explore/book-travel', icon: <Plane /> },
                { label: 'Rewards & Perks', path: '/explore/passport-perks', icon: <Award /> },
                { label: 'Saved Wishlist', path: '/saved', icon: <Bookmark /> }
            ]
        };
    }

    // 15. USER HUB, PROFILE, SAVED VIBES, WALLET, MESSAGES & SETTINGS
    if (
        pathname.startsWith('/user') ||
        pathname.startsWith('/saved') ||
        pathname.startsWith('/notifications') ||
        pathname.startsWith('/messages') ||
        pathname.startsWith('/settings')
    ) {
        return {
            categoryLabel: 'Traveler Hub',
            basePath: '',
            items: [
                { label: 'My Profile', path: '/user/profile', icon: <User /> },
                { label: 'Saved Vibes', path: '/user/saved-vibes', icon: <Video /> },
                { label: 'Saved Destinations', path: '/saved', icon: <Bookmark /> },
                { label: 'My Trips & Journey', path: '/user/travel-journey', icon: <Compass /> },
                { label: 'Wallet & Payouts', path: '/user/wallet', icon: <Wallet /> },
                { label: 'Messages', path: '/user/messages', icon: <MessageCircle /> },
                { label: 'Notifications', path: '/notifications', icon: <Bell /> },
                { label: 'Settings & Theme', path: '/settings', icon: <Settings /> }
            ]
        };
    }

    return null;
};

const ModuleNavbar = ({ isSidebarCollapsed, items, basePath }) => {
    const { moduleNavItems, moduleBasePath } = useNavStore();
    const location = useLocation();

    const contextualSubNav = useMemo(
        () => getContextualFeatureSubNav(location.pathname, location.search),
        [location.pathname, location.search]
    );

    const resolvedItems = useMemo(() => {
        if (items && items.length > 0) return items;
        if (contextualSubNav && contextualSubNav.items?.length > 0) return contextualSubNav.items;
        return moduleNavItems;
    }, [items, contextualSubNav, moduleNavItems]);

    const resolvedBasePath =
        basePath !== undefined
            ? basePath
            : contextualSubNav
            ? contextualSubNav.basePath
            : moduleBasePath;

    const categoryBadgeLabel = useMemo(() => {
        if (contextualSubNav?.categoryLabel) return contextualSubNav.categoryLabel;
        if (location.pathname.startsWith('/community')) return 'Community';
        if (location.pathname.startsWith('/insights-analytics')) return 'Travel News';
        if (location.pathname.startsWith('/support-utility')) return 'Safety & Insurance';
        if (location.pathname.startsWith('/travel-games')) return 'Travel Games';
        return 'Explore';
    }, [contextualSubNav, location.pathname]);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 4);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        updateScrollState();

        // Allow vertical mouse wheel over the pill strip to smoothly scroll horizontally
        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
                e.preventDefault();
                el.scrollLeft += e.deltaY * 0.85;
            }
        };

        el.addEventListener('scroll', updateScrollState, { passive: true });
        el.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            el.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [resolvedItems, updateScrollState]);

    // Automatically center active item inside horizontal ribbon on route change
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const activeLink = el.querySelector('.module-nav-item.active');
        if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        setTimeout(updateScrollState, 180);
    }, [location.pathname, updateScrollState]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = Math.max(220, scrollContainerRef.current.clientWidth * 0.55);
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!resolvedItems || resolvedItems.length === 0) return null;

    return (
        <nav
            className={`module-navbar ${!isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'}`}
            aria-label="Section sub-navigation"
        >
            <div className={`module-nav-group ${canScrollLeft ? 'can-scroll-left' : ''} ${canScrollRight ? 'can-scroll-right' : ''}`}>
                <button
                    type="button"
                    className={`module-scroll-btn left ${!canScrollLeft ? 'is-disabled' : ''}`}
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    aria-label="Scroll navigation left"
                    title="Scroll left"
                >
                    <ChevronLeft size={14} />
                </button>

                <div className="module-nav-scroll-container" ref={scrollContainerRef}>
                    {categoryBadgeLabel && (
                        <span className="module-nav-context-badge">{categoryBadgeLabel}</span>
                    )}
                    {resolvedItems.map((item, index) => {
                        const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

                        if (typeof item === 'string') {
                            const slug = toSlug(item);
                            const path = `${resolvedBasePath}/${slug}`;
                            return (
                                <NavLink
                                    key={index}
                                    to={path}
                                    className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <span className="module-nav-label">{item}</span>
                                </NavLink>
                            );
                        }

                        if (item.group) {
                            return (
                                <React.Fragment key={index}>
                                    {item.subItems.map((subItem, subIndex) => {
                                        const slug = subItem.slug || toSlug(subItem.label);
                                        const path = subItem.path || `${resolvedBasePath}/${slug}`;
                                        return (
                                            <NavLink
                                                key={`${index}-${subIndex}`}
                                                to={path}
                                                end={subItem.exact}
                                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                                            >
                                                {subItem.icon && (
                                                    <span className="module-nav-icon">
                                                        {React.cloneElement(subItem.icon, { size: 13 })}
                                                    </span>
                                                )}
                                                <span className="module-nav-label">{subItem.label}</span>
                                            </NavLink>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        }

                        const slug = item.slug || toSlug(item.label);
                        const path = item.path || `${resolvedBasePath}/${slug}`;
                        return (
                            <NavLink
                                key={index}
                                to={path}
                                end={item.exact}
                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon && (
                                    <span className="module-nav-icon">
                                        {React.cloneElement(item.icon, { size: 13 })}
                                    </span>
                                )}
                                <span className="module-nav-label">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className={`module-scroll-btn right ${!canScrollRight ? 'is-disabled' : ''}`}
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    aria-label="Scroll navigation right"
                    title="Scroll right"
                >
                    <ChevronRight size={14} />
                </button>
            </div>
        </nav>
    );
};

export default ModuleNavbar;
