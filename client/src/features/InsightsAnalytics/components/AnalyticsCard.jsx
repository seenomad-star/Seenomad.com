import React from 'react';
import {
    Star, Sparkles, Users, ShieldCheck, Bookmark, Heart, Share2,
    MessageCircle, MoreVertical, Calendar, Zap, TrendingUp, Clock, Award,
    BarChart3, PieChart, LineChart, Activity, Cpu, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const AnalyticsCard = ({ item, viewMode }) => {
    const isList = viewMode === 'list';

    return (
        <div className={`analytics-card-premium ${isList ? 'list-view' : ''}`}>
            {/* Visual/Chart Section */}
            <div className="card-image-container">
                <div className="card-chart-preview">
                    {item.chartType === 'bar' && <BarChart3 size={48} className="chart-icon" />}
                    {item.chartType === 'pie' && <PieChart size={48} className="chart-icon" />}
                    {item.chartType === 'line' && <LineChart size={48} className="chart-icon" />}
                    {!item.chartType && <Activity size={48} className="chart-icon" />}
                </div>
                <div className="card-overlay-gradient"></div>

                <button className="favorite-btn">
                    <Bookmark size={18} />
                </button>

                {/* Vertical Action Capsule */}
                <div className="card-action-capsule">
                    <button className="capsule-btn like" title="Like">
                        <Heart size={14} />
                    </button>
                    <button className="capsule-btn share" title="Share">
                        <Share2 size={14} />
                    </button>
                    <button className="capsule-btn comment" title="Comment">
                        <MessageCircle size={14} />
                    </button>
                    <button className="capsule-btn more" title="More Options">
                        <MoreVertical size={14} />
                    </button>
                </div>

                <div className="match-badge">
                    <Sparkles size={12} fill="currentColor" />
                    <span>{item.confidence || '98%'} Confidence</span>
                </div>

                {item.trending && (
                    <div className="trending-badge">
                        <TrendingUp size={12} />
                        <span>Trending</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="card-content">
                <div className="card-header">
                    <div className="header-top">
                        <h3>{item.title}</h3>
                        <div className="trend-indicator">
                            {item.trend === 'up' ? (
                                <ArrowUpRight size={16} className="trend-up" />
                            ) : (
                                <ArrowDownRight size={16} className="trend-down" />
                            )}
                            <span className={item.trend === 'up' ? 'trend-up' : 'trend-down'}>
                                {item.percentage || '+12%'}
                            </span>
                        </div>
                    </div>
                    <div className="category-row">
                        <Activity size={14} className="category-icon" />
                        <span>{item.category}</span>
                    </div>
                </div>

                {/* Dopamine Stats */}
                <div className="dopamine-stats">
                    <div className="stat-item">
                        <Users size={14} className="stat-icon blue" />
                        <span>{item.reach || '1.2M'} reach</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <Zap size={14} className="stat-icon yellow" />
                        <span>{item.impact || 'High'} impact</span>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="ai-insight">
                    <Sparkles size={12} className="insight-icon" />
                    <span className="insight-text">
                        {item.aiInsight || 'AI predicts continued growth in this segment'}
                    </span>
                </div>

                {/* Perks / Tags */}
                <div className="tags-row">
                    {(item.tags || ['Real-time', 'Verified']).slice(0, 3).map(tag => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Pricing & Actions */}
                <div className="card-footer">
                    <div className="price-info">
                        <span className="label">Data Source</span>
                        <span className="amount">{item.source || 'Global'}</span>
                    </div>

                    <div className="card-actions">
                        <button className="action-btn primary">
                            View Report
                        </button>
                    </div>
                </div>

                {/* XP / Gamification Footer */}
                <div className="xp-footer">
                    <div className="xp-pill save">
                        <Award size={12} />
                        <span>+{item.xpReward || '1000'} XP</span>
                    </div>
                    <div className="xp-pill plan">
                        <Clock size={12} />
                        <span>{item.updated || 'Just now'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCard;
