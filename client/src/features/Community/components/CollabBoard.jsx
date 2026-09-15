import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Briefcase, Zap, Target } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import CollabProjectCard from './CollabProjectCard';
import PostProjectModal from './PostProjectModal';
import './CollabBoard.css';

const CollabBoard = () => {
    const { collaborationProjects } = useNomadOSStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial dummy data if store is empty
    const dummyProjects = [
        {
            id: 1,
            title: "Bali Surf Shack App",
            description: "Building a booking engine for local surf instructors in Canggu. Need a React developer.",
            category: "Tech & Dev",
            roles: "Fullstack Developer",
            skills: "React, Firebase",
            budget: "$2,500",
            timeline: "2 Months"
        },
        {
            id: 2,
            title: "Lisbon Digital Nomad Guide",
            description: "Creating a video-first guide for nomads moving to Portugal. Looking for a video editor.",
            category: "Content",
            roles: "Video Editor",
            skills: "Premiere Pro, CapCut",
            budget: "$50/hr",
            timeline: "Ongoing"
        }
    ];

    const displayProjects = collaborationProjects.length > 0 
        ? [...collaborationProjects, ...dummyProjects] 
        : dummyProjects;

    return (
        <div className="collab-board-container">
            <div className="board-header">
                <div className="header-info">
                    <h1>Collaboration Board</h1>
                    <p>Connect, contribute, and earn with nomads worldwide.</p>
                </div>
                <button className="post-trigger-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    <span>Post Project</span>
                </button>
            </div>

            <div className="board-filters-row">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search projects, skills, or roles..." />
                </div>
                <div className="filter-actions">
                    <button className="filter-pill active">All Projects</button>
                    <button className="filter-pill">Paid</button>
                    <button className="filter-pill">Partnership</button>
                    <button className="filter-pill">Bounty</button>
                </div>
            </div>

            <div className="projects-grid">
                {displayProjects.map(project => (
                    <CollabProjectCard key={project.id} project={project} />
                ))}
            </div>

            <PostProjectModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default CollabBoard;
