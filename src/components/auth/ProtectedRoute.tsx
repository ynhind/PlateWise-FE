import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { SESSION_KEYS, AuthState } from '../../libs/sessionKeys';
import { isAuthed } from '../../libs/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [auth] = useSessionStorage<AuthState>(SESSION_KEYS.auth, {
    isAuthed: false,
  });

  if (!isAuthed(auth)) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
}
