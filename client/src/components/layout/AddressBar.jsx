import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    ArrowUp,
    RotateCw,
    Home,
    Compass,
    Sparkles,
    Bot,
    Trophy,
    Users,
    Calendar,
    BookOpen,
    BarChart3,
    Shield,
    Briefcase,
    Video,
    Settings,
    User,
    Flame,
    LayoutGrid,
    List,
    Globe2,
    FileText
} from 'lucide-react';
import { useDestinationStore } from '../../store/destinationFilterStore';
import '../../styles/AddressBar.css';

// Rich route metadata for clean, accurate travel breadcrumbs
const ROUTE_INFO = {
    'explore': {
        name: 'Explore Destinations',
        icon: Compass,
        badge: '120+ Cities'
    },
    'visas': {
        name: 'Nomad Visas',
        icon: Globe2,
        badge: '2026 Guide'
    },
    'coliving': {
        name: 'Coliving Hubs',
        icon: Compass
    },
    'coworking': {
        name: 'Coworking & Cafes',
        icon: Compass
    },
    'cost-of-living': {
        name: 'Cost of Living',
        icon: BarChart3
    },
    'ai-agents': {
        name: 'AI Travel Agents',
        icon: Bot,
        badge: 'AI Copilot'
    },
    'travel-games': {
        name: 'Quests & Rewards',
        icon: Trophy,
        badge: 'XP Multiplier'
    },
    'community': {
        name: 'Nomad Community',
        icon: Users,
        badge: 'Global'
    },
    'creator-studio': {
        name: 'Creator Studio',
        icon: Video
    },
    'event-festival': {
        name: 'Events & Festivals',
        icon: Calendar
    },
    'learning-voluntourism': {
        name: 'Learning & Volunteer',
        icon: BookOpen
    },
    'insights-analytics': {
        name: 'Nomad Analytics',
        icon: BarChart3
    },
    'support-utility': {
        name: 'Utilities & Tools',
        icon: Shield
    },
    'business-partner': {
        name: 'Business Hub',
        icon: Briefcase
    },
    'popular': {
        name: 'Trending & Popular',
        icon: Flame
    },
    'settings': {
        name: 'Settings',
        icon: Settings
    },
    'user': {
        name: 'Nomad Passport',
        icon: User
    },
    'legal': {
        name: 'Legal & Privacy',
        icon: FileText
    }
};

const AddressBar = ({ isSidebarCollapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const { viewMode, setViewMode } = useDestinationStore();

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoUp = () => {
        if (pathnames.length > 1) {
            const upPath = `/${pathnames.slice(0, -1).join('/')}`;
            navigate(upPath);
        } else if (pathnames.length === 1) {
            navigate('/');
        }
    };

    return (
        <nav
            className={`address-bar-container ${!isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'}`}
            aria-label="Breadcrumb"
        >
            {/* History & Quick Traversal Controls */}
            <div className="address-bar-nav-btns">
                <button
                    className="addr-btn"
                    onClick={() => navigate(-1)}
                    title="Go Back in History"
                    aria-label="Go back"
                >
                    <ChevronLeft size={15} />
                </button>
                <button
                    className="addr-btn"
                    onClick={() => navigate(1)}
                    title="Go Forward in History"
                    aria-label="Go forward"
                >
                    <ChevronRight size={15} />
                </button>
                <button
                    className="addr-btn addr-btn-up"
                    onClick={handleGoUp}
                    title="Navigate Up One Level"
                    disabled={pathnames.length === 0}
                    aria-label="Go up one level"
                >
                    <ArrowUp size={15} />
                </button>
                <button
                    className="addr-btn addr-btn-refresh"
                    onClick={handleRefresh}
                    title="Reload Current View"
                    aria-label="Refresh view"
                >
                    <RotateCw size={14} />
                </button>
            </div>

            {/* Main Breadcrumb Trail */}
            <div className="address-bar-main">
                <ol className="breadcrumb-trail">
                    {/* Root Crumb */}
                    <li className={`breadcrumb-item ${pathnames.length === 0 ? 'is-current' : ''}`}>
                        <Link to="/" className="breadcrumb-link root-link" title="Seenomad Home">
                            <Home size={14} className="breadcrumb-icon home-icon" />
                            <span className="breadcrumb-text">Home</span>
                        </Link>
                    </li>

                    {/* On root (/), clearly show current location (Nexus Feed) rather than an empty box */}
                    {pathnames.length === 0 && (
                        <>
                            <li className="breadcrumb-separator" aria-hidden="true">
                                <ChevronRight size={13} />
                            </li>
                            <li className="breadcrumb-item is-current active-crumb">
                                <div className="current-page-pill">
                                    <Sparkles size={13} className="breadcrumb-icon feed-icon text-amber-400" />
                                    <span className="breadcrumb-text current-title">Nexus Feed</span>
                                    <span className="live-pulse-badge">
                                        <span className="live-dot" />
                                        Live
                                    </span>
                                </div>
                            </li>
                        </>
                    )}

                    {/* Subroute Crumbs */}
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const meta = ROUTE_INFO[value.toLowerCase()];

                        const label = meta?.name || value
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                        const IconComponent = meta?.icon || Compass;

                        return (
                            <React.Fragment key={to}>
                                <li className="breadcrumb-separator" aria-hidden="true">
                                    <ChevronRight size={13} />
                                </li>
                                <li
                                    className={`breadcrumb-item ${isLast ? 'is-current active-crumb' : ''}`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {isLast ? (
                                        <div className="current-page-pill">
                                            <IconComponent size={13} className="breadcrumb-icon" />
                                            <span className="breadcrumb-text current-title">{label}</span>
                                            {meta?.badge && (
                                                <span className="route-meta-badge">{meta.badge}</span>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to={to} className="breadcrumb-link">
                                            <IconComponent size={13} className="breadcrumb-icon" />
                                            <span className="breadcrumb-text">{label}</span>
                                        </Link>
                                    )}
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ol>

                {/* Right Side: View Layout Switcher */}
                <div className="address-bar-view-toggle">
                    <button
                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid Layout View"
                        aria-label="Grid View"
                    >
                        <LayoutGrid size={14} />
                        <span className="view-toggle-label">Grid</span>
                    </button>
                    <button
                        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="Compact List View"
                        aria-label="List View"
                    >
                        <List size={14} />
                        <span className="view-toggle-label">List</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AddressBar;
