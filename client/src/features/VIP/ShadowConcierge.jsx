import React, { useState } from 'react';
import { Plane, Ship, Car, Compass, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import NomadBlackCard from './components/NomadBlackCard';
import '../../styles/ShadowConcierge.css';

const ShadowConcierge = () => {
    const [selectedType, setSelectedType] = useState('jet');

    const charterOptions = {
        jet: [
            { id: 1, name: 'Gulfstream G650', pax: 14, range: '7,500nm', price: '$8,200/hr', img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=400&h=250&auto=format&fit=crop' },
            { id: 2, name: 'Bombardier Global 7500', pax: 19, range: '7,700nm', price: '$10,500/hr', img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=400&h=250&auto=format&fit=crop' }
        ],
        yacht: [
            { id: 3, name: 'Sunseeker 95', pax: 12, length: '28m', price: '$12,000/day', img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=400&h=250&auto=format&fit=crop' },
            { id: 4, name: 'Azimut Grande 35', pax: 10, length: '35m', price: '$18,500/day', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&h=250&auto=format&fit=crop' }
        ]
    };

    return (
        <div className="shadow-concierge-container">
            <NomadBlackCard />
            <header className="sc-header">
                <div className="sc-badge"><Shield size={14} /> <span>Shadow Elite Concierge</span></div>
                <h1>VIP <span>Private Charters</span></h1>
                <p>Global on-demand access to the world's most exclusive transport fleet.</p>
            </header>

            <div className="sc-type-selector">
                <button className={`sc-type-btn ${selectedType === 'jet' ? 'active' : ''}`} onClick={() => setSelectedType('jet')}>
                    <Plane size={20} /> <span>Private Jets</span>
                </button>
                <button className={`sc-type-btn ${selectedType === 'yacht' ? 'active' : ''}`} onClick={() => setSelectedType('yacht')}>
                    <Ship size={20} /> <span>Luxury Yachts</span>
                </button>
                <button className={`sc-type-btn ${selectedType === 'ground' ? 'active' : ''}`} onClick={() => setSelectedType('ground')}>
                    <Car size={20} /> <span>Secure Ground</span>
                </button>
            </div>

            <div className="sc-grid">
                {charterOptions[selectedType]?.map((opt) => (
                    <div className="sc-card" key={opt.id}>
                        <div className="sc-card-img" style={{ backgroundImage: `url(${opt.img})` }}></div>
                        <div className="sc-card-content">
                            <div className="sc-card-header">
                                <h3>{opt.name}</h3>
                                <span className="sc-price">{opt.price}</span>
                            </div>
                            <div className="sc-card-stats">
                                <div className="sc-stat"><Users size={14} /> {opt.pax} Pax</div>
                                <div className="sc-stat"><Compass size={14} /> {opt.range || opt.length}</div>
                                <div className="sc-stat"><Clock size={14} /> Global Availability</div>
                            </div>
                            <button className="sc-book-btn">Request Charter <ArrowRight size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sc-vip-perks">
                <div className="vip-perk">
                    <Shield size={24} color="#A855F7" />
                    <div>
                        <h4>Discreet & Secure</h4>
                        <p>All transfers include Tier-1 security protocols and anonymous billing.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShadowConcierge;
