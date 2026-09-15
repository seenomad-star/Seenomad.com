import React from 'react';
import { TrendingUp, Award, Star, Zap, ChevronUp, History, CheckCircle2, Lock } from 'lucide-react';

const XPTracker = () => {
    const levelData = {
        current: 24,
        name: 'Impact Explorer',
        next: 25,
        xp: 1240,
        total: 2000,
        percent: 62
    };

    const recentXP = [
        { id: 1, activity: 'Completed "Eco-Warrior" Mission', xp: '+100', date: '2 hours ago' },
        { id: 2, activity: 'Trip Booking Bonus (Bali)', xp: '+500', date: 'Yesterday' },
        { id: 3, activity: 'Daily Login Streak', xp: '+25', date: 'Yesterday' },
        { id: 4, activity: 'Shared Itinerary', xp: '+50', date: '3 days ago' }
    ];

    return (
        <div className="hub-section fade-in">
            <div className="section-header-hub">
                <div>
                    <h1>XP & <span className="gradient-text">Level</span></h1>
                    <p>Level up your nomad status and unlock premium perks.</p>
                </div>
                <div className="rank-badge">
                    <Award size={18} />
                    <span>Global Rank: #1,245</span>
                </div>
            </div>

            <div className="xp-overview-grid">
                <div className="level-card glass">
                    <div className="level-header">
                        <div className="level-number">{levelData.current}</div>
                        <div className="level-info">
                            <h3>{levelData.name}</h3>
                            <p>Next Level: {levelData.next}</p>
                        </div>
                    </div>
                    <div className="xp-progress-main">
                        <div className="progress-labels">
                            <span>{levelData.xp} XP</span>
                            <span>{levelData.total} XP</span>
                        </div>
                        <div className="progress-bar-large">
                            <div className="progress-fill" style={{ width: `${levelData.percent}%` }}></div>
                        </div>
                        <div className="progress-footer">
                            <span>{levelData.total - levelData.xp} XP to Level {levelData.next}</span>
                        </div>
                    </div>
                </div>

                <div className="perks-card glass">
                    <h3>Level {levelData.current} Perks</h3>
                    <ul className="perks-list">
                        <li><CheckCircle2 size={16} className="text-green-500" /> 5% Extra Cashback on Bookings</li>
                        <li><CheckCircle2 size={16} className="text-green-500" /> Priority Support Access</li>
                        <li><CheckCircle2 size={16} className="text-green-500" /> Exclusive "Explorer" Badge</li>
                        <li className="locked"><Lock size={16} /> Level 25: Unlock Custom Map Pins</li>
                    </ul>
                </div>
            </div>

            <div className="xp-history glass">
                <div className="history-header">
                    <h3><History size={18} /> Recent XP Activity</h3>
                    <button className="text-btn">View Full History</button>
                </div>
                <div className="history-list">
                    {recentXP.map(item => (
                        <div key={item.id} className="history-item">
                            <div className="item-main">
                                <div className="xp-icon"><ChevronUp size={16} /></div>
                                <div className="item-info">
                                    <h4>{item.activity}</h4>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                            <div className="xp-value">{item.xp} XP</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default XPTracker;
