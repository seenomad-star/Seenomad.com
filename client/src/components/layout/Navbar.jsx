import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, MoreVertical, HelpCircle, Sun, Moon } from 'lucide-react';
import GlobalSearch from '../../features/GlobalSearch';
import Logo from '../common/Logo';
import '../../styles/Navbar.css';

const Navbar = ({ isSidebarCollapsed, toggleSidebar, toggleRightSidebar, isDarkMode, toggleTheme }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="navbar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
                    <Menu size={20} />
                </button>
                <a href="/" className="navbar-logo">
                    <Logo size="medium" showText={true} />
                </a>
            </div>

            <div className="navbar-center">
                <GlobalSearch />
            </div>

            <div className="navbar-right">
                <button className="navbar-icon-btn" aria-label="Notifications" onClick={() => navigate('/user/offers')}>
                    <Bell size={20} />
                </button>
                <button className="navbar-icon-btn" aria-label="Support" onClick={() => navigate('/support-utility')}>
                    <HelpCircle size={20} />
                </button>
                <button className="navbar-icon-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="navbar-user" onClick={() => navigate('/user/wallet')} style={{ cursor: 'pointer' }}>
                    <div className="navbar-user-avatar">
                        <User size={16} />
                    </div>
                    <span className="navbar-user-name">John Doe</span>
                </div>
                <button className="navbar-toggle-btn" onClick={toggleRightSidebar} aria-label="Toggle right sidebar">
                    <MoreVertical size={20} />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
