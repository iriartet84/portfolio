import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PaperCategory = "academic" | "reporting" | "technical";

export interface PaperMeta {
  slug: string;
  title: string;
  category: PaperCategory;
  date: string;
  tags: string[];
  excerpt: string;
  pdfUrl?: string;
  coauthors?: string;
  publication?: string;
}

export interface ReportMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  sector: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md"));
}

function slugFrom(filename: string) {
  return filename.replace(/\.md$/, "");
}

export function getAllPapers(): PaperMeta[] {
  return readDir("papers")
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "papers", filename), "utf8");
      const { data } = matter(raw);
      return { slug: slugFrom(filename), ...(data as object) } as PaperMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllProjects(): ProjectMeta[] {
  return readDir("projects")
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "projects", filename), "utf8");
      const { data } = matter(raw);
      return { slug: slugFrom(filename), ...(data as object) } as ProjectMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllReports(): ReportMeta[] {
  return readDir("reports")
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "reports", filename), "utf8");
      const { data } = matter(raw);
      return { slug: slugFrom(filename), ...(data as object) } as ReportMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getReportBySlug(slug: string) {
  const full = path.join(CONTENT_DIR, "reports", `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { meta: { slug, ...(data as object) } as ReportMeta, contentHtml: processed.toString() };
}

export async function getProjectBySlug(slug: string) {
  const full = path.join(CONTENT_DIR, "projects", `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { meta: { slug, ...(data as object) } as ProjectMeta, contentHtml: processed.toString() };
}

export interface CVBullet {
  text: string;
}

export interface CVEntry {
  org: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  sector: string;
  summary: string;
  bullets: string[];
  tags?: string[];
}

export function getCV(): CVEntry[] {
  const full = path.join(CONTENT_DIR, "cv", "experience.json");
  if (!fs.existsSync(full)) return [];
  const raw = fs.readFileSync(full, "utf8");
  const parsed = JSON.parse(raw);
  const entries: CVEntry[] = Array.isArray(parsed) ? parsed : parsed.entries || [];
  // keep chronological, most recent first, by start date
  return entries.sort((a, b) => (a.start < b.start ? 1 : -1));
}
