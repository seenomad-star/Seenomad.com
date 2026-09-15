import {
    Gamepad2, Trophy, Coins, Play, Star, Sparkles, TrendingUp, Users, Clock,
    Award, Zap, Crown, Heart, Share2, MessageCircle, MoreVertical, Search,
    Wand2, Save, Bell, ChevronDown, ChevronUp, Filter, Grid, List, MapPin,
    Target, Gift, Flame, Lock, Calendar, DollarSign, Shield
} from 'lucide-react';

export const tournaments = [
    { id: 1, name: "Global Explorer Challenge", game: "Nomad Quest", participants: 1247, prizePool: "$500 Travel Voucher", endsIn: "2h 30m" },
    { id: 2, name: "City Master Cup", game: "City Guesser Pro", participants: 850, prizePool: "$250 Hotel Credit", endsIn: "5h 12m" },
    { id: 3, name: "Airport Tycoon League", game: "Airport Tycoon", participants: 2100, prizePool: "$1000 Flight Voucher", endsIn: "1d 6h" }
];

export const leaders = [
    { id: 1, name: "Alex Nomad", level: 45, xp: "125k", rewards: "12 Vouchers" },
    { id: 2, name: "TravelBug", level: 42, xp: "118k", rewards: "10 Vouchers" },
    { id: 3, name: "GlobeTrotter", level: 40, xp: "110k", rewards: "8 Vouchers" },
    { id: 4, name: "AdventureSeeker", level: 38, xp: "95k", rewards: "7 Vouchers" },
    { id: 5, name: "SkyHigh", level: 35, xp: "88k", rewards: "6 Vouchers" },
    { id: 6, name: "RoadWarrior", level: 32, xp: "82k", rewards: "5 Vouchers", isUser: true },
    { id: 7, name: "IslandHopper", level: 30, xp: "75k", rewards: "4 Vouchers" }
];

