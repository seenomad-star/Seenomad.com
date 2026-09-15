import React from 'react';
import { Users, TrendingUp, Sparkles } from 'lucide-react';
import '../../styles/popular/PopularCommunitiesWidget.css';

const PopularCommunitiesWidget = () => {
    const communities = [
        { name: 'Bali Collab Hub', active: '12 open projects', growth: '+15%', trending: true, type: 'Collab' },
        { name: 'Lisbon Fixers', active: '8 bounties active', growth: '+8%', trending: false, type: 'Service' },
        { name: 'Tokyo Studio', active: '15 slots left', growth: '+20%', trending: true, type: 'Studio' },
        { name: 'Seoul Tech nomads', active: '5 meetups today', growth: '+12%', trending: true, type: 'Social' },
        { name: 'Medellín Market', active: '42 listings', growth: '+5%', trending: false, type: 'Market' },
    ];

    return (
        <div className="popular-communities-widget shadow-premium">
            <div className="widget-header">
                <Sparkles size={18} className="text-purple" />
                <h3>Global Marketplaces</h3>
            </div>
            <div className="communities-list">
                {communities.map((community, index) => (
                    <div key={index} className="community-item-innovative">
                        <div className="community-info">
                            <div className={`community-type-tag ${community.type.toLowerCase()}`}>
                                {community.type}
                            </div>
                            <div className="community-details">
                                <span className="community-name-bold">{community.name}</span>
                                <div className="community-stats">
                                    <span className="active-count">{community.active}</span>
                                    {community.trending && (
                                        <span className="growth-pulse">
                                            <TrendingUp size={10} />
                                            {community.growth}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="join-marketplace-btn">Enter</button>
                    </div>
                ))}
            </div>
            <button className="see-more-btn">Explore Local Bounties</button>
        </div>
    );
};

export default PopularCommunitiesWidget;
