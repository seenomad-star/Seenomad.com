import React from 'react';
import {
    Landmark,
    UtensilsCrossed,
    Sparkles,
    Compass,
    Globe2,
    MapPin,
    Check,
    RotateCcw
} from 'lucide-react';
import './DelhiCategoryFilterBar.css';

export const DELHI_CATEGORIES = [
    {
        id: 'all',
        label: 'All Delhi',
        icon: MapPin,
        colorClass: 'cat-all',
        description: 'All 25 curated historical, food, cultural & outdoor attractions across Delhi NCT'
    },
    {
        id: 'historical',
        label: 'Historical',
        icon: Landmark,
        colorClass: 'cat-historical',
        description: 'Mughal citadels, UNESCO minarets, ancient stepwells & imperial arch memorials'
    },
    {
        id: 'food',
        label: 'Food',
        icon: UtensilsCrossed,
        colorClass: 'cat-food',
        description: 'Legendary Old Delhi street food galis, 28-state food bazaars, momos & Mughlai feasts'
    },
    {
        id: 'culture',
        label: 'Culture',
        icon: Sparkles,
        colorClass: 'cat-culture',
        description: 'White marble lotus petals, 24/7 community langars, Sufi qawwali & public street art'
    },
    {
        id: 'adventure',
        label: 'Adventure',
        icon: Compass,
        colorClass: 'cat-adventure',
        description: 'Hidden blue quarry lakes, Aravali ridge mountain bike trails, rock climbing & forest hikes'
    }
];

const DelhiCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalDelhiCount = 0,
    onResetToGlobal,
    isGlobalMode = false
}) => {
    return (
        <section className="delhi-filter-section" aria-label="Delhi Destinations Explorer and Category Filters">
            <div className="delhi-filter-header-row">
                <div className="delhi-filter-title-group">
                    <div className="delhi-pill-badge">
                        <span className="delhi-flag-emoji">🇮🇳</span>
                        <span>Delhi, India Hub</span>
                        <span className="delhi-count-chip">{totalDelhiCount} Destinations</span>
                    </div>
                    <h2 className="delhi-section-title">
                        Explore Delhi by Category
                    </h2>
                    <p className="delhi-section-subtitle">
                        Filter through Delhi’s iconic historical wonders, world-renowned street food, sacred heritage, and outdoor ridge trails.
                    </p>
                </div>

                {onResetToGlobal && (
                    <div className="delhi-header-actions">
                        <button
                            type="button"
                            onClick={onResetToGlobal}
                            className={`global-switch-btn ${isGlobalMode ? 'active' : ''}`}
                            title="Switch to browsing all global international destinations"
                        >
                            <Globe2 size={14} />
                            <span>{isGlobalMode ? 'Viewing All Global' : 'Browse All Global'}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Category Toggle Pills */}
            <div className="delhi-category-pills-rail" role="tablist" aria-label="Delhi destination category filters">
                {DELHI_CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    const isActive = activeCategory === cat.id && !isGlobalMode;
                    const count = cat.id === 'all' 
                        ? totalDelhiCount 
                        : (categoryCounts[cat.id] || categoryCounts[cat.label] || 0);

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`delhi-category-pill ${cat.colorClass} ${isActive ? 'is-active' : ''}`}
                            onClick={() => onSelectCategory(cat.id)}
                        >
                            <span className="pill-icon-wrap">
                                <IconComponent size={16} />
                            </span>
                            <span className="pill-label-text">{cat.label}</span>
                            <span className="pill-count-bubble">{count}</span>
                            {isActive && <Check size={13} className="pill-active-check" />}
                        </button>
                    );
                })}
            </div>

            {/* Active Category Description Ribbon */}
            {!isGlobalMode && (
                <div className="delhi-active-info-ribbon">
                    <span className="ribbon-sparkle-dot" />
                    <span className="ribbon-text">
                        <strong>
                            {DELHI_CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Delhi'}:
                        </strong>{' '}
                        {DELHI_CATEGORIES.find(c => c.id === activeCategory)?.description}
                    </span>
                </div>
            )}
        </section>
    );
};

export default DelhiCategoryFilterBar;
