import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ContactsProvider } from './context/ContactsContext';
import { HistoryProvider } from './context/HistoryContext';
import { VaultProvider } from './context/VaultContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TrustedContacts from './pages/TrustedContacts';
import Sos from './pages/Sos';
import FakeCall from './pages/FakeCall';
import SafetyVault from './pages/SafetyVault';
import EmergencyHistory from './pages/EmergencyHistory';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ContactsProvider>
          <HistoryProvider>
            <VaultProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/contacts" element={<TrustedContacts />} />
                    <Route path="/sos" element={<Sos />} />
                    <Route path="/fake-call" element={<FakeCall />} />
                    <Route path="/vault" element={<SafetyVault />} />
                    <Route path="/history" element={<EmergencyHistory />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </VaultProvider>
          </HistoryProvider>
        </ContactsProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
