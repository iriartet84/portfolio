"use client";

import { useState } from "react";
import type { CVEntry } from "@/lib/content";

function formatRange(start: string, end: string) {
  const fmt = (d: string) => {
    if (/present/i.test(d)) return "Present";
    const [y, m] = d.split("-");
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  };
  return `${fmt(start)} — ${fmt(end)}`;
}

export default function CVClient({ entries }: { entries: CVEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-line border-y border-line">
      {entries.map((entry, i) => {
        const isOpen = open === i;
        return (
          <li key={`${entry.org}-${entry.role}`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <div className="min-w-0">
                <div className="mono flex flex-wrap items-center gap-2 text-[10px] text-signal">
                  <span>{entry.sector?.toUpperCase()}</span>
                  <span className="text-muted">{formatRange(entry.start, entry.end)}</span>
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold sm:text-xl">
                  {entry.role} <span className="text-muted">·</span> {entry.org}
                </h3>
                {entry.location && (
                  <p className="mono mt-1 text-[11px] text-muted">{entry.location}</p>
                )}
                {!isOpen && (
                  <p className="mt-2 text-sm text-muted line-clamp-1">{entry.summary}</p>
                )}
              </div>
              <span className="mono mt-1 shrink-0 text-muted">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="pb-7">
                <p className="max-w-2xl text-sm leading-relaxed text-paper">{entry.summary}</p>
                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {entry.tags?.length ? (
                  <div className="mono mt-5 flex flex-wrap gap-2 text-[10px] text-muted">
                    {entry.tags.map((t) => (
                      <span key={t} className="rounded-sm border border-line px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
