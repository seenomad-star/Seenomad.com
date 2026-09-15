import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Shield, Search, Globe, DollarSign, Clock, AlertCircle, CheckCircle, ChevronRight, Zap, Calendar, ArrowRight, TrendingDown } from 'lucide-react';
import '../../../styles/NomadFeatures.css';

const PASSPORTS = [
    { code: 'US', name: 'United States', strength: 'very_strong', emoji: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', strength: 'very_strong', emoji: '🇬🇧' },
    { code: 'IN', name: 'India', strength: 'moderate', emoji: '🇮🇳' },
    { code: 'DE', name: 'Germany', strength: 'very_strong', emoji: '🇩🇪' },
    { code: 'PK', name: 'Pakistan', strength: 'limited', emoji: '🇵🇰' },
    { code: 'PH', name: 'Philippines', strength: 'moderate', emoji: '🇵🇭' },
    { code: 'BR', name: 'Brazil', strength: 'strong', emoji: '🇧🇷' },
    { code: 'AU', name: 'Australia', strength: 'very_strong', emoji: '🇦🇺' },
    { code: 'CN', name: 'China', strength: 'moderate', emoji: '🇨🇳' },
    { code: 'NG', name: 'Nigeria', strength: 'limited', emoji: '🇳🇬' },
];

const DESTINATIONS = [
    { code: 'ID', name: 'Bali, Indonesia', emoji: '🇮🇩' },
    { code: 'TH', name: 'Thailand', emoji: '🇹🇭' },
    { code: 'PT', name: 'Portugal', emoji: '🇵🇹' },
    { code: 'MX', name: 'Mexico', emoji: '🇲🇽' },
    { code: 'JP', name: 'Japan', emoji: '🇯🇵' },
    { code: 'CO', name: 'Colombia', emoji: '🇨🇴' },
    { code: 'GE', name: 'Georgia', emoji: '🇬🇪' },
    { code: 'ES', name: 'Spain', emoji: '🇪🇸' },
    { code: 'VN', name: 'Vietnam', emoji: '🇻🇳' },
    { code: 'TR', name: 'Turkey', emoji: '🇹🇷' },
];

const VISA_MATRIX = {
    'US-ID': { status: 'Visa on Arrival', duration: '30 days', cost: '$35', extendable: true, type: 'paid' },
    'US-TH': { status: 'Visa Free', duration: '30 days', cost: 'Free', extendable: false, type: 'free' },
    'US-PT': { status: 'Visa Free (Schengen)', duration: '90 days', cost: 'Free', extendable: false, type: 'free' },
    'US-MX': { status: 'Visa Free', duration: '180 days', cost: 'Free', extendable: false, type: 'free' },
    'US-JP': { status: 'Visa Free', duration: '90 days', cost: 'Free', extendable: false, type: 'free' },
    'US-CO': { status: 'Visa Free', duration: '90 days', cost: 'Free', extendable: true, type: 'free' },
    'US-GE': { status: 'Visa Free', duration: '365 days', cost: 'Free', extendable: false, type: 'free' },
    'IN-ID': { status: 'Visa on Arrival', duration: '30 days', cost: '$35', extendable: true, type: 'paid' },
    'IN-TH': { status: 'Visa Free', duration: '30 days', cost: 'Free', extendable: false, type: 'free' },
    'IN-PT': { status: 'Schengen Visa Required', duration: '90 days', cost: '€80', extendable: false, type: 'required' },
    'IN-MX': { status: 'Visa Free', duration: '180 days', cost: 'Free', extendable: false, type: 'free' },
    'IN-JP': { status: 'Visa Required', duration: '15-90 days', cost: '¥3,000', extendable: false, type: 'required' },
    'IN-CO': { status: 'Visa Free', duration: '90 days', cost: 'Free', extendable: false, type: 'free' },
    'IN-GE': { status: 'Visa Free', duration: '365 days', cost: 'Free', extendable: false, type: 'free' },
    'IN-VN': { status: 'E-Visa', duration: '30 days', cost: '$25', extendable: false, type: 'paid' },
    'UK-ID': { status: 'Visa on Arrival', duration: '30 days', cost: '$35', extendable: true, type: 'paid' },
    'UK-TH': { status: 'Visa Free', duration: '30 days', cost: 'Free', extendable: false, type: 'free' },
    'UK-PT': { status: 'Visa Free (Schengen)', duration: '90 days', cost: 'Free', extendable: false, type: 'free' },
};

const FLIGHT_MATRIX = {
    'ID': { base: 300, airlines: ['Singapore Airlines', 'AirAsia', 'Emirates', 'Garuda Indonesia'] },
    'TH': { base: 350, airlines: ['Thai Airways', 'Scoot', 'Air India', 'AirAsia'] },
    'PT': { base: 550, airlines: ['TAP Air Portugal', 'Ryanair', 'LH Group', 'British Airways'] },
    'MX': { base: 500, airlines: ['American Airlines', 'Delta', 'United', 'Aeromexico'] },
    'JP': { base: 700, airlines: ['JAL', 'ANA', 'Korean Air', 'Cathay Pacific'] },
    'CO': { base: 450, airlines: ['Avianca', 'American Airlines', 'LATAM'] },
    'GE': { base: 400, airlines: ['Georgian Airways', 'Fly Dubai', 'Wizz Air'] },
    'ES': { base: 520, airlines: ['Iberia', 'Vueling', 'Ryanair', 'British Airways'] },
    'VN': { base: 380, airlines: ['Vietnam Airlines', 'VietJet', 'Bamboo Airways'] },
};

const getVisaResult = (passport, destination) => {
    const key = `${passport}-${destination}`;
    return VISA_MATRIX[key] || {
        status: 'Visa Required',
        duration: 'Varies',
        cost: 'Check embassy',
        extendable: false,
        type: 'required'
    };
};

const getFlightResult = (destination, passport) => {
    const dest = FLIGHT_MATRIX[destination];
    if (!dest) return null;
    const passportStrength = PASSPORTS.find(p => p.code === passport)?.strength || 'moderate';
    const multiplier = { very_strong: 0.9, strong: 0.95, moderate: 1.0, limited: 1.05 }[passportStrength];
    const basePrice = Math.round(dest.base * multiplier);
    return {
        min: basePrice,
        max: Math.round(basePrice * 1.6),
        airlines: dest.airlines,
        duration: '8–18h depending on origin'
    };
};

const FlightVisaWidget = () => {
    const [passport, setPassport] = useState('');
    const [destination, setDestination] = useState('');
    const [result, setResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        if (!passport || !destination) return;
        setIsSearching(true);
        setResult(null);
        setTimeout(() => {
            const visa = getVisaResult(passport, destination);
            const flights = getFlightResult(destination, passport);
            setResult({ visa, flights, passport: PASSPORTS.find(p => p.code === passport), dest: DESTINATIONS.find(d => d.code === destination) });
            setIsSearching(false);
        }, 1000);
    };

    const statusColor = (type) => ({ free: '#10B981', paid: '#F59E0B', required: '#EF4444' }[type] || '#6B7280');
    const statusBg = (type) => ({ free: '#10B98115', paid: '#F59E0B15', required: '#EF444415' }[type] || '#6B728015');

    return (
        <div className="fvw-container">
            <div className="fvw-header">
                <div className="fvw-title-group">
                    <div className="fvw-icon-wrap">
                        <Plane size={20} />
                        <Shield size={16} className="fvw-shield-icon" />
                    </div>
                    <div>
                        <h3>Flight & Visa Intelligence</h3>
                        <p>Enter your passport and destination to get instant results</p>
                    </div>
                </div>
            </div>

            <div className="fvw-inputs">
                <div className="fvw-select-group">
                    <label><Globe size={14} /> Your Passport</label>
                    <select value={passport} onChange={e => setPassport(e.target.value)} className="fvw-select">
                        <option value="">Select passport country</option>
                        {PASSPORTS.map(p => (
                            <option key={p.code} value={p.code}>{p.emoji} {p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="fvw-arrow-divider"><ArrowRight size={20} /></div>

                <div className="fvw-select-group">
                    <label><MapPin size={14} className="fvw-label-icon" /> Destination</label>
                    <select value={destination} onChange={e => setDestination(e.target.value)} className="fvw-select">
                        <option value="">Select destination</option>
                        {DESTINATIONS.map(d => (
                            <option key={d.code} value={d.code}>{d.emoji} {d.name}</option>
                        ))}
                    </select>
                </div>

                <button className="fvw-search-btn" onClick={handleSearch} disabled={!passport || !destination || isSearching}>
                    {isSearching ? <span className="fvw-spinner" /> : <Search size={18} />}
                    {isSearching ? 'Checking...' : 'Check Now'}
                </button>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div className="fvw-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="fvw-route-header">
                            <span className="fvw-passport">{result.passport?.emoji} {result.passport?.name}</span>
                            <ChevronRight size={16} />
                            <span className="fvw-dest">{result.dest?.emoji} {result.dest?.name}</span>
                        </div>

                        <div className="fvw-cards">
                            {/* Visa Card */}
                            <div className="fvw-card" style={{ borderColor: statusColor(result.visa.type), background: statusBg(result.visa.type) }}>
                                <div className="fvw-card-header">
                                    <Shield size={18} style={{ color: statusColor(result.visa.type) }} />
                                    <span>Visa Requirement</span>
                                    <span className="fvw-status-badge" style={{ background: statusColor(result.visa.type) }}>
                                        {result.visa.type === 'free' ? '✓ No Visa' : result.visa.type === 'paid' ? '💳 Fee' : '⚠️ Required'}
                                    </span>
                                </div>
                                <div className="fvw-card-title">{result.visa.status}</div>
                                <div className="fvw-card-meta">
                                    <div className="fvw-meta-item"><Clock size={13} /> {result.visa.duration}</div>
                                    <div className="fvw-meta-item"><DollarSign size={13} /> {result.visa.cost}</div>
                                    {result.visa.extendable && <div className="fvw-meta-item extend"><CheckCircle size={13} />Extendable</div>}
                                </div>
                            </div>

                            {/* Flight Card */}
                            {result.flights && (
                                <div className="fvw-card fvw-flight-card">
                                    <div className="fvw-card-header">
                                        <Plane size={18} className="fvw-plane-icon" />
                                        <span>Flight Estimates</span>
                                        <span className="fvw-tip">💡 Book 6–8 weeks ahead</span>
                                    </div>
                                    <div className="fvw-price-range">
                                        <div className="fvw-price-min">
                                            <TrendingDown size={14} />
                                            <span className="fvw-price-label">From</span>
                                            <span className="fvw-price-val">${result.flights.min}</span>
                                        </div>
                                        <div className="fvw-price-sep">–</div>
                                        <div className="fvw-price-max">
                                            <span className="fvw-price-val">${result.flights.max}</span>
                                            <span className="fvw-price-label">USD</span>
                                        </div>
                                    </div>
                                    <div className="fvw-airlines">
                                        {result.flights.airlines.map((a, i) => <span key={i} className="fvw-airline-chip">{a}</span>)}
                                    </div>
                                    <div className="fvw-flight-note"><Clock size={12} /> {result.flights.duration}</div>
                                </div>
                            )}
                        </div>

                        <div className="fvw-nomad-tip">
                            <Zap size={14} />
                            <span><strong>Nomad Tip:</strong> {result.visa.type === 'free' ? 'Great news — no visa fees! Consider a longer stay to get the most out of it.' : result.visa.type === 'paid' ? 'Budget for the visa cost. Apply at the border or choose the e-visa option if available.' : 'Plan ahead — apply for your visa at least 4–6 weeks before travel.'}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlightVisaWidget;
