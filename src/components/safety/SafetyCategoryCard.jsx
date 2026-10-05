import { useState } from 'react';
import { ChevronDown, Car, Footprints, Home, Shield, MapPin, AlertCircle } from 'lucide-react';

const ICONS = {
  car: Car,
  footprints: Footprints,
  home: Home,
  shield: Shield,
  'map-pin': MapPin,
  'alert-circle': AlertCircle,
};

export default function SafetyCategoryCard({ category, forceOpen }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[category.icon] || Shield;
  const isOpen = forceOpen || open;

  return (
    <div className="bg-white/90 rounded-3xl shadow-softer overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="w-10 h-10 rounded-2xl bg-lavender-light flex items-center justify-center shrink-0">
          <Icon size={18} className="text-plum-600" strokeWidth={1.9} />
        </span>
        <span className="flex-1 font-semibold text-sm text-plum-900">{category.title}</span>
        <ChevronDown
          size={18}
          className={`text-graysoft transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="px-5 pb-5 space-y-2.5 animate-fade-up">
          {category.tips.map((tip, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-graysoft-dark leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-plum-300 mt-2 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
