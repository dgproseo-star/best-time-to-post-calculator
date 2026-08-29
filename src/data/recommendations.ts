export type Platform =
  | 'Instagram'
  | 'Facebook'
  | 'LinkedIn'
  | 'TikTok'
  | 'X'
  | 'Pinterest'
  | 'YouTube'
  | 'Threads'
  | 'Reddit';

export type Audience =
  | 'General Audience'
  | 'B2C / Consumers'
  | 'B2B / Professionals'
  | 'Students'
  | 'Creators';

export type Recommendation = 'Excellent' | 'Good' | 'Moderate';

export type DaySelection = 'All Days' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface DayWindow {
  /** 0 = Sunday ... 6 = Saturday */
  day: number;
  /** start hour in 24h (can be fractional, e.g. 11.5) in "base" local time */
  start: number;
  end: number;
  recommendation: Recommendation;
}

export type Dataset = Record<Audience, DayWindow[]>;

export interface PlatformMeta {
  name: Platform;
  description: string;
}

/**
 * General industry benchmark posting windows expressed in a *neutral* local
 * clock (i.e. "11 AM" means 11 AM in whatever timezone the audience lives in).
 * We convert these neutral wall-clock times into the user-selected IANA
 * timezone using the Intl API. These are general benchmarks, not guarantees.
 */
