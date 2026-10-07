import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BotanicalBranch from '../components/decorations/BotanicalBranch';
import {
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

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

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      login(form);
      showToast('Welcome back!');
      navigate(location.state?.from || '/dashboard', {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warmwhite flex items-center justify-center px-4 py-8 sm:px-6">

      {/* Login card */}
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-lavender bg-white shadow-auth">

        <BotanicalBranch
          className="absolute right-0 top-3 w-24 sm:w-28 opacity-70"
          flip={false}
        />

        {/* Header */}
        <div className="relative px-6 pt-9 sm:px-10 sm:pt-11">
          <MobileAuthHero />

          <div className="mt-9 text-center">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-500">
              <Sparkles size={13} />
              Welcome back
              <Sparkles size={13} />
            </p>

            <h2 className="font-display text-3xl sm:text-4xl leading-tight text-plum-900">
              Ready when you are
            </h2>

            <p className="mt-3 text-sm sm:text-base text-graysoft-dark">
              Log in to your private safety space.
            </p>
          </div>
        </div>

        {/* Form */}
        <main className="relative px-6 pb-8 pt-8 sm:px-10 sm:pb-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
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
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                className="absolute right-4 bottom-3.5 text-graysoft transition-colors hover:text-plum-600"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-emergency-light px-4 py-2.5 text-sm font-medium text-emergency-dark"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              full
              size="lg"
              disabled={submitting}
            >
              {submitting ? 'Logging in…' : 'Log in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-lavender-dark/60" />

            <span className="text-xs text-graysoft">
              or
            </span>

            <span className="h-px flex-1 bg-lavender-dark/60" />
          </div>

          {/* Social buttons */}
          <div className="flex justify-center gap-3">
            {['G', 'f', '●'].map((x, i) => (
              <button
                type="button"
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-lavender bg-white font-semibold text-plum-700 shadow-softer transition-all hover:bg-lavender-light hover:-translate-y-0.5"
              >
                {x}
              </button>
            ))}
          </div>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-graysoft-dark">
            New to HerSpace?{' '}
            <Link
              to="/register"
              className="font-bold text-pink-500 transition-colors hover:text-pink-600"
            >
              Create an account
            </Link>
          </p>

          {/* Privacy */}
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-graysoft">
            <ShieldCheck size={13} />
            Private safety space
          </p>
        </main>
        <BotanicalBranch
  className="absolute bottom-0 left-0 w-24 sm:w-28 opacity-50"
  flip={true}
/>
      </div>
    </div>
  );
}