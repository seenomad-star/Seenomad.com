import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap, DollarSign, Clock, ChevronRight } from 'lucide-react';
import './CollabProjectCard.css';

const CollabProjectCard = ({ project }) => {
    return (
        <motion.div 
            className="collab-project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card-top">
                <div className="category-tag">{project.category}</div>
                <div className="budget-tag">
                    <DollarSign size={14} />
                    <span>{project.budget}</span>
                </div>
            </div>

            <div className="card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
            </div>

            <div className="card-meta">
                <div className="meta-item">
                    <Briefcase size={14} />
                    <span>{project.roles}</span>
                </div>
                <div className="meta-item">
                    <Clock size={14} />
                    <span>{project.timeline}</span>
                </div>
            </div>

            <div className="card-footer">
                <div className="skills-row">
                    {project.skills.split(',').map((skill, i) => (
                        <span key={i} className="skill-badge">{skill.trim()}</span>
                    ))}
                </div>
                <button className="apply-btn">
                    <span>Apply Now</span>
                    <ChevronRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default CollabProjectCard;
