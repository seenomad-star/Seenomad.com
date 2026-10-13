import React from 'react';
import { 
    Globe, 
    ArrowUp, 
    Share2, 
    CheckCircle2, 
    Sparkles, 
    ShieldCheck, 
    Edit3,
    Award
} from 'lucide-react';
import './ProfileEndFootbar.css';

const ProfileEndFootbar = ({
    profile,
    level = 12,
    dailyStreak = 14,
    badgeCount = 12,
    onEditProfile,
    onShareProfile
}) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="profile-end-container">
            <section className="profile-end-footbar-card" aria-label="Nomad Citizen Profile Footbar Card">
                {/* Status Indicator Banner */}
                <div className="profile-stream-status-row">
                    <div className="profile-stream-indicator">
                        <span className="profile-live-pulse" />
                        <span className="profile-stream-tag">
                            NOMAD CITIZEN NODE #{profile?.citizenshipId || 'ND-8842-X7'}
                        </span>
                    </div>
                    <div className="profile-stream-meta">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Global Nodes Synced</span>
                    </div>
                </div>

                {/* Main Milestone Content */}
                <div className="profile-end-content">
                    <div className="profile-end-badge">
                        <ShieldCheck size={24} className="text-sky-500" />
                    </div>
                    <h3 className="profile-end-title">
                        {profile?.name || 'Alex Rivera'}'s Verified Nomad Passport
                    </h3>
                    <p className="profile-end-desc">
                        Active in {profile?.location || 'Lisbon, Portugal'}. Lv.{level} Explorer with a {dailyStreak}-day streak, {profile?.stats?.countriesVisited || 18} countries explored, and {badgeCount} reputation badges earned across global nomad hubs.
                    </p>

                    <div className="profile-end-actions">
                        {onEditProfile && (
                            <button
                                type="button"
                                className="profile-end-edit-btn"
                                onClick={onEditProfile}
                            >
                                <Edit3 size={14} />
                                <span>Edit Profile</span>
                            </button>
                        )}
                        {onShareProfile && (
                            <button
                                type="button"
                                className="profile-end-share-btn"
                                onClick={onShareProfile}
                            >
                                <Share2 size={14} />
                                <span>Share Passport</span>
                            </button>
                        )}
                        <button
                            type="button"
                            className="profile-back-to-top-btn"
                            onClick={scrollToTop}
                            title="Smooth scroll back to the top of the profile"
                        >
                            <ArrowUp size={14} />
                            <span>Back to Top</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileEndFootbar;
