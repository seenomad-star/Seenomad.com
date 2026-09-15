import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import { FILTER_TYPES } from '../../../../config/filters.config';
import { trackEvent, ANALYTICS_EVENTS } from '../../../../lib/analytics';
import { checkUnlocks } from '../../../../lib/unlockEngine';
import './QuickFilterChips.css';

const QuickFilterChips = () => {
    const { selectedFilters, toggleFilter, incrementProgress } = useDestinationStore();

    const handleToggle = (filterId) => {
        toggleFilter(filterId);
        incrementProgress(3);
        trackEvent(ANALYTICS_EVENTS.FILTER_USED, { filterId });
        checkUnlocks();
    };

    return (
        <div className="quick-filters-container">
            <div className="quick-filters-scroll">
                {FILTER_TYPES.map((filter) => {
                    const Icon = Icons[filter.icon] || Icons.Info;
                    const isActive = selectedFilters.includes(filter.id);

                    return (
                        <motion.button
                            key={filter.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggle(filter.id)}
                            className={`qf-chip ${isActive ? 'active' : ''}`}
                        >
                            <div className="qf-chip-icon">
                                <Icon size={16} />
                            </div>
                            <div className="qf-chip-content">
                                <span className="qf-chip-label">{filter.label}</span>
                                <div className="qf-chip-meta">
                                    <span className="qf-popularity">{filter.popularity}%</span>
                                    <div className="qf-rewards">
                                        {[...Array(filter.rewardLevel)].map((_, i) => (
                                            <div key={i} className="reward-dot" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickFilterChips;
