import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    UserPlus, Share2, Copy, Gift, Zap, 
    CheckCircle, MessageSquare, Twitter, Instagram 
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const ReferralHub = () => {
    const { addCredits, addXP } = useNomadOSStore();
    const [referralCode] = useState("NOMAD-XP-842");

    const copyCode = () => {
        navigator.clipboard.writeText(referralCode);
        window.dispatchEvent(new CustomEvent('add-toast', { 
            detail: { message: 'Referral code copied! 📋', type: 'success' } 
        }));
    };

    const handleInvite = () => {
        window.dispatchEvent(new CustomEvent('add-toast', { 
            detail: { message: 'Invites sent to 3 mates! +10 XP 🚀', type: 'success' } 
        }));
        addXP(10);
    };

    return (
        <div className="referral-hub">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Referral Central</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Invite mates and earn Nomad Credits (NC)</p>
                </div>
                <div className="tier-badge">
                    <Gift size={16} />
                    <span>Gold Referrer</span>
                </div>
            </div>

            <div className="referral-bonus-card">
                <div className="bonus-content">
                    <h4>Earn 50 NC per mate</h4>
                    <p>When your mate cross-checks their first speed test or posts a Pulse, you both get 50 NC!</p>
                </div>
                <div className="bonus-amount">50 <span>NC</span></div>
            </div>

            <div className="referral-code-section">
                <label>Your Personal Invite Code</label>
                <div className="code-box">
                    <span>{referralCode}</span>
                    <button className="copy-btn" onClick={copyCode}><Copy size={18} /></button>
                </div>
            </div>

            <div className="share-buttons-grid">
                <button className="share-tile x"><Twitter size={20} /> <span>Twitter</span></button>
                <button className="share-tile ig"><Instagram size={20} /> <span>Instagram</span></button>
                <button className="share-tile wa"><MessageSquare size={20} /> <span>WhatsApp</span></button>
                <button className="share-tile more" onClick={handleInvite}><UserPlus size={20} /> <span>Invites</span></button>
            </div>

            <div className="invite-history">
                <h5>Recent Referrals</h5>
                <div className="history-list">
                    {[
                        { name: "Tech_Alex", status: "Joined", earned: "50 NC", date: "2 days ago" },
                        { name: "Nomad_Nic", status: "Pending", earned: "0 NC", date: "5 days ago" }
                    ].map((r, i) => (
                        <div key={i} className="history-item">
                            <div className="h-avatar">{r.name.substring(0, 1)}</div>
                            <div className="h-info">
                                <strong>{r.name}</strong>
                                <span>{r.date}</span>
                            </div>
                            <div className={`h-status ${r.status.toLowerCase()}`}>{r.status}</div>
                            <div className="h-earned">{r.earned}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralHub;