export const rewardsData = [
    { id: 1, name: "$50 Flight Voucher", description: "Valid for any international flight booking.", cost: 5000, category: "Flights", image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=400" },
    { id: 2, name: "1 Night Hotel Stay", description: "Redeemable at partner hotels worldwide.", cost: 8000, category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
    { id: 3, name: "Premium Travel Backpack", description: "Waterproof, 40L capacity explorer pack.", cost: 3500, category: "Gear", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
    { id: 4, name: "$20 Amazon Gift Card", description: "Shop for your travel essentials.", cost: 2000, category: "Vouchers", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400" }
];

export const TYPE_OPTIONS = [
    { id: 'rpg', label: 'RPG' },
    { id: 'puzzle', label: 'Puzzle' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'action', label: 'Action' },
    { id: 'adventure', label: 'Adventure' }
];

export const DIFFICULTY_OPTIONS = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
    { id: 'expert', label: 'Expert' }
];

export const REWARD_OPTIONS = [
    { id: 'vouchers', label: 'Travel Vouchers' },
    { id: 'coins', label: 'Nomad Coins' },
    { id: 'badges', label: 'Badges' },
    { id: 'discounts', label: 'Discounts' }
];

export const PLAYER_OPTIONS = [
    { id: 'single', label: 'Single Player' },
    { id: 'multi', label: 'Multiplayer' },
    { id: 'coop', label: 'Co-op' },
    { id: 'pvp', label: 'PvP' }
];

export const QUICK_FILTER_CATEGORIES = [
    { id: 'free', label: 'Free to Play', icon: '🎮' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'new', label: 'New Releases', icon: '✨' },
    { id: 'popular', label: 'Most Popular', icon: '⭐' },
    { id: 'tournaments', label: 'Tournaments', icon: '🏆' },
    { id: 'high-rewards', label: 'High Rewards', icon: '💎' },
    { id: 'premium', label: 'Premium', icon: '👑', isPrime: true },
    { id: 'vip-only', label: 'VIP Only', icon: '💫', isPrime: true }
];

export const liveTickerMessages = [
    "🎮 5 players just joined Nomad Quest",
    "🏆 Tournament 'Global Explorer' starts in 10 min",
    "💎 Sarah won $500 travel voucher!",
    "🔥 City Guesser Pro trending now",
    "✨ New game 'Backpacker's Journey' released",
    "⭐ 1.2k players online right now",
    "🎯 Daily challenge: Win 3 games for bonus XP"
];

export const allGames = [
    {
        id: 1,
        name: "Nomad Quest",
        type: "RPG",
        category: "Adventure",
        difficulty: "Medium",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
        rating: 4.8,
        playersNow: "1.2k",
        totalPlayers: "50k",
        matchScore: "95%",
        trending: true,
        featured: false,
        premium: false,
        sponsored: false,
        free: true,
        new: false,
        popular: true,
        rewards: {
            xpPlay: 100,
            xpWin: 500,
            coins: 50,
            voucher: "$10 travel credit"
        },
        tags: ["Multiplayer", "Offline", "Cross-Platform"],
        aiInsight: "Perfect for your skill level",
        tournament: {
            active: true,
            prize: "$500 voucher",
            endsIn: "2h 30m"
        },
        playerMode: "multi"
    },
    {
        id: 2,
        name: "City Guesser Pro",
        type: "Puzzle",
        category: "Geography",
        difficulty: "Easy",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
        rating: 4.6,
        playersNow: "850",
        totalPlayers: "35k",
        matchScore: "88%",
        trending: false,
        featured: true,
        premium: false,
        sponsored: true,
        free: true,
        new: false,
        popular: true,
        rewards: {
            xpPlay: 50,
            xpWin: 200,
            coins: 25,
            voucher: "Exclusive Badge"
        },
        tags: ["Single Player", "Educational"],
        aiInsight: "Great for learning geography",
        tournament: null,
        playerMode: "single"
    },
    {
        id: 3,
        name: "Airport Tycoon",
        type: "Simulation",
        category: "Management",
        difficulty: "Hard",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600",
        rating: 4.9,
        playersNow: "2.5k",
        totalPlayers: "120k",
        matchScore: "92%",
        trending: true,
        featured: true,
        premium: true,
        sponsored: false,
        free: false,
        new: false,
        popular: true,
        rewards: {
            xpPlay: 200,
            xpWin: 1000,
            coins: 100,
            voucher: "10% Flight Discount"
        },
        tags: ["Single Player", "Offline", "VR Support"],
        aiInsight: "Challenging but rewarding",
        tournament: {
            active: true,
            prize: "$1000 voucher",
            endsIn: "5d 12h"
        },
        playerMode: "single"
    },
    {
        id: 4,
        name: "Travel Trivia Masters",
        type: "Puzzle",
        category: "Quiz",
        difficulty: "Medium",
        thumbnail: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600",
        rating: 4.7,
        playersNow: "3.1k",
        totalPlayers: "85k",
        matchScore: "90%",
        trending: true,
        featured: false,
        premium: false,
        sponsored: false,
        free: true,
        new: true,
        popular: true,
        rewards: {
            xpPlay: 75,
            xpWin: 300,
            coins: 40,
            voucher: "$5 hotel discount"
        },
        tags: ["Multiplayer", "PvP", "Cross-Platform"],
        aiInsight: "Test your travel knowledge",
        tournament: {
            active: true,
            prize: "$250 voucher",
            endsIn: "1d 6h"
        },
        playerMode: "pvp"
    },
    {
        id: 5,
        name: "Backpacker's Journey",
        type: "Adventure",
        category: "Exploration",
        difficulty: "Easy",
        thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600",
        rating: 4.5,
        playersNow: "620",
        totalPlayers: "28k",
        matchScore: "85%",
        trending: false,
        featured: false,
        premium: false,
        sponsored: false,
        free: true,
        new: true,
        popular: false,
        rewards: {
            xpPlay: 60,
            xpWin: 250,
            coins: 30,
            voucher: "Travel Guide eBook"
        },
        tags: ["Single Player", "Story-Driven"],
        aiInsight: "Relaxing adventure game",
        tournament: null,
        playerMode: "single"
    },
    {
        id: 6,
        name: "Global Conquest",
        type: "Strategy",
        category: "War",
        difficulty: "Expert",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        rating: 4.8,
        playersNow: "1.8k",
        totalPlayers: "95k",
        matchScore: "93%",
        trending: true,
        featured: true,
        premium: true,
        sponsored: false,
        free: false,
        new: false,
        popular: true,
        rewards: {
            xpPlay: 150,
            xpWin: 800,
            coins: 80,
            voucher: "$20 travel credit"
        },
        tags: ["Multiplayer", "PvP", "Cross-Platform"],
        aiInsight: "For experienced strategists",
        tournament: {
            active: true,
            prize: "$750 voucher",
            endsIn: "3d 18h"
        },
        playerMode: "pvp"
    }
];
