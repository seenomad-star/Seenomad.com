import React from 'react';
import { Coffee, ShieldCheck } from 'lucide-react';

const PartnerSpotlight = () => {
    return (
        <div className="sidecar-widget partner-spotlight">
            <div className="widget-header">
                <ShieldCheck size={16} className="widget-icon" />
                <span className="widget-title">Partner Spotlight</span>
            </div>
            <div className="partner-content">
                <div className="partner-main">
                    <div className="partner-logo-box">
                        <Coffee size={24} />
                    </div>
                    <div className="partner-info">
                        <h4>Premium Airport Lounge</h4>
                        <p>Enjoy complimentary access with Travel OS+</p>
                    </div>
                </div>
                <button className="partner-action-btn">Claim Access</button>
            </div>
        </div>
    );
};

export default PartnerSpotlight;
