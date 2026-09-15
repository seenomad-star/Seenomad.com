import React from 'react';
import { AlertTriangle, CloudLightning, Flame, ShieldAlert, Zap, Thermometer } from 'lucide-react';
import '../../styles/RiskIntelligence.css';

const RiskIntelligenceMap = () => {
    const alerts = [
        { type: 'Weather', location: 'Tokyo, JP', msg: 'Super Typhoon Warning - Level 4', level: 'high', icon: CloudLightning },
        { type: 'Geo-Political', location: 'Kyiv, UA', msg: 'Active Airspace Restriction', level: 'critical', icon: AlertTriangle },
        { type: 'Health', location: 'Jakarta, ID', msg: 'Heatwave Advisory: 42°C Peak', level: 'mid', icon: Thermometer }
    ];

    return (
        <div className="risk-hub-container">
            <div className="risk-header">
                <ShieldAlert size={28} color="#EF4444" />
                <h2>Global <span>Risk Matrix</span></h2>
                <div className="risk-live">● LIVE FEED</div>
            </div>

            <div className="risk-heatmap-preview">
                <div className="heatmap-overlay">
                    <div className="hotspot high" style={{ top: '30%', left: '70%' }}>
                        <div className="hs-pulse"></div>
                    </div>
                    <div className="hotspot critical" style={{ top: '40%', left: '80%' }}>
                        <div className="hs-pulse"></div>
                    </div>
                </div>
                <div className="risk-legend">
                    <div className="leg-item"><div className="dot critical"></div> Critical</div>
                    <div className="leg-item"><div className="dot high"></div> High</div>
                    <div className="leg-item"><div className="dot mid"></div> Moderate</div>
                </div>
            </div>

            <div className="risk-alerts-list">
                {alerts.map((alert, i) => {
                    const Icon = alert.icon;
                    return (
                        <div className={`risk-alert-card ${alert.level}`} key={i}>
                            <div className="ra-icon"><Icon size={20} /></div>
                            <div className="ra-content">
                                <div className="ra-top">
                                    <span className="ra-type">{alert.type}</span>
                                    <span className="ra-loc">{alert.location}</span>
                                </div>
                                <p className="ra-msg">{alert.msg}</p>
                            </div>
                            <div className="ra-status-badge">{alert.level.toUpperCase()}</div>
                        </div>
                    );
                })}
            </div>

            <button className="risk-report-btn">Generate Full Intelligence Report</button>
        </div>
    );
};

export default RiskIntelligenceMap;
