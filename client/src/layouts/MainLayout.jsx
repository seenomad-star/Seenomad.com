import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import NavbarV3 from '../components/layout/NavbarV3';
import SearchDropdown from '../components/layout/SearchDropdown';
import NomadLaunchpad from '../components/layout/NomadLaunchpad';
import GlobalRightSidebar from '../components/layout/GlobalRightSidebar';
import NomadGhostDock from '../components/layout/NomadGhostDock';
import NomadDock from '../features/SocialFeed/components/NomadDock';
import ModuleNavbar from '../components/common/ModuleNavbar';
import BottomNav from '../components/common/BottomNav';
import ToastContainer from '../components/common/ToastContainer';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import { useNavStore } from '../store/navStore';
import { useNomadOSStore } from '../store/nomadOSStore';

const MainLayout = () => {
    const { setDockState, dockState } = useNavStore();
    const { setContext } = useNomadOSStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobileLeftOpen, setIsMobileLeftOpen] = useState(false);
    const [isMobileRightOpen, setIsMobileRightOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('seenomad-theme') || 'dark';
    });
    const location = useLocation();

    // Contextual Awareness Engine: Route Listener
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/explore/destinations')) {
            setContext({ type: 'destination', name: 'Global Destinations', id: 'global' });
        } else if (path.includes('/explore/visa')) {
            setContext({ type: 'visa', name: 'Visa Requirements', id: 'visa_hub' });
        } else if (path.includes('/community')) {
            setContext({ type: 'social', name: 'Nomad Community', id: 'community' });
        }
    }, [location.pathname, setContext]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        let appliedTheme = theme;

        // Handle auto theme
        if (theme === 'auto') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            appliedTheme = systemPreference;
        }

        // Remove all theme classes first
        const themeClasses = ['theme-dark', 'theme-light', 'theme-midnight', 'theme-ocean', 'theme-sunset'];
        themeClasses.forEach(cls => document.documentElement.classList.remove(cls));

        // Add new theme class
        document.documentElement.classList.add(`theme-${appliedTheme}`);

        // Maintain dark class for backward compatibility
        if (appliedTheme === 'dark' || appliedTheme === 'midnight') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem('seenomad-theme', theme);
    }, [theme]);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileLeftOpen(!isMobileLeftOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    const toggleRightSidebar = () => {
        // Toggle Ghost Dock HUD instead of physical sidebar
        setDockState(dockState === 'hud' ? 'command' : 'hud');

        if (isMobile) {
            // Also handle mobile overlay if needed, but HUD usually handles itself
            setIsMobileRightOpen(!isMobileRightOpen);
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const closeMobileSidebars = () => {
        setIsMobileLeftOpen(false);
        setIsMobileRightOpen(false);
        if (dockState === 'hud') setDockState('command');
    };

    const hideGhostDock = location.pathname === '/popular' || location.pathname === '/nomad-pulse';

    return (
        <div className={`app page-${location.pathname.split('/')[1] || 'feed'}`}>
            <ScrollProgressBar />
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                isMobileOpen={isMobileLeftOpen}
                isMobile={isMobile}
            />
            {/* RightSidebar moved to Ghost Dock HUD */}
            <NavbarV3
                toggleSidebar={toggleSidebar}
                toggleRightSidebar={toggleRightSidebar}
                isRightSidebarCollapsed={true}
                isSidebarCollapsed={isSidebarCollapsed}
                currentTheme={theme}
                onThemeChange={handleThemeChange}
            />
            <SearchDropdown />
            <NomadLaunchpad />
            {!hideGhostDock && <NomadGhostDock />}
            <main className={`main-content ${isSidebarCollapsed ? 'expanded-left' : ''} expanded-right ${isMobile ? 'mobile-ready' : ''}`}>
                <NomadDock />
                {(isMobileLeftOpen || isMobileRightOpen) && (
                    <div className="mobile-overlay" onClick={closeMobileSidebars}></div>
                )}
                <div className="content-wrapper">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
            <GlobalRightSidebar />
            {isMobile && <BottomNav />}
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
