import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SITE_URL: z.string().url().default("http://localhost:3000"),
    GH_PROFILE_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1).default("Yoavsb25"),
  },
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    GH_PROFILE_TOKEN: process.env.GH_PROFILE_TOKEN,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
