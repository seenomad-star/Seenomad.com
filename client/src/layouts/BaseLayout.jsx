import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import MobileDrawer from '../components/layout/MobileDrawer';
import NavbarV3 from '../components/layout/NavbarV3';
import SearchDropdown from '../components/layout/SearchDropdown';
import NomadLaunchpad from '../components/layout/NomadLaunchpad';
import GlobalRightSidebar from '../components/layout/GlobalRightSidebar';
import NomadGhostDock from '../components/layout/NomadGhostDock';
import NomadDock from '../features/SocialFeed/components/NomadDock';
import BottomNav from '../components/common/BottomNav';
import ToastContainer from '../components/common/ToastContainer';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import Footer from '../components/layout/Footer';
import CookieConsentBanner from '../components/common/CookieConsentBanner';
import EarlyAccessBanner from '../components/common/EarlyAccessBanner';
import ScrollToTop from '../components/common/ScrollToTop';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { trackPageView } from '../lib/analytics';
import { useNavStore } from '../store/navStore';
import { useNomadOSStore } from '../store/nomadOSStore';
import { useTheme } from '../contexts/ThemeContext';
import './BaseLayout.css';

/**
 * BaseLayout Component
 * Canonical layout shell providing standard CSS spacing, semantic content zones,
 * responsive sidebar configurations, and single-source-of-truth navigation structures.
 */
