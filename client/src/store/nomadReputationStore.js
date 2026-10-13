import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const INITIAL_REPUTATION_BADGES = [
    {
        id: 'top-contributor',
        title: 'Top Contributor',
        category: 'Community',
        tier: 'Legendary',
        iconName: 'Award',
        color: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.4)',
        desc: 'Awarded for submitting 50+ verified coworking reviews, cafe speed tests, and helping 120+ travelers in nomad forums.',
        unlocked: true,
        unlockedAt: '15 Feb 2026',
        progress: 100,
        target: 50,
        current: 52,
        metricLabel: '52 verified community contributions',
        xpReward: 250,
        reputationReward: 45,
        isPinned: true
    },
    {
        id: 'visa-expert',
        title: 'Visa Expert',
        category: 'Legal & Mobility',
        tier: 'Epic',
        iconName: 'ShieldCheck',
        color: '#38bdf8',
        glow: 'rgba(56, 189, 248, 0.4)',
        desc: 'Certified mastery of 15+ Nomad Visas including Portugal D8, Spain Digital Nomad, Japan 6-Mo Nomad Visa, and India e-Visa.',
        unlocked: true,
        unlockedAt: '02 Jan 2026',
        progress: 100,
        target: 15,
        current: 16,
        metricLabel: '16 nomad visa frameworks analyzed',
        xpReward: 300,
        reputationReward: 50,
        isPinned: true
    },
    {
        id: 'remote-explorer',
        title: 'Remote Explorer',
        category: 'Travel & Mobility',
        tier: 'Legendary',
        iconName: 'Globe',
        color: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
        desc: 'Lived and worked remotely across 20+ global cities on 3 continents with verified high-speed fiber internet.',
        unlocked: true,
        unlockedAt: '28 Nov 2025',
        progress: 100,
        target: 20,
        current: 24,
        metricLabel: '24 cities lived & worked',
        xpReward: 350,
        reputationReward: 60,
        isPinned: true
    },
    {
        id: 'cowork-connoisseur',
        title: 'Cowork Connoisseur',
        category: 'Productivity',
        tier: 'Rare',
        iconName: 'Wifi',
        color: '#a855f7',
        glow: 'rgba(168, 85, 247, 0.4)',
        desc: 'Tested and verified ergonomics, backup power, and fiber speeds for 30+ coworking spaces worldwide.',
        unlocked: true,
        unlockedAt: '10 Oct 2025',
        progress: 100,
        target: 30,
        current: 33,
        metricLabel: '33 coworking spaces audited',
        xpReward: 200,
        reputationReward: 35,
        isPinned: false
    },
    {
        id: 'heritage-trailblazer',
        title: 'Heritage Trailblazer',
        category: 'Culture',
        tier: 'Epic',
        iconName: 'Landmark',
        color: '#f97316',
        glow: 'rgba(249, 115, 22, 0.4)',
        desc: 'Explored 10+ UNESCO heritage sites including Delhi Historical Corridor, Qutub Minar, and Humayun’s Tomb.',
        unlocked: true,
        unlockedAt: '20 Nov 2025',
        progress: 100,
        target: 10,
        current: 12,
        metricLabel: '12 heritage monuments explored',
        xpReward: 220,
        reputationReward: 40,
        isPinned: false
    },
    {
        id: 'streak-sentinel',
        title: 'Streak Sentinel',
        category: 'Consistency',
        tier: 'Rare',
        iconName: 'Flame',
        color: '#ef4444',
        glow: 'rgba(239, 68, 68, 0.4)',
        desc: 'Maintained 14+ consecutive daily nomad check-ins on SeeNomad OS.',
        unlocked: true,
        unlockedAt: '12 Mar 2026',
        progress: 100,
        target: 14,
        current: 14,
        metricLabel: '14 consecutive check-in days',
        xpReward: 150,
        reputationReward: 30,
        isPinned: false
    },
    {
        id: 'peer-mentor',
        title: 'Peer Mentor',
        category: 'Community',
        tier: 'Rare',
        iconName: 'Users',
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.4)',
        desc: 'Earned 50+ peer skill endorsements and mentored 5 junior remote developers in nomad hubs.',
        unlocked: false,
        unlockedAt: null,
        progress: 84,
        target: 50,
        current: 42,
        metricLabel: '42 / 50 endorsements collected',
        xpReward: 200,
        reputationReward: 35,
        isPinned: false
    },
    {
        id: 'fiber-speed-pioneer',
        title: 'Fiber Speed Pioneer',
        category: 'Tech',
        tier: 'Verified',
        iconName: 'Zap',
        color: '#6366f1',
        glow: 'rgba(99, 102, 241, 0.4)',
        desc: 'Logged 25+ verified internet speed test reports from cafes, villas, and coliving hubs.',
        unlocked: false,
        unlockedAt: null,
        progress: 72,
        target: 25,
        current: 18,
        metricLabel: '18 / 25 speed tests verified',
        xpReward: 180,
        reputationReward: 30,
        isPinned: false
    }
];

export const useNomadReputationStore = create(
    persist(
        (set, get) => ({
            reputationScore: 940, // 0 - 1000
            maxReputation: 1000,
            rankTier: 'Diamond Sovereign',
            communityRank: 'Top 5% Global Nomad',
            pillarScores: {
                contributions: 96,
                visaMastery: 92,
                exploration: 98,
                peerTrust: 90
            },
            badges: INITIAL_REPUTATION_BADGES,

            // Toggle pin status (max 4 pinned badges)
            togglePinBadge: (badgeId) => {
                const { badges } = get();
                const target = badges.find(b => b.id === badgeId);
                if (!target || !target.unlocked) return false;

                const currentlyPinned = badges.filter(b => b.isPinned);
                if (!target.isPinned && currentlyPinned.length >= 4) {
                    return 'MAX_REACHED';
                }

                set({
                    badges: badges.map(b => 
                        b.id === badgeId ? { ...b, isPinned: !b.isPinned } : b
                    )
                });
                return true;
            },

            // Claim an unlocked badge for extra reputation and XP
            claimBadgeReward: (badgeId) => {
                const { badges, reputationScore } = get();
                const target = badges.find(b => b.id === badgeId);
                if (!target || target.claimedReward) return null;

                const newScore = Math.min(1000, reputationScore + (target.reputationReward || 25));
                set({
                    reputationScore: newScore,
                    badges: badges.map(b =>
                        b.id === badgeId ? { ...b, claimedReward: true } : b
                    )
                });
                return target;
            },

            // Increment badge progress (e.g., when adding a base or endorsing)
            incrementBadgeProgress: (badgeId, amount = 1) => {
                const { badges, reputationScore } = get();
                let newlyUnlocked = null;

                const updated = badges.map(b => {
                    if (b.id !== badgeId) return b;
                    const newCurrent = Math.min(b.target, b.current + amount);
                    const newProgress = Math.round((newCurrent / b.target) * 100);
                    const isNowUnlocked = newProgress >= 100;
                    if (isNowUnlocked && !b.unlocked) {
                        newlyUnlocked = b;
                    }
                    return {
                        ...b,
                        current: newCurrent,
                        progress: newProgress,
                        unlocked: isNowUnlocked || b.unlocked,
                        unlockedAt: isNowUnlocked && !b.unlocked ? new Date().toLocaleDateString('en-GB') : b.unlockedAt
                    };
                });

                set({
                    badges: updated,
                    reputationScore: newlyUnlocked ? Math.min(1000, reputationScore + 30) : reputationScore
                });

                return newlyUnlocked;
            }
        }),
        {
            name: 'seenomad_nomad_reputation'
        }
    )
);
