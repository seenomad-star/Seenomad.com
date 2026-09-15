import InteractiveVisaMap from './components/InteractiveVisaMap';
import PassportPowerRank from './components/PassportPowerRank';
import RequirementChecklist from './components/RequirementChecklist';
import NomadVisaCenter from './components/NomadVisaCenter';
import ComparePassports from './components/ComparePassports';
import GhostModeToggle from '../Social/components/GhostModeToggle';
import RiskIntelligenceMap from '../Security/RiskIntelligenceMap';
import SOSBeacon from '../Security/SOSBeacon';
import '../../styles/VisaIntelligenceHub.css';

const VisaIntelligenceHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'All Countries', count: 195, icon: Globe, color: '#94A3B8' },
        { id: 'visa-free', label: 'Visa Free', count: 58, icon: Shield, color: '#10B981' },
        { id: 'evisa', label: 'e-Visa', count: 24, icon: Zap, color: '#F59E0B' },
        { id: 'voa', label: 'Visa on Arrival', count: 32, icon: Clock, color: '#3B82F6' },
        { id: 'required', label: 'Visa Required', count: 81, icon: AlertCircle, color: '#EF4444' }
    ];

    const popularDestinations = [
        { name: 'Thailand', status: 'e-Visa', region: 'Asia', flag: '🇹🇭' },
        { name: 'Japan', status: 'Visa Free', region: 'Asia', flag: '🇯🇵' },
        { name: 'France', status: 'Visa Free', region: 'Europe', flag: '🇫🇷' },
        { name: 'Vietnam', status: 'e-Visa', region: 'Asia', flag: '🇻🇳' },
        { name: 'Sri Lanka', status: 'ETA', region: 'Asia', flag: '🇱🇰' },
        { name: 'United Arab Emirates', status: 'Visa Free', region: 'Middle East', flag: '🇦🇪' }
    ];

    return (
        <div className="visa-hub-wrapper">
            {/* Header with Ghost Mode */}
            <div className="vh-top-nav">
                <GhostModeToggle />
            </div>

            {/* Hero Section */}
            <header className="vh-hero">
                <div className="hero-badge">
                    <Info size={14} /> <span>Live Visa Intelligence Engine</span>
                </div>
                <h1>Where can you go <span>Visa-Free?</span></h1>
                <p>Instantly check visa requirements for 190+ countries based on your passport.</p>
                
                <div className="vh-search-box">
                    <div className="search-input-wrapper">
                        <Search size={20} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Enter your passport (e.g. India, USA...)" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Interactive Global Map */}
            <InteractiveVisaMap />

            {/* Global Risk Intelligence Feed */}
            <div className="vh-risk-section">
                <RiskIntelligenceMap />
            </div>

            <div className="vh-intelligence-row">
                {/* Passport Ranking */}
                <PassportPowerRank />

                {/* Satellite SOS Beacon */}
                <SOSBeacon />
                
                {/* Document Guide Checklist */}
                <RequirementChecklist />
            </div>

            {/* Nomad Visa Specialized Center */}
            <NomadVisaCenter />

            {/* Category Filter Grid */}
            <section className="vh-filters">
                <div className="filters-grid">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button 
                                key={cat.id} 
                                className={`filter-card ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                                style={{ '--brand-color': cat.color }}
                            >
                                <div className="filter-icon"><Icon size={20} /></div>
                                <div className="filter-meta">
                                    <span className="label text-truncate">{cat.label}</span>
                                    <span className="count">{cat.count} Countries</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Side-by-Side Comparison Area */}
            <ComparePassports />

            {/* Results Preview */}
            <section className="vh-results-preview preview-bottom">
                <div className="section-header">
                    <h2>Recent Country Changes</h2>
                    <button className="view-all">View All Countries <ChevronRight size={16} /></button>
                </div>
                
                <div className="destinations-list">
                    {popularDestinations.map((dest, i) => (
                        <div className="visa-dest-card" key={i}>
                            <div className="dest-flag">{dest.flag}</div>
                            <div className="dest-main">
                                <h3>{dest.name}</h3>
                                <span>{dest.region}</span>
                            </div>
                            <div className={`dest-status ${dest.status.toLowerCase().replace(' ', '-')}`}>
                                {dest.status}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default VisaIntelligenceHub;
