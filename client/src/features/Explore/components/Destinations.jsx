import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allDestinations } from '../../../data/destinationsData';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useSavedStore } from '../../../store/savedStore';
import DestinationCard from './common/DestinationCard';
import AdCard from './common/AdCard';
import MysteryCard from './common/MysteryCard';
import IntelligenceSidecar from './sidecar/IntelligenceSidecar';
import CompareDestinationsModal from './CompareDestinationsModal';
import ExploreFilterSlidePanel from './ExploreFilterSlidePanel';
import DelhiCategoryFilterBar from './DelhiCategoryFilterBar';
import UPDestinationExplorerBar from './UPDestinationExplorerBar';
import { UP75DistrictsModal } from './UPDistrictIntelligenceSuite';
import { MP55DistrictsModal, MP_CATEGORIES, matchMPCategory } from './MPDistrictIntelligenceSuite';
import { MH36DistrictsModal, MH_CATEGORIES, matchMHCategory } from './MHDistrictIntelligenceSuite';
import { RJ50DistrictsModal, RJ_CATEGORIES, matchRJCategory } from './RJDistrictIntelligenceSuite';
import { useNavStore } from '../../../store/navStore';
import { getDestinationDomainStatus } from '../../../utils/destinationDomainUtils';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { Compass, RotateCcw, ArrowLeftRight } from 'lucide-react';
import './Destinations.css';

