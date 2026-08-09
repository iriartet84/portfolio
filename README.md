# Personal site — Papers & Reports / Projects / Live CV

Built with Next.js (App Router, TypeScript, Tailwind CSS v4), content managed via
Decap CMS, deployed on Netlify from this GitHub repo.

## Structure

```
content/
  papers/         # academic + technical papers — metadata + PDF link, .md frontmatter only
  reports/        # investigative / pro-bono reporting — full rich-text body, .md
  projects/       # finance/shipping side-projects, .md
  cv/experience.json  # structured CV entries, rendered as expandable cards
public/
  admin/          # Decap CMS admin panel (config.yml + index.html)
  uploads/        # PDFs and images uploaded via the CMS land here
src/
  app/            # routes: /, /papers, /papers/report/[slug], /projects, /projects/[slug], /cv
  components/     # SiteNav, SiteFooter, CVClient, PapersClient, IdentityRedirect
  lib/content.ts  # reads/parses everything in content/
```

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy — GitHub + Netlify

1. Push this folder to a new GitHub repo.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
   Netlify reads `netlify.toml` automatically (build command + Next.js plugin
   already configured — no manual settings needed).
3. Deploy. You'll get a `random-name.netlify.app` URL immediately — put that
   (or a custom domain, Netlify supports free ones you already own) on your CV.

## Turn on the content editor (`/admin`)

The `/admin` panel is how you add papers, write reports with images, and edit
your CV without touching code — it commits straight to GitHub, Netlify
rebuilds automatically.

1. In the Netlify dashboard for this site: **Site configuration → Identity →
   Enable Identity**.
2. Under Identity **Registration**, set to **Invite only**.
3. Enable **Git Gateway** (Identity → Services → Git Gateway).
4. Under Identity, **Invite users** → invite yourself by email → follow the
   link in the email you receive.
5. Visit `yoursite.netlify.app/admin` and log in. You now have a UI with:
   - **Papers** — title, category (academic/reporting/technical), tags,
     excerpt, and a file upload for the PDF.
   - **Investigative Reports** — a rich-text editor (bold/italic, headings,
     links, blockquotes, drag-and-drop images) — this is your "paste text and
     images in" repository.
   - **Projects** — same rich-text setup, for finance/shipping write-ups.
   - **Live CV** — add/reorder/edit roles, each with a summary and bullet list.

## What to replace before sending this to anyone

- `src/components/SiteNav.tsx` — swap "YOUR NAME" for your actual name.
- `src/components/SiteFooter.tsx` — real email/LinkedIn/GitHub links.
- `content/papers/*.md`, `content/reports/*.md`, `content/projects/*.md`,
  `content/cv/experience.json` — all four sample entries are placeholders;
  either edit these files directly or delete them and add real ones via
  `/admin`.
- Actual PDFs: upload via `/admin` (Papers collection) or drop files into
  `public/uploads/papers/` and reference them in a paper's `pdfUrl` field.
- `public/cv.pdf` — the "Download PDF" button on the CV page expects a file
  here; add a static PDF export of your CV, or remove the button in
  `src/app/cv/page.tsx`.
- `<html lang="en">` metadata in `src/app/layout.tsx` — update the page
  title/description.

## Design system

Dark, terminal-influenced palette (`src/app/globals.css`): `--ink` background,
`--signal` (brass/gold) as the single accent, `--rise` reserved for
positive/market-up moments if you add data visualizations later. Type: Space
Grotesk (display), Inter (body), IBM Plex Mono (labels/data/ticker codes —
the `PPR` / `PRJ` / `CV` codes in the nav are the site's signature element,
styled like exchange tickers).

## Adding a trade-route map or other interactive project

`src/app/projects/[slug]/page.tsx` renders each project's markdown body. For
a genuinely interactive piece (e.g. a live trade-route map), build it as a
React component and drop it into that specific project page — ask for this
to be built for a named project and it can use `recharts`, `d3`, or a map
library directly in the Next.js app rather than through markdown.
