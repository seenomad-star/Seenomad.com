import React from 'react';
import { Zap } from 'lucide-react';

const PageLoader = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            width: '100%',
            color: 'var(--text-secondary, #888)'
        }}>
            <div className="loader-dots" style={{ marginBottom: '1rem' }}>
                <Zap className="animate-pulse" size={32} color="var(--color-primary, #00a8e8)" />
            </div>
            <p>Loading experience...</p>
        </div>
    );
};

export default PageLoader;
