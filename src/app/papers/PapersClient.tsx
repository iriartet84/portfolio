"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PaperMeta, ReportMeta } from "@/lib/content";

type Item =
  | ({ kind: "paper" } & PaperMeta)
  | ({ kind: "reporting" } & ReportMeta);

const FILTERS = [
  { key: "all", label: "All" },
  { key: "academic", label: "Academic" },
  { key: "reporting", label: "Reporting" },
  { key: "technical", label: "Technical" },
] as const;

export default function PapersClient({
  papers,
  reports,
}: {
  papers: PaperMeta[];
  reports: ReportMeta[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const items: Item[] = useMemo(() => {
    const paperItems: Item[] = papers.map((p) => ({ kind: "paper", ...p }));
    const reportItems: Item[] = reports.map((r) => ({ kind: "reporting", ...r }));
    return [...paperItems, ...reportItems].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [papers, reports]);

  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    if (item.kind === "reporting") return filter === "reporting";
    return item.category === filter;
  });

  return (
    <div>
      <div className="mono flex flex-wrap gap-2 border-b border-line pb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-sm px-3 py-1.5 text-[11px] transition-colors ${
              filter === f.key
                ? "bg-signal text-ink"
                : "border border-line text-muted hover:border-signal hover:text-signal"
            }`}
          >
            {f.label.toUpperCase()}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-line">
        {filtered.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
            <ItemRow item={item} />
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-10 text-sm text-muted">Nothing here yet — add entries via the CMS.</li>
        )}
      </ul>
    </div>
  );
}

function ItemRow({ item }: { item: Item }) {
  const href = item.kind === "reporting" ? `/papers/report/${item.slug}` : (item as PaperMeta).pdfUrl || "#";
  const external = item.kind !== "reporting";
  const categoryLabel =
    item.kind === "reporting" ? "REPORTING" : (item as PaperMeta).category?.toUpperCase();

  const content = (
    <div className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <div className="mono flex flex-wrap items-center gap-2 text-[10px] text-signal">
          <span>{categoryLabel}</span>
          <span className="text-muted">
            {new Date(item.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          </span>
        </div>
        <h3 className="mt-1 truncate font-display text-lg font-medium text-paper group-hover:text-signal">
          {item.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">{item.excerpt}</p>
      </div>
      <span className="mono shrink-0 text-[11px] text-muted group-hover:text-signal">
        {external ? "PDF ↗" : "READ →"}
      </span>
    </div>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href}>{content}</Link>
  );
}
