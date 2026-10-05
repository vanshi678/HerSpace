const TONES = {
  activated: 'bg-emergency-light text-emergency-dark',
  cancelled: 'bg-plum-50 text-graysoft-dark',
  success: 'bg-lavender-light text-plum-700',
  neutral: 'bg-plum-50 text-plum-600',
};

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
