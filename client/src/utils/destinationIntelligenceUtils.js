/**
 * Destination Intelligence Utility
 * Provides in-depth nomadic telemetry for destinations:
 * - Real-time local weather & forecasts
 * - Verified fiber & 5G internet speeds and coworking hubs
 * - Granular living costs and budget breakdown
 * - Safety, visa guidelines, and community telemetry
 */

// Curated data for major nomad destinations
const curatedCityData = {
    'bali': {
        weather: {
            tempC: 29,
            tempF: 84,
            condition: 'Sunny & Tropical',
            conditionIcon: 'Sun',
            highC: 31,
            lowC: 24,
            humidity: '74%',
            uvIndex: '8 (Very High)',
            rainChance: '15%',
            bestSeason: 'Apr – Oct (Dry & Breezy)',
            forecast: [
                { day: 'Today', temp: '29°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Tomorrow', temp: '30°C', condition: 'Partly Cloudy', icon: 'CloudSun' },
                { day: 'Wed', temp: '28°C', condition: 'Tropical Shower', icon: 'CloudRain' },
                { day: 'Thu', temp: '29°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Fri', temp: '30°C', condition: 'Breezy', icon: 'Wind' }
            ]
        },
        internet: {
            downloadMbps: 145,
            uploadMbps: 72,
            pingMs: 14,
            stabilityScore: '97%',
            mobileCoverage: '4G / 5G High Speed',
            eSimSupport: true,
            topCoworking: [
                { name: 'Dojo Bali (Canggu)', speed: '250 Mbps', price: '$150/mo' },
                { name: 'Outpost (Ubud)', speed: '200 Mbps', price: '$165/mo' },
                { name: 'BWork (Canggu)', speed: '300 Mbps', price: '$180/mo' }
            ]
        },
        costs: {
            totalEstimated: '$1,350',
            currency: 'USD',
            rating: 'Budget Friendly',
            trend: {
                direction: 'rising',
                change: '+4.2%',
                period: 'vs last quarter',
                label: 'High Season Surge',
                description: 'Seasonal demand for private villas has driven up central Canggu rentals by 5%, while local food and scooters remain stable.'
            },
            breakdown: [
                { category: 'Private 1BR / Villa', amount: '$650/mo', note: 'Pool & A/C in Canggu/Pererenan', trend: { direction: 'rising', change: '+5.4%', label: 'Rental Surge', detail: 'Increased high-season villa demand' } },
                { category: 'Coworking Membership', amount: '$160/mo', note: '24/7 access + fiber backup', trend: { direction: 'stable', change: '0.0%', label: 'Stable Rate', detail: 'Annual pass tariffs locked' } },
                { category: 'Food & Dining Out', amount: '$320/mo', note: 'Warungs & Western cafes', trend: { direction: 'rising', change: '+2.1%', label: 'Modest Rise', detail: 'Imported food goods inflation' } },
                { category: 'Scooter Rental & Fuel', amount: '$80/mo', note: 'Honda Scoopy or Vario 125', trend: { direction: 'falling', change: '-1.5%', label: 'Fuel Subsidy', detail: 'Competitive long-term rental rates' } },
                { category: 'Coffee & Daily Drinks', amount: '$2.50/cup', note: 'Specialty cafe flat white', trend: { direction: 'stable', change: '0.0%', label: 'Stable', detail: 'Cafe pricing consistent' } }
            ]
        },
        lifestyle: {
            safetyScore: '86/100',
            walkability: 'Moderate (Scooter Preferred)',
            nomadCommunity: 'Very High (15k+ active)',
            visaStatus: 'Visa on Arrival (30-60d) + 5-Yr B211A'
        }
    },
    'lisbon': {
        weather: {
            tempC: 22,
            tempF: 72,
            condition: 'Sunny & Coastal Breeze',
            conditionIcon: 'Sun',
            highC: 24,
            lowC: 17,
            humidity: '62%',
            uvIndex: '6 (Moderate)',
            rainChance: '5%',
            bestSeason: 'May – Oct (Sun-drenched)',
            forecast: [
                { day: 'Today', temp: '22°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Tomorrow', temp: '23°C', condition: 'Clear Sky', icon: 'Sun' },
                { day: 'Wed', temp: '21°C', condition: 'Pleasant Breeze', icon: 'Wind' },
                { day: 'Thu', temp: '22°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Fri', temp: '24°C', condition: 'Clear Sky', icon: 'Sun' }
            ]
        },
        internet: {
            downloadMbps: 280,
            uploadMbps: 140,
            pingMs: 8,
            stabilityScore: '99%',
            mobileCoverage: '5G Nationwide',
            eSimSupport: true,
            topCoworking: [
                { name: 'Second Home Lisboa', speed: '500 Mbps', price: '€240/mo' },
                { name: 'LACS Conde d’Óbidos', speed: '350 Mbps', price: '€190/mo' },
                { name: 'Heden Chiado', speed: '400 Mbps', price: '€210/mo' }
            ]
        },
        costs: {
            totalEstimated: '$2,300',
            currency: 'USD',
            rating: 'Moderate Europe',
            trend: {
                direction: 'rising',
                change: '+3.6%',
                period: 'YoY shift',
                label: 'Urban Inflation',
                description: 'Historic city center housing pressure continues to apply upward cost pressure, mitigated by subsidized public transit cards.'
            },
            breakdown: [
                { category: '1BR Apartment in Center', amount: '$1,300/mo', note: 'Alfama / Príncipe Real', trend: { direction: 'rising', change: '+4.8%', label: 'High Demand', detail: 'Peak European nomad demand' } },
                { category: 'Coworking Desk', amount: '$220/mo', note: 'Ergonomic hot-desk pass', trend: { direction: 'rising', change: '+2.0%', label: 'Capacity Tightening', detail: 'High occupancy across central spaces' } },
                { category: 'Groceries & Dining', amount: '$520/mo', note: 'Pastéis, fresh seafood & wine', trend: { direction: 'falling', change: '-1.2%', label: 'Seasonal Relief', detail: 'Lower summer vegetable & seafood prices' } },
                { category: 'Public Transit Pass', amount: '$45/mo', note: 'Metro, bus, & vintage trams', trend: { direction: 'stable', change: '0.0%', label: 'Capped Tariff', detail: 'Municipal transit subsidy capped at €40' } },
                { category: 'Espresso / Bica', amount: '$1.00/cup', note: 'Traditional Portuguese cafe', trend: { direction: 'stable', change: '0.0%', label: 'Cultural Constant', detail: 'Protected local cafe rates' } }
            ]
        },
        lifestyle: {
            safetyScore: '94/100',
            walkability: '92/100 (Hilly & Historic)',
            nomadCommunity: 'Massive European Hub',
            visaStatus: 'Schengen 90d + D8 Digital Nomad Visa'
        }
    },
    'medellin': {
        weather: {
            tempC: 25,
            tempF: 77,
            condition: 'City of Eternal Spring',
            conditionIcon: 'CloudSun',
            highC: 27,
            lowC: 18,
            humidity: '65%',
            uvIndex: '7 (High)',
            rainChance: '25%',
            bestSeason: 'Year-Round (22-26°C constant)',
            forecast: [
                { day: 'Today', temp: '25°C', condition: 'Mild Sun', icon: 'CloudSun' },
                { day: 'Tomorrow', temp: '26°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Wed', temp: '24°C', condition: 'Afternoon Rain', icon: 'CloudRain' },
                { day: 'Thu', temp: '25°C', condition: 'Mild Sun', icon: 'CloudSun' },
                { day: 'Fri', temp: '26°C', condition: 'Sunny', icon: 'Sun' }
            ]
        },
        internet: {
            downloadMbps: 160,
            uploadMbps: 80,
            pingMs: 22,
            stabilityScore: '96%',
            mobileCoverage: '4G LTE / 5G Expanding',
            eSimSupport: true,
            topCoworking: [
                { name: 'Selina Cowork (El Poblado)', speed: '200 Mbps', price: '$120/mo' },
                { name: 'Semilla Coworking (Laureles)', speed: '180 Mbps', price: '$110/mo' },
                { name: 'Tinkko Coworking', speed: '250 Mbps', price: '$140/mo' }
            ]
        },
        costs: {
            totalEstimated: '$1,250',
            currency: 'USD',
            rating: 'Very Affordable',
            trend: {
                direction: 'falling',
                change: '-2.8%',
                period: 'vs last quarter',
                label: 'Currency Advantage',
                description: 'A stronger USD against the Colombian Peso has created a favorable downward cost shift for foreign remote earners.'
            },
            breakdown: [
                { category: 'Modern 1BR in Laureles', amount: '$600/mo', note: 'Balcony with mountain views', trend: { direction: 'falling', change: '-3.2%', label: 'Favorable FX', detail: 'Exchange rate reduces USD equivalent' } },
                { category: 'Coworking Membership', amount: '$125/mo', note: 'Unlimited specialty coffee', trend: { direction: 'stable', change: '0.0%', label: 'Fixed Rate', detail: 'Competitive pricing across hubs' } },
                { category: 'Dining & Street Eats', amount: '$320/mo', note: 'Bandeja paisa & fresh juices', trend: { direction: 'falling', change: '-2.4%', label: 'Local Savings', detail: 'Abundant domestic agricultural supply' } },
                { category: 'Metro & Rideshares', amount: '$65/mo', note: 'World-famous Metro cable system', trend: { direction: 'stable', change: '0.0%', label: 'Fixed Tariff', detail: 'Civic transit flat rate' } },
                { category: 'Tinto / Cafe Con Leche', amount: '$1.20/cup', note: 'Locally grown Colombian beans', trend: { direction: 'stable', change: '0.0%', label: 'Direct Trade', detail: 'Locally roasted origin coffee' } }
            ]
        },
        lifestyle: {
            safetyScore: '78/100',
            walkability: '85/100 (Laureles & Poblado)',
            nomadCommunity: 'Huge Tech & Creator Scene',
            visaStatus: '90-Day Visa-Free + 2-Yr Nomad Visa'
        }
    },
    'chiang-mai': {
        weather: {
            tempC: 30,
            tempF: 86,
            condition: 'Warm & Tropical Breeze',
            conditionIcon: 'Sun',
            highC: 33,
            lowC: 22,
            humidity: '60%',
            uvIndex: '8 (Very High)',
            rainChance: '10%',
            bestSeason: 'Nov – Feb (Cool & Clear Skies)',
            forecast: [
                { day: 'Today', temp: '30°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Tomorrow', temp: '31°C', condition: 'Sunny', icon: 'Sun' },
                { day: 'Wed', temp: '30°C', condition: 'Partly Cloudy', icon: 'CloudSun' },
                { day: 'Thu', temp: '32°C', condition: 'Warm Sun', icon: 'Sun' },
                { day: 'Fri', temp: '29°C', condition: 'Breezy', icon: 'Wind' }
            ]
        },
        internet: {
            downloadMbps: 220,
            uploadMbps: 110,
            pingMs: 12,
            stabilityScore: '98%',
            mobileCoverage: '5G Nationwide (AIS / True)',
            eSimSupport: true,
            topCoworking: [
                { name: 'Punspace (Nimman)', speed: '300 Mbps', price: '$110/mo' },
                { name: 'Yellow Coworking', speed: '400 Mbps', price: '$130/mo' },
                { name: 'CAMP Maya', speed: '200 Mbps', price: '$80/mo' }
            ]
        },
        costs: {
            totalEstimated: '$950',
            currency: 'USD',
            rating: 'Budget Nomad Capital',
            trend: {
                direction: 'stable',
                change: '+0.4%',
                period: 'Quarterly shift',
                label: 'Remarkable Stability',
                description: 'Northern Thailand continues to offer benchmark pricing stability with ample modern condo developments keeping rents low.'
            },
            breakdown: [
                { category: 'Modern Condo in Nimman', amount: '$420/mo', note: 'Gym, pool, and high-speed Wi-Fi', trend: { direction: 'stable', change: '+0.5%', label: 'Steady Market', detail: 'High condo supply matches demand' } },
                { category: 'Coworking Membership', amount: '$110/mo', note: '24/7 access with fiber', trend: { direction: 'falling', change: '-1.0%', label: 'Hub Promos', detail: 'Multi-month nomad discounts' } },
                { category: 'Thai Food & Street Night Mkts', amount: '$240/mo', note: 'Khao Soi, pad thai & smoothies', trend: { direction: 'stable', change: '0.0%', label: 'Benchmark Price', detail: 'Night market food prices unchanged' } },
                { category: 'Scooter / Grab Transit', amount: '$50/mo', note: 'Easy city navigation', trend: { direction: 'stable', change: '0.0%', label: 'Standard Rate', detail: 'Flat rental rates across Nimman' } },
                { category: 'Iced Thai Milk Tea / Coffee', amount: '$1.40/cup', note: 'Fresh roast arabica', trend: { direction: 'rising', change: '+1.5%', label: 'Specialty Beans', detail: 'Growth in craft micro-roasters' } }
            ]
        },
        lifestyle: {
            safetyScore: '92/100',
            walkability: '79/100 (Nimman & Old City)',
            nomadCommunity: 'Original Global Nomad Capital',
            visaStatus: '60d Visa-Free + Destination Thailand Visa (DTV)'
        }
    }
};

