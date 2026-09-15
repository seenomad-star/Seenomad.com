import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Menu, Compass, Search, Bell, MessageSquare, Star, Wallet,
    User, MoreVertical, ChevronRight, Bookmark, Settings as SettingsIcon,
    Shield, Award, Sparkles, X, ArrowLeft, Globe, MapPin, Cpu, Calendar, TrendingUp
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import Logo from '../common/Logo';
import ThemeSelector from './ThemeSelector';

const CoreNav = ({ toggleSidebar, toggleRightSidebar, currentTheme, onThemeChange }) => {
    const navigate = useNavigate();
    const {
        toggleModuleSwitcher,
        setDockState,
        isModuleSwitcherOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        userXP = 4250,
        userLevel = 12,
        userRank = 'Elite Explorer',
        userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=elite'
    } = useNavStore();

    // Search state
    const [searchQuery, setSearchQuery] = useState(globalSearchQuery || '');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

    // Profile state
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Refs
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Global keyboard shortcut: Cmd+K / Ctrl+K to focus search input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
                setIsSearchFocused(true);
                setIsSearchDropdownOpen(true);
            } else if (e.key === 'Escape') {
                setIsSearchDropdownOpen(false);
                setIsMobileSearchActive(false);
                searchInputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchDropdownOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogoClick = () => {
        navigate('/');
        if (isModuleSwitcherOpen) toggleModuleSwitcher(false);
        setIsProfileOpen(false);
        setIsSearchDropdownOpen(false);
        setDockState('command');
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        setGlobalSearchQuery(val);
        setIsSearchDropdownOpen(true);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        setIsSearchDropdownOpen(false);
        setIsMobileSearchActive(false);
        if (trimmed) {
            navigate(`/explore?search=${encodeURIComponent(trimmed)}`);
        }
    };

    const handleSelectSuggestion = (path, term) => {
        setSearchQuery(term);
        setGlobalSearchQuery(term);
        setIsSearchDropdownOpen(false);
        setIsMobileSearchActive(false);
        navigate(path);
    };

    const handleClearSearch = (e) => {
        e.stopPropagation();
        setSearchQuery('');
        setGlobalSearchQuery('');
        searchInputRef.current?.focus();
    };

    const handleProfileLinkClick = (path) => {
        setIsProfileOpen(false);
        navigate(path);
    };

    // XP calculation towards next level
    const currentLvlXP = userXP % 1000;
    const xpPercentage = Math.min(100, Math.round((currentLvlXP / 1000) * 100));

    // Curated quick search items
    const quickDestinations = [
        { name: 'Bali, Indonesia', cost: '$1,400/mo', speed: '85 Mbps', path: '/explore/destinations' },
        { name: 'Lisbon, Portugal', cost: '$2,100/mo', speed: '120 Mbps', path: '/explore/destinations' },
        { name: 'Chiang Mai, Thailand', cost: '$950/mo', speed: '150 Mbps', path: '/explore/destinations' },
        { name: 'Tokyo, Japan', cost: '$2,600/mo', speed: '210 Mbps', path: '/explore/destinations' }
    ];

    const quickPills = [
        { label: 'Visa Guides', path: '/explore/visa', icon: <Globe size={13} /> },
        { label: 'AI Agents', path: '/ai-agents', icon: <Cpu size={13} /> },
        { label: 'Festivals', path: '/event-festival', icon: <Calendar size={13} /> },
        { label: 'Coworking', path: '/explore/coworking', icon: <MapPin size={13} /> }
    ];

    const filteredDestinations = quickDestinations.filter(d =>
        !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`core-nav ${isMobileSearchActive ? 'mobile-search-mode' : ''}`}>
            {/* Mobile Active Search Header View */}
            {isMobileSearchActive ? (
                <div className="mobile-search-full-row" ref={searchContainerRef}>
                    <button
                        type="button"
                        className="nav-btn mobile-search-back-btn"
                        onClick={() => {
                            setIsMobileSearchActive(false);
                            setIsSearchDropdownOpen(false);
                        }}
                        aria-label="Back"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <form className="nav-search-form mobile-flex-form" onSubmit={handleSearchSubmit}>
                        <div className="search-input-wrapper focused">
                            <Search size={18} className="search-input-icon active-icon" aria-hidden="true" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="nav-search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search destinations, visas, nomads..."
                                aria-label="Search destinations, visas, nomads"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="search-clear-btn"
                                    onClick={handleClearSearch}
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Mobile Search Dropdown */}
                    {isSearchDropdownOpen && (
                        <div className="nav-search-dropdown mobile-dropdown animate-dropdown-fade">
                            <div className="dropdown-quick-tags">
                                {quickPills.map((pill, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className="dropdown-tag-pill"
                                        onClick={() => handleSelectSuggestion(pill.path, pill.label)}
                                    >
                                        {pill.icon}
                                        <span>{pill.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="dropdown-section">
                                <div className="dropdown-section-title">
                                    <TrendingUp size={12} />
                                    <span>TOP NOMAD DESTINATIONS</span>
                                </div>
                                <div className="dropdown-items-list">
                                    {filteredDestinations.map((dest, i) => (
                                        <div
                                            key={i}
                                            className="dropdown-item"
                                            onClick={() => handleSelectSuggestion(dest.path, dest.name)}
                                        >
                                            <div className="dropdown-item-left">
                                                <MapPin size={15} className="item-pin-icon" />
                                                <span className="dropdown-item-title">{dest.name}</span>
                                            </div>
                                            <span className="dropdown-item-meta">{dest.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
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

                    {/* Center Section: Search Bar with Perfectly Positioned Icon & Autocomplete */}
                    <div className="nav-center" ref={searchContainerRef}>
                        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
                            <div
                                className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''} ${searchQuery ? 'has-value' : ''}`}
                                onClick={() => {
                                    searchInputRef.current?.focus();
                                    setIsSearchDropdownOpen(true);
                                }}
                            >
                                <Search
                                    size={18}
                                    className={`search-input-icon ${isSearchFocused ? 'active-icon' : ''}`}
                                    aria-hidden="true"
                                />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="nav-search-input"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => {
                                        setIsSearchFocused(true);
                                        setIsSearchDropdownOpen(true);
                                    }}
                                    onBlur={() => setIsSearchFocused(false)}
                                    placeholder="Search destinations, visas, nomads, AI agents..."
                                    aria-label="Search destinations, visas, nomads, AI agents"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="search-clear-btn"
                                        onClick={handleClearSearch}
                                        aria-label="Clear search input"
                                        title="Clear search"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                                <div className="search-shortcut" title="Press ⌘K or Ctrl+K to search">
                                    <span className="shortcut-key">⌘</span>
                                    <span className="shortcut-key">K</span>
                                </div>
                            </div>
                        </form>

                        {/* Instant Search Autocomplete Dropdown directly under search bar */}
                        {isSearchDropdownOpen && (
                            <div className="nav-search-dropdown animate-dropdown-fade">
                                <div className="dropdown-quick-tags">
                                    {quickPills.map((pill, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="dropdown-tag-pill"
                                            onClick={() => handleSelectSuggestion(pill.path, pill.label)}
                                        >
                                            {pill.icon}
                                            <span>{pill.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="dropdown-section">
                                    <div className="dropdown-section-title">
                                        <TrendingUp size={12} />
                                        <span>POPULAR NOMAD DESTINATIONS</span>
                                    </div>
                                    <div className="dropdown-items-list">
                                        {filteredDestinations.map((dest, i) => (
                                            <div
                                                key={i}
                                                className="dropdown-item"
                                                onClick={() => handleSelectSuggestion(dest.path, dest.name)}
                                            >
                                                <div className="dropdown-item-left">
                                                    <MapPin size={15} className="item-pin-icon" />
                                                    <span className="dropdown-item-title">{dest.name}</span>
                                                </div>
                                                <div className="dropdown-item-right">
                                                    <span className="dropdown-item-meta">{dest.cost}</span>
                                                    <span className="dropdown-item-speed">{dest.speed}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="dropdown-footer">
                                    <span>Press <strong>Enter</strong> to view all results</span>
                                    <span className="footer-esc-hint">esc to close</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section: Mobile Search, Notifications, Messages, Theme, Profile, HUD */}
                    <div className="nav-right">
                        {/* Mobile Search Button (visible on <= 920px) */}
                        <button
                            className="nav-btn mobile-search-btn"
                            onClick={() => {
                                setIsMobileSearchActive(true);
                                setIsSearchDropdownOpen(true);
                                setTimeout(() => searchInputRef.current?.focus(), 50);
                            }}
                            aria-label="Open search bar"
                            title="Search"
                        >
                            <Search size={19} className="search-trigger-icon" />
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

                        {/* Gamification Level Badge (Desktop > 920px) */}
                        <div
                            className="nav-stat nav-level-badge"
                            title={`Level ${userLevel} • ${xpPercentage}% to next level`}
                        >
                            <Star size={16} className="stat-star-icon" />
                            <span className="stat-value">Lvl {userLevel}</span>
                        </div>

                        {/* Wallet Balance Badge (Desktop > 920px) */}
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
                </>
            )}
        </div>
    );
};

export default CoreNav;
