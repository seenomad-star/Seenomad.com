import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserProfileStore = create(
    persist(
        (set, get) => ({
            dna: {
                adventure: 10,
                culture: 10,
                budget: 10,
                social: 10,
                tech: 10
            },
            persona: 'The Budding Nomad',
            xp: 0,
            level: 1,
            streak: 0,
            lastActive: null,
            touchpoints: [], 
            rewards: [
                { id: 'welcome', title: 'Welcome Perk', type: 'credits', value: 50, claimed: false, icon: 'Zap' }
            ],

            logTouchpoint: (type, target) => {
                const now = new Date();
                const traitMapping = {
                    'Cultural Compass': 'culture',
                    'Triipper AI': 'adventure',
                    'Speed Test Map': 'tech',
                    'Mates': 'social',
                    'Budgeting': 'budget'
                };

                const trait = traitMapping[target];
                const currentDNA = get().dna;

                const newDNA = trait ? { ...currentDNA, [trait]: Math.min(100, currentDNA[trait] + 2) } : currentDNA;
                
                // Assign Persona based on DNA max trait
                let newPersona = get().persona;
                const maxTrait = Object.keys(newDNA).reduce((a, b) => newDNA[a] > newDNA[b] ? a : b);
                const personaMap = {
                    adventure: 'The High-Octane Explorer',
                    culture: 'The Cultural Historian',
                    budget: 'The Frugal Strategist',
                    social: 'The Community Architect',
                    tech: 'The Digital Sovereign'
                };
                if (newDNA[maxTrait] > 30) newPersona = personaMap[maxTrait];

                set({
                    touchpoints: [...get().touchpoints, { type, target, timestamp: now }],
                    dna: newDNA,
                    persona: newPersona,
                    xp: get().xp + 10
                });

                // Level up logic
                if (get().xp >= get().level * 100) {
                    set({ level: get().level + 1, xp: 0 });
                    get().addReward({
                        id: `lvl-${get().level}`,
                        title: `Level ${get().level} Master Gift`,
                        type: 'credits',
                        value: 100,
                        claimed: false,
                        icon: 'Award'
                    });
                }
            },

            addReward: (reward) => {
                set({ rewards: [reward, ...get().rewards] });
            },

            claimReward: (id) => {
                set({
                    rewards: get().rewards.map(r => 
                        r.id === id ? { ...r, claimed: true } : r
                    )
                });
            },

            updateStreak: () => {
                const now = new Date().toDateString();
                if (get().lastActive !== now) {
                    set({ 
                        streak: get().streak + 1,
                        lastActive: now 
                    });
                }
            }
        }),
        { name: 'nomad-user-dna' }
    )
);
