import { History as HistoryIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import EmptyState from '../components/common/EmptyState';
import HistoryEventCard from '../components/history/HistoryEventCard';
import { useHistory } from '../context/HistoryContext';

export default function EmergencyHistory() {
  const { history } = useHistory();

  return (
    <div>
      <Header title="Emergency History" subtitle="A private record of your past SOS activity." />

      {history.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="No emergency activity yet"
          description="When you use SOS, a record of what happened — location, status, and timing — will appear here."
        />
      ) : (
        <div className="max-w-2xl space-y-4">
          {history.map((event) => (
            <HistoryEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
