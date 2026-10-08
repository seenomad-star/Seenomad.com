import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    MapPin,
    Plane,
    Train,
    Bed,
    Wifi,
    Utensils,
    Compass,
    Sparkles,
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    CheckCircle2,
    DollarSign,
    Clock,
    Users,
    Share2,
    Download,
    Map,
    GitBranch,
    Briefcase,
    Bookmark,
    Check
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { useSavedVibesStore } from '../../store/savedVibesStore';
import { useSavedStore } from '../../store/savedStore';
import '../../styles/ItineraryBuilder.css';

const PRESET_ITINERARIES = [
    {
        id: 'japan-corridor',
        name: 'Japan Golden Corridor & Fiber Circuit',
        badge: '🇯🇵 4 Days Featured',
        startDate: '2026-11-02',
        travelers: 2,
        pace: 'Balanced + Deep Work',
        budget: 2600,
        days: [
            {
                id: 'day-1',
                dayNumber: 1,
                city: 'Tokyo (Shibuya & Shinjuku)',
                country: 'Japan',
                flag: '🇯🇵',
                transitMode: 'Direct Flight (NRT Express)',
                weather: '18°C · Crisp Clear',
                stops: [
                    {
                        id: 's-101',
                        time: '09:30 - 11:00',
                        category: 'transit',
                        title: 'Narita Express (N’EX) High-Speed Rail into Shibuya',
                        location: 'Narita Terminal 1 → Shibuya Station',
                        cost: 34,
                        wifiMbps: 120,
                        booked: true,
                        note: 'Activate Suica IC card on Apple Wallet and reserve window seat.'
                    },
                    {
                        id: 's-102',
                        time: '11:30 - 15:30',
                        category: 'work',
                        title: 'Deep Focus Sprint at Shibuya Sky Co-Lab Lounge',
                        location: 'Shibuya Scramble Square 15F',
                        cost: 28,
                        wifiMbps: 680,
                        booked: true,
                        note: 'Dual 4K monitor desks + specialty pour-over bar overlooking Tokyo.'
                    },
                    {
                        id: 's-103',
                        time: '16:00 - 18:00',
                        category: 'stay',
                        title: 'Check-In: Hmlet Shinjuku Designer Nomad Loft',
                        location: 'Shinjuku-ku, Tokyo',
                        cost: 165,
                        wifiMbps: 490,
                        booked: true,
                        note: 'Self check-in via smart lock code; rooftop terrace on 12F.'
                    },
                    {
                        id: 's-104',
                        time: '19:30 - 21:30',
                        category: 'dining',
                        title: 'Omoide Yokocho & Ebisu Yokocho Izakaya Tasting',
                        location: 'West Shinjuku Alleyways',
                        cost: 48,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Try charcoal-grilled yakitori and yuzu highballs with local creators.'
                    }
                ]
            },
            {
                id: 'day-2',
                dayNumber: 2,
                city: 'Tokyo (Daikanyama & Roppongi)',
                country: 'Japan',
                flag: '🇯🇵',
                transitMode: 'Tokyo Metro Ginza Line',
                weather: '19°C · Sunny',
                stops: [
                    {
                        id: 's-201',
                        time: '08:30 - 12:30',
                        category: 'work',
                        title: 'Morning Work Session at Tsutaya Books T-Site Lounge',
                        location: 'Sarugakucho, Daikanyama',
                        cost: 22,
                        wifiMbps: 410,
                        booked: true,
                        note: 'Quiet architectural library cafe with power outlets at every seat.'
                    },
                    {
                        id: 's-202',
                        time: '13:30 - 16:30',
                        category: 'culture',
                        title: 'teamLab Borderless Digital Art Immersion',
                        location: 'Azabudai Hills, Minato-ku',
                        cost: 38,
                        wifiMbps: 220,
                        booked: true,
                        note: 'QR entry ticket saved in Passport Vault; arrive 15 mins early.'
                    },
                    {
                        id: 's-203',
                        time: '18:30 - 21:00',
                        category: 'dining',
                        title: 'Afuri Yuzu Ramen & Craft Sake Pairing',
                        location: 'Ebisu / Nakameguro Canal',
                        cost: 32,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Evening walk along Nakameguro lantern-lit river.'
                    }
                ]
            },
            {
                id: 'day-3',
                dayNumber: 3,
                city: 'Kyoto (Karasuma & Higashiyama)',
                country: 'Japan',
                flag: '🇯🇵',
                transitMode: 'Nozomi Shinkansen (2h 12m)',
                weather: '17°C · Autumn Breeze',
                stops: [
                    {
                        id: 's-301',
                        time: '08:00 - 10:15',
                        category: 'transit',
                        title: 'Shinkansen Nozomi Bullet Train (Tokyo → Kyoto)',
                        location: 'Tokyo Station Track 16 → Kyoto Station',
                        cost: 96,
                        wifiMbps: 115,
                        booked: true,
                        note: 'Seat 12E (Right side in direction of travel for clear Mt. Fuji view).'
                    },
                    {
                        id: 's-302',
                        time: '11:00 - 15:00',
                        category: 'work',
                        title: 'Kyoto Machiya Artisan Coworking & Tea Garden',
                        location: 'Karasuma Oike, Nakagyo Ward',
                        cost: 24,
                        wifiMbps: 360,
                        booked: true,
                        note: 'Restored 100-year-old wooden townhouse with acoustic call pods.'
                    },
                    {
                        id: 's-303',
                        time: '16:00 - 18:30',
                        category: 'culture',
                        title: 'Golden Hour Walk: Kiyomizu-dera & Sannenzaka Lanes',
                        location: 'Higashiyama District, Kyoto',
                        cost: 18,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Best sunset vantage point over Kyoto pagoda skyline.'
                    }
                ]
            },
            {
                id: 'day-4',
                dayNumber: 4,
                city: 'Osaka (Namba & Umeda Sky)',
                country: 'Japan',
                flag: '🇯🇵',
                transitMode: 'JR Special Rapid (29m)',
                weather: '20°C · Clear',
                stops: [
                    {
                        id: 's-401',
                        time: '09:30 - 13:00',
                        category: 'work',
                        title: 'WeWork Links Umeda Panorama Desk',
                        location: 'Kita-ku, Osaka Station North',
                        cost: 29,
                        wifiMbps: 540,
                        booked: true,
                        note: 'High-floor coworking hub directly above JR Osaka Station.'
                    },
                    {
                        id: 's-402',
                        time: '17:30 - 21:00',
                        category: 'dining',
                        title: 'Dotonbori Canal Street Food & Kuromon Market Tour',
                        location: 'Chuo Ward, Osaka',
                        cost: 42,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Takoyaki, okonomiyaki, and neon canal photography walk.'
                    }
                ]
            }
        ]
    },
    {
        id: 'iberian-coast',
        name: 'Iberian Atlantic Surf & Nomad Circuit',
        badge: '🇵🇹 3 Days Featured',
        startDate: '2026-11-18',
        travelers: 1,
        pace: 'Relaxed Coastal',
        budget: 1800,
        days: [
            {
                id: 'ib-1',
                dayNumber: 1,
                city: 'Lisbon (Cais do Sodré & Chiado)',
                country: 'Portugal',
                flag: '🇵🇹',
                transitMode: 'Metro Aeroporto → Cais do Sodré',
                weather: '22°C · Atlantic Sun',
                stops: [
                    {
                        id: 'ib-s1',
                        time: '09:30 - 13:30',
                        category: 'work',
                        title: 'Second Home Lisboa Biophilic Workspace',
                        location: 'Mercado da Ribeira 1F, Lisbon',
                        cost: 30,
                        wifiMbps: 460,
                        booked: true,
                        note: 'Surrounded by 1,000+ plants above Time Out Market.'
                    },
                    {
                        id: 'ib-s2',
                        time: '15:00 - 18:00',
                        category: 'culture',
                        title: 'Tram 28 Heritage Ride & Miradouro de Santa Catarina',
                        location: 'Alfama → Bairro Alto',
                        cost: 12,
                        wifiMbps: 0,
                        booked: true,
                        note: 'Sunset acoustic music overlooking the Tagus River bridge.'
                    }
                ]
            },
            {
                id: 'ib-2',
                dayNumber: 2,
                city: 'Ericeira World Surfing Reserve',
                country: 'Portugal',
                flag: '🇵🇹',
                transitMode: 'Coastal Express Coach (45m)',
                weather: '21°C · Offshore Swell',
                stops: [
                    {
                        id: 'ib-s3',
                        time: '08:00 - 10:30',
                        category: 'culture',
                        title: 'Dawn Patrol Surf Session at Ribeira d’Ilhas',
                        location: 'Ericeira North Coast',
                        cost: 35,
                        wifiMbps: 0,
                        booked: true,
                        note: 'Wetsuit & board rental included at Outsite Surf Club.'
                    },
                    {
                        id: 'ib-s4',
                        time: '11:30 - 16:30',
                        category: 'work',
                        title: 'Oceanfront Coworking Deck at Outsite Ericeira',
                        location: 'Praia do Sul, Ericeira',
                        cost: 95,
                        wifiMbps: 340,
                        booked: true,
                        note: 'Afternoon sync calls with US East Coast timezone overlap.'
                    }
                ]
            },
            {
                id: 'ib-3',
                dayNumber: 3,
                city: 'Porto (Ribeira & Foz do Douro)',
                country: 'Portugal',
                flag: '🇵🇹',
                transitMode: 'Alfa Pendular High-Speed Train (2h 40m)',
                weather: '20°C · Golden Hour',
                stops: [
                    {
                        id: 'ib-s5',
                        time: '10:00 - 12:40',
                        category: 'transit',
                        title: 'CP Alfa Pendular 1st Class Rail to Porto Campanhã',
                        location: 'Lisbon Santa Apolónia → Porto',
                        cost: 44,
                        wifiMbps: 95,
                        booked: true,
                        note: 'Onboard Wi-Fi and folding work table.'
                    },
                    {
                        id: 'ib-s6',
                        time: '17:00 - 19:30',
                        category: 'dining',
                        title: 'Vila Nova de Gaia Cellar Port Tasting & Douro Cruise',
                        location: 'Dom Luís I Bridge Riverfront',
                        cost: 38,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Vintage tawny port flight overlooking Ribeira.'
                    }
                ]
            }
        ]
    },
    {
        id: 'bali-singapore',
        name: 'Singapore & Bali Tropical Tech Loop',
        badge: '🇮🇩 3 Days Featured',
        startDate: '2026-12-05',
        travelers: 2,
        pace: 'Tropical Workation',
        budget: 2100,
        days: [
            {
                id: 'bs-1',
                dayNumber: 1,
                city: 'Singapore (Marina Bay & Tiong Bahru)',
                country: 'Singapore',
                flag: '🇸🇬',
                transitMode: 'Changi Jewel MRT',
                weather: '29°C · Tropical Warm',
                stops: [
                    {
                        id: 'bs-s1',
                        time: '10:00 - 14:30',
                        category: 'work',
                        title: 'The Great Room Centennial Tower Deep Work Pass',
                        location: 'Marina Centre, Singapore',
                        cost: 45,
                        wifiMbps: 850,
                        booked: true,
                        note: 'Hospitality-inspired workspace with panoramic bay views.'
                    },
                    {
                        id: 'bs-s2',
                        time: '19:00 - 21:30',
                        category: 'culture',
                        title: 'Gardens by the Bay Supertree Rhapsody & Lau Pa Sat Satay',
                        location: 'Marina Bay Waterfront',
                        cost: 32,
                        wifiMbps: 0,
                        booked: true,
                        note: 'Light show at 19:45 followed by open-air satay street.'
                    }
                ]
            },
            {
                id: 'bs-2',
                dayNumber: 2,
                city: 'Ubud & Canggu (Bali)',
                country: 'Indonesia',
                flag: '🇮🇩',
                transitMode: 'Direct Flight SIN → DPS (2h 35m)',
                weather: '28°C · Tropical Breeze',
                stops: [
                    {
                        id: 'bs-s3',
                        time: '11:00 - 16:00',
                        category: 'work',
                        title: 'Tribal Bali Pererenan Poolside Coworking Villa',
                        location: 'Jl. Pantai Pererenan, Canggu',
                        cost: 78,
                        wifiMbps: 290,
                        booked: true,
                        note: 'Dual fiber ISP + infinity pool & specialty coconut cold brew.'
                    },
                    {
                        id: 'bs-s4',
                        time: '17:30 - 20:00',
                        category: 'dining',
                        title: 'Echo Beach Sunset Seafood Grill & Acoustic Session',
                        location: 'Canggu Coastline, Bali',
                        cost: 28,
                        wifiMbps: 0,
                        booked: false,
                        note: 'Fresh snapper on coconut husks right on the black-sand beach.'
                    }
                ]
            },
            {
                id: 'bs-3',
                dayNumber: 3,
                city: 'Uluwatu Cliffside Sanctuary',
                country: 'Indonesia',
                flag: '🇮🇩',
                transitMode: 'Private Coastal Transfer (50m)',
                weather: '28°C · Clear Ocean View',
                stops: [
                    {
                        id: 'bs-s5',
                        time: '16:30 - 19:30',
                        category: 'culture',
                        title: 'Uluwatu Cliff Temple & Sunset Kecak Fire Dance',
                        location: 'Bukit Peninsula, Bali',
                        cost: 24,
                        wifiMbps: 0,
                        booked: true,
                        note: 'Book amphitheater ticket via SeeNomad Fast-Track.'
                    }
                ]
            }
        ]
    }
];

