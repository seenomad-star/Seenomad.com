import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import './SidebarToggle.css';

/**
 * Persistent 'sidebar-toggle' button component.
 * Interacts directly with the .main-content class and the global layout state
 * to toggle between expanded and collapsed states, following the existing
 * transition definitions (0.25s cubic-bezier(0.4, 0, 0.2, 1)).
 */
const SidebarToggle = ({
    id,
    className = '',
    variant = 'floating', // 'floating' | 'inline' | 'edge'
    onClick,
    ariaLabel
}) => {
    const { isSidebarCollapsed, isMobileSidebarOpen, toggleSidebar } = useNavStore();
    const [isMobile, setIsMobile] = React.useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth <= 900 : false;
    });

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggle = (e) => {
        if (e) e.stopPropagation();
        if (onClick) {
            onClick(e);
        } else {
            toggleSidebar();
        }
    };

    // On mobile screens, expanded corresponds to the mobile drawer being open
    const isExpanded = isMobile ? Boolean(isMobileSidebarOpen) : !isSidebarCollapsed;
    const isCollapsed = !isExpanded;
    const label = ariaLabel || (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
    const tooltipText = isCollapsed ? 'Expand navigation (⌘B)' : 'Collapse navigation (⌘B)';
    const elementId = id || (variant === 'edge' ? 'sidebar-toggle-edge' : `sidebar-toggle-${variant}`);

    return (
        <button
            type="button"
            id={elementId}
            className={`sidebar-toggle ${isCollapsed ? 'is-collapsed' : 'is-expanded'} variant-${variant} ${className}`}
            onClick={handleToggle}
            aria-label={label}
            aria-expanded={isExpanded}
            title={tooltipText}
        >
            <span className="sidebar-toggle-icon">
                {isCollapsed ? (
                    <PanelLeftOpen size={16} strokeWidth={2} />
                ) : (
                    <PanelLeftClose size={16} strokeWidth={2} />
                )}
            </span>
            <span className="sidebar-toggle-label">
                {isCollapsed ? 'Expand' : 'Collapse'}
            </span>
        </button>
    );
};

export default SidebarToggle;
