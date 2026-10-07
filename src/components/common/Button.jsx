const VARIANTS = {
  primary: 'bg-[#668F80] text-white hover:bg-[#49695E]',
  secondary: 'bg-lavender text-plum-700 hover:bg-lavender-dark',
  outline: 'bg-white text-plum-700 border border-lavender-dark hover:bg-plum-50',
  ghost: 'bg-transparent text-plum-600 hover:bg-plum-50',
  emergency: 'bg-emergency text-white hover:bg-emergency-dark shadow-lifted',
  danger: 'bg-white text-emergency-dark border border-emergency-light hover:bg-emergency-light',
};

const SIZES = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

export default function Button({ children, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left', full = false, className = '', type = 'button', ...props }) {
  return (
    <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`} {...props}>
      {Icon && iconPosition === 'left' && <Icon size={18} strokeWidth={2} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} strokeWidth={2} />}
    </button>
  );
}
