import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Search, Filter, 
    Calendar, Users, MapPin, 
    FileText, Tag, Briefcase,
    ChevronRight, CheckCircle2, Clock
} from 'lucide-react';
import BiddingUI from './BiddingUI';

const JobBoard = ({ mode = "POST" }) => {
    const [isPosting, setIsPosting] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const mockJobs = [
        { id: 'J001', title: 'UI University Field Trip 2026', org: 'University of Indonesia', destination: 'Bali', pax: 120, budget: 'Rp 450M', status: 'BIDDING', bids: 4, date: 'June 12, 2026' },
        { id: 'J002', title: 'Government Study Tour', org: 'Ministry of Tourism', destination: 'Yogyakarta', pax: 50, budget: 'Rp 180M', status: 'OPEN', bids: 0, date: 'Aug 05, 2026' },
        { id: 'J003', title: 'High School Graduation Trip', org: 'SMA 1 Jakarta', destination: 'Malang', pax: 200, budget: 'Rp 650M', status: 'BIDS_LOCKED', bids: 12, date: 'May 20, 2026' }
    ];

    if (selectedJob) return <BiddingUI job={selectedJob} onBack={() => setSelectedJob(null)} role={mode === "POST" ? "CLIENT" : "AGENCY"} />;

    return (
        <div className="job-board-container">
            <div className="board-header">
                <div className="header-info">
                    <h2>{mode === "POST" ? "Trip Request Board" : "Available Trip Tenders"}</h2>
                    <p>{mode === "POST" ? "Post your trip requirements and receive agency bids." : "Find institutional trip requests and submit your best proposals."}</p>
                </div>
                {mode === "POST" && (
                    <button className="post-trip-btn" onClick={() => setIsPosting(true)}>
                        <Plus size={18} />
                        <span>Post New Trip</span>
                    </button>
                )}
            </div>

            <div className="board-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search by destination or institution..." />
                </div>
                <div className="filter-group">
                    <button className="filter-pill active">All Jobs</button>
                    <button className="filter-pill">Bidding Open</button>
                    <button className="filter-pill">High Budget</button>
                </div>
            </div>

            <div className="jobs-list">
                {mockJobs.map(job => (
                    <motion.div 
                        key={job.id}
                        whileHover={{ x: 5 }}
                        className="job-row"
                        onClick={() => setSelectedJob(job)}
                    >
                        <div className="job-main-info">
                            <div className="job-icon">
                                <Briefcase size={20} />
                            </div>
                            <div className="job-details">
                                <h3>{job.title}</h3>
                                <span className="org-name">{job.org}</span>
                            </div>
                        </div>

                        <div className="job-meta-grid">
                            <div className="meta-item">
                                <MapPin size={14} />
                                <span>{job.destination}</span>
                            </div>
                            <div className="meta-item">
                                <Users size={14} />
                                <span>{job.pax} People</span>
                            </div>
                            <div className="meta-item">
                                <Calendar size={14} />
                                <span>{job.date}</span>
                            </div>
                        </div>

                        <div className="job-status-group">
                            <div className="job-budget">{job.budget}</div>
                            <div className="bid-count">{job.bids} Bids Submitted</div>
                            <div className={`status-badge ${job.status.toLowerCase()}`}>
                                {job.status === 'BIDDING' && <Clock size={12} />}
                                {job.status === 'OPEN' && <Plus size={12} />}
                                {job.status === 'BIDS_LOCKED' && <CheckCircle2 size={12} />}
                                <span>{job.status}</span>
                            </div>
                        </div>

                        <div className="job-action">
                            <ChevronRight size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isPosting && (
                    <div className="post-modal-overlay">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="post-modal"
                        >
                            <h2>Post a New Trip Request</h2>
                            <form className="post-form">
                                <div className="form-group">
                                    <label>Trip Title</label>
                                    <input type="text" placeholder="e.g. University Field Trip 2026" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Destination</label>
                                        <input type="text" placeholder="Bali, Japan, etc." />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Pax</label>
                                        <input type="number" placeholder="Number of travelers" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Allocated Budget (Estimated)</label>
                                    <input type="text" placeholder="e.g. 500,000,000 IDR" />
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="cancel-btn" onClick={() => setIsPosting(false)}>Cancel</button>
                                    <button type="button" className="submit-btn" onClick={() => setIsPosting(false)}>Publish Request</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobBoard;
