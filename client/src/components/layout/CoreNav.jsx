import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Menu, Compass, Search, Bell, MessageSquare, Star, Wallet,
    User, MoreVertical, ChevronRight, Bookmark, Settings as SettingsIcon,
    Shield, LogOut, Award, Sparkles, X
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import Logo from '../common/Logo';
import ThemeSelector from './ThemeSelector';

const CoreNav = ({ toggleSidebar, toggleRightSidebar, currentTheme, onThemeChange }) => {
    const navigate = useNavigate();
    const {
        toggleSearch,
        toggleModuleSwitcher,
        setDockState,
        isSearchOpen,
        isModuleSwitcherOpen,
        userXP = 4250,
        userLevel = 12,
        userRank = 'Elite Explorer',
        userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=elite'
    } = useNavStore();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    // Global keyboard shortcut: Cmd+K / Ctrl+K to open search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSearch(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSearch]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    const handleLogoClick = () => {
        navigate('/');
        if (isModuleSwitcherOpen) toggleModuleSwitcher(false);
        setIsProfileOpen(false);
        setDockState('command');
    };

    const handleProfileLinkClick = (path) => {
        setIsProfileOpen(false);
        navigate(path);
    };

    // XP calculation towards next level
    const currentLvlXP = userXP % 1000;
    const xpPercentage = Math.min(100, Math.round((currentLvlXP / 1000) * 100));

    return (
        <div className="core-nav">
            {/* Left Section: Menu Toggle, Logo, Launchpad Button */}
            <div className="nav-left">
                <button
                    className="nav-btn nav-hamburger-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle navigation menu"
                    title="Toggle menu"
                >
                    <Menu size={20} />
                </button>

                <div className="nav-logo">
                    <Logo size="medium" showText={true} onClick={handleLogoClick} />
                </div>

                <button
                    className={`nav-btn nomad-start-btn ${isModuleSwitcherOpen ? 'active' : ''}`}
                    onClick={() => toggleModuleSwitcher()}
                    aria-label="Open Launchpad"
                    title="Open Launchpad Apps"
                >
                    <Compass size={18} className="start-icon" />
                    <span className="start-label">Start</span>
                </button>
            </div>

            {/* Center Section: Universal Search Bar (Desktop / Laptop) */}
            <div className="nav-center">
                <div
                    className="search-wrapper"
                    onClick={() => toggleSearch(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSearch(true)}
                    aria-label="Universal AI Search"
                >
                    <div className={`search-bar-v3 ${isSearchOpen ? 'focused' : ''}`}>
                        <Search size={17} className="search-icon" />
                        <span className="search-placeholder">Search destinations, visas, nomads, AI agents...</span>
                        <div className="search-shortcut">
                            <span className="shortcut-key">⌘</span>
                            <span className="shortcut-key">K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Mobile Search, Notifications, Theme, Stats, Profile, HUD */}
            <div className="nav-right">
                {/* Mobile Search Button (visible on tablet & mobile) */}
                <button
                    className="nav-btn mobile-search-btn"
                    onClick={() => toggleSearch(true)}
                    aria-label="Search"
                    title="Search"
                >
                    <Search size={19} />
                </button>

                {/* Notifications Link */}
                <Link
                    to="/notifications"
                    className="nav-btn notification-bell"
                    aria-label="View notifications"
                    title="Notifications"
                >
                    <Bell size={19} />
                    <span className="notification-badge">4</span>
                </Link>

                {/* Community Messages Link */}
                <Link
                    to="/community"
                    className="nav-btn nav-messages-btn"
                    aria-label="Nomad Community"
                    title="Community Messages"
                >
                    <MessageSquare size={19} />
                </Link>

                {/* Theme Selector Popover */}
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />

                {/* Gamification Level Badge (Desktop) */}
                <div
                    className="nav-stat nav-level-badge"
                    title={`Level ${userLevel} • ${xpPercentage}% to next level`}
                >
                    <Star size={16} className="stat-star-icon" />
                    <span className="stat-value">Lvl {userLevel}</span>
                </div>

                {/* Wallet Balance Badge (Desktop) */}
                <div
                    className="nav-stat nav-wallet-badge"
                    title="Nomad Wallet Balance"
                >
                    <Wallet size={16} className="stat-wallet-icon" />
                    <span className="stat-value">$450</span>
                </div>

                {/* User Profile Avatar with Dropdown Menu */}
                <div className="nav-user-container" ref={profileDropdownRef}>
                    <button
                        className={`nav-user-profile-btn ${isProfileOpen ? 'active' : ''}`}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        aria-label="User Account Menu"
                        title="User Account & Stats"
                        aria-expanded={isProfileOpen}
                    >
                        <div className="avatar-circle">
                            <img
                                src={userAvatar}
                                alt="User avatar"
                                className="user-avatar-img"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <User size={15} className="avatar-fallback" />
                        </div>
                        <span className="user-status-dot" />
                    </button>

                    {/* Interactive User Profile Dropdown */}
                    {isProfileOpen && (
                        <div className="user-profile-dropdown animate-dropdown-fade">
                            {/* Profile Header */}
                            <div className="profile-menu-header">
                                <div className="profile-header-user">
                                    <div className="profile-menu-avatar">
                                        <img src={userAvatar} alt="User" />
                                    </div>
                                    <div className="profile-user-details">
                                        <div className="profile-user-name">Seenomad Nomad</div>
                                        <div className="profile-user-email">seenomad@gmail.com</div>
                                    </div>
                                </div>
                                <div className="profile-badge-pill">
                                    <Sparkles size={12} />
                                    <span>{userRank}</span>
                                </div>
                            </div>

                            {/* Mobile/Tablet Stats Row */}
                            <div className="profile-stats-card">
                                <div className="profile-stat-box">
                                    <div className="profile-stat-header">
                                        <Star size={14} className="gold-icon" />
                                        <span>Level {userLevel}</span>
                                    </div>
                                    <div className="profile-xp-bar-bg">
                                        <div
                                            className="profile-xp-bar-fill"
                                            style={{ width: `${xpPercentage}%` }}
                                        />
                                    </div>
                                    <span className="profile-xp-label">{currentLvlXP}/1,000 XP</span>
                                </div>

                                <div className="profile-stat-box">
                                    <div className="profile-stat-header">
                                        <Wallet size={14} className="blue-icon" />
                                        <span>Wallet</span>
                                    </div>
                                    <div className="profile-wallet-val">$450.00</div>
                                    <span className="profile-xp-label">Nomad Credits</span>
                                </div>
                            </div>

                            {/* Menu Navigation Links */}
                            <div className="profile-menu-links">
                                <button
                                    className="profile-menu-item"
                                    onClick={() => handleProfileLinkClick('/user')}
                                >
                                    <User size={16} />
                                    <span>Nomad Passport & Profile</span>
                                    <ChevronRight size={14} className="item-arrow" />
                                </button>

                                <button
                                    className="profile-menu-item"
                                    onClick={() => handleProfileLinkClick('/explore')}
                                >
                                    <Bookmark size={16} />
                                    <span>Saved Destinations & Visas</span>
                                    <ChevronRight size={14} className="item-arrow" />
                                </button>

                                <button
                                    className="profile-menu-item"
                                    onClick={() => handleProfileLinkClick('/community')}
                                >
                                    <Award size={16} />
                                    <span>Community Badges & Perks</span>
                                    <ChevronRight size={14} className="item-arrow" />
                                </button>

                                <button
                                    className="profile-menu-item"
                                    onClick={() => handleProfileLinkClick('/settings')}
                                >
                                    <SettingsIcon size={16} />
                                    <span>Preferences & Settings</span>
                                    <ChevronRight size={14} className="item-arrow" />
                                </button>
                            </div>

                            <div className="profile-menu-footer">
                                <button
                                    className="profile-menu-item logout-item"
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        navigate('/about');
                                    }}
                                >
                                    <Shield size={16} />
                                    <span>Seenomad V3 Platform</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* HUD / Ghost Dock Toggle Button */}
                <button
                    className="nav-btn hud-toggle-btn"
                    onClick={toggleRightSidebar}
                    aria-label="Toggle Command HUD"
                    title="Toggle HUD Quick Controls"
                >
                    <MoreVertical size={19} />
                </button>
            </div>
        </div>
    );
};

export default CoreNav;
