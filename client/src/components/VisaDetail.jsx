import React, { useState } from 'react';
import {
    ChevronLeft,
    Clock,
    Calendar,
    CreditCard,
    FileText,
    CheckCircle2,
    AlertCircle,
    Info,
    ArrowRight
} from 'lucide-react';
import '../styles/VisaDetail.css';

const VisaDetail = ({ country, onBack }) => {
    const [activeVisaType, setActiveVisaType] = useState('Tourist');

    const visaTypes = ['Tourist', 'Business', 'Transit', 'Student'];

    const visaInfo = {
        'Tourist': {
            stay: 'Up to 90 days',
            validity: '6 Months',
            processing: '3-5 Working Days',
            fees: '₹ 2,500'
        },
        'Business': {
            stay: 'Up to 180 days',
            validity: '1 Year',
            processing: '5-7 Working Days',
            fees: '₹ 5,000'
        }
    };

    const currentInfo = visaInfo[activeVisaType] || visaInfo['Tourist'];

    const documents = [
        { title: 'Passport', desc: 'Valid for at least 6 months from date of entry' },
        { title: 'Photographs', desc: 'Recent passport-size color photos (35x45mm)' },
        { title: 'Flight Tickets', desc: 'Confirmed return or onward flight tickets' },
        { title: 'Proof of Accommodation', desc: 'Hotel bookings or invitation letter' },
        { title: 'Bank Statements', desc: 'Last 3 months certified bank statements' }
    ];

    const steps = [
        { title: 'Gather Documents', desc: 'Collect all required documents as per the checklist.' },
        { title: 'Fill Application', desc: 'Complete the online visa application form accurately.' },
        { title: 'Pay Fees', desc: 'Make the payment for visa processing fees online.' },
        { title: 'Schedule Appointment', desc: 'Book a slot for biometrics and document submission.' },
        { title: 'Receive Visa', desc: 'Track your application and collect your passport.' }
    ];

    return (
        <div className="visa-detail-container">
            <button className="back-btn" onClick={onBack}>
                <ChevronLeft size={20} />
                Back to Countries
            </button>

            <header className="visa-detail-header">
                <img
                    src={`https://flagcdn.com/w160/${country.code}.png`}
                    alt={country.name}
                    className="detail-flag"
                />
                <h1>Visa Guide for {country.name}</h1>
            </header>

            <div className="visa-type-selector">
                {visaTypes.map(type => (
                    <button
                        key={type}
                        className={`type-btn ${activeVisaType === type ? 'active' : ''}`}
                        onClick={() => setActiveVisaType(type)}
                    >
                        {type} Visa
                    </button>
                ))}
            </div>

            <div className="visa-stats-grid">
                <div className="stat-card">
                    <Clock className="stat-icon" size={24} />
                    <span className="stat-label">Stay Duration</span>
                    <span className="stat-value">{currentInfo.stay}</span>
                </div>
                <div className="stat-card">
                    <Calendar className="stat-icon" size={24} />
                    <span className="stat-label">Validity</span>
                    <span className="stat-value">{currentInfo.validity}</span>
                </div>
                <div className="stat-card">
                    <Info className="stat-icon" size={24} />
                    <span className="stat-label">Processing Time</span>
                    <span className="stat-value">{currentInfo.processing}</span>
                </div>
                <div className="stat-card">
                    <CreditCard className="stat-icon" size={24} />
                    <span className="stat-label">Visa Fees</span>
                    <span className="stat-value">{currentInfo.fees}</span>
                </div>
            </div>

            <div className="visa-info-sections">
                <div className="info-section">
                    <h2><FileText size={24} /> Documents Required</h2>
                    <div className="docs-list">
                        {documents.map((doc, i) => (
                            <div key={i} className="doc-item">
                                <CheckCircle2 className="doc-icon" size={20} />
                                <div className="doc-text">
                                    <h4>{doc.title}</h4>
                                    <p>{doc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-section">
                    <h2><ArrowRight size={24} /> Application Process</h2>
                    <div className="process-steps">
                        {steps.map((step, i) => (
                            <div key={i} className="step-item">
                                <div className="step-number">{i + 1}</div>
                                <div className="step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="important-note">
                <AlertCircle className="note-icon" size={24} />
                <div className="note-content">
                    <h4>Important Note</h4>
                    <p>Visa requirements and fees are subject to change without prior notice. It is recommended to check with the official embassy website before applying.</p>
                </div>
            </div>
        </div>
    );
};

export default VisaDetail;
