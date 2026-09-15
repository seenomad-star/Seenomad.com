import React from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, Heart, Activity, Repeat, MapPin } from 'lucide-react';

const SkillExchange = () => {
    const exchanges = [
        {
            id: 1,
            user: {
                name: 'Julian R.',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                location: 'Lisbon, Portugal'
            },
            offer: 'React & Next.js Masterclass',
            want: 'Surfing Lessons / Longboard',
            description: "I've been a senior dev for 8 years. Can help you architect your next SaaS in exchange for some time in the water!",
            level: 'Expert',
            matches: 5
        },
        {
            id: 2,
            user: {
                name: 'Elena M.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                location: 'Canggu, Bali'
            },
            offer: 'Professional Photography & Color Grading',
            want: 'Thai Cooking Lessons',
            description: "Will shoot 10 high-quality portraits for your nomad profile if you can teach me the secrets of a perfect Pad Thai.",
            level: 'Professional',
            matches: 12
        },
        {
            id: 3,
            user: {
                name: 'Marcus Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                location: 'Medellin, Colombia'
            },
            offer: 'Spanish Conversation (Native)',
            want: 'SEO Strategy for Blog',
            description: "Native speaker looking to boost my travel blog's visibility. Let's chat over coffee!",
            level: 'Intermediate',
            matches: 3
        }
    ];

    return (
        <div className="skill-exchange-feed">
            <div className="exchange-hero">
                <div className="hero-content">
                    <h2>Nomad Skill Exchange</h2>
                    <p>Trade what you know for what you want to learn. No money, just value.</p>
                </div>
                <button className="post-exchange-btn">
                    <Activity size={16} fill="currentColor" />
                    List My Skill
                </button>
            </div>

            <div className="exchange-list">
                {exchanges.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        className="skill-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="card-header">
                            <div className="user-info">
                                <img src={item.user.avatar} alt={item.user.name} />
                                <div>
                                    <span className="user-name">{item.user.name}</span>
                                    <span className="user-loc">
                                        <MapPin size={10} /> {item.user.location}
                                    </span>
                                </div>
                            </div>
                            <div className="match-count">
                                <Repeat size={14} />
                                <span>{item.matches} Potential Matches</span>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="exchange-grid">
                                <div className="exchange-box offer">
                                    <span className="label">OFFERING</span>
                                    <h3>{item.offer}</h3>
                                    <span className="level-badge">{item.level}</span>
                                </div>
                                <div className="exchange-arrow">
                                    <Repeat size={20} />
                                </div>
                                <div className="exchange-box want">
                                    <span className="label">WANTING</span>
                                    <h3>{item.want}</h3>
                                </div>
                            </div>
                            <p className="exchange-desc">{item.description}</p>
                        </div>

                        <div className="card-footer">
                            <button className="action-btn chat">
                                <MessageCircle size={18} />
                                <span>Propose Exchange</span>
                            </button>
                            <div className="footer-right">
                                <button className="icon-btn"><Heart size={18} /></button>
                                <button className="icon-btn"><Share2 size={18} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillExchange;
