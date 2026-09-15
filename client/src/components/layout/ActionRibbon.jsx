import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../../store/navStore';
import { Sparkles, Flame, Crown } from 'lucide-react';

const ActionRibbon = () => {
    const { getVisibleActions } = useNavStore();
    const actions = getVisibleActions();

    if (actions.length === 0) return null;

    return (
        <motion.div
            className="action-ribbon"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'var(--action-height)', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <AnimatePresence>
                {actions.map((action) => (
                    <motion.div
                        key={action.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        className="action-item"
                    >
                        {action.type === 'retention' && <Sparkles size={16} color="var(--accent-gold)" />}
                        {action.type === 'monetization' && <Flame size={16} color="#ef4444" />}
                        {action.label}
                        {action.rewardText && <span className="reward-badge">{action.rewardText}</span>}
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ActionRibbon;
