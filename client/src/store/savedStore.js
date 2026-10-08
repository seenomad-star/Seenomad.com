import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './toastStore';
import { getDestinationIntelligence } from '../utils/destinationIntelligenceUtils';

const PROFILE_FAVORITES_STORAGE_KEY = 'seenomad_user_profile_favorites';

const syncProfileFavoritesStorage = (favoritesList) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const payload = {
                profileId: 'local_nomad_profile',
                collectionName: 'My Favorites',
                updatedAt: new Date().toISOString(),
                count: favoritesList.length,
                items: favoritesList
            };
            window.localStorage.setItem(PROFILE_FAVORITES_STORAGE_KEY, JSON.stringify(payload));
        }
    } catch (err) {
        console.warn('Failed to sync favorites to local profile storage:', err);
    }
};

const INITIAL_SAVED = [
    {
        id: 105,
        name: 'Santorini',
        location: 'Greece',
        category: 'Beach',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600',
        price: '$1,500/mo',
        rating: 4.9,
        liveViewers: '3.2k',
        xp: '+1000 XP',
        visaFriendly: true,
        wifi: '85 Mbps',
        collection: 'My Favorites',
        tags: ['Island', 'Sunset Views', 'Nomad Hub']
    },
    {
        id: 103,
        name: 'Seychelles',
        location: 'East Africa',
        category: 'Beach',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?w=600',
        price: '$1,800/mo',
        rating: 4.8,
        liveViewers: '850',
        xp: '+600 XP',
        visaFriendly: true,
        wifi: '65 Mbps',
        collection: 'My Favorites',
        tags: ['Tropical', 'Diving', 'Visa-Free']
    },
    {
        id: 104,
        name: 'Maui',
        location: 'Hawaii, USA',
        category: 'Beach',
        image: 'https://images.unsplash.com/photo-1505844890821-260154e821ad?w=600',
        price: '$1,200/mo',
        rating: 4.8,
        liveViewers: '1.1k',
        xp: '+450 XP',
        visaFriendly: false,
        wifi: '110 Mbps',
        collection: 'My Favorites',
        tags: ['Surfing', 'Volcanoes', 'Nature']
    },
    {
        id: 101,
        name: 'Bora Bora',
        location: 'French Polynesia',
        category: 'Beach',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
        price: '$2,499/mo',
        rating: 4.9,
        liveViewers: '1.2k',
        xp: '+500 XP',
        visaFriendly: true,
        wifi: '45 Mbps',
        collection: 'My Favorites',
        tags: ['Luxury', 'Overwater Villas', 'Lagoon']
    }
];

