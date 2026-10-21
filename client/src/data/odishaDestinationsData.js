/**
 * odishaDestinationsData.js
 * Comprehensive travel intelligence & heritage database for Odisha, India (India's Best Kept Secret).
 * Covers all 30 districts across all 3 administrative divisions:
 * Central (Cuttack, Jagatsinghpur, Jajpur, Kendrapara, Khordha, Nayagarh, Puri),
 * Northern (Angul, Balasore, Bargarh, Bhadrak, Bolangir, Deogarh, Dhenkanal, Jharsuguda, Keonjhar, Mayurbhanj, Sambalpur, Sonepur, Sundargarh),
 * Southern (Boudh, Gajapati, Ganjam, Kalahandi, Kandhamal, Koraput, Malkangiri, Nabarangpur, Nuapada, Rayagada).
 *
 * Cataloged across:
 * - Golden Triangle (Puri Jagannath, Konark Sun Temple UNESCO, Bhubaneswar Temple City)
 * - Wetlands & Coast (Chilika Lake Asia's largest brackish lagoon, Bhitarkanika Mangroves & Gahirmatha Turtles, Chandipur)
 * - Eastern Ghats & Waterfalls (Daringbadi "Kashmir of Odisha", Deomali Peak, Barehipani & Joranda Falls, Khandadhar)
 * - Heritage Crafts & Handlooms (Raghurajpur Pattachitra, Pipili Applique, Sambalpuri Ikat, Cuttack Silver Filigree)
 * - Wildlife Sanctuaries (Simlipal Tiger Reserve, Satkosia Gorge, Karlapat, Chandaka)
 * - Ancient Buddhist & Shaktipeeth Circuits (Ratnagiri-Udayagiri-Lalitgiri Diamond Triangle, Biraja, Taratarini)
 *
 * Equipped with curated activities, travel tips, ODOP GI crafts, transits, and telemetry.
 */

export const OD_ALL_30_DISTRICTS = [
    'Angul',
    'Balangir',
    'Balasore',
    'Bargarh',
    'Bhadrak',
    'Boudh',
    'Cuttack',
    'Deogarh',
    'Dhenkanal',
    'Gajapati',
    'Ganjam',
    'Jagatsinghpur',
    'Jajpur',
    'Jharsuguda',
    'Kalahandi',
    'Kandhamal',
    'Kendrapara',
    'Keonjhar',
    'Khurda',
    'Koraput',
    'Malkangiri',
    'Mayurbhanj',
    'Nabarangpur',
    'Nayagarh',
    'Nuapada',
    'Puri',
    'Rayagada',
    'Sambalpur',
    'Subarnapur',
    'Sundargarh'
];

