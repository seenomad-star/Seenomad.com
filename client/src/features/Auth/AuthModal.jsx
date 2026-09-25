/**
 * Lightweight email/password Auth modal (sign in + sign up).
 * Uses useAuthStore. Style matches Seenomad dark UI.
 */
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ open, onClose, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const error = useAuthStore((s) => s.error);
  const configured = useAuthStore((s) => s.configured);
  const addToast = useToastStore((s) => s.addToast);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configured) {
      addToast('Supabase is not configured. Add VITE_SUPABASE_* keys.', 'error');
      return;
    }
    setSubmitting(true);

    if (mode === 'signin') {
      const res = await signIn({ email, password });
      setSubmitting(false);
      if (res.error) {
        addToast(res.error, 'error');
        return;
      }
      addToast('Welcome back, nomad!', 'success');
      onClose?.();
    } else {
      const res = await signUp({ email, password, handle, displayName });
      setSubmitting(false);
      if (res.error) {
        addToast(res.error, 'error');
        return;
      }
      if (res.needsEmailConfirmation) {
        addToast('Check your email to confirm your account.', 'info');
      } else {
        addToast('Account created — you are signed in!', 'success');
      }
      onClose?.();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button type="button" className="auth-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <h2 id="auth-modal-title" className="auth-modal-title">
          {mode === 'signin' ? 'Sign in to Seenomad' : 'Join the nomad network'}
        </h2>
        <p className="auth-modal-sub">
          {mode === 'signin'
            ? 'Post to the Nexus feed and sync your travel identity.'
            : 'Create a profile so your posts are linked to you.'}
        </p>

        {!configured && (
          <div className="auth-modal-warn">
            Supabase Auth is offline. Set <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-modal-form">
          {mode === 'signup' && (
            <>
              <label className="auth-field">
                <User size={16} />
                <input
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="auth-field">
                <span className="auth-at">@</span>
                <input
                  type="text"
                  placeholder="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace(/\s/g, ''))}
                  autoComplete="username"
                />
              </label>
            </>
          )}

          <label className="auth-field">
            <Mail size={16} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <Lock size={16} />
            <input
              type="password"
              placeholder="Password (min 6)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="auth-modal-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={submitting || !configured}>
            {submitting ? (
              <>
                <Loader2 size={16} className="auth-spin" /> Working…
              </>
            ) : mode === 'signin' ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'signin' ? (
            <>
              New here?{' '}
              <button type="button" onClick={() => setMode('signup')}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