const INITIAL_SAVED_VIBES = [
    {
        id: 'vibe-1',
        title: 'Uluwatu Cliffside Sunset & Lo-Fi Wave Pulse',
        creator: '@ElenaRostova',
        creatorName: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        location: 'Uluwatu, Bali · Indonesia',
        coordinates: '8.8291° S, 115.0849° E',
        mood: 'coastal',
        moodLabel: 'Coastal & Surf',
        soundscape: 'Indian Ocean Swell + Vinyl Chillhop (432 Hz)',
        temp: '28°C · Warm Breeze',
        wifiSpeed: '295 Mbps Starlink',
        dailyBudget: '$48 / day',
        vibeScore: 98,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85',
        story: 'Working from Single Fin terrace right as the tide drops. Fiber is rock solid and the sunset horizon turns electric violet at 6:14 PM.',
        copyrightTag: '© Original Clip · Rights Verified',
        folder: 'Beach & Surf',
        personalNote: 'Book table on the cliff terrace before 4:30 PM for sunset sprint.',
        savedAt: '2026-10-06T18:00:00Z'
    },
    {
        id: 'vibe-2',
        title: 'Kyoto Bamboo Rain & Matcha Ceremonial Focus',
        creator: '@KenjiTakahashi',
        creatorName: 'Kenji Takahashi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        location: 'Arashiyama, Kyoto · Japan',
        coordinates: '35.0094° N, 135.6670° E',
        mood: 'nature',
        moodLabel: 'Nature',
        soundscape: 'Soft Cedar Rain + Koto Ambient Resonance',
        temp: '19°C · Crisp Mist',
        wifiSpeed: '610 Mbps Optical Fiber',
        dailyBudget: '$65 / day',
        vibeScore: 99,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=85',
        story: '6:15 AM walk through the Arashiyama bamboo grove before a single tourist arrives, followed by a 4-hour deep work block.',
        copyrightTag: 'CC BY 4.0 · Remixable',
        folder: 'Deep Work Cafes',
        personalNote: 'Check out % Arabica Arashiyama right after the 6 AM bamboo walk.',
        savedAt: '2026-10-07T09:30:00Z'
    },
    {
        id: 'vibe-5',
        title: 'Seoul Midnight Street Food Sizzle & Neon Alley',
        creator: '@MinjiKim',
        creatorName: 'Minji Kim',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        location: 'Gwangjang Market, Seoul · South Korea',
        coordinates: '37.5700° N, 126.9996° E',
        mood: 'food',
        moodLabel: 'Food',
        soundscape: 'Iron Griddle Sizzle + Night Market Chatter',
        temp: '16°C · Crisp Night',
        wifiSpeed: '950 Mbps 5G+ Ultra',
        dailyBudget: '$58 / day',
        vibeScore: 98,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-street-food-market-in-seoul-42993-large.mp4',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=85',
        story: 'Hand-cut knife noodles and crispy mung-bean pancakes at Stall 32 after a late coding sprint in Euljiro.',
        copyrightTag: '© Original Clip · Rights Verified',
        folder: 'Night Markets & Food',
        personalNote: 'Stall 32 for bindaetteok after 9 PM.',
        savedAt: '2026-10-07T14:15:00Z'
    }
];

const INITIAL_VIBE_FOLDERS = [
    'All Clips',
    'Bucket List Trips',
    'Beach & Surf',
    'Deep Work Cafes',
    'Night Markets & Food'
];

