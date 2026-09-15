import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Building2, Users, Briefcase, 
    ArrowRight, MapPin, Calendar, 
    DollarSign, MessageSquare, ChevronRight,
    Search, Filter, Plus, ShieldCheck
} from 'lucide-react';
import JobBoard from './components/JobBoard';
import PackageMarket from './components/PackageMarket';
import BiddingUI from './components/BiddingUI';

const TrivenlyHub = () => {
    const [view, setView] = useState('landing'); // 'landing', 'institutional', 'consumer', 'agency'
    const [userType, setUserType] = useState(null); // 'INSTITUTION', 'AGENCY', 'TRAVELER'

    return (
        <div className="trivenly-hub-container">
            {view === 'landing' ? (
                <div className="trivenly-landing">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="landing-hero"
                    >
                        <div className="trivenly-logo">
                            <ShieldCheck size={40} className="logo-spark" />
                            <h1>Trivenly</h1>
                        </div>
                        <p className="hero-tagline">Indonesia's Premium Travel B2B & B2C Marketplace</p>
                        <p className="hero-desc">Connecting Institutions, Travel Agencies, and Adventurers in one unified ecosystem.</p>
                    </motion.div>

                    <div className="portal-selection">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="portal-card institutional"
                            onClick={() => { setView('institutional'); setUserType('INSTITUTION'); }}
                        >
                            <Building2 size={48} className="p-icon" />
                            <h3>Institutional Portal</h3>
                            <p>For Universities, Schools, and Gov. Post trip RFPs and find the best agencies.</p>
                            <div className="portal-action">Create Job Post <ArrowRight size={16} /></div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="portal-card consumer"
                            onClick={() => { setView('consumer'); setUserType('TRAVELER'); }}
                        >
                            <Users size={48} className="p-icon" />
                            <h3>Traveler Hub</h3>
                            <p>Book exclusive Private or Open Trip packages curated by top agencies.</p>
                            <div className="portal-action">Explore Packages <ArrowRight size={16} /></div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="portal-card agency"
                            onClick={() => { setView('agency'); setUserType('AGENCY'); }}
                        >
                            <Briefcase size={48} className="p-icon" />
                            <h3>Agency Dashboard</h3>
                            <p>Bid for institutional jobs and sell your own travel packages direct to clients.</p>
                            <div className="portal-action">Grow Your Business <ArrowRight size={16} /></div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div className="trivenly-active-view">
                    <header className="view-header">
                        <button className="back-to-landing" onClick={() => setView('landing')}>
                            <ShieldCheck size={20} />
                            <span>Trivenly Hub</span>
                        </button>
                        <div className="header-status">
                            <span className="user-badge">{userType} MODE</span>
                        </div>
                    </header>

                    <main className="view-content">
                        {view === 'institutional' && <JobBoard mode="POST" />}
                        {view === 'consumer' && <PackageMarket />}
                        {view === 'agency' && <JobBoard mode="BID" />}
                    </main>
                </div>
            )}
        </div>
    );
};

export default TrivenlyHub;
