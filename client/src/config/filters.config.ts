import { Search, MapPin, Shield, DollarSign, GraduationCap, Heart, Briefcase, Sun, Info } from 'lucide-react';

export const FILTER_TYPES = [
    { id: 'VISA_FREE', label: 'Visa Free', icon: 'Shield', popularity: 85, rewardLevel: 1 },
    { id: 'VISA_ON_ARRIVAL', label: 'Visa on Arrival', icon: 'MapPin', popularity: 72, rewardLevel: 2 },
    { id: 'BUDGET', label: 'Budget Friendly', icon: 'DollarSign', popularity: 94, rewardLevel: 1 },
    { id: 'STUDY', label: 'Study Abroad', icon: 'GraduationCap', popularity: 45, rewardLevel: 3 },
    { id: 'MEDICAL', label: 'Medical Tourism', icon: 'Heart', popularity: 38, rewardLevel: 4 },
    { id: 'BUSINESS', label: 'Business Hub', icon: 'Briefcase', popularity: 65, rewardLevel: 3 },
    { id: 'SEASONAL', label: 'Seasonal Picks', icon: 'Sun', popularity: 88, rewardLevel: 2 },
    { id: 'SAFETY_HIGH', label: 'High Safety', icon: 'Shield', popularity: 91, rewardLevel: 2 },
];

export const REGIONS = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'];
export const PURPOSES = ['Tourism', 'Work', 'Study', 'Medical', 'Digital Nomad'];
export const BUDGET_RANGES = ['$', '$$', '$$$', '$$$$'];
