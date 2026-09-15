import React, { useState } from 'react';
import { Sparkles, Lock, Star, Award, Globe, Zap, MapPin } from 'lucide-react';
import './NFTPassport.css';

const BADGES = [
    { id: 1, icon: '🗼', name: 'Paris Pioneer', rarity: 'Legendary', xp: 500, earned: true, location: 'Paris, France' },
    { id: 2, icon: '🗻', name: 'Summit Seeker', rarity: 'Rare', xp: 250, earned: true, location: 'Mount Fuji, Japan' },
    { id: 3, icon: '🏖️', name: 'Island Hopper', rarity: 'Common', xp: 100, earned: true, location: 'Santorini, Greece' },
    { id: 4, icon: '🏯', name: 'Kyoto Keeper', rarity: 'Rare', xp: 250, earned: true, location: 'Kyoto, Japan' },
    { id: 5, icon: '🌴', name: 'Jungle Explorer', rarity: 'Common', xp: 100, earned: false, location: '?' },
    { id: 6, icon: '🧊', name: 'Arctic Wanderer', rarity: 'Legendary', xp: 500, earned: false, location: '?' },
    { id: 7, icon: '🕌', name: 'Medina Master', rarity: 'Rare', xp: 250, earned: false, location: '?' },
    { id: 8, icon: '🎭', name: 'Culture Curator', rarity: 'Nomad Legend', xp: 1000, earned: false, location: '?' },
];

const RARITY_COLORS = {
    'Common': '#64748b',
    'Rare': '#8b5cf6',
    'Legendary': '#f59e0b',
    'Nomad Legend': 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
};

const RARITY_GLOW = {
    'Common': 'rgba(100,116,139,0.3)',
    'Rare': 'rgba(139,92,246,0.4)',
    'Legendary': 'rgba(245,158,11,0.4)',
    'Nomad Legend': 'rgba(236,72,153,0.4)',
};

const NFTPassport = () => {
    const [minting, setMinting] = useState(false);
    const [minted, setMinted] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    const earnedCount = BADGES.filter(b => b.earned).length;
    const totalXP = BADGES.filter(b => b.earned).reduce((acc, b) => acc + b.xp, 0);

    const handleMint = () => {
        setMinting(true);
        setTimeout(() => { setMinting(false); setMinted(true); }, 2000);
    };

    const filtered = activeFilter === 'all' ? BADGES : activeFilter === 'earned' ? BADGES.filter(b => b.earned) : BADGES.filter(b => !b.earned);

    return (
        <div className="nft-passport">
            {/* Holographic Passport Card */}
            <div className="passport-card">
                <div className="passport-holo" />
                <div className="passport-header">
                    <div className="passport-logo">✈️ SEENOMAD</div>
                    <div className="passport-type">DIGITAL NOMAD PASSPORT</div>
                </div>
                <div className="passport-body">
                    <div className="passport-avatar-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                            alt="Nomad"
                            className="passport-avatar"
                        />
                        <div className="passport-level">Lv.7</div>
                    </div>
                    <div className="passport-details">
                        <div className="passport-field"><span>NOMAD ID</span><strong>#NMD-0042</strong></div>
                        <div className="passport-field"><span>RANK</span><strong>Globetrotter</strong></div>
                        <div className="passport-field"><span>TOTAL XP</span><strong>{totalXP.toLocaleString()} XP</strong></div>
                        <div className="passport-field"><span>STAMPS</span><strong>{earnedCount}/{BADGES.length}</strong></div>
                    </div>
                </div>
                <div className="passport-footer">
                    <div className="passport-chain">⛓ Nomad Chain • Token #4218</div>
                    {!minted ? (
                        <button className={`passport-mint-btn ${minting ? 'loading' : ''}`} onClick={handleMint} disabled={minting}>
                            {minting ? <span className="mint-spinner" /> : <Sparkles size={14} />}
                            {minting ? 'Minting...' : 'Mint Passport'}
                        </button>
                    ) : (
                        <div className="passport-minted">✅ Minted on-chain!</div>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="passport-progress">
                <div className="progress-label">
                    <span>Collection Progress</span>
                    <span>{earnedCount}/{BADGES.length} Stamps</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${(earnedCount / BADGES.length) * 100}%` }} />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="badge-filters">
                {['all', 'earned', 'locked'].map(f => (
                    <button key={f} className={`badge-filter ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
                        {f === 'all' ? 'All Stamps' : f === 'earned' ? `✅ Earned (${earnedCount})` : `🔒 Locked`}
                    </button>
                ))}
            </div>

            {/* Badge Grid */}
            <div className="badge-grid">
                {filtered.map(badge => (
                    <div
                        key={badge.id}
                        className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                        style={{
                            '--rarity-color': RARITY_COLORS[badge.rarity],
                            '--rarity-glow': RARITY_GLOW[badge.rarity],
                        }}
                    >
                        <div className="badge-icon-wrap">
                            <span className="badge-icon">{badge.earned ? badge.icon : '🔒'}</span>
                            {badge.rarity === 'Nomad Legend' && badge.earned && (
                                <span className="badge-aura" />
                            )}
                        </div>
                        <div className="badge-info">
                            <strong className="badge-name">{badge.earned ? badge.name : '???'}</strong>
                            <span className="badge-rarity" style={{ background: badge.rarity === 'Nomad Legend' ? 'linear-gradient(135deg, #f59e0b, #ec4899)' : RARITY_COLORS[badge.rarity] }}>
                                {badge.rarity}
                            </span>
                            {badge.earned && (
                                <div className="badge-loc"><MapPin size={10} /> {badge.location}</div>
                            )}
                            <div className="badge-xp">+{badge.xp} XP</div>
                        </div>
                        {!badge.earned && (
                            <div className="badge-lock-overlay"><Lock size={20} /></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTPassport;
