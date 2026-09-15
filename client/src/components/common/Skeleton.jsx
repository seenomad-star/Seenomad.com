import React from 'react';
import '../../styles/Skeleton.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
    const style = {
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '8px'
    };

    return (
        <div
            className={`skeleton-loader ${className}`}
            style={style}
        />
    );
};

export const SkeletonCard = () => (
    <div className="skeleton-card" style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    }}>
        <Skeleton height="200px" borderRadius="16px" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton width="70%" height="24px" />
            <Skeleton width="40%" height="16px" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <Skeleton width="30%" height="32px" borderRadius="20px" />
            <Skeleton width="30%" height="32px" borderRadius="20px" />
        </div>
    </div>
);

export default Skeleton;
