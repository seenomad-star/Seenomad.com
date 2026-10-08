import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './toastStore';

const INITIAL_VIBE_COLLECTIONS = [
    { id: 'all', label: 'All Saved Vibes', emoji: '✨', isSystem: true },
    { id: 'Must Visit', label: 'Must Visit', emoji: '🗺️' },
    { id: 'Coastal & Surf', label: 'Coastal & Surf', emoji: '🌊' },
    { id: 'Deep Work Cafes', label: 'Deep Work Cafes', emoji: '☕' },
    { id: 'Nightlife & Food', label: 'Nightlife & Food', emoji: '🍜' }
];

const INITIAL_SAVED_VIBES = [
    {
        id: 'vibe-1',
        title: 'Uluwatu Cliffside Sunset & Lo-Fi Wave Pulse',
        creator: '@ElenaRostova',
        creatorName: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        location: 'Uluwatu, Bali · Indonesia',
        locationTags: ['Uluwatu, Bali · Indonesia', 'Single Fin Cliffside'],
        coordinates: '8.8291° S, 115.0849° E',
        mood: 'coastal',
        moodLabel: 'Coastal & Surf',
        soundscape: 'Indian Ocean Swell + Vinyl Chillhop (432 Hz)',
        temp: '28°C · Warm Breeze',
        wifiSpeed: '295 Mbps Starlink',
        dailyBudget: '$48 / day',
        vibeScore: 98,
        likes: 1420,
        saves: 641,
        clones: 312,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85',
        story: 'Working from Single Fin terrace right as the tide drops. Fiber is rock solid and the sunset horizon turns electric violet at 6:14 PM.',
        copyrightTag: '© Original Clip · Rights Verified',
        folder: 'Coastal & Surf',
        personalNote: 'Check out Single Fin terrace around 4:30 PM for golden hour sprint.',
        savedAt: '2026-10-06T18:20:00Z'
    },
    {
        id: 'vibe-2',
        title: 'Kyoto Bamboo Rain & Matcha Ceremonial Focus',
        creator: '@KenjiTakahashi',
        creatorName: 'Kenji Takahashi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        location: 'Arashiyama, Kyoto · Japan',
        locationTags: ['Arashiyama, Kyoto · Japan', 'Kurasu Kyoto Stand'],
        coordinates: '35.0094° N, 135.6670° E',
        mood: 'nature',
        moodLabel: 'Nature',
        soundscape: 'Soft Cedar Rain + Koto Ambient Resonance',
        temp: '19°C · Crisp Mist',
        wifiSpeed: '610 Mbps Optical Fiber',
        dailyBudget: '$65 / day',
        vibeScore: 99,
        likes: 2190,
        saves: 981,
        clones: 520,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=85',
        story: '6:00 AM walk through the cedar grove before a 4-hour coding block in a 120-year-old machiya townhouse.',
        copyrightTag: 'CC BY 4.0 · Remixable',
        folder: 'Deep Work Cafes',
        personalNote: 'Book the machiya coworking pass 3 days ahead.',
        savedAt: '2026-10-05T09:15:00Z'
    },
    {
        id: 'vibe-4',
        title: 'Seoul Night Market Sizzle & Neon Alley Walk',
        creator: '@MinjiPark',
        creatorName: 'Minji Park',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        location: 'Euljiro & Gwangjang, Seoul · South Korea',
        locationTags: ['Gwangjang Market, Seoul', 'Euljiro 3-ga'],
        coordinates: '37.5700° N, 126.9996° E',
        mood: 'food',
        moodLabel: 'Food',
        soundscape: 'Iron Griddle Sizzle + Midnight Synthwave',
        temp: '16°C · Crisp Night',
        wifiSpeed: '940 Mbps 5G+ Fiber',
        dailyBudget: '$58 / day',
        vibeScore: 97,
        likes: 2640,
        saves: 1121,
        clones: 604,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-street-food-market-in-seoul-42993-large.mp4',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=85',
        story: 'Hand-cut knife noodles and crispy mung-bean pancakes right after wrapping a midnight product launch.',
        copyrightTag: '© Original Clip · Rights Verified',
        folder: 'Nightlife & Food',
        personalNote: 'Stall #42 for mung-bean pancakes after 9 PM.',
        savedAt: '2026-10-04T21:40:00Z'
    }
];

