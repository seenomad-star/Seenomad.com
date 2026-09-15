import React from 'react';
import { Gift, Coins } from 'lucide-react';

const RewardsView = ({ coins, rewards }) => (
    <div className="rewards-view">
        <div className="rewards-header-v2">
            <div className="coins-balance-card">
                <div className="c-label">Your Nomad Coins</div>
                <div className="c-value">
                    <Coins size={32} color="#f59e0b" />
                    <span>{coins}</span>
                </div>
                <button className="c-earn-more">Earn More</button>
            </div>
            <div className="rewards-intro">
                <h2><Gift size={24} /> Reward Marketplace</h2>
                <p>Redeem your Nomad Coins for exclusive travel vouchers and discounts.</p>
            </div>
        </div>

        <div className="rewards-categories">
            <button className="cat-pill active">All Rewards</button>
            <button className="cat-pill">Vouchers</button>
            <button className="cat-pill">Hotels</button>
            <button className="cat-pill">Flights</button>
            <button className="cat-pill">Gear</button>
        </div>

        <div className="rewards-grid-v2">
            {rewards.map(r => (
                <div key={r.id} className="reward-card-v3">
                    <div className="r-image-container">
                        <img src={r.image} alt={r.name} />
                        <div className="r-tag">{r.category}</div>
                    </div>
                    <div className="r-content">
                        <h3>{r.name}</h3>
                        <p>{r.description}</p>
                        <div className="r-footer">
                            <div className="r-cost">
                                <Coins size={14} color="#f59e0b" />
                                <span>{r.cost} Coins</span>
                            </div>
                            <button className="r-redeem-btn">Redeem</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default RewardsView;
