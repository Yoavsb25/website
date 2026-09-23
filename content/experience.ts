import { experienceSchema, type ExperienceItem } from "@/lib/schemas";

const raw: ExperienceItem[] = [
  {
    company: "Example Corp",
    role: "Senior Software Engineer",
    location: "London, UK",
    start: "2023",
    end: "Present",
    summary:
      "Owned end-to-end delivery of customer-facing product surfaces, from architecture decisions through CI/CD and production observability.",
    highlights: [
      "Led feature-sliced frontend architecture adopted across two product teams",
      "Introduced PR quality gates (typecheck, coverage, Lighthouse budgets)",
      "Reduced mean time to deploy from hours to minutes via automated pipelines",
    ],
  },
  {
    company: "Startup Labs",
    role: "Full-Stack Engineer",
    location: "Remote",
    start: "2020",
    end: "2023",
    summary:
      "Took product MVPs from blank page to production across web and API layers, owning planning, build, and deploy end to end.",
    highlights: [
      "Took three products from zero to production",
      "Built CI/CD and smoke-test pipelines that made weekly releases routine",
    ],
  },
];

export const experience = experienceSchema.parse(raw);
