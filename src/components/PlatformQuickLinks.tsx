import { ArrowRight } from 'lucide-react';
import { PLATFORMS, PLATFORM_META, type Platform } from '@/data/recommendations';

interface PlatformQuickLinksProps {
  onSelectPlatform: (platform: Platform) => void;
}

export function PlatformQuickLinks({ onSelectPlatform }: PlatformQuickLinksProps) {
  return (
    <section aria-labelledby="quicklinks-heading" className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="quicklinks-heading" className="font-display text-2xl font-bold text-slate-900">
          Find the Best Time for Your Platform
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Pick a platform to load it into the calculator above.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p) => {
            const meta = PLATFORM_META[p];
            return (
              <div
                key={p}
                className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/40 p-5 transition hover:border-brand-300 hover:shadow-sm"
              >
                <h3 className="font-display text-base font-bold text-slate-900">{meta.name}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">{meta.description}</p>
                <button
                  type="button"
                  onClick={() => onSelectPlatform(p)}
                  className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
                  aria-label={`Calculate ${p} posting time`}
                >
                  Calculate {p} Posting Time
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
