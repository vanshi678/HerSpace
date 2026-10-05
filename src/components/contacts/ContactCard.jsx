import { Phone, Pencil, Trash2 } from 'lucide-react';
import Avatar from '../common/Avatar';
import { buildTelLink } from '../../utils/geo';

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="bg-white/90 rounded-3xl shadow-softer p-5 flex flex-col gap-4 hover:shadow-soft transition-shadow">
      <div className="flex items-center gap-3">
        <Avatar name={contact.name} size="md" />
        <div className="min-w-0">
          <p className="font-semibold text-plum-900 truncate">{contact.name}</p>
          <p className="text-xs text-graysoft">{contact.relationship}</p>
        </div>
      </div>

      <p className="text-sm text-graysoft-dark">{contact.phone}</p>

      <div className="flex items-center gap-2 mt-auto pt-1">
        <a
          href={buildTelLink(contact.phone)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-pill bg-plum-600 text-white text-xs font-semibold py-2.5 hover:bg-plum-700 transition-colors"
        >
          <Phone size={14} /> Call
        </a>
        <button
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
          className="rounded-pill p-2.5 bg-plum-50 text-plum-600 hover:bg-plum-100 transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(contact)}
          aria-label={`Delete ${contact.name}`}
          className="rounded-pill p-2.5 bg-emergency-light text-emergency-dark hover:bg-emergency-light/70 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
