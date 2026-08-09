"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/papers", code: "PPR", label: "Papers & Reports" },
  { href: "/projects", code: "PRJ", label: "Projects" },
  { href: "/cv", code: "CV", label: "Live CV" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            Toribio Iriarte Fernandez
          </span>
          <span className="mono text-[11px] text-muted transition-colors group-hover:text-signal">
            Macroeconomics · Finance · Commodities and Equity
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-2 rounded-sm px-3 py-1.5 transition-colors ${
                  active ? "bg-panel" : "hover:bg-panel/60"
                }`}
              >
                <span
                  className={`mono text-[11px] font-medium ${
                    active ? "text-signal" : "text-muted group-hover:text-signal"
                  }`}
                >
                  {link.code}
                </span>
                <span
                  className={`hidden text-sm sm:inline ${
                    active ? "text-paper" : "text-muted group-hover:text-paper"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
