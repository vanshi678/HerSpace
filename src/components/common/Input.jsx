export default function Input({ label, id, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-semibold text-plum-700 mb-2">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-plum-500" />}
        <input id={id} className={`w-full rounded-2xl border border-lavender-dark/70 bg-white py-3.5 ${Icon ? 'pl-11' : 'pl-4'} pr-4 text-sm text-plum-900 placeholder:text-graysoft-light shadow-sm focus:border-pink-400 focus:ring-4 focus:ring-pink-400/10 outline-none transition-all ${error ? 'border-emergency-dark' : ''} ${className}`} {...props} />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-emergency-dark">{error}</p>}
    </div>
  );
}
