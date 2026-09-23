import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { ai } from "@content/ai";

export function AiEngineering() {
  return (
    <Section id="ai" ariaLabelledBy="ai-heading">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">{ai.eyebrow}</p>
      <Heading id="ai-heading" className="mt-3 max-w-3xl">
        {ai.heading}
      </Heading>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">{ai.intro}</p>

      <ul className="mt-14 grid gap-8 lg:grid-cols-3">
        {ai.pillars.map((pillar) => (
          <li key={pillar.title} className="border-border border-t pt-5">
            <h3 className="font-display text-xl">{pillar.title}</h3>
            <p className="text-muted mt-2">{pillar.body}</p>
          </li>
        ))}
      </ul>

      <div className="border-border mt-14 border-t pt-8">
        <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">Workflow</p>
        <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
          {ai.workflow.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="font-mono text-sm">{step}</span>
              {index < ai.workflow.length - 1 ? (
                <span className="text-subtle font-mono text-xs" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
