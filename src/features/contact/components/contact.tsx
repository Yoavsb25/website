"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { profile } from "@content/profile";

function assembleEmail(user: string, domain: string) {
  return `${user}@${domain}`;
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => assembleEmail(profile.emailUser, profile.emailDomain), []);

  const mailto = useMemo(() => `mailto:${email}`, [email]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [email]);

  return (
    <Section id="contact" ariaLabelledBy="contact-heading" className="pb-28">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">Contact</p>
      <Heading id="contact-heading" className="mt-3 max-w-2xl">
        Need someone who can own a product from plan to ship?
      </Heading>
      <p className="text-muted mt-5 max-w-xl text-lg">
        Open to senior engineering roles. I answer within a day.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={mailto} className="no-underline">
          <Button size="lg">Email me</Button>
        </a>
        <Button variant="secondary" size="lg" onClick={onCopy} type="button">
          {copied ? "Copied" : "Copy email"}
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-5 font-mono text-sm">
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GitHub ↗
        </a>
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          LinkedIn ↗
        </a>
      </div>
    </Section>
  );
}
