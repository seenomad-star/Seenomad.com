import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, History, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import { trackEvent, ANALYTICS_EVENTS } from '../../../../lib/analytics';
import { checkUnlocks } from '../../../../lib/unlockEngine';

import './SearchInput.css';

const SearchInput = () => {
    const { searchQuery, setSearchQuery, searchHistory, addSearchHistory, incrementProgress } = useDestinationStore();
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);

    const handleSearch = (query) => {
        if (!query.trim()) return;
        setSearchQuery(query);
        addSearchHistory(query);
        incrementProgress(5);
        trackEvent(ANALYTICS_EVENTS.SEARCH_PERFORMED, { query });
        checkUnlocks();
        setIsFocused(false);
    };

    return (
        <div className="search-input-wrapper">
            <motion.div
                animate={{
                    scale: isFocused ? 1.01 : 1,
                }}
                className={`search-input-container ${isFocused ? 'focused' : ''}`}
            >
                <Search size={20} className="search-icon" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    className="main-search-input"
                />
                <div className="search-input-actions">
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="input-action-btn">
                            <X size={16} />
                        </button>
                    )}
                    <button className="input-action-btn mic-btn">
                        <Mic size={18} />
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="search-suggestions-dropdown"
                    >
                        {searchHistory.length > 0 && (
                            <div className="suggestions-section">
                                <div className="section-title">
                                    <History size={12} />
                                    Recent Searches
                                </div>
                                <div className="history-chips">
                                    {searchHistory.map((query, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSearch(query)}
                                            className="history-chip"
                                        >
                                            {query}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="suggestions-section">
                            <div className="section-title ai-title">
                                <Sparkles size={12} />
                                AI Recommendations
                            </div>
                            <div className="ai-recommendations-list">
                                {['Bora Bora for Honeymoon', 'Digital Nomad hubs in Asia', 'Budget Europe trips'].map((rec, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSearch(rec)}
                                        className="ai-recommendation-item"
                                    >
                                        <span>{rec}</span>
                                        <span className="quick-search-hint">Quick Search →</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchInput;
