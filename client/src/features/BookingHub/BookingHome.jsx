import React, { useState } from 'react';
import { 
    Plane, Building2, Map, Shield, BadgePercent, Gift, 
    CreditCard, ArrowRightLeft, Briefcase, Car, Train, Bus
} from 'lucide-react';
import './styles/BookingHome.css';

const BookingHome = () => {
    // 7 Category Tabs (Popular, Booking, Experience, etc.)
    const [activeTab, setActiveTab] = useState('popular');
    
    // Search Tabs (Flights, Hotels, Homestays, Trains, etc.)
    const [searchTab, setSearchTab] = useState('flights');

    const topTabs = [
        { id: 'popular', label: 'Popular' },
        { id: 'booking', label: 'Booking' },
        { id: 'experience', label: 'Experience' },
        { id: 'transportation', label: 'Transportation' },
        { id: 'airport', label: 'Airport Information' },
        { id: 'communication', label: 'Communication' },
        { id: 'bills', label: 'Bill Payments' }
    ];

    const searchTabs = [
        { id: 'flights', label: 'Flights', icon: Plane },
        { id: 'intl_flights', label: 'International Flights', icon: Plane },
        { id: 'hotels', label: 'Hotels', icon: Building2 },
        { id: 'intl_hotels', label: 'International Hotels', icon: Building2 },
        { id: 'homestays', label: 'Homestays', icon: HomeIcon },
        { id: 'trains', label: 'Trains', icon: Train },
        { id: 'buses', label: 'Buses', icon: Bus },
        { id: 'cabs', label: 'Cabs', icon: Car },
        { id: 'holidays', label: 'Holidays', icon: Map }
    ];

    // 24 Services Grid Data
    const servicesLevel1 = [
        { name: 'Flights', icon: Plane, tag: '' },
        { name: 'Charter', icon: Plane, tag: '' },
        { name: 'Hotels', icon: Building2, tag: 'Up to 50% Off' },
        { name: 'Activities', icon: Map, tag: '' },
        { name: 'myBiz Corporate', icon: Briefcase, tag: 'New' },
        { name: 'Trains', icon: Train, tag: '' },
        { name: 'Buses', icon: Bus, tag: '' },
        { name: 'Cabs', icon: Car, tag: '' }
    ];
    
    const servicesLevel2 = [
        { name: 'Forex', icon: ArrowRightLeft, tag: 'Best Rates' },
        { name: 'Insurance', icon: Shield, tag: '' },
        { name: 'Gift Cards', icon: Gift, tag: '' },
        { name: 'Trip Money', icon: CreditCard, tag: '' },
        { name: 'PNR Status', icon: TicketIcon, tag: '' },
        { name: 'Flight Status', icon: Plane, tag: '' },
        { name: 'Homestays', icon: Building2, tag: '' },
        { name: 'Visas', icon: FileTextIcon, tag: '' }
    ];

    return (
        <div className="mega-booking-hub">
            {/* 7 Category Tabs */}
            <nav className="booking-top-tabs">
                {topTabs.map(tab => (
                    <button 
                        key={tab.id} 
                        className={`bt-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Live Search Bar */}
            <div className="booking-search-bar-container">
                <input 
                    type="text" 
                    className="booking-search-bar" 
                    placeholder="Search for Flights, Hotels, Visas, and more..."
                />
            </div>

            {/* 24 Services Grid (Circular Icons) */}
            <div className="services-grid-wrapper">
                <div className="services-grid">
                    {[...servicesLevel1, ...servicesLevel2].map((svc, i) => {
                        const IconComponent = svc.icon;
                        return (
                            <div className="service-card" key={i}>
                                {svc.tag && <div className="svc-tag">{svc.tag}</div>}
                                <div className="svc-icon-circle">
                                    <IconComponent size={24} />
                                </div>
                                <span className="svc-name">{svc.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tabbed Search Engine Engine */}
            <div className="search-engine-card">
                <div className="se-tabs">
                    {searchTabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button 
                                key={tab.id} 
                                className={`se-tab ${searchTab === tab.id ? 'active' : ''}`}
                                onClick={() => setSearchTab(tab.id)}
                            >
                                <Icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
                
                <div className="se-form-area">
                    {/* Simulated Flight Search Form for example */}
                    {searchTab === 'flights' && (
                        <div className="flight-search-form">
                            <div className="form-toggles">
                                <label><input type="radio" name="flightType" defaultChecked /> One-Way</label>
                                <label><input type="radio" name="flightType" /> Round-Trip</label>
                                <label><input type="radio" name="flightType" /> Multi-City</label>
                            </div>
                            <div className="form-inputs-row">
                                <div className="input-group">
                                    <span>FROM</span>
                                    <input type="text" defaultValue="New York (JFK)" />
                                </div>
                                <ArrowRightLeft size={24} className="swap-icon" />
                                <div className="input-group">
                                    <span>TO</span>
                                    <input type="text" defaultValue="London (LHR)" />
                                </div>
                                <div className="input-group">
                                    <span>DEPARTURE</span>
                                    <input type="date" />
                                </div>
                                <div className="input-group">
                                    <span>PASSENGERS & CLASS</span>
                                    <input type="text" defaultValue="1 Adult, Economy" readOnly />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className="flight-search-btn">SEARCH FLIGHTS</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

// Helper icons
const HomeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const TicketIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>;
const FileTextIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;

export default BookingHome;
