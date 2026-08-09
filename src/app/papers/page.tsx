import { getAllPapers, getAllReports } from "@/lib/content";
import PapersClient from "./PapersClient";

export const metadata = { title: "Papers & Reports" };

export default function PapersPage() {
  const papers = getAllPapers();
  const reports = getAllReports();

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <span className="mono text-[11px] text-signal">PPR</span>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Papers & Reports</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Academic papers and technical briefs open as PDFs. Investigative and pro-bono
        reporting reads in full below, images and all.
      </p>

      <div className="mt-10">
        <PapersClient papers={papers} reports={reports} />
      </div>
    </div>
  );
}
