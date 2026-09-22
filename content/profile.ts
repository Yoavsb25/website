import { profileSchema, type Profile } from "@/lib/schemas";

const raw = {
  name: "Yoav Sborovsky",
  title: "Software Engineer",
  tagline: "I plan carefully, design with intent, and ship production software.",
  statement: "I plan the product. Then I design it. Then I build it.",
  about:
    "I am a software engineer who treats planning, design, and implementation as one craft. This site is both a business card and a working example of how I structure, test, and ship software.",
  location: "London, UK",
  emailUser: "yoav",
  emailDomain: "example.com",
  resumePath: "/resume.pdf",
  social: {
    github: "https://github.com/Yoavsb25",
    linkedin: "https://www.linkedin.com/in/yoav-sborovsky",
  },
  principles: [
    {
      title: "Problem before pixels",
      body: "No UI until the problem, constraints, and success metric are clear.",
    },
    {
      title: "Systems over screens",
      body: "Tokens, components, and boundaries. Every next screen gets cheaper.",
    },
    {
      title: "Prototype in code",
      body: "Real data, real loading, real failure modes. That is where designs break.",
    },
    {
      title: "Guards over hope",
      body: "Hooks, CI, budgets, and rollbacks catch what reviews miss.",
    },
  ],
  toolchain: [
    "TypeScript",
    "React / Next.js",
    "Tailwind",
    "Node",
    "Vitest / Playwright",
    "GitHub Actions",
    "Zod",
    "Design tokens",
  ],
} satisfies Profile;

export const profile = profileSchema.parse(raw);
