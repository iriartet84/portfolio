import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import IdentityRedirect from "@/components/IdentityRedirect";

export const metadata: Metadata = {
  title: "Toribio's Portfolio",
  description:
    "Papers, investigative reporting, technical projects, and live CV.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <IdentityRedirect />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
