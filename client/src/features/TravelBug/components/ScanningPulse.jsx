import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Sparkles, Search, Database, Globe } from 'lucide-react';

const ScanningPulse = () => {
    return (
        <div className="scanning-pulse-container">
            <div className="scanning-orb">
                <motion.div 
                    className="scan-ring outer"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="scan-ring inner"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <Bug size={48} color="#F59E0B" className="scanning-icon" />
            </div>

            <div className="scanning-status">
                <motion.div 
                    className="status-item"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Search size={16} /> <span>Analyzing visual frames...</span>
                </motion.div>
                <motion.div 
                    className="status-item"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <Database size={16} /> <span>Cross-referencing global maps...</span>
                </motion.div>
                <motion.div 
                    className="status-item"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    <Sparkles size={16} /> <span>Generating AI highlights...</span>
                </motion.div>
            </div>

            <div className="scanning-line"></div>
        </div>
    );
};

export default ScanningPulse;
