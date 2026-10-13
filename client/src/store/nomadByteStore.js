import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const INITIAL_BYTES = [
    {
        id: 'byte-1',
        author: {
            name: 'Elena Rostova',
            handle: '@elenanomad',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
            badge: 'Senior Fullstack Nomad',
            isVerified: true
        },
        content: 'Lisbon sunrise hits different when you just deployed to production before 9 AM ☀️💻 Pastel de nata count: 2. Fiber at Cowork Central holding rock-solid at 68 Mbps. Who is around for afternoon specialty espresso? #LisbonNomads #RemoteWork #DevLife',
        tags: ['#LisbonNomads', '#RemoteWork', '#DevLife'],
        location: 'Lisbon, Portugal 🇵🇹',
        timestamp: '5m ago',
        createdAt: Date.now() - 5 * 60 * 1000,
        likes: 34,
        isLiked: true,
        rebytes: 8,
        isRebyted: false,
        bookmarks: 12,
        isBookmarked: false,
        repliesCount: 4,
        replies: [
            {
                id: 'br-1',
                author: 'Liam Vance',
                handle: '@liamtravels',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
                text: 'See you at Copenhagen Coffee Lab at 3 PM! Need to debrief on the Schengen 90-day reset.',
                timestamp: '2m ago',
                likes: 2
            },
            {
                id: 'br-2',
                author: 'Chloe Chen',
                handle: '@chloedesign',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
                text: 'Deploying before 9 AM on a Tuesday is elite energy 🙌',
                timestamp: '1m ago',
                likes: 5
            }
        ],
        mediaUrl: null,
        client: 'SeeNomad Web'
    },
    {
        id: 'byte-2',
        author: {
            name: 'Liam Vance',
            handle: '@liamtravels',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            badge: 'Nomad Field Reporter',
            isVerified: true
        },
        content: '🚨 Bali Wifi Alert: If staying around Canggu during afternoon storms, ensure your hub has Starlink or backup generator. Dojo & Outpost stayed pinned at 170+ Mbps while local grid blinked. Saved our team standup! ⚡🌴 #BaliNomads #WifiAlert #DigitalNomad',
        tags: ['#BaliNomads', '#WifiAlert', '#DigitalNomad'],
        location: 'Canggu, Bali 🇮🇩',
        timestamp: '28m ago',
        createdAt: Date.now() - 28 * 60 * 1000,
        likes: 52,
        isLiked: false,
        rebytes: 19,
        isRebyted: true,
        bookmarks: 27,
        isBookmarked: true,
        repliesCount: 6,
        replies: [
            {
                id: 'br-3',
                author: 'Marcus Chen',
                handle: '@marcus_remote',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
                text: 'Can confirm! Working from Outpost right now, zero packet drops.',
                timestamp: '15m ago',
                likes: 3
            }
        ],
        mediaUrl: null,
        client: 'SeeNomad Mobile'
    },
    {
        id: 'byte-3',
        author: {
            name: 'Sofia Reyes',
            handle: '@sofiatravels',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
            badge: 'Global Visa Strategist',
            isVerified: true
        },
        content: '🛂 Official update for remote workers: Greece just launched the digitized digital nomad visa portal! Renewal submissions are now handled entirely online without prefecture queueing. Minimum threshold remains €3,500/mo. #VisaHacks #GreeceNomad #NomadVisa',
        tags: ['#VisaHacks', '#GreeceNomad', '#NomadVisa'],
        location: 'Athens, Greece 🇬🇷',
        timestamp: '1h ago',
        createdAt: Date.now() - 60 * 60 * 1000,
        likes: 89,
        isLiked: true,
        rebytes: 41,
        isRebyted: false,
        bookmarks: 64,
        isBookmarked: true,
        repliesCount: 12,
        replies: [
            {
                id: 'br-4',
                author: 'Elena Rostova',
                handle: '@elenanomad',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
                text: 'This is massive! Does it apply to D8 holders looking to cross-reside?',
                timestamp: '45m ago',
                likes: 7
            }
        ],
        mediaUrl: null,
        client: 'SeeNomad Web'
    },
    {
        id: 'byte-4',
        author: {
            name: 'Mateo Silva',
            handle: '@mateocodes',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            badge: 'Staff Engineer & Nomad',
            isVerified: false
        },
        content: 'Hot take: The best remote workspace in Asia isn’t an overpriced aesthetic café with wobbly bamboo tables. It’s an air-conditioned quiet municipal library in Kyoto with tatami seating, silence, and 400 Mbps symmetrical fiber. 🍵🏯 #Kyoto #RemoteWork #NomadHotTakes',
        tags: ['#Kyoto', '#RemoteWork', '#NomadHotTakes'],
        location: 'Kyoto, Japan 🇯🇵',
        timestamp: '2h ago',
        createdAt: Date.now() - 120 * 60 * 1000,
        likes: 126,
        isLiked: false,
        rebytes: 33,
        isRebyted: false,
        bookmarks: 48,
        isBookmarked: false,
        repliesCount: 15,
        replies: [],
        mediaUrl: null,
        client: 'Nomad Terminal'
    },
    {
        id: 'byte-5',
        author: {
            name: 'Kenji Tanaka',
            handle: '@kenjiremote',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
            badge: 'Mountain Nomad',
            isVerified: true
        },
        content: 'Working from Bansko ski resort this month. $450/month for a 1-bedroom flat with snow-capped Pirin views and 100Mbps fiber. Europe’s most underrated winter digital nomad hub, hands down! 🏔️⛷️ #Bansko #NomadLife #BudgetTravel',
        tags: ['#Bansko', '#NomadLife', '#BudgetTravel'],
        location: 'Bansko, Bulgaria 🇧🇬',
        timestamp: '4h ago',
        createdAt: Date.now() - 240 * 60 * 1000,
        likes: 67,
        isLiked: true,
        rebytes: 14,
        isRebyted: false,
        bookmarks: 31,
        isBookmarked: false,
        repliesCount: 8,
        replies: [],
        mediaUrl: null,
        client: 'SeeNomad Web'
    },
    {
        id: 'byte-6',
        author: {
            name: 'Priya Sharma',
            handle: '@priyacodes',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200',
            badge: 'AI Explorer',
            isVerified: true
        },
        content: 'Tested Airalo vs local Viettel eSIM in Da Nang: local SIM gave 120 Mbps down on My Khe beach for $8/month with unlimited data. Skip international roaming passes if staying >2 weeks! 📶🇻🇳 #VietnamNomad #eSIMHacks #TechTips',
        tags: ['#VietnamNomad', '#eSIMHacks', '#TechTips'],
        location: 'Da Nang, Vietnam 🇻🇳',
        timestamp: '6h ago',
        createdAt: Date.now() - 360 * 60 * 1000,
        likes: 94,
        isLiked: false,
        rebytes: 29,
        isRebyted: false,
        bookmarks: 58,
        isBookmarked: false,
        repliesCount: 9,
        replies: [],
        mediaUrl: null,
        client: 'SeeNomad Mobile'
    }
];

