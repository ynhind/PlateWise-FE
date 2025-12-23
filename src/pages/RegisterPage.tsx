import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { AccountState, SESSION_KEYS, AuthState } from '../libs/sessionKeys';
import { Toast } from '../components/common/Toast';

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label
      className="text-sm font-semibold"
      style={{ color: 'var(--text-primary)' }}
    >
      {label}
    </label>
    {children}
  </div>
);

export default function RegisterPage() {
  const nav = useNavigate();

  const [, setAccount] = useSessionStorage<AccountState | null>(
    SESSION_KEYS.account,
    null,
  );
  const [, setAuth] = useSessionStorage<AuthState>(SESSION_KEYS.auth, {
    isAuthed: false,
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) return setError('Username cannot be empty');
    if (!password.trim()) return setError('Password cannot be empty');
    if (password.length < 6)
      return setError('Password should be at least 6 characters long');

    setAccount({
      username: username.trim(),
      email: email.trim() || undefined,
      password: password,
    });

    setAuth({
      isAuthed: true,
      username: username.trim(),
      createdAt: new Date().toISOString(),
    });

    setShowToast(true);

    setTimeout(() => {
      nav('/signin', { replace: true });
    }, 2000);
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
        open={showToast}
        message="Registered successfully! Please sign in."
        type="success"
        onClose={() => setShowToast(false)}
        duration={1800}
      />

      <AuthShell title="Welcome!" subtitle="Create an account.">
        <form className="space-y-4" onSubmit={onSubmit}>
          {error ? <div className="alert-error">{error}</div> : null}

          <Field label="Username">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="Email (optional)">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              type="email"
              autoComplete="email"
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="Password">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="Enter password"
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Field>

          <button className="btn-primary w-full" type="submit">
            Create account
          </button>

          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-muted)' }}>
              Already have an account?
            </span>
            <Link
              className="font-semibold"
              style={{ color: 'var(--color-primary)' }}
              to="/signin"
            >
              Sign in
            </Link>
          </div>
        </form>
      </AuthShell>
    </>
  );
}
