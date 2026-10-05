import { ShieldCheck } from 'lucide-react';

export default function AuthPanel() {
  return null;
}

export function MobileAuthHero({ register = false }) {
  return (
    <section className="relative brand-gradient text-white min-h-[360px] sm:min-h-[385px] flex items-start justify-center overflow-hidden">
      <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute top-32 -left-24 w-72 h-72 rounded-full bg-white/10" />

      <div className="relative z-10 text-center px-6 pt-12 sm:pt-14">
        <div className="mx-auto w-20 h-20 rounded-[26px] bg-white/20 border border-white/25 flex items-center justify-center shadow-lg mb-5 backdrop-blur-sm">
          <ShieldCheck size={40} strokeWidth={2.2} />
        </div>

        <h1 className="font-display text-[46px] sm:text-[54px] leading-none">
          HerSpace
        </h1>

        <p className="mt-3 text-lg sm:text-xl text-white/95">
          Your safety, your space ♥
        </p>
      </div>

      <div className="absolute left-0 right-0 bottom-[-1px] h-[92px] bg-white rounded-[50%_50%_0_0/100%_100%_0_0]" />
    </section>
  );
}
