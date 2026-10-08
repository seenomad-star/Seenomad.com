import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Globe,
    MapPin,
    Compass,
    Layers,
    Sparkles,
    Eye,
    Play,
    Pause,
    RotateCcw,
    Clock,
    Wifi,
    Sun,
    DollarSign,
    ShieldCheck,
    Plus,
    X,
    ArrowUpRight,
    Radio,
    Camera,
    Navigation,
    Maximize2,
    Minimize2,
    Volume2,
    VolumeX,
    Building2,
    GraduationCap,
    Calendar,
    Cpu,
    CheckCircle2,
    ChevronRight,
    Search
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../../../styles/HoloAtlasTravelMap.css';

const DOMAIN_LENSES = [
    {
        id: 'all',
        label: 'All Spatial Portals',
        shortLabel: 'All Portals',
        icon: Globe,
        accent: '#38bdf8',
        description: 'Universal view across Travel, Heritage, Real Estate, Campus & Future Worlds'
    },
    {
        id: 'travel-tourism',
        label: 'Travel & Nomad Hubs',
        shortLabel: 'Travel & Tourism',
        icon: Compass,
        accent: '#0284c7',
        description: 'Destinations, live visa status, Starlink cafes, and scenic drone corridors'
    },
    {
        id: 'cultural-heritage',
        label: 'Museums & Historical',
        shortLabel: 'Heritage & Museums',
        icon: GraduationCap,
        accent: '#f59e0b',
        description: '4D time-machine reconstructions of ancient wonders, temples & galleries'
    },
    {
        id: 'real-estate',
        label: 'Architecture & Stays',
        shortLabel: 'Real Estate & Stays',
        icon: Building2,
        accent: '#10b981',
        description: 'Virtual property walkthroughs, coliving villas, and resort twin inspections'
    },
    {
        id: 'events-venues',
        label: 'Festivals & Expo Venues',
        shortLabel: 'Events & Venues',
        icon: Calendar,
        accent: '#ec4899',
        description: 'Live stage layouts, global summit arenas, and interactive venue twins'
    },
    {
        id: 'futuristic-worlds',
        label: 'Sci-Fi & Future Concepts',
        shortLabel: 'Future & Orbital',
        icon: Cpu,
        accent: '#a855f7',
        description: 'Floating ocean cities, orbital habitats, and next-century smart metropolises'
    }
];

