import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, Zap, Coffee, Target, 
    X, Info, Sparkles, Smile
} from 'lucide-react';
import { useNomadOSStore } from '../../store/nomadOSStore';

const VibeCheck = ({ isOpen, onClose }) => {
    const { setVibe, currentVibe } = useNomadOSStore();

    const vibes = [
        { id: 'Adventure Ready', label: 'Adventure Ready', icon: <Zap size={24} color="#F59E0B" />, desc: 'High energy, ready for speed and discovery.' },
        { id: 'Burnt Out', label: 'Burnt Out', icon: <Coffee size={24} color="#3B82F6" />, desc: 'Low energy, prioritizing rest and slow travel.' },
        { id: 'Social', label: 'Social Battery: High', icon: <Heart size={24} color="#EC4899" />, desc: 'Feeling lonely or excited to meet new nomads.' },
        { id: 'Deep Work', label: 'Deep Work Mode', icon: <Target size={24} color="#10B981" />, desc: 'Focused on shipping. No distractions please.' }
    ];

    if (!isOpen) return null;

    return (
        <div className="vibe-check-overlay">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="vibe-check-modal"
            >
                <div className="vibe-header">
                    <div className="vibe-title-group">
                        <Smile size={24} className="vibe-main-icon" />
                        <div>
                            <h2>How's your vibe today?</h2>
                            <p>We'll adapt the platform to match your emotional state.</p>
                        </div>
                    </div>
                </div>

                <div className="vibes-grid">
                    {vibes.map(v => (
                        <motion.button
                            key={v.id}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`vibe-btn ${currentVibe === v.id ? 'active' : ''}`}
                            onClick={() => {
                                setVibe(v.id);
                                setTimeout(onClose, 300);
                            }}
                        >
                            <div className="vibe-icon-wrapper">{v.icon}</div>
                            <div className="vibe-info">
                                <strong>{v.label}</strong>
                                <span>{v.desc}</span>
                            </div>
                            {currentVibe === v.id && (
                                <div className="active-dot"><Sparkles size={10} /></div>
                            )}
                        </motion.button>
                    ))}
                </div>

                <button className="vibe-close" onClick={onClose}><X size={20} /></button>
            </motion.div>
        </div>
    );
};

export default VibeCheck;
