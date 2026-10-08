import React, { useState } from 'react';
import {
    Plane,
    Building2,
    MapPin,
    Train,
    Bus,
    Car,
    ArrowLeftRight,
    Calendar,
    Users,
    Search,
    Sparkles,
    Star,
    Clock,
    ShieldCheck,
    Wifi,
    BadgePercent,
    CheckCircle2,
    ChevronDown,
    Filter,
    Compass,
    TrendingDown,
    Luggage
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import '../../styles/BookTravelHub.css';

const BOOKING_MODES = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'holidays', label: 'Holidays', icon: MapPin },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'cabs', label: 'Cabs', icon: Car }
];

const FLIGHT_RESULTS = [
    {
        id: 'fl-1',
        airline: 'Air India Express',
        code: 'IX-1142',
        logo: '✈️',
        fromCity: 'New Delhi',
        fromCode: 'DEL',
        toCity: 'Mumbai',
        toCode: 'BOM',
        depTime: '07:15',
        arrTime: '09:25',
        duration: '2h 10m',
        stops: 'Non-Stop',
        wifi: 'In-flight Wi-Fi',
        baggage: '15 kg Check-in + 7 kg Cabin',
        price: 68,
        inrPrice: '₹5,690',
        badge: 'Best Value',
        refundable: true
    },
    {
        id: 'fl-2',
        airline: 'IndiGo',
        code: '6E-2054',
        logo: '🛫',
        fromCity: 'New Delhi',
        fromCode: 'DEL',
        toCity: 'Mumbai',
        toCode: 'BOM',
        depTime: '10:30',
        arrTime: '12:45',
        duration: '2h 15m',
        stops: 'Non-Stop',
        wifi: 'Fast Boarding',
        baggage: '15 kg Check-in + 7 kg Cabin',
        price: 74,
        inrPrice: '₹6,150',
        badge: 'On-Time 96%',
        refundable: true
    },
    {
        id: 'fl-3',
        airline: 'Vistara / Air India',
        code: 'AI-865',
        logo: '🌐',
        fromCity: 'New Delhi',
        fromCode: 'DEL',
        toCity: 'Mumbai',
        toCode: 'BOM',
        depTime: '17:00',
        arrTime: '19:10',
        duration: '2h 10m',
        stops: 'Non-Stop',
        wifi: 'Hot Meal + Lounge Option',
        baggage: '25 kg Check-in + 7 kg Cabin',
        price: 89,
        inrPrice: '₹7,420',
        badge: 'Nomad Flex',
        refundable: true
    }
];

