import { profileSchema, type Profile } from "@/lib/schemas";

const raw = {
  name: "Yoav Sborovsky",
  title: "Product Engineer",
  tagline:
    "Careful planning, obsessive attention to detail, and AI-native execution. Built, deployed, and owned end to end.",
  statement: "I take products from a blank page to production.",
  about:
    "I am a product engineer who owns the whole lifecycle — planning, building, deploying, and iterating. I use AI as leverage to move faster, and I stay accountable for correctness through specs, types, tests, and CI. This site is both a business card and a working example of how I structure, ship, and own software.",
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
      title: "Plan before code",
      body: "Specs, ADRs, and a success metric come first. Vague ideas become executable plans before a line ships.",
    },
    {
      title: "Details are the product",
      body: "Edge cases, loading and failure states, accessibility. The craft lives in what users never have to notice.",
    },
    {
      title: "Ship it, then prove it",
      body: "CI gates, smoke tests, and automatic rollback. Merge confidence is a system, not a feeling.",
    },
    {
      title: "AI as leverage, not an excuse",
      body: "Agents draft the code. Types, tests, and evals decide what ships — humans own the system.",
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
    "LLM APIs (OpenAI / Anthropic)",
    "AI agents (Cursor / Claude Code)",
    "Evals",
    "Vercel / GitHub Pages",
  ],
} satisfies Profile;

export const profile = profileSchema.parse(raw);
