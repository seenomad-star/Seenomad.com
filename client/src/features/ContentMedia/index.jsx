import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
    Camera,
    Mic,
    GraduationCap,
    Brain,
    LayoutGrid,
    Calendar
} from 'lucide-react';
import PhotographyHub from './PhotographyHub';
import PodcastsHub from './PodcastsHub';
import TravelQuizHub from './TravelQuizHub';
import PostTemplatesHub from './PostTemplatesHub';
import ContentCalendarHub from './ContentCalendarHub';
import LearningVoluntourism from '../LearningVoluntourism';
import '../../styles/ContentMedia.css';

const ContentMedia = () => {
    const mediaTabs = [
        { id: 'photography', label: 'Photography', to: '/content-media/photography', icon: Camera },
        { id: 'podcasts', label: 'Podcasts', to: '/content-media/podcasts', icon: Mic },
        { id: 'learning', label: 'Learning', to: '/content-media/learning', icon: GraduationCap },
        { id: 'travel-quiz', label: 'Travel Quiz', to: '/content-media/travel-quiz', icon: Brain },
        { id: 'post-templates', label: 'Post Templates', to: '/content-media/post-templates', icon: LayoutGrid },
        { id: 'content-calendar', label: 'Content Calendar', to: '/content-media/content-calendar', icon: Calendar }
    ];

    return (
        <div className="content-media-page">
            {/* Top Sub-Navigation Strip */}
            <div className="cm-subnav-bar">
                <nav className="cm-subnav-scroll" aria-label="Content and Media navigation">
                    {mediaTabs.map((tab) => {
                        const IconComp = tab.icon;
                        return (
                            <NavLink
                                key={tab.id}
                                to={tab.to}
                                className={({ isActive }) => `cm-subnav-pill ${isActive ? 'active' : ''}`}
                            >
                                <IconComp size={15} />
                                <span>{tab.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            <div className="cm-main-stage">
                <Routes>
                    <Route path="/" element={<Navigate to="photography" replace />} />
                    <Route path="photography" element={<PhotographyHub />} />
                    <Route path="podcasts" element={<PodcastsHub />} />
                    <Route path="learning/*" element={<LearningVoluntourism />} />
                    <Route path="travel-quiz" element={<TravelQuizHub />} />
                    <Route path="post-templates" element={<PostTemplatesHub />} />
                    <Route path="content-calendar" element={<ContentCalendarHub />} />
                    <Route path="*" element={<Navigate to="photography" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ContentMedia;
