import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    DollarSign,
    Shield,
    Wifi,
    ArrowRightLeft,
    Flame,
    Zap,
    CheckCircle2,
    Activity,
    SlidersHorizontal,
    Thermometer,
    Sun,
    CloudSun,
    Snowflake,
    Palmtree,
    Mountain,
    Building2,
    Laptop,
    Star,
    RotateCcw,
    Users,
    Clock,
    Crown,
    Trophy,
    Calendar,
    BookOpen,
    BarChart3,
    Bookmark,
    Sparkles,
    Compass,
    Check,
    Search,
    X,
    ArrowUpDown,
    LayoutGrid,
    List
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useNavStore } from '../../../store/navStore';
import { allDestinations } from '../../../data/destinationsData';
import './NomadDock.css';

const NomadDock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dockRef = useRef(null);

    const { dailyStreak, dailyXP } = useNomadOSStore();
    const {
        searchQuery,
        setSearchQuery,
        selectedFilters,
        toggleFilter,
        setSelectedFilters,
        advancedFilters,
        toggleAdvancedFilter,
        setMinInternetSpeed,
        setMaxMonthlyCost,
        domainStatus,
        setDomainStatus,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        resetFilters,
        setIsFilterDrawerOpen,
        setIsCompareModalOpen
    } = useDestinationStore();

    const {
        globalActiveFilters,
        setGlobalActiveFilters,
        setGlobalSearchQuery
    } = useNavStore();

    const [activeTool, setActiveTool] = useState(null);
    const [pinnedTool, setPinnedTool] = useState(null);
    const [destinationsFoundCount, setDestinationsFoundCount] = useState(allDestinations.length);

    // Sync live destinations count from Destinations page
    useEffect(() => {
        const handleCountUpdate = (e) => {
            if (typeof e.detail?.count === 'number') {
                setDestinationsFoundCount(e.detail.count);
            }
        };
        window.addEventListener('destinations:count', handleCountUpdate);
        return () => window.removeEventListener('destinations:count', handleCountUpdate);
    }, []);

    const dailyGoal = 100;
    const progress = Math.min((dailyXP / dailyGoal) * 100, 100);

    // Close pinned popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dockRef.current && !dockRef.current.contains(e.target)) {
                setPinnedTool(null);
                setActiveTool(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close open tool on route change
    useEffect(() => {
        setPinnedTool(null);
        setActiveTool(null);
    }, [location.pathname]);

    const pathname = location.pathname.toLowerCase();

    // Determine page context for page-specific filters
    const getPageContext = () => {
        if (pathname.includes('/compare')) return 'compare';
        if (pathname.includes('/explore/visa') || pathname.startsWith('/visa')) return 'visa';
        if (pathname.includes('/explore/speed-test')) return 'speed-test';
        if (pathname.startsWith('/explore') || pathname.startsWith('/destinations')) return 'destinations';
        if (pathname === '/' || pathname.startsWith('/feed')) return 'feed';
        if (pathname.startsWith('/popular')) return 'popular';
        if (pathname.startsWith('/saved') || pathname.startsWith('/favorites')) return 'saved';
        if (pathname.startsWith('/travel-games')) return 'games';
        if (pathname.startsWith('/event-festival')) return 'events';
        if (pathname.startsWith('/learning-voluntourism')) return 'learning';
        if (pathname.startsWith('/community')) return 'community';
        if (pathname.startsWith('/insights-analytics')) return 'analytics';
        return 'destinations';
    };

    const pageContext = getPageContext();

    // Sync helper for toggling destination / global filters
    const handleToggleQuickFilter = (filterId) => {
        toggleFilter(filterId);
        const next = globalActiveFilters.includes(filterId)
            ? globalActiveFilters.filter((f) => f !== filterId)
            : [...globalActiveFilters, filterId];
        setGlobalActiveFilters(next);

        // Dispatch a custom event so page-specific views across all modules react immediately
        window.dispatchEvent(new CustomEvent('nomaddock:filter', { detail: { filterId, pageContext } }));
    };

    const handleResetAllPageFilters = () => {
        resetFilters();
        setGlobalActiveFilters([]);
        setGlobalSearchQuery('');
        window.dispatchEvent(new CustomEvent('nomaddock:reset', { detail: { pageContext } }));
    };

    const climates = advancedFilters?.climates || [];
    const budgetRanges = advancedFilters?.budgetRanges || [];
    const internetSpeeds = advancedFilters?.internetSpeeds || [];
    const regions = advancedFilters?.regions || [];
    const minInternetSpeed = advancedFilters?.minInternetSpeed ?? 0;
    const maxMonthlyCost = advancedFilters?.maxMonthlyCost ?? 5000;

    const totalActiveFilters =
        selectedFilters.length +
        climates.length +
        budgetRanges.length +
        internetSpeeds.length +
        regions.length +
        (minInternetSpeed > 0 ? 1 : 0) +
        (maxMonthlyCost < 5000 ? 1 : 0) +
        (domainStatus && domainStatus !== 'all' ? 1 : 0) +
        (searchQuery ? 1 : 0);

    // Build page-specific filter tools dynamically based on current route
    const getPageSpecificFilterTools = () => {
        if (pageContext === 'destinations' || pageContext === 'compare') {
            return [
                {
                    id: 'filter-search-sort',
                    icon: Search,
                    badgeCount: (searchQuery ? 1 : 0) + (sortBy && sortBy !== 'featured' ? 1 : 0),
                    label: 'Search, Sort & View Controls',
                    subtitle: `${destinationsFoundCount} ${destinationsFoundCount === 1 ? 'destination' : 'destinations'} found`,
                    content: (
                        <div className="dock-filter-panel">
                            {/* Search Input Bar transferred into Vertical Bar */}
                            <div className="dock-search-input-wrap">
                                <Search size={14} className="dock-search-icon" />
                                <input
                                    type="text"
                                    value={searchQuery || ''}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setGlobalSearchQuery(e.target.value);
                                    }}
                                    placeholder="Search destinations, countries, vibes..."
                                    className="dock-search-input"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="dock-search-clear"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setGlobalSearchQuery('');
                                        }}
                                        aria-label="Clear search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            {/* Live Count + Compare Cities Row */}
                            <div className="dock-status-meta-row">
                                <span className="dock-results-count-pill">
                                    <strong>{destinationsFoundCount}</strong> destinations found
                                </span>
                                <button
                                    type="button"
                                    className="dock-compare-link-btn"
                                    onClick={() => {
                                        setIsCompareModalOpen(true);
                                        setPinnedTool(null);
                                        setActiveTool(null);
                                    }}
                                >
                                    <ArrowRightLeft size={12} />
                                    <span>Compare Cities</span>
                                </button>
                            </div>

                            {/* Sort Dropdown & Grid/List View Toggle */}
                            <div className="dock-sub-label">SORT & VIEW LAYOUT</div>
                            <div className="dock-sort-view-row">
                                <div className="dock-sort-select-wrap">
                                    <ArrowUpDown size={13} className="dock-sort-icon" />
                                    <select
                                        value={sortBy || 'featured'}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="dock-sort-select"
                                        aria-label="Sort destinations"
                                    >
                                        <option value="featured">Featured / Match</option>
                                        <option value="rating">Highest Rated (★)</option>
                                        <option value="popular">Most Popular / Live</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Alphabetical (A-Z)</option>
                                    </select>
                                </div>
                                <div className="dock-view-toggle-group">
                                    <button
                                        type="button"
                                        className={`dock-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                        title="Grid View"
                                    >
                                        <LayoutGrid size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className={`dock-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                        title="List View"
                                    >
                                        <List size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-categories',
                    icon: Compass,
                    badgeCount: selectedFilters.length,
                    label: 'Category & Vibe Filter Pills',
                    subtitle: `${destinationsFoundCount} destinations found`,
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'ALL' },
                                    { id: 'my-favorites', label: 'MY FAVORITES ★' },
                                    { id: 'cheap', label: 'CHEAP', sub: '<$1K' },
                                    { id: 'fast-internet', label: 'FAST INTERNET', sub: '100+ MBPS' },
                                    { id: 'warm-climate', label: 'WARM CLIMATE', sub: '25°C+' },
                                    { id: 'beach', label: 'BEACHES' },
                                    { id: 'mountain', label: 'MOUNTAINS' },
                                    { id: 'city', label: 'TECH CITIES' },
                                    { id: 'visa-friendly', label: 'VISA FREE' },
                                    { id: 'nomad-hub', label: 'NOMAD HUBS' },
                                    { id: 'trending', label: 'TRENDING' },
                                    { id: 'nightlife', label: 'NIGHTLIFE' }
                                ].map((item) => {
                                    const isActive = item.id === 'all'
                                        ? selectedFilters.length === 0
                                        : selectedFilters.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => {
                                                if (item.id === 'all') {
                                                    setSelectedFilters([]);
                                                    setGlobalActiveFilters([]);
                                                } else {
                                                    handleToggleQuickFilter(item.id);
                                                }
                                            }}
                                        >
                                            <span>{item.label}</span>
                                            {item.sub && (
                                                <span className="dock-chip-mini-badge">{item.sub}</span>
                                            )}
                                            {isActive && item.id !== 'all' && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-climate',
                    icon: Thermometer,
                    badgeCount: climates.length,
                    label: 'Climate Type Filter',
                    subtitle: 'Filter by Weather & Seasonality',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'tropical', label: 'Tropical & Coastal', sub: '26°C – 32°C', icon: Sun },
                                    { id: 'temperate', label: 'Temperate & Mild', sub: '18°C – 25°C', icon: CloudSun },
                                    { id: 'arid', label: 'Arid & Desert Sun', sub: '28°C – 36°C', icon: Flame },
                                    { id: 'alpine', label: 'Alpine & Cool', sub: '5°C – 17°C', icon: Snowflake }
                                ].map((c) => {
                                    const Icon = c.icon;
                                    const isSelected = climates.includes(c.id);
                                    return (
                                        <button
                                            key={c.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('climates', c.id)}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{c.label}</span>
                                                <span className="row-sub">{c.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-cost',
                    icon: DollarSign,
                    badgeCount: budgetRanges.length + (maxMonthlyCost < 5000 ? 1 : 0),
                    label: 'Cost-of-Living Index',
                    subtitle: maxMonthlyCost < 5000 ? `Ceiling: ≤ $${maxMonthlyCost.toLocaleString()}/mo` : 'Monthly Budget Ceiling & Tiers',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-slider-box">
                                <div className="dock-slider-top">
                                    <span>Max Monthly Cost</span>
                                    <strong>{maxMonthlyCost >= 5000 ? 'Any ($5k+)' : `$${maxMonthlyCost.toLocaleString()}/mo`}</strong>
                                </div>
                                <input
                                    type="range"
                                    min="600"
                                    max="5000"
                                    step="100"
                                    value={maxMonthlyCost}
                                    onChange={(e) => setMaxMonthlyCost(Number(e.target.value))}
                                    className="dock-range-slider"
                                />
                            </div>
                            <div className="dock-filter-list">
                                {[
                                    { id: 'budget', label: 'Low Cost Index', sub: 'Under $1,200 / mo' },
                                    { id: 'mid-range', label: 'Moderate Index', sub: '$1,200 – $2,200 / mo' },
                                    { id: 'luxury', label: 'Premium / Western', sub: '$2,200+ / mo' }
                                ].map((tier) => {
                                    const isSelected = budgetRanges.includes(tier.id);
                                    return (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('budgetRanges', tier.id)}
                                        >
                                            <DollarSign size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tier.label}</span>
                                                <span className="row-sub">{tier.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-wifi',
                    icon: Wifi,
                    badgeCount: internetSpeeds.length + (minInternetSpeed > 0 ? 1 : 0),
                    label: 'Internet Speed Filter',
                    subtitle: minInternetSpeed > 0 ? `Minimum: ${minInternetSpeed}+ Mbps` : 'Fiber & Remote Work Connectivity',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-slider-box">
                                <div className="dock-slider-top">
                                    <span>Min Download Speed</span>
                                    <strong>{minInternetSpeed > 0 ? `${minInternetSpeed}+ Mbps` : 'Any Speed'}</strong>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="250"
                                    step="25"
                                    value={minInternetSpeed}
                                    onChange={(e) => setMinInternetSpeed(Number(e.target.value))}
                                    className="dock-range-slider"
                                />
                            </div>
                            <div className="dock-filter-list">
                                {[
                                    { id: 'standard', label: '50+ Mbps', sub: 'HD Calls & Remote Work' },
                                    { id: 'fast', label: '150+ Mbps', sub: 'Fast Fiber & Cloud Sync' },
                                    { id: 'ultrafast', label: '250+ Mbps', sub: 'Gigabit Hubs & 4K Creator' }
                                ].map((tier) => {
                                    const isSelected = internetSpeeds.includes(tier.id);
                                    return (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('internetSpeeds', tier.id)}
                                        >
                                            <Wifi size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tier.label}</span>
                                                <span className="row-sub">{tier.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-regions-status',
                    icon: Globe,
                    badgeCount: regions.length + (domainStatus && domainStatus !== 'all' ? 1 : 0),
                    label: 'Region & Visa / Domain Filter',
                    subtitle: 'World Regions & Availability',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-sub-label">WORLD REGIONS</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'asia', label: 'Asia' },
                                    { id: 'europe', label: 'Europe' },
                                    { id: 'americas', label: 'Americas' },
                                    { id: 'africa', label: 'Africa' },
                                    { id: 'oceania', label: 'Oceania' }
                                ].map((reg) => {
                                    const isSelected = regions.includes(reg.id);
                                    return (
                                        <button
                                            key={reg.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => toggleAdvancedFilter('regions', reg.id)}
                                        >
                                            <span>{reg.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="dock-sub-label" style={{ marginTop: '0.6rem' }}>DOMAIN STATUS</div>
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All' },
                                    { id: 'available', label: 'Available' },
                                    { id: 'premium', label: 'Premium' },
                                    { id: 'taken', label: 'Taken' }
                                ].map((st) => {
                                    const isSelected = (domainStatus || 'all') === st.id;
                                    return (
                                        <button
                                            key={st.id}
                                            type="button"
                                            className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                            onClick={() => setDomainStatus(st.id)}
                                        >
                                            <span>{st.label}</span>
                                            {isSelected && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'filter-drawer-launch',
                    icon: SlidersHorizontal,
                    badgeCount: totalActiveFilters,
                    label: 'Full Filter Drawer & Compare',
                    subtitle: 'Open Slide-Out Panel or Compare Tool',
                    content: (
                        <div className="dock-filter-panel">
                            <button
                                type="button"
                                className="dock-cta-btn primary"
                                onClick={() => {
                                    setIsFilterDrawerOpen(true);
                                    setPinnedTool(null);
                                    setActiveTool(null);
                                }}
                            >
                                <SlidersHorizontal size={14} />
                                <span>Open Slide-Out Filter Panel</span>
                            </button>
                            <button
                                type="button"
                                className="dock-cta-btn secondary"
                                onClick={() => {
                                    setIsCompareModalOpen(true);
                                    setPinnedTool(null);
                                    setActiveTool(null);
                                }}
                            >
                                <ArrowRightLeft size={14} />
                                <span>Compare Destinations Side-by-Side</span>
                            </button>
                            {totalActiveFilters > 0 && (
                                <button
                                    type="button"
                                    className="dock-cta-btn reset"
                                    onClick={handleResetAllPageFilters}
                                >
                                    <RotateCcw size={13} />
                                    <span>Reset All Active Filters ({totalActiveFilters})</span>
                                </button>
                            )}
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'visa') {
            return [
                {
                    id: 'visa-status-filters',
                    icon: Shield,
                    badgeCount: selectedFilters.length,
                    label: 'Visa Entry Filters',
                    subtitle: 'Page-Specific Visa Requirements',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'all', label: 'All Countries (195)', sub: 'Global Passport Index' },
                                    { id: 'visa-free', label: 'Visa Free (58)', sub: 'Instant entry on arrival' },
                                    { id: 'evisa', label: 'e-Visa (24)', sub: 'Online approval in 24-72h' },
                                    { id: 'voa', label: 'Visa on Arrival (32)', sub: 'Stamped at airport' },
                                    { id: 'nomad-visa', label: 'Digital Nomad Visas', sub: '1–2 year remote work stays' }
                                ].map((v) => {
                                    const isSelected = selectedFilters.includes(v.id);
                                    return (
                                        <button
                                            key={v.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(v.id)}
                                        >
                                            <Shield size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{v.label}</span>
                                                <span className="row-sub">{v.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'speed-test') {
            return [
                {
                    id: 'speed-map-filters',
                    icon: Wifi,
                    badgeCount: selectedFilters.length,
                    label: 'Wi-Fi Spot Filters',
                    subtitle: 'Filter Speed Test Map by Workspace Type',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All Spots' },
                                    { id: 'coworking', label: 'Coworking Spaces' },
                                    { id: 'cafe', label: 'Work Cafes' },
                                    { id: 'coliving', label: 'Coliving Hubs' },
                                    { id: 'hotel', label: 'Nomad Hotels' },
                                    { id: '100mbps', label: 'Blazing 100+ Mbps' }
                                ].map((item) => {
                                    const isActive = selectedFilters.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(item.id)}
                                        >
                                            <span>{item.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'feed' || pageContext === 'popular' || pageContext === 'community') {
            return [
                {
                    id: 'feed-stream-filters',
                    icon: Flame,
                    badgeCount: globalActiveFilters.length,
                    label: pageContext === 'popular' ? 'Popular Feed Filters' : pageContext === 'community' ? 'Community Hub Filters' : 'Travel Feed Filters',
                    subtitle: 'Page-Specific Stream & Content Filters',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-list">
                                {[
                                    { id: 'trending', label: 'Trending Dispatches', sub: 'Viral stories & top upvotes', icon: Flame },
                                    { id: 'following', label: 'Following Circle', sub: 'Updates from nomads you follow', icon: Users },
                                    { id: 'recent', label: 'Recent / Live', sub: 'Real-time chronological stream', icon: Clock },
                                    { id: 'vlogs', label: 'Video Vlogs & Reels', sub: 'Cinematic travel shorts', icon: Sparkles },
                                    { id: 'events', label: 'Meetups & Events', sub: 'Local nomad gatherings', icon: Calendar }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    const isSelected = globalActiveFilters.includes(tab.id);
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            className={`dock-filter-row-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => {
                                                handleToggleQuickFilter(tab.id);
                                                const btn = document.getElementById(`tab-filter-${tab.id}`);
                                                if (btn) btn.click();
                                            }}
                                        >
                                            <Icon size={14} className="row-icon" />
                                            <div className="row-text">
                                                <span className="row-title">{tab.label}</span>
                                                <span className="row-sub">{tab.sub}</span>
                                            </div>
                                            {isSelected && <Check size={13} className="row-check" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'saved') {
            return [
                {
                    id: 'saved-favorites-filters',
                    icon: Bookmark,
                    badgeCount: selectedFilters.length,
                    label: 'My Favorites Filters',
                    subtitle: 'Filter Saved Collection in Local Profile',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'all', label: 'All Saved' },
                                    { id: 'Beach', label: 'Beach & Island' },
                                    { id: 'City', label: 'Metropolis' },
                                    { id: 'visa', label: 'Visa-Free' },
                                    { id: 'budget', label: 'Under $1,500/mo' }
                                ].map((cat) => {
                                    const isActive = selectedFilters.includes(cat.id);
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(cat.id)}
                                        >
                                            <span>{cat.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'games') {
            return [
                {
                    id: 'games-quest-filters',
                    icon: Trophy,
                    badgeCount: globalActiveFilters.length,
                    label: 'Travel Quests & Games Filters',
                    subtitle: 'Filter by Genre, Rewards & Mode',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'free', label: 'Free to Play' },
                                    { id: 'trending', label: 'Trending Quests' },
                                    { id: 'tournaments', label: 'Live Tournaments' },
                                    { id: 'high-rewards', label: 'High XP Rewards' },
                                    { id: 'multiplayer', label: 'Multiplayer Co-op' }
                                ].map((gf) => {
                                    const isActive = globalActiveFilters.includes(gf.id);
                                    return (
                                        <button
                                            key={gf.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(gf.id)}
                                        >
                                            <span>{gf.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'events') {
            return [
                {
                    id: 'events-festival-filters',
                    icon: Calendar,
                    badgeCount: globalActiveFilters.length,
                    label: 'Events & Festivals Filters',
                    subtitle: 'Filter Global Gatherings & Tickets',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'upcoming-events', label: 'Upcoming Events' },
                                    { id: 'music-festivals', label: 'Music Festivals' },
                                    { id: 'cultural-festivals', label: 'Cultural Festivals' },
                                    { id: 'food--drink', label: 'Food & Drink' },
                                    { id: 'conferences', label: 'Nomad Conferences' },
                                    { id: 'ai-picks', label: 'AI Event Picks' }
                                ].map((ef) => {
                                    const isActive = globalActiveFilters.includes(ef.id);
                                    return (
                                        <button
                                            key={ef.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(ef.id)}
                                        >
                                            <span>{ef.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        if (pageContext === 'learning') {
            return [
                {
                    id: 'learning-voluntourism-filters',
                    icon: BookOpen,
                    badgeCount: globalActiveFilters.length,
                    label: 'Learning & Voluntourism Filters',
                    subtitle: 'Filter Courses, Eco-Projects & Scholarships',
                    content: (
                        <div className="dock-filter-panel">
                            <div className="dock-filter-chips-grid">
                                {[
                                    { id: 'courses', label: 'Courses' },
                                    { id: 'workshops', label: 'Workshops' },
                                    { id: 'language-learning', label: 'Language Learning' },
                                    { id: 'volunteer-projects', label: 'Volunteer Projects' },
                                    { id: 'eco-tourism', label: 'Eco-Tourism' },
                                    { id: 'scholarships', label: 'Scholarships' }
                                ].map((lf) => {
                                    const isActive = globalActiveFilters.includes(lf.id);
                                    return (
                                        <button
                                            key={lf.id}
                                            type="button"
                                            className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                            onClick={() => handleToggleQuickFilter(lf.id)}
                                        >
                                            <span>{lf.label}</span>
                                            {isActive && <Check size={11} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ];
        }

        return [
            {
                id: 'analytics-filters',
                icon: BarChart3,
                badgeCount: globalActiveFilters.length,
                label: 'Page Filters & Telemetry',
                subtitle: 'Filter Insights & Metrics',
                content: (
                    <div className="dock-filter-panel">
                        <div className="dock-filter-chips-grid">
                            {[
                                { id: 'user-insights', label: 'User Insights' },
                                { id: 'market-trends', label: 'Market Trends' },
                                { id: 'predictions', label: 'Predictions' },
                                { id: 'ai-picks', label: 'AI Insights' }
                            ].map((af) => {
                                const isActive = globalActiveFilters.includes(af.id);
                                return (
                                    <button
                                        key={af.id}
                                        type="button"
                                        className={`dock-filter-chip ${isActive ? 'active' : ''}`}
                                        onClick={() => handleToggleQuickFilter(af.id)}
                                    >
                                        <span>{af.label}</span>
                                        {isActive && <Check size={11} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        ];
    };

    const pageFilterTools = getPageSpecificFilterTools();

    const tools = [
        {
            id: 'live-intel',
            icon: () => (
                <div className="dock-live-intel-icon">
                    <span className="live-pulse-dot-dock"></span>
                    <Activity size={17} className="intel-activity-icon" />
                </div>
            ),
            label: 'Explore Global Destinations & Nomad Hubs',
            subtitle: 'Live Travel Intelligence • Verified 2026',
            content: (
                <div className="tool-detail dock-domain-hub-panel">
                    <div className="intel-verified-pill">
                        <span className="live-pulse-dot-dock"></span>
                        <span>Live Travel Intelligence • Verified 2026</span>
                    </div>
                    <p className="dock-domain-desc">
                        Discover verified cost-of-living data, fiber internet speeds, community vibes, and real-time visa guidelines for nomadic explorers and global citizens.
                    </p>

                    {/* 4 Key Metric Counters transferred from DestinationDomainHeader */}
                    <div className="dock-domain-kpi-grid">
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">195+</span>
                            <span className="dock-kpi-label">Countries Indexed</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">850+</span>
                            <span className="dock-kpi-label">Nomad Cities</span>
                        </div>
                        <div className="dock-kpi-card highlight">
                            <span className="dock-kpi-value">98.4%</span>
                            <span className="dock-kpi-label">Visa Accuracy</span>
                        </div>
                        <div className="dock-kpi-card">
                            <span className="dock-kpi-value">100+ Mbps</span>
                            <span className="dock-kpi-label">Avg Hub Speed</span>
                        </div>
                    </div>

                    {/* Quick Discovery Presets transferred from DestinationDomainHeader */}
                    <div className="dock-sub-label" style={{ marginTop: '0.35rem' }}>QUICK DISCOVERY:</div>
                    <div className="dock-filter-chips-grid">
                        {[
                            { id: 'nomad-hub', label: 'Top Nomad Hubs', badge: 'Hot' },
                            { id: 'beach', label: 'Beach Paradises' },
                            { id: 'mountain', label: 'Mountain Escapes' },
                            { id: 'cheap', label: 'Budget Under $1k', badge: 'Save' },
                            { id: 'fast-internet', label: '100+ Mbps Wi-Fi' },
                            { id: 'visa-friendly', label: 'Visa-Friendly', badge: 'Easy' },
                            { id: 'trending', label: 'Trending Worldwide' }
                        ].map((preset) => {
                            const isSelected = selectedFilters.includes(preset.id);
                            return (
                                <button
                                    key={preset.id}
                                    type="button"
                                    className={`dock-filter-chip ${isSelected ? 'active' : ''}`}
                                    onClick={() => {
                                        handleToggleQuickFilter(preset.id);
                                        if (!pathname.startsWith('/explore/destinations')) {
                                            navigate('/explore/destinations');
                                        }
                                    }}
                                >
                                    <span>{preset.label}</span>
                                    {preset.badge && (
                                        <span className="dock-chip-mini-badge">{preset.badge}</span>
                                    )}
                                    {isSelected && <Check size={11} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* 6 Domain Feature Actions transferred from DestinationDomainHeader */}
                    <div className="dock-sub-label" style={{ marginTop: '0.35rem' }}>EXPLORE TOOLS & HUBS:</div>
                    <div className="dock-domain-actions-list">
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                setIsFilterDrawerOpen(true);
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <SlidersHorizontal size={13} />
                            <span>Filter by Climate, Cost & Speed</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                setIsCompareModalOpen(true);
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <ArrowRightLeft size={13} />
                            <span>Compare Destinations</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/visa');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Shield size={13} />
                            <span>Visa Intelligence Hub</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/speed-test');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Wifi size={13} />
                            <span>Nomad Wi-Fi Speed Map</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn"
                            onClick={() => {
                                navigate('/explore/seenomad-multi');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Compass size={13} />
                            <span>Multi-City Route Planner</span>
                        </button>
                        <button
                            type="button"
                            className="dock-domain-action-btn primary"
                            onClick={() => {
                                navigate('/explore/triipper');
                                setPinnedTool(null);
                                setActiveTool(null);
                            }}
                        >
                            <Sparkles size={13} />
                            <span>Triipper AI Copilot</span>
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 'user',
            icon: () => (
                <div className="dock-user-avatar">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="User" />
                    <div className="status-indicator online"></div>
                </div>
            ),
            label: 'Elite Explorer',
            subtitle: 'Nomad Profile & Streak',
            content: (
                <div className="tool-detail">
                    <div className="user-badge">ELITE</div>
                    <span className="user-status">Exploring</span>
                    <div className="dock-user-stats">
                        <div className="stat-row">
                            <Flame size={12} className="text-orange" />
                            <span>{dailyStreak} DAY STREAK</span>
                        </div>
                        <div className="stat-row">
                            <Zap size={12} className="text-blue" />
                            <span>{dailyXP}/{dailyGoal} XP</span>
                        </div>
                        <div className="dock-progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        ...pageFilterTools
    ];

    const currentOpenTool = pinnedTool || activeTool;

    return (
        <aside
            ref={dockRef}
            className="nomad-dock-wrapper vertical-pill vertical-bar"
            id="vertical-pill-bar"
            data-component="Vertical Pill"
            data-page-context={pageContext}
            aria-label="Vertical Pill / Vertical Bar — Page-Specific Filters & Live Travel Intelligence"
        >
            <div className="nomad-dock vertical-pill-container">
                {/* Vertical Pill / Vertical Bar Header Tag (Compact Icon-Badge) */}
                <div
                    className="vertical-pill-header-badge"
                    title="Vertical Pill / Vertical Bar — Live Travel Intelligence • Verified 2026"
                >
                    <span className="live-pulse-dot-dock"></span>
                    <span className="vertical-pill-tag-text">26</span>
                </div>

                {tools.map((tool) => {
                    const isOpen = currentOpenTool === tool.id;
                    const badgeCount = Number(tool.badgeCount || 0);
                    const hasBadge = badgeCount > 0;

                    return (
                        <div
                            key={tool.id}
                            className={`dock-item-container ${isOpen ? 'active' : ''} ${hasBadge ? 'has-active-filters' : ''} ${tool.id === 'user' ? 'user-top' : ''} ${tool.id === 'live-intel' ? 'live-intel-top' : ''} ${tool.id}`}
                            onMouseEnter={() => {
                                if (!pinnedTool && window.innerWidth > 900) setActiveTool(tool.id);
                            }}
                            onMouseLeave={() => {
                                if (!pinnedTool && window.innerWidth > 900) setActiveTool(null);
                            }}
                        >
                            <motion.button
                                type="button"
                                className={`dock-item ${tool.id} ${hasBadge ? 'filter-active' : ''}`}
                                whileHover={{ scale: 1.06, x: 2 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => {
                                    setPinnedTool((prev) => (prev === tool.id ? null : tool.id));
                                    setActiveTool((prev) => (prev === tool.id && pinnedTool === tool.id ? null : tool.id));
                                }}
                                style={{
                                    color: tool.id === 'live-intel' ? '#10b981' : 'inherit'
                                }}
                                aria-label={hasBadge ? `${tool.label} (${badgeCount} active)` : tool.label}
                                title={hasBadge ? `${tool.label} • ${badgeCount} active` : tool.label}
                                aria-expanded={isOpen}
                            >
                                {typeof tool.icon === 'function' ? <tool.icon /> : <tool.icon size={16} />}
                                {hasBadge && (
                                    <span
                                        className="dock-filter-count-badge"
                                        aria-label={`${badgeCount} active filters`}
                                    >
                                        {badgeCount > 9 ? '9+' : badgeCount}
                                    </span>
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        className="dock-tooltip dock-interactive-popover"
                                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -8, scale: 0.96 }}
                                        transition={{ duration: 0.16 }}
                                        onMouseEnter={() => {
                                            if (!pinnedTool) setActiveTool(tool.id);
                                        }}
                                        onMouseLeave={() => {
                                            if (!pinnedTool) setActiveTool(null);
                                        }}
                                    >
                                        <div className="tooltip-bar-name">
                                            <span>VERTICAL PILL • PAGE FILTERS</span>
                                            {totalActiveFilters > 0 && tool.id.startsWith('filter-') && (
                                                <button
                                                    type="button"
                                                    className="dock-inline-reset-btn"
                                                    onClick={handleResetAllPageFilters}
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                        <div className="tooltip-header">{tool.label}</div>
                                        {tool.subtitle && (
                                            <div className="tooltip-subtitle">{tool.subtitle}</div>
                                        )}
                                        {tool.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {/* Quick Reset Button on the Vertical Pill when any filter is active */}
                {totalActiveFilters > 0 && (
                    <button
                        type="button"
                        className="dock-quick-clear-pill"
                        onClick={handleResetAllPageFilters}
                        title={`Clear all ${totalActiveFilters} active filters`}
                    >
                        <RotateCcw size={13} />
                        <span>{totalActiveFilters}</span>
                    </button>
                )}
            </div>
        </aside>
    );
};

export default NomadDock;
