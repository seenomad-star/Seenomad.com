import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import UserHubSidebar from './components/UserHubSidebar';
import WalletModule from '../Wallet';
import Offers from './components/Offers';
import Achievements from './components/Achievements';
import Hunts from './components/Hunts';
import FlashMissions from './components/FlashMissions';
import XPTracker from './components/XPTracker';
import NomadProfile from './components/NomadProfile';
import NomadGigs from './components/NomadGigs';
import NomadJobBoard from './components/NomadJobBoard';
import BudgetTracker from './components/BudgetTracker';
import ReferralHub from './components/ReferralHub';
import DopamineDashboard from './components/DopamineDashboard';
import TravelMap from './components/TravelMap';
import ViralShareModal from '../Growth/components/ViralShareModal';
import '../../styles/UserHub.css';

const UserHub = () => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <div className="user-hub-page" style={{position: 'relative'}}>
            <UserHubSidebar />
            <main className="user-hub-content">
                <div className="hub-top-actions" style={{position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 50}}>
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        style={{background: 'linear-gradient(135deg, #A855F7, #EC4899)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 8px 15px rgba(168, 85, 247, 0.3)'}}
                    >
                        <Share2 size={16} /> Share Profile
                    </button>
                </div>
                <ViralShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

                <Routes>
                    <Route path="/" element={<Navigate to="wallet" replace />} />
                    <Route path="wallet/*" element={<WalletModule />} />
                    <Route path="profile" element={<NomadProfile />} />
                    <Route path="budget" element={<BudgetTracker />} />
                    <Route path="referrals" element={<ReferralHub />} />
                    <Route path="impact" element={<DopamineDashboard />} />
                    <Route path="gigs" element={<NomadJobBoard />} />
                    <Route path="offers" element={<Offers />} />
                    <Route path="achievements" element={<Achievements />} />
                    <Route path="hunts" element={<Hunts />} />
                    <Route path="flash-missions" element={<FlashMissions />} />
                    <Route path="xp-tracker" element={<XPTracker />} />
                    <Route path="travel-journey" element={<TravelMap />} />
                    <Route path="*" element={<div>Select an item from the sidebar</div>} />
                </Routes>
            </main>
        </div>
    );
};

export default UserHub;
