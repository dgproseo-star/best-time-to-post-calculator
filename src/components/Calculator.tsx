import { AlertTriangle, CalendarClock, RotateCcw } from 'lucide-react';
import { TimezoneSelect } from './TimezoneSelect';
import {
  AUDIENCES,
  DAY_SELECTIONS,
  PLATFORMS,
  type Audience,
  type DaySelection,
  type Platform,
} from '@/data/recommendations';

export interface CalculatorState {
  platform: Platform | '';
  audience: Audience | '';
  day: DaySelection;
  timezone: string;
}

interface CalculatorProps {
  state: CalculatorState;
  onChange: (next: CalculatorState) => void;
  onSubmit: () => void;
  onReset: () => void;
  error: string | null;
  hasResults: boolean;
}

export function Calculator({
  state,
  onChange,
  onSubmit,
  onReset,
  error,
  hasResults,
}: CalculatorProps) {
  const selectBase =
    'focus-ring w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 transition hover:border-brand-400';

  const chevron = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
    >
      ▾
    </span>
  );

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="relative z-10 mx-auto -mt-10 max-w-3xl px-4 sm:px-6"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
            <CalendarClock className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="calculator-heading" className="font-display text-xl font-bold text-slate-900">
              Posting Time Calculator
            </h2>
            <p className="text-sm text-slate-500">
              Pick your platform, audience, day, and timezone to see recommended posting times.
            </p>
          </div>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="platform" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Social Media Platform
              </label>
              <div className="relative">
                <select
                  id="platform"
                  value={state.platform}
                  onChange={(e) => onChange({ ...state, platform: e.target.value as Platform })}
                  className={selectBase}
                  aria-required="true"
                >
                  <option value="">Select a platform…</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label htmlFor="audience" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Audience Type
              </label>
              <div className="relative">
                <select
                  id="audience"
                  value={state.audience}
                  onChange={(e) => onChange({ ...state, audience: e.target.value as Audience })}
                  className={selectBase}
                  aria-required="true"
                >
                  <option value="">Select an audience…</option>
                  {AUDIENCES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <label htmlFor="day" className="mb-1.5 block text-sm font-semibold text-slate-700">
                What Day Are You Posting?
              </label>
              <div className="relative">
                <select
                  id="day"
                  value={state.day}
                  onChange={(e) => onChange({ ...state, day: e.target.value as DaySelection })}
                  className={selectBase}
                >
                  {DAY_SELECTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            <div>
              <TimezoneSelect
                id="timezone"
                label="Audience Timezone"
                value={state.timezone}
                onChange={(tz) => onChange({ ...state, timezone: tz })}
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.99]"
            >
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
              Find Best Posting Times
            </button>
            {hasResults && (
              <button
                type="button"
                onClick={onReset}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset Calculator
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
