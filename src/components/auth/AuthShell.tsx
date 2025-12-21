import React from 'react';

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--gradient-background)' }}
    >
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: 'var(--bg-emerald-light)',
              border: '1px solid var(--border-light)',
            }}
          >
            <span
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              PlateWise
            </span>
            <span className="text-sm font-semibold text-gradient">
              Nutrition
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gradient">{title}</h1>
          {subtitle ? (
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="card">{children}</div>
      </div>
    </div>
  );
}
