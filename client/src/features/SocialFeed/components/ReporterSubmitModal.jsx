import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Radio, AlertTriangle, Info, Tag, Coins } from 'lucide-react';
import '../styles/ReporterSubmitModal.css';

const ReporterSubmitModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Alert',
        description: '',
        location: 'Current Location'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to the backend
        console.log('Submitting report:', formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div 
                        className="reporter-modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <div className="modal-header">
                            <div className="header-title">
                                <Radio size={20} className="pulse-icon" />
                                <h3>Broadcast Local News</h3>
                            </div>
                            <button className="close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="earning-incentive-banner">
                            <Coins size={16} />
                            <span>Earn 0.1 NMD for every community verification!</span>
                        </div>

                        <form onSubmit={handleSubmit} className="reporter-form">
                            <div className="form-group">
                                <label><Tag size={14} /> Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Fiber Cut on Jalan Canggu"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label><AlertTriangle size={14} /> Category</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    <option>Alert</option>
                                    <option>Event</option>
                                    <option>Deal</option>
                                    <option>Info</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label><Info size={14} /> Description</label>
                                <textarea 
                                    placeholder="Provide more details about the report..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="modal-footer">
                                <span className="location-pill">📍 {formData.location}</span>
                                <button type="submit" className="submit-btn">
                                    <span>Broadcast Signal</span>
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReporterSubmitModal;
