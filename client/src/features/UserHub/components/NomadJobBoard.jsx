import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Briefcase, MapPin, DollarSign, Clock, Filter, 
    Search, Zap, Star, Layout, Users, ChevronRight, CheckCircle
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const NomadJobBoard = () => {
    const { addXP } = useNomadOSStore();
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Senior Product Designer",
            company: "Web3 Nomad Lab",
            location: "Remote (Based in Bali/Lisbon)",
            salary: "$80k - $120k",
            type: "Full-time",
            tags: ["React", "UX", "Web3"],
            matching: 92,
            isApplied: false
        },
        {
            id: 2,
            title: "Community Manager",
            company: "Selina Coliving",
            location: "Medellin, Colombia",
            salary: "$2.5k / mo + Free Stay",
            type: "Contract",
            tags: ["Social Media", "Events", "Spanish"],
            matching: 85,
            isApplied: false
        },
        {
            id: 3,
            title: "House Sitter & Dev",
            company: "Global Travel Club",
            location: "Tuscany, Italy",
            salary: "Free Villa + $1k stipend",
            type: "Part-time",
            tags: ["Python", "Home Security", "Gardening"],
            matching: 70,
            isApplied: false
        }
    ]);

    const handleApply = (id) => {
        setJobs(jobs.map(j => {
            if (j.id === id) {
                if (!j.isApplied) {
                    window.dispatchEvent(new CustomEvent('add-toast', { 
                        detail: { message: 'Application sent! +100 XP 📄', type: 'success' } 
                    }));
                    addXP(100);
                }
                return { ...j, isApplied: true };
            }
            return j;
        }));
    };

    return (
        <div className="job-board-container">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Professional Gigs & Careers</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Remote-first roles for the nomad community</p>
                </div>
                <div className="job-stats-mini">
                    <div className="job-stat"><Users size={14} /> <span>124 Hired</span></div>
                    <div className="job-stat"><Layout size={14} /> <span>42 Openings</span></div>
                </div>
            </div>

            <div className="job-search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search roles, companies, or skills..." />
                <button className="filter-job-btn"><Filter size={16} /></button>
            </div>

            <div className="job-list">
                {jobs.map(job => (
                    <motion.div 
                        key={job.id} 
                        className="job-card"
                        whileHover={{ y: -4, borderColor: 'var(--cc-primary)' }}
                    >
                        <div className="job-card-top">
                            <div className="job-company-logo">
                                {job.company.substring(0, 1)}
                            </div>
                            <div className="job-title-area">
                                <h4>{job.title}</h4>
                                <span className="job-company-name">{job.company}</span>
                            </div>
                            <div className="job-match-badge">
                                <Zap size={10} fill="currentColor" />
                                <span>{job.matching}% Match</span>
                            </div>
                        </div>

                        <div className="job-meta-grid">
                            <div className="job-meta-item"><MapPin size={14} /> <span>{job.location}</span></div>
                            <div className="job-meta-item"><DollarSign size={14} /> <span>{job.salary}</span></div>
                            <div className="job-meta-item"><Clock size={14} /> <span>{job.type}</span></div>
                        </div>

                        <div className="job-tags">
                            {job.tags.map((t, i) => <span key={i} className="job-tag">{t}</span>)}
                        </div>

                        <div className="job-footer">
                            <button 
                                className={`job-apply-btn ${job.isApplied ? 'applied' : ''}`}
                                onClick={() => handleApply(job.id)}
                            >
                                {job.isApplied ? (
                                    <><CheckCircle size={16} /> Applied</>
                                ) : (
                                    <>Apply Now</>
                                )}
                            </button>
                            <button className="job-save-btn"><Star size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="fvw-view-all-btn" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                <span>Access Full Nomad Talent Network</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default NomadJobBoard;
