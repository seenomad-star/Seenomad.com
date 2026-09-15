import React, { useState } from 'react';
import { Briefcase, Wifi, Coffee, DollarSign, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import '../../../styles/NomadVisaCenter.css';

const NomadVisaCenter = () => {
    const nomadDestinations = [
        { name: 'Portugal', visa: 'D7 / Digital Nomad', minIncome: '$3,200/mo', stay: '2 Years', tax: '0% (NHR)', icon: '🇵🇹' },
        { name: 'Bali (Indonesia)', visa: 'B211A / Remote Work', minIncome: 'N/A', stay: '6 Months', tax: 'Tax Free', icon: '🇮🇩' },
        { name: 'Costa Rica', visa: 'Rentista / Nomad', minIncome: '$2,500/mo', stay: '1 Year', tax: '0% Foreign', icon: '🇨🇷' },
        { name: 'Mexico', visa: 'Temporary Resident', minIncome: '$2,600/mo', stay: '4 Years', tax: 'Progressive', icon: '🇲🇽' }
    ];

    return (
        <div className="nomad-visa-center">
            <div className="nvc-header">
                <div className="nvc-badge">
                    <Sparkles size={14} /> <span>Pro Nomad Filters</span>
                </div>
                <h3>Remote Work & Digital Nomad Visas</h3>
                <p>Curated list of countries offering specialized residency for remote earners.</p>
            </div>

            <div className="nomad-grid">
                {nomadDestinations.map((dest, i) => (
                    <div className="nomad-card" key={i}>
                        <div className="nc-top">
                            <span className="nc-flag">{dest.icon}</span>
                            <div className="nc-title">
                                <strong>{dest.name}</strong>
                                <span>{dest.visa}</span>
                            </div>
                        </div>
                        <div className="nc-stats">
                            <div className="nc-stat">
                                <DollarSign size={14} />
                                <span>{dest.minIncome}</span>
                            </div>
                            <div className="nc-stat">
                                <Clock size={14} />
                                <span>{dest.stay}</span>
                            </div>
                            <div className="nc-stat">
                                <Briefcase size={14} />
                                <span>{dest.tax}</span>
                            </div>
                        </div>
                        <button className="nc-apply-btn">View Requirements <ChevronRight size={14} /></button>
                    </div>
                ))}
            </div>

            <div className="nomad-perks-banner">
                <div className="npb-content">
                    <Wifi size={24} color="#A855F7" />
                    <div>
                        <h4>High-Speed WiFi Map Included</h4>
                        <p>Check average MBps and coworking space density for each visa hub.</p>
                    </div>
                </div>
                <button className="explore-perks-btn">Open Map</button>
            </div>
        </div>
    );
};

export default NomadVisaCenter;
