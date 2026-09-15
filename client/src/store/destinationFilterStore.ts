import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
    searchQuery: string;
    selectedFilters: string[];
    advancedFilters: {
        regions: string[];
        budgetRanges: string[];
        durations: string[];
        climates: string[];
        categories: string[];
    };
    viewMode: 'grid' | 'list' | 'map';
    searchHistory: string[];
    unlockedFeatures: string[];
    progress: number;
    streak: number;
    lastVisit: string | null;
    monetizationExposure: number;

    setSearchQuery: (query: string) => void;
    setSelectedFilters: (filters: string[]) => void;
    toggleFilter: (filterId: string) => void;
    toggleAdvancedFilter: (category: keyof FilterState['advancedFilters'], value: string) => void;
    setViewMode: (mode: 'grid' | 'list' | 'map') => void;
    addSearchHistory: (query: string) => void;
    unlockFeature: (featureId: string) => void;
    incrementProgress: (amount: number) => void;
    updateStreak: () => void;
    incrementMonetizationExposure: () => void;
    resetFilters: () => void;
}

export const useDestinationStore = create<FilterState>()(
    persist(
        (set) => ({
            searchQuery: '',
            selectedFilters: [],
            advancedFilters: {
                regions: [],
                budgetRanges: [],
                durations: [],
                climates: [],
                categories: [],
            },
            viewMode: 'grid',
            searchHistory: [],
            unlockedFeatures: [],
            progress: 0,
            streak: 0,
            lastVisit: null,
            monetizationExposure: 0,

            setSearchQuery: (query) => set({ searchQuery: query }),

            setSelectedFilters: (filters) => set({ selectedFilters: filters }),

            toggleFilter: (filterId) => set((state) => ({
                selectedFilters: state.selectedFilters.includes(filterId)
                    ? state.selectedFilters.filter(id => id !== filterId)
                    : [...state.selectedFilters, filterId]
            })),

            toggleAdvancedFilter: (category, value) => set((state) => ({
                advancedFilters: {
                    ...state.advancedFilters,
                    [category]: state.advancedFilters[category].includes(value)
                        ? state.advancedFilters[category].filter(v => v !== value)
                        : [...state.advancedFilters[category], value]
                }
            })),

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
                advancedFilters: {
                    regions: [],
                    budgetRanges: [],
                    durations: [],
                    climates: [],
                    categories: [],
                }
            }),
        }),
        {
            name: 'destination-storage',
        }
    )
);
