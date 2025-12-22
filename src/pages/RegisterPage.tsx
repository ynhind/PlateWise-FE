import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { FormField, Input } from '../components/auth/formField';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { SESSION_KEYS, AccountState, AuthState } from '../libs/sessionKeys';

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
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) return setError('Username cannot be empty.');
    if (password !== '123456') return setError('Enter password');

    setAccount({ username: username.trim(), email: email.trim() || undefined });

    setAuth({
      isAuthed: true,
      username: username.trim(),
      createdAt: new Date().toISOString(),
    });

    nav('/onboarding', { replace: true });
  }

  return (
    <AuthShell title="Register" subtitle='Create an account".'>
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? <div className="alert-error">{error}</div> : null}

        <FormField label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </FormField>

        <FormField label="Email (optional)">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </FormField>

        <FormField label="Password">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormField>

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
  );
}