const INITIAL_SPATIAL_NODES = [
    {
        id: 'node-kyoto',
        name: 'Arashiyama & Machiya Cyber-Heritage District',
        city: 'Kyoto, Japan',
        domain: 'cultural-heritage',
        domainBadge: 'Heritage & Nomad Hub',
        coordinates: '35.0094° N, 135.6670° E',
        mapX: 81,
        mapY: 36,
        rating: 4.98,
        liveExplorers: 1420,
        telemetry: {
            metric1Label: 'Connectivity',
            metric1Value: '610 Mbps Optical',
            metric2Label: 'Atmosphere',
            metric2Value: '19°C · Cedar Mist',
            metric3Label: 'Access / Cost',
            metric3Value: '$65 / day · Visa-Free'
        },
        soundscape: 'Kyoto Bamboo Rain + Koto Spatial Audio (432 Hz)',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4',
        panoramaImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&auto=format&fit=crop&q=85',
        summary: 'Step inside a 360° volumetric twin of Arashiyama Bamboo Grove and inspect restored 120-year-old Machiya coworking sanctuaries.',
        eras: {
            past: {
                year: '1603 AD · Edo Period',
                title: 'Imperial Timber Sanctuary & Tea House Route',
                desc: 'Original stone lanterns, hand-carved cedar shrines, and ceremonial matcha pavilions along the Katsura River.'
            },
            present: {
                year: '2026 AD · Live Digital Twin',
                title: 'Fiber-Connected Heritage & Quiet Nomad Sanctuaries',
                desc: 'Live crowd density at 18%. 14 verified Machiya coworking hubs operating with 610 Mbps symmetrical fiber.'
            },
            future: {
                year: '2050 AD · Autonomous Eco-Corridor',
                title: 'Zero-Emission Kinetic Footpaths & Holographic Lore',
                desc: 'AR architectural overlays project historical Edo artisans while preserving 100% of the ancient bamboo canopy.'
            }
        },
        hotspots: [
            { id: 'h1', x: 28, y: 52, label: 'Bamboo Canopy Walk (360°)', detail: 'Spatial acoustic zone · 42 dB tranquility' },
            { id: 'h2', x: 64, y: 44, label: 'Machiya Studio Hub', detail: '610 Mbps Fiber · 8 open desk passes' },
            { id: 'h3', x: 48, y: 72, label: 'Katsura River Tea Deck', detail: ' ceremonial matcha & river view' }
        ]
    },
    {
        id: 'node-uluwatu',
        name: 'Uluwatu Cliffside Villa & Surf Amphitheater',
        city: 'Bali, Indonesia',
        domain: 'real-estate',
        domainBadge: 'Architecture & Villa Twin',
        coordinates: '8.8291° S, 115.0849° E',
        mapX: 76,
        mapY: 63,
        rating: 4.95,
        liveExplorers: 1890,
        telemetry: {
            metric1Label: 'Villa Connectivity',
            metric1Value: '295 Mbps Starlink',
            metric2Label: 'Ocean Swell',
            metric2Value: '28°C · 6ft Reef Break',
            metric3Label: 'Lease / Night',
            metric3Value: '$110 / night · Coliving'
        },
        soundscape: 'Indian Ocean Cliff Swell + Ambient Sunset',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
        panoramaImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&auto=format&fit=crop&q=85',
        summary: 'Interactive architectural twin of cliffside glass villas, infinity coworking decks, and reef-break surf telemetry.',
        eras: {
            past: {
                year: '1050 AD · Ancient Sea Temple',
                title: 'Limestone Promontory & Sacred Mariners Shrine',
                desc: 'Unconquered southern limestone cliffs guiding ancient spice-route outriggers across the Indian Ocean.'
            },
            present: {
                year: '2026 AD · Live Property & Nomad Twin',
                title: 'Solar-Powered Cliffside Coliving & Surf Hub',
                desc: 'Walk through 3D floorplans, inspect acoustic glass pods, and verify real-time Starlink latency before booking.'
            },
            future: {
                year: '2050 AD · Regenerative Reef Architecture',
                title: 'Tidal-Powered Bio-Villas & Desalination Gardens',
                desc: 'Self-sustaining coastal habitats generating 140% net-positive clean energy from ocean swell kinetics.'
            }
        },
        hotspots: [
            { id: 'h1', x: 35, y: 40, label: 'Infinity Glass Work Pod', detail: '360° Ocean Horizon · Dual 5K Studio Display' },
            { id: 'h2', x: 70, y: 58, label: 'Sunset Amphitheater Deck', detail: 'Accommodates 45 creators · Spatial sound' },
            { id: 'h3', x: 22, y: 74, label: 'Private Reef Access Stairs', detail: 'Direct tide-pool & surf launch point' }
        ]
    },
    {
        id: 'node-giza',
        name: 'Giza Plateau & Grand Archaeological Virtual Tour',
        city: 'Cairo, Egypt',
        domain: 'cultural-heritage',
        domainBadge: 'Volumetric Museum Tour',
        coordinates: '29.9792° N, 31.1342° E',
        mapX: 56,
        mapY: 43,
        rating: 4.99,
        liveExplorers: 3120,
        telemetry: {
            metric1Label: 'Scan Fidelity',
            metric1Value: '1.4B LiDAR Points',
            metric2Label: 'Interior Access',
            metric2Value: 'King’s Chamber Unlocked',
            metric3Label: 'Guided Tour',
            metric3Value: 'Multi-Language AI Docent'
        },
        soundscape: 'Desert Wind Harmonics + Acoustic Chamber Echo',
        videoUrl: '',
        panoramaImg: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1400&auto=format&fit=crop&q=85',
        summary: 'Universal educational & museum virtual tour: inspect interior corridors, hieroglyphic translations, and 2560 BC original casing stones.',
        eras: {
            past: {
                year: '2560 BC · Fourth Dynasty',
                title: 'Polished Tura Limestone & Electrum Capstone',
                desc: 'Experience the Great Pyramid gleaming white under the Egyptian sun with the original Nile harbor canal.'
            },
            present: {
                year: '2026 AD · LiDAR Preservation Twin',
                title: 'Non-Invasive Subterranean Muon Scan & Virtual Walk',
                desc: 'Explore restricted internal shafts and the Grand Egyptian Museum gallery connection from any browser.'
            },
            future: {
                year: '2050 AD · Holographic Heritage Dome',
                title: 'Climate-Shielded Archaeological Preservation Zone',
                desc: 'Light-field projection reconstructs ancient Memphis in real time for global remote classrooms.'
            }
        },
        hotspots: [
            { id: 'h1', x: 48, y: 34, label: 'Apex Summit Telemetry', detail: '138.5m Elevation · 360° Cairo Skyline' },
            { id: 'h2', x: 54, y: 62, label: 'Grand Gallery Interior Portal', detail: 'Corbelled limestone vault walkthrough' },
            { id: 'h3', x: 26, y: 68, label: 'Solar Barque Sanctuary', detail: '4,500-year-old cedar vessel exhibit' }
        ]
    },
    {
        id: 'node-lisbon',
        name: 'Alfama & Tagus Waterfront Innovation Hub',
        city: 'Lisbon, Portugal',
        domain: 'travel-tourism',
        domainBadge: 'Travel & Nomad Capital',
        coordinates: '38.7223° N, 9.1393° W',
        mapX: 45,
        mapY: 35,
        rating: 4.94,
        liveExplorers: 1640,
        telemetry: {
            metric1Label: 'City Mesh Wi-Fi',
            metric1Value: '500 Mbps 5G/Fiber',
            metric2Label: 'Solar Index',
            metric2Value: '24°C · 300 Sunny Days',
            metric3Label: 'D8 Nomad Visa',
            metric3Value: '94% Approval Rate'
        },
        soundscape: 'Tram 28 Brass Bell + Atlantic Breeze & Fado Guitar',
        videoUrl: '',
        panoramaImg: 'https://images.unsplash.com/photo-1585211756843-dc3828965111?w=1400&auto=format&fit=crop&q=85',
        summary: 'Explore terraced miradouros, historic tram corridors, and Europe’s highest concentration of remote tech founders.',
        eras: {
            past: {
                year: '1515 AD · Age of Discovery',
                title: 'Ribeira Shipyards & Maritime Cartography Guilds',
                desc: 'Caravels departing Belém along the Tagus estuary with hand-drawn celestial navigation charts.'
            },
            present: {
                year: '2026 AD · Atlantic Tech & Nomad Hub',
                title: 'Miradouro Rooftop Workspaces & Web Summit District',
                desc: 'Live tram tracking, verified coliving residences in Santos, and instant community meetup pins.'
            },
            future: {
                year: '2050 AD · Blue-Economy Autonomous Port',
                title: 'Solar Ferry Network & Pedestrian Sky-Miradouros',
                desc: 'Seamless high-speed rail to Madrid and zero-carbon coastal boardwalks across the Tagus.'
            }
        },
        hotspots: [
            { id: 'h1', x: 38, y: 48, label: 'Miradouro de Santa Luzia', detail: 'Panoramic terracotta roof & river overlook' },
            { id: 'h2', x: 62, y: 65, label: 'LX Factory Creative Campus', detail: '42 startups · Roastery & rooftop library' },
            { id: 'h3', x: 25, y: 60, label: 'Time Out Culinary Hall', detail: '26 Michelin-curated food stalls' }
        ]
    },
    {
        id: 'node-lofoten',
        name: 'Arctic Aurora Observatory & Fjord Dome Arena',
        city: 'Lofoten, Norway',
        domain: 'events-venues',
        domainBadge: 'Immersive Summit Venue',
        coordinates: '68.2086° N, 13.8825° E',
        mapX: 51,
        mapY: 18,
        rating: 4.97,
        liveExplorers: 980,
        telemetry: {
            metric1Label: 'KP Aurora Index',
            metric1Value: 'KP 6.4 Active Storm',
            metric2Label: 'Venue Capacity',
            metric2Value: '600 Glass Igloo Seats',
            metric3Label: 'Energy Grid',
            metric3Value: '100% Hydroelectric'
        },
        soundscape: 'Sub-Zero Fjord Resonance + Geomagnetic Synth',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
        panoramaImg: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1400&auto=format&fit=crop&q=85',
        summary: 'Inspect the glass-domed Arctic symposium arena, test seat sightlines under the Northern Lights, and plan hybrid global events.',
        eras: {
            past: {
                year: '850 AD · Viking Longhouse Fjord',
                title: 'Lofotr Chieftain Hall & Arctic Waystation',
                desc: 'Timber-framed turf halls sheltering Norse navigators beneath the polar aurora.'
            },
            present: {
                year: '2026 AD · Geodesic Aurora Event Venue',
                title: '360° Heated Glass Amphitheater & Fjord Saunas',
                desc: 'Host product keynotes, music residencies, or creator retreats with live aurora telemetry.'
            },
            future: {
                year: '2050 AD · Stratospheric Sky-Deck',
                title: 'Tethered Aerostat Viewing Ring at 12,000 Feet',
                desc: 'Above-cloud aurora observation deck with zero light pollution and holographic stage acoustics.'
            }
        },
        hotspots: [
            { id: 'h1', x: 50, y: 30, label: 'Aurora Zenith Glass Dome', detail: 'Unobstructed 180° sky canopy' },
            { id: 'h2', x: 32, y: 66, label: 'Floating Fjord Sauna Dock', detail: '42°C Cedar Sauna + Arctic Plunge' },
            { id: 'h3', x: 72, y: 55, label: 'Spatial Audio Mainstage', detail: 'Dolby Atmos 64-channel dome array' }
        ]
    },
    {
        id: 'node-neosol',
        name: 'Oceanix Neo-Sol Floating Biosphere & Orbital Port',
        city: 'Equatorial Pacific · 2050 Concept',
        domain: 'futuristic-worlds',
        domainBadge: 'Future World & Sci-Fi Sim',
        coordinates: '0.0000° N, 160.0000° W',
        mapX: 18,
        mapY: 56,
        rating: 5.0,
        liveExplorers: 2740,
        telemetry: {
            metric1Label: 'Quantum Uplink',
            metric1Value: '100 Gbps Laser Mesh',
            metric2Label: 'Habitat Gravity',
            metric2Value: '1.0G / Orbital Shuttle',
            metric3Label: 'Biosphere Status',
            metric3Value: 'Net-Zero Closed Loop'
        },
        soundscape: 'Biorock Coral Harmonics + Stratospheric Drone Hum',
        videoUrl: '',
        panoramaImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&auto=format&fit=crop&q=85',
        summary: 'Futuristic spatial blueprint: tour a modular hexagonal floating metropolis, vertical aeroponic farms, and sub-orbital launch pads.',
        eras: {
            past: {
                year: '2024 AD · Blueprint Conception',
                title: 'UN-Habitat Modular Floating City Prototype',
                desc: 'Initial marine engineering simulations for hurricane-resilient hexagonal ocean platforms.'
            },
            present: {
                year: '2026 AD · Interactive Architectural Simulation',
                title: 'Full-Scale Spatial Twin for Urban Planners & Creators',
                desc: 'Test autonomous water-taxi routes, underwater research labs, and modular housing pods.'
            },
            future: {
                year: '2050 AD · Operational Oceanix Polis',
                title: '50,000-Resident Floating Research & Spaceport Hub',
                desc: 'Connected via 45-minute point-to-point sub-orbital hops to Tokyo, San Francisco, and Sydney.'
            }
        },
        hotspots: [
            { id: 'h1', x: 46, y: 42, label: 'Central Aeroponic Sky-Tower', detail: 'Produces 12 tons of organic harvest weekly' },
            { id: 'h2', x: 74, y: 64, label: 'Sub-Surface Coral Observatory', detail: '18m below sea level · 360° acrylic tunnel' },
            { id: 'h3', x: 24, y: 50, label: 'VTOL & Maglev Transit Ring', detail: 'Zero-emission inter-island shuttle dock' }
        ]
    }
];

