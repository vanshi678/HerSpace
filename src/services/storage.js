// Thin wrapper around localStorage.
// Keeping all persistence behind this one module means a future backend
// (REST API, Firebase, etc.) can be swapped in by rewriting only this file.

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`HerSpace storage: failed to read "${key}"`, err);
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`HerSpace storage: failed to write "${key}"`, err);
    return false;
  }
}

export function removeKey(key) {
  localStorage.removeItem(key);
}

export const STORAGE_KEYS = {
  USERS: 'herspace_users',
  SESSION: 'herspace_session',
  CONTACTS: 'herspace_contacts',
  HISTORY: 'herspace_history',
  VAULT_PIN: 'herspace_vault_pin',
  VAULT_ENTRIES: 'herspace_vault_entries',
};
