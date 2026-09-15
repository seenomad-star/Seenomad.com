import React, { useState, useEffect, useRef } from 'react';
import {
    Search, X, SlidersHorizontal, ArrowUpDown, LayoutGrid, List,
    Sparkles, ShieldCheck, DollarSign, Palmtree, Mountain, Building2,
    Compass, Flame, Globe2, ChevronDown, RotateCcw, Check, MapPin, Star,
    Wifi, Sun, Laptop
} from 'lucide-react';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useNavStore } from '../../../store/navStore';
import { allDestinations } from '../../../data/destinationsData';
import './DestinationSearchHub.css';

export const CATEGORY_PILLS = [
    { id: 'all', label: 'All', icon: Globe2 },
    { id: 'cheap', label: 'Cheap', icon: DollarSign, sublabel: '<$1k' },
    { id: 'fast-internet', label: 'Fast Internet', icon: Wifi, sublabel: '100+ Mbps' },
    { id: 'warm-climate', label: 'Warm Climate', icon: Sun, sublabel: '25°C+' },
    { id: 'beach', label: 'Beaches', icon: Palmtree },
    { id: 'mountain', label: 'Mountains', icon: Mountain },
    { id: 'city', label: 'Tech Cities', icon: Building2 },
    { id: 'visa-friendly', label: 'Visa Free', icon: ShieldCheck },
    { id: 'nomad-hub', label: 'Nomad Hubs', icon: Laptop },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'nightlife', label: 'Nightlife', icon: Sparkles }
];

const REGIONS = [
    { id: 'asia', label: 'Asia' },
    { id: 'europe', label: 'Europe' },
    { id: 'americas', label: 'Americas' },
    { id: 'africa', label: 'Africa' },
    { id: 'oceania', label: 'Oceania' }
];

const BUDGET_OPTIONS = [
    { id: 'budget', label: 'Budget (≤$1k)' },
    { id: 'mid-range', label: 'Mid-range ($1k-$3k)' },
    { id: 'luxury', label: 'Luxury ($3k+)' }
];

const SORT_OPTIONS = [
    { id: 'featured', label: 'Featured / Match' },
    { id: 'rating', label: 'Highest Rated (★)' },
    { id: 'popular', label: 'Most Popular / Live' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'name', label: 'Alphabetical (A-Z)' }
];

const POPULAR_SUGGESTIONS = [
    'Bali, Indonesia',
    'Chiang Mai, Thailand',
    'Santorini, Greece',
    'Tokyo, Japan',
    'Lisbon, Portugal',
    'Bora Bora',
    'Phuket, Thailand'
];

