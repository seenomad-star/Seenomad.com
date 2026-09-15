import React from 'react';
import {
    Trophy,
    Award,
    TrendingUp,
    Users,
    Star,
    Crown,
    Medal
} from 'lucide-react';

const Leaderboard = () => {
    const topPartners = [
        { id: 1, name: 'Global Travel Solutions', type: 'Agency', revenue: '$1.2M', growth: '+25%', rating: 4.9, avatar: 'G' },
        { id: 2, name: 'EcoNomad Stays', type: 'Hotel Group', revenue: '$850k', growth: '+18%', rating: 4.8, avatar: 'E' },
        { id: 3, name: 'SkyHigh Airlines', type: 'Airline', revenue: '$720k', growth: '+12%', rating: 4.7, avatar: 'S' },
        { id: 4, name: 'Adventure Co.', type: 'Tour Operator', revenue: '$650k', growth: '+30%', rating: 4.9, avatar: 'A' },
        { id: 5, name: 'Urban Retreats', type: 'Boutique Hotels', revenue: '$580k', growth: '+15%', rating: 4.6, avatar: 'U' }
    ];

    return (
        <div className="partner-leaderboard">
            <div className="view-header">
                <div className="header-content">
                    <h2><Trophy size={24} color="#f59e0b" /> Partner Leaderboard</h2>
                    <p>Top performing partners in the SeeNomad ecosystem this month.</p>
                </div>
                <div className="view-filters">
                    <button className="filter-pill active">Global</button>
                    <button className="filter-pill">By Category</button>
                    <button className="filter-pill">By Growth</button>
                </div>
            </div>

            {/* Podium Section */}
            <div className="podium-container">
                <div className="podium-item second">
                    <div className="podium-avatar glass">
                        <span>{topPartners[1].avatar}</span>
                        <div className="rank-badge">2</div>
                    </div>
                    <div className="podium-info">
                        <h4>{topPartners[1].name}</h4>
                        <p>{topPartners[1].revenue}</p>
                    </div>
                </div>
                <div className="podium-item first">
                    <div className="podium-avatar glass">
                        <span>{topPartners[0].avatar}</span>
                        <div className="rank-badge">1</div>
                        <Crown size={24} className="crown-icon" />
                    </div>
                    <div className="podium-info">
                        <h4>{topPartners[0].name}</h4>
                        <p>{topPartners[0].revenue}</p>
                    </div>
                </div>
                <div className="podium-item third">
                    <div className="podium-avatar glass">
                        <span>{topPartners[2].avatar}</span>
                        <div className="rank-badge">3</div>
                    </div>
                    <div className="podium-info">
                        <h4>{topPartners[2].name}</h4>
                        <p>{topPartners[2].revenue}</p>
                    </div>
                </div>
            </div>

            {/* Ranking Table */}
            <div className="ranking-table-container glass">
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Partner</th>
                            <th>Category</th>
                            <th>Revenue</th>
                            <th>Growth</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topPartners.map((partner, idx) => (
                            <tr key={partner.id}>
                                <td className="rank-cell">
                                    {idx < 3 ? <Medal size={18} className={`medal-${idx + 1}`} /> : `#${idx + 1}`}
                                </td>
                                <td>
                                    <div className="partner-cell">
                                        <div className="mini-avatar">{partner.avatar}</div>
                                        <span>{partner.name}</span>
                                    </div>
                                </td>
                                <td>{partner.type}</td>
                                <td className="revenue-cell">{partner.revenue}</td>
                                <td className="growth-cell positive">{partner.growth}</td>
                                <td>
                                    <div className="rating-cell">
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                        <span>{partner.rating}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Rank Sticky */}
            <div className="user-rank-sticky glass">
                <div className="u-rank-info">
                    <div className="u-rank-badge">#12</div>
                    <div className="u-partner-info">
                        <div className="mini-avatar">Y</div>
                        <span>Your Business</span>
                    </div>
                </div>
                <div className="u-stats">
                    <div className="u-stat">
                        <TrendingUp size={14} />
                        <span>+15% Growth</span>
                    </div>
                    <div className="u-stat">
                        <Award size={14} />
                        <span>Gold Tier</span>
                    </div>
                </div>
                <button className="u-boost-btn premium-gradient">Boost Rank</button>
            </div>
        </div>
    );
};

export default Leaderboard;
