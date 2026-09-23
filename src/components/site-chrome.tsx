import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { profile } from "@content/profile";

const links = [
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#ai", label: "AI" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#github", label: "GitHub" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-bg/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg tracking-tight no-underline">
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-fg font-mono text-xs tracking-wide no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav links={links} />
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-border border-t py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-subtle font-mono text-xs">
          © {new Date().getFullYear()} {profile.name}. Built as a static export on GitHub Pages.
        </p>
        <div className="flex gap-4 font-mono text-xs">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-fg"
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-fg"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
