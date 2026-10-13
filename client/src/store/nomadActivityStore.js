import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const INITIAL_ACTIVITIES = [
    {
        id: 'act-0',
        type: 'visa_checkin',
        category: 'Visa Check-In',
        title: 'Portugal D8 Digital Nomad Visa Renewal Stamp Registered',
        location: 'AIMA Lisbon, Portugal',
        content: 'Completed official biometrics check-in and 2-year remote worker permit extension. Clean documentation approval with verified European remote income proof.',
        timestamp: 'Just now',
        createdAt: Date.now() - 5 * 60 * 1000,
        likes: 28,
        isLiked: true,
        repliesCount: 3,
        metrics: { visaType: 'D8 Digital Nomad', validity: '2 Years (2028)', taxStatus: 'NHR Approved' },
        tag: 'Official Visa Milestone',
        color: '#10b981',
        comments: [
            {
                id: 'cmt-0-1',
                author: 'Mateo Silva',
                handle: '@mateocodes',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
                text: 'Incredible news Elena! Did you have to bring apostilled bank statements translated to Portuguese this renewal round?',
                timestamp: '4m ago',
                likes: 3,
                isLiked: false
            },
            {
                id: 'cmt-0-2',
                author: 'Chloe Chen',
                handle: '@chloedesign',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
                text: 'Huge congratulations on the 2-year stamp! Lisbon nomad community is celebrating with you 🎉',
                timestamp: '2m ago',
                likes: 5,
                isLiked: true
            }
        ]
    },
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
        repliesCount: 2,
        metrics: { wifi: '68 Mbps', vibe: 'Focused' },
        tag: 'Live Base Check-In',
        color: '#06b6d4',
        comments: [
            {
                id: 'cmt-1-1',
                author: 'Liam Vance',
                handle: '@liamtravels',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
                text: 'Copenhagen Coffee Lab has the best pour-over in Cais do Sodré. Working on deck until 5 PM!',
                timestamp: '8m ago',
                likes: 2,
                isLiked: false
            }
        ]
    },
    {
        id: 'act-2',
        type: 'community',
        category: 'Community Interaction',
        title: 'Hosted Nomad Sunset Architecture Roundtable: Miradouro de Santa Catarina',
        location: 'Bairro Alto, Lisbon',
        content: 'Connected with 14 international remote engineers, designers, and founders over craft brews. Discussed asynchronous client workflows and upcoming travel to South East Asia.',
        timestamp: '45 minutes ago',
        createdAt: Date.now() - 45 * 60 * 1000,
        likes: 38,
        isLiked: true,
        repliesCount: 3,
        metrics: { attendees: '14 Nomads', topic: 'Async Remote Work' },
        tag: 'Community Meetup',
        color: '#8b5cf6',
        comments: [
            {
                id: 'cmt-2-1',
                author: 'Sofia Reyes',
                handle: '@sofiatravels',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
                text: 'The sunset view was unmatched. So great syncing about South East Asia visa corridors for Q4!',
                timestamp: '30m ago',
                likes: 4,
                isLiked: true
            },
            {
                id: 'cmt-2-2',
                author: 'Kenji Tanaka',
                handle: '@kenjiremote',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
                text: 'Count me in for the next architecture meetup. The notes on async PR reviews were gold.',
                timestamp: '18m ago',
                likes: 1,
                isLiked: false
            }
        ]
    },
    {
        id: 'act-3',
        type: 'forum_reply',
        category: 'Community Interaction',
        title: 'Replied in: "Best Coworking & Quiet Cafes in South Delhi?"',
        thread: 'Delhi Digital Nomad Corridor: High-Speed Wifi & Workspaces',
        content: 'Shared full field report: Blue Tokai Hauz Khas and Aerocity tech hubs both have rock-solid 95+ Mbps fiber with uninterrupted power backup. Hauz Khas lakeside walk is ideal for post-standup breaks.',
        timestamp: '1 hour ago',
        createdAt: Date.now() - 60 * 60 * 1000,
        likes: 34,
        isLiked: true,
        repliesCount: 2,
        metrics: { upvotes: 34, helpful: '100%' },
        tag: 'Top Contributor Answer',
        color: '#38bdf8',
        comments: [
            {
                id: 'cmt-3-1',
                author: 'Aarav Patel',
                handle: '@aaravnomad',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
                text: 'Verified Blue Tokai HKV yesterday. Power backup saved my Zoom pitch during thunderstorm! ⚡',
                timestamp: '40m ago',
                likes: 6,
                isLiked: true
            }
        ]
    },
    {
        id: 'act-4',
        type: 'contribution',
        category: 'Nomad Contribution',
        title: 'Submitted Certified Wifi Speed Test Audit',
        location: 'Alfama Creative Studio, Lisbon',
        content: 'Uploaded verified speed test telemetry (92 Mbps Down / 48 Mbps Up, 11ms latency). Certified fiber infrastructure for nomad remote worker database.',
        timestamp: '3 hours ago',
        createdAt: Date.now() - 3 * 3600 * 1000,
        likes: 15,
        isLiked: false,
        repliesCount: 1,
        metrics: { verifiedBy: 'Nomad Speed Test Bot', wifi: '92 Mbps' },
        tag: 'Telemetry Contribution',
        color: '#f59e0b',
        comments: [
            {
                id: 'cmt-4-1',
                author: 'Dave Miller',
                handle: '@dave_nomad',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
                text: 'Adding Alfama Creative Studio to my list for next week. That upload speed is solid for video rendering.',
                timestamp: '2h ago',
                likes: 2,
                isLiked: false
            }
        ]
    },
    {
        id: 'act-5',
        type: 'visa_checkin',
        category: 'Visa Check-In',
        title: 'India e-Tourist / Business Visa Arrival Entry Verification',
        location: 'Indira Gandhi International Airport (DEL), New Delhi',
        content: 'Biometrics cleared in under 8 minutes at Terminal 3 E-Visa gates. 1-year multiple entry validity logged into SeeNomad digital passport ledger.',
        timestamp: '18 hours ago',
        createdAt: Date.now() - 18 * 3600 * 1000,
        likes: 47,
        isLiked: false,
        repliesCount: 2,
        metrics: { visaType: 'e-Visa 365 Days', borderEntry: 'DEL T3 International' },
        tag: 'Border Check-In',
        color: '#10b981',
        comments: [
            {
                id: 'cmt-5-1',
                author: 'Maya Lin',
                handle: '@mayavoyage',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
                text: 'Terminal 3 e-visa counters have gotten so much faster this year! Welcome to India 🇮🇳',
                timestamp: '16h ago',
                likes: 3,
                isLiked: false
            }
        ]
    },
    {
        id: 'act-6',
        type: 'contribution',
        category: 'Nomad Contribution',
        title: 'Contributed 3 New Coworking Verified Hubs to Global Directory',
        location: 'Lisbon, Portugal',
        content: 'Added detailed seating noise ratings, coffee options, and ergonomic chair reviews for LACS Conde d’Óbidos and Second Home Mercado da Ribeira.',
        timestamp: '1 day ago',
        createdAt: Date.now() - 24 * 3600 * 1000,
        likes: 22,
        isLiked: true,
        repliesCount: 1,
        metrics: { hubsAdded: 3, xp: '+45 XP' },
        tag: 'Directory Contribution',
        color: '#f59e0b',
        comments: []
    },
    {
        id: 'act-7',
        type: 'check_in',
        category: 'Trip Check-In',
        title: 'Cycling Sunrise Loop: Cascais to Guincho Beach',
        location: 'Cascais Coastline, Portugal',
        content: 'Early 24km coastal route before standup calls. Atlantic ocean mist, fresh ocean breeze, and smooth bike trail.',
        timestamp: '2 days ago',
        createdAt: Date.now() - 48 * 3600 * 1000,
        likes: 41,
        isLiked: true,
        repliesCount: 3,
        metrics: { distance: '24.2 km', elevation: '190 m' },
        tag: 'Outdoor Check-In',
        color: '#06b6d4',
        comments: []
    }
];

