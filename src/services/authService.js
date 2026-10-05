import { readJSON, writeJSON, removeKey, STORAGE_KEYS } from './storage';

// NOTE: This is an MVP, frontend-only auth flow. Passwords are stored in
// localStorage for demo purposes only. A real backend must replace this
// with proper hashing, sessions, and validation before going to production.

function getUsers() {
  return readJSON(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  writeJSON(STORAGE_KEYS.USERS, users);
}

export function registerUser({ fullName, email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = {
    id: crypto.randomUUID(),
    fullName,
    email,
    password, // demo-only, replace with backend hashing
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, newUser]);
  const session = { id: newUser.id, fullName: newUser.fullName, email: newUser.email };
  writeJSON(STORAGE_KEYS.SESSION, session);
  return session;
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    throw new Error('That email and password don\u2019t match our records.');
  }
  const session = { id: user.id, fullName: user.fullName, email: user.email };
  writeJSON(STORAGE_KEYS.SESSION, session);
  return session;
}

export function logoutUser() {
  removeKey(STORAGE_KEYS.SESSION);
}

export function getSession() {
  return readJSON(STORAGE_KEYS.SESSION, null);
}
