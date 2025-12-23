import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

type Props = {
  open: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
};

function ToastIcon({ type }: { type: ToastType }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24' };

  if (type === 'success') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </svg>
    );
  }

  if (type === 'warning') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 1.8 20.2a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L12 2Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (type === 'error') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6" />
        <path d="M9 9l6 6" />
      </svg>
    );
  }

  // info
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

export function Toast({
  open,
  message,
  type = 'success',
  onClose,
  duration = 1800,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const theme =
    type === 'success'
      ? {
          icon: 'text-emerald-500',
          bar: 'bg-emerald-500',
        }
      : type === 'warning'
      ? {
          icon: 'text-amber-400',
          bar: 'bg-amber-400',
        }
      : type === 'error'
      ? {
          icon: 'text-rose-500',
          bar: 'bg-rose-500',
        }
      : {
          icon: 'text-sky-500',
          bar: 'bg-sky-500',
        };

  return (
    <div className="fixed top-25 right-4 z-[9999]">
      <div
        className={[
          'w-[min(420px,calc(100vw-2rem))]',
          'bg-white',
          'border border-slate-200',
          'rounded-lg',
          'shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]',
          'overflow-hidden',
          'animate-[toast-in_160ms_ease-out]',
        ].join(' ')}
      >
        <div className="flex items-start gap-4 px-5 py-4">
          <div className={['mt-0.5', theme.icon].join(' ')}>
            <ToastIcon type={type} />
          </div>

          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-700 leading-snug">
              {message}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={['h-1 w-full', theme.bar].join(' ')} />

        <style>{`
          @keyframes toast-in {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
