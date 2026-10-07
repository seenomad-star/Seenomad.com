import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Compass, Globe, Clock, DollarSign, Wifi,
    ShieldCheck, Plus, Check, Search, Layers, ChevronDown,
    ChevronUp, BookmarkPlus, ArrowRight, Users, Plane, Bed,
    X, Eye, Calendar, MapPin, FileText
} from 'lucide-react';

// 8 Comprehensive Pre-Set Expedition Itinerary Templates with Day-by-Day Plans
export const ITINERARY_TEMPLATES_LIBRARY = [
    {
        id: 'japan-fiber-sprint',
        name: 'Tokyo & Kyoto Fiber Sprint',
        subtitle: 'High-Speed Shinkansen & Machiya Workspaces',
        routeSummary: 'Tokyo (14d) → Hakone (2d) → Kyoto (14d)',
        flag: '🇯🇵',
        region: 'Asia',
        style: 'Deep Workcation',
        durationDays: 30,
        budgetLimit: 4800,
        estimatedCost: 4464,
        avgWifiMbps: 340,
        timezone: 'UTC+9 (JST)',
        visaBadge: '90d Visa-Free / 6m J-Skip',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['1Gbps Tokyo Coliving', '14-Day JR Bullet Train', 'Kyoto Townhouse Studio', 'Hakone Onsen Reset'],
        dayByDayPlan: [
            {
                days: 'Days 1–3',
                phase: 'Tokyo Arrival & Fiber Calibration',
                location: 'Shinjuku / Shibuya, Tokyo',
                focus: 'Arrival, eSIM Activation & Deep Work Setup',
                wifiMbps: 420,
                estSpend: 980,
                activities: [
                    'Touchdown at Narita/Haneda, activate Unlimited 5G eSIM & pick up Suica IC transit card',
                    'Check into Shinjuku Roam / Hmlet Private En-Suite Loft & calibrate 1Gbps fiber desk',
                    'Evening jetlag walk through Meiji Shrine & Shibuya Sky observatory'
                ]
            },
            {
                days: 'Days 4–14',
                phase: 'Tokyo Product Sprint & Founder Meetups',
                location: 'Shibuya & Roppongi, Tokyo',
                focus: 'Core Engineering Sprint + Evening Ramen & Izakaya Circuits',
                wifiMbps: 420,
                estSpend: 1330,
                activities: [
                    '08:30–16:30 JST deep work blocks from private ergonomic suite & Daikanyama Tsutaya lounge',
                    'Mid-week Tokyo Indie Hackers & Nomad meetup in Roppongi Hills',
                    'Weekend day-trip to Kamakura coastal temples & Enoshima Island'
                ]
            },
            {
                days: 'Days 15–16',
                phase: 'Hakone Alpine Ryokan & Onsen Reset',
                location: 'Hakone & Lake Ashi',
                focus: 'Mid-Trip Digital Detox & Thermal Recovery',
                wifiMbps: 95,
                estSpend: 420,
                activities: [
                    'Activate 14-Day JR Whole Japan Pass & board Odakyu Romancecar to Hakone-Yumoto',
                    'Private open-air hot spring soak with Mount Fuji views & multi-course Kaiseki dinner',
                    'Lake Ashi pirate ship crossing & Hakone Open-Air Museum sculpture walk'
                ]
            },
            {
                days: 'Days 17–28',
                phase: 'Kyoto Machiya Artisan Townhouse Sprint',
                location: 'Karasuma Oike & Higashiyama, Kyoto',
                focus: 'Quiet Deep Work & Historic Temple Immersion',
                wifiMbps: 310,
                estSpend: 1410,
                activities: [
                    'Shinkansen bullet train to Kyoto Station; check into restored Machiya townhouse studio',
                    '06:30 sunrise walks at Fushimi Inari & Arashiyama Bamboo Grove before 09:00 standups',
                    'Shinkansen afternoon hops to Osaka Dotonbori & Nara Park using active JR Pass'
                ]
            },
            {
                days: 'Days 29–30',
                phase: 'Tokyo Wrap-Up & Departure',
                location: 'Marunouchi, Tokyo',
                focus: 'Sprint Retro, Tax-Free Gear Shopping & Return Flight',
                wifiMbps: 340,
                estSpend: 324,
                activities: [
                    'Bullet train return to Tokyo Station & final sprint retrospective at Marunouchi cafe',
                    'Akihabara & Ginza tax-free tech/camera shopping + Narita Express airport transfer'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-1', qty: 1 },
            { id: 'co-1', qty: 1 },
            { id: 'tr-2', qty: 1 },
            { id: 'co-2', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'ac-2', qty: 1 }
        ]
    },
    {
        id: 'portugal-atlantic-base',
        name: 'Lisbon & Madeira Atlantic Base',
        subtitle: 'Coastal Coliving, Surf & Schengen D8 Prep',
        routeSummary: 'Lisbon Chiado (30d) → Ponta do Sol, Madeira (15d)',
        flag: '🇵🇹',
        region: 'Europe',
        style: 'Founder Retreat',
        durationDays: 45,
        budgetLimit: 4500,
        estimatedCost: 4035,
        avgWifiMbps: 365,
        timezone: 'UTC+1 (WEST)',
        visaBadge: 'Schengen 90/180d + D8 Ready',
        travelers: 1,
        passport: 'United Kingdom (UK)',
        highlights: ['TAP Stopover Flight', 'Outsite Cais do Sodré', 'Second Home Lisboa', 'Madeira Nomad Village'],
        dayByDayPlan: [
            {
                days: 'Days 1–5',
                phase: 'Lisbon Soft Landing & Biophilic Workspace Setup',
                location: 'Cais do Sodré & Chiado, Lisbon',
                focus: 'Outsite Check-In & Second Home Onboarding',
                wifiMbps: 380,
                estSpend: 890,
                activities: [
                    'Direct arrival at Lisbon Humberto Delgado (LIS) & check into Outsite Cais do Sodré suite',
                    'Activate Second Home Lisboa biophilic workspace pass above Time Out Market',
                    'Sunset welcome dinner with resident founders at Miradouro de Santa Catarina'
                ]
            },
            {
                days: 'Days 6–20',
                phase: 'Atlantic Work Rhythm & Consular D8 Audit',
                location: 'Lisbon & Cascais Coast',
                focus: 'UK/EU + US East Coast Overlap & Residency Paperwork',
                wifiMbps: 450,
                estSpend: 1120,
                activities: [
                    'Morning deep work blocks at Second Home followed by afternoon US-East client syncs',
                    'Complete Hague Apostille & NIF/bank readiness review for Portugal D8 Nomad Visa track',
                    'Coastal train rides to Carcavelos & Cascais for afternoon surf sessions'
                ]
            },
            {
                days: 'Days 21–30',
                phase: 'Sintra & Ericeira Founder Mastermind',
                location: 'Sintra & Ericeira World Surf Reserve',
                focus: 'Executive Networking & Coastal Exploration',
                wifiMbps: 340,
                estSpend: 765,
                activities: [
                    '2-day weekend coastal retreat in Ericeira with cliffside founder mastermind roundtable',
                    'Explore Pena Palace & Quinta da Regaleira forested estates in Sintra',
                    'Wrap up Lisbon monthly coliving lease & prepare inter-island hop'
                ]
            },
            {
                days: 'Days 31–45',
                phase: 'Madeira Digital Nomad Village Island Sprint',
                location: 'Ponta do Sol & Funchal, Madeira',
                focus: 'Subtropical Ocean Villa Workcation & Levada Hikes',
                wifiMbps: 290,
                estSpend: 1260,
                activities: [
                    '90-minute TAP hop to Funchal; check into Ponta do Sol Ocean Villa',
                    'Daily coworking at John Dos Passos Cultural Center with Slack/Telegram village community',
                    'Sunrise hike at Pico do Arieiro above the clouds & Fanal ancient laurel forest'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'cw-2', qty: 1 },
            { id: 'co-4', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'in-3', qty: 1 },
            { id: 'ac-3', qty: 1 }
        ]
    },
    {
        id: 'bali-sea-corridor',
        name: 'Bali & SEA Tropical Corridor',
        subtitle: 'Tropical Pool Villa, Dual-Fiber & Biohacking Loop',
        routeSummary: 'Singapore (3d) → Canggu (30d) → Ubud (27d)',
        flag: '🇮🇩',
        region: 'Asia',
        style: 'Budget & Wellness',
        durationDays: 60,
        budgetLimit: 4200,
        estimatedCost: 3325,
        avgWifiMbps: 245,
        timezone: 'UTC+8 (WITA)',
        visaBadge: '60d e-VOA / E33G Remote KITAS',
        travelers: 2,
        passport: 'European Union (EU)',
        highlights: ['SEA Multi-City Hopper', 'Canggu Pool Coliving (60d)', 'Genki Zero-Deductible', 'Ubud Sound & Ice Recovery'],
        dayByDayPlan: [
            {
                days: 'Days 1–3',
                phase: 'Singapore Hub Transit & FinTech Setup',
                location: 'Marina Bay & Tiong Bahru, Singapore',
                focus: 'Regional Hub Stopover & Multi-Country eSIM Activation',
                wifiMbps: 310,
                estSpend: 460,
                activities: [
                    'Touchdown at Jewel Changi Airport; verify 48h onward PNR & Indonesia 60-day e-VOA QR',
                    'Coworking sprint from Marina Bay Sands area & evening Gardens by the Bay walk',
                    'Direct regional flight leg from Singapore (SIN) to Bali Ngurah Rai (DPS)'
                ]
            },
            {
                days: 'Days 4–33',
                phase: 'Canggu / Pererenan Coastal Coliving Base',
                location: 'Pererenan & Canggu, Bali',
                focus: 'High-Output Villa Work + Morning Surf & Gym Routine',
                wifiMbps: 260,
                estSpend: 1480,
                activities: [
                    'Check into Outpost / Tribal pool suite with dual-ISP fiber failover & backup power',
                    '07:00 Batu Bolong surf or Nirvana strength session before 09:30 deep work blocks',
                    'Weekly community mastermind dinners & sunset sessions at Echo Beach'
                ]
            },
            {
                days: 'Days 34–60',
                phase: 'Ubud Jungle Sanctuary & Biohacking Recovery',
                location: 'Penestanan & Sayan Ridge, Ubud',
                focus: 'Deep Creative Focus, Sound Healing & Cold Plunge Protocol',
                wifiMbps: 230,
                estSpend: 1385,
                activities: [
                    'Transition north to Ubud highland base overlooking Campuhan ridge & rice terraces',
                    'Full-day Pyramids of Chi sound healing, breathwork, ice bath & organic Balinese culinary lab',
                    'Weekend sunrise trek up Mount Batur volcano & Sidemen valley scenic drive'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-5', qty: 1 },
            { id: 'tr-6', qty: 1 },
            { id: 'co-5', qty: 2 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-4', qty: 1 }
        ]
    },
    {
        id: 'americas-timezone-loop',
        name: 'Medellín & Americas EST Loop',
        subtitle: 'Zero-Jetlag US/Canada Hours & Eternal Spring Base',
        routeSummary: 'El Poblado, Medellín (30d) → Coffee Triangle (15d)',
        flag: '🇨🇴',
        region: 'Americas',
        style: 'Deep Workcation',
        durationDays: 45,
        budgetLimit: 3800,
        estimatedCost: 1904,
        avgWifiMbps: 335,
        timezone: 'UTC-5 (EST Match)',
        visaBadge: '90d Stamp / 2-Yr Colombia V-Visa',
        travelers: 1,
        passport: 'Canada (CA)',
        highlights: ['Provenza Green Loft', 'WeWork Global 24/7 Pass', 'Starlink Mini Backup', 'Local Guardian Arrival VIP'],
        dayByDayPlan: [
            {
                days: 'Days 1–3',
                phase: 'VIP Guardian Arrival & El Poblado Loft Setup',
                location: 'Provenza, El Poblado, Medellín',
                focus: 'Zero-Friction Airport Pickup, Civica Card & Banking Setup',
                wifiMbps: 320,
                estSpend: 380,
                activities: [
                    'Private Local Guardian meets you at Rionegro (MDE) arrivals for SIM, Civica Metro card & safety briefing',
                    'Move into Provenza Green Loft with 24/7 concierge security & 300 Mbps fiber',
                    'Specialty coffee tasting walk along tree-lined Via Primavera'
                ]
            },
            {
                days: 'Days 4–30',
                phase: 'Synchronous EST/CST Product Sprint',
                location: 'El Poblado & Laureles, Medellín',
                focus: '100% North American Work Hours Overlap',
                wifiMbps: 500,
                estSpend: 1020,
                activities: [
                    'Daily 24/7 access at WeWork Milla de Oro / Astorga with private Zoom phone booths',
                    'Submit online Colombia V Digital Nomad Visa dossier via SeeNomad Consular Desk',
                    'Weekend excursion to Guatapé El Peñón monolith & lakeside boat tour'
                ]
            },
            {
                days: 'Days 31–45',
                phase: 'Andean Coffee Axis & Starlink Finca Retreat',
                location: 'Jardín & Salento Coffee Triangle',
                focus: 'Highland Finca Deep Work with Portable Satellite Uplink',
                wifiMbps: 210,
                estSpend: 504,
                activities: [
                    'Deploy Starlink Mini portable kit for 210 Mbps low-latency calls from mountain coffee finca',
                    'Hike Valle de Cocora giant wax palms & tour single-origin roast estates',
                    'Return to Medellín for farewell rooftop dinner & departure'
                ]
            }
        ],
        itemIds: [
            { id: 'co-6', qty: 1 },
            { id: 'cw-1', qty: 1 },
            { id: 'cw-4', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'ac-1', qty: 1 }
        ]
    },
    {
        id: 'euro-rail-grand-circuit',
        name: 'European High-Speed Rail Odyssey',
        subtitle: 'First-Class Eurail & Biophilic Coworking Circuit',
        routeSummary: 'Lisbon (15d) → Madrid & Barcelona (15d) → Alpine Rail (15d)',
        flag: '🇪🇺',
        region: 'Europe',
        style: 'Rail & Island Circuit',
        durationDays: 45,
        budgetLimit: 5200,
        estimatedCost: 3449,
        avgWifiMbps: 345,
        timezone: 'UTC+1 / UTC+2 (CET)',
        visaBadge: 'Schengen 45/90d Compliant',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['1st Class Eurail Pass', 'Outsite Lisbon Base', 'WeWork All-Access Europe', 'Starlink Roam + SafetyWing'],
        dayByDayPlan: [
            {
                days: 'Days 1–15',
                phase: 'Leg 1: Atlantic Gateway in Lisbon',
                location: 'Lisbon, Portugal',
                focus: 'Coastal Coliving & Iberia Route Calibration',
                wifiMbps: 350,
                estSpend: 1380,
                activities: [
                    'Transatlantic arrival into Lisbon; check into Outsite Cais do Sodré & activate Eurail 1st Class Pass',
                    'Verify Schengen 90/180-day clock & SafetyWing consular medical certificate',
                    'Two weeks of focused product work paired with Alfama & Belém golden-hour walks'
                ]
            },
            {
                days: 'Days 16–30',
                phase: 'Leg 2: Iberian High-Speed AVE Corridor',
                location: 'Madrid & Barcelona, Spain',
                focus: '300 km/h Rail Transit & WeWork European Hubs',
                wifiMbps: 500,
                estSpend: 1120,
                activities: [
                    'First-class high-speed rail across Spain with onboard power & 5G eSIM hotspotting',
                    'Work from WeWork Paseo de la Castellana (Madrid) & Glòries (Barcelona)',
                    'Evening tapas architecture walks through Eixample & Gothic Quarter'
                ]
            },
            {
                days: 'Days 31–45',
                phase: 'Leg 3: French TGV & Swiss Alpine Panorama',
                location: 'Lyon, Geneva & Zurich',
                focus: 'Scenic Quiet-Carriage Sprints & Schengen Exit Buffer',
                wifiMbps: 290,
                estSpend: 949,
                activities: [
                    'Board TGV Duplex north into the Alps using continuous 15-day Eurail Global Pass',
                    'Panoramic rail work sessions with 45 days remaining on Schengen 90-day allowance',
                    'Final sprint wrap-up at WeWork Zurich before return flight'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'tr-4', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'cw-1', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 }
        ]
    },
    {
        id: 'nomad-residency-relocation',
        name: 'Sovereign Residency & DNV Launchpad',
        subtitle: 'Full Consular Legalization, Apostille & 60-Day Soft Landing',
        routeSummary: 'Lisbon Chancery Filing (30d) → Madeira Tax Hub (30d)',
        flag: '🛡️',
        region: 'Europe',
        style: 'Visa & Relocation',
        durationDays: 60,
        budgetLimit: 5600,
        estimatedCost: 4254,
        avgWifiMbps: 350,
        timezone: 'UTC+1 (WEST)',
        visaBadge: '1–5 Yr Nomad Permit Track',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['Hague Apostille Kit', 'Consular Dossier Audit', '60d Verified Lease Proof', 'VIP Local Fixer Orientation'],
        dayByDayPlan: [
            {
                days: 'Days 1–10',
                phase: 'Consular Arrival & Legal Fixer Onboarding',
                location: 'Lisbon Diplomatic District',
                focus: 'NIF Tax ID, Bank Account & Apostille Verification',
                wifiMbps: 350,
                estSpend: 1180,
                activities: [
                    'VIP Local Guardian pickup at airport with pre-booked Finanças NIF & local bank appointment',
                    'Audit criminal record Hague Apostille, sworn translations & Genki zero-deductible health policy',
                    'Move into 30-day verified Outsite lease (accepted as consular accommodation proof)'
                ]
            },
            {
                days: 'Days 11–30',
                phase: 'Biometric Appointment & Residency Filing',
                location: 'Lisbon, Portugal',
                focus: 'AIMA / Consular Submission & Remote Work Continuity',
                wifiMbps: 350,
                estSpend: 1490,
                activities: [
                    'Complete fast-track Digital Nomad Permit dossier filing with 3x remote income verification',
                    'Maintain uninterrupted client delivery from 24/7 resident coworking lounge',
                    'Receive residency receipt & prepare secondary island base'
                ]
            },
            {
                days: 'Days 31–60',
                phase: 'Madeira Long-Term Residency Calibration',
                location: 'Ponta do Sol & Funchal, Madeira',
                focus: 'Tax-Efficient Island Base & Community Integration',
                wifiMbps: 290,
                estSpend: 1584,
                activities: [
                    'Relocate to Madeira Digital Nomad Village villa for days 31–60',
                    'Connect with international tax advisors & long-term residency holders in Funchal',
                    'Establish sustainable multi-year European base routine'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'co-4', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'in-3', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-1', qty: 1 }
        ]
    },
    {
        id: 'lean-backpacker-asia',
        name: 'Lean Asia Indie Hacker Sprint',
        subtitle: 'High-Output Solo Build Under $2,000 Total Spend',
        routeSummary: 'Bali Canggu Base (30d) + Regional Hop',
        flag: '⚡',
        region: 'Asia',
        style: 'Budget & Wellness',
        durationDays: 30,
        budgetLimit: 2200,
        estimatedCost: 1810,
        avgWifiMbps: 220,
        timezone: 'UTC+8 (SGT/WITA)',
        visaBadge: '30d Instant e-VOA + Onward PNR',
        travelers: 1,
        passport: 'Australia (AU)',
        highlights: ['Verifiable Onward PNR', '30d Tropical Coliving', 'Unlimited 5G eSIM', 'SafetyWing + Ubud Recovery'],
        dayByDayPlan: [
            {
                days: 'Days 1–3',
                phase: 'Low-Burn Arrival & Villa Desk Setup',
                location: 'Canggu, Bali',
                focus: 'Border Clearance with Onward PNR & eSIM Activation',
                wifiMbps: 240,
                estSpend: 420,
                activities: [
                    'Clear DPS immigration smoothly using pre-generated 48h verifiable onward PNR reservation',
                    'Check into 30-night coliving villa with pool & 260 Mbps dual-ISP fiber',
                    'Set up scooter rental, local warung meal rotation & $60/day max burn tracker'
                ]
            },
            {
                days: 'Days 4–24',
                phase: '21-Day Indie Product Build & Ship Cycle',
                location: 'Canggu & Pererenan, Bali',
                focus: '8-Hour Daily Coding Blocks + Low-Cost Tropical Living',
                wifiMbps: 260,
                estSpend: 1090,
                activities: [
                    'Dedicated shipping sprint with fellow indie hackers in the 24/7 air-conditioned coworking lounge',
                    'Daily $4 organic warung lunches & sunset beach runs to keep monthly burn under $1,850',
                    'Friday product demo nights & open-mic feedback sessions'
                ]
            },
            {
                days: 'Days 25–30',
                phase: 'Launch Day & Ubud Recovery Reset',
                location: 'Ubud Highlands, Bali',
                focus: 'Product Hunt Launch & Biohacking Decompression',
                wifiMbps: 200,
                estSpend: 300,
                activities: [
                    'Ship v1.0 release using dual fiber + 5G eSIM hotspot redundancy',
                    'Celebrate with full-day Ubud sound healing, ice bath & farm-to-table workshop'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-5', qty: 1 },
            { id: 'tr-6', qty: 1 },
            { id: 'co-5', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'ac-4', qty: 1 }
        ]
    },
    {
        id: 'founder-duo-offsite',
        name: 'Co-Founder Product Offsite (2-Person Split)',
        subtitle: 'Dual-Suite Executive Sprint with Satellite Failover',
        routeSummary: 'Tokyo Shinjuku (14d) → Kyoto Machiya (14d)',
        flag: '🚀',
        region: 'Asia',
        style: 'Founder Retreat',
        durationDays: 28,
        budgetLimit: 6800,
        estimatedCost: 5988,
        avgWifiMbps: 390,
        timezone: 'UTC+9 (JST)',
        visaBadge: '90d Visa-Free Business/Tourist',
        travelers: 2,
        passport: 'United States (US)',
        highlights: ['2x Return Flights', 'Shinjuku + Kyoto Suites', 'WeWork + Starlink Redundancy', 'Hakone Founder Retreat'],
        dayByDayPlan: [
            {
                days: 'Days 1–7',
                phase: 'Week 1: Tokyo Architecture & Strategy Alignment',
                location: 'Shinjuku & Shibuya, Tokyo',
                focus: 'Q3/Q4 Roadmap Whiteboarding at WeWork Tokyo',
                wifiMbps: 500,
                estSpend: 2240,
                activities: [
                    '2x direct Star Alliance flights to Tokyo; check into Shinjuku coliving executive lofts',
                    'Activate 2x WeWork All-Access memberships for private conference rooms & whiteboards',
                    'Co-founder strategy dinners in Ebisu & Omoide Yokocho'
                ]
            },
            {
                days: 'Days 8–14',
                phase: 'Week 2: High-Velocity Prototype Build & Hakone Offsite',
                location: 'Tokyo → Mount Fuji / Hakone',
                focus: 'Core Sprint + Weekend Ryokan Executive Reset',
                wifiMbps: 420,
                estSpend: 1620,
                activities: [
                    'Ship core product milestones with 1Gbps coliving fiber + Starlink Mini failover kit',
                    '2-person private Hakone Ryokan & Kaiseki retreat to review investor deck & hiring plan'
                ]
            },
            {
                days: 'Days 15–28',
                phase: 'Weeks 3–4: Kyoto Machiya Townhouse Deep Polish',
                location: 'Karasuma Oike, Kyoto',
                focus: 'UI/UX Polish, Investor Calls & Departure',
                wifiMbps: 350,
                estSpend: 2128,
                activities: [
                    'Relocate to private Kyoto Machiya townhouse with dedicated garden workspace studio',
                    'Covered by 2x Genki zero-deductible policies; split all shared lodging & rail costs 50/50',
                    'Final product sign-off & bullet train return to Tokyo for departure'
                ]
            }
        ],
        itemIds: [
            { id: 'tr-1', qty: 2 },
            { id: 'co-1', qty: 1 },
            { id: 'co-2', qty: 1 },
            { id: 'cw-1', qty: 2 },
            { id: 'cw-4', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-2', qty: 2 }
        ]
    }
];

const CATEGORY_LABELS = {
    transit: { label: 'Flights & Rail', color: '#3B82F6' },
    coliving: { label: 'Coliving & Stays', color: '#A855F7' },
    coworking: { label: '24/7 Fiber & eSIM', color: '#10B981' },
    insurance: { label: 'Visa & Medical', color: '#F59E0B' },
    activities: { label: 'Local Immersion', color: '#EC4899' }
};

const ItineraryTemplatesLibrary = ({
    templates = ITINERARY_TEMPLATES_LIBRARY,
    catalogItems = [],
    activeTemplateId,
    onLoadTemplate,
    onAppendTemplate,
    onSaveCurrentAsTemplate,
    currentItemsCount = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [styleFilter, setStyleFilter] = useState('All');
    const [previewTemplate, setPreviewTemplate] = useState(null);

    const regions = ['All', 'Asia', 'Europe', 'Americas'];
    const styles = ['All', 'Deep Workcation', 'Founder Retreat', 'Budget & Wellness', 'Rail & Island Circuit', 'Visa & Relocation'];

    // Close preview modal on Escape key
    useEffect(() => {
        if (!previewTemplate) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setPreviewTemplate(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewTemplate]);

    const filteredTemplates = useMemo(() => {
        return templates.filter((tpl) => {
            if (regionFilter !== 'All' && tpl.region !== regionFilter) return false;
            if (styleFilter !== 'All' && tpl.style !== styleFilter) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const hay = `${tpl.name} ${tpl.subtitle} ${tpl.routeSummary} ${tpl.region} ${tpl.style} ${tpl.visaBadge} ${(tpl.highlights || []).join(' ')}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [templates, regionFilter, styleFilter, searchQuery]);

    // Resolve full catalog module details for the currently previewed template
    const resolvedPreviewModules = useMemo(() => {
        if (!previewTemplate || !Array.isArray(previewTemplate.itemIds)) return [];
        return previewTemplate.itemIds
            .map((entry) => {
                const found = catalogItems.find((c) => c.id === entry.id);
                if (!found) return null;
                return {
                    ...found,
                    qty: entry.qty || 1,
                    lineTotal: (found.price || 0) * (entry.qty || 1)
                };
            })
            .filter(Boolean);
    }, [previewTemplate, catalogItems]);

    // Build fallback day-by-day schedule for user-saved custom templates if dayByDayPlan isn't defined
    const resolvedDayByDayPlan = useMemo(() => {
        if (!previewTemplate) return [];
        if (Array.isArray(previewTemplate.dayByDayPlan) && previewTemplate.dayByDayPlan.length > 0) {
            return previewTemplate.dayByDayPlan;
        }
        if (resolvedPreviewModules.length === 0) return [];
        const totalDays = previewTemplate.durationDays || 30;
        const chunk = Math.max(1, Math.floor(totalDays / resolvedPreviewModules.length));
        return resolvedPreviewModules.map((mod, idx) => {
            const startDay = idx * chunk + 1;
            const endDay = idx === resolvedPreviewModules.length - 1 ? totalDays : (idx + 1) * chunk;
            return {
                days: `Days ${startDay}–${endDay}`,
                phase: mod.title,
                location: `${mod.flag || '🌐'} ${mod.country || 'Global'}`,
                focus: `${mod.provider} • ${mod.duration}`,
                wifiMbps: mod.wifiMbps || previewTemplate.avgWifiMbps || 250,
                estSpend: mod.lineTotal,
                activities: [
                    mod.note || `Configured ${mod.unitLabel} (${mod.qty}x)`,
                    `Duration window: ${mod.duration}`
                ]
            };
        });
    }, [previewTemplate, resolvedPreviewModules]);

    return (
        <section className="tb-templates-library" aria-label="Pre-Set Itinerary Templates Library">
            {/* Library Header Bar */}
            <div className="tb-lib-header">
                <div className="tb-lib-title-group">
                    <div className="tb-lib-icon-badge">
                        <Layers size={18} />
                    </div>
                    <div>
                        <div className="tb-lib-title-row">
                            <h2>Pre-Set Itinerary Templates Library</h2>
                            <span className="tb-lib-count-pill">{templates.length} Verified Starting Blueprints</span>
                        </div>
                        <p>
                            Inspect the day-by-day plan in <strong>Preview</strong>, load a blueprint as your starting point, or append modules to your current build.
                        </p>
                    </div>
                </div>

                <div className="tb-lib-header-actions">
                    {currentItemsCount > 0 && onSaveCurrentAsTemplate && (
                        <button
                            type="button"
                            className="tb-lib-save-btn"
                            onClick={onSaveCurrentAsTemplate}
                            title="Save your current timeline as a reusable template in this library"
                        >
                            <BookmarkPlus size={14} />
                            <span>Save Current Trip as Template</span>
                        </button>
                    )}
                    <button
                        type="button"
                        className="tb-lib-collapse-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                    >
                        <span>{isExpanded ? 'Hide Template Library' : `Browse Templates (${templates.length})`}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        className="tb-lib-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Search, Region & Style Filter Bar */}
                        <div className="tb-lib-controls">
                            <div className="tb-lib-search">
                                <Search size={14} className="tb-lib-search-icon" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search templates by city, route, visa track, or style..."
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="tb-lib-search-clear"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Clear template search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            <div className="tb-lib-filter-group">
                                <span className="tb-lib-filter-lbl">REGION:</span>
                                {regions.map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        className={`tb-lib-chip ${regionFilter === r ? 'active' : ''}`}
                                        onClick={() => setRegionFilter(r)}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>

                            <div className="tb-lib-filter-group">
                                <span className="tb-lib-filter-lbl">STYLE:</span>
                                {styles.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`tb-lib-chip ${styleFilter === s ? 'active' : ''}`}
                                        onClick={() => setStyleFilter(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Templates Grid */}
                        <div className="tb-lib-grid">
                            {filteredTemplates.map((tpl) => {
                                const isActive = activeTemplateId === tpl.id;
                                const dailyAvg = Math.round((tpl.estimatedCost || tpl.budgetLimit) / Math.max(1, tpl.durationDays));

                                return (
                                    <article
                                        key={tpl.id}
                                        className={`tb-tpl-card ${isActive ? 'is-active' : ''}`}
                                    >
                                        <div className="tb-tpl-top">
                                            <div className="tb-tpl-badges">
                                                <span className="tb-tpl-region-pill">
                                                    {tpl.flag} {tpl.region}
                                                </span>
                                                <span className="tb-tpl-style-pill">{tpl.style}</span>
                                            </div>
                                            {isActive && (
                                                <span className="tb-tpl-loaded-badge">
                                                    <Check size={11} /> Active Blueprint
                                                </span>
                                            )}
                                        </div>

                                        <div className="tb-tpl-MainInfo">
                                            <h3>{tpl.name}</h3>
                                            <p className="tb-tpl-route">{tpl.routeSummary}</p>
                                        </div>

                                        {/* Key Telemetry Metrics */}
                                        <div className="tb-tpl-metrics">
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">DURATION</span>
                                                <strong className="m-val">{tpl.durationDays} Days</strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">EST. COST</span>
                                                <strong className="m-val text-emerald">
                                                    ${(tpl.estimatedCost || tpl.budgetLimit).toLocaleString()}
                                                </strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">DAILY BURN</span>
                                                <strong className="m-val">${dailyAvg}/d</strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">FIBER AVG</span>
                                                <strong className="m-val text-sky">{tpl.avgWifiMbps} Mbps</strong>
                                            </div>
                                        </div>

                                        {/* Visa & Timezone Strip */}
                                        <div className="tb-tpl-visa-row">
                                            <span className="tb-tpl-visa-tag">
                                                <ShieldCheck size={12} /> {tpl.visaBadge}
                                            </span>
                                            <span className="tb-tpl-tz-tag">
                                                <Clock size={11} /> {tpl.timezone}
                                            </span>
                                        </div>

                                        {/* Included Highlights */}
                                        <div className="tb-tpl-highlights">
                                            {(tpl.highlights || []).map((h, i) => (
                                                <span key={i} className="tb-tpl-hl-chip">
                                                    • {h}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Card Footer Actions */}
                                        <div className="tb-tpl-actions">
                                            <button
                                                type="button"
                                                className="tb-tpl-preview-btn"
                                                onClick={() => setPreviewTemplate(tpl)}
                                                title="Inspect the full day-by-day plan and included modules before loading"
                                            >
                                                <Eye size={14} />
                                                <span>Preview</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`tb-tpl-load-btn ${isActive ? 'loaded' : ''}`}
                                                onClick={() => onLoadTemplate(tpl)}
                                            >
                                                {isActive ? <Check size={14} /> : <Sparkles size={14} />}
                                                <span>
                                                    {isActive
                                                        ? 'Reload'
                                                        : `Load (${tpl.itemIds.length})`}
                                                </span>
                                            </button>
                                            {onAppendTemplate && (
                                                <button
                                                    type="button"
                                                    className="tb-tpl-append-btn"
                                                    onClick={() => onAppendTemplate(tpl)}
                                                    title="Append this template's modules onto your current timeline without erasing existing items"
                                                >
                                                    <Plus size={14} />
                                                    <span>Append</span>
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Day-by-Day Itinerary Template Preview Modal */}
            <AnimatePresence>
                {previewTemplate && (
                    <div
                        className="tb-preview-modal-backdrop"
                        onClick={() => setPreviewTemplate(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tb-preview-modal-title"
                    >
                        <motion.div
                            className="tb-preview-modal-card"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Modal Header */}
                            <header className="tb-preview-header">
                                <div className="tb-preview-title-wrap">
                                    <div className="tb-preview-badges">
                                        <span className="tb-preview-pill-primary">
                                            <Eye size={12} /> DAY-BY-DAY BLUEPRINT PREVIEW
                                        </span>
                                        <span className="tb-tpl-region-pill">
                                            {previewTemplate.flag} {previewTemplate.region}
                                        </span>
                                        <span className="tb-tpl-style-pill">{previewTemplate.style}</span>
                                        <span className="tb-tpl-visa-tag">
                                            <ShieldCheck size={12} /> {previewTemplate.visaBadge}
                                        </span>
                                    </div>
                                    <h2 id="tb-preview-modal-title">{previewTemplate.name}</h2>
                                    <p className="tb-preview-subtitle">
                                        {previewTemplate.subtitle} — <strong>{previewTemplate.routeSummary}</strong>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="tb-preview-close-btn"
                                    onClick={() => setPreviewTemplate(null)}
                                    aria-label="Close template preview"
                                >
                                    <X size={18} />
                                </button>
                            </header>

                            {/* Telemetry Summary Strip */}
                            <div className="tb-preview-kpi-strip">
                                <div className="tb-preview-kpi">
                                    <span className="k-lbl">TOTAL DURATION</span>
                                    <strong className="k-val">{previewTemplate.durationDays} Days</strong>
                                    <span className="k-sub">{resolvedDayByDayPlan.length} Phased Legs</span>
                                </div>
                                <div className="tb-preview-kpi">
                                    <span className="k-lbl">ESTIMATED SPEND</span>
                                    <strong className="k-val text-emerald">
                                        ${(previewTemplate.estimatedCost || previewTemplate.budgetLimit).toLocaleString()}
                                    </strong>
                                    <span className="k-sub">
                                        Cap: ${previewTemplate.budgetLimit.toLocaleString()} • $
                                        {Math.round(
                                            (previewTemplate.estimatedCost || previewTemplate.budgetLimit) /
                                                Math.max(1, previewTemplate.durationDays)
                                        )}
                                        /day
                                    </span>
                                </div>
                                <div className="tb-preview-kpi">
                                    <span className="k-lbl">AVG WORKSPACE FIBER</span>
                                    <strong className="k-val text-sky">{previewTemplate.avgWifiMbps} Mbps</strong>
                                    <span className="k-sub">{previewTemplate.timezone}</span>
                                </div>
                                <div className="tb-preview-kpi">
                                    <span className="k-lbl">PARTY & PASSPORT</span>
                                    <strong className="k-val">
                                        {previewTemplate.travelers} {previewTemplate.travelers === 1 ? 'Nomad' : 'Nomads'}
                                    </strong>
                                    <span className="k-sub">{previewTemplate.passport}</span>
                                </div>
                            </div>

                            {/* Modal Body: Left Day-by-Day Timeline + Right Included Resource Modules */}
                            <div className="tb-preview-body-grid">
                                {/* Left Column: Day-by-Day Expedition Schedule */}
                                <div className="tb-preview-day-column">
                                    <div className="tb-preview-section-head">
                                        <h3>
                                            <Calendar size={16} /> Day-by-Day Expedition Plan
                                        </h3>
                                        <span>{previewTemplate.durationDays}-Day Phased Schedule</span>
                                    </div>

                                    <div className="tb-preview-timeline">
                                        {resolvedDayByDayPlan.map((stage, idx) => (
                                            <div key={idx} className="tb-preview-stage-card">
                                                <div className="tb-stage-marker">
                                                    <span className="tb-stage-num">{idx + 1}</span>
                                                    {idx < resolvedDayByDayPlan.length - 1 && (
                                                        <div className="tb-stage-line" />
                                                    )}
                                                </div>

                                                <div className="tb-stage-content">
                                                    <div className="tb-stage-top">
                                                        <span className="tb-stage-days-badge">{stage.days}</span>
                                                        <span className="tb-stage-loc">
                                                            <MapPin size={12} /> {stage.location}
                                                        </span>
                                                        <div className="tb-stage-telemetry">
                                                            {stage.wifiMbps > 0 && (
                                                                <span className="tb-stage-wifi">
                                                                    <Wifi size={11} /> {stage.wifiMbps} Mbps
                                                                </span>
                                                            )}
                                                            {stage.estSpend > 0 && (
                                                                <span className="tb-stage-cost">
                                                                    ${stage.estSpend.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <h4>{stage.phase}</h4>
                                                    <p className="tb-stage-focus">{stage.focus}</p>

                                                    <ul className="tb-stage-activities">
                                                        {(stage.activities || []).map((act, i) => (
                                                            <li key={i}>{act}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Pre-Configured Resource Modules */}
                                <div className="tb-preview-modules-column">
                                    <div className="tb-preview-section-head">
                                        <h3>
                                            <Layers size={16} /> Included Resource Modules
                                        </h3>
                                        <span>{resolvedPreviewModules.length} Verified Blocks</span>
                                    </div>

                                    <div className="tb-preview-modules-list">
                                        {resolvedPreviewModules.map((mod, idx) => {
                                            const catMeta = CATEGORY_LABELS[mod.type] || {
                                                label: mod.type,
                                                color: '#38BDF8'
                                            };
                                            return (
                                                <div key={`${mod.id}-${idx}`} className="tb-preview-mod-item">
                                                    <div className="tb-pmod-top">
                                                        <span
                                                            className="tb-pmod-cat"
                                                            style={{
                                                                background: `${catMeta.color}18`,
                                                                color: catMeta.color,
                                                                borderColor: `${catMeta.color}40`
                                                            }}
                                                        >
                                                            {catMeta.label}
                                                        </span>
                                                        <span className="tb-pmod-country">
                                                            {mod.flag} {mod.country}
                                                        </span>
                                                        <strong className="tb-pmod-price">
                                                            ${mod.lineTotal.toLocaleString()}
                                                            {mod.qty > 1 ? ` (${mod.qty}x)` : ''}
                                                        </strong>
                                                    </div>
                                                    <h5>{mod.title}</h5>
                                                    <div className="tb-pmod-meta">
                                                        <span>{mod.provider}</span>
                                                        <span>•</span>
                                                        <span>{mod.duration}</span>
                                                    </div>
                                                    {mod.note && <p className="tb-pmod-note">{mod.note}</p>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <footer className="tb-preview-footer">
                                <button
                                    type="button"
                                    className="tb-preview-cancel-btn"
                                    onClick={() => setPreviewTemplate(null)}
                                >
                                    Close Preview
                                </button>

                                <div className="tb-preview-cta-group">
                                    {onAppendTemplate && (
                                        <button
                                            type="button"
                                            className="tb-preview-append-cta"
                                            onClick={() => {
                                                onAppendTemplate(previewTemplate);
                                                setPreviewTemplate(null);
                                            }}
                                        >
                                            <Plus size={15} />
                                            <span>Append {previewTemplate.itemIds.length} Modules to Current Trip</span>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="tb-preview-load-cta"
                                        onClick={() => {
                                            onLoadTemplate(previewTemplate);
                                            setPreviewTemplate(null);
                                        }}
                                    >
                                        <Sparkles size={15} />
                                        <span>Load Full Template into Active Itinerary</span>
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            </footer>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ItineraryTemplatesLibrary;
