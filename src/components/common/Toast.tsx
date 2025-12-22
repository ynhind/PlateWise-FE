import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export function Toast({
  open,
  message,
  type = 'success',
  onClose,
  duration = 1800,
}: {
  open: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const cls =
    type === 'success'
      ? 'alert-success'
      : type === 'error'
      ? 'alert-error'
      : type === 'warning'
      ? 'alert-warning'
      : 'alert-info';

  return (
    <div className="fixed top-20 right-4 z-[9999] animate-fade-up">
      <div className={`${cls} shadow-glow flex items-center gap-2`}>
        <span className="text-sm font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-sm underline opacity-80 hover:opacity-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}
