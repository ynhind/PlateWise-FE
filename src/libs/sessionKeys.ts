export const SESSION_KEYS = {
  auth: 'pw_auth',
  account: 'pw_account',
  profile: 'pw_profile',
} as const;

export type AuthState = {
  isAuthed: boolean;
  username?: string;
  createdAt?: string;
};

export type AccountState = {
  username: string;
  email?: string;
  password?: string;
};

export type ActivityLevel = 'low' | 'medium' | 'high';
export type GoalType = 'lose' | 'maintain' | 'gain';

export type ProfileState = {
  heightCm?: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
  goal?: GoalType;
  activityLevel?: ActivityLevel;
  habits?: {
    waterGlassesPerDay?: number;
    mealsPerDay?: number;
    sleepHours?: number;
  };
  notes?: string;
  updatedAt?: string;
};
