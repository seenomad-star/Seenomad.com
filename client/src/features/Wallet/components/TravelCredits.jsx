import React from 'react';
import {
    CreditCard,
    Calendar,
    Info,
    ChevronRight,
    History,
    Tag,
    AlertTriangle,
    Share2
} from 'lucide-react';

const TravelCredits = () => {
    const activeCredits = [
        { id: 1, amount: 250, label: 'Early Bird Bonus', expiry: 'Dec 31, 2023', code: 'EB2023', urgency: false },
        { id: 2, amount: 100, label: 'Referral Credit', expiry: 'Nov 15, 2023', code: 'REF100', urgency: true },
    ];

    const creditHistory = [
        { id: 1, amount: 50, label: 'Review Reward', date: 'Oct 10, 2023', action: 'Earned' },
        { id: 2, amount: 200, label: 'Flight Booking', date: 'Oct 05, 2023', action: 'Used' },
    ];

    return (
        <div className="travel-credits-view">
            {/* Viral Hook Banner */}
            <div className="viral-earn-banner premium-gradient">
                <div className="earn-icon">📢</div>
                <div className="earn-text">
                    <h4>Earn $50 for every friend!</h4>
                    <p>Share your code and get credits when they book.</p>
                </div>
                <button className="share-btn glass">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>

            <div className="credits-header">
                <div className="total-credits-card glass">
                    <div className="card-info">
                        <span className="label">Total Travel Credits</span>
                        <h2 className="amount animate-count">$350.00</h2>
                    </div>
                    <div className="card-icon-wrapper">
                        <CreditCard size={32} className="credit-icon" />
                    </div>
                </div>
            </div>

            <section className="active-credits">
                <div className="section-header">
                    <h3>Active Credits</h3>
                    <button className="text-btn">How to earn more?</button>
                </div>
                <div className="credits-list">
                    {activeCredits.map((credit) => (
                        <div key={credit.id} className={`credit-card-item glass ${credit.urgency ? 'urgent' : ''}`}>
                            {credit.urgency && (
                                <div className="urgency-badge">
                                    <AlertTriangle size={12} />
                                    <span>Expiring Soon!</span>
                                </div>
                            )}
                            <div className="credit-main">
                                <div className="credit-tag glass">
                                    <Tag size={16} />
                                    <span>{credit.code}</span>
                                </div>
                                <h4 className="credit-label">{credit.label}</h4>
                                <div className="credit-expiry">
                                    <Calendar size={14} />
                                    <span>Expires on {credit.expiry}</span>
                                </div>
                            </div>
                            <div className="credit-value">
                                <span className="val">${credit.amount}</span>
                                <button className="use-btn primary pulse">Use Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="credit-history">
                <div className="section-header">
                    <h3>Credit History</h3>
                    <History size={18} />
                </div>
                <div className="history-list">
                    {creditHistory.map((item) => (
                        <div key={item.id} className="history-item glass">
                            <div className="item-details">
                                <span className="item-label">{item.label}</span>
                                <span className="item-date">{item.date}</span>
                            </div>
                            <div className="item-action">
                                <span className={`action-type ${item.action.toLowerCase()}`}>{item.action}</span>
                                <span className={`action-amount ${item.action.toLowerCase()}`}>
                                    {item.action === 'Earned' ? '+' : '-'}${item.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TravelCredits;
