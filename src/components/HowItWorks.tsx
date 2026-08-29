import { MousePointerClick, Target, CalendarCheck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: MousePointerClick,
    title: 'Choose your platform',
    body: 'Select Instagram, Facebook, LinkedIn, TikTok, X, Pinterest, YouTube, Threads, or Reddit.',
  },
  {
    num: '02',
    icon: Target,
    title: 'Select your audience and day',
    body: 'Choose the audience type that best matches your account, then pick a day or view the full week.',
  },
  {
    num: '03',
    icon: CalendarCheck,
    title: 'Get your recommended schedule',
    body: 'Receive general posting windows adjusted to your selected audience timezone.',
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="how-heading" className="text-center font-display text-2xl font-bold text-slate-900">
          How It Works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
          Three quick steps to a recommended posting schedule.
        </p>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.num} className="relative rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              <span className="font-display text-3xl font-extrabold text-brand-200">{step.num}</span>
              <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
