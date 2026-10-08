import React, { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Download,
    Filter,
    Wallet,
    CreditCard,
    Sparkles,
    Award,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../../store/toastStore';

const PAYOUT_HISTORY = [
    {
        id: 'PO-9482',
        date: 'Oct 04, 2026',
        source: 'Brand Partnership — Visit Portugal',
        method: 'Wise USD Account (••4821)',
        amount: 2800,
        status: 'Completed'
    },
    {
        id: 'PO-9451',
        date: 'Oct 01, 2026',
        source: 'Monthly Creator Subscriptions (364 members)',
        method: 'Nomad Wallet Instant',
        amount: 1820,
        status: 'Completed'
    },
    {
        id: 'PO-9419',
        date: 'Sep 28, 2026',
        source: 'Tips, SuperChats & Lisbon Playbook Sales',
        method: 'Stripe Express (••9012)',
        amount: 1460,
        status: 'Completed'
    },
    {
        id: 'PO-9499',
        date: 'Clears Oct 10, 2026',
        source: 'Affiliate Commissions — Stays & Co-Working',
        method: 'Nomad Wallet Instant',
        amount: 1120,
        status: 'Pending'
    }
];

const CreatorEarningsHub = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredPayouts = PAYOUT_HISTORY.filter(
        p => statusFilter === 'all' || p.status.toLowerCase() === statusFilter
    );

    return (
        <div className="bp-monetize-hub">
            {/* Earnings Overview Cards */}
            <div className="bp-monetize-summary-row three-col">
                <div className="bp-monetize-kpi-card primary-kpi">
                    <div className="kpi-top-row">
                        <span className="kpi-kicker">LIFETIME CREATOR EARNINGS</span>
                        <span className="bp-growth-pill">+31.4% YoY</span>
                    </div>
                    <div className="kpi-value-row">
                        <h2>$48,920.00</h2>
                    </div>
                    <p className="kpi-subtext">Top 3% Verified Travel Creator in Europe & SE Asia</p>
                </div>

                <div className="bp-monetize-kpi-card">
                    <div className="kpi-top-row">
                        <span className="kpi-kicker">AVAILABLE FOR PAYOUT</span>
                        <span className="bp-growth-pill">Ready</span>
                    </div>
                    <div className="kpi-value-row">
                        <h2>$3,850.00</h2>
                    </div>
                    <div className="kpi-action-row">
                        <button
                            type="button"
                            className="bp-action-btn-primary"
                            onClick={() => addToast('Transferred $3,850.00 to your connected bank account!', 'success')}
                        >
                            <Wallet size={15} />
                            <span>Withdraw Funds</span>
                        </button>
                    </div>
                </div>

                <div className="bp-monetize-kpi-card">
                    <div className="kpi-top-row">
                        <span className="kpi-kicker">PENDING CLEARANCE</span>
                        <span className="kpi-period">Clears in 3 days</span>
                    </div>
                    <div className="kpi-value-row">
                        <h2>$1,120.00</h2>
                    </div>
                    <div className="kpi-action-row">
                        <button
                            type="button"
                            className="bp-action-btn-outline"
                            onClick={() => navigate('/user/wallet')}
                        >
                            <CreditCard size={15} />
                            <span>Payout Methods</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Payout Ledger Table */}
            <section className="bp-weekly-chart-card">
                <div className="bp-chart-header">
                    <div>
                        <h3>Creator Earnings & Payout Ledger</h3>
                        <p>Verified revenue settlements, brand milestone releases, and tax-ready invoices</p>
                    </div>
                    <div className="bp-chart-controls">
                        {['all', 'completed', 'pending'].map(f => (
                            <button
                                key={f}
                                type="button"
                                className={`bp-segment-btn ${statusFilter === f ? 'active' : ''}`}
                                onClick={() => setStatusFilter(f)}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bp-ledger-list">
                    {filteredPayouts.map((row) => (
                        <div key={row.id} className="bp-ledger-item">
                            <div className="bp-ledger-left">
                                <div className={`bp-ledger-status-icon ${row.status.toLowerCase()}`}>
                                    {row.status === 'Completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                                </div>
                                <div>
                                    <h4>{row.source}</h4>
                                    <span className="bp-ledger-meta">
                                        {row.id} · {row.date} · {row.method}
                                    </span>
                                </div>
                            </div>
                            <div className="bp-ledger-right">
                                <span className="bp-ledger-amount">${row.amount.toLocaleString()}.00</span>
                                <span className={`bp-status-tag ${row.status.toLowerCase()}`}>
                                    {row.status}
                                </span>
                                <button
                                    type="button"
                                    className="bp-icon-square-btn"
                                    title="Download Invoice PDF"
                                    onClick={() => addToast(`Downloaded invoice ${row.id}.pdf`, 'info')}
                                >
                                    <Download size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CreatorEarningsHub;
