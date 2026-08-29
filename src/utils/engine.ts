import {
  DAY_NAMES,
  DAY_SELECTION_INDEX,
  DAY_SELECTIONS,
  RECOMMENDATIONS,
  WEEK_ORDER,
  type Audience,
  type DaySelection,
  type Platform,
  type Recommendation,
} from '@/data/recommendations';
import { convertWindow, formatTzLong, type ScheduledWindow } from '@/utils/timezone';

/**
 * Pure calculation engine for posting-time recommendations.
 *
 * This module is intentionally UI-free so the same logic can be ported to
 * other environments (e.g. a future Android version) without pulling in React.
 */

export interface RecommendationResult {
  platform: Platform;
  audience: Audience;
  daySelection: DaySelection;
  timezone: string;
  isSingleDay: boolean;
  /** Monday-first sorted schedule (all days) or single-entry schedule (specific day). */
  schedule: ScheduledWindow[];
  bestDays: ScheduledWindow[];
}

/** Build the full week schedule, Monday-first, for a platform + audience + tz. */
export function buildWeekSchedule(
  platform: Platform,
  audience: Audience,
  tz: string,
): ScheduledWindow[] {
  const windows = RECOMMENDATIONS[platform][audience];
  const converted = windows.map((w) => convertWindow(w, tz));
  return converted.sort(
    (a, b) =>
      WEEK_ORDER.indexOf(a.dayIndex as (typeof WEEK_ORDER)[number]) -
      WEEK_ORDER.indexOf(b.dayIndex as (typeof WEEK_ORDER)[number]),
  );
}

/** Build a single-day recommendation. */
export function buildDaySchedule(
  platform: Platform,
  audience: Audience,
  tz: string,
  dayIndex: number,
): ScheduledWindow[] {
  const windows = RECOMMENDATIONS[platform][audience];
  const match = windows.find((w) => w.day === dayIndex);
  if (!match) return [];
  return [convertWindow(match, tz)];
}

/** Main entry point — builds the appropriate result based on DaySelection. */
export function buildRecommendation(
  platform: Platform,
  audience: Audience,
  daySelection: DaySelection,
  tz: string,
): RecommendationResult {
  const isSingleDay = daySelection !== 'All Days';
  const dayIndex = DAY_SELECTION_INDEX[daySelection];

  const schedule = isSingleDay
    ? buildDaySchedule(platform, audience, tz, dayIndex)
    : buildWeekSchedule(platform, audience, tz);

  const bestDays = schedule.filter((s) => s.recommendation === 'Excellent');

  return { platform, audience, daySelection, timezone: tz, isSingleDay, schedule, bestDays };
}

/** Day-selection index helper (re-export for convenience). */
export { DAY_SELECTION_INDEX, DAY_SELECTIONS, DAY_NAMES };

export function getDayName(dayIndex: number): string {
  return DAY_NAMES[dayIndex] ?? 'Unknown';
}

/** Generate clean text for clipboard / sharing. */
export function buildCopyText(
  platform: Platform,
  audience: Audience,
  daySelection: DaySelection,
  tz: string,
  schedule: ScheduledWindow[],
): string {
  const lines: string[] = [];
  const title =
    daySelection === 'All Days'
      ? `Best Times to Post on ${platform}`
      : `Best Time to Post on ${platform} ${daySelection}`;
  lines.push(title);
  lines.push('');
  lines.push(`Audience: ${audience}`);
  if (daySelection !== 'All Days') lines.push(`Day: ${daySelection}`);
  lines.push(`Timezone: ${tz}`);
  lines.push('');
  schedule.forEach((w) => {
    lines.push(`${w.dayName}: ${w.range} - ${w.recommendation}`);
  });
  lines.push('');
  lines.push("Generated with DG Pro SEO's Best Time to Post on Social Media Calculator.");
  lines.push('https://dgproseo.com');
  return lines.join('\n');
}

/** Short share text for social posts. */
export function buildShareText(
  platform: Platform,
  daySelection: DaySelection,
  schedule: ScheduledWindow[],
): string {
  if (schedule.length === 0) return '';
  if (daySelection === 'All Days') {
    const best = schedule.filter((s) => s.recommendation === 'Excellent').map((s) => s.dayName);
    const bestStr = best.length > 0 ? best.join(', ') : schedule[0].dayName;
    return `Best time to post on ${platform}: ${bestStr} around ${schedule[0].range}. Found with DG Pro SEO's free calculator.`;
  }
  const w = schedule[0];
  return `Best time to post on ${platform} on ${daySelection}: ${w.range}. Found with DG Pro SEO's free calculator.`;
}

/** Build a shareable URL for the current page. */
export function buildShareUrl(): string {
  if (typeof window === 'undefined') return 'https://dgproseo.com/tools/best-time-to-post-social-media/';
  return window.location.href;
}

/** Social share URL builders. */
export function shareOnFacebook(shareUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
}

export function shareOnX(shareUrl: string, text: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
}

export function shareOnLinkedIn(shareUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
}

export { formatTzLong, type Recommendation, type ScheduledWindow };
