import { create } from 'zustand';

interface NavItem {
    id: string;
    label: string;
    icon?: string;
    slug?: string;
    score: number;
    type: 'context' | 'action' | 'monetization' | 'retention';
    rewardText?: string;
    moduleConstraint?: string;
}

interface LiveInsight {
    id: string;
    icon: string;
    text: string;
    time: string;
    type: 'trending' | 'booking' | 'search' | 'achievement';
}

interface NavState {
    activeModule: string;
    journeyStage: 'idle' | 'exploring' | 'booking' | 'pre-trip' | 'in-trip';
    intentScore: number;
    contextItems: NavItem[];
    actionItems: NavItem[];
    isSearchOpen: boolean;
    isModuleSwitcherOpen: boolean;
    isRightSidebarOpen: boolean;
    moduleNavItems: any[];
    moduleBasePath: string;

    // Ghost Dock & Dopamine Engine
    dockState: 'orb' | 'command' | 'hud';
    dockConfig: {
        placeholder: string;
        quickFilters: Array<{ id: string; label: string; icon: string }>;
        module: string;
    };
    globalSearchQuery: string;
    globalActiveFilters: string[];
    userXP: number;
    userLevel: number;
    retentionStreak: number;

    // Social & Profile Data
    userAvatar: string;
    userTitle: string;
    userRank: string;
    topRankPercentage: number;
    liveInsights: LiveInsight[];
    hasNewInsights: boolean;

    // Actions
    setActiveModule: (module: string) => void;
    setJourneyStage: (stage: NavState['journeyStage']) => void;
    setIntentScore: (score: number) => void;
    toggleSearch: (open?: boolean) => void;
    toggleModuleSwitcher: (open?: boolean) => void;
    toggleRightSidebar: (open?: boolean) => void;
    setModuleNav: (items: any[], basePath: string) => void;
    setDockState: (state: NavState['dockState']) => void;
    setDockConfig: (config: NavState['dockConfig']) => void;
    setGlobalSearchQuery: (query: string) => void;
    setGlobalActiveFilters: (filters: string[]) => void;
    addXP: (amount: number) => void;
    updateStreak: (streak: number) => void;
    addLiveInsight: (insight: Omit<LiveInsight, 'id' | 'time'>) => void;
    updateUserProfile: (profile: { avatar?: string; title?: string; rank?: string }) => void;
    markInsightsAsRead: () => void;

    // Async Actions
    fetchNavData: () => Promise<void>;
    trackInteraction: (itemId: string, action: string) => Promise<void>;

    // Priority Engine Logic
    getVisibleContext: () => NavItem | null;
    getVisibleActions: () => NavItem[];
    searchResults: any[];
}

export const useNavStore = create<NavState>((set, get) => ({
    activeModule: 'Explore',
    journeyStage: 'exploring',
    intentScore: 0.5,
    contextItems: [],
    actionItems: [],
    isSearchOpen: false,
    isModuleSwitcherOpen: false,
    isRightSidebarOpen: false,
    moduleNavItems: [],
    moduleBasePath: '',
    dockState: 'orb',
    dockConfig: {
        placeholder: 'Command Travel OS...',
        quickFilters: [],
        module: 'Global'
    },
    globalSearchQuery: '',
    globalActiveFilters: [],
    userXP: 4250,
    userLevel: 12,
    retentionStreak: 5,
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elite',
    userTitle: 'Elite Explorer',
    userRank: 'Top 5% this week',
    topRankPercentage: 5,
    liveInsights: [
        { id: '1', icon: '🔥', text: '2.4k people searching for Japan', time: '2m ago', type: 'search' },
        { id: '2', icon: '✈️', text: '5 people just booked Bali', time: '5m ago', type: 'booking' },
        { id: '3', icon: '🌟', text: '12 users are viewing Bali deals', time: '8m ago', type: 'trending' }
    ],
    hasNewInsights: true,
    searchResults: [],

    setGlobalSearchQuery: (query: string) => {
        const searchDatabase = [
            { id: 'b1', title: 'Canggu Surf Photo', type: 'Bounty', reward: '$15', path: '/community/bounty-board' },
            { id: 'b2', title: 'Lisbon WiFi Verify', type: 'Bounty', reward: '$10', path: '/community/bounty-board' },
            { id: 'p1', title: 'Bali Surf App', type: 'Project', path: '/community/collab-board' },
            { id: 'p2', title: 'Seoul Food Tour', type: 'Video', path: '/community/reels' },
            { id: 'c1', title: 'Elena Rodriguez', type: 'Creator', path: '/community/creator-profiles' }
        ];

        const filtered = query.length > 1 
            ? searchDatabase.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
            : [];

        set({ globalSearchQuery: query, searchResults: filtered });
    },

    setActiveModule: (module) => {
        set({ activeModule: module });
        get().fetchNavData();
    },
    setJourneyStage: (stage) => set({ journeyStage: stage }),
    setIntentScore: (score) => set({ intentScore: score }),
    toggleSearch: (open) => set((state) => ({ isSearchOpen: open ?? !state.isSearchOpen })),
    toggleModuleSwitcher: (open) => set((state) => ({ isModuleSwitcherOpen: open ?? !state.isModuleSwitcherOpen })),
    toggleRightSidebar: (open) => set((state) => ({ isRightSidebarOpen: open ?? !state.isRightSidebarOpen })),
    setModuleNav: (items, basePath) => set({ moduleNavItems: items, moduleBasePath: basePath }),
    setDockState: (state) => set({ dockState: state }),
    setDockConfig: (config) => set({ dockConfig: config }),
    setGlobalActiveFilters: (filters) => set({ globalActiveFilters: filters }),
    addXP: (amount) => set((state) => {
        const newXP = state.userXP + amount;
        const newLevel = Math.floor(newXP / 1000);
        return { userXP: newXP, userLevel: newLevel };
    }),
    updateStreak: (streak) => set({ retentionStreak: streak }),
    addLiveInsight: (insight) => set((state) => {
        const newInsight: LiveInsight = {
            ...insight,
            id: Date.now().toString(),
            time: 'Just now'
        };
        return {
            liveInsights: [newInsight, ...state.liveInsights].slice(0, 10),
            hasNewInsights: true
        };
    }),
    updateUserProfile: (profile) => set((state) => ({
        userAvatar: profile.avatar ?? state.userAvatar,
        userTitle: profile.title ?? state.userTitle,
        userRank: profile.rank ?? state.userRank
    })),
    markInsightsAsRead: () => set({ hasNewInsights: false }),

    fetchNavData: async () => {
        const { activeModule, journeyStage, intentScore } = get();
        try {
            const response = await fetch(`/api/nav/data?activeModule=${activeModule}&journeyStage=${journeyStage}&intentScore=${intentScore}`);
            const data = await response.json();
            set({ contextItems: data.contextItems, actionItems: data.actionItems });
        } catch (error) {
            console.error('Failed to fetch nav data', error);
        }
    },

    trackInteraction: async (itemId, action) => {
        try {
            await fetch('/api/nav/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId, action, userId: 'current-user' }) // Replace with real user ID
            });
        } catch (error) {
            console.error('Failed to track interaction', error);
        }
    },

    getVisibleContext: () => {
        const { contextItems } = get();
        return contextItems[0] || null;
    },

    getVisibleActions: () => {
        const { actionItems } = get();
        return actionItems.slice(0, 2);
    }
}));
