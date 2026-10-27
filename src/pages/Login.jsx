import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import {
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';

import { auth, googleProvider } from '../firebase';
import { MobileAuthHero } from '../components/layout/AuthPanel';
import BotanicalBranch from '../components/decorations/BotanicalBranch';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login, googleLogin } = useAuth();
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

  // Email and password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });

      showToast('Welcome back!');

      navigate(location.state?.from || '/dashboard', {
        replace: true,
      });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Google login

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch(
        'https://herspace-qpl9.onrender.com/api/auth/google',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Google sign-in could not be completed.'
        );
      }

      // Save the user returned by the verified backend.
      googleLogin(data.user);

      showToast('Welcome to HerSpace!');

      navigate(location.state?.from || '/dashboard', {
        replace: true,
      });
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This website domain is not authorized in Firebase.');
      } else {
        setError(
          err.message || 'Google sign-in failed. Please try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warmwhite flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-lavender bg-white shadow-auth">
        <BotanicalBranch
          className="pointer-events-none absolute right-0 top-3 w-24 opacity-70 sm:w-28"
        />

        <div className="relative px-6 pt-9 sm:px-10 sm:pt-11">
          <MobileAuthHero />

          <div className="mt-9 text-center">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-500">
              Welcome back
            </p>

            <h2 className="font-display text-3xl leading-tight text-plum-900 sm:text-4xl">
              Ready when you are
            </h2>

            <p className="mt-3 text-sm text-graysoft-dark sm:text-base">
              Log in to your private safety space.
            </p>
          </div>
        </div>

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
                  showPassword ? 'Hide password' : 'Show password'
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
              {submitting ? 'Please wait…' : 'Log in'}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-lavender-dark/60" />
            <span className="text-xs text-graysoft">or</span>
            <span className="h-px flex-1 bg-lavender-dark/60" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-lavender bg-white px-5 py-4 font-semibold text-plum-800 shadow-softer transition-all hover:-translate-y-0.5 hover:bg-lavender-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.8 27.8a12 12 0 0 1 0-7.6v-5.3H5.9a20 20 0 0 0 0 18.2l6.9-5.3Z"
              />
              <path
                fill="#EA4335"
                d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.9 14.9l6.9 5.3c1.6-4.7 6-8.1 11.2-8.1Z"
              />
            </svg>

            {submitting
              ? 'Please wait…'
              : 'Continue with Google'}
          </button>

          <p className="mt-7 text-center text-sm text-graysoft-dark">
            New to HerSpace?{' '}
            <Link
              to="/register"
              className="font-bold text-pink-500 transition-colors hover:text-pink-600"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-graysoft">
            <ShieldCheck size={13} />
            Private safety space
          </p>
        </main>

        <BotanicalBranch
          className="pointer-events-none absolute bottom-0 left-0 w-24 opacity-50 sm:w-28"
          flip
        />
      </div>
    </div>
  );
}