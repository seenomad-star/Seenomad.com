import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, Bed, Wifi, ShieldCheck, Compass, Plus, Trash2,
    Search, DollarSign, Calendar, Users, ArrowUp, ArrowDown,
    Copy, Check, Download, ExternalLink, Sparkles, Landmark,
    FileText, CheckCircle2, AlertTriangle, Globe, Briefcase,
    SlidersHorizontal, RotateCcw, Share2, MessageSquare, Layers,
    Zap, CreditCard, PhoneCall, MapPin, ChevronRight, X
} from 'lucide-react';
import { useNavStore } from '../../../../store/navStore';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import { useToastStore } from '../../../../store/toastStore';
import ShareDraftModal from './ShareDraftModal';
import CommentSidebar from './CommentSidebar';
import SuggestedEditsPanel from './SuggestedEditsPanel';
import '../../../../styles/TripBuilder.css';

// Category Metadata
const MODULE_CATEGORIES = [
    { id: 'all', label: 'All Modules', icon: Layers, color: '#38BDF8' },
    { id: 'transit', label: 'Flights & Rail', icon: Plane, color: '#3B82F6' },
    { id: 'coliving', label: 'Coliving & Stays', icon: Bed, color: '#A855F7' },
    { id: 'coworking', label: '24/7 Fiber & eSIM', icon: Wifi, color: '#10B981' },
    { id: 'insurance', label: 'Visa & Medical', icon: ShieldCheck, color: '#F59E0B' },
    { id: 'activities', label: 'Local Immersion', icon: Compass, color: '#EC4899' }
];

