import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Compass, Search, Bell, MessageSquare, Star, Wallet, User, MoreVertical } from 'lucide-react';
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
        isModuleSwitcherOpen
    } = useNavStore();

    const handleLogoClick = () => {
        navigate('/');
        if (isModuleSwitcherOpen) toggleModuleSwitcher(false);
        setDockState('command');
    };

    return (
        <div className="core-nav">
            <div className="nav-left">
                <button className="nav-btn menu-toggle" onClick={toggleSidebar} aria-label="Open navigation menu" title="Open navigation menu">
                    <Menu size={20} />
                </button>
                <div className="nav-logo">
                    <Logo size="medium" showText={true} onClick={handleLogoClick} />
                </div>
                <button
                    className={`nav-btn nomad-start-btn ${isModuleSwitcherOpen ? 'active' : ''}`}
                    onClick={() => toggleModuleSwitcher()}
                    aria-label="Open trip planner"
                    title="Open trip planner"
                >
                    <Compass size={20} className="start-icon" />
                    <span className="start-label">Plan a trip</span>
                </button>
            </div>

            <div className="nav-center">
                <button className="search-wrapper" onClick={() => toggleSearch(true)} aria-label="Search destinations, trips, and people">
                    <div className={`search-bar-v3 ${isSearchOpen ? 'focused' : ''}`}>
                        <Search size={18} className="search-icon" />
                        <span className="search-placeholder">Search destinations, trips & people</span>
                        <span className="search-hint">⌘K</span>
                    </div>
                </button>
            </div>

            <div className="nav-right">
                <Link to="/notifications" className="nav-btn notification-bell" aria-label="Notifications" title="Notifications">
                    <Bell size={20} />
                    <span className="notification-badge">4</span>
                </Link>
                <button className="nav-btn messages-btn" aria-label="Messages" title="Messages">
                    <MessageSquare size={20} />
                </button>

                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />

                <div className="nav-stat">
                    <Star size={18} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    <span className="stat-value">Lvl 12</span>
                </div>

                <div className="nav-stat">
                    <Wallet size={18} color="var(--accent-blue)" />
                    <span className="stat-value">$450</span>
                </div>

                <Link to="/profile" className="nav-user-profile" aria-label="Open profile" title="Profile">
                    <div className="avatar-circle">
                        <User size={16} />
                    </div>
                    <span className="profile-label">Profile</span>
                </Link>

                <button className="nav-btn overflow-toggle" onClick={toggleRightSidebar} aria-label="Open quick actions" title="Quick actions">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    );
};

export default CoreNav;
