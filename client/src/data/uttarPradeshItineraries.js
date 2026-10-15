/**
 * uttarPradeshItineraries.js
 * Curated Day-by-Day Travel Blueprints for Uttar Pradesh, India.
 * Covers all official circuits: Sacred Ganga/Spiritual, Mughal/Braj, Awadh Nawabi,
 * Buddhist Pilgrimage, Bundelkhand Forts, and Terai/Wilderness Safari.
 */

import { uttarPradeshDestinations } from './uttarPradeshDestinationsData';

// Helper to look up a destination by ID or name substring
export const findUPDestination = (idOrQuery) => {
    if (typeof idOrQuery === 'number') {
        return uttarPradeshDestinations.find((d) => d.id === idOrQuery);
    }
    const q = String(idOrQuery).toLowerCase();
    return uttarPradeshDestinations.find(
        (d) => d.name.toLowerCase().includes(q) || d.district.toLowerCase() === q
    );
};

export const UTTAR_PRADESH_ITINERARY_PRESETS = [
    {
        id: 'up-sacred-ganga-spiritual',
        name: 'Sacred Ganga & Spiritual Triad',
        badge: '🕉️ 4 Days Featured',
        circuit: 'Spiritual & Heritage',
        districts: ['Varanasi', 'Ayodhya', 'Prayagraj'],
        startDate: '2026-11-05',
        travelers: 2,
        pace: 'Spiritual Immersion',
        budget: 480,
        budgetInr: 39500,
        description: 'Varanasi Ganga Ghats & Kashi Vishwanath, Ayodhya Ram Janmabhoomi & Sarayu Aarti, and Prayagraj Triveni Sangam.',
        days: [
            {
                id: 'day-up-1',
                dayNumber: 1,
                city: 'Varanasi (Kashi)',
                district: 'Varanasi',
                flag: '🕉️',
                transitMode: 'Varanasi Airport / Cantt Station → Ghats Boat Ride',
                weather: '23°C · Crisp & Holy',
                stops: [
                    {
                        id: 'up-stop-101',
                        destinationId: 2043,
                        time: '05:30 - 08:30',
                        category: 'culture',
                        title: 'Subah-e-Banaras Sunrise Boat Ride on the Ganges',
                        location: 'Assi Ghat to Manikarnika Ghat, Varanasi',
                        district: 'Varanasi',
                        cost: 15,
                        costInr: 1200,
                        wifiMbps: 50,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
                        note: 'Witness sunrise prayers, classical morning ragas at Assi, and misty ancient palaces.',
                        odop: 'Banarasi Silk Sarees & Brocades',
                        localCuisine: 'Kachori Jalebi at Ram Bhandar, Blue Lassi'
                    },
                    {
                        id: 'up-stop-102',
                        destinationId: 2043,
                        time: '09:30 - 12:30',
                        category: 'culture',
                        title: 'Kashi Vishwanath Corridor & Golden Temple Darshan',
                        location: 'Vishwanath Gali, Godowlia, Varanasi',
                        district: 'Varanasi',
                        cost: 10,
                        costInr: 800,
                        wifiMbps: 120,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800',
                        note: 'One of the 12 sacred Jyotirlingas. Carry government ID; lockers available at Sugam Darshan desk.',
                        odop: 'Banarasi Silk Sarees',
                        localCuisine: 'Authentic Banarasi Paan at Keshav Tambool'
                    },
                    {
                        id: 'up-stop-103',
                        destinationId: 2043,
                        time: '18:00 - 20:30',
                        category: 'culture',
                        title: 'Dashashwamedh Ghat Grand Maha Ganga Aarti',
                        location: 'Dashashwamedh Ghat Riverfront, Varanasi',
                        district: 'Varanasi',
                        cost: 8,
                        costInr: 650,
                        wifiMbps: 80,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
                        note: 'Reserve wooden riverboat 45 mins prior to evening twilight for uninterrupted view of brass lamp rituals.',
                        odop: 'Banarasi Silk & Gulabi Meenakari',
                        localCuisine: 'Tamatar Chaat & Malaiyo winter dew sweet'
                    }
                ]
            },
            {
                id: 'day-up-2',
                dayNumber: 2,
                city: 'Sarnath & Heritage Weavers',
                district: 'Varanasi',
                flag: '☸️',
                transitMode: 'Local Auto / Cab Corridor (10 km)',
                weather: '24°C · Sunny & Serene',
                stops: [
                    {
                        id: 'up-stop-201',
                        destinationId: 2044,
                        time: '09:00 - 12:30',
                        category: 'culture',
                        title: 'Dhamek Stupa & Sarnath Deer Park Sanctuary',
                        location: 'Sarnath Sacred Precinct, Varanasi District',
                        district: 'Varanasi',
                        cost: 6,
                        costInr: 500,
                        wifiMbps: 110,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800',
                        note: 'Site of Gautama Buddha’s first sermon (Dhammacakkappavattana Sutta). Explore Ashoka Lion Capital museum.',
                        odop: 'Handmade Silk Weaving Looms in Sarnath villages',
                        localCuisine: 'Litti Chokha & Sarnath herbal tea'
                    },
                    {
                        id: 'up-stop-202',
                        destinationId: 2043,
                        time: '14:30 - 17:30',
                        category: 'work',
                        title: 'Awadh & Kashi Nomad Cowork Lounge Session',
                        location: 'Lanka / BHU University Gate, Varanasi',
                        district: 'Varanasi',
                        cost: 12,
                        costInr: 1000,
                        wifiMbps: 450,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800',
                        note: 'Dedicated fiber desks, air conditioning, and peaceful rooftop overlooking Banaras Hindu University.',
                        odop: 'Wooden Lacquerware & Toys',
                        localCuisine: 'Cold Cold Badam Thandai with Kesar'
                    }
                ]
            },
            {
                id: 'day-up-3',
                dayNumber: 3,
                city: 'Ayodhya (Saket Bhumi)',
                district: 'Ayodhya',
                flag: '🚩',
                transitMode: 'Vande Bharat Express: Varanasi Cantt → Ayodhya Cantt (2h 10m)',
                weather: '23°C · Golden Sun',
                stops: [
                    {
                        id: 'up-stop-301',
                        destinationId: 2011,
                        time: '09:30 - 13:00',
                        category: 'culture',
                        title: 'Shri Ram Janmabhoomi Mandir Complex Darshan',
                        location: 'Ramkot, Ayodhya District, Uttar Pradesh',
                        district: 'Ayodhya',
                        cost: 0,
                        costInr: 0,
                        wifiMbps: 150,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Grand Nagara-style pink Bansi Paharpur sandstone temple. Digital pass booked via official portal.',
                        odop: 'Ayodhya Wooden Carved Artifacts & Gur (Jaggery)',
                        localCuisine: 'Ayodhya Sita Rasoi Khichdi Prasad & Laddu'
                    },
                    {
                        id: 'up-stop-302',
                        destinationId: 2012,
                        time: '14:30 - 16:30',
                        category: 'culture',
                        title: 'Hanuman Garhi Fort Temple & Kanak Bhawan Palace',
                        location: 'Central Ayodhya Heritage Hill',
                        district: 'Ayodhya',
                        cost: 2,
                        costInr: 150,
                        wifiMbps: 90,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
                        note: '76 steep stone steps lead to 10th-century fortress shrine guarding Ayodhya. Kanak Bhawan features Bundela gold frescos.',
                        odop: 'Ayodhya Jaggery Products',
                        localCuisine: 'Hanuman Garhi Besan Laddu & Rabri'
                    },
                    {
                        id: 'up-stop-303',
                        destinationId: 2011,
                        time: '18:00 - 20:00',
                        category: 'culture',
                        title: 'Sarayu River Ram Ki Paidi & Evening Maha Aarti',
                        location: 'Ram Ki Paidi Ghats, Ayodhya',
                        district: 'Ayodhya',
                        cost: 5,
                        costInr: 400,
                        wifiMbps: 120,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
                        note: 'Atmospheric illuminated steps with evening laser fountain show and floating earthen lamps.',
                        odop: 'Ayodhya Khadi Fabric',
                        localCuisine: 'Ram Ki Paidi Malai Kulfi'
                    }
                ]
            },
            {
                id: 'day-up-4',
                dayNumber: 4,
                city: 'Prayagraj (Triveni Sangam)',
                district: 'Prayagraj',
                flag: '🌊',
                transitMode: 'Intercity Rail / NH330 Expressway: Ayodhya → Prayagraj (2h 45m)',
                weather: '22°C · Pleasant Breeze',
                stops: [
                    {
                        id: 'up-stop-401',
                        destinationId: 2038,
                        time: '08:00 - 11:30',
                        category: 'culture',
                        title: 'Triveni Sangam Holy Confluence Boat Pilgrimage',
                        location: 'Sangam Nose, Prayagraj District',
                        district: 'Prayagraj',
                        cost: 14,
                        costInr: 1100,
                        wifiMbps: 75,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
                        note: 'Confluence of Ganga, Yamuna, and mystical Saraswati. Spectacular contrast between pale green Yamuna and deep Ganga.',
                        odop: 'Munj Craft Baskets & Food Processing (Allahabad Guava)',
                        localCuisine: 'Famous Allahabad Surkha Red Guavas & Loknath Lassi'
                    },
                    {
                        id: 'up-stop-402',
                        destinationId: 2039,
                        time: '13:00 - 15:30',
                        category: 'culture',
                        title: 'Allahabad Akbar Fort & Underground Akshayavat Tree',
                        location: 'Yamuna Riverfront, Prayagraj',
                        district: 'Prayagraj',
                        cost: 4,
                        costInr: 300,
                        wifiMbps: 85,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: 'Massive 1583 Mughal sandstone fortress housing the indestructible sacred banyan tree and Patalpuri Temple.',
                        odop: 'Munj Grass Handicrafts',
                        localCuisine: 'Netram Mulchand Kachori Thali'
                    },
                    {
                        id: 'up-stop-403',
                        destinationId: 2038,
                        time: '16:30 - 18:30',
                        category: 'culture',
                        title: 'Anand Bhawan Heritage Museum & Planetarium',
                        location: 'Tagore Town, Prayagraj',
                        district: 'Prayagraj',
                        cost: 3,
                        costInr: 250,
                        wifiMbps: 90,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'Historic ancestral mansion of Nehru family and nerve center of India’s independence movement.',
                        odop: 'Munj Crafts',
                        localCuisine: 'Allahabad Dehati Rasgulla'
                    }
                ]
            }
        ]
    },
    {
        id: 'up-imperial-braj-mughal',
        name: 'Imperial Mughal & Braj Bhumi Wonders',
        badge: '🕌 3 Days Featured',
        circuit: 'Mughal & Architecture',
        districts: ['Agra', 'Mathura'],
        startDate: '2026-11-12',
        travelers: 2,
        pace: 'Culture & Romance',
        budget: 390,
        budgetInr: 32000,
        description: 'Sunrise at Taj Mahal, Agra Fort, Buland Darwaza in Fatehpur Sikri, and Krishna Janmabhoomi in Mathura & Vrindavan.',
        days: [
            {
                id: 'day-braj-1',
                dayNumber: 1,
                city: 'Agra (Imperial City)',
                district: 'Agra',
                flag: '🕌',
                transitMode: 'Gatimaan Express / Yamuna Expressway → Agra Cantt',
                weather: '24°C · Sunny',
                stops: [
                    {
                        id: 'braj-stop-101',
                        destinationId: 2001,
                        time: '06:00 - 09:30',
                        category: 'culture',
                        title: 'Taj Mahal Sunrise Experience & Charbagh Gardens',
                        location: 'Tajganj, Agra District, Uttar Pradesh',
                        district: 'Agra',
                        cost: 15,
                        costInr: 1250,
                        wifiMbps: 120,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
                        note: 'Arrive at East Gate at 05:45 AM. Golden morning light illuminates the translucent Makrana marble.',
                        odop: 'Marble Inlay (Pietra Dura) & Leather Footwear',
                        localCuisine: 'Panchhi Petha (Angoori, Kesar, Paan), Bedmi Puri'
                    },
                    {
                        id: 'braj-stop-102',
                        destinationId: 2002,
                        time: '11:00 - 14:00',
                        category: 'culture',
                        title: 'Agra Red Fort & Shah Jahan’s Musamman Burj',
                        location: 'Agra Fort Campus, Yamuna Riverfront',
                        district: 'Agra',
                        cost: 8,
                        costInr: 650,
                        wifiMbps: 140,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'Mughal power citadel with Diwan-i-Am, Diwan-i-Khas, and octagonal tower where Shah Jahan gazed at the Taj.',
                        odop: 'Zari Zardozi Embroidery & Leather Goods',
                        localCuisine: 'Mughlai Gosht Korma, Dal Moth'
                    },
                    {
                        id: 'braj-stop-103',
                        destinationId: 2001,
                        time: '17:00 - 19:00',
                        category: 'culture',
                        title: 'Mehtab Bagh Moonlight Garden Sunset Vista',
                        location: 'Across Yamuna River, Agra',
                        district: 'Agra',
                        cost: 4,
                        costInr: 300,
                        wifiMbps: 60,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
                        note: 'Perfect reflection photography spot with zero tourist crowd across the river.',
                        odop: 'Marble Pietra Dura Table Tops',
                        localCuisine: 'Agra Jalebi & Kadai Milk'
                    }
                ]
            },
            {
                id: 'day-braj-2',
                dayNumber: 2,
                city: 'Fatehpur Sikri & Mathura',
                district: 'Mathura',
                flag: '🦚',
                transitMode: 'Private AC Cab via Bikaner-Agra Road (38 km to Sikri, 58 km to Mathura)',
                weather: '25°C · Warm & Clear',
                stops: [
                    {
                        id: 'braj-stop-201',
                        destinationId: 2003,
                        time: '09:00 - 12:30',
                        category: 'culture',
                        title: 'Fatehpur Sikri Imperial Capital & Buland Darwaza',
                        location: 'Fatehpur Sikri, Agra District',
                        district: 'Agra',
                        cost: 7,
                        costInr: 600,
                        wifiMbps: 75,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: 'Highest gateway in the world (54 meters). Visit white marble Dargah of Sufi Saint Salim Chishti.',
                        odop: 'Handmade Durries & Marble Carvings',
                        localCuisine: 'Khasta Kachori with spicy Aloo Sabzi'
                    },
                    {
                        id: 'braj-stop-202',
                        destinationId: 2034,
                        time: '15:30 - 19:30',
                        category: 'culture',
                        title: 'Shri Krishna Janmabhoomi & Vishram Ghat Yamuna Aarti',
                        location: 'Deeg Gate & Vishram Ghat, Mathura',
                        district: 'Mathura',
                        cost: 3,
                        costInr: 250,
                        wifiMbps: 90,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Ancient prison cell sanctum (Garbha Griha) where Lord Krishna was born. Evening boat at Vishram Ghat.',
                        odop: 'Sanstha Sanitary Fittings & Peda Craft',
                        localCuisine: 'Mathura Ke Pede (Brown Cardamom Infused) & Malpua'
                    }
                ]
            },
            {
                id: 'day-braj-3',
                dayNumber: 3,
                city: 'Vrindavan & Govardhan',
                district: 'Mathura',
                flag: '🪈',
                transitMode: 'Local E-Rickshaw / Cab (12 km)',
                weather: '24°C · Festive & Joyous',
                stops: [
                    {
                        id: 'braj-stop-301',
                        destinationId: 2035,
                        time: '08:30 - 12:00',
                        category: 'culture',
                        title: 'Banke Bihari Mandir & Nidhivan Forest Mysteries',
                        location: 'Gods Villa, Vrindavan, Mathura District',
                        district: 'Mathura',
                        cost: 0,
                        costInr: 0,
                        wifiMbps: 90,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
                        note: 'The curtains of Thakurji open and close rhythmically to protect devotees from swooning in ecstasy.',
                        odop: 'Thakurji Poshak & Brass Idols',
                        localCuisine: 'Vrindavan Makhan Mishri Prasad & Rabri'
                    },
                    {
                        id: 'braj-stop-302',
                        destinationId: 2035,
                        time: '17:30 - 20:30',
                        category: 'culture',
                        title: 'Prem Mandir White Italian Marble Temple & Light Show',
                        location: 'Chhatikara Road, Raman Reti, Vrindavan',
                        district: 'Mathura',
                        cost: 2,
                        costInr: 150,
                        wifiMbps: 110,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
                        note: 'Spectacular multi-color LED musical fountain show and intricate marble bas-relief carvings.',
                        odop: 'Braj Wooden Flutes & Poshak',
                        localCuisine: 'Chhena Kheer at Raman Reti'
                    }
                ]
            }
        ]
    },
    {
        id: 'up-nawabi-awadh-splendor',
        name: 'Nawabi Awadh & Perfume Trails',
        badge: '👑 3 Days Featured',
        circuit: 'Nawabi & Awadh',
        districts: ['Lucknow', 'Kannauj'],
        startDate: '2026-11-20',
        travelers: 1,
        pace: 'Culinary & Craft',
        budget: 340,
        budgetInr: 28000,
        description: 'Bara Imambara, Rumi Darwaza, Chikan embroidery workshops in Lucknow, and ancient Deg-Bhapka attar distilleries in Kannauj.',
        days: [
            {
                id: 'day-lko-1',
                dayNumber: 1,
                city: 'Lucknow (Old Nawabi Quarter)',
                district: 'Lucknow',
                flag: '👑',
                transitMode: 'CCS International Airport / Charbagh Station → Hazratganj Metro',
                weather: '22°C · Mild Autumn',
                stops: [
                    {
                        id: 'lko-stop-101',
                        destinationId: 2031,
                        time: '09:30 - 13:00',
                        category: 'culture',
                        title: 'Bara Imambara & Mystery Bhool Bhulaiya Labyrinth',
                        location: 'Husainabad, Lucknow District, Uttar Pradesh',
                        district: 'Lucknow',
                        cost: 6,
                        costInr: 500,
                        wifiMbps: 120,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'Unsupported vaulted hall built without iron beams. Hire an authorized guide for the 1,024 rooftop passages.',
                        odop: 'Chikan & Zari Zardozi Embroidery',
                        localCuisine: 'Awadhi Sheermal & Galouti Kebabs at Tunday Kababi'
                    },
                    {
                        id: 'lko-stop-102',
                        destinationId: 2032,
                        time: '14:30 - 16:30',
                        category: 'culture',
                        title: 'Rumi Darwaza & Chhota Imambara (Palace of Lights)',
                        location: 'Husainabad Heritage Corridor, Lucknow',
                        district: 'Lucknow',
                        cost: 4,
                        costInr: 300,
                        wifiMbps: 130,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: '60-foot gate modeled after Constantinople Sublime Porte. Chhota Imambara features Belgian glass chandeliers.',
                        odop: 'Lucknow Zardozi Handicrafts',
                        localCuisine: 'Kulfi Falooda at Prakash Kulfi Aminabad'
                    },
                    {
                        id: 'lko-stop-103',
                        destinationId: 2031,
                        time: '18:00 - 21:00',
                        category: 'dining',
                        title: 'Hazratganj Ganjing Evening & Awadhi Dastarkhwan',
                        location: 'Hazratganj Victorian Boulevard, Lucknow',
                        district: 'Lucknow',
                        cost: 18,
                        costInr: 1500,
                        wifiMbps: 180,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800',
                        note: 'Colonial style shopping arcade. Try Lucknow basket chaat at Royal Cafe followed by Awadhi Dum Biryani.',
                        odop: 'Chikan Kurta Shopping at Janpath',
                        localCuisine: 'Basket Chaat & Shahi Tukda'
                    }
                ]
            },
            {
                id: 'day-lko-2',
                dayNumber: 2,
                city: 'Lucknow Artisan Looms & British Residency',
                district: 'Lucknow',
                flag: '🧵',
                transitMode: 'Lucknow Metro & Private Auto (15 km)',
                weather: '23°C · Sunny',
                stops: [
                    {
                        id: 'lko-stop-201',
                        destinationId: 2031,
                        time: '10:00 - 13:00',
                        category: 'work',
                        title: 'Chowk Heritage Artisan Guild: Live Chikankari Demonstration',
                        location: 'Chowk Old Bazaar, Lucknow',
                        district: 'Lucknow',
                        cost: 10,
                        costInr: 800,
                        wifiMbps: 90,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Observe master artisans stitching 32 traditional needlework stitches including Tepchi, Bakhiya, and Murri.',
                        odop: 'Authentic GI-Tagged Lucknow Chikankari',
                        localCuisine: 'Idrees Biryani in Chowk, Makhan Malai'
                    },
                    {
                        id: 'lko-stop-202',
                        destinationId: 2031,
                        time: '15:00 - 17:30',
                        category: 'culture',
                        title: 'The British Residency Gardens & 1857 Memorial Complex',
                        location: 'Mahatma Gandhi Marg, Lucknow',
                        district: 'Lucknow',
                        cost: 3,
                        costInr: 250,
                        wifiMbps: 110,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'Preserved ruins bearing cannonball scars from the 1857 First War of Indian Independence.',
                        odop: 'Bone Carving Handicrafts',
                        localCuisine: 'Sharma Chai & Bun Makkhan in Lalbagh'
                    }
                ]
            },
            {
                id: 'day-lko-3',
                dayNumber: 3,
                city: 'Kannauj (Perfume Capital of India)',
                district: 'Kannauj',
                flag: '🌸',
                transitMode: 'Agra-Lucknow Expressway Drive (120 km · 1h 45m)',
                weather: '23°C · Aromatic & Clear',
                stops: [
                    {
                        id: 'lko-stop-301',
                        destinationId: 2026,
                        time: '10:00 - 14:00',
                        category: 'culture',
                        title: 'Ancient Deg-Bhapka Attar Distilleries & Rose Gardens',
                        location: 'Bara Bazaar, Kannauj District',
                        district: 'Kannauj',
                        cost: 15,
                        costInr: 1200,
                        wifiMbps: 85,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: '400-year-old copper still hydro-distillation creating Mitti Attar (petrichor baked earth perfume) and Shamama.',
                        odop: 'Kannauj Natural Attar & Essential Oils (GI Tag)',
                        localCuisine: 'Kannauj Gulab Kheer & Samosa Chaat'
                    },
                    {
                        id: 'lko-stop-302',
                        destinationId: 2026,
                        time: '15:30 - 18:00',
                        category: 'culture',
                        title: 'Archaeological Museum of King Harshavardhana & Ganges Bank',
                        location: 'Civil Lines, Kannauj District',
                        district: 'Kannauj',
                        cost: 2,
                        costInr: 150,
                        wifiMbps: 70,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800',
                        note: 'Stone sculptures from 7th-century Vardhana Empire described by Chinese pilgrim Xuanzang.',
                        odop: 'Attar Perfumes & Rose Water',
                        localCuisine: 'Kannauj Peda & Khoya sweets'
                    }
                ]
            }
        ]
    },
    {
        id: 'up-buddhist-enlightenment',
        name: 'Buddhist Enlightenment Sacred Pilgrimage',
        badge: '☸️ 4 Days Featured',
        circuit: 'Buddhist Circuit',
        districts: ['Varanasi', 'Kushinagar', 'Shravasti', 'Siddharthnagar'],
        startDate: '2026-11-28',
        travelers: 2,
        pace: 'Meditative Pilgrimage',
        budget: 420,
        budgetInr: 34500,
        description: 'Retrace Lord Buddha’s holy steps from First Sermon at Sarnath to Mahaparinirvana at Kushinagar and Jetavana at Shravasti.',
        days: [
            {
                id: 'day-bud-1',
                dayNumber: 1,
                city: 'Sarnath (First Sermon)',
                district: 'Varanasi',
                flag: '☸️',
                transitMode: 'Varanasi Cantt → Sarnath Sacred Grove (10 km)',
                weather: '22°C · Serene',
                stops: [
                    {
                        id: 'bud-stop-101',
                        destinationId: 2044,
                        time: '08:30 - 12:30',
                        category: 'culture',
                        title: 'Dhamek Stupa & Mulagandha Kuti Vihara Meditation',
                        location: 'Sarnath Sacred Grove, Varanasi District',
                        district: 'Varanasi',
                        cost: 6,
                        costInr: 500,
                        wifiMbps: 120,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800',
                        note: 'Meditate by the 43.6-meter cylindrical stupa where Lord Buddha preached his first discourse to 5 disciples.',
                        odop: 'Varanasi Silk Robes',
                        localCuisine: 'Pure sattvic thali at Buddhist monastery guest house'
                    }
                ]
            },
            {
                id: 'day-bud-2',
                dayNumber: 2,
                city: 'Kushinagar (Mahaparinirvana)',
                district: 'Kushinagar',
                flag: '🙏',
                transitMode: 'NH28 Highway Drive / Kushinagar Airport (195 km)',
                weather: '23°C · Peaceful',
                stops: [
                    {
                        id: 'bud-stop-201',
                        destinationId: 2029,
                        time: '10:00 - 13:30',
                        category: 'culture',
                        title: 'Mahaparinirvana Temple of the Reclining Buddha',
                        location: 'Kushinagar Sacred Precinct, Kushinagar District',
                        district: 'Kushinagar',
                        cost: 5,
                        costInr: 400,
                        wifiMbps: 85,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800',
                        note: 'Monolithic 6.1-meter reddish Chunar sandstone statue of reclining Buddha passing into Parinirvana under two Sal trees.',
                        odop: 'Banana Fiber Products & Crafts',
                        localCuisine: 'Kushinagar Tharu Millet Roti & Dal'
                    },
                    {
                        id: 'bud-stop-202',
                        destinationId: 2029,
                        time: '15:00 - 17:30',
                        category: 'culture',
                        title: 'Ramabhar Stupa (Mukutbandhana Chaitya Cremation Site)',
                        location: 'Ramabhar, Kushinagar',
                        district: 'Kushinagar',
                        cost: 3,
                        costInr: 250,
                        wifiMbps: 70,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: '49-foot brick dome marking the exact site of Lord Buddha’s cremation by the Malla kings.',
                        odop: 'Banana Fiber Eco Artifacts',
                        localCuisine: 'Kushinagar Pedakiya'
                    }
                ]
            },
            {
                id: 'day-bud-3',
                dayNumber: 3,
                city: 'Shravasti (Jetavana Vihara)',
                district: 'Shravasti',
                flag: '🪷',
                transitMode: 'Gorakhpur-Gonda-Shravasti Highway (140 km)',
                weather: '22°C · Meditative',
                stops: [
                    {
                        id: 'bud-stop-301',
                        destinationId: 2049,
                        time: '09:00 - 13:00',
                        category: 'culture',
                        title: 'Jetavana Monastery, Anandabodhi Tree & Miracle Stupa',
                        location: 'Sahet-Mahet, Shravasti District',
                        district: 'Shravasti',
                        cost: 5,
                        costInr: 400,
                        wifiMbps: 80,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: 'Lord Buddha spent 24 rainy-season retreats (vassas) here. See the sacred Anandabodhi tree and Gandhakuti cottage.',
                        odop: 'Tribal Handicrafts & Agro-Processing',
                        localCuisine: 'Shravasti Dehati Dal Bati'
                    }
                ]
            },
            {
                id: 'day-bud-4',
                dayNumber: 4,
                city: 'Kapilvastu (Ancient Shakya Capital)',
                district: 'Siddharthnagar',
                flag: '🏯',
                transitMode: 'NH730 Highway to Piprahwa / Birdpur (75 km)',
                weather: '22°C · Clear & Green',
                stops: [
                    {
                        id: 'bud-stop-401',
                        destinationId: 2050,
                        time: '10:00 - 14:00',
                        category: 'culture',
                        title: 'Piprahwa Ancient Kapilvastu Palace Ruins & Relic Caskets',
                        location: 'Piprahwa, Siddharthnagar District',
                        district: 'Siddharthnagar',
                        cost: 4,
                        costInr: 300,
                        wifiMbps: 65,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Excavated stupa yielded stone coffer containing soapstone relic urns with bone fragments inscribed in pre-Ashokan Brahmi script.',
                        odop: 'Kala Namak Rice (Buddha’s Scented Black Salt Rice, GI Tag)',
                        localCuisine: 'Fragrant Kala Namak Rice Kheer'
                    }
                ]
            }
        ]
    },
    {
        id: 'up-bundelkhand-warrior-forts',
        name: 'Bundelkhand Fortresses & Sacred Groves',
        badge: '⚔️ 3 Days Featured',
        circuit: 'Bundelkhand Circuit',
        districts: ['Jhansi', 'Chitrakoot', 'Banda'],
        startDate: '2026-12-04',
        travelers: 2,
        pace: 'History & Trekking',
        budget: 360,
        budgetInr: 29500,
        description: 'Rani Lakshmibai’s impregnable Jhansi Fort, Chitrakoot’s Mandakini river and Gupt Godavari caves, and Kalinjar Hill Citadel.',
        days: [
            {
                id: 'day-bun-1',
                dayNumber: 1,
                city: 'Jhansi (Fortress of Freedom)',
                district: 'Jhansi',
                flag: '⚔️',
                transitMode: 'Bhopal Shatabdi / Vande Bharat to Jhansi Junction',
                weather: '24°C · Sunny & Dry',
                stops: [
                    {
                        id: 'bun-stop-101',
                        destinationId: 2025,
                        time: '09:00 - 13:00',
                        category: 'culture',
                        title: 'Jhansi Fort & Rani Lakshmibai Equestrian Jumping Point',
                        location: 'Bangira Hill, Jhansi District',
                        district: 'Jhansi',
                        cost: 5,
                        costInr: 400,
                        wifiMbps: 110,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'Climb the 16-acre hilltop rampart where 22-year-old Rani Lakshmibai leaped with horse Badal on her back during 1858 siege.',
                        odop: 'Soft Toys & Engineering Goods',
                        localCuisine: 'Bundeli Thali, Thaggu Ke Laddu, Khurma'
                    },
                    {
                        id: 'bun-stop-102',
                        destinationId: 2025,
                        time: '14:30 - 17:00',
                        category: 'culture',
                        title: 'Rani Mahal Palace & Jhansi Archaeological Museum',
                        location: 'Old City Center, Jhansi',
                        district: 'Jhansi',
                        cost: 3,
                        costInr: 200,
                        wifiMbps: 95,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
                        note: 'Two-story palace with multi-colored floral frescoes and Chandela stone sculptures from Kalinjar and Mahoba.',
                        odop: 'Bundelkhand Soft Toys',
                        localCuisine: 'Jhansi Jaleba & Samosa'
                    }
                ]
            },
            {
                id: 'day-bun-2',
                dayNumber: 2,
                city: 'Chitrakoot (Holy River & Caves)',
                district: 'Chitrakoot',
                flag: '🏹',
                transitMode: 'Bundelkhand Expressway / Highway Drive (145 km)',
                weather: '23°C · Forest Breeze',
                stops: [
                    {
                        id: 'bun-stop-201',
                        destinationId: 2017,
                        time: '08:30 - 12:00',
                        category: 'culture',
                        title: 'Ramghat Mandakini River & Kamadgiri Holy Hill Parikrama',
                        location: 'Ramghat, Chitrakoot District',
                        district: 'Chitrakoot',
                        cost: 4,
                        costInr: 300,
                        wifiMbps: 75,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
                        note: 'Where Goswami Tulsidas composed the Ramcharitmanas. 5-km circumambulation around lush holy Kamadgiri hill.',
                        odop: 'Wooden Toys & Ayurvedic Herb Processing',
                        localCuisine: 'Chitrakoot Khoya Jalebi & Amla Murabba'
                    },
                    {
                        id: 'bun-stop-202',
                        destinationId: 2017,
                        time: '14:00 - 17:30',
                        category: 'culture',
                        title: 'Gupt Godavari Caverns & Sphatik Shila Boulder',
                        location: '18 km south of Chitrakoot Town',
                        district: 'Chitrakoot',
                        cost: 3,
                        costInr: 250,
                        wifiMbps: 50,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Pair of limestone water caves where a secret stream flows knee-deep inside high rock chambers.',
                        odop: 'Handmade Wooden Carvings',
                        localCuisine: 'Wild Forest Berry Squash & Herbal Tea'
                    }
                ]
            },
            {
                id: 'day-bun-3',
                dayNumber: 3,
                city: 'Banda & Kalinjar Citadel',
                district: 'Banda',
                flag: '🏰',
                transitMode: 'Banda-Kalinjar State Highway (65 km)',
                weather: '24°C · Windswept & Dramatic',
                stops: [
                    {
                        id: 'bun-stop-301',
                        destinationId: 2014,
                        time: '10:00 - 15:30',
                        category: 'culture',
                        title: 'Kalinjar Impregnable Hill Fort & Neelkanth Rock Temple',
                        location: 'Vindhya Hills, Kalinjar, Banda District',
                        district: 'Banda',
                        cost: 5,
                        costInr: 400,
                        wifiMbps: 60,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
                        note: 'One of India’s most impregnable fortresses towering 800 feet over Vindhyas with 7 gates and 18-armed Bhairava rock reliefs.',
                        odop: 'Shajar Stone Craft (Agate with dendrite fossil patterns, GI Tag)',
                        localCuisine: 'Banda Shajar Peda & Besan Gatte'
                    }
                ]
            }
        ]
    },
    {
        id: 'up-dudhwa-terai-safari',
        name: 'Dudhwa Tiger Reserve & Terai Wilderness Safari',
        badge: '🐅 3 Days Featured',
        circuit: 'Wildlife & Eco-Tourism',
        districts: ['Lakhimpur Kheri', 'Pilibhit', 'Bahraich'],
        startDate: '2026-12-11',
        travelers: 2,
        pace: 'Nature Safari',
        budget: 450,
        budgetInr: 37000,
        description: 'Bengal Tiger and Greater One-horned Rhinoceros safaris across the Terai Arc, Chuka Beach eco-camps, and dolphin river habitats.',
        days: [
            {
                id: 'day-wild-1',
                dayNumber: 1,
                city: 'Lakhimpur Kheri (Dudhwa National Park)',
                district: 'Lakhimpur Kheri',
                flag: '🐅',
                transitMode: 'Lucknow Airport → Lakhimpur Kheri (220 km · 4h drive)',
                weather: '21°C · Forest Mist',
                stops: [
                    {
                        id: 'wild-stop-101',
                        destinationId: 2030,
                        time: '06:30 - 10:30',
                        category: 'culture',
                        title: 'Dudhwa Sal Forest Open-Jeep Tiger & Rhino Safari',
                        location: 'Dudhwa Tiger Reserve Core, Lakhimpur Kheri District',
                        district: 'Lakhimpur Kheri',
                        cost: 35,
                        costInr: 2800,
                        wifiMbps: 45,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800',
                        note: 'Only wild habitat in UP home to both Royal Bengal Tigers and reintroduced One-Horned Rhinoceros herds in Sonaripur.',
                        odop: 'Tharu Tribal Handloom Embroidery & Jute Products',
                        localCuisine: 'Tharu Tribal Chicken Curry with sticky rice'
                    },
                    {
                        id: 'wild-stop-102',
                        destinationId: 2030,
                        time: '15:30 - 18:00',
                        category: 'culture',
                        title: 'Tharu Indigenous Village Cultural Immersion',
                        location: 'Bordering Indo-Nepal forest line, Dudhwa',
                        district: 'Lakhimpur Kheri',
                        cost: 10,
                        costInr: 800,
                        wifiMbps: 40,
                        booked: false,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Explore painted mud huts, hand-woven grass carpets, and community conservation workshops run by Tharu women.',
                        odop: 'Tharu Jute & Grass Crafts',
                        localCuisine: 'Dudhwa Fresh Sugarcane Juice & Roasted Gram'
                    }
                ]
            },
            {
                id: 'day-wild-2',
                dayNumber: 2,
                city: 'Pilibhit (Chuka Eco-Beach & Sharda Canal)',
                district: 'Pilibhit',
                flag: '🛶',
                transitMode: 'Terai Forest Road: Dudhwa → Pilibhit (110 km)',
                weather: '22°C · Lakeside Breeze',
                stops: [
                    {
                        id: 'wild-stop-201',
                        destinationId: 2037,
                        time: '09:00 - 14:00',
                        category: 'culture',
                        title: 'Chuka Beach Forest Eco-Tourism Retreat on Sharda Sagar Dam',
                        location: 'Mahof Forest Range, Pilibhit District',
                        district: 'Pilibhit',
                        cost: 20,
                        costInr: 1600,
                        wifiMbps: 55,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                        note: 'Treehouse and bamboo huts set beside the massive inland reservoir that mimics a secluded ocean beach inside tiger territory.',
                        odop: 'Pilibhit Wooden Flutes (Bansuri, GI Tag)',
                        localCuisine: 'Pilibhit Dal-Bhat & Handi Fish'
                    }
                ]
            },
            {
                id: 'day-wild-3',
                dayNumber: 3,
                city: 'Katarniaghat Sanctuary (River Dolphin Safari)',
                district: 'Bahraich',
                flag: '🐬',
                transitMode: 'Gerua River Corridor via Bahraich (80 km)',
                weather: '22°C · River Mist',
                stops: [
                    {
                        id: 'wild-stop-301',
                        destinationId: 2013,
                        time: '07:30 - 12:00',
                        category: 'culture',
                        title: 'Gerua River Boat Safari for Gangetic Dolphins & Gharials',
                        location: 'Katarniaghat Wildlife Sanctuary, Bahraich District',
                        district: 'Bahraich',
                        cost: 25,
                        costInr: 2000,
                        wifiMbps: 50,
                        booked: true,
                        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                        note: 'Electric silent motorboat safari along the tranquil Gerua river with guaranteed sightings of fish-eating gharials and endangered river dolphins.',
                        odop: 'Bahraich Wheat Stalk Handicrafts',
                        localCuisine: 'Bahraich Sweet Gujiya & Kheer'
                    }
                ]
            }
        ]
    }
];

export default UTTAR_PRADESH_ITINERARY_PRESETS;
