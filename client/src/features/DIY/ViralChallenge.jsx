import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, Zap, MapPin, 
    RefreshCcw, Star, Share2, 
    ArrowRight, Trophy
} from 'lucide-react';
import { useNomadOSStore } from '../../store/nomadOSStore';

const ViralChallenge = () => {
    const { addXP, addCredits } = useNomadOSStore();
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);

    const destinations = [
        { name: 'Siwa Oasis', country: 'Egypt', vibe: 'Desert Oasis', xp: 250 },
        { name: 'Mestia', country: 'Georgia', vibe: 'Mountain Soul', xp: 300 },
        { name: 'Lombok', country: 'Indonesia', vibe: 'Surfers Paradise', xp: 200 },
        { name: 'Sark', country: 'Channel Islands', vibe: 'Off-Grid Silence', xp: 450 },
        { name: 'Chefchaouen', country: 'Morocco', vibe: 'The Blue Pearl', xp: 150 }
    ];

    const spinGlobe = () => {
        setIsSpinning(true);
        setResult(null);
        
        // Random spin duration
        setTimeout(() => {
            const winner = destinations[Math.floor(Math.random() * destinations.length)];
            setResult(winner);
            setIsSpinning(false);
            addXP(50); // Small bonus for trying
            if (Math.random() > 0.8) addCredits(10, 'Globe Reward');
        }, 3000);
    };

    return (
        <div className="viral-challenge-container">
            <div className="challenge-header">
                <Trophy className="challenge-icon" size={32} />
                <div className="challenge-text">
                    <h2>Viral Travel Challenge</h2>
                    <p>Spin the 3D globe to discover your next unplanned adventure.</p>
                </div>
            </div>

            <div className="globe-stage">
                <motion.div 
                    className={`globe-visual ${isSpinning ? 'spinning' : ''}`}
                    animate={isSpinning ? { rotateY: 1080 } : { rotateY: 0 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                >
                    <div className="globe-mesh">
                        <Globe size={180} strokeWidth={1} className="globe-outline" />
                        <div className="globe-glow"></div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {result && !isSpinning && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="spin-result-card"
                        >
                            <div className="result-badge">NEW SPOT UNLOCKED</div>
                            <h3>{result.name}</h3>
                            <div className="result-meta">
                                <MapPin size={14} />
                                <span>{result.country}</span>
                                <span className="vibe-dot"></span>
                                <span>{result.vibe}</span>
                            </div>
                            <div className="result-reward">
                                <Zap size={14} fill="#F59E0B" />
                                <span>+{result.xp} XP Multiplier</span>
                            </div>
                            <div className="result-actions">
                                <button className="result-btn primary">
                                    <span>Plan This Trip</span>
                                    <ArrowRight size={16} />
                                </button>
                                <button className="result-btn icon"><Share2 size={16} /></button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="challenge-footer">
                <button 
                    className={`spin-trigger-btn ${isSpinning ? 'disabled' : ''}`}
                    onClick={spinGlobe}
                    disabled={isSpinning}
                >
                    {isSpinning ? (
                        <>
                            <RefreshCcw size={20} className="spin-anim" />
                            <span>Scouting the World...</span>
                        </>
                    ) : (
                        <>
                            <Zap size={20} fill="currentColor" />
                            <span>SPIN THE GLOBE</span>
                        </>
                    )}
                </button>
                <div className="challenge-hint">
                    Each spin costs 0 credits, but earns you XP!
                </div>
            </div>
        </div>
    );
};

export default ViralChallenge;
