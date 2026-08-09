export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-[11px]">
          © {new Date().getFullYear()} · Built with Next.js, deployed on Netlify
        </p>
        <div className="flex gap-5">
          <a href="mailto:iriartet84@gmail.com" className="hover:text-signal">Email</a>
          <a href="https://www.linkedin.com/in/tiriarte" className="hover:text-signal">LinkedIn</a>
          <a href="https://github.com/iriartet84?tab=repositories" className="hover:text-signal">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
