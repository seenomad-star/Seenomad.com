import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Trophy, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import NomadReputationBadges from './NomadReputationBadges';
import { useNomadReputationStore } from '../../../store/nomadReputationStore';

const Achievements = () => {
    const navigate = useNavigate();
    const { reputationScore, rankTier, communityRank, badges } = useNomadReputationStore();
    const unlockedCount = badges.filter(b => b.unlocked).length;

    return (
        <div className="hub-section fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="section-header-hub" style={{ flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.75rem', fontWeight: 800 }}>
                        Nomad <span className="gradient-text">Reputation & Achievements</span>
                    </h1>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>
                        Track your verified badges, community trust score, and pin achievements to your public nomad profile.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/user/profile?tab=reputation')}
                        className="btn-hub-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                    >
                        <User size={15} />
                        <span>View on My Profile</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Nomad Reputation Badges Module */}
            <NomadReputationBadges />
        </div>
    );
};

export default Achievements;
