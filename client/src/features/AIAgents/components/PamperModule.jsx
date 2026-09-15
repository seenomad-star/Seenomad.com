import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Gift, Sparkles, X, 
    CheckCircle2, ArrowRight,
    Map, CreditCard, BookOpen
} from 'lucide-react';
import { useUserProfileStore } from '../../../store/userProfileStore';

const PamperModule = ({ trigger }) => {
    const [show, setShow] = useState(false);
    const { addReward } = useUserProfileStore();
    
    const [perk, setPerk] = useState(null);

    // Mock pamper library
    const perks = [
        { id: 'kyoto-secret', title: 'Secret Tea House Map', type: 'guide', icon: <Map size={18} />, desc: '3 hidden gems in Northern Kyoto.' },
        { id: 'nc-bonus', title: '50 Nomad Credits', type: 'currency', icon: <CreditCard size={18} />, desc: 'Added to your wallet for local warungs.' },
        { id: 'visa-fast', title: 'VIP Visa Guide', type: 'doc', icon: <BookOpen size={18} />, desc: 'Skip the line hacks for SE Asia.' }
    ];

    useEffect(() => {
        if (trigger) {
            const randomPerk = perks[Math.floor(Math.random() * perks.length)];
            setPerk(randomPerk);
            setShow(true);
            
            // Auto-add to vault
            addReward({
                ...randomPerk,
                claimed: false,
                timestamp: new Date()
            });
        }
    }, [trigger]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="pamper-module-container"
                >
                    <div className="pamper-card">
                        <button className="close-pamper" onClick={() => setShow(false)}>
                            <X size={14} />
                        </button>
                        
                        <div className="pamper-header">
                            <Sparkles size={20} className="sparkle-icon" />
                            <span>AI Pamper Moment</span>
                        </div>

                        <div className="pamper-content">
                            <div className="p-icon-box">{perk?.icon}</div>
                            <div className="p-text">
                                <h3>{perk?.title}</h3>
                                <p>{perk?.desc}</p>
                            </div>
                        </div>

                        <div className="pamper-footer">
                            <div className="p-success">
                                <CheckCircle2 size={14} />
                                <span>Added to your Vault</span>
                            </div>
                            <button className="view-vault-btn">
                                Open Vault <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PamperModule;
