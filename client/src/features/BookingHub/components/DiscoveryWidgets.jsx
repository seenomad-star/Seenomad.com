import React, { useState } from 'react';
import { Tag, MapPin, ShieldCheck, Gift, BookOpen, Ticket } from 'lucide-react';
import '../styles/DiscoveryWidgets.css';

const DiscoveryWidgets = () => {
    const [destTab, setDestTab] = useState('international');

    const topDeals = [
        { id: 1, title: 'Flight Savings', desc: 'Up to 25% off on emirates', code: 'EMI25', bg: '#3B82F6' },
        { id: 2, title: 'Hotel Flash Sale', desc: 'Flat $50 off on 5-Star Stays', code: 'STAY50', bg: '#A855F7' },
        { id: 3, title: 'Visa Deals', desc: 'Zero Processing Fee to Dubai', code: 'DXBFREE', bg: '#F59E0B' },
    ];

    const popularDests = {
        india: ['Goa', 'Manali', 'Kerala', 'Jaipur', 'Andaman'],
        international: ['Bali', 'Dubai', 'Maldives', 'Singapore', 'Paris']
    };

    const insurances = ['USA', 'Schengen', 'Thailand', 'Dubai', 'Singapore'];
    const giftCards = ['Wedding', 'Anniversary', 'Birthday', 'Valentine\'s', 'Farewell'];

    return (
        <div className="discovery-widgets-container">
            {/* Top Deals Carousel */}
            <section className="dw-section">
                <div className="dw-header">
                    <h2><Tag size={20} color="#3B82F6" /> Top Deals & Offers</h2>
                </div>
                <div className="deals-grid">
                    {topDeals.map(deal => (
                        <div className="deal-card" key={deal.id} style={{ '--theme-color': deal.bg }}>
                            <div className="deal-content">
                                <h3>{deal.title}</h3>
                                <p>{deal.desc}</p>
                            </div>
                            <div className="deal-code">Use Code: <strong>{deal.code}</strong></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="dw-section">
                <div className="dw-header">
                    <h2><MapPin size={20} color="#F59E0B" /> Popular Destinations</h2>
                    <div className="dw-tabs">
                        <button className={destTab === 'india' ? 'active' : ''} onClick={() => setDestTab('india')}>India</button>
                        <button className={destTab === 'international' ? 'active' : ''} onClick={() => setDestTab('international')}>International</button>
                    </div>
                </div>
                <div className="pill-cloud">
                    {popularDests[destTab].map(dest => (
                        <span className="dest-pill" key={dest}>{dest}</span>
                    ))}
                    <span className="dest-pill more">View All 100+</span>
                </div>
            </section>

            {/* Quick Actions Grid (Insurance, Gifts, Blog, PNR) */}
            <div className="quick-actions-grid">
                {/* Travel Insurance */}
                <div className="qa-card pattern-1">
                    <h3><ShieldCheck size={18} /> Travel Insurance Plans</h3>
                    <div className="link-list">
                        {insurances.map(ins => <a href="#" key={ins}>{ins} Insurance</a>)}
                    </div>
                </div>

                {/* Gift Cards */}
                <div className="qa-card pattern-2">
                    <h3><Gift size={18} /> Occasion Gift Cards</h3>
                    <div className="link-list">
                        {giftCards.map(gift => <a href="#" key={gift}>{gift} Card</a>)}
                    </div>
                </div>

                {/* PNR & Info */}
                <div className="qa-card solid-dark">
                    <h3><Ticket size={18} /> Trip Management</h3>
                    <div className="pnr-checker">
                        <input type="text" placeholder="Enter PNR Number" />
                        <button>Check Status</button>
                    </div>
                    <div className="blog-link">
                        <BookOpen size={16} />
                        <div>
                            <h4>Traveluh Blog & Ideas</h4>
                            <p>Read the latest digital nomad guides.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoveryWidgets;
