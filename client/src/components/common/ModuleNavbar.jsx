import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import '../../features/Explore/styles/ExploreNavbar.css';

const ModuleNavbar = ({ isSidebarCollapsed }) => {
    const { moduleNavItems, moduleBasePath } = useNavStore();
    const scrollContainerRef = useRef(null);
    const location = useLocation();

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!moduleNavItems || moduleNavItems.length === 0) return null;

    return (
        <div className={`module-navbar ${!isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'}`}>
            <div className="module-nav-group">
                <button
                    className="module-scroll-btn left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="module-nav-scroll-container" ref={scrollContainerRef}>
                    {moduleNavItems.map((item, index) => {
                        if (typeof item === 'string') {
                            const slug = item.toLowerCase().replace(/\s+/g, '-');
                            const path = `${moduleBasePath}/${slug}`;
                            return (
                                <NavLink
                                    key={index}
                                    to={path}
                                    className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <span className="module-nav-label">{item}</span>
                                </NavLink>
                            );
                        }

                        if (item.group) {
                            return (
                                <React.Fragment key={index}>
                                    {item.subItems.map((subItem, subIndex) => {
                                        const slug = subItem.label.toLowerCase().replace(/\s+/g, '-');
                                        const path = `${moduleBasePath}/${slug}`;
                                        return (
                                            <NavLink
                                                key={`${index}-${subIndex}`}
                                                to={path}
                                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                                            >
                                                {subItem.icon && (
                                                    <span className="module-nav-icon">
                                                        {React.cloneElement(subItem.icon, { size: 14 })}
                                                    </span>
                                                )}
                                                <span className="module-nav-label">{subItem.label}</span>
                                            </NavLink>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        }

                        const slug = item.label.toLowerCase().replace(/\s+/g, '-');
                        const path = `${moduleBasePath}/${slug}`;
                        return (
                            <NavLink
                                key={index}
                                to={path}
                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon && (
                                    <span className="module-nav-icon">
                                        {React.cloneElement(item.icon, { size: 14 })}
                                    </span>
                                )}
                                <span className="module-nav-label">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>

                <button
                    className="module-scroll-btn right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default ModuleNavbar;
