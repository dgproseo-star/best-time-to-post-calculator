export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">
          &copy; {year} DG Pro SEO
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href="https://dgproseo.com/privacy-policy"
            className="text-sm text-slate-500 transition hover:text-brand-700"
          >
            Privacy Policy
          </a>
          <a
            href="https://dgproseo.com/terms"
            className="text-sm text-slate-500 transition hover:text-brand-700"
          >
            Terms
          </a>
          <a
            href="https://dgproseo.com/"
            className="text-sm font-semibold text-brand-700 transition hover:text-brand-800"
          >
            DG Pro SEO
          </a>
        </nav>
      </div>
    </footer>
  );
}
