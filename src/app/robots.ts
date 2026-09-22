import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = env.SITE_URL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
