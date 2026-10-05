import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import { MobileAuthHero } from '../components/layout/AuthPanel';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      login(form);
      showToast('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="auth-phone">
        <MobileAuthHero />

        <main className="w-full max-w-[680px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 text-pink-500 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase mb-4">
              <Sparkles size={14} /> Welcome back <Sparkles size={14} />
            </p>
            <h2 className="font-display text-4xl sm:text-[42px] leading-tight text-plum-900">
              Ready when you are
            </h2>
            <p className="text-base sm:text-lg text-graysoft-dark mt-3">
              Log in to your private safety space.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              icon={Mail}
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                icon={Lock}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="pr-12"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 bottom-3.5 text-graysoft hover:text-plum-600"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-emergency-dark bg-emergency-light rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <Button type="submit" full size="lg" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-8">
            <span className="h-px flex-1 bg-lavender-dark/60" />
            <span className="text-sm text-graysoft">or</span>
            <span className="h-px flex-1 bg-lavender-dark/60" />
          </div>

          <div className="flex justify-center gap-4">
            {['G', 'f', '●'].map((x, i) => (
              <button
                type="button"
                key={i}
                className="w-14 h-14 rounded-full border border-lavender bg-white shadow-softer text-plum-700 font-semibold hover:bg-plum-50"
              >
                {x}
              </button>
            ))}
          </div>

          <p className="text-base text-graysoft-dark text-center mt-8">
            New to HerSpace?{' '}
            <Link to="/register" className="text-pink-500 font-bold hover:text-pink-600">
              Create an account
            </Link>
          </p>

          <p className="text-xs text-graysoft text-center mt-8 flex items-center justify-center gap-1">
            <ShieldCheck size={13} /> Private safety space
          </p>
        </main>
      </div>
    </div>
  );
}
