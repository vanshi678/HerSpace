import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, tone = 'default' }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-plum-900/40 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-lifted p-6 animate-fade-up outline-none ${
          tone === 'emergency' ? 'border-t-4 sm:border-4 border-emergency' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          {title && <h2 className="font-display text-xl text-plum-900">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-full p-1.5 text-graysoft hover:bg-plum-50 hover:text-plum-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
