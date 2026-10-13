import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award, ShieldCheck, Globe, Wifi, Landmark, Flame, Users, Zap,
    Star, Check, Lock, Pin, Trophy, Sparkles, ChevronRight, X,
    CheckCircle, Shield, ArrowUpRight, HelpCircle
} from 'lucide-react';
import { useNomadReputationStore } from '../../../store/nomadReputationStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useToastStore } from '../../../store/toastStore';
import './NomadReputationBadges.css';

// Icon mapping helper
export const renderBadgeIcon = (iconName, size = 20) => {
    switch (iconName) {
        case 'Award': return <Award size={size} />;
        case 'ShieldCheck': return <ShieldCheck size={size} />;
        case 'Globe': return <Globe size={size} />;
        case 'Wifi': return <Wifi size={size} />;
        case 'Landmark': return <Landmark size={size} />;
        case 'Flame': return <Flame size={size} />;
        case 'Users': return <Users size={size} />;
        case 'Zap': return <Zap size={size} />;
        default: return <Award size={size} />;
    }
};

const NomadReputationBadges = () => {
    const {
        reputationScore,
        maxReputation,
        rankTier,
        communityRank,
        pillarScores,
        badges,
        togglePinBadge,
        claimBadgeReward
    } = useNomadReputationStore();

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();

    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedBadge, setSelectedBadge] = useState(null);

    const handlePin = (e, badge) => {
        e.stopPropagation();
        if (!badge.unlocked) {
            addToast('Complete badge milestones to unlock and pin to your profile', 'info');
            return;
        }
        const res = togglePinBadge(badge.id);
        if (res === 'MAX_REACHED') {
            addToast('You can pin up to 4 featured badges to your profile hero', 'warning');
        } else if (res) {
            addToast(badge.isPinned ? `Unpinned "${badge.title}" from profile` : `Pinned "${badge.title}" to featured profile hero!`, 'success');
        }
    };

    const handleClaim = (e, badge) => {
        e.stopPropagation();
        const claimed = claimBadgeReward(badge.id);
        if (claimed) {
            addXP(badge.xpReward);
            addToast(`🎖️ Claimed badge perk! +${badge.xpReward} XP & +${badge.reputationReward} Reputation added!`, 'success');
        }
    };

    const filteredBadges = badges.filter(badge => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'unlocked') return badge.unlocked;
        if (activeFilter === 'in_progress') return !badge.unlocked;
        if (activeFilter === 'pinned') return badge.isPinned;
        return badge.category.toLowerCase().includes(activeFilter.toLowerCase());
    });

    const unlockedCount = badges.filter(b => b.unlocked).length;

    return (
        <div className="nomad-reputation-container">
            {/* 1. Reputation Score & Pillar Mastery Hero */}
            <div className="reputation-score-card">
                <div className="reputation-overview-main">
                    <div className="reputation-crest-cluster">
                        <div className="reputation-score-ring">
                            <svg className="ring-svg" viewBox="0 0 120 120">
                                <circle 
                                    className="ring-track" 
                                    cx="60" 
                                    cy="60" 
                                    r="50" 
                                />
                                <circle 
                                    className="ring-progress" 
                                    cx="60" 
                                    cy="60" 
                                    r="50" 
                                    style={{
                                        strokeDasharray: 314,
                                        strokeDashoffset: 314 - (314 * (reputationScore / maxReputation))
                                    }}
                                />
                            </svg>
                            <div className="ring-center-content">
                                <span className="ring-score-val">{reputationScore}</span>
                                <span className="ring-score-max">/ {maxReputation}</span>
                            </div>
                        </div>

                        <div className="reputation-title-stack">
                            <div className="reputation-tier-row">
                                <span className="prestige-tier-badge">{rankTier}</span>
                                <span className="reputation-rank-text">{communityRank}</span>
                            </div>
                            <h2 className="reputation-heading">Nomad Reputation & Trust Score</h2>
                            <p className="reputation-desc">
                                Verified algorithmic trust index calculated from verified coworker reviews, legal visa audits, speed tests, and peer endorsements.
                            </p>
                        </div>
                    </div>

                    <div className="reputation-stats-pills">
                        <div className="rep-stat-box">
                            <Trophy size={16} className="text-amber-400" />
                            <strong>{unlockedCount} / {badges.length}</strong>
                            <span>Badges Earned</span>
                        </div>
                        <div className="rep-stat-box">
                            <Sparkles size={16} className="text-sky-400" />
                            <strong>{badges.filter(b => b.isPinned).length} Pinned</strong>
                            <span>Featured on Profile</span>
                        </div>
                        <div className="rep-stat-box">
                            <ShieldCheck size={16} className="text-emerald-400" />
                            <strong>Top 5%</strong>
                            <span>Global Trust Tier</span>
                        </div>
                    </div>
                </div>

                {/* 4 Pillars of Nomad Reputation */}
                <div className="reputation-pillars-grid">
                    <div className="rep-pillar-card">
                        <div className="pillar-header">
                            <Award size={15} className="text-amber-400" />
                            <span>Community & Reviews</span>
                            <strong>{pillarScores.contributions}%</strong>
                        </div>
                        <div className="pillar-progress-track">
                            <div className="pillar-progress-fill" style={{ width: `${pillarScores.contributions}%`, backgroundColor: '#f59e0b' }} />
                        </div>
                    </div>

                    <div className="rep-pillar-card">
                        <div className="pillar-header">
                            <ShieldCheck size={15} className="text-sky-400" />
                            <span>Visa & Legal Mastery</span>
                            <strong>{pillarScores.visaMastery}%</strong>
                        </div>
                        <div className="pillar-progress-track">
                            <div className="pillar-progress-fill" style={{ width: `${pillarScores.visaMastery}%`, backgroundColor: '#38bdf8' }} />
                        </div>
                    </div>

                    <div className="rep-pillar-card">
                        <div className="pillar-header">
                            <Globe size={15} className="text-emerald-400" />
                            <span>Remote Exploration</span>
                            <strong>{pillarScores.exploration}%</strong>
                        </div>
                        <div className="pillar-progress-track">
                            <div className="pillar-progress-fill" style={{ width: `${pillarScores.exploration}%`, backgroundColor: '#10b981' }} />
                        </div>
                    </div>

                    <div className="rep-pillar-card">
                        <div className="pillar-header">
                            <Users size={15} className="text-purple-400" />
                            <span>Peer Endorsement Trust</span>
                            <strong>{pillarScores.peerTrust}%</strong>
                        </div>
                        <div className="pillar-progress-track">
                            <div className="pillar-progress-fill" style={{ width: `${pillarScores.peerTrust}%`, backgroundColor: '#c084fc' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Interactive Filter Rails */}
            <div className="badge-filter-bar">
                <div className="badge-filter-tabs">
                    {[
                        { id: 'all', label: `All Badges (${badges.length})` },
                        { id: 'unlocked', label: `Earned (${unlockedCount})` },
                        { id: 'pinned', label: `Pinned (${badges.filter(b => b.isPinned).length})` },
                        { id: 'in_progress', label: `In Progress (${badges.length - unlockedCount})` }
                    ].map(f => (
                        <button
                            key={f.id}
                            type="button"
                            className={`badge-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="filter-hint-text">
                    <Pin size={13} className="text-amber-400" />
                    <span>Pin up to 4 badges to showcase on your profile hero</span>
                </div>
            </div>

            {/* 3. Badges Grid */}
            <div className="badges-showcase-grid">
                {filteredBadges.map((badge) => {
                    const isUnlocked = badge.unlocked;
                    return (
                        <motion.div
                            key={badge.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'} tier-${badge.tier.toLowerCase()}`}
                            onClick={() => setSelectedBadge(badge)}
                        >
                            {/* Pin ribbon toggle */}
                            {isUnlocked && (
                                <button
                                    type="button"
                                    className={`badge-pin-btn ${badge.isPinned ? 'pinned' : ''}`}
                                    onClick={(e) => handlePin(e, badge)}
                                    title={badge.isPinned ? 'Unpin from profile hero' : 'Pin to profile hero'}
                                    aria-label="Toggle pinned status"
                                >
                                    <Pin size={13} />
                                    <span>{badge.isPinned ? 'Pinned' : 'Pin'}</span>
                                </button>
                            )}

                            {/* Badge Icon Emblem */}
                            <div 
                                className="badge-emblem-wrap" 
                                style={{ 
                                    borderColor: isUnlocked ? badge.color : 'rgba(255,255,255,0.1)',
                                    boxShadow: isUnlocked ? `0 0 20px ${badge.glow}` : 'none'
                                }}
                            >
                                <div className="badge-icon-inner" style={{ color: isUnlocked ? badge.color : '#64748b' }}>
                                    {isUnlocked ? renderBadgeIcon(badge.iconName, 26) : <Lock size={22} />}
                                </div>
                                <span className={`badge-tier-tag tier-tag-${badge.tier.toLowerCase()}`}>
                                    {badge.tier}
                                </span>
                            </div>

                            {/* Badge Header & Info */}
                            <div className="badge-content">
                                <div className="badge-title-row">
                                    <h3 className="badge-title">{badge.title}</h3>
                                    <span className="badge-category-label">{badge.category}</span>
                                </div>

                                <p className="badge-desc">{badge.desc}</p>

                                {/* Progress Bar / Verification details */}
                                {isUnlocked ? (
                                    <div className="badge-unlocked-status">
                                        <div className="unlocked-check-meta">
                                            <CheckCircle size={14} className="text-emerald-400" />
                                            <span>{badge.metricLabel}</span>
                                        </div>
                                        <span className="unlocked-date">Unlocked {badge.unlockedAt}</span>
                                    </div>
                                ) : (
                                    <div className="badge-progress-wrap">
                                        <div className="progress-labels">
                                            <span className="target-metric">{badge.metricLabel}</span>
                                            <span className="progress-pct">{badge.progress}%</span>
                                        </div>
                                        <div className="badge-progress-track">
                                            <div 
                                                className="badge-progress-fill" 
                                                style={{ width: `${badge.progress}%`, backgroundColor: badge.color }} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Reward Claim Action */}
                            {isUnlocked && !badge.claimedReward && (
                                <div className="badge-claim-action">
                                    <button
                                        type="button"
                                        onClick={(e) => handleClaim(e, badge)}
                                        className="btn-claim-reward"
                                    >
                                        <Sparkles size={13} />
                                        <span>Claim +{badge.xpReward} XP Reward</span>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* 4. Badge Detailed Inspection Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <div className="badge-modal-backdrop" onClick={() => setSelectedBadge(null)} role="dialog" aria-modal="true">
                        <motion.div
                            className="badge-modal-card"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="badge-modal-header">
                                <div className="flex items-center gap-2">
                                    <Award size={20} style={{ color: selectedBadge.color }} />
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                                        {selectedBadge.title}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedBadge(null)}
                                    className="edit-profile-close-btn"
                                    aria-label="Close modal"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="badge-modal-body">
                                <div 
                                    className="badge-modal-emblem" 
                                    style={{ 
                                        borderColor: selectedBadge.color,
                                        boxShadow: `0 0 25px ${selectedBadge.glow}`
                                    }}
                                >
                                    <div style={{ color: selectedBadge.color }}>
                                        {renderBadgeIcon(selectedBadge.iconName, 42)}
                                    </div>
                                    <span className={`badge-tier-tag tier-tag-${selectedBadge.tier.toLowerCase()}`}>
                                        {selectedBadge.tier} Prestige
                                    </span>
                                </div>

                                <div className="modal-badge-meta-block">
                                    <h4 className="modal-badge-name">{selectedBadge.title}</h4>
                                    <span className="modal-badge-cat">{selectedBadge.category} Achievement</span>
                                    <p className="modal-badge-desc">{selectedBadge.desc}</p>
                                </div>

                                <div className="badge-criteria-box">
                                    <h5>Milestone Verification Criteria:</h5>
                                    <ul>
                                        <li>Status: <strong>{selectedBadge.unlocked ? 'Verified & Complete' : 'In Progress'}</strong></li>
                                        <li>Progress Metric: <strong>{selectedBadge.metricLabel}</strong></li>
                                        <li>Reputation Score Value: <strong>+{selectedBadge.reputationReward} Points</strong></li>
                                        <li>Nomad OS XP Reward: <strong>+{selectedBadge.xpReward} XP</strong></li>
                                        {selectedBadge.unlockedAt && (
                                            <li>Certified Date: <strong>{selectedBadge.unlockedAt}</strong></li>
                                        )}
                                    </ul>
                                </div>

                                <div className="modal-actions-row">
                                    {selectedBadge.unlocked && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                handlePin(e, selectedBadge);
                                                setSelectedBadge(null);
                                            }}
                                            className="btn-hub-primary"
                                        >
                                            <Pin size={15} />
                                            <span>{selectedBadge.isPinned ? 'Unpin from Hero Profile' : 'Pin to Hero Profile'}</span>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBadge(null)}
                                        className="btn-hero-action outline"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadReputationBadges;
