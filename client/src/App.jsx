import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SocialFeed from './features/SocialFeed';
import PopularFeed from './components/PopularFeed';
import Explore from './features/Explore';
import TravelGames from './features/TravelGames';
import BusinessPartner from './features/BusinessPartner';
import LearningVoluntourism from './features/LearningVoluntourism';
import EventFestival from './features/EventFestival';
import SupportUtility from './features/SupportUtility';
import InsightsAnalytics from './features/InsightsAnalytics';
import DownloadApp from './features/DownloadApp';
import PartnerWithUs from './features/PartnerWithUs';
import About from './features/About';
import LegalPolicy from './features/LegalPolicy';
import Settings from './features/Settings';
import UserHub from './features/UserHub';
import AIAgents from './features/AIAgents';
import PageTitle from './components/common/PageTitle';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import NotificationCenter from './features/Notifications/NotificationCenter';

// Lazy load heavy features
const Community = lazy(() => import('./features/Community'));
const CreatorStudio = lazy(() => import('./features/CreatorStudio'));

function App() {
  return (
    <ErrorBoundary>
      <PageTitle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SocialFeed />} />
          <Route path="/popular" element={<PopularFeed />} />
          <Route path="/explore/*" element={<Explore />} />
          <Route path="/ai-agents/*" element={<AIAgents />} />
          <Route path="/travel-games/*" element={<TravelGames />} />

          <Route path="/community/*" element={
            <Suspense fallback={<PageLoader />}>
              <Community />
            </Suspense>
          } />

          <Route path="/creator-studio/*" element={
            <Suspense fallback={<PageLoader />}>
              <CreatorStudio />
            </Suspense>
          } />

          <Route path="/business-partner/*" element={<BusinessPartner />} />
          <Route path="/learning-voluntourism/*" element={<LearningVoluntourism />} />
          <Route path="/event-festival/*" element={<EventFestival />} />
          <Route path="/support-utility/*" element={<SupportUtility />} />
          <Route path="/insights-analytics/*" element={<InsightsAnalytics />} />
          <Route path="/download-app" element={<DownloadApp />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<LegalPolicy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/*" element={<UserHub />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
