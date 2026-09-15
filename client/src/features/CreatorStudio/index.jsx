import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Layout,
    BarChart2,
    DollarSign,
    Shield,
    Settings,
    Video,
    Edit
} from 'lucide-react';
import ModuleNavbar from '../../components/common/ModuleNavbar';
import CreatorTools from './components/CreatorTools';
import Moderation from './components/Moderation';
// Placeholder components for new features
const Dashboard = () => <div className="p-8 text-center"><h2>Creator Dashboard</h2><p>Overview of your performance</p></div>;
const Analytics = () => <div className="p-8 text-center"><h2>Analytics</h2><p>Deep dive into your stats</p></div>;
const Monetization = () => <div className="p-8 text-center"><h2>Monetization</h2><p>Manage your earnings</p></div>;

const CreatorStudio = () => {
    const navItems = [
        'Dashboard',
        'Content Manager',
        'Analytics',
        'Monetization',
        'Moderation',
        'Settings'
    ];

    return (
        <div className="creator-studio-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="cs-header" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layout className="text-blue-500" /> Creator Studio
                </h1>
                <p className="text-gray-400">Manage your content, grow your audience, and earn money.</p>
            </div>

            <ModuleNavbar items={navItems} basePath="/creator-studio" />

            <div className="cs-content" style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', minHeight: '500px' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="content-manager" element={<CreatorTools />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="monetization" element={<Monetization />} />
                    <Route path="moderation" element={<Moderation />} />
                    <Route path="settings" element={<div className="p-8">Settings Placeholder</div>} />
                </Routes>
            </div>
        </div>
    );
};

export default CreatorStudio;
