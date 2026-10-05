import { useNavigate } from 'react-router-dom';
import { Users, PhoneCall, BookOpen, Lock } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import SosButton from '../components/sos/SosButton';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useAuth } from '../context/AuthContext';
import { useContacts } from '../context/ContactsContext';
import { useHistory } from '../context/HistoryContext';
import { formatFullDate } from '../utils/formatters';

export default function Dashboard() {
  const { user } = useAuth();
  const { contacts } = useContacts();
  const { history } = useHistory();
  const navigate = useNavigate();

  const firstName = user?.fullName?.split(' ')[0] || 'there';

  return (
    <div>
      <Header title={`Welcome back, ${firstName}`} subtitle={formatFullDate()} />

      <Card className="mb-6 !p-0 overflow-hidden bg-gradient-to-br from-plum-700 to-plum-600 text-white border-0">
        <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-8 md:py-10">
          <div className="flex-1 text-center md:text-left">
            <p className="uppercase tracking-widest text-xs text-plum-200 font-semibold mb-2">
              Your safety, one tap away
            </p>
            <h2 className="font-display text-2xl sm:text-3xl leading-snug mb-3">
              Everything you need, calm and ready.
            </h2>
            <p className="text-sm text-plum-100/85 max-w-md">
              Press the SOS button any time you feel unsafe. HerSpace will start a short
              countdown, capture your location, and get your trusted contacts on screen.
            </p>
          </div>
          <SosButton onClick={() => navigate('/sos', { state: { autoStart: true } })} />
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <QuickActionCard to="/contacts" icon={Users} label="My Contacts" tint="lavender" />
        <QuickActionCard to="/fake-call" icon={PhoneCall} label="Fake Call" tint="blush" />
        <QuickActionCard to="/safety-hub" icon={BookOpen} label="Safety Hub" tint="lavender" />
        <QuickActionCard to="/vault" icon={Lock} label="Safety Vault" tint="plum" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RecentActivity events={history} />

        <Card>
          <h2 className="font-display text-lg text-plum-900 mb-4">Trusted contacts</h2>
          {contacts.length === 0 ? (
            <p className="text-sm text-graysoft-dark">
              You haven&rsquo;t added anyone yet. Add a trusted contact so HerSpace can reach
              them fast during an SOS.
            </p>
          ) : (
            <ul className="space-y-3 mb-4">
              {contacts.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-plum-800">{c.name}</span>
                  <span className="text-graysoft">{c.relationship}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => navigate('/contacts')}
            className="text-xs font-semibold text-plum-600 hover:underline"
          >
            Manage contacts &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
}
