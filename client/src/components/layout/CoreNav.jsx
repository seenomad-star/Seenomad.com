import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PanelLeft, PanelLeftClose, Compass, Search, Bell, MessageSquare, Star, Wallet, User, MoreVertical, MapPin } from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import Logo from '../common/Logo';
import ThemeSelector from './ThemeSelector';

const CoreNav = ({ toggleSidebar, toggleRightSidebar, isSidebarCollapsed, currentTheme, onThemeChange }) => {
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
                <button
                    className="nav-btn sidebar-toggle-btn"
                    onClick={toggleSidebar}
                    aria-label={isSidebarCollapsed ? 'Expand navigation sidebar' : 'Collapse navigation sidebar'}
                    aria-expanded={!isSidebarCollapsed}
                    title={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
                >
                    {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
                </button>
                <div className="nav-logo">
                    <Logo size="medium" showText={true} onClick={handleLogoClick} />
                </div>
                <button
                    className={`nav-btn nomad-start-btn ${isModuleSwitcherOpen ? 'active' : ''}`}
                    onClick={() => toggleModuleSwitcher()}
                >
                    <Compass size={20} className="start-icon" />
                    <span className="start-label">Start exploring</span>
                </button>
            </div>

            <div className="nav-center">
                <button
                    type="button"
                    className="search-wrapper"
                    onClick={() => toggleSearch(true)}
                    aria-label="Search destinations, trips, and travel guides"
                >
                    <div className={`search-bar-v3 ${isSearchOpen ? 'focused' : ''}`}>
                        <Search size={18} className="search-icon" />
                        <span className="search-placeholder">Find destinations, trips, and guides</span>
                        <span className="search-hint">⌘K</span>
                    </div>
                </button>
            </div>

            <div className="nav-right">
                <div className="nav-travel-context" aria-label="Travel workspace">
                    <MapPin size={15} />
                    <span>Travel OS</span>
                </div>
                <Link to="/notifications" className="nav-btn notification-bell" aria-label="Open notifications" title="Notifications">
                    <Bell size={20} />
                    <span className="notification-badge">4</span>
                </Link>
                <button className="nav-btn" aria-label="Open messages" title="Messages"><MessageSquare size={20} /></button>

                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />

                <div className="nav-stat" title="Traveler level">
                    <Star size={18} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    <span className="stat-value">Lvl 12</span>
                </div>

                <div className="nav-stat" title="Nomad wallet balance">
                    <Wallet size={18} color="var(--accent-blue)" />
                    <span className="stat-value">$450</span>
                </div>

                <button className="nav-user-profile" aria-label="Open your profile" title="Profile">
                    <div className="avatar-circle">
                        <User size={16} />
                    </div>
                </button>

                <button className="nav-btn" onClick={toggleRightSidebar} aria-label="Open quick tools" title="Quick tools">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    );
};

export default CoreNav;
