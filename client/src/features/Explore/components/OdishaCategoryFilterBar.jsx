import React from 'react';
import {
    Sparkles,
    Waves,
    Landmark,
    Compass,
    MapPin,
    RotateCcw,
    Layers,
    ShieldCheck,
    Megaphone,
    ExternalLink
} from 'lucide-react';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import { OD_CATEGORIES } from './ODDistrictIntelligenceSuite';
import './OdishaCategoryFilterBar.css';

/**
 * OdishaCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for Odisha Tourism
 * Includes quick filters for Beaches, Temples, Tribal Culture, Wildlife, etc.
 * Features integrated Google AdSense advertising banner slot
 */
const OdishaCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 35,
    onOpen30Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    // Current category metadata
    const activeCategoryMeta = OD_CATEGORIES.find(c => c.id === activeCategory) || OD_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 35 curated destinations across all 30 districts of Odisha — the Soul of Incredible India.',
        beaches: 'Puri Golden Beach (Blue Flag), Chandrabhaga Marine Drive, Chandipur Receding Sea, and Gopalpur-on-Sea.',
        temples: 'Shree Jagannath Char Dham, Konark Sun Temple, Lingaraj Temple, and ancient Shaktipeeth shrines.',
        tribal: 'Raghurajpur Pattachitra, Pipili Applique, Sambalpuri Ikat handlooms, Koraput coffee highlands, and tribal haats.',
        wildlife: 'Simlipal Tiger Reserve, Bhitarkanika Mangroves, Gahirmatha Olive Ridley turtles, and Satkosia Gorge.',
        waterfalls: 'Barehipani tiered plunge, Khandadhar 801ft falls, Sanaghagara, and Pradhanpat mountain cascades.',
        nature: 'Chilika Lake brackish lagoon, Daringbadi pine valleys, Deomali mountain peak, and Eastern Ghats.'
    };

    return (
        <section className="odisha-filter-section" aria-label="Odisha Destinations and Category Filters">
            {/* Header info */}
            <div className="odisha-filter-header">
                <div className="odisha-filter-title-wrap">
                    <div className="odisha-filter-badge-row">
                        <span className="odisha-state-badge">
                            ☸️ Odisha Tourism
                        </span>
                        <span className="odisha-count-badge">
                            {totalCount} Destinations Across 30 Districts
                        </span>
                        <span className="odisha-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="odisha-filter-title">
                        <span>Explore Odisha by Interest</span>
                    </h2>

                    <p className="odisha-filter-desc">
                        {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                    </p>
                </div>

                <div className="odisha-filter-actions">
                    {onOpen30Districts && (
                        <button
                            type="button"
                            onClick={onOpen30Districts}
                            className="odisha-action-btn districts"
                            title="Browse all 30 official districts of Odisha"
                        >
                            <MapPin size={14} />
                            <span>All 30 Districts Directory</span>
                        </button>
                    )}

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && onResetFilters && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="odisha-action-btn reset"
                            title="Reset all active filters"
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills (Beaches, Temples, Tribal Culture, etc.) */}
            <div className="odisha-pills-container">
                <div className="odisha-pills-label-row">
                    <span>
                        <Sparkles size={13} className="text-amber-400" />
                        <span>Filter by Category / Travel Theme:</span>
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'none' }}>
                        Click a category to instantly filter destinations
                    </span>
                </div>

                <div className="odisha-categories-grid" role="tablist">
                    {OD_CATEGORIES.map((cat) => {
                        const count = categoryCounts[cat.id] ?? 0;
                        const isActive = activeCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                                className={`odisha-category-pill ${isActive ? 'active' : ''}`}
                                title={cat.description}
                            >
                                <span className="odisha-pill-icon">{cat.icon}</span>
                                <span className="odisha-pill-label">{cat.label}</span>
                                <span className="odisha-pill-count">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Category Detail Card */}
            {activeCategory !== 'all' && (
                <div className="odisha-category-info-card">
                    <div className="odisha-info-text">
                        <span>Showing</span>
                        <strong>{activeCategoryMeta.label} ({categoryCounts[activeCategory] || 0} destinations)</strong>
                        <span>— {activeCategoryMeta.description}</span>
                    </div>
                    <span className="odisha-info-circuit-tag">
                        Odisha Tourism Approved
                    </span>
                </div>
            )}

            {/* Integrated Google AdSense Ready Display Unit */}
            {showAdSense && (
                <div className="odisha-adsense-container">
                    <AdSenseSlot
                        format="auto"
                        slot="7001234567"
                        className="odisha-filter-adsense"
                        label="Featured Partner • Google AdSense"
                    />
                </div>
            )}
        </section>
    );
};

export default OdishaCategoryFilterBar;
