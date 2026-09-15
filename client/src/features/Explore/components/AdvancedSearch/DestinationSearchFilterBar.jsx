import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Settings, Sparkles } from 'lucide-react';
import SearchInput from './SearchInput';
import QuickFilterChips from './QuickFilterChips';
import AdvancedFilterDrawer from './AdvancedFilterDrawer';
import './DestinationSearchFilterBar.css';

const DestinationSearchFilterBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`command-dock-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <motion.div
                layout
                initial={false}
                animate={{
                    width: isExpanded ? '100%' : 'auto',
                    maxWidth: isExpanded ? '1200px' : '300px',
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="command-dock-container"
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                <div className="dock-content">
                    {/* Collapsed View: Minimalist System Utility */}
                    {!isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="dock-collapsed-view"
                        >
                            <div className="dock-search-trigger">
                                <Sparkles size={16} className="ai-pulse-icon" />
                                <span>Search Destinations...</span>
                            </div>
                            <div className="dock-mini-filters">
                                <Filter size={14} />
                            </div>
                        </motion.div>
                    )}

                    {/* Expanded View: Full Command Center */}
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dock-expanded-view"
                        >
                            <div className="dock-header">
                                <div className="dock-search-section">
                                    <SearchInput />
                                </div>
                                <div className="dock-actions">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsDrawerOpen(true);
                                        }}
                                        className="dock-advanced-btn"
                                    >
                                        <Filter size={16} />
                                        <span>Advanced</span>
                                    </motion.button>
                                    <button
                                        className="dock-close-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsExpanded(false);
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>

                            <div className="dock-filters-section">
                                <div className="dock-filters-header">
                                    <span className="dock-section-label">Quick Filters</span>
                                    <button className="dock-clear-btn">Clear All</button>
                                </div>
                                <QuickFilterChips />
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <AdvancedFilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default DestinationSearchFilterBar;
