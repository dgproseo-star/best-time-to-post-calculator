import { Sparkles } from 'lucide-react';
import { Badge } from './Badge';

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-[-8%] h-72 w-72 rounded-full bg-brand-100/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
        <Badge>100% Free • No Login • No API</Badge>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Best Time to Post on Social Media
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Find recommended posting times based on your social platform, audience, day, and timezone.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">
          Get general posting-time recommendations for Instagram, Facebook, LinkedIn, TikTok, X,
          Pinterest, YouTube, Threads, and Reddit, completely free.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-brand-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span>Recommendations adjusted to your audience's timezone</span>
        </div>
      </div>
    </header>
  );
}
