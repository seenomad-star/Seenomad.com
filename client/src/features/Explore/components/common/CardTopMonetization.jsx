import React from 'react';
import { Lock, Crown, Sparkles } from 'lucide-react';
import './CardTopMonetization.css';

const CardTopMonetization = ({
    onUnlock = () => { },
    onPremium = () => { }
}) => {
    return (
        <div className="card-top-monetization" role="region" aria-label="Exclusive Nomad Perks">
            <button 
                type="button"
                className="monetization-btn unlock" 
                onClick={onUnlock}
                title="Unlock secret nomad accommodation & flight deals"
                aria-label="Unlock Secret Deals"
            >
                <div className="monetize-icon-wrap amber">
                    <Lock size={12} />
                </div>
                <span className="monetize-label">Secret Deals</span>
                <span className="monetize-pill vip">VIP</span>
            </button>

            <div className="monetization-divider" aria-hidden="true"></div>

            <button 
                type="button"
                className="monetization-btn premium" 
                onClick={onPremium}
                title="Access deep-dive verified nomad intel & visa guide"
                aria-label="Premium City Guide"
            >
                <div className="monetize-icon-wrap purple">
                    <Crown size={12} />
                </div>
                <span className="monetize-label">City Intel Guide</span>
                <span className="monetize-pill pro">PRO</span>
            </button>
        </div>
    );
};

export default CardTopMonetization;

