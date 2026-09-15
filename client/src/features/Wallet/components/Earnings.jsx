import React from 'react';
import {
    TrendingUp,
    Users,
    MapPin,
    Video,
    ChevronRight,
    ArrowUpRight,
    Filter,
    Download,
    Gift,
    Zap,
    Radio
} from 'lucide-react';

const Earnings = () => {
    const earningsBySource = [
        { id: 1, source: 'Guided Tours', amount: 4500, icon: MapPin, color: '#3b82f6' },
        { id: 2, source: 'Content Creation', amount: 2800, icon: Video, color: '#8b5cf6' },
        { id: 3, source: 'Referrals', amount: 950, icon: Users, color: '#10b981' },
        { id: 4, source: 'News Reporting', amount: 1450, icon: Radio, color: '#ff4444' },
    ];

    const monthlyEarnings = [
        { month: 'Oct', amount: 3240 },
        { month: 'Sep', amount: 2850 },
        { month: 'Aug', amount: 3100 },
        { month: 'Jul', amount: 2400 },
        { month: 'Jun', amount: 1800 },
        { month: 'May', amount: 1200 },
    ];

    return (
        <div className="earnings-view">
            {/* Top Earner Badge */}
            <div className="earner-status-banner premium-gradient">
                <div className="status-icon">🏆</div>
                <div className="status-info">
                    <span className="status-label">Top 5% Guide This Month</span>
                    <span className="status-desc">You've earned more than 95% of guides in Bali!</span>
                </div>
                <button className="share-status-btn glass">Share</button>
            </div>

            {/* Earnings Overview */}
            <div className="earnings-header-grid">
                <div className="total-earnings-card glass">
                    <span className="label">Total Life-time Earnings</span>
                    <h2 className="amount animate-count">$26,300.00</h2>
                    <div className="trend positive">
                        <TrendingUp size={16} />
                        <span>+12.5% from last month</span>
                    </div>
                </div>

                <div className="earnings-sources">
                    {earningsBySource.map((source) => (
                        <div key={source.id} className="source-card glass">
                            <div className="source-icon" style={{ backgroundColor: `${source.color}15`, color: source.color }}>
                                <source.icon size={20} />
                            </div>
                            <div className="source-info">
                                <span className="source-name">{source.source}</span>
                                <span className="source-amount">${source.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Chart */}
            <section className="earnings-chart-section glass">
                <div className="section-header">
                    <h3>Earnings Performance</h3>
                    <div className="header-actions">
                        <button className="action-btn-mini glass">
                            <Filter size={14} />
                            <span>Last 6 Months</span>
                        </button>
                    </div>
                </div>
                <div className="chart-container-placeholder">
                    <div className="bar-chart">
                        {monthlyEarnings.map((data, index) => (
                            <div key={index} className="bar-group">
                                <div className="bar-fill" style={{ height: `${(data.amount / 4000) * 100}%` }}>
                                    <span className="bar-tooltip">${data.amount}</span>
                                </div>
                                <span className="bar-label">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Boost Earnings CTA */}
            <section className="boost-earnings-section glass">
                <div className="boost-content">
                    <div className="boost-icon-wrapper">
                        <Zap size={24} className="zap-icon" />
                    </div>
                    <div className="boost-text">
                        <h3>Boost Your Earnings 🚀</h3>
                        <p>Complete 2 more guided tours this week to unlock a 5% bonus!</p>
                    </div>
                    <button className="boost-btn primary pulse">View Missions</button>
                </div>
            </section>

            {/* Pending Clearances */}
            <section className="pending-earnings">
                <div className="section-header">
                    <h3>Pending Clearances</h3>
                    <button className="text-btn">View Schedule</button>
                </div>
                <div className="pending-list">
                    <div className="pending-item glass">
                        <div className="pending-info">
                            <span className="pending-label">Tour: Hidden Gems of Bali</span>
                            <span className="pending-date">Clears in 3 days</span>
                        </div>
                        <div className="pending-amount">
                            <span className="amount">$450.00</span>
                            <span className="status">Pending</span>
                        </div>
                    </div>
                    <div className="pending-item glass">
                        <div className="pending-info">
                            <span className="pending-label">YouTube Ad Revenue Share</span>
                            <span className="pending-date">Clears in 12 days</span>
                        </div>
                        <div className="pending-amount">
                            <span className="amount">$1,200.00</span>
                            <span className="status">Processing</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Earnings;
