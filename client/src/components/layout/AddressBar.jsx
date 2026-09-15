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
                <button className="addr-btn" onClick={() => navigate(-1)} title="Back" aria-label="Go back">
                    <ChevronLeft size={16} />
                </button>
                <button className="addr-btn" onClick={() => navigate(1)} title="Forward" aria-label="Go forward">
                    <ChevronRight size={16} />
                </button>
                <button className="addr-btn addr-btn-up" onClick={handleGoUp} title="Go up one level" disabled={pathnames.length === 0} aria-label="Up">
                    <ArrowUp size={16} />
                </button>
                <button className="addr-btn addr-btn-refresh" onClick={handleRefresh} title="Refresh page" aria-label="Refresh">
                    <RotateCw size={15} />
                </button>
            </div>

            <div className="address-bar-main">
                <div className="address-bar-path">
                    <div className="path-segment root">
                        <Link to="/" className="segment-link" title="Home">
                            <Monitor size={15} />
                        </Link>
                        {pathnames.length > 0 && <ChevronRight size={13} className="separator" />}
                    </div>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const label = value
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                        const isLast = index === pathnames.length - 1;

                        return (
                            <div key={to} className={`path-segment ${isLast ? 'active' : ''}`}>
                                <Link to={to} className="segment-link">{label}</Link>
                                {!isLast && <ChevronRight size={13} className="separator" />}
                            </div>
                        );
                    })}
                </div>

                <div className="address-bar-search address-bar-search-desktop">
                    <Search size={15} className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Filter ${pathnames[pathnames.length - 1] || 'current view'}...`}
                        aria-label="Filter current page"
                    />
                </div>

                <div className="address-bar-view-toggle">
                    <button
                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                        aria-label="Grid View"
                    >
                        <LayoutGrid size={15} />
                    </button>
                    <button
                        className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="List View"
                        aria-label="List View"
                    >
                        <List size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressBar;
