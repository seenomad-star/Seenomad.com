import { allDestinations } from '../data/destinationsData.js';

/**
 * Returns the domain status ('Available' | 'Taken' | 'Premium') for a destination.
 */
export const getDestinationDomainStatus = (dest) => {
    if (!dest) return 'Available';
    if (dest.domainStatus) {
        const s = String(dest.domainStatus).toLowerCase();
        if (s === 'premium') return 'Premium';
        if (s === 'taken') return 'Taken';
        return 'Available';
    }
    // Premium: sponsored, exclusive deal, or luxury price >= $2000
    const priceNum = parseInt(String(dest.price || '').replace(/[^0-9]/g, ''), 10) || 0;
    if (dest.isSponsored || dest.deal === 'Exclusive' || priceNum >= 2000) {
        return 'Premium';
    }
    // Taken: heavily booked, trending now, or marked as taken
    if ((dest.id % 2 === 0) || (dest.socialProof && (
        dest.socialProof.includes('Trending') ||
        dest.socialProof.includes('Most Saved') ||
        dest.socialProof.includes('Booked')
    ))) {
        return 'Taken';
    }
    // Available: open spots, flash deals, budget hubs
    return 'Available';
};

/**
 * Generates a clean domain name for a destination, e.g. "borabora.nomad"
 */
export const getDestinationDomainName = (dest) => {
    if (!dest) return 'destination.nomad';
    if (dest.domainName) return dest.domainName;
    const cleanName = dest.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const category = dest.category ? dest.category.toLowerCase() : '';
    const tld = (category === 'beach' || category === 'island') ? 'nomad' :
                category === 'city' ? 'travel' : 'world';
    return `${cleanName}.${tld}`;
};

/**
 * Calculates current destination counts per domain status
 */
export const getDomainStatusCounts = (destinations = allDestinations) => {
    const counts = {
        all: destinations.length,
        available: 0,
        taken: 0,
        premium: 0
    };

    destinations.forEach(dest => {
        const status = getDestinationDomainStatus(dest).toLowerCase();
        if (counts[status] !== undefined) {
            counts[status]++;
        }
    });

    return counts;
};

export const DOMAIN_STATUS_OPTIONS = [
    {
        id: 'available',
        label: 'Available',
        tooltip: 'Available domain hubs for digital nomads',
        color: '#10b981',
        dotColor: '#34d399'
    },
    {
        id: 'taken',
        label: 'Taken',
        tooltip: 'Registered & active claimed destinations',
        color: '#94a3b8',
        dotColor: '#94a3b8'
    },
    {
        id: 'premium',
        label: 'Premium',
        tooltip: 'Tier-1 high value premium destinations',
        color: '#a855f7',
        dotColor: '#c084fc'
    }
];
