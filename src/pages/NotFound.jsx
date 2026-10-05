import { Link } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-2xl bg-plum-600 flex items-center justify-center">
          <ShieldCheck size={18} className="text-white" />
        </div>
        <span className="font-display text-lg text-plum-800">HerSpace</span>
      </div>

      <div className="w-16 h-16 rounded-full bg-lavender-light flex items-center justify-center mb-5">
        <Compass size={26} className="text-plum-500" strokeWidth={1.75} />
      </div>

      <h1 className="font-display text-3xl text-plum-900 mb-2">Page not found</h1>
      <p className="text-sm text-graysoft-dark max-w-xs mb-8">
        This page doesn&rsquo;t exist, but your safety tools are always where you left them.
      </p>

      <Link to="/dashboard">
        <Button size="lg">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