const HOTEL_RESULTS = [
    {
        id: 'ht-1',
        name: 'The Taj Mahal Palace & Nomad Wing',
        location: 'Colaba, Mumbai · 200m from Gateway',
        rating: 4.9,
        reviews: 1280,
        wifiSpeed: '340 Mbps Verified',
        price: 165,
        inrPrice: '₹13,800',
        perks: ['Free Breakfast', 'Ergonomic Desk', '24/7 Cowork Lounge'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
        tag: 'Top Rated'
    },
    {
        id: 'ht-2',
        name: 'Soho House & Beach Coliving Juhu',
        location: 'Juhu Beach, Mumbai · Seafront',
        rating: 4.8,
        reviews: 845,
        wifiSpeed: '410 Mbps Fiber',
        price: 120,
        inrPrice: '₹9,950',
        perks: ['Rooftop Pool', 'Creator Studio', 'Airport Transfer'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
        tag: 'Nomad Favorite'
    },
    {
        id: 'ht-3',
        name: 'Zostel Plus & Workation Hub',
        location: 'Bandra West, Mumbai · Cafe District',
        rating: 4.7,
        reviews: 620,
        wifiSpeed: '250 Mbps Dual-ISP',
        price: 48,
        inrPrice: '₹3,990',
        perks: ['Private Suites', 'Specialty Coffee', 'Community Mixer'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80',
        tag: 'Best Long-Stay'
    }
];

const HOLIDAY_PACKAGES = [
    {
        id: 'hol-1',
        title: 'Kashmir Alpine & Houseboat Escape',
        duration: '5 Nights / 6 Days',
        cities: 'Srinagar • Gulmarg • Pahalgam',
        includes: 'Flights + 4★ Stays + Shikara Ride + Transfers',
        rating: 4.9,
        price: 389,
        inrPrice: '₹32,499',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80',
        badge: 'All-Inclusive'
    },
    {
        id: 'hol-2',
        title: 'Goa Beach Villa & Workation Retreat',
        duration: '6 Nights / 7 Days',
        cities: 'Assagao • Anjuna • Mandrem',
        includes: 'Boutique Villa + Scooter + Coworking Pass + Breakfast',
        rating: 4.8,
        price: 295,
        inrPrice: '₹24,500',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
        badge: 'Creator Pick'
    },
    {
        id: 'hol-3',
        title: 'Kerala Backwaters & Munnar Tea Trails',
        duration: '5 Nights / 6 Days',
        cities: 'Kochi • Munnar • Alleppey',
        includes: 'Private Luxury Houseboat + Tea Estate Resort + Cab',
        rating: 4.9,
        price: 340,
        inrPrice: '₹28,400',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
        badge: 'Bestseller'
    }
];

const TRAIN_RESULTS = [
    {
        id: 'tr-1',
        name: '12952 / Mumbai Rajdhani Express',
        from: 'New Delhi (NDLS)',
        to: 'Mumbai Central (MMCT)',
        depTime: '16:55',
        arrTime: '08:35 (+1)',
        duration: '15h 40m',
        classes: [
            { code: '3A', name: 'AC 3 Tier', price: '$26 (₹2,180)', status: 'AVAILABLE 42' },
            { code: '2A', name: 'AC 2 Tier', price: '$38 (₹3,150)', status: 'AVAILABLE 18' },
            { code: '1A', name: 'First AC', price: '$64 (₹5,320)', status: 'AVAILABLE 06' }
        ]
    },
    {
        id: 'tr-2',
        name: '22436 / Vande Bharat Express',
        from: 'New Delhi (NDLS)',
        to: 'Varanasi / Regional Hub',
        depTime: '06:00',
        arrTime: '14:00',
        duration: '08h 00m',
        classes: [
            { code: 'CC', name: 'AC Chair Car', price: '$22 (₹1,840)', status: 'AVAILABLE 84' },
            { code: 'EC', name: 'Executive Class', price: '$41 (₹3,420)', status: 'AVAILABLE 21' }
        ]
    }
];

const BUS_RESULTS = [
    {
        id: 'bs-1',
        operator: 'Zingbus Maxx Volvo 9600 Multi-Axle',
        type: 'A/C Sleeper (2+1) · Live GPS & Lounge',
        from: 'Delhi ISBT Kashmere Gate',
        to: 'Manali / Jaipur / Mumbai Corridor',
        depTime: '21:30',
        arrTime: '07:45',
        rating: 4.8,
        price: '$19 (₹1,599)',
        seatsLeft: 14
    },
    {
        id: 'bs-2',
        operator: 'IntrCity SmartBus Luxury Sleeper',
        type: 'Washroom Onboard · Wi-Fi & Charging',
        from: 'Gurgaon IFFCO Chowk',
        to: 'Udaipur / Ahmedabad / Mumbai',
        depTime: '22:15',
        arrTime: '08:10',
        rating: 4.7,
        price: '$17 (₹1,420)',
        seatsLeft: 9
    }
];

const CAB_RESULTS = [
    {
        id: 'cb-1',
        vehicle: 'Toyota Innova Crysta (SUV · 6 Seats)',
        category: 'Outstation & Airport Chauffeur',
        inclusions: 'Fuel, State Taxes, Toll & Verified English-Speaking Driver',
        rating: 4.9,
        price: '$45 (₹3,750)',
        eta: 'Pickup in 15 mins'
    },
    {
        id: 'cb-2',
        vehicle: 'Honda City / Hyundai Verna (Prime Sedan)',
        category: 'Intercity Express & Airport Transfer',
        inclusions: 'Zero Cancellation Fee up to 1 hr before pickup',
        rating: 4.8,
        price: '$29 (₹2,420)',
        eta: 'Pickup in 10 mins'
    }
];

const POPULAR_CITIES = [
    { city: 'New Delhi', country: 'India', code: 'DEL', airport: 'Indira Gandhi Intl Airport' },
    { city: 'Mumbai', country: 'India', code: 'BOM', airport: 'Chhatrapati Shivaji Maharaj Intl' },
    { city: 'Bengaluru', country: 'India', code: 'BLR', airport: 'Kempegowda Intl Airport' },
    { city: 'Goa', country: 'India', code: 'GOI', airport: 'Manohar / Dabolim Intl Airport' },
    { city: 'Dubai', country: 'UAE', code: 'DXB', airport: 'Dubai International Airport' },
    { city: 'Bangkok', country: 'Thailand', code: 'BKK', airport: 'Suvarnabhumi Intl Airport' },
    { city: 'Bali (Denpasar)', country: 'Indonesia', code: 'DPS', airport: 'Ngurah Rai Intl Airport' },
    { city: 'Lisbon', country: 'Portugal', code: 'LIS', airport: 'Humberto Delgado Airport' },
    { city: 'Tokyo', country: 'Japan', code: 'HND', airport: 'Haneda / Narita Intl' },
    { city: 'London', country: 'United Kingdom', code: 'LHR', airport: 'Heathrow Airport' }
];

const BookTravelHub = ({ defaultTab = 'flights' }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [activeMode, setActiveMode] = useState(defaultTab);
    const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'round-trip' | 'multi-city'

    // Search form states matching reference screenshot defaults ("New Delhi, India" -> "Mumbai, India")
    const [fromCity, setFromCity] = useState('New Delhi');
    const [fromCountry, setFromCountry] = useState('India');
    const [toCity, setToCity] = useState('Mumbai');
    const [toCountry, setToCountry] = useState('India');
    const [departureDate, setDepartureDate] = useState('2026-10-24');
    const [returnDate, setReturnDate] = useState('2026-10-31');
    const [travellersCount, setTravellersCount] = useState(1);
    const [cabinClass, setCabinClass] = useState('Economy');
    const [showTravellerPopover, setShowTravellerPopover] = useState(false);
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    //Multi-city legs
    const [multiLegs, setMultiLegs] = useState([
        { from: 'New Delhi', to: 'Mumbai', date: '2026-10-24' },
        { from: 'Mumbai', to: 'Goa', date: '2026-10-29' }
    ]);

    const [isSearching, setIsSearching] = useState(false);
    const [bookedIds, setBookedIds] = useState({});

    const handleSwapCities = () => {
        const tempCity = fromCity;
        const tempCountry = fromCountry;
        setFromCity(toCity);
        setFromCountry(toCountry);
        setToCity(tempCity);
        setToCountry(tempCountry);
    };

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            addToast(
                `Showing live ${activeMode.toUpperCase()} options for ${fromCity} → ${toCity}! ✈️`,
                'success'
            );
        }, 350);
    };

    const handleBookItem = (id, title, priceLabel) => {
        setBookedIds((prev) => ({ ...prev, [id]: true }));
        addToast(`Reserved "${title}" (${priceLabel})! Added to My Trips & Journey.`, 'success');
    };

    return (
        <div className="book-travel-page">
            {/* 1. Hero Banner — Exact Match to User Screenshot */}
            <div className="bt-hero-banner">
                <img
                    src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&auto=format&fit=crop&q=85"
                    alt="Travel Map, Camera and Passport"
                    className="bt-hero-bg-img"
                />
                <div className="bt-hero-overlay">
                    <div className="bt-hero-text-content">
                        <h1>Book Your Next Adventure</h1>
                        <p>Flights · Hotels · Holidays · Trains · Buses · Cabs</p>
                    </div>
                </div>
            </div>

            {/* 2. Main Booking Card with 6 Mode Tabs & Search Bar */}
            <div className="bt-search-card">
                {/* 6 Transport / Booking Mode Tabs */}
                <div className="bt-mode-tabs-bar" role="tablist" aria-label="Booking categories">
                    {BOOKING_MODES.map((mode) => {
                        const IconComp = mode.icon;
                        const isActive = activeMode === mode.id;
                        return (
                            <button
                                key={mode.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`bt-mode-tab ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveMode(mode.id)}
                            >
                                <IconComp size={16} />
                                <span>{mode.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Trip Type Sub-Toggles (One Way / Round Trip / Multi City) */}
                {(activeMode === 'flights' || activeMode === 'trains' || activeMode === 'buses' || activeMode === 'cabs') && (
                    <div className="bt-trip-type-bar">
                        <button
                            type="button"
                            className={`bt-trip-type-btn ${tripType === 'one-way' ? 'active' : ''}`}
                            onClick={() => setTripType('one-way')}
                        >
                            One Way
                        </button>
                        <button
                            type="button"
                            className={`bt-trip-type-btn ${tripType === 'round-trip' ? 'active' : ''}`}
                            onClick={() => setTripType('round-trip')}
                        >
                            Round Trip
                        </button>
                        <button
                            type="button"
                            className={`bt-trip-type-btn ${tripType === 'multi-city' ? 'active' : ''}`}
                            onClick={() => setTripType('multi-city')}
                        >
                            Multi City
                        </button>

                        <button
                            type="button"
                            className="bt-multi-expedition-link"
                            onClick={() => navigate('/explore/multi-city')}
                        >
                            <Compass size={13} />
                            <span>Open Multi-Country Nomad Expedition Planner</span>
                        </button>
                    </div>
                )}

                {/* Search Inputs Grid */}
                {tripType !== 'multi-city' ? (
                    <form className="bt-search-grid" onSubmit={handleSearchSubmit}>
                        {/* FROM BOX */}
                        <div className="bt-field-box" onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}>
                            <span className="bt-field-label">
                                {activeMode === 'hotels' ? 'City, Property or Location' : 'From'}
                            </span>
                            <input
                                type="text"
                                className="bt-field-city-input"
                                value={fromCity}
                                onChange={(e) => setFromCity(e.target.value)}
                                aria-label="Origin city"
                            />
                            <span className="bt-field-sub">{fromCountry}</span>

                            {showFromDropdown && (
                                <div className="bt-city-dropdown" onClick={(e) => e.stopPropagation()}>
                                    {POPULAR_CITIES.map((item) => (
                                        <button
                                            key={item.code}
                                            type="button"
                                            className="bt-city-option"
                                            onClick={() => {
                                                setFromCity(item.city);
                                                setFromCountry(item.country);
                                                setShowFromDropdown(false);
                                            }}
                                        >
                                            <div>
                                                <strong>{item.city}, {item.country}</strong>
                                                <span>{item.airport}</span>
                                            </div>
                                            <span className="bt-airport-code">{item.code}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* SWAP BUTTON */}
                        {activeMode !== 'hotels' && (
                            <button
                                type="button"
                                className="bt-swap-circle-btn"
                                onClick={handleSwapCities}
                                aria-label="Swap origin and destination"
                                title="Swap locations"
                            >
                                <ArrowLeftRight size={16} />
                            </button>
                        )}

                        {/* TO BOX */}
                        {activeMode !== 'hotels' && (
                            <div className="bt-field-box" onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}>
                                <span className="bt-field-label">To</span>
                                <input
                                    type="text"
                                    className="bt-field-city-input"
                                    value={toCity}
                                    onChange={(e) => setToCity(e.target.value)}
                                    aria-label="Destination city"
                                />
                                <span className="bt-field-sub">{toCountry}</span>

                                {showToDropdown && (
                                    <div className="bt-city-dropdown" onClick={(e) => e.stopPropagation()}>
                                        {POPULAR_CITIES.map((item) => (
                                            <button
                                                key={item.code}
                                                type="button"
                                                className="bt-city-option"
                                                onClick={() => {
                                                    setToCity(item.city);
                                                    setToCountry(item.country);
                                                    setShowToDropdown(false);
                                                }}
                                            >
                                                <div>
                                                    <strong>{item.city}, {item.country}</strong>
                                                    <span>{item.airport}</span>
                                                </div>
                                                <span className="bt-airport-code">{item.code}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* DEPARTURE / CHECK-IN DATE */}
                        <div className="bt-field-box bt-date-box">
                            <span className="bt-field-label">
                                {activeMode === 'hotels' ? 'Check-In' : 'Departure'}
                            </span>
                            <input
                                type="date"
                                className="bt-date-input"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                aria-label="Departure date"
                            />
                            <span className="bt-field-sub">Flexible Dates</span>
                        </div>

                        {/* RETURN / CHECK-OUT DATE (When Round Trip or Hotels) */}
                        {(tripType === 'round-trip' || activeMode === 'hotels') && (
                            <div className="bt-field-box bt-date-box">
                                <span className="bt-field-label">
                                    {activeMode === 'hotels' ? 'Check-Out' : 'Return'}
                                </span>
                                <input
                                    type="date"
                                    className="bt-date-input"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    aria-label="Return date"
                                />
                                <span className="bt-field-sub">Save 12% Round-Trip</span>
                            </div>
                        )}

                        {/* TRAVELLERS & CLASS */}
                        <div
                            className="bt-field-box bt-travellers-box"
                            onClick={() => setShowTravellerPopover(!showTravellerPopover)}
                        >
                            <span className="bt-field-label">
                                {activeMode === 'hotels' ? 'Rooms & Guests' : 'Travellers & Class'}
                            </span>
                            <div className="bt-traveller-Main">
                                <strong>
                                    {travellersCount} {travellersCount === 1 ? 'Adult' : 'Adults'}
                                </strong>
                                <ChevronDown size={15} />
                            </div>
                            <span className="bt-field-sub">
                                {activeMode === 'hotels' ? '1 Room · Work Desk' : cabinClass}
                            </span>

                            {showTravellerPopover && (
                                <div className="bt-traveller-popover" onClick={(e) => e.stopPropagation()}>
                                    <div className="bt-trav-row">
                                        <span>Travellers</span>
                                        <div className="bt-counter-pill">
                                            <button
                                                type="button"
                                                onClick={() => setTravellersCount(Math.max(1, travellersCount - 1))}
                                            >
                                                -
                                            </button>
                                            <span>{travellersCount}</span>
                                            <button
                                                type="button"
                                                onClick={() => setTravellersCount(Math.min(9, travellersCount + 1))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bt-class-pills">
                                        {['Economy', 'Premium Economy', 'Business', 'First Class'].map((cls) => (
                                            <button
                                                key={cls}
                                                type="button"
                                                className={`bt-class-chip ${cabinClass === cls ? 'active' : ''}`}
                                                onClick={() => {
                                                    setCabinClass(cls);
                                                    setShowTravellerPopover(false);
                                                }}
                                            >
                                                {cls}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SEARCH CTA BUTTON */}
                        <button type="submit" className="bt-search-submit-btn">
                            <Search size={18} />
                            <span>{isSearching ? 'Searching...' : 'Search'}</span>
                        </button>
                    </form>
                ) : (
                    /* Multi-City Builder Row */
                    <div className="bt-multicity-builder">
                        {multiLegs.map((leg, idx) => (
                            <div key={idx} className="bt-multicity-row">
                                <span className="bt-leg-badge">Flight {idx + 1}</span>
                                <input
                                    type="text"
                                    value={leg.from}
                                    onChange={(e) => {
                                        const copy = [...multiLegs];
                                        copy[idx].from = e.target.value;
                                        setMultiLegs(copy);
                                    }}
                                    placeholder="From City"
                                />
                                <ArrowLeftRight size={15} className="bt-leg-sep" />
                                <input
                                    type="text"
                                    value={leg.to}
                                    onChange={(e) => {
                                        const copy = [...multiLegs];
                                        copy[idx].to = e.target.value;
                                        setMultiLegs(copy);
                                    }}
                                    placeholder="To City"
                                />
                                <input
                                    type="date"
                                    value={leg.date}
                                    onChange={(e) => {
                                        const copy = [...multiLegs];
                                        copy[idx].date = e.target.value;
                                        setMultiLegs(copy);
                                    }}
                                />
                            </div>
                        ))}
                        <div className="bt-multicity-actions">
                            <button
                                type="button"
                                className="bt-add-leg-btn"
                                onClick={() =>
                                    setMultiLegs([
                                        ...multiLegs,
                                        { from: multiLegs[multiLegs.length - 1]?.to || 'Goa', to: 'Bengaluru', date: '2026-11-05' }
                                    ])
                                }
                            >
                                + Add Another City
                            </button>
                            <button type="button" className="bt-search-submit-btn" onClick={handleSearchSubmit}>
                                <Search size={18} />
                                <span>Search Multi-City</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Special Fare Pills */}
                <div className="bt-special-fares-row">
                    <span className="bt-fare-title">Special Fares:</span>
                    <label className="bt-fare-chip active">
                        <input type="radio" name="specialFare" defaultChecked />
                        <span>Regular Fares</span>
                    </label>
                    <label className="bt-fare-chip">
                        <input type="radio" name="specialFare" />
                        <span>Nomad Flex (Free Date Change)</span>
                    </label>
                    <label className="bt-fare-chip">
                        <input type="radio" name="specialFare" />
                        <span>Student Extra Baggage</span>
                    </label>
                    <label className="bt-fare-chip">
                        <input type="radio" name="specialFare" />
                        <span>Creator & Remote Team Corporate</span>
                    </label>
                </div>
            </div>

            {/* 3. Live Results & Offers Section */}
            <div className="bt-results-section">
                <div className="bt-results-header">
                    <div>
                        <h2>
                            {activeMode === 'flights' && `Recommended Flights: ${fromCity} → ${toCity}`}
                            {activeMode === 'hotels' && `Verified Nomad-Ready Stays & Hotels in ${toCity}`}
                            {activeMode === 'holidays' && 'Curated Holiday & Workation Packages'}
                            {activeMode === 'trains' && `Express Trains: ${fromCity} → ${toCity}`}
                            {activeMode === 'buses' && `Luxury Sleeper & Volvo Buses`}
                            {activeMode === 'cabs' && `Chauffeur Airport Transfers & Outstation Cabs`}
                        </h2>
                        <p>Instant confirmation · Zero hidden convenience fees for SeeNomad members</p>
                    </div>
                    <div className="bt-trust-pills">
                        <span><ShieldCheck size={14} /> Price Match Guarantee</span>
                        <span><Sparkles size={14} /> Earn 2x Nomad XP</span>
                    </div>
                </div>

                {/* FLIGHTS RESULTS */}
                {activeMode === 'flights' && (
                    <div className="bt-flights-list">
                        {FLIGHT_RESULTS.map((flight) => {
                            const isBooked = bookedIds[flight.id];
                            return (
                                <div key={flight.id} className="bt-flight-card">
                                    <div className="bt-flight-airline">
                                        <div className="bt-airline-logo">{flight.logo}</div>
                                        <div>
                                            <h4>{flight.airline}</h4>
                                            <span>{flight.code} · {cabinClass}</span>
                                        </div>
                                    </div>

                                    <div className="bt-flight-schedule">
                                        <div className="bt-time-col">
                                            <strong>{flight.depTime}</strong>
                                            <span>{fromCity} ({flight.fromCode})</span>
                                        </div>
                                        <div className="bt-duration-col">
                                            <span className="bt-dur-text">{flight.duration}</span>
                                            <div className="bt-dur-line">
                                                <span className="bt-dot" />
                                                <Plane size={14} />
                                                <span className="bt-dot" />
                                            </div>
                                            <span className="bt-stops-tag">{flight.stops}</span>
                                        </div>
                                        <div className="bt-time-col">
                                            <strong>{flight.arrTime}</strong>
                                            <span>{toCity} ({flight.toCode})</span>
                                        </div>
                                    </div>

                                    <div className="bt-flight-perks">
                                        <span className="bt-perk-badge"><Luggage size={13} /> {flight.baggage}</span>
                                        <span className="bt-perk-badge"><Wifi size={13} /> {flight.wifi}</span>
                                    </div>

                                    <div className="bt-flight-price-col">
                                        <span className="bt-recommend-pill">{flight.badge}</span>
                                        <div className="bt-price-stack">
                                            <strong>${flight.price}</strong>
                                            <span>{flight.inrPrice} / adult</span>
                                        </div>
                                        <button
                                            type="button"
                                            className={`bt-book-now-btn ${isBooked ? 'booked' : ''}`}
                                            onClick={() => handleBookItem(flight.id, `${flight.airline} (${fromCity} to ${toCity})`, `$${flight.price}`)}
                                        >
                                            {isBooked ? '✓ Reserved' : 'Book Flight'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* HOTELS RESULTS */}
                {activeMode === 'hotels' && (
                    <div className="bt-cards-grid">
                        {HOTEL_RESULTS.map((hotel) => {
                            const isBooked = bookedIds[hotel.id];
                            return (
                                <div key={hotel.id} className="bt-media-card">
                                    <div className="bt-media-img-wrap">
                                        <img src={hotel.image} alt={hotel.name} loading="lazy" />
                                        <span className="bt-media-tag">{hotel.tag}</span>
                                        <span className="bt-wifi-pill"><Wifi size={12} /> {hotel.wifiSpeed}</span>
                                    </div>
                                    <div className="bt-media-body">
                                        <div className="bt-media-rating">
                                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                            <strong>{hotel.rating}</strong>
                                            <span>({hotel.reviews} verified reviews)</span>
                                        </div>
                                        <h4>{hotel.name}</h4>
                                        <p className="bt-media-loc"><MapPin size={13} /> {hotel.location}</p>
                                        <div className="bt-media-perks">
                                            {hotel.perks.map((p, i) => (
                                                <span key={i}>{p}</span>
                                            ))}
                                        </div>
                                        <div className="bt-media-footer">
                                            <div>
                                                <strong>${hotel.price}</strong>
                                                <span>{hotel.inrPrice} / night</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`bt-book-now-btn ${isBooked ? 'booked' : ''}`}
                                                onClick={() => handleBookItem(hotel.id, hotel.name, `$${hotel.price}/night`)}
                                            >
                                                {isBooked ? '✓ Reserved' : 'Reserve Stay'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* HOLIDAYS RESULTS */}
                {activeMode === 'holidays' && (
                    <div className="bt-cards-grid">
                        {HOLIDAY_PACKAGES.map((pkg) => {
                            const isBooked = bookedIds[pkg.id];
                            return (
                                <div key={pkg.id} className="bt-media-card">
                                    <div className="bt-media-img-wrap">
                                        <img src={pkg.image} alt={pkg.title} loading="lazy" />
                                        <span className="bt-media-tag">{pkg.badge}</span>
                                        <span className="bt-wifi-pill"><Clock size={12} /> {pkg.duration}</span>
                                    </div>
                                    <div className="bt-media-body">
                                        <div className="bt-media-rating">
                                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                            <strong>{pkg.rating}</strong>
                                            <span>({pkg.cities})</span>
                                        </div>
                                        <h4>{pkg.title}</h4>
                                        <p className="bt-media-loc">{pkg.includes}</p>
                                        <div className="bt-media-footer">
                                            <div>
                                                <strong>${pkg.price}</strong>
                                                <span>{pkg.inrPrice} / person</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`bt-book-now-btn ${isBooked ? 'booked' : ''}`}
                                                onClick={() => handleBookItem(pkg.id, pkg.title, `$${pkg.price}`)}
                                            >
                                                {isBooked ? '✓ Booked' : 'Book Package'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* TRAINS RESULTS */}
                {activeMode === 'trains' && (
                    <div className="bt-flights-list">
                        {TRAIN_RESULTS.map((train) => (
                            <div key={train.id} className="bt-flight-card bt-train-card">
                                <div className="bt-flight-airline">
                                    <div className="bt-airline-logo">🚆</div>
                                    <div>
                                        <h4>{train.name}</h4>
                                        <span>{train.from} → {train.to}</span>
                                    </div>
                                </div>
                                <div className="bt-flight-schedule">
                                    <div className="bt-time-col">
                                        <strong>{train.depTime}</strong>
                                        <span>Departure</span>
                                    </div>
                                    <div className="bt-duration-col">
                                        <span className="bt-dur-text">{train.duration}</span>
                                        <span className="bt-stops-tag">IRCTC Authorized</span>
                                    </div>
                                    <div className="bt-time-col">
                                        <strong>{train.arrTime}</strong>
                                        <span>Arrival</span>
                                    </div>
                                </div>
                                <div className="bt-train-classes">
                                    {train.classes.map((cls) => (
                                        <button
                                            key={cls.code}
                                            type="button"
                                            className="bt-train-class-box"
                                            onClick={() => handleBookItem(`${train.id}-${cls.code}`, `${train.name} (${cls.name})`, cls.price)}
                                        >
                                            <div className="bt-tc-top">
                                                <strong>{cls.code}</strong>
                                                <span>{cls.price}</span>
                                            </div>
                                            <span className="bt-tc-avail">{cls.status}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* BUSES RESULTS */}
                {activeMode === 'buses' && (
                    <div className="bt-flights-list">
                        {BUS_RESULTS.map((bus) => {
                            const isBooked = bookedIds[bus.id];
                            return (
                                <div key={bus.id} className="bt-flight-card">
                                    <div className="bt-flight-airline">
                                        <div className="bt-airline-logo">🚌</div>
                                        <div>
                                            <h4>{bus.operator}</h4>
                                            <span>{bus.type}</span>
                                        </div>
                                    </div>
                                    <div className="bt-flight-schedule">
                                        <div className="bt-time-col">
                                            <strong>{bus.depTime}</strong>
                                            <span>{bus.from}</span>
                                        </div>
                                        <div className="bt-duration-col">
                                            <span className="bt-stops-tag">{bus.seatsLeft} Seats Left</span>
                                        </div>
                                        <div className="bt-time-col">
                                            <strong>{bus.arrTime}</strong>
                                            <span>{bus.to}</span>
                                        </div>
                                    </div>
                                    <div className="bt-flight-price-col">
                                        <div className="bt-price-stack">
                                            <strong>{bus.price}</strong>
                                        </div>
                                        <button
                                            type="button"
                                            className={`bt-book-now-btn ${isBooked ? 'booked' : ''}`}
                                            onClick={() => handleBookItem(bus.id, bus.operator, bus.price)}
                                        >
                                            {isBooked ? '✓ Seat Locked' : 'Select Seat'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* CABS RESULTS */}
                {activeMode === 'cabs' && (
                    <div className="bt-flights-list">
                        {CAB_RESULTS.map((cab) => {
                            const isBooked = bookedIds[cab.id];
                            return (
                                <div key={cab.id} className="bt-flight-card">
                                    <div className="bt-flight-airline">
                                        <div className="bt-airline-logo">🚖</div>
                                        <div>
                                            <h4>{cab.vehicle}</h4>
                                            <span>{cab.category} · {cab.inclusions}</span>
                                        </div>
                                    </div>
                                    <div className="bt-flight-perks">
                                        <span className="bt-perk-badge"><Clock size={13} /> {cab.eta}</span>
                                        <span className="bt-perk-badge"><Star size={13} /> {cab.rating} Rated Driver</span>
                                    </div>
                                    <div className="bt-flight-price-col">
                                        <div className="bt-price-stack">
                                            <strong>{cab.price}</strong>
                                        </div>
                                        <button
                                            type="button"
                                            className={`bt-book-now-btn ${isBooked ? 'booked' : ''}`}
                                            onClick={() => handleBookItem(cab.id, cab.vehicle, cab.price)}
                                        >
                                            {isBooked ? '✓ Cab Booked' : 'Book Cab'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTravelHub;
