import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Siren } from 'lucide-react';
import { navItems } from '../../routes/navConfig';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-lavender/80 bg-white/80 backdrop-blur-xl px-5 py-6">
      <div className="flex items-center gap-3 px-2 mb-8"><div className="w-10 h-10 rounded-2xl brand-gradient flex items-center justify-center shadow-softer"><ShieldCheck size={20} className="text-white" /></div><div><span className="font-display text-xl text-plum-800 block">HerSpace</span><span className="text-[10px] text-graysoft">your safety, your space ♥</span></div></div>
      <button onClick={() => navigate('/sos', { state: { autoStart: true } })} className="flex items-center justify-center gap-2.5 rounded-2xl bg-emergency text-white px-4 py-3.5 font-semibold text-sm mb-6 shadow-lifted hover:bg-emergency-dark transition-all active:scale-[.98]"><Siren size={18} /> Emergency SOS</button>
      <nav className="flex-1 flex flex-col gap-1">{navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${isActive ? 'bg-gradient-to-r from-lavender to-blush-light text-plum-800' : 'text-graysoft-dark hover:bg-plum-50 hover:text-plum-700'}`}><Icon size={18} strokeWidth={1.9} />{label}</NavLink>)}</nav>
      <div className="border-t border-lavender pt-4 mt-4"><div className="px-2 mb-3"><p className="text-sm font-semibold text-plum-800 truncate">{user?.fullName}</p><p className="text-xs text-graysoft truncate">{user?.email}</p></div><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-graysoft-dark hover:bg-plum-50 hover:text-plum-700 transition-colors"><LogOut size={18} />Log out</button></div>
    </aside>
  );
}
