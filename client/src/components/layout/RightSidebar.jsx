import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Wallet as WalletIcon,
    Tag,
    Award,
    Video,
    Map,
    Gamepad2,
    Zap,
    Handshake,
    TrendingUp
} from 'lucide-react';
import '../../styles/RightSidebar.css';
const RightSidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, isMobile }) => {
    const rightSidebarItems = [
        { icon: WalletIcon, label: 'Wallet', to: '/user/wallet' },
        { icon: Tag, label: 'Offers', to: '/user/offers' },
        { icon: Award, label: 'Achievements', to: '/user/achievements' },
        { icon: Video, label: 'Creators', to: '/creator-community' },
        { icon: Map, label: 'Hunts', to: '/user/hunts' },
        { icon: Gamepad2, label: 'Games', to: '/travel-games' },
        { icon: Zap, label: 'Flash Missions', to: '/user/flash-missions' },
        { icon: Handshake, label: 'Partners', to: '/business-partner' },
        { icon: TrendingUp, label: 'XP Tracker', to: '/user/xp-tracker' },
    ];

    const sidebarClass = isMobile
        ? `right-sidebar mobile ${isMobileOpen ? 'mobile-open' : ''}`
        : `right-sidebar ${isCollapsed ? 'collapsed' : ''}`;

    return (
        <aside className={sidebarClass}>
            <nav className="right-sidebar-nav">
                <ul>
                    {rightSidebarItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => isActive ? 'active' : ''}
                                title={isCollapsed ? item.label : ''}
                            >
                                <item.icon size={20} />
                                {!isCollapsed && <span>{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default RightSidebar;