const BaseLayout = ({ children }) => {
    const {
        setDockState,
        dockState,
        isRightSidebarOpen,
        toggleRightSidebar: storeToggleRightSidebar,
        isRightSidebarPinned,
        toggleRightSidebarPinned,
        isSidebarCollapsed,
        toggleSidebar: storeToggleSidebar,
        isMobileSidebarOpen,
        toggleMobileSidebar,
        moduleNavItems
    } = useNavStore();
    const { setContext } = useNomadOSStore();
    
    // Sidebar responsive screen breakpoint state
    const [isMobile, setIsMobile] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth <= 900 : false;
    });
    const [isBigScreen, setIsBigScreen] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth >= 1360 : true;
    });
    const { theme, setTheme } = useTheme();

    const location = useLocation();

    // Contextual Awareness Engine: Route Listener & Telemetry
    useEffect(() => {
        const path = location.pathname;
        trackPageView(path);
        if (path.includes('/explore/destinations')) {
            setContext({ type: 'destination', name: 'Global Destinations', id: 'global' });
        } else if (path.includes('/explore/visa')) {
            setContext({ type: 'visa', name: 'Visa Requirements', id: 'visa_hub' });
        } else if (path.includes('/community')) {
            setContext({ type: 'social', name: 'Nomad Community', id: 'community' });
        }
    }, [location.pathname, setContext]);

    // Responsive screen width listener
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 900);
            setIsBigScreen(width >= 1360);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-close mobile drawer & floating sidebars on route change
    useEffect(() => {
        toggleMobileSidebar(false);
        if (!isBigScreen && isRightSidebarOpen) {
            storeToggleRightSidebar(false);
        }
    }, [location.pathname, isBigScreen, isRightSidebarOpen, storeToggleRightSidebar, toggleMobileSidebar]);

    const toggleSidebar = () => {
        if (isMobile) {
            toggleMobileSidebar();
        } else {
            storeToggleSidebar();
        }
    };

    const isRightDocked = isBigScreen && isRightSidebarPinned;

    const handleToggleRightSidebar = () => {
        if (isBigScreen) {
            if (isRightDocked) {
                toggleRightSidebarPinned(false);
                storeToggleRightSidebar(false);
            } else {
                toggleRightSidebarPinned(true);
            }
        } else {
            storeToggleRightSidebar(!isRightSidebarOpen);
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const closeMobileSidebars = () => {
        toggleMobileSidebar(false);
        storeToggleRightSidebar(false);
        if (dockState === 'hud') setDockState('command');
    };

    const hideGhostDock = location.pathname === '/' || 
        location.pathname === '/popular' || 
        location.pathname.startsWith('/feed') || 
        location.pathname.startsWith('/explore') || 
        location.pathname.startsWith('/destinations') || 
        location.pathname.startsWith('/compare') || 
        location.pathname.startsWith('/visa') || 
        location.pathname === '/community/meetups';
    
    // Hide large static footer on feed and endless stream pages
    const hideFooter = location.pathname === '/' || 
        location.pathname === '/popular' || 
        location.pathname.startsWith('/feed') ||
        location.pathname.startsWith('/explore') ||
        location.pathname.startsWith('/community') ||
        location.pathname.startsWith('/creator-studio') ||
        location.pathname.startsWith('/ai-agents') ||
        location.pathname.startsWith('/travel-games');
    
    // Calculate header height dynamically (Desktop: CoreNav + AddressBar + ModuleNavbar = 110px; Mobile: CoreNav only = 54px)
    const currentHeaderHeight = isMobile ? '54px' : '110px';
    const currentSidebarWidth = isMobile ? '0px' : (isSidebarCollapsed ? '76px' : '268px');
    const currentRightSidebarWidth = isRightDocked ? '320px' : '0px';

    const rootClasses = [
        'base-layout-root',
        'app',
        `page-${location.pathname.split('/')[1] || 'feed'}`,
        isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded',
        isRightDocked ? 'right-docked' : '',
        isMobile ? 'is-mobile' : 'is-desktop'
    ].filter(Boolean).join(' ');

    const mainClasses = [
        'base-layout-main',
        'main-content',
        isSidebarCollapsed ? 'expanded-left sidebar-collapsed' : '',
        isRightDocked ? 'has-right-docked right-docked' : '',
        isMobile ? 'mobile-ready' : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={rootClasses}
            style={{
                '--current-sidebar-w': currentSidebarWidth,
                '--current-right-sidebar-w': currentRightSidebarWidth,
                '--current-header-h': currentHeaderHeight
            }}
        >
            <ScrollProgressBar />

            {/* 1. Left Primary Navigation Sidebar (Desktop) */}
            {!isMobile && (
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                    isMobile={false}
                />
            )}

            {/* Mobile-Friendly Sliding Navigation Drawer */}
            <MobileDrawer
                isOpen={isMobileSidebarOpen}
                onClose={() => toggleMobileSidebar(false)}
            />

            {/* 2. Top App Header & Command Navigation */}
            <NavbarV3
                toggleSidebar={toggleSidebar}
                toggleRightSidebar={handleToggleRightSidebar}
                isRightSidebarCollapsed={!isRightDocked && !isRightSidebarOpen}
                isSidebarCollapsed={isSidebarCollapsed}
                isMobile={isMobile}
                currentTheme={theme}
                onThemeChange={handleThemeChange}
            />

            {/* 3. Global Command Overlays */}
            <SearchDropdown />
            <NomadLaunchpad />
            {!hideGhostDock && <NomadGhostDock />}

            {/* 4. Main Page Content Structure */}
            <main className={mainClasses} id="main-content-region">
                {/* Early Access / Demo status indicator banner */}
                <EarlyAccessBanner />
                <NomadDock />

                {/* Mobile Right Sidebar Backdrop Overlay */}
                {isMobile && isRightSidebarOpen && (
                    <div
                        className="base-layout-overlay mobile-overlay"
                        onClick={closeMobileSidebars}
                        aria-label="Close right sidebar"
                    />
                )}

                {/* Content Wrapper Protected by Route-Aware ErrorBoundary */}
                <div className="base-layout-content-wrapper content-wrapper">
                    <ErrorBoundary inline resetKey={location.pathname}>
                        {children ? (
                            children
                        ) : (
                            <div className="base-layout-page-animator w-full flex-1">
                                <Outlet />
                            </div>
                        )}
                    </ErrorBoundary>

                    {/* Footer (hidden on feed and endless interactive views) */}
                    {!hideFooter && <Footer />}
                </div>
            </main>

            {/* 5. Adaptive Right Sidebar (TravelOS Intelligence) */}
            <GlobalRightSidebar
                isDocked={isRightDocked}
                isBigScreen={isBigScreen}
                isOpen={isRightSidebarOpen}
                isPinned={isRightSidebarPinned}
                onToggleOpen={(val) => storeToggleRightSidebar(val)}
                onTogglePin={(val) => toggleRightSidebarPinned(val)}
            />

            {/* 6. Mobile Bottom Navigation */}
            {isMobile && <BottomNav />}

            {/* 7. Floating Scroll-To-Top Button (Threshold-activated) */}
            <ScrollToTop threshold={350} />

            {/* 8. Utility Banners & Notifications */}
            <CookieConsentBanner />
            <ToastContainer />
        </div>
    );
};

export default BaseLayout;