// Curated Real-World Resource Catalog for Digital Nomads & Expedition Builders
const INITIAL_RESOURCE_CATALOG = [
    // Transit (Flights, Rail, Onward Tickets, Fast-Track)
    {
        id: 'tr-1',
        type: 'transit',
        title: 'Long-Haul Return Flight (LAX / JFK → Tokyo NRT)',
        provider: 'ANA / Star Alliance',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        price: 860,
        unitLabel: 'Roundtrip Ticket',
        duration: 'Days 1 & 30 • 11h 30m Direct',
        wifiMbps: 45,
        resourceUrl: 'https://www.google.com/travel/flights',
        note: 'Includes 2x 23kg checked bags + flexible date change waiver.'
    },
    {
        id: 'tr-2',
        type: 'transit',
        title: 'JR Pass 14-Day Whole Japan Shinkansen Bullet Train',
        provider: 'Japan Railways Group',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        price: 520,
        unitLabel: '14-Day Rail Pass',
        duration: 'Days 10–24 • Unlimited High-Speed Rail',
        wifiMbps: 95,
        resourceUrl: 'https://japanrailpass.net/en/',
        note: 'Covers Tokyo → Kyoto → Osaka → Hiroshima with onboard power & Wi-Fi.'
    },
    {
        id: 'tr-3',
        type: 'transit',
        title: 'Transatlantic Flight (NYC / London → Lisbon LIS)',
        provider: 'TAP Air Portugal',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        price: 540,
        unitLabel: 'Roundtrip + Madeira Stopover',
        duration: 'Day 1 • 7h 10m Direct',
        wifiMbps: 60,
        resourceUrl: 'https://www.flytap.com/',
        note: 'Includes free 5-day Portugal Stopover program for Lisbon + Funchal.'
    },
    {
        id: 'tr-4',
        type: 'transit',
        title: 'Eurail Global Continuous 15-Day High-Speed Rail Pass',
        provider: 'Eurail B.V.',
        country: 'Portugal',
        flag: '🇪🇺',
        region: 'europe',
        price: 495,
        unitLabel: '1st Class Rail Pass',
        duration: '15 Travel Days across 33 Countries',
        wifiMbps: 110,
        resourceUrl: 'https://www.eurail.com/',
        note: 'Quiet work carriages with panoramic alpine & Mediterranean routing.'
    },
    {
        id: 'tr-5',
        type: 'transit',
        title: 'Southeast Asia Hopper (Singapore → Bali DPS → Bangkok BKK)',
        provider: 'Singapore Airlines / Scoot Plus',
        country: 'Indonesia',
        flag: '🇮🇩',
        region: 'asia',
        price: 340,
        unitLabel: 'Multi-City Air Pass',
        duration: '2 Direct Regional Legs',
        wifiMbps: 50,
        resourceUrl: 'https://www.singaporeair.com/',
        note: 'Priority boarding + 30kg nomad gear allowance.'
    },
    {
        id: 'tr-6',
        type: 'transit',
        title: 'Verifiable 48h Onward Ticket Reservation (Immigration Proof)',
        provider: 'OnwardTicketVerified',
        country: 'Global',
        flag: '🌐',
        region: 'global',
        price: 16,
        unitLabel: 'Instant PNR Reservation',
        duration: 'Valid 48 Hours for Border Check',
        wifiMbps: 0,
        resourceUrl: 'https://onwardticket.com/',
        note: 'Real airline PNR verifiable on carrier websites for one-way travelers.'
    },

    // Coliving & Verified Stays
    {
        id: 'co-1',
        type: 'coliving',
        title: 'Shinjuku / Shibuya Nomad Coliving Loft (Private En-Suite)',
        provider: 'Roam / Hmlet Tokyo',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        price: 1450,
        unitLabel: '14 Nights Stay',
        duration: 'Days 1–14 • Tokyo Base',
        wifiMbps: 420,
        resourceUrl: 'https://www.flatio.com/',
        note: 'Herman Miller chair, 1Gbps fiber line, and English community manager.'
    },
    {
        id: 'co-2',
        type: 'coliving',
        title: 'Kyoto Machiya Artisan Townhouse & Garden Studio',
        provider: 'Kyoto Nomad Collective',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        price: 1180,
        unitLabel: '14 Nights Stay',
        duration: 'Days 15–28 • Kyoto Base',
        wifiMbps: 310,
        resourceUrl: 'https://www.outsite.co/',
        note: 'Quiet historic district near Karasuma Oike with dedicated zoom booth.'
    },
    {
        id: 'co-3',
        type: 'coliving',
        title: 'Outsite Cais do Sodré Lisbon Private Suite',
        provider: 'Outsite Lisbon',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        price: 1680,
        unitLabel: '30 Nights Monthly Rate',
        duration: 'Days 1–30 • Lisbon Base',
        wifiMbps: 350,
        resourceUrl: 'https://www.outsite.co/locations/lisbon-cais-do-sodre',
        note: 'Includes 24/7 resident coworking lounge, weekly dinners & cleaning.'
    },
    {
        id: 'co-4',
        type: 'coliving',
        title: 'Ponta do Sol Digital Nomad Village Ocean Villa',
        provider: 'Madeira Friends / Flatio',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        price: 920,
        unitLabel: '15 Nights Stay',
        duration: 'Days 31–45 • Madeira Base',
        wifiMbps: 290,
        resourceUrl: 'https://digitalnomads.startupmadeira.eu/',
        note: 'Steps from John Dos Passos Cultural Center free coworking hub.'
    },
    {
        id: 'co-5',
        type: 'coliving',
        title: 'Canggu / Pererenan Tropical Coliving Villa & Pool Suite',
        provider: 'Outpost / Tribal Bali',
        country: 'Indonesia',
        flag: '🇮🇩',
        region: 'asia',
        price: 1150,
        unitLabel: '30 Nights Monthly Pass',
        duration: 'Days 1–30 • Bali Base',
        wifiMbps: 260,
        resourceUrl: 'https://destinationoutpost.co/',
        note: 'Dual ISP fiber failover, backup generator, and scooter parking.'
    },
    {
        id: 'co-6',
        type: 'coliving',
        title: 'El Poblado Provenza Green Loft (Medellín)',
        provider: 'Selina / Casacol Medellín',
        country: 'Colombia',
        flag: '🇨🇴',
        region: 'americas',
        price: 1080,
        unitLabel: '30 Nights Furnished Lease',
        duration: 'Days 1–30 • Medellín Base',
        wifiMbps: 300,
        resourceUrl: 'https://www.flatio.com/',
        note: '24/7 concierge security, walkable to cafes, EST/CST timezone overlap.'
    },

    // Coworking, Fiber & Global eSIM
    {
        id: 'cw-1',
        type: 'coworking',
        title: 'WeWork All Access Global Pass (24/7 Dedicated Desk)',
        provider: 'WeWork Global Network',
        country: 'Global',
        flag: '🌐',
        region: 'global',
        price: 299,
        unitLabel: '30-Day Global Membership',
        duration: 'Unlimited 24/7 Access in 70+ Cities',
        wifiMbps: 500,
        resourceUrl: 'https://www.wework.com/',
        note: 'Includes private phone booths, barista coffee, and dual-monitor docks.'
    },
    {
        id: 'cw-2',
        type: 'coworking',
        title: 'Second Home Lisboa Biophilic Workspace Pass',
        provider: 'Second Home Chiado',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        price: 240,
        unitLabel: 'Monthly Roaming Pass',
        duration: '30 Days • Mercado da Ribeira',
        wifiMbps: 450,
        resourceUrl: 'https://secondhome.io/location/lisboa/',
        note: 'Over 1,000 indoor plants, cultural talks, and member surf club.'
    },
    {
        id: 'cw-3',
        type: 'coworking',
        title: 'Airalo / Holafly Unlimited 5G Multi-Country eSIM',
        provider: 'Airalo / Holafly Global',
        country: 'Global',
        flag: '📶',
        region: 'global',
        price: 69,
        unitLabel: '30-Day Unlimited Data eSIM',
        duration: 'Instant QR Activation • Hotspot Enabled',
        wifiMbps: 180,
        resourceUrl: 'https://www.airalo.com/',
        note: 'Zero roaming fees across 130+ countries; activates upon landing.'
    },
    {
        id: 'cw-4',
        type: 'coworking',
        title: 'Starlink Mini Portable Satellite Kit Rental',
        provider: 'Starlink Roam Global',
        country: 'Global',
        flag: '🛰️',
        region: 'global',
        price: 150,
        unitLabel: 'Monthly Roam Subscription',
        duration: 'Backpack-Sized Low-Latency Uplink',
        wifiMbps: 210,
        resourceUrl: 'https://www.starlink.com/roam',
        note: 'Guaranteed video-call connectivity on islands, trains, and alpine cabins.'
    },

    // Visa, Medical Insurance & Consular Protection
    {
        id: 'in-1',
        type: 'insurance',
        title: 'SafetyWing Nomad Insurance Complete (Medical + Evacuation)',
        provider: 'SafetyWing Global',
        country: 'Global',
        flag: '🛡️',
        region: 'global',
        price: 165,
        unitLabel: '30-Day Consular Compliant Policy',
        duration: '$250,000 Coverage • 185+ Countries',
        wifiMbps: 0,
        resourceUrl: 'https://safetywing.com/',
        note: 'Includes instant PDF visa letter accepted by Schengen & Nomad Embassies.'
    },
    {
        id: 'in-2',
        type: 'insurance',
        title: 'Fast-Track e-Visa / Digital Nomad Permit Filing Dossier',
        provider: 'SeeNomad Consular Desk',
        country: 'Global',
        flag: '🛂',
        region: 'global',
        price: 120,
        unitLabel: 'Official Fee + Document Audit',
        duration: '24–72h Priority Processing',
        wifiMbps: 0,
        resourceUrl: '/explore/visa',
        note: 'Pre-verified bank statements, remote work contract & embassy slot check.'
    },
    {
        id: 'in-3',
        type: 'insurance',
        title: 'Hague Apostille & Criminal Record Legalization Kit',
        provider: 'Consular Legalization Express',
        country: 'Global',
        flag: '📜',
        region: 'global',
        price: 190,
        unitLabel: 'Sworn Translation + Apostille',
        duration: 'Required for 1–5 Yr Nomad Visas',
        wifiMbps: 0,
        resourceUrl: '/explore/embassy',
        note: 'Valid for Spain DNV, Portugal D8, Japan Nomad Visa & Colombia V-Visa.'
    },
    {
        id: 'in-4',
        type: 'insurance',
        title: 'Genki Native / Explorer Health Insurance (Zero Deductible)',
        provider: 'Genki World / Allianz Care',
        country: 'Global',
        flag: '⚕️',
        region: 'global',
        price: 185,
        unitLabel: 'Monthly Comprehensive Cover',
        duration: 'Unlimited Hospital & Direct Billing',
        wifiMbps: 0,
        resourceUrl: 'https://genki.world/',
        note: 'Direct hospital billing + sports/scooter accident coverage included.'
    },

    // Local Immersion & Fixers
    {
        id: 'ac-1',
        type: 'activities',
        title: 'Local Guardian VIP Airport Pickup, Transit Card & SIM Setup',
        provider: 'SeeNomad Local Guardians',
        country: 'Global',
        flag: '🤝',
        region: 'global',
        price: 95,
        unitLabel: 'Arrival Orientation Package',
        duration: 'Day 1 • 3h Private Arrival Briefing',
        wifiMbps: 0,
        resourceUrl: '/explore/guardians',
        note: 'Vetted bilingual local meets you at arrivals and sets up local banking/transit.'
    },
    {
        id: 'ac-2',
        type: 'activities',
        title: 'Mount Fuji & Hakone Private Onsen Retreat',
        provider: 'Hakone Ryokan Guild',
        country: 'Japan',
        flag: '🇯🇵',
        region: 'asia',
        price: 220,
        unitLabel: 'Full-Day Excursion + Kaiseki',
        duration: 'Weekend Reset • 9h',
        wifiMbps: 0,
        resourceUrl: '/explore/destinations',
        note: 'Includes Romancecar train ticket, Lake Ashi cruise & hot spring access.'
    },
    {
        id: 'ac-3',
        type: 'activities',
        title: 'Sintra & Ericeira Atlantic Surf & Founder Mastermind',
        provider: 'Lisbon Nomad Founders Club',
        country: 'Portugal',
        flag: '🇵🇹',
        region: 'europe',
        price: 140,
        unitLabel: 'Weekend Coastal Retreat',
        duration: 'Saturday–Sunday • 2 Days',
        wifiMbps: 0,
        resourceUrl: '/explore/events',
        note: 'Includes surf coaching, cliffside seafood dinner & founder roundtable.'
    },
    {
        id: 'ac-4',
        type: 'activities',
        title: 'Ubud Sound Healing, Ice Bath & Culinary Immersion',
        provider: 'Pyramids of Chi / Alchemy Bali',
        country: 'Indonesia',
        flag: '🇮🇩',
        region: 'asia',
        price: 110,
        unitLabel: 'Wellness & Gastronomy Pass',
        duration: 'Full Day Recovery Session',
        wifiMbps: 0,
        resourceUrl: '/explore/destinations',
        note: 'Biohacking recovery session + organic Balinese farm-to-table workshop.'
    }
];

