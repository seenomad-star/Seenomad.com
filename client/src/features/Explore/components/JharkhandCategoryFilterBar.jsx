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
import { JH_CATEGORIES } from './JHDistrictIntelligenceSuite';
import './JharkhandCategoryFilterBar.css';

/**
 * JharkhandCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for Jharkhand Tourism
 * Includes quick filters for Waterfalls, Temples & Shrines, Hills & Lakes, Wildlife, Tribal Culture, Heritage & Forts
 * Features integrated Google AdSense advertising banner slot
 */
const JharkhandCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 28,
    onOpen24Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    const activeCategoryMeta = JH_CATEGORIES.find(c => c.id === activeCategory) || JH_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 28 curated destinations across all 24 districts of Jharkhand — the Land of Forests & Roaring Waterfalls.',
        waterfalls: 'Hundru Falls 320ft, Dassam 10-streams, Jonha Gautamdhara, Lodh Falls 468ft plunge, and Panchghagh cascades.',
        spiritual: 'Baba Baidyanath Dham (12 Jyotirlingas), Rajrappa Maa Chhinnamasta, Basukinath, and Bansidhar Solid Gold Krishna.',
        nature: 'Netarhat Queen of Chotanagpur, Patratu Valley & Dam, Tilaiya Dam, Maithon Dam, and Parasnath Peak.',
        wildlife: 'Betla National Park & Palamu Forts, Dalma Elephant Sanctuary, and Asia’s largest Sal forest canopy at Saranda.',
        tribal: 'Saraikela Chhau Dance (UNESCO), Birsa Munda Ulihatu, Sohrai & Khovar GI wall murals, and indigenous haats.',
        historical: 'Palamu 16th-century Chero Forts, Martello Tower Pakur, and Vidyasagar Karmatanr Memorial.'
    };

    return (
        <section className="jharkhand-filter-section" aria-label="Jharkhand Destinations and Category Filters">
            {/* Header info */}
            <div className="jharkhand-filter-header">
                <div className="jharkhand-filter-title-wrap">
                    <div className="jharkhand-filter-badge-row">
                        <span className="jharkhand-state-badge">
                            🌲 Jharkhand Tourism
                        </span>
                        <span className="jharkhand-count-badge">
                            {totalCount} Destinations Across 24 Districts
                        </span>
                        <span className="jharkhand-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="jharkhand-filter-title">
                        <span>Explore Jharkhand by Interest</span>
                    </h2>

                    <p className="jharkhand-filter-desc">
                        {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                    </p>
                </div>

                <div className="jharkhand-filter-actions">
                    {onOpen24Districts && (
                        <button
                            type="button"
                            onClick={onOpen24Districts}
                            className="jharkhand-action-btn districts"
                            title="Browse all 24 official districts of Jharkhand"
                        >
                            <MapPin size={14} />
                            <span>All 24 Districts Directory</span>
                        </button>
                    )}

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && onResetFilters && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="jharkhand-action-btn reset"
                            title="Reset all active filters"
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="jharkhand-categories-grid">
                {JH_CATEGORIES.map(cat => {
                    const count = categoryCounts[cat.id] ?? (cat.id === 'all' ? totalCount : 0);
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onSelectCategory(cat.id)}
                            className={`jharkhand-cat-pill ${isActive ? 'active' : ''}`}
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
                <div className="jharkhand-filter-adsense-wrap">
                    <AdSenseSlot
                        format="horizontal"
                        slot="7002345678"
                        label="Sponsored Travel Network • Google AdSense"
                    />
                </div>
            )}
        </section>
    );
};

export default JharkhandCategoryFilterBar;
