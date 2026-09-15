import React from 'react';
import { Tag, Clock, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

const Offers = () => {
    const offers = [
        {
            id: 1,
            title: 'Bali Luxury Escape',
            discount: '40% OFF',
            description: 'Exclusive deal for Seenomad Elite members. 5 nights at Ayana Resort.',
            expiry: '2 days left',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
            category: 'Accommodation'
        },
        {
            id: 2,
            title: 'Swiss Alps Adventure',
            discount: '$200 Credit',
            description: 'Book any Swiss tour and get instant travel credits for your next trip.',
            expiry: '5 days left',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
            category: 'Tours'
        },
        {
            id: 3,
            title: 'Digital Nomad Gear',
            discount: '15% OFF',
            description: 'Special discount on premium travel backpacks and tech organizers.',
            expiry: 'Limited Time',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
            category: 'Gear'
        }
    ];

    return (
        <div className="hub-section fade-in">
            <div className="section-header-hub">
                <div>
                    <h1>Exclusive <span className="gradient-text">Offers</span></h1>
                    <p>Hand-picked deals and rewards just for you.</p>
                </div>
                <button className="btn-hub-primary">
                    <Sparkles size={18} />
                    <span>Claim All</span>
                </button>
            </div>

            <div className="offers-grid">
                {offers.map(offer => (
                    <div key={offer.id} className="offer-card glass">
                        <div className="offer-image">
                            <img src={offer.image} alt={offer.title} />
                            <div className="offer-badge">{offer.discount}</div>
                        </div>
                        <div className="offer-content">
                            <div className="offer-meta">
                                <span className="offer-category">{offer.category}</span>
                                <span className="offer-expiry">
                                    <Clock size={14} />
                                    {offer.expiry}
                                </span>
                            </div>
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <div className="offer-actions">
                                <button className="btn-claim">Claim Now</button>
                                <button className="btn-details">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
