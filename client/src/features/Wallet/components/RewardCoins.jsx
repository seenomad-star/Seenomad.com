import React from 'react';
import {
    Coins,
    TrendingUp,
    ShoppingBag,
    ArrowRight,
    Gift,
    Star,
    Zap
} from 'lucide-react';

const RewardCoins = () => {
    const coinHistory = [
        { id: 1, amount: 500, label: 'Daily Login Streak', date: 'Oct 24, 2023', type: 'earn' },
        { id: 2, amount: 1200, label: 'Completed "Bali Explorer" Quest', date: 'Oct 22, 2023', type: 'earn' },
        { id: 3, amount: 2000, label: 'Redeemed: $20 Amazon Voucher', date: 'Oct 20, 2023', type: 'spend' },
    ];

    const redemptionOptions = [
        { id: 1, label: '$10 Travel Credit', cost: 1000, icon: Gift },
        { id: 2, label: 'Premium Badge', cost: 500, icon: Star },
        { id: 3, label: '2x XP Booster', cost: 750, icon: Zap },
    ];

    return (
        <div className="reward-coins-view">
            {/* Coin Shop Banner */}
            <div className="coin-shop-banner premium-gradient pulse">
                <div className="shop-icon">🏪</div>
                <div className="shop-text">
                    <h4>Welcome to the Nomad Shop</h4>
                    <p>Redeem your coins for exclusive travel perks and vouchers.</p>
                </div>
                <button className="shop-btn glass">Enter Shop</button>
            </div>

            <div className="coins-header">
                <div className="coins-balance-card glass">
                    <div className="coin-icon-large-wrapper">
                        <Coins size={48} className="coin-icon-glow" />
                    </div>
                    <div className="balance-info">
                        <span className="label">Nomad Coins Balance</span>
                        <h2 className="amount animate-count">12,580</h2>
                        <div className="value-estimate glass">
                            <span>≈ $125.80 USD</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="redeem-section">
                <div className="section-header">
                    <h3>Redeem Coins</h3>
                    <button className="text-btn">View All Rewards</button>
                </div>
                <div className="redemption-grid">
                    {redemptionOptions.map((option) => (
                        <div key={option.id} className="redeem-card glass">
                            <div className="option-icon-wrapper">
                                <option.icon size={24} />
                            </div>
                            <h4 className="option-label">{option.label}</h4>
                            <div className="option-cost">
                                <Coins size={16} />
                                <span>{option.cost} Coins</span>
                            </div>
                            <button className="redeem-btn primary pulse">Redeem</button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="coin-history">
                <div className="section-header">
                    <h3>Coin History</h3>
                    <TrendingUp size={18} />
                </div>
                <div className="history-list">
                    {coinHistory.map((item) => (
                        <div key={item.id} className="history-item glass">
                            <div className="item-details">
                                <span className="item-label">{item.label}</span>
                                <span className="item-date">{item.date}</span>
                            </div>
                            <div className={`item-amount ${item.type}`}>
                                <span>{item.type === 'earn' ? '+' : '-'}{item.amount}</span>
                                <Coins size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RewardCoins;
