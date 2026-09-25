/**
 * Navbar-friendly auth control: Sign in button or avatar + sign out.
 */
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import AuthModal from './AuthModal';
import { LogIn, LogOut } from 'lucide-react';
import './AuthButton.css';

export default function AuthButton({ className = '' }) {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const loading = useAuthStore((s) => s.loading);
  const signOut = useAuthStore((s) => s.signOut);
  const configured = useAuthStore((s) => s.configured);

  if (loading && configured) {
    return (
      <div className={`auth-btn-skeleton ${className}`} aria-hidden>
        …
      </div>
    );
  }

  if (user && profile) {
    return (
      <div className={`auth-btn-user ${className}`}>
        <img
          src={profile.avatarUrl}
          alt=""
          className="auth-btn-avatar"
          width={28}
          height={28}
        />
        <span className="auth-btn-name" title={profile.email || ''}>
          {profile.displayName}
        </span>
        <button
          type="button"
          className="auth-btn-icon"
          onClick={() => signOut()}
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={`auth-btn-signin ${className}`}
        onClick={() => setOpen(true)}
      >
        <LogIn size={16} />
        Sign in
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
