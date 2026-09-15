import React from 'react';
import {
    Share2,
    Link as LinkIcon,
    Users,
    DollarSign,
    Copy,
    ExternalLink,
    TrendingUp,
    Award
} from 'lucide-react';

const Affiliate = () => {
    const affiliateStats = [
        { label: 'Total Referrals', value: '850', icon: Users, color: '#3b82f6' },
        { label: 'Pending Commission', value: '$1,240', icon: DollarSign, color: '#10b981' },
        { label: 'Conversion Rate', value: '5.8%', icon: TrendingUp, color: '#8b5cf6' },
        { label: 'Affiliate Rank', value: '#12', icon: Award, color: '#f59e0b' }
    ];

    const topAffiliates = [
        { id: 1, name: 'TravelGuru', referrals: 1240, earnings: '$8,500', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'NomadLife', referrals: 980, earnings: '$6,200', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Seenomad', referrals: 750, earnings: '$4,800', avatar: 'https://i.pravatar.cc/150?u=3' }
    ];

    return (
        <div className="affiliate-center">
            {/* Affiliate Stats */}
            <div className="affiliate-stats-grid">
                {affiliateStats.map((stat, idx) => (
                    <div key={idx} className="affiliate-stat-card glass">
                        <div className="stat-icon-circle" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <stat.icon size={20} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <h3 className="stat-value">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Referral Link Section */}
            <div className="referral-section glass">
                <div className="section-header">
                    <h3>Your Referral Link</h3>
                    <p>Share this link and earn 5% commission on every booking.</p>
                </div>
                <div className="link-copy-box">
                    <div className="link-input">
                        <LinkIcon size={18} />
                        <input type="text" readOnly value="https://seenomad.com/ref/partner123" />
                    </div>
                    <button className="copy-btn">
                        <Copy size={18} />
                        <span>Copy Link</span>
                    </button>
                </div>
                <div className="share-options">
                    <button className="share-btn twitter">Twitter</button>
                    <button className="share-btn facebook">Facebook</button>
                    <button className="share-btn whatsapp">WhatsApp</button>
                </div>
            </div>

            <div className="affiliate-bottom-grid">
                {/* Top Affiliates */}
                <div className="top-affiliates-section glass">
                    <div className="section-header">
                        <h3>Top Affiliates</h3>
                        <button className="text-btn">View Leaderboard</button>
                    </div>
                    <div className="affiliate-list">
                        {topAffiliates.map(affiliate => (
                            <div key={affiliate.id} className="affiliate-item">
                                <div className="affiliate-user">
                                    <img src={affiliate.avatar} alt={affiliate.name} />
                                    <div className="user-info">
                                        <h4>{affiliate.name}</h4>
                                        <span>{affiliate.referrals} referrals</span>
                                    </div>
                                </div>
                                <div className="affiliate-earnings">
                                    {affiliate.earnings}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promotional Materials */}
                <div className="promo-materials-section glass">
                    <div className="section-header">
                        <h3>Promotional Materials</h3>
                    </div>
                    <div className="materials-list">
                        <div className="material-item">
                            <div className="material-icon">🖼️</div>
                            <div className="material-info">
                                <h4>Banner Set A</h4>
                                <p>Standard web banners (728x90, 300x250)</p>
                            </div>
                            <button className="download-btn">
                                <ExternalLink size={14} />
                            </button>
                        </div>
                        <div className="material-item">
                            <div className="material-icon">📱</div>
                            <div className="material-info">
                                <h4>Social Media Kit</h4>
                                <p>Instagram & Facebook story templates</p>
                            </div>
                            <button className="download-btn">
                                <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Affiliate;
