import React from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import './styles/SearchFilterBar.css';

const SearchFilterBar = ({
    placeholder = "Search...",
    filterLabel = "Filter",
    alertLabel = "Get Alerts",
    searchQuery = "",
    onSearchChange = () => { },
    onFilterClick = () => { },
    onAlertClick = () => { },
    isScrolled = false,
    className = "",
    extraContent = null,
    showSearch = true,
    showFilter = true,
    showAlerts = true,
    showSearchButton = false,
    onSearchClick = () => { }
}) => {
    return (
        <div className={`search-filter-section ${isScrolled ? 'scrolled' : ''} ${className}`}>
            {showSearch && (
                <div className="search-filter-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            )}

            {extraContent && (
                <div className="search-filter-extra">
                    {extraContent}
                </div>
            )}

            {showSearchButton && (
                <button className="search-action-button" onClick={onSearchClick} title="Search">
                    <Search size={18} />
                </button>
            )}

            {showFilter && (
                <button className="filter-button" onClick={onFilterClick}>
                    <Filter size={18} />
                    <span>{filterLabel}</span>
                </button>
            )}

            {showAlerts && (
                <button className="alerts-button" onClick={onAlertClick}>
                    <AlertCircle size={18} />
                    <span>{alertLabel}</span>
                </button>
            )}
        </div>
    );
};

export default SearchFilterBar;
