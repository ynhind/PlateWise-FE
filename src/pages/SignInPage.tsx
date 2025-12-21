import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { FormField, Input } from '../components/auth/formField';
import { useSessionStorage } from '../hooks/useSessionStorage';
import {
  SESSION_KEYS,
  AuthState,
  AccountState,
  ProfileState,
} from '../libs/sessionKeys';
import { canLoginWithPassword } from '../libs/auth';

export default function SignInPage() {
  const nav = useNavigate();

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

    nav(hasProfile ? '/dashboard' : '/onboarding', { replace: true });
  }

  return (
    <AuthShell title="Sign in" subtitle="Enter password.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? <div className="alert-error">{error}</div> : null}

        <FormField label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="vd: vinam"
            autoComplete="username"
          />
        </FormField>

        <FormField label="Password">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            type="password"
            autoComplete="current-password"
          />
        </FormField>

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
  );
}
