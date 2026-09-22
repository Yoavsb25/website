import type { Metadata } from "next";

import { env } from "@/lib/env";
import { profile } from "@content/profile";

const siteUrl = env.SITE_URL;

export function createMetadata(overrides: Metadata = {}): Metadata {
  const title = overrides.title ?? profile.name;
  const description = overrides.description ?? profile.tagline;
  const descriptionText = typeof description === "string" ? description : profile.tagline;
  const titleText = typeof title === "string" ? title : profile.name;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} · ${profile.title}`,
      template: `%s · ${profile.name}`,
    },
    description: descriptionText,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: profile.name,
      title: titleText,
      description: descriptionText,
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: ["/og.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.title,
    email: `mailto:${profile.emailUser}@${profile.emailDomain}`,
    sameAs: [profile.social.github, profile.social.linkedin].filter(Boolean),
  };
}
