import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle, Zap, Gift, Trophy, ArrowRight, Star, Clock, Target, Sparkles, Check } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useToastStore } from '../../../store/toastStore';
import './NomadRetentionQuests.css';

const DAYS_OF_WEEK = [
    { day: 'Mon', checked: true, xp: 50 },
    { day: 'Tue', checked: true, xp: 50 },
    { day: 'Wed', checked: true, xp: 50 },
    { day: 'Thu', checked: true, xp: 50 },
    { day: 'Fri', checked: true, xp: 75 },
    { day: 'Sat', checked: true, xp: 75 },
    { day: 'Sun', checked: false, isToday: true, xp: 100 }
];

export const INITIAL_QUESTS = [
    {
        id: 'q1',
        title: 'Daily Passport Check-In',
        desc: 'Log in and confirm your current nomad coordinates.',
        xp: 50,
        progress: 1,
        total: 1,
        claimed: true,
        type: 'daily',
        color: '#f59e0b',
        category: 'Routine'
    },
    {
        id: 'q2',
        title: 'Explore 2 Delhi Heritage Spots',
        desc: 'Browse or save 2 destinations from the Delhi historical collection.',
        xp: 80,
        progress: 2,
        total: 2,
        claimed: false,
        type: 'daily',
        color: '#3b82f6',
        category: 'Discovery'
    },
    {
        id: 'q3',
        title: 'Endorse a Nomad Mate’s Skill',
        desc: 'Give a star endorsement to any peer in the community.',
        xp: 60,
        progress: 1,
        total: 1,
        claimed: false,
        type: 'daily',
        color: '#a855f7',
        category: 'Community'
    },
    {
        id: 'q4',
        title: 'Test Current Workspace Wifi',
        desc: 'Submit a verified internet speed test from your base.',
        xp: 75,
        progress: 0,
        total: 1,
        claimed: false,
        type: 'daily',
        color: '#10b981',
        category: 'Productivity'
    },
    {
        id: 'q5',
        title: '5-Day Continuous Nomad Streak',
        desc: 'Check in for 5 consecutive days this calendar week.',
        xp: 250,
        progress: 4,
        total: 5,
        claimed: false,
        type: 'weekly',
        color: '#ef4444',
        category: 'Consistency'
    },
    {
        id: 'q6',
        title: 'Save 5 Curated Destinations',
        desc: 'Add 5 destinations across different categories to My Favorites.',
        xp: 150,
        progress: 3,
        total: 5,
        claimed: false,
        type: 'weekly',
        color: '#06b6d4',
        category: 'Collection'
    }
];

