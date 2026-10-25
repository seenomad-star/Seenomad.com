import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allDestinations } from '../../../data/destinationsData';
import { fetchPublishedDestinations } from '../../../lib/destinationCatalogue';
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
import { CG33DistrictsModal, CG_CATEGORIES, matchCGCategory } from './CGDistrictIntelligenceSuite';
import { OD30DistrictsModal, OD_CATEGORIES, matchODCategory } from './ODDistrictIntelligenceSuite';
import { JH24DistrictsModal, JH_CATEGORIES, matchJHCategory } from './JHDistrictIntelligenceSuite';
import { Bihar38DistrictsModal, BIHAR_CATEGORIES, matchBiharCategory } from './BiharDistrictIntelligenceSuite';
import { WB23DistrictsModal, WB_CATEGORIES, matchWBCategory } from './WBDistrictIntelligenceSuite';
import { AssamDistrictsModal, ASSAM_CATEGORIES, matchAssamCategory } from './AssamDistrictIntelligenceSuite';
import OdishaCategoryFilterBar from './OdishaCategoryFilterBar';
import JharkhandCategoryFilterBar from './JharkhandCategoryFilterBar';
import BiharCategoryFilterBar from './BiharCategoryFilterBar';
import WestBengalCategoryFilterBar from './WestBengalCategoryFilterBar';
import AssamCategoryFilterBar from './AssamCategoryFilterBar';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import { useNavStore } from '../../../store/navStore';
import { getDestinationDomainStatus } from '../../../utils/destinationDomainUtils';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { Compass, RotateCcw, ArrowLeftRight } from 'lucide-react';
import './Destinations.css';

