import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  statement: z.string().min(1),
  about: z.string().min(1),
  location: z.string().min(1),
  emailUser: z.string().min(1),
  emailDomain: z.string().min(1),
  resumePath: z.string().min(1),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
  principles: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
  toolchain: z.array(z.string().min(1)).min(1),
});

export type Profile = z.infer<typeof profileSchema>;

export const experienceItemSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)).default([]),
});

export const experienceSchema = z.array(experienceItemSchema).min(1);
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  year: z.coerce.number().int(),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  problem: z.string().min(1),
  plan: z.string().min(1),
  build: z.string().min(1),
  deploy: z.string().min(1),
  ai: z.string().optional(),
  outcome: z.string().min(1),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const githubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  stargazerCount: z.number().int().nonnegative(),
  primaryLanguage: z
    .object({
      name: z.string(),
      color: z.string().nullable(),
    })
    .nullable(),
});

export const githubProfileSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  url: z.string().url(),
  repositories: z.object({
    totalCount: z.number().int().nonnegative(),
  }),
  pinnedItems: z.object({
    nodes: z.array(githubRepoSchema),
  }),
  contributionsCollection: z.object({
    contributionCalendar: z.object({
      totalContributions: z.number().int().nonnegative(),
    }),
  }),
});

export type GithubRepo = z.infer<typeof githubRepoSchema>;

export const processStepSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  artifact: z.string().min(1),
});

export const processSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  steps: z.array(processStepSchema).min(1),
});

export type ProcessContent = z.infer<typeof processSchema>;

export const aiPillarSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const aiContentSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  pillars: z.array(aiPillarSchema).min(1),
  workflow: z.array(z.string().min(1)).min(1),
});

export type AiContent = z.infer<typeof aiContentSchema>;
