import { getCV } from "@/lib/content";
import CVClient from "./CVClient";

export const metadata = { title: "Live CV" };

export default function CVPage() {
  const entries = getCV();

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="mono text-[11px] text-signal">CV</span>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Live CV</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Every role, expanded. Click an entry for scope, tools, and outcomes — the
            detail a one-page PDF can't hold.
          </p>
        </div>
        <a
          href="/cv.pdf"
          className="mono shrink-0 rounded-sm border border-line px-4 py-2 text-[11px] text-muted transition-colors hover:border-signal hover:text-signal"
        >
          DOWNLOAD PDF ↓
        </a>
      </div>

      <div className="mt-10">
        <CVClient entries={entries} />
      </div>
    </div>
  );
}
