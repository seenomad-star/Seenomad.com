import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, HelpCircle, Download } from 'lucide-react';
import '../../../styles/RequirementChecklist.css';

const RequirementChecklist = () => {
    const [openItem, setOpenItem] = useState(0);

    const requirements = [
        { 
            title: 'Photograph Requirements', 
            desc: 'Must be 3.5cm x 4.5cm, with a white background and no glasses.',
            urgent: true,
            icon: FileText
        },
        { 
            title: 'Proof of Financial Means', 
            desc: 'Bank statements for the last 6 months showing sufficient funds for the stay.',
            urgent: false,
            icon: CheckCircle2
        },
        { 
            title: 'Travel Insurance', 
            desc: 'Valid for all Schengen countries with minimum coverage of €30,000.',
            urgent: false,
            icon: AlertCircle
        },
        { 
            title: 'Flight Itinerary', 
            desc: 'Confirmed round-trip tickets or a detailed flight reservation.',
            urgent: false,
            icon: Download
        }
    ];

    return (
        <div className="checklist-card">
            <div className="cl-header">
                <h3>Application Document Checklist</h3>
                <p>Ensure you have these documents ready for your e-Visa application.</p>
            </div>

            <div className="cl-list">
                {requirements.map((req, i) => {
                    const Icon = req.icon;
                    return (
                        <div className={`cl-item ${openItem === i ? 'open' : ''}`} key={i} onClick={() => setOpenItem(i)}>
                            <div className="cl-item-header">
                                <div className="cl-ico"><Icon size={18} /></div>
                                <span>{req.title}</span>
                                {req.urgent && <div className="urgent-badge">CRITICAL</div>}
                            </div>
                            {openItem === i && (
                                <div className="cl-item-body">
                                    <p>{req.desc}</p>
                                    <button className="guide-btn">View Detailed Guide <HelpCircle size={14} /></button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="cl-footer">
                <button className="apply-now-btn">Start e-Visa Application</button>
            </div>
        </div>
    );
};

export default RequirementChecklist;
