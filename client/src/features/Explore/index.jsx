import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useNavStore } from '../../store/navStore';
import ModuleNavbar from '../../components/common/ModuleNavbar';
import FloatingFilter from '../../components/common/FloatingFilter';
import Embassy from './components/Embassy';
import Visa from './components/Visa';
import Destinations from './components/Destinations';
import CountryEmbassyDetail from './components/CountryEmbassyDetail';
import CountryEmbassyVisa from './components/CountryEmbassyVisa';
import DestinationDetail from './components/DestinationDetail';
import FlightVisaWidget from './components/FlightVisaWidget';
import DIYHub from '../DIY/DIYHub';
import TrivenlyHub from '../Marketplace/TrivenlyHub';
import MultiCityPlanner from '../Planner/MultiCityPlanner';
import SeeNomadMultiPart from './components/SeeNomadMultiPart';
import CompareDestinationsModal from './components/CompareDestinationsModal';
import NomadPlanner from '../Planner/NomadPlanner';
import TripBuilder from '../Planner/components/TripBuilder/TripBuilder';
import SpeedTestMap from './components/SpeedTestMap';
import CulturalCompass from './components/CulturalCompass';
import StoryStudio from '../Community/StoryStudio';
import GuardianConnect from '../Community/GuardianConnect';
import DiscoveryHub from '../Growth/DiscoveryHub';
import NomadDNA from '../Growth/NomadDNA';
import ViralChallenges from '../Growth/ViralChallenges';
import NomadPerks from '../Growth/NomadPerks';
import { 
    Compass, Landmark, CreditCard, Palmtree, 
    Building2, Globe, Radio, Briefcase, 
    Wifi, Plane, Backpack, Zap, Search,
    ShieldCheck, Sparkles, Map, Rocket,
    Cpu, Dna, Trophy, ShoppingBag,
    Users, Shield
} from 'lucide-react';
import VisaIntelligenceHub from '../Visa/VisaIntelligenceHub';
import GuideMarketplace from '../Marketplace/GuideMarketplace';
import NomadShortsFeed from '../Social/NomadShortsFeed';
import GlobalLeaderboard from '../Social/GlobalLeaderboard';
import ReferralBounty from '../Social/ReferralBounty';
import PassportVault from '../Security/PassportVault';
import ARRealityHub from './ARRealityHub';
import ShadowConcierge from '../VIP/ShadowConcierge';
import RiskIntelligenceMap from '../Security/RiskIntelligenceMap';
import NomadEventsHub from '../Social/NomadEventsHub';
import NomadPassport from '../Security/NomadPassport';
import NomadAIStudio from './components/NomadAIStudio';
import ConsolidatedExploreSuites from './components/ConsolidatedExploreSuites';
import './styles/Explore.css';

