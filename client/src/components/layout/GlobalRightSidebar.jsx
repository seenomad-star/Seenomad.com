import React from 'react';
import { Shield, Activity, Map, Trophy, Sparkles, Globe, Compass, Zap, Wallet, Users, Leaf, MessageSquare, Coffee, ChevronRight } from 'lucide-react';
import UserStatsWidget from '../popular/UserStatsWidget';
import TrendingDestinationsWidget from '../popular/TrendingDestinationsWidget';
import PopularCommunitiesWidget from '../popular/PopularCommunitiesWidget';
import '../../styles/layout/GlobalRightSidebar.css';

const GlobalRightSidebar = () => {
    return (
        <aside className="global-right-sidebar">
            <div className="sidebar-inner-scroll">
                
                {/* 1. NOMAD PULSE (System 1) */}
                <div className="travel-os-system-card pulse-mini">
                    <div className="pulse-header">
                        <Activity size={16} className="text-blue animate-pulse" />
                        <span>Nomad Pulse</span>
                    </div>
                    <div className="pulse-stats">
                        <div className="pulse-item">
                            <span className="label">Signal</span>
                            <span className="value text-green">Strong</span>
                        </div>
                        <div className="pulse-item">
                            <span className="label">Airfare</span>
                            <span className="value text-blue">📉 -12%</span>
                        </div>
                    </div>
                </div>

                {/* 2. FLASH MEETUPS (System 8) - RESTORED */}
                <div className="travel-os-system-card meetup-mini">
                    <div className="system-title">
                        <Users size={16} className="text-primary" />
                        <span>Flash Meetups</span>
                        <div className="status-dot green animate-ping" style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="meetup-mini-list">
                        <div className="meetup-item-compact">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="mini-avatar" />
                            <div className="item-info">
                                <span className="name">Sarah • 0.4km</span>
                                <span className="meta">Coding @ Bara Roots</span>
                            </div>
                            <button className="ping-icon"><MessageSquare size={12} /></button>
                        </div>
                        <div className="meetup-item-compact">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" className="mini-avatar" />
                            <div className="item-info">
                                <span className="name">Marcus • 1.2km</span>
                                <span className="meta">Design @ Zest Cafe</span>
                            </div>
                            <button className="ping-icon"><MessageSquare size={12} /></button>
                        </div>
                    </div>
                </div>

                {/* 3. TRAVEL IDENTITY (System 2, 5, 10) */}
                <UserStatsWidget />

                {/* 4. ECO-TRAIL (Restored XP / Sustainability) */}
                <div className="travel-os-system-card eco-mini">
                    <div className="system-title">
                        <Leaf size={16} className="text-green" />
                        <span>Eco-Trail</span>
                        <span className="xp-badge">+450 XP</span>
                    </div>
                    <div className="eco-stats">
                        <div className="progress-mini">
                            <div className="fill green" style={{ width: '80%' }}></div>
                        </div>
                        <span className="progress-text">80% of monthly offset goal</span>
                    </div>
                </div>

                {/* 3. VISA HEALTH (System 7) */}
                <div className="travel-os-system-card visa-health">
                    <div className="system-title">
                        <Shield size={16} className="text-orange" />
                        <span>Visa Health</span>
                    </div>
                    <div className="visa-status">
                        <span className="status-dot green" />
                        <span className="status-text">14 days remaining in Thailand</span>
                    </div>
                </div>

                {/* 4. DISCOVERY INTELLIGENCE (System 3, 8) */}
                <TrendingDestinationsWidget />

                {/* 5. GLOBAL MARKETPLACES (System 4, 6) */}
                <PopularCommunitiesWidget />

                {/* 6. GLOBAL QUEST (System 9) */}
                <div className="travel-os-system-card quest-card">
                    <div className="quest-badge">Daily Quest</div>
                    <h4 className="quest-title text-gold">The Hidden Archive</h4>
                    <p className="quest-task">Find a secret library in Bali & post a photo.</p>
                    <div className="quest-reward">+150 XP • Level Up!</div>
                </div>

                {/* Quick Map Access */}
                <div className="sidebar-quick-map">
                    <Map size={20} />
                    <span>Open Life Journey Map</span>
                </div>
            </div>
        </aside>
    );
};

export default GlobalRightSidebar;
