import { useCallback, useRef, useState } from 'react';
import { Hero } from '@/components/Hero';
import { Calculator, type CalculatorState } from '@/components/Calculator';
import { Results } from '@/components/Results';
import { PlatformQuickLinks } from '@/components/PlatformQuickLinks';
import { QuickTips } from '@/components/QuickTips';
import { HowItWorks } from '@/components/HowItWorks';
import { SeoContent } from '@/components/SeoContent';
import { FAQ } from '@/components/FAQ';
import { Disclaimer } from '@/components/Disclaimer';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import type { Audience, DaySelection, Platform } from '@/data/recommendations';

interface ResultData {
  platform: Platform;
  audience: Audience;
  daySelection: DaySelection;
  timezone: string;
}

const DEFAULT_STATE: CalculatorState = {
  platform: '',
  audience: '',
  day: 'All Days',
  timezone: '',
};

function isEmbedMode(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('embed') === '1';
}

function App() {
  const embed = isEmbedMode();
  const [form, setForm] = useState<CalculatorState>(DEFAULT_STATE);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(() => {
    if (!form.platform) {
      setError('Please select a social media platform.');
      return;
    }
    if (!form.audience) {
      setError('Please select an audience type.');
      return;
    }
    if (!form.timezone) {
      setError('Please select an audience timezone.');
      return;
    }
    setError(null);
    setResult({
      platform: form.platform as Platform,
      audience: form.audience as Audience,
      daySelection: form.day,
      timezone: form.timezone,
    });
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [form]);

  const handleReset = useCallback(() => {
    setForm(DEFAULT_STATE);
    setError(null);
    setResult(null);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handlePlatformSelect = useCallback((platform: Platform) => {
    setForm((f) => ({ ...f, platform }));
    setError(null);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {!embed && <Hero />}
      <main ref={resultsRef}>
        <Calculator
          state={form}
          onChange={setForm}
          onSubmit={handleSubmit}
          onReset={handleReset}
          error={error}
          hasResults={!!result}
        />

        {result && (
          <Results
            platform={result.platform}
            audience={result.audience}
            daySelection={result.daySelection}
            timezone={result.timezone}
            onReset={handleReset}
          />
        )}

        {!embed && (
          <>
            <Disclaimer />
            <PlatformQuickLinks onSelectPlatform={handlePlatformSelect} />
            <QuickTips />
            <HowItWorks />
            <SeoContent onSelectPlatform={handlePlatformSelect} />
            <FAQ />
            <CTA />
          </>
        )}
      </main>
      {!embed && <Footer />}
    </div>
  );
}

export default App;