const Destinations = () => {
    const [searchParams] = useSearchParams();
    const [is75DistrictsModalOpen, setIs75DistrictsModalOpen] = useState(false);
    const [is55DistrictsModalOpen, setIs55DistrictsModalOpen] = useState(false);
    const [is36DistrictsModalOpen, setIs36DistrictsModalOpen] = useState(false);
    const [is50DistrictsModalOpen, setIs50DistrictsModalOpen] = useState(false);
    const {
        searchQuery,
        selectedFilters,
        advancedFilters,
        domainStatus,
        viewMode,
        sortBy,
        incrementMonetizationExposure,
        setSearchQuery,
        setSelectedFilters,
        setDomainStatus,
        resetFilters,
        compareDestinations,
        isCompareModalOpen,
        setIsCompareModalOpen
    } = useDestinationStore();

    const {
        globalSearchQuery,
        globalActiveFilters,
        setGlobalSearchQuery,
        setGlobalActiveFilters,
        setDockConfig
    } = useNavStore();

    const savedDestinations = useSavedStore((state) => state.savedDestinations);

    // Curated Uttar Pradesh Destinations & All 75 Districts list
    const upDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isUttarPradesh || d.location?.toLowerCase().includes('uttar pradesh'));
    }, []);

    const districtsList = useMemo(() => {
        const set = new Set();
        upDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [upDestinations]);

    // Curated Madhya Pradesh Destinations & All 55 Districts list
    const mpDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isMadhyaPradesh || d.location?.toLowerCase().includes('madhya pradesh'));
    }, []);

    const mpDistrictsList = useMemo(() => {
        const set = new Set();
        mpDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [mpDestinations]);

    // Curated Maharashtra Destinations & All 36 Districts list
    const mhDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isMaharashtra || d.location?.toLowerCase().includes('maharashtra'));
    }, []);

    const mhDistrictsList = useMemo(() => {
        const set = new Set();
        mhDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [mhDestinations]);

    // Curated Rajasthan Destinations & All 50 Districts list
    const rjDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isRajasthan || d.location?.toLowerCase().includes('rajasthan'));
    }, []);

    const rjDistrictsList = useMemo(() => {
        const set = new Set();
        rjDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [rjDestinations]);

    // Region Mode: 'up' | 'mp' | 'mh' | 'rj' | 'delhi' | 'global'
    const initialRegionParam = (searchParams.get('region') || searchParams.get('state') || '').toLowerCase();
    const [regionMode, setRegionMode] = useState(
        ['rj', 'rajasthan'].includes(initialRegionParam)
            ? 'rj'
            : ['mh', 'maharashtra'].includes(initialRegionParam)
            ? 'mh'
            : ['mp', 'madhya-pradesh', 'madhyapradesh', 'madhya pradesh'].includes(initialRegionParam)
            ? 'mp'
            : initialRegionParam === 'delhi'
            ? 'delhi'
            : initialRegionParam === 'global'
            ? 'global'
            : 'up'
    );
    const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'all');
    const [selectedCircuit, setSelectedCircuit] = useState(searchParams.get('circuit') || 'all');

    // Madhya Pradesh Category / Interest Filter ('wildlife' | 'historical' | 'pilgrimage' | 'nature' | 'crafts' | 'all')
    const initialCategoryParam = (searchParams.get('category') || searchParams.get('mpCategory') || '').toLowerCase();
    const [selectedMPCategory, setSelectedMPCategory] = useState(
        ['wildlife', 'historical', 'pilgrimage', 'spiritual', 'nature', 'crafts', 'culture', 'all'].includes(initialCategoryParam)
            ? initialCategoryParam
            : 'all'
    );

    // Maharashtra Category / Interest Filter ('wildlife' | 'historical' | 'pilgrimage' | 'beach' | 'nature' | 'crafts' | 'all')
    const initialMHCategoryParam = (searchParams.get('category') || searchParams.get('mhCategory') || '').toLowerCase();
    const [selectedMHCategory, setSelectedMHCategory] = useState(
        ['wildlife', 'historical', 'pilgrimage', 'spiritual', 'beach', 'nature', 'crafts', 'culture', 'all'].includes(initialMHCategoryParam)
            ? initialMHCategoryParam
            : 'all'
    );

    // Rajasthan Category / Interest Filter ('wildlife' | 'historical' | 'pilgrimage' | 'desert' | 'nature' | 'crafts' | 'all')
    const initialRJCategoryParam = (searchParams.get('category') || searchParams.get('rjCategory') || '').toLowerCase();
    const [selectedRJCategory, setSelectedRJCategory] = useState(
        ['wildlife', 'historical', 'pilgrimage', 'spiritual', 'desert', 'nature', 'crafts', 'culture', 'all'].includes(initialRJCategoryParam)
            ? initialRJCategoryParam
            : 'all'
    );

    // Curated Delhi Destinations and Category Counts
    const delhiDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isDelhi || d.location?.toLowerCase().includes('delhi'));
    }, []);

    const delhiCategoryCounts = useMemo(() => {
        const counts = { all: delhiDestinations.length, historical: 0, food: 0, culture: 0, adventure: 0 };
        delhiDestinations.forEach(d => {
            const cat = (d.delhiCategory || d.category || '').toLowerCase();
            if (cat.includes('historic')) counts.historical++;
            else if (cat.includes('food')) counts.food++;
            else if (cat.includes('culture') || cat.includes('cultural')) counts.culture++;
            else if (cat.includes('adventure')) counts.adventure++;
        });
        return counts;
    }, [delhiDestinations]);

    const initialDelhiCat = searchParams.get('delhiCategory') || searchParams.get('category');
    const [activeDelhiCategory, setActiveDelhiCategory] = useState(
        initialDelhiCat && ['historical', 'food', 'culture', 'adventure', 'all'].includes(initialDelhiCat.toLowerCase())
            ? initialDelhiCat.toLowerCase()
            : 'all'
    );
    const [isDelhiFocusMode, setIsDelhiFocusMode] = useState(false);

    const handleSelectDelhiCategory = (catId) => {
        setIsDelhiFocusMode(true);
        setRegionMode('delhi');
        setActiveDelhiCategory(catId);
    };

    const handleToggleGlobalMode = () => {
        setRegionMode(prev => prev === 'global' ? 'up' : 'global');
        setIsDelhiFocusMode(false);
    };

    // Register Dock Configuration for Destinations Module
    useEffect(() => {
        setDockConfig({
            module: 'Explore',
            placeholder: 'Search destinations, categories...',
            quickFilters: [
                { id: 'historical', label: 'Historical', icon: 'Landmark' },
                { id: 'food', label: 'Food', icon: 'UtensilsCrossed' },
                { id: 'culture', label: 'Culture', icon: 'Sparkles' },
                { id: 'adventure', label: 'Adventure', icon: 'Compass' },
                { id: 'trending', label: 'Trending', icon: 'Zap' },
                { id: 'budget', label: 'Budget', icon: 'DollarSign' }
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

    // Handle URL search params on mount or route navigation
    useEffect(() => {
        const query = searchParams.get('search') || searchParams.get('q');
        const filter = searchParams.get('filter') || searchParams.get('category');
        const statusParam = searchParams.get('domainStatus') || searchParams.get('status');
        if (query && query !== searchQuery) {
            setSearchQuery(query);
            if (!query.toLowerCase().includes('delhi')) {
                setIsDelhiFocusMode(false);
            }
        }
        if (filter) {
            const filterLower = filter.toLowerCase();
            if (['historical', 'food', 'culture', 'adventure', 'all'].includes(filterLower)) {
                setActiveDelhiCategory(filterLower);
                setIsDelhiFocusMode(true);
            }
            if (!selectedFilters.includes(filterLower)) {
                setSelectedFilters([filterLower]);
            }
        }
        if (statusParam) {
            const statusLower = statusParam.toLowerCase();
            if (['all', 'available', 'taken', 'premium'].includes(statusLower) && domainStatus !== statusLower) {
                setDomainStatus(statusLower);
            }
        }
    }, [searchParams, searchQuery, selectedFilters, domainStatus, setSearchQuery, setSelectedFilters, setDomainStatus]);

    const handleSelectPreset = (presetId) => {
        if (selectedFilters.includes(presetId)) {
            setSelectedFilters(selectedFilters.filter(f => f !== presetId));
        } else {
            setSelectedFilters([...selectedFilters, presetId]);
        }
    };

    // Filter & Sort Destinations
    const processedDestinations = useMemo(() => {
        const activeSearch = (searchQuery || globalSearchQuery || '').trim().toLowerCase();
        const activeFiltersList = selectedFilters.length > 0 ? selectedFilters : globalActiveFilters;

        const filtered = allDestinations.filter(dest => {
            // Regional Scope Filter ('up' | 'mp' | 'mh' | 'rj' | 'delhi' | 'global')
            if (regionMode === 'rj') {
                const isRJ = dest.isRajasthan || dest.location?.toLowerCase().includes('rajasthan');
                if (!isRJ) return false;

                // Category filter ('wildlife', 'historical', 'pilgrimage', 'desert', 'nature', 'crafts', etc.)
                if (selectedRJCategory && selectedRJCategory !== 'all') {
                    if (!matchRJCategory(dest, selectedRJCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.rjCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'mh') {
                const isMH = dest.isMaharashtra || dest.location?.toLowerCase().includes('maharashtra');
                if (!isMH) return false;

                // Category filter ('wildlife', 'historical', 'pilgrimage', 'beach', etc.)
                if (selectedMHCategory && selectedMHCategory !== 'all') {
                    if (!matchMHCategory(dest, selectedMHCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.mhCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'mp') {
                const isMP = dest.isMadhyaPradesh || dest.location?.toLowerCase().includes('madhya pradesh');
                if (!isMP) return false;

                // Category filter ('wildlife', 'historical', 'pilgrimage', etc.)
                if (selectedMPCategory && selectedMPCategory !== 'all') {
                    if (!matchMPCategory(dest, selectedMPCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.mpCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'up') {
                const isUP = dest.isUttarPradesh || dest.location?.toLowerCase().includes('uttar pradesh');
                if (!isUP) return false;

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.upCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'delhi' || isDelhiFocusMode) {
                const isMatchDelhi = dest.isDelhi || dest.location?.toLowerCase().includes('delhi');
                if (!isMatchDelhi) return false;

                if (activeDelhiCategory && activeDelhiCategory !== 'all') {
                    const cat = (dest.delhiCategory || dest.category || '').toLowerCase();
                    if (activeDelhiCategory === 'historical' && !cat.includes('historic')) return false;
                    if (activeDelhiCategory === 'food' && !cat.includes('food')) return false;
                    if (activeDelhiCategory === 'culture' && !cat.includes('cultur')) return false;
                    if (activeDelhiCategory === 'adventure' && !cat.includes('adventure')) return false;
                }
            }

            // Text Search matching
            if (activeSearch) {
                const matchesSearch =
                    dest.name.toLowerCase().includes(activeSearch) ||
                    dest.location.toLowerCase().includes(activeSearch) ||
                    (dest.district && dest.district.toLowerCase().includes(activeSearch)) ||
                    (dest.odop && dest.odop.toLowerCase().includes(activeSearch)) ||
                    (dest.upCircuit && dest.upCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.mpCircuit && dest.mpCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.division && dest.division.toLowerCase().includes(activeSearch)) ||
                    (dest.state && dest.state.toLowerCase().includes(activeSearch)) ||
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
                        case 'my-favorites':
                        case 'saved':
                        case 'favorites': {
                            return savedDestinations.some(
                                (item) =>
                                    String(item.id) === String(dest.id) ||
                                    item.name?.toLowerCase() === dest.name?.toLowerCase()
                            );
                        }
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
                        case 'historical':
                        case 'history':
                            return (dest.delhiCategory || dest.category || '').toLowerCase().includes('historic') || dest.tags?.some(t => t.toLowerCase().includes('historic'));
                        case 'food':
                        case 'culinary':
                            return (dest.delhiCategory || dest.category || '').toLowerCase().includes('food') || dest.tags?.some(t => t.toLowerCase().includes('food'));
                        case 'culture':
                        case 'cultural':
                            return (dest.delhiCategory || dest.category || '').toLowerCase().includes('cultur') || dest.tags?.some(t => t.toLowerCase().includes('cultur'));
                        case 'adventure':
                            return (dest.delhiCategory || dest.category || '').toLowerCase().includes('adventure') || dest.tags?.some(t => t.toLowerCase().includes('adventure'));
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

            // Advanced Filters: Budget / Cost-of-Living Index Tiers
            if (advancedFilters.budgetRanges.length > 0) {
                const intel = getDestinationIntelligence(dest);
                const estMonthly = parseInt(String(intel?.costs?.totalEstimated || dest.price || '').replace(/[^0-9]/g, ''), 10) || 1450;
                const matchesBudget = advancedFilters.budgetRanges.some(range => {
                    if (range === 'budget') return estMonthly <= 1200;
                    if (range === 'mid-range') return estMonthly > 1200 && estMonthly <= 2200;
                    if (range === 'luxury') return estMonthly > 2200;
                    return true;
                });
                if (!matchesBudget) return false;
            }

            // Advanced Filters: Max Monthly Cost Slider
            if (advancedFilters.maxMonthlyCost && advancedFilters.maxMonthlyCost < 5000) {
                const intel = getDestinationIntelligence(dest);
                const estMonthly = parseInt(String(intel?.costs?.totalEstimated || dest.price || '').replace(/[^0-9]/g, ''), 10) || 1450;
                if (estMonthly > advancedFilters.maxMonthlyCost) return false;
            }

            // Advanced Filters: Climate Type
            if (advancedFilters.climates && advancedFilters.climates.length > 0) {
                const intel = getDestinationIntelligence(dest);
                const tempC = intel?.weather?.tempC ?? 24;
                const catLower = (dest.category || '').toLowerCase();
                const locLower = `${dest.name} ${dest.location}`.toLowerCase();

                const matchesClimate = advancedFilters.climates.some(climateId => {
                    if (climateId === 'tropical') {
                        return catLower.includes('beach') || catLower.includes('island') ||
                            locLower.includes('bali') || locLower.includes('thailand') ||
                            locLower.includes('indonesia') || locLower.includes('vietnam') ||
                            locLower.includes('philippines') || locLower.includes('maldives') ||
                            locLower.includes('caribbean') || locLower.includes('fiji') ||
                            locLower.includes('bora bora') || (tempC >= 26 && !catLower.includes('desert'));
                    }
                    if (climateId === 'temperate') {
                        return (tempC >= 18 && tempC <= 26 && !catLower.includes('desert')) ||
                            locLower.includes('lisbon') || locLower.includes('medellin') ||
                            locLower.includes('barcelona') || locLower.includes('italy') ||
                            locLower.includes('greece') || locLower.includes('france') ||
                            locLower.includes('japan');
                    }
                    if (climateId === 'arid') {
                        return catLower.includes('desert') || locLower.includes('dubai') ||
                            locLower.includes('cairo') || locLower.includes('marrakech') ||
                            locLower.includes('egypt') || locLower.includes('morocco') ||
                            locLower.includes('jordan') || locLower.includes('uae') || tempC >= 31;
                    }
                    if (climateId === 'alpine') {
                        return catLower.includes('mountain') || catLower.includes('snow') ||
                            locLower.includes('alps') || locLower.includes('swiss') ||
                            locLower.includes('zermatt') || locLower.includes('aspen') ||
                            locLower.includes('whistler') || locLower.includes('banff') ||
                            locLower.includes('lapland') || tempC <= 17;
                    }
                    return true;
                });
                if (!matchesClimate) return false;
            }

            // Advanced Filters: Internet Speed Tiers & Minimum Speed Slider
            const internetTiers = advancedFilters.internetSpeeds || [];
            const minSpeedSlider = advancedFilters.minInternetSpeed || 0;
            if (internetTiers.length > 0 || minSpeedSlider > 0) {
                const intel = getDestinationIntelligence(dest);
                const downMbps = intel?.internet?.downloadMbps || 120;

                if (minSpeedSlider > 0 && downMbps < minSpeedSlider) {
                    return false;
                }

                if (internetTiers.length > 0) {
                    const matchesTier = internetTiers.some(tier => {
                        if (tier === 'standard') return downMbps >= 50;
                        if (tier === 'fast') return downMbps >= 150;
                        if (tier === 'ultrafast') return downMbps >= 250;
                        return true;
                    });
                    if (!matchesTier) return false;
                }
            }

            // Advanced Filters: Categories
            if (advancedFilters.categories.length > 0) {
                if (!advancedFilters.categories.includes(dest.category.toLowerCase())) return false;
            }

            // Domain Status Filter ('available' | 'taken' | 'premium')
            if (domainStatus && domainStatus !== 'all') {
                const destStatus = getDestinationDomainStatus(dest).toLowerCase();
                if (destStatus !== domainStatus.toLowerCase()) {
                    return false;
                }
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
    }, [searchQuery, globalSearchQuery, selectedFilters, globalActiveFilters, advancedFilters, domainStatus, sortBy, savedDestinations, isDelhiFocusMode, activeDelhiCategory, regionMode, selectedDistrict, selectedCircuit, selectedMPCategory, selectedMHCategory, selectedRJCategory]);

    useEffect(() => {
        if (processedDestinations.length > 0) {
            incrementMonetizationExposure();
        }
        window.dispatchEvent(new CustomEvent('destinations:count', { detail: { count: processedDestinations.length } }));
    }, [processedDestinations.length, incrementMonetizationExposure]);

    const handleReset = () => {
        resetFilters();
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
        setRegionMode('up');
        setSelectedDistrict('all');
        setSelectedCircuit('all');
        setSelectedMPCategory('all');
        setSelectedMHCategory('all');
        setSelectedRJCategory('all');
        setIsDelhiFocusMode(false);
        setActiveDelhiCategory('all');
    };

    return (
        <div className="destinations-page">
            <div className="destinations-main-layout">
                <div className="destinations-feed-column">
                    {/* Interactive Region & Uttar Pradesh / Madhya Pradesh / Maharashtra / Rajasthan Circuit & District Explorer Bar */}
                    <UPDestinationExplorerBar
                        regionMode={regionMode}
                        onSelectRegionMode={(mode) => {
                            setRegionMode(mode);
                            setSelectedDistrict('all');
                            setSelectedCircuit('all');
                            setSelectedMPCategory('all');
                            setSelectedMHCategory('all');
                            setSelectedRJCategory('all');
                            if (mode === 'delhi') {
                                setIsDelhiFocusMode(true);
                            } else {
                                setIsDelhiFocusMode(false);
                            }
                        }}
                        selectedDistrict={selectedDistrict}
                        onSelectDistrict={setSelectedDistrict}
                        selectedCircuit={selectedCircuit}
                        onSelectCircuit={setSelectedCircuit}
                        selectedMPCategory={selectedMPCategory}
                        onSelectMPCategory={setSelectedMPCategory}
                        selectedMHCategory={selectedMHCategory}
                        onSelectMHCategory={setSelectedMHCategory}
                        selectedRJCategory={selectedRJCategory}
                        onSelectRJCategory={setSelectedRJCategory}
                        upDestinations={upDestinations}
                        districtsList={districtsList}
                        mpDestinations={mpDestinations}
                        mpDistrictsList={mpDistrictsList}
                        mhDestinations={mhDestinations}
                        mhDistrictsList={mhDistrictsList}
                        rjDestinations={rjDestinations}
                        rjDistrictsList={rjDistrictsList}
                        totalCount={processedDestinations.length}
                        onOpen75Districts={() => setIs75DistrictsModalOpen(true)}
                        onOpen55Districts={() => setIs55DistrictsModalOpen(true)}
                        onOpen36Districts={() => setIs36DistrictsModalOpen(true)}
                        onOpen50Districts={() => setIs50DistrictsModalOpen(true)}
                    />

                    {/* Active District Filter Banner for UP */}
                    {regionMode === 'up' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner">
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering UP by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 75 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active District Filter Banner for MP */}
                    {regionMode === 'mp' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(52, 211, 153, 0.4)' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering MP by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 55 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for MP */}
                    {regionMode === 'mp' && selectedMPCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.22) 100%)', borderColor: 'rgba(52, 211, 153, 0.45)', color: '#d1fae5' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedMPCategory === 'wildlife' ? '🐾' : selectedMPCategory === 'historical' ? '🏛️' : selectedMPCategory === 'pilgrimage' ? '🕉️' : selectedMPCategory === 'nature' ? '🌊' : '🏺'}
                                </span>
                                <span>Filtering MP by Category: <strong>{MP_CATEGORIES.find(c => c.id === selectedMPCategory)?.label || selectedMPCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(52, 211, 153, 0.5)', color: '#6ee7b7' }}
                                onClick={() => setSelectedMPCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Active District Filter Banner for MH */}
                    {regionMode === 'mh' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(234, 88, 12, 0.12)', borderColor: 'rgba(249, 115, 22, 0.45)', color: '#fed7aa' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Maharashtra by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(249, 115, 22, 0.5)', color: '#fdba74' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 36 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for MH */}
                    {regionMode === 'mh' && selectedMHCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.16) 0%, rgba(194, 65, 12, 0.22) 100%)', borderColor: 'rgba(249, 115, 22, 0.45)', color: '#fed7aa' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedMHCategory === 'wildlife' ? '🐾' : selectedMHCategory === 'historical' ? '🚩' : selectedMHCategory === 'pilgrimage' ? '🕉️' : selectedMHCategory === 'beach' ? '🏖️' : selectedMHCategory === 'nature' ? '⛰️' : '🏺'}
                                </span>
                                <span>Filtering Maharashtra by Category: <strong>{MH_CATEGORIES.find(c => c.id === selectedMHCategory)?.label || selectedMHCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(249, 115, 22, 0.5)', color: '#fdba74' }}
                                onClick={() => setSelectedMHCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Active District Filter Banner for RJ */}
                    {regionMode === 'rj' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(217, 119, 6, 0.12)', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fde68a' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Rajasthan by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fcd34d' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 50 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for RJ */}
                    {regionMode === 'rj' && selectedRJCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.16) 0%, rgba(180, 83, 9, 0.22) 100%)', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fde68a' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedRJCategory === 'wildlife' ? '🐾' : selectedRJCategory === 'historical' ? '🏰' : selectedRJCategory === 'desert' ? '🐪' : selectedRJCategory === 'pilgrimage' ? '🕉️' : selectedRJCategory === 'nature' ? '⛰️' : '🏺'}
                                </span>
                                <span>Filtering Rajasthan by Category: <strong>{RJ_CATEGORIES.find(c => c.id === selectedRJCategory)?.label || selectedRJCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fcd34d' }}
                                onClick={() => setSelectedRJCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Interactive Delhi Category Filter Bar (when in Delhi mode) */}
                    {regionMode === 'delhi' && (
                        <DelhiCategoryFilterBar
                            activeCategory={activeDelhiCategory}
                            onSelectCategory={handleSelectDelhiCategory}
                            categoryCounts={delhiCategoryCounts}
                            totalDelhiCount={delhiDestinations.length}
                            onResetToGlobal={handleToggleGlobalMode}
                            isGlobalMode={false}
                        />
                    )}

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
                                <p>We couldn't find any destinations matching your current query or filters in this category. Try switching categories or clearing search keywords.</p>
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
                                            setRegionMode('up');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                    >
                                        View All Uttar Pradesh Destinations ({upDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('mp');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedMPCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(52, 211, 153, 0.4)', color: '#6ee7b7' }}
                                    >
                                        View All Madhya Pradesh Destinations ({mpDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('mh');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedMHCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(249, 115, 22, 0.4)', color: '#fdba74' }}
                                    >
                                        View All Maharashtra Destinations ({mhDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('rj');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedRJCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fcd34d' }}
                                    >
                                        View All Rajasthan Destinations ({rjDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('delhi');
                                            setIsDelhiFocusMode(true);
                                            setActiveDelhiCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                    >
                                        View All Delhi Destinations ({delhiDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('global');
                                            setIsDelhiFocusMode(false);
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                    >
                                        Browse Global Destinations
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

            {/* Side-by-Side Compare Destinations Modal */}
            <CompareDestinationsModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
            />

            {/* Slide-Out Filter Panel (Climate, Cost-of-Living Index & Internet Speed) */}
            <ExploreFilterSlidePanel
                totalResults={processedDestinations.length}
            />

            {/* Comprehensive 75 Districts Directory Modal */}
            <UP75DistrictsModal
                isOpen={is75DistrictsModalOpen}
                onClose={() => setIs75DistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('up');
                    setIs75DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 55 Districts Directory Modal for Madhya Pradesh */}
            <MP55DistrictsModal
                isOpen={is55DistrictsModalOpen}
                onClose={() => setIs55DistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('mp');
                    setIs55DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 36 Districts Directory Modal for Maharashtra */}
            <MH36DistrictsModal
                isOpen={is36DistrictsModalOpen}
                onClose={() => setIs36DistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('mh');
                    setIs36DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 50 Districts Directory Modal for Rajasthan */}
            <RJ50DistrictsModal
                isOpen={is50DistrictsModalOpen}
                onClose={() => setIs50DistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('rj');
                    setIs50DistrictsModalOpen(false);
                }}
            />
        </div>
    );
};

export default Destinations;


