import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../store/toastStore';
import { Info, CheckCircle, AlertCircle, X } from 'lucide-react';
import './ToastContainer.css';

const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={18} className="toast-icon success" />;
            case 'error': return <AlertCircle size={18} className="toast-icon error" />;
            default: return <Info size={18} className="toast-icon info" />;
        }
    };

    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`toast-item ${toast.type}`}
                        layout
                    >
                        {getIcon(toast.type)}
                        <span className="toast-message">{toast.message}</span>
                        <button className="toast-close" onClick={() => removeToast(toast.id)}>
                            <X size={14} />
                        </button>
                        <div className="toast-progress-bar">
                             <motion.div 
                                className="progress-fill"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: toast.duration / 1000, ease: "linear" }}
                             />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
