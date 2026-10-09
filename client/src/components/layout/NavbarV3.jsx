import React from 'react';
import CoreNav from './CoreNav';
import ContextStrip from './ContextStrip';
import ActionRibbon from './ActionRibbon';
import AddressBar from './AddressBar';
import ModuleNavbar from '../common/ModuleNavbar';
import '../../styles/NavbarV3.css';

const NavbarV3 = ({ toggleSidebar, toggleRightSidebar, isRightSidebarCollapsed, isSidebarCollapsed, isMobile = false, currentTheme, onThemeChange }) => {
    return (
        <header className="navbar-v3-container">
            <CoreNav
                toggleSidebar={toggleSidebar}
                toggleRightSidebar={toggleRightSidebar}
                isRightSidebarCollapsed={isRightSidebarCollapsed}
                isSidebarCollapsed={isSidebarCollapsed}
                isMobile={isMobile}
                currentTheme={currentTheme}
                onThemeChange={onThemeChange}
            />
            {!isMobile && (
                <>
                    <AddressBar
                        isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <ModuleNavbar
                        isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <ContextStrip />
                    <ActionRibbon />
                </>
            )}
        </header>
    );
};

export default NavbarV3;