export const useNomadActivityStore = create(
    persist(
        (set, get) => ({
            activities: INITIAL_ACTIVITIES,
            filter: 'all', // 'all' | 'contribution' | 'visa_checkin' | 'community' | 'check_in'
            onlineNomadsCount: 142,

            setFilter: (filter) => set({ filter }),

            // Add new real-time activity item
            addActivity: (activityData) => {
                const getCategory = (type) => {
                    switch (type) {
                        case 'visa_checkin': return 'Visa Check-In';
                        case 'contribution': return 'Nomad Contribution';
                        case 'community':
                        case 'forum_reply': return 'Community Interaction';
                        case 'check_in': return 'Trip Check-In';
                        case 'profile_update': return 'Profile Milestone';
                        case 'cover_update': return 'Brand Aesthetic';
                        default: return 'Nomad Activity';
                    }
                };

                const getColor = (type) => {
                    switch (type) {
                        case 'visa_checkin': return '#10b981'; // Emerald
                        case 'contribution': return '#f59e0b'; // Amber
                        case 'community':
                        case 'forum_reply': return '#8b5cf6'; // Purple / Indigo
                        case 'check_in': return '#06b6d4'; // Cyan
                        default: return '#3b82f6'; // Blue
                    }
                };

                const newActivity = {
                    id: `act-${Date.now()}`,
                    type: activityData.type || 'check_in',
                    category: activityData.category || getCategory(activityData.type),
                    title: activityData.title || 'Nomad Update',
                    location: activityData.location || 'Current Base',
                    thread: activityData.thread || null,
                    content: activityData.content || '',
                    timestamp: 'Just now',
                    createdAt: Date.now(),
                    likes: 0,
                    isLiked: false,
                    repliesCount: 0,
                    comments: [],
                    metrics: activityData.metrics || {},
                    tag: activityData.tag || 'Live Community Broadcast',
                    color: activityData.color || getColor(activityData.type)
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

            // Add comment to activity (interactive community updates)
            addCommentToActivity: (activityId, commentData) => {
                const text = typeof commentData === 'string' ? commentData : commentData?.text || '';
                const author = typeof commentData === 'object' && commentData.author ? commentData.author : 'Elena Rostova';
                const handle = typeof commentData === 'object' && commentData.handle ? commentData.handle : '@elenanomad';
                const avatar = typeof commentData === 'object' && commentData.avatar 
                    ? commentData.avatar 
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

                const newComment = {
                    id: `cmt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                    author,
                    handle,
                    avatar,
                    text: text.trim(),
                    timestamp: 'Just now',
                    createdAt: Date.now(),
                    likes: 0,
                    isLiked: false
                };

                set((state) => ({
                    activities: state.activities.map((act) => {
                        if (act.id !== activityId) return act;
                        const existingComments = Array.isArray(act.comments) ? act.comments : [];
                        return {
                            ...act,
                            comments: [newComment, ...existingComments],
                            repliesCount: (act.repliesCount || 0) + 1
                        };
                    })
                }));

                return newComment;
            },

            // Toggle like on an individual comment
            toggleLikeComment: (activityId, commentId) => {
                set((state) => ({
                    activities: state.activities.map((act) => {
                        if (act.id !== activityId) return act;
                        const comments = (act.comments || []).map((c) => {
                            if (c.id !== commentId) return c;
                            const isLiked = !c.isLiked;
                            return {
                                ...c,
                                isLiked,
                                likes: isLiked ? (c.likes || 0) + 1 : Math.max(0, (c.likes || 0) - 1)
                            };
                        });
                        return { ...act, comments };
                    })
                }));
            },

            // Legacy reply counter bump
            addReplyToActivity: (id) => {
                set((state) => ({
                    activities: state.activities.map((act) => {
                        if (act.id !== id) return act;
                        return {
                            ...act,
                            repliesCount: (act.repliesCount || 0) + 1
                        };
                    })
                }));
            }
        }),
        {
            name: 'seenomad_user_activity_feed_v2'
        }
    )
);
