import React from 'react';
import {
    AlertTriangle,
    RefreshCw,
    Home,
    ArrowLeft,
    Compass,
    Trash2,
    ShieldCheck
} from 'lucide-react';

/**
 * ErrorBoundary
 * Catches synchronous and lifecycle rendering errors in any child component tree.
 * Supports both full-viewport root protection and inline main-content protection
 * (via `inline={true}` and `resetKey={location.pathname}`) so the navigation sidebar
 * and header remain interactive even if a page module encounters an unexpected error.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('SeeNomad ErrorBoundary caught a rendering error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    componentDidUpdate(prevProps) {
        // Automatically clear the error state when the user navigates to a new route
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null
            });
        }
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        if (typeof this.props.onReset === 'function') {
            this.props.onReset();
        }
    };

    handleGoHome = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        window.location.href = '/';
    };

    handleClearCachedStateAndReload = () => {
        try {
            // Preserve theme preference while clearing potentially malformed local state
            const theme = localStorage.getItem('seenomad-theme');
            localStorage.clear();
            if (theme) localStorage.setItem('seenomad-theme', theme);
        } catch {
            // ignore storage errors
        }
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            const { inline = false, fallbackTitle } = this.props;

            return (
                <section
                    role="alert"
                    aria-live="assertive"
                    style={{
                        minHeight: inline ? 'calc(100vh - 150px)' : '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: inline
                            ? 'transparent'
                            : 'linear-gradient(135deg, #0b1120 0%, #0f172a 55%, #1e1b4b 100%)',
                        color: 'var(--color-text-primary, #f8fafc)',
                        textAlign: 'center',
                        padding: 'clamp(1rem, 3vw, 2.25rem)',
                        boxSizing: 'border-box'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '580px',
                            background: 'rgba(15, 23, 42, 0.92)',
                            backdropFilter: 'blur(14px)',
                            border: '1px solid rgba(56, 189, 248, 0.28)',
                            padding: 'clamp(1.35rem, 3vw, 2.25rem)',
                            borderRadius: '20px',
                            boxShadow: '0 22px 50px -12px rgba(0, 0, 0, 0.55)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(239, 68, 68, 0.14)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <AlertTriangle size={32} color="#f87171" />
                        </div>

                        <div>
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.07em',
                                    color: '#38bdf8'
                                }}
                            >
                                <ShieldCheck size={13} />
                                SeeNomad Resilient UI Recovery Guard
                            </span>
                            <h1
                                style={{
                                    fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
                                    fontWeight: 800,
                                    margin: '0.3rem 0 0.45rem',
                                    color: '#f8fafc'
                                }}
                            >
                                {fallbackTitle || 'This view encountered a temporary rendering hiccup'}
                            </h1>
                            <p
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.84rem',
                                    lineHeight: 1.55,
                                    margin: 0
                                }}
                            >
                                Your saved trips, vouchers, and nomad profile remain safe. You can re-render this module immediately, navigate to another hub from the sidebar, or return to the Home Feed.
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.55rem',
                                justifyContent: 'center',
                                width: '100%',
                                marginTop: '0.35rem'
                            }}
                        >
                            <button
                                type="button"
                                onClick={this.handleRetry}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    padding: '0.58rem 1.05rem',
                                    borderRadius: '10px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(56, 189, 248, 0.5)',
                                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                                    color: '#ffffff'
                                }}
                            >
                                <RefreshCw size={15} />
                                Retry View
                            </button>

                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    padding: '0.58rem 1rem',
                                    borderRadius: '10px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.14)',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    color: '#e2e8f0'
                                }}
                            >
                                <ArrowLeft size={15} />
                                Go Back
                            </button>

                            <button
                                type="button"
                                onClick={this.handleGoHome}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    padding: '0.58rem 1rem',
                                    borderRadius: '10px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.14)',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    color: '#e2e8f0'
                                }}
                            >
                                <Home size={15} />
                                Home Feed
                            </button>

                            <button
                                type="button"
                                onClick={this.handleClearCachedStateAndReload}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    padding: '0.58rem 1rem',
                                    borderRadius: '10px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(245, 158, 11, 0.35)',
                                    background: 'rgba(245, 158, 11, 0.12)',
                                    color: '#fbbf24'
                                }}
                            >
                                <Trash2 size={14} />
                                Reset Local Cache
                            </button>
                        </div>

                        {this.state.error && (
                            <details
                                style={{
                                    width: '100%',
                                    marginTop: '0.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.74rem',
                                    color: '#fca5a5',
                                    background: 'rgba(2, 6, 23, 0.65)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    borderRadius: '10px',
                                    padding: '0.65rem 0.85rem',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
                                    Diagnostic Details ({this.state.error?.name || 'RenderError'})
                                </summary>
                                <pre
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        margin: '0.5rem 0 0',
                                        fontSize: '0.7rem',
                                        color: '#e2e8f0',
                                        maxHeight: '160px',
                                        overflowY: 'auto'
                                    }}
                                >
                                    {this.state.error?.toString()}
                                    {this.state.errorInfo?.componentStack || ''}
                                </pre>
                            </details>
                        )}
                    </div>
                </section>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