const DestinationSearchHub = ({ totalResults = 0, onSelectDestination }) => {
    const {
        searchQuery,
        setSearchQuery,
        selectedFilters,
        toggleFilter,
        setSelectedFilters,
        advancedFilters,
        toggleAdvancedFilter,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        searchHistory,
        addSearchHistory,
        resetFilters
    } = useDestinationStore();

    const {
        setGlobalSearchQuery,
        setGlobalActiveFilters
    } = useNavStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Keyboard shortcut for quick search focus (/ or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
                e.preventDefault();
                inputRef.current?.focus();
            } else if (e.key === 'Escape') {
                setIsDropdownOpen(false);
                setIsFilterPanelOpen(false);
                inputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close suggestions dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setGlobalSearchQuery(value);
        setIsDropdownOpen(true);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setGlobalSearchQuery('');
        inputRef.current?.focus();
    };

    const handleSelectSuggestion = (text) => {
        setSearchQuery(text);
        setGlobalSearchQuery(text);
        addSearchHistory(text);
        setIsDropdownOpen(false);
    };

    const handlePillClick = (pillId) => {
        if (pillId === 'all') {
            setSelectedFilters([]);
            setGlobalActiveFilters([]);
            return;
        }

        const nextFilters = selectedFilters.includes(pillId)
            ? selectedFilters.filter(id => id !== pillId)
            : [...selectedFilters, pillId];

        setSelectedFilters(nextFilters);
        setGlobalActiveFilters(nextFilters);
    };

    const handleResetAll = () => {
        resetFilters();
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
    };

    // Calculate active filter count
    const activeFilterCount = (selectedFilters.length) +
        (advancedFilters.regions.length) +
        (advancedFilters.budgetRanges.length) +
        (advancedFilters.categories.length) +
        (searchQuery ? 1 : 0);

    // Suggestions matching current search query
    const matchingDestinations = searchQuery.trim()
        ? allDestinations.filter(d =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : [];

    return (
        <section className="destination-search-hub" id="destination-search-hub" aria-label="Destination Search & Filter Hub">
            {/* Main Search Input Bar */}
            <div className="search-hub-bar-container" ref={searchContainerRef}>
                <div className={`search-hub-input-wrapper ${isDropdownOpen ? 'active' : ''}`}>
                    <Search className="search-hub-icon" size={20} />
                    <input
                        ref={inputRef}
                        id="destination-search-input"
                        type="text"
                        placeholder="Search destinations, countries, cities, or nomad vibes... (Press '/' to focus)"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="search-hub-input"
                        autoComplete="off"
                    />

                    {searchQuery && (
                        <button
                            id="destination-search-clear-btn"
                            type="button"
                            onClick={handleClearSearch}
                            className="search-hub-clear-btn"
                            aria-label="Clear search input"
                        >
                            <X size={16} />
                        </button>
                    )}

                    <div className="search-hub-shortcut-badge" title="Press / to focus">
                        <span>/</span>
                    </div>

                    <button
                        id="destination-filter-toggle-btn"
                        type="button"
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                        className={`search-hub-filter-toggle ${isFilterPanelOpen || activeFilterCount > 0 ? 'active' : ''}`}
                        aria-expanded={isFilterPanelOpen}
                    >
                        <SlidersHorizontal size={16} />
                        <span>Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="search-hub-filter-badge">{activeFilterCount}</span>
                        )}
                        <ChevronDown size={14} className={`search-hub-chevron ${isFilterPanelOpen ? 'rotated' : ''}`} />
                    </button>
                </div>

                {/* Instant Suggestions Dropdown */}
                {isDropdownOpen && (
                    <div className="search-hub-suggestions-dropdown" id="search-hub-dropdown">
                        {/* Live Matching Destination Previews */}
                        {matchingDestinations.length > 0 && (
                            <div className="suggestions-section">
                                <div className="suggestions-header">
                                    <Sparkles size={14} className="accent-icon" />
                                    <span>Matching Destinations</span>
                                </div>
                                <div className="suggestions-grid">
                                    {matchingDestinations.map((dest) => (
                                        <div
                                            key={dest.id}
                                            className="suggestion-dest-item"
                                            onClick={() => {
                                                handleSelectSuggestion(dest.name);
                                                if (onSelectDestination) onSelectDestination(dest);
                                            }}
                                        >
                                            <img src={dest.image} alt={dest.name} className="suggestion-dest-img" />
                                            <div className="suggestion-dest-info">
                                                <div className="suggestion-dest-title">
                                                    <span className="name">{dest.name}</span>
                                                    <span className="price">{dest.price}</span>
                                                </div>
                                                <div className="suggestion-dest-sub">
                                                    <MapPin size={12} />
                                                    <span>{dest.location}</span>
                                                    <span className="dot">•</span>
                                                    <span className="category">{dest.category}</span>
                                                    {dest.rating && (
                                                        <>
                                                            <span className="dot">•</span>
                                                            <Star size={11} className="star-icon" fill="currentColor" />
                                                            <span>{dest.rating}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Searches */}
                        {searchHistory && searchHistory.length > 0 && (
                            <div className="suggestions-section">
                                <div className="suggestions-header">
                                    <span>Recent Searches</span>
                                </div>
                                <div className="suggestions-pills">
                                    {searchHistory.slice(0, 5).map((query, i) => (
                                        <button
                                            key={`history-${i}`}
                                            type="button"
                                            className="suggestion-pill history"
                                            onClick={() => handleSelectSuggestion(query)}
                                        >
                                            {query}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Popular Nomad Destinations */}
                        <div className="suggestions-section">
                            <div className="suggestions-header">
                                <span>Popular Destinations</span>
                            </div>
                            <div className="suggestions-pills">
                                {POPULAR_SUGGESTIONS.map((item, idx) => (
                                    <button
                                        key={`popular-${idx}`}
                                        type="button"
                                        className="suggestion-pill"
                                        onClick={() => handleSelectSuggestion(item)}
                                    >
                                        <Compass size={12} />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pill-Style Category Filter Bar */}
            <div className="search-hub-pills-bar" role="group" aria-label="Category Pill Filters">
                <div className="search-hub-pills-track">
                    {CATEGORY_PILLS.map((pill) => {
                        const Icon = pill.icon;
                        const isSelected = pill.id === 'all'
                            ? selectedFilters.length === 0
                            : selectedFilters.includes(pill.id);

                        return (
                            <button
                                key={pill.id}
                                id={`category-pill-${pill.id}`}
                                type="button"
                                onClick={() => handlePillClick(pill.id)}
                                className={`category-pill ${isSelected ? 'active' : ''} ${pill.id === 'cheap' ? 'pill-cheap' : ''} ${pill.id === 'fast-internet' ? 'pill-internet' : ''} ${pill.id === 'warm-climate' ? 'pill-warm' : ''}`}
                                aria-pressed={isSelected}
                            >
                                <Icon size={14} className="pill-icon" />
                                <span className="pill-label">{pill.label}</span>
                                {pill.sublabel && (
                                    <span className="pill-sublabel">{pill.sublabel}</span>
                                )}
                                {isSelected && pill.id !== 'all' && (
                                    <span className="pill-check-indicator">
                                        <Check size={11} />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Expandable Advanced Refine Drawer */}
            {isFilterPanelOpen && (
                <div className="search-hub-refine-panel" id="search-hub-refine-panel">
                    <div className="refine-panel-grid">
                        {/* Region Filter */}
                        <div className="refine-group">
                            <span className="refine-group-label">Region</span>
                            <div className="refine-options">
                                {REGIONS.map((region) => {
                                    const isChecked = advancedFilters.regions.includes(region.id);
                                    return (
                                        <button
                                            key={region.id}
                                            type="button"
                                            onClick={() => toggleAdvancedFilter('regions', region.id)}
                                            className={`refine-pill ${isChecked ? 'active' : ''}`}
                                        >
                                            {isChecked && <Check size={12} className="check-icon" />}
                                            <span>{region.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Budget Filter */}
                        <div className="refine-group">
                            <span className="refine-group-label">Budget</span>
                            <div className="refine-options">
                                {BUDGET_OPTIONS.map((b) => {
                                    const isChecked = advancedFilters.budgetRanges.includes(b.id);
                                    return (
                                        <button
                                            key={b.id}
                                            type="button"
                                            onClick={() => toggleAdvancedFilter('budgetRanges', b.id)}
                                            className={`refine-pill ${isChecked ? 'active' : ''}`}
                                        >
                                            {isChecked && <Check size={12} className="check-icon" />}
                                            <span>{b.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reset and Apply Actions */}
                        <div className="refine-actions">
                            <button
                                id="search-hub-reset-btn"
                                type="button"
                                onClick={handleResetAll}
                                className="refine-reset-btn"
                            >
                                <RotateCcw size={14} />
                                <span>Reset All Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Status & Controls Bar */}
            <div className="search-hub-status-bar">
                <div className="status-bar-left">
                    <span className="results-count">
                        <strong>{totalResults}</strong> {totalResults === 1 ? 'destination' : 'destinations'} found
                    </span>

                    {/* Active Filter Badges */}
                    <div className="active-tags-list">
                        {searchQuery && (
                            <span className="active-tag-chip">
                                Query: "{searchQuery}"
                                <button type="button" onClick={handleClearSearch} title="Remove search">
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {selectedFilters.map((fId) => {
                            const found = CATEGORY_PILLS.find(q => q.id === fId);
                            return (
                                <span key={fId} className="active-tag-chip">
                                    {found?.label || fId}
                                    <button type="button" onClick={() => handlePillClick(fId)} title="Remove filter">
                                        <X size={12} />
                                    </button>
                                </span>
                            );
                        })}
                        {advancedFilters.regions.map((reg) => (
                            <span key={reg} className="active-tag-chip region">
                                {reg.toUpperCase()}
                                <button type="button" onClick={() => toggleAdvancedFilter('regions', reg)} title="Remove region">
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        {advancedFilters.budgetRanges.map((b) => (
                            <span key={b} className="active-tag-chip budget">
                                {b}
                                <button type="button" onClick={() => toggleAdvancedFilter('budgetRanges', b)} title="Remove budget">
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        {activeFilterCount > 0 && (
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="clear-all-text-btn"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                <div className="status-bar-right">
                    {/* Sort Dropdown */}
                    <div className="sort-dropdown-container">
                        <ArrowUpDown size={14} className="sort-icon" />
                        <select
                            id="destination-sort-select"
                            value={sortBy || 'featured'}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                            aria-label="Sort destinations"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="view-mode-toggle-group" role="group" aria-label="View mode">
                        <button
                            id="view-mode-grid-btn"
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            title="Grid View"
                            aria-label="Grid View"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            id="view-mode-list-btn"
                            type="button"
                            onClick={() => setViewMode('list')}
                            className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                            title="List View"
                            aria-label="List View"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinationSearchHub;

