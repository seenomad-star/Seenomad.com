import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="breadcrumbs" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            color: 'var(--text-muted)',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            marginBottom: '16px'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                <Home size={16} />
            </Link>

            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const label = value
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return (
                    <React.Fragment key={to}>
                        <ChevronRight size={14} style={{ opacity: 0.5 }} />
                        {last ? (
                            <span style={{ color: 'var(--accent-rose)', fontWeight: 500 }}>{label}</span>
                        ) : (
                            <Link to={to} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
