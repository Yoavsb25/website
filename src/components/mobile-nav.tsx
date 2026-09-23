"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </Button>
      {open ? (
        <nav
          id="mobile-nav-panel"
          aria-label="Primary"
          className="border-border bg-bg/95 absolute inset-x-0 top-14 border-t backdrop-blur-md"
        >
          <Container className="py-3">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted hover:text-fg block px-1 py-2 font-mono text-xs tracking-wide no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </div>
  );
}