const CURATED_GEMS_CATALOG = [
    {
        id: 'gem-1',
        title: 'Starlink Verified Rooftop Cafe & Zoom Booth',
        category: 'work',
        location: 'City Center Nomad Hub',
        time: '10:00 - 14:00',
        cost: 18,
        wifiMbps: 420,
        note: 'Ergonomic seating, acoustic phone booth, and unlimited specialty coffee.'
    },
    {
        id: 'gem-2',
        title: 'High-Speed Intercity Express Rail Pass (1st Class)',
        category: 'transit',
        location: 'Central Station Terminal',
        time: '08:30 - 11:00',
        cost: 64,
        wifiMbps: 110,
        note: 'Quiet carriage seat reservation with power socket & luggage rack.'
    },
    {
        id: 'gem-3',
        title: 'Guided Hidden Alleyways & Night Market Tasting Tour',
        category: 'dining',
        location: 'Historic Old Quarter',
        time: '19:00 - 21:30',
        cost: 39,
        wifiMbps: 0,
        note: '6 local culinary tastings hosted by a verified SeeNomad Local Guardian.'
    },
    {
        id: 'gem-4',
        title: 'Private En-Suite Coliving Studio (Nightly Extension)',
        category: 'stay',
        location: 'Creative District',
        time: '15:00 - 23:00',
        cost: 95,
        wifiMbps: 350,
        note: '24/7 coworking access, gym, and weekly community rooftop dinner.'
    },
    {
        id: 'gem-5',
        title: '360° Golden Hour Viewpoint & Photography Walk',
        category: 'culture',
        location: 'Panoramic Overlook',
        time: '16:30 - 18:30',
        cost: 15,
        wifiMbps: 0,
        note: 'Featured spot from the SeeNomad Travel Vibes feed.'
    }
];

