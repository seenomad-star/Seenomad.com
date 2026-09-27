import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MapPin,
    ChevronRight,
    Compass,
    Sparkles,
    ChevronDown,
    ChevronUp,
    ExternalLink
} from 'lucide-react';
import { allDestinations } from '../../data/destinationsData';
import { getDestinationDomainStatus } from '../../utils/destinationDomainUtils';
import { useToastStore } from '../../store/toastStore';
import './SidebarDestinationList.css';

/**
 * SidebarDestinationList
 * Renders touch-friendly destination list items for the sidebar and mobile drawer.
 * Provides quick access to top nomad destinations with domain status indicators,
 * thumbnail images, pricing, and touch targets complying with WCAG guidelines (min 48px height).
 */
const SidebarDestinationList = ({
    activeDomainStatus = 'all',
    onSelectDestination,
    isMobile = false,
    defaultExpanded = true
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useToastStore();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Curated priority destinations data for fast and responsive mobile browsing
    const curatedTopDestinations = useMemo(() => {
        // Fallback list of premier nomad hubs if data needs specific curation
        const priorityNames = [
            'Bali',
            'Lisbon',
            'Tokyo',
            'Chiang Mai',
            'Santorini',
            'Bora Bora',
            'Maldives',
            'Maui',
            'Cancun',
            'Ibiza'
        ];

        // Enrich destinations with their domain status
        const enriched = allDestinations.map(d => ({
            ...d,
            computedDomainStatus: getDestinationDomainStatus(d)
        }));

        // Filter based on active domain status
        if (activeDomainStatus && activeDomainStatus !== 'all') {
            const filtered = enriched.filter(
                d => d.computedDomainStatus.toLowerCase() === activeDomainStatus.toLowerCase()
            );
            return filtered.slice(0, 5);
        }

        // Default 'all': pick matching priority destinations or top rated
        const sorted = [...enriched].sort((a, b) => {
            const aIdx = priorityNames.findIndex(p => a.name.toLowerCase().includes(p.toLowerCase()));
            const bIdx = priorityNames.findIndex(p => b.name.toLowerCase().includes(p.toLowerCase()));
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        });

        return sorted.slice(0, 5);
    }, [activeDomainStatus]);

    const handleDestinationClick = (dest, e) => {
        e.preventDefault();
        e.stopPropagation();

        const searchParam = encodeURIComponent(dest.name);
        const targetUrl = `/explore/destinations?search=${searchParam}`;

        if (onSelectDestination) {
            onSelectDestination(dest);
        }

        navigate(targetUrl);
        addToast(`Exploring ${dest.name}, ${dest.location}! ✈️`, 'info');
    };

    const handleViewAll = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetUrl = activeDomainStatus !== 'all'
            ? `/explore/destinations?domainStatus=${activeDomainStatus}`
            : '/explore/destinations';

        if (onSelectDestination) {
            onSelectDestination(null);
        }

        navigate(targetUrl);
    };

    const currentSearch = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

    return (
        <div className={`sidebar-destination-list-container ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
            {/* Header with expand/collapse toggle */}
            <div className="sidebar-destination-list-header">
                <button
                    type="button"
                    className="sidebar-destination-toggle-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? "Collapse destination list items" : "Expand destination list items"}
                >
                    <div className="sidebar-destination-header-left">
                        <Sparkles size={13} className="sidebar-dest-sparkle" />
                        <span className="sidebar-dest-header-title">
                            {activeDomainStatus !== 'all'
                                ? `${activeDomainStatus.toUpperCase()} HUBS`
                                : 'TOP DESTINATIONS'}
                        </span>
                        <span className="sidebar-dest-count-chip">
                            {curatedTopDestinations.length}
                        </span>
                    </div>
                    <div className="sidebar-dest-toggle-icon">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </button>
            </div>

            {/* List items with touch-friendly sizing */}
            {isExpanded && (
                <div className="sidebar-destination-items-wrapper">
                    <ul className="sidebar-destination-ul" role="list">
                        {curatedTopDestinations.map((dest) => {
                            const isSelected = currentSearch && dest.name.toLowerCase().includes(currentSearch);
                            const status = dest.computedDomainStatus || 'Available';
                            const statusLower = status.toLowerCase();

                            return (
                                <li key={dest.id} className="sidebar-destination-li">
                                    <button
                                        type="button"
                                        className={`sidebar-destination-item-btn ${isSelected ? 'active' : ''} status-${statusLower}`}
                                        onClick={(e) => handleDestinationClick(dest, e)}
                                        aria-label={`View ${dest.name}, ${dest.location}. Cost: ${dest.price}. Domain: ${status}`}
                                    >
                                        {/* Image thumbnail / Flag Avatar */}
                                        <div className="sidebar-dest-avatar-wrap">
                                            {dest.image ? (
                                                <img
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    className="sidebar-dest-thumb"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="sidebar-dest-fallback-icon">
                                                    <MapPin size={16} />
                                                </div>
                                            )}
                                            <span className={`sidebar-dest-status-dot dot-${statusLower}`} />
                                        </div>

                                        {/* Text hierarchy */}
                                        <div className="sidebar-dest-text-content">
                                            <div className="sidebar-dest-title-row">
                                                <span className="sidebar-dest-name">{dest.name}</span>
                                                {dest.price && (
                                                    <span className="sidebar-dest-price">{dest.price}</span>
                                                )}
                                            </div>
                                            <div className="sidebar-dest-sub-row">
                                                <span className="sidebar-dest-location">{dest.location}</span>
                                                <span className={`sidebar-dest-status-badge badge-${statusLower}`}>
                                                    {status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Chevron tap indicator */}
                                        <div className="sidebar-dest-action-arrow">
                                            <ChevronRight size={15} />
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* View all 195+ destinations footer action */}
                    <button
                        type="button"
                        className="sidebar-dest-view-all-btn"
                        onClick={handleViewAll}
                        aria-label="View all 195+ destinations"
                    >
                        <Compass size={14} className="view-all-icon" />
                        <span>View All 195+ Countries</span>
                        <ChevronRight size={14} className="view-all-arrow" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SidebarDestinationList;
