import { MapPin, Share2, Phone, XCircle, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { buildMapLink, buildTelLink } from '../../utils/geo';

export default function SosActiveScreen({
  locationStatus,
  locationError,
  position,
  contacts,
  onShare,
  onCancel,
  shareSupported,
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emergency" />
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-emergency-dark">SOS Active</h1>
      </div>

      <Card className="mb-5 border-emergency-light">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-2xl bg-emergency-light flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-emergency-dark" />
          </span>
          <div className="flex-1">
            {locationStatus === 'loading' && (
              <p className="text-sm text-graysoft-dark">Capturing your current location&hellip;</p>
            )}
            {locationStatus === 'success' && position && (
              <>
                <p className="text-sm font-semibold text-plum-900">Location captured</p>
                <p className="text-xs text-graysoft-dark mt-1">
                  Lat {position.latitude.toFixed(5)}, Lng {position.longitude.toFixed(5)}
                </p>
                <a
                  href={buildMapLink(position.latitude, position.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-semibold text-plum-600 hover:underline"
                >
                  Open in Maps &rarr;
                </a>
              </>
            )}
            {locationStatus === 'error' && (
              <>
                <p className="text-sm font-semibold text-emergency-dark flex items-center gap-1.5">
                  <AlertTriangle size={14} /> Location unavailable
                </p>
                <p className="text-xs text-graysoft-dark mt-1">{locationError}</p>
              </>
            )}
          </div>
        </div>
      </Card>

      <Button
        icon={Share2}
        full
        size="lg"
        variant="secondary"
        onClick={onShare}
        className="mb-5"
        disabled={locationStatus !== 'success'}
      >
        Share Location
      </Button>
      {!shareSupported && (
        <p className="text-xs text-graysoft text-center -mt-3 mb-5">
          Your browser doesn&rsquo;t support direct sharing — the map link will be copied instead.
        </p>
      )}

      <h2 className="font-display text-lg text-plum-900 mb-3">Trusted contacts</h2>
      {contacts.length === 0 ? (
        <Card className="mb-5">
          <p className="text-sm text-graysoft-dark">
            You haven&rsquo;t added any trusted contacts yet. Add them so you can reach people fast
            next time.
          </p>
        </Card>
      ) : (
        <div className="space-y-3 mb-5">
          {contacts.map((c) => (
            <div key={c.id} className="bg-white/90 rounded-2xl shadow-softer p-4 flex items-center gap-3">
              <Avatar name={c.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-plum-900 truncate">{c.name}</p>
                <p className="text-xs text-graysoft truncate">{c.relationship}</p>
              </div>
              <a
                href={buildTelLink(c.phone)}
                className="inline-flex items-center gap-1.5 rounded-pill bg-plum-600 text-white text-xs font-semibold px-4 py-2 hover:bg-plum-700 transition-colors"
              >
                <Phone size={13} /> Call {c.name.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>
      )}

      <Button icon={XCircle} variant="danger" full size="lg" onClick={onCancel}>
        Cancel SOS
      </Button>

      <p className="text-xs text-graysoft text-center mt-4 max-w-sm mx-auto">
        HerSpace cannot automatically contact emergency services or notify your contacts on its
        own. Use the buttons above to call or share — your device completes the action.
      </p>
    </div>
  );
}
