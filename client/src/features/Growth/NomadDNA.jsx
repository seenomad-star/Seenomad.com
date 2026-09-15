import React from 'react';
import { motion } from 'framer-motion';
import { 
    Dna, Zap, Target, 
    BarChart3, Award, 
    Info, Star
} from 'lucide-react';
import { useUserProfileStore } from '../../store/userProfileStore';

const NomadDNA = () => {
    const { dna, level, xp, streak } = useUserProfileStore();
    
    const traits = [
        { id: 'adventure', label: 'Adventure', icon: <Zap size={16} />, value: dna.adventure, color: '#F59E0B' },
        { id: 'culture', label: 'Culture', icon: <Target size={16} />, value: dna.culture, color: '#10B981' },
        { id: 'budget', label: 'Budget', icon: <Award size={16} />, value: dna.budget, color: '#3B82F6' },
        { id: 'social', label: 'Social', icon: <Star size={16} />, value: dna.social, color: '#EC4899' }
    ];

    return (
        <div className="nomad-dna-container">
            <div className="dna-header">
                <div className="h-left">
                    <Dna size={24} className="dna-icon" />
                    <h2>Nomad DNA</h2>
                </div>
                <div className="h-right">
                    <div className="level-badge">LVL {level}</div>
                </div>
            </div>

            <div className="dna-stats-grid">
                <div className="stat-card streak">
                    <strong>{streak}</strong>
                    <span>Day Streak</span>
                </div>
                <div className="stat-card xp-progress">
                    <div className="xp-top">
                        <span>XP Progress</span>
                        <span>{xp}/{(level * 100)}</span>
                    </div>
                    <div className="xp-bar">
                        <motion.div 
                            className="xp-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / (level * 100)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="traits-stack">
                {traits.map(trait => (
                    <div key={trait.id} className="trait-row">
                        <div className="t-label">
                            {trait.icon}
                            <span>{trait.label}</span>
                        </div>
                        <div className="t-viz">
                            <div className="t-bar-bg">
                                <motion.div 
                                    className="t-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trait.value}%` }}
                                    style={{ background: trait.color }}
                                />
                            </div>
                            <span className="t-value">{trait.value}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="profiling-disclaimer">
                <Info size={14} />
                <p>Your profile is evolving based on every interaction point across the platform. Your next reward unlocks at 50% Adventure.</p>
            </div>
        </div>
    );
};

export default NomadDNA;
