import Link from "next/link";
import { getAllProjects } from "@/lib/content";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <span className="mono text-[11px] text-signal">PRJ</span>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Finance and shipping side-projects — trade route mapping, market tools, and
        code experiments. Where useful, projects embed live interactive components.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col justify-between rounded-sm border border-line bg-panel p-6 transition-colors hover:border-signal"
          >
            <div>
              <div className="mono flex flex-wrap items-center gap-2 text-[10px] text-signal">
                <span>{p.sector?.toUpperCase()}</span>
                <span className="text-muted">
                  {new Date(p.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-signal">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
            </div>
            {p.tags?.length ? (
              <div className="mono mt-5 flex flex-wrap gap-2 text-[10px] text-muted">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-sm border border-line px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="text-sm text-muted">Nothing here yet — add projects via the CMS.</p>
        )}
      </div>
    </div>
  );
}
