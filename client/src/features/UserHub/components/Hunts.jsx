import React from 'react';
import { Map, MapPin, Compass, Gem, Camera, Search, Lock } from 'lucide-react';

const Hunts = () => {
    const activeHunts = [
        {
            id: 1,
            title: 'The Hidden Temples of Kyoto',
            location: 'Kyoto, Japan',
            difficulty: 'Medium',
            reward: '500 XP + Rare Badge',
            clues: '3/5 found',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            title: 'Lisbon Street Art Trail',
            location: 'Lisbon, Portugal',
            difficulty: 'Easy',
            reward: '200 XP + $10 Credit',
            clues: '1/4 found',
            image: 'https://images.unsplash.com/photo-1585211850734-783707769999?auto=format&fit=crop&q=80&w=600'
        }
    ];

    return (
        <div className="hub-section fade-in">
            <div className="section-header-hub">
                <div>
                    <h1>Treasure <span className="gradient-text">Hunts</span></h1>
                    <p>Explore the world and find hidden secrets to win rewards.</p>
                </div>
                <button className="btn-hub-outline">
                    <Search size={18} />
                    <span>Find Near Me</span>
                </button>
            </div>

            <div className="hunts-container">
                <div className="active-hunts-list">
                    {activeHunts.map(hunt => (
                        <div key={hunt.id} className="hunt-card glass">
                            <div className="hunt-image">
                                <img src={hunt.image} alt={hunt.title} />
                                <div className="hunt-difficulty">{hunt.difficulty}</div>
                            </div>
                            <div className="hunt-details">
                                <div className="hunt-meta">
                                    <span className="location"><MapPin size={14} /> {hunt.location}</span>
                                    <span className="clues"><Compass size={14} /> {hunt.clues}</span>
                                </div>
                                <h3>{hunt.title}</h3>
                                <div className="hunt-reward">
                                    <Gem size={16} />
                                    <span>{hunt.reward}</span>
                                </div>
                                <button className="btn-continue-hunt">Continue Hunt</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hunt-sidebar-hub">
                    <div className="hunt-stats-card glass">
                        <h3>Your Hunt Stats</h3>
                        <div className="stats-grid-mini">
                            <div className="stat">
                                <span className="val">8</span>
                                <span className="lab">Completed</span>
                            </div>
                            <div className="stat">
                                <span className="val">32</span>
                                <span className="lab">Clues Found</span>
                            </div>
                        </div>
                    </div>
                    <div className="hunt-inventory glass">
                        <h3>Inventory</h3>
                        <div className="inventory-grid">
                            <div className="inv-item"><Camera size={20} /></div>
                            <div className="inv-item"><Map size={20} /></div>
                            <div className="inv-item locked"><Lock size={20} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Hunts;
