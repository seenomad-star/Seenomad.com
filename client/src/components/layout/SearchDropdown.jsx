import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../../store/navStore';
import { History, TrendingUp, Sparkles, MapPin, User, Calendar } from 'lucide-react';

const SearchDropdown = () => {
    const { isSearchOpen, toggleSearch } = useNavStore();

    if (!isSearchOpen) return null;

    const sections = [
        {
            title: 'RECENT',
            icon: <History size={14} />,
            items: ['Bali Itinerary 2026', 'Top Creators in Lisbon']
        },
        {
            title: 'AI SUGGESTED FOR YOU',
            icon: <Sparkles size={14} />,
            items: [
                { label: 'How to get a Visa for Bali?', type: 'Module' },
                { label: 'Goa Festival Tickets', type: 'Event' }
            ]
        },
        {
            title: 'TRENDING',
            icon: <TrendingUp size={14} />,
            items: ['#DigitalNomadLife', 'Best Laptops for Travel']
        }
    ];

    return (
        <>
            <div className="search-overlay" onClick={() => toggleSearch(false)} />
            <motion.div
                className="search-dropdown-v3"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                {sections.map((section, idx) => (
                    <div key={idx} className="search-section">
                        <div className="section-header">
                            {section.icon}
                            <span>{section.title}</span>
                        </div>
                        <div className="section-items">
                            {section.items.map((item, i) => (
                                <div key={i} className="search-item">
                                    <span className="item-label">
                                        {typeof item === 'string' ? item : item.label}
                                    </span>
                                    {typeof item === 'object' && (
                                        <span className="item-tag">{item.type}</span>
                                    )}
                                    <span className="item-hint">↵</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="search-footer">
                    <span>Type / to see commands</span>
                    <div className="footer-hints">
                        <span>↑↓ to navigate</span>
                        <span>esc to close</span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SearchDropdown;
