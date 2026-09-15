import React from 'react';
import {
    Building2,
    Briefcase,
    Users,
    Calendar,
    FileText,
    ShieldCheck,
    ArrowRight,
    Search
} from 'lucide-react';

const Corporate = () => {
    const corporateClients = [
        { id: 1, name: 'TechCorp International', employees: 1200, activeBookings: 45, status: 'Premium' },
        { id: 2, name: 'Global Logistics Inc.', employees: 850, activeBookings: 28, status: 'Standard' },
        { id: 3, name: 'Future Softwares', employees: 300, activeBookings: 12, status: 'Premium' }
    ];

    return (
        <div className="corporate-hub">
            {/* Corporate Stats */}
            <div className="corporate-stats-row">
                <div className="corp-stat-card glass">
                    <div className="corp-stat-icon blue">
                        <Building2 size={24} />
                    </div>
                    <div className="corp-stat-info">
                        <h3>42</h3>
                        <p>Active Clients</p>
                    </div>
                </div>
                <div className="corp-stat-card glass">
                    <div className="corp-stat-icon green">
                        <Briefcase size={24} />
                    </div>
                    <div className="corp-stat-info">
                        <h3>156</h3>
                        <p>Bookings This Month</p>
                    </div>
                </div>
                <div className="corp-stat-card glass">
                    <div className="corp-stat-icon purple">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="corp-stat-info">
                        <h3>98%</h3>
                        <p>Compliance Rate</p>
                    </div>
                </div>
            </div>

            <div className="section-header">
                <h2>Corporate Clients</h2>
                <div className="search-box glass">
                    <Search size={18} />
                    <input type="text" placeholder="Search clients..." />
                </div>
            </div>

            <div className="clients-grid">
                {corporateClients.map(client => (
                    <div key={client.id} className="client-card glass">
                        <div className="client-header">
                            <div className="client-avatar">
                                {client.name.charAt(0)}
                            </div>
                            <div className="client-title">
                                <h3>{client.name}</h3>
                                <span className={`tier-tag ${client.status.toLowerCase()}`}>{client.status}</span>
                            </div>
                        </div>
                        <div className="client-details">
                            <div className="detail-item">
                                <Users size={14} />
                                <span>{client.employees} Employees</span>
                            </div>
                            <div className="detail-item">
                                <Calendar size={14} />
                                <span>{client.activeBookings} Active Bookings</span>
                            </div>
                        </div>
                        <div className="client-actions">
                            <button className="manage-btn">
                                <span>Manage Account</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tools Section */}
            <div className="corporate-tools glass">
                <div className="section-header">
                    <h3>Management Tools</h3>
                </div>
                <div className="tools-grid">
                    <div className="tool-item">
                        <div className="tool-icon">📊</div>
                        <h4>Policy Manager</h4>
                        <p>Set and enforce travel policies for all employees.</p>
                    </div>
                    <div className="tool-item">
                        <div className="tool-icon">🧾</div>
                        <h4>Bulk Invoicing</h4>
                        <p>Generate consolidated invoices for all corporate bookings.</p>
                    </div>
                    <div className="tool-item">
                        <div className="tool-icon">🤝</div>
                        <h4>Group Bookings</h4>
                        <p>Special tools for managing large team retreats.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Corporate;