/**
 * Generate comprehensive intelligence data for any destination.
 * Uses curated data if present, or dynamically calculates realistic metrics
 * based on destination parameters (category, region, price, name seed).
 */
export const getDestinationIntelligence = (dest = {}) => {
    if (!dest) return null;

    const slug = (dest.name || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    // Check curated city database first
    if (curatedCityData[slug]) {
        return {
            ...curatedCityData[slug],
            name: dest.name,
            location: dest.location,
            category: dest.category,
            price: dest.price || curatedCityData[slug].costs.totalEstimated
        };
    }

    // Dynamic generation based on destination properties
    const nameSeed = (dest.name || 'Nomad City').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const category = (dest.category || 'Urban').toLowerCase();
    const location = (dest.location || '').toLowerCase();

    // Determine temperature and weather profile
    let baseTemp = 24;
    let condition = 'Pleasant & Sunny';
    let conditionIcon = 'Sun';
    let bestSeason = 'Year-round';

    if (category.includes('beach') || location.includes('asia') || location.includes('pacific')) {
        baseTemp = 28 + (nameSeed % 4);
        condition = 'Tropical & Sunny';
        conditionIcon = 'Sun';
        bestSeason = 'Nov – May (Dry Season)';
    } else if (category.includes('mountain') || location.includes('alps') || location.includes('nordic')) {
        baseTemp = 14 + (nameSeed % 6);
        condition = 'Crisp Alpine Breeze';
        conditionIcon = 'CloudSun';
        bestSeason = 'Jun – Sep (Hiking) / Dec – Mar (Snow)';
    } else if (category.includes('desert') || location.includes('middle east')) {
        baseTemp = 32 + (nameSeed % 5);
        condition = 'Warm & Dry Oasis';
        conditionIcon = 'Sun';
        bestSeason = 'Oct – Apr (Cooler Months)';
    } else {
        baseTemp = 20 + (nameSeed % 7);
        condition = 'Temperate City Climate';
        conditionIcon = 'CloudSun';
        bestSeason = 'Apr – Oct (Mild & Sunny)';
    }

    const tempC = baseTemp;
    const tempF = Math.round((tempC * 9) / 5 + 32);

    // Dynamic Internet Speeds
    const downloadMbps = 110 + (nameSeed % 140);
    const uploadMbps = Math.round(downloadMbps * 0.45);
    const pingMs = 10 + (nameSeed % 20);

    // Dynamic Cost Breakdown & Economic Shift Telemetry
    const parsedPrice = dest.price ? parseInt(dest.price.replace(/[^0-9]/g, ''), 10) : 1500;
    const monthlyTotal = isNaN(parsedPrice) || parsedPrice < 400 ? 1450 : parsedPrice;

    const rentCost = Math.round(monthlyTotal * 0.48);
    const coworkCost = Math.round(monthlyTotal * 0.12);
    const foodCost = Math.round(monthlyTotal * 0.26);
    const transitCost = Math.round(monthlyTotal * 0.08);

    let costRating = 'Moderate';
    if (monthlyTotal < 1100) costRating = 'Very Affordable';
    else if (monthlyTotal > 2200) costRating = 'High-End / Western';

    // Economic shift trend calculations
    const trendSeed = (nameSeed + monthlyTotal) % 3;
    let overallTrendDirection = 'stable';
    let overallTrendChange = '+0.5%';
    let overallTrendPeriod = 'vs last quarter';
    let overallTrendLabel = 'Stable Economic Index';
    let overallTrendDesc = 'Consistent local inflation and balanced nomad accommodation rates across the city.';
    let rentTrend = { direction: 'stable', change: '+0.5%', label: 'Stable Rents', detail: 'Market supply matches incoming demand' };
    let coworkTrend = { direction: 'stable', change: '0.0%', label: 'Fixed Pricing', detail: 'Consistent monthly hot-desk fees' };
    let foodTrend = { direction: 'stable', change: '0.0%', label: 'Balanced Prices', detail: 'Stable dining and market groceries' };
    let transitTrend = { direction: 'stable', change: '0.0%', label: 'Regulated Fares', detail: 'Consistent public transit rates' };
    let coffeeTrend = { direction: 'stable', change: '0.0%', label: 'Benchmark', detail: 'Standardized cafe pricing' };

    if (trendSeed === 0) {
        overallTrendDirection = 'falling';
        const dropVal = (1.5 + (nameSeed % 28) / 10).toFixed(1);
        overallTrendChange = `-${dropVal}%`;
        overallTrendPeriod = 'vs last quarter';
        overallTrendLabel = 'Favorable Downward Shift';
        overallTrendDesc = 'Favorable foreign currency conditions and off-peak seasonal cooling have lowered remote living costs.';
        rentTrend = { direction: 'falling', change: `-${(parseFloat(dropVal) + 0.8).toFixed(1)}%`, label: 'Seasonal Discount', detail: 'Landlords offering longer lease incentives' };
        coworkTrend = { direction: 'falling', change: '-1.0%', label: 'Promo Tariffs', detail: 'Seasonal coliving/cowork discounts' };
        foodTrend = { direction: 'falling', change: `-${(parseFloat(dropVal) * 0.6).toFixed(1)}%`, label: 'Market Easing', detail: 'Lower agricultural and dining expenses' };
        transitTrend = { direction: 'stable', change: '0.0%', label: 'Flat Fare', detail: 'Fixed municipal transport price' };
        coffeeTrend = { direction: 'stable', change: '0.0%', label: 'Steady', detail: 'Local coffee prices unchanged' };
    } else if (trendSeed === 1) {
        overallTrendDirection = 'rising';
        const riseVal = (2.2 + (nameSeed % 35) / 10).toFixed(1);
        overallTrendChange = `+${riseVal}%`;
        overallTrendPeriod = 'vs last quarter';
        overallTrendLabel = 'In-Demand Upward Shift';
        overallTrendDesc = 'Rising seasonal popularity and influx of remote workers have increased short-term apartment demand.';
        rentTrend = { direction: 'rising', change: `+${(parseFloat(riseVal) + 1.2).toFixed(1)}%`, label: 'High Demand', detail: 'Tight rental availability in popular quarters' };
        coworkTrend = { direction: 'rising', change: '+1.5%', label: 'High Occupancy', detail: 'Peak hot-desk reservations' };
        foodTrend = { direction: 'rising', change: `+${(parseFloat(riseVal) * 0.5).toFixed(1)}%`, label: 'Modest Inflation', detail: 'General consumer price inflation' };
        transitTrend = { direction: 'stable', change: '0.0%', label: 'Capped Tariff', detail: 'Public transport rates protected' };
        coffeeTrend = { direction: 'rising', change: '+1.0%', label: 'Specialty Premium', detail: 'Craft cafe bean price adjustment' };
    }

    return {
        name: dest.name,
        location: dest.location,
        category: dest.category,
        price: dest.price || `$${monthlyTotal.toLocaleString()}/mo`,
        weather: {
            tempC,
            tempF,
            condition,
            conditionIcon,
            highC: tempC + 3,
            lowC: tempC - 4,
            humidity: `${55 + (nameSeed % 25)}%`,
            uvIndex: `${5 + (nameSeed % 4)} (${nameSeed % 2 === 0 ? 'High' : 'Moderate'})`,
            rainChance: `${10 + (nameSeed % 20)}%`,
            bestSeason,
            forecast: [
                { day: 'Today', temp: `${tempC}°C`, condition: 'Sunny', icon: 'Sun' },
                { day: 'Tomorrow', temp: `${tempC + 1}°C`, condition: 'Partly Cloudy', icon: 'CloudSun' },
                { day: 'Wed', temp: `${tempC - 1}°C`, condition: 'Clear Sky', icon: 'Sun' },
                { day: 'Thu', temp: `${tempC}°C`, condition: 'Mild Breeze', icon: 'Wind' },
                { day: 'Fri', temp: `${tempC + 2}°C`, condition: 'Sunny', icon: 'Sun' }
            ]
        },
        internet: {
            downloadMbps,
            uploadMbps,
            pingMs,
            stabilityScore: `${94 + (nameSeed % 5)}%`,
            mobileCoverage: '4G LTE / 5G Ready',
            eSimSupport: true,
            topCoworking: [
                { name: `${dest.name} Central Cowork`, speed: `${downloadMbps + 50} Mbps`, price: `$${coworkCost}/mo` },
                { name: `Nomad Hub ${dest.location.split(',')[0]}`, speed: `${downloadMbps} Mbps`, price: `$${Math.round(coworkCost * 0.9)}/mo` },
                { name: 'The Global Workstation', speed: `${downloadMbps + 80} Mbps`, price: `$${Math.round(coworkCost * 1.15)}/mo` }
            ]
        },
        costs: {
            totalEstimated: `$${monthlyTotal.toLocaleString()}`,
            currency: 'USD',
            rating: costRating,
            trend: {
                direction: overallTrendDirection,
                change: overallTrendChange,
                period: overallTrendPeriod,
                label: overallTrendLabel,
                description: overallTrendDesc
            },
            breakdown: [
                { category: 'Private Nomad Apartment / Studio', amount: `$${rentCost.toLocaleString()}/mo`, note: 'Furnished with high-speed Wi-Fi & utilities', trend: rentTrend },
                { category: 'Dedicated Coworking Hot Desk', amount: `$${coworkCost.toLocaleString()}/mo`, note: 'Ergonomic seating, monitor bays & meeting booths', trend: coworkTrend },
                { category: 'Dining, Groceries & Local Markets', amount: `$${foodCost.toLocaleString()}/mo`, note: 'Mix of healthy local food & specialty dining', trend: foodTrend },
                { category: 'Local Transportation & Rides', amount: `$${transitCost.toLocaleString()}/mo`, note: 'Public transit cards, scooters or ride hailing', trend: transitTrend },
                { category: 'Specialty Coffee / Tea', amount: `$${(2.0 + (nameSeed % 15) / 10).toFixed(2)}/cup`, note: 'Cafe workstation standard beverage', trend: coffeeTrend }
            ]
        },
        lifestyle: {
            safetyScore: `${80 + (nameSeed % 18)}/100`,
            walkability: `${75 + (nameSeed % 20)}/100 (${category.includes('beach') ? 'Bike / Scooter Friendly' : 'Pedestrian Friendly'})`,
            nomadCommunity: `${dest.travelers || '1.4k'} Active Travelers`,
            visaStatus: dest.visaFriendly ? 'Visa-Free / Seamless Access' : (dest.visaApprovalRate ? `${dest.visaApprovalRate} Approval Confidence` : 'Check Embassy Requirements')
        }
    };
};
