import React from 'react';
import {
    ArrowUpRight,
    Building2,
    CreditCard,
    Plus,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Zap,
    ShieldCheck
} from 'lucide-react';

const Payout = () => {
    const payoutMethods = [
        { id: 1, type: 'Bank Account', name: 'Chase Bank •••• 8812', status: 'Primary', icon: Building2 },
        { id: 2, type: 'PayPal', name: 'nomad.traveler@email.com', status: 'Active', icon: CreditCard },
    ];

    const payoutHistory = [
        { id: 1, amount: 2500, date: 'Oct 15, 2023', status: 'Completed', method: 'Chase Bank' },
        { id: 2, amount: 1200, date: 'Sep 30, 2023', status: 'Completed', method: 'Chase Bank' },
        { id: 3, amount: 850, date: 'Sep 15, 2023', status: 'Completed', method: 'PayPal' },
    ];

    return (
        <div className="payout-view">
            {/* Payout Status Tracker */}
            <div className="payout-tracker-banner glass">
                <div className="tracker-steps">
                    <div className="step completed">
                        <CheckCircle2 size={16} />
                        <span>Requested</span>
                    </div>
                    <div className="step active">
                        <Clock size={16} />
                        <span>Processing</span>
                    </div>
                    <div className="step">
                        <ArrowUpRight size={16} />
                        <span>Sent</span>
                    </div>
                </div>
                <div className="tracker-info">
                    <span className="info-label">Current Payout: $2,500.00</span>
                    <span className="info-eta">Estimated arrival: Oct 18</span>
                </div>
            </div>

            <div className="payout-grid">
                {/* Withdrawal Card */}
                <div className="withdrawal-card premium-gradient">
                    <div className="card-content">
                        <span className="label">Available for Withdrawal</span>
                        <h2 className="amount animate-count">$8,200.00</h2>
                        <div className="payout-hint">
                            <ShieldCheck size={14} />
                            <span>Verified & Secure</span>
                        </div>
                    </div>
                    <div className="withdrawal-actions">
                        <button className="withdraw-now-btn pulse">
                            <span>Instant Payout</span>
                            <Zap size={18} />
                        </button>
                        <button className="standard-withdraw-btn glass">Standard</button>
                    </div>
                </div>

                {/* Payout Methods */}
                <div className="payout-methods-section">
                    <div className="section-header">
                        <h3>Payout Methods</h3>
                        <button className="add-method-btn glass">
                            <Plus size={16} />
                            <span>Add New</span>
                        </button>
                    </div>
                    <div className="methods-list">
                        {payoutMethods.map((method) => (
                            <div key={method.id} className="method-item glass">
                                <div className="method-icon">
                                    <method.icon size={20} />
                                </div>
                                <div className="method-info">
                                    <span className="method-name">{method.name}</span>
                                    <span className="method-type">{method.type}</span>
                                </div>
                                <div className="method-status-group">
                                    {method.status === 'Primary' && <span className="primary-badge">Primary</span>}
                                    <ChevronRight size={16} className="chevron" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Payout Schedule / Info */}
            <section className="payout-info-banner glass">
                <div className="info-icon-wrapper">
                    <Clock size={20} className="clock-icon" />
                </div>
                <div className="info-content">
                    <h4>Automatic Payouts are ON</h4>
                    <p>Your balance will be automatically withdrawn to your primary bank account on the 1st and 15th of every month.</p>
                </div>
                <button className="configure-btn glass">Configure</button>
            </section>

            {/* Payout History */}
            <section className="payout-history">
                <div className="section-header">
                    <h3>Payout History</h3>
                    <button className="text-btn">Download Report</button>
                </div>
                <div className="history-list">
                    {payoutHistory.map((payout) => (
                        <div key={payout.id} className="history-item glass">
                            <div className="history-main">
                                <span className="history-date">{payout.date}</span>
                                <span className="history-method">{payout.method}</span>
                            </div>
                            <div className="history-amount-group">
                                <span className="history-amount">${payout.amount.toLocaleString()}</span>
                                <span className={`history-status ${payout.status.toLowerCase()}`}>
                                    <CheckCircle2 size={14} />
                                    {payout.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Payout;
