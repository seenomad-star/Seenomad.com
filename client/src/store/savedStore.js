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

export const useSavedStore = create(
    persist(
        (set, get) => ({
            savedDestinations: INITIAL_SAVED,
            collectionName: 'My Favorites',

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
