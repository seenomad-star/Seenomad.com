import React from 'react';
import { BookOpen, Zap, GraduationCap, Award, TrendingUp } from 'lucide-react';

const LearningPaths = () => {
    const paths = [
        {
            id: 'sustainable-tourism',
            title: 'Sustainable Tourism',
            description: 'Master the art of travel that gives back to the planet.',
            icon: <Zap className="text-yellow-400" />,
            level: 'Beginner',
            duration: '12 Hours',
            students: '1.2k',
            price: '$49',
            certified: true
        },
        {
            id: 'climate-conservation',
            title: 'Climate & Conservation',
            description: 'Learn field techniques for environmental protection.',
            icon: <TrendingUp className="text-green-400" />,
            level: 'Intermediate',
            duration: '20 Hours',
            students: '850',
            price: '$79',
            certified: true
        },
        {
            id: 'community-care',
            title: 'Community Care',
            description: 'Public health and social impact strategies for travelers.',
            icon: <GraduationCap className="text-blue-400" />,
            level: 'Advanced',
            duration: '15 Hours',
            students: '2.1k',
            price: 'Free',
            certified: true
        }
    ];

    return (
        <div className="learning-paths-container">
            <div className="section-header">
                <h2>Skill → Travel → Impact</h2>
                <p>AI-adaptive curriculum tailored to your career goals.</p>
            </div>

            <div className="paths-grid">
                {paths.map(path => (
                    <div key={path.id} className="path-card premium-card">
                        <div className="path-icon">{path.icon}</div>
                        <div className="path-content">
                            <div className="path-badge">{path.level}</div>
                            <h3>{path.title}</h3>
                            <p>{path.description}</p>
                            <div className="path-meta">
                                <span><BookOpen size={14} /> {path.duration}</span>
                                <span><GraduationCap size={14} /> {path.students} enrolled</span>
                            </div>
                        </div>
                        <div className="path-footer">
                            <div className="path-price">{path.price}</div>
                            <button className="enroll-btn-premium">
                                {path.price === 'Free' ? 'Start Learning' : 'Unlock Path'}
                            </button>
                        </div>
                        {path.certified && (
                            <div className="cert-tag">
                                <Award size={12} /> Verified Certificate
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="ai-curriculum-teaser">
                <div className="teaser-content">
                    <h3>Personalized AI Curriculum</h3>
                    <p>Our AI analyzes your profile to suggest the most impactful skills for your next destination.</p>
                    <button className="secondary-btn-premium">Generate My Path</button>
                </div>
            </div>
        </div>
    );
};

export default LearningPaths;
