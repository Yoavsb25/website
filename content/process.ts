import { processSchema, type ProcessContent } from "@/lib/schemas";

const raw = {
  eyebrow: "Process",
  heading: "From scratch to production.",
  intro:
    "Every product I ship follows the same loop. Plan carefully, build with detail, deploy with proof, then iterate on what production teaches.",
  steps: [
    {
      title: "Plan",
      body: "Turn a vague idea into a clear problem, constraints, and success metric before writing code.",
      artifact: "Spec · ADRs · success metric",
    },
    {
      title: "Build",
      body: "Ship typed feature slices with tests alongside the code — real data, loading states, and failure modes.",
      artifact: "Feature slices · types · tests",
    },
    {
      title: "Deploy",
      body: "Gate merges with CI, preview every change, smoke-test production, and roll back automatically when smoke fails.",
      artifact: "CI gates · preview · smoke · rollback",
    },
    {
      title: "Iterate",
      body: "Watch budgets and signals after launch. Follow up on what breaks, what slows down, and what users actually need.",
      artifact: "Monitoring · budgets · follow-up",
    },
  ],
} satisfies ProcessContent;

export const process = processSchema.parse(raw);
