import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    User, Lock, Bell, Palette, Shield,
    ChevronRight, Camera, Mail, Phone,
    Globe, Moon, Sun, Languages, DollarSign,
    Smartphone, Eye, LogOut, Trash2, Save, Check,
    MessageCircle, Wallet, Sparkles, Monitor, MapPin
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useToastStore } from '../../store/toastStore';
import ThemeToggle from '../../components/common/ThemeToggle';
import '../../styles/Settings.css';

const Settings = ({ embedded = false }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { theme, isDark, setTheme } = useTheme();
    const { addToast } = useToastStore();

    const initialTab = searchParams.get('tab') || 'preferences';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isVisible, setIsVisible] = useState(false);

    // Interactive Form State
    const [profileForm, setProfileForm] = useState({
        fullName: 'Alex Rivera',
        handle: '@alexrivera.nomad',
        email: 'seenomad@gmail.com',
        phone: '+1 (415) 890-4321',
        currentBase: 'Lisbon, Portugal',
        passportCountry: 'United States',
        bio: 'Senior Full Stack Engineer & Digital Nomad exploring 195+ hubs. Building remote-first systems & sharing verified coworking playbooks.'
    });

    const [securityState, setSecurityState] = useState({
        twoFactor: true,
        biometricPasskey: true,
        loginAlerts: true
    });

    const [notifPrefs, setNotifPrefs] = useState({
        directMessages: true,
        creatorTips: true,
        visaAlerts: true,
        meetupInvites: true,
        weeklyDigest: false
    });

    const [privacyPrefs, setPrivacyPrefs] = useState({
        profileVisibility: 'Public',
        showLiveCity: true,
        showPassportStamps: true,
        allowDirectMessages: 'Everyone'
    });

    const [appPrefs, setAppPrefs] = useState({
        language: 'English (US)',
        currency: 'USD ($)',
        distanceUnit: 'Kilometers (km)',
        compactSidebar: false
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['preferences', 'profile', 'notifications', 'security', 'privacy'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSearchParams({ tab: tabId }, { replace: true });
    };

    const handleSaveChanges = () => {
        addToast('Settings & appearance preferences saved!', 'success');
    };

    const tabs = [
        { id: 'preferences', label: 'Appearance & Theme', sub: 'Light / Dark mode & display', icon: <Palette size={18} /> },
        { id: 'profile', label: 'My Profile & Bio', sub: 'Personal details & nomad base', icon: <User size={18} /> },
        { id: 'notifications', label: 'Notifications & DMs', sub: 'Alerts, messages & email', icon: <Bell size={18} /> },
        { id: 'security', label: 'Login & Security', sub: '2FA, passkeys & sessions', icon: <Lock size={18} /> },
        { id: 'privacy', label: 'Privacy & Visibility', sub: 'Location sharing & DM rules', icon: <Shield size={18} /> }
    ];

    const renderPreferences = () => (
        <div className="settings-section fade-in">
            <div className="settings-section-head">
                <div>
                    <span className="section-kicker">DISPLAY & THEME ENGINE</span>
                    <h3>Appearance & Platform Theme</h3>
                    <p>Customize how SeeNomad looks on your device. Theme changes apply immediately across all modules.</p>
                </div>
                <div className="theme-live-toggle-wrap">
                    <span className="theme-live-status">
                        {isDark ? <Moon size={14} /> : <Sun size={14} />}
                        {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
                    </span>
                    <ThemeToggle variant="switch" />
                </div>
            </div>

            {/* Interactive Theme Mode Cards */}
            <div className="theme-cards-grid">
                <button
                    type="button"
                    className={`theme-preview-card dark-preview ${isDark ? 'selected' : ''}`}
                    onClick={() => {
                        setTheme('dark');
                        addToast('Switched to Midnight Dark Theme', 'info');
                    }}
                >
                    <div className="theme-preview-visual dark-visual">
                        <div className="preview-topbar">
                            <span className="dot red" />
                            <span className="dot amber" />
                            <span className="dot green" />
                            <span className="preview-pill" />
                        </div>
                        <div className="preview-body">
                            <div className="preview-sidebar" />
                            <div className="preview-content">
                                <div className="preview-line lg" />
                                <div className="preview-line sm" />
                                <div className="preview-cards-row">
                                    <div className="preview-box" />
                                    <div className="preview-box" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="theme-preview-footer">
                        <div className="theme-preview-title-group">
                            <Moon size={17} className="theme-icon-indigo" />
                            <div>
                                <h4>Midnight Nomad (Dark)</h4>
                                <span>Deep slate surfaces with low-glare contrast</span>
                            </div>
                        </div>
                        <span className={`theme-check-circle ${isDark ? 'checked' : ''}`}>
                            {isDark && <Check size={13} />}
                        </span>
                    </div>
                </button>

                <button
                    type="button"
                    className={`theme-preview-card light-preview ${!isDark ? 'selected' : ''}`}
                    onClick={() => {
                        setTheme('light');
                        addToast('Switched to Daylight Editorial Theme', 'info');
                    }}
                >
                    <div className="theme-preview-visual light-visual">
                        <div className="preview-topbar">
                            <span className="dot red" />
                            <span className="dot amber" />
                            <span className="dot green" />
                            <span className="preview-pill" />
                        </div>
                        <div className="preview-body">
                            <div className="preview-sidebar" />
                            <div className="preview-content">
                                <div className="preview-line lg" />
                                <div className="preview-line sm" />
                                <div className="preview-cards-row">
                                    <div className="preview-box" />
                                    <div className="preview-box" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="theme-preview-footer">
                        <div className="theme-preview-title-group">
                            <Sun size={17} className="theme-icon-amber" />
                            <div>
                                <h4>Daylight Atlas (Light)</h4>
                                <span>Crisp paper-white canvas for bright outdoor work</span>
                            </div>
                        </div>
                        <span className={`theme-check-circle ${!isDark ? 'checked' : ''}`}>
                            {!isDark && <Check size={13} />}
                        </span>
                    </div>
                </button>
            </div>

            {/* Regional & Formatting Preferences */}
            <div className="preferences-grid">
                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><Languages size={20} /></div>
                        <div>
                            <h4>Language & Region</h4>
                            <p>Interface language and local date formatting</p>
                        </div>
                    </div>
                    <select
                        className="settings-select"
                        value={appPrefs.language}
                        onChange={(e) => setAppPrefs({ ...appPrefs, language: e.target.value })}
                    >
                        <option>English (US)</option>
                        <option>Spanish (ES)</option>
                        <option>Portuguese (PT)</option>
                        <option>French (FR)</option>
                        <option>German (DE)</option>
                        <option>Japanese (JP)</option>
                    </select>
                </div>

                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><DollarSign size={20} /></div>
                        <div>
                            <h4>Default Currency</h4>
                            <p>Used for cost-of-living metrics, wallet & payouts</p>
                        </div>
                    </div>
                    <select
                        className="settings-select"
                        value={appPrefs.currency}
                        onChange={(e) => setAppPrefs({ ...appPrefs, currency: e.target.value })}
                    >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>IDR (Rp)</option>
                        <option>THB (฿)</option>
                        <option>JPY (¥)</option>
                    </select>
                </div>

                <div className="pref-card">
                    <div className="pref-info">
                        <div className="pref-icon"><Globe size={20} /></div>
                        <div>
                            <h4>Distance & Weather Units</h4>
                            <p>Measurement system for maps and flight routes</p>
                        </div>
                    </div>
                    <select
                        className="settings-select"
                        value={appPrefs.distanceUnit}
                        onChange={(e) => setAppPrefs({ ...appPrefs, distanceUnit: e.target.value })}
                    >
                        <option>Kilometers (km) • °C</option>
                        <option>Miles (mi) • °F</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="settings-section fade-in">
            <div className="profile-header-settings">
                <div className="avatar-container">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80"
                        alt="Alex Rivera"
                    />
                    <button
                        type="button"
                        className="btn-change-avatar"
                        onClick={() => addToast('Avatar upload dialog ready', 'info')}
                        aria-label="Change avatar"
                    >
                        <Camera size={15} />
                    </button>
                </div>
                <div className="profile-info-settings">
                    <div className="profile-name-badge-row">
                        <h2>{profileForm.fullName}</h2>
                        <span className="settings-verified-tag">
                            <Sparkles size={12} /> Elite Explorer • Lv. 12
                        </span>
                    </div>
                    <p>{profileForm.handle} • 14 Verified Passport Stamps</p>
                    <div className="profile-quick-links-row">
                        <button
                            type="button"
                            className="btn-settings-outline sm"
                            onClick={() => navigate('/user/profile')}
                        >
                            View Public Profile
                        </button>
                        <button
                            type="button"
                            className="btn-settings-outline sm"
                            onClick={() => navigate('/user/wallet')}
                        >
                            Manage Wallet
                        </button>
                    </div>
                </div>
            </div>

            <div className="settings-grid">
                <div className="input-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-with-icon">
                        <Mail size={16} />
                        <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label>Phone / WhatsApp</label>
                    <div className="input-with-icon">
                        <Phone size={16} />
                        <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label>Current Nomad Base</label>
                    <div className="input-with-icon">
                        <MapPin size={16} />
                        <input
                            type="text"
                            value={profileForm.currentBase}
                            onChange={(e) => setProfileForm({ ...profileForm, currentBase: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="input-group full-width">
                <label>Nomad Bio & Headline</label>
                <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                />
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="settings-section fade-in">
            <div className="settings-section-head">
                <div>
                    <span className="section-kicker">ALERTS & INBOX CHANNELS</span>
                    <h3>Notifications & Direct Messages</h3>
                    <p>Control which real-time alerts appear in your top navigation bar and email digest.</p>
                </div>
            </div>

            <div className="security-list">
                {[
                    {
                        key: 'directMessages',
                        title: 'Direct Messages & Creator Inbox',
                        desc: 'Instant top-bar badge and sound when nomads or clients message you'
                    },
                    {
                        key: 'creatorTips',
                        title: 'Earnings, Tips & Payout Updates',
                        desc: 'Alerts when you receive Nomad Coins, guide sales, or payout clearances'
                    },
                    {
                        key: 'visaAlerts',
                        title: 'Visa & Entry Requirement Changes',
                        desc: 'Critical consular alerts for destinations in your saved wishlist or active itinerary'
                    },
                    {
                        key: 'meetupInvites',
                        title: 'Local Meetups & Co-Working Pulses',
                        desc: 'Notifications when verified travelers host events in your current city'
                    },
                    {
                        key: 'weeklyDigest',
                        title: 'Weekly Nomad Intelligence Digest',
                        desc: 'Curated summary of trending hubs, flight deals, and community highlights'
                    }
                ].map((item) => {
                    const isOn = notifPrefs[item.key];
                    return (
                        <div key={item.key} className="security-item">
                            <div className="security-info">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isOn}
                                className={`toggle-switch ${isOn ? 'active' : ''}`}
                                onClick={() => setNotifPrefs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div className="settings-section fade-in">
            <div className="settings-section-head">
                <div>
                    <span className="section-kicker">ACCOUNT PROTECTION</span>
                    <h3>Login & Security</h3>
                    <p>Manage your credentials, two-factor authentication, and active travel sessions.</p>
                </div>
            </div>

            <div className="security-list">
                <div className="security-item">
                    <div className="security-info">
                        <h4>Password & Recovery Key</h4>
                        <p>Last updated 2 months ago • Recovery phrase backed up</p>
                    </div>
                    <button
                        type="button"
                        className="btn-settings-outline"
                        onClick={() => addToast('Password update link sent to seenomad@gmail.com', 'info')}
                    >
                        Update Password
                    </button>
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Two-Factor Authentication (2FA)</h4>
                        <p>Protect wallet payouts and account changes with authenticator verification</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={securityState.twoFactor}
                        className={`toggle-switch ${securityState.twoFactor ? 'active' : ''}`}
                        onClick={() => setSecurityState(s => ({ ...s, twoFactor: !s.twoFactor }))}
                    />
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Biometric Passkey Sign-In</h4>
                        <p>Use TouchID / FaceID for instant passwordless sign-in</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={securityState.biometricPasskey}
                        className={`toggle-switch ${securityState.biometricPasskey ? 'active' : ''}`}
                        onClick={() => setSecurityState(s => ({ ...s, biometricPasskey: !s.biometricPasskey }))}
                    />
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Active Devices & Sessions</h4>
                        <p>MacBook Pro (Lisbon, PT • Active now) • iPhone 16 Pro (Lisbon, PT)</p>
                    </div>
                    <button
                        type="button"
                        className="btn-settings-outline"
                        onClick={() => addToast('All other sessions have been signed out', 'success')}
                    >
                        Sign Out Others
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPrivacy = () => (
        <div className="settings-section fade-in">
            <div className="settings-section-head">
                <div>
                    <span className="section-kicker">DATA & VISIBILITY</span>
                    <h3>Privacy & Location Controls</h3>
                    <p>Choose who can view your live city base, passport stamps, and send you direct messages.</p>
                </div>
            </div>

            <div className="security-list">
                <div className="security-item">
                    <div className="security-info">
                        <h4>Show Live City Base on Profile</h4>
                        <p>Display "Lisbon, Portugal" to fellow verified nomads in the community</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={privacyPrefs.showLiveCity}
                        className={`toggle-switch ${privacyPrefs.showLiveCity ? 'active' : ''}`}
                        onClick={() => setPrivacyPrefs(p => ({ ...p, showLiveCity: !p.showLiveCity }))}
                    />
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Display Verified Passport Stamps</h4>
                        <p>Show your 14 country stamps and Schengen tracker achievements</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={privacyPrefs.showPassportStamps}
                        className={`toggle-switch ${privacyPrefs.showPassportStamps ? 'active' : ''}`}
                        onClick={() => setPrivacyPrefs(p => ({ ...p, showPassportStamps: !p.showPassportStamps }))}
                    />
                </div>
                <div className="security-item">
                    <div className="security-info">
                        <h4>Direct Message Permissions</h4>
                        <p>Control who can start a new conversation in your Messages inbox</p>
                    </div>
                    <select
                        className="settings-select compact"
                        value={privacyPrefs.allowDirectMessages}
                        onChange={(e) => setPrivacyPrefs({ ...privacyPrefs, allowDirectMessages: e.target.value })}
                    >
                        <option>Everyone</option>
                        <option>Verified Nomads Only</option>
                        <option>People I Follow</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`settings-page ${embedded ? 'embedded-mode' : ''} ${isVisible ? 'fade-in' : ''}`}>
            <header className="settings-header">
                <div className="header-content">
                    <div className="badge-settings">
                        <Smartphone size={14} />
                        <span>ACCOUNT, THEME & PREFERENCES</span>
                    </div>
                    <h1>Account <span className="gradient-text">Settings</span></h1>
                    <p>Manage your theme appearance, profile details, notifications, and security preferences.</p>
                </div>
                <div className="header-actions">
                    <button type="button" className="btn-save" onClick={handleSaveChanges}>
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </header>

            {/* Quick Account Hub Shortcuts Bar */}
            <div className="settings-account-shortcuts">
                <button type="button" className="account-shortcut-chip" onClick={() => navigate('/user/profile')}>
                    <User size={15} />
                    <span>My Profile</span>
                </button>
                <button type="button" className="account-shortcut-chip" onClick={() => navigate('/user/messages')}>
                    <MessageCircle size={15} />
                    <span>Messages</span>
                </button>
                <button type="button" className="account-shortcut-chip" onClick={() => navigate('/notifications')}>
                    <Bell size={15} />
                    <span>Notifications</span>
                </button>
                <button type="button" className="account-shortcut-chip" onClick={() => navigate('/user/wallet')}>
                    <Wallet size={15} />
                    <span>Wallet & Payouts</span>
                </button>
                <button type="button" className="account-shortcut-chip" onClick={() => navigate('/user/earnings')}>
                    <DollarSign size={15} />
                    <span>Earnings & Creator Tools</span>
                </button>
            </div>

            <div className="settings-container">
                <aside className="settings-sidebar">
                    <nav className="settings-nav" aria-label="Settings sections">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                <span className="settings-nav-icon">{tab.icon}</span>
                                <div className="settings-nav-text">
                                    <span className="settings-nav-label">{tab.label}</span>
                                    <span className="settings-nav-sub">{tab.sub}</span>
                                </div>
                                <ChevronRight size={16} className="chevron" />
                            </button>
                        ))}
                    </nav>

                    <div className="danger-zone">
                        <h3>Session & Account</h3>
                        <button
                            type="button"
                            className="btn-danger"
                            onClick={() => addToast('Signed out of current session', 'info')}
                        >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                        <button
                            type="button"
                            className="btn-danger outline"
                            onClick={() => addToast('Account deletion requires 2FA confirmation', 'warning')}
                        >
                            <Trash2 size={16} />
                            <span>Deactivate Account</span>
                        </button>
                    </div>
                </aside>

                <main className="settings-main">
                    <div className="settings-card">
                        {activeTab === 'preferences' && renderPreferences()}
                        {activeTab === 'profile' && renderProfile()}
                        {activeTab === 'notifications' && renderNotifications()}
                        {activeTab === 'security' && renderSecurity()}
                        {activeTab === 'privacy' && renderPrivacy()}
                    </div>

                    <div className="settings-footer-note">
                        <Eye size={16} />
                        <span>
                            Your profile visibility is set to <strong>{privacyPrefs.profileVisibility}</strong>. You can adjust location & stamp sharing in the{' '}
                            <button
                                type="button"
                                className="inline-link-btn"
                                onClick={() => handleTabChange('privacy')}
                            >
                                Privacy & Visibility
                            </button>{' '}
                            tab.
                        </span>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
