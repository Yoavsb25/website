import type { MetadataRoute } from "next";

import { getAllProjects } from "@/features/projects";
import { env } from "@/lib/env";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.SITE_URL.replace(/\/$/, "");
  const projects = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects,
  ];
}
