import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu, Compass, Search, Bell, MessageCircle, Star, Wallet,
    User, MoreVertical, ChevronRight, Bookmark, Settings as SettingsIcon,
    Shield, Award, Sparkles, X, ArrowLeft, Globe, MapPin, Cpu, Calendar, TrendingUp,
    PanelLeftOpen, PanelLeftClose, DollarSign, CheckCheck, Send, Heart, Zap,
    ExternalLink, LogOut, Sun, Moon
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useSavedStore } from '../../store/savedStore';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../common/Logo';

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        category: 'social',
        read: false,
        time: '2m ago',
        title: 'Emma J. liked your Santorini reel',
        body: '"Golden hour in Santorini is unmatched..." received 24 new likes.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        badgeColor: '#f43f5e',
        path: '/notifications'
    },
    {
        id: 2,
        category: 'earnings',
        read: false,
        time: '18m ago',
        title: 'Tip received: +50 Nomad Coins',
        body: 'Marcus Chen tipped you for your Lisbon Co-Working Playbook.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        badgeColor: '#10b981',
        path: '/user/wallet/earnings'
    },
    {
        id: 3,
        category: 'alerts',
        read: false,
        time: '1h ago',
        title: 'Visa Update: Indonesia 60-Day eVOA',
        body: 'Digital nomad renewal rules updated for Bali stays.',
        avatar: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80',
        badgeColor: '#f59e0b',
        path: '/explore/visa'
    },
    {
        id: 4,
        category: 'social',
        read: false,
        time: '3h ago',
        title: 'Canggu Beach Club Meetup Tonight',
        body: '14 verified nomads are attending at 7:00 PM WITA.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        badgeColor: '#3b82f6',
        path: '/community/meetups'
    }
];

const INITIAL_MESSAGES = [
    {
        id: 1,
        name: 'Elena Rodriguez',
        role: 'Lisbon Local Fixer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        lastMessage: 'The itinerary for Lisbon is ready! Included all quiet fiber cafes.',
        time: '14:20',
        unread: 2,
        online: true
    },
    {
        id: 2,
        name: 'Bali Nomads Group',
        role: '428 Active Members',
        avatar: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80',
        lastMessage: 'Marco: Who is up for a sunrise surf session in Echo Beach?',
        time: '12:05',
        unread: 1,
        online: true
    },
    {
        id: 3,
        name: 'Marco Chen',
        role: 'Creator & Photographer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        lastMessage: 'Thanks for the Shibuya lens rental tip! Saved my shoot.',
        time: 'Yesterday',
        unread: 0,
        online: false
    }
];

