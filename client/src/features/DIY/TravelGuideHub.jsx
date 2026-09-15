import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Video, HelpCircle, 
    ExternalLink, Map, Info, 
    ArrowRight, ChevronRight
} from 'lucide-react';

const TravelGuideHub = ({ destination = "Bali" }) => {
    const [activeTab, setActiveTab] = useState('wiki');

    const tabs = [
        { id: 'wiki', label: 'Wiki Guide', icon: <BookOpen size={18} /> },
        { id: 'video', label: 'Video Tips', icon: <Video size={18} /> },
        { id: 'faq', label: 'Nomad FAQ', icon: <HelpCircle size={18} /> },
    ];

    return (
        <div className="travel-guide-hub">
            <div className="guide-header">
                <div className="guide-title">
                    <h2>{destination} Global Protocol</h2>
                    <p>The compressed guidebook for the modern nomad.</p>
                </div>
                <div className="guide-tabs">
                    {tabs.map(t => (
                        <button 
                            key={t.id}
                            className={`guide-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            {t.icon}
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="guide-content-area">
                {activeTab === 'wiki' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="guide-pane wiki">
                        <div className="wiki-intro">
                            <p><strong>Overview:</strong> {destination} is a hub of culture and nomadic activity. Known for its lush landscapes and digital infrastructure.</p>
                        </div>
                        <div className="wiki-sections">
                            <div className="wiki-card">
                                <h3>History & Culture</h3>
                                <p>Ancient traditions meet modern minimalism. Respect local customs regarding temple visits and attire.</p>
                                <button className="view-full-wiki">Read Wiki <ExternalLink size={12} /></button>
                            </div>
                            <div className="wiki-card">
                                <h3>Digital Infrastructure</h3>
                                <p>Fiber optic is standard in hubs like Canggu and Ubud. Average speed: 100Mbps.</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'video' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="guide-pane videos">
                        <div className="video-grid">
                            {[1, 2].map(i => (
                                <div key={i} className="video-thumbnail-card">
                                    <div className="v-thumb-mock">
                                        <div className="play-btn"><Map size={24} /></div>
                                    </div>
                                    <div className="v-info">
                                        <h4>{destination} Secret Spots 2026</h4>
                                        <span>Atlas AI · 1.2M Views</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'faq' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="guide-pane faqs">
                        <div className="faq-list">
                            <div className="faq-item">
                                <h4>Best time for deep work?</h4>
                                <p>Shoulder season (May-June) offers the best balance of weather and crowd-free cafes.</p>
                            </div>
                            <div className="faq-item">
                                <h4>Is it safe for solo foundrs?</h4>
                                <p>Highly safe. Strong community support via Nomad Sparks.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="guide-footer">
                <div className="guide-cta">
                    <Info size={16} />
                    <span>Want a custom roadmap for {destination}?</span>
                    <button className="ask-atlas-btn">Ask Atlas Agent <ArrowRight size={14} /></button>
                </div>
            </div>
        </div>
    );
};

export default TravelGuideHub;
