import { aiContentSchema, type AiContent } from "@/lib/schemas";

const raw = {
  eyebrow: "AI-native engineering",
  heading: "AI writes code. Engineers own systems.",
  intro:
    "The new era asks engineers to move faster with agents — and to stay accountable for production-ready systems. AI is leverage. Ownership is the job.",
  pillars: [
    {
      title: "How I build with AI",
      body: "Spec-first prompting, agent workflows, and review discipline. Agents draft against a clear plan; I verify against types, tests, and the original success metric.",
    },
    {
      title: "How I ship AI to production",
      body: "Evals, structured outputs validated with Zod, fallbacks, cost and latency budgets, and tracing. LLM features get the same gates as any other surface.",
    },
    {
      title: "Where I draw the line",
      body: "Humans own architecture, security, and correctness. I know when not to use AI — and when an agent draft is not ready to ship.",
    },
  ],
  workflow: ["Spec", "Agent draft", "Types + tests", "CI gates", "Human review", "Deploy"],
} satisfies AiContent;

export const ai = aiContentSchema.parse(raw);