const CoreNav = ({ toggleSidebar, toggleRightSidebar, isSidebarCollapsed = false, isMobile: propIsMobile }) => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const {
        toggleModuleSwitcher,
        setDockState,
        isModuleSwitcherOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        isMobileSidebarOpen,
        userXP = 4250,
        userLevel = 12,
        userRank = 'Elite Explorer'
    } = useNavStore();

    // Responsive screen width detection
    const [isMobileScreen, setIsMobileScreen] = useState(() => {
        if (propIsMobile !== undefined) return propIsMobile;
        return typeof window !== 'undefined' ? window.innerWidth <= 900 : false;
    });

    useEffect(() => {
        if (propIsMobile !== undefined) {
            setIsMobileScreen(propIsMobile);
            return;
        }
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 900);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [propIsMobile]);

    const savedDestinations = useSavedStore((state) => state.savedDestinations);
    const savedCount = savedDestinations.length;

    // Search state
    const [searchQuery, setSearchQuery] = useState(globalSearchQuery || '');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

    // Top Nav Interactive Popovers: Notifications, Messages, Account
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Interactive state for Notifications & Messages
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [notifFilter, setNotifFilter] = useState('all');
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [quickReplyId, setQuickReplyId] = useState(null);
    const [quickReplyText, setQuickReplyText] = useState('');

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;
    const unreadMessagesCount = messages.reduce((sum, m) => sum + (m.unread || 0), 0);

    // Refs
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const notificationsRef = useRef(null);
    const messagesRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Global keyboard shortcut: Cmd+K / Ctrl+K to focus search input, Cmd+B / Ctrl+B to toggle sidebar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
                setIsSearchFocused(true);
                setIsSearchDropdownOpen(true);
                setIsNotificationsOpen(false);
                setIsMessagesOpen(false);
                setIsProfileOpen(false);
            } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                if (toggleSidebar) toggleSidebar();
            } else if (e.key === 'Escape') {
                setIsSearchDropdownOpen(false);
                setIsMobileSearchActive(false);
                setIsNotificationsOpen(false);
                setIsMessagesOpen(false);
                setIsProfileOpen(false);
                searchInputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    // Close popovers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchDropdownOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
            if (messagesRef.current && !messagesRef.current.contains(event.target)) {
                setIsMessagesOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeAllMenus = () => {
        setIsNotificationsOpen(false);
        setIsMessagesOpen(false);
        setIsProfileOpen(false);
        setIsSearchDropdownOpen(false);
    };

    const handleLogoClick = () => {
        navigate('/');
        if (isModuleSwitcherOpen) toggleModuleSwitcher(false);
        closeAllMenus();
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

    const handleNavigateMenu = (path) => {
        closeAllMenus();
        navigate(path);
    };

    const handleMarkAllNotificationsRead = (e) => {
        e.stopPropagation();
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (notif) => {
        setNotifications(prev => prev.map(n => n.id === notif.id ? ({ ...n, read: true }) : n));
        closeAllMenus();
        navigate(notif.path || '/notifications');
    };

    const handleSendQuickReply = (e, chatId) => {
        e.preventDefault();
        e.stopPropagation();
        if (!quickReplyText.trim()) return;
        setMessages(prev =>
            prev.map(m =>
                m.id === chatId
                    ? { ...m, lastMessage: `You: ${quickReplyText.trim()}`, time: 'Just now', unread: 0 }
                    : m
            )
        );
        setQuickReplyText('');
        setQuickReplyId(null);
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

    const filteredNotifications = notifications.filter(
        n => notifFilter === 'all' || n.category === notifFilter
    );

    // Unified Account Features including the 6 core items from the user's reference + traveler passport hubs
    const accountPrimaryFeatures = [
        {
            id: 'profile',
            label: 'My Profile',
            sublabel: 'Public bio, skills & verified nomad CV',
            icon: User,
            iconColor: '#3b82f6',
            path: '/user/profile',
            badge: 'Verified'
        },
        {
            id: 'messages',
            label: 'Messages',
            sublabel: 'Direct messages, creator inbox & groups',
            icon: MessageCircle,
            iconColor: '#06b6d4',
            path: '/user/messages',
            badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} new` : null,
            badgeAlert: unreadMessagesCount > 0
        },
        {
            id: 'notifications',
            label: 'Notifications',
            sublabel: 'Activity alerts, visa updates & tips',
            icon: Bell,
            iconColor: '#f59e0b',
            path: '/notifications',
            badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : null,
            badgeAlert: unreadNotificationsCount > 0
        },
        {
            id: 'wallet',
            label: 'Wallet & Payouts',
            sublabel: 'Balance, Nomad Credits, cards & crypto',
            icon: Wallet,
            iconColor: '#8b5cf6',
            path: '/user/wallet',
            badge: '$450.00'
        },
        {
            id: 'earnings',
            label: 'Earnings & Creator Tools',
            sublabel: 'Monetize streams, creator earnings & analytics',
            icon: DollarSign,
            iconColor: '#10b981',
            path: '/business-partner/monetize',
            badge: '+24.8%'
        },
        {
            id: 'settings',
            label: 'Settings',
            sublabel: `Theme (${isDark ? 'Dark' : 'Light'}), privacy & security`,
            icon: SettingsIcon,
            iconColor: '#ec4899',
            path: '/settings',
            badge: isDark ? 'Dark' : 'Light'
        }
    ];

    const accountSecondaryFeatures = [
        {
            id: 'trips',
            label: 'My Trips & Travel Journey',
            icon: Compass,
            path: '/user/travel-journey'
        },
        {
            id: 'saved',
            label: 'Saved & Wishlist',
            icon: Bookmark,
            path: '/saved',
            count: savedCount
        },
        {
            id: 'achievements',
            label: 'Milestones & Passport Stamps',
            icon: Award,
            path: '/user/achievements'
        }
    ];

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
                    {/* Left Section: Sidebar Toggle & Official Brand Logo */}
                    <div className="nav-left">
                        <button
                            type="button"
                            id="nav-hamburger-toggle"
                            className={`nav-btn nav-hamburger-btn ${isMobileScreen && isMobileSidebarOpen ? 'is-open' : ''} ${!isMobileScreen && !isSidebarCollapsed ? 'desktop-expanded' : ''}`}
                            onClick={toggleSidebar}
                            aria-label={
                                isMobileScreen
                                    ? (isMobileSidebarOpen ? "Close navigation menu" : "Open navigation menu")
                                    : (isSidebarCollapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)")
                            }
                            title={
                                isMobileScreen
                                    ? (isMobileSidebarOpen ? "Close navigation menu" : "Open navigation menu")
                                    : (isSidebarCollapsed ? "Expand navigation sidebar (⌘B)" : "Collapse navigation sidebar (⌘B)")
                            }
                            aria-expanded={isMobileScreen ? isMobileSidebarOpen : !isSidebarCollapsed}
                            aria-controls="mobile-navigation-drawer"
                        >
                            {isMobileScreen ? (
                                isMobileSidebarOpen ? (
                                    <X size={22} className="nav-hamburger-icon open-icon" strokeWidth={2.4} />
                                ) : (
                                    <Menu size={22} className="nav-hamburger-icon" strokeWidth={2.2} />
                                )
                            ) : isSidebarCollapsed ? (
                                <PanelLeftOpen size={20} className="nav-hamburger-icon" strokeWidth={2.1} />
                            ) : (
                                <PanelLeftClose size={20} className="nav-hamburger-icon" strokeWidth={2.1} />
                            )}
                        </button>

                        <div className="nav-logo" onClick={handleLogoClick}>
                            <Logo
                                size="medium"
                                showText={true}
                                showHub={false}
                                onClick={handleLogoClick}
                            />
                        </div>
                    </div>

                    {/* Center Section: Search Bar with Autocomplete */}
                    <div className="nav-center" ref={searchContainerRef}>
                        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
                            <div
                                className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''} ${searchQuery ? 'has-value' : ''}`}
                                onClick={() => {
                                    searchInputRef.current?.focus();
                                    setIsSearchDropdownOpen(true);
                                    setIsNotificationsOpen(false);
                                    setIsMessagesOpen(false);
                                    setIsProfileOpen(false);
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
                                    placeholder="Search destinations, people, hashtags..."
                                    aria-label="Search destinations, people, hashtags"
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

                        {/* Instant Search Autocomplete Dropdown */}
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

                    {/* Right Section: Search (Mobile), Notifications, Messages (replacing Theme button), User Account, HUD */}
                    <div className="nav-right">
                        {/* Mobile Search Trigger (visible on <= 920px) */}
                        <button
                            type="button"
                            className="nav-btn mobile-search-btn"
                            onClick={() => {
                                closeAllMenus();
                                setIsMobileSearchActive(true);
                                setIsSearchDropdownOpen(true);
                                setTimeout(() => searchInputRef.current?.focus(), 50);
                            }}
                            aria-label="Open search bar"
                            title="Search"
                        >
                            <Search size={19} className="search-trigger-icon" />
                        </button>

                        {/* 1. Notifications Button & Interactive Popover */}
                        <div className="nav-popover-container" ref={notificationsRef}>
                            <button
                                type="button"
                                className={`nav-btn notification-bell ${isNotificationsOpen ? 'active-nav-icon' : ''}`}
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    setIsMessagesOpen(false);
                                    setIsProfileOpen(false);
                                    setIsSearchDropdownOpen(false);
                                }}
                                aria-label="Notifications"
                                title="Notifications & Travel Alerts"
                                aria-expanded={isNotificationsOpen}
                            >
                                <Bell size={19} />
                                {unreadNotificationsCount > 0 && (
                                    <span className="notification-badge">{unreadNotificationsCount}</span>
                                )}
                            </button>

                            {isNotificationsOpen && (
                                <div className="nav-rich-popover notifications-popover animate-dropdown-fade">
                                    <div className="popover-header">
                                        <div className="popover-title-group">
                                            <Bell size={16} className="popover-header-icon amber" />
                                            <span className="popover-title">Notifications</span>
                                            {unreadNotificationsCount > 0 && (
                                                <span className="popover-count-pill">{unreadNotificationsCount} new</span>
                                            )}
                                        </div>
                                        {unreadNotificationsCount > 0 && (
                                            <button
                                                type="button"
                                                className="popover-text-action"
                                                onClick={handleMarkAllNotificationsRead}
                                            >
                                                <CheckCheck size={13} />
                                                <span>Mark all read</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="popover-filter-tabs">
                                        {['all', 'social', 'earnings', 'alerts'].map(tab => (
                                            <button
                                                key={tab}
                                                type="button"
                                                className={`popover-tab-btn ${notifFilter === tab ? 'active' : ''}`}
                                                onClick={() => setNotifFilter(tab)}
                                            >
                                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="popover-list-scroll">
                                        {filteredNotifications.length === 0 ? (
                                            <div className="popover-empty-state">
                                                <Bell size={28} />
                                                <p>No notifications in this category</p>
                                            </div>
                                        ) : (
                                            filteredNotifications.map(item => (
                                                <div
                                                    key={item.id}
                                                    className={`popover-list-item ${!item.read ? 'is-unread' : ''}`}
                                                    onClick={() => handleNotificationClick(item)}
                                                >
                                                    <div className="popover-item-avatar-wrap">
                                                        <img src={item.avatar} alt="" className="popover-item-avatar" />
                                                        <span
                                                            className="popover-avatar-dot"
                                                            style={{ background: item.badgeColor }}
                                                        />
                                                    </div>
                                                    <div className="popover-item-content">
                                                        <div className="popover-item-top">
                                                            <span className="popover-item-title">{item.title}</span>
                                                            <span className="popover-item-time">{item.time}</span>
                                                        </div>
                                                        <p className="popover-item-desc">{item.body}</p>
                                                    </div>
                                                    {!item.read && <span className="popover-unread-indicator" />}
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="popover-footer">
                                        <button
                                            type="button"
                                            className="popover-footer-btn"
                                            onClick={() => handleNavigateMenu('/notifications')}
                                        >
                                            <span>Open Notification Center</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. Messages Button & Interactive Popover (Replaces Theme Button in Top Nav) */}
                        <div className="nav-popover-container" ref={messagesRef}>
                            <button
                                type="button"
                                className={`nav-btn messages-trigger-btn ${isMessagesOpen ? 'active-nav-icon' : ''}`}
                                onClick={() => {
                                    setIsMessagesOpen(!isMessagesOpen);
                                    setIsNotificationsOpen(false);
                                    setIsProfileOpen(false);
                                    setIsSearchDropdownOpen(false);
                                }}
                                aria-label="Messages"
                                title="Direct Messages & Creator Inbox"
                                aria-expanded={isMessagesOpen}
                            >
                                <MessageCircle size={19} />
                                {unreadMessagesCount > 0 && (
                                    <span className="notification-badge messages-badge">{unreadMessagesCount}</span>
                                )}
                            </button>

                            {isMessagesOpen && (
                                <div className="nav-rich-popover messages-popover animate-dropdown-fade">
                                    <div className="popover-header">
                                        <div className="popover-title-group">
                                            <MessageCircle size={16} className="popover-header-icon cyan" />
                                            <span className="popover-title">Messages</span>
                                            {unreadMessagesCount > 0 && (
                                                <span className="popover-count-pill cyan">{unreadMessagesCount} unread</span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="popover-text-action"
                                            onClick={() => handleNavigateMenu('/user/messages')}
                                        >
                                            <span>Full Inbox</span>
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>

                                    <div className="popover-list-scroll">
                                        {messages.map(chat => (
                                            <div key={chat.id} className={`popover-message-block ${chat.unread > 0 ? 'is-unread' : ''}`}>
                                                <div
                                                    className="popover-list-item message-item"
                                                    onClick={() => handleNavigateMenu('/user/messages')}
                                                >
                                                    <div className="popover-item-avatar-wrap">
                                                        <img src={chat.avatar} alt={chat.name} className="popover-item-avatar" />
                                                        <span className={`popover-online-dot ${chat.online ? 'online' : 'offline'}`} />
                                                    </div>
                                                    <div className="popover-item-content">
                                                        <div className="popover-item-top">
                                                            <span className="popover-item-title">{chat.name}</span>
                                                            <span className="popover-item-time">{chat.time}</span>
                                                        </div>
                                                        <span className="popover-item-role">{chat.role}</span>
                                                        <p className="popover-item-desc">{chat.lastMessage}</p>
                                                    </div>
                                                    <div className="popover-msg-actions">
                                                        {chat.unread > 0 && (
                                                            <span className="msg-unread-pill">{chat.unread}</span>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="msg-quick-reply-toggle"
                                                            title="Quick Reply"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setQuickReplyId(quickReplyId === chat.id ? null : chat.id);
                                                            }}
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>

                                                {quickReplyId === chat.id && (
                                                    <form
                                                        className="popover-quick-reply-form"
                                                        onSubmit={(e) => handleSendQuickReply(e, chat.id)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <input
                                                            type="text"
                                                            value={quickReplyText}
                                                            onChange={(e) => setQuickReplyText(e.target.value)}
                                                            placeholder={`Reply to ${chat.name.split(' ')[0]}...`}
                                                            autoFocus
                                                        />
                                                        <button type="submit" aria-label="Send reply">
                                                            <Send size={13} />
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="popover-footer">
                                        <button
                                            type="button"
                                            className="popover-footer-btn"
                                            onClick={() => handleNavigateMenu('/user/messages')}
                                        >
                                            <span>Open Messages & Group Chats</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. Canonical User Account Avatar & Comprehensive Account Menu */}
                        <div className="nav-user-container" ref={profileDropdownRef}>
                            <button
                                type="button"
                                className={`nav-user-profile-btn ${isProfileOpen ? 'active' : ''}`}
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotificationsOpen(false);
                                    setIsMessagesOpen(false);
                                    setIsSearchDropdownOpen(false);
                                }}
                                aria-label="User Account & Traveler Passport"
                                title="Alex Rivera • Account, Wallet, Earnings & Settings"
                                aria-expanded={isProfileOpen}
                            >
                                <div className="avatar-circle">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                                        alt="Alex Rivera"
                                        className="user-avatar-img"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <User size={15} className="avatar-fallback" />
                                </div>
                                <span className="user-status-dot" />
                            </button>

                            {/* Interactive User Account Dropdown */}
                            {isProfileOpen && (
                                <div className="user-profile-dropdown animate-dropdown-fade">
                                    {/* Profile Header */}
                                    <div className="profile-menu-header">
                                        <div
                                            className="profile-header-user"
                                            onClick={() => handleNavigateMenu('/user/profile')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="profile-menu-avatar">
                                                <img
                                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                                                    alt="Alex Rivera"
                                                />
                                            </div>
                                            <div className="profile-user-details">
                                                <div className="profile-user-name">Alex Rivera</div>
                                                <div className="profile-user-email">seenomad@gmail.com • 14 Stamps</div>
                                            </div>
                                        </div>
                                        <div className="profile-badge-row">
                                            <div className="profile-badge-pill">
                                                <Sparkles size={12} />
                                                <span>{userRank}</span>
                                            </div>
                                            <span className="profile-base-tag">
                                                <MapPin size={11} /> Lisbon, PT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="profile-stats-card">
                                        <div
                                            className="profile-stat-box clickable"
                                            onClick={() => handleNavigateMenu('/user/xp-tracker')}
                                        >
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

                                        <div
                                            className="profile-stat-box clickable"
                                            onClick={() => handleNavigateMenu('/user/wallet')}
                                        >
                                            <div className="profile-stat-header">
                                                <Wallet size={14} className="blue-icon" />
                                                <span>Wallet</span>
                                            </div>
                                            <div className="profile-wallet-val">$450.00</div>
                                            <span className="profile-xp-label">$12,450 Earned</span>
                                        </div>
                                    </div>

                                    {/* Primary Account Features (Matching User's Reference Image) */}
                                    <div className="profile-section-kicker">ACCOUNT & CREATOR HUB</div>
                                    <div className="profile-menu-links primary-account-links">
                                        {accountPrimaryFeatures.map((feat) => {
                                            const IconComp = feat.icon;
                                            return (
                                                <button
                                                    key={feat.id}
                                                    type="button"
                                                    className="profile-menu-item rich-account-item"
                                                    onClick={() => handleNavigateMenu(feat.path)}
                                                >
                                                    <span
                                                        className="account-item-icon-box"
                                                        style={{
                                                            color: feat.iconColor,
                                                            background: `${feat.iconColor}18`
                                                        }}
                                                    >
                                                        <IconComp size={16} />
                                                    </span>
                                                    <div className="account-item-text">
                                                        <span className="account-item-title">{feat.label}</span>
                                                        <span className="account-item-sub">{feat.sublabel}</span>
                                                    </div>
                                                    {feat.badge && (
                                                        <span className={`account-item-badge ${feat.badgeAlert ? 'alert' : ''}`}>
                                                            {feat.badge}
                                                        </span>
                                                    )}
                                                    <ChevronRight size={14} className="item-arrow" />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Secondary Passport & Travel Shortcuts */}
                                    <div className="profile-section-kicker">PASSPORT & JOURNEY</div>
                                    <div className="profile-menu-links secondary-account-links">
                                        {accountSecondaryFeatures.map((item) => {
                                            const IconComp = item.icon;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    className="profile-menu-item compact-account-item"
                                                    onClick={() => handleNavigateMenu(item.path)}
                                                >
                                                    <IconComp size={15} />
                                                    <span>{item.label}</span>
                                                    {item.count > 0 && (
                                                        <span className="profile-saved-badge">{item.count}</span>
                                                    )}
                                                    <ChevronRight size={13} className="item-arrow" />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="profile-menu-footer">
                                        <button
                                            type="button"
                                            className="profile-menu-item logout-item"
                                            onClick={() => handleNavigateMenu('/settings?tab=preferences')}
                                        >
                                            {isDark ? <Moon size={15} /> : <Sun size={15} />}
                                            <span>Appearance: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
                                            <span className="account-item-badge">Configure in Settings</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* HUD / Ghost Dock Toggle Button */}
                        <button
                            type="button"
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
