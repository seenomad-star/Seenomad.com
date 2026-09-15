import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, Globe, Zap, Star, MapPin, 
    ChevronRight, ArrowRight, UserCheck, Shield 
} from 'lucide-react';

const SparkCard = ({ nomad }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="spark-card-perspective" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div 
                className={`spark-card-inner ${isFlipped ? 'is-flipped' : ''}`}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* FRONT: Social Vibe (Tinder-style) */}
                <div className="spark-card-front">
                    <img src={nomad.img} alt={nomad.name} className="spark-img" />
                    <div className="spark-vibe-overlay">
                        <div className="spark-user-main">
                            <h3>{nomad.name}, {nomad.age}</h3>
                            <span className="spark-location"><MapPin size={12} /> {nomad.location}</span>
                        </div>
                        <p className="spark-bio">{nomad.bio}</p>
                        <div className="vibe-tags">
                            {nomad.dna.map(tag => (
                                <span key={tag} className="vibe-tag">{tag}</span>
                            ))}
                        </div>
                        <div className="spark-flip-hint">
                            <Zap size={10} fill="#F59E0B" /> Tap for Professional Depth
                        </div>
                    </div>
                </div>

                {/* BACK: Professional Context (LinkedIn-style) */}
                <div className="spark-card-back">
                    <div className="back-header">
                        <div className="mini-avatar"><img src={nomad.img} alt="" /></div>
                        <div className="back-user-info">
                            <strong>{nomad.handle}</strong>
                            <span>{nomad.location}</span>
                        </div>
                    </div>

                    <div className="back-section">
                        <label><Briefcase size={14} /> Current Mission</label>
                        <p className="mission-text">{nomad.mission}</p>
                    </div>

                    <div className="back-section">
                        <label><Star size={14} /> Skills & Expertise</label>
                        <div className="spark-skills-grid">
                            {nomad.skills.map(skill => (
                                <span key={skill} className="spark-skill-item">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="back-section mission-highlight">
                        <label><UserCheck size={14} /> Looking For</label>
                        <div className="goal-badge">{nomad.lookingFor}</div>
                    </div>

                    <div className="spark-cta-mini">
                        <p>Mutual connections with 12 Mates</p>
                    </div>

                    <div className="spark-flip-hint back">
                        Tap to return to Vibe
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SparkCard;
