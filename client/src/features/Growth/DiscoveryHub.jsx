import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Instagram, Twitter, Search, 
    Link, Phone, Globe,
    ArrowRight, Rocket, Sparkles,
    MousePointer2, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiscoveryHub = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState(null); // 'IG', 'SEO', 'REEL'

    const entries = [
        { id: 'IG', name: 'Instagram Story', icon: <Instagram size={20} />, hook: 'POV: You found the perfect 10-city nomad route.', preview: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400' },
        { id: 'SEO', name: 'Google Search', icon: <Search size={20} />, hook: 'Cheapest flights & nomad visa requirements 2026', preview: null },
        { id: 'REEL', name: 'Viral Reel', icon: <Share2 size={20} />, hook: 'Escape the 9-5 matrix. This AI agent does the work.', preview: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=400' }
    ];

    const handleEnter = () => {
        navigate('/explore/multi-city');
    };

    return (
        <div className="discovery-hub-container">
            <div className="discovery-hero">
                <h1>Where do they find us?</h1>
                <p>Mapping the viral entrance points of the Seenomad ecosystem.</p>
            </div>

            <div className="discovery-grid">
                {entries.map(entry => (
                    <motion.div 
                        key={entry.id}
                        whileHover={{ y: -10 }}
                        className={`entry-card ${source === entry.id ? 'active' : ''}`}
                        onClick={() => setSource(entry.id)}
                    >
                        <div className="entry-header">
                            <div className="e-icon">{entry.icon}</div>
                            <span>{entry.name}</span>
                        </div>
                        <div className="entry-hook">
                            <p>"{entry.hook}"</p>
                        </div>
                        {entry.preview && (
                            <div className="entry-preview">
                                <img src={entry.preview} alt="Discovery Preview" />
                            </div>
                        )}
                        <button className="simulate-btn">
                            Simulate Catch <MousePointer2 size={14} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {source && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="conversion-overlay"
                    >
                        <div className="hook-content">
                            <Sparkles size={32} className="sparkle-icon" />
                            <h2>User Captured!</h2>
                            <p>Entering platform via <strong>{entries.find(e => e.id === source).name}</strong>. Personalized onboarding triggered.</p>
                            <button onClick={handleEnter} className="go-to-platform-btn">
                                Open Traveluh Planner <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="discovery-footer">
                <Rocket size={16} />
                <span>Our storytelling engine turns passive viewers into hyper-active nomads.</span>
            </div>
        </div>
    );
};

export default DiscoveryHub;
