import { z } from "zod";

import { githubRepoSchema } from "@/lib/schemas";

const fallbackSchema = z.object({
  login: z.string(),
  url: z.string().url(),
  totalRepositories: z.number().int().nonnegative(),
  totalContributions: z.number().int().nonnegative(),
  pinned: z.array(githubRepoSchema),
});

const raw = {
  login: "Yoavsb25",
  url: "https://github.com/Yoavsb25",
  totalRepositories: 12,
  totalContributions: 480,
  pinned: [
    {
      name: "Yoavsb25.github.io",
      description: "Personal portfolio — static Next.js on GitHub Pages",
      url: "https://github.com/Yoavsb25/Yoavsb25.github.io",
      stargazerCount: 0,
      primaryLanguage: { name: "TypeScript", color: "#3178c6" },
    },
  ],
};

export const githubFallback = fallbackSchema.parse(raw);
