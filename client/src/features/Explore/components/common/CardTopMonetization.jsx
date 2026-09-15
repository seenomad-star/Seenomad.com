import React from 'react';
import { Lock, Crown } from 'lucide-react';
import './CardTopMonetization.css';

const CardTopMonetization = ({
    onUnlock = () => { },
    onPremium = () => { }
}) => {
    return (
        <div className="card-top-monetization">
            <button className="monetization-btn unlock" onClick={onUnlock}>
                <Lock size={14} />
                <span>Unlock Secret Deals</span>
            </button>
            <button className="monetization-btn premium" onClick={onPremium}>
                <Crown size={14} />
                <span>Premium Guide</span>
            </button>
        </div>
    );
};

export default CardTopMonetization;
