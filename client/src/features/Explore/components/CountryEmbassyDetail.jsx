import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Phone, Mail, Globe, Clock,
    Building2, Shield, Info, ExternalLink, Download,
    CheckCircle, AlertCircle, Calendar, MessageSquare,
    Search, Filter, Zap, Plane, Navigation, ChevronRight, FileText
} from 'lucide-react';
import { embassyData } from '../data/embassyData';
import SearchFilterBar from '../../../components/common/SearchFilterBar';
import CardActionBar from './common/CardActionBar';
import './CountryEmbassyDetail.css';

const CountryEmbassyDetail = () => {
    const { '*': subModule } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeAction, setActiveAction] = useState('My Embassies Abroad');
    const [activeTab, setActiveTab] = useState('All');
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Extract country name from slug: embassy/embassy-of-afghanistan -> Afghanistan
    const countrySlug = subModule.replace('embassy/embassy-of-', '');
    const countryName = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const handleBack = () => {
        navigate('/explore/embassy');
    };

    // Get data for the current country from the centralized store
    const currentCountryData = embassyData[countrySlug] || { embassies: [], embassiesAbroad: [] };
    const embassies = currentCountryData.embassies;
    const embassiesAbroad = currentCountryData.embassiesAbroad;

    const actionButtons = [
        { icon: Plane, label: 'My Embassies Abroad' },
        { icon: Building2, label: 'Foreign Embassies Here' },
        { icon: AlertCircle, label: 'Emergency Help' },
        { icon: Navigation, label: 'Nearest Embassy' },
        { icon: Shield, label: 'Embassy Alerts' }
    ];

    const tabs = ['All', 'Embassies', 'Consulates', 'Other Representations'];

    const displayEmbassies = (activeAction === 'My Embassies Abroad' ? embassiesAbroad : embassies)
        .filter(embassy => {
            const matchesSearch = embassy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (embassy.destinationCountry && embassy.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase())) ||
                embassy.location.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab = activeTab === 'All' ||
                (activeTab === 'Embassies' && embassy.type === 'Embassy') ||
                (activeTab === 'Consulates' && embassy.type === 'Consulate') ||
                (activeTab === 'Other Representations' && embassy.type === 'Other');

            return matchesSearch && matchesTab;
        });

    return (
        <div className="country-detail-page-new">
            <div className="detail-header-new">
                <button className="back-btn-new" onClick={handleBack}>
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <div className="header-main-content">
                    <div className="header-icon-wrapper">
                        <Building2 size={32} />
                    </div>
                    <div className="header-text">
                        <h1>Embassy & Consular Services</h1>
                        <p>Find embassies, appointments & consular help in seconds.</p>
                    </div>
                </div>
                <div className="header-filter-toggle">
                    <Filter size={24} />
                </div>
            </div>

            <div className="action-buttons-row">
                {actionButtons.map((btn, idx) => (
                    <button
                        key={idx}
                        className={`action-btn ${activeAction === btn.label ? 'active' : ''}`}
                        onClick={() => setActiveAction(btn.label)}
                    >
                        <btn.icon size={18} />
                        <span>{btn.label}</span>
                    </button>
                ))}
            </div>

            <SearchFilterBar
                placeholder={`Search ${countryName} missions...`}
                filterLabel="Embassy Type"
                alertLabel="Get Embassy Alerts"
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isScrolled={isScrolled}
            />

            <div className="search-section-new">
                <div className="embassy-tabs-container">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`embassy-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="embassy-grid-new">
                {displayEmbassies.map(embassy => (
                    <div key={embassy.id} className="embassy-card-new">
                        <div className="card-image-wrapper">
                            <img src={embassy.image} alt={embassy.name} />
                            <div className="status-badge-new">
                                <span className="dot"></span>
                                {embassy.status}
                            </div>
                        </div>
                        <CardActionBar />
                        <div className="card-info-new">
                            <div className="country-code-badge">{embassy.countryCode}</div>
                            <div className="embassy-details-new">
                                <h3>{embassy.name}</h3>
                                <div className="location-new">
                                    <MapPin size={14} />
                                    <span>{embassy.location}</span>
                                    {embassy.destinationCountry && (
                                        <span className="destination-country"> • {embassy.destinationCountry}</span>
                                    )}
                                </div>
                                <button
                                    className="visa-services-btn"
                                    onClick={() => navigate(`/explore/embassy/embassy-of-${countrySlug}/${countrySlug}embassyvisa`)}
                                >
                                    <FileText size={14} />
                                    <span>Visa Services</span>
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="smart-assistant-floating">
                <div className="assistant-content">
                    <MessageSquare size={20} />
                    <span>Smart Assistant</span>
                    <ChevronRight size={18} style={{ transform: 'rotate(-90deg)' }} />
                </div>
            </div>
        </div>
    );
};

export default CountryEmbassyDetail;