const HoloAtlasTravelMap = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [nodes, setNodes] = useState(INITIAL_SPATIAL_NODES);
    const [activeDomain, setActiveDomain] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNodeId, setSelectedNodeId] = useState('node-kyoto');
    const [viewSurface, setViewSurface] = useState('split'); // 'split' | 'map-only' | 'portal-360'
    const [timeEra, setTimeEra] = useState('present'); // 'past' | 'present' | 'future'
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [isSoundOn, setIsSoundOn] = useState(false);

    // Virtual Tour Autopilot Drone Route
    const [routeQueue, setRouteQueue] = useState(['node-lisbon', 'node-giza', 'node-kyoto', 'node-uluwatu']);
    const [isAutopilotPlaying, setIsAutopilotPlaying] = useState(false);

    // Custom Virtual Place Creator Modal
    const [isCreatePortalOpen, setIsCreatePortalOpen] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customCity, setCustomCity] = useState('');
    const [customDomain, setCustomDomain] = useState('travel-tourism');
    const [customSummary, setCustomSummary] = useState('');
    const [customImage, setCustomImage] = useState('');

    const filteredNodes = useMemo(() => {
        return nodes.filter((n) => {
            const matchesDomain = activeDomain === 'all' || n.domain === activeDomain;
            if (!matchesDomain) return false;
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                n.name.toLowerCase().includes(q) ||
                n.city.toLowerCase().includes(q) ||
                n.domainBadge.toLowerCase().includes(q) ||
                n.summary.toLowerCase().includes(q)
            );
        });
    }, [nodes, activeDomain, searchQuery]);

    const selectedNode = useMemo(() => {
        return (
            nodes.find((n) => n.id === selectedNodeId) ||
            filteredNodes[0] ||
            nodes[0]
        );
    }, [nodes, selectedNodeId, filteredNodes]);

    const currentEraData = selectedNode?.eras?.[timeEra] || selectedNode?.eras?.present;

    // Autopilot Drone Flythrough Timer
    useEffect(() => {
        if (!isAutopilotPlaying || routeQueue.length === 0) return;
        const interval = setInterval(() => {
            setSelectedNodeId((prevId) => {
                const idx = routeQueue.indexOf(prevId);
                const nextIdx = (idx + 1) % routeQueue.length;
                const nextNodeId = routeQueue[nextIdx];
                const nextNode = nodes.find((n) => n.id === nextNodeId);
                if (nextNode) {
                    addToast(`Drone Autopilot teleported to ${nextNode.city} 🛸`, 'info');
                }
                return nextNodeId;
            });
        }, 4500);
        return () => clearInterval(interval);
    }, [isAutopilotPlaying, routeQueue, nodes, addToast]);

    const handleToggleRoutePin = (nodeId) => {
        setRouteQueue((prev) => {
            if (prev.includes(nodeId)) {
                if (prev.length <= 2) {
                    addToast('Virtual Tour requires at least 2 spatial waypoints.', 'info');
                    return prev;
                }
                return prev.filter((id) => id !== nodeId);
            }
            addToast('Added spatial waypoint to Virtual Tour Flight Path! 🧭', 'success');
            return [...prev, nodeId];
        });
    };

    const handleCreateCustomPortal = (e) => {
        e.preventDefault();
        if (!customName.trim() || !customCity.trim()) return;

        const domainObj = DOMAIN_LENSES.find((d) => d.id === customDomain) || DOMAIN_LENSES[1];
        const newId = `node-custom-${Date.now()}`;
        const createdNode = {
            id: newId,
            name: customName.trim(),
            city: customCity.trim(),
            domain: customDomain,
            domainBadge: domainObj.shortLabel,
            coordinates: `${(Math.random() * 50 + 10).toFixed(4)}° N, ${(Math.random() * 120 - 60).toFixed(4)}° E`,
            mapX: Math.floor(Math.random() * 64) + 18,
            mapY: Math.floor(Math.random() * 52) + 22,
            rating: 4.95,
            liveExplorers: 128,
            telemetry: {
                metric1Label: 'Spatial Sync',
                metric1Value: '8K Volumetric Twin',
                metric2Label: 'Environment',
                metric2Value: 'Live Interactive',
                metric3Label: 'Domain Mode',
                metric3Value: domainObj.shortLabel
            },
            soundscape: 'Custom Spatial Audio Field (432 Hz)',
            videoUrl: '',
            panoramaImg:
                customImage.trim() ||
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&auto=format&fit=crop&q=85',
            summary:
                customSummary.trim() ||
                `Custom spatial portal in ${customCity.trim()} built for interactive virtual tours and telemetry inspection.`,
            eras: {
                past: {
                    year: 'Historical Foundation',
                    title: `Origins of ${customName.trim()}`,
                    desc: 'Historical terrain and early architectural foundations before modern development.'
                },
                present: {
                    year: '2026 AD · Live Virtual Portal',
                    title: `${customName.trim()} — Real-Time Spatial Twin`,
                    desc: customSummary.trim() || 'Interactive 360° spatial node with live hotspots and route integration.'
                },
                future: {
                    year: '2050 AD · Next-Gen Horizon',
                    title: `Autonomous & Sustainable ${customName.trim()}`,
                    desc: 'Projected next-century architectural evolution with zero-emission mobility.'
                }
            },
            hotspots: [
                { id: 'ch-1', x: 35, y: 48, label: 'Primary Entry Portal', detail: '360° Main Vantage Point' },
                { id: 'ch-2', x: 65, y: 55, label: 'Interactive Info Hub', detail: 'Live Telemetry & Specs' }
            ]
        };

        setNodes([createdNode, ...nodes]);
        setSelectedNodeId(newId);
        setRouteQueue((prev) => [...prev, newId]);
        setIsCreatePortalOpen(false);
        setCustomName('');
        setCustomCity('');
        setCustomSummary('');
        setCustomImage('');
        addToast(`Deployed Virtual Portal "${createdNode.name}" to the Spatial Map! 🌐✨`, 'success');
    };

    // Compute SVG polyline points for the active Virtual Tour route
    const routeSvgPoints = useMemo(() => {
        return routeQueue
            .map((id) => nodes.find((n) => n.id === id))
            .filter(Boolean)
            .map((n) => `${n.mapX},${n.mapY}`)
            .join(' ');
    }, [routeQueue, nodes]);

    return (
        <div className="holo-atlas-page">
            {/* 1. Futuristic Spatial Command Header */}
            <header className="holo-atlas-header">
                <div className="holo-brand-col">
                    <div className="holo-kicker-badge">
                        <Sparkles size={13} />
                        <span>SEENOMAD HOLOATLAS™ · UNIVERSAL SPATIAL TWIN & VIRTUAL TOUR ENGINE</span>
                    </div>
                    <h1>Interactive Travel Map & Virtual Portal</h1>
                    <p>
                        Teleport into 360° virtual places, simulate multi-stop drone tours, and switch across Travel, Heritage, Real Estate, Campus, and Futuristic Worlds.
                    </p>
                </div>

                <div className="holo-header-controls">
                    <div className="holo-surface-switcher" role="group" aria-label="Workspace Layout">
                        <button
                            type="button"
                            className={`holo-surf-btn ${viewSurface === 'split' ? 'active' : ''}`}
                            onClick={() => setViewSurface('split')}
                        >
                            <Layers size={14} />
                            <span>Split Radar + 360°</span>
                        </button>
                        <button
                            type="button"
                            className={`holo-surf-btn ${viewSurface === 'map-only' ? 'active' : ''}`}
                            onClick={() => setViewSurface('map-only')}
                        >
                            <Globe size={14} />
                            <span>Full Map Canvas</span>
                        </button>
                        <button
                            type="button"
                            className={`holo-surf-btn ${viewSurface === 'portal-360' ? 'active' : ''}`}
                            onClick={() => setViewSurface('portal-360')}
                        >
                            <Maximize2 size={14} />
                            <span>Immersive 360° Tour</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="holo-create-portal-btn"
                        onClick={() => setIsCreatePortalOpen(true)}
                    >
                        <Plus size={15} />
                        <span>Pin Virtual Place</span>
                    </button>
                </div>
            </header>

            {/* 2. Universal Domain Lens Switcher + Search & Autopilot Tour Bar */}
            <div className="holo-lens-toolbar">
                <div className="holo-domain-chips" role="tablist" aria-label="Universal Domain Lenses">
                    {DOMAIN_LENSES.map((lens) => {
                        const IconComp = lens.icon;
                        const isActive = activeDomain === lens.id;
                        return (
                            <button
                                key={lens.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`holo-domain-chip ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveDomain(lens.id)}
                            >
                                <IconComp size={14} />
                                <span>{lens.shortLabel}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="holo-search-and-autopilot">
                    <div className="holo-search-input">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search virtual places, cities, or domains..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`holo-autopilot-btn ${isAutopilotPlaying ? 'playing' : ''}`}
                        onClick={() => {
                            const next = !isAutopilotPlaying;
                            setIsAutopilotPlaying(next);
                            addToast(
                                next
                                    ? 'Virtual Tour Drone Autopilot engaged! Flying along your waypoint path 🛸'
                                    : 'Drone Autopilot paused.',
                                next ? 'success' : 'info'
                            );
                        }}
                    >
                        {isAutopilotPlaying ? <Pause size={14} /> : <Play size={14} />}
                        <span>{isAutopilotPlaying ? 'Stop Drone Tour' : 'Start Virtual Tour'}</span>
                    </button>
                </div>
            </div>

            {/* 3. Main Interactive Workspace: Global Spatial Map + 360° Virtual Place Portal */}
            <div className={`holo-workspace-grid mode-${viewSurface}`}>
                {/* LEFT / TOP: Interactive Global Vector Map & Route Flight Path */}
                {viewSurface !== 'portal-360' && (
                    <section className="holo-map-stage-card" aria-label="Interactive Global Spatial Map">
                        <div className="holo-stage-top-bar">
                            <div className="holo-radar-status">
                                <span className="holo-live-dot" />
                                <span>SPATIAL TELEMETRY RADAR · {filteredNodes.length} ACTIVE PORTALS</span>
                            </div>
                            <div className="holo-route-summary-pill">
                                <Navigation size={12} />
                                <span>Flight Path: {routeQueue.length} Waypoints</span>
                            </div>
                        </div>

                        {/* Interactive Map Viewport */}
                        <div className="holo-map-canvas">
                            {/* Stylistic World Grid & Continents SVG */}
                            <svg
                                viewBox="0 0 100 75"
                                preserveAspectRatio="none"
                                className="holo-world-svg"
                            >
                                <defs>
                                    <linearGradient id="holoRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop offset="50%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>

                                {/* Latitude / Longitude Grid Lines */}
                                {[15, 30, 45, 60].map((y) => (
                                    <line
                                        key={`lat-${y}`}
                                        x1="0"
                                        y1={y}
                                        x2="100"
                                        y2={y}
                                        stroke="rgba(56, 189, 248, 0.1)"
                                        strokeWidth="0.2"
                                        strokeDasharray="1,1"
                                    />
                                ))}
                                {[20, 40, 60, 80].map((x) => (
                                    <line
                                        key={`lon-${x}`}
                                        x1={x}
                                        y1="0"
                                        x2={x}
                                        y2="75"
                                        stroke="rgba(56, 189, 248, 0.1)"
                                        strokeWidth="0.2"
                                        strokeDasharray="1,1"
                                    />
                                ))}

                                {/* Stylized Continental Landmass Polygons */}
                                {/* North & South America */}
                                <path
                                    d="M10,14 L26,12 L31,26 L24,36 L34,46 L29,66 L22,64 L18,44 L11,28 Z"
                                    fill="rgba(56, 189, 248, 0.08)"
                                    stroke="rgba(56, 189, 248, 0.25)"
                                    strokeWidth="0.35"
                                />
                                {/* Europe & Africa */}
                                <path
                                    d="M42,15 L58,13 L61,28 L59,42 L55,64 L47,61 L44,42 L41,28 Z"
                                    fill="rgba(56, 189, 248, 0.08)"
                                    stroke="rgba(56, 189, 248, 0.25)"
                                    strokeWidth="0.35"
                                />
                                {/* Asia & Oceania */}
                                <path
                                    d="M60,14 L88,16 L91,36 L83,52 L89,66 L74,67 L70,48 L62,34 Z"
                                    fill="rgba(56, 189, 248, 0.08)"
                                    stroke="rgba(56, 189, 248, 0.25)"
                                    strokeWidth="0.35"
                                />

                                {/* Active Virtual Tour Flight Path Polyline */}
                                {routeSvgPoints && (
                                    <polyline
                                        fill="none"
                                        stroke="url(#holoRouteGrad)"
                                        strokeWidth="0.65"
                                        strokeDasharray="1.4,0.9"
                                        points={routeSvgPoints}
                                    />
                                )}
                            </svg>

                            {/* Interactive 3D Pin Markers */}
                            {filteredNodes.map((node) => {
                                const isSelected = selectedNode?.id === node.id;
                                const inRoute = routeQueue.includes(node.id);
                                const routeOrder = routeQueue.indexOf(node.id) + 1;

                                return (
                                    <button
                                        key={node.id}
                                        type="button"
                                        className={`holo-map-pin ${isSelected ? 'selected' : ''} ${
                                            inRoute ? 'in-route' : ''
                                        }`}
                                        style={{ left: `${node.mapX}%`, top: `${node.mapY}%` }}
                                        onClick={() => {
                                            setSelectedNodeId(node.id);
                                            setActiveHotspot(null);
                                        }}
                                        aria-label={`Inspect ${node.name} in ${node.city}`}
                                    >
                                        <span className="holo-pin-pulse" />
                                        <span className="holo-pin-core">
                                            {inRoute ? routeOrder : <MapPin size={12} />}
                                        </span>
                                        <span className="holo-pin-label">
                                            <strong>{node.city}</strong>
                                            <small>{node.domainBadge}</small>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Bottom Waypoint Strip (Virtual Tour Sequencer) */}
                        <div className="holo-waypoint-strip">
                            <div className="holo-waypoint-title">
                                <Compass size={14} />
                                <span>Virtual Tour Sequence:</span>
                            </div>
                            <div className="holo-waypoint-chips">
                                {routeQueue.map((nodeId, idx) => {
                                    const n = nodes.find((item) => item.id === nodeId);
                                    if (!n) return null;
                                    const isCurrent = selectedNode?.id === n.id;
                                    return (
                                        <React.Fragment key={n.id}>
                                            <button
                                                type="button"
                                                className={`holo-wp-chip ${isCurrent ? 'active' : ''}`}
                                                onClick={() => setSelectedNodeId(n.id)}
                                            >
                                                <span className="holo-wp-num">{idx + 1}</span>
                                                <span>{n.city}</span>
                                            </button>
                                            {idx < routeQueue.length - 1 && (
                                                <ChevronRight size={13} className="holo-wp-arrow" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* RIGHT / BOTTOM: 360° Virtual Place Portal & 4D Time-Machine Viewport */}
                {viewSurface !== 'map-only' && selectedNode && (
                    <section className="holo-portal-card" aria-label="360 Virtual Place Portal">
                        {/* Visual 360° Stage */}
                        <div className="holo-portal-viewport">
                            {selectedNode.videoUrl ? (
                                <video
                                    key={selectedNode.id}
                                    src={selectedNode.videoUrl}
                                    poster={selectedNode.panoramaImg}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={`holo-portal-media era-${timeEra}`}
                                />
                            ) : (
                                <img
                                    src={selectedNode.panoramaImg}
                                    alt={selectedNode.name}
                                    className={`holo-portal-media era-${timeEra}`}
                                />
                            )}
                            <div className="holo-portal-scrim" />

                            {/* Top Overlay Bar: Live Portal Status + Audio & Waypoint Toggle */}
                            <div className="holo-portal-top-bar">
                                <div className="holo-portal-badges">
                                    <span className="holo-badge-live">
                                        <Radio size={12} /> 360° VIRTUAL PORTAL
                                    </span>
                                    <span className="holo-badge-domain">{selectedNode.domainBadge}</span>
                                    <span className="holo-badge-viewers">
                                        <Eye size={12} /> {selectedNode.liveExplorers} exploring
                                    </span>
                                </div>

                                <div className="holo-portal-top-actions">
                                    <button
                                        type="button"
                                        className={`holo-icon-pill ${isSoundOn ? 'active' : ''}`}
                                        onClick={() => setIsSoundOn((prev) => !prev)}
                                    >
                                        {isSoundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                        <span>{isSoundOn ? 'Spatial Audio On' : 'Audio Muted'}</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={`holo-icon-pill ${
                                            routeQueue.includes(selectedNode.id) ? 'in-route' : ''
                                        }`}
                                        onClick={() => handleToggleRoutePin(selectedNode.id)}
                                    >
                                        <Navigation size={13} />
                                        <span>
                                            {routeQueue.includes(selectedNode.id)
                                                ? 'In Virtual Tour'
                                                : '+ Add to Tour'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Spatial Hotspots inside the 360° Viewport */}
                            <div className="holo-hotspots-layer">
                                {(selectedNode.hotspots || []).map((spot) => {
                                    const isSpotOpen = activeHotspot?.id === spot.id;
                                    return (
                                        <div
                                            key={spot.id}
                                            className="holo-hotspot-anchor"
                                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                                        >
                                            <button
                                                type="button"
                                                className={`holo-hotspot-btn ${isSpotOpen ? 'active' : ''}`}
                                                onClick={() =>
                                                    setActiveHotspot(isSpotOpen ? null : spot)
                                                }
                                            >
                                                <span className="holo-hotspot-ring" />
                                                <span className="holo-hotspot-dot" />
                                                <span className="holo-hotspot-tag">{spot.label}</span>
                                            </button>

                                            {isSpotOpen && (
                                                <div className="holo-hotspot-popover">
                                                    <strong>{spot.label}</strong>
                                                    <p>{spot.detail}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 4D Chrono-Slider (Past / Present / 2050 Future Simulation) */}
                            <div className="holo-chrono-bar">
                                <div className="holo-chrono-label">
                                    <Clock size={13} />
                                    <span>4D Time-Travel Lens:</span>
                                </div>
                                <div className="holo-chrono-buttons" role="tablist">
                                    {[
                                        { id: 'past', label: '🏛️ Historical Past' },
                                        { id: 'present', label: '📡 Live Present (2026)' },
                                        { id: 'future', label: '🚀 Future Horizon (2050)' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={timeEra === t.id}
                                            className={`holo-chrono-btn ${timeEra === t.id ? 'active' : ''}`}
                                            onClick={() => setTimeEra(t.id)}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Portal Intelligence & Era Details Body */}
                        <div className="holo-portal-body">
                            <div className="holo-portal-title-row">
                                <div>
                                    <div className="holo-coords-line">
                                        <MapPin size={13} />
                                        <span>{selectedNode.city}</span>
                                        <small>· {selectedNode.coordinates}</small>
                                    </div>
                                    <h2>{selectedNode.name}</h2>
                                </div>
                                <span className="holo-era-year-badge">{currentEraData?.year}</span>
                            </div>

                            {/* Active Era Simulation Box */}
                            <div className="holo-era-story-box">
                                <strong>{currentEraData?.title}</strong>
                                <p>{currentEraData?.desc}</p>
                            </div>

                            {/* Universal Domain Telemetry Grid */}
                            <div className="holo-telemetry-grid">
                                <div className="holo-tel-box">
                                    <Wifi size={14} />
                                    <div>
                                        <small>{selectedNode.telemetry.metric1Label}</small>
                                        <strong>{selectedNode.telemetry.metric1Value}</strong>
                                    </div>
                                </div>
                                <div className="holo-tel-box">
                                    <Sun size={14} />
                                    <div>
                                        <small>{selectedNode.telemetry.metric2Label}</small>
                                        <strong>{selectedNode.telemetry.metric2Value}</strong>
                                    </div>
                                </div>
                                <div className="holo-tel-box">
                                    <DollarSign size={14} />
                                    <div>
                                        <small>{selectedNode.telemetry.metric3Label}</small>
                                        <strong>{selectedNode.telemetry.metric3Value}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer: Teleport to Vibes, Trip Builder, or Book Travel */}
                            <div className="holo-portal-actions">
                                <button
                                    type="button"
                                    className="holo-btn-primary"
                                    onClick={() => {
                                        addToast(
                                            `Exported "${selectedNode.city}" spatial coordinates to Trip Builder! 🧭`,
                                            'success'
                                        );
                                        navigate('/explore/trip-builder');
                                    }}
                                >
                                    <Compass size={15} />
                                    <span>Clone Virtual Tour to Trip Builder</span>
                                </button>
                                <button
                                    type="button"
                                    className="holo-btn-secondary"
                                    onClick={() => navigate('/explore/vibes')}
                                >
                                    <Sparkles size={15} />
                                    <span>Watch Local Vibes</span>
                                </button>
                                <button
                                    type="button"
                                    className="holo-btn-secondary"
                                    onClick={() => navigate('/explore/book-travel')}
                                >
                                    <span>Book Real-World Travel</span>
                                    <ArrowUpRight size={15} />
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* 4. Spatial Portals Directory Deck (Quick Switcher Cards) */}
            <section className="holo-directory-section" aria-label="Virtual Portals Directory">
                <div className="holo-dir-header">
                    <h3>Universal Spatial Portals ({filteredNodes.length})</h3>
                    <span>Click any portal to teleport the 360° viewport and radar pin</span>
                </div>

                <div className="holo-dir-grid">
                    {filteredNodes.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        return (
                            <article
                                key={node.id}
                                className={`holo-dir-card ${isSelected ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedNodeId(node.id);
                                    setActiveHotspot(null);
                                }}
                            >
                                <div className="holo-dir-thumb">
                                    <img src={node.panoramaImg} alt={node.name} loading="lazy" />
                                    <span className="holo-dir-badge">{node.domainBadge}</span>
                                </div>
                                <div className="holo-dir-info">
                                    <div className="holo-dir-loc">
                                        <MapPin size={12} />
                                        <span>{node.city}</span>
                                    </div>
                                    <h4>{node.name}</h4>
                                    <p>{node.summary}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* 5. Pin a Custom Virtual Place / Portal Modal */}
            {isCreatePortalOpen && (
                <div className="vibe-modal-backdrop" onClick={() => setIsCreatePortalOpen(false)}>
                    <div className="vibe-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="vibe-modal-header">
                            <div>
                                <span className="vibe-modal-kicker">UNIVERSAL SPATIAL PIN BUILDER</span>
                                <h3>Pin a New Virtual Place or Tour</h3>
                                <p>Create a 360° spatial portal for travel, real estate, museums, campuses, or future worlds.</p>
                            </div>
                            <button
                                type="button"
                                className="vibe-modal-close"
                                onClick={() => setIsCreatePortalOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="vibe-create-form" onSubmit={handleCreateCustomPortal}>
                            <label>
                                <span>Portal / Virtual Place Title *</span>
                                <input
                                    type="text"
                                    placeholder="e.g., Louvre Glass Pyramid Night Tour or Zermatt Eco-Chalet"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    required
                                />
                            </label>

                            <div className="vibe-form-row-2">
                                <label>
                                    <span>City, Coordinates, or Realm *</span>
                                    <input
                                        type="text"
                                        placeholder="e.g., Paris, France or Lunar Crater Tycho"
                                        value={customCity}
                                        onChange={(e) => setCustomCity(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    <span>Industry / Domain Lens</span>
                                    <select
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                    >
                                        {DOMAIN_LENSES.filter((d) => d.id !== 'all').map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {d.shortLabel}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label>
                                <span>360° Panorama / Cover Image URL (Optional)</span>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={customImage}
                                    onChange={(e) => setCustomImage(e.target.value)}
                                />
                            </label>

                            <label>
                                <span>Virtual Tour Description & Spatial Notes</span>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the virtual tour highlights, architectural specs, or travel telemetry..."
                                    value={customSummary}
                                    onChange={(e) => setCustomSummary(e.target.value)}
                                />
                            </label>

                            <div className="vibe-modal-actions">
                                <button
                                    type="button"
                                    className="vibe-modal-secondary"
                                    onClick={() => setIsCreatePortalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="vibe-modal-primary">
                                    <CheckCircle2 size={15} />
                                    <span>Deploy Virtual Portal</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HoloAtlasTravelMap;
