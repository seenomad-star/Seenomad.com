import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    TrendingUp,
    Compass,
    Gamepad2,
    Users,
    Briefcase,
    GraduationCap,
    Calendar,
    HelpCircle,
    BarChart3,
    Download,
    Handshake,
    Info,
    FileText,
    Settings as SettingsIcon,
    LogOut,
    Megaphone,
    BookOpen,
    Briefcase as CareerIcon,
    Newspaper,
    Code,
    Layout,
    Bot
} from 'lucide-react';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, isMobile }) => {
    const sidebarSections = [
        {
            title: 'FEEDS',
            items: [
                { icon: Home, label: 'Home', to: '/' },
                { icon: TrendingUp, label: 'Popular', to: '/popular' },
            ]
        },
        {
            title: 'DISCOVER',
            items: [
                { icon: Compass, label: 'Explore', to: '/explore' },
                { icon: Bot, label: 'AI Agents', to: '/ai-agents' },
                { icon: Gamepad2, label: 'Travel Games', to: '/travel-games' },
                { icon: Calendar, label: 'Event & Festival', to: '/event-festival' },
            ]
        },
        {
            title: 'COMMUNITY',
            items: [
                { icon: Users, label: 'Community', to: '/community' },
                { icon: Layout, label: 'Creator Studio', to: '/creator-studio' },
                { icon: Briefcase, label: 'Business & Partner', to: '/business-partner' },
                { icon: GraduationCap, label: 'Learning & Voluntourism', to: '/learning-voluntourism' },
            ]
        },
        {
            title: 'RESOURCES',
            items: [
                { icon: Info, label: 'About Seenomad', to: '/about' },
                { icon: Megaphone, label: 'Advertise', to: '/advertise' },
                { icon: HelpCircle, label: 'Help Center', to: '/support-utility' },
                { icon: BookOpen, label: 'Blog', to: '/blog' },
                { icon: CareerIcon, label: 'Careers', to: '/careers' },
                { icon: Newspaper, label: 'Press', to: '/press' },
                { icon: BarChart3, label: 'Insights & Analytics', to: '/insights-analytics' },
                { icon: Code, label: 'Developer Platform', to: '/developer' },
                { icon: Download, label: 'Download App', to: '/download-app' },
                { icon: Handshake, label: 'Partner With Us', to: '/partner-with-us' },
            ]
        }
    ];

    const sidebarClass = isMobile
        ? `sidebar mobile ${isMobileOpen ? 'mobile-open' : ''}`
        : `sidebar ${isCollapsed ? 'collapsed' : ''}`;

    return (
        <aside
            className={sidebarClass}
            aria-label="Primary navigation"
            aria-expanded={isMobile ? isMobileOpen : !isCollapsed}
        >
            <nav className="sidebar-nav" aria-label="Explore Seenomad">
                {sidebarSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="sidebar-section">
                        <div className="sidebar-section-title" aria-hidden={isCollapsed}>{section.title}</div>
                        <ul>
                            {section.items.map((item, index) => (
                                <li key={index} className={item.label === 'Explore' ? 'explore-item-container' : ''}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) => isActive ? 'active' : ''}
                                        onClick={() => {
                                            if (isMobile) toggleSidebar();
                                        }}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* Legal section in scrollable area */}
                <div className="sidebar-section">
                    <div className="sidebar-section-title" aria-hidden={isCollapsed}>LEGAL</div>
                    <ul>
                        <li>
                            <NavLink to="/legal/community-guidelines" title={isCollapsed ? 'Community Guidelines' : ''}>
                                <FileText size={20} />
                                <span>Community Guidelines</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/legal/privacy" title={isCollapsed ? 'Privacy Policy' : ''}>
                                <FileText size={20} />
                                <span>Privacy Policy</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/legal/terms" title={isCollapsed ? 'User Agreement' : ''}>
                                <FileText size={20} />
                                <span>User Agreement</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/legal/accessibility" title={isCollapsed ? 'Accessibility' : ''}>
                                <FileText size={20} />
                                <span>Accessibility</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Sticky footer with Settings and Logout */}
            <div className="sidebar-footer" aria-label="Account navigation">
                <ul>
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            title="Settings"
                        >
                            <SettingsIcon size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <a href="#logout" className="logout-link" title="Logout">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
                <div className="sidebar-copyright">
                    <small>© 2026 Seenomad, Inc.</small>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
