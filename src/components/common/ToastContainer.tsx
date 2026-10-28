import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAgriShield();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start justify-between gap-3 backdrop-blur-md transition-all duration-200 animate-slide-up ${
              toast.type === 'danger'
                ? 'bg-charcoal-800/95 border-agri-red/40 text-agri-text-primary shadow-glow-red'
                : toast.type === 'warning'
                ? 'bg-charcoal-800/95 border-agri-amber/40 text-agri-text-primary shadow-glow-amber'
                : toast.type === 'success'
                ? 'bg-charcoal-800/95 border-agri-emerald/40 text-agri-text-primary shadow-glow-emerald'
                : 'bg-charcoal-800/95 border-charcoal-700 text-agri-text-primary'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">
                {toast.type === 'danger' && <AlertCircle className="w-4 h-4 text-agri-red" />}
                {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-agri-amber" />}
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-agri-emerald" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-agri-cyan" />}
              </div>
              <div className="text-xs">
                <p className="font-medium leading-snug">{toast.message}</p>
                <span className="text-[10px] text-agri-text-muted font-mono mt-0.5 block">{toast.timestamp}</span>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-agri-text-muted hover:text-agri-text-primary p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
