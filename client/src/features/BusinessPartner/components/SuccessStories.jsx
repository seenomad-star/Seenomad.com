import React from 'react';
import {
    Quote,
    TrendingUp,
    Users,
    Globe,
    ArrowRight,
    Star,
    Play
} from 'lucide-react';

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            partner: 'Bali Adventure Tours',
            title: 'How Bali Adventure Tours increased bookings by 150% in 6 months.',
            category: 'Tour Operator',
            growth: '+150%',
            revenue: '$450k',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
            quote: 'SeeNomad transformed our business. The AI-driven ad placements helped us reach the right audience at the right time.'
        },
        {
            id: 2,
            partner: 'EcoStay Resorts',
            title: 'Scaling sustainable travel with SeeNomad corporate tools.',
            category: 'Hotel Group',
            growth: '+85%',
            revenue: '$1.2M',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
            quote: 'The corporate management tools allowed us to handle large group bookings with ease, increasing our efficiency by 40%.'
        }
    ];

    return (
        <div className="success-stories">
            <div className="view-header">
                <h2>Success Stories</h2>
                <p>Learn how our partners are thriving in the SeeNomad ecosystem.</p>
            </div>

            {/* Featured Story */}
            <div className="featured-story glass">
                <div className="story-image">
                    <img src={stories[0].image} alt={stories[0].partner} />
                    <button className="play-video-btn">
                        <Play size={24} fill="white" />
                    </button>
                </div>
                <div className="story-content">
                    <div className="partner-tag">{stories[0].category}</div>
                    <h3>{stories[0].title}</h3>
                    <div className="story-stats">
                        <div className="s-stat">
                            <TrendingUp size={18} color="#10b981" />
                            <span>{stories[0].growth} Growth</span>
                        </div>
                        <div className="s-stat">
                            <Users size={18} color="#3b82f6" />
                            <span>{stories[0].revenue} Revenue</span>
                        </div>
                    </div>
                    <div className="story-quote">
                        <Quote size={24} color="#8b5cf6" />
                        <p>{stories[0].quote}</p>
                    </div>
                    <button className="read-more-btn">
                        <span>Read Full Case Study</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="stories-grid">
                {stories.slice(1).map(story => (
                    <div key={story.id} className="story-card glass">
                        <div className="s-card-image">
                            <img src={story.image} alt={story.partner} />
                            <div className="s-card-overlay"></div>
                            <div className="s-card-tag">{story.category}</div>
                        </div>
                        <div className="s-card-content">
                            <h4>{story.title}</h4>
                            <div className="s-card-footer">
                                <div className="s-card-stats">
                                    <TrendingUp size={14} color="#10b981" />
                                    <span>{story.growth}</span>
                                </div>
                                <button className="s-card-btn">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Join CTA Card */}
                <div className="join-cta-card premium-gradient">
                    <h3>Ready to write your own success story?</h3>
                    <p>Join 5,000+ partners growing their business with SeeNomad.</p>
                    <button className="join-now-btn">Get Started Today</button>
                </div>
            </div>

            {/* Partner Logos Section */}
            <div className="partner-logos-section glass">
                <p>Trusted by industry leaders worldwide</p>
                <div className="logos-scroll">
                    <div className="logo-placeholder">✈️ Airline Co</div>
                    <div className="logo-placeholder">🏨 Global Hotels</div>
                    <div className="logo-placeholder">🚗 Travel Drive</div>
                    <div className="logo-placeholder">🚢 Sea Cruise</div>
                    <div className="logo-placeholder">🏔️ Alpine Tours</div>
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
