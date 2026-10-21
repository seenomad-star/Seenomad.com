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
    Mountain,
    Trees
} from 'lucide-react';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import { WB_CATEGORIES } from './WBDistrictIntelligenceSuite';
import './WestBengalCategoryFilterBar.css';

/**
 * WestBengalCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for West Bengal Tourism
 * Includes quick filters for Himalayas & Tea, Colonial & Nawabi, Temples & Shrines, Wildlife & Deltas, Beaches, Santiniketan & Terracotta
 * Features integrated Google AdSense advertising banner slot
 */
const WestBengalCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 30,
    onOpen23Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    const activeCategoryMeta = WB_CATEGORIES.find(c => c.id === activeCategory) || WB_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 30 curated destinations across all 23 districts of West Bengal — From the Himalayas to the Bay of Bengal.',
        hills: 'Darjeeling UNESCO Toy Train, Tiger Hill Kanchenjunga Sunrise, Sandakphu 11,930ft Everest Vista, Kalimpong Deolo, and Mirik Pine Lake.',
        heritage: 'Victoria Memorial, Hazarduari Palace 1000 Doors, Cooch Behar Royal Palace, Howrah Bridge, Bandel Basilica, and Gour Sultanate.',
        spiritual: 'Dakshineswar Kali Temple, Belur Math, Mayapur ISKCON Vedic Planetarium, Tarapith Shakti Peeth, and Kalna 108 Shiva Temples.',
        wildlife: 'Sundarbans UNESCO Mangroves & Royal Bengal Tigers, Jaldapara One-Horned Rhinos, Gorumara Gaurs, Buxa Tiger Reserve, and Kulik Heronry.',
        beaches: 'Digha Sea Beach, Mandarmani 13km Motorable Sands, Bakkhali Crescent Beach, and Henry Island Mangrove Sanctuary.',
        cultural: 'Santiniketan Visva-Bharati UNESCO World Heritage, Bishnupur Terracotta Temples & Baluchari Saris, and Purulia Chhau Masks.'
    };

    return (
        <section className="wb-filter-section" aria-label="West Bengal Destinations and Category Filters">
            {/* Header info */}
            <div className="wb-filter-header">
                <div className="wb-filter-title-wrap">
                    <div className="wb-filter-badge-row">
                        <span className="wb-state-badge">
                            🏛️ West Bengal Tourism
                        </span>
                        <span className="wb-count-badge">
                            {totalCount} Destinations Across 23 Districts
                        </span>
                        <span className="wb-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="wb-filter-title">
                        <span>Explore West Bengal by Interest</span>
                    </h2>

                    <p className="wb-filter-desc">
                        {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                    </p>
                </div>

                <div className="wb-filter-actions">
                    {onOpen23Districts && (
                        <button
                            type="button"
                            onClick={onOpen23Districts}
                            className="wb-action-btn districts"
                            title="Browse all 23 official districts of West Bengal"
                        >
                            <MapPin size={14} />
                            <span>All 23 Districts Directory</span>
                        </button>
                    )}

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && onResetFilters && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="wb-action-btn reset"
                            title="Reset all active filters"
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="wb-categories-grid">
                {WB_CATEGORIES.map(cat => {
                    const count = categoryCounts[cat.id] ?? (cat.id === 'all' ? totalCount : 0);
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onSelectCategory(cat.id)}
                            className={`wb-cat-pill ${isActive ? 'active' : ''}`}
                            title={cat.description}
                            aria-pressed={isActive}
                        >
                            <span className="pill-icon">{cat.icon}</span>
                            <span>{cat.label}</span>
                            <span className="pill-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Integrated Google AdSense In-Filter Leaderboard Banner */}
            {showAdSense && (
                <div className="wb-filter-adsense-wrap">
                    <AdSenseSlot
                        format="horizontal"
                        slot="7004567890"
                        label="Sponsored Travel Network • West Bengal Tourism • Google AdSense"
                    />
                </div>
            )}
        </section>
    );
};

export default WestBengalCategoryFilterBar;
