import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import { MobileAuthHero } from '../components/layout/AuthPanel';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    if (form.password.length < 6) next.password = 'Use at least 6 characters.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords don’t match.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      register(form);
      showToast('Account created — welcome to HerSpace!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="auth-phone">
        <MobileAuthHero register />

        <main className="w-full max-w-[680px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12">
          <div className="text-center mb-8">
            <p className="inline-flex items-center gap-2 text-pink-500 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase mb-4">
              <Sparkles size={14} /> Create your account <Sparkles size={14} />
            </p>
            <h2 className="font-display text-4xl sm:text-[40px] leading-tight text-plum-900">
              Let’s get you started
            </h2>
            <p className="text-base sm:text-lg text-graysoft-dark mt-3">
              Create your private safety space.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input id="fullName" name="fullName" label="Full name" icon={User} placeholder="Jane Doe" autoComplete="name" required value={form.fullName} onChange={handleChange} error={errors.fullName} />
            <Input id="email" name="email" type="email" label="Email address" icon={Mail} placeholder="you@example.com" autoComplete="email" required value={form.email} onChange={handleChange} error={errors.email} />

            <div className="relative">
              <Input id="password" name="password" type={showPassword ? 'text' : 'password'} label="Password" icon={Lock} placeholder="Create a password" autoComplete="new-password" required value={form.password} onChange={handleChange} error={errors.password} className="pr-12" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-4 bottom-3.5 text-graysoft">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} label="Confirm password" icon={Lock} placeholder="Confirm your password" autoComplete="new-password" required value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} className="pr-12" />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 bottom-3.5 text-graysoft">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.form && (
              <p role="alert" className="text-sm font-medium text-emergency-dark bg-emergency-light rounded-xl px-4 py-2.5">
                {errors.form}
              </p>
            )}

            <Button type="submit" full size="lg" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <span className="h-px flex-1 bg-lavender-dark/60" />
            <span className="text-sm text-graysoft">or</span>
            <span className="h-px flex-1 bg-lavender-dark/60" />
          </div>

          <div className="flex justify-center gap-4">
            {['G', 'f', '●'].map((x, i) => (
              <button type="button" key={i} className="w-14 h-14 rounded-full border border-lavender bg-white shadow-softer text-plum-700 font-semibold">
                {x}
              </button>
            ))}
          </div>

          <p className="text-base text-graysoft-dark text-center mt-7">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 font-bold">
              Log in
            </Link>
          </p>

          <p className="text-xs text-graysoft text-center mt-7 flex items-center justify-center gap-1">
            <ShieldCheck size={13} /> Your information stays in your space
          </p>
        </main>
      </div>
    </div>
  );
}
