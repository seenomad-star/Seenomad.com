import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Lock, Sparkles, X, Globe, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useDestinationStore } from '../../store/destinationFilterStore';
import { DOMAIN_STATUS_OPTIONS, getDomainStatusCounts } from '../../utils/destinationDomainUtils';
import './DomainStatusFilterGroup.css';

const STATUS_ICONS = {
    available: CheckCircle2,
    taken: Lock,
    premium: Sparkles
};

const DomainStatusFilterGroup = ({
    collapsed = false,
    activeStatus = null,
    onSelectStatus = null,
    onClear = null,
    onStatusChange = null,
    className = '',
    defaultExpanded = true
}) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const location = useLocation();
    const { domainStatus, setDomainStatus, toggleDomainStatus } = useDestinationStore();
    const effectiveStatus = (activeStatus !== null && activeStatus !== undefined) ? activeStatus : domainStatus;
    const counts = getDomainStatusCounts();

    const handleToggle = (statusId) => {
        if (onSelectStatus) {
            onSelectStatus(statusId);
            return;
        }

        const nextStatus = effectiveStatus === statusId ? 'all' : statusId;
        toggleDomainStatus(statusId);

        if (onStatusChange) {
            onStatusChange(nextStatus);
        }

        // If not already in destinations exploration, navigate to destinations page
        const isDestinationsRoute =
            location.pathname.startsWith('/explore/destinations') ||
            location.pathname === '/explore' ||
            location.pathname.startsWith('/destinations');

        if (!isDestinationsRoute) {
            navigate(`/explore/destinations${nextStatus !== 'all' ? `?domainStatus=${nextStatus}` : ''}`);
        } else {
            // Update search params in URL without full reload
            const searchParams = new URLSearchParams(location.search);
            if (nextStatus === 'all') {
                searchParams.delete('domainStatus');
                searchParams.delete('status');
            } else {
                searchParams.set('domainStatus', nextStatus);
            }
            const newSearch = searchParams.toString();
            navigate(
                {
                    pathname: location.pathname,
                    search: newSearch ? `?${newSearch}` : ''
                },
                { replace: true }
            );
        }
    };

    const handleClear = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        
        if (onClear) {
            onClear(e);
            return;
        }

        setDomainStatus('all');
        if (onStatusChange) onStatusChange('all');

        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('domainStatus');
        searchParams.delete('status');
        const newSearch = searchParams.toString();
        navigate(
            {
                pathname: location.pathname,
                search: newSearch ? `?${newSearch}` : ''
            },
            { replace: true }
        );
    };

    // Compact collapsed sidebar version
    if (collapsed) {
        const nextStatusToCycle =
            effectiveStatus === 'all' ? 'available' :
            effectiveStatus === 'available' ? 'taken' :
            effectiveStatus === 'taken' ? 'premium' : 'all';

        return (
            <div
                className={`sidebar-domain-filter-collapsed ${className}`}
                title={`Destination Domain Status: ${effectiveStatus.toUpperCase()} (Click to toggle)`}
            >
                <button
                    type="button"
                    className={`domain-status-collapsed-btn ${effectiveStatus !== 'all' ? `active status-${effectiveStatus}` : ''}`}
                    onClick={() => {
                        if (nextStatusToCycle === 'all') {
                            handleClear({ stopPropagation: () => {} });
                        } else {
                            handleToggle(nextStatusToCycle);
                        }
                    }}
                    aria-label={`Toggle destination domain status. Current: ${effectiveStatus}`}
                >
                    <Layers size={17} />
                    <span className={`collapsed-status-indicator status-dot-${effectiveStatus}`}></span>
                </button>
            </div>
        );
    }

    return (
        <div
            className={`sidebar-domain-filter-group ${className}`}
            role="region"
            aria-label="Filter destinations by domain status"
        >
            <div className="domain-filter-header">
                <button
                    type="button"
                    className="domain-filter-toggle-btn"
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Collapse domain status filters' : 'Expand domain status filters'}
                >
                    <span className="domain-filter-title-wrap">
                        <Globe size={14} className="domain-filter-icon" />
                        <span className="domain-filter-title">Domain Status</span>
                    </span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {effectiveStatus !== 'all' && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="domain-filter-reset-btn"
                        title="Clear domain status filter"
                        aria-label="Clear domain status filter"
                    >
                        <span>Reset</span>
                        <X size={12} />
                    </button>
                )}
            </div>

            {isExpanded && (
                <>
                    <div
                        className="domain-status-buttons"
                        role="group"
                        aria-label="Destination domain status toggle group"
                    >
                        {DOMAIN_STATUS_OPTIONS.map((option) => {
                            const isActive = effectiveStatus === option.id;
                            const Icon = STATUS_ICONS[option.id] || Sparkles;
                            const count = counts[option.id] || 0;

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleToggle(option.id)}
                                    className={`domain-status-btn status-${option.id} ${isActive ? 'active' : ''}`}
                                    aria-pressed={isActive}
                                    title={`${option.tooltip} (${count} destinations)`}
                                >
                                    <span className="domain-status-dot-wrap">
                                        <span className={`domain-status-dot dot-${option.id}`}></span>
                                    </span>
                                    <span className="domain-status-label">{option.label}</span>
                                    <span className="domain-status-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="domain-filter-footer">
                        <span className="footer-status-text">
                            {effectiveStatus === 'all'
                                ? 'Filter 195+ destinations by domain availability'
                                : `Showing ${effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1)} destinations (${counts[effectiveStatus] || 0})`
                            }
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default DomainStatusFilterGroup;
