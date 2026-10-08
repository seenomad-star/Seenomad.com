import React, { useState } from 'react';
import {
    Heart,
    Users,
    Star,
    BookOpen,
    Globe,
    Video,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Check,
    Sparkles,
    Plus,
    Calendar,
    Download,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';

const WEEKLY_EARNINGS = [
    { day: 'Mon', amount: 280 },
    { day: 'Tue', amount: 420 },
    { day: 'Wed', amount: 310 },
    { day: 'Thu', amount: 580 },
    { day: 'Fri', amount: 720 },
    { day: 'Sat', amount: 890 },
    { day: 'Sun', amount: 650 }
];

const INITIAL_STREAMS = [
    {
        id: 'tips',
        title: 'Tips & Donations',
        description: 'Let fans tip you for great travel content',
        amount: 2340,
        growth: '+18%',
        icon: Heart,
        iconColor: '#ef4444',
        iconBg: 'rgba(239, 68, 68, 0.12)',
        active: true,
        subscribersOrCount: '184 supporters this month',
        ctaLabel: 'Configure Tip Jar'
    },
    {
        id: 'subscriptions',
        title: 'Subscriptions',
        description: 'Monthly subscribers for exclusive content',
        amount: 1820,
        growth: '+32%',
        icon: Users,
        iconColor: '#8b5cf6',
        iconBg: 'rgba(139, 92, 246, 0.12)',
        active: true,
        subscribersOrCount: '364 VIP members ($4.99/mo)',
        ctaLabel: 'Manage Tiers'
    },
    {
        id: 'partnerships',
        title: 'Brand Partnerships',
        description: 'Sponsored posts & destination features',
        amount: 5600,
        growth: '+12%',
        icon: Star,
        iconColor: '#f59e0b',
        iconBg: 'rgba(245, 158, 11, 0.12)',
        active: true,
        subscribersOrCount: '4 active tourism board deals',
        ctaLabel: 'View Briefs'
    },
    {
        id: 'digital-products',
        title: 'Digital Products',
        description: 'Sell travel guides, itineraries & presets',
        amount: 940,
        growth: '+55%',
        icon: BookOpen,
        iconColor: '#10b981',
        iconBg: 'rgba(16, 185, 129, 0.12)',
        active: true,
        subscribersOrCount: '62 playbooks & LUTs sold',
        ctaLabel: 'Manage Storefront'
    },
    {
        id: 'affiliate',
        title: 'Affiliate Links',
        description: 'Earn commissions on bookings & gear',
        amount: 1120,
        growth: '+8%',
        icon: Globe,
        iconColor: '#2563eb',
        iconBg: 'rgba(37, 99, 235, 0.12)',
        active: true,
        subscribersOrCount: '1,420 verified booking clicks',
        ctaLabel: 'Generate Links'
    },
    {
        id: 'live-sessions',
        title: 'Live Sessions',
        description: 'Host paid live Q&A and travel planning',
        amount: 680,
        growth: '+41%',
        icon: Video,
        iconColor: '#0284c7',
        iconBg: 'rgba(2, 132, 199, 0.12)',
        active: true,
        subscribersOrCount: '9 group sessions hosted',
        ctaLabel: 'Schedule Live'
    }
];

const MonetizeHub = () => {
    const { addToast } = useToastStore();
    const [timeframe, setTimeframe] = useState('weekly');
    const [selectedStreamId, setSelectedStreamId] = useState('tips');
    const [streams, setStreams] = useState(INITIAL_STREAMS);
    const [hoveredBar, setHoveredBar] = useState(null);

    const maxWeekly = Math.max(...WEEKLY_EARNINGS.map(d => d.amount));
    const totalWeekly = WEEKLY_EARNINGS.reduce((acc, d) => acc + d.amount, 0);
    const totalMonthlyRevenue = streams.reduce((acc, s) => acc + s.amount, 0);

    const handleToggleStream = (e, id, title) => {
        e.stopPropagation();
        setStreams(prev =>
            prev.map(s => (s.id === id ? { ...s, active: !s.active } : s))
        );
        addToast(`Updated ${title} monetization status`, 'info');
    };

    const handlePayoutRequest = () => {
        addToast('Instant payout of $3,850.00 initiated to your Nomad Wallet!', 'success');
    };

    return (
        <div className="bp-monetize-hub">
            {/* Top Summary Banner */}
            <div className="bp-monetize-summary-row">
                <div className="bp-monetize-kpi-card primary-kpi">
                    <div className="kpi-top-row">
                        <span className="kpi-kicker">TOTAL MONETIZATION REVENUE</span>
                        <span className="bp-growth-pill">+24.8% vs last month</span>
                    </div>
                    <div className="kpi-value-row">
                        <h2>${totalMonthlyRevenue.toLocaleString()}</h2>
                        <span className="kpi-period">/ month</span>
                    </div>
                    <p className="kpi-subtext">
                        Across 6 active creator & business streams • Next automatic payout on Oct 15
                    </p>
                </div>

                <div className="bp-monetize-kpi-card">
                    <div className="kpi-top-row">
                        <span className="kpi-kicker">THIS WEEK&apos;S PULSE</span>
                        <span className="bp-growth-pill">+19.2%</span>
                    </div>
                    <div className="kpi-value-row">
                        <h2>${totalWeekly.toLocaleString()}</h2>
                        <span className="kpi-period">7-day total</span>
                    </div>
                    <div className="kpi-action-row">
                        <button
                            type="button"
                            className="bp-action-btn-primary"
                            onClick={handlePayoutRequest}
                        >
                            <Zap size={15} />
                            <span>Instant Withdraw</span>
                        </button>
                        <button
                            type="button"
                            className="bp-action-btn-outline"
                            onClick={() => addToast('Exported CSV revenue statement', 'info')}
                        >
                            <Download size={15} />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Weekly Bar Chart Card (Exact Match to Reference Image) */}
            <section className="bp-weekly-chart-card">
                <div className="bp-chart-header">
                    <div>
                        <h3>Daily Revenue Breakdown</h3>
                        <p>Mon – Sun creator & partner monetization earnings</p>
                    </div>
                    <div className="bp-chart-controls">
                        {['weekly', 'monthly', 'yearly'].map(t => (
                            <button
                                key={t}
                                type="button"
                                className={`bp-segment-btn ${timeframe === t ? 'active' : ''}`}
                                onClick={() => setTimeframe(t)}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bp-bars-stage" role="img" aria-label="Weekly earnings bar chart">
                    {WEEKLY_EARNINGS.map((item, idx) => {
                        const multiplier = timeframe === 'monthly' ? 4 : timeframe === 'yearly' ? 48 : 1;
                        const displayVal = item.amount * multiplier;
                        const heightPct = Math.round((item.amount / maxWeekly) * 100);
                        const isHovered = hoveredBar === idx;

                        return (
                            <div
                                key={item.day}
                                className={`bp-bar-column ${isHovered ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredBar(idx)}
                                onMouseLeave={() => setHoveredBar(null)}
                            >
                                <span className="bp-bar-amount-label">
                                    ${displayVal.toLocaleString()}
                                </span>
                                <div className="bp-bar-track">
                                    <div
                                        className="bp-bar-fill-pill"
                                        style={{ height: `${Math.max(22, heightPct)}%` }}
                                    />
                                </div>
                                <span className="bp-bar-day-label">{item.day}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 6 Monetization Stream Cards Grid (Exact Match to Reference Image) */}
            <div className="bp-streams-section-header">
                <div>
                    <h3>Monetization Streams</h3>
                    <p>Click any revenue stream card to configure pricing, payouts, or campaign links</p>
                </div>
                <button
                    type="button"
                    className="bp-action-btn-outline"
                    onClick={() => addToast('New custom monetization link created!', 'success')}
                >
                    <Plus size={15} />
                    <span>Add Custom Stream</span>
                </button>
            </div>

            <div className="bp-monetize-cards-grid">
                {streams.map((stream) => {
                    const IconComp = stream.icon;
                    const isSelected = selectedStreamId === stream.id;

                    return (
                        <div
                            key={stream.id}
                            className={`bp-stream-card ${isSelected ? 'is-selected' : ''} ${!stream.active ? 'is-paused' : ''}`}
                            onClick={() => setSelectedStreamId(stream.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setSelectedStreamId(stream.id)}
                        >
                            <div className="bp-stream-card-top">
                                <div
                                    className="bp-stream-icon-wrap"
                                    style={{ color: stream.iconColor, background: stream.iconBg }}
                                >
                                    <IconComp size={20} strokeWidth={2} />
                                </div>
                                <span className="bp-stream-growth-badge">{stream.growth}</span>
                            </div>

                            <div className="bp-stream-amount">
                                ${stream.amount.toLocaleString()}
                            </div>

                            <h4 className="bp-stream-title">{stream.title}</h4>
                            <p className="bp-stream-desc">{stream.description}</p>

                            <div className="bp-stream-card-footer">
                                <span className="bp-stream-meta">{stream.subscribersOrCount}</span>
                                <button
                                    type="button"
                                    className="bp-stream-cta-link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToast(`Opened ${stream.title} settings`, 'info');
                                    }}
                                >
                                    <span>{stream.ctaLabel}</span>
                                    <ArrowUpRight size={13} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonetizeHub;
