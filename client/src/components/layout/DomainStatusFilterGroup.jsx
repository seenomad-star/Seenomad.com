import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Lock, Sparkles, X, Globe, Layers } from 'lucide-react';
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
    className = ''
}) => {
    const navigate = useNavigate();
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

        const isDestinationsRoute =
            location.pathname.startsWith('/explore/destinations') ||
            location.pathname === '/explore' ||
            location.pathname.startsWith('/destinations');

        if (!isDestinationsRoute) {
            navigate(`/explore/destinations${nextStatus !== 'all' ? `?domainStatus=${nextStatus}` : ''}`);
        } else {
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

    // Compact collapsed sidebar version (icon-badge button)
    if (collapsed) {
        const nextStatusToCycle =
            effectiveStatus === 'all' ? 'available' :
            effectiveStatus === 'available' ? 'taken' :
            effectiveStatus === 'taken' ? 'premium' : 'all';

        return (
            <div
                className={`sidebar-domain-filter-collapsed ${className}`}
                title={`Domain Filter: ${effectiveStatus.toUpperCase()} (Click to cycle)`}
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
                    <Layers size={15} />
                    <span className={`collapsed-status-indicator status-dot-${effectiveStatus}`}></span>
                </button>
            </div>
        );
    }

    return (
        <div
            className={`sidebar-domain-filter-group compact-icon-badge-mode ${className}`}
            role="region"
            aria-label="Filter destinations by domain status"
        >
            <div className="domain-icon-badge-bar" role="group" aria-label="Destination domain status icon badges">
                <span className="domain-mini-label" title="Filter by Domain Status">
                    <Globe size={12} className="domain-filter-icon" />
                </span>

                {DOMAIN_STATUS_OPTIONS.map((option) => {
                    const isActive = effectiveStatus === option.id;
                    const Icon = STATUS_ICONS[option.id] || Sparkles;
                    const count = counts[option.id] || 0;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleToggle(option.id)}
                            className={`domain-icon-badge-btn status-${option.id} ${isActive ? 'active' : ''}`}
                            aria-pressed={isActive}
                            aria-label={`${option.label} (${count} destinations)`}
                            title={`${option.label}: ${option.tooltip} (${count} destinations)`}
                        >
                            <Icon size={13} className="badge-status-icon" />
                            <span className="badge-short-label">{option.label}</span>
                            <span className="badge-count-pill">{count}</span>
                        </button>
                    );
                })}

                {effectiveStatus !== 'all' && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="domain-icon-reset-badge"
                        title="Reset domain filter"
                        aria-label="Clear domain status filter"
                    >
                        <X size={12} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DomainStatusFilterGroup;
