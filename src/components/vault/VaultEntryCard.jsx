import { Trash2, MapPin, Phone, FileText, ClipboardList } from 'lucide-react';

const CATEGORY_ICONS = {
  'Important Addresses': MapPin,
  'Emergency Numbers': Phone,
  'Personal Notes': FileText,
  'Important Instructions': ClipboardList,
};

export default function VaultEntryCard({ entry, onDelete }) {
  const Icon = CATEGORY_ICONS[entry.category] || FileText;

  return (
    <div className="bg-white/90 rounded-2xl shadow-softer p-4 flex items-start gap-3">
      <span className="w-9 h-9 rounded-xl bg-lavender-light flex items-center justify-center shrink-0">
        <Icon size={16} className="text-plum-600" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-plum-500 mb-0.5">{entry.category}</p>
        <p className="text-sm font-semibold text-plum-900">{entry.title}</p>
        <p className="text-sm text-graysoft-dark mt-1 whitespace-pre-wrap break-words">{entry.content}</p>
      </div>
      <button
        onClick={() => onDelete(entry)}
        aria-label={`Delete ${entry.title}`}
        className="rounded-full p-1.5 text-graysoft hover:bg-emergency-light hover:text-emergency-dark transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
