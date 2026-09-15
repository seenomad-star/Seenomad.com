import React from 'react';
import {
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Building2,
    Wallet as WalletIcon,
    ChevronRight,
    Plus
} from 'lucide-react';

const Balance = () => {
    const recentTransactions = [
        { id: 1, type: 'credit', amount: 1200, label: 'Booking Reward', date: 'Oct 24, 2023', status: 'Completed', icon: '🎁' },
        { id: 2, type: 'debit', amount: 450, label: 'Hotel Booking - Paris', date: 'Oct 22, 2023', status: 'Completed', icon: '🏨' },
        { id: 3, type: 'credit', amount: 2500, label: 'Guide Earnings', date: 'Oct 20, 2023', status: 'Completed', icon: '🗺️' },
        { id: 4, type: 'debit', amount: 150, label: 'Flight Insurance', date: 'Oct 18, 2023', status: 'Completed', icon: '🛡️' },
    ];

    return (
        <div className="balance-view">
            {/* Savings Goal Progress */}
            <div className="savings-goal-banner">
                <div className="goal-info">
                    <span className="goal-label">Next Trip: Bali 🏝️</span>
                    <span className="goal-progress">75% Saved</span>
                </div>
                <div className="goal-progress-bar">
                    <div className="goal-fill" style={{ width: '75%' }}></div>
                </div>
            </div>

            <div className="balance-grid">
                {/* Main Balance Card */}
                <div className="main-balance-card premium-gradient">
                    <div className="card-header">
                        <div className="label-group">
                            <span className="label">Total Balance</span>
                            <h2 className="amount animate-count">$12,450.00</h2>
                        </div>
                        <div className="icon-circle glass">
                            <WalletIcon size={24} />
                        </div>
                    </div>
                    <div className="card-stats">
                        <div className="stat-item">
                            <span className="stat-label">Available</span>
                            <span className="stat-value">$8,200.00</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Pending</span>
                            <span className="stat-value">$4,250.00</span>
                        </div>
                    </div>
                    <div className="card-actions">
                        <button className="action-btn primary pulse">
                            <Plus size={18} />
                            <span>Add Money</span>
                        </button>
                        <button className="action-btn secondary glass">
                            <ArrowUpRight size={18} />
                            <span>Withdraw</span>
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats-group">
                    <div className="mini-stat-card glass">
                        <div className="mini-icon income">
                            <ArrowDownLeft size={20} />
                        </div>
                        <div className="mini-info">
                            <span className="mini-label">Monthly Income</span>
                            <span className="mini-value">+$3,240.00</span>
                        </div>
                    </div>
                    <div className="mini-stat-card glass">
                        <div className="mini-icon expense">
                            <ArrowUpRight size={20} />
                        </div>
                        <div className="mini-info">
                            <span className="mini-label">Monthly Spent</span>
                            <span className="mini-value">-$1,120.00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Streak Rewards */}
            <section className="streak-rewards glass">
                <div className="streak-header">
                    <h3>Daily Streak Rewards</h3>
                    <span className="streak-day">Day 12</span>
                </div>
                <div className="streak-days-row">
                    {[10, 11, 12, 13, 14].map((day) => (
                        <div key={day} className={`streak-day-box ${day <= 12 ? 'completed' : ''} ${day === 12 ? 'active' : ''}`}>
                            <span className="day-num">{day}</span>
                            <span className="day-reward">{day === 14 ? '🎁' : '🪙'}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Linked Accounts */}
            <section className="linked-accounts">
                <div className="section-header">
                    <h3>Linked Accounts</h3>
                    <button className="text-btn">Manage</button>
                </div>
                <div className="accounts-list">
                    <div className="account-item glass">
                        <div className="account-icon">
                            <CreditCard size={20} />
                        </div>
                        <div className="account-info">
                            <span className="account-name">Visa Card •••• 4242</span>
                            <span className="account-type">Primary Payment Method</span>
                        </div>
                        <ChevronRight size={18} className="chevron" />
                    </div>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="recent-activity">
                <div className="section-header">
                    <h3>Recent Activity</h3>
                    <button className="text-btn">View All</button>
                </div>
                <div className="transactions-list">
                    {recentTransactions.map((tx) => (
                        <div key={tx.id} className="transaction-item glass">
                            <div className="tx-icon-emoji">{tx.icon}</div>
                            <div className="tx-details">
                                <span className="tx-label">{tx.label}</span>
                                <span className="tx-date">{tx.date}</span>
                            </div>
                            <div className="tx-amount-group">
                                <span className={`tx-amount ${tx.type}`}>
                                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                </span>
                                <span className="tx-status">{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Balance;
