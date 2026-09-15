import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Zap, Filter, DollarSign, Globe, Code, Camera, Layout } from 'lucide-react';
import '../styles/Professional.css';

const NomadGigs = () => {
    const [filter, setFilter] = useState('all');

    const gigs = [
        {
            id: 1,
            title: 'UI/UX Designer for Travel App',
            company: 'Wanderlust AI',
            location: 'Remote (Anywhere)',
            type: 'Contract',
            price: '$3,500 - $5,000',
            tags: ['UI/UX', 'Figma', 'Travel'],
            category: 'design',
            isHot: true
        },
        {
            id: 2,
            title: 'Professional Photographer for Resort',
            company: 'Azure Sands Resort',
            location: 'Maldives',
            type: 'Bounties (Paid + Stay)',
            price: 'Free Room + $200/Day',
            tags: ['Photography', 'Drone', 'Social Media'],
            category: 'media'
        },
        {
            id: 3,
            title: 'React Native Mobile Developer',
            company: 'NomadPay',
            location: 'Remote (Europe/Asia)',
            type: 'Full-time',
            price: '80K - 120K (Crypto Optional)',
            tags: ['React Native', 'TypeScript', 'Web3'],
            category: 'dev'
        }
    ];

    const filteredGigs = filter === 'all' ? gigs : gigs.filter(g => g.category === filter);

    return (
        <div className="professional-container">
            <div className="section-header-hub">
                <div className="header-text">
                    <h1>Nomad Gig Board</h1>
                    <p>Found 128 open opportunities for travelers this week.</p>
                </div>
                <button className="btn-hub-primary"><Zap size={16}/> Post a Gig</button>
            </div>

            <div className="gigs-filter-bar">
                {['all', 'dev', 'design', 'media', 'marketing'].map(f => (
                    <button 
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
                <button className="filter-btn ml-auto"><Filter size={16}/> More Filters</button>
            </div>

            <div className="gigs-list">
                {filteredGigs.map((gig, index) => (
                    <motion.div 
                        key={gig.id}
                        className="gig-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="gig-header">
                            <div className="gig-info-main">
                                <div className="flex items-center gap-3">
                                    <div className="gig-icon-box">
                                        {gig.category === 'dev' ? <Code size={20}/> : 
                                         gig.category === 'design' ? <Layout size={20}/> : <Camera size={20}/>}
                                    </div>
                                    <div>
                                        <h3>{gig.title}</h3>
                                        <p>{gig.company} • {gig.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="gig-meta">
                                <span className="gig-price">{gig.price}</span>
                                <div className="gig-type-badge">{gig.type}</div>
                            </div>
                        </div>
                        <div className="gig-tags">
                            {gig.tags.map(tag => (
                                <span key={tag} className="gig-tag">{tag}</span>
                            ))}
                            {gig.isHot && <span className="gig-tag-hot">🔥 Trending</span>}
                        </div>
                        <div className="gig-footer mt-4 flex justify-between items-center">
                            <div className="pay-methods">
                                <DollarSign size={14} className="text-green-500" />
                                <Zap size={14} className="text-amber-500" />
                                <span>Fast Payout in USD or NomadCoins</span>
                            </div>
                            <button className="btn-hub-outline-small">Apply Now</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NomadGigs;
