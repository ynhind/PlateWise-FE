import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import {
  FormField,
  Input,
  Select,
  Textarea,
} from '../components/auth/formField';
import { useSessionStorage } from '../hooks/useSessionStorage';
import {
  SESSION_KEYS,
  ProfileState,
  ActivityLevel,
  GoalType,
} from '../libs/sessionKeys';

function clampNumber(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function calcBMI(weightKg?: number, heightCm?: number) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  if (h <= 0) return null;
  return weightKg / (h * h);
}

export default function OnboardingPage() {
  const nav = useNavigate();
  const [profile, setProfile] = useSessionStorage<ProfileState>(
    SESSION_KEYS.profile,
    {},
  );

  const [heightCm, setHeightCm] = useState<number>(profile.heightCm ?? 165);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(
    profile.currentWeightKg ?? 60,
  );
  const [targetWeightKg, setTargetWeightKg] = useState<number>(
    profile.targetWeightKg ?? 55,
  );
  const [goal, setGoal] = useState<GoalType>(profile.goal ?? 'lose');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    profile.activityLevel ?? 'medium',
  );

  const [water, setWater] = useState<number>(
    profile.habits?.waterGlassesPerDay ?? 6,
  );
  const [meals, setMeals] = useState<number>(profile.habits?.mealsPerDay ?? 3);
  const [sleep, setSleep] = useState<number>(profile.habits?.sleepHours ?? 7);

  const [notes, setNotes] = useState<string>(profile.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const bmi = useMemo(
    () => calcBMI(currentWeightKg, heightCm),
    [currentWeightKg, heightCm],
  );

  function save() {
    setError(null);

    const h = clampNumber(heightCm, 120, 220);
    const cw = clampNumber(currentWeightKg, 30, 250);
    const tw = clampNumber(targetWeightKg, 30, 250);

    if (!h || !cw || !tw) {
      setError(
        'Please provide valid height and weight values within the allowed ranges.',
      );
      return;
    }

    setProfile({
      heightCm: h,
      currentWeightKg: cw,
      targetWeightKg: tw,
      goal,
      activityLevel,
      habits: {
        waterGlassesPerDay: clampNumber(water, 0, 30),
        mealsPerDay: clampNumber(meals, 1, 10),
        sleepHours: clampNumber(sleep, 0, 16),
      },
      notes: notes.trim() || undefined,
      updatedAt: new Date().toISOString(),
    });

    nav('/dashboard', { replace: true });
  }

  return (
    <AuthShell
      title="Set Your Goals"
      subtitle="Choose basic parameters like a nutrition app: height, weight, habits, goals."
    >
      <div className="space-y-4">
        {error ? <div className="alert-error">{error}</div> : null}

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Height (cm)">
            <Input
              type="number"
              value={heightCm}
              min={120}
              max={220}
              onChange={(e) => setHeightCm(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Current Weight (kg)">
            <Input
              type="number"
              value={currentWeightKg}
              min={30}
              max={250}
              onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Target Weight (kg)">
            <Input
              type="number"
              value={targetWeightKg}
              min={30}
              max={250}
              onChange={(e) => setTargetWeightKg(Number(e.target.value))}
            />
          </FormField>

          <FormField label="Goal">
            <Select
              value={goal}
              onChange={(e) => setGoal(e.target.value as GoalType)}
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Activity Level">
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'low', label: 'Low' },
              { key: 'medium', label: 'Medium' },
              { key: 'high', label: 'High' },
            ].map((x) => (
              <button
                key={x.key}
                type="button"
                className={
                  activityLevel === x.key ? 'btn-primary' : 'btn-secondary'
                }
                onClick={() => setActivityLevel(x.key as ActivityLevel)}
              >
                {x.label}
              </button>
            ))}
          </div>
        </FormField>

        <div className="grid grid-cols-3 gap-3">
          <FormField label="Water (glasses/day)">
            <Input
              type="number"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
            />
          </FormField>
          <FormField label="Meals (per day)">
            <Input
              type="number"
              value={meals}
              onChange={(e) => setMeals(Number(e.target.value))}
            />
          </FormField>
          <FormField label="Sleep (hours/day)">
            <Input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
            />
          </FormField>
        </div>

        <FormField
          label="Notes (optional)"
          hint="E.g., vegetarian, allergies, workout schedule, medical conditions..."
        >
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <div className="nutrition-card-calories">
            <div
              className="text-sm font-semibold"
              style={{ color: 'var(--calories-text)' }}
            >
              BMI (reference)
            </div>
            <div
              className="mt-1 text-2xl font-bold"
              style={{ color: 'var(--calories-dark)' }}
            >
              {bmi ? bmi.toFixed(1) : '--'}
            </div>
            <div
              className="text-xs mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              Calculated from current weight & height
            </div>
          </div>

          <div className="nutrition-card-protein">
            <div
              className="text-sm font-semibold"
              style={{ color: 'var(--protein-text)' }}
            >
              Target Difference
            </div>
            <div
              className="mt-1 text-2xl font-bold"
              style={{ color: 'var(--protein-dark)' }}
            >
              {(targetWeightKg - currentWeightKg).toFixed(1)} kg
            </div>
            <div
              className="text-xs mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              Target - Current
            </div>
          </div>
        </div>

        <button className="btn-primary w-full" onClick={save}>
          Save
        </button>
      </div>
    </AuthShell>
  );
}
