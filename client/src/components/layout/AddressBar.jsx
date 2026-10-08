import React from 'react';
import Breadcrumbs from '../common/Breadcrumbs';

/**
 * AddressBar
 * Global header wrapper for the ultra-compact Breadcrumbs component.
 */
const AddressBar = ({ isSidebarCollapsed }) => {
    return <Breadcrumbs isSidebarCollapsed={isSidebarCollapsed} />;
};

export default AddressBar;
