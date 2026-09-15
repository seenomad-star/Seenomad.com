import React, { useState } from 'react';
import { ShoppingBag, Star, Download, Filter, Search, Tag, DollarSign, ChevronRight } from 'lucide-react';
import '../../styles/GuideMarketplace.css';

const GuideMarketplace = () => {
    const [filter, setFilter] = useState('all');

    const guides = [
        { 
            id: 1, 
            title: 'Ultimate 14-Day Bali Digital Nomad Guide', 
            author: 'Nomad_Explorer', 
            price: 450, 
            rating: 4.9, 
            sales: 1240,
            category: 'nomad',
            thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&h=250&auto=format&fit=crop'
        },
        { 
            id: 2, 
            title: 'Luxury Maldives Island Hopping', 
            author: 'Jetset_Elena', 
            price: 850, 
            rating: 4.8, 
            sales: 320,
            category: 'luxury',
            thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&h=250&auto=format&fit=crop'
        },
        { 
            id: 3, 
            title: 'Budget Japan: Tokyo to Osaka on $50/Day', 
            author: 'PennyPincher_Ken', 
            price: 250, 
            rating: 5.0, 
            sales: 2400,
            category: 'budget',
            thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&h=250&auto=format&fit=crop'
        }
    ];

    return (
        <div className="marketplace-container">
            <header className="mp-header">
                <div className="mp-badge"><Tag size={14} /> <span>Traveluh Economy</span></div>
                <h1>The Itinerary <span>Marketplace</span></h1>
                <p>Buy curated guides and automated itineraries from the world's top 1% of nomads.</p>

                <div className="mp-search-bar">
                    <Search size={20} className="si" />
                    <input type="text" placeholder="Search guides by destination or author..." />
                    <button className="filter-btn"><Filter size={18} /></button>
                </div>
            </header>

            <div className="mp-categories">
                {['all', 'nomad', 'luxury', 'budget', 'adventure'].map(cat => (
                    <button 
                        key={cat} 
                        className={`mp-cat-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="guides-grid">
                {guides.map(guide => (
                    <div className="guide-card" key={guide.id}>
                        <div className="guide-thumb" style={{ backgroundImage: `url(${guide.thumb})` }}>
                            <div className="price-tag"><DollarSign size={14} />{guide.price} Coins</div>
                        </div>
                        <div className="guide-content">
                            <div className="guide-author">By {guide.author}</div>
                            <h3>{guide.title}</h3>
                            <div className="guide-meta">
                                <div className="rating"><Star size={14} fill="#FCD34D" color="#FCD34D" /> {guide.rating}</div>
                                <div className="sales">{guide.sales} Downloads</div>
                            </div>
                            <button className="buy-btn">Get Guide <ChevronRight size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sell-cta-banner">
                <div className="cta-info">
                    <h2>Earn While You Travel</h2>
                    <p>Turn your TripBuilder itineraries into a passive income stream.</p>
                </div>
                <button className="list-now-btn">Sell My Trip</button>
            </div>
        </div>
    );
};

export default GuideMarketplace;
