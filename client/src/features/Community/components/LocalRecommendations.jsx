import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Globe, Plus, Clock, Wifi, Coffee, Building, Hotel, Users, ThumbsUp, MessageSquare, Filter, Search, TrendingUp, Award } from 'lucide-react';
import '../../../styles/NomadFeatures.css';

const communitySpots = [
    { id: 1, name: 'Antipodean Cafe', city: 'Kuala Lumpur', country: 'Malaysia', emoji: '🇲🇾', type: 'cafe', rating: 4.9, reviews: 312, wifi: '80 Mbps', price: '$$', tags: ['Fast Wi-Fi', 'Quiet', 'Great Coffee'], image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300', recommendedBy: 'alex_k', savedBy: 1240, nomadRating: 9.4 },
    { id: 2, name: 'Selina CoWork Lisbon', city: 'Lisbon', country: 'Portugal', emoji: '🇵🇹', type: 'coworking', rating: 4.8, reviews: 567, wifi: '200 Mbps', price: '$$$', tags: ['Community Events', 'Standing Desks', 'Rooftop'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300', recommendedBy: 'emma_j', savedBy: 2100, nomadRating: 9.2 },
    { id: 3, name: 'Warung Biah Biah', city: 'Ubud', country: 'Bali', emoji: '🇮🇩', type: 'restaurant', rating: 4.7, reviews: 198, wifi: 'N/A', price: '$', tags: ['Local Food', 'Hidden Gem', 'Cheap Eats'], image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300', recommendedBy: 'sarah_m', savedBy: 890, nomadRating: 9.6 },
    { id: 4, name: 'Pergamino Café', city: 'Medellin', country: 'Colombia', emoji: '🇨🇴', type: 'cafe', rating: 4.9, reviews: 445, wifi: '100 Mbps', price: '$$', tags: ['Best Coffee', 'Specialty Roast', 'Photogenic'], image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300', recommendedBy: 'marcus_nx', savedBy: 1870, nomadRating: 9.8 },
    { id: 5, name: 'CAMP Cafe Maya Mall', city: 'Chiang Mai', country: 'Thailand', emoji: '🇹🇭', type: 'cafe', rating: 4.5, reviews: 334, wifi: '75 Mbps', price: '$', tags: ['24/7', 'Free power', 'AC'], image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', recommendedBy: 'lisa_p', savedBy: 1450, nomadRating: 8.9 },
    { id: 6, name: 'Dojo Bali', city: 'Canggu', country: 'Bali', emoji: '🇮🇩', type: 'coworking', rating: 4.8, reviews: 678, wifi: '120 Mbps', price: '$$$', tags: ['Pool', 'Events', 'Community'], image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300', recommendedBy: 'mike_r', savedBy: 3200, nomadRating: 9.5 },
];

const typeIcons = { cafe: Coffee, coworking: Building, restaurant: '🍽️', hotel: Hotel };
const TypeIcon = ({ type }) => { const IC = typeIcons[type]; return typeof IC === 'string' ? <span>{IC}</span> : IC ? <IC size={14} /> : <MapPin size={14} />; };

const spotTypes = ['All', 'cafe', 'coworking', 'restaurant', 'hotel'];

const LocalRecommendations = () => {
    const [activeType, setActiveType] = useState('All');
    const [search, setSearch] = useState('');
    const [liked, setLiked] = useState({});
    const [sortBy, setSortBy] = useState('rating');

    const filtered = communitySpots
        .filter(s => activeType === 'All' || s.type === activeType)
        .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.savedBy - b.savedBy);

    return (
        <div className="local-recs-container">
            <div className="recs-header">
                <div>
                    <h2 className="recs-title"><Users size={22} className="recs-icon" /> Community Picks</h2>
                    <p className="recs-subtitle">Best cafes, restaurants & co-working spaces — curated by nomads, for nomads</p>
                </div>
                <button className="recs-add-btn"><Plus size={16} /> Add Spot</button>
            </div>

            <div className="recs-controls">
                <div className="recs-search">
                    <Search size={16} />
                    <input placeholder="Search spots or cities..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="recs-type-filters">
                    {spotTypes.map(t => (
                        <button key={t} className={`recs-type-btn ${activeType === t ? 'active' : ''}`} onClick={() => setActiveType(t)}>
                            {t === 'All' ? '✦ All' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                <select className="recs-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="rating">Top Rated</option>
                    <option value="saved">Most Saved</option>
                </select>
            </div>

            <div className="recs-grid">
                {filtered.map((spot, idx) => (
                    <motion.div
                        key={spot.id}
                        className="rec-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="rec-card-image">
                            <img src={spot.image} alt={spot.name} loading="lazy" />
                            <div className="rec-card-type-badge"><TypeIcon type={spot.type} /> {spot.type}</div>
                            <div className="rec-nomad-score">{spot.nomadRating} <span>Nomad Score</span></div>
                        </div>
                        <div className="rec-card-body">
                            <div className="rec-card-top">
                                <h3>{spot.name}</h3>
                                <div className="rec-rating"><Star size={14} fill="#F59E0B" stroke="#F59E0B" /> {spot.rating}</div>
                            </div>
                            <div className="rec-location">
                                <MapPin size={13} /> {spot.city}, {spot.country} {spot.emoji}
                            </div>
                            <div className="rec-meta">
                                {spot.wifi !== 'N/A' && <span className="rec-wifi"><Wifi size={12} /> {spot.wifi}</span>}
                                <span className="rec-price">{spot.price}</span>
                                <span className="rec-reviews">{spot.reviews} reviews</span>
                            </div>
                            <div className="rec-tags">
                                {spot.tags.map((t, i) => <span key={i} className="rec-tag">{t}</span>)}
                            </div>
                            <div className="rec-card-footer">
                                <div className="rec-recommender">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${spot.recommendedBy}`} alt="" />
                                    <span>by @{spot.recommendedBy}</span>
                                </div>
                                <div className="rec-actions">
                                    <button className={`rec-like-btn ${liked[spot.id] ? 'liked' : ''}`} onClick={() => setLiked(p => ({...p, [spot.id]: !p[spot.id]}))}>
                                        <ThumbsUp size={14} fill={liked[spot.id] ? '#8B5CF6' : 'none'} /> 
                                        {spot.savedBy + (liked[spot.id] ? 1 : 0)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LocalRecommendations;
