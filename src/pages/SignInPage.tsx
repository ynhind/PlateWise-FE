import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { useSessionStorage } from '../hooks/useSessionStorage';
import {
  SESSION_KEYS,
  AuthState,
  AccountState,
  ProfileState,
} from '../libs/sessionKeys';
import { canLoginWithPassword } from '../libs/auth';
import { Toast } from '../components/common/Toast';

export default function SignInPage() {
  const nav = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('Signed in successfully!');
  const [toastType, setToastType] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const [auth, setAuth] = useSessionStorage<AuthState>(SESSION_KEYS.auth, {
    isAuthed: false,
  });
  const [account] = useSessionStorage<AccountState | null>(
    SESSION_KEYS.account,
    null,
  );
  const [profile] = useSessionStorage<ProfileState>(SESSION_KEYS.profile, {});

  const suggestedUser = useMemo(
    () => account?.username ?? '',
    [account?.username],
  );

  const [username, setUsername] = useState(suggestedUser);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Enter your username.');
      return;
    }
    if (!canLoginWithPassword(password)) {
      setError('Incorrect password. Hint: the password is always "123456".');
      return;
    }

    setAuth({
      isAuthed: true,
      username: username.trim(),
      createdAt: new Date().toISOString(),
    });

    const hasProfile =
      !!profile.heightCm &&
      !!profile.currentWeightKg &&
      !!profile.targetWeightKg &&
      !!profile.goal;

    setToastType('success');
    setToastMsg('Signed in successfully!');
    setToastOpen(true);

    window.setTimeout(() => {
      nav(hasProfile ? '/dashboard' : '/onboarding', { replace: true });
    }, 500);
  }

  const inputClass =
    'w-full rounded-xl px-4 py-3 outline-none transition border';

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-primary)',
    borderColor: 'var(--border-light)',
    color: 'var(--text-primary)',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-primary)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-light)';
  };

  return (
    <>
      <Toast
        open={toastOpen}
        message={toastMsg}
        type={toastType}
        duration={1200}
        onClose={() => setToastOpen(false)}
      />
      <AuthShell title="Welcome back" subtitle="Sign in to your account.">
        <form className="space-y-4" onSubmit={onSubmit}>
          {error ? <div className="alert-error">{error}</div> : null}

          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="vd: vinam"
              autoComplete="username"
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              autoComplete="current-password"
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button className="btn-primary w-full" type="submit">
            Login
          </button>

          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-muted)' }}>
              Don't have an account?
            </span>
            <Link
              className="font-semibold"
              style={{ color: 'var(--color-primary)' }}
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </AuthShell>
    </>
  );
}
