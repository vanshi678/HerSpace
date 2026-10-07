import { ShieldCheck } from 'lucide-react';

export default function AuthPanel() {
  return null;
}

export function MobileAuthHero() {
  return (
    <section className="relative bg-transparent overflow-hidden">
      {/* Small botanical decoration */}

      <div className="relative z-10 flex flex-col items-center pt-2 sm:pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender">
            <ShieldCheck
              size={21}
              strokeWidth={2}
              className="text-plum-600"
            />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            <span className="text-plum-700">Her</span>
            <span className="text-pink-500">Space</span>
          </h1>
        </div>

        <p className="mt-2 text-xs sm:text-sm text-graysoft-dark">
          Your safety, your space ♥
        </p>
      </div>
    </section>
  );
}