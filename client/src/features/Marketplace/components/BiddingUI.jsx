import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, User, DollarSign, 
    Star, Shield, Send, 
    ArrowLeft, CheckCircle2, XCircle,
    Truck, Utensils, Hotel, Camera
} from 'lucide-react';

const BiddingUI = ({ job, onBack, role = "CLIENT" }) => {
    const [isBidding, setIsBidding] = useState(false);
    const [bidSuccess, setBidSuccess] = useState(false);

    const mockBids = [
        { id: 'B001', agency: 'Panorama Voyages', price: 'Rp 420M', score: 4.9, inclusives: ['Bus', 'Hotel 4*', 'F&B', 'Documentation'], recommended: true },
        { id: 'B002', agency: 'Golden Rama', price: 'Rp 445M', score: 4.7, inclusives: ['Bus', 'Hotel 5*', 'F&B Full Board'], recommended: false },
        { id: 'B003', agency: 'Dwidaya Tour', price: 'Rp 410M', score: 4.5, inclusives: ['Bus', 'Hotel 3*', 'F&B'], recommended: false }
    ];

    const submitBid = () => {
        setIsBidding(true);
        setTimeout(() => {
            setIsBidding(false);
            setBidSuccess(true);
        }, 1500);
    };

    return (
        <div className="bidding-ui-container">
            <header className="bidding-header">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                    <span>Back to Board</span>
                </button>
                <div className="job-title-pill">
                    <strong>{job.title}</strong>
                    <span>{job.org}</span>
                </div>
            </header>

            <div className="bidding-grid">
                <aside className="job-summary">
                    <div className="section-title">Trip Requirements</div>
                    <div className="summary-card">
                        <div className="s-row"><span>Destination</span><strong>{job.destination}</strong></div>
                        <div className="s-row"><span>Total Pax</span><strong>{job.pax}</strong></div>
                        <div className="s-row"><span>Budget Limit</span><strong>{job.budget}</strong></div>
                        <div className="s-row"><span>Trip Date</span><strong>{job.date}</strong></div>
                    </div>

                    <div className="section-title">Requested Services</div>
                    <div className="services-grid">
                        <div className="s-item"><Truck size={14} /><span>Transport</span></div>
                        <div className="s-item"><Hotel size={14} /><span>Accommodation</span></div>
                        <div className="s-item"><Utensils size={14} /><span>Catering</span></div>
                        <div className="s-item"><Camera size={14} /><span>Documentation</span></div>
                    </div>
                </aside>

                <main className="bids-section">
                    <div className="section-title">
                        {role === "CLIENT" ? `Current Bids (${mockBids.length})` : "Submit Your Bid"}
                    </div>

                    {role === "CLIENT" ? (
                        <div className="bids-stack">
                            {mockBids.map(bid => (
                                <motion.div 
                                    key={bid.id}
                                    whileHover={{ x: 5 }}
                                    className={`bid-card ${bid.recommended ? 'recommended' : ''}`}
                                >
                                    {bid.recommended && <div className="rec-badge"><Star size={12} /> Best Value</div>}
                                    <div className="bid-main">
                                        <div className="bid-agency">
                                            <h4>{bid.agency}</h4>
                                            <div className="agency-rating"><Star size={12} fill="#F59E0B" color="#F59E0B" /> {bid.score}</div>
                                        </div>
                                        <div className="bid-price">{bid.price}</div>
                                    </div>
                                    <div className="bid-inclusives">
                                        {bid.inclusives.map((inc, i) => <span key={i} className="inc-tag">{inc}</span>)}
                                    </div>
                                    <div className="bid-footer">
                                        <button className="reject-btn"><XCircle size={16} /> Reject</button>
                                        <button className="accept-btn"><CheckCircle2 size={16} /> Accept Proposal</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="agency-bid-form">
                            {!bidSuccess ? (
                                <div className="bid-form-card">
                                    <div className="form-group">
                                        <label>Your Proposed Price</label>
                                        <div className="price-input">
                                            <span>Rp</span>
                                            <input type="text" placeholder="400,000,000" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Cover Letter / Highlights</label>
                                        <textarea placeholder="Describe why your agency is the best fit..."></textarea>
                                    </div>
                                    <button 
                                        className={`submit-bid-btn ${isBidding ? 'loading' : ''}`}
                                        disabled={isBidding}
                                        onClick={submitBid}
                                    >
                                        {isBidding ? "Submitting Bid..." : "Submit Proposal"}
                                        {!isBidding && <Send size={18} />}
                                    </button>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bid-success-card"
                                >
                                    <div className="success-icon"><Shield size={48} /></div>
                                    <h3>Proposal Submitted!</h3>
                                    <p>Your bid has been sent to {job.org}. They will review it and notify you via the Agency Dashboard.</p>
                                    <button className="done-btn" onClick={onBack}>Return to Board</button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BiddingUI;
