import React from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { SESSION_KEYS, AuthState, ProfileState } from "../libs/sessionKeys";

export default function DashboardPage() {
  const nav = useNavigate();
  const [auth, setAuth] = useSessionStorage<AuthState>(SESSION_KEYS.auth, {
    isAuthed: false,
  });
  const [profile] = useSessionStorage<ProfileState>(SESSION_KEYS.profile, {});

  function logout() {
    setAuth({ isAuthed: false });
    nav("/signin", { replace: true });
  }

  return (
    <div
      className="min-h-screen  p-6 pt-30"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="card flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Dashboard</h1>
            <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
              Hello <b>{auth.username ?? "user"}</b>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-secondary"
              onClick={() => nav("/onboarding")}
            >
              Edit Profile
            </button>
            <button className="btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="nutrition-card-carbs">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--carbs-text)" }}
            >
              Height
            </div>
            <div
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--carbs-dark)" }}
            >
              {profile.heightCm ?? "--"} cm
            </div>
          </div>

          <div className="nutrition-card-fats">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--fats-text)" }}
            >
              Current Weight
            </div>
            <div
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--fats-dark)" }}
            >
              {profile.currentWeightKg ?? "--"} kg
            </div>
          </div>

          <div className="nutrition-card-protein">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--protein-text)" }}
            >
              Target
            </div>
            <div
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--protein-dark)" }}
            >
              {profile.targetWeightKg ?? "--"} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
