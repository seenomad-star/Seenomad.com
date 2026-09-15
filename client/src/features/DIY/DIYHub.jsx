import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Compass, Globe, Backpack, 
    ArrowRight, Sparkles, Map,
    Search, CreditCard, ShieldCheck
} from 'lucide-react';
import ViralChallenge from './ViralChallenge';
import TravelGuideHub from './TravelGuideHub';
import PackingList from './PackingList';

const DIYHub = () => {
    const [view, setView] = useState('main');

    const tools = [
        { id: 'challenge', title: 'Viral Challenge', icon: <Globe />, desc: '3D Globe Spin' },
        { id: 'guides', title: 'Travel Guides', icon: <Map />, desc: 'Wiki/Video/FAQ' },
        { id: 'packing', title: 'Packing List', icon: <Backpack />, desc: 'Gear & Checklists' },
        { id: 'scanner', title: 'Flight Scanner', icon: <Search />, desc: 'Price Comparison' }
    ];

    return (
        <div className="diy-hub-container">
            {view === 'main' ? (
                <div className="diy-main-grid">
                    <div className="diy-hero">
                        <h1>The Ultimate DIY Planner</h1>
                        <p>Explore. Pack. Search. Conquer the world with AI-powered solo travel tools.</p>
                    </div>

                    <div className="diy-tools-grid">
                        {tools.map(t => (
                            <motion.button
                                key={t.id}
                                whileHover={{ y: -10, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="diy-tool-card"
                                onClick={() => setView(t.id)}
                            >
                                <div className="diy-tool-icon">{t.icon}</div>
                                <div className="diy-tool-info">
                                    <h3>{t.title}</h3>
                                    <span>{t.desc}</span>
                                </div>
                                <div className="diy-tool-arrow"><ArrowRight size={20} /></div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="diy-viral-banner">
                        <Sparkles className="banner-icon" />
                        <div className="banner-content">
                            <h3>Trending: The 3D Viral Challenge</h3>
                            <p>Join 50k nomads spinning the globe this week for secret spots.</p>
                        </div>
                        <button className="banner-action" onClick={() => setView('challenge')}>Spin Now</button>
                    </div>
                </div>
            ) : (
                <div className="diy-view-wrapper">
                    <button className="diy-back-btn" onClick={() => setView('main')}>
                        <Compass size={20} />
                        <span>Back to DIY Hub</span>
                    </button>
                    <div className="diy-view-content">
                        {view === 'challenge' && <ViralChallenge />}
                        {view === 'guides' && <TravelGuideHub />}
                        {view === 'packing' && <PackingList />}
                        {view === 'scanner' && (
                            <div className="scanner-placeholder">
                                <Search size={64} className="p-icon" opacity={0.2} />
                                <h2>Flight Scanner Comparison</h2>
                                <p>Integrating live APIs for Skyscanner, Kayak, and Google Flights...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DIYHub;
