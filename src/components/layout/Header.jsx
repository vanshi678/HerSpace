
import { ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header({ title, subtitle, action }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="mb-6">
      <div className="md:hidden flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl brand-gradient flex items-center justify-center shadow-softer">
            <ShieldCheck size={18} className="text-white" />
          </div>

          <div>
            <span className="font-display text-lg text-plum-800 block">
              HerSpace
            </span>
            <span className="text-[9px] text-graysoft">
              your safety, your space ♥
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          className="flex items-center gap-2 rounded-xl border border-lavender px-3 py-2 text-sm font-medium text-plum-700 hover:bg-lavender-light"
        >
          <LogOut size={17} />
          <span>Log out</span>
        </button>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-plum-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-graysoft-dark mt-1">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
