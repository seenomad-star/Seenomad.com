import React, { useState } from 'react';
import { Crown, Star, Award, Gift, Zap, TrendingUp, Plane, Coffee } from 'lucide-react';
import '../../styles/LoyaltyRewards.css';

const LoyaltyRewardsDashboard = () => {
    const [coins] = useState(14500);
    const [tier] = useState('gold'); // silver, gold, platinum
    
    const maxCoins = 25000;
    const progress = Math.min((coins / maxCoins) * 100, 100);

    const upcomingPerks = [
        { title: 'Free Global Lounge Access', pointsRequired: 15000, icon: Coffee },
        { title: 'Complimentary Flight Upgrade', pointsRequired: 20000, icon: Plane },
        { title: 'Dedicated 24/7 Concierge', pointsRequired: 25000, icon: Crown }
    ];

    const currentBenefits = [
        { title: '1.5x Earn Rate on Bookings', icon: TrendingUp },
        { title: 'No Foreign Transaction Fees', icon: Zap },
        { title: 'Priority Customer Support', icon: Star },
        { title: '$50 Annual Travel Credit', icon: Gift }
    ];

    return (
        <div className="loyalty-rewards-container">
            <div className="lr-header">
                <div className="lr-tier-badge">
                    <Crown size={24} className={`tier-icon ${tier}`} />
                    <h2>{tier.toUpperCase()} MEMBER</h2>
                </div>
                <div className="lr-coins-display">
                    <div className="coin-value">{coins.toLocaleString()}</div>
                    <span>Traveluh Coins</span>
                </div>
            </div>

            <div className="lr-progress-section">
                <div className="progress-labels">
                    <span>{coins.toLocaleString()} TC</span>
                    <span>{maxCoins.toLocaleString()} TC to Platinum</span>
                </div>
                <div className="progress-bar-bg">
                    <div className={`progress-bar-fill ${tier}`} style={{ width: `${progress}%` }}>
                        <div className="progress-glow"></div>
                    </div>
                </div>
                <p className="progress-hint">You are {(maxCoins - coins).toLocaleString()} coins away from unlocking Platinum status.</p>
            </div>

            <div className="lr-benefits-grid">
                <div className="lr-card current-perks">
                    <h3><Star size={18} color="#F59E0B" /> Active Benefits</h3>
                    <div className="perk-list">
                        {currentBenefits.map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <div className="perk-item active" key={i}>
                                    <div className="perk-icon"><Icon size={16} /></div>
                                    <span>{benefit.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="lr-card upcoming-perks">
                    <h3><Award size={18} color="#A855F7" /> Next Tier Rewards</h3>
                    <div className="perk-list">
                        {upcomingPerks.map((perk, i) => {
                            const Icon = perk.icon;
                            const isUnlocked = coins >= perk.pointsRequired;
                            return (
                                <div className={`perk-item ${isUnlocked ? 'active' : 'locked'}`} key={i}>
                                    <div className="perk-icon"><Icon size={16} /></div>
                                    <div className="perk-info">
                                        <h4>{perk.title}</h4>
                                        {!isUnlocked && <span>Unlocks at {perk.pointsRequired.toLocaleString()} TC</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <div className="lr-earn-cta">
                <div className="earn-content">
                    <h3>Earn 5,000 Coins Today!</h3>
                    <p>Refer a friend to the Traveluh OS or book your next International Flight through the platform to instantly receive up to 5,000 Traveluh Coins.</p>
                </div>
                <button className="earn-btn">View Earning Opportunities</button>
            </div>
        </div>
    );
};

export default LoyaltyRewardsDashboard;
