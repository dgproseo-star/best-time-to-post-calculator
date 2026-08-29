import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What is the best time to post on social media?',
    answer:
      'There is no single best time that works for every account. Generally, mid-morning to early afternoon on weekdays sees strong engagement across most platforms. Use this calculator to get recommended posting windows for your platform, audience, and timezone, then compare them with your own analytics.',
  },
  {
    question: 'What are the best posting times for social media?',
    answer:
      'The best posting times depend on the platform, your audience type, the day of the week, and your audience\u2019s timezone. This tool provides general benchmark recommendations for each combination so you can start testing with a sensible default rather than guessing.',
  },
  {
    question: 'What is the best time to post on Instagram?',
    answer:
      'Instagram engagement often peaks between 10 AM and 2 PM on weekdays, with a secondary lift in the evening. Use the Instagram option in the calculator above to get a recommended window for any day, including weekends.',
  },
  {
    question: 'What are the best Instagram posting hours?',
    answer:
      'The best Instagram posting hours typically fall in the late morning to early afternoon, around 10 AM to 2 PM. For creator and student audiences, evening and weekend slots can perform just as well. Select Instagram and your audience type above to see specific recommendations.',
  },
  {
    question: 'What is the best time to post Facebook posts?',
    answer:
      'Facebook posts tend to perform well on weekday mornings and early afternoons, often between 9 AM and 1 PM. Use the Facebook option in the calculator with your audience type and timezone for a tailored recommendation.',
  },
  {
    question: 'What is the best time to post on LinkedIn?',
    answer:
      'LinkedIn is a professional network, so the best times to post on LinkedIn are during weekday business hours, typically 8 AM to 12 PM. Tuesday and Wednesday tend to see the strongest engagement. For B2B content, select LinkedIn with the B2B / Professionals audience type above.',
  },
  {
    question: 'What is the best time to post on TikTok?',
    answer:
      'TikTok engagement patterns differ from other platforms. Recommended posting windows often include weekday mornings and evenings, with strong weekend activity. Use the TikTok option in the calculator above and select your audience type for specific times.',
  },
  {
    question: 'What is the best time to post on X?',
    answer:
      'X (formerly Twitter) sees strong engagement during weekday mornings and midday, typically between 8 AM and 12 PM. Use the X option in the calculator with your audience type and timezone for a tailored recommendation.',
  },
  {
    question: 'Does the best posting time change by day?',
    answer:
      'Yes. Engagement patterns shift throughout the week. Weekdays generally see consistent activity, while weekends can be stronger for entertainment-focused content. Use the day selector in the calculator to find the recommended window for any specific day.',
  },
  {
    question: 'Does timezone affect the best time to post?',
    answer:
      'Timezone is one of the most important factors. Your audience is most active in their local time. This calculator converts general benchmark times into the timezone you select, so you can schedule posts when your audience is likely online.',
  },
  {
    question: 'Are these posting times guaranteed to increase engagement?',
    answer:
      'No. These recommendations are general industry benchmarks, not a guarantee of engagement. Your audience\u2019s actual behavior may differ. For the most accurate posting times, compare these recommendations with your own social media analytics.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="faq-heading" className="font-display text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 divide-y divide-slate-100">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="focus-ring flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 pr-8 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
