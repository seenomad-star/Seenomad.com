import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Wallet, Tag, Award, Map, Zap, TrendingUp,
    ChevronRight, Star, Gift, Target, Briefcase, UserCheck, Globe, DollarSign,
    Share2, Bookmark, User, MessageCircle, Bell, Settings as SettingsIcon
} from 'lucide-react';
import { useSavedStore } from '../../../store/savedStore';

const UserHubSidebar = () => {
    const savedCount = useSavedStore((state) => state.savedDestinations.length);

    // Core Account Features matching the canonical top-right Account dropdown & user's reference
    const primaryAccountItems = [
        { id: 'nomad-cv', label: 'My Profile', icon: User, to: '/user/profile', badge: 'Verified' },
        { id: 'messages', label: 'Messages', icon: MessageCircle, to: '/user/messages', badge: '3' },
        { id: 'notifications', label: 'Notifications', icon: Bell, to: '/user/notifications', badge: '4' },
        { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet, to: '/user/wallet' },
        { id: 'earnings', label: 'Earnings & Creator Tools', icon: DollarSign, to: '/user/earnings', badge: 'Pro' },
        { id: 'settings', label: 'Settings & Theme', icon: SettingsIcon, to: '/user/settings' },
    ];

    const passportAndGrowthItems = [
        { id: 'travel-journey', label: 'Travel Journey', icon: Globe, to: '/user/travel-journey' },
        { id: 'favorites', label: 'Saved & Wishlist', icon: Bookmark, to: '/user/favorites', badge: savedCount > 0 ? String(savedCount) : null },
        { id: 'achievements', label: 'Achievements & Stamps', icon: Award, to: '/user/achievements' },
        { id: 'xp-tracker', label: 'XP & Level', icon: TrendingUp, to: '/user/xp-tracker' },
        { id: 'impact', label: 'Impact & XP', icon: Target, to: '/user/impact' },
        { id: 'budget', label: 'AI Budgeting', icon: DollarSign, to: '/user/budget' },
        { id: 'nomad-gigs', label: 'Professional Gigs', icon: Briefcase, to: '/user/gigs' },
        { id: 'referrals', label: 'Referral Hub', icon: Share2, to: '/user/referrals' },
        { id: 'offers', label: 'Exclusive Offers', icon: Tag, to: '/user/offers', badge: '5' },
        { id: 'hunts', label: 'Treasure Hunts', icon: Map, to: '/user/hunts' },
        { id: 'flash-missions', label: 'Flash Missions', icon: Zap, to: '/user/flash-missions', badge: 'New' },
    ];

    return (
        <aside className="user-hub-sidebar">
            <div className="user-hub-profile-mini">
                <div className="avatar-ring">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" alt="Alex Rivera" />
                    <div className="level-badge">Lv.12</div>
                </div>
                <div className="profile-info">
                    <h3>Alex Rivera</h3>
                    <div className="xp-bar-mini">
                        <div className="xp-progress" style={{ width: '65%' }}></div>
                    </div>
                    <span>Elite Explorer • 14 Stamps</span>
                </div>
            </div>

            <div className="hub-nav-group">
                <div className="hub-nav-kicker">ACCOUNT & CREATOR</div>
                <nav className="user-hub-nav">
                    {primaryAccountItems.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            className={({ isActive }) => `hub-nav-item ${isActive ? 'active' : ''}`}
                        >
                            <div className="item-icon">
                                <item.icon size={18} />
                            </div>
                            <span>{item.label}</span>
                            {item.badge && <span className="hub-badge">{item.badge}</span>}
                            <ChevronRight size={15} className="chevron" />
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="hub-nav-group">
                <div className="hub-nav-kicker">PASSPORT & MISSIONS</div>
                <nav className="user-hub-nav">
                    {passportAndGrowthItems.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            className={({ isActive }) => `hub-nav-item ${isActive ? 'active' : ''}`}
                        >
                            <div className="item-icon">
                                <item.icon size={18} />
                            </div>
                            <span>{item.label}</span>
                            {item.badge && <span className="hub-badge">{item.badge}</span>}
                            <ChevronRight size={15} className="chevron" />
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="hub-quick-stats">
                <div className="stat-box">
                    <Star size={16} className="text-yellow-500" />
                    <div className="stat-content">
                        <span className="stat-value">4.9</span>
                        <span className="stat-label">Rating</span>
                    </div>
                </div>
                <div className="stat-box">
                    <Gift size={16} className="text-pink-500" />
                    <div className="stat-content">
                        <span className="stat-value">14</span>
                        <span className="stat-label">Stamps</span>
                    </div>
                </div>
                <div className="stat-box">
                    <Target size={16} className="text-blue-500" />
                    <div className="stat-content">
                        <span className="stat-value">92%</span>
                        <span className="stat-label">Impact</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default UserHubSidebar;
