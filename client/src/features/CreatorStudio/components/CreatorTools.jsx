import React, { useState } from 'react';
import {
    BarChart3,
    Sparkles,
    Calendar,
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    ChevronRight,
    Plus,
    Layout,
    Clock,
    Target
} from 'lucide-react';

const CreatorTools = () => {
    const [stats, setStats] = useState({
        reach: "1.2M",
        reachGrowth: "+12.5%",
        earnings: "$12,450",
        earningsGrowth: "+8.2%",
        followers: "450k",
        followerGrowth: "+5.4%"
    });

    return (
        <div className="creator-tools-module">
            {/* Analytics Overview */}
            <div className="analytics-overview">
                <div className="section-header">
                    <h2>Creator Analytics</h2>
                    <button className="full-report-btn">Full Report</button>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon reach"><Users size={20} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Reach</span>
                            <div className="stat-value-row">
                                <span className="stat-value">{stats.reach}</span>
                                <span className="stat-growth positive">{stats.reachGrowth}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon earnings"><DollarSign size={20} /></div>
                        <div className="stat-info">
                            <span className="stat-label">Total Earnings</span>
                            <div className="stat-value-row">
                                <span className="stat-value">{stats.earnings}</span>
                                <span className="stat-growth positive">{stats.earningsGrowth}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon followers"><Target size={20} /></div>
                        <div className="stat-info">
                            <span className="stat-label">New Followers</span>
                            <div className="stat-value-row">
                                <span className="stat-value">{stats.followers}</span>
                                <span className="stat-growth positive">{stats.followerGrowth}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Content Generator */}
            <div className="ai-generator-section">
                <div className="ai-card-header">
                    <div className="ai-title">
                        <Sparkles size={20} />
                        <h3>AI Content Engine</h3>
                    </div>
                    <div className="ai-credits">
                        <span>12 Credits Left</span>
                        <button className="top-up-btn">Top Up</button>
                    </div>
                </div>
                <div className="ai-generator-body">
                    <div className="input-group">
                        <label>What are you creating?</label>
                        <div className="creation-types">
                            <button className="type-chip active">Travel Reel</button>
                            <button className="type-chip">Blog Post</button>
                            <button className="type-chip">Caption</button>
                            <button className="type-chip">Itinerary</button>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Destination / Topic</label>
                        <input type="text" placeholder="e.g. Hidden gems in Iceland" />
                    </div>
                    <button className="generate-btn">
                        <Sparkles size={18} />
                        <span>Generate Viral Content</span>
                    </button>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="tools-grid-main">
                <div className="tool-card-detailed">
                    <div className="tool-icon scheduler"><Calendar size={24} /></div>
                    <div className="tool-info">
                        <h4>Post Scheduler</h4>
                        <p>Plan and auto-post to all platforms.</p>
                    </div>
                    <ChevronRight size={20} />
                </div>
                <div className="tool-card-detailed">
                    <div className="tool-icon trends"><TrendingUp size={24} /></div>
                    <div className="tool-info">
                        <h4>Trend Predictor</h4>
                        <p>AI-powered destination trends.</p>
                    </div>
                    <div className="pro-badge">PRO</div>
                </div>
                <div className="tool-card-detailed">
                    <div className="tool-icon heatmap"><Layout size={24} /></div>
                    <div className="tool-info">
                        <h4>Audience Heatmap</h4>
                        <p>See when your fans are most active.</p>
                    </div>
                    <ChevronRight size={20} />
                </div>
            </div>

            {/* Monetization Dashboard Preview */}
            <div className="monetization-dashboard">
                <div className="dashboard-header">
                    <h3>Monetization Streams</h3>
                    <button className="add-stream-btn"><Plus size={16} /> Add Stream</button>
                </div>
                <div className="streams-list">
                    <div className="stream-item">
                        <div className="stream-info">
                            <span className="stream-name">Paid Subscriptions</span>
                            <span className="stream-count">1.2k active</span>
                        </div>
                        <span className="stream-amount">$5,980</span>
                    </div>
                    <div className="stream-item">
                        <div className="stream-info">
                            <span className="stream-name">Guide Sales</span>
                            <span className="stream-count">245 sold</span>
                        </div>
                        <span className="stream-amount">$3,420</span>
                    </div>
                    <div className="stream-item">
                        <div className="stream-info">
                            <span className="stream-name">Tips & DMs</span>
                            <span className="stream-count">84 interactions</span>
                        </div>
                        <span className="stream-amount">$1,240</span>
                    </div>
                </div>
            </div>

            {/* Scheduler Preview */}
            <div className="scheduler-preview">
                <div className="section-header">
                    <h3>Upcoming Posts</h3>
                    <button className="text-link">View Calendar</button>
                </div>
                <div className="upcoming-list">
                    <div className="upcoming-item">
                        <div className="post-preview-mini"></div>
                        <div className="post-details">
                            <span className="post-title">Iceland Vlog Part 1</span>
                            <div className="post-time-meta">
                                <Clock size={12} />
                                <span>Tomorrow, 10:00 AM</span>
                            </div>
                        </div>
                        <div className="post-platforms">
                            <div className="p-icon">IG</div>
                            <div className="p-icon">YT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorTools;
