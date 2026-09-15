import React, { useEffect, useMemo } from 'react';
import { allDestinations } from '../../../data/destinationsData';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import DestinationCard from './common/DestinationCard';
import AdCard from './common/AdCard';
import MysteryCard from './common/MysteryCard';
import IntelligenceSidecar from './sidecar/IntelligenceSidecar';
import DestinationSearchHub from './DestinationSearchHub';
import { useNavStore } from '../../../store/navStore';
import { Compass, RotateCcw } from 'lucide-react';
import './Destinations.css';

const Destinations = () => {
    const {
        searchQuery,
        selectedFilters,
        advancedFilters,
        viewMode,
        sortBy,
        incrementMonetizationExposure,
        setSearchQuery,
        setSelectedFilters,
        resetFilters
    } = useDestinationStore();

    const {
        globalSearchQuery,
        globalActiveFilters,
        setGlobalSearchQuery,
        setGlobalActiveFilters,
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
                { id: 'beach', label: 'Beaches', icon: 'Sun' },
                { id: 'mountain', label: 'Mountains', icon: 'Mountain' },
                { id: 'ai-picks', label: 'AI Picks', icon: 'Sparkles' }
            ]
        });
    }, [setDockConfig]);

    // Sync Global Dock State to Destination Store if changed externally
    useEffect(() => {
        if (globalSearchQuery && globalSearchQuery !== searchQuery) {
            setSearchQuery(globalSearchQuery);
        }
    }, [globalSearchQuery, searchQuery, setSearchQuery]);

    useEffect(() => {
        if (globalActiveFilters && globalActiveFilters.length > 0 && globalActiveFilters !== selectedFilters) {
            setSelectedFilters(globalActiveFilters);
        }
    }, [globalActiveFilters, selectedFilters, setSelectedFilters]);

    // Filter & Sort Destinations
    const processedDestinations = useMemo(() => {
        const activeSearch = (searchQuery || globalSearchQuery || '').trim().toLowerCase();
        const activeFiltersList = selectedFilters.length > 0 ? selectedFilters : globalActiveFilters;

        const filtered = allDestinations.filter(dest => {
            // Text Search matching
            if (activeSearch) {
                const matchesSearch =
                    dest.name.toLowerCase().includes(activeSearch) ||
                    dest.location.toLowerCase().includes(activeSearch) ||
                    dest.category.toLowerCase().includes(activeSearch) ||
                    (dest.socialProof && dest.socialProof.toLowerCase().includes(activeSearch)) ||
                    (dest.aiInsight && dest.aiInsight.toLowerCase().includes(activeSearch));
                if (!matchesSearch) return false;
            }

            // Quick & Pill Filters
            if (activeFiltersList.length > 0) {
                const matchesActiveFilters = activeFiltersList.every(filterId => {
                    const locLower = (dest.name + ' ' + dest.location).toLowerCase();

                    switch (filterId) {
                        case 'cheap':
                        case 'budget': {
                            const priceNum = parseInt(String(dest.price || '').replace(/[^0-9]/g, ''), 10);
                            return dest.category === 'Budget' ||
                                dest.price === '$0' ||
                                (!isNaN(priceNum) && priceNum <= 1000) ||
                                dest.socialProof?.toLowerCase().includes('budget') ||
                                dest.socialProof?.toLowerCase().includes('dime') ||
                                dest.socialProof?.toLowerCase().includes('savings');
                        }
                        case 'fast-internet': {
                            const isTechCity = dest.category === 'City';
                            const techLocations = [
                                'tokyo', 'seoul', 'singapore', 'london', 'paris', 'new york', 'dubai',
                                'hong kong', 'amsterdam', 'berlin', 'sydney', 'vancouver', 'barcelona',
                                'lisbon', 'prague', 'budapest', 'taipei', 'stockholm', 'bangkok',
                                'chiang mai', 'bali', 'usa', 'japan', 'korea', 'germany', 'uk',
                                'france', 'spain', 'portugal', 'canada', 'netherlands'
                            ];
                            const hasFastNet = techLocations.some(t => locLower.includes(t)) ||
                                dest.socialProof?.toLowerCase().includes('digital nomad') ||
                                dest.socialProof?.toLowerCase().includes('tech') ||
                                dest.highlights?.some(h => h.toLowerCase().includes('internet') || h.toLowerCase().includes('nomad'));
                            return isTechCity || Boolean(hasFastNet);
                        }
                        case 'warm-climate': {
                            if (dest.category === 'Snow') return false;
                            const coldLocations = ['zermatt', 'aspen', 'niseko', 'whistler', 'lapland', 'chamonix', 'spiti', 'swiss alps'];
                            if (coldLocations.some(c => locLower.includes(c))) return false;

                            const isWarmCategory = ['Beach', 'Island', 'Desert'].includes(dest.category);
                            const warmRegions = [
                                'indonesia', 'bali', 'thailand', 'phuket', 'chiang mai', 'bangkok', 'vietnam', 'philippines', 'boracay',
                                'maldives', 'seychelles', 'french polynesia', 'bora bora', 'fiji', 'hawaii', 'maui', 'cancun', 'tulum', 'mexico',
                                'brazil', 'rio', 'copacabana', 'greece', 'santorini', 'mykonos', 'spain', 'ibiza', 'portugal', 'lisbon',
                                'egypt', 'cairo', 'morocco', 'marrakech', 'uae', 'dubai', 'tanzania', 'zanzibar', 'india', 'goa', 'kerala', 'varkala', 'jaipur', 'jordan', 'namibia', 'australia'
                            ];
                            return isWarmCategory || warmRegions.some(w => locLower.includes(w));
                        }
                        case 'nomad-hub': {
                            const nomadHotspots = ['chiang mai', 'bali', 'lisbon', 'bangkok', 'mexico city', 'budapest', 'prague', 'barcelona', 'tokyo', 'berlin', 'tbilisi', 'medellin', 'hanoi', 'buenos aires', 'cape town', 'goa'];
                            const text = (locLower + ' ' + (dest.socialProof || '')).toLowerCase();
                            return nomadHotspots.some(hub => text.includes(hub)) || text.includes('nomad') || text.includes('backpacker');
                        }
                        case 'nightlife': {
                            const partySpots = ['ibiza', 'cancun', 'mykonos', 'rio de janeiro', 'bangkok', 'tulum', 'berlin', 'amsterdam', 'goa', 'mumbai'];
                            const text = (locLower + ' ' + (dest.socialProof || '')).toLowerCase();
                            return partySpots.some(s => text.includes(s)) || text.includes('party') || text.includes('club') || text.includes('carnival');
                        }
                        case 'trending':
                            return dest.trending || dest.socialProof === 'Trending Now' || dest.liveViewers?.includes('k');
                        case 'visa-friendly':
                            return dest.visaFriendly || (dest.visaApprovalRate && parseInt(dest.visaApprovalRate, 10) >= 85);
                        case 'solo':
                            return dest.socialProof?.toLowerCase().includes('solo') || dest.socialProof?.toLowerCase().includes('backpacker') || dest.category === 'Budget';
                        case 'family':
                            return dest.socialProof?.toLowerCase().includes('family') || dest.category === 'Island' || dest.category === 'Beach';
                        case 'honeymoon':
                            return dest.socialProof?.toLowerCase().includes('couple') || dest.category === 'Luxury' || dest.category === 'Island';
                        case 'backpacking':
                            return dest.category === 'Budget' || dest.category === 'Adventure' || dest.socialProof?.toLowerCase().includes('backpacker');
                        case 'beach':
                        case 'beaches':
                            return dest.category === 'Beach' || dest.category === 'Island';
                        case 'mountain':
                        case 'mountains':
                            return dest.category === 'Mountain' || dest.category === 'Snow';
                        case 'city':
                            return dest.category === 'City';
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

            // Advanced Filters: Regions
            if (advancedFilters.regions.length > 0) {
                const regionMap = {
                    asia: ['Asia', 'Japan', 'Thailand', 'Vietnam', 'India', 'China', 'Indonesia', 'South Asia', 'Bali', 'Tokyo', 'Phuket'],
                    europe: ['Europe', 'France', 'Italy', 'Spain', 'UK', 'Germany', 'Greece', 'Netherlands', 'Portugal', 'Switzerland', 'Croatia', 'Bulgaria', 'Hungary', 'Czech Republic', 'Poland', 'Norway', 'Finland', 'Santorini', 'Ibiza'],
                    americas: ['USA', 'Canada', 'Mexico', 'Brazil', 'Peru', 'Chile', 'Argentina', 'Ecuador', 'Colombia', 'Caribbean', 'Hawaii', 'Maui', 'Cancun', 'Copacabana'],
                    africa: ['Africa', 'Morocco', 'Egypt', 'Tanzania', 'South Africa', 'Namibia', 'Zanzibar', 'Seychelles'],
                    oceania: ['Australia', 'New Zealand', 'Fiji', 'French Polynesia', 'Bora Bora', 'Bondi Beach']
                };
                const matchesRegion = advancedFilters.regions.some(region =>
                    regionMap[region]?.some(loc => dest.location.toLowerCase().includes(loc.toLowerCase()) || dest.name.toLowerCase().includes(loc.toLowerCase()))
                );
                if (!matchesRegion) return false;
            }

            // Advanced Filters: Budget
            if (advancedFilters.budgetRanges.length > 0) {
                const price = parseInt(dest.price.replace(/[^0-9]/g, ''), 10) || 0;
                const matchesBudget = advancedFilters.budgetRanges.some(range => {
                    if (range === 'budget') return price <= 1000;
                    if (range === 'mid-range') return price > 1000 && price <= 3000;
                    if (range === 'luxury') return price > 3000;
                    return true;
                });
                if (!matchesBudget) return false;
            }

            // Advanced Filters: Categories
            if (advancedFilters.categories.length > 0) {
                if (!advancedFilters.categories.includes(dest.category.toLowerCase())) return false;
            }

            return true;
        });

        // Apply Sorting
        return [...filtered].sort((a, b) => {
            if (sortBy === 'rating') {
                return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
            }
            if (sortBy === 'popular') {
                const viewersA = parseFloat(String(a.liveViewers || '0').replace('k', '')) * (String(a.liveViewers).includes('k') ? 1000 : 1) || 0;
                const viewersB = parseFloat(String(b.liveViewers || '0').replace('k', '')) * (String(b.liveViewers).includes('k') ? 1000 : 1) || 0;
                return viewersB - viewersA;
            }
            if (sortBy === 'price-low') {
                const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
                const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
                return priceA - priceB;
            }
            if (sortBy === 'price-high') {
                const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
                const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
                return priceB - priceA;
            }
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0; // 'featured' or default retains data order
        });
    }, [searchQuery, globalSearchQuery, selectedFilters, globalActiveFilters, advancedFilters, sortBy]);

    useEffect(() => {
        if (processedDestinations.length > 0) {
            incrementMonetizationExposure();
        }
    }, [processedDestinations.length, incrementMonetizationExposure]);

    const handleReset = () => {
        resetFilters();
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
    };

    return (
        <div className="destinations-page">
            <div className="destinations-main-layout">
                <div className="destinations-feed-column">
                    {/* Dedicated Search & Filter Hub in Main Content Area */}
                    <DestinationSearchHub
                        totalResults={processedDestinations.length}
                    />

                    {/* Destinations Grid (Discovery Canvas) */}
                    <div className={`destinations-grid ${viewMode === 'list' ? 'list-view-container' : ''}`}>
                        {processedDestinations.length > 0 ? (
                            processedDestinations.map((dest, index) => (
                                <React.Fragment key={dest.id}>
                                    <DestinationCard dest={dest} viewMode={viewMode} />
                                    {index === 2 && <MysteryCard />}
                                    {(index + 1) % 6 === 0 && (
                                        <AdCard type={index % 12 === 5 ? 'lounge' : 'rental'} />
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="destinations-empty-search" id="destinations-empty-state">
                                <div className="empty-search-icon-wrap">
                                    <Compass size={32} />
                                </div>
                                <h3>No destinations match your search</h3>
                                <p>We couldn't find any destinations matching your current query or filters. Try adjusting your keywords or clearing the filters.</p>
                                <div className="empty-search-actions">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="empty-reset-btn"
                                    >
                                        <RotateCcw size={15} />
                                        <span>Reset Filters & Search</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleReset();
                                            setSearchQuery('Bali');
                                        }}
                                        className="empty-suggestion-pill"
                                    >
                                        Explore Bali
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleReset();
                                            setSearchQuery('Tokyo');
                                        }}
                                        className="empty-suggestion-pill"
                                    >
                                        Explore Tokyo
                                    </button>
                                </div>
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


