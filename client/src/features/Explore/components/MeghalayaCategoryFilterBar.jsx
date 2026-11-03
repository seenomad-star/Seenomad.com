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
    Mountain,
    Trees,
    CloudRain
} from 'lucide-react';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import { MEGHALAYA_CATEGORIES } from './MeghalayaDistrictIntelligenceSuite';
import './MeghalayaCategoryFilterBar.css';

/**
 * MeghalayaCategoryFilterBar
 * Dedicated interactive interest & category navigation bar for Meghalaya Tourism
 * Features Living Root Bridges, Waterfalls & Plunge Pools, Sacred Caves, Crystal Rivers, and Garo Biospheres
 * Includes Google AdSense advertising banner slot
 */
const MeghalayaCategoryFilterBar = ({
    activeCategory = 'all',
    onSelectCategory,
    categoryCounts = {},
    totalCount = 32,
    onOpen12Districts,
    selectedDistrict = 'all',
    onResetFilters,
    showAdSense = true
}) => {
    const activeCategoryMeta = MEGHALAYA_CATEGORIES.find(c => c.id === activeCategory) || MEGHALAYA_CATEGORIES[0];

    const categorySubtitles = {
        all: 'Exploring all 32 curated destinations across Meghalaya — From Cherrapunji Living Root Bridges to the glass waters of Dawki and deep Garo canyons.',
        bridges: 'Double Decker Living Root Bridge of Nongriat, Mawlynnong Asia’s Cleanest Village, Riwai Single Root Bridge, and Mawlyngbna nature reserve.',
        waterfalls: 'Nohkalakai tallest plunge waterfall, Krang Suri turquoise lagoon, Wei Sawdong 3-tier stairs, Phe Phe hidden canyon, and Rainbow Falls.',
        caves: 'Mawsmai prehistoric limestone caves, Arwah marine fossil galleries, Siju giant bat cavern, and Krem Liat Prah longest cave in South Asia.',
        lakes: 'Dawki & Umngot floating glass river, Umiam Lake (Barapani) water sports, Thadlaskein Lake pine groves, and Ranikor Mahseer angling river.',
        hills: 'Laitlum deep cloud canyons, Shillong Peak 360° summit, Mawsynram wettest place on Earth, Wahkhen bamboo skywalk, and Tura Peak.',
        wildlife: 'Balpakram National Park canyon of spirits, Nokrek Biosphere mother of wild citrus, Simsang river elephant corridors, and Rongbang Dare.',
        culture: 'Kongthong Whistling Village (Jingrwai Iawbei), Mawphlang 800-year sacred forest, Nartiang world’s largest monoliths, and Jakrem hot springs.'
    };

    return (
        <section className="meghalaya-filter-section" aria-label="Meghalaya Destinations and Category Filters">
            {/* Header info */}
            <div className="meghalaya-filter-header">
                <div className="meghalaya-filter-title-wrap">
                    <div className="meghalaya-filter-badge-row">
                        <span className="meghalaya-state-badge">
                            ☁️ Meghalaya Tourism
                        </span>
                        <span className="meghalaya-count-badge">
                            {totalCount} Destinations Across 12 Districts
                        </span>
                        <span className="meghalaya-adsense-badge" title="AdSense Ready Platform">
                            <ShieldCheck size={11} /> AdSense Monetized
                        </span>
                    </div>

                    <h2 className="meghalaya-filter-title">
                        <span>The Abode of Clouds: Explore Meghalaya</span>
                    </h2>

                    <p className="meghalaya-filter-desc">
                        Discover centuries-old bio-engineered living root bridges, the glass-clear waters of Dawki, thundering plunge waterfalls, sacred whistling villages, and vast prehistoric cave networks.
                    </p>
                </div>

                <div className="meghalaya-filter-action-group">
                    <button
                        type="button"
                        onClick={onOpen12Districts}
                        className="meghalaya-districts-btn"
                        title="Browse all 12 districts of Meghalaya"
                    >
                        <MapPin size={15} />
                        <span>All 12 Districts</span>
                        {selectedDistrict !== 'all' && (
                            <span className="meghalaya-active-dist-tag">
                                : {selectedDistrict}
                            </span>
                        )}
                    </button>

                    {(activeCategory !== 'all' || selectedDistrict !== 'all') && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="meghalaya-reset-filter-btn"
                            title="Reset all Meghalaya category and district filters"
                        >
                            <RotateCcw size={14} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Interactive Category Chips */}
            <div className="meghalaya-categories-strip-wrapper">
                <div className="meghalaya-categories-strip" role="tablist">
                    {MEGHALAYA_CATEGORIES.map(cat => {
                        const count = categoryCounts[cat.id] ?? 0;
                        const isActive = activeCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => onSelectCategory(cat.id)}
                                className={`meghalaya-cat-chip ${isActive ? 'active' : ''}`}
                                title={cat.description}
                            >
                                <span className="meghalaya-cat-chip-icon">{cat.icon}</span>
                                <span className="meghalaya-cat-chip-label">{cat.label}</span>
                                <span className="meghalaya-cat-chip-badge">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Category Description Ribbon */}
            <div className="meghalaya-active-category-ribbon">
                <div className="meghalaya-ribbon-text">
                    <span className="meghalaya-ribbon-icon">{activeCategoryMeta.icon}</span>
                    <span className="meghalaya-ribbon-lead">
                        <strong>{activeCategoryMeta.label}:</strong> {categorySubtitles[activeCategory] || activeCategoryMeta.description}
                    </span>
                </div>
            </div>

            {/* Integrated Google AdSense Monetization Slot */}
            {showAdSense && (
                <div className="meghalaya-adsense-container">
                    <div className="meghalaya-adsense-header">
                        <span className="meghalaya-adsense-label">SPONSORED ADVISORY & TRAVEL PARTNERS</span>
                        <span className="meghalaya-adsense-badge-pill">Google AdSense</span>
                    </div>
                    <AdSenseSlot
                        slot="1208333202"
                        format="auto"
                        responsive="true"
                        style={{ minHeight: '90px' }}
                    />
                </div>
            )}
        </section>
    );
};

export default MeghalayaCategoryFilterBar;
