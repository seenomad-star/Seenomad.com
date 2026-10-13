import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, MoreVertical, HelpCircle } from 'lucide-react';
import GlobalSearch from '../../features/GlobalSearch';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import '../../styles/Navbar.css';

const Navbar = ({ isSidebarCollapsed, toggleSidebar, toggleRightSidebar }) => {
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
                <ThemeToggle className="navbar-icon-btn" />
                {(() => {
                    let userName = 'Alex Rivera';
                    let avatarUrl = null;
                    try {
                        const saved = localStorage.getItem('seenomad_user_profile');
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (parsed.name) userName = parsed.name;
                            if (parsed.avatarUrl) avatarUrl = parsed.avatarUrl;
                        }
                    } catch {
                        // fallback to default
                    }
                    return (
                        <div 
                            className="navbar-user" 
                            onClick={() => navigate('/user/profile')} 
                            style={{ cursor: 'pointer' }}
                            title="View My Nomad Profile"
                        >
                            <div className="navbar-user-avatar" style={{ overflow: 'hidden' }}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                            <span className="navbar-user-name">{userName}</span>
                        </div>
                    );
                })()}
                <button className="navbar-toggle-btn" onClick={toggleRightSidebar} aria-label="Toggle right sidebar">
                    <MoreVertical size={20} />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
