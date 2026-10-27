
import {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import {
  registerUser,
  loginUser,
  logoutUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const register = useCallback(async (payload) => {
    const session = await registerUser(payload);
    setUser(session);
    return session;
  }, []);

  const login = useCallback(async (payload) => {
    const session = await loginUser(payload);
    setUser(session);
    return session;
  }, []);

  // Google login: store the verified backend user.
  const googleLogin = useCallback((googleUser) => {
    setUser(googleUser);
    return googleUser;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    register,
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return ctx;
}