const CATEGORY_META = {
    transit: { label: 'Transit & Rail', icon: Train },
    work: { label: 'Deep Work & Fiber', icon: Wifi },
    stay: { label: 'Stay & Coliving', icon: Bed },
    dining: { label: 'Food & Dining', icon: Utensils },
    culture: { label: 'Culture & Sights', icon: Compass }
};

const NomadPlanner = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { savedVibes } = useSavedVibesStore();
    const { savedDestinations } = useSavedStore();

    const [activeTemplateId, setActiveTemplateId] = useState(PRESET_ITINERARIES[0].id);
    const [tripTitle, setTripTitle] = useState(PRESET_ITINERARIES[0].name);
    const [startDate, setStartDate] = useState(PRESET_ITINERARIES[0].startDate);
    const [travelers, setTravelers] = useState(PRESET_ITINERARIES[0].travelers);
    const [pace, setPace] = useState(PRESET_ITINERARIES[0].pace);
    const [targetBudget, setTargetBudget] = useState(PRESET_ITINERARIES[0].budget);
    const [days, setDays] = useState(PRESET_ITINERARIES[0].days);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [activeView, setActiveView] = useState('timeline'); // 'timeline' | 'route' | 'budget'
    const [showAddStopForm, setShowAddStopForm] = useState(false);

    // New stop form state
    const [newStopTitle, setNewStopTitle] = useState('');
    const [newStopTime, setNewStopTime] = useState('14:00 - 16:00');
    const [newStopCategory, setNewStopCategory] = useState('culture');
    const [newStopLocation, setNewStopLocation] = useState('');
    const [newStopCost, setNewStopCost] = useState('25');
    const [newStopWifi, setNewStopWifi] = useState('0');
    const [newStopNote, setNewStopNote] = useState('');

    // Packing checklist state
    const [checkedPacking, setCheckedPacking] = useState({
        passport: true,
        esim: true,
        adapter: true,
        powerbank: false,
        insurance: true
    });

    const activeDay = days[selectedDayIndex] || days[0];

    // Switch template preset
    const handleSelectTemplate = (tpl) => {
        setActiveTemplateId(tpl.id);
        setTripTitle(tpl.name);
        setStartDate(tpl.startDate);
        setTravelers(tpl.travelers);
        setPace(tpl.pace);
        setTargetBudget(tpl.budget);
        setDays(JSON.parse(JSON.stringify(tpl.days)));
        setSelectedDayIndex(0);
        addToast(`Loaded "${tpl.name}" itinerary`, 'info');
    };

    // Computed Trip Telemetry
    const telemetry = useMemo(() => {
        let totalCost = 0;
        let totalStops = 0;
        let bookedStops = 0;
        let wifiTotal = 0;
        let wifiCount = 0;
        const byCategory = { transit: 0, work: 0, stay: 0, dining: 0, culture: 0 };

        days.forEach((d) => {
            d.stops.forEach((s) => {
                const c = Number(s.cost) || 0;
                totalCost += c;
                totalStops += 1;
                if (s.booked) bookedStops += 1;
                if (s.wifiMbps > 0) {
                    wifiTotal += Number(s.wifiMbps);
                    wifiCount += 1;
                }
                const cat = byCategory[s.category] !== undefined ? s.category : 'culture';
                byCategory[cat] += c;
            });
        });

        return {
            totalCost,
            totalStops,
            bookedStops,
            avgWifi: wifiCount > 0 ? Math.round(wifiTotal / wifiCount) : 320,
            byCategory,
            perPersonCost: Math.round(totalCost / Math.max(1, travelers)),
            dailyAvg: Math.round(totalCost / Math.max(1, days.length))
        };
    }, [days, travelers]);

    // Add a new day to the itinerary
    const handleAddDay = () => {
        const lastDay = days[days.length - 1];
        const nextNum = days.length + 1;
        const newDay = {
            id: `day-${Date.now()}`,
            dayNumber: nextNum,
            city: lastDay ? lastDay.city : 'Lisbon',
            country: lastDay ? lastDay.country : 'Portugal',
            flag: lastDay ? lastDay.flag : '🇵🇹',
            transitMode: 'Local Metro / Walkable',
            weather: '21°C · Clear',
            stops: [
                {
                    id: `stop-${Date.now()}`,
                    time: '09:30 - 13:00',
                    category: 'work',
                    title: 'Morning Deep Work & Coffee Session',
                    location: lastDay ? lastDay.city : 'Nomad Hub',
                    cost: 20,
                    wifiMbps: 350,
                    booked: false,
                    note: 'High-speed fiber workspace block.'
                }
            ]
        };
        const updated = [...days, newDay];
        setDays(updated);
        setSelectedDayIndex(updated.length - 1);
        addToast(`Added Day ${nextNum} to your itinerary`, 'success');
    };

    // Add custom stop to active day
    const handleCreateStop = (e) => {
        e.preventDefault();
        if (!newStopTitle.trim()) return;

        const created = {
            id: `stop-${Date.now()}`,
            time: newStopTime || '14:00 - 16:00',
            category: newStopCategory,
            title: newStopTitle.trim(),
            location: newStopLocation.trim() || activeDay.city,
            cost: Number(newStopCost) || 0,
            wifiMbps: Number(newStopWifi) || 0,
            booked: false,
            note: newStopNote.trim() || 'Added via Itinerary Builder.'
        };

        setDays((prev) =>
            prev.map((d, idx) =>
                idx === selectedDayIndex ? { ...d, stops: [...d.stops, created] } : d
            )
        );

        setNewStopTitle('');
        setNewStopLocation('');
        setNewStopNote('');
        setShowAddStopForm(false);
        addToast(`Added "${created.title}" to Day ${activeDay.dayNumber}`, 'success');
    };

    // Quick-insert from Curated Gems or Saved Vibes
    const handleQuickInsertStop = (item) => {
        const inserted = {
            id: `stop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            time: item.time || '15:00 - 17:30',
            category: item.category || 'culture',
            title: item.title,
            location: item.location || activeDay.city,
            cost: Number(item.cost ?? 25),
            wifiMbps: Number(item.wifiMbps ?? 0),
            booked: false,
            note: item.note || 'Imported from your Saved Vault.'
        };

        setDays((prev) =>
            prev.map((d, idx) =>
                idx === selectedDayIndex ? { ...d, stops: [...d.stops, inserted] } : d
            )
        );
        addToast(`Added "${item.title}" to Day ${activeDay.dayNumber}`, 'success');
    };

    // Reorder stop up/down
    const handleMoveStop = (stopIndex, direction) => {
        const targetIndex = direction === 'up' ? stopIndex - 1 : stopIndex + 1;
        if (!activeDay || targetIndex < 0 || targetIndex >= activeDay.stops.length) return;

        setDays((prev) =>
            prev.map((d, idx) => {
                if (idx !== selectedDayIndex) return d;
                const copy = [...d.stops];
                const [moved] = copy.splice(stopIndex, 1);
                copy.splice(targetIndex, 0, moved);
                return { ...d, stops: copy };
            })
        );
    };

    // Toggle booked state
    const handleToggleBooked = (stopId) => {
        setDays((prev) =>
            prev.map((d, idx) =>
                idx === selectedDayIndex
                    ? {
                          ...d,
                          stops: d.stops.map((s) =>
                              s.id === stopId ? { ...s, booked: !s.booked } : s
                          )
                      }
                    : d
            )
        );
    };

    // Delete stop
    const handleDeleteStop = (stopId) => {
        setDays((prev) =>
            prev.map((d, idx) =>
                idx === selectedDayIndex
                    ? { ...d, stops: d.stops.filter((s) => s.id !== stopId) }
                    : d
            )
        );
        addToast('Removed stop from day schedule', 'info');
    };

    // AI Smart Sequence & Time Optimization
    const handleAIOptimizeSchedule = () => {
        const orderWeights = { transit: 1, work: 2, stay: 3, culture: 4, dining: 5 };
        const timeSlots = [
            '08:30 - 10:30',
            '11:00 - 14:30',
            '15:00 - 17:00',
            '17:30 - 19:00',
            '19:30 - 21:30'
        ];

        setDays((prev) =>
            prev.map((d) => {
                const sorted = [...d.stops].sort(
                    (a, b) => (orderWeights[a.category] || 4) - (orderWeights[b.category] || 4)
                );
                return {
                    ...d,
                    stops: sorted.map((s, i) => ({
                        ...s,
                        time: timeSlots[i] || s.time
                    }))
                };
            })
        );
        addToast('ChronoRoute™ AI sequenced all daily stops for optimal transit & deep work!', 'success');
    };

    // Export Itinerary JSON
    const handleExportItinerary = () => {
        const payload = {
            title: tripTitle,
            startDate,
            travelers,
            pace,
            targetBudget,
            telemetry,
            days
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tripTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-itinerary.json`;
        a.click();
        URL.revokeObjectURL(url);
        addToast('Exported full itinerary JSON package', 'success');
    };

    const handleShareItinerary = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            addToast('Itinerary link copied to clipboard!', 'success');
        } catch {
            addToast('Ready to share itinerary', 'info');
        }
    };

    return (
        <div className="itinerary-builder-shell">
            {/* 1. Top Command Header */}
            <header className="ib-command-header">
                <div className="ib-header-top-row">
                    <div className="ib-title-area">
                        <span className="ib-kicker">
                            <GitBranch size={13} />
                            SeeNomad ChronoRoute™ · Day-by-Day Itinerary & Multi-Stop Architect
                        </span>
                        <div className="ib-title-input-row">
                            <input
                                type="text"
                                className="ib-title-input"
                                value={tripTitle}
                                onChange={(e) => setTripTitle(e.target.value)}
                                aria-label="Itinerary title"
                            />
                        </div>
                        <p className="ib-subtitle">
                            Sequence daily stops, high-speed rail legs, verified 300+ Mbps work blocks, and stays with live budget telemetry.
                        </p>
                    </div>

                    <div className="ib-header-actions">
                        <button
                            type="button"
                            className="ib-btn ib-btn-ai"
                            onClick={handleAIOptimizeSchedule}
                        >
                            <Sparkles size={14} />
                            AI Auto-Optimize
                        </button>
                        <button
                            type="button"
                            className="ib-btn"
                            onClick={() => navigate('/explore/travel-map')}
                        >
                            <Map size={14} />
                            3D Route Map
                        </button>
                        <button
                            type="button"
                            className="ib-btn"
                            onClick={handleExportItinerary}
                        >
                            <Download size={14} />
                            Export
                        </button>
                        <button
                            type="button"
                            className="ib-btn"
                            onClick={handleShareItinerary}
                        >
                            <Share2 size={14} />
                            Share
                        </button>
                        <button
                            type="button"
                            className="ib-btn ib-btn-primary"
                            onClick={() => navigate('/explore/book-travel')}
                        >
                            <Plane size={14} />
                            Book Route (${telemetry.totalCost})
                        </button>
                    </div>
                </div>

                {/* Preset Templates & Editable Trip Parameters */}
                <div className="ib-controls-bar">
                    <div className="ib-template-pills" role="tablist" aria-label="Preset itineraries">
                        {PRESET_ITINERARIES.map((tpl) => (
                            <button
                                key={tpl.id}
                                type="button"
                                className={`ib-template-chip ${activeTemplateId === tpl.id ? 'active' : ''}`}
                                onClick={() => handleSelectTemplate(tpl)}
                            >
                                <span>{tpl.badge}</span>
                                <span>·</span>
                                <span>{tpl.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="ib-meta-inputs">
                        <label className="ib-meta-field">
                            <Calendar size={13} />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                aria-label="Start date"
                            />
                        </label>
                        <label className="ib-meta-field">
                            <Users size={13} />
                            <select
                                value={travelers}
                                onChange={(e) => setTravelers(Number(e.target.value))}
                                aria-label="Travelers"
                            >
                                <option value={1}>1 Solo Nomad</option>
                                <option value={2}>2 Travelers</option>
                                <option value={4}>4 Creator Crew</option>
                                <option value={8}>8 Team Retreat</option>
                            </select>
                        </label>
                        <label className="ib-meta-field">
                            <DollarSign size={13} />
                            <span>Budget:</span>
                            <input
                                type="number"
                                style={{ width: '68px' }}
                                value={targetBudget}
                                onChange={(e) => setTargetBudget(Number(e.target.value) || 0)}
                                aria-label="Target budget"
                            />
                        </label>
                    </div>
                </div>
            </header>

            {/* 2. Unboxed Telemetry KPI Strip & View Switcher */}
            <div className="ib-subbar-row">
                <div className="ib-kpi-strip">
                    <span className="ib-kpi-item">
                        Duration: <strong>{days.length} Days</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="ib-kpi-item">
                        Scheduled Stops: <strong>{telemetry.totalStops}</strong> ({telemetry.bookedStops} Booked)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                        className={`ib-kpi-item ${
                            telemetry.totalCost > targetBudget ? 'over-budget' : 'under-budget'
                        }`}
                    >
                        Est. Total: <strong>${telemetry.totalCost.toLocaleString()}</strong> / ${targetBudget.toLocaleString()} (${telemetry.dailyAvg}/day)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="ib-kpi-item">
                        Avg Workspace Wi-Fi: <strong>{telemetry.avgWifi} Mbps</strong>
                    </span>
                </div>

                <div className="ib-view-tabs" role="tablist" aria-label="Itinerary workspace view">
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'timeline' ? 'active' : ''}`}
                        onClick={() => setActiveView('timeline')}
                    >
                        <Calendar size={13} />
                        Day-by-Day Schedule
                    </button>
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'route' ? 'active' : ''}`}
                        onClick={() => setActiveView('route')}
                    >
                        <Train size={13} />
                        Multi-City Route Matrix
                    </button>
                    <button
                        type="button"
                        className={`ib-view-tab ${activeView === 'budget' ? 'active' : ''}`}
                        onClick={() => setActiveView('budget')}
                    >
                        <DollarSign size={13} />
                        Budget & Packing
                    </button>
                </div>
            </div>

            {/* 3A. DAY-BY-DAY TIMELINE VIEW */}
            {activeView === 'timeline' && activeDay && (
                <div className="ib-workspace-grid">
                    {/* Left Column: Day Selector */}
                    <aside className="ib-days-sidebar" aria-label="Itinerary days">
                        <div className="ib-panel-heading">
                            <span>Itinerary Days ({days.length})</span>
                            <span>{pace}</span>
                        </div>
                        <div className="ib-days-list">
                            {days.map((d, idx) => {
                                const dayCost = d.stops.reduce((sum, s) => sum + (Number(s.cost) || 0), 0);
                                return (
                                    <button
                                        key={d.id}
                                        type="button"
                                        className={`ib-day-nav-btn ${selectedDayIndex === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedDayIndex(idx)}
                                    >
                                        <div className="ib-day-nav-left">
                                            <span className="ib-day-num">
                                                Day {d.dayNumber} · {d.flag}
                                            </span>
                                            <span className="ib-day-city">{d.city}</span>
                                        </div>
                                        <span className="ib-day-meta">
                                            {d.stops.length} stops · ${dayCost}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <button type="button" className="ib-add-day-btn" onClick={handleAddDay}>
                            <Plus size={14} />
                            Add Day {days.length + 1}
                        </button>
                    </aside>

                    {/* Center Column: Selected Day Schedule */}
                    <section className="ib-day-canvas" aria-label={`Day ${activeDay.dayNumber} schedule`}>
                        <div className="ib-day-canvas-header">
                            <div className="ib-day-header-info">
                                <h3>
                                    <span>{activeDay.flag}</span>
                                    <span>
                                        Day {activeDay.dayNumber}: {activeDay.city}
                                    </span>
                                </h3>
                                <p className="ib-day-header-sub">
                                    <span>
                                        <Train size={12} style={{ display: 'inline', marginRight: 4 }} />
                                        {activeDay.transitMode}
                                    </span>
                                    <span>·</span>
                                    <span>{activeDay.weather}</span>
                                    <span>·</span>
                                    <span>
                                        Day Spend: $
                                        {activeDay.stops.reduce((acc, s) => acc + (Number(s.cost) || 0), 0)}
                                    </span>
                                </p>
                            </div>

                            <button
                                type="button"
                                className="ib-btn ib-btn-primary"
                                onClick={() => setShowAddStopForm((prev) => !prev)}
                            >
                                <Plus size={14} />
                                {showAddStopForm ? 'Close Form' : 'Add Custom Stop'}
                            </button>
                        </div>

                        {/* Optional Inline Add Stop Form */}
                        {showAddStopForm && (
                            <form className="ib-add-stop-form" onSubmit={handleCreateStop}>
                                <div className="ib-form-grid">
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Activity or stop title..."
                                        value={newStopTitle}
                                        onChange={(e) => setNewStopTitle(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Time (e.g. 14:00 - 16:00)"
                                        value={newStopTime}
                                        onChange={(e) => setNewStopTime(e.target.value)}
                                    />
                                    <select
                                        className="ib-form-select"
                                        value={newStopCategory}
                                        onChange={(e) => setNewStopCategory(e.target.value)}
                                    >
                                        <option value="work">Deep Work & Fiber</option>
                                        <option value="transit">Transit & Rail</option>
                                        <option value="stay">Stay & Coliving</option>
                                        <option value="culture">Culture & Sights</option>
                                        <option value="dining">Food & Dining</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        placeholder="Neighborhood / Venue"
                                        value={newStopLocation}
                                        onChange={(e) => setNewStopLocation(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="ib-form-input"
                                        placeholder="Cost ($)"
                                        value={newStopCost}
                                        onChange={(e) => setNewStopCost(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="ib-form-input"
                                        placeholder="Wi-Fi Mbps (optional)"
                                        value={newStopWifi}
                                        onChange={(e) => setNewStopWifi(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        className="ib-form-input"
                                        style={{ flex: 1 }}
                                        placeholder="Traveler notes, seat number, or booking reminder..."
                                        value={newStopNote}
                                        onChange={(e) => setNewStopNote(e.target.value)}
                                    />
                                    <button type="submit" className="ib-btn ib-btn-primary">
                                        <Check size={14} />
                                        Save Stop
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Stops Timeline */}
                        <div className="ib-stops-timeline">
                            {activeDay.stops.map((stop, sIdx) => {
                                const catInfo = CATEGORY_META[stop.category] || CATEGORY_META.culture;
                                const CatIcon = catInfo.icon;

                                return (
                                    <article
                                        key={stop.id}
                                        className={`ib-stop-card ${stop.booked ? 'is-booked' : ''}`}
                                    >
                                        <div className="ib-stop-time-col">
                                            <span className="ib-stop-time">{stop.time}</span>
                                            <span className="ib-stop-cat-label">
                                                <CatIcon size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                {catInfo.label}
                                            </span>
                                        </div>

                                        <div className="ib-stop-body">
                                            <h4 className="ib-stop-title">{stop.title}</h4>
                                            <div className="ib-stop-meta-line">
                                                <span>
                                                    <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {stop.location}
                                                </span>
                                                <span>·</span>
                                                <span>${stop.cost}</span>
                                                {stop.wifiMbps > 0 && (
                                                    <>
                                                        <span>·</span>
                                                        <span>
                                                            <Wifi size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                            {stop.wifiMbps} Mbps
                                                        </span>
                                                    </>
                                                )}
                                                <span>·</span>
                                                <span>{stop.booked ? 'Booked ✓' : 'Planned'}</span>
                                            </div>
                                            {stop.note && <p className="ib-stop-note">{stop.note}</p>}
                                        </div>

                                        <div className="ib-stop-actions">
                                            <button
                                                type="button"
                                                className={`ib-icon-btn ${stop.booked ? 'booked-active' : ''}`}
                                                onClick={() => handleToggleBooked(stop.id)}
                                                title={stop.booked ? 'Marked as Booked' : 'Mark as Booked'}
                                                aria-label="Toggle booked status"
                                            >
                                                <CheckCircle2 size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="ib-icon-btn"
                                                onClick={() => handleMoveStop(sIdx, 'up')}
                                                disabled={sIdx === 0}
                                                title="Move earlier"
                                                aria-label="Move stop up"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="ib-icon-btn"
                                                onClick={() => handleMoveStop(sIdx, 'down')}
                                                disabled={sIdx === activeDay.stops.length - 1}
                                                title="Move later"
                                                aria-label="Move stop down"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="ib-icon-btn delete"
                                                onClick={() => handleDeleteStop(stop.id)}
                                                title="Remove stop"
                                                aria-label="Remove stop"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    {/* Right Column: Smart Discovery & Saved Vibes Vault */}
                    <aside className="ib-discovery-panel" aria-label="Quick add recommendations and saved vault">
                        <div className="ib-panel-heading">
                            <span>Quick-Add to Day {activeDay.dayNumber}</span>
                            <Sparkles size={13} />
                        </div>

                        <div className="ib-discovery-list">
                            {/* Pull from user's Saved Vibes if any exist */}
                            {savedVibes.slice(0, 2).map((vibe) => (
                                <div key={`vibe-${vibe.id}`} className="ib-discovery-card">
                                    <div className="ib-discovery-card-top">
                                        <h4>
                                            <Bookmark size={11} style={{ display: 'inline', marginRight: 4 }} />
                                            {vibe.title}
                                        </h4>
                                        <button
                                            type="button"
                                            className="ib-btn"
                                            style={{ padding: '0.22rem 0.5rem', fontSize: '0.68rem' }}
                                            onClick={() =>
                                                handleQuickInsertStop({
                                                    title: vibe.title,
                                                    location: vibe.location,
                                                    category: 'culture',
                                                    cost: 25,
                                                    wifiMbps: parseInt(vibe.wifi, 10) || 0,
                                                    note: `Cloned from Saved Vibe by ${vibe.creator}`
                                                })
                                            }
                                        >
                                            + Day {activeDay.dayNumber}
                                        </button>
                                    </div>
                                    <div className="ib-discovery-meta">
                                        <span>Saved Vibe</span>
                                        <span>·</span>
                                        <span>{vibe.location}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Pull from Saved Destinations if any exist */}
                            {savedDestinations.slice(0, 2).map((dest) => (
                                <div key={`dest-${dest.id}`} className="ib-discovery-card">
                                    <div className="ib-discovery-card-top">
                                        <h4>{dest.name || dest.title}</h4>
                                        <button
                                            type="button"
                                            className="ib-btn"
                                            style={{ padding: '0.22rem 0.5rem', fontSize: '0.68rem' }}
                                            onClick={() =>
                                                handleQuickInsertStop({
                                                    title: `Explore ${dest.name || dest.title}`,
                                                    location: dest.country || activeDay.city,
                                                    category: 'culture',
                                                    cost: 30,
                                                    wifiMbps: dest.internetSpeed || 250,
                                                    note: 'Imported from Saved Wishlist'
                                                })
                                            }
                                        >
                                            + Day {activeDay.dayNumber}
                                        </button>
                                    </div>
                                    <div className="ib-discovery-meta">
                                        <span>Wishlist Hub</span>
                                        <span>·</span>
                                        <span>{dest.country || 'Global'}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Curated Nomad & Local Gems */}
                            {CURATED_GEMS_CATALOG.map((gem) => (
                                <div key={gem.id} className="ib-discovery-card">
                                    <div className="ib-discovery-card-top">
                                        <h4>{gem.title}</h4>
                                        <button
                                            type="button"
                                            className="ib-btn"
                                            style={{ padding: '0.22rem 0.5rem', fontSize: '0.68rem' }}
                                            onClick={() => handleQuickInsertStop(gem)}
                                        >
                                            + Day {activeDay.dayNumber}
                                        </button>
                                    </div>
                                    <div className="ib-discovery-meta">
                                        <span>{gem.time}</span>
                                        <span>·</span>
                                        <span>${gem.cost}</span>
                                        {gem.wifiMbps > 0 && (
                                            <>
                                                <span>·</span>
                                                <span>{gem.wifiMbps} Mbps</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            )}

            {/* 3B. MULTI-CITY ROUTE MATRIX VIEW */}
            {activeView === 'route' && (
                <div className="ib-matrix-grid">
                    {days.map((d, idx) => {
                        const legCost = d.stops.reduce((acc, s) => acc + (Number(s.cost) || 0), 0);
                        return (
                            <div key={d.id} className="ib-matrix-card">
                                <div className="ib-panel-heading">
                                    <span>
                                        Leg {idx + 1} · Day {d.dayNumber}
                                    </span>
                                    <span>{d.flag}</span>
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{d.city}</h3>
                                <p style={{ margin: 0, fontSize: '0.76rem', color: '#94a3b8' }}>
                                    Transit Corridor: <strong>{d.transitMode}</strong>
                                </p>
                                <p style={{ margin: 0, fontSize: '0.76rem', color: '#94a3b8' }}>
                                    Scheduled Activities: <strong>{d.stops.length} stops</strong> · Spend:{' '}
                                    <strong>${legCost}</strong>
                                </p>
                                <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.35rem' }}>
                                    <button
                                        type="button"
                                        className="ib-btn"
                                        onClick={() => {
                                            setSelectedDayIndex(idx);
                                            setActiveView('timeline');
                                        }}
                                    >
                                        Edit Day {d.dayNumber}
                                    </button>
                                    <button
                                        type="button"
                                        className="ib-btn"
                                        onClick={() => navigate('/explore/visa')}
                                    >
                                        Visa Rules
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 3C. BUDGET & PACKING INTELLIGENCE VIEW */}
            {activeView === 'budget' && (
                <div className="ib-matrix-grid">
                    <div className="ib-matrix-card">
                        <div className="ib-panel-heading">
                            <span>Category Spend Breakdown</span>
                            <span>${telemetry.totalCost} Total</span>
                        </div>
                        {Object.entries(CATEGORY_META).map(([catKey, meta]) => {
                            const amount = telemetry.byCategory[catKey] || 0;
                            const pct =
                                telemetry.totalCost > 0
                                    ? Math.min(100, Math.round((amount / telemetry.totalCost) * 100))
                                    : 0;
                            return (
                                <div key={catKey} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '0.76rem'
                                        }}
                                    >
                                        <span>{meta.label}</span>
                                        <strong>
                                            ${amount} ({pct}%)
                                        </strong>
                                    </div>
                                    <div className="ib-progress-track">
                                        <div className="ib-progress-fill" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                            Per Traveler Split ({travelers}x): <strong>${telemetry.perPersonCost}</strong> · Daily
                            Average: <strong>${telemetry.dailyAvg}/day</strong>
                        </p>
                    </div>

                    <div className="ib-matrix-card">
                        <div className="ib-panel-heading">
                            <span>Nomad Pre-Departure & Gear Checklist</span>
                            <Briefcase size={13} />
                        </div>
                        {[
                            { id: 'passport', label: 'Passport valid 6+ months & DNV / Entry QR stored' },
                            { id: 'esim', label: 'Global 5G eSIM activated for arrival airport rail' },
                            { id: 'adapter', label: '100W GaN Universal Travel Adapter & USB-C Hub' },
                            { id: 'powerbank', label: 'Airline-safe 99Wh Laptop Power Bank for Shinkansen/Rail' },
                            { id: 'insurance', label: 'Nomad Medical & Equipment Insurance Policy active' }
                        ].map((item) => (
                            <label
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.78rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!checkedPacking[item.id]}
                                    onChange={() =>
                                        setCheckedPacking((prev) => ({
                                            ...prev,
                                            [item.id]: !prev[item.id]
                                        }))
                                    }
                                />
                                <span>{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NomadPlanner;
