import Link from "next/link";
import { getAllPapers, getAllProjects, getCV } from "@/lib/content";

export default function Home() {
  const papers = getAllPapers();
  const projects = getAllProjects();
  const cv = getCV();
  const now = new Date();

  return (
    <div>
      {/* HERO — terminal readout */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
            <span className="text-signal">● LIVE</span>
            <span>{now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span>
            <span>·</span>
            <span>HANNOVER, DE</span>
            <span>·</span>
            <span>OPEN TO: IB / COMMODITIES / TRADING</span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Economics research, market writing, and code —
            <span className="text-signal"> one running record.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I'm an economics student building a track record in analysis before I have a
            desk to sit at. This site is that record: academic papers, investigative
            reporting, technical side-projects on trade and shipping, and a live CV —
            updated as the work happens, not once a year.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/cv"
              className="rounded-sm bg-signal px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              View live CV
            </Link>
            <Link
              href="/papers"
              className="rounded-sm border border-line px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Browse papers & reports
            </Link>
          </div>

          {/* stat strip */}
          <div className="mono mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
            {[
              { label: "PAPERS & REPORTS", value: String(papers.length).padStart(2, "0") },
              { label: "PROJECTS", value: String(projects.length).padStart(2, "0") },
              { label: "ROLES LOGGED", value: String(cv.length).padStart(2, "0") },
              { label: "SECTORS", value: "FIN / SHIP" },
            ].map((stat) => (
              <div key={stat.label} className="bg-ink px-5 py-4">
                <div className="text-2xl font-semibold text-paper">{stat.value}</div>
                <div className="mt-1 text-[10px] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION PREVIEWS */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <PreviewCard
            code="PPR"
            title="Papers & Reports"
            desc="Academic papers, pro-bono investigative reporting, and technical write-ups — filterable by type."
            href="/papers"
          />
          <PreviewCard
            code="PRJ"
            title="Projects"
            desc="Finance and shipping side-projects: trade route visualizations, market tools, code experiments."
            href="/projects"
          />
          <PreviewCard
            code="CV"
            title="Live CV"
            desc="Every role, expanded — scope, tools used, and measurable outcomes, not just a bullet list."
            href="/cv"
          />
        </div>
      </section>
    </div>
  );
}

function PreviewCard({
  code,
  title,
  desc,
  href,
}: {
  code: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-sm border border-line bg-panel p-6 transition-colors hover:border-signal"
    >
      <div>
        <span className="mono text-[11px] text-signal">{code}</span>
        <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      </div>
      <span className="mono mt-6 inline-flex items-center gap-1 text-[11px] text-muted transition-colors group-hover:text-signal">
        VIEW SECTION →
      </span>
    </Link>
  );
}
