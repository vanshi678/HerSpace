
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import {
  Mail,
  Lock,
  User,
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

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }

    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      next.email = 'Please enter a valid email address.';
    }

    if (form.password.length < 8) {
      next.password = 'Use at least 8 characters.';
    }

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'Passwords don’t match.';
    }

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      showToast('Account created — welcome to HerSpace!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({
        form: err.message || 'Unable to create account. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrors({});
    setSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch(
        'https://herspace-qpl9.onrender.com/api/auth/google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Google sign-up could not be completed.'
        );
      }

      showToast('Welcome to HerSpace!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        setErrors({
          form: 'Google sign-in was cancelled. Please try again.',
        });
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrors({
          form: 'This website domain is not authorized in Firebase.',
        });
      } else {
        setErrors({
          form: err.message || 'Google sign-up failed. Please try again.',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warmwhite flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="relative isolate w-full max-w-[680px] overflow-hidden rounded-[28px] border border-lavender bg-white shadow-auth">
        <BotanicalBranch
          className="pointer-events-none absolute -top-1 -right-2 z-0 hidden h-[175px] w-[135px] opacity-90 sm:block"
        />

        <BotanicalBranch
          flip
          className="pointer-events-none absolute bottom-0 -left-3 z-0 hidden h-[165px] w-[125px] opacity-90 sm:block"
        />

        <div className="relative z-10">
          <MobileAuthHero register />

          <main className="w-full px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="mb-8 text-center">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-pink-500 sm:text-sm">
                Create your account
              </p>

              <h2 className="font-display text-4xl leading-tight text-plum-900 sm:text-[40px]">
                Let’s get you started
              </h2>

              <p className="mt-3 text-base text-graysoft-dark sm:text-lg">
                Create your private safety space.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <Input
                id="fullName"
                name="fullName"
                label="Full name"
                icon={User}
                placeholder="Jane Doe"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

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
                error={errors.email}
              />

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  icon={Lock}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  className="pr-12"
                />

                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute bottom-3.5 right-4 text-graysoft"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  label="Confirm password"
                  icon={Lock}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  className="pr-12"
                />

                <button
                  type="button"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  onClick={() => setShowConfirm((value) => !value)}
                  className="absolute bottom-3.5 right-4 text-graysoft"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.form && (
                <p
                  role="alert"
                  className="rounded-xl bg-emergency-light px-4 py-2.5 text-sm font-medium text-emergency-dark"
                >
                  {errors.form}
                </p>
              )}

              <Button type="submit" full size="lg" disabled={submitting}>
                {submitting ? 'Creating account…' : 'Create account'}
              </Button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-lavender-dark/60" />
              <span className="text-sm text-graysoft">or</span>
              <span className="h-px flex-1 bg-lavender-dark/60" />
            </div>


            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleRegister}
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

                {submitting ? 'Please wait…' : 'Sign up with Google'}
              </button>
            </div>


            <p className="mt-7 text-center text-base text-graysoft-dark">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-pink-500">
                Log in
              </Link>
            </p>

            <p className="mt-7 flex items-center justify-center gap-1 text-center text-xs text-graysoft">
              <ShieldCheck size={13} />
              Your information stays in your space
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