// 4 Pre-Configured Complete Expedition Blueprints
const EXPEDITION_BLUEPRINTS = [
    {
        id: 'japan-fiber-sprint',
        name: 'Tokyo & Kyoto Fiber Sprint',
        subtitle: 'Japan • 30 Days • High-Speed Shinkansen & Machiya Workspaces',
        flag: '🇯🇵',
        durationDays: 30,
        budgetLimit: 4800,
        travelers: 1,
        passport: 'United States (US)',
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
        subtitle: 'Portugal • 45 Days • Coastal Coliving & Schengen D8 Prep',
        flag: '🇵🇹',
        durationDays: 45,
        budgetLimit: 4500,
        travelers: 1,
        passport: 'United Kingdom (UK)',
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
        subtitle: 'Indonesia & Singapore • 60 Days • Tropical Villa & Dual-Fiber Hub',
        flag: '🇮🇩',
        durationDays: 60,
        budgetLimit: 4200,
        travelers: 2,
        passport: 'European Union (EU)',
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
        subtitle: 'Colombia • 45 Days • Zero Jetlag US-Hours Sprint',
        flag: '🇨🇴',
        durationDays: 45,
        budgetLimit: 3800,
        travelers: 1,
        passport: 'Canada (CA)',
        itemIds: [
            { id: 'co-6', qty: 1 },
            { id: 'cw-1', qty: 1 },
            { id: 'cw-4', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'ac-1', qty: 1 }
        ]
    }
];

// Country Visa & Consular Quick-Reference for Active Trip Detection
const COUNTRY_VISA_INTELLIGENCE = {
    'Japan': {
        flag: '🇯🇵',
        slug: 'japan',
        visaFree: '90 Days Visa-Free (e-Passport)',
        nomadPermit: 'Japan Digital Nomad Visa (6 Months • ¥10M/yr)',
        sosNumber: '+81-3-3224-5000 / 110 (Police)',
        schengen: false
    },
    'Portugal': {
        flag: '🇵🇹',
        slug: 'portugal',
        visaFree: '90 / 180 Days Schengen Rule',
        nomadPermit: 'Portugal D8 Digital Nomad Visa (1–5 Years • €3,280/mo)',
        sosNumber: '+351-21-727-3300 / 112 (EU SOS)',
        schengen: true
    },
    'Indonesia': {
        flag: '🇮🇩',
        slug: 'indonesia',
        visaFree: '30d e-VOA (Extendable to 60 Days)',
        nomadPermit: 'E33G Remote Worker KITAS (1 Year • $60k/yr)',
        sosNumber: '+62-21-5083-1000 / 112',
        schengen: false
    },
    'Colombia': {
        flag: '🇨🇴',
        slug: 'colombia',
        visaFree: '90 Days Stamp (Extendable to 180d/yr)',
        nomadPermit: 'Colombia V Digital Nomad Visa (2 Years • $1,100/mo)',
        sosNumber: '+57-601-275-2000 / 123',
        schengen: false
    }
};

// Curated External & Internal Nomad Resources Hub
const VERIFIED_RESOURCE_LINKS = [
    {
        group: 'Flights, Rail & Border Proof',
        items: [
            { name: 'Google Flights Matrix', desc: 'Multi-city fare calendar & price tracking', url: 'https://www.google.com/travel/flights', external: true },
            { name: 'Rome2Rio Multi-Modal', desc: 'Compare train, ferry, bus & flight legs', url: 'https://www.rome2rio.com/', external: true },
            { name: 'OnwardTicket PNR', desc: 'Verifiable 48h onward ticket for immigration', url: 'https://onwardticket.com/', external: true },
            { name: 'SeeNomad Multi-Part Studio', desc: 'Consecutive 4-leg circuit & Schengen builder', url: '/explore/seenomad-multi', external: false }
        ]
    },
    {
        group: 'Verified Coliving & Mid-Term Leases',
        items: [
            { name: 'Outsite Global Coliving', desc: 'Private rooms with speed-tested fiber workspaces', url: 'https://www.outsite.co/', external: true },
            { name: 'Flatio Deposit-Free Stays', desc: '1–12 month furnished flats with lease contracts', url: 'https://www.flatio.com/', external: true },
            { name: 'Compare Nomad Destinations', desc: 'Side-by-side cost, Wi-Fi & safety benchmarks', url: '/explore/compare-destinations', external: false }
        ]
    },
    {
        group: 'Visa, Consular & Medical Protection',
        items: [
            { name: 'Global Visa Intelligence Hub', desc: 'Visa-free days, Nomad Permits & 183d tax rules', url: '/explore/visa', external: false },
            { name: 'Global Embassy & SOS Directory', desc: 'Chancery addresses, 24/7 crisis lines & FAQs', url: '/explore/embassy', external: false },
            { name: 'SafetyWing Nomad Insurance', desc: 'Consular-approved medical & evacuation policy', url: 'https://safetywing.com/', external: true },
            { name: 'Wise Multi-Currency Account', desc: 'Mid-market FX cards & local IBANs in 40+ currencies', url: 'https://wise.com/', external: true }
        ]
    }
];

const INITIAL_CHECKLIST = [
    { id: 'chk-1', label: 'Passport has 6+ months validity & 3+ blank visa pages', category: 'Consular', done: true },
    { id: 'chk-2', label: 'Verifiable onward/return ticket booked within visa-free window', category: 'Border', done: true },
    { id: 'chk-3', label: 'Medical & evacuation insurance policy PDF saved offline', category: 'Insurance', done: true },
    { id: 'chk-4', label: 'Multi-country 5G eSIM QR code installed before departure', category: 'Connectivity', done: false },
    { id: 'chk-5', label: 'Destination Embassy 24/7 SOS hotline saved in phone favorites', category: 'Safety', done: false },
    { id: 'chk-6', label: 'Remote income / bank statement PDFs ready for border inspection', category: 'Visa', done: false },
    { id: 'chk-7', label: 'Zero-FX multi-currency debit + backup credit card travel notice set', category: 'Finance', done: false },
    { id: 'chk-8', label: 'Universal GaN 100W charger + surge protector packed', category: 'Hardware', done: false }
];

