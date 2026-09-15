import React from 'react';
import {
    Gift,
    Clock,
    CheckCircle2,
    ArrowRight,
    ShoppingBag,
    Plane,
    Hotel
} from 'lucide-react';

const Cashbacks = () => {
    const pendingCashbacks = [
        { id: 1, amount: 45.50, source: 'Booking.com', date: 'Oct 20, 2023', status: 'Pending', icon: Hotel },
        { id: 2, amount: 12.00, source: 'Expedia', date: 'Oct 18, 2023', status: 'Processing', icon: Plane },
    ];

    const processedCashbacks = [
        { id: 1, amount: 25.00, source: 'Amazon Travel', date: 'Sep 25, 2023', status: 'Completed', icon: ShoppingBag },
        { id: 2, amount: 60.00, source: 'Marriott', date: 'Sep 10, 2023', status: 'Completed', icon: Hotel },
    ];

    return (
        <div className="cashbacks-view">
            {/* Claimable Highlight */}
            <div className="claimable-banner premium-gradient pulse">
                <div className="claim-icon">✨</div>
                <div className="claim-info">
                    <span className="claim-label">You have $57.50 ready to claim!</span>
                    <span className="claim-desc">Processed cashbacks are ready to be added to your balance.</span>
                </div>
                <button className="claim-now-btn glass">Claim All</button>
            </div>

            <div className="cashbacks-header">
                <div className="cashback-summary-card glass">
                    <div className="summary-item">
                        <span className="label">Pending Cashback</span>
                        <h3 className="amount">$57.50</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="summary-item">
                        <span className="label">Total Processed</span>
                        <h3 className="amount">$1,240.00</h3>
                    </div>
                </div>
                <div className="cashback-promo glass">
                    <div className="promo-icon-wrapper">
                        <Gift size={24} className="gift-icon" />
                    </div>
                    <div className="promo-text">
                        <h4>Get up to 10% Cashback</h4>
                        <p>Book your next trip with our partners and earn more.</p>
                    </div>
                    <button className="explore-btn primary">Explore Partners</button>
                </div>
            </div>

            <section className="pending-cashbacks">
                <div className="section-header">
                    <h3>Pending Cashbacks</h3>
                    <Clock size={18} />
                </div>
                <div className="cashback-list">
                    {pendingCashbacks.map((item) => (
                        <div key={item.id} className="cashback-item pending glass">
                            <div className="item-icon-wrapper">
                                <item.icon size={20} />
                            </div>
                            <div className="item-details">
                                <span className="source">{item.source}</span>
                                <span className="date">{item.date}</span>
                            </div>
                            <div className="item-status">
                                <span className="amount">${item.amount.toFixed(2)}</span>
                                <span className="status-label">{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="processed-cashbacks">
                <div className="section-header">
                    <h3>Processed Cashbacks</h3>
                    <CheckCircle2 size={18} />
                </div>
                <div className="cashback-list">
                    {processedCashbacks.map((item) => (
                        <div key={item.id} className="cashback-item completed glass">
                            <div className="item-icon-wrapper">
                                <item.icon size={20} />
                            </div>
                            <div className="item-details">
                                <span className="source">{item.source}</span>
                                <span className="date">{item.date}</span>
                            </div>
                            <div className="item-status">
                                <span className="amount">${item.amount.toFixed(2)}</span>
                                <span className="status-label">Added to Balance</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Cashbacks;
