import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../../store/navStore';

const ContextStrip = () => {
    const { getVisibleContext } = useNavStore();
    const context = getVisibleContext();

    return (
        <div className="context-strip">
            <AnimatePresence mode="wait">
                {context && (
                    <motion.div
                        key={context.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="context-content"
                    >
                        {context.label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContextStrip;
