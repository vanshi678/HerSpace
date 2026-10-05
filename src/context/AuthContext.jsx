import { createContext, useContext, useState, useCallback } from 'react';
import { registerUser, loginUser, logoutUser, getSession } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const register = useCallback((payload) => {
    const session = registerUser(payload);
    setUser(session);
    return session;
  }, []);

  const login = useCallback((payload) => {
    const session = loginUser(payload);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: Boolean(user), register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
