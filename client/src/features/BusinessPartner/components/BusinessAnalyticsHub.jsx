import React, { useState } from 'react';
import {
    TrendingUp,
    Users,
    Eye,
    MousePointer2,
    Globe,
    ArrowUpRight,
    Sparkles,
    Video,
    BookOpen,
    MapPin
} from 'lucide-react';

const AUDIENCE_GEO = [
    { country: 'United States', share: 32, rpm: '$18.40', growth: '+14%' },
    { country: 'United Kingdom', share: 19, rpm: '$16.20', growth: '+22%' },
    { country: 'Portugal', share: 15, rpm: '$12.80', growth: '+38%' },
    { country: 'Germany', share: 14, rpm: '$15.90', growth: '+11%' },
    { country: 'Singapore & Australia', share: 20, rpm: '$17.50', growth: '+27%' }
];

const TOP_CONTENT = [
    {
        title: 'Lisbon 2026 Digital Nomad Neighborhood & Fiber Guide',
        type: 'Playbook & Reel',
        views: '284.5K',
        conversions: '1,420',
        revenue: '$3,420'
    },
    {
        title: '7 Hidden Work Cafes in Canggu with Backup Generators',
        type: 'Short Reel (9:16)',
        views: '192.0K',
        conversions: '890',
        revenue: '$1,980'
    },
    {
        title: 'How to Apply for Spain Digital Nomad Visa in 14 Days',
        type: 'Interactive Guide',
        views: '158.2K',
        conversions: '1,110',
        revenue: '$2,640'
    }
];

const BusinessAnalyticsHub = () => {
    const [period, setPeriod] = useState('30d');

    return (
        <div className="bp-monetize-hub">
            {/* Top Analytics Metrics */}
            <div className="bp-monetize-summary-row four-col">
                <div className="bp-monetize-kpi-card">
                    <span className="kpi-kicker">TOTAL REACH</span>
                    <div className="kpi-value-row">
                        <h2>1.42M</h2>
                        <span className="bp-growth-pill">+28.4%</span>
                    </div>
                    <p className="kpi-subtext">Unique travelers & nomads reached</p>
                </div>

                <div className="bp-monetize-kpi-card">
                    <span className="kpi-kicker">ENGAGEMENT RATE</span>
                    <div className="kpi-value-row">
                        <h2>8.7%</h2>
                        <span className="bp-growth-pill">+1.9%</span>
                    </div>
                    <p className="kpi-subtext">Saves, shares & itinerary clones</p>
                </div>

                <div className="bp-monetize-kpi-card">
                    <span className="kpi-kicker">BOOKING CONVERSIONS</span>
                    <div className="kpi-value-row">
                        <h2>3,420</h2>
                        <span className="bp-growth-pill">+34.2%</span>
                    </div>
                    <p className="kpi-subtext">Direct stays, flights & guide checkouts</p>
                </div>

                <div className="bp-monetize-kpi-card">
                    <span className="kpi-kicker">AVERAGE RPM</span>
                    <div className="kpi-value-row">
                        <h2>$16.85</h2>
                        <span className="bp-growth-pill">+$2.10</span>
                    </div>
                    <p className="kpi-subtext">Revenue per 1,000 qualified views</p>
                </div>
            </div>

            {/* Two-Column Analytics Breakdown */}
            <div className="bp-analytics-split-grid">
                <section className="bp-weekly-chart-card">
                    <div className="bp-chart-header">
                        <div>
                            <h3>Top Performing Content</h3>
                            <p>Highest converting posts, reels, and travel guides</p>
                        </div>
                        <div className="bp-chart-controls">
                            {['7d', '30d', '90d'].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`bp-segment-btn ${period === p ? 'active' : ''}`}
                                    onClick={() => setPeriod(p)}
                                >
                                    {p.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bp-ledger-list">
                        {TOP_CONTENT.map((item, idx) => (
                            <div key={idx} className="bp-ledger-item">
                                <div className="bp-ledger-left">
                                    <div className="bp-rank-circle">0{idx + 1}</div>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <span className="bp-ledger-meta">
                                            {item.type} · {item.views} views · {item.conversions} conversions
                                        </span>
                                    </div>
                                </div>
                                <div className="bp-ledger-right">
                                    <span className="bp-ledger-amount">{item.revenue}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bp-weekly-chart-card">
                    <div className="bp-chart-header">
                        <div>
                            <h3>Audience Geography & RPM</h3>
                            <p>Where your highest-earning audience is located</p>
                        </div>
                    </div>

                    <div className="bp-geo-list">
                        {AUDIENCE_GEO.map((geo) => (
                            <div key={geo.country} className="bp-geo-row">
                                <div className="bp-geo-top">
                                    <span className="bp-geo-country">{geo.country}</span>
                                    <span className="bp-geo-stats">
                                        {geo.share}% · <strong>{geo.rpm} RPM</strong> ({geo.growth})
                                    </span>
                                </div>
                                <div className="bp-geo-bar-bg">
                                    <div
                                        className="bp-geo-bar-fill"
                                        style={{ width: `${geo.share * 2.5}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BusinessAnalyticsHub;
