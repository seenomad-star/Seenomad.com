import React from 'react';
import { Building2, GraduationCap, ShieldCheck, BarChart3, PlusCircle } from 'lucide-react';

const PartnerHub = () => {
    return (
        <div className="partner-hub-container">
            <div className="section-header">
                <h2>Institutions & NGO Partner Hub</h2>
                <p>Manage programs, track impact, and collaborate with global talent.</p>
            </div>

            <div className="partner-dashboard-grid">
                <div className="dashboard-card premium-card">
                    <div className="card-icon"><Building2 className="text-purple-400" /></div>
                    <h3>NGO Dashboard</h3>
                    <p>Onboard your organization, list programs, and manage volunteers.</p>
                    <button className="secondary-btn-premium">Access Dashboard</button>
                </div>
                <div className="dashboard-card premium-card">
                    <div className="card-icon"><GraduationCap className="text-blue-400" /></div>
                    <h3>University Portal</h3>
                    <p>Verify student credits, manage research trips, and track academic impact.</p>
                    <button className="secondary-btn-premium">Enter Portal</button>
                </div>
                <div className="dashboard-card premium-card">
                    <div className="card-icon"><ShieldCheck className="text-green-400" /></div>
                    <h3>Government Hub</h3>
                    <p>Collaborate on disaster relief and public health initiatives.</p>
                    <button className="secondary-btn-premium">Connect Hub</button>
                </div>
            </div>

            <div className="impact-reporting premium-card">
                <div className="reporting-header">
                    <h3>Automated Impact Reporting</h3>
                    <BarChart3 size={20} className="text-blue-400" />
                </div>
                <p>Generate verified impact reports for stakeholders and donors with one click.</p>
                <div className="report-actions">
                    <button className="primary-btn-premium">Generate Annual Report</button>
                    <button className="secondary-btn-premium"><PlusCircle size={16} /> New Listing</button>
                </div>
            </div>
        </div>
    );
};

export default PartnerHub;
