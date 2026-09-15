import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNomadOSStore = create(
    persist(
        (set, get) => ({
            // --- User Progression (Dopamine Architecture) ---
            xp: 0,
            level: 1,
            rank: 'Novice Explorer',
            xpToNextLevel: 100,
            dailyXP: 0,
            dailyStreak: 0,
            lastCheckInDate: null,
            collaborationProjects: [],
            following: [], // Array of handles/IDs
            mates: [], // Array of confirmed connections
            userSkills: {
                "Itinerary Planning": 12,
                "Local Spoken": 8,
                "Photography": 24
            },
            credits: 500, // Nomad Credits (NC)
            transactions: [],
            savedTours: [],
            sparks: [], // Handles of users already swiped
            matches: [], // Confirmed mutual interest
            travelDNA: ["Slow Traveler", "High-Stakes Founder"],
            lookingFor: "Collab",
            plannerPreferences: {
                excludeInconvenientAirports: true,
                noEarlyLateFlights: true,
                directOnly: true,
                transportTypes: ['plane', 'train', 'bus', 'ferry']
            },

            // --- AI Agent Ecosystem ---
            conversations: {}, // { agentId: [{ role, text, timestamp }] }
            agentAffinity: {
                aria: 0,
                vance: 0,
                bento: 0,
                sora: 0,
                safe: 0,
                atlas: 0,
                wanda: 0,
                remi: 0
            },

            // --- Destination Intelligence ---
            destinationInsights: {
                "bali": { wifi: "45 Mbps", cost: "$1,200/mo", safety: 85, hotspots: 124 },
                "lisbon": { wifi: "68 Mbps", cost: "$2,100/mo", safety: 92, hotspots: 86 },
                "medellin": { wifi: "32 Mbps", cost: "$1,400/mo", safety: 74, hotspots: 52 },
                "chiang-mai": { wifi: "55 Mbps", cost: "$950/mo", safety: 90, hotspots: 142 }
            },

            // --- Contextual Intelligence ---
            currentContext: null, // { type: 'route' | 'destination' | 'action', id, name, metadata }
            lastActions: [], // Tracking for "Next Best Action" logic

            // --- Monetization & Access ---
            isPremium: false,
            unlockedAbilities: [], // ['deep_visa_analysis', 'auto_budgeting']

            // --- Actions: Progression ---
            addXP: (amount) => set((state) => {
                let newXP = state.xp + amount;
                let newLevel = state.level;
                let newXPToNext = state.xpToNextLevel;

                // Level up logic (Scaling difficulty)
                while (newXP >= newXPToNext) {
                    newXP -= newXPToNext;
                    newLevel += 1;
                    newXPToNext = Math.floor(newXPToNext * 1.2);
                    // Trigger Level Up Event (could be a notification)
                    console.log(`Level Up! Reached Level ${newLevel}`);
                }

                return {
                    xp: newXP,
                    level: newLevel,
                    xpToNextLevel: newXPToNext
                };
            }),

            // --- Actions: AI & Context ---
            addMessage: (agentId, message) => set((state) => {
                const agentMsgs = state.conversations[agentId] || [];
                const updatedMsgs = [...agentMsgs, { ...message, timestamp: new Date().toISOString() }];

                // Limit history for performance/memory
                if (updatedMsgs.length > 50) updatedMsgs.shift();

                return {
                    conversations: {
                        ...state.conversations,
                        [agentId]: updatedMsgs
                    }
                };
            }),

            increaseAffinity: (agentId, amount = 1) => set((state) => ({
                agentAffinity: {
                    ...state.agentAffinity,
                    [agentId]: Math.min((state.agentAffinity[agentId] || 0) + amount, 100)
                }
            })),

            setContext: (context) => set((state) => ({
                currentContext: context,
                lastActions: [context, ...state.lastActions].slice(0, 10) // Keep last 10 contexts
            })),

            // --- Actions: Monetization ---
            togglePremium: () => set((state) => ({ isPremium: !state.isPremium })),

            unlockAbility: (abilityId) => set((state) => ({
                unlockedAbilities: [...new Set([...state.unlockedAbilities, abilityId])]
            })),

            checkIn: () => set((state) => {
                const today = new Date().toISOString().split('T')[0];
                const lastCheck = state.lastCheckInDate ? state.lastCheckInDate.split('T')[0] : null;

                if (today === lastCheck) return {}; // Already checked in today

                let newStreak = state.dailyStreak;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastCheck === yesterdayStr) {
                    newStreak += 1;
                } else {
                    newStreak = 1;
                }

                return {
                    dailyStreak: newStreak,
                    dailyXP: 0, // Reset daily XP for the new day
                    lastCheckInDate: new Date().toISOString()
                };
            }),

            addProject: (project) => set((state) => ({
                collaborationProjects: [
                    { ...project, id: Date.now(), createdAt: new Date().toISOString() },
                    ...state.collaborationProjects
                ]
            })),

            toggleFollow: (handle) => set((state) => ({
                following: state.following.includes(handle)
                    ? state.following.filter(h => h !== handle)
                    : [...state.following, handle]
            })),

            toggleMate: (handle) => set((state) => ({
                mates: state.mates.includes(handle)
                    ? state.mates.filter(h => h !== handle)
                    : [...state.mates, handle]
            })),

            endorseSkill: (skill) => set((state) => ({
                userSkills: {
                    ...state.userSkills,
                    [skill]: (state.userSkills[skill] || 0) + 1
                }
            })),

            spendCredits: (amount, reason) => set((state) => ({
                credits: state.credits - amount,
                transactions: [{
                    id: Date.now(),
                    amount: -amount,
                    reason,
                    timestamp: new Date().toISOString()
                }, ...state.transactions]
            })),

            addCredits: (amount, reason) => set((state) => ({
                credits: state.credits + amount,
                transactions: [{
                    id: Date.now(),
                    amount: amount,
                    reason,
                    timestamp: new Date().toISOString()
                }, ...state.transactions]
            })),

            saveTour: (tour) => set((state) => ({
                savedTours: [...state.savedTours, { ...tour, id: Date.now() }]
            })),

            updatePlannerPrefs: (prefs) => set((state) => ({
                plannerPreferences: { ...state.plannerPreferences, ...prefs }
            })),

            toggleSpark: (handle, liked) => set((state) => {
                const newSparks = [...state.sparks, handle];
                // Simulated mutual match logic for demo
                const newMatches = (liked && Math.random() > 0.4) ? [...state.matches, handle] : state.matches;
                return { 
                    sparks: newSparks, 
                    matches: newMatches 
                };
            }),

            setTravelDNA: (tags) => set({ travelDNA: tags }),
            setLookingFor: (goal) => set({ lookingFor: goal }),

            setVibe: (vibe) => set({ currentVibe: vibe }),

            saveToVault: (extraction) => set((state) => ({
                bugVault: [{ ...extraction, id: Date.now() }, ...state.bugVault]
            })),

            trackViralSpot: (name) => set((state) => {
                const existing = state.viralSpots.find(s => s.name === name);
                if (existing) {
                    return {
                        viralSpots: state.viralSpots.map(s => 
                            s.name === name ? { ...s, bugs: s.bugs + 1 } : s
                        )
                    };
                }
                return {
                    viralSpots: [{ id: Date.now(), name, bugs: 1 }, ...state.viralSpots]
                };
            })
        }),
        {
            name: 'nomad-os-core-storage',
        }
    )
);
