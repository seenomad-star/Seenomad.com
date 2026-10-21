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
import { ASSAM_CATEGORIES } from './AssamDistrictIntelligenceSuite';
import './AssamCategoryFilterBar.css';

/**
 * AssamCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for Assam Tourism
 * Features Rhino Wildlife, Ahom Heritage, Kamakhya Shrines, Tea Capital, Haflong Hills, and Silk Weaving
 * Includes Google AdSense advertising banner slot
 */
const AssamCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 30,
    onOpen35Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    const activeCategoryMeta = ASSAM_CATEGORIES.find(c => c.id === activeCategory) || ASSAM_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 30 curated destinations across Assam — From Kaziranga Rhino floodplains to the mist-wrapped Barail hills.',
        wildlife: 'Kaziranga UNESCO Rhino Reserve, Manas World Heritage Biosphere, Pobitora densest rhino haven, Dibru-Saikhowa feral horses, and Dehing Patkai Amazon of the East.',
        heritage: 'Sivasagar Rang Ghar royal amphitheater, Talatal subterranean palace, Charaideo UNESCO Maidams (Pyramids of Assam), and Khaspur Kachari ruins.',
        spiritual: 'Sacred Kamakhya Shakti Peeth Nilachal Hill, Umananda Peacock Island Shiva shrine, and Hajo Panchatirtha interfaith sanctuary.',
        tea: 'Jorhat Tea Capital, Tocklai Research Station, historic 150-year-old Chang planter bungalows, and Digboi Centenary Oil town.',
        hills: 'Haflong hill station ("Switzerland of the East"), Barail Mountain peaks, Jatinga Valley of Clouds, and Garampani geothermal hot springs.',
        culture: 'Majuli world’s largest river island, Sualkuchi Golden Muga Silk weaving, and Barpeta Neo-Vaishnavite Satra Kirtan Ghar.'
    };

    return (
        <section className="assam-filter-section" aria-label="Assam Destinations and Category Filters">
            {/* Header info */}
            <div className="assam-filter-header">
                <div className="assam-filter-title-wrap">
                    <div className="assam-filter-badge-row">
                        <span className="assam-state-badge">
                            🦏 Assam Tourism
                        </span>
                        <span className="assam-count-badge">
                            {totalCount} Destinations Across 35 Districts
                        </span>
                        <span className="assam-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="assam-filter-title">
                        <span>Gateway to the Northeast: Explore Assam</span>
                    </h2>

                    <p className="assam-filter-desc">
                        Discover UNESCO World Heritage rhino sanctuaries, the sacred Brahmaputra River, ancient Ahom monuments, world-famous Muga silk, and sprawling emerald tea estates.
                    </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="assam-filter-actions">
                    <button
                        type="button"
                        onClick={onOpen35Districts}
                        className="assam-action-btn districts-trigger"
                        title="Browse all 35 districts of Assam"
                    >
                        <MapPin size={14} />
                        <span>35 Districts Directory</span>
                        {selectedDistrict !== 'all' && (
                            <span style={{ background: '#10b981', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                                {selectedDistrict}
                            </span>
                        )}
                    </button>

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="assam-action-btn reset-trigger"
                            title="Reset all Assam filters"
                        >
                            <RotateCcw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Pills Bar */}
            <div className="assam-pills-bar" role="tablist" aria-label="Assam Themes">
                {ASSAM_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    const count = cat.id === 'all' ? totalCount : (categoryCounts[cat.id] || 0);

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`assam-category-pill ${isActive ? 'active' : ''}`}
                        >
                            <span className="assam-pill-icon">{cat.icon}</span>
                            <span className="assam-pill-label">{cat.label}</span>
                            <span className="assam-pill-badge">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Category Meta Card */}
            <div className="assam-active-meta-card">
                <div className="assam-active-meta-left">
                    <span className="assam-active-meta-icon">{activeCategoryMeta.icon}</span>
                    <div>
                        <h4 className="assam-active-meta-title">
                            {activeCategoryMeta.label}
                        </h4>
                        <p className="assam-active-meta-desc">
                            {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Showing {activeCategory === 'all' ? totalCount : (categoryCounts[activeCategory] || 0)} of {totalCount} destinations
                    </span>
                </div>
            </div>

            {/* In-Feed Google AdSense Slot */}
            {showAdSense && (
                <div className="assam-adsense-slot-wrap">
                    <AdSenseSlot
                        format="horizontal"
                        slot="7005432109"
                        label="Sponsored Travel • Google AdSense"
                    />
                </div>
            )}
        </section>
    );
};

export default AssamCategoryFilterBar;
