import { Link } from 'react-router-dom';
import { History, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatDateShort, formatTime } from '../../utils/formatters';

export default function RecentActivity({ events }) {
  const recent = events.slice(0, 3);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-plum-900">Recent activity</h2>
        <Link to="/history" className="text-xs font-semibold text-plum-600 hover:underline flex items-center gap-0.5">
          View all <ChevronRight size={14} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          icon={History}
          title="No activity yet"
          description="Your SOS events will show up here once you use HerSpace."
        />
      ) : (
        <ul className="space-y-3">
          {recent.map((event) => (
            <li key={event.id} className="flex items-center justify-between gap-3 py-2">
              <div>
                <p className="text-sm font-semibold text-plum-800">
                  {formatDateShort(event.startedAt)} &middot; {formatTime(event.startedAt)}
                </p>
                <p className="text-xs text-graysoft-dark mt-0.5">
                  {event.location ? 'Location captured' : 'No location captured'}
                </p>
              </div>
              <Badge tone={event.status === 'Activated' ? 'activated' : 'cancelled'}>
                {event.status}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
