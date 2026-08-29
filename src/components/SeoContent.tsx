import { ArrowRight, Database, Globe, ShieldCheck, Users } from 'lucide-react';
import type { Platform } from '@/data/recommendations';

interface SeoContentProps {
  onSelectPlatform: (platform: Platform) => void;
}

interface PlatformSection {
  platform: Platform;
  heading: string;
  paragraphs: string[];
  buttonText: string;
}

const PLATFORM_SECTIONS: PlatformSection[] = [
  {
    platform: 'Instagram',
    heading: 'Best Time to Post on Instagram',
    paragraphs: [
      'Instagram engagement is often stronger from late morning into the afternoon on weekdays, with another opportunity in the evening. For many accounts, the best Instagram posting hours are around 10 AM to 2 PM, based on the local time of your audience.',
      'If you are planning your 2026 content calendar, there is no single posting time that works for every Instagram account. Your followers, location, content type, and day of the week can all make a difference. Use the calculator above to find a suggested time for a specific day, such as Sunday, then compare it with your Instagram Insights to see when your audience is most active.',
    ],
    buttonText: 'Find Your Instagram Posting Time',
  },
  {
    platform: 'Facebook',
    heading: 'When to Post on Facebook',
    paragraphs: [
      'Facebook activity often follows the rhythm of the working week. Many Pages see steady engagement during the morning and around lunchtime, with weekday activity generally stronger than weekends.',
      'A good starting point is to test morning and early afternoon posts, then compare the results with your Page Insights. Your audience\'s location, age, interests, and daily routine can all affect when people are most likely to see and interact with your content.',
      'Use the calculator above to get a suggested window based on your audience type, day, and timezone.',
    ],
    buttonText: 'Check Facebook Posting Times',
  },
  {
    platform: 'LinkedIn',
    heading: 'LinkedIn Posting Times',
    paragraphs: [
      'LinkedIn tends to fit naturally around the working day. Professional audiences are often more active during weekday mornings and around the middle of the day, while weekends can be quieter for many business-focused accounts.',
      'If you are sharing B2B content, company updates, industry insights, or professional advice, start by testing weekday posting windows. Then use your LinkedIn analytics to see when your audience is actually responding.',
      'Choose "B2B / Professionals" in the calculator above if that best describes the people you want to reach.',
    ],
    buttonText: 'Check LinkedIn Posting Times',
  },
  {
    platform: 'TikTok',
    heading: 'TikTok Posting Times',
    paragraphs: [
      'TikTok can behave differently from traditional social networks. Audience activity may build at different points throughout the day, with both morning and evening periods worth testing.',
      'Your results can depend heavily on your viewers, location, content style, and the type of videos you publish. Rather than relying on one fixed time, test several posting windows and compare views, watch time, shares, and engagement over a few weeks.',
      'Use the calculator to explore a starting point for different days and audience types.',
    ],
    buttonText: 'Check TikTok Posting Times',
  },
  {
    platform: 'X',
    heading: 'Posting on X (Twitter)',
    paragraphs: [
      'X moves quickly, so timing can matter when you are trying to join an active conversation. Weekday mornings and midday are useful starting points for many accounts, although activity can vary considerably by topic and audience.',
      'A finance account, news account, creator, and entertainment account may all see different patterns. Set your audience\'s timezone in the calculator and test different windows rather than relying on a single schedule.',
      'Your own engagement data will help you identify when your followers are most likely to notice and respond to your posts.',
    ],
    buttonText: 'Check X Posting Times',
  },
];

const METHODOLOGY_POINTS = [
  { icon: Database, text: 'The calculator uses general social media benchmarks organized by platform and audience type.' },
  { icon: Users, text: 'Audience type matters because a B2B audience behaves differently from a consumer or student audience.' },
  { icon: Globe, text: 'Times are presented in your selected audience timezone using native browser timezone support.' },
  { icon: ShieldCheck, text: 'These suggestions are not based on access to your personal social media account or private analytics.' },
];

export function SeoContent({ onSelectPlatform }: SeoContentProps) {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto mt-12 max-w-4xl space-y-12 px-4 sm:px-6">
      {/* Main SEO content */}
      <section aria-labelledby="best-times-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="best-times-heading" className="font-display text-2xl font-bold text-slate-900">
          Best Times to Post on Social Media
        </h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            The best time to post on social media depends on several factors: which platform you are
            using, who your audience is, where they live, their timezone, the day of the week, your
            industry, and your audience's historical behavior. No single posting time works for
            every account.
          </p>
          <p>
            This free calculator uses general benchmarks to recommend posting windows for Instagram,
            Facebook, LinkedIn, TikTok, X, Pinterest, YouTube, Threads, and Reddit. Pick your
            platform, audience type, day, and timezone above to get a suggested schedule in seconds.
          </p>
        </div>
      </section>

      {/* Platform-specific sections */}
      {PLATFORM_SECTIONS.map((section) => (
        <section
          key={section.platform}
          aria-labelledby={`section-${section.platform.toLowerCase()}`}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <h2
            id={`section-${section.platform.toLowerCase()}`}
            className="font-display text-xl font-bold text-slate-900"
          >
            {section.heading}
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onSelectPlatform(section.platform)}
            className="focus-ring mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
          >
            {section.buttonText}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      ))}

      {/* Day-based content */}
      <section aria-labelledby="day-based-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="day-based-heading" className="font-display text-2xl font-bold text-slate-900">
          How the Week Breaks Down
        </h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            The day you publish can matter just as much as the hour you choose. Tuesday through
            Thursday often provide strong opportunities for business and professional content, while
            Friday and the weekend can behave differently depending on the platform.
          </p>
          <p>
            There is an important difference between social networks, too. LinkedIn tends to follow
            the working week, while platforms built around entertainment and short-form content can
            remain active outside traditional business hours.
          </p>
          <p>
            Use the day selector above to compare different posting windows. If you want to check
            something specific, such as Instagram on Sunday, select the platform and day to get a
            suggested time for your audience timezone.
          </p>
        </div>
      </section>

      {/* 2026 content */}
      <section aria-labelledby="year-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="year-heading" className="font-display text-2xl font-bold text-slate-900">
          What's Changed for {year}
        </h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            Social media habits do not stay the same forever. Platforms change, audiences shift, and
            the way people consume content continues to evolve. A posting schedule that worked well
            in the past may not produce the same results today.
          </p>
          <p>
            That is why the times in this tool should be treated as a starting point rather than a
            fixed rule. Different studies can produce different results because they look at
            different audiences, industries, locations, and types of engagement.
          </p>
          <p>
            For a more accurate schedule, compare these suggestions with your own analytics. Look at
            when your followers are online, which posts receive the most engagement, and which
            publishing windows consistently bring useful results.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section aria-labelledby="methodology-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="methodology-heading" className="font-display text-2xl font-bold text-slate-900">
          How These Recommendations Work
        </h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            The calculator uses general social media benchmarks and organizes them by platform,
            audience, day, and timezone.
          </p>
          <p>
            These suggestions are not based on access to your personal social media account or
            private analytics. Every audience behaves differently, so use the results as a starting
            point and compare them with your own platform analytics.
          </p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {METHODOLOGY_POINTS.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <point.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-slate-600">{point.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
