import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPage.css';

export default function AuthPage() {
  const { configured, user, loading, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');
    try {
      if (mode === 'signup') {
        const result = await signUp(email.trim(), password, displayName.trim());
        if (result.session) {
          setMessage('Your Seenomad account is ready.');
          navigate('/');
        } else {
          setMessage('Check your email for the confirmation link, then sign in.');
        }
      } else {
        await signIn(email.trim(), password);
        navigate('/');
      }
    } catch (err) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (!configured) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to Seenomad</Link>
          <h1>Connect your Journey Partner account</h1>
          <p>Authentication is not enabled yet. Add the Supabase project URL and publishable key to your Vercel environment variables, then apply the social schema migration.</p>
          <p className="auth-setup-note">No account or social data is sent anywhere until you configure a Supabase project.</p>
        </div>
      </section>
    );
  }

  if (loading) return <section className="auth-page"><div className="auth-card">Checking your session…</div></section>;

  if (user) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to feed</Link>
          <div className="auth-icon"><UserRound size={24} /></div>
          <h1>You're signed in</h1>
          <p>{user.email}</p>
          <button className="auth-primary" onClick={() => navigate('/')}>Continue to Seenomad</button>
          <button className="auth-secondary" onClick={async () => { await signOut(); setMessage('You have signed out.'); }}>Sign out</button>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to Seenomad</Link>
        <div className="auth-icon"><LockKeyhole size={24} /></div>
        <h1>{mode === 'signup' ? 'Join the Seenomad community' : 'Welcome back, traveler'}</h1>
        <p>Sign in to build a community that travels with you.</p>
        <form onSubmit={submit}>
          {mode === 'signup' && (
            <label className="auth-field">
              <span>Name</span>
              <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="name" maxLength={80} required />
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <span className="auth-input-wrap"><Mail size={16} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></span>
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} required />
          </label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          {message && <p className="auth-message" role="status">{message}</p>}
          <button className="auth-primary" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}</button>
        </form>
        <button className="auth-mode-toggle" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(''); setMessage(''); }}>
          {mode === 'signup' ? 'Already have an account? Sign in' : 'New to Seenomad? Create an account'}
        </button>
        <p className="auth-security-note">Your account is protected by Supabase Auth. Keep your password private.</p>
      </div>
    </section>
  );
}
