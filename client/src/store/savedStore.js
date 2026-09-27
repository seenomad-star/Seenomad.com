import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './toastStore';

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
        tags: ['Luxury', 'Overwater Villas', 'Lagoon']
    }
];

export const useSavedStore = create(
    persist(
        (set, get) => ({
            savedDestinations: INITIAL_SAVED,

            isSaved: (id) => {
                return get().savedDestinations.some(
                    item => String(item.id) === String(id) || item.name?.toLowerCase() === String(id).toLowerCase()
                );
            },

            toggleSave: (dest) => {
                if (!dest) return false;
                const { savedDestinations } = get();
                const exists = savedDestinations.some(
                    item => String(item.id) === String(dest.id) || (dest.name && item.name?.toLowerCase() === dest.name?.toLowerCase())
                );

                const toast = useToastStore.getState().addToast;

                if (exists) {
                    set({
                        savedDestinations: savedDestinations.filter(
                            item => String(item.id) !== String(dest.id) && item.name?.toLowerCase() !== dest.name?.toLowerCase()
                        )
                    });
                    toast(`Removed "${dest.name || 'Destination'}" from Saved`, 'info');
                    return false;
                } else {
                    const newItem = {
                        id: dest.id || Date.now(),
                        name: dest.name || 'Unknown City',
                        location: dest.location || dest.country || 'Global',
                        category: dest.category || 'Destination',
                        image: dest.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
                        price: dest.price || '$1,200/mo',
                        rating: dest.rating || 4.8,
                        liveViewers: dest.liveViewers || '500+',
                        xp: dest.xp || '+500 XP',
                        visaFriendly: dest.visaFriendly ?? true,
                        wifi: dest.wifi || '75 Mbps',
                        tags: dest.tags || [dest.category || 'Travel', 'Explore'],
                        savedAt: new Date().toISOString()
                    };
                    set({
                        savedDestinations: [newItem, ...savedDestinations]
                    });
                    toast(`Saved "${newItem.name}" to your Bookmarks! 🔖`, 'success');
                    return true;
                }
            },

            removeSaved: (id) => {
                const { savedDestinations } = get();
                const itemToRemove = savedDestinations.find(
                    item => String(item.id) === String(id) || item.name?.toLowerCase() === String(id).toLowerCase()
                );
                set({
                    savedDestinations: savedDestinations.filter(
                        item => String(item.id) !== String(id) && item.name?.toLowerCase() !== String(id).toLowerCase()
                    )
                });
                if (itemToRemove) {
                    useToastStore.getState().addToast(`Removed "${itemToRemove.name}" from Saved`, 'info');
                }
            },

            addSaved: (dest) => {
                const { savedDestinations, isSaved } = get();
                if (isSaved(dest.id)) return;
                set({
                    savedDestinations: [dest, ...savedDestinations]
                });
                useToastStore.getState().addToast(`Added "${dest.name}" to Saved!`, 'success');
            },

            clearAll: () => {
                set({ savedDestinations: [] });
                useToastStore.getState().addToast('Cleared all saved destinations', 'info');
            }
        }),
        {
            name: 'seenomad_saved_destinations'
        }
    )
);
