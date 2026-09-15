import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronRight, Globe, Shield, DollarSign, Clock, Thermometer, Lock, Sparkles, LayoutGrid } from 'lucide-react';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import { REGIONS, PURPOSES, BUDGET_RANGES } from '../../../../config/filters.config';
import { REWARD_TYPES } from '../../../../config/rewards.config';

import './AdvancedFilterDrawer.css';

const AI_FILTERS = [
    { id: 'ai-recommended', label: 'AI Recommended', icon: '🧠', color: '#8b5cf6' },
    { id: 'visa-free', label: 'Visa-Free / Easy Visa', icon: '🛂', color: '#10b981' },
    { id: 'low-rejection', label: 'Low Rejection Risk', icon: '⚠️', color: '#f59e0b' },
    { id: 'cheapest', label: 'Cheapest Right Now', icon: '💰', color: '#ef4444' },
    { id: 'trending', label: 'Trending for You', icon: '🔥', color: '#ec4899' }
];

const CATEGORIES = ['Beach', 'Mountain', 'City', 'Forest', 'Desert', 'Island', 'Snow', 'Cultural', 'Adventure', 'Luxury', 'Budget'];

const AdvancedFilterDrawer = ({ isOpen, onClose }) => {
    const {
        unlockedFeatures,
        incrementProgress,
        advancedFilters,
        toggleAdvancedFilter,
        selectedFilters,
        toggleFilter,
        resetFilters
    } = useDestinationStore();

    const isVisaScoreUnlocked = unlockedFeatures.includes(REWARD_TYPES.VISA_SUCCESS_SCORE);

    const totalActiveFilters = Object.values(advancedFilters).reduce(
        (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0
    ) + selectedFilters.length;

    const renderFilterGroup = (title, icon, category, options, isStoreFilter = false) => (
        <section className="filter-section">
            <div className="filter-section-header">
                {React.cloneElement(icon, { size: 18 })}
                <h3>{title}</h3>
            </div>
            <div className="options-grid">
                {options.map(option => {
                    const optionId = typeof option === 'string' ? option : option.id;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    const isActive = isStoreFilter
                        ? selectedFilters.includes(optionId)
                        : advancedFilters[category]?.includes(optionId);

                    return (
                        <button
                            key={optionId}
                            onClick={() => isStoreFilter ? toggleFilter(optionId) : toggleAdvancedFilter(category, optionId)}
                            className={`filter-option-btn ${isActive ? 'active' : ''}`}
                        >
                            {typeof option !== 'string' && option.icon && <span className="option-icon">{option.icon}</span>}
                            <span>{optionLabel}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="drawer-overlay"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="drawer-container"
                    >
                        <div className="drawer-header">
                            <div className="drawer-title-group">
                                <div className="drawer-icon-box">
                                    <Filter size={20} />
                                </div>
                                <div className="drawer-title-text">
                                    <h2>Advanced Filters</h2>
                                    <p className="drawer-subtitle">Refine your discovery</p>
                                </div>
                            </div>
                            <div className="drawer-header-actions">
                                {totalActiveFilters > 0 && (
                                    <button
                                        onClick={resetFilters}
                                        className="reset-btn"
                                    >
                                        Reset
                                    </button>
                                )}
                                <button onClick={onClose} className="close-drawer-btn">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="drawer-body">
                            {/* AI Insights Section */}
                            {renderFilterGroup("AI Insights", <Sparkles />, null, AI_FILTERS, true)}

                            {/* Categories Selection */}
                            {renderFilterGroup("Categories", <LayoutGrid />, "categories", CATEGORIES)}

                            {/* Region Selection */}
                            {renderFilterGroup("Region / Continent", <Globe />, "regions", REGIONS)}

                            {/* Visa Success Score (Locked Feature) */}
                            <section className="filter-section">
                                <div className="filter-section-header">
                                    <Shield size={18} />
                                    <h3>Visa Success Score</h3>
                                    {!isVisaScoreUnlocked && (
                                        <span className="lock-badge">
                                            <Lock size={10} /> Locked
                                        </span>
                                    )}
                                </div>
                                <div className={`visa-score-card ${!isVisaScoreUnlocked ? 'locked' : ''}`}>
                                    {isVisaScoreUnlocked ? (
                                        <div className="visa-score-content">
                                            <p>Analyze approval probabilities based on your profile.</p>
                                            <button className="calculate-btn">Calculate My Score</button>
                                        </div>
                                    ) : (
                                        <div className="visa-score-content">
                                            <p>Use 5 filters to unlock this insight</p>
                                            <div className="unlock-progress-container">
                                                <span className="unlock-label">Discovery Progress</span>
                                                <div className="progress-bar-bg">
                                                    <motion.div
                                                        className="progress-bar-fill"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '40%' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Budget Range */}
                            {renderFilterGroup("Budget Range", <DollarSign />, "budgetRanges", BUDGET_RANGES)}

                            {/* Other Filters */}
                            <div className="options-grid">
                                <div
                                    onClick={() => toggleAdvancedFilter('durations', 'Short')}
                                    className={`filter-option-btn ${advancedFilters.durations?.includes('Short') ? 'active' : ''}`}
                                >
                                    <Clock size={16} />
                                    <div className="btn-text-group">
                                        <span className="btn-main-text">Short Trip</span>
                                        <span className="btn-sub-text">1-7 Days</span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => toggleAdvancedFilter('climates', 'Tropical')}
                                    className={`filter-option-btn ${advancedFilters.climates?.includes('Tropical') ? 'active' : ''}`}
                                >
                                    <Thermometer size={16} />
                                    <div className="btn-text-group">
                                        <span className="btn-main-text">Tropical</span>
                                        <span className="btn-sub-text">Warm & Sunny</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="drawer-footer">
                            <button
                                type="button"
                                onClick={() => { incrementProgress(10); onClose(); }}
                                className="apply-filters-btn"
                            >
                                {totalActiveFilters > 0 ? `Apply ${totalActiveFilters} Filters` : 'Apply Filters'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AdvancedFilterDrawer;
