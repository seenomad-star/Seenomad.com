import React, { useState, useEffect, useRef, useCallback } from 'react';
import TravelFeedFilterBar from './components/TravelFeedFilterBar';
import FeedBottomBar from './components/FeedBottomBar';
import FeedEndFootbar from './components/FeedEndFootbar';
import FeedTabs from './components/FeedTabs';
import StoriesRail from './components/StoriesRail';
import DailyMorningDigest from './components/DailyMorningDigest';
import Composer from './components/Composer';
import PlatformBanner from './components/PlatformBanner';
import HomeRightRail from './components/HomeRightRail';
import Post from './components/Post';
import ShortsShelf from './components/ShortsShelf';
import LiveFeed from './components/LiveFeed';
import SkillExchange from './components/SkillExchange';
import TrendingHeader from './components/TrendingHeader';
import NearbyMap from './components/NearbyMap';
import ShortsFeed from './components/ShortsFeed';
import TravelChallenges from './components/TravelChallenges';
import VisualDestinations from './components/VisualDestinations';
import RetentionStreakWidget from '../Growth/components/RetentionStreakWidget';
import AdSenseSlot from '../../components/common/AdSenseSlot';
import GlassDivider from '../../components/common/GlassDivider';
import TravelFeedSkeleton, { FeedLoadMoreSkeleton } from './components/TravelFeedSkeleton';
import { ArrowUp, Sparkles, Video, Calendar, Flame } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import './styles/SocialFeed.css';

const INITIAL_STORIES = [
    {
        id: 0,
        username: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
        isUser: true,
        storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
        location: 'Seminyak, Bali',
        caption: 'Morning surf session before opening Slack 🏄‍♂️🌊',
        time: 'Just now'
    },
    {
        id: 1,
        username: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900',
        location: 'Kyoto, Japan',
        caption: 'Morning light in the Arashiyama Bamboo Grove. Pure tranquil magic 🎋✨',
        time: '2h ago',
        ringColor: 'orange'
    },
    {
        id: 2,
        username: 'Marco',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900',
        location: 'Amalfi Coast, Italy',
        caption: 'Speedboat cruise between cliffside lemon groves 🍋🚤',
        time: '3h ago',
        ringColor: 'orange'
    },
    {
        id: 3,
        username: 'Yuki',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
        location: 'Shinjuku, Tokyo',
        caption: 'Midnight ramen run and alley exploration 🍜🏮',
        time: '5h ago',
        ringColor: 'orange'
    },
    {
        id: 4,
        username: 'Alex',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
        location: 'Mount Fuji, Japan',
        caption: 'Sunrise hike at 5th station. 0 degrees but 100% worth it 🗻',
        time: '8h ago',
        ringColor: 'gray'
    },
    {
        id: 5,
        username: 'Priya',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900',
        location: 'Udaipur, India',
        caption: 'Sunset over the City Palace on Lake Pichola 🏰🌅',
        time: '10h ago',
        ringColor: 'orange'
    }
];

