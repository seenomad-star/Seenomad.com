import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import SavedDestinationsHub from '../Saved/SavedDestinationsHub';
import SavedVibesVault from './components/SavedVibesVault';
import ViralShareModal from '../Growth/components/ViralShareModal';
import Messaging from '../Community/components/Messaging';
import NotificationCenter from '../Notifications/NotificationCenter';
import CreatorTools from '../CreatorStudio/components/CreatorTools';
import Settings from '../Settings';
import '../../styles/UserHub.css';

const UserHub = () => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const location = useLocation();
    const isStandaloneTripPage =
        location.pathname.includes('/travel-journey') ||
        location.pathname.includes('/offers') ||
        location.pathname.includes('/favorites') ||
        location.pathname.includes('/saved-vibes');

    return (
        <div
            className={`user-hub-page ${isStandaloneTripPage ? 'user-hub-page--standalone' : ''}`}
            style={{ position: 'relative' }}
        >
            {!isStandaloneTripPage && <UserHubSidebar />}
            <main className={`user-hub-content ${isStandaloneTripPage ? 'user-hub-content--standalone' : ''}`}>
                {!isStandaloneTripPage && (
                    <div className="hub-top-actions">
                        <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="hub-share-profile-btn"
                        >
                            <Share2 size={16} /> Share Profile
                        </button>
                    </div>
                )}
                <ViralShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

                <Routes>
                    <Route path="/" element={<Navigate to="profile" replace />} />
                    <Route path="wallet/*" element={<WalletModule />} />
                    <Route path="earnings" element={<CreatorTools />} />
                    <Route path="messages" element={<Messaging />} />
                    <Route path="notifications" element={<NotificationCenter />} />
                    <Route path="settings" element={<Settings embedded />} />
                    <Route path="profile" element={<NomadProfile />} />
                    <Route path="saved-vibes" element={<SavedVibesVault />} />
                    <Route path="favorites" element={<SavedDestinationsHub />} />
                    <Route path="saved" element={<SavedDestinationsHub />} />
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
