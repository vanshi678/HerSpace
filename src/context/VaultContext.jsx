import { createContext, useContext, useState, useCallback } from 'react';
import { readJSON, writeJSON, STORAGE_KEYS } from '../services/storage';

// MVP-only PIN gate. This is a frontend convenience, not real encryption.
// A production build must move entry storage and PIN verification to a
// backend with proper encryption at rest.

const VaultContext = createContext(null);

export function VaultProvider({ children }) {
  const [entries, setEntries] = useState(() => readJSON(STORAGE_KEYS.VAULT_ENTRIES, []));
  const [unlocked, setUnlocked] = useState(false);

  const hasPin = () => Boolean(readJSON(STORAGE_KEYS.VAULT_PIN, null));

  const setPin = useCallback((pin) => {
    writeJSON(STORAGE_KEYS.VAULT_PIN, pin);
    setUnlocked(true);
  }, []);

  const unlock = useCallback((pin) => {
    const storedPin = readJSON(STORAGE_KEYS.VAULT_PIN, null);
    if (pin === storedPin) {
      setUnlocked(true);
      return true;
    }
    return false;
  }, []);

  const lock = useCallback(() => setUnlocked(false), []);

  const persistEntries = useCallback((next) => {
    setEntries(next);
    writeJSON(STORAGE_KEYS.VAULT_ENTRIES, next);
  }, []);

  const addEntry = useCallback(
    (entry) => {
      const newEntry = { id: crypto.randomUUID(), ...entry };
      persistEntries([newEntry, ...entries]);
    },
    [entries, persistEntries]
  );

  const deleteEntry = useCallback(
    (id) => {
      persistEntries(entries.filter((e) => e.id !== id));
    },
    [entries, persistEntries]
  );

  const value = { entries, unlocked, hasPin, setPin, unlock, lock, addEntry, deleteEntry };

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error('useVault must be used within VaultProvider');
  return ctx;
}
