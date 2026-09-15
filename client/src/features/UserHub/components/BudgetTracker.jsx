import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    DollarSign, CreditCard, PieChart, TrendingUp, 
    ArrowRight, AlertCircle, Globe, Wallet, Calendar
} from 'lucide-react';
import '../../../styles/NomadFeatures.css';

const BudgetTracker = () => {
    const [currency, setCurrency] = useState('USD');
    const expenses = [
        { id: 1, category: 'Accommodation', amount: 850, icon: <Globe size={18} />, color: '#6366F1' },
        { id: 2, category: 'Food & Dining', amount: 420, icon: <AlertCircle size={18} />, color: '#F59E0B' },
        { id: 3, category: 'Transport', amount: 120, icon: <TrendingUp size={18} />, color: '#10B981' },
        { id: 4, category: 'Entertainment', amount: 200, icon: <CreditCard size={18} />, color: '#EC4899' }
    ];

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const budget = 2000;

    return (
        <div className="bt-dashboard">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">AI Budgeting & Expenses</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Multi-currency tracking for Nomad life</p>
                </div>
                <div className="bt-currency-toggle">
                    {['USD', 'EUR', 'IDR'].map(c => (
                        <button 
                            key={c} 
                            className={`bt-currency-btn ${currency === c ? 'active' : ''}`}
                            onClick={() => setCurrency(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bt-stats-grid">
                <div className="bt-stat-card">
                    <span className="bt-stat-label">Total Spent</span>
                    <div className="bt-stat-value">
                        ${totalSpent}
                        <span className="bt-stat-change pos">↑ 12%</span>
                    </div>
                </div>
                <div className="bt-stat-card">
                    <span className="bt-stat-label">Remaining</span>
                    <div className="bt-stat-value" style={{ color: '#10B981' }}>
                        ${budget - totalSpent}
                    </div>
                </div>
                <div className="bt-stat-card">
                    <span className="bt-stat-label">Daily Avg</span>
                    <div className="bt-stat-value">
                        ${(totalSpent / 24).toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="ai-insight-card" style={{ marginBottom: '1.5rem', background: 'rgba(99,102,241,0.05)', border: '1px dashed #6366F1' }}>
                <div className="card-header">
                    <AlertCircle size={18} style={{ color: '#6366F1' }} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>AI Budget Alert</span>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    You've spent **85% of your food budget** for Bali this month. Consider switching to local warungs to save ~$150. 🍜
                </p>
            </div>

            <div className="bt-category-list">
                {expenses.map(ex => (
                    <div key={ex.id} className="bt-cat-item">
                        <div className="bt-cat-info">
                            <div className="bt-cat-icon" style={{ background: `${ex.color}20`, color: ex.color }}>
                                {ex.icon}
                            </div>
                            <span className="bt-cat-name">{ex.category}</span>
                        </div>
                        <span className="bt-cat-amount">${ex.amount}</span>
                    </div>
                ))}
            </div>

            <button className="primary-post-btn" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                <PieChart size={18} />
                <span>View Full Financial Report</span>
            </button>
        </div>
    );
};

export default BudgetTracker;
