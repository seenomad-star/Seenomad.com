import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    ChevronRight,
    Calendar,
    MoreHorizontal,
    BrainCircuit,
    Sparkles
} from 'lucide-react';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const transactions = [
        { id: 1, type: 'credit', amount: 1200, label: 'Booking Reward', date: 'Oct 24, 2023', category: 'Rewards', status: 'Completed', icon: '🎁' },
        { id: 2, type: 'debit', amount: 450, label: 'Hotel Booking - Paris', date: 'Oct 22, 2023', category: 'Travel', status: 'Completed', icon: '🏨' },
        { id: 3, type: 'credit', amount: 2500, label: 'Guide Earnings', date: 'Oct 20, 2023', category: 'Earnings', status: 'Completed', icon: '🗺️' },
        { id: 4, type: 'debit', amount: 150, label: 'Flight Insurance', date: 'Oct 18, 2023', category: 'Travel', status: 'Completed', icon: '🛡️' },
        { id: 5, type: 'debit', amount: 2500, label: 'Withdrawal to Bank', date: 'Oct 15, 2023', category: 'Payout', status: 'Completed', icon: '🏦' },
        { id: 6, type: 'credit', amount: 50, label: 'Referral Bonus', date: 'Oct 12, 2023', category: 'Rewards', status: 'Completed', icon: '📢' },
    ];

    return (
        <div className="payment-history-view">
            {/* AI Spending Insights */}
            <div className="ai-insights-banner premium-gradient">
                <div className="insight-icon">
                    <BrainCircuit size={24} />
                </div>
                <div className="insight-content">
                    <div className="insight-header">
                        <h4>AI Spending Insights</h4>
                        <span className="sparkle-badge">
                            <Sparkles size={12} />
                            <span>Smart Analysis</span>
                        </span>
                    </div>
                    <p>You've saved 15% more this month compared to September. Great job on optimizing your travel expenses!</p>
                </div>
                <button className="view-report-btn glass">Full Report</button>
            </div>

            {/* Filters & Search */}
            <div className="history-controls glass">
                <div className="search-bar glass">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-actions">
                    <button className="control-btn glass">
                        <Calendar size={18} />
                        <span>Range</span>
                    </button>
                    <button className="control-btn glass">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                    <button className="control-btn primary pulse">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Transactions List (Mobile-friendly cards) */}
            <div className="transactions-list">
                {transactions.map((tx) => (
                    <div key={tx.id} className="transaction-card glass">
                        <div className="tx-main-info">
                            <div className="tx-icon-emoji">{tx.icon}</div>
                            <div className="tx-details">
                                <span className="tx-label">{tx.label}</span>
                                <div className="tx-meta">
                                    <span className="tx-category">{tx.category}</span>
                                    <span className="tx-dot">•</span>
                                    <span className="tx-date">{tx.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="tx-amount-status">
                            <span className={`tx-amount ${tx.type}`}>
                                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </span>
                            <span className={`status-pill ${tx.status.toLowerCase()}`}>{tx.status}</span>
                        </div>
                        <button className="tx-more-btn">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination glass">
                <button className="page-btn disabled">Prev</button>
                <div className="page-numbers">
                    <button className="page-num active">1</button>
                    <button className="page-num">2</button>
                    <button className="page-num">3</button>
                </div>
                <button className="page-btn">Next</button>
            </div>
        </div>
    );
};

export default PaymentHistory;
