import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    UserCheck, Mail, ExternalLink, Globe, Award, Star,
    Briefcase, MapPin, Bookmark, Trash2, Compass
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useSavedStore } from '../../../store/savedStore';
import '../styles/Professional.css';

const NomadProfile = () => {
    const navigate = useNavigate();
    const { userSkills = {}, endorseSkill } = useNomadOSStore();
    const { savedDestinations, removeSaved } = useSavedStore();
    const skills = Object.keys(userSkills).length > 0
        ? Object.keys(userSkills)
        : ['Itinerary Planning', 'Local Spoken', 'Photography'];
    const endorsements = userSkills;
    const addEndorsement = endorseSkill;
    
    return (
        <div className="professional-container">
            <motion.div 
                className="profile-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="hero-main">
                    <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                        className="hero-avatar" 
                        alt="Avatar" 
                    />
                    <div className="hero-text">
                        <div className="flex items-center gap-4">
                            <h1>John Doe</h1>
                            <div className="verified-badge">
                                <UserCheck size={18} /> Verified Expert
                            </div>
                        </div>
                        <p>Senior Full Stack Developer & Solo Traveler | Digital Nomad since 2021</p>
                        
                        <div className="availability-toggle">
                            <div className="pulse-circle"></div>
                            Available for hire & local meetups
                        </div>
                    </div>
                </div>
                
                <div className="hero-actions">
                    <button className="btn-hub-primary"><Mail size={16}/> Hire Me</button>
                    <button className="btn-hub-outline"><ExternalLink size={16}/> Portfolio</button>
                </div>
            </motion.div>

            <div className="profile-grid">
                <div className="profile-left">
                    <section className="profile-card">
                        <h2 className="card-title"><Globe size={20} className="text-blue-500" /> Professional Travel History</h2>
                        <div className="timeline-hub">
                            {[
                                { city: 'Lisbon, Portugal', period: 'Jan 2026 - Present', role: 'Remote Dev @ TechCorp' },
                                { city: 'Canggu, Bali', period: 'June 2025 - Dec 2025', role: 'Freelance Consultant' },
                                { city: 'Medellin, Colombia', period: 'Jan 2025 - May 2025', role: 'Project Coordinator' }
                            ].map((job, i) => (
                                <div key={i} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h4>{job.city}</h4>
                                        <p>{job.role}</p>
                                        <span>{job.period}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="profile-card mt-8">
                        <h2 className="card-title"><Award size={20} className="text-amber-500" /> Skill Endorsements</h2>
                        <div className="endorsements-list">
                            {skills.map(skill => (
                                <div key={skill} className="endorsement-row">
                                    <div className="e-skill-info">
                                        <strong>{skill}</strong>
                                        <span>{endorsements[skill] || 0} endorsements</span>
                                    </div>
                                    <button 
                                        className="endorse-btn"
                                        onClick={() => addEndorsement(skill)}
                                    >
                                        <Star size={14} fill={(endorsements[skill] || 0) > 0 ? "#f59e0b" : "none"} />
                                        <span>Endorse</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="profile-right">
                    <section className="profile-card">
                        <h2 className="card-title"><Briefcase size={20} className="text-purple-500" /> Core Skills</h2>
                        <div className="skills-tags">
                            {skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                        <button className="btn-hub-outline w-full mt-6">Add New Skill</button>
                    </section>

                    <section className="profile-card mt-8">
                        <h2 className="card-title"><MapPin size={20} className="text-red-500" /> Current Base</h2>
                        <div className="current-base-card">
                            <img src="https://images.unsplash.com/photo-1585211756843-dc3828965111?w=400" alt="Lisbon" className="base-img" />
                            <div className="base-info">
                                <h4>Lisbon, Portugal</h4>
                                <p>Stay until: March 30, 2026</p>
                            </div>
                        </div>
                    </section>

                    <section className="profile-card mt-8" id="profile-my-favorites-collection">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="card-title" style={{ marginBottom: 0 }}>
                                <Bookmark size={20} className="text-blue-400" /> My Favorites ({savedDestinations.length})
                            </h2>
                            <button
                                type="button"
                                onClick={() => navigate('/saved')}
                                className="btn-hub-outline"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            >
                                View Collection
                            </button>
                        </div>

                        {savedDestinations.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {savedDestinations.slice(0, 5).map((dest) => {
                                    const slug = (dest.name || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                    return (
                                        <div
                                            key={dest.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '0.75rem',
                                                padding: '0.55rem 0.7rem',
                                                borderRadius: '12px',
                                                background: 'rgba(15, 23, 42, 0.55)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)'
                                            }}
                                        >
                                            <div
                                                onClick={() => navigate(`/explore/destinations/${slug}`)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flex: 1, minWidth: 0 }}
                                            >
                                                <img
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                                                />
                                                <div style={{ minWidth: 0 }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>{dest.name}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                                        {dest.location} • {dest.price || '$1,350/mo'}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeSaved(dest.id)}
                                                title={`Remove ${dest.name} from My Favorites`}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.12)',
                                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                                    color: '#f87171',
                                                    borderRadius: '8px',
                                                    width: '30px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '1rem 0', color: '#94a3b8', fontSize: '0.84rem' }}>
                                <p style={{ marginBottom: '0.6rem' }}>No destinations in your My Favorites collection yet.</p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/destinations')}
                                    className="btn-hub-primary"
                                    style={{ margin: '0 auto' }}
                                >
                                    <Compass size={15} /> Explore Destinations
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NomadProfile;
