import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowUp, RotateCw, Monitor, Search, LayoutGrid, List } from 'lucide-react';
import { useDestinationStore } from '../../store/destinationFilterStore';
import '../../styles/AddressBar.css';

const AddressBar = ({ isSidebarCollapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const { viewMode, setViewMode } = useDestinationStore();

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoUp = () => {
        if (pathnames.length > 0) {
            const upPath = `/${pathnames.slice(0, -1).join('/')}`;
            navigate(upPath || '/');
        }
    };

    return (
        <div className={`address-bar-container ${!isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'}`}>
            <div className="address-bar-nav-btns">
                <button className="addr-btn" onClick={() => navigate(-1)} title="Back">
                    <ChevronLeft size={18} />
                </button>
                <button className="addr-btn" onClick={() => navigate(1)} title="Forward">
                    <ChevronRight size={18} />
                </button>
                <button className="addr-btn" onClick={handleGoUp} title="Up" disabled={pathnames.length === 0}>
                    <ArrowUp size={18} />
                </button>
                <button className="addr-btn" onClick={handleRefresh} title="Refresh">
                    <RotateCw size={16} />
                </button>
            </div>

            <div className="address-bar-main">
                <div className="address-bar-path">
                    <div className="path-segment root">
                        <Link to="/" className="segment-link">
                            <Monitor size={16} />
                        </Link>
                        <ChevronRight size={14} className="separator" />
                    </div>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const label = value
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                        return (
                            <div key={to} className="path-segment">
                                <Link to={to} className="segment-link">{label}</Link>
                                <ChevronRight size={14} className="separator" />
                            </div>
                        );
                    })}
                </div>

                <div className="address-bar-search">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Search ${pathnames[pathnames.length - 1] || 'Travel OS'}`}
                    />
                </div>

                <div className="address-bar-view-toggle">
                    <button
                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="List View"
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressBar;