const TripBuilder = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    // Sync with Vertical Pill • Page Filters (NomadDock)
    const {
        globalSearchQuery,
        globalActiveFilters,
        setGlobalSearchQuery,
        setGlobalActiveFilters
    } = useNavStore();
    const { advancedFilters } = useDestinationStore();

    // Active Blueprint & Trip Header State
    const [activeBlueprintId, setActiveBlueprintId] = useState('japan-fiber-sprint');
    const [tripTitle, setTripTitle] = useState('Tokyo & Kyoto Fiber Sprint');
    const [passport, setPassport] = useState('United States (US)');
    const [durationDays, setDurationDays] = useState(30);
    const [budgetLimit, setBudgetLimit] = useState(4800);
    const [travelers, setTravelers] = useState(1);

    // Resource Catalog State
    const [catalog, setCatalog] = useState(INITIAL_RESOURCE_CATALOG);
    const [localSearch, setLocalSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [showCustomForm, setShowCustomForm] = useState(false);
    const [customModule, setCustomModule] = useState({
        title: '',
        type: 'coliving',
        provider: 'Custom Provider',
        country: 'Global',
        price: 250,
        unitLabel: 'Custom Block',
        duration: 'Flexible Window',
        wifiMbps: 200,
        note: 'Custom expedition resource module'
    });

    // Build initial itinerary from the default blueprint
    const [itineraryItems, setItineraryItems] = useState(() => {
        const bp = EXPEDITION_BLUEPRINTS[0];
        return bp.itemIds
            .map((entry, idx) => {
                const found = INITIAL_RESOURCE_CATALOG.find((c) => c.id === entry.id);
                if (!found) return null;
                return {
                    ...found,
                    instanceId: `init-${idx}-${found.id}`,
                    qty: entry.qty || 1
                };
            })
            .filter(Boolean);
    });

    // Drag & Drop + Right Sidecar Tabs + Modals
    const [draggedItem, setDraggedItem] = useState(null);
    const [isHoveringDropZone, setIsHoveringDropZone] = useState(false);
    const [rightTab, setRightTab] = useState('finance'); // 'finance' | 'resources' | 'checklist'
    const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
    const [copiedBlueprint, setCopiedBlueprint] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    // Combine local search/category with NomadDock Vertical Pill filters
    const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();
    const effectiveCategory = useMemo(() => {
        if (selectedCategory !== 'all') return selectedCategory;
        if (Array.isArray(globalActiveFilters) && globalActiveFilters.length > 0) {
            const firstMatch = globalActiveFilters.find((f) =>
                ['transit', 'coliving', 'coworking', 'insurance', 'activities'].includes(f)
            );
            if (firstMatch) return firstMatch;
        }
        return 'all';
    }, [selectedCategory, globalActiveFilters]);

    const effectiveRegions = useMemo(() => {
        if (selectedRegion !== 'all') return [selectedRegion];
        if (Array.isArray(advancedFilters?.regions) && advancedFilters.regions.length > 0) {
            return advancedFilters.regions.map((r) => r.toLowerCase());
        }
        return [];
    }, [selectedRegion, advancedFilters]);

    // Filtered Catalog
    const filteredCatalog = useMemo(() => {
        return catalog.filter((item) => {
            if (effectiveCategory !== 'all' && item.type !== effectiveCategory) return false;
            if (effectiveRegions.length > 0 && item.region !== 'global' && !effectiveRegions.includes(item.region)) {
                return false;
            }
            if (effectiveSearch) {
                const hay = `${item.title} ${item.provider} ${item.country} ${item.note} ${item.type}`.toLowerCase();
                if (!hay.includes(effectiveSearch)) return false;
            }
            return true;
        });
    }, [catalog, effectiveCategory, effectiveRegions, effectiveSearch]);

    // Financial & Telemetry Computations
    const totalCost = useMemo(
        () => itineraryItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0),
        [itineraryItems]
    );
    const budgetRemaining = budgetLimit - totalCost;
    const budgetPercent = Math.min(100, Math.round((totalCost / Math.max(1, budgetLimit)) * 100));
    const dailyBurnRate = Math.round(totalCost / Math.max(1, durationDays));
    const perPersonCost = Math.round(totalCost / Math.max(1, travelers));

    const avgWifiSpeed = useMemo(() => {
        const wifiItems = itineraryItems.filter((i) => i.wifiMbps && i.wifiMbps > 0);
        if (wifiItems.length === 0) return 250;
        const sum = wifiItems.reduce((acc, i) => acc + i.wifiMbps, 0);
        return Math.round(sum / wifiItems.length);
    }, [itineraryItems]);

    const categoryTotals = useMemo(() => {
        const totals = {
            transit: 0,
            coliving: 0,
            coworking: 0,
            insurance: 0,
            activities: 0
        };
        itineraryItems.forEach((item) => {
            const lineTotal = item.price * (item.qty || 1);
            if (totals[item.type] !== undefined) {
                totals[item.type] += lineTotal;
            }
        });
        return totals;
    }, [itineraryItems]);

    // Detect active countries in the itinerary for the Visa & Embassy Bridge
    const activeTripCountries = useMemo(() => {
        const set = new Set();
        itineraryItems.forEach((item) => {
            if (item.country && item.country !== 'Global' && COUNTRY_VISA_INTELLIGENCE[item.country]) {
                set.add(item.country);
            }
        });
        return Array.from(set).map((c) => ({
            country: c,
            ...COUNTRY_VISA_INTELLIGENCE[c]
        }));
    }, [itineraryItems]);

    const checklistProgress = useMemo(() => {
        const doneCount = checklist.filter((c) => c.done).length;
        return Math.round((doneCount / checklist.length) * 100);
    }, [checklist]);

    // Handlers
    const handleLoadBlueprint = (bp) => {
        setActiveBlueprintId(bp.id);
        setTripTitle(bp.name);
        setDurationDays(bp.durationDays);
        setBudgetLimit(bp.budgetLimit);
        setTravelers(bp.travelers);
        setPassport(bp.passport);

        const loaded = bp.itemIds
            .map((entry, idx) => {
                const found = catalog.find((c) => c.id === entry.id);
                if (!found) return null;
                return {
                    ...found,
                    instanceId: `${bp.id}-${idx}-${Date.now()}`,
                    qty: entry.qty || 1
                };
            })
            .filter(Boolean);

        setItineraryItems(loaded);
        if (addToast) {
            addToast(`Loaded "${bp.name}" blueprint (${loaded.length} modules)`, 'success');
        }
    };

    const handleAddModule = (item) => {
        setItineraryItems((prev) => [
            ...prev,
            {
                ...item,
                instanceId: `mod-${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                qty: 1
            }
        ]);
        if (addToast) {
            addToast(`Added "${item.title}" to trip timeline`, 'success');
        }
    };

    const handleCreateCustomModule = (e) => {
        e.preventDefault();
        if (!customModule.title.trim()) return;
        const newItem = {
            ...customModule,
            id: `custom-${Date.now()}`,
            flag: '✨',
            region: 'global',
            price: Number(customModule.price) || 0,
            wifiMbps: Number(customModule.wifiMbps) || 0,
            resourceUrl: '/explore/destinations'
        };
        setCatalog((prev) => [newItem, ...prev]);
        handleAddModule(newItem);
        setCustomModule({
            title: '',
            type: 'coliving',
            provider: 'Custom Provider',
            country: 'Global',
            price: 250,
            unitLabel: 'Custom Block',
            duration: 'Flexible Window',
            wifiMbps: 200,
            note: 'Custom expedition resource module'
        });
        setShowCustomForm(false);
    };

    const handleUpdateQty = (instanceId, delta) => {
        setItineraryItems((prev) =>
            prev.map((item) => {
                if (item.instanceId !== instanceId) return item;
                const nextQty = Math.max(1, (item.qty || 1) + delta);
                return { ...item, qty: nextQty };
            })
        );
    };

    const handleMoveItem = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= itineraryItems.length) return;
        setItineraryItems((prev) => {
            const copy = [...prev];
            const [moved] = copy.splice(index, 1);
            copy.splice(targetIndex, 0, moved);
            return copy;
        });
    };

    const handleDuplicateItem = (item) => {
        setItineraryItems((prev) => [
            ...prev,
            {
                ...item,
                instanceId: `dup-${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
            }
        ]);
    };

    const handleRemoveItem = (instanceId) => {
        setItineraryItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
    };

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'copyMove';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsHoveringDropZone(true);
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHoveringDropZone(false);
        if (draggedItem) {
            handleAddModule(draggedItem);
            setDraggedItem(null);
        }
    };

    const handleToggleCheck = (id) => {
        setChecklist((prev) =>
            prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
        );
    };

    const handleCopyMarkdown = () => {
        const lines = [
            `# ${tripTitle} (${durationDays} Days)`,
            `- **Passport**: ${passport}`,
            `- **Total Projected Spend**: $${totalCost.toLocaleString()} / $${budgetLimit.toLocaleString()} Budget`,
            `- **Daily Burn Rate**: $${dailyBurnRate}/day • **Per Traveler (${travelers})**: $${perPersonCost.toLocaleString()}`,
            `- **Avg Workspace Fiber**: ${avgWifiSpeed} Mbps`,
            '',
            '## Expedition Modules',
            ...itineraryItems.map(
                (item, idx) =>
                    `${idx + 1}. **[${item.type.toUpperCase()}] ${item.title}** (${item.provider}) — $${(
                        item.price * (item.qty || 1)
                    ).toLocaleString()} (${item.qty || 1}x ${item.unitLabel})`
            )
        ];
        navigator.clipboard.writeText(lines.join('\n'));
        setCopiedBlueprint(true);
        if (addToast) addToast('Trip Dossier copied to clipboard in Markdown format', 'success');
        setTimeout(() => setCopiedBlueprint(false), 2200);
    };

    const handleDownloadJson = () => {
        const payload = {
            tripTitle,
            passport,
            durationDays,
            budgetLimit,
            travelers,
            totalCost,
            dailyBurnRate,
            avgWifiSpeed,
            exportedAt: new Date().toISOString(),
            modules: itineraryItems
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tripTitle.toLowerCase().replace(/\s+/g, '-')}-blueprint.json`;
        a.click();
        URL.revokeObjectURL(url);
        if (addToast) addToast('Downloaded Trip Blueprint JSON file', 'success');
    };

    const handleResetFilters = () => {
        setLocalSearch('');
        setSelectedCategory('all');
        setSelectedRegion('all');
        setGlobalSearchQuery('');
        setGlobalActiveFilters([]);
    };

    return (
        <div className="trip-builder-container">
            {/* 1. Command Header & Blueprint Switcher */}
            <header className="tb-command-header">
                <div className="tb-header-top">
                    <div className="tb-brand-block">
                        <div className="tb-badge-row">
                            <span className="tb-os-pill">
                                <Sparkles size={13} />
                                SEENOMAD TRIP BUILDER & RESOURCE STUDIO
                            </span>
                            <span className="tb-sync-pill">
                                <ShieldCheck size={13} />
                                Synced with Visa & Embassy Intelligence
                            </span>
                        </div>
                        <div className="tb-title-edit-row">
                            <input
                                type="text"
                                className="tb-title-input"
                                value={tripTitle}
                                onChange={(e) => setTripTitle(e.target.value)}
                                aria-label="Expedition Title"
                            />
                        </div>
                        <p className="tb-subtitle">
                            Assemble speed-tested coliving stays, 24/7 fiber workspaces, flights, and consular-compliant medical & visa modules with live burn-rate telemetry.
                        </p>
                    </div>

                    <div className="tb-header-actions">
                        <button
                            type="button"
                            className="tb-action-btn"
                            onClick={handleCopyMarkdown}
                            title="Copy Markdown Itinerary"
                        >
                            {copiedBlueprint ? <Check size={15} /> : <Copy size={15} />}
                            <span>{copiedBlueprint ? 'Copied Dossier' : 'Copy Dossier'}</span>
                        </button>
                        <button
                            type="button"
                            className="tb-action-btn"
                            onClick={handleDownloadJson}
                            title="Download JSON Blueprint"
                        >
                            <Download size={15} />
                            <span>Export JSON</span>
                        </button>
                        <button
                            type="button"
                            className="tb-action-btn"
                            onClick={() => setIsShareModalOpen(true)}
                        >
                            <Share2 size={15} />
                            <span>Collaborate</span>
                        </button>
                        <button
                            type="button"
                            className={`tb-action-btn ${isCommentsOpen ? 'active' : ''}`}
                            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        >
                            <MessageSquare size={15} />
                            <span>Discussion</span>
                        </button>
                    </div>
                </div>

                {/* Quick-Load Expedition Blueprints Bar */}
                <div className="tb-blueprints-bar">
                    <span className="tb-bp-label">QUICK-LOAD BLUEPRINTS:</span>
                    <div className="tb-bp-chips">
                        {EXPEDITION_BLUEPRINTS.map((bp) => (
                            <button
                                key={bp.id}
                                type="button"
                                className={`tb-bp-chip ${activeBlueprintId === bp.id ? 'active' : ''}`}
                                onClick={() => handleLoadBlueprint(bp)}
                            >
                                <span className="bp-flag">{bp.flag}</span>
                                <div className="bp-chip-text">
                                    <span className="bp-chip-name">{bp.name}</span>
                                    <span className="bp-chip-meta">{bp.durationDays}d • ${bp.budgetLimit.toLocaleString()} cap</span>
                                </div>
                            </button>
                        ))}
                        <button
                            type="button"
                            className="tb-bp-clear-btn"
                            onClick={() => {
                                setActiveBlueprintId('custom');
                                setItineraryItems([]);
                            }}
                        >
                            <RotateCcw size={13} />
                            <span>Start Blank</span>
                        </button>
                    </div>
                </div>

                {/* Live Parameters & Telemetry Strip */}
                <div className="tb-telemetry-grid">
                    {/* Parameter Controls */}
                    <div className="tb-param-card">
                        <label className="tb-param-lbl">
                            <Globe size={13} /> CITIZEN PASSPORT
                        </label>
                        <select
                            className="tb-param-select"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                        >
                            <option value="United States (US)">United States (US)</option>
                            <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                            <option value="European Union (EU)">European Union (EU)</option>
                            <option value="Canada (CA)">Canada (CA)</option>
                            <option value="Australia (AU)">Australia (AU)</option>
                            <option value="India (IN)">India (IN)</option>
                            <option value="Singapore (SG)">Singapore (SG)</option>
                        </select>
                    </div>

                    <div className="tb-param-card">
                        <label className="tb-param-lbl">
                            <Calendar size={13} /> EXPEDITION DURATION
                        </label>
                        <div className="tb-stepper-row">
                            <button
                                type="button"
                                className="tb-step-btn"
                                onClick={() => setDurationDays((d) => Math.max(7, d - 5))}
                            >
                                -
                            </button>
                            <span className="tb-step-val">{durationDays} Days</span>
                            <button
                                type="button"
                                className="tb-step-btn"
                                onClick={() => setDurationDays((d) => d + 5)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="tb-param-card">
                        <label className="tb-param-lbl">
                            <Users size={13} /> TRAVELERS / SPLIT
                        </label>
                        <div className="tb-stepper-row">
                            <button
                                type="button"
                                className="tb-step-btn"
                                onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                            >
                                -
                            </button>
                            <span className="tb-step-val">
                                {travelers} {travelers === 1 ? 'Solo Nomad' : 'Team / Co-Travelers'}
                            </span>
                            <button
                                type="button"
                                className="tb-step-btn"
                                onClick={() => setTravelers((t) => Math.min(12, t + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Budget Cap & Live Spend Bar */}
                    <div className="tb-param-card tb-budget-kpi">
                        <div className="tb-budget-top">
                            <span className="tb-param-lbl">
                                <DollarSign size={13} /> LIVE EXPEDITION BUDGET
                            </span>
                            <span className={`tb-budget-status ${budgetRemaining < 0 ? 'over' : 'safe'}`}>
                                {budgetRemaining >= 0
                                    ? `$${budgetRemaining.toLocaleString()} Under Cap`
                                    : `$${Math.abs(budgetRemaining).toLocaleString()} Over Cap`}
                            </span>
                        </div>
                        <div className="tb-budget-numbers">
                            <span className="tb-spend-big">${totalCost.toLocaleString()}</span>
                            <span className="tb-cap-input-wrap">
                                / $
                                <input
                                    type="number"
                                    className="tb-cap-input"
                                    value={budgetLimit}
                                    step={100}
                                    min={500}
                                    onChange={(e) => setBudgetLimit(Math.max(500, Number(e.target.value) || 0))}
                                    aria-label="Budget Limit"
                                />
                            </span>
                        </div>
                        <div className="tb-budget-bar">
                            <div
                                className={`tb-budget-fill ${
                                    budgetRemaining < 0 ? 'danger' : budgetPercent > 85 ? 'warning' : 'safe'
                                }`}
                                style={{ width: `${budgetPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Burn Rate & Fiber Speed Telemetry */}
                    <div className="tb-param-card tb-burn-kpi">
                        <div className="tb-dual-kpi">
                            <div>
                                <span className="tb-param-lbl">DAILY BURN</span>
                                <div className="tb-kpi-val">${dailyBurnRate}/day</div>
                                <span className="tb-kpi-sub">${perPersonCost.toLocaleString()} / person</span>
                            </div>
                            <div className="tb-kpi-divider" />
                            <div>
                                <span className="tb-param-lbl">AVG WORKSPACE FIBER</span>
                                <div className="tb-kpi-val text-emerald">{avgWifiSpeed} Mbps</div>
                                <span className="tb-kpi-sub">{checklistProgress}% Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Main Three-Column Studio Workspace */}
            <div className="tb-workspace-grid">
                {/* LEFT COLUMN: Modular Resource Catalog */}
                <aside className="tb-catalog-panel" aria-label="Nomad Resource Module Catalog">
                    <div className="tb-panel-header">
                        <div>
                            <h2>Modular Resource Catalog</h2>
                            <p>Click + Add or drag modules onto your timeline</p>
                        </div>
                        <button
                            type="button"
                            className="tb-custom-toggle-btn"
                            onClick={() => setShowCustomForm(!showCustomForm)}
                        >
                            {showCustomForm ? <X size={14} /> : <Plus size={14} />}
                            <span>{showCustomForm ? 'Close' : 'Custom Block'}</span>
                        </button>
                    </div>

                    {/* Custom Module Creation Form */}
                    <AnimatePresence>
                        {showCustomForm && (
                            <motion.form
                                className="tb-custom-form"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onSubmit={handleCreateCustomModule}
                            >
                                <h4>Create Custom Resource Block</h4>
                                <input
                                    type="text"
                                    placeholder="Module title (e.g., Tokyo Coworking Pass)"
                                    value={customModule.title}
                                    onChange={(e) => setCustomModule({ ...customModule, title: e.target.value })}
                                    required
                                />
                                <div className="tb-custom-form-row">
                                    <select
                                        value={customModule.type}
                                        onChange={(e) => setCustomModule({ ...customModule, type: e.target.value })}
                                    >
                                        <option value="transit">Flights & Rail</option>
                                        <option value="coliving">Coliving & Stays</option>
                                        <option value="coworking">24/7 Fiber & eSIM</option>
                                        <option value="insurance">Visa & Medical</option>
                                        <option value="activities">Local Immersion</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Price ($)"
                                        value={customModule.price}
                                        onChange={(e) => setCustomModule({ ...customModule, price: e.target.value })}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="tb-custom-form-row">
                                    <input
                                        type="text"
                                        placeholder="Provider (e.g., Outsite)"
                                        value={customModule.provider}
                                        onChange={(e) => setCustomModule({ ...customModule, provider: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g., 14 Nights)"
                                        value={customModule.duration}
                                        onChange={(e) => setCustomModule({ ...customModule, duration: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="tb-custom-submit-btn">
                                    <Plus size={14} /> Add Custom Resource to Trip
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* Search & Category Filter Controls */}
                    <div className="tb-catalog-controls">
                        <div className="tb-search-box">
                            <Search size={14} className="tb-search-icon" />
                            <input
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="Search flights, coliving, eSIM, visa..."
                            />
                            {(localSearch || globalSearchQuery) && (
                                <button
                                    type="button"
                                    className="tb-search-clear"
                                    onClick={() => {
                                        setLocalSearch('');
                                        setGlobalSearchQuery('');
                                    }}
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        <div className="tb-cat-pills">
                            {MODULE_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = effectiveCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`tb-cat-pill ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedCategory(cat.id);
                                            if (cat.id === 'all') {
                                                setGlobalActiveFilters([]);
                                            }
                                        }}
                                    >
                                        <Icon size={12} />
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="tb-region-pills">
                            {[
                                { id: 'all', label: 'All Regions' },
                                { id: 'asia', label: 'Asia' },
                                { id: 'europe', label: 'Europe' },
                                { id: 'americas', label: 'Americas' },
                                { id: 'global', label: 'Global Tools' }
                            ].map((reg) => (
                                <button
                                    key={reg.id}
                                    type="button"
                                    className={`tb-reg-pill ${selectedRegion === reg.id ? 'active' : ''}`}
                                    onClick={() => setSelectedRegion(reg.id)}
                                >
                                    {reg.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Catalog Cards List */}
                    <div className="tb-catalog-list">
                        {filteredCatalog.length === 0 ? (
                            <div className="tb-catalog-empty">
                                <p>No modules match your active filters.</p>
                                <button type="button" onClick={handleResetFilters}>
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            filteredCatalog.map((item) => {
                                const catMeta =
                                    MODULE_CATEGORIES.find((c) => c.id === item.type) || MODULE_CATEGORIES[0];
                                const CatIcon = catMeta.icon;
                                return (
                                    <div
                                        key={item.id}
                                        className="tb-catalog-card"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                    >
                                        <div className="tb-cat-card-top">
                                            <span
                                                className="tb-cat-tag"
                                                style={{
                                                    background: `${catMeta.color}18`,
                                                    color: catMeta.color,
                                                    borderColor: `${catMeta.color}40`
                                                }}
                                            >
                                                <CatIcon size={11} />
                                                {catMeta.label}
                                            </span>
                                            <span className="tb-cat-country">
                                                {item.flag} {item.country}
                                            </span>
                                        </div>

                                        <h4 className="tb-cat-title">{item.title}</h4>
                                        <p className="tb-cat-note">{item.note}</p>

                                        <div className="tb-cat-meta-row">
                                            <span className="tb-cat-provider">{item.provider}</span>
                                            {item.wifiMbps > 0 && (
                                                <span className="tb-cat-wifi">
                                                    <Wifi size={11} /> {item.wifiMbps} Mbps
                                                </span>
                                            )}
                                        </div>

                                        <div className="tb-cat-footer">
                                            <div className="tb-cat-price-block">
                                                <span className="tb-cat-price">${item.price.toLocaleString()}</span>
                                                <span className="tb-cat-unit">/ {item.unitLabel}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="tb-cat-add-btn"
                                                onClick={() => handleAddModule(item)}
                                            >
                                                <Plus size={13} />
                                                <span>Add to Trip</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* CENTER COLUMN: Interactive Expedition Timeline & Consular Bridge */}
                <main className="tb-timeline-panel">
                    {/* Destination Visa & Consular Intelligence Bridge */}
                    {activeTripCountries.length > 0 && (
                        <div className="tb-consular-bridge">
                            <div className="tb-bridge-header">
                                <div className="tb-bridge-title">
                                    <ShieldCheck size={16} className="text-sky" />
                                    <span>Active Destination Visa & Consular Intelligence</span>
                                </div>
                                <div className="tb-bridge-links">
                                    <button
                                        type="button"
                                        className="tb-bridge-nav-btn"
                                        onClick={() => navigate('/explore/visa')}
                                    >
                                        <FileText size={12} /> Open Visa Hub
                                    </button>
                                    <button
                                        type="button"
                                        className="tb-bridge-nav-btn"
                                        onClick={() => navigate('/explore/embassy')}
                                    >
                                        <Landmark size={12} /> Open Embassy Directory
                                    </button>
                                </div>
                            </div>
                            <div className="tb-bridge-cards">
                                {activeTripCountries.map((c) => (
                                    <div key={c.country} className="tb-bridge-card">
                                        <div className="tb-bridge-card-head">
                                            <span className="tb-bridge-country">
                                                {c.flag} {c.country}
                                            </span>
                                            <span className="tb-bridge-visa-pill">{c.visaFree}</span>
                                        </div>
                                        <div className="tb-bridge-nomad">{c.nomadPermit}</div>
                                        <div className="tb-bridge-footer">
                                            <span className="tb-bridge-sos">
                                                <PhoneCall size={11} /> SOS: {c.sosNumber}
                                            </span>
                                            <button
                                                type="button"
                                                className="tb-bridge-dossier-link"
                                                onClick={() =>
                                                    navigate(`/explore/embassy/embassy-of-${c.slug}`)
                                                }
                                            >
                                                Consular Dossier <ChevronRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sequential Timeline Header */}
                    <div className="tb-timeline-header">
                        <div>
                            <h2>Sequential Expedition Timeline</h2>
                            <p>
                                {itineraryItems.length} active resource modules • Drag from catalog or adjust quantities inline
                            </p>
                        </div>
                        <div className="tb-timeline-summary-badges">
                            <span className="tb-count-badge">{itineraryItems.length} Modules</span>
                            <span className="tb-total-badge">${totalCost.toLocaleString()} Total</span>
                        </div>
                    </div>

                    {/* Drop Zone & Timeline Items */}
                    <div
                        className={`tb-drop-zone ${isHoveringDropZone ? 'active-zone' : ''} ${
                            itineraryItems.length === 0 ? 'empty-state' : ''
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setIsHoveringDropZone(false)}
                        onDrop={handleDrop}
                    >
                        {itineraryItems.length === 0 ? (
                            <div className="tb-empty-timeline">
                                <Compass size={36} className="tb-empty-icon" />
                                <h3>Your Expedition Timeline is Empty</h3>
                                <p>
                                    Click <strong>+ Add to Trip</strong> on any module in the left catalog, drag modules here, or select a <strong>Quick-Load Blueprint</strong> above.
                                </p>
                            </div>
                        ) : (
                            <div className="tb-timeline-list">
                                <AnimatePresence>
                                    {itineraryItems.map((item, index) => {
                                        const catMeta =
                                            MODULE_CATEGORIES.find((c) => c.id === item.type) ||
                                            MODULE_CATEGORIES[0];
                                        const CatIcon = catMeta.icon;
                                        const lineCost = item.price * (item.qty || 1);

                                        return (
                                            <motion.div
                                                key={item.instanceId}
                                                className="tb-timeline-row"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="tb-step-rail">
                                                    <span
                                                        className="tb-step-num"
                                                        style={{
                                                            background: `${catMeta.color}22`,
                                                            color: catMeta.color,
                                                            borderColor: `${catMeta.color}55`
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                    {index < itineraryItems.length - 1 && (
                                                        <div className="tb-step-connector" />
                                                    )}
                                                </div>

                                                <div className="tb-timeline-card">
                                                    <div className="tb-tl-card-main">
                                                        <div
                                                            className="tb-tl-icon"
                                                            style={{
                                                                background: `${catMeta.color}18`,
                                                                color: catMeta.color
                                                            }}
                                                        >
                                                            <CatIcon size={20} />
                                                        </div>

                                                        <div className="tb-tl-info">
                                                            <div className="tb-tl-badges">
                                                                <span
                                                                    className="tb-tl-cat-badge"
                                                                    style={{ color: catMeta.color }}
                                                                >
                                                                    {catMeta.label}
                                                                </span>
                                                                <span className="tb-tl-country-badge">
                                                                    {item.flag} {item.country}
                                                                </span>
                                                                <span className="tb-tl-duration-badge">
                                                                    {item.duration}
                                                                </span>
                                                                {item.wifiMbps > 0 && (
                                                                    <span className="tb-tl-wifi-badge">
                                                                        <Wifi size={11} /> {item.wifiMbps} Mbps
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h4 className="tb-tl-title">{item.title}</h4>
                                                            <p className="tb-tl-note">
                                                                <strong>{item.provider}:</strong> {item.note}
                                                            </p>
                                                        </div>

                                                        {/* Quantity & Cost Controls */}
                                                        <div className="tb-tl-right">
                                                            <div className="tb-tl-price">
                                                                ${lineCost.toLocaleString()}
                                                            </div>
                                                            <div className="tb-tl-qty-controls">
                                                                <button
                                                                    type="button"
                                                                    className="tb-qty-btn"
                                                                    onClick={() =>
                                                                        handleUpdateQty(item.instanceId, -1)
                                                                    }
                                                                    title="Decrease units/duration"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="tb-qty-label">
                                                                    {item.qty || 1}x {item.unitLabel}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="tb-qty-btn"
                                                                    onClick={() =>
                                                                        handleUpdateQty(item.instanceId, 1)
                                                                    }
                                                                    title="Increase units/duration"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card Action Footer */}
                                                    <div className="tb-tl-card-actions">
                                                        <div className="tb-tl-order-btns">
                                                            <button
                                                                type="button"
                                                                className="tb-mini-btn"
                                                                disabled={index === 0}
                                                                onClick={() => handleMoveItem(index, -1)}
                                                                title="Move Up"
                                                            >
                                                                <ArrowUp size={13} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="tb-mini-btn"
                                                                disabled={index === itineraryItems.length - 1}
                                                                onClick={() => handleMoveItem(index, 1)}
                                                                title="Move Down"
                                                            >
                                                                <ArrowDown size={13} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="tb-mini-btn"
                                                                onClick={() => handleDuplicateItem(item)}
                                                                title="Duplicate Block"
                                                            >
                                                                <Copy size={13} /> Duplicate
                                                            </button>
                                                        </div>

                                                        <div className="tb-tl-resource-btns">
                                                            {item.resourceUrl && (
                                                                <button
                                                                    type="button"
                                                                    className="tb-resource-link-btn"
                                                                    onClick={() => {
                                                                        if (item.resourceUrl.startsWith('/')) {
                                                                            navigate(item.resourceUrl);
                                                                        } else {
                                                                            window.open(
                                                                                item.resourceUrl,
                                                                                '_blank',
                                                                                'noopener,noreferrer'
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <ExternalLink size={12} />
                                                                    <span>Open Resource</span>
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="tb-remove-btn"
                                                                onClick={() => handleRemoveItem(item.instanceId)}
                                                                title="Remove from timeline"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </main>

                {/* RIGHT COLUMN: Resource Directory, Cost Splitter & Pre-Departure Checklist */}
                <aside className="tb-intelligence-panel" aria-label="Resource & Financial Intelligence">
                    <div className="tb-intel-tabs">
                        <button
                            type="button"
                            className={`tb-intel-tab ${rightTab === 'finance' ? 'active' : ''}`}
                            onClick={() => setRightTab('finance')}
                        >
                            <DollarSign size={14} />
                            <span>Cost & Split</span>
                        </button>
                        <button
                            type="button"
                            className={`tb-intel-tab ${rightTab === 'resources' ? 'active' : ''}`}
                            onClick={() => setRightTab('resources')}
                        >
                            <Globe size={14} />
                            <span>Resource Hub</span>
                        </button>
                        <button
                            type="button"
                            className={`tb-intel-tab ${rightTab === 'checklist' ? 'active' : ''}`}
                            onClick={() => setRightTab('checklist')}
                        >
                            <CheckCircle2 size={14} />
                            <span>Checklist ({checklistProgress}%)</span>
                        </button>
                    </div>

                    {/* TAB 1: Financial Breakdown & Per-Person Splitter */}
                    {rightTab === 'finance' && (
                        <div className="tb-intel-body">
                            <div className="tb-intel-section">
                                <h3>Category Spend Breakdown</h3>
                                <div className="tb-cat-breakdown-list">
                                    {MODULE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                                        const Icon = cat.icon;
                                        const amount = categoryTotals[cat.id] || 0;
                                        const pct =
                                            totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
                                        return (
                                            <div key={cat.id} className="tb-bk-row">
                                                <div className="tb-bk-top">
                                                    <span className="tb-bk-label">
                                                        <Icon size={13} style={{ color: cat.color }} />
                                                        {cat.label}
                                                    </span>
                                                    <span className="tb-bk-val">
                                                        ${amount.toLocaleString()} ({pct}%)
                                                    </span>
                                                </div>
                                                <div className="tb-bk-bar">
                                                    <div
                                                        className="tb-bk-fill"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background: cat.color
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="tb-intel-section tb-splitter-card">
                                <h3>Solo / Team Expense Splitter</h3>
                                <div className="tb-split-grid">
                                    <div className="tb-split-box">
                                        <span className="tb-split-lbl">Per Traveler Share</span>
                                        <strong className="tb-split-val">
                                            ${perPersonCost.toLocaleString()}
                                        </strong>
                                        <span className="tb-split-sub">
                                            Across {travelers} {travelers === 1 ? 'traveler' : 'travelers'}
                                        </span>
                                    </div>
                                    <div className="tb-split-box">
                                        <span className="tb-split-lbl">30-Day Run Rate</span>
                                        <strong className="tb-split-val">
                                            ${(dailyBurnRate * 30).toLocaleString()}/mo
                                        </strong>
                                        <span className="tb-split-sub">${dailyBurnRate}/day average</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tb-intel-section">
                                <h3>Connected SeeNomad Studios</h3>
                                <div className="tb-studio-bridges">
                                    <button
                                        type="button"
                                        className="tb-studio-bridge-btn"
                                        onClick={() => navigate('/explore/seenomad-multi')}
                                    >
                                        <Compass size={15} />
                                        <div>
                                            <strong>Multi-Part Expedition Studio</strong>
                                            <span>4-Leg Schengen & Regional Routing</span>
                                        </div>
                                        <ChevronRight size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className="tb-studio-bridge-btn"
                                        onClick={() => navigate('/explore/visa')}
                                    >
                                        <ShieldCheck size={15} />
                                        <div>
                                            <strong>Visa Requirement Summary</strong>
                                            <span>Compare Nomad Permits & 183d Tax</span>
                                        </div>
                                        <ChevronRight size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className="tb-studio-bridge-btn"
                                        onClick={() => navigate('/explore/embassy')}
                                    >
                                        <Landmark size={15} />
                                        <div>
                                            <strong>Global Embassy Directory</strong>
                                            <span>Consular Missions & 24/7 Crisis Desk</span>
                                        </div>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: Verified Resource Directory */}
                    {rightTab === 'resources' && (
                        <div className="tb-intel-body">
                            {VERIFIED_RESOURCE_LINKS.map((group) => (
                                <div key={group.group} className="tb-intel-section">
                                    <h3>{group.group}</h3>
                                    <div className="tb-res-links-list">
                                        {group.items.map((link) => (
                                            <button
                                                key={link.name}
                                                type="button"
                                                className="tb-res-link-card"
                                                onClick={() => {
                                                    if (link.external) {
                                                        window.open(
                                                            link.url,
                                                            '_blank',
                                                            'noopener,noreferrer'
                                                        );
                                                    } else {
                                                        navigate(link.url);
                                                    }
                                                }}
                                            >
                                                <div className="tb-res-link-text">
                                                    <strong>{link.name}</strong>
                                                    <span>{link.desc}</span>
                                                </div>
                                                <ExternalLink size={13} className="tb-res-link-icon" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB 3: Pre-Departure Consular & Nomad Checklist */}
                    {rightTab === 'checklist' && (
                        <div className="tb-intel-body">
                            <div className="tb-intel-section">
                                <div className="tb-chk-header">
                                    <h3>Pre-Departure Readiness</h3>
                                    <span className="tb-chk-pct">{checklistProgress}% Complete</span>
                                </div>
                                <div className="tb-chk-progress-bar">
                                    <div
                                        className="tb-chk-progress-fill"
                                        style={{ width: `${checklistProgress}%` }}
                                    />
                                </div>
                                <div className="tb-chk-list">
                                    {checklist.map((item) => (
                                        <label
                                            key={item.id}
                                            className={`tb-chk-item ${item.done ? 'done' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => handleToggleCheck(item.id)}
                                            />
                                            <div className="tb-chk-text">
                                                <span className="tb-chk-title">{item.label}</span>
                                                <span className="tb-chk-cat">{item.category}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Optional Discussion & Suggested Edits Drawer */}
                    {isCommentsOpen && (
                        <div className="tb-discussion-drawer">
                            <CommentSidebar onClose={() => setIsCommentsOpen(false)} />
                            <SuggestedEditsPanel />
                        </div>
                    )}
                </aside>
            </div>

            <ShareDraftModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            />
        </div>
    );
};

export default TripBuilder;
