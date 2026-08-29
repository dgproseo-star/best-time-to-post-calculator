import { Info } from 'lucide-react';

export function Disclaimer() {
  return (
    <section aria-label="Disclaimer" className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
        <Info className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-amber-900">
          These recommendations are general industry benchmarks, not a guarantee of engagement. Your
          audience's actual behavior may differ. For the most accurate results, compare these
          recommendations with your own social media analytics.
        </p>
      </div>
    </section>
  );
}