const Explore = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeFilters, setActiveFilters] = useState([]);
    const { setModuleNav, isSidebarCollapsed } = useNavStore();

    const navItems = [
        { label: 'Destinations', slug: 'destinations', icon: <Palmtree size={18} /> },
        { label: 'Compare Destinations', slug: 'compare-destinations', icon: <Compass size={18} /> },
        { label: 'Embassy', slug: 'embassy', icon: <Landmark size={18} /> },
        { label: 'SeeNomad Multi', slug: 'seenomad-multi', icon: <Map size={18} /> },
        { label: 'Visa', slug: 'visa', icon: <ShieldCheck size={18} /> },
        { label: 'Trip Builder', slug: 'trip-builder', icon: <Backpack size={18} /> },
        { label: 'Nomad AI Studio', slug: 'ai-studio', icon: <Sparkles size={18} /> },
        { label: 'Culture & Guardians', slug: 'culture-community', icon: <Users size={18} /> },
        { label: 'Passport, DNA & Perks', slug: 'passport-perks', icon: <Shield size={18} /> },
        { label: 'Connectivity & Market', slug: 'connectivity-market', icon: <Wifi size={18} /> }
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
                    <Route path="/" element={<Navigate to={{ pathname: 'destinations', search: location.search }} replace />} />
                    <Route path="destinations" element={<Destinations />} />
                    <Route path="destinations/:id" element={<DestinationDetail />} />
                    <Route path="compare-destinations" element={<CompareDestinationsModal standalone={true} isOpen={true} />} />
                    <Route path="compare" element={<CompareDestinationsModal standalone={true} isOpen={true} />} />
                    <Route path="embassy" element={<Embassy activeFilters={activeFilters} />} />
                    <Route path="embassy/:countrySlug" element={<CountryEmbassyDetail />} />
                    <Route path="embassy/:countrySlug/:visaSlug" element={<CountryEmbassyVisa />} />
                    <Route path="visa" element={<Visa />} />
                    <Route path="visas" element={<Visa />} />
                    <Route path="visa-intelligence" element={<VisaIntelligenceHub />} />
                    <Route path="culture-community" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="all" />} />
                    <Route path="passport-perks" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="all" />} />
                    <Route path="connectivity-market" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="all" />} />
                    <Route path="speed-test" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="speed-test" />} />
                    <Route path="speed-test-map" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="speed-test" />} />
                    <Route path="ai-studio" element={<NomadAIStudio defaultEngine="all" />} />
                    <Route path="nomad-ai" element={<NomadAIStudio defaultEngine="all" />} />
                    <Route path="travel-bug" element={<NomadAIStudio defaultEngine="travel-bug" />} />
                    <Route path="travel-bug-ai" element={<NomadAIStudio defaultEngine="travel-bug" />} />
                    <Route path="triipper/*" element={<NomadAIStudio defaultEngine="triipper" />} />
                    <Route path="triipper-ai/*" element={<NomadAIStudio defaultEngine="triipper" />} />
                    <Route path="seenomad-multi" element={<SeeNomadMultiPart />} />
                    <Route path="seenomad-multi-part" element={<SeeNomadMultiPart />} />
                    <Route path="multi-part" element={<SeeNomadMultiPart />} />
                    <Route path="multi-city" element={<SeeNomadMultiPart />} />
                    <Route path="cultural-compass" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="cultural-compass" />} />
                    <Route path="story-studio" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="story-studio" />} />
                    <Route path="guardians" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="guardians" />} />
                    <Route path="local-guardians" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="guardians" />} />
                    <Route path="super-agent" element={<NomadAIStudio defaultEngine="super-agent" />} />
                    <Route path="challenges" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="challenges" />} />
                    <Route path="viral-challenges" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="challenges" />} />
                    <Route path="perks" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="perks" />} />
                    <Route path="nomad-perks" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="perks" />} />
                    <Route path="discovery" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="discovery" />} />
                    <Route path="discovery-hub" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="discovery" />} />
                    <Route path="dna" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="dna" />} />
                    <Route path="nomad-dna" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="dna" />} />
                    <Route path="trivenly/*" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="trivenly" />} />
                    <Route path="trivenly-market/*" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="trivenly" />} />
                    <Route path="diy/*" element={<DIYHub />} />
                    <Route path="flights-visa" element={<ConsolidatedExploreSuites suiteKey="connectivity-market" defaultTab="flights-visa" />} />
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
                    <Route path="events" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="events" />} />
                    <Route path="nomad-events" element={<ConsolidatedExploreSuites suiteKey="culture-community" defaultTab="events" />} />
                    <Route path="passport" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="passport" />} />
                    <Route path="nomad-passport" element={<ConsolidatedExploreSuites suiteKey="passport-perks" defaultTab="passport" />} />
                    <Route path="twin" element={<NomadAIStudio defaultEngine="digital-twin" />} />
                    <Route path="ai-digital-twin" element={<NomadAIStudio defaultEngine="digital-twin" />} />
                </Routes>
            </div>
        </div>
    );
};

export default Explore;