export const useSavedVibesStore = create(
    persist(
        (set, get) => ({
            savedVibes: INITIAL_SAVED_VIBES,
            vibeFolders: INITIAL_VIBE_COLLECTIONS,

            isVibeSaved: (vibeId) => {
                if (!vibeId) return false;
                return get().savedVibes.some((v) => String(v.id) === String(vibeId));
            },

            toggleSaveVibe: (vibe, targetFolder = 'Must Visit') => {
                if (!vibe || !vibe.id) return false;
                const { savedVibes } = get();
                const exists = savedVibes.some((v) => String(v.id) === String(vibe.id));
                const toast = useToastStore.getState().addToast;

                if (exists) {
                    const updated = savedVibes.filter((v) => String(v.id) !== String(vibe.id));
                    set({ savedVibes: updated });
                    toast(`Removed "${vibe.title}" from Saved Vibes`, 'info');
                    return false;
                } else {
                    const defaultFolder =
                        vibe.mood === 'coastal'
                            ? 'Coastal & Surf'
                            : vibe.mood === 'deep-work'
                            ? 'Deep Work Cafes'
                            : vibe.mood === 'food'
                            ? 'Nightlife & Food'
                            : targetFolder;

                    const newSavedVibe = {
                        ...vibe,
                        folder: vibe.folder || defaultFolder,
                        personalNote: vibe.personalNote || '',
                        savedAt: new Date().toISOString()
                    };
                    const updated = [newSavedVibe, ...savedVibes];
                    set({ savedVibes: updated });
                    toast(`Bookmarked "${vibe.title}" to Saved Vibes (${newSavedVibe.folder})! 🔖`, 'success');
                    return true;
                }
            },

            removeSavedVibe: (vibeId) => {
                const { savedVibes } = get();
                const target = savedVibes.find((v) => String(v.id) === String(vibeId));
                const updated = savedVibes.filter((v) => String(v.id) !== String(vibeId));
                set({ savedVibes: updated });
                if (target) {
                    useToastStore.getState().addToast(`Removed "${target.title}" from Saved Vibes`, 'info');
                }
            },

            moveVibeToFolder: (vibeId, folderName) => {
                const { savedVibes } = get();
                const updated = savedVibes.map((v) =>
                    String(v.id) === String(vibeId) ? { ...v, folder: folderName } : v
                );
                set({ savedVibes: updated });
                useToastStore.getState().addToast(`Moved clip to "${folderName}" collection! 📁`, 'success');
            },

            updateVibeNote: (vibeId, note) => {
                const { savedVibes } = get();
                const updated = savedVibes.map((v) =>
                    String(v.id) === String(vibeId) ? { ...v, personalNote: note } : v
                );
                set({ savedVibes: updated });
                useToastStore.getState().addToast('Saved personal travel note on clip! 📝', 'success');
            },

            createVibeFolder: (folderName, emoji = '📁') => {
                const trimmed = (folderName || '').trim();
                if (!trimmed) return false;
                const { vibeFolders } = get();
                if (vibeFolders.some((f) => f.label.toLowerCase() === trimmed.toLowerCase())) {
                    useToastStore.getState().addToast(`Collection "${trimmed}" already exists`, 'info');
                    return false;
                }
                const newFolder = {
                    id: trimmed,
                    label: trimmed,
                    emoji,
                    isSystem: false
                };
                set({ vibeFolders: [...vibeFolders, newFolder] });
                useToastStore.getState().addToast(`Created "${trimmed}" Vibe collection! ✨`, 'success');
                return true;
            },

            deleteVibeFolder: (folderId) => {
                const { vibeFolders, savedVibes } = get();
                const target = vibeFolders.find((f) => f.id === folderId);
                if (!target || target.isSystem) return;
                const updatedFolders = vibeFolders.filter((f) => f.id !== folderId);
                const updatedVibes = savedVibes.map((v) =>
                    v.folder === folderId ? { ...v, folder: 'Must Visit' } : v
                );
                set({ vibeFolders: updatedFolders, savedVibes: updatedVibes });
                useToastStore.getState().addToast(`Removed "${target.label}" collection`, 'info');
            }
        }),
        {
            name: 'seenomad_saved_vibes_vault'
        }
    )
);
