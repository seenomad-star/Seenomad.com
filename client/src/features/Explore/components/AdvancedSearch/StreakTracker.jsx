import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, AlertTriangle } from 'lucide-react';
import { useDestinationStore } from '../../../../store/destinationFilterStore';

const StreakTracker = () => {
    const { streak, updateStreak } = useDestinationStore();

    useEffect(() => {
        updateStreak();
    }, []);

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm"
        >
            <div className="relative">
                <div className={`p-2.5 rounded-xl ${streak > 0 ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-300'}`}>
                    <Flame size={20} className={streak > 0 ? 'fill-orange-500 animate-pulse' : ''} />
                </div>
                {streak > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white"
                    >
                        {streak}
                    </motion.div>
                )}
            </div>

            <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tighter">Daily Streak</h4>
                <div className="flex items-center gap-1">
                    <Calendar size={10} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500">
                        {streak === 0 ? 'Start your journey today!' : `${streak} Day Streak! Keep it up.`}
                    </span>
                </div>
            </div>

            {streak > 5 && (
                <div className="ml-auto p-1.5 bg-amber-50 text-amber-600 rounded-lg" title="Streak Warning">
                    <AlertTriangle size={14} />
                </div>
            )}
        </motion.div>
    );
};

export default StreakTracker;
