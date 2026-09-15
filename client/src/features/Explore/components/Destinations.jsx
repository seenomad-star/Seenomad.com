import React, { useEffect } from 'react';
import { allDestinations } from '../../../data/destinationsData';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import DestinationCard from './common/DestinationCard';
import AdCard from './common/AdCard';
import MysteryCard from './common/MysteryCard';
import IntelligenceSidecar from './sidecar/IntelligenceSidecar';
import { useNavStore } from '../../../store/navStore';
import './Destinations.css';

const Destinations = () => {
    const {
        advancedFilters,
        viewMode,
        incrementMonetizationExposure,
        setSearchQuery,
        setSelectedFilters
    } = useDestinationStore();

    const {
        globalSearchQuery,
        globalActiveFilters,
        setDockConfig
    } = useNavStore();

    // Register Dock Configuration for Destinations Module
    useEffect(() => {
        setDockConfig({
            module: 'Explore',
            placeholder: 'Search destinations, categories...',
            quickFilters: [
                { id: 'trending', label: 'Trending', icon: 'Zap' },
                { id: 'visa-friendly', label: 'Visa-Free', icon: 'Shield' },
                { id: 'budget', label: 'Budget', icon: 'DollarSign' },
                { id: 'solo', label: 'Solo', icon: 'User' },
                { id: 'family', label: 'Family', icon: 'Users' },
                { id: 'beaches', label: 'Beaches', icon: 'Sun' },
                { id: 'mountains', label: 'Mountains', icon: 'Mountain' },
                { id: 'ai-picks', label: 'AI Picks', icon: 'Sparkles' }
            ]
        });
    }, [setDockConfig]);

    // Sync Global Dock State to Destination Store
    useEffect(() => {
        setSearchQuery(globalSearchQuery);
    }, [globalSearchQuery, setSearchQuery]);

    useEffect(() => {
        setSelectedFilters(globalActiveFilters);
    }, [globalActiveFilters, setSelectedFilters]);

    const filteredDestinations = allDestinations.filter(dest => {
        if (globalSearchQuery) {
            const query = globalSearchQuery.toLowerCase();
            const matchesSearch = dest.name.toLowerCase().includes(query) ||
                dest.location.toLowerCase().includes(query) ||
                dest.category.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }

        if (globalActiveFilters.length > 0) {
            const matchesActiveFilters = globalActiveFilters.every(filterId => {
                switch (filterId) {
                    case 'trending':
                        return dest.trending || dest.socialProof === 'Trending Now' || dest.liveViewers?.includes('k');
                    case 'visa-friendly':
                        return dest.visaFriendly || (dest.visaApprovalRate && parseInt(dest.visaApprovalRate) >= 85);
                    case 'budget':
                        return dest.category === 'Budget' || dest.price === '$0' || (dest.price && parseInt(dest.price.replace(/[^0-9]/g, '')) <= 1000);
                    case 'solo':
                        return dest.socialProof?.toLowerCase().includes('solo') || dest.socialProof?.toLowerCase().includes('backpacker') || dest.category === 'Budget';
                    case 'family':
                        return dest.socialProof?.toLowerCase().includes('family') || dest.category === 'Island' || dest.category === 'Beach';
                    case 'honeymoon':
                        return dest.socialProof?.toLowerCase().includes('couple') || dest.category === 'Luxury' || dest.category === 'Island';
                    case 'backpacking':
                        return dest.category === 'Budget' || dest.category === 'Adventure' || dest.socialProof?.toLowerCase().includes('backpacker');
                    case 'beaches':
                    case 'beach':
                        return dest.category === 'Beach' || dest.category === 'Island';
                    case 'mountains':
                    case 'mountain':
                        return dest.category === 'Mountain' || dest.category === 'Snow';
                    case 'festivals':
                        return dest.socialProof?.toLowerCase().includes('festival') || dest.socialProof?.toLowerCase().includes('party');
                    case 'ai-picks':
                    case 'ai-pick':
                        return dest.aiConfidence || dest.aiRecommended || dest.aiInsight;
                    case 'gamified':
                        return dest.xpActions && dest.xpActions.length > 0;
                    default: return true;
                }
            });
            if (!matchesActiveFilters) return false;
        }

        if (advancedFilters.regions.length > 0) {
            const regionMap = {
                asia: ['Asia', 'Japan', 'Thailand', 'Vietnam', 'India', 'China', 'Indonesia', 'South Asia'],
                europe: ['Europe', 'France', 'Italy', 'Spain', 'UK', 'Germany', 'Greece', 'Netherlands', 'Portugal', 'Switzerland', 'Croatia', 'Bulgaria', 'Hungary', 'Czech Republic', 'Poland', 'Norway', 'Finland'],
                americas: ['USA', 'Canada', 'Mexico', 'Brazil', 'Peru', 'Chile', 'Argentina', 'Ecuador', 'Colombia', 'Caribbean'],
                africa: ['Africa', 'Morocco', 'Egypt', 'Tanzania', 'South Africa', 'Namibia'],
                oceania: ['Australia', 'New Zealand', 'Fiji', 'French Polynesia']
            };
            const matchesRegion = advancedFilters.regions.some(region =>
                regionMap[region]?.some(loc => dest.location.includes(loc))
            );
            if (!matchesRegion) return false;
        }

        if (advancedFilters.budgetRanges.length > 0) {
            const price = parseInt(dest.price.replace(/[^0-9]/g, '')) || 0;
            const matchesBudget = advancedFilters.budgetRanges.some(range => {
                if (range === 'budget') return price <= 1000;
                if (range === 'mid-range') return price > 1000 && price <= 3000;
                if (range === 'luxury') return price > 3000;
                return true;
            });
            if (!matchesBudget) return false;
        }

        if (advancedFilters.categories.length > 0) {
            if (!advancedFilters.categories.includes(dest.category.toLowerCase())) return false;
        }

        return true;
    });

    useEffect(() => {
        if (filteredDestinations.length > 0) {
            incrementMonetizationExposure();
        }
    }, [filteredDestinations.length, incrementMonetizationExposure]);

    return (
        <div className="destinations-page">
            <div className="destinations-main-layout">
                <div className="destinations-feed-column">
                    {/* Destinations Grid (Discovery Canvas) */}
                    <div className={`destinations-grid ${viewMode === 'list' ? 'list-view-container' : ''}`}>
                        {filteredDestinations.length > 0 ? (
                            filteredDestinations.map((dest, index) => (
                                <React.Fragment key={dest.id}>
                                    <DestinationCard dest={dest} viewMode={viewMode} />
                                    {index === 2 && <MysteryCard />}
                                    {(index + 1) % 6 === 0 && (
                                        <AdCard type={index % 12 === 5 ? 'lounge' : 'rental'} />
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="no-results">
                                <h3>No destinations found</h3>
                                <p>Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Intelligence Sidecar (Right Panel) */}
                <aside className="intelligence-sidecar">
                    <IntelligenceSidecar />
                </aside>
            </div>
        </div>
    );
};

export default Destinations;

