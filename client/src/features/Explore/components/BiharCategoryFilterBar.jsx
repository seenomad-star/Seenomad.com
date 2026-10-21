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
import { BIHAR_CATEGORIES } from './BiharDistrictIntelligenceSuite';
import './BiharCategoryFilterBar.css';

/**
 * BiharCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for Bihar Tourism
 * Includes quick filters for Temples & Shrines, Ancient Heritage, Hills & Lakes, Wildlife, Waterfalls, Mithila Arts
 * Features integrated Google AdSense advertising banner slot
 */
const BiharCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 28,
    onOpen38Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    const activeCategoryMeta = BIHAR_CATEGORIES.find(c => c.id === activeCategory) || BIHAR_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 28 curated destinations across all 38 districts of Bihar — the Cradle of Ancient Civilizations & Enlightenment.',
        spiritual: 'Mahabodhi Temple (Bodh Gaya UNESCO), Takht Sri Patna Sahib, Mundeshwari Devi (635 CE), Deo Sun Temple, and Thawe Bhawani.',
        historical: 'Nalanda Mahavihara UNESCO Ruins, Vikramshila University, Barabar Mauryan Caves, Sher Shah Suri Tomb, and Kesariya Stupa.',
        nature: 'Rajgir Vulture Peak & Glass Skywalk, Mandar Hill (Samudra Manthan), Kabar Taal Ramsar Oxbow Lake, and Matsyagandha.',
        wildlife: 'Valmiki National Park & Tiger Reserve, Vikramshila Gangetic Dolphin Sanctuary, and Nagi-Nakti Ramsar Bird Sanctuaries.',
        waterfalls: 'Kakolat Falls 160ft cascade plunge, Telhar Kund 80m waterfall canyon, and Rajgir Brahmakund hot sulfur springs.',
        heritage: 'Jitwarpur GI Madhubani Painting Village, Raj Darbhanga Palaces, Sujani Embroidery Guilds, and Munger Fort.'
    };

    return (
        <section className="bihar-filter-section" aria-label="Bihar Destinations and Category Filters">
            {/* Header info */}
            <div className="bihar-filter-header">
                <div className="bihar-filter-title-wrap">
                    <div className="bihar-filter-badge-row">
                        <span className="bihar-state-badge">
                            🏛️ Bihar Tourism
                        </span>
                        <span className="bihar-count-badge">
                            {totalCount} Destinations Across 38 Districts
                        </span>
                        <span className="bihar-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="bihar-filter-title">
                        <span>Explore Bihar by Interest</span>
                    </h2>

                    <p className="bihar-filter-desc">
                        {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                    </p>
                </div>

                <div className="bihar-filter-actions">
                    {onOpen38Districts && (
                        <button
                            type="button"
                            onClick={onOpen38Districts}
                            className="bihar-action-btn districts"
                            title="Browse all 38 official districts of Bihar"
                        >
                            <MapPin size={14} />
                            <span>All 38 Districts Directory</span>
                        </button>
                    )}

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && onResetFilters && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="bihar-action-btn reset"
                            title="Reset all active filters"
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="bihar-categories-grid">
                {BIHAR_CATEGORIES.map(cat => {
                    const count = categoryCounts[cat.id] ?? (cat.id === 'all' ? totalCount : 0);
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onSelectCategory(cat.id)}
                            className={`bihar-cat-pill ${isActive ? 'active' : ''}`}
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
                <div className="bihar-filter-adsense-wrap">
                    <AdSenseSlot
                        format="horizontal"
                        slot="7003456789"
                        label="Sponsored Travel Network • Bihar Tourism • Google AdSense"
                    />
                </div>
            )}
        </section>
    );
};

export default BiharCategoryFilterBar;
