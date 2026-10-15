/**
 * itineraryStore.js
 * Zustand store for SeeNomad Trip Itinerary Builder.
 * Persists in localStorage under 'seenomad_trip_itinerary'.
 * Defaults to Uttar Pradesh Sacred Ganga & Spiritual Triad travel plan.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UTTAR_PRADESH_ITINERARY_PRESETS } from '../data/uttarPradeshItineraries';

const DEFAULT_PRESET = UTTAR_PRADESH_ITINERARY_PRESETS[0];

export const useItineraryStore = create(
    persist(
        (set, get) => ({
            activePresetId: DEFAULT_PRESET.id,
            tripTitle: DEFAULT_PRESET.name,
            startDate: DEFAULT_PRESET.startDate || new Date().toISOString().split('T')[0],
            travelers: DEFAULT_PRESET.travelers || 2,
            pace: DEFAULT_PRESET.pace || 'Balanced',
            targetBudget: DEFAULT_PRESET.budget || 480,
            targetBudgetInr: DEFAULT_PRESET.budgetInr || 39500,
            currency: 'USD', // 'USD' | 'INR'
            selectedDayIndex: 0,
            days: JSON.parse(JSON.stringify(DEFAULT_PRESET.days)),

            setCurrency: (currency) => set({ currency }),

            setSelectedDayIndex: (selectedDayIndex) => set({ selectedDayIndex }),

            setTripMetadata: (metadata) =>
                set((state) => ({
                    ...state,
                    ...metadata
                })),

            // Select a destination from Uttar Pradesh and add to target day (or active day)
            addDestinationToDay: (destination, targetDayIndex = null, preferredTime = null, customNote = '') => {
                const state = get();
                let dayIdx = targetDayIndex !== null ? targetDayIndex : state.selectedDayIndex;

                let currentDays = [...state.days];
                if (currentDays.length === 0) {
                    currentDays = [
                        {
                            id: `day-${Date.now()}`,
                            dayNumber: 1,
                            city: destination.district ? `${destination.district} District` : 'Uttar Pradesh',
                            district: destination.district || 'Varanasi',
                            flag: '🇮🇳',
                            transitMode: 'Local Transit / Expressway',
                            weather: '23°C · Pleasant',
                            stops: []
                        }
                    ];
                    dayIdx = 0;
                } else if (dayIdx >= currentDays.length) {
                    dayIdx = currentDays.length - 1;
                }

                const targetDay = currentDays[dayIdx];
                const stopCount = targetDay.stops.length;

                // Smart time slot allocation based on current stop count
                const defaultTimes = [
                    '08:30 - 11:00',
                    '11:30 - 14:00',
                    '14:30 - 17:00',
                    '17:30 - 19:30',
                    '20:00 - 21:30'
                ];
                const time = preferredTime || defaultTimes[Math.min(stopCount, defaultTimes.length - 1)];

                // Extract numerical cost
                const rawPrice = destination.price ? String(destination.price) : '15';
                const parsedCost = parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) || 12;

                const newStop = {
                    id: `up-stop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    destinationId: destination.id,
                    time,
                    category: destination.category === 'Food & Dining' ? 'dining' : 'culture',
                    title: destination.name,
                    location: destination.location || `${destination.district || 'UP'} District, Uttar Pradesh`,
                    district: destination.district || 'Uttar Pradesh',
                    cost: parsedCost,
                    costInr: parsedCost * 83,
                    wifiMbps: 120,
                    booked: false,
                    image: destination.image,
                    note: customNote || destination.aiInsight || (destination.highlights && destination.highlights[0]) || 'Featured Uttar Pradesh Destination.',
                    odop: destination.odop,
                    localCuisine: destination.localCuisine,
                    highlights: destination.highlights,
                    upCircuit: destination.upCircuit
                };

                const updatedDays = currentDays.map((d, idx) =>
                    idx === dayIdx ? { ...d, stops: [...d.stops, newStop] } : d
                );

                set({
                    days: updatedDays,
                    selectedDayIndex: dayIdx
                });

                return { stop: newStop, dayNumber: targetDay.dayNumber };
            },

            // Add custom stop manually
            addStop: (dayIndex, stop) => {
                const state = get();
                const idx = dayIndex !== undefined ? dayIndex : state.selectedDayIndex;
                const newStop = {
                    id: `stop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    time: stop.time || '14:00 - 16:30',
                    category: stop.category || 'culture',
                    title: stop.title || 'Sightseeing & Exploration',
                    location: stop.location || 'Local District',
                    district: stop.district || 'Uttar Pradesh',
                    cost: Number(stop.cost) || 0,
                    costInr: (Number(stop.cost) || 0) * 83,
                    wifiMbps: Number(stop.wifiMbps) || 0,
                    booked: !!stop.booked,
                    image: stop.image || '',
                    note: stop.note || '',
                    odop: stop.odop || '',
                    localCuisine: stop.localCuisine || ''
                };

                set((state) => ({
                    days: state.days.map((d, i) =>
                        i === idx ? { ...d, stops: [...d.stops, newStop] } : d
                    )
                }));
            },

            // Update stop fields
            updateStop: (dayIndex, stopId, updates) => {
                set((state) => ({
                    days: state.days.map((d, i) =>
                        i === dayIndex
                            ? {
                                  ...d,
                                  stops: d.stops.map((s) => (s.id === stopId ? { ...s, ...updates } : s))
                              }
                            : d
                    )
                }));
            },

            // Remove stop
            removeStop: (dayIndex, stopId) => {
                set((state) => ({
                    days: state.days.map((d, i) =>
                        i === dayIndex ? { ...d, stops: d.stops.filter((s) => s.id !== stopId) } : d
                    )
                }));
            },

            // Move stop order within a day
            moveStop: (dayIndex, stopIndex, direction) => {
                set((state) => {
                    const targetIndex = direction === 'up' ? stopIndex - 1 : stopIndex + 1;
                    const day = state.days[dayIndex];
                    if (!day || targetIndex < 0 || targetIndex >= day.stops.length) return state;

                    const copy = [...day.stops];
                    const [moved] = copy.splice(stopIndex, 1);
                    copy.splice(targetIndex, 0, moved);

                    return {
                        days: state.days.map((d, i) => (i === dayIndex ? { ...d, stops: copy } : d))
                    };
                });
            },

            // Move stop from one day to another
            moveStopToDay: (fromDayIndex, stopId, toDayIndex) => {
                set((state) => {
                    if (fromDayIndex === toDayIndex) return state;
                    const sourceDay = state.days[fromDayIndex];
                    const targetDay = state.days[toDayIndex];
                    if (!sourceDay || !targetDay) return state;

                    const stopToMove = sourceDay.stops.find((s) => s.id === stopId);
                    if (!stopToMove) return state;

                    return {
                        days: state.days.map((d, i) => {
                            if (i === fromDayIndex) {
                                return { ...d, stops: d.stops.filter((s) => s.id !== stopId) };
                            }
                            if (i === toDayIndex) {
                                return { ...d, stops: [...d.stops, stopToMove] };
                            }
                            return d;
                        })
                    };
                });
            },

            // Toggle stop booked status
            toggleStopBooked: (dayIndex, stopId) => {
                set((state) => ({
                    days: state.days.map((d, i) =>
                        i === dayIndex
                            ? {
                                  ...d,
                                  stops: d.stops.map((s) => (s.id === stopId ? { ...s, booked: !s.booked } : s))
                              }
                            : d
                    )
                }));
            },

            // Add day
            addDay: (city = 'Varanasi', district = 'Varanasi') => {
                set((state) => {
                    const nextNum = state.days.length + 1;
                    const newDay = {
                        id: `day-${Date.now()}`,
                        dayNumber: nextNum,
                        city: city || 'Uttar Pradesh',
                        district: district || 'Uttar Pradesh',
                        flag: '🇮🇳',
                        transitMode: 'Intercity Rail / Vande Bharat / Cab',
                        weather: '23°C · Sunny',
                        stops: []
                    };
                    return {
                        days: [...state.days, newDay],
                        selectedDayIndex: state.days.length
                    };
                });
            },

            // Remove day
            removeDay: (dayIndex) => {
                set((state) => {
                    if (state.days.length <= 1) return state;
                    const filtered = state.days.filter((_, i) => i !== dayIndex);
                    const renumbered = filtered.map((d, i) => ({ ...d, dayNumber: i + 1 }));
                    return {
                        days: renumbered,
                        selectedDayIndex: Math.min(state.selectedDayIndex, renumbered.length - 1)
                    };
                });
            },

            // Update day metadata
            updateDay: (dayIndex, updates) => {
                set((state) => ({
                    days: state.days.map((d, i) => (i === dayIndex ? { ...d, ...updates } : d))
                }));
            },

            // Load one of the curated presets
            loadPreset: (preset) => {
                set({
                    activePresetId: preset.id,
                    tripTitle: preset.name,
                    startDate: preset.startDate || new Date().toISOString().split('T')[0],
                    travelers: preset.travelers || 2,
                    pace: preset.pace || 'Spiritual Immersion',
                    targetBudget: preset.budget || 480,
                    targetBudgetInr: preset.budgetInr || 39500,
                    selectedDayIndex: 0,
                    days: JSON.parse(JSON.stringify(preset.days))
                });
            },

            // Reset to default UP preset
            resetToUPDefault: () => {
                set({
                    activePresetId: DEFAULT_PRESET.id,
                    tripTitle: DEFAULT_PRESET.name,
                    startDate: DEFAULT_PRESET.startDate || new Date().toISOString().split('T')[0],
                    travelers: DEFAULT_PRESET.travelers || 2,
                    pace: DEFAULT_PRESET.pace || 'Spiritual Immersion',
                    targetBudget: DEFAULT_PRESET.budget || 480,
                    targetBudgetInr: DEFAULT_PRESET.budgetInr || 39500,
                    selectedDayIndex: 0,
                    days: JSON.parse(JSON.stringify(DEFAULT_PRESET.days))
                });
            },

            // AI Sequence Optimizer: sequences daily activities chronologically
            optimizeWithAI: () => {
                const timeSlots = [
                    '06:00 - 08:30 (Morning Aarti / Sunrise)',
                    '09:30 - 12:30 (Temple / Monument Darshan)',
                    '13:00 - 14:30 (Local Cuisine Lunch)',
                    '15:00 - 17:30 (Heritage Walk & ODOP Crafts)',
                    '18:00 - 20:30 (Evening Aarti / Sunset Riverboat)',
                    '21:00 - 22:30 (Night Market & Sweet Tasting)'
                ];

                set((state) => ({
                    days: state.days.map((d) => ({
                        ...d,
                        stops: d.stops.map((s, idx) => ({
                            ...s,
                            time: timeSlots[idx] || s.time
                        }))
                    }))
                }));
            },

            // Clear active trip stops
            clearItinerary: () => {
                set({
                    days: [
                        {
                            id: `day-${Date.now()}`,
                            dayNumber: 1,
                            city: 'Varanasi',
                            district: 'Varanasi',
                            flag: '🕉️',
                            transitMode: 'Local Transit',
                            weather: '23°C · Crisp',
                            stops: []
                        }
                    ],
                    selectedDayIndex: 0
                });
            }
        }),
        {
            name: 'seenomad_trip_itinerary'
        }
    )
);

export default useItineraryStore;
