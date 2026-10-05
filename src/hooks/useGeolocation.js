import { useState, useCallback } from 'react';
import { getCurrentPosition } from '../utils/geo';

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const requestLocation = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const pos = await getCurrentPosition();
      setPosition(pos);
      setStatus('success');
      return pos;
    } catch (err) {
      let message = 'Couldn\u2019t get your location. Please try again.';
      if (err.code === 1) message = 'Location access was denied. Enable it in your browser settings to share your location during SOS.';
      if (err.code === 2) message = 'Your location is currently unavailable.';
      if (err.code === 3) message = 'Getting your location timed out. Please try again.';
      setError(message);
      setStatus('error');
      throw new Error(message);
    }
  }, []);

  return { position, status, error, requestLocation };
}
