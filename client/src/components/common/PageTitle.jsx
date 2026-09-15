import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = 'Seenomad V3';

        // Map paths to readable titles
        const pathMap = {
            '/': 'Home',
            '/explore': 'Explore',
            '/explore/destinations': 'Destinations',
            '/explore/embassy': 'Embassy Finder',
            '/explore/visa': 'Visa Checker',
            '/travel-games': 'Travel Games',
            '/creator-community': 'Creator Community',
            '/business-partner': 'Business & Partner',
            '/learning-voluntourism': 'Learning & Voluntourism',
            '/event-festival': 'Events & Festivals',
            '/support-utility': 'Support & Utility',
            '/insights-analytics': 'Insights & Analytics',
            '/user-hub': 'User Hub',
            '/wallet': 'My Wallet',
            '/offers': 'Exclusive Offers',
            '/achievements': 'Achievements',
            '/settings': 'Settings'
        };

        // Handle sub-routes and dynamic segments
        const segments = path.split('/').filter(Boolean);
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            const formattedSegment = lastSegment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Check if we have a direct mapping
            if (pathMap[path]) {
                title = `${pathMap[path]} | Seenomad`;
            } else {
                title = `${formattedSegment} | Seenomad`;
            }
        }

        document.title = title;
    }, [location]);

    return null;
};

export default PageTitle;
