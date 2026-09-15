import React from 'react';
import {
    Star, Sparkles, Users, ShieldCheck, Bookmark, Heart, Share2,
    MessageCircle, MoreVertical, Calendar, Zap, TrendingUp, Clock, Award, Ticket, MapPin
} from 'lucide-react';

const EventCard = ({ item, viewMode }) => {
    const isList = viewMode === 'list';

    return (
        <div className={`event-card-premium ${isList ? 'list-view' : ''}`}>
            {/* Image Section */}
            <div className="card-image-container">
                <img src={item.image} alt={item.title} className="card-image" />
                <div className="card-overlay-gradient"></div>

                <button className="favorite-btn">
                    <Bookmark size={18} />
                </button>

                {/* Vertical Action Capsule */}
                <div className="card-action-capsule">
                    <button className="capsule-btn like" title="Like">
                        <Heart size={14} />
                    </button>
                    <button className="capsule-btn share" title="Share">
                        <Share2 size={14} />
                    </button>
                    <button className="capsule-btn comment" title="Comment">
                        <MessageCircle size={14} />
                    </button>
                    <button className="capsule-btn more" title="More Options">
                        <MoreVertical size={14} />
                    </button>
                </div>

                <div className="match-badge">
                    <Sparkles size={12} fill="currentColor" />
                    <span>{item.matchScore || '95%'} Match</span>
                </div>

                {item.trending && (
                    <div className="trending-badge">
                        <TrendingUp size={12} />
                        <span>Trending</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="card-content">
                <div className="card-header">
                    <div className="header-top">
                        <h3>{item.title}</h3>
                        <div className="rating">
                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                            <span>{item.rating || '4.9'}</span>
                        </div>
                    </div>
                    <div className="location-row">
                        <MapPin size={14} className="location-icon" />
                        <span>{item.location}</span>
                    </div>
                </div>

                {/* Dopamine Stats */}
                <div className="dopamine-stats">
                    <div className="stat-item">
                        <Users size={14} className="stat-icon blue" />
                        <span>{item.attendees || '10k+'} going</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <Ticket size={14} className="stat-icon green" />
                        <span>{item.ticketsLeft || 'Limited'} left</span>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="ai-insight">
                    <Sparkles size={12} className="insight-icon" />
                    <span className="insight-text">
                        {item.aiInsight || 'Top trending event in this region'}
                    </span>
                </div>

                {/* Perks / Tags */}
                <div className="tags-row">
                    {(item.tags || ['Featured', 'Verified']).slice(0, 3).map(tag => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Pricing & Actions */}
                <div className="card-footer">
                    <div className="price-info">
                        <span className="label">Starting From</span>
                        <span className="amount">{item.price === 'Free' ? 'Free' : item.price}</span>
                    </div>

                    <div className="card-actions">
                        <button className="action-btn primary">
                            Get Tickets
                        </button>
                    </div>
                </div>

                {/* XP / Gamification Footer */}
                <div className="xp-footer">
                    <div className="xp-pill save">
                        <Award size={12} />
                        <span>+{item.xpReward || '800'} XP</span>
                    </div>
                    <div className="xp-pill plan">
                        <Calendar size={12} />
                        <span>{item.date || 'Coming Soon'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
