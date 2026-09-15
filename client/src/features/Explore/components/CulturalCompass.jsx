import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Info, Palmtree, Landmark, 
    Music, ShoppingBag, UtensilsCrossed,
    Search, Sparkles, Globe
} from 'lucide-react';

const CulturalCompass = () => {
    const [query, setQuery] = useState('');
    const [insights, setInsights] = useState(null);

    const categories = [
        { id: 'handicraft', label: 'Handicrafts', icon: <ShoppingBag size={18} />, color: '#F59E0B' },
        { id: 'festival', label: 'Festivals', icon: <Music size={18} />, color: '#EC4899' },
        { id: 'arts', label: 'Local Arts', icon: <Landmark size={18} />, color: '#A855F7' },
        { id: 'food', label: 'Cuisine History', icon: <UtensilsCrossed size={18} />, color: '#10B981' }
    ];

    const getInsights = (cat) => {
        setInsights({
            category: cat.label,
            color: cat.color,
            title: `The Story of ${cat.label} in Southeast Asia`,
            desc: "Decoding the cultural tapestry through centuries of tradition. Our AI geo-intelligence tracks thousands of local workshops and seasonal festivals.",
            highlights: [
                "Batik Philosophy & Technique",
                "Wayang Kulit Shadow Puppetry",
                "Ubud Artisan Markets",
                "Spiritual Temple Festivals"
            ]
        });
    };

    return (
        <div className="cultural-compass-container">
            <div className="compass-header">
                <div className="c-brand">
                    <Globe size={24} className="globe-icon" />
                    <h2>Cultural Compass</h2>
                </div>
                <p>Decoding the cultural tapestry of each city.</p>
            </div>

            <div className="category-wheel">
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className="cat-pill"
                        style={{ '--hover-color': cat.color }}
                        onClick={() => getInsights(cat)}
                    >
                        {cat.icon}
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {insights ? (
                    <motion.div 
                        key="insights"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="insights-display"
                    >
                        <div className="insight-hero" style={{ background: insights.color }}>
                            <h3>{insights.title}</h3>
                        </div>
                        <div className="insight-body">
                            <p>{insights.desc}</p>
                            <div className="highlight-grid">
                                {insights.highlights.map((h, i) => (
                                    <div key={i} className="h-card">
                                        <Sparkles size={14} />
                                        <span>{h}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="book-cultural-tour">
                                Learn More from a Local Guardian
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="compass-placeholder">
                        <Compass size={40} />
                        <p>Select a cultural category to decode the city's soul.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Compass = ({size}) => <Globe size={size} />; // Helper

export default CulturalCompass;
