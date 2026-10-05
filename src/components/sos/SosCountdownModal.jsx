import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const COUNTDOWN_SECONDS = 5;

export default function SosCountdownModal({ open, onCancel, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setSecondsLeft(COUNTDOWN_SECONDS);
      return;
    }
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }
    timerRef.current = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, secondsLeft]);

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;

  return (
    <Modal open={open} onClose={onCancel} title="Confirm emergency SOS" tone="emergency">
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative w-28 h-28 mb-5">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#FCE4E8" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#E63950"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-emergency-dark">
            {secondsLeft}
          </span>
        </div>

        <p className="text-sm text-graysoft-dark mb-6 max-w-xs">
          HerSpace will capture your location and show your trusted contacts in{' '}
          <span className="font-semibold text-plum-800">{secondsLeft} second{secondsLeft !== 1 ? 's' : ''}</span>.
          Cancel now if this was a mistake.
        </p>

        <Button variant="danger" size="lg" full onClick={onCancel}>
          Cancel SOS
        </Button>
      </div>
    </Modal>
  );
}
