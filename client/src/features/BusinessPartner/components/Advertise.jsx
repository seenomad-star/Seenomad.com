import React from 'react';
import {
    Megaphone,
    Eye,
    MousePointer2,
    TrendingUp,
    Plus,
    MoreVertical,
    Sparkles,
    BarChart
} from 'lucide-react';

const Advertise = () => {
    const campaigns = [
        { id: 1, name: 'Summer Bali Special', status: 'Active', reach: '45k', clicks: '2.4k', ctr: '5.3%', spend: '$1,200' },
        { id: 2, name: 'Adventure Seekers 2024', status: 'Paused', reach: '12k', clicks: '450', ctr: '3.7%', spend: '$450' },
        { id: 3, name: 'Luxury Resorts Promo', status: 'Active', reach: '88k', clicks: '5.1k', ctr: '5.8%', spend: '$3,500' }
    ];

    return (
        <div className="advertise-manager">
            {/* AI Insight Banner */}
            <div className="ai-insight-banner glass">
                <div className="insight-icon">
                    <Sparkles size={24} color="#8b5cf6" />
                </div>
                <div className="insight-content">
                    <h4>AI Campaign Optimizer</h4>
                    <p>Your "Summer Bali Special" campaign is performing 25% better than average. We recommend increasing the budget by $200 to capture more weekend traffic.</p>
                </div>
                <button className="apply-btn primary">Apply Optimization</button>
            </div>

            <div className="section-header">
                <h2>Active Campaigns</h2>
                <button className="add-campaign-btn premium-gradient">
                    <Plus size={18} />
                    <span>Create Campaign</span>
                </button>
            </div>

            <div className="campaigns-list">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="campaign-card glass">
                        <div className="campaign-main">
                            <div className="campaign-info">
                                <h3>{campaign.name}</h3>
                                <span className={`status-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
                            </div>
                            <div className="campaign-stats">
                                <div className="mini-stat">
                                    <Eye size={14} />
                                    <span>{campaign.reach} Reach</span>
                                </div>
                                <div className="mini-stat">
                                    <MousePointer2 size={14} />
                                    <span>{campaign.clicks} Clicks</span>
                                </div>
                                <div className="mini-stat">
                                    <TrendingUp size={14} />
                                    <span>{campaign.ctr} CTR</span>
                                </div>
                            </div>
                        </div>
                        <div className="campaign-actions">
                            <div className="spend-info">
                                <span className="label">Total Spend</span>
                                <span className="value">{campaign.spend}</span>
                            </div>
                            <button className="icon-btn">
                                <BarChart size={18} />
                            </button>
                            <button className="icon-btn">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ad Placements Section */}
            <div className="ad-placements-section glass">
                <div className="section-header">
                    <h3>Available Placements</h3>
                    <p>Boost your visibility across the SeeNomad ecosystem.</p>
                </div>
                <div className="placements-grid">
                    <div className="placement-card">
                        <div className="placement-icon">🏠</div>
                        <h4>Home Page Hero</h4>
                        <p>Maximum visibility for new launches.</p>
                        <button className="book-btn">Book Now</button>
                    </div>
                    <div className="placement-card">
                        <div className="placement-icon">📍</div>
                        <h4>Destination Search</h4>
                        <p>Target travelers looking for specific cities.</p>
                        <button className="book-btn">Book Now</button>
                    </div>
                    <div className="placement-card">
                        <div className="placement-icon">📱</div>
                        <h4>Reels Interstitial</h4>
                        <p>High-engagement vertical video ads.</p>
                        <button className="book-btn">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertise;
