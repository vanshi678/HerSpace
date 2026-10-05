export default function Card({ children, className = '', padded = true, ...props }) {
  return (
    <div className={`bg-white/90 rounded-3xl shadow-soft border border-lavender-light ${padded ? 'p-6' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
