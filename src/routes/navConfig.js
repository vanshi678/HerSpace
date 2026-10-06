import { Home, Users, PhoneCall, Lock, History } from 'lucide-react';

export const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/fake-call', label: 'Fake Call', icon: PhoneCall },
  { to: '/vault', label: 'Vault', icon: Lock },
  { to: '/history', label: 'History', icon: History },
];
