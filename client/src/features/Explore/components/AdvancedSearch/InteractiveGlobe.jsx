import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import './InteractiveGlobe.css';

const InteractiveGlobe = () => {
    const { toggleAdvancedFilter, advancedFilters } = useDestinationStore();
    const [hoveredRegion, setHoveredRegion] = useState(null);

    const regions = [
        { id: 'Europe', path: 'M 50 20 Q 60 15 70 25 Q 75 35 65 45 Q 55 50 45 40 Z', color: '#3b82f6' },
        { id: 'Asia', path: 'M 70 25 Q 85 20 95 35 Q 90 55 75 60 Q 65 55 65 45 Z', color: '#10b981' },
        { id: 'Africa', path: 'M 45 40 Q 55 50 60 70 Q 50 85 35 75 Q 30 60 40 45 Z', color: '#f59e0b' },
        { id: 'North America', path: 'M 10 20 Q 25 15 35 25 Q 30 40 20 45 Q 5 40 5 25 Z', color: '#ef4444' },
        { id: 'South America', path: 'M 20 45 Q 30 55 35 75 Q 25 85 15 75 Q 10 60 15 50 Z', color: '#8b5cf6' },
        { id: 'Oceania', path: 'M 80 65 Q 90 65 95 75 Q 85 85 75 80 Q 75 70 80 65 Z', color: '#ec4899' }
    ];

    return (
        <div className="globe-container">
            <div className="globe-wrapper">
                <motion.svg
                    viewBox="0 0 100 100"
                    className="globe-svg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                    {/* Ocean Background */}
                    <circle cx="50" cy="50" r="48" fill="#eff6ff" stroke="#dbeafe" strokeWidth="0.5" />

                    {/* Grid Lines */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="0.2" strokeDasharray="1,1" />
                    <line x1="2" y1="50" x2="98" y2="50" stroke="#e2e8f0" strokeWidth="0.2" />
                    <line x1="50" y1="2" x2="50" y2="98" stroke="#e2e8f0" strokeWidth="0.2" />

                    {/* Continents */}
                    {regions.map((region) => (
                        <motion.path
                            key={region.id}
                            d={region.path}
                            fill={advancedFilters.regions.includes(region.id) ? region.color : '#cbd5e1'}
                            stroke="white"
                            strokeWidth="0.5"
                            whileHover={{
                                fill: region.color,
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            onHoverStart={() => setHoveredRegion(region.id)}
                            onHoverEnd={() => setHoveredRegion(null)}
                            onClick={() => toggleAdvancedFilter('regions', region.id)}
                            className="continent-path"
                        />
                    ))}
                </motion.svg>

                {/* Hover Tooltip */}
                <AnimatePresence>
                    {hoveredRegion && (
                        <motion.div
                            className="globe-tooltip"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            {hoveredRegion}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Selection Indicator */}
                <div className="selection-status">
                    {advancedFilters.regions.length > 0 ? (
                        <div className="selected-regions">
                            {advancedFilters.regions.map(r => (
                                <span key={r} className="region-tag">
                                    {r}
                                    <button onClick={() => toggleAdvancedFilter('regions', r)}>×</button>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="selection-hint">Click a continent to explore</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractiveGlobe;
