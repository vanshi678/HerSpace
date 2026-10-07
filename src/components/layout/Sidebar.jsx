import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Siren } from 'lucide-react';
import { navItems } from '../../routes/navConfig';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-[#E4EBDD] bg-white px-5 py-6">

      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-[#668F80] flex items-center justify-center shadow-softer">
          <ShieldCheck size={20} className="text-white" />
        </div>

        <div>
          <span className="font-display text-xl text-[#49695E] block">
            HerSpace
          </span>

          <span className="text-[10px] text-[#5E6E64]">
            your safety, your space ♥
          </span>
        </div>
      </div>

      {/* Emergency SOS */}
      <button
        onClick={() => navigate('/sos', { state: { autoStart: true } })}
        className="flex items-center justify-center gap-2.5 rounded-2xl bg-emergency text-white px-4 py-3.5 font-semibold text-sm mb-6 shadow-lifted hover:bg-emergency-dark transition-all active:scale-[.98]"
      >
        <Siren size={18} />
        Emergency SOS
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#E4EBDD] text-[#49695E]'
                  : 'text-[#5E6E64] hover:bg-[#F1F4EC] hover:text-[#49695E]'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.9} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[#E4EBDD] pt-4 mt-4">

        <div className="px-2 mb-3">
          <p className="text-sm font-semibold text-[#49695E] truncate">
            {user?.fullName}
          </p>

          <p className="text-xs text-[#5E6E64] truncate">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-[#5E6E64] hover:bg-[#F1F4EC] hover:text-[#49695E] transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>

      </div>
    </aside>
  );
}