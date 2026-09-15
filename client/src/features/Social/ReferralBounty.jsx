import React from 'react';
import { Gift, Copy, Share2, Users, DollarSign, Star } from 'lucide-react';
import '../../styles/ReferralBounty.css';

const ReferralBounty = () => {
    const referralStats = [
        { label: 'Total Invites', val: '24', icon: Users },
        { label: 'Coins Earned', val: '12,500', icon: Star },
        { label: 'Cash Value', val: '$125', icon: DollarSign }
    ];

    return (
        <div className="referral-bounty-container">
            <div className="rb-hero">
                <Gift size={48} color="#A855F7" />
                <h1>Referral <span>Bounty Hub</span></h1>
                <p>Don't travel alone. Bring your tribe and earn Traveluh Coins for every booking they make.</p>
            </div>

            <div className="rb-stats-row">
                {referralStats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div className="rb-stat-card" key={i}>
                            <Icon size={20} color="#A855F7" />
                            <div className="rb-stat-meta">
                                <h3>{s.val}</h3>
                                <span>{s.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="rb-link-section">
                <h3>Your Personal Invite Link</h3>
                <div className="link-box">
                    <input type="text" readOnly value="traveluh.os/ref/nomad_legend_88" />
                    <button className="copy-link"><Copy size={16} /> Copy</button>
                </div>
                <div className="share-grid">
                    <button className="s-icon whatsapp">WhatsApp</button>
                    <button className="s-icon twitter">Twitter</button>
                    <button className="s-icon telegram">Telegram</button>
                </div>
            </div>

            <div className="rb-rewards-tier">
                <h3>Milestone Rewards</h3>
                <div className="tier-list">
                    <div className="tier-item active">
                        <div className="tier-rank">1</div>
                        <div className="tier-info">
                            <strong>Novice Scout</strong>
                            <span>5 Invites - 1,000 Coins</span>
                        </div>
                        <div className="tier-check">✓</div>
                    </div>
                    <div className="tier-item">
                        <div className="tier-rank">2</div>
                        <div className="tier-info">
                            <strong>Global Ambassador</strong>
                            <span>25 Invites - 10,000 Coins</span>
                        </div>
                        <div className="tier-progress">12/25</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralBounty;
