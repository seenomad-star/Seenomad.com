import React from 'react';
import { Gift } from 'lucide-react';

const AdCard = () => (
    <div className="game-card-premium ad-card">
        <div className="ad-badge">Sponsored</div>
        <div className="ad-content">
            <div className="ad-icon-container">
                <Gift size={32} color="#3b82f6" />
            </div>
            <h3>Travel Insurance Pro</h3>
            <p>Get 20% off your next trip insurance. Play the mini-game to unlock!</p>
            <button className="ad-cta-btn">Learn More</button>
        </div>
    </div>
);

export default AdCard;
