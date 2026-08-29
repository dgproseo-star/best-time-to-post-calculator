import { ClipboardList, MapPin, Repeat, TrendingUp, Users } from 'lucide-react';

const TIPS = [
  {
    icon: TrendingUp,
    title: 'Test different posting times',
    body: 'Experiment with the recommended windows and nearby slots to see what your audience responds to best.',
  },
  {
    icon: ClipboardList,
    title: "Check your platform's own analytics",
    body: 'Instagram, Facebook, LinkedIn, TikTok, X, YouTube, and other platforms all show when your followers are most active. Use that data to fine-tune.',
  },
  {
    icon: MapPin,
    title: 'Consider where your audience lives',
    body: 'If most of your followers are in a different timezone, schedule around their day, not yours.',
  },
  {
    icon: Repeat,
    title: 'Track engagement over several weeks',
    body: 'A single good or bad day is not a trend. Give each posting time at least two to three weeks of testing.',
  },
  {
    icon: Users,
    title: 'Adjust based on actual audience behavior',
    body: 'These benchmarks are a starting point. Let your real engagement data guide your final schedule.',
  },
];

export function QuickTips() {
  return (
    <section aria-labelledby="tips-heading" className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="tips-heading" className="font-display text-2xl font-bold text-slate-900">
          Quick Tips for Better Posting
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <li
              key={tip.title}
              className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <tip.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{tip.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
