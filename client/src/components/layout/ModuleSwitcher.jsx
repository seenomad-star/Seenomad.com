import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../../store/navStore';
import {
    Home, Compass, Users, Play, Calendar,
    Briefcase, GraduationCap, BarChart3, Download,
    Settings, ShieldCheck, HelpCircle
} from 'lucide-react';

const ModuleSwitcher = () => {
    const { isModuleSwitcherOpen, toggleModuleSwitcher, setActiveModule } = useNavStore();

    if (!isModuleSwitcherOpen) return null;

    const modules = [
        { name: 'Home', icon: <Home />, color: '#3b82f6' },
        { name: 'Explore', icon: <Compass />, color: '#10b981' },
        { name: 'Popular', icon: <Flame />, color: '#ef4444' },
        { name: 'Community', icon: <Users />, color: '#8b5cf6' },
        { name: 'Games', icon: <Play />, color: '#f59e0b' },
        { name: 'Events', icon: <Calendar />, color: '#ec4899' },
        { name: 'Business', icon: <Briefcase />, color: '#6366f1' },
        { name: 'Learning', icon: <GraduationCap />, color: '#14b8a6' },
        { name: 'Analytics', icon: <BarChart3 />, color: '#f97316' },
        { name: 'Download', icon: <Download />, color: '#06b6d4' },
        { name: 'Settings', icon: <Settings />, color: '#64748b' },
        { name: 'Legal', icon: <ShieldCheck />, color: '#475569' }
    ];

    const handleModuleClick = (name) => {
        setActiveModule(name);
        toggleModuleSwitcher(false);
    };

    return (
        <>
            <div className="module-overlay" onClick={() => toggleModuleSwitcher(false)} />
            <motion.div
                className="module-switcher-v3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <div className="switcher-header">
                    <h3>Seenomad Modules</h3>
                    <p>Switch between your travel tools</p>
                </div>
                <div className="module-grid">
                    {modules.map((mod, idx) => (
                        <div
                            key={idx}
                            className="module-card"
                            onClick={() => handleModuleClick(mod.name)}
                        >
                            <div className="module-icon-box" style={{ backgroundColor: `${mod.color}15`, color: mod.color }}>
                                {mod.icon}
                            </div>
                            <span className="module-name">{mod.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

// Helper for the missing Flame icon in the list
const Flame = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);

export default ModuleSwitcher;
