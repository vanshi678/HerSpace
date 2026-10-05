import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import SosButton from '../components/sos/SosButton';
import SosCountdownModal from '../components/sos/SosCountdownModal';
import SosActiveScreen from '../components/sos/SosActiveScreen';
import { useContacts } from '../context/ContactsContext';
import { useHistory } from '../context/HistoryContext';
import { useToast } from '../context/ToastContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { buildMapLink } from '../utils/geo';

export default function Sos() {
  const { contacts } = useContacts();
  const { addEvent, updateEvent } = useHistory();
  const { showToast } = useToast();
  const { position, status: locationStatus, error: locationError, requestLocation } = useGeolocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState('idle'); // idle | confirming | active
  const [eventId, setEventId] = useState(null);

  // Arriving here via the SOS button anywhere else in the app should jump
  // straight into the confirmation countdown.
  useEffect(() => {
    if (location.state?.autoStart) {
      setPhase('confirming');
    }
  }, [location.state]);

  const startCountdown = () => setPhase('confirming');

  const cancelDuringCountdown = () => {
    addEvent({ status: 'Cancelled', location: null });
    showToast('SOS cancelled', 'info');
    setPhase('idle');
  };

  const activateSos = useCallback(async () => {
    const id = addEvent({ status: 'Activated', location: null });
    setEventId(id);
    setPhase('active');
    try {
      const pos = await requestLocation();
      updateEvent(id, { location: { latitude: pos.latitude, longitude: pos.longitude } });
    } catch {
      // useGeolocation already captured the error for display; history keeps location null.
    }
  }, [addEvent, requestLocation, updateEvent]);

  const handleCancelActive = () => {
    if (eventId) {
      updateEvent(eventId, { status: 'Cancelled', endedAt: new Date().toISOString() });
    }
    showToast('SOS cancelled', 'info');
    setPhase('idle');
    setEventId(null);
  };

  const handleShare = async () => {
    if (!position) return;
    const mapLink = buildMapLink(position.latitude, position.longitude);
    const shareText = `I need help. Here's my current location: ${mapLink}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'HerSpace — Emergency location', text: shareText, url: mapLink });
        if (eventId) {
          updateEvent(eventId, { contactsNotified: contacts.map((c) => c.id) });
        }
      } catch {
        // user cancelled the share sheet — no action needed
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Location link copied — paste it to share', 'info');
      } catch {
        showToast('Couldn\u2019t copy the link automatically. Long-press to copy it manually.', 'error');
      }
    }
  };

  if (phase === 'active') {
    return (
      <div>
        <SosActiveScreen
          locationStatus={locationStatus}
          locationError={locationError}
          position={position}
          contacts={contacts}
          onShare={handleShare}
          onCancel={handleCancelActive}
          shareSupported={Boolean(navigator.share)}
        />
      </div>
    );
  }

  return (
    <div>
      <Header title="Emergency SOS" subtitle="One tap starts a short countdown, then alerts your circle." />

      <div className="flex flex-col items-center text-center py-8 sm:py-14">
        <SosButton onClick={startCountdown} />
        <p className="text-sm text-graysoft-dark max-w-sm mt-8">
          Tapping the button opens a 5-second confirmation so accidental taps don&rsquo;t trigger
          an alert. Once confirmed, HerSpace captures your location and shows your trusted
          contacts so you can call or share instantly.
        </p>

        {contacts.length === 0 && (
          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-plum-600 bg-lavender-light rounded-pill px-4 py-2">
            <ShieldAlert size={14} />
            <span>Add trusted contacts first for the fastest response.</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('/contacts')} className="!px-2 !py-0 underline">
              Add now
            </Button>
          </div>
        )}
      </div>

      <SosCountdownModal
        open={phase === 'confirming'}
        onCancel={cancelDuringCountdown}
        onComplete={activateSos}
      />
    </div>
  );
}
