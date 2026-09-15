import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../styles/Professional.css';

const NomadProfile = () => {
    const { skills, endorsements, addEndorsement } = useNomadOSStore();
    
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
                </div>
            </div>
        </div>
    );
};

export default NomadProfile;
