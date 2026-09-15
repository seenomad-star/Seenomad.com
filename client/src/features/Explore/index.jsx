import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavStore } from '../../store/navStore';
import { useNavigate } from 'react-router-dom';
import FloatingFilter from '../../components/common/FloatingFilter';
import Embassy from './components/Embassy';
import Visa from './components/Visa';
import Destinations from './components/Destinations';
import CountryEmbassyDetail from './components/CountryEmbassyDetail';
import CountryEmbassyVisa from './components/CountryEmbassyVisa';
import DestinationDetail from './components/DestinationDetail';
import FlightVisaWidget from './components/FlightVisaWidget';
import TravelBug from '../TravelBug/TravelBug';
import DIYHub from '../DIY/DIYHub';
import TrivenlyHub from '../Marketplace/TrivenlyHub';
import TriipperPlanner from '../Planner/TriipperPlanner';
import MultiCityPlanner from '../Planner/MultiCityPlanner';
import NomadPlanner from '../Planner/NomadPlanner';
import TripBuilder from '../Planner/components/TripBuilder/TripBuilder';
import SpeedTestMap from './components/SpeedTestMap';
import CulturalCompass from './components/CulturalCompass';
import StoryStudio from '../Community/StoryStudio';
import GuardianConnect from '../Community/GuardianConnect';
import SuperAgentDashboard from '../AIAgents/SuperAgentDashboard';
import DiscoveryHub from '../Growth/DiscoveryHub';
import NomadDNA from '../Growth/NomadDNA';
import ViralChallenges from '../Growth/ViralChallenges';
import NomadPerks from '../Growth/NomadPerks';
import { 
    Compass, Landmark, CreditCard, Palmtree, 
    Building2, Globe, Radio, Briefcase, 
    Wifi, Plane, Backpack, Zap, Search,
    ShieldCheck, Sparkles, Map, Rocket,
    Cpu, Dna, Trophy, ShoppingBag
} from 'lucide-react';
import VisaIntelligenceHub from '../Visa/VisaIntelligenceHub';
import GuideMarketplace from '../Marketplace/GuideMarketplace';
import NomadShortsFeed from '../Social/NomadShortsFeed';
import GlobalLeaderboard from '../Social/GlobalLeaderboard';
import ReferralBounty from '../Social/ReferralBounty';
import PassportVault from '../Security/PassportVault';
import AIConciergeVera from '../AI/AIConciergeVera';
import ARRealityHub from './ARRealityHub';
import ShadowConcierge from '../VIP/ShadowConcierge';
import RiskIntelligenceMap from '../Security/RiskIntelligenceMap';
import NomadEventsHub from '../Social/NomadEventsHub';
import NomadPassport from '../Security/NomadPassport';
import AIDigitalTwin from '../AI/AIDigitalTwin';
import './styles/Explore.css';

const Explore = () => {
    const navigate = useNavigate();
    const [activeFilters, setActiveFilters] = useState([]);
    const { setModuleNav } = useNavStore();
    const [isVeraVisible, setIsVeraVisible] = useState(false);

    const toggleVera = () => setIsVeraVisible(!isVeraVisible);

    const navItems = [
        { label: 'Destinations', icon: <Palmtree size={18} /> },
        { label: 'Traveluh Multi', icon: <Map size={18} /> },
        { label: 'Triipper AI', icon: <Sparkles size={18} /> },
        { label: 'Cultural Compass', icon: <Compass size={18} /> },
        { label: 'Story Studio', icon: <Rocket size={18} /> },
        { label: 'Local Guardians', icon: <ShieldCheck size={18} /> },
        { label: 'Super Agent', icon: <Cpu size={18} /> },
        { label: 'Viral Challenges', icon: <Trophy size={18} /> },
        { label: 'Nomad Perks', icon: <ShoppingBag size={18} /> },
        { label: 'Discovery Hub', icon: <Rocket size={18} /> },
        { label: 'Nomad DNA', icon: <Dna size={18} /> },
        { label: 'Nomad Events', icon: <Users size={18} /> },
        { label: 'Nomad Passport', icon: <Shield size={18} /> },
        { label: 'AI Digital Twin', icon: <Cpu size={18} /> },
        { label: 'Trivenly Market', icon: <Briefcase size={18} /> },
        { label: 'Speed Test Map', icon: <Wifi size={18} /> },
        { label: 'Flights & Visa', icon: <Plane size={18} /> },
        { label: 'Travel Bug (AI)', icon: <Zap size={18} /> },
        { label: 'Trip Builder', icon: <Palmtree size={18} /> }
    ];

    useEffect(() => {
        setModuleNav(navItems, '/explore');
        return () => setModuleNav([], '');
    }, []);

    const filterMapping = {
        'Destinations': [
            { id: 'beach', label: 'Beach' },
            { id: 'mountain', label: 'Mountain' },
            { id: 'city', label: 'City' },
            { id: 'countryside', label: 'Countryside' },
            { id: 'island', label: 'Island' }
        ]
    };

    const handleFilterChange = (selectedFilters) => {
        setActiveFilters(selectedFilters);
    };

    return (
        <div className="explore-container">
            <div className="explore-content">
                <Routes>
                    <Route path="/" element={<Navigate to="destinations" replace />} />
                    <Route path="destinations" element={<Destinations />} />
                    <Route path="destinations/:id" element={<DestinationDetail />} />
                    <Route path="embassy" element={<Embassy activeFilters={activeFilters} />} />
                    <Route path="visa" element={<VisaIntelligenceHub />} />
                    <Route path="speed-test" element={<SpeedTestMap />} />
                    <Route path="travel-bug" element={<TravelBug />} />
                    <Route path="triipper/*" element={<TriipperPlanner />} />
                    <Route path="multi-city" element={<MultiCityPlanner />} />
                    <Route path="cultural-compass" element={<CulturalCompass />} />
                    <Route path="story-studio" element={<StoryStudio />} />
                    <Route path="guardians" element={<GuardianConnect />} />
                    <Route path="super-agent" element={<SuperAgentDashboard />} />
                    <Route path="challenges" element={<ViralChallenges />} />
                    <Route path="perks" element={<NomadPerks />} />
                    <Route path="discovery" element={<DiscoveryHub />} />
                    <Route path="dna" element={<NomadDNA />} />
                    <Route path="trivenly/*" element={<TrivenlyHub />} />
                    <Route path="diy/*" element={<DIYHub />} />
                    <Route path="flights-visa" element={<FlightVisaWidget />} />
                    <Route path="planner" element={<NomadPlanner />} />
                    <Route path="trip-builder" element={<TripBuilder />} />
                    <Route path="shorts" element={<NomadShortsFeed />} />
                    <Route path="rivalry" element={<GlobalLeaderboard />} />
                    <Route path="rewards" element={<ReferralBounty />} />
                    <Route path="marketplace" element={<GuideMarketplace />} />
                    <Route path="vault" element={<PassportVault />} />
                    <Route path="ar-hub" element={<ARRealityHub />} />
                    <Route path="concierge" element={<ShadowConcierge />} />
                    <Route path="risk" element={<RiskIntelligenceMap />} />
                    <Route path="events" element={<NomadEventsHub />} />
                    <Route path="passport" element={<NomadPassport />} />
                    <Route path="twin" element={<AIDigitalTwin />} />
                </Routes>
            </div>

            <AIConciergeVera isVisible={isVeraVisible} onClose={toggleVera} />
        </div>
    );
};

export default Explore;
