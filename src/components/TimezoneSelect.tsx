import { Search, Check, ChevronDown, Globe } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  COMMON_TIMEZONES,
  detectBrowserTimezone,
  getAllTimezones,
} from '@/data/timezones';
import { formatTzLong } from '@/utils/timezone';

interface TimezoneSelectProps {
  value: string;
  onChange: (tz: string) => void;
  id: string;
  label: string;
}

export function TimezoneSelect({ value, onChange, id, label }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTz = useMemo(() => getAllTimezones(), []);
  const commonIds = useMemo(() => new Set(COMMON_TIMEZONES.map((t) => t.id)), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allTz;
    return allTz.filter((tz) => tz.toLowerCase().includes(q));
  }, [allTz, query]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      setHighlight(0);
      // focus input after open
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function selectTz(tz: string) {
    onChange(tz);
    setOpen(false);
    setQuery('');
  }

  function handleKeydown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const tz = filtered[highlight];
      if (tz) selectTz(tz);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      setQuery('');
    }
  }

  const display = value ? formatTzLong(value) : 'Select a timezone…';

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        className="focus-ring flex w-full items-center justify-between gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-slate-900 transition hover:border-brand-400"
      >
        <span className={value ? 'truncate text-slate-900' : 'truncate text-slate-400'}>
          {display}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlight(0);
              }}
              onKeyDown={handleKeydown}
              placeholder="Search timezones…"
              className="w-full bg-transparent py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              aria-label="Search timezones"
            />
          </div>

          <button
            type="button"
            onClick={() => selectTz(detectBrowserTimezone())}
            className="focus-ring flex w-full items-center gap-2 border-b border-slate-100 bg-brand-50/60 px-4 py-2.5 text-left text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            Use My Browser Timezone
          </button>

          <ul
            id={`${id}-listbox`}
            role="listbox"
            aria-label={label}
            className="max-h-60 overflow-y-auto py-1"
          >
            {!query &&
              COMMON_TIMEZONES.map((tz) => (
                <li key={`common-${tz.id}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === tz.id}
                    onMouseEnter={() => setHighlight(filtered.indexOf(tz.id))}
                    onClick={() => selectTz(tz.id)}
                    className="focus-ring flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm hover:bg-brand-50"
                  >
                    <span className="truncate">
                      <span className="text-slate-500">{tz.region} · </span>
                      <span className="font-medium text-slate-900">{tz.id}</span>
                    </span>
                    {value === tz.id && <Check className="h-4 w-4 text-brand-600" aria-hidden="true" />}
                  </button>
                </li>
              ))}

            {!query && <li className="my-1 border-t border-slate-100" aria-hidden="true" />}

            {filtered.map((tz, i) => {
              const isCommon = commonIds.has(tz) && !query;
              if (isCommon) return null; // already shown above
              return (
                <li key={tz}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === tz}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => selectTz(tz)}
                    className={`focus-ring flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm ${
                      highlight === i ? 'bg-brand-50' : 'hover:bg-brand-50'
                    }`}
                  >
                    <span className="truncate text-slate-900">{tz}</span>
                    {value === tz && <Check className="h-4 w-4 text-brand-600" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}

            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-slate-400">No timezones found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
