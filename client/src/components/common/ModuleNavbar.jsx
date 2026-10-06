import React, { useRef, useEffect, useState, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import '../../features/Explore/styles/ExploreNavbar.css';

const ModuleNavbar = ({ isSidebarCollapsed, items, basePath }) => {
    const { moduleNavItems, moduleBasePath } = useNavStore();
    const resolvedItems = items && items.length > 0 ? items : moduleNavItems;
    const resolvedBasePath = basePath || moduleBasePath;
    const scrollContainerRef = useRef(null);
    const location = useLocation();
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 4);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        updateScrollState();

        // Allow vertical mouse wheel over the pill strip to smoothly scroll horizontally
        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
                e.preventDefault();
                el.scrollLeft += e.deltaY * 0.85;
            }
        };

        el.addEventListener('scroll', updateScrollState, { passive: true });
        el.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            el.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [resolvedItems, updateScrollState]);

    // Automatically center active item inside horizontal ribbon on route change
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const activeLink = el.querySelector('.module-nav-item.active');
        if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        setTimeout(updateScrollState, 180);
    }, [location.pathname, updateScrollState]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = Math.max(220, scrollContainerRef.current.clientWidth * 0.55);
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!resolvedItems || resolvedItems.length === 0) return null;

    return (
        <nav
            className={`module-navbar ${!isSidebarCollapsed ? 'left-sidebar-expanded' : 'left-sidebar-collapsed'}`}
            aria-label="Section sub-navigation"
        >
            <div className={`module-nav-group ${canScrollLeft ? 'can-scroll-left' : ''} ${canScrollRight ? 'can-scroll-right' : ''}`}>
                <button
                    type="button"
                    className={`module-scroll-btn left ${!canScrollLeft ? 'is-disabled' : ''}`}
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    aria-label="Scroll navigation left"
                    title="Scroll left"
                >
                    <ChevronLeft size={14} />
                </button>

                <div className="module-nav-scroll-container" ref={scrollContainerRef}>
                    {resolvedItems.map((item, index) => {
                        const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

                        if (typeof item === 'string') {
                            const slug = toSlug(item);
                            const path = `${resolvedBasePath}/${slug}`;
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
                                        const slug = subItem.slug || toSlug(subItem.label);
                                        const path = subItem.path || `${resolvedBasePath}/${slug}`;
                                        return (
                                            <NavLink
                                                key={`${index}-${subIndex}`}
                                                to={path}
                                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                                            >
                                                {subItem.icon && (
                                                    <span className="module-nav-icon">
                                                        {React.cloneElement(subItem.icon, { size: 13 })}
                                                    </span>
                                                )}
                                                <span className="module-nav-label">{subItem.label}</span>
                                            </NavLink>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        }

                        const slug = item.slug || toSlug(item.label);
                        const path = item.path || `${resolvedBasePath}/${slug}`;
                        return (
                            <NavLink
                                key={index}
                                to={path}
                                className={({ isActive }) => `module-nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon && (
                                    <span className="module-nav-icon">
                                        {React.cloneElement(item.icon, { size: 13 })}
                                    </span>
                                )}
                                <span className="module-nav-label">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className={`module-scroll-btn right ${!canScrollRight ? 'is-disabled' : ''}`}
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    aria-label="Scroll navigation right"
                    title="Scroll right"
                >
                    <ChevronRight size={14} />
                </button>
            </div>
        </nav>
    );
};

export default ModuleNavbar;
