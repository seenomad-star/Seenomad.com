import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, X, Briefcase, Zap, Globe, 
    Star, MessageCircle, Info, RefreshCw
} from 'lucide-react';
import SparkCard from './components/SparkCard';
import VibeMatch from './components/VibeMatch';
import '../../styles/NomadFeatures.css';

const NomadSparks = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMatch, setShowMatch] = useState(false);
    const [lastMatchedUser, setLastMatchedUser] = useState(null);

    const nomadSquad = [
        {
            id: 'sarah_dev',
            name: 'Sarah',
            age: 27,
            handle: '@sarah_dev',
            bio: 'Fullstack Dev wandering through SE Asia. Coffee lover & sunset chaser.',
            mission: 'Building a sustainable travel SaaS.',
            lookingFor: 'Co-founder / Travel Buddy',
            skills: ['React', 'NodeJS', 'Product Design'],
            dna: ['Digital Zen', 'Slow Traveler'],
            location: 'Bali, Indonesia',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'marcus_v',
            name: 'Marcus',
            age: 31,
            handle: '@marcus_v',
            bio: 'Crypto founder & marathon runner. Current base: Lisbon.',
            mission: 'Deploying DePIN nodes in European hubs.',
            lookingFor: 'Networking / Dinner',
            skills: ['Rust', 'Economics', 'Public Speaking'],
            dna: ['High-Stakes Founder', 'Extreme Digital'],
            location: 'Lisbon, Portugal',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'lina_p',
            name: 'Lina',
            age: 24,
            handle: '@lina_p',
            bio: 'Brand photographer exploring Mexico. Let’s shoot some content!',
            mission: 'Capturing the hidden corners of Oaxaca.',
            lookingFor: 'Collab / Adventure',
            skills: ['Lightroom', 'Branding', 'Social Strategy'],
            dna: ['Visual Storyteller', 'Adventure Nomad'],
            location: 'Oaxaca, Mexico',
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
        }
    ];

    const currentNomad = nomadSquad[currentIndex];

    const handleAction = (direction) => {
        if (direction === 'right') {
            // Simulated match logic
            if (Math.random() > 0.4) {
                setLastMatchedUser(currentNomad);
                setShowMatch(true);
            }
        }
        
        if (currentIndex < nomadSquad.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0); // Loop for demo
        }
    };

    return (
        <div className="sparks-container">
            <div className="sparks-header">
                <div>
                    <h2>Nomad Sparks</h2>
                    <p>Community discovery built for humans.</p>
                </div>
                <div className="sparks-stats">
                    <div className="s-stat"><Zap size={14} fill="#8B5CF6" /> 12 Sparks</div>
                </div>
            </div>

            <div className="spark-deck">
                <AnimatePresence mode="wait">
                    {currentNomad && (
                        <motion.div
                            key={currentNomad.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="spark-card-wrapper"
                        >
                            <SparkCard nomad={currentNomad} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="spark-controls">
                <button className="ctrl-btn pass" onClick={() => handleAction('left')}>
                    <X size={32} />
                </button>
                <button className="ctrl-btn info">
                    <RefreshCw size={24} />
                </button>
                <button className="ctrl-btn spark" onClick={() => handleAction('right')}>
                    <Heart size={32} fill="currentColor" />
                </button>
            </div>

            <AnimatePresence>
                {showMatch && (
                    <VibeMatch 
                        user={lastMatchedUser} 
                        onClose={() => setShowMatch(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadSparks;