export const useSavedStore = create(
    persist(
        (set, get) => ({
            savedDestinations: INITIAL_SAVED,
            savedVibes: INITIAL_SAVED_VIBES,
            vibeFolders: INITIAL_VIBE_FOLDERS,
            collectionName: 'My Favorites',

            isVibeSaved: (vibeId) => {
                if (!vibeId) return false;
                return (get().savedVibes || []).some((v) => String(v.id) === String(vibeId));
            },

            toggleSaveVibe: (vibe, targetFolder = 'Bucket List Trips') => {
                if (!vibe) return false;
                const current = get().savedVibes || [];
                const exists = current.some((v) => String(v.id) === String(vibe.id));
                const toast = useToastStore.getState().addToast;

                if (exists) {
                    const updated = current.filter((v) => String(v.id) !== String(vibe.id));
                    set({ savedVibes: updated });
                    toast(`Removed "${vibe.title}" from Saved Vibes`, 'info');
                    return false;
                } else {
                    const newSavedVibe = {
                        ...vibe,
                        folder: vibe.folder || targetFolder,
                        personalNote: vibe.personalNote || '',
                        savedAt: new Date().toISOString()
                    };
                    set({ savedVibes: [newSavedVibe, ...current] });
                    toast(`Bookmarked "${vibe.title}" to Saved Vibes in your Profile! ✨`, 'success');
                    return true;
                }
            },

            removeSavedVibe: (vibeId) => {
                const current = get().savedVibes || [];
                const target = current.find((v) => String(v.id) === String(vibeId));
                set({ savedVibes: current.filter((v) => String(v.id) !== String(vibeId)) });
                if (target) {
                    useToastStore.getState().addToast(`Removed "${target.title}" from Saved Vibes`, 'info');
                }
            },

            moveVibeToFolder: (vibeId, folderName) => {
                const current = get().savedVibes || [];
                set({
                    savedVibes: current.map((v) =>
                        String(v.id) === String(vibeId) ? { ...v, folder: folderName } : v
                    )
                });
                useToastStore.getState().addToast(`Moved clip to "${folderName}" folder 📁`, 'success');
            },

            updateVibePersonalNote: (vibeId, noteText) => {
                const current = get().savedVibes || [];
                set({
                    savedVibes: current.map((v) =>
                        String(v.id) === String(vibeId) ? { ...v, personalNote: noteText } : v
                    )
                });
                useToastStore.getState().addToast('Saved personal travel note on clip! 📝', 'success');
            },

            addVibeFolder: (folderName) => {
                const trimmed = (folderName || '').trim();
                if (!trimmed) return;
                const currentFolders = get().vibeFolders || INITIAL_VIBE_FOLDERS;
                if (!currentFolders.some((f) => f.toLowerCase() === trimmed.toLowerCase())) {
                    set({ vibeFolders: [...currentFolders, trimmed] });
                    useToastStore.getState().addToast(`Created Vibe folder: "${trimmed}" ✨`, 'success');
                }
            },

            isSaved: (idOrName) => {
                if (!idOrName) return false;
                return get().savedDestinations.some(
                    item =>
                        String(item.id) === String(idOrName) ||
                        item.name?.toLowerCase() === String(idOrName).toLowerCase()
                );
            },

            toggleSave: (dest) => {
                if (!dest) return false;
                const { savedDestinations } = get();
                const exists = savedDestinations.some(
                    item =>
                        String(item.id) === String(dest.id) ||
                        (dest.name && item.name?.toLowerCase() === dest.name?.toLowerCase())
                );

                const toast = useToastStore.getState().addToast;

                if (exists) {
                    const updated = savedDestinations.filter(
                        item =>
                            String(item.id) !== String(dest.id) &&
                            item.name?.toLowerCase() !== dest.name?.toLowerCase()
                    );
                    set({ savedDestinations: updated });
                    syncProfileFavoritesStorage(updated);
                    toast(`Removed "${dest.name || 'Destination'}" from My Favorites`, 'info');
                    return false;
                } else {
                    const intel = getDestinationIntelligence(dest);
                    const wifiSpeed = dest.wifi || (intel?.internet?.downloadMbps ? `${intel.internet.downloadMbps} Mbps` : '120 Mbps');
                    const costEst = dest.price || intel?.costs?.totalEstimated || '$1,350/mo';

                    const newItem = {
                        id: dest.id || Date.now(),
                        name: dest.name || 'Unknown City',
                        location: dest.location || dest.country || 'Global',
                        category: dest.category || 'Destination',
                        image: dest.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
                        price: costEst,
                        rating: dest.rating || 4.8,
                        liveViewers: dest.liveViewers || '500+',
                        xp: dest.xp || '+500 XP',
                        visaFriendly: dest.visaFriendly ?? true,
                        wifi: wifiSpeed,
                        collection: 'My Favorites',
                        tags: dest.tags || dest.highlights || [dest.category || 'Travel', 'Explore'],
                        savedAt: new Date().toISOString()
                    };
                    const updated = [newItem, ...savedDestinations];
                    set({ savedDestinations: updated });
                    syncProfileFavoritesStorage(updated);
                    toast(`Saved "${newItem.name}" to My Favorites in your local profile! 🔖`, 'success');
                    return true;
                }
            },

            removeSaved: (id) => {
                const { savedDestinations } = get();
                const itemToRemove = savedDestinations.find(
                    item => String(item.id) === String(id) || item.name?.toLowerCase() === String(id).toLowerCase()
                );
                const updated = savedDestinations.filter(
                    item => String(item.id) !== String(id) && item.name?.toLowerCase() !== String(id).toLowerCase()
                );
                set({ savedDestinations: updated });
                syncProfileFavoritesStorage(updated);
                if (itemToRemove) {
                    useToastStore.getState().addToast(`Removed "${itemToRemove.name}" from My Favorites`, 'info');
                }
            },

            addSaved: (dest) => {
                const { savedDestinations, isSaved, toggleSave } = get();
                if (isSaved(dest.id || dest.name)) return;
                toggleSave(dest);
            },

            clearAll: () => {
                set({ savedDestinations: [] });
                syncProfileFavoritesStorage([]);
                useToastStore.getState().addToast('Cleared all destinations from My Favorites', 'info');
            }
        }),
        {
            name: 'seenomad_saved_destinations',
            onRehydrateStorage: () => (state) => {
                if (state?.savedDestinations) {
                    syncProfileFavoritesStorage(state.savedDestinations);
                }
            }
        }
    )
);
