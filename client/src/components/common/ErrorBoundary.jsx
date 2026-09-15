import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-main)',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '40px',
                        borderRadius: '24px',
                        maxWidth: '500px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <AlertTriangle size={40} color="#ef4444" />
                        </div>
                        <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                            We encountered an unexpected error. Don't worry, your data is safe.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-secondary"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <RefreshCw size={18} />
                                Retry
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <Home size={18} />
                                Go Home
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details style={{ marginTop: '32px', textAlign: 'left', fontSize: '12px', color: '#ef4444' }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>Error Details</summary>
                                <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                                    {this.state.error?.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
