import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Compass, ShieldCheck, Users, Rocket, Shield, Dna,
    ShoppingBag, Trophy, Wifi, Briefcase, Plane, Layers,
    Sparkles, ArrowRight, Globe, Landmark
} from 'lucide-react';
import { useNavStore } from '../../../store/navStore';

// Suite 1 Modules: Culture, Community & Guardians
import CulturalCompass from './CulturalCompass';
import GuardianConnect from '../../Community/GuardianConnect';
import NomadEventsHub from '../../Social/NomadEventsHub';
import StoryStudio from '../../Community/StoryStudio';

// Suite 2 Modules: Passport, DNA, Perks & Challenges
import NomadPassport from '../../Security/NomadPassport';
import NomadDNA from '../../Growth/NomadDNA';
import NomadPerks from '../../Growth/NomadPerks';
import ViralChallenges from '../../Growth/ViralChallenges';

// Suite 3 Modules: Connectivity, Discovery, Market & Flights
import SpeedTestMap from './SpeedTestMap';
import DiscoveryHub from '../../Growth/DiscoveryHub';
import TrivenlyHub from '../../Marketplace/TrivenlyHub';
import FlightVisaWidget from './FlightVisaWidget';

import './NomadAIStudio.css';

const SUITE_DEFINITIONS = {
    'culture-community': {
        badge: 'SEENOMAD CULTURE, GUARDIANS & COMMUNITY SUITE',
        liveTag: '4 Modules Unified',
        title: 'Culture, Local Guardians & Events Hub',
        description:
            'One unified hub combining Cultural Compass (local etiquette & traditions), Local Guardians (verified 24/7 local fixers & translators), Nomad Events (pop-up villages & founder dinners), and Story Studio (creator dispatches).',
        tabs: [
            {
                id: 'all',
                label: 'Unified 4-in-1 View',
                badge: 'All 4 Modules',
                color: '#38BDF8',
                icon: Layers,
                desc: 'View Cultural Compass, Local Guardians, Nomad Events & Story Studio together.'
            },
            {
                id: 'cultural-compass',
                label: 'Cultural Compass',
                badge: 'Etiquette & Arts',
                color: '#F59E0B',
                icon: Compass,
                desc: 'Local customs, festivals, handicrafts & culinary heritage.'
            },
            {
                id: 'guardians',
                label: 'Local Guardians',
                badge: '24/7 Fixers',
                color: '#10B981',
                icon: ShieldCheck,
                desc: 'Verified local fixers, apartment scouts & bilingual translators.'
            },
            {
                id: 'events',
                label: 'Nomad Events',
                badge: 'Pop-Up Cities',
                color: '#A855F7',
                icon: Users,
                desc: 'Pop-up villages, coworking meetups & founder masterminds.'
            },
            {
                id: 'story-studio',
                label: 'Story Studio',
                badge: 'Creator Reels',
                color: '#EC4899',
                icon: Rocket,
                desc: 'Publish travelogs, monthly spend breakdowns & field reels.'
            }
        ],
        renderModules: (activeTab) => {
            const list = [
                {
                    id: 'cultural-compass',
                    title: 'Cultural Compass • Etiquette & Heritage',
                    tag: '195+ Cultural Briefs',
                    color: 'amber',
                    icon: Compass,
                    component: <CulturalCompass />
                },
                {
                    id: 'guardians',
                    title: 'Local Guardians • Verified Fixers & Scouts',
                    tag: 'Identity Verified',
                    color: 'emerald',
                    icon: ShieldCheck,
                    component: <GuardianConnect />
                },
                {
                    id: 'events',
                    title: 'Nomad Events • Pop-Up Villages & Summits',
                    tag: '85+ Active Cities',
                    color: 'purple',
                    icon: Users,
                    component: <NomadEventsHub />
                },
                {
                    id: 'story-studio',
                    title: 'Story Studio • Creator Dispatches',
                    tag: '+250 XP / Story',
                    color: 'blue',
                    icon: Rocket,
                    component: <StoryStudio />
                }
            ];
            return activeTab === 'all' ? list : list.filter((m) => m.id === activeTab);
        }
    },

    'passport-perks': {
        badge: 'SEENOMAD IDENTITY, PERKS & BOUNTIES SUITE',
        liveTag: '4 Modules Unified',
        title: 'Nomad Passport, DNA, Perks & Challenges',
        description:
            'Manage your verifiable Nomad Passport credentials, calibrate your Nomad DNA persona & climate fit, redeem member Perks & eSIM deals, and complete Viral Challenges for XP bounties.',
        tabs: [
            {
                id: 'all',
                label: 'Unified 4-in-1 View',
                badge: 'All 4 Modules',
                color: '#38BDF8',
                icon: Layers,
                desc: 'View Nomad Passport, Nomad DNA, Perks & Viral Challenges side-by-side.'
            },
            {
                id: 'passport',
                label: 'Nomad Passport',
                badge: 'ZK Credentials',
                color: '#3B82F6',
                icon: Shield,
                desc: 'Verifiable on-chain nomad passport & residency stamps.'
            },
            {
                id: 'dna',
                label: 'Nomad DNA',
                badge: '96% Match Fit',
                color: '#A855F7',
                icon: Dna,
                desc: 'Chronotype, climate fit & work-pace compatibility matrix.'
            },
            {
                id: 'perks',
                label: 'Nomad Perks',
                badge: 'Up to 40% Off',
                color: '#10B981',
                icon: ShoppingBag,
                desc: 'Partner discounts on global eSIMs, coliving, lounges & insurance.'
            },
            {
                id: 'challenges',
                label: 'Viral Challenges',
                badge: '2.5x XP Boost',
                color: '#F59E0B',
                icon: Trophy,
                desc: 'Active city quests, speed-test bounties & global streaks.'
            }
        ],
        renderModules: (activeTab) => {
            const list = [
                {
                    id: 'passport',
                    title: 'Nomad Passport • Sovereign Credentials',
                    tag: 'Zero-Knowledge Vault',
                    color: 'blue',
                    icon: Shield,
                    component: <NomadPassport />
                },
                {
                    id: 'dna',
                    title: 'Nomad DNA • Persona & Climate Matrix',
                    tag: 'Biometric Fit',
                    color: 'purple',
                    icon: Dna,
                    component: <NomadDNA />
                },
                {
                    id: 'perks',
                    title: 'Nomad Perks • Partner Deals & eSIMs',
                    tag: 'Instant Redemption',
                    color: 'emerald',
                    icon: ShoppingBag,
                    component: <NomadPerks />
                },
                {
                    id: 'challenges',
                    title: 'Viral Challenges • Quests & Bounties',
                    tag: 'Live Leaderboard',
                    color: 'amber',
                    icon: Trophy,
                    component: <ViralChallenges />
                }
            ];
            return activeTab === 'all' ? list : list.filter((m) => m.id === activeTab);
        }
    },

    'connectivity-market': {
        badge: 'SEENOMAD CONNECTIVITY, DISCOVERY & MARKET SUITE',
        liveTag: '4 Modules Unified',
        title: 'Speed Test Map, Discovery, Market & Flights',
        description:
            'Explore speed-tested coworking & cafe fiber maps, scout off-grid Starlink hubs in Discovery, book vetted local playbooks on Trivenly Market, and pair flights with visa rules.',
        tabs: [
            {
                id: 'all',
                label: 'Unified 4-in-1 View',
                badge: 'All 4 Modules',
                color: '#38BDF8',
                icon: Layers,
                desc: 'View Speed Test Map, Discovery Hub, Trivenly Market & Flights + Visa together.'
            },
            {
                id: 'speed-test',
                label: 'Speed Test Map',
                badge: 'Verified Fiber',
                color: '#10B981',
                icon: Wifi,
                desc: 'Community-verified download/upload speeds at cafes & coworking hubs.'
            },
            {
                id: 'discovery',
                label: 'Discovery Hub',
                badge: 'Hidden Gems',
                color: '#A855F7',
                icon: Rocket,
                desc: 'Emerging 2026 nomad towns, islands & Starlink-ready retreats.'
            },
            {
                id: 'trivenly',
                label: 'Trivenly Market',
                badge: 'Creator Guides',
                color: '#F59E0B',
                icon: Briefcase,
                desc: 'Vetted local playbooks, relocation consults & flat-check videos.'
            },
            {
                id: 'flights-visa',
                label: 'Flights & Visa',
                badge: 'Route Matrix',
                color: '#3B82F6',
                icon: Plane,
                desc: 'Pair flight corridors directly with visa-free & onward ticket rules.'
            }
        ],
        renderModules: (activeTab) => {
            const list = [
                {
                    id: 'speed-test',
                    title: 'Speed Test Map • Verified Workspace Fiber',
                    tag: '100+ Mbps Spots',
                    color: 'emerald',
                    icon: Wifi,
                    component: <SpeedTestMap />
                },
                {
                    id: 'discovery',
                    title: 'Discovery Hub • Emerging Gems & Off-Grid',
                    tag: 'Starlink Ready',
                    color: 'purple',
                    icon: Rocket,
                    component: <DiscoveryHub />
                },
                {
                    id: 'trivenly',
                    title: 'Trivenly Market • Local Guides & Playbooks',
                    tag: 'Escrow Protected',
                    color: 'amber',
                    icon: Briefcase,
                    component: <TrivenlyHub />
                },
                {
                    id: 'flights-visa',
                    title: 'Flights & Visa • Route Clearance Matrix',
                    tag: 'IATA Timatic Sync',
                    color: 'blue',
                    icon: Plane,
                    component: <FlightVisaWidget />
                }
            ];
            return activeTab === 'all' ? list : list.filter((m) => m.id === activeTab);
        }
    }
};

