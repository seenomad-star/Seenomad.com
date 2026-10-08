import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Palmtree,
    Search,
    Star,
    Clock,
    Users,
    MapPin,
    Bookmark,
    Sparkles,
    Plus,
    CheckCircle2,
    GitBranch,
    Calendar,
    X,
    Globe,
    Compass,
    Volume2,
    Copy,
    HeartHandshake,
    Utensils,
    Award,
    SlidersHorizontal,
    BookOpen,
    UserCheck
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/LocalExperiences.css';

const EXPERIENCE_CATEGORIES = [
    { id: 'all', label: 'All Immersions' },
    { id: 'culinary', label: 'Culinary & Night Markets' },
    { id: 'workshops', label: 'Artisan Studios' },
    { id: 'eco', label: 'Eco & Voluntourism' },
    { id: 'language', label: 'Language & Sake Socials' },
    { id: 'adventure', label: 'Dawn Surf & Outdoor' },
    { id: 'saved', label: 'Saved Wishlist' },
    { id: 'reserved', label: 'My Passes' }
];

const SCHEDULE_WINDOWS = [
    { id: 'all', label: 'Any Schedule' },
    { id: 'pre-work', label: 'Pre-Work (06:30–09:30)' },
    { id: 'after-work', label: 'After-Work (17:00+)' },
    { id: 'weekend', label: 'Half-Day & Weekend' }
];

const HUB_CULTURAL_DATA = {
    All: {
        title: 'Global Nomad Cultural Etiquette & Phrasebook',
        tipping: 'Check local norms: 0% in Japan (considered insulting), 5–10% in Portugal & Spain for table service, 10% propina voluntaria in Colombia & Mexico.',
        coworkingEtiquette: 'Take calls in designated phone booths during morning local quiet hours; support neighborhood cafes by ordering food every 2 hours.',
        dressCode: 'Cover shoulders and knees when entering Balinese pura temples, Kyoto shrines, and historic European cathedrals.',
        impactNote: '100% of Eco & Voluntourism bookings contribute directly to grassroots marine, reforestation, and artisan heritage cooperatives.',
        phrases: [
            { native: 'Itadakimasu / Gochisousama', phonetic: 'Ee-tah-dah-kee-mahs', meaning: 'Gratitude before & after a meal (Japan)' },
            { native: 'Bom dia · Um galão, por favor', phonetic: 'Bohn dee-ah · Oom gah-laung', meaning: 'Good morning, espresso with steamed milk (Portugal)' },
            { native: 'Suksma banget', phonetic: 'Sook-smah bahn-get', meaning: 'Thank you very much in Balinese (Indonesia)' },
            { native: '¿Me regala un tinto, por favor?', phonetic: 'Meh reh-gah-lah oon teen-toh', meaning: 'Warm way to order black coffee (Colombia)' }
        ]
    },
    Japan: {
        title: 'Japan (Kyoto & Tokyo) Cultural Compass',
        tipping: 'Never leave cash tips on tables. Express appreciation with "Gochisousama deshita" and a slight bow.',
        coworkingEtiquette: 'Trains and neighborhood kissaten cafes are library-quiet; silence phone notifications and avoid voice calls outside booths.',
        dressCode: 'Bring clean slip-off shoes and socks for traditional tatami machiya townhouses, tea rooms, and temples.',
        impactNote: 'Supports multi-generational Kyoto machiya preservation and family-owned Uji tea estates.',
        phrases: [
            { native: 'Ojamashimasu (お邪魔します)', phonetic: 'Oh-jah-mah-shee-mahs', meaning: 'Said when stepping into a host’s home or studio' },
            { native: 'Oishii desu (美味しいです)', phonetic: 'Oy-shee dess', meaning: 'This tastes wonderful' },
            { native: 'Osusume wa nan desu ka?', phonetic: 'Oh-soo-soo-meh wah nahn dess kah', meaning: 'What is the chef’s recommendation?' }
        ]
    },
    Indonesia: {
        title: 'Indonesia (Bali & Nusa Penida) Cultural Compass',
        tipping: '5–10% appreciated at independent warungs and for local dive/surf instructors.',
        coworkingEtiquette: 'Respect Nyepi (Day of Silence) and local banjar ceremony processions; allow extra transit time without honking.',
        dressCode: 'Wear a sarong and sash (selendang) when visiting water temples or village workshops; never step over street Canang Sari offerings.',
        impactNote: 'Each reef dive funds 5 live Acropora coral fragments transplanted by Nusa Penida marine biologists.',
        phrases: [
            { native: 'Om Swastiastu', phonetic: 'Ohm Swah-stee-ah-stoo', meaning: 'Traditional Balinese peace greeting' },
            { native: 'Matur Suksma', phonetic: 'Mah-toor Sook-smah', meaning: 'Thank you (Polite Balinese)' },
            { native: 'Enak sekali', phonetic: 'Eh-nahk seh-kah-lee', meaning: 'Delicious meal (Bahasa Indonesia)' }
        ]
    },
    Portugal: {
        title: 'Portugal (Lisbon & Ericeira) Cultural Compass',
        tipping: 'Round up or leave 5–10% at traditional tascas; note that table bread & olives (couvert) are charged if eaten.',
        coworkingEtiquette: 'Respect complete silence during candlelit Fado performances in Alfama cellars.',
        dressCode: 'Bring a windproof layer for Atlantic evening coastal breezes; smart-casual for neighborhood wine bars.',
        impactNote: 'Preserves independent family-run Alfama tascas and World Surfing Reserve coastal cleanups.',
        phrases: [
            { native: 'Silêncio, que se vai cantar o Fado', phonetic: 'See-len-see-oo', meaning: 'Silence, Fado is about to be sung' },
            { native: 'Uma bica cheia, se faz favor', phonetic: 'Oo-mah bee-kah shay-ah', meaning: 'A full Lisbon espresso, please' },
            { native: 'Estava tudo óptimo', phonetic: 'Esh-tah-vah too-doo oh-tee-moo', meaning: 'Everything was delicious' }
        ]
    },
    Colombia: {
        title: 'Colombia (Medellín & Santa Elena) Cultural Compass',
        tipping: '10% voluntary service charge ("servicio") is standard at cafes and restaurants.',
        coworkingEtiquette: 'Paisa hospitality is warm and conversational—always greet hosts with "Buenos días" before asking a question.',
        dressCode: 'Spring-like year-round (Eternal Spring); bring a light rain jacket for afternoon mountain showers.',
        impactNote: 'Directly pays fair-trade micro-lot premiums to smallholder coffee families in Santa Elena.',
        phrases: [
            { native: 'Con mucho gusto', phonetic: 'Kohn moo-choh goos-toh', meaning: 'With great pleasure (Medellín signature reply)' },
            { native: '¡Qué chimba!', phonetic: 'Keh cheem-bah', meaning: 'Paisa slang for amazing / unforgettable' },
            { native: 'Muchas gracias por recibirnos', phonetic: 'Moo-chahs grah-see-ahs', meaning: 'Thank you so much for welcoming us' }
        ]
    }
};

