import React, { useState, useEffect } from 'react';
import {
    User, Lock, Bell, Palette, Shield,
    ChevronRight, Camera, Mail, Phone,
    Globe, Moon, Sun, Languages, DollarSign,
    Smartphone, Eye, LogOut, Trash2, Save
} from 'lucide-react';
import '../../styles/Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={18} /> },
        { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> }
    ];

    const renderProfile = () => (
        <div className="settings-section fade-in">
            <div className="profile-header-settings">
                <div className="avatar-container">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Avatar" />
                    <button className="btn-change-avatar"><Camera size={16} /></button>
                </div>
                <div className="profile-info-settings">
                    <h2>John Doe</h2>
                    <p>Digital Nomad & Impact Explorer</p>
                </div>
            </div>

            <div className="settings-grid">
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="John Doe" />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-with-icon">
                        <Mail size={16} />
                        <input type="email" defaultValue="john.doe@example.com" />
                    </div>
                </div>
                <div className="input-group">
                    <label>Phone Number</label>
                    <div className="input-with-icon">
                        <Phone size={16} />
                        <input type="tel" defaultValue="+1 (555) 000-0000" />
                    </div>
                </div>
                <div className="input-group">
                    <label>Location</label>
                    <div className="input-with-icon">
                        <Globe size={16} />
                        <input type="text" defaultValue="Bali, Indonesia" />
                    </div>
                </div>
            </div>

            <div className="input-group full-width">
                <label>Bio</label>
                <textarea defaultValue="Passionate about sustainable travel and discovering hidden gems. Always looking for the next impact challenge!"></textarea>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div className="settings-section fade-in">
            <h3>Login & Security</h3>
            <div className="security-list">
                <div className="security-item">
                    <div className="security-info">
                        <h4>Change Password</h4>
                        <p>Last changed 3 months ago</p>
                    </div>
                    <button className="btn-settings-outline">Update</button>
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                    </div>
                    <div className="toggle-switch active"></div>
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Login History</h4>
                        <p>View your recent login activity and active sessions</p>
                    </div>
                    <button className="btn-settings-outline">View All</button>
                </div>
            </div>
        </div>
    );

    const renderPreferences = () => (
        <div className="settings-section fade-in">
            <h3>Platform Preferences</h3>
            <div className="preferences-grid">
                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><Moon size={20} /></div>
                        <div>
                            <h4>Appearance</h4>
                            <p>Switch between light and dark mode</p>
                        </div>
                    </div>
                    <div className="theme-switcher">
                        <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><Sun size={16} /></button>
                        <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><Moon size={16} /></button>
                    </div>
                </div>
                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><Languages size={20} /></div>
                        <div>
                            <h4>Language</h4>
                            <p>Select your preferred language</p>
                        </div>
                    </div>
                    <select className="settings-select">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>
                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><DollarSign size={20} /></div>
                        <div>
                            <h4>Currency</h4>
                            <p>Select your preferred currency</p>
                        </div>
                    </div>
                    <select className="settings-select">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`settings-page ${isVisible ? 'fade-in' : ''}`}>
            <header className="settings-header">
                <div className="header-content">
                    <div className="badge-settings">
                        <Smartphone size={14} />
                        <span>Personalize Your Experience</span>
                    </div>
                    <h1>Account <span className="gradient-text">Settings</span></h1>
                    <p>Manage your profile, security, and platform preferences.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-save">
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </header>

            <div className="settings-container">
                <aside className="settings-sidebar">
                    <nav className="settings-nav">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} className="chevron" />}
                            </button>
                        ))}
                    </nav>

                    <div className="danger-zone">
                        <h3>Danger Zone</h3>
                        <button className="btn-danger">
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                        <button className="btn-danger outline">
                            <Trash2 size={16} />
                            <span>Delete Account</span>
                        </button>
                    </div>
                </aside>

                <main className="settings-main">
                    <div className="settings-card">
                        {activeTab === 'profile' && renderProfile()}
                        {activeTab === 'security' && renderSecurity()}
                        {activeTab === 'preferences' && renderPreferences()}
                        {/* Add other tabs as needed */}
                    </div>

                    <div className="settings-footer-note">
                        <Eye size={16} />
                        <span>Your profile is currently <strong>Public</strong>. You can change this in the <a href="#" onClick={() => setActiveTab('privacy')}>Privacy</a> tab.</span>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
