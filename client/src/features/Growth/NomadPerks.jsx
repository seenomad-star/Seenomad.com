import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, Zap, Star, 
    Lock, CheckCircle, ArrowRight,
    Search, Filter, Globe,
    Book, UserCircle, Cpu
} from 'lucide-react';
import { useUserProfileStore } from '../../store/userProfileStore';

const NomadPerks = () => {
    const { dna, level, xp, addReward } = useUserProfileStore();
    const [purchased, setPurchased] = useState(null);

    const perks = [
        { id: 'secret-bali', name: 'Secret Bali Warung Guide', price: 150, type: 'Guide', icon: <Book size={18} />, locked: false },
        { id: 'tokyo-speed', name: 'Tokyo 5G Hidden Zones', price: 200, type: 'Intel', icon: <Globe size={18} />, locked: false },
        { id: 'atlas-pro', name: 'Atlas Pro Personalities', price: 500, type: 'AI', icon: <Cpu size={18} />, locked: level < 5 },
        { id: 'visa-fast', name: 'Express Visa AI Handler', price: 1000, type: 'Service', icon: <UserCircle size={18} />, locked: level < 10 }
    ];

    const handlePurchase = (perk) => {
        addReward({
            ...perk,
            claimed: true,
            timestamp: new Date(),
            desc: `Purchased via Marketplace: ${perk.name}`
        });
        setPurchased(perk.name);
        setTimeout(() => setPurchased(null), 3000);
    };

    return (
        <div className="nomad-perks-container">
            <div className="perks-header">
                <div className="h-left">
                    <ShoppingBag size={24} className="bag-icon" />
                    <h2>Perks Marketplace</h2>
                </div>
                <div className="h-right">
                    <div className="nc-display">
                        <Zap size={14} fill="#F59E0B" />
                        <span>1,240 NC Available</span>
                    </div>
                </div>
            </div>

            <div className="premium-flash-deal">
                <div className="deal-info">
                    <span className="deal-badge">FLASH DEAL</span>
                    <h3>Secret Nomads of Ubud Guide</h3>
                    <p>Exclusive connection list to top digital agencies in Bali.</p>
                </div>
                <button className="deal-btn">
                    75% OFF <ArrowRight size={14} />
                </button>
            </div>

            <div className="perks-grid">
                {perks.map(perk => (
                    <motion.div 
                        key={perk.id}
                        whileHover={!perk.locked ? { scale: 1.02 } : {}}
                        className={`perk-card-market ${perk.locked ? 'locked' : ''}`}
                    >
                        <div className="p-icon-box">{perk.icon}</div>
                        <div className="p-details">
                            <span className="p-type">{perk.type}</span>
                            <h4>{perk.name}</h4>
                            <div className="p-footer">
                                <span className="p-price">{perk.price} NC</span>
                                {perk.locked ? (
                                    <div className="p-lock">
                                        <Lock size={12} /> LVL {perk.id === 'atlas-pro' ? 5 : 10}
                                    </div>
                                ) : (
                                    <button className="p-buy-btn" onClick={() => handlePurchase(perk)}>
                                        Unlock
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {purchased && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="purchase-toast"
                    >
                        <CheckCircle size={18} />
                        <span>{purchased} unlocked and added to Vault!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadPerks;
