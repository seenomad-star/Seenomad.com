import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Target, Users, DollarSign, Sparkles } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import './PostProjectModal.css';

const PostProjectModal = ({ isOpen, onClose }) => {
    const { addProject } = useNomadOSStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Tech & Dev',
        roles: '',
        skills: '',
        budget: '',
        timeline: ''
    });

    const categories = ['Tech & Dev', 'Design', 'Marketing', 'Content', 'Events', 'Other'];

    if (!isOpen) return null;

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = () => {
        addProject(formData);
        onClose();
        // Reset state
        setStep(1);
        setFormData({
            title: '',
            description: '',
            category: 'Tech & Dev',
            roles: '',
            skills: '',
            budget: '',
            timeline: ''
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Project Basics</h3>
                        <p className="step-desc">Tell us what you're building.</p>
                        <div className="input-field">
                            <label>Project Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. AI-Powered Travel Assistant" 
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                        <div className="input-field">
                            <label>Description</label>
                            <textarea 
                                placeholder="What is the goal of this project?" 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                        <div className="input-field">
                            <label>Category</label>
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Team & Skills</h3>
                        <p className="step-desc">Who are you looking for?</p>
                        <div className="input-field">
                            <label>Roles Needed</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Lead Designer, Backend Dev" 
                                value={formData.roles}
                                onChange={(e) => setFormData({...formData, roles: e.target.value})}
                            />
                        </div>
                        <div className="input-field">
                            <label>Required Skills</label>
                            <input 
                                type="text" 
                                placeholder="e.g. React, Node.js, Figma" 
                                value={formData.skills}
                                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                            />
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Terms & Budget</h3>
                        <p className="step-desc">Finalize the project details.</p>
                        <div className="input-field">
                            <label>Budget Range</label>
                            <input 
                                type="text" 
                                placeholder="e.g. $2k - $5k or $50/hr" 
                                value={formData.budget}
                                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            />
                        </div>
                        <div className="input-field">
                            <label>Estimated Timeline</label>
                            <input 
                                type="text" 
                                placeholder="e.g. 3 Months, Recurring" 
                                value={formData.timeline}
                                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                            />
                        </div>
                        <div className="submission-summary">
                            <div className="summary-item">
                                <Sparkles size={16} />
                                <span>Posting this project will boost your visibility by 15%.</span>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div 
                    className="modal-content-project"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <div className="header-title-group">
                            <div className="icon-badge">
                                <Target size={20} className="text-blue" />
                            </div>
                            <h2>Post New Project</h2>
                        </div>
                        <button className="close-btn" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="modal-progress">
                        <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}><Check size={10} /></div>
                        <div className={`progress-line ${step >= 2 ? 'active' : ''}`} />
                        <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}>{step > 2 ? <Check size={10} /> : '2'}</div>
                        <div className={`progress-line ${step >= 3 ? 'active' : ''}`} />
                        <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}>{step > 3 ? <Check size={10} /> : '3'}</div>
                    </div>

                    <div className="modal-body">
                        {renderStep()}
                    </div>

                    <div className="modal-actions-form">
                        {step > 1 && (
                            <button className="btn-back" onClick={handleBack}>
                                <ChevronLeft size={18} />
                                <span>Back</span>
                            </button>
                        )}
                        <div style={{ flex: 1 }} />
                        {step < 3 ? (
                            <button className="btn-next" onClick={handleNext}>
                                <span>Next Step</span>
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className="btn-submit-project" onClick={handleSubmit}>
                                <span>Post Project</span>
                                <Check size={18} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PostProjectModal;
