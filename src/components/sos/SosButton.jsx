import { Siren } from 'lucide-react';

export default function SosButton({ onClick, size = 'lg', label = 'SOS' }) {
  const sizes = {
    lg: 'w-40 h-40 sm:w-48 sm:h-48 text-lg',
    md: 'w-28 h-28 text-sm',
  };

  return (
    <button
      onClick={onClick}
      aria-label="Trigger emergency SOS"
      className="relative inline-flex items-center justify-center group"
    >
      <span className="absolute inset-0 rounded-full bg-emergency/30 animate-pulse-ring" />
      <span
        className="absolute inset-0 rounded-full bg-emergency/30 animate-pulse-ring"
        style={{ animationDelay: '1.1s' }}
      />
      <span
        className={`relative ${sizes[size]} rounded-full bg-gradient-to-br from-emergency to-emergency-dark text-white flex flex-col items-center justify-center gap-1.5 shadow-lifted transition-transform duration-200 group-active:scale-95 group-hover:scale-[1.03]`}
      >
        <Siren size={size === 'lg' ? 36 : 26} strokeWidth={2} />
        <span className="font-display font-semibold tracking-wide">{label}</span>
      </span>
    </button>
  );
}
