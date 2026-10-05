import { MapPin, Users } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDateShort, formatTime } from '../../utils/formatters';
import { buildMapLink } from '../../utils/geo';

export default function HistoryEventCard({ event }) {
  return (
    <div className="bg-white/90 rounded-3xl shadow-softer p-5 flex gap-4">
      <div className="flex flex-col items-center pt-1">
        <span
          className={`w-3 h-3 rounded-full ${event.status === 'Activated' ? 'bg-emergency' : 'bg-graysoft-light'}`}
        />
        <span className="w-px flex-1 bg-plum-100 mt-2" />
      </div>

      <div className="flex-1 pb-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p className="text-sm font-semibold text-plum-900">
            {formatDateShort(event.startedAt)} &middot; {formatTime(event.startedAt)}
          </p>
          <Badge tone={event.status === 'Activated' ? 'activated' : 'cancelled'}>{event.status}</Badge>
        </div>

        <div className="flex flex-col gap-1.5 mt-2 text-xs text-graysoft-dark">
          {event.location ? (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-plum-500" />
              Location captured &middot;{' '}
              <a
                href={buildMapLink(event.location.latitude, event.location.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-plum-600 font-semibold hover:underline"
              >
                View on map
              </a>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              No location captured
            </span>
          )}
          {event.contactsNotified?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users size={13} className="text-plum-500" />
              Location shared during this event
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
