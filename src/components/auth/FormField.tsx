import React from 'react';

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-sm font-semibold"
        style={{ color: 'var(--text-primary)' }}
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        'w-full rounded-xl px-4 py-3 outline-none transition border ' +
        (props.className ?? '')
      }
      style={{
        background: 'var(--bg-primary)',
        borderColor: 'var(--border-light)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        props.onBlur?.(e);
      }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        'w-full rounded-xl px-4 py-3 outline-none transition border ' +
        (props.className ?? '')
      }
      style={{
        background: 'var(--bg-primary)',
        borderColor: 'var(--border-light)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        props.onBlur?.(e);
      }}
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={
        'w-full rounded-xl px-4 py-3 outline-none transition border min-h-[96px] ' +
        (props.className ?? '')
      }
      style={{
        background: 'var(--bg-primary)',
        borderColor: 'var(--border-light)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        props.onBlur?.(e);
      }}
    />
  );
}
