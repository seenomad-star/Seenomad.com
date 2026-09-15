import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, HelpCircle, Zap } from 'lucide-react';

const EmbassyDifficultyIndicator = ({ score = 75, processingTime = '12 Days', complexity = 'Medium' }) => {
    const getStatus = () => {
        if (score > 70) return { color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100', icon: <CheckCircle size={16} />, label: 'High Probability' };
        if (score > 40) return { color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100', icon: <HelpCircle size={16} />, label: 'Moderate Risk' };
        return { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: <AlertCircle size={16} />, label: 'Low Probability' };
    };

    const status = getStatus();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-2xl border ${status.bg} ${status.border} shadow-sm`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={status.color}>{status.icon}</span>
                    <span className={`text-sm font-black uppercase tracking-tight ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                    <Zap size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-700">{score}% Success</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 p-2.5 rounded-xl border border-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Processing</p>
                    <p className="text-sm font-bold text-slate-800">{processingTime}</p>
                </div>
                <div className="bg-white/60 p-2.5 rounded-xl border border-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Complexity</p>
                    <p className="text-sm font-bold text-slate-800">{complexity}</p>
                </div>
            </div>

            {score < 40 && (
                <button className="w-full mt-4 py-2.5 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-700 transition-all">
                    Get Embassy Assist
                </button>
            )}
        </motion.div>
    );
};

export default EmbassyDifficultyIndicator;
