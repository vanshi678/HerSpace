import { createContext, useContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, variant = 'success') => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => removeToast(id), 3800);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center w-full px-4 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto animate-fade-up max-w-sm w-full sm:w-auto flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lifted text-sm font-medium border ${
                t.variant === 'error'
                  ? 'bg-white text-emergency-dark border-emergency-light'
                  : t.variant === 'info'
                  ? 'bg-white text-plum-700 border-lavender-dark'
                  : 'bg-plum-700 text-white border-plum-700'
              }`}
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
