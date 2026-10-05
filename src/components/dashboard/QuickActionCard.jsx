import { Link } from 'react-router-dom';

export default function QuickActionCard({ to, icon: Icon, label, tint = 'lavender' }) {
  const tints = {
    lavender: 'bg-lavender-light group-hover:bg-lavender',
    blush: 'bg-blush-light group-hover:bg-blush',
    plum: 'bg-plum-50 group-hover:bg-plum-100',
  };

  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-3 bg-white/90 rounded-3xl shadow-softer hover:shadow-soft p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
    >
      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${tints[tint]}`}>
        <Icon size={22} className="text-plum-600" strokeWidth={1.9} />
      </span>
      <span className="text-sm font-semibold text-plum-800">{label}</span>
    </Link>
  );
}