const Destinations = () => {
    const [searchParams] = useSearchParams();
    const [databaseDestinations, setDatabaseDestinations] = useState(null);

    useEffect(() => {
        let active = true;
        fetchPublishedDestinations().then((rows) => {
            if (active && rows?.length) setDatabaseDestinations(rows);
        });
        return () => { active = false; };
    }, []);
    const [is75DistrictsModalOpen, setIs75DistrictsModalOpen] = useState(false);
    const [is55DistrictsModalOpen, setIs55DistrictsModalOpen] = useState(false);
    const [is36DistrictsModalOpen, setIs36DistrictsModalOpen] = useState(false);
    const [is50DistrictsModalOpen, setIs50DistrictsModalOpen] = useState(false);
    const [is33DistrictsModalOpen, setIs33DistrictsModalOpen] = useState(false);
    const [is30DistrictsModalOpen, setIs30DistrictsModalOpen] = useState(false);
    const [is24DistrictsModalOpen, setIs24DistrictsModalOpen] = useState(false);
    const [is38DistrictsModalOpen, setIs38DistrictsModalOpen] = useState(false);
    const [is23DistrictsModalOpen, setIs23DistrictsModalOpen] = useState(false);
    const [isAssamDistrictsModalOpen, setIsAssamDistrictsModalOpen] = useState(false);
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

    // Curated Chhattisgarh Destinations & All 33 Districts list
    const cgDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isChhattisgarh || d.location?.toLowerCase().includes('chhattisgarh'));
    }, []);

    const cgDistrictsList = useMemo(() => {
        const set = new Set();
        cgDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [cgDestinations]);

    // Curated Odisha Destinations & All 30 Districts list
    const odDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isOdisha || d.location?.toLowerCase().includes('odisha'));
    }, []);

    const odDistrictsList = useMemo(() => {
        const set = new Set();
        odDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [odDestinations]);

    // Compute counts per Odisha category
    const odCategoryCounts = useMemo(() => {
        const counts = { all: odDestinations.length };
        OD_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = odDestinations.filter(d => matchODCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [odDestinations]);

    // Curated Jharkhand Destinations & All 24 Districts list
    const jhDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isJharkhand || d.state === 'Jharkhand' || d.location?.toLowerCase().includes('jharkhand'));
    }, []);

    const jhDistrictsList = useMemo(() => {
        const set = new Set();
        jhDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [jhDestinations]);

    // Compute counts per Jharkhand category
    const jhCategoryCounts = useMemo(() => {
        const counts = { all: jhDestinations.length };
        JH_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = jhDestinations.filter(d => matchJHCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [jhDestinations]);

    // Curated Bihar Destinations & All 38 Districts list
    const biharDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isBihar || d.state === 'Bihar' || d.location?.toLowerCase().includes('bihar'));
    }, []);

    const biharDistrictsList = useMemo(() => {
        const set = new Set();
        biharDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [biharDestinations]);

    // Compute counts per Bihar category
    const biharCategoryCounts = useMemo(() => {
        const counts = { all: biharDestinations.length };
        BIHAR_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = biharDestinations.filter(d => matchBiharCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [biharDestinations]);

    // Curated West Bengal Destinations & All 23 Districts list
    const wbDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isWestBengal || d.state === 'West Bengal' || d.location?.toLowerCase().includes('west bengal'));
    }, []);

    const wbDistrictsList = useMemo(() => {
        const set = new Set();
        wbDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [wbDestinations]);

    // Compute counts per West Bengal category
    const wbCategoryCounts = useMemo(() => {
        const counts = { all: wbDestinations.length };
        WB_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = wbDestinations.filter(d => matchWBCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [wbDestinations]);

    // Curated Assam Destinations & All 35 Districts list
    const assamDestinations = useMemo(() => {
        return allDestinations.filter(d => d.isAssam || d.state === 'Assam' || d.location?.toLowerCase().includes('assam'));
    }, []);

    const assamDistrictsList = useMemo(() => {
        const set = new Set();
        assamDestinations.forEach(d => {
            if (d.district) set.add(d.district);
        });
        return Array.from(set).sort();
    }, [assamDestinations]);

    // Compute counts per Assam category
    const assamCategoryCounts = useMemo(() => {
        const counts = { all: assamDestinations.length };
        ASSAM_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = assamDestinations.filter(d => matchAssamCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [assamDestinations]);

    // Region Mode: 'assam' | 'wb' | 'bihar' | 'jh' | 'od' | 'cg' | 'rj' | 'mh' | 'mp' | 'up' | 'delhi' | 'global'
    const initialRegionParam = (searchParams.get('region') || searchParams.get('state') || '').toLowerCase();
    const [regionMode, setRegionMode] = useState(
        ['assam', 'asom', 'axom'].includes(initialRegionParam)
            ? 'assam'
            : ['wb', 'westbengal', 'west-bengal', 'bengal'].includes(initialRegionParam)
            ? 'wb'
            : ['bihar', 'bh'].includes(initialRegionParam)
            ? 'bihar'
            : ['jh', 'jharkhand'].includes(initialRegionParam)
            ? 'jh'
            : ['od', 'odisha', 'odisa'].includes(initialRegionParam)
            ? 'od'
            : ['cg', 'chhattisgarh'].includes(initialRegionParam)
            ? 'cg'
            : ['rj', 'rajasthan'].includes(initialRegionParam)
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

    // Assam Category / Interest Filter ('wildlife' | 'tea' | 'heritage' | 'spiritual' | 'nature' | 'crafts' | 'all')
    const initialAssamCategoryParam = (searchParams.get('category') || searchParams.get('assamCategory') || '').toLowerCase();
    const [selectedAssamCategory, setSelectedAssamCategory] = useState(
        ['wildlife', 'tea', 'heritage', 'spiritual', 'temples', 'nature', 'river', 'crafts', 'culture', 'all'].includes(initialAssamCategoryParam)
            ? initialAssamCategoryParam
            : 'all'
    );

    // West Bengal Category / Interest Filter ('hills' | 'heritage' | 'spiritual' | 'wildlife' | 'beaches' | 'cultural' | 'all')
    const initialWBCategoryParam = (searchParams.get('category') || searchParams.get('wbCategory') || '').toLowerCase();
    const [selectedWBCategory, setSelectedWBCategory] = useState(
        ['hills', 'himalayas', 'heritage', 'spiritual', 'temples', 'wildlife', 'beaches', 'cultural', 'all'].includes(initialWBCategoryParam)
            ? initialWBCategoryParam
            : 'all'
    );

    // Bihar Category / Interest Filter ('spiritual' | 'historical' | 'nature' | 'wildlife' | 'waterfalls' | 'heritage' | 'all')
    const initialBiharCategoryParam = (searchParams.get('category') || searchParams.get('biharCategory') || '').toLowerCase();
    const [selectedBiharCategory, setSelectedBiharCategory] = useState(
        ['spiritual', 'temples', 'historical', 'nature', 'wildlife', 'waterfalls', 'heritage', 'all'].includes(initialBiharCategoryParam)
            ? initialBiharCategoryParam
            : 'all'
    );

    // Jharkhand Category / Interest Filter ('waterfalls' | 'spiritual' | 'nature' | 'wildlife' | 'tribal' | 'historical' | 'all')
    const initialJHCategoryParam = (searchParams.get('category') || searchParams.get('jhCategory') || '').toLowerCase();
    const [selectedJHCategory, setSelectedJHCategory] = useState(
        ['waterfalls', 'spiritual', 'temples', 'nature', 'wildlife', 'tribal', 'culture', 'historical', 'all'].includes(initialJHCategoryParam)
            ? initialJHCategoryParam
            : 'all'
    );

    // Odisha Category / Interest Filter ('beaches' | 'temples' | 'tribal' | 'wildlife' | 'waterfalls' | 'nature' | 'spiritual' | 'historical' | 'all')
    const initialODCategoryParam = (searchParams.get('category') || searchParams.get('odCategory') || '').toLowerCase();
    const [selectedODCategory, setSelectedODCategory] = useState(
        ['beaches', 'temples', 'tribal', 'culture', 'wildlife', 'waterfalls', 'nature', 'spiritual', 'historical', 'all'].includes(initialODCategoryParam)
            ? initialODCategoryParam
            : 'all'
    );

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

    // Chhattisgarh Category / Interest Filter ('waterfalls' | 'tribal' | 'wildlife' | 'historical' | 'spiritual' | 'nature' | 'all')
    const initialCGCategoryParam = (searchParams.get('category') || searchParams.get('cgCategory') || '').toLowerCase();
    const [selectedCGCategory, setSelectedCGCategory] = useState(
        ['waterfalls', 'tribal', 'wildlife', 'historical', 'spiritual', 'nature', 'all'].includes(initialCGCategoryParam)
            ? initialCGCategoryParam
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

        const sourceDestinations = regionMode === 'global' && databaseDestinations?.length
            ? databaseDestinations
            : allDestinations;
        const filtered = sourceDestinations.filter(dest => {
            // Regional Scope Filter ('assam' | 'wb' | 'bihar' | 'jh' | 'od' | 'cg' | 'rj' | 'mh' | 'mp' | 'up' | 'delhi' | 'global')
            if (regionMode === 'assam') {
                const isAssam = dest.isAssam || dest.state === 'Assam' || dest.location?.toLowerCase().includes('assam');
                if (!isAssam) return false;

                // Category filter ('wildlife', 'tea', 'heritage', 'spiritual', 'nature', 'crafts', etc.)
                if (selectedAssamCategory && selectedAssamCategory !== 'all') {
                    if (!matchAssamCategory(dest, selectedAssamCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district?.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.assamCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'wb') {
                const isWB = dest.isWestBengal || dest.state === 'West Bengal' || dest.location?.toLowerCase().includes('west bengal');
                if (!isWB) return false;

                // Category filter ('hills', 'heritage', 'spiritual', 'wildlife', 'beaches', 'cultural', etc.)
                if (selectedWBCategory && selectedWBCategory !== 'all') {
                    if (!matchWBCategory(dest, selectedWBCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district?.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.wbCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'bihar') {
                const isBihar = dest.isBihar || dest.state === 'Bihar' || dest.location?.toLowerCase().includes('bihar');
                if (!isBihar) return false;

                // Category filter ('spiritual', 'historical', 'nature', 'wildlife', 'waterfalls', 'heritage', etc.)
                if (selectedBiharCategory && selectedBiharCategory !== 'all') {
                    if (!matchBiharCategory(dest, selectedBiharCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district?.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.biharCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'jh') {
                const isJH = dest.isJharkhand || dest.state === 'Jharkhand' || dest.location?.toLowerCase().includes('jharkhand');
                if (!isJH) return false;

                // Category filter ('waterfalls', 'spiritual', 'nature', 'wildlife', 'tribal', 'historical', etc.)
                if (selectedJHCategory && selectedJHCategory !== 'all') {
                    if (!matchJHCategory(dest, selectedJHCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.jhCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'od') {
                const isOD = dest.isOdisha || dest.location?.toLowerCase().includes('odisha');
                if (!isOD) return false;

                // Category filter ('spiritual', 'historical', 'nature', 'wildlife', 'waterfalls', 'tribal', etc.)
                if (selectedODCategory && selectedODCategory !== 'all') {
                    if (!matchODCategory(dest, selectedODCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.odCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'cg') {
                const isCG = dest.isChhattisgarh || dest.location?.toLowerCase().includes('chhattisgarh');
                if (!isCG) return false;

                // Category filter ('waterfalls', 'tribal', 'wildlife', 'historical', 'spiritual', 'nature', etc.)
                if (selectedCGCategory && selectedCGCategory !== 'all') {
                    if (!matchCGCategory(dest, selectedCGCategory)) return false;
                }

                // District filter
                if (selectedDistrict && selectedDistrict !== 'all') {
                    if (dest.district !== selectedDistrict) return false;
                }

                // Circuit filter
                if (selectedCircuit && selectedCircuit !== 'all') {
                    if (dest.cgCircuit !== selectedCircuit) return false;
                }
            } else if (regionMode === 'rj') {
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
                    (dest.assamCircuit && dest.assamCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.wbCircuit && dest.wbCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.biharCircuit && dest.biharCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.jhCircuit && dest.jhCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.odCircuit && dest.odCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.cgCircuit && dest.cgCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.rjCircuit && dest.rjCircuit.toLowerCase().includes(activeSearch)) ||
                    (dest.mhCircuit && dest.mhCircuit.toLowerCase().includes(activeSearch)) ||
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
    }, [searchQuery, globalSearchQuery, selectedFilters, globalActiveFilters, advancedFilters, domainStatus, sortBy, savedDestinations, isDelhiFocusMode, activeDelhiCategory, regionMode, selectedDistrict, selectedCircuit, selectedMPCategory, selectedMHCategory, selectedRJCategory, selectedCGCategory, selectedODCategory, selectedJHCategory, selectedBiharCategory, selectedWBCategory, selectedAssamCategory]);

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
        setSelectedCGCategory('all');
        setSelectedODCategory('all');
        setSelectedJHCategory('all');
        setSelectedBiharCategory('all');
        setSelectedWBCategory('all');
        setSelectedAssamCategory('all');
        setIsDelhiFocusMode(false);
        setActiveDelhiCategory('all');
    };

    return (
        <div className="destinations-page">
            <div className="destinations-main-layout">
                <div className="destinations-feed-column">
                    {/* Interactive Region & Uttar Pradesh / Madhya Pradesh / Maharashtra / Rajasthan / Chhattisgarh / Odisha Circuit & District Explorer Bar */}
                    <UPDestinationExplorerBar
                        regionMode={regionMode}
                        onSelectRegionMode={(mode) => {
                            setRegionMode(mode);
                            setSelectedDistrict('all');
                            setSelectedCircuit('all');
                            setSelectedMPCategory('all');
                            setSelectedMHCategory('all');
                            setSelectedRJCategory('all');
                            setSelectedCGCategory('all');
                            setSelectedODCategory('all');
                            setSelectedJHCategory('all');
                            setSelectedBiharCategory('all');
                            setSelectedWBCategory('all');
                            setSelectedAssamCategory('all');
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
                        selectedCGCategory={selectedCGCategory}
                        onSelectCGCategory={setSelectedCGCategory}
                        selectedODCategory={selectedODCategory}
                        onSelectODCategory={setSelectedODCategory}
                        selectedJHCategory={selectedJHCategory}
                        onSelectJHCategory={setSelectedJHCategory}
                        selectedBiharCategory={selectedBiharCategory}
                        onSelectBiharCategory={setSelectedBiharCategory}
                        selectedWBCategory={selectedWBCategory}
                        onSelectWBCategory={setSelectedWBCategory}
                        selectedAssamCategory={selectedAssamCategory}
                        onSelectAssamCategory={setSelectedAssamCategory}
                        upDestinations={upDestinations}
                        districtsList={districtsList}
                        mpDestinations={mpDestinations}
                        mpDistrictsList={mpDistrictsList}
                        mhDestinations={mhDestinations}
                        mhDistrictsList={mhDistrictsList}
                        rjDestinations={rjDestinations}
                        rjDistrictsList={rjDistrictsList}
                        cgDestinations={cgDestinations}
                        cgDistrictsList={cgDistrictsList}
                        odDestinations={odDestinations}
                        odDistrictsList={odDistrictsList}
                        jhDestinations={jhDestinations}
                        jhDistrictsList={jhDistrictsList}
                        biharDestinations={biharDestinations}
                        biharDistrictsList={biharDistrictsList}
                        wbDestinations={wbDestinations}
                        wbDistrictsList={wbDistrictsList}
                        assamDestinations={assamDestinations}
                        assamDistrictsList={assamDistrictsList}
                        totalCount={processedDestinations.length}
                        onOpen75Districts={() => setIs75DistrictsModalOpen(true)}
                        onOpen55Districts={() => setIs55DistrictsModalOpen(true)}
                        onOpen36Districts={() => setIs36DistrictsModalOpen(true)}
                        onOpen50Districts={() => setIs50DistrictsModalOpen(true)}
                        onOpen33Districts={() => setIs33DistrictsModalOpen(true)}
                        onOpen30Districts={() => setIs30DistrictsModalOpen(true)}
                        onOpen24Districts={() => setIs24DistrictsModalOpen(true)}
                        onOpen38Districts={() => setIs38DistrictsModalOpen(true)}
                        onOpen23Districts={() => setIs23DistrictsModalOpen(true)}
                        onOpen35Districts={() => setIsAssamDistrictsModalOpen(true)}
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

                    {/* Active District Filter Banner for CG */}
                    {regionMode === 'cg' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(5, 150, 105, 0.12)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Chhattisgarh by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#a7f3d0' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 33 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for CG */}
                    {regionMode === 'cg' && selectedCGCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.16) 0%, rgba(4, 120, 87, 0.22) 100%)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#a7f3d0' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedCGCategory === 'waterfalls' ? '🌊' : selectedCGCategory === 'tribal' ? '🏺' : selectedCGCategory === 'wildlife' ? '🐅' : selectedCGCategory === 'historical' ? '🏛️' : selectedCGCategory === 'spiritual' ? '🕉️' : '⛰️'}
                                </span>
                                <span>Filtering Chhattisgarh by Category: <strong>{CG_CATEGORIES.find(c => c.id === selectedCGCategory)?.label || selectedCGCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}
                                onClick={() => setSelectedCGCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Active District Filter Banner for Odisha */}
                    {regionMode === 'od' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(217, 119, 6, 0.12)', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fde68a' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Odisha by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fcd34d' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 30 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for Odisha */}
                    {regionMode === 'od' && selectedODCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.16) 0%, rgba(180, 83, 9, 0.22) 100%)', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fde68a' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedODCategory === 'beaches' ? '🏖️' : selectedODCategory === 'temples' ? '🛕' : selectedODCategory === 'tribal' ? '🏺' : selectedODCategory === 'spiritual' ? '🕉️' : selectedODCategory === 'historical' ? '🏛️' : selectedODCategory === 'nature' ? '⛰️' : selectedODCategory === 'wildlife' ? '🐅' : selectedODCategory === 'waterfalls' ? '💧' : '🌟'}
                                </span>
                                <span>Filtering Odisha by Category: <strong>{OD_CATEGORIES.find(c => c.id === selectedODCategory)?.label || selectedODCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fcd34d' }}
                                onClick={() => setSelectedODCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Dedicated Odisha Category Filter Bar (when in Odisha mode) */}
                    {regionMode === 'od' && (
                        <OdishaCategoryFilterBar
                            activeCategory={selectedODCategory}
                            onSelectCategory={setSelectedODCategory}
                            categoryCounts={odCategoryCounts}
                            totalCount={odDestinations.length}
                            selectedDistrict={selectedDistrict}
                            onOpen30Districts={() => setIs30DistrictsModalOpen(true)}
                            onResetFilters={() => {
                                setSelectedODCategory('all');
                                setSelectedDistrict('all');
                                setSelectedCircuit('all');
                            }}
                            showAdSense={true}
                        />
                    )}

                    {/* Active District Filter Banner for Jharkhand */}
                    {regionMode === 'jh' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(6, 78, 59, 0.2)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Jharkhand by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#a7f3d0' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 24 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for Jharkhand */}
                    {regionMode === 'jh' && selectedJHCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.25) 0%, rgba(4, 120, 87, 0.3) 100%)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#a7f3d0' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedJHCategory === 'waterfalls' ? '💧' : selectedJHCategory === 'spiritual' ? '🕉️' : selectedJHCategory === 'nature' ? '⛰️' : selectedJHCategory === 'wildlife' ? '🐅' : selectedJHCategory === 'tribal' ? '🏺' : selectedJHCategory === 'historical' ? '🏰' : '🌟'}
                                </span>
                                <span>Filtering Jharkhand by Category: <strong>{JH_CATEGORIES.find(c => c.id === selectedJHCategory)?.label || selectedJHCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}
                                onClick={() => setSelectedJHCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Dedicated Jharkhand Category Filter Bar (when in Jharkhand mode) */}
                    {regionMode === 'jh' && (
                        <JharkhandCategoryFilterBar
                            activeCategory={selectedJHCategory}
                            onSelectCategory={setSelectedJHCategory}
                            categoryCounts={jhCategoryCounts}
                            totalCount={jhDestinations.length}
                            selectedDistrict={selectedDistrict}
                            onOpen24Districts={() => setIs24DistrictsModalOpen(true)}
                            onResetFilters={() => {
                                setSelectedJHCategory('all');
                                setSelectedDistrict('all');
                                setSelectedCircuit('all');
                            }}
                            showAdSense={true}
                        />
                    )}

                    {/* Active District Filter Banner for Bihar */}
                    {regionMode === 'bihar' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(153, 27, 27, 0.2)', borderColor: 'rgba(220, 38, 38, 0.45)', color: '#fca5a5' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Bihar by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(220, 38, 38, 0.5)', color: '#fecaca' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 38 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for Bihar */}
                    {regionMode === 'bihar' && selectedBiharCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.25) 0%, rgba(185, 28, 28, 0.3) 100%)', borderColor: 'rgba(220, 38, 38, 0.45)', color: '#fecaca' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedBiharCategory === 'spiritual' ? '🕉️' : selectedBiharCategory === 'historical' ? '🏛️' : selectedBiharCategory === 'nature' ? '⛰️' : selectedBiharCategory === 'wildlife' ? '🐅' : selectedBiharCategory === 'waterfalls' ? '💧' : selectedBiharCategory === 'heritage' ? '🏺' : '🌟'}
                                </span>
                                <span>Filtering Bihar by Category: <strong>{BIHAR_CATEGORIES.find(c => c.id === selectedBiharCategory)?.label || selectedBiharCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(220, 38, 38, 0.5)', color: '#fca5a5' }}
                                onClick={() => setSelectedBiharCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Dedicated Bihar Category Filter Bar (when in Bihar mode) */}
                    {regionMode === 'bihar' && (
                        <BiharCategoryFilterBar
                            activeCategory={selectedBiharCategory}
                            onSelectCategory={setSelectedBiharCategory}
                            categoryCounts={biharCategoryCounts}
                            totalCount={biharDestinations.length}
                            selectedDistrict={selectedDistrict}
                            onOpen38Districts={() => setIs38DistrictsModalOpen(true)}
                            onResetFilters={() => {
                                setSelectedBiharCategory('all');
                                setSelectedDistrict('all');
                                setSelectedCircuit('all');
                            }}
                            showAdSense={true}
                        />
                    )}

                    {/* Active District Filter Banner for West Bengal */}
                    {regionMode === 'wb' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(185, 28, 28, 0.2)', borderColor: 'rgba(239, 68, 68, 0.45)', color: '#fca5a5' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering West Bengal by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 23 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for West Bengal */}
                    {regionMode === 'wb' && selectedWBCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.25) 0%, rgba(127, 29, 29, 0.3) 100%)', borderColor: 'rgba(239, 68, 68, 0.45)', color: '#fecaca' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedWBCategory === 'hills' ? '🏔️' : selectedWBCategory === 'heritage' ? '🏛️' : selectedWBCategory === 'spiritual' ? '🕉️' : selectedWBCategory === 'wildlife' ? '🐅' : selectedWBCategory === 'beaches' ? '🏖️' : selectedWBCategory === 'cultural' ? '🏺' : '🌟'}
                                </span>
                                <span>Filtering West Bengal by Category: <strong>{WB_CATEGORIES.find(c => c.id === selectedWBCategory)?.label || selectedWBCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}
                                onClick={() => setSelectedWBCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Dedicated West Bengal Category Filter Bar (when in West Bengal mode) */}
                    {regionMode === 'wb' && (
                        <WestBengalCategoryFilterBar
                            activeCategory={selectedWBCategory}
                            onSelectCategory={setSelectedWBCategory}
                            categoryCounts={wbCategoryCounts}
                            totalCount={wbDestinations.length}
                            selectedDistrict={selectedDistrict}
                            onOpen23Districts={() => setIs23DistrictsModalOpen(true)}
                            onResetFilters={() => {
                                setSelectedWBCategory('all');
                                setSelectedDistrict('all');
                                setSelectedCircuit('all');
                            }}
                            showAdSense={true}
                        />
                    )}

                    {/* Active District Filter Banner for Assam */}
                    {regionMode === 'assam' && selectedDistrict !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'rgba(5, 150, 105, 0.15)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#a7f3d0' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">📍</span>
                                <span>Filtering Assam by <strong>{selectedDistrict} District</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} displayed)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}
                                onClick={() => setSelectedDistrict('all')}
                            >
                                View All 35 Districts ×
                            </button>
                        </div>
                    )}

                    {/* Active Category / Interest Filter Banner for Assam */}
                    {regionMode === 'assam' && selectedAssamCategory !== 'all' && (
                        <div className="up-active-district-banner" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(180, 83, 9, 0.22) 100%)', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#fef3c7' }}>
                            <div className="active-banner-info">
                                <span className="active-banner-pin">
                                    {selectedAssamCategory === 'wildlife' ? '🦏' : selectedAssamCategory === 'tea' ? '🍃' : selectedAssamCategory === 'heritage' ? '🏛️' : selectedAssamCategory === 'spiritual' ? '🛕' : selectedAssamCategory === 'nature' ? '🌊' : selectedAssamCategory === 'crafts' ? '🧣' : '🌟'}
                                </span>
                                <span>Filtering Assam by Category: <strong>{ASSAM_CATEGORIES.find(c => c.id === selectedAssamCategory)?.label || selectedAssamCategory}</strong> ({processedDestinations.length} destination{processedDestinations.length === 1 ? '' : 's'} matched)</span>
                            </div>
                            <button
                                type="button"
                                className="active-banner-clear-btn"
                                style={{ background: 'rgba(0, 0, 0, 0.35)', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}
                                onClick={() => setSelectedAssamCategory('all')}
                            >
                                Clear Category Filter ×
                            </button>
                        </div>
                    )}

                    {/* Dedicated Assam Category Filter Bar (when in Assam mode) */}
                    {regionMode === 'assam' && (
                        <AssamCategoryFilterBar
                            activeCategory={selectedAssamCategory}
                            onSelectCategory={setSelectedAssamCategory}
                            categoryCounts={assamCategoryCounts}
                            totalCount={assamDestinations.length}
                            selectedDistrict={selectedDistrict}
                            onOpen35Districts={() => setIsAssamDistrictsModalOpen(true)}
                            onResetFilters={() => {
                                setSelectedAssamCategory('all');
                                setSelectedDistrict('all');
                                setSelectedCircuit('all');
                            }}
                            showAdSense={true}
                        />
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
                                    {/* Google AdSense In-Feed Responsive Unit for Odisha section */}
                                    {regionMode === 'od' && index === 3 && (
                                        <div 
                                            className="destination-card-adsense-wrap" 
                                            style={{ 
                                                gridColumn: '1 / -1', 
                                                margin: '0.75rem 0 1.25rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AdSenseSlot
                                                format="horizontal"
                                                slot="7009876543"
                                                label="Featured Travel Partner • Google AdSense"
                                            />
                                        </div>
                                    )}
                                    {/* Google AdSense In-Feed Responsive Unit for Jharkhand section */}
                                    {regionMode === 'jh' && index === 3 && (
                                        <div 
                                            className="destination-card-adsense-wrap" 
                                            style={{ 
                                                gridColumn: '1 / -1', 
                                                margin: '0.75rem 0 1.25rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AdSenseSlot
                                                format="horizontal"
                                                slot="7009876543"
                                                label="Featured Travel Partner • Jharkhand Exploration • Google AdSense"
                                            />
                                        </div>
                                    )}
                                    {/* Google AdSense In-Feed Responsive Unit for Bihar section */}
                                    {regionMode === 'bihar' && index === 3 && (
                                        <div 
                                            className="destination-card-adsense-wrap" 
                                            style={{ 
                                                gridColumn: '1 / -1', 
                                                margin: '0.75rem 0 1.25rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AdSenseSlot
                                                format="horizontal"
                                                slot="7009876543"
                                                label="Featured Travel Partner • Bihar Heritage Exploration • Google AdSense"
                                            />
                                        </div>
                                    )}
                                    {/* Google AdSense In-Feed Responsive Unit for West Bengal section */}
                                    {regionMode === 'wb' && index === 3 && (
                                        <div 
                                            className="destination-card-adsense-wrap" 
                                            style={{ 
                                                gridColumn: '1 / -1', 
                                                margin: '0.75rem 0 1.25rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AdSenseSlot
                                                format="horizontal"
                                                slot="7009876543"
                                                label="Featured Travel Partner • West Bengal Exploration • Google AdSense"
                                            />
                                        </div>
                                    )}
                                    {/* Google AdSense In-Feed Responsive Unit for Assam section */}
                                    {regionMode === 'assam' && index === 3 && (
                                        <div 
                                            className="destination-card-adsense-wrap" 
                                            style={{ 
                                                gridColumn: '1 / -1', 
                                                margin: '0.75rem 0 1.25rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AdSenseSlot
                                                format="horizontal"
                                                slot="7009876543"
                                                label="Featured Travel Partner • Assam Tourism & Tea Trails • Google AdSense"
                                            />
                                        </div>
                                    )}
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
                                            setRegionMode('cg');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedCGCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#6ee7b7' }}
                                    >
                                        View All Chhattisgarh Destinations ({cgDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('od');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedODCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(217, 119, 6, 0.4)', color: '#fcd34d' }}
                                    >
                                        View All Odisha Destinations ({odDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('jh');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedJHCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#6ee7b7' }}
                                    >
                                        View All Jharkhand Destinations ({jhDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('bihar');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedBiharCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}
                                    >
                                        View All Bihar Destinations ({biharDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('wb');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedWBCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(185, 28, 28, 0.45)', color: '#fca5a5' }}
                                    >
                                        View All West Bengal Destinations ({wbDestinations.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRegionMode('assam');
                                            setSelectedDistrict('all');
                                            setSelectedCircuit('all');
                                            setSelectedAssamCategory('all');
                                            setSearchQuery('');
                                        }}
                                        className="empty-suggestion-pill"
                                        style={{ borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7' }}
                                    >
                                        View All Assam Destinations ({assamDestinations.length})
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

            {/* Comprehensive 33 Districts Directory Modal for Chhattisgarh */}
            <CG33DistrictsModal
                isOpen={is33DistrictsModalOpen}
                onClose={() => setIs33DistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('cg');
                    setIs33DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 30 Districts Directory Modal for Odisha */}
            <OD30DistrictsModal
                isOpen={is30DistrictsModalOpen}
                onClose={() => setIs30DistrictsModalOpen(false)}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('od');
                    setIs30DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 24 Districts Directory Modal for Jharkhand */}
            <JH24DistrictsModal
                isOpen={is24DistrictsModalOpen}
                onClose={() => setIs24DistrictsModalOpen(false)}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('jh');
                    setIs24DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 38 Districts Directory Modal for Bihar */}
            <Bihar38DistrictsModal
                isOpen={is38DistrictsModalOpen}
                onClose={() => setIs38DistrictsModalOpen(false)}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('bihar');
                    setIs38DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 23 Districts Directory Modal for West Bengal */}
            <WB23DistrictsModal
                isOpen={is23DistrictsModalOpen}
                onClose={() => setIs23DistrictsModalOpen(false)}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('wb');
                    setIs23DistrictsModalOpen(false);
                }}
            />

            {/* Comprehensive 35 Districts Directory Modal for Assam */}
            <AssamDistrictsModal
                isOpen={isAssamDistrictsModalOpen}
                onClose={() => setIsAssamDistrictsModalOpen(false)}
                currentDistrict={selectedDistrict}
                onSelectDistrict={(dist) => {
                    setSelectedDistrict(dist);
                    setRegionMode('assam');
                    setIsAssamDistrictsModalOpen(false);
                }}
            />
        </div>
    );
};

export default Destinations;


