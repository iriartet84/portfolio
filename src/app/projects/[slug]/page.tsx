import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = await getProjectBySlug(slug);
  } catch {
    notFound();
  }
  const { meta, contentHtml } = data!;

  return (
    <article className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link href="/projects" className="mono text-[11px] text-muted hover:text-signal">
        ← ALL PROJECTS
      </Link>

      <div className="mono mt-6 flex flex-wrap items-center gap-2 text-[10px] text-signal">
        <span>{meta.sector?.toUpperCase()}</span>
        <span className="text-muted">
          {new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {meta.title}
      </h1>

      <div className="mono mt-5 flex flex-wrap gap-3 text-[11px]">
        {meta.repoUrl && (
          <a href={meta.repoUrl} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">
            REPO ↗
          </a>
        )}
        {meta.liveUrl && (
          <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">
            LIVE DEMO ↗
          </a>
        )}
      </div>

      <div className="prose-report mt-10" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
