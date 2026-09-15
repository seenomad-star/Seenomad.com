import React from 'react';
import {
    TrendingUp,
    Users,
    DollarSign,
    ArrowUpRight,
    BarChart3,
    Target,
    Zap,
    Crown
} from 'lucide-react';

const Overview = () => {
    const stats = [
        { label: 'Total Revenue', value: '$124,500', change: '+12.5%', icon: DollarSign, color: '#10b981' },
        { label: 'Active Bookings', value: '1,240', change: '+8.2%', icon: Target, color: '#3b82f6' },
        { label: 'Partner XP', value: '8,450', change: 'Level 12', icon: Zap, color: '#f59e0b' },
        { label: 'Conversion Rate', value: '4.2%', change: '+1.1%', icon: BarChart3, color: '#8b5cf6' }
    ];

    const recentActivities = [
        { id: 1, type: 'Booking', message: 'New booking for Bali Paradise Tour', time: '2 mins ago', amount: '+$899' },
        { id: 2, type: 'Review', message: '5-star review from Alex Nomad', time: '15 mins ago', amount: null },
        { id: 3, type: 'Payout', message: 'Monthly payout processed', time: '1 hour ago', amount: '-$4,200' },
        { id: 4, type: 'XP', message: 'Earned 500 XP for high rating', time: '3 hours ago', amount: '+500 XP' }
    ];

    return (
        <div className="partner-overview">
            {/* Tier Banner */}
            <div className="tier-banner premium-gradient">
                <div className="tier-info">
                    <div className="tier-badge-large">
                        <Crown size={32} fill="currentColor" />
                    </div>
                    <div className="tier-text">
                        <h3>Gold Partner Status</h3>
                        <p>You're in the top 5% of partners this month. Keep it up!</p>
                    </div>
                </div>
                <div className="tier-progress">
                    <div className="progress-labels">
                        <span>XP to Platinum</span>
                        <span>1,550 XP left</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: '85%' }}></div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card glass">
                        <div className="stat-header">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                <stat.icon size={20} />
                            </div>
                            <span className="stat-change positive">{stat.change}</span>
                        </div>
                        <div className="stat-body">
                            <span className="stat-label">{stat.label}</span>
                            <h2 className="stat-value">{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="overview-bottom-grid">
                {/* Performance Chart Placeholder */}
                <div className="performance-section glass">
                    <div className="section-header">
                        <h3>Revenue Performance</h3>
                        <div className="time-filters">
                            <button className="filter-pill active">7D</button>
                            <button className="filter-pill">1M</button>
                            <button className="filter-pill">1Y</button>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="mock-bar-chart">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="bar-wrapper">
                                    <div className="bar-fill" style={{ height: `${h}%` }}>
                                        <div className="bar-tooltip">${h * 100}</div>
                                    </div>
                                    <span className="bar-label">Day {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="activity-section glass">
                    <div className="section-header">
                        <h3>Recent Activity</h3>
                        <button className="text-btn">View All</button>
                    </div>
                    <div className="activity-list">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className="activity-info">
                                    <p className="activity-msg">{activity.message}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                                {activity.amount && (
                                    <span className={`activity-amount ${activity.amount.startsWith('+') ? 'positive' : 'negative'}`}>
                                        {activity.amount}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
