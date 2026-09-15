import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Building2, Clock, Globe, Phone, Mail,
    FileText, CreditCard, AlertCircle, CheckCircle2
} from 'lucide-react';
import './CountryEmbassyVisa.css';

const CountryEmbassyVisa = () => {
    const { '*': subModule } = useParams();
    const navigate = useNavigate();

    // Extract country name from slug: embassy/embassy-of-afghanistan/afghanistanembassyvisa -> Afghanistan
    const countrySlug = subModule.split('/').filter(Boolean).pop().replace('embassyvisa', '');
    const countryName = countrySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const handleBack = () => {
        navigate(`/explore/embassy/embassy-of-${countrySlug}`);
    };

    const visaDetails = {
        mission: {
            name: `Embassy of ${countryName}`,
            address: 'Plot No. 1, Shantipath, Chanakyapuri, New Delhi, Delhi 110021',
            phone: '+91 11 2415 0000',
            email: `consular@embassyof${countrySlug}.gov`,
            website: `www.embassyof${countrySlug}.gov`
        },
        hours: [
            { day: 'Monday - Thursday', time: '09:00 AM - 04:00 PM' },
            { day: 'Friday', time: '09:00 AM - 12:30 PM' },
            { day: 'Saturday - Sunday', time: 'Closed' }
        ],
        services: [
            'Tourist Visa (L)',
            'Business Visa (M)',
            'Student Visa (X)',
            'Work Visa (Z)',
            'Transit Visa (G)'
        ],
        fees: [
            { type: 'Tourist (Single Entry)', amount: '₹6,500', time: '4-5 Days' },
            { type: 'Business (Multiple Entry)', amount: '₹12,000', time: '5-7 Days' },
            { type: 'Express Processing', amount: '+₹2,500', time: '24-48 Hours' }
        ],
        documents: [
            'Original Passport (6 months validity)',
            'Two recent passport-size photographs',
            'Completed Visa Application Form',
            'Proof of travel (Flight tickets)',
            'Proof of accommodation (Hotel booking)',
            'Bank statements (Last 3 months)'
        ]
    };

    return (
        <div className="embassy-visa-container">
            <button className="back-btn-premium" onClick={handleBack}>
                <ChevronLeft size={20} />
                Back to Embassy Details
            </button>

            <div className="visa-form-layout">
                <div className="form-header">
                    <div className="header-icon">
                        <FileText size={32} />
                    </div>
                    <div className="header-info">
                        <h1>Visa & Consular Services</h1>
                        <p>{visaDetails.mission.name}</p>
                    </div>
                </div>

                <div className="form-grid">
                    {/* Mission Information */}
                    <section className="form-section">
                        <div className="section-title">
                            <Building2 size={20} />
                            <h2>Mission Information</h2>
                        </div>
                        <div className="section-content">
                            <div className="info-item">
                                <Globe size={16} />
                                <span>{visaDetails.mission.address}</span>
                            </div>
                            <div className="info-item">
                                <Phone size={16} />
                                <span>{visaDetails.mission.phone}</span>
                            </div>
                            <div className="info-item">
                                <Mail size={16} />
                                <span>{visaDetails.mission.email}</span>
                            </div>
                        </div>
                    </section>

                    {/* Operational Hours */}
                    <section className="form-section">
                        <div className="section-title">
                            <Clock size={20} />
                            <h2>Operational Hours</h2>
                        </div>
                        <div className="section-content">
                            {visaDetails.hours.map((item, idx) => (
                                <div key={idx} className="hours-row">
                                    <span className="day">{item.day}</span>
                                    <span className="time">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Available Services */}
                    <section className="form-section full-width">
                        <div className="section-title">
                            <CheckCircle2 size={20} />
                            <h2>Available Visa Types</h2>
                        </div>
                        <div className="services-grid">
                            {visaDetails.services.map((service, idx) => (
                                <div key={idx} className="service-tag">
                                    {service}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Fees & Processing */}
                    <section className="form-section">
                        <div className="section-title">
                            <CreditCard size={20} />
                            <h2>Fees & Processing</h2>
                        </div>
                        <div className="section-content">
                            {visaDetails.fees.map((fee, idx) => (
                                <div key={idx} className="fee-item">
                                    <div className="fee-info">
                                        <span className="fee-type">{fee.type}</span>
                                        <span className="fee-time">{fee.time}</span>
                                    </div>
                                    <span className="fee-amount">{fee.amount}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Document Checklist */}
                    <section className="form-section">
                        <div className="section-title">
                            <AlertCircle size={20} />
                            <h2>Document Checklist</h2>
                        </div>
                        <div className="section-content">
                            <ul className="checklist">
                                {visaDetails.documents.map((doc, idx) => (
                                    <li key={idx}>{doc}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                <div className="form-footer">
                    <button className="apply-now-btn">
                        Start Visa Application
                    </button>
                    <p>Please note: Fees and requirements are subject to change without prior notice.</p>
                </div>
            </div>
        </div>
    );
};

export default CountryEmbassyVisa;