const INITIAL_POSTS = {
    foryou: [
        // 1. Instagram Multi-Photo Carousel Post with Location check-in
        {
            id: 'post-sarah-kyoto',
            type: 'carousel',
            author: {
                name: 'Sarah Jenkins',
                handle: '@sarahj_travels',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                verified: true
            },
            time: '2h ago',
            location: 'Arashiyama Bamboo Grove, Kyoto',
            feeling: 'peaceful 🎋',
            vibe: '📸 3 Photo Carousel',
            content: 'Dawn in Kyoto hit completely different today. Took the 5:45 AM train before any tourist crowds arrived. Swipe through to see the morning mist filtering through the bamboo canopy 🎋✨\n\nNomad tip: The matcha teahouse by the north gate opens at 7:30 AM and has great benches with views over the valley.\n\n#Kyoto #JapanTravel #MorningLight #DigitalNomad #Wanderlust',
            images: [
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
                'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900'
            ],
            likes: '1.4K',
            comments: [
                { id: 1, author: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Slide 2 with the lanterns is wallpaper material! Incredible tones.', time: '1h ago' },
                { id: 2, author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'Arashiyama at sunrise is pure therapy. Enjoy your time in Kansai!', time: '35m ago' }
            ],
            shares: 42,
            views: '18.5K',
            userLiked: false
        },

        // 2. YouTube Long-Form Travel Vlog with Chapters & Subscribe button
        {
            id: 'post-alex-fuji-vlog',
            type: 'video',
            author: {
                name: 'Alex Rivera',
                handle: '@alexplorer',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                verified: true
            },
            time: '4h ago',
            location: 'Mount Fuji 5th Station, Japan',
            feeling: 'accomplished 🗻',
            subscribers: '48.2K',
            content: '🎥 NEW 4K TRAVEL VLOG: "Summit Trek: Hiking Mount Fuji at 3 AM Above The Sea of Clouds"\n\nWe packed ultra-light, battled 0°C winds on the Yoshida trail, and documented every single switchback until the sun ignited the horizon. Click the chapter buttons below to jump directly to key route checkpoints! 🗻🇯🇵\n\n#MountFuji #TravelVlog #HikingJapan #SoloTravel #4KTravel',
            video: {
                thumbnail: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
                quality: '4K 60FPS HDR',
                duration: '14:45',
                current: '04:12',
                chapters: [
                    { time: '0:00', title: 'Start at 5th Station' },
                    { time: '3:15', title: 'Night Hiking with Headlamps' },
                    { time: '6:50', title: 'Torii Gate in the Clouds' },
                    { time: '11:20', title: 'Summit Sunrise Glow' }
                ]
            },
            likes: '3.8K',
            comments: [
                { id: 1, author: 'Kenji M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', text: 'The drone footage at 11:20 gave me chills. Top tier production quality!', time: '2h ago' }
            ],
            shares: 68,
            views: '45.1K',
            userLiked: true
        },

        // 3. Facebook Nomad Meetup / Event Card
        {
            id: 'post-canggu-event',
            type: 'event',
            author: {
                name: 'Elena Rostova',
                handle: '@elena_wander',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                verified: true
            },
            time: '6h ago',
            location: 'Echo Beach, Canggu, Bali',
            feeling: 'excited 🌅',
            content: '🏝️ Calling all digital nomads, founders & creators in Canggu!\n\nWe are hosting our monthly Sunset Meetup & Lightning Demos this Friday. Grab a coconut or cold Bintang, meet fellow remote workers from around the globe, and catch 3-minute lightning presentations on indie tools and travel hacks.\n\nRSVP below so we can reserve enough beachfront beanbags! 👇',
            event: {
                title: '🌅 Bali Nomad Sunset & Pitch Night',
                cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
                month: 'OCT',
                day: '24',
                datetime: 'Friday, Oct 24 · 5:30 PM - 9:00 PM WITA',
                venue: 'Echo Beach Ocean Deck, Canggu, Bali',
                attendeesCount: 42,
                userRsvp: 'going'
            },
            likes: '915',
            comments: [
                { id: 1, author: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Count me in! Landing in Denpasar Thursday evening.', time: '3h ago' }
            ],
            shares: 26,
            views: '8.9K'
        },

        // 4. Twitter / Reddit Discussion with Community Poll
        {
            id: 'post-poll-discussion',
            type: 'poll',
            author: {
                name: 'Emma Johnson',
                handle: '@emma_nomad',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                verified: true
            },
            time: '9h ago',
            location: 'Oia, Santorini',
            vibe: '💡 Nomad Consensus',
            content: 'Nomad debate time: We are seeing massive Starlink adoption across remote islands. But does staying in an organized Coliving hub beat renting your own cliffside villa with high-speed satellite backup?\n\nFactor in: community events, kitchen sharing vs deep work solitude. Cast your vote below! 🇬🇷🗳️\n\n#DigitalNomad #RemoteWork #NomadHousing #Poll',
            poll: {
                question: 'Preferred Nomad Base in 2026:',
                options: [
                    { text: 'Coliving Hub (Built-in social circle & events)', votes: 162 },
                    { text: 'Private Studio / Villa + Starlink Backup', votes: 248 }
                ],
                totalVotes: 410
            },
            likes: '1.2K',
            comments: [
                { id: 1, author: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', text: 'Villa + Starlink for intense sprint weeks, Coliving for month 1 when entering a new country!', time: '5h ago' }
            ],
            shares: 34,
            views: '16.4K'
        },

        // 5. Facebook Check-in & Street Food Discovery
        {
            id: 'post-tokyo-food',
            type: 'checkin',
            author: {
                name: 'David Chen',
                handle: '@david_nomad',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                verified: true
            },
            time: '12h ago',
            location: 'Omoide Yokocho, Shinjuku, Tokyo',
            feeling: 'feasting 🍜',
            withWhom: 'Yuki & Kenji',
            content: 'Hidden gem alert in Shinjuku alleys: 6-seat yakitori bar with the richest garlic tonkotsu ramen I have ever tasted in Japan. No English menu, pay with cash or Suica card, and open until 4 AM. Tagging @yuki for the secret pin recommendation! 🏮✨\n\n#TokyoEats #ShinjukuNight #StreetFood #JapanTravel',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
            likes: '2.1K',
            comments: 54,
            shares: 19,
            views: '22.8K'
        }
    ],

    following: [
        {
            id: 'post-following-1',
            type: 'standard',
            author: {
                name: 'Marcus Chen',
                handle: '@marcus_nx',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                verified: true
            },
            time: '1h ago',
            location: 'El Poblado, Medellin',
            feeling: 'caffeinated ☕',
            content: 'Found a top secret workspace tucked behind El Poblado park. 350 Mbps symmetrical fiber, artisanal cold brew on tap, and great community dinners every Thursday. Hit me up if you want the pin! 🇨🇴💻',
            image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb113d?w=900',
            likes: '890',
            comments: 31,
            shares: 9,
            views: '5.2K'
        },
        {
            id: 'post-following-2',
            type: 'carousel',
            author: {
                name: 'Lisa Park',
                handle: '@lisatravels',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
                verified: true
            },
            time: '3h ago',
            location: 'Lisbon, Portugal',
            feeling: 'inspired 🚋',
            content: 'Sunset at Miradouro de Santa Catarina with live bossa nova. The digital nomad community here is unmatched. Who is joining our weekend surf trip to Ericeira? 🌊🇵🇹',
            images: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900'
            ],
            likes: '1.5K',
            comments: 42,
            shares: 15,
            views: '11.8K'
        }
    ],
    trending: [],
    recent: [],
    latest: [],
    nearby: []
};

// Trending: high engagement & viral discussions
INITIAL_POSTS.trending = [
    INITIAL_POSTS.foryou[1], // Alex Rivera Fuji Vlog
    INITIAL_POSTS.foryou[3], // Emma Johnson Starlink poll
    INITIAL_POSTS.foryou[0], // Sarah Jenkins Kyoto carousel
    INITIAL_POSTS.foryou[2], // Elena Rostova Bali event
    INITIAL_POSTS.foryou[4]  // David Chen Tokyo food check-in
];

// Following: Dispatches from creators user follows
INITIAL_POSTS.following = [
    INITIAL_POSTS.following[0],
    INITIAL_POSTS.following[1],
    INITIAL_POSTS.foryou[0],
    INITIAL_POSTS.foryou[2]
];

// Recent: Chronological real-time travel updates
INITIAL_POSTS.recent = [
    {
        id: 'post-recent-live-1',
        type: 'standard',
        author: {
            name: 'Kadek Surya',
            handle: '@kadek_bali',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
            verified: true
        },
        time: 'Just now',
        location: 'Echo Beach, Canggu, Bali',
        feeling: 'chilled 🏄',
        vibe: '🏄 Beach Sunset',
        content: 'Sunset surf lineup at Echo Beach looking pristine right now! 4ft clean peelers, offshore breeze, and the sea temperature is 28°C. Come down after work! 🌊🏄\n\n#EchoBeach #BaliLive #SunsetSession #NomadSurfers',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
        likes: '48',
        comments: 6,
        shares: 3,
        views: '240'
    },
    INITIAL_POSTS.following[0], // 1h ago
    INITIAL_POSTS.foryou[0],    // 2h ago
    INITIAL_POSTS.following[1], // 3h ago
    INITIAL_POSTS.foryou[1],    // 4h ago
    INITIAL_POSTS.foryou[2]     // 6h ago
];

INITIAL_POSTS.latest = INITIAL_POSTS.recent;
INITIAL_POSTS.nearby = [
    INITIAL_POSTS.recent[0]
];

// Rich global batches of nomad dispatches for endless scrolling
const DISPATCH_BATCHES = [
    {
        locationTag: 'Medellín & Lisbon',
        posts: [
            {
                id: 'batch-mde',
                type: 'standard',
                author: {
                    name: 'Mateo Silva',
                    handle: '@mateo_mde',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
                    verified: true
                },
                time: '12m ago',
                location: 'Medellín, Colombia',
                feeling: 'inspired 💡',
                vibe: '🌆 Rooftop Coworking',
                content: 'El Poblado morning coworking vibes! Fast 300 Mbps fiber, incredible specialty coffee, and 24°C all year round. Anyone up for a digital nomad lunch meetup around Provenza? ☕🇨🇴\n\n#MedellinNomads #ColombiaHub #RemoteWorkLife',
                image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900',
                likes: '142',
                comments: 18,
                shares: 7,
                views: '1.2K'
            },
            {
                id: 'batch-lis',
                type: 'standard',
                author: {
                    name: 'Chloe Laurent',
                    handle: '@chloe_wanders',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
                    verified: true
                },
                time: '34m ago',
                location: 'Lisbon, Portugal',
                feeling: 'sun-soaked ☀️',
                vibe: '🚋 Miradouro Sunset',
                content: 'Golden hour at Miradouro de Santa Catarina with live bossa nova in the background. Lisbon in autumn is truly unmatched for remote work life! 🇵🇹✨\n\n#LisbonNomads #PortugalTravel #RemoteLife',
                image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=900',
                likes: '388',
                comments: 32,
                shares: 14,
                views: '3.4K'
            }
        ]
    },
    {
        locationTag: 'Chiang Mai & Cape Town',
        posts: [
            {
                id: 'batch-cnx',
                type: 'standard',
                author: {
                    name: 'Somchai Prasert',
                    handle: '@somchai_cm',
                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
                    verified: true
                },
                time: '50m ago',
                location: 'Nimman, Chiang Mai',
                feeling: 'productive 💻',
                vibe: '🌿 Garden Cafe',
                content: 'Found a new quiet garden cafe in Nimman Soi 9 with high-speed mesh WiFi, standing desks, and fresh cold-pressed dragonfruit juice for $2. The nomad community here is thriving! 🌿🇹🇭\n\n#ChiangMaiNomads #ThailandRemote #NomadLife',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900',
                likes: '276',
                comments: 24,
                shares: 11,
                views: '2.1K'
            },
            {
                id: 'batch-cpt',
                type: 'standard',
                author: {
                    name: 'Liam van der Merwe',
                    handle: '@liam_cpt',
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
                    verified: true
                },
                time: '1h ago',
                location: 'Camps Bay, Cape Town',
                feeling: 'energized ⚡',
                vibe: '🏔️ Table Mountain Vista',
                content: 'Post-standup ocean trail run along Camps Bay before afternoon architecture reviews. Overlooking the Twelve Apostles makes complex distributed systems feel relaxing. 🇿🇦🌊\n\n#CapeTown #DigitalNomad #TrailRunning',
                image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=900',
                likes: '419',
                comments: 39,
                shares: 19,
                views: '4.8K'
            }
        ]
    },
    {
        locationTag: 'Oaxaca & Bansko',
        posts: [
            {
                id: 'batch-oax',
                type: 'standard',
                author: {
                    name: 'Elena Morales',
                    handle: '@elena_oax',
                    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
                    verified: true
                },
                time: '2h ago',
                location: 'Oaxaca City, Mexico',
                feeling: 'delighted 🌮',
                vibe: '🎨 Historic Centro',
                content: 'Artisan rooftop work session near Santo Domingo church with fresh mezcal and mole negro lunch. The culture, color, and fiber connections in Oaxaca are truly unmatched. 🇲🇽✨\n\n#OaxacaTravel #MexicoNomads #CreativeHub',
                image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=900',
                likes: '354',
                comments: 29,
                shares: 15,
                views: '3.1K'
            },
            {
                id: 'batch-bko',
                type: 'standard',
                author: {
                    name: 'Nikolay Ivanov',
                    handle: '@niko_bansko',
                    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
                    verified: true
                },
                time: '3h ago',
                location: 'Bansko, Bulgaria',
                feeling: 'refreshed ❄️',
                vibe: '🎿 Mountain Coworking',
                content: 'Fresh mountain breeze in the Pirin mountains! Morning coding session next to the fireplace, afternoon alpine hike. Europe’s coziest mountain nomad haven never disappoints. 🇧🇬🏔️\n\n#BanskoNomads #MountainCoworking #Bulgaria',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900',
                likes: '512',
                comments: 48,
                shares: 22,
                views: '5.6K'
            }
        ]
    },
    {
        locationTag: 'Da Nang & Florianópolis',
        posts: [
            {
                id: 'batch-dad',
                type: 'standard',
                author: {
                    name: 'Minh Nguyen',
                    handle: '@minh_travels',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                    verified: true
                },
                time: '4h ago',
                location: 'My Khe Beach, Da Nang',
                feeling: 'peaceful 🌊',
                vibe: '🌴 Coastal Breeze',
                content: 'Sunrise ocean dip at My Khe Beach, followed by Vietnamese iced coconut coffee and 400 Mbps WiFi right on the beachfront boardwalk. Cost of living here is phenomenal. 🇻🇳☕\n\n#DaNangNomads #VietnamTravel #BeachCoworking',
                image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900',
                likes: '320',
                comments: 27,
                shares: 12,
                views: '2.8K'
            },
            {
                id: 'batch-fln',
                type: 'standard',
                author: {
                    name: 'Lucas Santana',
                    handle: '@lucas_floripa',
                    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
                    verified: true
                },
                time: '5h ago',
                location: 'Lagoa da Conceição, Florianópolis',
                feeling: 'adventurous 🏄',
                vibe: '🇧🇷 Silicon Island',
                content: 'Floripa’s magic island tech scene is buzzing! Met 10 other nomad founders at the lagoon coworking space today. Sunset acai bowl right after deploying to production. 🇧🇷🚀\n\n#FloripaTech #BrazilNomads #MagicIsland',
                image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=900',
                likes: '445',
                comments: 36,
                shares: 18,
                views: '4.2K'
            }
        ]
    }
];

const SocialFeed = () => {
    const { addToast } = useToastStore();
    const [activeTab, setActiveTab] = useState('trending');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [feedPosts, setFeedPosts] = useState(INITIAL_POSTS);
    const [newPostsAlert, setNewPostsAlert] = useState(false);

    // References for robust Intersection Observer infinite scrolling
    const bottomSentinelRef = useRef(null);
    const batchIndexRef = useRef(0);
    const isLoadingMoreRef = useRef(false);
    const hasMoreRef = useRef(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    // Random new post ticker for "Recent" tab
    useEffect(() => {
        if (activeTab === 'recent' || activeTab === 'latest') {
            const timer = setTimeout(() => setNewPostsAlert(true), 12000);
            return () => clearTimeout(timer);
        }
        setNewPostsAlert(false);
    }, [activeTab]);

    const handleAddPost = (newPost) => {
        setFeedPosts(prev => {
            const updatedRecent = [newPost, ...(prev.recent || [])];
            const updatedFollowing = [newPost, ...(prev.following || [])];
            const updatedTrending = [newPost, ...(prev.trending || [])];
            const currentTabPosts = prev[activeTab] ? [newPost, ...prev[activeTab]] : [newPost];

            return {
                ...prev,
                [activeTab]: currentTabPosts,
                recent: updatedRecent,
                latest: updatedRecent,
                following: updatedFollowing,
                trending: updatedTrending
            };
        });
    };

    const handleRefreshFeed = () => {
        setIsRefreshing(true);
        batchIndexRef.current = 0;
        hasMoreRef.current = true;
        setHasMore(true);
        setTimeout(() => {
            setIsRefreshing(false);
            addToast(`Feed refreshed with latest ${activeTab} updates! ✈️`, 'success');
        }, 600);
    };

    // Automated infinite scroll loader triggered by the Intersection Observer
    const handleLoadMore = useCallback(() => {
        if (isLoadingMoreRef.current || !hasMoreRef.current || isLoading) return;

        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);

        setTimeout(() => {
            const currentBatchIdx = batchIndexRef.current;
            const batchData = DISPATCH_BATCHES[currentBatchIdx % DISPATCH_BATCHES.length];
            const timestamp = Date.now();

            const newDispatches = batchData.posts.map((post, i) => ({
                ...post,
                id: `${post.id}-${timestamp}-${i}`
            }));

            setFeedPosts(prev => {
                const targetTab = activeTab in prev ? activeTab : 'trending';
                return {
                    ...prev,
                    [targetTab]: [...(prev[targetTab] || []), ...newDispatches],
                    trending: [...(prev.trending || []), ...newDispatches],
                    recent: [...(prev.recent || []), ...newDispatches]
                };
            });

            batchIndexRef.current += 1;
            isLoadingMoreRef.current = false;
            setIsLoadingMore(false);

            addToast(`Auto-streamed new nomad dispatches from ${batchData.locationTag}! 🌍`, 'info');

            // Set milestone after 8 dynamic batches (16+ rich posts)
            if (batchIndexRef.current >= 8) {
                hasMoreRef.current = false;
                setHasMore(false);
            }
        }, 650);
    }, [isLoading, activeTab, addToast]);

    // Intersection Observer: automatically load more dispatches as user scrolls near bottom
    useEffect(() => {
        const streamTabs = ['trending', 'following', 'recent', 'latest', 'foryou', 'all'];
        if (!streamTabs.includes(activeTab)) return;

        const sentinel = bottomSentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    handleLoadMore();
                }
            },
            {
                root: null, // observe relative to viewport
                rootMargin: '300px', // trigger 300px before reaching the bottom for zero-latency scroll
                threshold: 0.05
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [activeTab, handleLoadMore]);

    const handleComposeClick = () => {
        const composerCard = document.getElementById('composer-card');
        if (composerCard) {
            composerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const inputPill = composerCard.querySelector('.share-box-input-pill');
            if (inputPill) inputPill.click();
            const textarea = composerCard.querySelector('textarea');
            if (textarea) textarea.focus();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Filter posts for specialized tabs
    const getPostsToRender = () => {
        if (activeTab === 'vlogs') {
            return (feedPosts.trending || []).filter(p => p.type === 'video' || p.video);
        }
        if (activeTab === 'events') {
            return (feedPosts.trending || []).filter(p => p.type === 'event' || p.event);
        }
        if (activeTab === 'following') {
            return feedPosts.following || [];
        }
        if (activeTab === 'trending') {
            return feedPosts.trending || [];
        }
        if (activeTab === 'recent' || activeTab === 'latest') {
            return feedPosts.recent || feedPosts.latest || [];
        }
        return feedPosts[activeTab] || feedPosts.trending || [];
    };

    const postsToRender = getPostsToRender();

    // Determine active filter for the top filter bar
    const currentFilter = ['following', 'trending', 'recent'].includes(activeTab) 
        ? activeTab 
        : (activeTab === 'latest' ? 'recent' : 'trending');

    return (
        <div className="social-feed-layout">
            {/* Center Main Feed Column */}
            <div className="social-feed-main">
                {/* 1. Horizontal Tab / Filter Bar at the Top of the Travel Feed */}
                <TravelFeedFilterBar 
                    activeFilter={currentFilter}
                    onFilterChange={(filterKey) => {
                        setActiveTab(filterKey);
                        addToast(`Switched feed to ${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)} travel updates`, 'info');
                    }}
                    onRefresh={handleRefreshFeed}
                    isRefreshing={isRefreshing}
                    counts={{
                        following: feedPosts.following?.length || 4,
                        trending: feedPosts.trending?.length || 5,
                        recent: feedPosts.recent?.length || 6
                    }}
                />

                {/* 2. Instagram Stories Rail */}
                <StoriesRail stories={INITIAL_STORIES} />

                {/* Subtle Glassmorphic Section Divider */}
                <GlassDivider id="divider-stories-digest" spacing="sm" showPip />

                {/* 2. Daily Morning Digest Card */}
                <DailyMorningDigest />

                {/* Subtle Glassmorphic Section Divider */}
                <GlassDivider id="divider-digest-composer" spacing="sm" />

                {/* 3. Twitter-Style Hybrid Composer */}
                <Composer onAddPost={handleAddPost} />

                {/* 4. Platform Infrastructure Status Banner */}
                <PlatformBanner />

                {/* Subtle Glassmorphic Section Divider before Feed Navigation */}
                <GlassDivider id="divider-composer-tabs" spacing="sm" />

                {/* 5. Sticky Feed Tabs Bar */}
                <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Daily Drop / Retention Streak Widget on relevant tabs */}
                {activeTab === 'challenges' && (
                    <div className="feed-widget-wrap">
                        <RetentionStreakWidget />
                    </div>
                )}

                {/* New posts alert ticker (Latest tab) */}
                {activeTab === 'latest' && newPostsAlert && (
                    <div 
                        className="feed-new-posts-pill"
                        onClick={() => {
                            setNewPostsAlert(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <ArrowUp size={14} />
                        <span>3 new nomad posts loaded · Click to view</span>
                    </div>
                )}

                {/* Main Feed Content Stream */}
                <main className="feed-stream" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                    {isLoading || isRefreshing ? (
                        <TravelFeedSkeleton count={3} variant="mixed" />
                    ) : activeTab === 'live' ? (
                        <LiveFeed />
                    ) : activeTab === 'visuals' ? (
                        <VisualDestinations />
                    ) : activeTab === 'shorts' ? (
                        <ShortsFeed />
                    ) : activeTab === 'challenges' ? (
                        <TravelChallenges />
                    ) : activeTab === 'exchange' ? (
                        <SkillExchange />
                    ) : (
                        <>
                            {activeTab === 'trending' && <TrendingHeader />}
                            {activeTab === 'nearby' && <NearbyMap />}
                            
                            {postsToRender.length > 0 ? (
                                postsToRender.map((post, idx) => (
                                    <React.Fragment key={post.id}>
                                        <Post post={post} />

                                        {/* Insert YouTube Shorts / IG Reels Shelf after Post #1 on 'foryou' or 'trending' */}
                                        {idx === 0 && (activeTab === 'foryou' || activeTab === 'trending') && (
                                            <>
                                                <GlassDivider id={`divider-pre-shorts-${post.id}`} spacing="sm" />
                                                <ShortsShelf 
                                                    onExploreAll={() => setActiveTab('shorts')}
                                                    onSelectShort={(s) => {
                                                        addToast(`Playing reel: ${s.title}`, 'info');
                                                        setActiveTab('shorts');
                                                    }}
                                                />
                                                <GlassDivider id={`divider-post-shorts-${post.id}`} spacing="sm" />
                                            </>
                                        )}

                                        {/* In-feed Ad after post #2 */}
                                        {idx === 2 && (
                                            <AdSenseSlot 
                                                format="auto" 
                                                label="Sponsored Partner" 
                                                className="feed-infeed-ad" 
                                            />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="feed-empty-state">
                                    <Sparkles size={32} className="text-blue-400 mb-2" />
                                    <h3>No posts in this feed yet</h3>
                                    <p>Be the first nomad to share a story, video, or event!</p>
                                </div>
                            )}

                            {/* In-stream Skeleton while fetching next batch of dispatches */}
                            {isLoadingMore && <FeedLoadMoreSkeleton />}

                            {postsToRender.length > 0 && (
                                <FeedEndFootbar 
                                    sentinelRef={bottomSentinelRef}
                                    hasMore={hasMore}
                                    isLoadingMore={isLoadingMore}
                                    onRefresh={handleRefreshFeed}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Right Column: Twitter-style Trends, Search & Follow Recommendations */}
            <HomeRightRail />

            {/* Persistent Feed Bottom Bar & Accessible Footbar */}
            <FeedBottomBar 
                activeFilter={currentFilter}
                onFilterChange={(filterKey) => {
                    setActiveTab(filterKey);
                    addToast(`Switched feed to ${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)} travel updates`, 'info');
                }}
                onRefresh={handleRefreshFeed}
                isRefreshing={isRefreshing}
                onComposeClick={handleComposeClick}
                counts={{
                    following: feedPosts.following?.length || 4,
                    trending: feedPosts.trending?.length || 5,
                    recent: feedPosts.recent?.length || 6
                }}
                postsCount={postsToRender.length}
            />
        </div>
    );
};

export default SocialFeed;
