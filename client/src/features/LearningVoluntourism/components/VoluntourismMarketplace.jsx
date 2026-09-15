import React from 'react';
import { Heart, MapPin, Calendar, ShieldCheck, TrendingUp } from 'lucide-react';

const VoluntourismMarketplace = () => {
    const programs = [
        {
            id: 'marine-maldives',
            title: 'Marine Conservation',
            location: 'Maldives',
            duration: '2-4 Weeks',
            impact: 'Protect 500+ Coral Reefs',
            ngo: 'OceanGuard NGO',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            verified: true,
            spots: 5
        },
        {
            id: 'teaching-thailand',
            title: 'Rural Education',
            location: 'Thailand',
            duration: '1-3 Months',
            impact: 'Empower 100+ Students',
            ngo: 'EduGlobal',
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
            verified: true,
            spots: 2
        },
        {
            id: 'reforestation-brazil',
            title: 'Amazon Reforestation',
            location: 'Brazil',
            duration: '2 Weeks',
            impact: 'Plant 1000+ Trees',
            ngo: 'GreenEarth',
            image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
            verified: true,
            spots: 12
        }
    ];

    return (
        <div className="marketplace-container">
            <div className="section-header">
                <h2>Verified Voluntourism Marketplace</h2>
                <p>Skill-matched volunteering with real-time impact tracking.</p>
            </div>

            <div className="marketplace-grid">
                {programs.map(program => (
                    <div key={program.id} className="program-card premium-card">
                        <div className="program-image" style={{ backgroundImage: `url(${program.image})` }}>
                            <div className="program-overlay">
                                <div className="program-ngo">
                                    {program.ngo} {program.verified && <ShieldCheck size={14} className="text-blue-400" />}
                                </div>
                            </div>
                        </div>
                        <div className="program-content">
                            <div className="program-location">
                                <MapPin size={14} /> {program.location}
                            </div>
                            <h3>{program.title}</h3>
                            <div className="impact-preview">
                                <TrendingUp size={14} className="text-green-400" />
                                <span>{program.impact}</span>
                            </div>
                            <div className="program-meta">
                                <span><Calendar size={14} /> {program.duration}</span>
                                <span className="spots-left text-red-400">{program.spots} spots left</span>
                            </div>
                        </div>
                        <div className="program-footer">
                            <button className="primary-btn-premium">Apply Now</button>
                            <button className="secondary-btn-premium">Impact Dashboard</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoluntourismMarketplace;