const INITIAL_EXPERIENCES = [
    {
        id: 'exp-1',
        title: 'Kyoto Hidden Machiya Matcha Ceremony & Wagashi Crafting',
        category: 'workshops',
        windowTag: 'after-work',
        city: 'Kyoto',
        country: 'Japan',
        flag: '🇯🇵',
        host: 'Master Kenjiro (4th-Gen Tea Artisan)',
        hostRole: 'Heritage Tea Master · 18 yrs hosting',
        rating: 4.99,
        reviewsCount: 312,
        duration: '2.5 Hours',
        scheduleWindow: 'After-Work · 17:30 JST',
        languages: 'English & Japanese',
        groupSize: 'Max 6 guests',
        spotsLeft: 2,
        price: 58,
        xpReward: 400,
        ecoImpact: 'Preserves 120-yr Machiya architecture',
        included: 'Single-origin Uji matcha, seasonalnerikiri wagashi ingredients, bamboo whisk keepsake',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
        desc: 'Step inside a private 120-year-old wooden townhouse in Higashiyama to hand-whisk ceremonial Uji matcha and sculpt seasonal botanical sweets.',
        syllabus: [
            { time: '00:00', step: 'Welcome incense ritual & architectural tour of the private Roji garden' },
            { time: '00:35', step: 'Hand-shaping seasonal Nerikiri Wagashi sweets with wooden artisan tools' },
            { time: '01:25', step: 'Stone-mill grinding single-cultivar Uji tencha leaves & bamboo whisking' },
            { time: '02:00', step: 'Mindful tea ceremony & Q&A on Kyoto aesthetics (Wabi-Sabi & Ichigo Ichie)' }
        ]
    },
    {
        id: 'exp-2',
        title: 'Uluwatu & Nusa Penida Coral Reef Restoration Dive with Biologists',
        category: 'eco',
        windowTag: 'weekend',
        city: 'Nusa Penida & Bali',
        country: 'Indonesia',
        flag: '🇮🇩',
        host: 'Dr. Ayu & Coral Guardians Collective',
        hostRole: 'Marine Reef Biologist · PADI Divemaster',
        rating: 4.98,
        reviewsCount: 198,
        duration: '4 Hours',
        scheduleWindow: 'Morning · 07:30 WITA',
        languages: 'English & Bahasa',
        groupSize: 'Max 8 divers/snorkelers',
        spotsLeft: 3,
        price: 45,
        xpReward: 850,
        ecoImpact: 'Transplants 5 live Acropora coral fragments',
        included: 'Boat transfer, reef restoration frame & tag, snorkel/dive gear, coastal warung lunch',
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=80',
        desc: 'Adopt and transplant live coral fragments onto underwater restoration stars alongside local marine conservationists, followed by a beachside lunch.',
        syllabus: [
            { time: '00:00', step: 'Marine ecology briefing & preparing mineral reef-star frames on shore' },
            { time: '00:45', step: 'Securing rescued live coral fragments with biodegradable ties & ID tag' },
            { time: '01:30', step: 'Guided boat out to crystal-clear nursery reef & underwater transplantation' },
            { time: '03:00', step: 'Post-dive grilled fish & tempeh warung lunch + GPS coordinates of your coral' }
        ]
    },
    {
        id: 'exp-3',
        title: 'Lisbon Alfama Tasca Tasting & Acoustic Fado Cellar Night',
        category: 'culinary',
        windowTag: 'after-work',
        city: 'Lisbon',
        country: 'Portugal',
        flag: '🇵🇹',
        host: 'Inês & Tiago (Lisbon Culinary Historians)',
        hostRole: 'Food Historian & Fadista · 9 yrs hosting',
        rating: 4.97,
        reviewsCount: 428,
        duration: '3 Hours',
        scheduleWindow: 'After-Work · 19:30 WET',
        languages: 'English & Portuguese',
        groupSize: 'Max 8 guests',
        spotsLeft: 4,
        price: 64,
        xpReward: 450,
        ecoImpact: 'Supports 3 family-owned neighborhood tascas',
        included: '7 petiscos tastings, 3 small-producer Portuguese wines, Ginjinha shot, live Fado entry',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop&q=80',
        desc: 'Explore three family-run neighborhood tascas in historic Alfama for flame-roasted chouriço, vintage Vinho Verde, and intimate candlelit Fado music.',
        syllabus: [
            { time: '00:00', step: 'Meet at Miradouro de Santa Luzia for sunset sour cherry Ginjinha toast' },
            { time: '00:40', step: 'First Tasca: artisanal sheep cheeses, cured presunto & crisp Alvarinho' },
            { time: '01:30', step: 'Second Tasca: table-side clay-dish flame-roasted chouriço & salt cod pataniscas' },
            { time: '02:15', step: 'Descend into a 17th-century vaulted stone cellar for acoustic Portuguese guitar & Fado' }
        ]
    },
    {
        id: 'exp-4',
        title: 'Shinjuku Golden Gai Conversational Japanese & Craft Sake Social',
        category: 'language',
        windowTag: 'after-work',
        city: 'Tokyo',
        country: 'Japan',
        flag: '🇯🇵',
        host: 'Yuki & Tokyo Nomad Language Circle',
        hostRole: 'Certified Sake Sommelier & Linguist',
        rating: 4.95,
        reviewsCount: 265,
        duration: '2 Hours',
        scheduleWindow: 'After-Work · 19:00 JST',
        languages: 'All levels (Beginner to JLPT N2)',
        groupSize: 'Max 8 guests',
        spotsLeft: 2,
        price: 34,
        xpReward: 500,
        ecoImpact: 'Supports micro-breweries (Kuramoto)',
        included: 'Flight of 3 Junmai Daiginjo sakes, izakaya otsumami pairing, waterproof pocket phrase deck',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
        desc: 'Master real-world Japanese izakaya ordering, etiquette, and natural conversation with local bilingual creators over small-batch craft sake.',
        syllabus: [
            { time: '00:00', step: 'Interactive 20-minute survival Japanese & izakaya menu decoding warm-up' },
            { time: '00:25', step: 'Guided tasting of 3 regional Junmai sakes (Dry Niigata to Fruity Kyoto)' },
            { time: '01:00', step: 'Live ordering challenge in Japanese with local Tokyo creatives & founders' },
            { time: '01:40', step: 'Custom neighborhood recommendations & hidden listening-bar map handoff' }
        ]
    },
    {
        id: 'exp-5',
        title: 'Ericeira Dawn Patrol Point-Break Surf Coaching & Drone Breakdown',
        category: 'adventure',
        windowTag: 'pre-work',
        city: 'Ericeira',
        country: 'Portugal',
        flag: '🇵🇹',
        host: 'Diogo (World Surfing Reserve Coach)',
        hostRole: 'ISA Level 2 Surf Coach & Videographer',
        rating: 4.98,
        reviewsCount: 184,
        duration: '2.5 Hours',
        scheduleWindow: 'Pre-Work · 07:00 WET',
        languages: 'English, Portuguese, Spanish',
        groupSize: 'Max 5 surfers',
        spotsLeft: 1,
        price: 49,
        xpReward: 600,
        ecoImpact: 'Includes 15-min Ribeira d’Ilhas beach cleanup',
        included: 'Performance board & 4/3mm wetsuit, 4K drone footage, espresso & pastel de nata at coworking hub',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80',
        desc: 'Catch glassy Atlantic point-break waves before your first morning standup call, complete with frame-by-frame drone video analysis and espresso.',
        syllabus: [
            { time: '00:00', step: 'Swell reading, tide channel briefing & mobility warm-up at Ribeira d’Ilhas' },
            { time: '00:25', step: '90-minute in-water coaching session with live 4K drone tracking overhead' },
            { time: '01:55', step: 'Hot outdoor shower, espresso & frame-by-frame pop-up/cutback video review' },
            { time: '02:20', step: 'Drop-off directly at Outsite / Kelp Coworking by 09:30 AM for work calls' }
        ]
    },
    {
        id: 'exp-6',
        title: 'Medellín Cloud-Forest Specialty Coffee Harvest & Micro-Roasting Lab',
        category: 'culinary',
        windowTag: 'pre-work',
        city: 'Medellín (Santa Elena)',
        country: 'Colombia',
        flag: '🇨🇴',
        host: 'Don Carlos & Finca La Sierra Collective',
        hostRole: '3rd-Gen Caficultor & Q-Grader',
        rating: 4.96,
        reviewsCount: 241,
        duration: '3.5 Hours',
        scheduleWindow: 'Pre-Work · 08:00 COT',
        languages: 'English & Spanish',
        groupSize: 'Max 7 guests',
        spotsLeft: 5,
        price: 38,
        xpReward: 550,
        ecoImpact: '100% shade-grown bird-sanctuary finca',
        included: 'Metrocable scenic transfer, V60/Chemex cupping flight, 250g bag of your custom roast',
        image: 'https://images.unsplash.com/photo-1599413987323-f73f0276228e?w=800&auto=format&fit=crop&q=80',
        desc: 'Ride the Metrocable into the cloud forest to hand-pick Caturra & Geisha cherries, roast your own profile, and return to El Poblado before noon.',
        syllabus: [
            { time: '00:00', step: 'Scenic Metrocable ascent over the Aburrá Valley into Santa Elena cloud forest' },
            { time: '00:45', step: 'Walk the shade-grown coffee trees & harvest ripe red Arabica cherries' },
            { time: '01:45', step: 'Wet-milling, honey fermentation lab & sample drum-roasting your batch' },
            { time: '02:45', step: 'Professional Q-Grader sensory cupping & sealing your custom 250g coffee bag' }
        ]
    },
    {
        id: 'exp-7',
        title: 'Ubud Traditional Balinese Silver Smithing & Lost-Wax Studio',
        category: 'workshops',
        windowTag: 'after-work',
        city: 'Ubud (Celuk Village)',
        country: 'Indonesia',
        flag: '🇮🇩',
        host: 'Wayan Sudarna (Celuk Master Silversmith)',
        hostRole: 'Master Silversmith · 22 yrs experience',
        rating: 4.97,
        reviewsCount: 176,
        duration: '2.5 Hours',
        scheduleWindow: 'After-Work · 16:30 WITA',
        languages: 'English & Bahasa',
        groupSize: 'Max 6 makers',
        spotsLeft: 3,
        price: 42,
        xpReward: 480,
        ecoImpact: 'Uses 100% recycled 925 sterling silver',
        included: '7 grams of pure 925 sterling silver, torch & forging tools, Balinese Boreh herbal tea',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
        desc: 'Forge, solder, and polish your own custom sterling silver ring or pendant in an open-air family compound in Bali’s historic silversmith village.',
        syllabus: [
            { time: '00:00', step: 'Sketching your jewelry design & learning Balinese filigree motifs' },
            { time: '00:30', step: 'Melting recycled 925 silver, rolling wire/sheet & hand-stamping textures' },
            { time: '01:30', step: 'Torch soldering, shaping on the mandrel & high-luster wheel polishing' },
            { time: '02:15', step: 'Final fitting with herbal ginger tea in the family courtyard' }
        ]
    },
    {
        id: 'exp-8',
        title: 'Comuna 13 Afro-Colombian Street Art, Vinyl & Hip-Hop Resilience Walk',
        category: 'language',
        windowTag: 'weekend',
        city: 'Medellín',
        country: 'Colombia',
        flag: '🇨🇴',
        host: 'Mateo "Kaos" & Casa Kolacho Collective',
        hostRole: 'Muralist & Community Youth Leader',
        rating: 4.99,
        reviewsCount: 512,
        duration: '3 Hours',
        scheduleWindow: 'Afternoon · 15:00 COT',
        languages: 'English & Spanish',
        groupSize: 'Max 10 guests',
        spotsLeft: 4,
        price: 28,
        xpReward: 500,
        ecoImpact: 'Funds free youth music & mural workshops',
        included: 'erosol mural stencil session, mango biche popsicle, private rooftop breakdance showcase',
        image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=800&auto=format&fit=crop&q=80',
        desc: 'Walk alongside the original muralists and hip-hop historians who transformed Comuna 13 into a global symbol of urban art and community peace.',
        syllabus: [
            { time: '00:00', step: 'Meet at San Javier station & story of Medellín’s urban social transformation' },
            { time: '00:45', step: 'Private studio visit & hands-on aerosol spray-paint collaborative mural wall' },
            { time: '01:45', step: 'Outdoor escalators mural decoding & mango biche street food tasting' },
            { time: '02:30', step: 'Sunset rooftop freestyle hip-hop showcase overlooking the valley' }
        ]
    }
];

