import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Star, Shield } from 'lucide-react';
import { useDestinationStore } from '../../../../store/destinationFilterStore';

const RewardProgressBar = () => {
    const { progress } = useDestinationStore();

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 px-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-amber-500" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Discovery Progress</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-blue-600">{progress}%</span>
                    <Star size={12} className="text-blue-500 fill-blue-500" />
                </div>
            </div>

            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                </motion.div>
            </div>

            <div className="flex justify-between mt-3 px-1">
                {[
                    { label: 'Hidden Deals', threshold: 30, icon: <Gift size={10} /> },
                    { label: 'Visa Score', threshold: 60, icon: <Shield size={10} /> },
                    { label: 'Instant Appr.', threshold: 100, icon: <Star size={10} /> }
                ].map((milestone, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1 ${progress >= milestone.threshold ? 'text-blue-600' : 'text-slate-300'}`}>
                        <div className={`p-1.5 rounded-full border-2 transition-all ${progress >= milestone.threshold ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                            {milestone.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">{milestone.label}</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
        </div>
    );
};

export default RewardProgressBar;
