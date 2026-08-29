import { DAY_NAMES, type DayWindow, type Recommendation } from '@/data/recommendations';

/**
 * Convert a "neutral local clock" time (e.g. 11:00 on Wednesday) into a
 * human-readable 12-hour time string rendered in the given IANA timezone.
 *
 * We interpret the benchmark as "11 AM in the audience's timezone". To format
 * that wall-clock time we create a Date that, when formatted with
 * `timeZone: targetTz`, displays 11:00 AM. The simplest robust approach: pick a
 * reference week (Mon=1 ... Sun=0 mapped to concrete dates) and build the Date
 * in the target timezone by using the timezone's offset for that date.
 *
 * Implementation note: We construct a Date whose *UTC instant* corresponds to
 * the desired wall-clock time in `targetTz`. We do this by:
 *   1. Creating a date formatted in targetTz for the reference date at 00:00.
 *   2. Computing the offset between targetTz and UTC at that instant.
 *   3. Adding the wall-clock hours/minutes and subtracting that offset.
 */

const REFERENCE_YEAR = 2025;
// Reference week: Monday 2025-01-06 .. Sunday 2025-01-12 (all day=0 UTC base)
// day index: 0=Sun ... 6=Sat. Map to concrete date of month.
const REFERENCE_DATE_OF_MONTH: Record<number, number> = {
  // 2025-01-06 is Monday (day 1)
  0: 12, // Sunday  Jan 12
  1: 6, // Monday   Jan 6
  2: 7, // Tuesday  Jan 7
  3: 8, // Wednesday Jan 8
  4: 9, // Thursday Jan 9
  5: 10, // Friday   Jan 10
  6: 11, // Saturday Jan 11
};

function hoursToHHMM(hours: number): { h: number; m: number } {
  const h = Math.floor(hours);
  let m = Math.round((hours - h) * 60);
  if (m === 60) {
    return { h: h + 1, m: 0 };
  }
  return { h, m };
}

function getTzOffsetMinutes(tz: string, year: number, month: number, day: number, hour: number, minute: number): number {
  // Get the offset of `tz` at the given UTC instant (y,m,d,h,mi interpreted as UTC).
  const utc = Date.UTC(year, month, day, hour, minute);
  const longOffset = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'longOffset',
  }).formatToParts(new Date(utc));
  const offsetPart = longOffset.find((p) => p.type === 'timeZoneName')?.value ?? '';
  // longOffset looks like "GMT+05:30" or "GMT-07:00" or "GMT"
  const match = offsetPart.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
  if (!match) return 0;
  const sign = match[1] === '+' ? 1 : -1;
  const hh = parseInt(match[2], 10) || 0;
  const mm = parseInt(match[3] ?? '0', 10) || 0;
  return sign * (hh * 60 + mm);
}

function buildUtcInstant(
  tz: string,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number {
  // We want the wall-clock time (hour:minute) in `tz` to equal the given values.
  // wall time = UTC time + offset  =>  UTC time = wall time - offset.
  // First estimate the offset using a first guess (the wall time itself as if UTC).
  const guessUtc = Date.UTC(year, month, day, hour, minute);
  const offsetMin = getTzOffsetMinutes(tz, year, month, day, hour, minute);
  const realUtc = guessUtc - offsetMin * 60 * 1000;
  return realUtc;
}

function format12h(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function formatDayName(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' }).format(date);
}

export interface ScheduledWindow {
  dayIndex: number; // 0=Sun..6=Sat — the *displayed* day (based on tz day)
  dayName: string;
  startLabel: string;
  endLabel: string;
  range: string;
  recommendation: Recommendation;
}

/**
 * Convert a neutral DayWindow into timezone-specific display labels.
 * Because a wall-clock window can straddle midnight in the target tz in rare
 * DST edge cases, we derive the day name from the actual formatted date too.
 */
export function convertWindow(window: DayWindow, tz: string): ScheduledWindow {
  const day = window.day;
  const dateOfMonth = REFERENCE_DATE_OF_MONTH[day];
  const start = hoursToHHMM(window.start);
  const end = hoursToHHMM(window.end);

  const startInstant = buildUtcInstant(tz, REFERENCE_YEAR, 0, dateOfMonth, start.h, start.m);
  const endInstant = buildUtcInstant(tz, REFERENCE_YEAR, 0, dateOfMonth, end.h, end.m);

  const startDate = new Date(startInstant);
  const endDate = new Date(endInstant);

  const startLabel = format12h(startDate, tz);
  const endLabel = format12h(endDate, tz);

  // Determine displayed day from start; fall back to the original day name if
  // formatting somehow fails.
  const dayName = formatDayName(startDate, tz) || DAY_NAMES[day];
  const dayIndex = DAY_NAMES.indexOf(dayName as (typeof DAY_NAMES)[number]);

  return {
    dayIndex: dayIndex >= 0 ? dayIndex : day,
    dayName,
    startLabel,
    endLabel,
    range: `${startLabel} – ${endLabel}`,
    recommendation: window.recommendation,
  };
}

export function formatTzOffset(tz: string): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(now);
  const off = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  return off;
}

export function formatTzLong(tz: string): string {
  const now = new Date();
  try {
    const longName = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longGeneric',
    }).formatToParts(now);
    const name = longName.find((p) => p.type === 'timeZoneName')?.value;
    if (name) return `${tz} (${name})`;
  } catch {
    // longGeneric not supported in some runtimes
  }
  const off = formatTzOffset(tz);
  return off ? `${tz} (${off})` : tz;
}
