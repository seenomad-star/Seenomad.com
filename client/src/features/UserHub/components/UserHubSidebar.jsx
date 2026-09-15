import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Wallet, Tag, Award, Map, Zap, TrendingUp,
    ChevronRight, Star, Gift, Target, Briefcase, UserCheck, Globe, DollarSign,
    Heart, Share2
} from 'lucide-react';

const UserHubSidebar = () => {
    const navItems = [
        { id: 'wallet', label: 'Wallet', icon: Wallet, to: '/user/wallet' },
        { id: 'impact', label: 'Impact & XP', icon: Target, to: '/user/impact' },
        { id: 'referrals', label: 'Referral Hub', icon: Share2, to: '/user/referrals' },
        { id: 'nomad-cv', label: 'Professional Profile', icon: UserCheck, to: '/user/profile' },
        { id: 'budget', label: 'AI Budgeting', icon: DollarSign, to: '/user/budget' },
        { id: 'nomad-gigs', label: 'Professional Gigs', icon: Briefcase, to: '/user/gigs' },
        { id: 'travel-journey', label: 'Travel Journey', icon: Globe, to: '/user/travel-journey' },
        { id: 'offers', label: 'Exclusive Offers', icon: Tag, to: '/user/offers', badge: '5' },
        { id: 'achievements', label: 'Achievements', icon: Award, to: '/user/achievements' },
        { id: 'hunts', label: 'Treasure Hunts', icon: Map, to: '/user/hunts' },
        { id: 'flash-missions', label: 'Flash Missions', icon: Zap, to: '/user/flash-missions', badge: 'New' },
        { id: 'xp-tracker', label: 'XP & Level', icon: TrendingUp, to: '/user/xp-tracker' },
    ];

    return (
        <aside className="user-hub-sidebar">
            <div className="user-hub-profile-mini">
                <div className="avatar-ring">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                    <div className="level-badge">Lv.24</div>
                </div>
                <div className="profile-info">
                    <h3>John Doe</h3>
                    <div className="xp-bar-mini">
                        <div className="xp-progress" style={{ width: '65%' }}></div>
                    </div>
                    <span>1,240 / 2,000 XP</span>
                </div>
            </div>

            <nav className="user-hub-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={item.to}
                        className={({ isActive }) => `hub-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <div className="item-icon">
                            <item.icon size={20} />
                        </div>
                        <span>{item.label}</span>
                        {item.badge && <span className="hub-badge">{item.badge}</span>}
                        <ChevronRight size={16} className="chevron" />
                    </NavLink>
                ))}
            </nav>

            <div className="hub-quick-stats">
                <div className="stat-box">
                    <Star size={16} className="text-yellow-500" />
                    <div className="stat-content">
                        <span className="stat-value">4.8</span>
                        <span className="stat-label">Rating</span>
                    </div>
                </div>
                <div className="stat-box">
                    <Gift size={16} className="text-pink-500" />
                    <div className="stat-content">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Rewards</span>
                    </div>
                </div>
                <div className="stat-box">
                    <Target size={16} className="text-blue-500" />
                    <div className="stat-content">
                        <span className="stat-value">85%</span>
                        <span className="stat-label">Impact</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default UserHubSidebar;
