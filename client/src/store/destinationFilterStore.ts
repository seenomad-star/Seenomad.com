import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
    searchQuery: string;
    selectedFilters: string[];
    domainStatus: 'all' | 'available' | 'taken' | 'premium';
    advancedFilters: {
        regions: string[];
        budgetRanges: string[];
        durations: string[];
        climates: string[];
        categories: string[];
        internetSpeeds: string[];
        minInternetSpeed: number;
        maxMonthlyCost: number;
    };
    viewMode: 'grid' | 'list' | 'map';
    sortBy: string;
    searchHistory: string[];
    unlockedFeatures: string[];
    progress: number;
    streak: number;
    lastVisit: string | null;
    monetizationExposure: number;
    compareDestinations: number[];
    isCompareModalOpen: boolean;
    isFilterDrawerOpen: boolean;

    setSearchQuery: (query: string) => void;
    setSelectedFilters: (filters: string[]) => void;
    setDomainStatus: (status: 'all' | 'available' | 'taken' | 'premium') => void;
    toggleDomainStatus: (status: 'available' | 'taken' | 'premium') => void;
    setSortBy: (sort: string) => void;
    toggleFilter: (filterId: string) => void;
    toggleAdvancedFilter: (category: 'regions' | 'budgetRanges' | 'durations' | 'climates' | 'categories' | 'internetSpeeds', value: string) => void;
    setMinInternetSpeed: (speed: number) => void;
    setMaxMonthlyCost: (cost: number) => void;
    setIsFilterDrawerOpen: (isOpen: boolean) => void;
    setViewMode: (mode: 'grid' | 'list' | 'map') => void;
    addSearchHistory: (query: string) => void;
    unlockFeature: (featureId: string) => void;
    incrementProgress: (amount: number) => void;
    updateStreak: () => void;
    incrementMonetizationExposure: () => void;
    resetFilters: () => void;
    toggleCompareDestination: (destId: number) => void;
    setCompareDestinations: (ids: number[]) => void;
    clearCompareDestinations: () => void;
    setIsCompareModalOpen: (isOpen: boolean) => void;
}

export const useDestinationStore = create<FilterState>()(
    persist(
        (set) => ({
            searchQuery: '',
            selectedFilters: [],
            domainStatus: 'all',
            advancedFilters: {
                regions: [],
                budgetRanges: [],
                durations: [],
                climates: [],
                categories: [],
                internetSpeeds: [],
                minInternetSpeed: 0,
                maxMonthlyCost: 5000,
            },
            viewMode: 'grid',
            sortBy: 'featured',
            searchHistory: [],
            unlockedFeatures: [],
            progress: 0,
            streak: 0,
            lastVisit: null,
            monetizationExposure: 0,
            compareDestinations: [601, 812],
            isCompareModalOpen: false,
            isFilterDrawerOpen: false,

            setSearchQuery: (query) => set({ searchQuery: query }),

            setSelectedFilters: (filters) => set({ selectedFilters: filters }),

            setDomainStatus: (status) => set({ domainStatus: status }),

            toggleDomainStatus: (status) => set((state) => ({
                domainStatus: state.domainStatus === status ? 'all' : status
            })),

            setSortBy: (sort) => set({ sortBy: sort }),

            toggleFilter: (filterId) => set((state) => ({
                selectedFilters: state.selectedFilters.includes(filterId)
                    ? state.selectedFilters.filter(id => id !== filterId)
                    : [...state.selectedFilters, filterId]
            })),

            toggleAdvancedFilter: (category, value) => set((state) => {
                const currentList = state.advancedFilters[category] || [];
                return {
                    advancedFilters: {
                        ...state.advancedFilters,
                        [category]: currentList.includes(value)
                            ? currentList.filter(v => v !== value)
                            : [...currentList, value]
                    }
                };
            }),

            setMinInternetSpeed: (speed) => set((state) => ({
                advancedFilters: {
                    ...state.advancedFilters,
                    minInternetSpeed: speed
                }
            })),

            setMaxMonthlyCost: (cost) => set((state) => ({
                advancedFilters: {
                    ...state.advancedFilters,
                    maxMonthlyCost: cost
                }
            })),

            setIsFilterDrawerOpen: (isOpen) => set({ isFilterDrawerOpen: isOpen }),

            setViewMode: (mode) => set({ viewMode: mode }),

            addSearchHistory: (query) => set((state) => ({
                searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 10)
            })),

            unlockFeature: (featureId) => set((state) => ({
                unlockedFeatures: state.unlockedFeatures.includes(featureId)
                    ? state.unlockedFeatures
                    : [...state.unlockedFeatures, featureId]
            })),

            incrementProgress: (amount) => set((state) => ({
                progress: Math.min(state.progress + amount, 100)
            })),

            updateStreak: () => set((state) => {
                const now = new Date();
                const today = now.toISOString().split('T')[0];
                if (state.lastVisit === today) return state;

                const lastVisitDate = state.lastVisit ? new Date(state.lastVisit) : null;
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (state.lastVisit === yesterdayStr) {
                    return { streak: state.streak + 1, lastVisit: today };
                } else {
                    return { streak: 1, lastVisit: today };
                }
            }),

            incrementMonetizationExposure: () => set((state) => ({
                monetizationExposure: state.monetizationExposure + 1
            })),

            resetFilters: () => set({
                selectedFilters: [],
                searchQuery: '',
                domainStatus: 'all',
                sortBy: 'featured',
                advancedFilters: {
                    regions: [],
                    budgetRanges: [],
                    durations: [],
                    climates: [],
                    categories: [],
                    internetSpeeds: [],
                    minInternetSpeed: 0,
                    maxMonthlyCost: 5000,
                }
            }),

            toggleCompareDestination: (destId) => set((state) => {
                const exists = state.compareDestinations.includes(destId);
                if (exists) {
                    return {
                        compareDestinations: state.compareDestinations.filter((id) => id !== destId)
                    };
                }
                if (state.compareDestinations.length >= 2) {
                    return {
                        compareDestinations: [state.compareDestinations[1], destId]
                    };
                }
                return {
                    compareDestinations: [...state.compareDestinations, destId]
                };
            }),

            setCompareDestinations: (ids) => set({ compareDestinations: ids.slice(0, 2) }),

            clearCompareDestinations: () => set({ compareDestinations: [601, 812] }),

            setIsCompareModalOpen: (isOpen) => set({ isCompareModalOpen: isOpen }),
        }),
        {
            name: 'destination-storage',
        }
    )
);
