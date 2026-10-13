import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const INITIAL_ACTIVITIES = [
    {
        id: 'act-1',
        type: 'check_in',
        category: 'Trip Check-In',
        title: 'Checked in at Cowork Central, Lisbon',
        location: 'Lisbon, Portugal',
        content: 'Settled in for an afternoon deep-work sprint overlooking the Tagus river. Fiber tested at 68 Mbps with zero packet loss. Open for specialty espresso at Copenhagen Coffee Lab!',
        timestamp: '12 minutes ago',
        createdAt: Date.now() - 12 * 60 * 1000,
        likes: 19,
        isLiked: false,
        repliesCount: 4,
        metrics: { wifi: '68 Mbps', vibe: 'Focused' },
        tag: 'Live Base Check-In',
        color: '#10b981'
    },
    {
        id: 'act-2',
        type: 'forum_reply',
        category: 'Forum Discussion',
        title: 'Replied in: "Best Coworking & Quiet Cafes in South Delhi?"',
        thread: 'Delhi Digital Nomad Corridor: High-Speed Wifi & Workspaces',
        content: 'Shared full field report: Blue Tokai Hauz Khas and Aerocity tech hubs both have rock-solid 95+ Mbps fiber with uninterrupted power backup. Hauz Khas lakeside walk is ideal for post-standup breaks.',
        timestamp: '1 hour ago',
        createdAt: Date.now() - 60 * 60 * 1000,
        likes: 34,
        isLiked: true,
        repliesCount: 8,
        metrics: { upvotes: 34, helpful: '100%' },
        tag: 'Top Contributor Answer',
        color: '#38bdf8'
    },
    {
        id: 'act-3',
        type: 'contribution',
        category: 'Nomad Contribution',
        title: 'Submitted Certified Wifi Speed Test Audit',
        location: 'Alfama Creative Studio, Lisbon',
        content: 'Uploaded verified speed test telemetry (92 Mbps Down / 48 Mbps Up, 11ms latency). Certified fiber infrastructure for nomad remote worker database.',
        timestamp: '3 hours ago',
        createdAt: Date.now() - 3 * 3600 * 1000,
        likes: 15,
        isLiked: false,
        repliesCount: 2,
        metrics: { verifiedBy: 'Nomad Speed Test Bot' },
        tag: 'Telemetry Contribution',
        color: '#f59e0b'
    },
    {
        id: 'act-4',
        type: 'check_in',
        category: 'Trip Check-In',
        title: 'Dawn Heritage Exploration: Kartavya Path & India Gate',
        location: 'New Delhi, India',
        content: 'Completed sunrise cycling loop along Kartavya Path past India Gate and National Gallery before starting remote architecture sprint. Crisp morning air and majestic monuments.',
        timestamp: 'Yesterday at 07:15',
        createdAt: Date.now() - 24 * 3600 * 1000,
        likes: 42,
        isLiked: true,
        repliesCount: 11,
        metrics: { distance: '12 km', energy: 'High' },
        tag: 'Heritage Explorer',
        color: '#10b981'
    },
    {
        id: 'act-5',
        type: 'forum_reply',
        category: 'Forum Discussion',
        title: 'Replied in: "Portugal D8 Visa Tax Residency Renewal Guide"',
        thread: 'Legal & Visa Mobility / European Remote Hubs',
        content: 'Detailed step-by-step renewal process under the updated NHR framework. Highlighted essential cross-border proof documents and digital appointment booking timings.',
        timestamp: '2 days ago',
        createdAt: Date.now() - 48 * 3600 * 1000,
        likes: 58,
        isLiked: false,
        repliesCount: 16,
        metrics: { bookmarked: 24 },
        tag: 'Visa Expert Insight',
        color: '#38bdf8'
    },
    {
        id: 'act-6',
        type: 'contribution',
        category: 'Nomad Contribution',
        title: 'Updated Curated Guide: Agrasen ki Baoli Stepwell',
        location: 'Connaught Place, New Delhi',
        content: 'Added optimal low-sunlight photography hours, historic 14th-century stepwell architectural notes, and nearby quiet shaded cafes for offline reading.',
        timestamp: '3 days ago',
        createdAt: Date.now() - 72 * 3600 * 1000,
        likes: 27,
        isLiked: false,
        repliesCount: 5,
        metrics: { views: 320 },
        tag: 'Curated Guide Edit',
        color: '#a855f7'
    }
];

export const useNomadActivityStore = create(
    persist(
        (set, get) => ({
            activities: INITIAL_ACTIVITIES,
            filter: 'all', // 'all' | 'contribution' | 'forum_reply' | 'check_in'
            onlineNomadsCount: 142,

            setFilter: (filter) => set({ filter }),

            // Add new real-time activity item (e.g., from check-in modal or inline composer)
            addActivity: (activityData) => {
                const newActivity = {
                    id: `act-${Date.now()}`,
                    type: activityData.type || 'check_in',
                    category: 
                        activityData.type === 'forum_reply' ? 'Forum Discussion' :
                        activityData.type === 'contribution' ? 'Nomad Contribution' : 'Trip Check-In',
                    title: activityData.title || 'Nomad Update',
                    location: activityData.location || 'Current Base',
                    thread: activityData.thread || null,
                    content: activityData.content || '',
                    timestamp: 'Just now',
                    createdAt: Date.now(),
                    likes: 0,
                    isLiked: false,
                    repliesCount: 0,
                    metrics: activityData.metrics || {},
                    tag: activityData.tag || 'Live Community Broadcast',
                    color: 
                        activityData.type === 'forum_reply' ? '#38bdf8' :
                        activityData.type === 'contribution' ? '#f59e0b' : '#10b981'
                };

                set((state) => ({
                    activities: [newActivity, ...state.activities]
                }));

                return newActivity;
            },

            // Toggle like / upvote on activity
            toggleLike: (id) => {
                set((state) => ({
                    activities: state.activities.map((act) => {
                        if (act.id !== id) return act;
                        const isLiked = !act.isLiked;
                        return {
                            ...act,
                            isLiked,
                            likes: isLiked ? act.likes + 1 : Math.max(0, act.likes - 1)
                        };
                    })
                }));
            },

            // Add reply to activity
            addReplyToActivity: (id) => {
                set((state) => ({
                    activities: state.activities.map((act) => {
                        if (act.id !== id) return act;
                        return {
                            ...act,
                            repliesCount: act.repliesCount + 1
                        };
                    })
                }));
            }
        }),
        {
            name: 'seenomad_user_activity_feed'
        }
    )
);