export const RECOMMENDATIONS: Record<Platform, Dataset> = {
  Instagram: {
    'General Audience': [
      { day: 1, start: 11, end: 13, recommendation: 'Good' },
      { day: 2, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 15, recommendation: 'Good' },
      { day: 5, start: 10, end: 11.5, recommendation: 'Good' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 11, end: 13, recommendation: 'Excellent' },
      { day: 2, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 16, recommendation: 'Good' },
      { day: 5, start: 11, end: 13, recommendation: 'Good' },
      { day: 6, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 12, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 12, end: 14, recommendation: 'Excellent' },
      { day: 3, start: 12, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 13, recommendation: 'Good' },
      { day: 5, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 16, end: 18, recommendation: 'Good' },
      { day: 2, start: 16, end: 19, recommendation: 'Excellent' },
      { day: 3, start: 17, end: 20, recommendation: 'Excellent' },
      { day: 4, start: 16, end: 19, recommendation: 'Good' },
      { day: 5, start: 15, end: 18, recommendation: 'Good' },
      { day: 6, start: 11, end: 14, recommendation: 'Excellent' },
      { day: 0, start: 11, end: 14, recommendation: 'Excellent' },
    ],
    Creators: [
      { day: 1, start: 12, end: 15, recommendation: 'Excellent' },
      { day: 2, start: 11, end: 14, recommendation: 'Excellent' },
      { day: 3, start: 12, end: 15, recommendation: 'Excellent' },
      { day: 4, start: 14, end: 17, recommendation: 'Good' },
      { day: 5, start: 11, end: 14, recommendation: 'Good' },
      { day: 6, start: 10, end: 13, recommendation: 'Good' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
  },
  Facebook: {
    'General Audience': [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Good' },
      { day: 5, start: 10, end: 11.5, recommendation: 'Good' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 2, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 14, recommendation: 'Good' },
      { day: 5, start: 10, end: 12, recommendation: 'Good' },
      { day: 6, start: 9, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 12, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 9, end: 11, recommendation: 'Excellent' },
      { day: 2, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 13, end: 16, recommendation: 'Good' },
      { day: 2, start: 13, end: 17, recommendation: 'Excellent' },
      { day: 3, start: 14, end: 17, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 16, recommendation: 'Good' },
      { day: 5, start: 12, end: 15, recommendation: 'Good' },
      { day: 6, start: 12, end: 15, recommendation: 'Moderate' },
      { day: 0, start: 12, end: 15, recommendation: 'Moderate' },
    ],
    Creators: [
      { day: 1, start: 11, end: 14, recommendation: 'Good' },
      { day: 2, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 16, recommendation: 'Good' },
      { day: 5, start: 11, end: 13, recommendation: 'Good' },
      { day: 6, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 12, recommendation: 'Moderate' },
    ],
  },
  LinkedIn: {
    'General Audience': [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 8, end: 10, recommendation: 'Good' },
      { day: 3, start: 10, end: 12, recommendation: 'Good' },
      { day: 4, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 2, start: 8, end: 11, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Excellent' },
      { day: 5, start: 9, end: 11, recommendation: 'Good' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 2, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 3, start: 11, end: 13, recommendation: 'Good' },
      { day: 4, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 5, start: 10, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Creators: [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 10, end: 12, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
  },
  TikTok: {
    'General Audience': [
      { day: 1, start: 6, end: 9, recommendation: 'Good' },
      { day: 2, start: 10, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 12, end: 15, recommendation: 'Good' },
      { day: 5, start: 17, end: 20, recommendation: 'Good' },
      { day: 6, start: 10, end: 14, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 14, recommendation: 'Excellent' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 12, end: 15, recommendation: 'Excellent' },
      { day: 2, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 16, recommendation: 'Good' },
      { day: 5, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 6, start: 10, end: 14, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 14, recommendation: 'Excellent' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 6, end: 9, recommendation: 'Moderate' },
      { day: 2, start: 9, end: 11, recommendation: 'Good' },
      { day: 3, start: 10, end: 12, recommendation: 'Good' },
      { day: 4, start: 11, end: 13, recommendation: 'Moderate' },
      { day: 5, start: 12, end: 15, recommendation: 'Moderate' },
      { day: 6, start: 10, end: 13, recommendation: 'Good' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 15, end: 18, recommendation: 'Good' },
      { day: 2, start: 16, end: 20, recommendation: 'Excellent' },
      { day: 3, start: 16, end: 21, recommendation: 'Excellent' },
      { day: 4, start: 16, end: 20, recommendation: 'Excellent' },
      { day: 5, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 6, start: 11, end: 16, recommendation: 'Excellent' },
      { day: 0, start: 11, end: 16, recommendation: 'Excellent' },
    ],
    Creators: [
      { day: 1, start: 6, end: 10, recommendation: 'Excellent' },
      { day: 2, start: 10, end: 14, recommendation: 'Excellent' },
      { day: 3, start: 11, end: 15, recommendation: 'Excellent' },
      { day: 4, start: 14, end: 18, recommendation: 'Excellent' },
      { day: 5, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 6, start: 10, end: 15, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 15, recommendation: 'Excellent' },
    ],
  },
  X: {
    'General Audience': [
      { day: 1, start: 9, end: 11, recommendation: 'Good' },
      { day: 2, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 9, end: 12, recommendation: 'Good' },
      { day: 2, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 10, end: 12, recommendation: 'Good' },
      { day: 5, start: 9, end: 12, recommendation: 'Moderate' },
      { day: 6, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 12, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 8, end: 10, recommendation: 'Excellent' },
      { day: 2, start: 8, end: 11, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 11, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 12, end: 15, recommendation: 'Moderate' },
      { day: 2, start: 12, end: 16, recommendation: 'Good' },
      { day: 3, start: 13, end: 17, recommendation: 'Good' },
      { day: 4, start: 12, end: 16, recommendation: 'Moderate' },
      { day: 5, start: 12, end: 15, recommendation: 'Moderate' },
      { day: 6, start: 11, end: 14, recommendation: 'Moderate' },
      { day: 0, start: 11, end: 14, recommendation: 'Moderate' },
    ],
    Creators: [
      { day: 1, start: 9, end: 12, recommendation: 'Good' },
      { day: 2, start: 8, end: 11, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 14, recommendation: 'Good' },
      { day: 5, start: 10, end: 13, recommendation: 'Good' },
      { day: 6, start: 10, end: 13, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
  },
  Pinterest: {
    'General Audience': [
      { day: 1, start: 14, end: 16, recommendation: 'Good' },
      { day: 2, start: 14, end: 17, recommendation: 'Excellent' },
      { day: 3, start: 14, end: 17, recommendation: 'Excellent' },
      { day: 4, start: 15, end: 18, recommendation: 'Good' },
      { day: 5, start: 13, end: 16, recommendation: 'Excellent' },
      { day: 6, start: 12, end: 15, recommendation: 'Good' },
      { day: 0, start: 12, end: 15, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 14, end: 17, recommendation: 'Excellent' },
      { day: 2, start: 14, end: 18, recommendation: 'Excellent' },
      { day: 3, start: 15, end: 19, recommendation: 'Excellent' },
      { day: 4, start: 15, end: 19, recommendation: 'Excellent' },
      { day: 5, start: 13, end: 17, recommendation: 'Excellent' },
      { day: 6, start: 12, end: 16, recommendation: 'Good' },
      { day: 0, start: 12, end: 16, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 14, end: 16, recommendation: 'Moderate' },
      { day: 2, start: 14, end: 17, recommendation: 'Good' },
      { day: 3, start: 14, end: 17, recommendation: 'Good' },
      { day: 4, start: 15, end: 17, recommendation: 'Moderate' },
      { day: 5, start: 13, end: 15, recommendation: 'Moderate' },
      { day: 6, start: 12, end: 14, recommendation: 'Moderate' },
      { day: 0, start: 12, end: 14, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 20, end: 23, recommendation: 'Good' },
      { day: 2, start: 20, end: 23, recommendation: 'Good' },
      { day: 3, start: 20, end: 23, recommendation: 'Excellent' },
      { day: 4, start: 21, end: 23, recommendation: 'Good' },
      { day: 5, start: 15, end: 20, recommendation: 'Excellent' },
      { day: 6, start: 13, end: 18, recommendation: 'Excellent' },
      { day: 0, start: 13, end: 18, recommendation: 'Good' },
    ],
    Creators: [
      { day: 1, start: 14, end: 18, recommendation: 'Excellent' },
      { day: 2, start: 14, end: 19, recommendation: 'Excellent' },
      { day: 3, start: 15, end: 20, recommendation: 'Excellent' },
      { day: 4, start: 15, end: 20, recommendation: 'Excellent' },
      { day: 5, start: 13, end: 18, recommendation: 'Excellent' },
      { day: 6, start: 12, end: 17, recommendation: 'Good' },
      { day: 0, start: 12, end: 16, recommendation: 'Good' },
    ],
  },
  YouTube: {
    'General Audience': [
      { day: 1, start: 17, end: 20, recommendation: 'Good' },
      { day: 2, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 3, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 4, start: 18, end: 22, recommendation: 'Excellent' },
      { day: 5, start: 15, end: 19, recommendation: 'Good' },
      { day: 6, start: 10, end: 14, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 14, recommendation: 'Excellent' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 18, end: 21, recommendation: 'Good' },
      { day: 2, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 3, start: 17, end: 22, recommendation: 'Excellent' },
      { day: 4, start: 18, end: 23, recommendation: 'Excellent' },
      { day: 5, start: 15, end: 20, recommendation: 'Excellent' },
      { day: 6, start: 10, end: 15, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 15, recommendation: 'Excellent' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 12, end: 15, recommendation: 'Good' },
      { day: 2, start: 12, end: 15, recommendation: 'Excellent' },
      { day: 3, start: 13, end: 16, recommendation: 'Excellent' },
      { day: 4, start: 13, end: 16, recommendation: 'Good' },
      { day: 5, start: 12, end: 14, recommendation: 'Moderate' },
      { day: 6, start: 10, end: 13, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 19, end: 23, recommendation: 'Excellent' },
      { day: 2, start: 19, end: 23, recommendation: 'Excellent' },
      { day: 3, start: 19, end: 23, recommendation: 'Excellent' },
      { day: 4, start: 20, end: 23, recommendation: 'Excellent' },
      { day: 5, start: 16, end: 22, recommendation: 'Excellent' },
      { day: 6, start: 11, end: 18, recommendation: 'Excellent' },
      { day: 0, start: 11, end: 18, recommendation: 'Excellent' },
    ],
    Creators: [
      { day: 1, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 2, start: 17, end: 22, recommendation: 'Excellent' },
      { day: 3, start: 17, end: 22, recommendation: 'Excellent' },
      { day: 4, start: 18, end: 23, recommendation: 'Excellent' },
      { day: 5, start: 15, end: 21, recommendation: 'Excellent' },
      { day: 6, start: 10, end: 16, recommendation: 'Excellent' },
      { day: 0, start: 10, end: 16, recommendation: 'Excellent' },
    ],
  },
  Threads: {
    'General Audience': [
      { day: 1, start: 10, end: 12, recommendation: 'Good' },
      { day: 2, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 14, recommendation: 'Good' },
      { day: 5, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 10, end: 13, recommendation: 'Good' },
      { day: 2, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 14, recommendation: 'Good' },
      { day: 5, start: 10, end: 13, recommendation: 'Moderate' },
      { day: 6, start: 10, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 12, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 8, end: 11, recommendation: 'Good' },
      { day: 2, start: 8, end: 11, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 12, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 16, end: 19, recommendation: 'Good' },
      { day: 2, start: 16, end: 20, recommendation: 'Excellent' },
      { day: 3, start: 17, end: 21, recommendation: 'Excellent' },
      { day: 4, start: 17, end: 20, recommendation: 'Good' },
      { day: 5, start: 15, end: 19, recommendation: 'Good' },
      { day: 6, start: 11, end: 15, recommendation: 'Good' },
      { day: 0, start: 11, end: 15, recommendation: 'Moderate' },
    ],
    Creators: [
      { day: 1, start: 10, end: 13, recommendation: 'Excellent' },
      { day: 2, start: 9, end: 13, recommendation: 'Excellent' },
      { day: 3, start: 10, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 11, end: 15, recommendation: 'Good' },
      { day: 5, start: 10, end: 14, recommendation: 'Good' },
      { day: 6, start: 10, end: 13, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
  },
  Reddit: {
    'General Audience': [
      { day: 1, start: 9, end: 12, recommendation: 'Good' },
      { day: 2, start: 9, end: 13, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 13, recommendation: 'Excellent' },
      { day: 4, start: 10, end: 13, recommendation: 'Good' },
      { day: 5, start: 9, end: 12, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 11, recommendation: 'Moderate' },
    ],
    'B2C / Consumers': [
      { day: 1, start: 9, end: 13, recommendation: 'Good' },
      { day: 2, start: 9, end: 14, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 10, end: 14, recommendation: 'Good' },
      { day: 5, start: 9, end: 12, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 12, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 12, recommendation: 'Moderate' },
    ],
    'B2B / Professionals': [
      { day: 1, start: 8, end: 11, recommendation: 'Excellent' },
      { day: 2, start: 8, end: 12, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 12, recommendation: 'Excellent' },
      { day: 4, start: 9, end: 12, recommendation: 'Good' },
      { day: 5, start: 9, end: 11, recommendation: 'Moderate' },
      { day: 6, start: 9, end: 10, recommendation: 'Moderate' },
      { day: 0, start: 9, end: 10, recommendation: 'Moderate' },
    ],
    Students: [
      { day: 1, start: 14, end: 17, recommendation: 'Good' },
      { day: 2, start: 14, end: 18, recommendation: 'Excellent' },
      { day: 3, start: 15, end: 19, recommendation: 'Excellent' },
      { day: 4, start: 15, end: 18, recommendation: 'Good' },
      { day: 5, start: 13, end: 17, recommendation: 'Good' },
      { day: 6, start: 11, end: 16, recommendation: 'Excellent' },
      { day: 0, start: 11, end: 16, recommendation: 'Excellent' },
    ],
    Creators: [
      { day: 1, start: 9, end: 13, recommendation: 'Excellent' },
      { day: 2, start: 9, end: 14, recommendation: 'Excellent' },
      { day: 3, start: 9, end: 14, recommendation: 'Excellent' },
      { day: 4, start: 10, end: 14, recommendation: 'Good' },
      { day: 5, start: 9, end: 13, recommendation: 'Good' },
      { day: 6, start: 10, end: 13, recommendation: 'Moderate' },
      { day: 0, start: 10, end: 13, recommendation: 'Moderate' },
    ],
  },
};

export const PLATFORMS: Platform[] = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'TikTok',
  'X',
  'Pinterest',
  'YouTube',
  'Threads',
  'Reddit',
];

export const PLATFORM_META: Record<Platform, PlatformMeta> = {
  Instagram: { name: 'Instagram', description: 'Find recommended Instagram posting hours based on your audience, day, and timezone.' },
  Facebook: { name: 'Facebook', description: 'Get suggested Facebook posting windows for your audience and timezone.' },
  LinkedIn: { name: 'LinkedIn', description: 'Discover the best times to post on LinkedIn for professional audiences.' },
  TikTok: { name: 'TikTok', description: 'Find recommended TikTok posting times for your audience and timezone.' },
  X: { name: 'X', description: 'Get suggested posting windows on X to reach your audience at the right time.' },
  Pinterest: { name: 'Pinterest', description: 'Find recommended Pinterest posting times for your audience and timezone.' },
  YouTube: { name: 'YouTube', description: 'Discover the best times to upload on YouTube for your audience and timezone.' },
  Threads: { name: 'Threads', description: 'Get suggested Threads posting windows for your audience and timezone.' },
  Reddit: { name: 'Reddit', description: 'Find recommended Reddit posting times for your audience and timezone.' },
};

export const AUDIENCES: Audience[] = [
  'General Audience',
  'B2C / Consumers',
  'B2B / Professionals',
  'Students',
  'Creators',
];

export const DAY_SELECTIONS: DaySelection[] = [
  'All Days',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/** Map DaySelection to day index (0=Sun..6=Sat). 'All Days' = -1 sentinel. */
export const DAY_SELECTION_INDEX: Record<DaySelection, number> = {
  'All Days': -1,
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/** Order Monday-first for display. */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;
