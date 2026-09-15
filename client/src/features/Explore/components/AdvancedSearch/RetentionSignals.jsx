import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, CheckCircle } from 'lucide-react';

const RetentionSignals = () => {
    const [signals, setSignals] = useState([
        { id: 1, text: '2.4k people searching for Japan', icon: <Users size={12} />, color: 'bg-blue-500' },
        { id: 2, text: 'New visa approval for Portugal', icon: <CheckCircle size={12} />, color: 'bg-green-500' },
        { id: 3, text: '120 people viewing Bali deals', icon: <Eye size={12} />, color: 'bg-orange-500' },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % signals.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [signals.length]);

    return (
        <div className="h-8 overflow-hidden relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className={`p-1 rounded-full text-white ${signals[currentIndex].color}`}>
                        {signals[currentIndex].icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 tracking-tight">
                        {signals[currentIndex].text}
                    </span>
                    <div className="flex -space-x-1.5 ml-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white bg-slate-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${i + currentIndex}`} alt="user" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RetentionSignals;
