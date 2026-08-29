import { Check, Clock, Copy, Info, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  type Audience,
  type DaySelection,
  type Platform,
  type Recommendation,
} from '@/data/recommendations';
import {
  buildCopyText,
  buildRecommendation,
  formatTzLong,
  type ScheduledWindow,
} from '@/utils/engine';
import { ShareBar } from './ShareBar';

interface ResultsProps {
  platform: Platform;
  audience: Audience;
  daySelection: DaySelection;
  timezone: string;
  onReset: () => void;
}

const REC_STYLES: Record<Recommendation, { label: string; badge: string; dot: string }> = {
  Excellent: {
    label: 'Excellent',
    badge: 'bg-brand-100 text-brand-800 border-brand-200',
    dot: 'bg-brand-500',
  },
  Good: {
    label: 'Good',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-400',
  },
  Moderate: {
    label: 'Moderate',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-300',
  },
};

function RecBadge({ rec }: { rec: Recommendation }) {
  const s = REC_STYLES[rec];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

export function Results({ platform, audience, daySelection, timezone, onReset }: ResultsProps) {
  const result = useMemo(
    () => buildRecommendation(platform, audience, daySelection, timezone),
    [platform, audience, daySelection, timezone],
  );
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const { schedule, bestDays, isSingleDay } = result;

  async function handleCopy() {
    const text = buildCopyText(platform, audience, daySelection, timezone, schedule);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError('Could not copy automatically. Please select the schedule text and copy manually.');
      setTimeout(() => setCopyError(null), 4000);
    }
  }

  const heading = isSingleDay
    ? `Best Time to Post on ${platform} ${daySelection}`
    : `Best Times to Post on ${platform}`;

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="mx-auto mt-12 max-w-5xl animate-fade-up px-4 sm:px-6"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Your Results</p>
            <h2 id="results-heading" className="mt-1 font-display text-2xl font-bold text-slate-900">
              {heading}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{platform}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{audience}</span>
              {isSingleDay && (
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">{daySelection}</span>
              )}
              <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">
                {formatTzLong(timezone)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
            aria-label="Copy schedule to clipboard"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Schedule Copied!' : 'Copy Schedule'}
          </button>
        </div>

        {copyError && (
          <p role="alert" className="mt-3 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
            {copyError}
          </p>
        )}

        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4" aria-hidden="true" />
          All times below are shown in your selected audience timezone.
        </p>

        {/* Specific day view */}
        {isSingleDay && schedule.length > 0 && (
          <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/50 p-6">
            <p className="text-sm font-semibold text-brand-700">Recommended Posting Window</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">{schedule[0].range}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
              <span><strong className="text-slate-800">Platform:</strong> {platform}</span>
              <span><strong className="text-slate-800">Day:</strong> {daySelection}</span>
              <span><strong className="text-slate-800">Audience:</strong> {audience}</span>
            </div>
            <div className="mt-4">
              <RecBadge rec={schedule[0].recommendation} />
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              This is a general benchmark recommendation, not an exact universal time. Your audience's
              actual engagement may vary. Compare this suggestion with your own social media analytics
              for the most reliable results.
            </p>
          </div>
        )}

        {/* All days — day cards grid */}
        {!isSingleDay && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {schedule.map((w: ScheduledWindow) => {
              const isBest = w.recommendation === 'Excellent';
              return (
                <div
                  key={w.dayName}
                  className={`relative rounded-xl border p-4 transition ${
                    isBest ? 'border-brand-300 bg-brand-50/60 shadow-sm' : 'border-slate-200 bg-white'
                  }`}
                >
                  {isBest && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                      <Star className="h-3 w-3 fill-white" aria-hidden="true" />
                      Best Day
                    </span>
                  )}
                  <h3 className="font-display text-base font-bold text-slate-900">{w.dayName}</h3>
                  <p className="mt-1 text-lg font-semibold text-slate-800">{w.range}</p>
                  <div className="mt-3">
                    <RecBadge rec={w.recommendation} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* All days — weekly schedule table */}
        {!isSingleDay && (
          <div className="mt-8">
            <h3 className="font-display text-lg font-bold text-slate-900">Weekly Schedule</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Day</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Recommended Time</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.map((w) => (
                    <tr key={w.dayName} className="bg-white hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium text-slate-900">{w.dayName}</td>
                      <td className="px-4 py-3 text-slate-700">{w.range}</td>
                      <td className="px-4 py-3"><RecBadge rec={w.recommendation} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bestDays.length > 0 && (
              <p className="mt-3 text-sm text-slate-500">
                <Star className="mr-1 inline h-3.5 w-3.5 fill-brand-500 text-brand-500" aria-hidden="true" />
                Best days to post:{' '}
                <span className="font-medium text-slate-700">{bestDays.map((d) => d.dayName).join(', ')}</span>
              </p>
            )}
          </div>
        )}

        {/* Share bar */}
        <ShareBar platform={platform} daySelection={daySelection} schedule={schedule} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onReset}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Run Another Calculation
          </button>
        </div>
      </div>
    </section>
  );
}
