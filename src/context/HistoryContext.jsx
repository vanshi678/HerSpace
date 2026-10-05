import { createContext, useContext, useState, useCallback } from 'react';
import { readJSON, writeJSON, STORAGE_KEYS } from '../services/storage';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => readJSON(STORAGE_KEYS.HISTORY, []));

  const persist = useCallback((next) => {
    setHistory(next);
    writeJSON(STORAGE_KEYS.HISTORY, next);
  }, []);

  // Adds a new SOS event and returns its id so the caller can update it later.
  const addEvent = useCallback(
    (event) => {
      const id = crypto.randomUUID();
      const newEvent = {
        id,
        status: 'Activated',
        startedAt: new Date().toISOString(),
        location: null,
        contactsNotified: [],
        ...event,
      };
      persist([newEvent, ...history]);
      return id;
    },
    [history, persist]
  );

  const updateEvent = useCallback(
    (id, updates) => {
      persist(history.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    },
    [history, persist]
  );

  const clearHistory = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = { history, addEvent, updateEvent, clearHistory };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
}
