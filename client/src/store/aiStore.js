import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAIStore = create(
    persist(
        (set, get) => ({
            conversations: {}, // { agentId: [{ role, text, timestamp }] }
            agentAffinity: {
                aria: 0,
                vance: 0,
                bento: 0,
                sora: 0,
                safe: 0
            },
            currentContext: null, // { type: 'destination', id: 'tokyo', name: 'Tokyo' }
            isPremium: false,

            addMessage: (agentId, message) => set((state) => {
                const agentMsgs = state.conversations[agentId] || [];
                return {
                    conversations: {
                        ...state.conversations,
                        [agentId]: [...agentMsgs, { ...message, timestamp: new Date().toISOString() }]
                    }
                };
            }),

            increaseAffinity: (agentId, amount = 1) => set((state) => ({
                agentAffinity: {
                    ...state.agentAffinity,
                    [agentId]: Math.min((state.agentAffinity[agentId] || 0) + amount, 100)
                }
            })),

            setContext: (context) => set({ currentContext: context }),

            clearHistory: (agentId) => set((state) => ({
                conversations: {
                    ...state.conversations,
                    [agentId]: []
                }
            })),

            togglePremium: () => set((state) => ({ isPremium: !state.isPremium }))
        }),
        {
            name: 'nomad-ai-storage',
        }
    )
);
