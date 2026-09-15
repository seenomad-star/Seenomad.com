import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Settings, Bell } from 'lucide-react';
import '../../styles/ProviderPartnerDashboard.css';

const ProviderPartnerDashboard = () => {
    const [surgePricing, setSurgePricing] = useState(false);

    return (
        <div className="provider-dashboard-container">
            <div className="pd-sidebar">
                <div className="brand-logo">B2B Portal</div>
                <nav className="pd-nav">
                    <a href="#" className="active"><BarChart3 size={18} /> Analytics</a>
                    <a href="#"><Users size={18} /> Audience</a>
                    <a href="#"><DollarSign size={18} /> Revenue</a>
                    <a href="#"><Settings size={18} /> Settings</a>
                </nav>
            </div>

            <div className="pd-main">
                <div className="pd-header">
                    <h2>Hilton Worldwide Analytics</h2>
                    <div className="alert-badge"><Bell size={18} /> <span className="dot"></span></div>
                </div>

                <div className="metrics-row">
                    <div className="pd-metric-card">
                        <span>Today's GMV</span>
                        <h3>$142,500</h3>
                        <div className="trend positive"><TrendingUp size={14} /> +12.5%</div>
                    </div>
                    <div className="pd-metric-card">
                        <span>Active Bookings</span>
                        <h3>842</h3>
                        <div className="trend positive"><TrendingUp size={14} /> +5.2%</div>
                    </div>
                    <div className="pd-metric-card surge-toggle-card">
                        <span>Algorithmic Surge</span>
                        <div className="surge-controller">
                            <span className={`status ${surgePricing ? 'active' : ''}`}>{surgePricing ? 'ON (1.5x)' : 'OFF (1.0x)'}</span>
                            <button className={`toggle-btn ${surgePricing ? 'active' : ''}`} onClick={() => setSurgePricing(!surgePricing)}>
                                <div className="knob"></div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="chart-area-mock">
                    <div className="chart-header">
                        <h3>7-Day Booking Velocity</h3>
                        <span>Trailing Volume</span>
                    </div>
                    
                    <div className="css-bar-chart">
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div className="bar-wrapper" key={i}>
                                <div className="bar-fill" style={{ height: `${h}%` }}></div>
                                <span className="day-label">D{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderPartnerDashboard;
