import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    Coffee, 
    TrendingUp, 
    Leaf, 
    ChevronRight, 
    MapPin, 
    DollarSign,
    Activity,
    MessageSquare,
    Globe
} from 'lucide-react';
import './NomadSidebar.css';

const NomadSidebar = () => {
    const [isAvailable, setIsAvailable] = useState(false);

    const meetups = [
        { name: 'Sarah', distance: '0.4km', action: 'Coding', cafe: 'Bara Roots' },
        { name: 'Marcus', distance: '1.2km', action: 'Design', cafe: 'Zest Cafe' }
    ];

    const arbitrage = {
        spendingPower: { current: 'Bali (High)', next: 'Tokyo (Medium-Low)' },
        bestValue: 'Thailand (+12% PHP vs THB)',
        trend: 'Up'
    };

    return (
        <aside className="nomad-sidebar">
            {/* 1. Flash Meetups Widget */}
            <div className="sidebar-widget meetup-widget">
                <div className="widget-header">
                    <div className="title-with-icon">
                        <Users size={16} className="text-primary" />
                        <span>FLASH MEETUPS</span>
                    </div>
                    <div className={`status-pill ${isAvailable ? 'available' : 'busy'}`} onClick={() => setIsAvailable(!isAvailable)}>
                        {isAvailable ? 'AVAILABLE' : 'DEEP WORK'}
                    </div>
                </div>
                
                <div className="meetup-list">
                    {meetups.map(m => (
                        <div key={m.name} className="meetup-item">
                            <div className="meetup-avatar">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`} alt={m.name} />
                                <div className="activity-icon"><Coffee size={10} /></div>
                            </div>
                            <div className="meetup-info">
                                <span className="name">{m.name} • {m.distance}</span>
                                <span className="meta">{m.action} @ {m.cafe}</span>
                            </div>
                            <button className="ping-btn"><MessageSquare size={14} /></button>
                        </div>
                    ))}
                </div>
                <button className="view-all-link">Find 12 others nearby <ChevronRight size={14} /></button>
            </div>

            {/* 2. Travel Arbitrage Widget */}
            <div className="sidebar-widget arbitrage-widget">
                <div className="widget-header">
                    <div className="title-with-icon">
                        <TrendingUp size={16} className="text-secondary" />
                        <span>TRAVEL ARBITRAGE</span>
                    </div>
                    <div className="live-badge">LIVE</div>
                </div>

                <div className="arbitrage-content">
                    <div className="stat-row">
                        <span className="label">Next Stop Power:</span>
                        <span className="value text-warning">{arbitrage.spendingPower.next}</span>
                    </div>
                    <div className="best-value-card">
                        <div className="card-top">
                            <Globe size={14} />
                            <span>BEST VALUE TODAY</span>
                        </div>
                        <h4>{arbitrage.bestValue}</h4>
                        <p>Your PHP is surging against THB. Ideal for booking future stays.</p>
                    </div>
                </div>
                <button className="view-all-link border-top">Full finance dashboard <ChevronRight size={14} /></button>
            </div>

            {/* 3. Eco-Nomad Tracker */}
            <div className="sidebar-widget eco-widget">
                <div className="widget-header">
                    <div className="title-with-icon">
                        <Leaf size={16} className="text-success" />
                        <span>ECO-TRAIL</span>
                    </div>
                    <span className="points">+450 XP</span>
                </div>
                <div className="eco-progress">
                    <div className="eco-text">
                        <span>320kg Offset this month</span>
                        <span className="percent">80% of Goal</span>
                    </div>
                    <div className="progress-bg">
                        <div className="progress-fill success" style={{ width: '80%' }}></div>
                    </div>
                </div>
                <div className="eco-bounty-tease">
                    <Activity size={12} fill="#10b981" />
                    <span>Active: Beach Cleanup Tomorrow</span>
                </div>
            </div>

            <div className="sidebar-footer-links">
                <a href="#">Safety Index</a>
                <a href="#">Nomad Tax Guide</a>
                <a href="#">Fixer Network</a>
            </div>
        </aside>
    );
};

export default NomadSidebar;
