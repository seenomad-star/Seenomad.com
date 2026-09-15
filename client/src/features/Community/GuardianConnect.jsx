import React from 'react';
import { motion } from 'framer-motion';
import { 
    UserCheck, MessageCircle, 
    ShieldCheck, Star, Zap,
    Users, Briefcase
} from 'lucide-react';

const GuardianConnect = () => {
    const guardians = [
        { name: 'Dr. Wayan', role: 'Artisan Expert', location: 'Ubud, Bali', rating: 4.9, bio: "30 years of Batik history & spiritual guidance." },
        { name: 'Yoshiko-san', role: 'Cultural Guide', location: 'Kyoto, Japan', rating: 5.0, bio: "Specialist in Gion festivals & tea ceremony arts." }
    ];

    return (
        <div className="guardian-connect-container">
            <div className="g-header">
                <ShieldCheck size={28} className="shield-icon" />
                <h2>Local Guardians</h2>
                <p>The Irreplaceable Human Touch. Connect with verified cultural protectors.</p>
            </div>

            <div className="guardian-stack">
                {guardians.map((g, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="guardian-card"
                    >
                        <div className="g-avatar">
                            <UserCheck size={24} />
                        </div>
                        <div className="g-details">
                            <div className="g-top">
                                <h3>{g.name}</h3>
                                <div className="g-rating"><Star size={12} fill="gold" /> {g.rating}</div>
                            </div>
                            <span className="g-role">{g.role} • {g.location}</span>
                            <p>{g.bio}</p>
                            <div className="g-actions">
                                <button className="chat-guardian-btn">
                                    <MessageCircle size={16} /> Finalize Itinerary
                                </button>
                                <button className="view-bio-btn">Expertise</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="irreplaceable-note">
                <Zap size={18} />
                <p>AI creates the map; Humans draw the soul. Your Guardian ensures your journey is authentic and irreplaceable.</p>
            </div>
        </div>
    );
};

export default GuardianConnect;
