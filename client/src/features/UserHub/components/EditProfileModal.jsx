import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Check, Globe, MapPin, Briefcase, Link, Sparkles, User } from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import './EditProfileModal.css';

const COVER_OPTIONS = [
    { id: 'delhi', label: 'Delhi Heritage', url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80' },
    { id: 'lisbon', label: 'Lisbon Sunset', url: 'https://images.unsplash.com/photo-1585211756843-dc3828965111?w=1200&auto=format&fit=crop&q=80' },
    { id: 'bali', label: 'Bali Tropical', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80' },
    { id: 'tokyo', label: 'Tokyo Skyline', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80' },
    { id: 'alps', label: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&auto=format&fit=crop&q=80' }
];

const AVATAR_OPTIONS = [
    { id: 'avatar1', label: 'Alex (Default)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
    { id: 'avatar2', label: 'Urban Nomad', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80' },
    { id: 'avatar3', label: 'Remote Dev', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
    { id: 'avatar4', label: 'Creator', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80' },
    { id: 'avatar5', label: 'Solo Explorer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' }
];

const AVAILABILITY_STATUSES = [
    { id: 'available_work', label: 'Available for Remote Gigs & Hire', color: '#22c55e', emoji: '💼' },
    { id: 'available_meet', label: 'Open for Local Nomad Meetups & Coffee', color: '#38bdf8', emoji: '☕' },
    { id: 'deep_focus', label: 'Deep Focus Mode / Do Not Disturb', color: '#f59e0b', emoji: '🎧' },
    { id: 'traveling', label: 'In Transit / Exploring New Base', color: '#a855f7', emoji: '✈️' }
];

const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }) => {
    const { addToast } = useToastStore();
    const [formData, setFormData] = useState({
        name: currentProfile?.name || 'Alex Rivera',
        title: currentProfile?.title || 'Senior Full Stack Developer & Digital Nomad',
        bio: currentProfile?.bio || 'Building web applications across European & Asian coworking spaces. Street photographer, specialty coffee enthusiast, and slow traveler.',
        location: currentProfile?.location || 'Lisbon, Portugal',
        statusKey: currentProfile?.statusKey || 'available_meet',
        statusMessage: currentProfile?.statusMessage || 'Coding from Cowork Lisbon · Open for coffee',
        website: currentProfile?.website || 'https://alexrivera.dev',
        twitter: currentProfile?.twitter || '@alexriveranomad',
        github: currentProfile?.github || 'alexrivera-nomad',
        coverUrl: currentProfile?.coverUrl || COVER_OPTIONS[0].url,
        avatarUrl: currentProfile?.avatarUrl || AVATAR_OPTIONS[0].url
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        addToast('Profile updated successfully!', 'success');
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="edit-profile-backdrop" onClick={onClose} role="dialog" aria-modal="true">
                <motion.div 
                    className="edit-profile-modal"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="edit-profile-header">
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-amber-500" />
                            <h2 className="edit-profile-title">Edit Nomad Profile</h2>
                        </div>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="edit-profile-close-btn"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="edit-profile-form">
                        {/* Cover Image Selector */}
                        <div className="form-group">
                            <label className="form-label">Cover Banner Panorama</label>
                            <div className="cover-preview-rail">
                                {COVER_OPTIONS.map((c) => (
                                    <div 
                                        key={c.id} 
                                        className={`cover-thumb-wrap ${formData.coverUrl === c.url ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, coverUrl: c.url })}
                                    >
                                        <img src={c.url} alt={c.label} className="cover-thumb-img" />
                                        <span className="cover-thumb-label">{c.label}</span>
                                        {formData.coverUrl === c.url && <Check size={14} className="cover-check-icon" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Avatar Image Selector */}
                        <div className="form-group">
                            <label className="form-label">Nomad Avatar Photo</label>
                            <div className="avatar-preview-rail">
                                {AVATAR_OPTIONS.map((a) => (
                                    <div 
                                        key={a.id} 
                                        className={`avatar-thumb-wrap ${formData.avatarUrl === a.url ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, avatarUrl: a.url })}
                                    >
                                        <img src={a.url} alt={a.label} className="avatar-thumb-img" />
                                        {formData.avatarUrl === a.url && <Check size={12} className="avatar-check-icon" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Name and Professional Title */}
                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label" htmlFor="profile-name">Full Name</label>
                                <input
                                    id="profile-name"
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="profile-location">Current Base / City</label>
                                <div className="input-with-icon">
                                    <MapPin size={16} className="field-icon" />
                                    <input
                                        id="profile-location"
                                        type="text"
                                        className="form-input with-left-icon"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Headline */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="profile-title">Professional Headline / Role</label>
                            <div className="input-with-icon">
                                <Briefcase size={16} className="field-icon" />
                                <input
                                    id="profile-title"
                                    type="text"
                                    className="form-input with-left-icon"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Senior Full Stack Engineer & Solo Explorer"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="profile-bio">Nomad Bio & Travel Philosophy</label>
                            <textarea
                                id="profile-bio"
                                rows={3}
                                className="form-textarea"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Describe what you do, how you travel, and what inspires you..."
                            />
                        </div>

                        {/* Availability Status */}
                        <div className="form-group">
                            <label className="form-label">Live Availability & Community Status</label>
                            <div className="status-options-grid">
                                {AVAILABILITY_STATUSES.map((status) => (
                                    <button
                                        key={status.id}
                                        type="button"
                                        className={`status-option-btn ${formData.statusKey === status.id ? 'active' : ''}`}
                                        onClick={() => setFormData({ 
                                            ...formData, 
                                            statusKey: status.id,
                                            statusMessage: `${status.emoji} ${status.label}`
                                        })}
                                    >
                                        <span className="status-emoji">{status.emoji}</span>
                                        <span className="status-label">{status.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* External Links */}
                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label" htmlFor="profile-website">Personal Website / Portfolio</label>
                                <div className="input-with-icon">
                                    <Globe size={16} className="field-icon" />
                                    <input
                                        id="profile-website"
                                        type="url"
                                        className="form-input with-left-icon"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="https://yourdomain.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="profile-twitter">X / Twitter Handle</label>
                                <div className="input-with-icon">
                                    <Link size={16} className="field-icon" />
                                    <input
                                        id="profile-twitter"
                                        type="text"
                                        className="form-input with-left-icon"
                                        value={formData.twitter}
                                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                        placeholder="@handle"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="edit-profile-actions">
                            <button type="button" onClick={onClose} className="btn-cancel">
                                Cancel
                            </button>
                            <button type="submit" className="btn-save">
                                <Check size={16} /> Save Profile Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EditProfileModal;
