import { createContext, useContext, useState, useCallback } from 'react';
import { readJSON, writeJSON, STORAGE_KEYS } from '../services/storage';

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => readJSON(STORAGE_KEYS.CONTACTS, []));

  const persist = useCallback((next) => {
    setContacts(next);
    writeJSON(STORAGE_KEYS.CONTACTS, next);
  }, []);

  const addContact = useCallback(
    (contact) => {
      const newContact = { id: crypto.randomUUID(), ...contact };
      persist([newContact, ...contacts]);
      return newContact;
    },
    [contacts, persist]
  );

  const updateContact = useCallback(
    (id, updates) => {
      persist(contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    },
    [contacts, persist]
  );

  const deleteContact = useCallback(
    (id) => {
      persist(contacts.filter((c) => c.id !== id));
    },
    [contacts, persist]
  );

  const value = { contacts, addContact, updateContact, deleteContact };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts must be used within ContactsProvider');
  return ctx;
}