const LearningVoluntourism = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [experiences, setExperiences] = useState(INITIAL_EXPERIENCES);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeWindow, setActiveWindow] = useState('all');
    const [activeHubCountry, setActiveHubCountry] = useState('All');
    const [sortBy, setSortBy] = useState('recommended');
    const [searchQuery, setSearchQuery] = useState('');

    // Persisted saved & reserved experiences
    const [savedIds, setSavedIds] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_saved_experiences');
            return raw ? JSON.parse(raw) : { 'exp-1': true, 'exp-3': true };
        } catch {
            return { 'exp-1': true, 'exp-3': true };
        }
    });

    const [reservedPasses, setReservedPasses] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_reserved_experiences');
            return raw
                ? JSON.parse(raw)
                : {
                      'exp-5': {
                          date: '2026-11-14',
                          guests: 1,
                          passCode: 'SN-LX-8841',
                          totalPaid: 49
                      }
                  };
        } catch {
            return {};
        }
    });

    const [selectedExp, setSelectedExp] = useState(null);
    const [bookingDate, setBookingDate] = useState('2026-11-18');
    const [bookingGuests, setBookingGuests] = useState(1);
    const [bookingNote, setBookingNote] = useState('');
    const [showHostForm, setShowHostForm] = useState(false);

    // Host new experience state
    const [hostTitle, setHostTitle] = useState('');
    const [hostCity, setHostCity] = useState('');
    const [hostCountry, setHostCountry] = useState('Portugal');
    const [hostCategory, setHostCategory] = useState('workshops');
    const [hostWindow, setHostWindow] = useState('after-work');
    const [hostPrice, setHostPrice] = useState('48');
    const [hostDuration, setHostDuration] = useState('2.5 Hours');
    const [hostDesc, setHostDesc] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_saved_experiences', JSON.stringify(savedIds));
        } catch {
            // ignore storage errors
        }
    }, [savedIds]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_reserved_experiences', JSON.stringify(reservedPasses));
        } catch {
            // ignore storage errors
        }
    }, [reservedPasses]);

    // Sync sub-route segments or query params
    useEffect(() => {
        const sub = location.pathname
            .replace('/learning-voluntourism', '')
            .replace('/explore/local-experiences', '')
            .replace(/^\//, '')
            .toLowerCase();
        const params = new URLSearchParams(location.search);
        const catParam = params.get('category');
        const cityParam = params.get('city') || params.get('hub');

        if (catParam) {
            setActiveCategory(catParam);
        } else if (sub.includes('workshop') || sub.includes('course')) {
            setActiveCategory('workshops');
        } else if (sub.includes('eco') || sub.includes('volunteer')) {
            setActiveCategory('eco');
        } else if (sub.includes('language') || sub.includes('cultural')) {
            setActiveCategory('language');
        } else if (sub.includes('culinary') || sub.includes('food')) {
            setActiveCategory('culinary');
        }

        if (cityParam) {
            setSearchQuery(cityParam);
        }
    }, [location.pathname, location.search]);

    const handleToggleSave = (exp, e) => {
        if (e) e.stopPropagation();
        const next = !savedIds[exp.id];
        setSavedIds((prev) => ({ ...prev, [exp.id]: next }));
        addToast(
            next
                ? `Saved "${exp.title}" to your Local Experiences wishlist`
                : `Removed "${exp.title}" from saved experiences`,
            'info'
        );
    };

    const handlePushToItinerary = (exp, e) => {
        if (e) e.stopPropagation();
        try {
            const existingRaw = localStorage.getItem('seenomad_queued_itinerary_items');
            const existing = existingRaw ? JSON.parse(existingRaw) : [];
            const nextQueue = [
                {
                    id: `lx-${exp.id}-${Date.now()}`,
                    title: exp.title,
                    city: exp.city,
                    cost: exp.price,
                    time: exp.scheduleWindow,
                    category: 'activity'
                },
                ...existing
            ];
            localStorage.setItem('seenomad_queued_itinerary_items', JSON.stringify(nextQueue.slice(0, 20)));
        } catch {
            // ignore storage errors
        }
        addToast(`Queued "${exp.title}" into ChronoRoute™ Itinerary Builder!`, 'success');
        navigate('/explore/planner');
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        if (!selectedExp) return;
        const passCode = `SN-LX-${Math.floor(1000 + Math.random() * 9000)}`;
        const totalPaid = selectedExp.price * bookingGuests;

        setReservedPasses((prev) => ({
            ...prev,
            [selectedExp.id]: {
                date: bookingDate,
                guests: bookingGuests,
                note: bookingNote.trim(),
                passCode,
                totalPaid
            }
        }));

        addToast(
            `Confirmed Pass ${passCode} for "${selectedExp.title}" on ${bookingDate}! +${selectedExp.xpReward} Nomad XP`,
            'success'
        );
        setBookingNote('');
        setSelectedExp(null);
    };

    const handleCancelBooking = (expId, title) => {
        setReservedPasses((prev) => {
            const copy = { ...prev };
            delete copy[expId];
            return copy;
        });
        addToast(`Cancelled reservation for "${title}" with full refund.`, 'info');
        setSelectedExp(null);
    };

    const handleCreateHostedExperience = (e) => {
        e.preventDefault();
        if (!hostTitle.trim()) return;

        const flagMap = {
            Japan: '🇯🇵',
            Indonesia: '🇮🇩',
            Portugal: '🇵🇹',
            Colombia: '🇨🇴'
        };

        const windowLabelMap = {
            'pre-work': 'Pre-Work · 07:30 Local',
            'after-work': 'After-Work · 18:00 Local',
            weekend: 'Weekend Half-Day · 10:00 Local'
        };

        const created = {
            id: `exp-${Date.now()}`,
            title: hostTitle.trim(),
            category: hostCategory,
            windowTag: hostWindow,
            city: hostCity.trim() || 'Lisbon',
            country: hostCountry,
            flag: flagMap[hostCountry] || '🌍',
            host: 'You (Verified Community Creator)',
            hostRole: 'Verified Nomad Host · Instant Booking',
            rating: 5.0,
            reviewsCount: 1,
            duration: hostDuration,
            scheduleWindow: windowLabelMap[hostWindow] || 'Flexible Remote-Friendly Slot',
            languages: 'English & Local Language',
            groupSize: 'Max 6 guests',
            spotsLeft: 6,
            price: Number(hostPrice) || 45,
            xpReward: 550,
            ecoImpact: 'Community-led cultural micro-session',
            included: 'All workshop materials, local refreshments & insider neighborhood map',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
            desc:
                hostDesc.trim() ||
                'Authentic small-group local workshop hosted for fellow digital nomads and cultural explorers.',
            syllabus: [
                { time: '00:00', step: 'Welcome coffee/tea & neighborhood cultural context introduction' },
                { time: '00:30', step: 'Hands-on guided workshop & skill practice with local materials' },
                { time: '01:45', step: 'Group tasting/showcase & curated local map recommendations' }
            ]
        };

        setExperiences((prev) => [created, ...prev]);
        setHostTitle('');
        setHostCity('');
        setHostDesc('');
        setShowHostForm(false);
        addToast(`Published your local experience "${created.title}"!`, 'success');
    };

    const handleSpeakPhrase = (phrase) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(phrase.native.split('(')[0]);
                utterance.rate = 0.92;
                window.speechSynthesis.speak(utterance);
                addToast(`Playing pronunciation: "${phrase.phonetic}"`, 'info');
                return;
            } catch {
                // fallback to copy
            }
        }
        navigator.clipboard?.writeText(phrase.native);
        addToast(`Copied phrase: "${phrase.native}" (${phrase.phonetic})`, 'info');
    };

    const filteredExperiences = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const list = experiences.filter((exp) => {
            if (activeCategory === 'saved' && !savedIds[exp.id]) return false;
            if (activeCategory === 'reserved' && !reservedPasses[exp.id]) return false;
            if (
                activeCategory !== 'all' &&
                activeCategory !== 'saved' &&
                activeCategory !== 'reserved' &&
                exp.category !== activeCategory
            ) {
                return false;
            }
            if (activeWindow !== 'all' && exp.windowTag !== activeWindow) {
                return false;
            }
            if (activeHubCountry !== 'All' && exp.country !== activeHubCountry) {
                return false;
            }
            if (q) {
                const hay = `${exp.title} ${exp.city} ${exp.country} ${exp.host} ${exp.desc} ${exp.ecoImpact}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

        return [...list].sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'rating-desc') return b.rating - a.rating;
            if (sortBy === 'xp-desc') return b.xpReward - a.xpReward;
            return b.reviewsCount - a.reviewsCount;
        });
    }, [experiences, activeCategory, activeWindow, activeHubCountry, savedIds, reservedPasses, searchQuery, sortBy]);

    const currentCompass = HUB_CULTURAL_DATA[activeHubCountry] || HUB_CULTURAL_DATA.All;
    const totalSavedCount = Object.values(savedIds).filter(Boolean).length;
    const totalReservedCount = Object.keys(reservedPasses).length;

    return (
        <div className="lx-hub-shell">
            {/* 1. Editorial Hero Banner */}
            <header className="lx-hero-banner">
                <div className="lx-hero-top">
                    <div>
                        <span className="lx-kicker">
                            <Palmtree size={13} />
                            SeeNomad Cultural Compass™ · Remote-Work-Synchronized Immersions
                        </span>
                        <h1 className="lx-title">
                            Authentic Local Experiences, Artisan Studios & Eco-Voluntourism
                        </h1>
                        <p className="lx-subtitle">
                            Small-group culinary trails, heritage craft workshops, marine conservation dives, and evening language socials engineered around remote work schedules (Pre-9AM & Post-5PM slots).
                        </p>
                    </div>

                    <div className="lx-hero-actions">
                        <button
                            type="button"
                            className="lx-btn lx-btn-primary"
                            onClick={() => setShowHostForm((prev) => !prev)}
                        >
                            <Plus size={15} />
                            {showHostForm ? 'Close Host Studio' : 'Host an Experience'}
                        </button>
                        <button
                            type="button"
                            className="lx-btn"
                            onClick={() => navigate('/explore/trivenly')}
                        >
                            <BookOpen size={14} />
                            Destination Playbooks
                        </button>
                        <button
                            type="button"
                            className="lx-btn"
                            onClick={() => navigate('/explore/planner')}
                        >
                            <GitBranch size={14} />
                            Itinerary Builder
                        </button>
                    </div>
                </div>

                {/* Unboxed Telemetry & Hub Switcher */}
                <div className="lx-kpi-row">
                    <div className="lx-kpi-metrics">
                        <span>
                            Verified Local Hosts: <strong>420+ Artisans & Biologists</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Remote-Work Windows: <strong>Pre-9AM & Post-5PM Slots</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Saved Wishlist: <strong>{totalSavedCount}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Active Passes: <strong>{totalReservedCount} Confirmed</strong>
                        </span>
                    </div>

                    <div className="lx-city-switcher" role="group" aria-label="Filter by Cultural Hub">
                        {['All', 'Japan', 'Indonesia', 'Portugal', 'Colombia'].map((hub) => (
                            <button
                                key={hub}
                                type="button"
                                className={`lx-city-btn ${activeHubCountry === hub ? 'active' : ''}`}
                                onClick={() => setActiveHubCountry(hub)}
                            >
                                {hub === 'All' ? '🌍 All Hubs' : hub}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 2. Host an Experience Studio Drawer */}
            {showHostForm && (
                <form className="lx-host-drawer" onSubmit={handleCreateHostedExperience}>
                    <div className="lx-drawer-header">
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={15} color="#38bdf8" />
                            Publish Your Local Workshop, Culinary Walk, or Eco-Voluntourism Session
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Earn 88% direct host payout + Verified Creator Host badge
                        </span>
                    </div>

                    <div className="lx-form-grid">
                        <label className="lx-field-label">
                            <span>Experience Title</span>
                            <input
                                type="text"
                                className="lx-input"
                                placeholder="e.g. Kyoto Analog Film Walk & Darkroom Lab"
                                value={hostTitle}
                                onChange={(e) => setHostTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label className="lx-field-label">
                            <span>Neighborhood / City</span>
                            <input
                                type="text"
                                className="lx-input"
                                placeholder="e.g. Higashiyama, Kyoto"
                                value={hostCity}
                                onChange={(e) => setHostCity(e.target.value)}
                                required
                            />
                        </label>

                        <label className="lx-field-label">
                            <span>Country Hub</span>
                            <select
                                className="lx-select"
                                value={hostCountry}
                                onChange={(e) => setHostCountry(e.target.value)}
                            >
                                <option value="Japan">Japan</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Colombia">Colombia</option>
                            </select>
                        </label>

                        <label className="lx-field-label">
                            <span>Category</span>
                            <select
                                className="lx-select"
                                value={hostCategory}
                                onChange={(e) => setHostCategory(e.target.value)}
                            >
                                <option value="workshops">Artisan Studio</option>
                                <option value="culinary">Culinary & Night Market</option>
                                <option value="eco">Eco & Voluntourism</option>
                                <option value="language">Language & Sake Social</option>
                                <option value="adventure">Dawn Surf & Outdoor</option>
                            </select>
                        </label>

                        <label className="lx-field-label">
                            <span>Remote-Work Schedule Slot</span>
                            <select
                                className="lx-select"
                                value={hostWindow}
                                onChange={(e) => setHostWindow(e.target.value)}
                            >
                                <option value="pre-work">Pre-Work (07:00–09:30)</option>
                                <option value="after-work">After-Work (17:30+)</option>
                                <option value="weekend">Weekend Half-Day</option>
                            </select>
                        </label>

                        <label className="lx-field-label">
                            <span>Price per Guest (USD)</span>
                            <input
                                type="number"
                                min="10"
                                max="500"
                                className="lx-input"
                                value={hostPrice}
                                onChange={(e) => setHostPrice(e.target.value)}
                            />
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            className="lx-input"
                            style={{ flex: 1, minWidth: 240 }}
                            placeholder="Short description of what guests will craft, taste, or restore..."
                            value={hostDesc}
                            onChange={(e) => setHostDesc(e.target.value)}
                        />
                        <button type="submit" className="lx-btn lx-btn-primary">
                            <CheckCircle2 size={14} />
                            Publish Experience Live
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Multi-Axis Filter & Remote-Schedule Toolbar */}
            <section className="lx-toolbar" aria-label="Filter local experiences">
                <div className="lx-toolbar-row">
                    <div className="lx-tabs" role="tablist">
                        {EXPERIENCE_CATEGORIES.map((cat) => {
                            const count =
                                cat.id === 'saved'
                                    ? totalSavedCount
                                    : cat.id === 'reserved'
                                    ? totalReservedCount
                                    : null;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeCategory === cat.id}
                                    className={`lx-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.label}
                                    {count !== null ? ` (${count})` : ''}
                                </button>
                            );
                        })}
                    </div>

                    <div className="lx-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search matcha, coral dive, fado, surf, coffee..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search local experiences"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                                aria-label="Clear search"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="lx-toolbar-row">
                    <div className="lx-filter-controls">
                        <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#94a3b8' }}>
                            Work-Day Fit:
                        </span>
                        <div className="lx-window-group" role="group" aria-label="Filter by work schedule window">
                            {SCHEDULE_WINDOWS.map((win) => (
                                <button
                                    key={win.id}
                                    type="button"
                                    className={`lx-window-btn ${activeWindow === win.id ? 'active' : ''}`}
                                    onClick={() => setActiveWindow(win.id)}
                                >
                                    {win.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lx-filter-controls">
                        <SlidersHorizontal size={13} color="#94a3b8" />
                        <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>Sort:</span>
                        <select
                            className="lx-select"
                            style={{ width: 'auto', padding: '0.32rem 0.65rem', fontSize: '0.73rem' }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort local experiences"
                        >
                            <option value="recommended">Most Popular & Verified</option>
                            <option value="rating-desc">Highest Rated (4.95+)</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="xp-desc">Highest XP & Impact</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 4. Main Split Workspace: Experiences Catalog + Cultural Compass Sidebar */}
            <div className="lx-workspace-layout">
                {/* Left Column: Experiences Grid */}
                <section className="lx-grid" aria-label="Local experiences catalog">
                    {filteredExperiences.length === 0 ? (
                        <div
                            className="lx-side-panel"
                            style={{ gridColumn: '1 / -1', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1.5rem' }}
                        >
                            <Palmtree size={28} color="#38bdf8" />
                            <h3 style={{ margin: '0.35rem 0 0 0', fontSize: '1.05rem' }}>
                                No Local Experiences Match Your Current Filter
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', maxWidth: 420 }}>
                                Try switching to &ldquo;All Immersions&rdquo; or clearing the work-schedule window filter to explore all verified workshops and eco-immersions.
                            </p>
                            <button
                                type="button"
                                className="lx-btn lx-btn-primary"
                                onClick={() => {
                                    setActiveCategory('all');
                                    setActiveWindow('all');
                                    setActiveHubCountry('All');
                                    setSearchQuery('');
                                }}
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        filteredExperiences.map((exp) => {
                            const isSaved = !!savedIds[exp.id];
                            const reservation = reservedPasses[exp.id];

                            return (
                                <article key={exp.id} className="lx-card">
                                    <div>
                                        <div
                                            className="lx-card-media"
                                            onClick={() => setSelectedExp(exp)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') setSelectedExp(exp);
                                            }}
                                        >
                                            <img src={exp.image} alt={exp.title} loading="lazy" />
                                            <div className="lx-media-overlay">
                                                <span className="lx-location-label">
                                                    {exp.flag} {exp.city}, {exp.country}
                                                </span>
                                                <button
                                                    type="button"
                                                    className={`lx-save-btn ${isSaved ? 'saved' : ''}`}
                                                    onClick={(e) => handleToggleSave(exp, e)}
                                                    aria-label="Save experience"
                                                >
                                                    <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                                </button>
                                            </div>
                                            <div className="lx-media-bottom-strip">
                                                <span>{exp.scheduleWindow}</span>
                                                <span>
                                                    {exp.spotsLeft} spots left · {exp.groupSize}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lx-card-body">
                                            <div className="lx-host-line">
                                                <span>Hosted by {exp.host}</span>
                                                <span>
                                                    <Star
                                                        size={12}
                                                        fill="#F59E0B"
                                                        color="#F59E0B"
                                                        style={{ display: 'inline', marginRight: 3 }}
                                                    />
                                                    <strong>{exp.rating}</strong> ({exp.reviewsCount})
                                                </span>
                                            </div>

                                            <h3
                                                className="lx-card-title"
                                                onClick={() => setSelectedExp(exp)}
                                            >
                                                {exp.title}
                                            </h3>

                                            {/* Unboxed Metadata Line */}
                                            <div className="lx-meta-strip">
                                                <span>
                                                    <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                                                    {exp.duration}
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span>{exp.languages}</span>
                                                <span aria-hidden="true">·</span>
                                                <span style={{ color: '#10b981', fontWeight: 700 }}>
                                                    +{exp.xpReward} XP
                                                </span>
                                            </div>

                                            <p className="lx-card-desc">{exp.desc}</p>

                                            <div className="lx-highlights-line">
                                                <HeartHandshake
                                                    size={12}
                                                    color="#38bdf8"
                                                    style={{ display: 'inline', marginRight: 5 }}
                                                />
                                                <strong>Impact:</strong> {exp.ecoImpact}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lx-card-footer">
                                        <div>
                                            <span className="lx-price-display">${exp.price}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                                                {' '}
                                                / guest
                                            </span>
                                            {reservation && (
                                                <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>
                                                    Pass {reservation.passCode} · {reservation.date}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button
                                                type="button"
                                                className="lx-btn"
                                                onClick={(e) => handlePushToItinerary(exp, e)}
                                                title="Queue directly into ChronoRoute Itinerary Builder"
                                            >
                                                + Itinerary
                                            </button>
                                            <button
                                                type="button"
                                                className={`lx-btn ${reservation ? 'lx-btn-emerald' : 'lx-btn-primary'}`}
                                                onClick={() => setSelectedExp(exp)}
                                            >
                                                {reservation ? (
                                                    <>
                                                        <CheckCircle2 size={13} />
                                                        View Pass
                                                    </>
                                                ) : (
                                                    'Syllabus & Book'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </section>

                {/* Right Column: Cultural Etiquette Compass & Phrasebook Deck */}
                <aside className="lx-side-rail" aria-label="Cultural Compass and Survival Phrasebook">
                    {/* Cultural Etiquette Panel */}
                    <div className="lx-side-panel">
                        <h3 className="lx-side-title">
                            <span>
                                <Compass
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                {currentCompass.title}
                            </span>
                        </h3>

                        <div className="lx-etiquette-list">
                            <div className="lx-etiquette-item">
                                <strong style={{ color: '#38bdf8' }}>Tipping & Table Customs</strong>
                                <span>{currentCompass.tipping}</span>
                            </div>
                            <div className="lx-etiquette-item">
                                <strong style={{ color: '#38bdf8' }}>Work-Cafe & Call Etiquette</strong>
                                <span>{currentCompass.coworkingEtiquette}</span>
                            </div>
                            <div className="lx-etiquette-item">
                                <strong style={{ color: '#38bdf8' }}>Temple & Studio Dress Code</strong>
                                <span>{currentCompass.dressCode}</span>
                            </div>
                            <div className="lx-etiquette-item">
                                <strong style={{ color: '#10b981' }}>Regenerative Impact Pledge</strong>
                                <span>{currentCompass.impactNote}</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Audio Phrasebook Deck */}
                    <div className="lx-side-panel">
                        <div className="lx-side-title">
                            <span>
                                <Volume2
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Essential Host & Artisan Phrases
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
                                Click to Speak
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {currentCompass.phrases.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="lx-phrase-card"
                                    onClick={() => handleSpeakPhrase(p)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSpeakPhrase(p);
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <strong style={{ fontSize: '0.78rem' }}>{p.native}</strong>
                                        <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>
                                            “{p.phonetic}”
                                        </span>
                                        <span style={{ fontSize: '0.69rem', color: '#94a3b8' }}>
                                            {p.meaning}
                                        </span>
                                    </div>
                                    <Volume2 size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="lx-btn"
                            style={{ width: '100%', marginTop: '0.2rem' }}
                            onClick={() => navigate('/explore/guardians')}
                        >
                            <UserCheck size={14} />
                            Connect with Local Fixers & Translators
                        </button>
                    </div>
                </aside>
            </div>

            {/* 5. Deep-Dive Experience Syllabus & Instant Reservation Modal */}
            {selectedExp && (
                <div
                    className="lx-modal-backdrop"
                    onClick={() => setSelectedExp(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="lx-modal-title"
                >
                    <form
                        className="lx-modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleConfirmBooking}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="lx-kicker">
                                    {selectedExp.flag} {selectedExp.city}, {selectedExp.country} · {selectedExp.scheduleWindow}
                                </span>
                                <h3 id="lx-modal-title" style={{ margin: '0.25rem 0 0 0', fontSize: '1.18rem' }}>
                                    {selectedExp.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="lx-btn"
                                onClick={() => setSelectedExp(null)}
                                aria-label="Close modal"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Unboxed Host & Verification Line */}
                        <div className="lx-meta-strip">
                            <span>
                                Hosted by <strong>{selectedExp.host}</strong> ({selectedExp.hostRole})
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                                ★ {selectedExp.rating} ({selectedExp.reviewsCount} verified reviews)
                            </span>
                            <span aria-hidden="true">·</span>
                            <span style={{ color: '#10b981', fontWeight: 700 }}>
                                +{selectedExp.xpReward} Nomad XP
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#cbd5e1' }}>
                            {selectedExp.desc}
                        </p>

                        {/* Minute-by-Minute Immersion Syllabus */}
                        {selectedExp.syllabus && (
                            <div className="lx-syllabus-timeline">
                                <strong style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
                                    Immersion Syllabus ({selectedExp.duration})
                                </strong>
                                {selectedExp.syllabus.map((item, idx) => (
                                    <div key={idx} className="lx-syllabus-step">
                                        <span className="lx-syllabus-time">{item.time}</span>
                                        <span>{item.step}</span>
                                    </div>
                                ))}
                                <div style={{ fontSize: '0.73rem', color: '#94a3b8', paddingTop: '0.35rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                    <strong>Included:</strong> {selectedExp.included}
                                </div>
                            </div>
                        )}

                        {/* Reservation Controls */}
                        <div className="lx-form-grid">
                            <label className="lx-field-label">
                                <span>Preferred Session Date</span>
                                <input
                                    type="date"
                                    className="lx-input"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="lx-field-label">
                                <span>Group Size ({selectedExp.groupSize})</span>
                                <select
                                    className="lx-select"
                                    value={bookingGuests}
                                    onChange={(e) => setBookingGuests(Number(e.target.value))}
                                >
                                    <option value={1}>1 Guest (${selectedExp.price})</option>
                                    <option value={2}>2 Guests (${selectedExp.price * 2})</option>
                                    <option value={3}>3 Guests (${selectedExp.price * 3})</option>
                                    <option value={4}>4 Guests (${selectedExp.price * 4})</option>
                                </select>
                            </label>
                        </div>

                        <label className="lx-field-label">
                            <span>Dietary Notes / Language Level (Optional)</span>
                            <input
                                type="text"
                                className="lx-input"
                                placeholder="e.g. Vegetarian, beginner Japanese, bringing camera gear..."
                                value={bookingNote}
                                onChange={(e) => setBookingNote(e.target.value)}
                            />
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            {reservedPasses[selectedExp.id] ? (
                                <button
                                    type="button"
                                    className="lx-btn"
                                    onClick={() => handleCancelBooking(selectedExp.id, selectedExp.title)}
                                >
                                    Cancel Pass ({reservedPasses[selectedExp.id].passCode})
                                </button>
                            ) : (
                                <span style={{ fontSize: '0.73rem', color: '#94a3b8' }}>
                                    Free rescheduling up to 24h before session · Instant Pass QR
                                </span>
                            )}

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    className="lx-btn"
                                    onClick={(e) => handlePushToItinerary(selectedExp, e)}
                                >
                                    + Add to Itinerary
                                </button>
                                <button type="submit" className="lx-btn lx-btn-primary">
                                    <CheckCircle2 size={14} />
                                    {reservedPasses[selectedExp.id]
                                        ? `Update Pass ($${selectedExp.price * bookingGuests})`
                                        : `Confirm Spot ($${selectedExp.price * bookingGuests})`}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LearningVoluntourism;
