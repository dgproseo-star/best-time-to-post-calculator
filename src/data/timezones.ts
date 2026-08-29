/** Common IANA timezones surfaced as quick picks. */
export const COMMON_TIMEZONES: { id: string; label: string; region: string }[] = [
  { id: 'America/New_York', label: 'Eastern Time (US & Canada)', region: 'Americas' },
  { id: 'America/Chicago', label: 'Central Time (US & Canada)', region: 'Americas' },
  { id: 'America/Denver', label: 'Mountain Time (US & Canada)', region: 'Americas' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', region: 'Americas' },
  { id: 'America/Sao_Paulo', label: 'São Paulo, Brazil', region: 'Americas' },
  { id: 'America/Toronto', label: 'Toronto, Canada', region: 'Americas' },
  { id: 'Europe/London', label: 'London, United Kingdom', region: 'Europe' },
  { id: 'Europe/Paris', label: 'Paris, France', region: 'Europe' },
  { id: 'Europe/Berlin', label: 'Berlin, Germany', region: 'Europe' },
  { id: 'Europe/Madrid', label: 'Madrid, Spain', region: 'Europe' },
  { id: 'Europe/Moscow', label: 'Moscow, Russia', region: 'Europe' },
  { id: 'Africa/Cairo', label: 'Cairo, Egypt', region: 'Africa' },
  { id: 'Africa/Lagos', label: 'Lagos, Nigeria', region: 'Africa' },
  { id: 'Africa/Johannesburg', label: 'Johannesburg, South Africa', region: 'Africa' },
  { id: 'Asia/Karachi', label: 'Karachi, Pakistan', region: 'Asia' },
  { id: 'Asia/Dubai', label: 'Dubai, UAE', region: 'Asia' },
  { id: 'Asia/Kolkata', label: 'Kolkata, India', region: 'Asia' },
  { id: 'Asia/Dhaka', label: 'Dhaka, Bangladesh', region: 'Asia' },
  { id: 'Asia/Bangkok', label: 'Bangkok, Thailand', region: 'Asia' },
  { id: 'Asia/Singapore', label: 'Singapore', region: 'Asia' },
  { id: 'Asia/Hong_Kong', label: 'Hong Kong', region: 'Asia' },
  { id: 'Asia/Tokyo', label: 'Tokyo, Japan', region: 'Asia' },
  { id: 'Asia/Seoul', label: 'Seoul, South Korea', region: 'Asia' },
  { id: 'Australia/Sydney', label: 'Sydney, Australia', region: 'Oceania' },
  { id: 'Australia/Perth', label: 'Perth, Australia', region: 'Oceania' },
  { id: 'Pacific/Auckland', label: 'Auckland, New Zealand', region: 'Oceania' },
];

/**
 * Full list of IANA timezone identifiers supported by the current runtime,
 * gathered from Intl.supportedValuesOf('timeZone') when available, otherwise
 * falling back to a curated list.
 */
export function getAllTimezones(): string[] {
  if (
    typeof Intl !== 'undefined' &&
    typeof (Intl as unknown as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf ===
      'function'
  ) {
    try {
      const list = (Intl as unknown as { supportedValuesOf: (key: string) => string[] }).supportedValuesOf(
        'timeZone',
      );
      if (list && list.length > 0) return list.sort();
    } catch {
      // ignore
    }
  }
  return COMMON_TIMEZONES.map((tz) => tz.id).sort((a, b) => a.localeCompare(b));
}

/** Detect the visitor's browser timezone. */
export function detectBrowserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch {
    // ignore
  }
  return 'America/New_York';
}
