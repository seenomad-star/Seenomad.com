import React from 'react';
import { Lock, TrendingUp } from 'lucide-react';

const LockedInsights = () => {
    return (
        <div className="sidecar-widget locked-insights">
            <div className="widget-header">
                <TrendingUp size={16} className="widget-icon" />
                <span className="widget-title">Locked Insights</span>
            </div>
            <div className="locked-content">
                <div className="insight-row">
                    <span className="insight-label">Avg. Booking Window</span>
                    <span className="insight-value-blurred">56 Days</span>
                </div>
                <div className="insight-row">
                    <span className="insight-label">Peak Travel Times</span>
                    <span className="insight-value-blurred">July-Aug</span>
                </div>
                <button className="premium-cta-btn">
                    <Lock size={14} style={{ marginRight: '8px' }} />
                    Go Premium
                </button>
            </div>
        </div>
    );
};

export default LockedInsights;
