import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Video, Users, DollarSign, Star, 
    ChevronRight, ShoppingCart, Globe, Clock, Zap
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const KnowledgeMarket = () => {
    const { credits, spendCredits, addXP } = useNomadOSStore();
    const [items] = useState([
        {
            id: 1,
            title: "Ultimate Bali Nomad Guide 2024",
            author: "Alex Rivera",
            price: 50,
            rating: 4.9,
            sales: 842,
            type: "Guide",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            title: "Remote Tax Hack Mastery",
            author: "Sarah Chen",
            price: 75,
            rating: 4.8,
            sales: 156,
            type: "Course",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            title: "15min Visa Consultation",
            author: "Expert Vanya",
            price: 30,
            rating: 5.0,
            sales: 42,
            type: "Service",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 4,
            title: "Digital Nomad Gear List",
            author: "Tech Nomad",
            price: 15,
            rating: 4.7,
            sales: 231,
            type: "Guide",
            image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=400&q=80"
        }
    ]);

    const handlePurchase = (item) => {
        if (credits < item.price) {
            window.dispatchEvent(new CustomEvent('add-toast', { 
                detail: { message: 'Insufficient Nomad Credits! 💎', type: 'error' } 
            }));
            return;
        }

        spendCredits(item.price, `Purchased ${item.title}`);
        addXP(item.price);
        window.dispatchEvent(new CustomEvent('add-toast', { 
            detail: { message: `Unlocked ${item.title}! +${item.price} XP 📚`, type: 'success' } 
        }));
    };

    return (
        <div className="km-container">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Knowledge Marketplace (Nexus)</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Buy & sell travel expertise, guides, and consultations</p>
                </div>
                <div className="bt-wallet-mini">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Your Balance:</span>
                    <div style={{ color: '#F59E0B', fontWeight: 900, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Zap size={16} fill="currentColor" />
                        {credits} NC
                    </div>
                </div>
            </div>

            <div className="km-filters" style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
                <span className="job-tag" style={{ background: 'var(--cc-primary)', color: 'white' }}>All Knowledge</span>
                <span className="job-tag">Travel Guides</span>
                <span className="job-tag">Consultations</span>
                <span className="job-tag">Gear Lists</span>
            </div>

            <div className="km-grid">
                {items.map(item => (
                    <motion.div 
                        key={item.id} 
                        className="km-card"
                        whileHover={{ y: -6 }}
                    >
                        <div className="km-thumb">
                            <img src={item.image} alt={item.title} />
                            <div className="km-price-tag">
                                <Zap size={12} fill="currentColor" /> {item.price} NC
                            </div>
                        </div>
                        <div className="km-body">
                            <h4 className="km-title">{item.title}</h4>
                            <div className="km-author">
                                <Users size={12} />
                                <span>{item.author}</span>
                                <span>·</span>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#F59E0B' }}>
                                    <Star size={12} fill="currentColor" /> {item.rating}
                                </div>
                            </div>
                            <div className="km-meta" style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', opacity: 0.6, margin: '0.5rem 0' }}>
                                <Globe size={12} /> <span>{item.type}</span>
                                <Clock size={12} /> <span>{item.sales} sold</span>
                            </div>
                            <div className="km-footer">
                                <button 
                                    className="km-buy-btn"
                                    onClick={() => handlePurchase(item)}
                                >
                                    Unlock Knowledge
                                </button>
                                <ShoppingCart size={18} style={{ opacity: 0.4 }} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="fvw-view-all-btn" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
                <span>Become a Seller & Earn NC</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default KnowledgeMarket;
