import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Tag, Map, Users, 
    Star, Clock, Shield, 
    ChevronRight, ArrowRight,
    Search, Filter, Heart,
    FilterX
} from 'lucide-react';

const PackageMarket = () => {
    const [filter, setFilter] = useState('ALL');

    const packages = [
        { id: 'P001', type: 'OPEN TRIP', title: 'East Nusa Penida Hidden Gems', agency: 'Bali Nomads Travel', price: 'Rp 2.4M', duration: '3D2N', rating: 4.8, reviews: 120, cover: 'bali-p1' },
        { id: 'P002', type: 'PRIVATE TRIP', title: 'Japanese Alpine Route Expert', agency: 'Sakura Expeditions', price: 'Rp 15.5M', duration: '5D4N', rating: 4.9, reviews: 85, cover: 'japan-p1' },
        { id: 'P003', type: 'OPEN TRIP', title: 'Mount Rinjani Conquest', agency: 'Lombok Trekking Co', price: 'Rp 1.8M', duration: '4D3N', rating: 4.7, reviews: 210, cover: 'rinjani-p1' },
        { id: 'P004', type: 'PRIVATE TRIP', title: 'Luxury Labuan Bajo Cruise', agency: 'Sail Indonesia', price: 'Rp 25M', duration: '4D3N', rating: 5.0, reviews: 45, cover: 'bajo-p1' }
    ];

    const filtered = filter === 'ALL' ? packages : packages.filter(p => p.type === filter);

    return (
        <div className="package-market-container">
            <div className="market-header">
                <div className="header-info">
                    <h2>Adventure Market</h2>
                    <p>Verified Private and Open Trip packages from Indonesia's best agencies.</p>
                </div>
                <div className="market-stats">
                    <div className="stat-pill">
                        <Tag size={16} />
                        <span>250+ Packages</span>
                    </div>
                    <div className="stat-pill">
                        <Shield size={16} />
                        <span>Verified Agencies</span>
                    </div>
                </div>
            </div>

            <div className="market-controls">
                <div className="filter-bar">
                    <button className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`} onClick={() => setFilter('ALL')}>All Trips</button>
                    <button className={`filter-btn ${filter === 'OPEN TRIP' ? 'active' : ''}`} onClick={() => setFilter('OPEN TRIP')}>Open Trip</button>
                    <button className={`filter-btn ${filter === 'PRIVATE TRIP' ? 'active' : ''}`} onClick={() => setFilter('PRIVATE TRIP')}>Private Trip</button>
                </div>
                <div className="search-market">
                    <Search size={18} />
                    <input type="text" placeholder="Where to next?" />
                </div>
            </div>

            <div className="package-grid">
                {filtered.map(pkg => (
                    <motion.div 
                        key={pkg.id}
                        whileHover={{ y: -5 }}
                        className="package-card"
                    >
                        <div className="pkg-image-mock">
                            <div className="pkg-type-badge">{pkg.type}</div>
                            <button className="favorite-btn"><Heart size={18} /></button>
                        </div>
                        <div className="pkg-body">
                            <div className="pkg-agency-row">
                                <span className="agency-name">{pkg.agency}</span>
                                <div className="pkg-rating">
                                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                                    <span>{pkg.rating} ({pkg.reviews})</span>
                                </div>
                            </div>
                            <h3 className="pkg-title">{pkg.title}</h3>
                            <div className="pkg-meta">
                                <div className="meta-bit">
                                    <Clock size={14} />
                                    <span>{pkg.duration}</span>
                                </div>
                                <div className="meta-bit">
                                    <Map size={14} />
                                    <span>{pkg.type === 'OPEN TRIP' ? 'Fixed Route' : 'Customizable'}</span>
                                </div>
                            </div>
                            <div className="pkg-footer">
                                <div className="pkg-price">
                                    <span className="price-label">Starts from</span>
                                    <strong>{pkg.price}</strong>
                                </div>
                                <button className="book-pkg-btn">
                                    <span>Details</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="agencies-featured">
                <h3>Partner Agencies</h3>
                <div className="agency-logos">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="agency-logo-mock" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageMarket;
