import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, Zap, Target, 
    Sparkles, ArrowRight, X,
    Gift, Trophy, MapPin
} from 'lucide-react';
import { useUserProfileStore } from '../../store/userProfileStore';

const ViralChallenges = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const { addReward, dna } = useUserProfileStore();

    const challenges = [
        { id: 'tokyo-neon', title: 'Tokyo Neon Hunt', city: 'Tokyo', reward: 500, type: 'Adventure', desc: 'Find 3 hidden vending machines in Akihabara.' },
        { id: 'bali-nomad', title: 'Bali Beach Office', city: 'Uluwatu', reward: 300, type: 'Social', desc: 'Co-work with 5 other nomads at a cliffside cafe.' },
        { id: 'lisbon-history', title: 'Lisbon Tile Tracker', city: 'Lisbon', reward: 450, type: 'Culture', desc: 'Photograph 10 Alfama tile patterns.' }
    ];

    const handleSpin = () => {
        setIsSpinning(true);
        setChallenge(null);
        
        setTimeout(() => {
            const random = challenges[Math.floor(Math.random() * challenges.length)];
            setChallenge(random);
            setIsSpinning(false);
        }, 2500);
    };

    const handleAccept = () => {
        addReward({
            id: `challenge-${challenge.id}`,
            title: challenge.title,
            type: 'credits',
            value: challenge.reward,
            claimed: false,
            icon: 'Trophy',
            desc: `Challenge accepted: ${challenge.desc}`
        });
        setChallenge(null);
    };

    return (
        <div className="viral-challenges-container">
            <div className="challenges-hero">
                <h1>Viral Challenges</h1>
                <p>Spin the globe and accept your next nomad mission.</p>
            </div>

            <div className="globe-spinner-area">
                <motion.div 
                    animate={isSpinning ? { rotate: 360 } : {}}
                    transition={isSpinning ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                    className={`globe-visual ${isSpinning ? 'spinning' : ''}`}
                >
                    <Globe size={180} />
                </motion.div>
                
                {!challenge && !isSpinning && (
                    <button className="spin-btn" onClick={handleSpin}>
                        <Zap size={20} fill="currentColor" />
                        <span>SPIN THE GLOBE</span>
                    </button>
                )}
            </div>

            <AnimatePresence>
                {challenge && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="challenge-reveal-overlay"
                    >
                        <div className="challenge-card">
                            <div className="c-header">
                                <Sparkles size={24} className="sparkle" />
                                <span>MISSION ASSIGNED</span>
                            </div>
                            <h2>{challenge.title}</h2>
                            <div className="c-location">
                                <MapPin size={14} /> {challenge.city}
                            </div>
                            <p className="c-desc">{challenge.desc}</p>
                            <div className="c-reward">
                                <Trophy size={18} />
                                <strong>+{challenge.reward} NC</strong>
                            </div>
                            <div className="c-actions">
                                <button className="accept-btn" onClick={handleAccept}>
                                    Accept Challenge <ArrowRight size={18} />
                                </button>
                                <button className="decline-btn" onClick={() => setChallenge(null)}>
                                    Pass
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="challenges-footer">
                <Target size={14} />
                <span>Your Adventure DNA is currently at {dna.adventure}%. Accept to evolve.</span>
            </div>
        </div>
    );
};

export default ViralChallenges;
