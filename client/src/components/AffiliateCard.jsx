import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import '../styles/AffiliateCard.css';

const AffiliateCard = () => {
    return (
        <div className="panel-section affiliate-section">
            <div className="panel-header">
                <h3><ShieldCheck size={18} className="icon-inline" /> Travel Secure</h3>
            </div>
            <div className="affiliate-card">
                <div className="affiliate-info">
                    <h4>Seenomad Insurance</h4>
                    <p>Comprehensive coverage for your next adventure starting at <strong>$2/day</strong>.</p>
                </div>
                <button className="affiliate-btn">
                    Get a Quote
                    <ExternalLink size={14} />
                </button>
            </div>
        </div>
    );
};

export default AffiliateCard;
