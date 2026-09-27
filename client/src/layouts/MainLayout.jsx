import React from 'react';
import BaseLayout from './BaseLayout';

/**
 * MainLayout
 * Primary application layout delegating to BaseLayout.
 */
const MainLayout = ({ children }) => {
    return <BaseLayout>{children}</BaseLayout>;
};

export default MainLayout;