const ConsolidatedExploreSuites = ({ suiteKey = 'culture-community', defaultTab = 'all' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { globalActiveFilters } = useNavStore();

    const suite = SUITE_DEFINITIONS[suiteKey] || SUITE_DEFINITIONS['culture-community'];

    // Determine initial tab from URL or prop
    const initialTab = useMemo(() => {
        const p = location.pathname.toLowerCase();
        for (const t of suite.tabs) {
            if (t.id !== 'all' && p.includes(t.id)) {
                return t.id;
            }
        }
        return defaultTab;
    }, [location.pathname, suite.tabs, defaultTab]);

    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    // Sync with Vertical Pill • Page Filters (NomadDock)
    useEffect(() => {
        if (Array.isArray(globalActiveFilters) && globalActiveFilters.length > 0) {
            const validIds = suite.tabs.map((t) => t.id);
            const match = globalActiveFilters.find((f) => validIds.includes(f));
            if (match) setActiveTab(match);
        }
    }, [globalActiveFilters, suite.tabs]);

    const visibleModules = suite.renderModules(activeTab);

    return (
        <div className="nomad-ai-studio-page">
            {/* Unified Suite Header */}
            <header className="ai-studio-header">
                <div className="ai-studio-hero-row">
                    <div className="ai-studio-brand">
                        <div className="ai-studio-pills">
                            <span className="ai-mesh-pill">
                                <Sparkles size={13} /> {suite.badge}
                            </span>
                            <span className="ai-live-pill">
                                <span className="pulse-dot" /> {suite.liveTag}
                            </span>
                        </div>
                        <h1>{suite.title}</h1>
                        <p>{suite.description}</p>
                    </div>

                    <div className="ai-studio-quick-bridges">
                        <button
                            type="button"
                            className="ai-bridge-btn primary"
                            onClick={() => navigate('/explore/trip-builder')}
                        >
                            <Compass size={15} />
                            <span>Trip Builder</span>
                            <ArrowRight size={14} />
                        </button>
                        <button
                            type="button"
                            className="ai-bridge-btn"
                            onClick={() => navigate('/explore/ai-studio')}
                        >
                            <Sparkles size={15} />
                            <span>Nomad AI Studio</span>
                        </button>
                        <button
                            type="button"
                            className="ai-bridge-btn"
                            onClick={() => navigate('/explore/visa')}
                        >
                            <ShieldCheck size={15} />
                            <span>Visa Hub</span>
                        </button>
                    </div>
                </div>

                {/* Module Selector Tabs */}
                <div className="ai-engine-switcher" role="tablist" aria-label={suite.title}>
                    {suite.tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`ai-engine-tab ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={
                                    isActive
                                        ? {
                                              borderColor: tab.color,
                                              boxShadow: `0 8px 25px ${tab.color}25`
                                          }
                                        : undefined
                                }
                            >
                                <div
                                    className="eng-icon-box"
                                    style={{ background: `${tab.color}20`, color: tab.color }}
                                >
                                    <Icon size={18} />
                                </div>
                                <div className="eng-tab-text">
                                    <div className="eng-tab-top">
                                        <strong>{tab.label}</strong>
                                        <span
                                            className="eng-badge"
                                            style={{ background: `${tab.color}18`, color: tab.color }}
                                        >
                                            {tab.badge}
                                        </span>
                                    </div>
                                    <span className="eng-desc">{tab.desc}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Modules Workspace */}
            <div className={`ai-engines-workspace ${activeTab === 'all' ? 'grid-mode' : 'single-mode'}`}>
                {visibleModules.map((mod) => {
                    const ModIcon = mod.icon;
                    return (
                        <section key={mod.id} className="ai-module-card" aria-label={mod.title}>
                            <div className="ai-mod-header">
                                <div className="ai-mod-title-group">
                                    <div className={`ai-mod-icon ${mod.color}`}>
                                        <ModIcon size={20} />
                                    </div>
                                    <div>
                                        <div className="ai-mod-title-row">
                                            <h2>{mod.title}</h2>
                                            <span className={`ai-mod-tag ${mod.color}`}>{mod.tag}</span>
                                        </div>
                                    </div>
                                </div>
                                {activeTab === 'all' && (
                                    <button
                                        type="button"
                                        className="ai-mod-action-btn"
                                        onClick={() => setActiveTab(mod.id)}
                                    >
                                        <span>Expand Full View</span>
                                        <ArrowRight size={13} />
                                    </button>
                                )}
                            </div>
                            <div className="consolidated-mod-body">{mod.component}</div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default ConsolidatedExploreSuites;