const NomadRetentionQuests = () => {
    const { dailyStreak = 14, checkIn, addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const [quests, setQuests] = useState(INITIAL_QUESTS);
    const [checkedInToday, setCheckedInToday] = useState(false);
    const [filterType, setFilterType] = useState('all');

    const handleDailyCheckIn = () => {
        if (checkedInToday) {
            addToast('You have already completed today’s check-in!', 'info');
            return;
        }
        checkIn();
        addXP(50);
        setCheckedInToday(true);
        addToast('🔥 Daily check-in confirmed! +50 XP and streak maintained!', 'success');
    };

    const handleClaimQuest = (questId) => {
        const quest = quests.find(q => q.id === questId);
        if (!quest || quest.claimed || quest.progress < quest.total) return;

        setQuests(quests.map(q => q.id === questId ? { ...q, claimed: true } : q));
        addXP(quest.xp);
        addToast(`Claimed +${quest.xp} XP for "${quest.title}"!`, 'success');
    };

    const filteredQuests = quests.filter(q => filterType === 'all' || q.type === filterType);

    return (
        <div className="retention-quests-container">
            {/* 1. Daily Streak Hero Card */}
            <div className="streak-hero-card">
                <div className="streak-left-block">
                    <div className="streak-flame-badge">
                        <Flame size={32} className="streak-flame-icon animate-pulse" />
                        <span className="streak-days-count">{dailyStreak}</span>
                    </div>
                    <div>
                        <div className="streak-title-row">
                            <h3 className="streak-heading">Day Nomad Streak Active</h3>
                            <span className="streak-multiplier-chip">1.5x XP Boost Active</span>
                        </div>
                        <p className="streak-subtitle">
                            Check in daily to build your global explorer reputation and multiply XP rewards.
                        </p>
                    </div>
                </div>

                <button 
                    type="button" 
                    onClick={handleDailyCheckIn}
                    className={`btn-checkin-streak ${checkedInToday ? 'checked-in' : ''}`}
                    disabled={checkedInToday}
                >
                    {checkedInToday ? (
                        <>
                            <CheckCircle size={16} /> Checked In Today (+50 XP)
                        </>
                    ) : (
                        <>
                            <Zap size={16} /> Check In Today (+50 XP)
                        </>
                    )}
                </button>
            </div>

            {/* 2. 7-Day Visual Progress Track */}
            <div className="weekly-streak-tracker-bar">
                <div className="tracker-top-meta">
                    <span className="tracker-caption">WEEKLY HABIT TRAIL</span>
                    <span className="tracker-reward-text">
                        <Gift size={13} className="text-pink-400" /> Milestone Reward in 3 Days (200 NC + Gold Passport Stamp)
                    </span>
                </div>
                <div className="streak-dots-rail">
                    {DAYS_OF_WEEK.map((item, index) => (
                        <div 
                            key={index} 
                            className={`streak-day-bubble ${item.checked ? 'completed' : ''} ${item.isToday ? 'is-today' : ''}`}
                        >
                            <span className="day-name">{item.day}</span>
                            <div className="day-circle">
                                {item.checked ? (
                                    <Check size={14} />
                                ) : (
                                    <span className="day-xp-tag">+{item.xp}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Quest List Header & Filter Tabs */}
            <div className="quests-section-header">
                <div>
                    <h3 className="quests-title">Active Nomad Missions & Quests</h3>
                    <p className="quests-subtitle">Complete daily travel tasks and community actions to level up your explorer rank.</p>
                </div>
                <div className="quest-filter-tabs">
                    <button
                        type="button"
                        className={`quest-tab ${filterType === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterType('all')}
                    >
                        All Quests ({quests.length})
                    </button>
                    <button
                        type="button"
                        className={`quest-tab ${filterType === 'daily' ? 'active' : ''}`}
                        onClick={() => setFilterType('daily')}
                    >
                        Daily Tasks
                    </button>
                    <button
                        type="button"
                        className={`quest-tab ${filterType === 'weekly' ? 'active' : ''}`}
                        onClick={() => setFilterType('weekly')}
                    >
                        Weekly Bounties
                    </button>
                </div>
            </div>

            {/* 4. Quests Cards List */}
            <div className="quests-cards-grid">
                {filteredQuests.map((quest) => {
                    const isReadyToClaim = quest.progress >= quest.total && !quest.claimed;
                    const percent = Math.min(100, Math.round((quest.progress / quest.total) * 100));

                    return (
                        <div 
                            key={quest.id} 
                            className={`quest-card ${quest.claimed ? 'is-claimed' : ''} ${isReadyToClaim ? 'is-ready' : ''}`}
                        >
                            <div className="quest-top-row">
                                <span className="quest-cat-chip" style={{ color: quest.color, borderColor: `${quest.color}40`, background: `${quest.color}15` }}>
                                    {quest.category} · {quest.type.toUpperCase()}
                                </span>
                                <span className="quest-xp-badge">
                                    <Sparkles size={13} className="text-amber-400" /> +{quest.xp} XP
                                </span>
                            </div>

                            <h4 className="quest-card-title">{quest.title}</h4>
                            <p className="quest-card-desc">{quest.desc}</p>

                            <div className="quest-progress-block">
                                <div className="progress-labels">
                                    <span>Progress</span>
                                    <span>{quest.progress} / {quest.total}</span>
                                </div>
                                <div className="quest-progress-track">
                                    <div 
                                        className="quest-progress-fill" 
                                        style={{ width: `${percent}%`, backgroundColor: quest.color }}
                                    />
                                </div>
                            </div>

                            <div className="quest-action-row">
                                {quest.claimed ? (
                                    <div className="claimed-indicator">
                                        <CheckCircle size={15} /> Completed & Claimed
                                    </div>
                                ) : isReadyToClaim ? (
                                    <button 
                                        type="button" 
                                        onClick={() => handleClaimQuest(quest.id)}
                                        className="btn-claim-reward"
                                    >
                                        <Gift size={15} /> Claim +{quest.xp} XP
                                    </button>
                                ) : (
                                    <div className="in-progress-note">
                                        <Clock size={13} /> In Progress ({quest.total - quest.progress} remaining)
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NomadRetentionQuests;
