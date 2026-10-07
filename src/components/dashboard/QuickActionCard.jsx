import { Link } from 'react-router-dom';

export default function QuickActionCard({ to, icon: Icon, label, tint = 'lavender' }) {
  const tints = {
    lavender: 'bg-[#E4EBDD] group-hover:bg-[#A8B9A3]',
    blush: 'bg-[#E4EBDD] group-hover:bg-[#A8B9A3]',
    plum: 'bg-[#E4EBDD] group-hover:bg-[#A8B9A3]',
  };

  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-3 bg-white/90 rounded-3xl shadow-softer hover:shadow-soft p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
    >
      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${tints[tint]}`}>
        <Icon size={22} className="text-[#49695E]" strokeWidth={1.9} />
      </span>
      <span className="text-sm font-semibold text-[#24352F]">{label}</span>
    </Link>
  );
}
