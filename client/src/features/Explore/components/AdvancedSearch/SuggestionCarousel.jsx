import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles, CheckCircle, Star } from 'lucide-react';
import { useDestinationStore } from '../../../../store/destinationFilterStore';

import './SuggestionCarousel.css';

const SUGGESTIONS = [
    { id: 1, type: 'TRENDING', label: 'Bali, Indonesia', icon: <TrendingUp size={14} />, color: 'text-orange-500' },
    { id: 2, type: 'AI_PICK', label: 'Kyoto, Japan', icon: <Sparkles size={14} />, color: 'text-purple-500' },
    { id: 3, type: 'VISA_SUCCESS', label: 'Portugal', icon: <CheckCircle size={14} />, color: 'text-green-500' },
    { id: 4, type: 'SPONSORED', label: 'Dubai, UAE', icon: <Star size={14} />, color: 'text-blue-500', isSponsored: true },
    { id: 5, type: 'TRENDING', label: 'Santorini, Greece', icon: <TrendingUp size={14} />, color: 'text-orange-500' },
];

const SuggestionCarousel = () => {
    const { setSearchQuery, incrementProgress } = useDestinationStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SUGGESTIONS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSelect = (label) => {
        setSearchQuery(label);
        incrementProgress(2);
    };

    return (
        <div className="mt-6 overflow-hidden">
            <div className="flex items-center gap-4 animate-scroll whitespace-nowrap">
                {SUGGESTIONS.map((item, i) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(item.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all ${item.isSponsored ? 'border-blue-200 bg-blue-50/50' : ''}`}
                    >
                        <span className={item.color}>{item.icon}</span>
                        <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                        {item.isSponsored && (
                            <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">Ad</span>
                        )}
                    </motion.button>
                ))}
                {/* Duplicate for seamless scroll */}
                {SUGGESTIONS.map((item, i) => (
                    <motion.button
                        key={`dup-${item.id}`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(item.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all ${item.isSponsored ? 'border-blue-200 bg-blue-50/50' : ''}`}
                    >
                        <span className={item.color}>{item.icon}</span>
                        <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                        {item.isSponsored && (
                            <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">Ad</span>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SuggestionCarousel;
