import { AuthState } from './sessionKeys';

export function canLoginWithPassword(password: string) {
  return password === '123456';
}

export function isAuthed(auth?: AuthState | null) {
  return Boolean(auth?.isAuthed);
}