export const odishaDestinations = [
    {
        "id": 7001,
        "name": "Shree Jagannath Temple & Blue Flag Golden Beach",
        "location": "Puri District, Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Puri",
        "division": "Central",
        "odCircuit": "Golden Triangle Circuit",
        "odop": "Puri Pattachitra & Palm Leaf Carvings",
        "rating": 4.95,
        "reviewsCount": 3820,
        "price": "$390/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "One of Hinduism's foremost Char Dham pilgrimage destinations, the 12th-century Jagannath Temple is an architectural masterpiece of Kalinga craftsmanship featuring the legendary Mahaprasad cooked in earthen pots. Puri seamlessly merges spiritual devotion with pristine Blue Flag eco-certified coastal beaches.",
        "highlights": [
            "12th-Century Kalinga Jagannath Sanctum & Ananda Bazar",
            "Blue Flag Eco-Certified Golden Beach Waterfront",
            "World-Famous Annual Ratha Yatra Chariot Procession",
            "Daily Flag Changing Ceremony (Chuna Dhwaja atop Neela Chakra)"
        ],
        "activities": [
            "Partake in the sacred Mahaprasad served fresh inside the sanctum's Ananda Bazar",
            "Stroll along the Blue Flag certified Golden Beach during early sunrise hours",
            "Witness the astonishing evening flag changing ritual atop the 214-foot temple spire",
            "Sample traditional Odisha Khaja pastries from century-old sweet shops along Bada Danda",
            "Attend classical Odissi music and dance performances at evening beach amphitheaters"
        ],
        "travelTips": [
            "Dress modestly in traditional Indian attire for entering the Jagannath Temple complex (leather items and phones prohibited inside)",
            "Book accommodation months ahead if visiting during the mid-summer Ratha Yatra festival (June/July)",
            "Best weather is October through March when coastal sea breezes are refreshing and cool",
            "Direct express trains connect Puri to Kolkata, Delhi, Chennai, and Mumbai daily via SECR & ECoR networks",
            "Puri Blue Flag beach has lifeguards, eco-toilets, and clean certified swimming zones"
        ],
        "tags": [
            "Char Dham",
            "Jagannath",
            "Blue Flag Beach",
            "Puri",
            "Kalinga Architecture",
            "Spiritual"
        ],
        "bestSeason": "Oct – Mar (Pleasant Winter & Refreshing Ocean Breezes)",
        "localCuisine": "Puri Mahaprasad (Abhada), Khaja, Dalma, Chhena Poda, Malpua, Kanika Sweet Rice",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 60 km",
        "railConnectivity": "Puri Railway Station (PURI) - 2 km (Major Eastern Railway Terminal with Vande Bharat Express)"
    },
    {
        "id": 7002,
        "name": "Konark Sun Temple & Chandrabhaga Marine Drive",
        "location": "Puri District (Konark), Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Puri",
        "division": "Central",
        "odCircuit": "Golden Triangle Circuit",
        "odop": "Stone Sculptures & Coir Crafts",
        "rating": 4.92,
        "reviewsCount": 2940,
        "price": "$410/mo",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "A UNESCO World Heritage Monument, Konark's 13th-century Sun Temple is conceived as a colossal cosmic chariot of Surya with 24 ornately carved stone wheels acting as functioning sundials, pulled by seven galloping steeds. Nearby Chandrabhaga Beach provides one of the subcontinent's most mesmerizing sunrises.",
        "highlights": [
            "UNESCO World Heritage 13th-Century Black Pagoda Chariot",
            "Intricately Carved 24 Stone Sundial Wheels with Astrological Precision",
            "Chandrabhaga Clean Eco Beach & Sunrise Point",
            "Annual Konark Dance Festival under Lit Monolithic Backdrops"
        ],
        "activities": [
            "Decipher accurate local time using shadow projections on the carved spokes of the Konark Sundial Wheel",
            "Drive along the scenic casuarina-lined Puri-Konark Marine Drive expressway",
            "Experience the magical evening Light & Sound projection mapping show narrating the lore of Dharmapada",
            "Surf and paddleboard at Chandrabhaga Beach with licensed surfing instructors",
            "Visit the Konark Archaeological Interpretation Centre to view excavated erotic and cosmic stone panels"
        ],
        "travelTips": [
            "Arrive at 6:00 AM at Chandrabhaga Beach to watch the sunrise before exploring the Sun Temple in soft morning light",
            "Hire a certified ASI (Archaeological Survey of India) guide to understand the astronomical alignments of the wheels",
            "Carry sun hats and water bottles as the stone courtyard gets quite warm around midday",
            "Konark Dance Festival takes place December 1-5 annually against the illuminated temple backdrop"
        ],
        "tags": [
            "UNESCO",
            "Sun Temple",
            "Konark",
            "Black Pagoda",
            "Heritage",
            "Marine Drive"
        ],
        "bestSeason": "Oct – Mar (Gentle Ocean Breezes & Cultural Festivals)",
        "localCuisine": "Chhena Jhili, Pakhala Bhata with Fried Fish, Dalma, Enduri Pitha, Rasabali",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 64 km",
        "railConnectivity": "Puri Railway Station (PURI) - 35 km / Bhubaneswar (BBS) - 65 km"
    },
    {
        "id": 7003,
        "name": "Bhubaneswar: Lingaraj, Mukteshvara & Dhauli Shanti Stupa",
        "location": "Khordha District (Bhubaneswar), Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Khurda",
        "division": "Central",
        "odCircuit": "Golden Triangle Circuit",
        "odop": "Silver Filigree & Brass Bell Metal",
        "rating": 4.88,
        "reviewsCount": 2680,
        "price": "$430/mo",
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Known as the \"Ekamra Kshetra\" and \"Temple City of India\", Bhubaneswar originally boasted over 1,000 stone shrines. From the towering 11th-century Lingaraj Temple and gem-like Mukteshvara archway to the ancient rock-cut Jain caves of Udayagiri-Khandagiri and Emperor Ashoka's peaceful Dhauli Peace Pagoda, the city offers unparalleled historical depth.",
        "highlights": [
            "11th-Century Lingaraj Monument & Sacred Bindusagar Lake",
            "Mukteshvara Temple with Famous Torana Archway (Gem of Kalinga Art)",
            "Dhauli Giri Shanti Stupa (Birthplace of Ashoka's Peace & Buddhism)",
            "Twin Udayagiri & Khandagiri Jain Monastic Rock Caves (2nd Century BCE)"
        ],
        "activities": [
            "Walk the Ekamra Walks heritage trail through ancient 7th to 11th-century sandstone temples",
            "Explore Emperor Kharavela's 17-line Brahmi inscription at Hathigumpha cave in Udayagiri",
            "Visit Dhauli Peace Pagoda at dusk for sweeping views of the Daya River and glowing city skyline",
            "Shop for certified Sambalpuri handloom sarees at Boyanika and Utkalika government emporiums",
            "Experience fast fiber coworking cafes and vibrant nomad meetups in Saheed Nagar and Patia tech corridor"
        ],
        "travelTips": [
            "Non-Hindus can view the inner Lingaraj sanctum from the elevated British viewing platform outside",
            "Combine Mukteshvara, Parasurameswara, and Rajarani temples in a single morning walking circuit",
            "City has premier dual-fiber connectivity (300+ Mbps), making it Odisha's primary digital nomad basecamp",
            "Ola/Uber, Mo Bus electric rapid transit, and public bike sharing operate across all major city hubs"
        ],
        "tags": [
            "Temple City",
            "Lingaraj",
            "Dhauli",
            "Ashoka",
            "Mukteshvara",
            "Smart City"
        ],
        "bestSeason": "Oct – Mar (Pleasant temperatures & brisk cultural season)",
        "localCuisine": "Chhena Poda, Dalma, Pakhala Bhata, Manda Pitha, Chhena Gaja, Kora Khai",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - In City (5 km)",
        "railConnectivity": "Bhubaneswar Junction (BBS) - 2 km (Hub for Vande Bharat & Rajdhani Mainlines)"
    },
    {
        "id": 7004,
        "name": "Chilika Lake: Satapada Dolphin Point & Kalijai Island",
        "location": "Puri & Ganjam & Khurda Districts, Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Puri",
        "division": "Central",
        "odCircuit": "Coastal & Wetland Sanctuary",
        "odop": "Chilika Fresh Seafood & Pearl Culture",
        "rating": 4.9,
        "reviewsCount": 2410,
        "price": "$360/mo",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Asia's largest brackish water lagoon, Chilika spans over 1,100 sq km and serves as the winter home to over a million migratory birds from Siberia and the Caspian Sea. Satapada is world-renowned for its playful pod of endangered Irrawaddy dolphins and scenic sandbar sea-mouth openings.",
        "highlights": [
            "Wild Irrawaddy Dolphin Sightings in Natural Satapada Lagoon",
            "Migratory Bird Sanctuary with Greater Flamingos & Pelicans (Mangalajodi)",
            "Historic Maa Kalijai Island Shrine in the Center of the Lake",
            "Rajhans Island Sandy Spit separating Lagoon from the Bay of Bengal"
        ],
        "activities": [
            "Charter an OTDC motorized country boat to track playful Irrawaddy dolphins surfacing near Satapada",
            "Cruise to Maa Kalijai Temple Island and listen to the mythical folk ballad of girl Kalijai",
            "Photograph Siberian pintails, flamingos, and brahminy ducks in the marshy waters of Mangalajodi",
            "Taste freshly prepared Chilika mud crabs, jumbo tiger prawns, and fried pomfret at waterfront shacks",
            "Camp overnight at eco-cottages on the peaceful sands of Rajhans Island"
        ],
        "travelTips": [
            "Best birdwatching months are November to February when Siberian migratory flocks arrive",
            "Book official Odisha Tourism (OTDC) certified boats at Satapada to avoid unauthorized operators",
            "Mangalajodi (Northern Chilika) is best accessed from Bhubaneswar (70 km), whereas Satapada is 50 km from Puri",
            "Carry binoculars, long zoom telephoto lenses, and eco-friendly sunscreen"
        ],
        "tags": [
            "Chilika Lake",
            "Dolphins",
            "Mangalajodi",
            "Birding",
            "Ramsar Wetland",
            "Lagoon"
        ],
        "bestSeason": "Nov – Feb (Peak Migratory Bird Season & Mild Breezes)",
        "localCuisine": "Chilika Crab Curry, Jumbo Prawn Masala, Fried Hilsa, Machha Besara, Chhena Poda",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 105 km from Satapada",
        "railConnectivity": "Balugaon Railway Station (BALU) - 2 km from Central Chilika / Puri Station (50 km from Satapada)"
    },
    {
        "id": 7005,
        "name": "Simlipal National Park & Barehipani Tiered Falls",
        "location": "Mayurbhanj District (Baripada), Odisha, India",
        "category": "Wildlife",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Mayurbhanj",
        "division": "Northern",
        "odCircuit": "Wildlife & Tiger Reserves",
        "odop": "Mayurbhanj Sabai Grass Crafts & Dokra",
        "rating": 4.86,
        "reviewsCount": 1820,
        "price": "$370/mo",
        "image": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "A UNESCO World Network of Biosphere Reserves, Simlipal encompasses 2,750 sq km of dense sal forests, rolling red soil hills, and the world's only population of rare pseudo-melanistic (black) tigers. It also houses Barehipani, India's second-highest two-tiered waterfall plunging 1,309 feet.",
        "highlights": [
            "Home to Rare Pseudo-Melanistic (Black) Royal Bengal Tigers",
            "Barehipani Two-Tiered Waterfall (1,309 ft Drop) & Joranda Cascades",
            "Dense Canopy of Moist Deciduous Sal & 94 Wild Orchid Species",
            "Tribal Santhal, Ho, and Mankidia Indigenous Culture"
        ],
        "activities": [
            "Embark on a guided 4x4 open-top safari from Pithabata or Jashipur entry gates",
            "Marvel at the thunderous roar of Barehipani Falls plunging over Meghasani mountain crags",
            "Stay in eco-tourism cottages at Chahala, Barehipani, or Jamuani managed by tribal communities",
            "Witness the vibrant martial folk dance of Mayurbhanj Chhau during evening tribal campfires",
            "Purchase intricately woven Sabai grass table mats, baskets, and tribal jewelry in Baripada"
        ],
        "travelTips": [
            "Park is open from November 1 to mid-June (closed during monsoons for wildlife breeding and river floods)",
            "Book entry permits and vehicle tokens on the official Odisha Eco-Tour portal well in advance",
            "Carry light woolen jackets as forest temperatures drop significantly at night inside the valley",
            "Nearest town base is Baripada (60 km) or Jashipur (30 km)"
        ],
        "tags": [
            "Tiger Reserve",
            "Simlipal",
            "Barehipani",
            "Biosphere",
            "Black Tigers",
            "Orchids"
        ],
        "bestSeason": "Nov – Apr (Pleasant Dry Weather & Optimal Safari Visibility)",
        "localCuisine": "Mudhi Mansha (Puffed Rice with Mutton Curry), Dalma, Chhena Mudki, Mahua Drink",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 270 km / Netaji Subhash Airport (CCU), Kolkata - 240 km",
        "railConnectivity": "Balasore Railway Station (BLS) - 60 km / Baripada Railway Station (BPO) - 50 km"
    },
    {
        "id": 7006,
        "name": "Bhitarkanika Mangroves & Gahirmatha Turtle Sanctuary",
        "location": "Kendrapara District, Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Kendrapara",
        "division": "Central",
        "odCircuit": "Coastal & Wetland Sanctuary",
        "odop": "Kendrapara Golden Grass Crafts & Rasabali",
        "rating": 4.89,
        "reviewsCount": 1640,
        "price": "$350/mo",
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "India's second largest mangrove ecosystem after the Sundarbans, Bhitarkanika is a Ramsar wetland harboring over 1,700 gigantic saltwater crocodiles (including 20-foot specimens) and 8 kingfisher species. Adjacent Gahirmatha is the world's largest rookery for mass nesting (Arribada) of Olive Ridley sea turtles.",
        "highlights": [
            "Largest Population of Giant Estuarine Saltwater Crocodiles in India",
            "Gahirmatha Marine Sanctuary: World's Biggest Olive Ridley Turtle Rookery",
            "Dense Deltaic Mangrove Creeks with 62 Mangrove Floral Species",
            "Ancient 9th-Century Dangamal Forest Hunting Lodge Ruins"
        ],
        "activities": [
            "Take a silence-engine boat safari through narrow mangrove creeks from Khola or Gupti gate",
            "Spot massive sunbathing saltwater crocodiles resting on muddy banks along the Suvarna river",
            "Witness the nocturnal mass nesting (Arribada) of hundreds of thousands of Olive Ridley turtles (Jan-Mar)",
            "Walk the Dangamal nature trail through ancient king's palace ruins and bird heronries",
            "Indulge in authentic Kendrapara Rasabali, Odisha's celebrated GI-certified deep-fried cottage cheese dessert"
        ],
        "travelTips": [
            "Turtle nesting sightings at Gahirmatha depend strictly on tides and lunar cycles between January and March",
            "Entry permits must be obtained at Khola or Gupti check gates with valid government photo ID",
            "Do not lean outside boat railings as estuarine crocodiles are aggressive apex predators",
            "Night stay in Dangamal eco-cottages provides front-row views of glowing bioluminescence in creeks"
        ],
        "tags": [
            "Mangroves",
            "Saltwater Crocodiles",
            "Olive Ridley Turtles",
            "Bhitarkanika",
            "Ramsar",
            "Wildlife"
        ],
        "bestSeason": "Oct – Mar (Mild Temperatures & Optimal Wildlife Sightings)",
        "localCuisine": "Kendrapara Rasabali (GI Tagged), Prawn Malai Curry, Steamed Hilsa, Badi Chura",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 130 km",
        "railConnectivity": "Bhadrak Railway Station (BHK) - 70 km / Cuttack Railway Station (CTC) - 110 km"
    },
    {
        "id": 7007,
        "name": "Raghurajpur Heritage Crafts Village & Pipili Applique Town",
        "location": "Puri District, Odisha, India",
        "category": "Tribal & Culture",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Puri",
        "division": "Central",
        "odCircuit": "Heritage Crafts & Handlooms",
        "odop": "Raghurajpur Pattachitra & Pipili Chandua Applique",
        "rating": 4.93,
        "reviewsCount": 2150,
        "price": "$340/mo",
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "A living open-air museum, Raghurajpur is an artisan village where every single household practices traditional Pattachitra cloth painting, palm leaf engraving (Talapatra Chitra), cow dung toys, and wooden masks. It is also the birthplace of legendary Gotipua dance and Guru Kelucharan Mohapatra.",
        "highlights": [
            "Living Heritage Village: 100% Artisan Guild Households",
            "Master Pattachitra Natural Mineral & Vegetable Pigment Painting",
            "Birthplace of Gotipua Classical Dance & Legend Kelucharan Mohapatra",
            "Pipili Vibrant Chandua Applique Canopy & Lantern Street Bazaars"
        ],
        "activities": [
            "Sit with master Chitrakaras on their painted verandas and learn natural stone pigment mixing",
            "Procure certified Pattachitra scrolls and palm leaf etching bookmarks directly from the artists",
            "Watch young boy acolytes perform the acrobatic Gotipua dance to mardala rhythms",
            "Walk down Pipili's main street illuminated by vibrant cloth umbrellas, lanterns, and wall hangings",
            "Taste freshly fried sweet Chenna Jhili in nearby Nimapada on the drive from Bhubaneswar"
        ],
        "travelTips": [
            "Spend at least 3-4 hours chatting with artisans across both streets of the village",
            "Bargain respectfully; these masterworks take weeks of tedious needle-work and fine natural brush strokes",
            "Raghurajpur is located just 14 km from Puri and 50 km from Bhubaneswar along NH 316",
            "Photography of artisans at work is welcome, but always ask permission before taking close portraits"
        ],
        "tags": [
            "Pattachitra",
            "Heritage Village",
            "Raghurajpur",
            "Pipili",
            "Gotipua",
            "Artisan Guild"
        ],
        "bestSeason": "Sep – Mar (Cool Dry Breezes & Active Artisan Workshops)",
        "localCuisine": "Nimapada Chenna Jhili, Khaja, Pakhala with Badi, Dalma, Chaula Kheeri",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 52 km",
        "railConnectivity": "Puri Railway Station (PURI) - 14 km / Sakshigopal Railway Station - 8 km"
    },
    {
        "id": 7008,
        "name": "Daringbadi: The Kashmir of Odisha & Pine Valleys",
        "location": "Kandhamal District, Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Kandhamal",
        "division": "Southern",
        "odCircuit": "Eastern Ghats & Hill Stations",
        "odop": "Kandhamal Haldi (GI Turmeric) & Organic Coffee",
        "rating": 4.87,
        "reviewsCount": 1780,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Perched at an elevation of 3,000 feet in the Eastern Ghats, Daringbadi is known as the \"Kashmir of Odisha\" and is the only location in the state that occasionally experiences winter sub-zero dew frost. It is surrounded by lush organic coffee estates, pine forests, and quiet tribal settlements.",
        "highlights": [
            "Sub-Zero Winter Dew Frost Phenomenon in Odisha's Coolest Hill Station",
            "Aromatic Pine Forests, Pepper Vines & Organic Coffee Plantations",
            "Midubanda Waterfall (Dasingbadi) Cascading into Forest Pools",
            "Hilltop Sunset Viewpoint & Belghar Kutia Kondh Tribal Heartland"
        ],
        "activities": [
            "Stroll through quiet morning mist among towering pine trees at Pine Forest Viewpoint",
            "Tour aromatic organic coffee and black pepper plantations operated by the Soil Conservation department",
            "Hike down to the secluded Midubanda Waterfall surrounded by dense sal trees",
            "Taste freshly brewed local Kandhamal coffee and procure certified GI-tagged golden organic turmeric",
            "Camp under pristine star-filled dark skies at Hill View Park eco-retreats"
        ],
        "travelTips": [
            "Visit in December and January for morning frost and cozy winter bonfire weather",
            "Drive up via the scenic Kalinga Ghat road from Berhampur with sweeping valley hairpin turns",
            "Roads are well-paved; private taxi or own vehicle is recommended as local buses are infrequent",
            "Carry warm jackets and sweaters as nighttime temperatures drop below 5°C in mid-winter"
        ],
        "tags": [
            "Hill Station",
            "Daringbadi",
            "Kashmir of Odisha",
            "Coffee Estates",
            "Pine Forest",
            "Turmeric"
        ],
        "bestSeason": "Nov – Feb (Crisp Mountain Chill & Occasional Dew Frost)",
        "localCuisine": "Kandhamal Organic Turmeric Herbal Tea, Bamboo Shoot Mutton Curry, Pitha, Mandia Soup",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 250 km",
        "railConnectivity": "Brahmapur (Berhampur) Railway Station (BAM) - 120 km (Direct trains from all metros)"
    },
    {
        "id": 7009,
        "name": "Deomali Peak & Koraput Tribal Coffee Highlands",
        "location": "Koraput District (Pottangi), Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Koraput",
        "division": "Southern",
        "odCircuit": "Eastern Ghats & Hill Stations",
        "odop": "Koraput Arabica Coffee & Kotpad Organic Handloom",
        "rating": 4.91,
        "reviewsCount": 1590,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Rising to 5,486 feet (1,672 meters), Deomali is the highest mountain peak in the state of Odisha, commanding 360-degree views over rolling emerald Eastern Ghat ridges, floating cloud carpets, and deep tribal valleys. Koraput is celebrated globally as a UN FAO Globally Important Agricultural Heritage System (GIAHS).",
        "highlights": [
            "Highest Peak in Odisha (5,486 ft Elevation) with Floating Cloud Carpets",
            "UNESCO FAO Agricultural Heritage: Indigenous Indigenous Millets & Rice",
            "Koraput Arabica Coffee Valley Plantations",
            "Kotpad Tribal Vegetable-Dye Weaving & Weekly Tribal Haats"
        ],
        "activities": [
            "Trek to the summit ridge of Deomali Peak at dawn to witness the sea of clouds below the rising sun",
            "Sip single-origin Arabica espresso at the tribal-run Koraput Coffee Cafe",
            "Explore the tribal heritage museum and Jagannath Sabara Kshetra in Koraput town",
            "Visit the vibrant Sunday Kunduli weekly tribal market featuring Bonda and Paraja tribes",
            "Camp overnight at the eco-tourism cottages established near the Deomali base ridge"
        ],
        "travelTips": [
            "Sunrise trek starts early: reach the base parking by 5:30 AM for the best golden-hour panoramic photography",
            "The drive from Koraput town (60 km) via Semiliguda passes through scenic coffee gardens and terraced valleys",
            "Respect tribal photography etiquette at local haats; never take photos without polite permission",
            "Koraput is connected by the scenic Vistadome coach train from Visakhapatnam across the Araku valley"
        ],
        "tags": [
            "Highest Peak",
            "Deomali",
            "Koraput",
            "Arabica Coffee",
            "Eastern Ghats",
            "Trekking"
        ],
        "bestSeason": "Sep – Mar (Crisp Mountain Vistas & Floating Cloud Inversions)",
        "localCuisine": "Koraput Single-Origin Coffee, Mandia Jau (Millet Porridge), Bamboo Shoot Curry, Chhena Poda",
        "nearestAirport": "Visakhapatnam International Airport (VTZ) - 170 km / Jeypore Airport (PYB) - 65 km",
        "railConnectivity": "Koraput Junction (KRPU) - 60 km / Damanjodi Railway Station - 35 km"
    },
    {
        "id": 7010,
        "name": "Chandipur Beach & Receding Sea Phenomenon",
        "location": "Balasore District, Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Balasore",
        "division": "Northern",
        "odCircuit": "Coastal & Wetland Sanctuary",
        "odop": "Balasore Lacquer Crafts & Seafood",
        "rating": 4.82,
        "reviewsCount": 1470,
        "price": "$340/mo",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "A unique geological wonder, Chandipur Beach is famous for its \"vanishing sea\" phenomenon where the ocean tide recedes up to 5 kilometers twice every day during low tide, allowing visitors to walk or drive onto the exposed sea bed among red ghost crabs and horseshoe crabs.",
        "highlights": [
            "World-Famous Vanishing Sea: Ocean Recedes up to 5 km at Low Tide",
            "Walk Directly on the Exposed Sea Bed among Horseshoe Crabs",
            "Proximity to DRDO Integrated Test Range (Missile Launch Pad on Abdul Kalam Island)",
            "Tranquil Pine & Casuarina Coastal Fringe"
        ],
        "activities": [
            "Walk kilometers into the dry ocean bed during low tide and observe rare marine horseshoe crabs",
            "Ride a beach bicycle along the hard compact wet sands as the waves recede into the horizon",
            "Watch the dramatic tidal return as the ocean rushes back to the shore in a rhythmic surge",
            "Feast on freshly caught and shallow-fried pomfret, prawns, and crabs at beachside shacks",
            "Visit the 12th-century Khirachora Gopinath Temple in nearby Remuna to taste the famous sweet condensed milk pot"
        ],
        "travelTips": [
            "Check local tide tables before planning your walk so you know exact low-tide and high-tide hours",
            "Never venture too far into the sea bed near high tide; the water returns quickly and silently",
            "Remuna is only 20 km away; do not miss tasting the Khirachora Gopinatha Amruta Keli (condensed milk)",
            "Direct express trains stop at Balasore station (16 km) from Howrah, Bhubaneswar, and Chennai"
        ],
        "tags": [
            "Receding Sea",
            "Chandipur",
            "Balasore",
            "Ghost Crabs",
            "Coastal",
            "Geological Wonder"
        ],
        "bestSeason": "Oct – Mar (Gentle Ocean Breezes & Clear Low-Tide Skies)",
        "localCuisine": "Remuna Khira Keli, Fresh Coastal Crab Masala, Fried Pomfret, Dalma, Pakhala",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 210 km / Netaji Subhash Airport (CCU), Kolkata - 240 km",
        "railConnectivity": "Balasore Railway Station (BLS) - 16 km (Major mainline stop on Howrah-Chennai corridor)"
    },
    {
        "id": 7011,
        "name": "Sambalpur, Hirakud Dam & Samaleswari Peeth",
        "location": "Sambalpur District, Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Sambalpur",
        "division": "Northern",
        "odCircuit": "Heritage Crafts & Handlooms",
        "odop": "Sambalpuri Ikat (Bandha) Handloom Weaving",
        "rating": 4.85,
        "reviewsCount": 1690,
        "price": "$350/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Western Odisha's cultural heart, Sambalpur is renowned for the world's longest earthen dam (Hirakud Dam stretching 25.8 km across the mighty Mahanadi River), the ancient 16th-century Maa Samaleswari Shaktipeeth, and world-renowned Sambalpuri Ikat tie-and-dye handloom textiles.",
        "highlights": [
            "Hirakud Dam: World's Longest Earthen Dam (25.8 km Long) on Mahanadi",
            "Maa Samaleswari 16th-Century Revered Shaktipeeth & Heritage Complex",
            "World-Famous Sambalpuri Ikat (Bandha) Silk & Cotton Weaving Centers",
            "Gandhi Minar & Nehru Minar Panoramic Watchtowers over Hirakud Reservoir"
        ],
        "activities": [
            "Take the revolving watchtower elevator atop Gandhi Minar for breathtaking views of the vast Hirakud inland sea",
            "Take a peaceful boat cruise on the Mahanadi River and visit the submerged ancient temples during low water",
            "Procure master-woven Sambalpuri Ikat sarees directly from weaver cooperatives in Bargarh and Sambalpur",
            "Pay homage at the renovated Maa Samaleswari Temple corridor along the Mahanadi riverbank",
            "Experience vibrant Sambalpuri folk music and Dalkhai dance during Nuakhai harvest festival"
        ],
        "travelTips": [
            "Nuakhai (August/September) is the grandest harvest festival with vibrant cultural music and processions",
            "Hirakud Dam gates are spectacular to watch during monsoon discharges (July–September)",
            "Visit the Sambalpur Handloom Weaver Village in nearby Barpali to see the meticulous tie-and-dye process",
            "Connected by express trains including Vande Bharat from Bhubaneswar, Rourkela, and Raipur"
        ],
        "tags": [
            "Hirakud",
            "Sambalpur",
            "Mahanadi",
            "Sambalpuri Ikat",
            "Samaleswari",
            "Dam"
        ],
        "bestSeason": "Oct – Mar (Pleasant Lake Breezes & Ideal Sightseeing Weather)",
        "localCuisine": "Sarsatia Sweet, Chaul Bara with Spicy Chutney, Pakhala with Badi, Dalma, Mahul Pitha",
        "nearestAirport": "Veer Surendra Sai Airport (JRG), Jharsuguda - 55 km / BBI Airport Bhubaneswar - 280 km",
        "railConnectivity": "Sambalpur Junction (SBP) - 3 km (Connected by Vande Bharat, Intercity, and Rajdhani)"
    },
    {
        "id": 7012,
        "name": "Satkosia Tiger Reserve & Mahanadi River Gorge",
        "location": "Angul & Nayagarh & Boudh Districts, Odisha, India",
        "category": "Wildlife",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Angul",
        "division": "Northern",
        "odCircuit": "Wildlife & Tiger Reserves",
        "odop": "Angul Wooden Crafts & Forest Honey",
        "rating": 4.88,
        "reviewsCount": 1390,
        "price": "$340/mo",
        "image": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Where the mighty Mahanadi River cuts through the Eastern Ghats in a stunning 22-kilometer-long gorge, Satkosia Tiger Reserve is a sanctuary of biodiversity. Known for its population of endangered gharials, mugger crocodiles, and giant elephants, it offers premier riverbank tented eco-camping.",
        "highlights": [
            "22 km Breathtaking Mahanadi River Canyon & Gorge Landscape",
            "Breeding Sanctuary for Endangered Gharials & Mugger Crocodiles",
            "Satkosia Sands Resort: Glamping Tents on the River Shoreline",
            "Dense Canopy of Sal, Teak, and Wild Asian Elephants"
        ],
        "activities": [
            "Stay in luxury riverside glamping tents pitched directly on the white sandy beaches of the Mahanadi",
            "Take a guided morning boat safari along the deep gorge to spot gharials basking on sandbars",
            "Hike through the Tikarpada canopy nature trails with certified local forest protectors",
            "Stargaze beside a campfire on the river shore listening to nocturnal elephant calls",
            "Visit the Gharial Research and Conservation Center in Tikarpada"
        ],
        "travelTips": [
            "Satkosia Sands eco-camp at Badmul (Nayagarh side) is open October to May and is booked via Eco-Tour Odisha portal",
            "Tikarpada (Angul side) is accessed via Angul town (60 km), while Badmul is reached via Nayagarh (100 km from Bhubaneswar)",
            "Swimming in the gorge is strictly prohibited due to strong underwater currents and crocodile populations",
            "Carry insect repellent and warm nightwear for the open river sandbars"
        ],
        "tags": [
            "Satkosia",
            "Gorge",
            "Mahanadi",
            "Gharials",
            "River Camping",
            "Tiger Reserve"
        ],
        "bestSeason": "Nov – Mar (Cool Dry River Basking Weather & Sandbar Camping)",
        "localCuisine": "Mahanadi Fresh River Fish Fry, Dalma, Roasted Badi, Pakhala Bhata, Chenna Poda",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 110 km from Badmul gate",
        "railConnectivity": "Angul Railway Station (ANGL) - 60 km / Nayagarh Town Station - 45 km"
    },
    {
        "id": 7013,
        "name": "Ratnagiri, Udayagiri & Lalitgiri: Diamond Triangle",
        "location": "Jajpur & Cuttack Districts, Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Jajpur",
        "division": "Central",
        "odCircuit": "Diamond Triangle Buddhist Circuit",
        "odop": "Jajpur Stone Carvings & Tussar Silk",
        "rating": 4.89,
        "reviewsCount": 1420,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Known as the \"Diamond Triangle\" of Vajrayana Buddhism, Ratnagiri, Udayagiri, and Lalitgiri comprise one of the world's most significant Buddhist archaeological complexes. Ratnagiri's elaborately carved green chlorite monastery portal, colossal Buddha heads, and thousands of votive stupas rival Nalanda.",
        "highlights": [
            "Magnificent 8th-Century Monastic Carved Chlorite Doorway at Ratnagiri",
            "Casket with Sacred Relics of Lord Buddha Unearthed at Lalitgiri",
            "Colossal 12-Foot Dhyani Buddha Sculptures at Udayagiri Stepwell",
            "Vajrayana & Mahayana Monasteries Rivaling Ancient Nalanda"
        ],
        "activities": [
            "Photograph the world-famous ornate green chlorite portal leading into Monastery 1 at Ratnagiri",
            "Visit the modern on-site ASI Archaeological Museum displaying exquisite Tantric Buddhist bronzes",
            "Explore the ancient stepwell and monastic complexes nestled on the slopes of Udayagiri hill",
            "View the oldest stupa and relic casket display atop the sandstone ridge of Lalitgiri",
            "Pay homage at the sacred Biraja Devi Shaktipeeth in historic Jajpur town"
        ],
        "travelTips": [
            "All three sites are located within a 15-20 km radius and can easily be covered in a full-day excursion",
            "Best accessed as a day trip from Cuttack (65 km) or Bhubaneswar (90 km) via NH 16",
            "Hire a local heritage guide at Ratnagiri to understand the symbolism of the Buddhist stone panels",
            "ASI museums are open daily except Fridays from 9:00 AM to 5:00 PM"
        ],
        "tags": [
            "Diamond Triangle",
            "Buddhist",
            "Ratnagiri",
            "Lalitgiri",
            "Udayagiri",
            "Archaeology"
        ],
        "bestSeason": "Oct – Mar (Pleasant Dry Weather for Exploring Open-Air Ruins)",
        "localCuisine": "Jajpur Biraja Chhena Gaja, Dalma with Steamed Rice, Pakhala, Chenna Poda",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 95 km",
        "railConnectivity": "Jajpur Keonjhar Road Station (JJKR) - 40 km / Cuttack Station (CTC) - 65 km"
    },
    {
        "id": 7014,
        "name": "Cuttack: Silver City, Barabati Fort & Mahanadi Bank",
        "location": "Cuttack District, Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Cuttack",
        "division": "Central",
        "odCircuit": "Heritage Crafts & Handlooms",
        "odop": "Cuttack Tarakasi (Silver Filigree) & Horn Crafts",
        "rating": 4.86,
        "reviewsCount": 2180,
        "price": "$380/mo",
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Established over a thousand years ago at the bifurcation of the Mahanadi and Kathajodi rivers, Cuttack is celebrated worldwide as the \"Silver City\" for its centuries-old Tarakasi fine silver filigree. It is also famous for the historic 14th-century Barabati Fort and the world's largest open-air maritime trade fair, Bali Jatra.",
        "highlights": [
            "Centuries-Old GI-Certified Tarakasi (Silver Filigree) Artisan Workshops",
            "Historic 14th-Century Barabati Fort Gateway & Moat Remains",
            "Bali Jatra: World's Largest Open-Air Trade Fair on the Mahanadi Riverbed",
            "Birthplace of Netaji Subhash Chandra Bose & National Museum"
        ],
        "activities": [
            "Watch master silver filigree craftsmen twist silver wires thinner than hair in Nayasarak workshops",
            "Visit the ancestral Janakinath Bhawan, birthplace of Netaji Subhash Chandra Bose",
            "Walk along the scenic Kathajodi river embankment promenade and Barabati stadium grounds",
            "Savor Cuttack's legendary street food trio: Dahibara Aloodum, Guguni, and Sev",
            "Explore Bali Jatra on the riverbank in November, commemorating ancient sailors' trade voyages to Bali and Java"
        ],
        "travelTips": [
            "Must taste: Famous Dahibara Aloodum at Bidanasi or Stadium circle; drink the spiced yogurt water (Dahi Pani)",
            "Buy certified hallmarked Tarakasi filigree ornaments and Konark wheel souvenirs at government emporiums",
            "Cuttack is just 25 km from Bhubaneswar, connected by a 30-minute expressway drive or local train",
            "Bali Jatra festival takes place on Kartika Purnima (November) for eight festive days"
        ],
        "tags": [
            "Silver City",
            "Cuttack",
            "Tarakasi",
            "Barabati",
            "Bali Jatra",
            "Dahibara Aloodum"
        ],
        "bestSeason": "Oct – Mar (Pleasant Breezes & Grand Bali Jatra Festival)",
        "localCuisine": "Cuttack Dahibara Aloodum with Dahi Pani, Rasabali, Chenna Mudki, Guguni, Pakhala",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 30 km",
        "railConnectivity": "Cuttack Junction (CTC) - 2 km (Major Eastern Railway Gateway)"
    },
    {
        "id": 7015,
        "name": "Gopalpur-on-Sea & Tampara Lake Water Sports",
        "location": "Ganjam District (Berhampur), Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Ganjam",
        "division": "Southern",
        "odCircuit": "Coastal & Wetland Sanctuary",
        "odop": "Berhampur Patta Silk Sarees & Ganjam Kewda",
        "rating": 4.87,
        "reviewsCount": 1840,
        "price": "$360/mo",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Once a bustling maritime seaport during the British and Kalinga eras, Gopalpur-on-Sea is now one of the east coast's most peaceful beach retreats, dotted with colonial ruins and an active lighthouse. Nearby Tampara Lake is an expansive freshwater lagoon hosting jet skiing, kayaking, and eco-resorts.",
        "highlights": [
            "Historic Colonial Port Beach & 19th-Century Gopalpur Lighthouse",
            "Tampara Lake Water Sports Hub: Jet Skiing, Kayaking & Speedboats",
            "Golden Sandy Coastline with Calm Ocean Swimming Waves",
            "Proximity to Berhampur \"Silk City\" & GI-Certified Berhampuri Patta"
        ],
        "activities": [
            "Climb to the lantern room of the Gopalpur Lighthouse for sweeping vistas of the Bay of Bengal coastline",
            "Engage in water sports (jet skiing, kayaking, banana boat rides) at Tampara Lake",
            "Stroll along the historic beach promenade at sunrise and watch fishermen launch wooden catamarans",
            "Purchase exquisite GI-tagged Berhampur Phoda Kumbha Patta silk sarees directly from weavers",
            "Taste freshly fried seafood and famous Ganjam roasted papads at evening beach food stalls"
        ],
        "travelTips": [
            "Lighthouse visiting hours are strictly 3:30 PM to 5:30 PM daily",
            "Tampara Lake is 20 km from Gopalpur along the highway; budget 2-3 hours for lake sports",
            "Berhampur (15 km away) is the primary rail gateway connected directly to Chennai, Kolkata, and Bangalore",
            "Gopalpur is much quieter and less crowded than Puri beach, ideal for peaceful creative retreats"
        ],
        "tags": [
            "Beach",
            "Gopalpur",
            "Tampara Lake",
            "Water Sports",
            "Lighthouse",
            "Silk City"
        ],
        "bestSeason": "Oct – Mar (Refreshing Coastal Sea Breezes & Warm Sun)",
        "localCuisine": "Ganjam Achara & Papad, Fresh Prawn Curry, Crab Masala, Chhena Poda, Berhampur Achaar",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 165 km",
        "railConnectivity": "Brahmapur (Berhampur) Railway Station (BAM) - 15 km"
    },
    {
        "id": 7016,
        "name": "Khandadhar Waterfall & Sundargarh Forest Canyons",
        "location": "Sundargarh District, Odisha, India",
        "category": "Waterfalls",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Sundargarh",
        "division": "Northern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Sundargarh Terracotta & Iron Crafts",
        "rating": 4.84,
        "reviewsCount": 1280,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Plunging 801 feet (244 meters) down a sheer rock precipice in a single uninterrupted ribbon resembling the blade of a sword (\"Khanda\"), Khandadhar is the second highest waterfall in Odisha. It is surrounded by pristine virgin forests inhabited by the indigenous Paudi Bhuyan tribes.",
        "highlights": [
            "Majestic 801-Foot Single Uninterrupted Sword-Blade Plunge",
            "Dense Sal Forest Canopy of the Chelliatoka Wildlife Range",
            "Scenic Nature Trekking Pathways to the Roaring Plunge Pool",
            "Paudi Bhuyan Indigenous Tribal Culture & Lore"
        ],
        "activities": [
            "Hike down the stone steps through dense forest canopies to feel the refreshing spray at the fall base",
            "Photograph the ethereal rainbow arc formed constantly in the spray mist under afternoon sunshine",
            "Explore the scenic drive from Rourkela passing through iron ore mountains and river valleys",
            "Camp at the newly developed Khandadhar Eco-Tourism Cottages operated by the forest division",
            "Visit the modern steel city of Rourkela and explore the sprawling Indira Gandhi Park"
        ],
        "travelTips": [
            "Visit post-monsoon from October to February for roaring water cascades and crystal-clear skies",
            "Wear slip-resistant trekking shoes as the steps and rocks near the base are constantly damp from mist",
            "Located 68 km from Rourkela and 100 km from Sundargarh town; private vehicle is recommended",
            "Carry snacks and drinking water as options at the waterfall base are limited to small tea stalls"
        ],
        "tags": [
            "Waterfall",
            "Khandadhar",
            "Sundargarh",
            "Rourkela",
            "Nature",
            "Trekking"
        ],
        "bestSeason": "Oct – Feb (Spectacular Water Cascades & Green Forest Trails)",
        "localCuisine": "Sundargarh Forest Honey, Bamboo Shoot Curry, Chaul Bara, Dalma, Pakhala",
        "nearestAirport": "Rourkela Airport (RRK) - 68 km / Veer Surendra Sai Airport (JRG), Jharsuguda - 110 km",
        "railConnectivity": "Rourkela Junction (ROU) - 68 km (Major Howrah-Mumbai Mainline Stop)"
    },
    {
        "id": 7017,
        "name": "Maa Taratarini Shaktipeeth & Rushikulya River",
        "location": "Ganjam District (Purushottampur), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Ganjam",
        "division": "Southern",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Ganjam Brass Bell Metal & Pata Sarees",
        "rating": 4.88,
        "reviewsCount": 1920,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Perched dramatically atop the 708-foot Purnagiri hill on the bank of the sacred Rushikulya river, Maa Taratarini is one of the four ancient Adi Shaktipeeths of India, worshipped as the twin manifestations of Sthana Peetha. The hilltop offers 360-degree vistas accessed via a modern ropeway and 999 stone steps.",
        "highlights": [
            "One of India's Four Revered Adi Shaktipeeths (Breast Shrine of Goddess Sati)",
            "Hilltop Temple at 708 ft Overlooking Rushikulya River & Paddy Valleys",
            "Scenic Passenger Ropeway & 999 Holy Stone Pilgrimage Steps",
            "Rushikulya River Mouth (Famous Secondary Mass Nesting Site for Olive Ridley Turtles)"
        ],
        "activities": [
            "Glide up the Purnagiri hill via the passenger cable-car ropeway for scenic views of the Rushikulya valley",
            "Partake in the sacred Chaitra Yatra festival rituals and seek blessings at the sanctum sanctorum",
            "Climb down the ancient 999 stone steps surrounded by lush hillside greenery and wild peacocks",
            "Drive to the nearby Rushikulya sea mouth to observe mass turtle hatchlings returning to the sea",
            "Taste the temple's consecrated Khichdi and Dalma Mahaprasad"
        ],
        "travelTips": [
            "Ropeway operates daily from 8:00 AM to 5:30 PM; round-trip tickets are easily purchased on-site",
            "Chaitra Mela (Tuesday of Chaitra month in March/April) sees over 500,000 devotees",
            "Located 32 km from Berhampur and 140 km from Bhubaneswar along well-maintained highways",
            "Respect the temple customs; traditional Indian clothing is recommended"
        ],
        "tags": [
            "Adi Shaktipeeth",
            "Taratarini",
            "Ropeway",
            "Ganjam",
            "Rushikulya",
            "Spiritual"
        ],
        "bestSeason": "Oct – Mar (Pleasant Hilltop Breezes & Chaitra Celebrations)",
        "localCuisine": "Temple Bhoga Khichdi, Dalma, Chenna Poda, Berhampur Papad, Rasabali",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 145 km",
        "railConnectivity": "Brahmapur Railway Station (BAM) - 32 km"
    },
    {
        "id": 7018,
        "name": "Jiranga: Padmasambhava Mahavihara Buddhist Monastery",
        "location": "Gajapati District (Chandragiri), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Gajapati",
        "division": "Southern",
        "odCircuit": "Eastern Ghats & Hill Stations",
        "odop": "Gajapati Horn Crafts & Tibetan Wool Carpets",
        "rating": 4.9,
        "reviewsCount": 1610,
        "price": "$320/mo",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Inaugurated by the Dalai Lama in 2010, the Padmasambhava Mahavihara at Jiranga (Chandragiri) is South Asia's largest Buddhist monastery, rising five stories amidst the misty hills of Gajapati district. It serves as the spiritual heart of the peaceful Tibetan refugee community settled here since 1963.",
        "highlights": [
            "Largest Buddhist Monastery in Eastern India (Five Stories High)",
            "Awe-Inspiring 23-Foot Gilded Bronze Lord Buddha Sanctum Statue",
            "Vibrant Tibetan Refugee Settlement with Wool Weaving Guilds",
            "Surrounded by Lush Organic Maize Farms, Apple Orchards & Waterfalls"
        ],
        "activities": [
            "Listen to monk chants and deep copper horn reverberations during morning assembly prayers",
            "Marvel at the intricate Tibetan thangka murals and ceiling mandalas in the main meditation hall",
            "Visit the local Tibetan cooperative handicraft society to purchase hand-knotted wool rugs and stoles",
            "Taste authentic Tibetan steamed momos, thukpa, and salted butter tea at local village cafes",
            "Visit nearby Khasada and Gandahati waterfalls nestled in the virgin Eastern Ghats"
        ],
        "travelTips": [
            "Remove shoes before stepping into the main sanctum; maintain silence during prayers",
            "Photography of the grand Buddha statue is permitted, but turn off flash and silence phones",
            "Located 80 km from Berhampur and 250 km from Bhubaneswar; best combined with Taptapani hot springs",
            "Tibetan Losar (New Year in February/March) features colorful Cham mask dances"
        ],
        "tags": [
            "Tibetan Monastery",
            "Jiranga",
            "Chandragiri",
            "Dalai Lama",
            "Gajapati",
            "Buddhism"
        ],
        "bestSeason": "Oct – Mar (Pleasant Hill Mist & Serene Monastic Atmosphere)",
        "localCuisine": "Tibetan Steamed Momos, Thukpa Noodle Soup, Butter Tea, Tingmo Bread, Chhena Poda",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 250 km / Visakhapatnam (VTZ) - 230 km",
        "railConnectivity": "Brahmapur Railway Station (BAM) - 80 km / Paralakhemundi Station - 60 km"
    },
    {
        "id": 7019,
        "name": "Bargarh: Nrusinghanath Temple & Dhanu Jatra",
        "location": "Bargarh District (Paikmal), Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Bargarh",
        "division": "Northern",
        "odCircuit": "Heritage Crafts & Handlooms",
        "odop": "Bargarh Sambalpuri Weaving & Brass Metal",
        "rating": 4.85,
        "reviewsCount": 1340,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Nestled on the northern foothills of the medicinal Gandhamardan Hills, the 14th-century Nrusinghanath Temple is dedicated to Lord Vishnu in the unique feline form of Marjara Keshari. Bargarh is also world-renowned for hosting Dhanu Jatra, recorded in Guinness World Records as the world's largest open-air theatrical festival.",
        "highlights": [
            "14th-Century Kalinga Temple of Lord Nrusingha as Marjara Keshari (Cat Form)",
            "Medicinal Gandhamardan Hills (Associated with Sanjeevani Booti in Ramayana)",
            "Dhanu Jatra: World's Largest Open-Air Theater Spanning an Entire City",
            "Papaharini Sacred Waterfall Stream Flowing through Temple Shrines"
        ],
        "activities": [
            "Trek along the Papaharini stream through scenic mountain gorges of the Gandhamardan hills",
            "Cross over the 16 km Gandhamardan ridge trail to visit Harishankar Temple on the Balangir side",
            "Experience Dhanu Jatra in December/January where Bargarh town transforms into mythical Mathura",
            "Visit master Ikat weavers in Barpali who craft Sambalpuri bandha sarees with natural motifs",
            "Procure authentic wild forest honey and herbal medicines cultivated by local Vana Suraksha Samitis"
        ],
        "travelTips": [
            "The 16 km trek from Nrusinghanath to Harishankar across Gandhamardan hill is a premier hiking route",
            "Dhanu Jatra takes place annually in December/January; during this time King Kansa rules the town",
            "Nearest major railhead is Bargarh Road (100 km) or Nuapada (60 km)",
            "Wear sturdy shoes as the stone pathways near the stream are naturally wet and mossy"
        ],
        "tags": [
            "Nrusinghanath",
            "Dhanu Jatra",
            "Gandhamardan",
            "Bargarh",
            "Heritage",
            "Sambalpuri"
        ],
        "bestSeason": "Oct – Feb (Pleasant Mountain Breezes & Dhanu Jatra Festival)",
        "localCuisine": "Chaul Bara with Spicy Tomato Tamarind Chutney, Bargarh Khaja, Dalma, Pakhala",
        "nearestAirport": "Veer Surendra Sai Airport (JRG), Jharsuguda - 140 km / Raipur Airport (RPR) - 180 km",
        "railConnectivity": "Bargarh Road Railway Station (BRGA) - 100 km / Khariar Road (65 km)"
    },
    {
        "id": 7020,
        "name": "Balangir: Harishankar Temple & Patneswari Shrine",
        "location": "Balangir District (Khaprakhol), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Balangir",
        "division": "Northern",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Balangir Cotton Ikat Handlooms & Bell Metal",
        "rating": 4.83,
        "reviewsCount": 1210,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Perched on the southern slopes of the mythical Gandhamardan mountain, Harishankar is a rare sanctuary where Lord Vishnu (Hari) and Lord Shiva (Shankar) are worshipped together as one deity beside a perennial cascading mountain brook. The location is steeped in Ayurvedic botanical heritage.",
        "highlights": [
            "Rare Dual Deity Sanctum: Lord Hari (Vishnu) & Lord Shankar (Shiva) Co-Worshipped",
            "Perennial Mountain Cascade Flowing Direct into Temple Stone Basins",
            "Rich Botanical Sanctuary with Over 500 Rare Ayurvedic Medicinal Herbs",
            "Historical Patnagarh 12th-Century Somavamsi Temples"
        ],
        "activities": [
            "Take a holy dip in the natural cool mountain stream cascading down stone steps beside the temple",
            "Hike into the Gandhamardan medicinal herbal valley guided by traditional tribal Vaidyas",
            "Visit the 12th-century Kosaleswara and Patneswari temples in historic Patnagarh",
            "Browse hand-woven Balangir Bomkai and Sambalpuri cotton sarees in nearby weaving clusters",
            "Camp at the Harishankar Forest Department eco-cottages nestled amidst teak canopies"
        ],
        "travelTips": [
            "Harishankar is best accessed via Balangir town (80 km) or Harishankar Road station (32 km)",
            "Combine with Nrusinghanath by either driving around the hill (120 km) or trekking over the ridge (16 km)",
            "Stream rocks can be slippery; step carefully on wet granite boulders",
            "Mahashivratri and Baisakhi Mela see colorful spiritual gatherings"
        ],
        "tags": [
            "Harishankar",
            "Gandhamardan",
            "Balangir",
            "Hari-Hara",
            "Herbal Sanctuary",
            "Medicinal"
        ],
        "bestSeason": "Oct – Mar (Crisp Mountain Stream & Pleasant Winter Sun)",
        "localCuisine": "Balangir Chaul Bara, Arisa Pitha, Dalma, Mahul Halwa, Pakhala",
        "nearestAirport": "Raipur Airport (RPR) - 210 km / Jharsuguda Airport (JRG) - 180 km",
        "railConnectivity": "Harishankar Road Station (HSK) - 32 km / Balangir Junction (BLGR) - 80 km"
    },
    {
        "id": 7021,
        "name": "Keonjhar: Gonasika & Sanaghagara Waterfalls",
        "location": "Keonjhar District, Odisha, India",
        "category": "Waterfalls",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Keonjhar",
        "division": "Northern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Keonjhar Stone Carvings & Badi Making",
        "rating": 4.84,
        "reviewsCount": 1310,
        "price": "$320/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Endowed with mineral-rich rolling highlands and lush green sal forests, Keonjhar is the sacred birthplace of the holy Baitarani river at Gonasika. The district is celebrated for scenic waterfall retreats like Sanaghagara, Badaghagara, and Khandadhar (North), alongside indigenous Juang and Bhuyan tribal lore.",
        "highlights": [
            "Gonasika: Holy Source of River Baitarani Emergent from Cow-Nose Rock",
            "Sanaghagara & Badaghagara Picturesque Stepped Waterfall Gorges",
            "Ancient Brahmeswar Shiva Temple Amidst Dense Forest Ridges",
            "Renowned Keonjhar Sun-Dried Phula Badi (GI Culinary Craft)"
        ],
        "activities": [
            "Picnic beside the tranquil forested pool of Sanaghagara Waterfall just 5 km from Keonjhar town",
            "Trek up the Baitarani canyon to view the mysterious underground stream re-emergence at Gonasika",
            "Purchase certified Keonjhar Phula Badi (crispy floral sun-dried lentil dumplings made with urad dal)",
            "Visit the Tarini Temple at Ghatgaon, one of Odisha's most popular wish-granting roadside shrines",
            "Explore Juang tribal villages to witness traditional wood and bamboo handicraft techniques"
        ],
        "travelTips": [
            "Ghatgaon Tarini Temple is on the Bhubaneswar-Keonjhar highway (40 km before Keonjhar)",
            "Sanaghagara has a well-developed eco-park with boating and children's amusement facilities",
            "Best visited between September and March when waterfalls have abundant clear water flow",
            "Connected directly by train and luxury AC buses from Bhubaneswar and Cuttack (220 km)"
        ],
        "tags": [
            "Keonjhar",
            "Waterfalls",
            "Gonasika",
            "Sanaghagara",
            "Phula Badi",
            "Baitarani"
        ],
        "bestSeason": "Oct – Feb (Pleasant Mountain Climate & Cascading Waterfalls)",
        "localCuisine": "Keonjhar Phula Badi Curry, Dalma, Pakhala Bhata, Chenna Poda, Rasabali",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 220 km",
        "railConnectivity": "Kendujhargarh Railway Station (KDJR) - 5 km (Direct trains from Bhubaneswar)"
    },
    {
        "id": 7022,
        "name": "Dhenkanal: Kapilash Mountain Temple & Saptasajya",
        "location": "Dhenkanal District, Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Dhenkanal",
        "division": "Northern",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Dhenkanal Brass Bell Metal & Dokra Crafts",
        "rating": 4.83,
        "reviewsCount": 1410,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Rising to an altitude of 2,239 feet, Kapilash is known as the \"Kailash of Odisha\", crowning a forested peak with the historic 13th-century Chandrashekhar Shiva Temple reached by 1,352 stone steps. Dhenkanal is also famous for the serene Saptasajya seven-hill forest retreat and the spiritual headquarters of Mahima Dharma at Joranda.",
        "highlights": [
            "13th-Century Chandrashekhar Temple Atop 2,239 ft Kapilash Peak",
            "Scenic 1,352 Holy Stone Pilgrimage Steps & 12-km Winding Ghat Road",
            "Saptasajya Seven-Hill Forest Sanctuary (Exile Shelter of the Pandavas)",
            "Joranda Gadi: Spiritual World Headquarters of Monotheistic Mahima Dharma"
        ],
        "activities": [
            "Climb the 1,352 stone steps to Kapilash temple enjoying cool mountain breezes and wild deer park views",
            "Drive to Saptasajya to relax beside natural spring brooks in the middle of thick canopy forests",
            "Visit the tranquil Joranda Mahima Gadi at sunset to observe monks performing ritual butter-lamp ceremonies",
            "Tour bell metal craft villages in nearby Sadeibereni practicing traditional lost-wax Dokra",
            "Taste freshly baked Dhenkanal Magji, a rich and spongy caramelized cottage cheese sweet"
        ],
        "travelTips": [
            "A motorable ghat road runs up to the Kapilash hilltop temple if unable to climb the stone steps",
            "Maha Shivratri at Kapilash attracts hundreds of thousands of pilgrims who climb the mountain with lamps",
            "Dhenkanal town is just 60 km from Cuttack and 85 km from Bhubaneswar along NH 55",
            "Magji sweet is a specialty of Dhenkanal town; buy authentic preparations from local sweet shops"
        ],
        "tags": [
            "Kapilash",
            "Dhenkanal",
            "Saptasajya",
            "Kailash of Odisha",
            "Mahima Dharma",
            "Spiritual"
        ],
        "bestSeason": "Oct – Mar (Pleasant Hilltop Weather & Winter Shivratri Celebrations)",
        "localCuisine": "Dhenkanal Magji (Cottage Cheese Sweet), Dalma, Pakhala with Badi, Chenna Poda",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 85 km",
        "railConnectivity": "Dhenkanal Railway Station (DNKL) - 4 km (On Bhubaneswar-Sambalpur mainline)"
    },
    {
        "id": 7023,
        "name": "Rayagada: Chatikona Tribal Haat & Majhighariani Shrine",
        "location": "Rayagada District, Odisha, India",
        "category": "Tribal & Culture",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Rayagada",
        "division": "Southern",
        "odCircuit": "Eastern Ghats & Hill Stations",
        "odop": "Rayagada Dongria Kondh Kapadaganda Shawls",
        "rating": 4.82,
        "reviewsCount": 1150,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Tucked in the rugged Eastern Ghats valleys, Rayagada is the cultural homeland of the ancient Dongria Kondh tribe who inhabit the Niyamgiri hills. Chatikona is famed for its vibrant Wednesday tribal market where Dongria tribes descend wearing distinctive embroidered Kapadaganda shawls and bronze hairpins.",
        "highlights": [
            "Weekly Wednesday Chatikona Tribal Haat on the Foothills of Niyamgiri",
            "GI-Certified Hand-Embroidered Dongria Kondh Kapadaganda Shawls",
            "Revered Maa Majhighariani Temple Sanctuary in Rayagada Town",
            "Scenic Nagavali & Jhadabati River Suspended Bridges"
        ],
        "activities": [
            "Visit the bustling Wednesday morning Chatikona haat to witness traditional tribal barter and forest produce trade",
            "Procure authentic GI-tagged Kapadaganda shawls embroidered with triangular red and yellow geometric patterns",
            "Cross the pedestrian hanging suspension bridge over the scenic Nagavali river in Rayagada",
            "Offer prayers at the famous Maa Majhighariani temple known for fulfilling devotees' wishes",
            "Trek to the pristine Minajhola sangam where three jungle rivers converge amidst sacred rock caves"
        ],
        "travelTips": [
            "Wednesday is the essential day to be in Chatikona; the market peaks from 7:00 AM to 11:30 AM",
            "Never photograph tribal women without polite and explicit consent; respect community dignity",
            "Rayagada is a major railway junction with direct trains to Visakhapatnam, Raipur, and Bhubaneswar",
            "Stay in Rayagada town hotels and hire a car for excursions to Chatikona (40 km)"
        ],
        "tags": [
            "Tribal Haat",
            "Rayagada",
            "Dongria Kondh",
            "Kapadaganda",
            "Niyamgiri",
            "Culture"
        ],
        "bestSeason": "Oct – Feb (Mild Winter Breezes & Active Weekly Tribal Markets)",
        "localCuisine": "Mandia Jau (Millet Gruel), Bamboo Shoot Vegetable Curry, Chaul Bara, Chenna Poda",
        "nearestAirport": "Visakhapatnam International Airport (VTZ) - 190 km",
        "railConnectivity": "Rayagada Railway Station (RGDA) - 2 km (Major South Coast Railway Junction)"
    },
    {
        "id": 7024,
        "name": "Kalahandi: Karlapat Sanctuary & Phurlijharan Cascades",
        "location": "Kalahandi District (Bhawanipatna), Odisha, India",
        "category": "Wildlife",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Kalahandi",
        "division": "Southern",
        "odCircuit": "Wildlife & Tiger Reserves",
        "odop": "Kalahandi Cotton Handloom & Forest Lacquer",
        "rating": 4.81,
        "reviewsCount": 980,
        "price": "$300/mo",
        "image": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Once celebrated as the ancient land of \"Karunda Mandal\", Kalahandi is blessed with dense deciduous forests and rich biodiversity. Karlapat Wildlife Sanctuary hosts leopards, gaurs, and barking deer, while Phurlijharan is a multi-colored perennial waterfall plunging 30 feet through dense forest cliffs.",
        "highlights": [
            "Dense Tropical Forests of Karlapat Sanctuary & Jakham River Basin",
            "Perennial 30-Foot Rainbow Cascades of Phurlijharan Waterfall",
            "Ancient 2,000-Year-Old Moated Asurgarh Fort Archaeological Excavations",
            "Maa Manikeswari 12th-Century Historic Temple in Bhawanipatna"
        ],
        "activities": [
            "Relax beside the natural plunge pool of Phurlijharan waterfall watching sunlight create rainbows in the mist",
            "Embark on a wildlife trail through Karlapat Sanctuary to spot wild gaurs, leopards, and flying squirrels",
            "Explore the ancient Mauryan and Kushan era brick excavations at Asurgarh fort",
            "Attend the grand Chhatar Yatra festival at the historic Maa Manikeswari temple in October",
            "Procure authentic Kalahandi handloom fabrics and tribal lacquer wooden items in Bhawanipatna"
        ],
        "travelTips": [
            "Phurlijharan is located just 15 km from Bhawanipatna and makes a delightful picnic spot",
            "Entry permits for Karlapat Sanctuary are available at the forest check gate near Bhawanipatna",
            "October brings the Chhatar Yatra, Kalahandi's most celebrated festival",
            "Bhawanipatna is connected by rail via Kesinga (35 km) or Bhawanipatna station"
        ],
        "tags": [
            "Kalahandi",
            "Karlapat",
            "Phurlijharan",
            "Waterfall",
            "Sanctuary",
            "Heritage"
        ],
        "bestSeason": "Oct – Mar (Pleasant Weather & Abundant Waterfall Streams)",
        "localCuisine": "Kalahandi Dalma, Bamboo Shoot Roast, Chaul Bara, Mahul Laddu, Pakhala",
        "nearestAirport": "Swami Vivekananda Airport (RPR), Raipur - 240 km / VTZ Visakhapatnam - 260 km",
        "railConnectivity": "Bhawanipatna Railway Station (BWIP) / Kesinga Junction (KSNG) - 35 km"
    },
    {
        "id": 7025,
        "name": "Malkangiri: Balimela Reservoir & Bonda Tribal Hills",
        "location": "Malkangiri District (Chitrakonda), Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Malkangiri",
        "division": "Southern",
        "odCircuit": "Eastern Ghats & Hill Stations",
        "odop": "Malkangiri Forest Honey & Tribal Bamboo Crafts",
        "rating": 4.83,
        "reviewsCount": 890,
        "price": "$290/mo",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Odisha's southernmost frontier, Malkangiri is a land of emerald river valleys, vast reservoirs, and pristine tribal isolation. The spectacular Gurupriya Bridge connects the once-isolated \"Swabhiman Anchal\" on Balimela reservoir, while the Bonda Hills are home to the primitive Bonda (Remo) indigenous tribe.",
        "highlights": [
            "Vast Azure Waters & Island Lagoons of the Balimela Hydroelectric Reservoir",
            "Engineering Wonder: 910-Meter Gurupriya Bridge over Reservoir Waters",
            "Homeland of the Primitive Bonda (Remo) Indigenous Tribal Community",
            "Ammakunda Natural Fish Pool in River Sileru Surrounded by Rock Formations"
        ],
        "activities": [
            "Cruise on speedboats across the emerald backwaters of Balimela reservoir from Chitrakonda",
            "Drive across the iconic Gurupriya Bridge with 360-degree views of reservoir islands and hills",
            "Visit the historic Mudulipada weekly market to observe Bonda tribal bead ornaments and handloom",
            "Feed the sacred tame Mahseer fish at Ammakunda natural stone pools",
            "Stay in eco-cottages on the peaceful banks of the reservoir overlooking blue waters"
        ],
        "travelTips": [
            "The area has transformed with world-class road connectivity via the Gurupriya Bridge",
            "Best visited between October and February when reservoir waters are tranquil and skies crystal clear",
            "Bonda tribal culture is ancient and protected; take a licensed tourism guide and maintain deep cultural respect",
            "Nearest railhead is Jeypore (100 km) or Jagdalpur (140 km)"
        ],
        "tags": [
            "Balimela",
            "Malkangiri",
            "Gurupriya Bridge",
            "Bonda Tribe",
            "Reservoir",
            "Frontier"
        ],
        "bestSeason": "Oct – Feb (Tranquil Blue Waters & Pleasant Mountain Climate)",
        "localCuisine": "Malkangiri Freshwater Fish Fry, Bamboo Shoot Curry, Mandia Porridge, Pakhala",
        "nearestAirport": "Visakhapatnam Airport (VTZ) - 240 km / Jeypore Airport (PYB) - 105 km",
        "railConnectivity": "Jeypore Railway Station (JYP) - 105 km / Koraput Junction - 130 km"
    },
    {
        "id": 7026,
        "name": "Nuapada: Patora Dam, Yogimunda & Sunabeda Plateau",
        "location": "Nuapada District, Odisha, India",
        "category": "Nature",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Nuapada",
        "division": "Southern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Nuapada Stone Sculptures & Wild Forest Tussar",
        "rating": 4.8,
        "reviewsCount": 820,
        "price": "$290/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Bordering Chhattisgarh, Nuapada is a frontier of rugged sandstone plateaus, lush teak forests, and ancient Shaivite shrines. Patora Dam across the Jonk river features an expansive water sports reservoir overlooked by the hilltop Lord Shiva and Ram temples of Yogimunda.",
        "highlights": [
            "Patora Dam & Reservoir on the Jonk River with Water Sports & Gardens",
            "Yogimunda Hilltop Temple Complex with Scenic Reservoir Panoramas",
            "Sunabeda Wildlife Sanctuary Plateau: Habitat of Tigers & Swamp Deer",
            "Ancient Pataleswar Shiva Rock-Cut Temple at Paikmal Border"
        ],
        "activities": [
            "Ride motorboats on the blue waters of Patora Dam surrounded by low forested hills",
            "Climb to the Yogimunda temple terrace at sunset for sweeping views across the Jonk river basin",
            "Explore the virgin canyon gorge of Godhas waterfall inside Sunabeda sanctuary",
            "Sample traditional regional Chaul Bara snacks prepared with spicy garlic-tamarind chutney",
            "Tour local weaver cottages producing natural Tussar silk yardage"
        ],
        "travelTips": [
            "Patora Dam is located 18 km from Nuapada town and 90 km from Raipur",
            "Sunabeda plateau requires prior permission from the Divisional Forest Officer (DFO) Nuapada",
            "Connected easily by rail via Khariar Road or Nuapada railway stations on the Raipur-Vizag line",
            "October to February provides cool and comfortable weather for outdoor boat rides"
        ],
        "tags": [
            "Patora Dam",
            "Nuapada",
            "Jonk River",
            "Sunabeda",
            "Reservoir",
            "Nature"
        ],
        "bestSeason": "Oct – Feb (Pleasant Reservoir Breezes & Lush Hills)",
        "localCuisine": "Chaul Bara with Spicy Chutney, Jonk River Fish Curry, Dalma, Pakhala",
        "nearestAirport": "Swami Vivekananda International Airport (RPR), Raipur - 95 km",
        "railConnectivity": "Khariar Road Railway Station (KRAR) - 10 km / Nuapada Road Station (NPD) - 15 km"
    },
    {
        "id": 7027,
        "name": "Nabarangpur: Chandandhara Falls & Deer Park",
        "location": "Nabarangpur District (Umerkote), Odisha, India",
        "category": "Waterfalls",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Nabarangpur",
        "division": "Southern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Nabarangpur Lacquer Toys & Bamboo Crafts",
        "rating": 4.8,
        "reviewsCount": 850,
        "price": "$290/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Flanked by dense sal reserves and the perennial Indravati river basin, Nabarangpur is famed for its traditional lacquer craft, where master artisans paint colorful lac jewelry boxes and bamboo toys. Chandandhara is a magnificent waterfall where the river Tel cascades over stepped rocky shelves.",
        "highlights": [
            "Chandandhara Stepped Waterfall Cascading into Forest River Basins",
            "Famous GI-Registered Nabarangpur Lacquer Box & Bamboo Toy Crafts",
            "Maa Bhandargharani Ancient Revered Presiding Deity Shrine",
            "Khatiguda Indravati Dam Reservoir Backwaters"
        ],
        "activities": [
            "Hike down to Chandandhara waterfall rocks and enjoy natural cold river bathing pools",
            "Watch master lacquer artisans apply glossy natural shellac colors to wooden boxes and toys",
            "Visit the serene Deer Park on the outskirts of Nabarangpur town",
            "Cruise on the tranquil waters of Khatiguda Indravati reservoir",
            "Taste sweet Chenna Poda and roasted forest corn at local weekly markets"
        ],
        "travelTips": [
            "Chandandhara is located 30 km from Nabarangpur town; best reached by hired car or two-wheeler",
            "The artisan village of Nabarangpur is welcoming to visitors; buy lacquer craft directly from families",
            "Nearest railhead is Jeypore (40 km) or Koraput (65 km)",
            "Post-monsoon months (October–January) are ideal when the river flow is crystal clear"
        ],
        "tags": [
            "Nabarangpur",
            "Chandandhara",
            "Waterfall",
            "Lacquer Craft",
            "Indravati",
            "Artisan"
        ],
        "bestSeason": "Oct – Feb (Pleasant Weather & Clear Waterfall Cascades)",
        "localCuisine": "Nabarangpur Lacquer Sweet Treats, Bamboo Shoot Curry, Mandia Pez, Pakhala",
        "nearestAirport": "Jeypore Airport (PYB) - 45 km / Visakhapatnam (VTZ) - 240 km",
        "railConnectivity": "Jeypore Railway Station (JYP) - 40 km / Koraput Junction (KRPU) - 65 km"
    },
    {
        "id": 7028,
        "name": "Subarnapur (Sonepur): Handlooms, Sureswari & Lanka Podi",
        "location": "Subarnapur District, Odisha, India",
        "category": "Tribal & Culture",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Subarnapur",
        "division": "Northern",
        "odCircuit": "Heritage Crafts & Handlooms",
        "odop": "Sonepur Bomkai Silk & Cotton Handloom",
        "rating": 4.82,
        "reviewsCount": 920,
        "price": "$300/mo",
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Affectionately called the \"Second Varanasi of India\" due to its cluster of historic riverside temples at the confluence of the Mahanadi and Tel rivers, Sonepur is globally acclaimed for its exquisite Bomkai (Sonepuri) silk sarees and the unique theatrical festival of Lanka Podi.",
        "highlights": [
            "Confluence of Mahanadi & Tel Rivers with Ancient Temples",
            "World-Famous Bomkai (Sonepuri) Silk & Cotton Handloom Guilds",
            "Maa Sureswari 10th-Century Revered Tantric Shakti Shrine",
            "Centuries-Old Clay Hanuman Toy Tradition of Lanka Podi Festival"
        ],
        "activities": [
            "Visit master weavers in Sonepur to see the intricate jacquard Bomkai border and pallu weaving",
            "Offer prayers at the ancient riverside Maa Sureswari and Gokarneswar Shiva temples",
            "Take a peaceful evening boat ride on the sacred sangam of Mahanadi and Tel rivers",
            "Witness the clay-toy burning celebration of Lanka Podi during Bhadrav month",
            "Procure authentic GI-certified Bomkai silk sarees directly from weaver cooperative societies"
        ],
        "travelTips": [
            "Sonepur is located 50 km from Balangir and 80 km from Sambalpur via NH 57",
            "Bomkai sarees make magnificent authentic gifts; buy directly from certified Boyanika outlets",
            "Visit the confluence during early morning or sunset for tranquil river photography",
            "Winter months (October to March) offer ideal pleasant weather"
        ],
        "tags": [
            "Sonepur",
            "Bomkai Silk",
            "Subarnapur",
            "Mahanadi",
            "Lanka Podi",
            "Handloom"
        ],
        "bestSeason": "Oct – Feb (Pleasant River Confluence Climate)",
        "localCuisine": "Sonepur Chaul Bara, Kheer Pitha, Pakhala with Badi, Dalma, Chenna Poda",
        "nearestAirport": "Veer Surendra Sai Airport (JRG), Jharsuguda - 130 km",
        "railConnectivity": "Sonepur Railway Station (SNPU) / Balangir Station - 50 km"
    },
    {
        "id": 7029,
        "name": "Jharsuguda: Bikramkhol Rock Art Cave & Koilighughar",
        "location": "Jharsuguda District, Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Jharsuguda",
        "division": "Northern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Jharsuguda Brass Utensils & Bell Metal",
        "rating": 4.81,
        "reviewsCount": 1120,
        "price": "$330/mo",
        "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "A rapid modern industrial and aviation hub in western Odisha, Jharsuguda preserves prehistoric archaeological treasures like the 4,000-year-old Bikramkhol rock art cave featuring undeciphered proto-Brahmi pictographic scripts, alongside the picturesque stepped waterfall of Koilighughar.",
        "highlights": [
            "4,000-Year-Old Prehistoric Inscribed Rock Art Cave at Bikramkhol",
            "Koilighughar Picturesque Waterfall & Submerged Maheshwar Shiva Lingam",
            "Veer Surendra Sai Aviation Gateway to Western Odisha",
            "Belpahar Forest Hills & Ancient Chandi Mandir"
        ],
        "activities": [
            "Hike through the reserve forest to examine the ancient red ochre pictographic carvings at Bikramkhol",
            "Visit Koilighughar waterfall and look for the naturally submerged shiva lingam in the riverbed",
            "Enjoy boating and lakeside promenades at the modern Kadamdihi park",
            "Sample traditional western Odisha Chaul Bara and sweet Chenna Poda at local markets",
            "Use Jharsuguda's airport as the prime flight gateway to explore Sambalpur, Hirakud, and Sundergarh"
        ],
        "travelTips": [
            "Veer Surendra Sai Airport (JRG) connects directly to Delhi, Kolkata, Bengaluru, and Bhubaneswar",
            "Bikramkhol is located in the reserve forest near Belpahar; wear sturdy walking shoes",
            "Koilighughar waterfall is 30 km from Jharsuguda and is most picturesque from October to February",
            "Hire a local taxi at the airport or railway station for day excursions"
        ],
        "tags": [
            "Jharsuguda",
            "Bikramkhol",
            "Prehistoric Art",
            "Koilighughar",
            "Airport Hub",
            "Waterfall"
        ],
        "bestSeason": "Oct – Feb (Mild Winter Weather & Clear Forest Trails)",
        "localCuisine": "Chaul Bara, Sarsatia Sweet, Dalma with Rice, Pakhala, Chenna Poda",
        "nearestAirport": "Veer Surendra Sai Airport (JRG), Jharsuguda - In City (5 km)",
        "railConnectivity": "Jharsuguda Junction (JSG) - 2 km (Major Howrah-Mumbai Rail Crossroad)"
    },
    {
        "id": 7030,
        "name": "Deogarh: Pradhanpat Waterfalls & Kailash Palace",
        "location": "Deogarh District, Odisha, India",
        "category": "Waterfalls",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Deogarh",
        "division": "Northern",
        "odCircuit": "Waterfalls & Forest Canyons",
        "odop": "Deogarh Forest Honey & Wooden Toys",
        "rating": 4.8,
        "reviewsCount": 870,
        "price": "$290/mo",
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Surrounded by forested hills and ancient royal heritage, Deogarh is the erstwhile capital of the Bamra princely state. Pradhanpat Waterfall cascades down picturesque terraced cliffs right near the royal palace, historically generating India's first municipal hydroelectric power in the 1900s.",
        "highlights": [
            "Scenic Pradhanpat Waterfall Cascading into Lush Forest Basins",
            "Historic Royal Heritage: Site of India's First Princely Hydroelectric Plant",
            "Kailash Palace & Historic Royal Colonial Architecture",
            "Dense Forest Canopies of Kurudkut & Pradhanpat Reserve"
        ],
        "activities": [
            "Walk through the landscaped municipal gardens to the base of the roaring Pradhanpat cascades",
            "Explore the historic remnants of the pioneering 1900s mini hydroelectric generator building",
            "Drive to nearby Kurudkut waterfall nestled deep inside serene deciduous forests",
            "Visit the historic Jagannath and Gopinath royal temples in Deogarh town",
            "Procure pure organic forest honey harvested by local tribal gatherers"
        ],
        "travelTips": [
            "Pradhanpat waterfall is just 1 km from the center of Deogarh town, making it extremely accessible",
            "Located along NH 49 (Bhubaneswar-Rourkela highway); easily visited on the drive between Sambalpur and Keonjhar",
            "October through February offers full waterfall volume and pleasant cool temperatures",
            "Nearest railhead is Sambalpur (90 km) or Rourkela (95 km)"
        ],
        "tags": [
            "Pradhanpat",
            "Deogarh",
            "Waterfall",
            "Hydroelectric Lore",
            "Royal Heritage",
            "Nature"
        ],
        "bestSeason": "Oct – Feb (Pleasant Weather & Cascading Mountain Waterfall)",
        "localCuisine": "Deogarh Forest Honey Sweets, Dalma, Chaul Bara, Pakhala with Badi, Chenna Poda",
        "nearestAirport": "Veer Surendra Sai Airport (JRG), Jharsuguda - 90 km",
        "railConnectivity": "Sambalpur Junction - 90 km / Rourkela Junction - 95 km"
    },
    {
        "id": 7031,
        "name": "Bhadrak: Aradi Akhandalamani Temple & Dhamra Port",
        "location": "Bhadrak District (Aradi), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Bhadrak",
        "division": "Northern",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Bhadrak Cane & Bamboo Crafts",
        "rating": 4.82,
        "reviewsCount": 1410,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Situated on the peaceful banks of the sacred Baitarani river, the historic Baba Akhandalamani Temple at Aradi is one of Odisha's most sacred Shaivite pilgrimage shrines, famed for miracles and divine healing. Bhadrak also serves as the gateway to the deep-sea Dhamra Port and coastal wetlands.",
        "highlights": [
            "Revered Baba Akhandalamani 17th-Century Shiva Shrine on Baitarani River",
            "Healing Holy Pond of Shivaganga Water Tirtham",
            "Dhamra Deep-Water Port & Coastal Mangrove Creeks",
            "Maa Bhadrakali Temple (Ancient Shakta Shrine in Bhadrak Town)"
        ],
        "activities": [
            "Take a holy bath in the Shivaganga pond and offer prayers at the Akhandalamani sanctum",
            "Enjoy a serene boat ride on the Baitarani river overlooking lush rural green banks",
            "Visit the ancient Maa Bhadrakali temple in Bhadrak town dating back to the medieval era",
            "Drive to the deep-water Dhamra port and watch massive ocean-going cargo vessels",
            "Taste the divine temple Mahaprasad prepared with aromatic local Govindabhog rice"
        ],
        "travelTips": [
            "Aradi is located 37 km from Bhadrak town; frequent buses and private taxis are available",
            "Maha Shivratri (February/March) features an illuminated all-night fair with thousands of devotees",
            "Bhadrak railway station is a major stop on the Howrah-Chennai mainline with express connectivity",
            "Combine Aradi with a boat excursion towards Bhitarkanika northern creeks via Chandbali"
        ],
        "tags": [
            "Akhandalamani",
            "Bhadrak",
            "Aradi",
            "Baitarani",
            "Shiva",
            "Dhamra"
        ],
        "bestSeason": "Oct – Mar (Pleasant River Breezes & Shivratri Celebrations)",
        "localCuisine": "Akhandalamani Temple Kheer, Dalma, Pakhala Bhata with Badi Chura, Chenna Poda",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 140 km",
        "railConnectivity": "Bhadrak Railway Station (BHK) - 37 km (Major Mainline Junction)"
    },
    {
        "id": 7032,
        "name": "Jagatsinghpur: Maa Sarala Peeth & Paradip Sea Port",
        "location": "Jagatsinghpur District (Jhankad & Paradip), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Jagatsinghpur",
        "division": "Central",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Jagatsinghpur Coir Mats & Marine Products",
        "rating": 4.83,
        "reviewsCount": 1580,
        "price": "$350/mo",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Home to the revered 10th-century Maa Sarala Temple in Jhankad—where 15th-century poet Sarala Das composed the immortal Odia Mahabharata—Jagatsinghpur also houses Paradip, India's premier deep-sea port with its scenic lighthouse, marine drive, and confluence of the Mahanadi with the Bay of Bengal.",
        "highlights": [
            "Historic 10th-Century Maa Sarala Temple in Jhankad (Inspiration for Odia Mahabharata)",
            "Paradip Sea Port: Major Deep-Sea Harbour & Active Coastal Shipping",
            "Paradip Lighthouse with 360-Degree Views of Ocean & Estuary",
            "Mahanadi Sea Confluence (Muhan) & Clean Golden Sand Beach"
        ],
        "activities": [
            "Offer prayers at Maa Sarala temple, celebrated as the supreme goddess of wisdom and Odia literature",
            "Climb to the viewing gallery of the Paradip Lighthouse for panoramic ocean harbor views",
            "Stroll along the Paradip sea beach and watch massive cargo ships anchored on the horizon",
            "Visit the marine aquarium and harbor breakwater at the mouth of the Mahanadi river",
            "Feast on freshly caught and grilled ocean crabs, pomfret, and prawns at Paradip sea drive"
        ],
        "travelTips": [
            "Paradip is located 95 km from Bhubaneswar and 85 km from Cuttack via a 4-lane expressway",
            "Maa Sarala temple at Jhankad is 15 km before Paradip along the state highway",
            "Lighthouse is open to visitors in the afternoon between 3:30 PM and 5:00 PM",
            "November through March is ideal with cool coastal winds and clear sunny beach days"
        ],
        "tags": [
            "Maa Sarala",
            "Paradip Port",
            "Jagatsinghpur",
            "Lighthouse",
            "Odia Literature",
            "Beach"
        ],
        "bestSeason": "Oct – Mar (Gentle Ocean Breezes & Cool Winter Sun)",
        "localCuisine": "Paradip Crab Masala, Prawn Ghee Roast, Jhankad Bhoga Kheer, Dalma, Chenna Poda",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 95 km",
        "railConnectivity": "Paradip Railway Station (PRDP) / Cuttack Junction - 85 km"
    },
    {
        "id": 7033,
        "name": "Boudh: Padmatola Sanctuary & Ramnath Ancient Temples",
        "location": "Boudh District, Odisha, India",
        "category": "Historical",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Boudh",
        "division": "Southern",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Boudh Handloom Weaving & Terracotta",
        "rating": 4.8,
        "reviewsCount": 780,
        "price": "$290/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Perched gracefully along the bend of the Mahanadi river, Boudh is an ancient crossroad of Tantric Buddhism and Shaivism. It boasts unique 9th-century star-shaped (stellate) temples of Bhubaneswar, Swapneswar, and Paschima Somanath, as well as a monumental colossal seated stone Buddha statue.",
        "highlights": [
            "Unique 9th-Century Star-Shaped (Stellate) Plan Shiva Temples",
            "Colossal 7-Foot Seated Buddha Statue in Bhumisparsha Mudra",
            "Tranquil Mahanadi Riverfront Promenade & Ghats",
            "Padmatola Wildlife Sanctuary Canopy with Wild Elephants"
        ],
        "activities": [
            "Examine the remarkable eight-pointed star architecture of the 9th-century Ramnath temples",
            "Meditate in front of the monolithic seated Buddha statue dating back to the Bhaumakara era",
            "Take a peaceful evening boat ride along the wide curves of the Mahanadi river",
            "Explore Padmatola Sanctuary trails with local forest guides to observe wildlife",
            "Procure traditional handwoven cotton and silk sarees from rural weaver cooperatives"
        ],
        "travelTips": [
            "Boudh town is easily reached from Bhubaneswar (230 km) or Sambalpur (115 km) via NH 57",
            "The three star-shaped temples are in the heart of Boudh town within walking distance of each other",
            "Winter (October–March) provides pleasant dry weather for exploring stone monuments",
            "Nearest railhead is Rairakhol (25 km) on the Sambalpur-Bhubaneswar rail line"
        ],
        "tags": [
            "Boudh",
            "Star-Shaped Temples",
            "Buddha",
            "Mahanadi",
            "Archaeology",
            "Heritage"
        ],
        "bestSeason": "Oct – Feb (Pleasant Riverfront Weather & Clear Skies)",
        "localCuisine": "Boudh Dalma, Chaul Bara, Freshwater Mahanadi Fish Fry, Pakhala, Chenna Poda",
        "nearestAirport": "Biju Patnaik Airport (BBI), Bhubaneswar - 230 km",
        "railConnectivity": "Rairakhol Railway Station (RAIR) - 25 km (Direct trains from Bhubaneswar & Sambalpur)"
    },
    {
        "id": 7034,
        "name": "Nayagarh: Ranpur Jagannath Temple & Sarankul Ladubaba",
        "location": "Nayagarh District (Sarankul & Ranpur), Odisha, India",
        "category": "Spiritual",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Nayagarh",
        "division": "Central",
        "odCircuit": "Sacred Shaktipeeths & Historic Tirthas",
        "odop": "Nayagarh Chhena Poda & Brass Bell Metal",
        "rating": 4.82,
        "reviewsCount": 1180,
        "price": "$310/mo",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Celebrated as the birthplace of Odisha's most iconic sweet, Chhena Poda (baked caramelized cottage cheese, first invented in Dashapalla), Nayagarh is also renowned for the ancient 15th-century Ladubaba Shiva Temple in Sarankul and the historic Ranpur Jagannath temple with its towering Rath.",
        "highlights": [
            "Birthplace of Chhena Poda: World-Famous Caramelized Baked Cottage Cheese",
            "15th-Century Revered Ladubaba Shiva Temple in Sarankul",
            "Historic Royal Ranpur Jagannath Temple with Second Tallest Chariot",
            "Dense Canopy of Baisipalli Wildlife Sanctuary & Mahanadi Eco-Resorts"
        ],
        "activities": [
            "Taste freshly baked authentic Chhena Poda straight from traditional charcoal ovens in Dashapalla",
            "Visit the sacred Ladubaba temple in Sarankul where thousands gather for Mahashivratri",
            "Explore the historic princely palace and Jagannath temple in Ranpur town",
            "Drive to Badmul on the Mahanadi riverbank to enjoy the Satkosia gorge eco-camp",
            "Buy traditional brass bell metal kitchenware from master smiths in Kantilo"
        ],
        "travelTips": [
            "Must do: Try hot Chhena Poda in Dashapalla and Nayagarh; the crust is deeply caramelized and cardamom-scented",
            "Located just 85 km from Bhubaneswar along NH 57; perfect for a quick weekend gastronomic and cultural getaway",
            "Sarankul Mahashivratri is celebrated with immense fervor and vibrant night melas",
            "Nayagarh Town railway station connects directly to Bhubaneswar with local passenger services"
        ],
        "tags": [
            "Chhena Poda",
            "Nayagarh",
            "Ladubaba",
            "Ranpur",
            "Satkosia Border",
            "Gastronomy"
        ],
        "bestSeason": "Oct – Mar (Pleasant Weather & Hot Freshly Baked Chhena Poda)",
        "localCuisine": "Original Dashapalla Chhena Poda, Dalma, Pakhala with Badi, Chenna Gaja, Khira",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 85 km",
        "railConnectivity": "Nayagarh Town Station (NYGT) - 3 km / Bhubaneswar Station - 85 km"
    },
    {
        "id": 7035,
        "name": "Khurda: Nandankanan Zoological Park & Chandaka Sanctuary",
        "location": "Khordha District, Odisha, India",
        "category": "Wildlife",
        "state": "Odisha",
        "isOdisha": true,
        "district": "Khurda",
        "division": "Central",
        "odCircuit": "Wildlife & Tiger Reserves",
        "odop": "Khurda Khadi Handloom & Stone Carvings",
        "rating": 4.87,
        "reviewsCount": 3120,
        "price": "$390/mo",
        "image": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
        "aiInsight": "Nestled in the lush Chandaka forest beside Kanjia Lake, Nandankanan (\"The Garden of Gods\") was the world's first zoo to successfully breed white tigers in captivity and breed endangered gharials. Adjacent Chandaka Elephant Sanctuary protects wild Asian elephant migratory corridors.",
        "highlights": [
            "World's First Zoo to Breed Captive White Tigers & Melanistic Tigers",
            "White Tiger Safari, Lion Safari, Bear Safari & Herbivore Safari in Natural Forests",
            "Scenic Kanjia Lake with Ropeway Cable Car & Paddle Boating",
            "Chandaka Elephant Reserve: Wilderness Trails & Watchtowers"
        ],
        "activities": [
            "Board the enclosed safari bus to see white tigers and Royal Bengal tigers roaming in natural woodland enclosures",
            "Glide across Kanjia Lake on the modern passenger ropeway cable car connecting the zoo to the botanical garden",
            "Walk through the specialized nocturnal animal house and walk-through aviary with exotic birds",
            "Explore the state botanical garden housing over 200 species of rare medicinal plants and cacti",
            "Visit the historic Barunei Hill temple and hot sulfur spring on the outskirts of Khurda town"
        ],
        "travelTips": [
            "Nandankanan is open daily from 8:00 AM to 5:00 PM (closed on Mondays for animal maintenance)",
            "Buy safari and entry combo tickets online on the official Nandankanan portal to skip queues",
            "Located 15 km from Bhubaneswar city center; easily accessed by Mo Bus electric public transit or taxi",
            "Wear comfortable walking shoes as the extensive zoo grounds cover over 430 hectares"
        ],
        "tags": [
            "Nandankanan",
            "White Tigers",
            "Khurda",
            "Bhubaneswar",
            "Safari",
            "Zoo",
            "Elephants"
        ],
        "bestSeason": "Oct – Mar (Pleasant Walking Weather & Active Animal Behavior)",
        "localCuisine": "Chhena Poda, Dalma, Pakhala Bhata, Chenna Gaja, Kora Khai, Rasabali",
        "nearestAirport": "Biju Patnaik International Airport (BBI), Bhubaneswar - 18 km",
        "railConnectivity": "Bhubaneswar Railway Station (BBS) - 15 km / Khurda Road Junction (KUR) - 25 km"
    }
];
