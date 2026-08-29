import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-[-5%] h-48 w-48 rounded-full bg-brand-200/40 blur-3xl"
        />
        <h2 id="cta-heading" className="relative font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          Ready to Turn Your Posting Schedule Into a Real Social Media Strategy?
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-slate-600">
          DG Pro SEO helps businesses build a stronger social media presence through content strategy,
          content creation, platform management, community engagement, and performance reporting.
        </p>
        <a
          href="https://dgproseo.com/social-media-management/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring relative mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Explore Social Media Management
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
        <p className="relative mt-6 text-sm text-slate-400">
          Free tool by{' '}
          <a
            href="https://dgproseo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 transition hover:text-brand-700"
          >
            DG Pro SEO
          </a>
        </p>
      </div>
    </section>
  );
}
