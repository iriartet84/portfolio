import { getAllReports, getReportBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllReports().map((r) => ({ slug: r.slug }));
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = await getReportBySlug(slug);
  } catch {
    notFound();
  }
  const { meta, contentHtml } = data!;

  return (
    <article className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link href="/papers" className="mono text-[11px] text-muted hover:text-signal">
        ← ALL PAPERS & REPORTS
      </Link>

      <div className="mono mt-6 flex flex-wrap items-center gap-2 text-[10px] text-signal">
        <span>REPORTING</span>
        <span className="text-muted">
          {new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {meta.title}
      </h1>

      {meta.tags?.length ? (
        <div className="mono mt-4 flex flex-wrap gap-2 text-[10px] text-muted">
          {meta.tags.map((t) => (
            <span key={t} className="rounded-sm border border-line px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className="prose-report mt-10"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
