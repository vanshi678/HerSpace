export function buildMapLink(latitude, longitude) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

export function buildTelLink(phoneNumber) {
  const cleaned = (phoneNumber || '').replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

// Wraps navigator.geolocation in a promise. Callers must handle the
// rejection to show a graceful error message — this never fakes a location.
export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation isn\u2019t supported on this device.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        ...options,
      }
    );
  });
}
