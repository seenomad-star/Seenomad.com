import React from 'react';
import '../Destinations.css';

const AdCard = ({ type = 'insurance' }) => {
    const ads = {
        insurance: {
            title: 'Travel with Peace of Mind',
            desc: 'Get comprehensive travel insurance starting at just $15/trip.',
            cta: 'Get Quote',
            image: 'https://images.unsplash.com/photo-1454165833767-027ff33027ef?w=600',
            tag: 'Sponsored'
        },
        lounge: {
            title: 'Premium Lounge Access',
            desc: 'Unlock 1300+ airport lounges worldwide. Relax before you fly.',
            cta: 'Unlock Now',
            image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600',
            tag: 'Sponsored'
        },
        rental: {
            title: 'Explore More with Car Rentals',
            desc: 'Save up to 30% on international car rentals with our partners.',
            cta: 'Book Car',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600',
            tag: 'Sponsored'
        }
    };

    const ad = ads[type] || ads.insurance;

    return (
        <div className="destination-card ad-card">
            <div className="card-image-container">
                <img src={ad.image} alt={ad.title} className="card-image" />
                <div className="card-overlay-gradient"></div>
                <div className="ad-badge">{ad.tag}</div>
            </div>
            <div className="card-content">
                <div className="ad-header">
                    <h3>{ad.title}</h3>
                </div>
                <p className="ad-desc">{ad.desc}</p>
                <div className="card-footer">
                    <button className="action-btn secondary ad-cta">{ad.cta}</button>
                </div>
            </div>
        </div>
    );
};

export default AdCard;