export const useNomadByteStore = create(
    persist(
        (set, get) => ({
            bytes: INITIAL_BYTES,
            filter: 'all', // 'all' | 'hot' | 'alerts' | 'hacks' | 'my_bytes'
            searchQuery: '',

            setFilter: (filter) => set({ filter }),
            setSearchQuery: (query) => set({ searchQuery: query }),

            // Create a new Byte (tweet-like micro-post with 280 char enforcement)
            createByte: ({ content, location, tags = [], mediaUrl = null, author = null }) => {
                const text = (content || '').trim();
                if (!text) return null;

                // Extract any hashtags from text if not explicitly provided
                const extractedTags = text.match(/#[a-zA-Z0-9_]+/g) || [];
                const finalTags = Array.from(new Set([...tags, ...extractedTags]));

                const currentAuthor = author || {
                    name: 'Elena Rostova',
                    handle: '@elenanomad',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                    badge: 'Senior Fullstack Nomad',
                    isVerified: true
                };

                const newByte = {
                    id: `byte-${Date.now()}`,
                    author: currentAuthor,
                    content: text.slice(0, 280),
                    tags: finalTags,
                    location: location || 'Lisbon, Portugal 🇵🇹',
                    timestamp: 'Just now',
                    createdAt: Date.now(),
                    likes: 0,
                    isLiked: false,
                    rebytes: 0,
                    isRebyted: false,
                    bookmarks: 0,
                    isBookmarked: false,
                    repliesCount: 0,
                    replies: [],
                    mediaUrl: mediaUrl || null,
                    client: 'SeeNomad Web'
                };

                set((state) => ({
                    bytes: [newByte, ...state.bytes]
                }));

                return newByte;
            },

            // Toggle Like on Byte
            toggleLikeByte: (id) => {
                set((state) => ({
                    bytes: state.bytes.map((byte) => {
                        if (byte.id !== id) return byte;
                        const isLiked = !byte.isLiked;
                        return {
                            ...byte,
                            isLiked,
                            likes: isLiked ? byte.likes + 1 : Math.max(0, byte.likes - 1)
                        };
                    })
                }));
            },

            // Toggle Rebyte (Retweet equivalent)
            toggleRebyte: (id) => {
                set((state) => ({
                    bytes: state.bytes.map((byte) => {
                        if (byte.id !== id) return byte;
                        const isRebyted = !byte.isRebyted;
                        return {
                            ...byte,
                            isRebyted,
                            rebytes: isRebyted ? byte.rebytes + 1 : Math.max(0, byte.rebytes - 1)
                        };
                    })
                }));
            },

            // Toggle Bookmark
            toggleBookmarkByte: (id) => {
                set((state) => ({
                    bytes: state.bytes.map((byte) => {
                        if (byte.id !== id) return byte;
                        const isBookmarked = !byte.isBookmarked;
                        return {
                            ...byte,
                            isBookmarked,
                            bookmarks: isBookmarked ? byte.bookmarks + 1 : Math.max(0, byte.bookmarks - 1)
                        };
                    })
                }));
            },

            // Add reply to Byte
            addReplyToByte: (byteId, replyData) => {
                const text = typeof replyData === 'string' ? replyData : replyData?.text || '';
                if (!text.trim()) return null;

                const authorName = typeof replyData === 'object' && replyData?.author ? replyData.author : 'Elena Rostova';
                const handle = typeof replyData === 'object' && replyData?.handle ? replyData.handle : '@elenanomad';
                const avatar = typeof replyData === 'object' && replyData?.avatar 
                    ? replyData.avatar 
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

                const newReply = {
                    id: `br-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                    author: authorName,
                    handle,
                    avatar,
                    text: text.trim().slice(0, 280),
                    timestamp: 'Just now',
                    createdAt: Date.now(),
                    likes: 0,
                    isLiked: false
                };

                set((state) => ({
                    bytes: state.bytes.map((byte) => {
                        if (byte.id !== byteId) return byte;
                        const existingReplies = Array.isArray(byte.replies) ? byte.replies : [];
                        return {
                            ...byte,
                            replies: [newReply, ...existingReplies],
                            repliesCount: (byte.repliesCount || 0) + 1
                        };
                    })
                }));

                return newReply;
            },

            // Toggle like on a reply
            toggleLikeReply: (byteId, replyId) => {
                set((state) => ({
                    bytes: state.bytes.map((byte) => {
                        if (byte.id !== byteId) return byte;
                        const replies = (byte.replies || []).map((r) => {
                            if (r.id !== replyId) return r;
                            const isLiked = !r.isLiked;
                            return {
                                ...r,
                                isLiked,
                                likes: isLiked ? (r.likes || 0) + 1 : Math.max(0, (r.likes || 0) - 1)
                            };
                        });
                        return { ...byte, replies };
                    })
                }));
            },

            // Delete Byte
            deleteByte: (id) => {
                set((state) => ({
                    bytes: state.bytes.filter((b) => b.id !== id)
                }));
            }
        }),
        {
            name: 'seenomad_bytes_feed_v1'
        }
    )
);
