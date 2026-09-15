import React, { useState, useEffect } from 'react';
import {
    Globe, ChevronRight, Plane, Filter, Zap, Shield, TrendingUp,
    Star, CheckCircle, ChevronDown, ChevronUp, FileText, CreditCard, UserCheck
} from 'lucide-react';
import { useNavStore } from '../../../store/navStore';
import CardActionBar from './common/CardActionBar';
import CardHorizontalActions from './common/CardHorizontalActions';
import CardTopMonetization from './common/CardTopMonetization';
import './Visa.css';

const Visa = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        globalSearchQuery,
        setDockConfig
    } = useNavStore();
    const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);

    // Register Dock Configuration for Visa Module
    useEffect(() => {
        setDockConfig({
            module: 'Visa',
            placeholder: 'Search countries, visa types...',
            quickFilters: [
                { id: 'e-visa', label: 'E-Visa', icon: 'Zap' },
                { id: 'visa-free', label: 'Visa-Free', icon: 'Shield' },
                { id: 'on-arrival', label: 'On Arrival', icon: 'Clock' },
                { id: 'digital-nomad', label: 'Nomad Visa', icon: 'Globe' },
                { id: 'business', label: 'Business', icon: 'Building2' }
            ]
        });
    }, [setDockConfig]);

    // Sync Global Dock State to Local Search
    useEffect(() => {
        setSearchQuery(globalSearchQuery);
    }, [globalSearchQuery]);

    const countries = [
        {
            id: 1,
            name: 'Afghanistan',
            flag: '🇦🇫',
            monument: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80',
            visaSuccess: '65.2%',
            processingTime: '30-45 Days',
            aiScore: 45,
            perks: ['Special Entry', 'Humanitarian', 'Consultation'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 2,
            name: 'Albania',
            flag: '🇦🇱',
            monument: 'https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?w=800&q=80',
            visaSuccess: '88.5%',
            processingTime: '10-15 Days',
            aiScore: 78,
            perks: ['E-Visa', 'Tourism', 'Business'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 3,
            name: 'Algeria',
            flag: '🇩🇿',
            monument: 'https://images.unsplash.com/photo-1551731409-430360960803?w=800&q=80',
            visaSuccess: '72.1%',
            processingTime: '15-20 Days',
            aiScore: 62,
            perks: ['Business Visa', 'Cultural', 'Transit'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 4,
            name: 'Andorra',
            flag: '🇦🇩',
            monument: 'https://images.unsplash.com/photo-1587983110735-829620ca921e?w=800&q=80',
            visaSuccess: '95.0%',
            processingTime: '5-7 Days',
            aiScore: 85,
            perks: ['Schengen Access', 'Luxury', 'Skiing'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 5,
            name: 'Angola',
            flag: '🇦🇴',
            monument: 'https://images.unsplash.com/photo-1544252528-bb4367efb6cb?w=800&q=80',
            visaSuccess: '78.4%',
            processingTime: '14-21 Days',
            aiScore: 68,
            perks: ['Work Permit', 'Investment', 'Oil & Gas'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 6,
            name: 'Argentina',
            flag: '🇦🇷',
            monument: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
            visaSuccess: '91.2%',
            processingTime: '10 Days',
            aiScore: 88,
            perks: ['Digital Nomad', 'Tourism', 'Football'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 7,
            name: 'Armenia',
            flag: '🇦🇲',
            monument: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?w=800&q=80',
            visaSuccess: '94.5%',
            processingTime: '3-5 Days',
            aiScore: 82,
            perks: ['Visa Free (Select)', 'E-Visa', 'Tech Hub'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 8,
            name: 'Australia',
            flag: '🇦🇺',
            monument: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80',
            visaSuccess: '95.4%',
            processingTime: '14 Days',
            aiScore: 91,
            perks: ['Work & Holiday', 'PR Path', 'Nature'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 9,
            name: 'Austria',
            flag: '🇦🇹',
            monument: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
            visaSuccess: '96.2%',
            processingTime: '10-12 Days',
            aiScore: 93,
            perks: ['Schengen', 'Music', 'Alps'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 10,
            name: 'Azerbaijan',
            flag: '🇦🇿',
            monument: 'https://images.unsplash.com/photo-1527068596702-7604b748d173?w=800&q=80',
            visaSuccess: '98.1%',
            processingTime: '3 Hours (ASAN)',
            aiScore: 96,
            perks: ['E-Visa', 'Formula 1', 'Business'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 15,
            name: 'Bahamas',
            flag: '🇧🇸',
            monument: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
            visaSuccess: '92.4%',
            processingTime: '5-7 Days',
            aiScore: 88,
            perks: ['Island Life', 'No Income Tax', 'Tourism'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 16,
            name: 'Bahrain',
            flag: '🇧🇭',
            monument: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800&q=80',
            visaSuccess: '96.8%',
            processingTime: '24 Hours',
            aiScore: 94,
            perks: ['E-Visa', 'Business Hub', 'Formula 1'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 17,
            name: 'Bangladesh',
            flag: '🇧🇩',
            monument: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80',
            visaSuccess: '82.5%',
            processingTime: '7-10 Days',
            aiScore: 72,
            perks: ['Business', 'Cultural', 'Nature'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 18,
            name: 'Belgium',
            flag: '🇧🇪',
            monument: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=800&q=80',
            visaSuccess: '94.1%',
            processingTime: '10-15 Days',
            aiScore: 91,
            perks: ['Schengen', 'EU Hub', 'Chocolate'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 19,
            name: 'Bhutan',
            flag: '🇧🇹',
            monument: 'https://images.unsplash.com/photo-1578516123433-59770c380213?w=800&q=80',
            visaSuccess: '99.5%',
            processingTime: '48 Hours',
            aiScore: 97,
            perks: ['Happiness Hub', 'Nature', 'Spiritual'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 20,
            name: 'Brazil',
            flag: '🇧🇷',
            monument: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800&q=80',
            visaSuccess: '93.2%',
            processingTime: '5-10 Days',
            aiScore: 89,
            perks: ['Digital Nomad', 'Carnival', 'Nature'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 21,
            name: 'Cambodia',
            flag: '🇰🇭',
            monument: 'https://images.unsplash.com/photo-1500049222539-d5259961615e?w=800&q=80',
            visaSuccess: '98.4%',
            processingTime: '24 Hours',
            aiScore: 92,
            perks: ['E-Visa', 'Angkor Wat', 'Budget'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 22,
            name: 'Canada',
            flag: '🇨🇦',
            monument: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
            visaSuccess: '88.2%',
            processingTime: '20-30 Days',
            aiScore: 95,
            perks: ['PR Path', 'Education', 'Nature'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 23,
            name: 'Chile',
            flag: '🇨🇱',
            monument: 'https://images.unsplash.com/photo-1516131397224-33e943c2e352?w=800&q=80',
            visaSuccess: '94.5%',
            processingTime: '10-15 Days',
            aiScore: 87,
            perks: ['Digital Nomad', 'Wine', 'Adventure'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 24,
            name: 'China',
            flag: '🇨🇳',
            monument: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80',
            visaSuccess: '91.8%',
            processingTime: '4-5 Days',
            aiScore: 93,
            perks: ['Business Hub', 'Tech', 'Culture'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 25,
            name: 'Colombia',
            flag: '🇨🇴',
            monument: 'https://images.unsplash.com/photo-1583996328148-074478601939?w=800&q=80',
            visaSuccess: '92.1%',
            processingTime: '5-7 Days',
            aiScore: 86,
            perks: ['Digital Nomad', 'Coffee', 'Nature'],
            retention: { followed: true, alerts: false, trending: true }
        },
        {
            id: 26,
            name: 'Croatia',
            flag: '🇭🇷',
            monument: 'https://images.unsplash.com/photo-1555990540-02a334d8af6c?w=800&q=80',
            visaSuccess: '95.6%',
            processingTime: '10 Days',
            aiScore: 90,
            perks: ['Schengen', 'Islands', 'History'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 27,
            name: 'Denmark',
            flag: '🇩🇰',
            monument: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80',
            visaSuccess: '94.8%',
            processingTime: '15 Days',
            aiScore: 94,
            perks: ['Schengen', 'Happiness', 'Design'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 28,
            name: 'Dominican Republic',
            flag: '🇩🇴',
            monument: 'https://images.unsplash.com/photo-1589907730532-599504b480d0?w=800&q=80',
            visaSuccess: '96.2%',
            processingTime: '24 Hours',
            aiScore: 85,
            perks: ['E-Ticket', 'Beaches', 'Resorts'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 29,
            name: 'Egypt',
            flag: '🇪🇬',
            monument: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80',
            visaSuccess: '97.5%',
            processingTime: '24 Hours',
            aiScore: 91,
            perks: ['E-Visa', 'Pyramids', 'History'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 30,
            name: 'Estonia',
            flag: '🇪🇪',
            monument: 'https://images.unsplash.com/photo-1548433491-c84b323f5fc6?w=800&q=80',
            visaSuccess: '95.2%',
            processingTime: '15 Days',
            aiScore: 96,
            perks: ['E-Residency', 'Digital Nomad', 'Tech'],
            retention: { followed: true, alerts: false, trending: true }
        },
        {
            id: 31,
            name: 'Ethiopia',
            flag: '🇪🇹',
            monument: 'https://images.unsplash.com/photo-1523805081730-614449379e7d?w=800&q=80',
            visaSuccess: '94.4%',
            processingTime: '24 Hours',
            aiScore: 82,
            perks: ['E-Visa', 'Coffee', 'History'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 32,
            name: 'Fiji',
            flag: '🇫🇯',
            monument: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80',
            visaSuccess: '98.2%',
            processingTime: '24 Hours',
            aiScore: 94,
            perks: ['Visa Free', 'Islands', 'Luxury'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 33,
            name: 'Finland',
            flag: '🇫🇮',
            monument: 'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?w=800&q=80',
            visaSuccess: '95.8%',
            processingTime: '15 Days',
            aiScore: 97,
            perks: ['Schengen', 'Education', 'Aurora'],
            retention: { followed: true, alerts: false, trending: false }
        },
        {
            id: 34,
            name: 'Georgia',
            flag: '🇬🇪',
            monument: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
            visaSuccess: '99.1%',
            processingTime: '48 Hours',
            aiScore: 95,
            perks: ['1 Year Visa Free', 'Digital Nomad', 'Wine'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 35,
            name: 'Germany',
            flag: '🇩🇪',
            monument: 'https://images.unsplash.com/photo-1599946347341-6c568a626d9b?w=800&q=80',
            visaSuccess: '96.2%',
            processingTime: '15-20 Days',
            aiScore: 94,
            perks: ['Job Seeker', 'Free Education', 'Tech Hub'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 36,
            name: 'Greece',
            flag: '🇬🇷',
            monument: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&q=80',
            visaSuccess: '94.5%',
            processingTime: '10 Days',
            aiScore: 92,
            perks: ['Schengen', 'History', 'Islands'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 37,
            name: 'Hungary',
            flag: '🇭🇺',
            monument: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=800&q=80',
            visaSuccess: '95.1%',
            processingTime: '15 Days',
            aiScore: 89,
            perks: ['Schengen', 'Digital Nomad', 'Baths'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 38,
            name: 'Iceland',
            flag: '🇮🇸',
            monument: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
            visaSuccess: '96.4%',
            processingTime: '15 Days',
            aiScore: 93,
            perks: ['Schengen', 'Nature', 'Adventure'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 39,
            name: 'India',
            flag: '🇮🇳',
            monument: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?w=800&q=80',
            visaSuccess: '98.5%',
            processingTime: '24-72 Hours',
            aiScore: 96,
            perks: ['E-Visa', 'Culture', 'Business'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 40,
            name: 'Indonesia',
            flag: '🇮🇩',
            monument: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
            visaSuccess: '99.2%',
            processingTime: '24 Hours',
            aiScore: 94,
            perks: ['Visa on Arrival', 'Digital Nomad', 'Bali'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 41,
            name: 'Ireland',
            flag: '🇮🇪',
            monument: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80',
            visaSuccess: '92.8%',
            processingTime: '15-20 Days',
            aiScore: 91,
            perks: ['Tech Hub', 'Education', 'Nature'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 42,
            name: 'Israel',
            flag: '🇮🇱',
            monument: 'https://images.unsplash.com/photo-1542931237-323a19584446?w=800&q=80',
            visaSuccess: '91.5%',
            processingTime: '10 Days',
            aiScore: 88,
            perks: ['Tech Hub', 'History', 'Business'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 43,
            name: 'Italy',
            flag: '🇮🇹',
            monument: 'https://images.unsplash.com/photo-1529260839312-41777c08238d?w=800&q=80',
            visaSuccess: '93.7%',
            processingTime: '15 Days',
            aiScore: 95,
            perks: ['Schengen', 'Art', 'Food'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 44,
            name: 'Jamaica',
            flag: '🇯🇲',
            monument: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80',
            visaSuccess: '95.2%',
            processingTime: '5-7 Days',
            aiScore: 84,
            perks: ['Tourism', 'Music', 'Beaches'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 50,
            name: 'Jordan',
            flag: '🇯🇴',
            monument: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80',
            visaSuccess: '96.1%',
            processingTime: '24 Hours',
            aiScore: 87,
            perks: ['Visa on Arrival', 'History', 'Petra'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 46,
            name: 'Kazakhstan',
            flag: '🇰🇿',
            monument: 'https://images.unsplash.com/photo-1558588942-930faae5a389?w=800&q=80',
            visaSuccess: '97.4%',
            processingTime: '5 Days',
            aiScore: 83,
            perks: ['E-Visa', 'Business', 'Nature'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 47,
            name: 'Kenya',
            flag: '🇰🇪',
            monument: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
            visaSuccess: '98.5%',
            processingTime: '24 Hours',
            aiScore: 89,
            perks: ['E-Visa', 'Safari', 'Business'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 48,
            name: 'Kuwait',
            flag: '🇰🇼',
            monument: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?w=800&q=80',
            visaSuccess: '95.8%',
            processingTime: '24 Hours',
            aiScore: 91,
            perks: ['E-Visa', 'Business', 'Tax Free'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 49,
            name: 'Laos',
            flag: '🇱🇦',
            monument: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
            visaSuccess: '99.1%',
            processingTime: '24 Hours',
            aiScore: 81,
            perks: ['E-Visa', 'Nature', 'Budget'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 50,
            name: 'Latvia',
            flag: '🇱🇻',
            monument: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80',
            visaSuccess: '95.4%',
            processingTime: '15 Days',
            aiScore: 88,
            perks: ['Schengen', 'Digital Nomad', 'History'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 51,
            name: 'Lebanon',
            flag: '🇱🇧',
            monument: 'https://images.unsplash.com/photo-1547623641-82fbb83476e9?w=800&q=80',
            visaSuccess: '85.2%',
            processingTime: '10 Days',
            aiScore: 74,
            perks: ['Tourism', 'Food', 'History'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 52,
            name: 'Lithuania',
            flag: '🇱🇹',
            monument: 'https://images.unsplash.com/photo-1559160580-086386348425?w=800&q=80',
            visaSuccess: '95.7%',
            processingTime: '15 Days',
            aiScore: 90,
            perks: ['Schengen', 'Tech Hub', 'History'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 53,
            name: 'Luxembourg',
            flag: '🇱🇺',
            monument: 'https://images.unsplash.com/photo-1534430480872-3498386e7a56?w=800&q=80',
            visaSuccess: '94.8%',
            processingTime: '15 Days',
            aiScore: 96,
            perks: ['Schengen', 'Banking', 'Wealth'],
            retention: { followed: true, alerts: true, trending: false }
        },
        {
            id: 54,
            name: 'Malaysia',
            flag: '🇲🇾',
            monument: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80',
            visaSuccess: '98.8%',
            processingTime: '24 Hours',
            aiScore: 93,
            perks: ['E-Visa', 'Digital Nomad', 'Food'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 55,
            name: 'Maldives',
            flag: '🇲🇻',
            monument: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            visaSuccess: '99.9%',
            processingTime: 'On Arrival',
            aiScore: 98,
            perks: ['Visa Free', 'Luxury', 'Beaches'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 56,
            name: 'Malta',
            flag: '🇲🇹',
            monument: 'https://images.unsplash.com/photo-1527066236128-2ff79f7b9705?w=800&q=80',
            visaSuccess: '94.2%',
            processingTime: '15 Days',
            aiScore: 91,
            perks: ['Schengen', 'Digital Nomad', 'History'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 57,
            name: 'Mauritius',
            flag: '🇲🇺',
            monument: 'https://images.unsplash.com/photo-1589405709104-3214b329443b?w=800&q=80',
            visaSuccess: '99.5%',
            processingTime: 'On Arrival',
            aiScore: 95,
            perks: ['Visa Free', 'Luxury', 'Nature'],
            retention: { followed: true, alerts: false, trending: true }
        },
        {
            id: 58,
            name: 'Mexico',
            flag: '🇲🇽',
            monument: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80',
            visaSuccess: '92.4%',
            processingTime: '5-10 Days',
            aiScore: 90,
            perks: ['Digital Nomad', 'Food', 'History'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 59,
            name: 'Monaco',
            flag: '🇲🇨',
            monument: 'https://images.unsplash.com/photo-1559586652-a79a2afca68b?w=800&q=80',
            visaSuccess: '96.8%',
            processingTime: '15 Days',
            aiScore: 97,
            perks: ['Schengen', 'Wealth', 'Luxury'],
            retention: { followed: true, alerts: true, trending: false }
        },
        {
            id: 60,
            name: 'Morocco',
            flag: '🇲🇦',
            monument: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
            visaSuccess: '94.1%',
            processingTime: '10 Days',
            aiScore: 88,
            perks: ['E-Visa', 'Culture', 'History'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 61,
            name: 'Nepal',
            flag: '🇳🇵',
            monument: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
            visaSuccess: '99.8%',
            processingTime: 'On Arrival',
            aiScore: 86,
            perks: ['Visa Free', 'Mountains', 'Adventure'],
            retention: { followed: true, alerts: false, trending: true }
        },
        {
            id: 62,
            name: 'Netherlands',
            flag: '🇳🇱',
            monument: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80',
            visaSuccess: '95.2%',
            processingTime: '15 Days',
            aiScore: 96,
            perks: ['Schengen', 'Tech Hub', 'Culture'],
            retention: { followed: true, alerts: true, trending: false }
        },
        {
            id: 63,
            name: 'New Zealand',
            flag: '🇳🇿',
            monument: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
            visaSuccess: '94.5%',
            processingTime: '20 Days',
            aiScore: 95,
            perks: ['Work & Holiday', 'Nature', 'Adventure'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 64,
            name: 'Norway',
            flag: '🇳🇴',
            monument: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
            visaSuccess: '95.6%',
            processingTime: '15 Days',
            aiScore: 97,
            perks: ['Schengen', 'Nature', 'Aurora'],
            retention: { followed: true, alerts: false, trending: false }
        },
        {
            id: 65,
            name: 'Oman',
            flag: '🇴🇲',
            monument: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800&q=80',
            visaSuccess: '97.2%',
            processingTime: '24 Hours',
            aiScore: 92,
            perks: ['E-Visa', 'Nature', 'Culture'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 66,
            name: 'Pakistan',
            flag: '🇵🇰',
            monument: 'https://images.unsplash.com/photo-1581447100595-3773bc6903bc?w=800&q=80',
            visaSuccess: '84.5%',
            processingTime: '10-15 Days',
            aiScore: 71,
            perks: ['E-Visa', 'Mountains', 'Food'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 67,
            name: 'Peru',
            flag: '🇵🇪',
            monument: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
            visaSuccess: '93.8%',
            processingTime: '7 Days',
            aiScore: 89,
            perks: ['Digital Nomad', 'History', 'Food'],
            retention: { followed: true, alerts: false, trending: true }
        },
        {
            id: 68,
            name: 'Philippines',
            flag: '🇵🇭',
            monument: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
            visaSuccess: '96.4%',
            processingTime: '3-5 Days',
            aiScore: 91,
            perks: ['E-Visa', 'Islands', 'Beaches'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 69,
            name: 'Poland',
            flag: '🇵🇱',
            monument: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80',
            visaSuccess: '94.7%',
            processingTime: '15 Days',
            aiScore: 90,
            perks: ['Schengen', 'History', 'Budget'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 70,
            name: 'Portugal',
            flag: '🇵🇹',
            monument: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
            visaSuccess: '95.2%',
            processingTime: '15 Days',
            aiScore: 96,
            perks: ['Schengen', 'Digital Nomad', 'Beaches'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 71,
            name: 'Qatar',
            flag: '🇶🇦',
            monument: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            visaSuccess: '98.5%',
            processingTime: '24 Hours',
            aiScore: 95,
            perks: ['E-Visa', 'Luxury', 'Business'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 72,
            name: 'Russia',
            flag: '🇷🇺',
            monument: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80',
            visaSuccess: '88.1%',
            processingTime: '10 Days',
            aiScore: 79,
            perks: ['E-Visa', 'History', 'Culture'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 73,
            name: 'Saudi Arabia',
            flag: '🇸🇦',
            monument: 'https://images.unsplash.com/photo-1551041777-ed07f99b6705?w=800&q=80',
            visaSuccess: '97.8%',
            processingTime: '24 Hours',
            aiScore: 94,
            perks: ['E-Visa', 'History', 'Business'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 74,
            name: 'Singapore',
            flag: '🇸🇬',
            monument: 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=800&q=80',
            visaSuccess: '99.5%',
            processingTime: '24-48 Hours',
            aiScore: 99,
            perks: ['E-Visa', 'Business Hub', 'Cleanliness'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 75,
            name: 'South Africa',
            flag: '🇿🇦',
            monument: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
            visaSuccess: '92.4%',
            processingTime: '10-15 Days',
            aiScore: 88,
            perks: ['Safari', 'Nature', 'Adventure'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 76,
            name: 'South Korea',
            flag: '🇰🇷',
            monument: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80',
            visaSuccess: '96.1%',
            processingTime: '5-7 Days',
            aiScore: 97,
            perks: ['E-Visa', 'Tech', 'Culture'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 77,
            name: 'Spain',
            flag: '🇪🇸',
            monument: 'https://images.unsplash.com/photo-1543783232-af412b852fc7?w=800&q=80',
            visaSuccess: '94.8%',
            processingTime: '15 Days',
            aiScore: 95,
            perks: ['Schengen', 'Digital Nomad', 'Food'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 78,
            name: 'Sweden',
            flag: '🇸🇪',
            monument: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80',
            visaSuccess: '95.2%',
            processingTime: '15 Days',
            aiScore: 96,
            perks: ['Schengen', 'Happiness', 'Design'],
            retention: { followed: true, alerts: false, trending: false }
        },
        {
            id: 79,
            name: 'Taiwan',
            flag: '🇹🇼',
            monument: 'https://images.unsplash.com/photo-1552993873-0dd1110e025f?w=800&q=80',
            visaSuccess: '97.4%',
            processingTime: '3-5 Days',
            aiScore: 94,
            perks: ['E-Visa', 'Tech', 'Food'],
            retention: { followed: false, alerts: false, trending: true }
        },
        {
            id: 80,
            name: 'Thailand',
            flag: '🇹🇭',
            monument: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
            visaSuccess: '99.1%',
            processingTime: '24 Hours',
            aiScore: 98,
            perks: ['Visa on Arrival', 'Digital Nomad', 'Beaches'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 81,
            name: 'Turkey',
            flag: '🇹🇷',
            monument: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
            visaSuccess: '96.5%',
            processingTime: '24 Hours',
            aiScore: 95,
            perks: ['E-Visa', 'History', 'Food'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 82,
            name: 'Ukraine',
            flag: '🇺🇦',
            monument: 'https://images.unsplash.com/photo-1561536393-939339393939?w=800&q=80',
            visaSuccess: '91.2%',
            processingTime: '10 Days',
            aiScore: 75,
            perks: ['E-Visa', 'History', 'Resilience'],
            retention: { followed: false, alerts: true, trending: false }
        },
        {
            id: 83,
            name: 'Vietnam',
            flag: '🇻🇳',
            monument: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
            visaSuccess: '98.4%',
            processingTime: '24-72 Hours',
            aiScore: 92,
            perks: ['E-Visa', 'Nature', 'Budget'],
            retention: { followed: true, alerts: true, trending: true }
        },
        {
            id: 84,
            name: 'Zimbabwe',
            flag: '🇿🇼',
            monument: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
            visaSuccess: '95.1%',
            processingTime: '24 Hours',
            aiScore: 84,
            perks: ['E-Visa', 'Safari', 'Nature'],
            retention: { followed: false, alerts: false, trending: false }
        },
        {
            id: 11,
            name: 'United States',
            flag: '🇺🇸',
            monument: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
            visaSuccess: '94.2%',
            processingTime: '12-15 Days',
            aiScore: 92,
            perks: ['Work Visa', 'Student Visa', 'High Success'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 12,
            name: 'United Kingdom',
            flag: '🇬🇧',
            monument: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
            visaSuccess: '97.8%',
            processingTime: '3-5 Days',
            aiScore: 95,
            perks: ['Priority Service', 'E-Visa', 'Family'],
            retention: { followed: true, alerts: false, trending: false }
        },
        {
            id: 13,
            name: 'Japan',
            flag: '🇯🇵',
            monument: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
            visaSuccess: '99.1%',
            processingTime: '48 Hours',
            aiScore: 98,
            perks: ['Visa on Arrival', 'Digital Nomad', 'Business'],
            retention: { followed: false, alerts: true, trending: true }
        },
        {
            id: 14,
            name: 'France',
            flag: '🇫🇷',
            monument: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            visaSuccess: '92.5%',
            processingTime: '8-10 Days',
            aiScore: 89,
            perks: ['Schengen', 'Art & Culture', 'Student'],
            retention: { followed: true, alerts: true, trending: false }
        }
    ];

    const filteredCountries = countries
        .filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const actionButtons = [
        { icon: Zap, label: 'Check Eligibility', active: true },
        { icon: FileText, label: 'Document Checklist' },
        { icon: CreditCard, label: 'Fee Calculator' },
        { icon: UserCheck, label: 'Expert Consultation' },
        { icon: Shield, label: 'Visa Alerts' }
    ];

    return (
        <div className="visa-page-new">
            <div className="detail-header-new">
                <div className="header-main-content">
                    <div className="header-icon-wrapper" style={{ background: '#3b82f6' }}>
                        <Plane size={32} />
                    </div>
                    <div className="header-text">
                        <h1>Global Visa Guide</h1>
                        <p>Explore visa requirements, success rates, and processing times for 80+ countries.</p>
                    </div>
                </div>
                <div className="header-filter-toggle" style={{ background: '#3b82f6' }}>
                    <Filter size={24} />
                </div>
            </div>

            <div className="action-buttons-row">
                {actionButtons.map((btn, idx) => {
                    const Icon = btn.icon;
                    return (
                        <button key={idx} className={`action-btn ${btn.active ? 'active' : ''}`}>
                            <Icon size={18} />
                            <span>{btn.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="visa-main-layout">
                {/* Search & Global Filters are now handled by NomadGhostDock */}

                <div className="visa-content-area">
                    <div className="country-cards-grid">
                        {filteredCountries.map(country => {
                            return (
                                <div key={country.id} className="country-card">
                                    <CardTopMonetization />
                                    {country.retention.trending && (
                                        <div className="trending-badge">
                                            <TrendingUp size={12} />
                                            Trending
                                        </div>
                                    )}
                                    <div className="card-background">
                                        <img src={country.monument} alt={country.name} />
                                        <div className="overlay-gradient"></div>
                                    </div>
                                    <CardActionBar />
                                    <div className="card-content">
                                        <div className="card-header">
                                            <span className="country-flag">{country.flag}</span>
                                            <div className="country-info">
                                                <h3>{country.name}</h3>
                                                <div className="ai-score-wrapper">
                                                    <div className="ai-score-badge">
                                                        <Zap size={12} fill="#f59e0b" color="#f59e0b" />
                                                        AI Travel Score: {country.aiScore}
                                                    </div>
                                                    <div className="score-bar">
                                                        <div
                                                            className="score-progress"
                                                            style={{ width: `${country.aiScore}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={`follow-btn ${country.retention.followed ? 'followed' : ''}`}>
                                                {country.retention.followed ? <CheckCircle size={14} /> : <Star size={14} />}
                                                {country.retention.followed ? 'Following' : 'Follow'}
                                            </button>
                                        </div>

                                        <div className="dopamine-stats">
                                            <div className="stat-item">
                                                <span className="stat-value">{country.visaSuccess}</span>
                                                <span className="stat-label">Success Rate</span>
                                            </div>
                                            <div className="stat-divider"></div>
                                            <div className="stat-item">
                                                <span className="stat-value">{country.processingTime}</span>
                                                <span className="stat-label">Avg. Time</span>
                                            </div>
                                        </div>

                                        <div className="perks-list">
                                            {country.perks.map((perk, index) => (
                                                <span key={index} className="perk-tag">
                                                    <Star size={10} fill="currentColor" />
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="card-actions">
                                            <button className="main-action">
                                                Apply for Visa
                                                <ChevronRight size={16} />
                                            </button>
                                            <button className="secondary-action">
                                                View Details
                                            </button>
                                        </div>
                                        <CardHorizontalActions />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="visa-footer-stats">
                        <Globe size={20} color="#667eea" />
                        <span>Showing <strong>{filteredCountries.length}</strong> countries with active visa services</span>
                    </div>
                </div>
            </div>

            <div className={`floating-smart-assistant ${isAssistantExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="assistant-header" onClick={() => setIsAssistantExpanded(!isAssistantExpanded)}>
                    <Zap size={20} fill="#8b5cf6" color="#8b5cf6" />
                    {isAssistantExpanded && <span>Visa Smart Assistant</span>}
                    <button className="toggle-btn">
                        {isAssistantExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                    </button>
                </div>

                {isAssistantExpanded && (
                    <div className="assistant-content">
                        <button className="assistant-cta">
                            Check My Visa Eligibility
                        </button>
                        <div className="assistant-actions">
                            <button className="assistant-action">
                                <FileText size={18} color="#667eea" />
                                Document Checklist
                            </button>
                            <button className="assistant-action">
                                <CreditCard size={18} color="#10b981" />
                                Fee Calculator
                            </button>
                            <button className="assistant-action">
                                <UserCheck size={18} color="#f59e0b" />
                                Expert Consultation
                            </button>
                        </div>
                        <div className="prime-banner">
                            <div className="prime-header">
                                <Shield size={16} />
                                <span>Visa Protection</span>
                                <span className="badge">Prime</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', margin: 0, color: '#92400e' }}>
                                Get 100% refund on visa fees if your application is rejected.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Visa;
