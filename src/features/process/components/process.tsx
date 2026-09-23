import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { process } from "@content/process";

export function Process() {
  return (
    <Section id="process" ariaLabelledBy="process-heading">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">{process.eyebrow}</p>
      <Heading id="process-heading" className="mt-3 max-w-2xl">
        {process.heading}
      </Heading>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">{process.intro}</p>

      <ol className="mt-14 grid gap-8 sm:grid-cols-2">
        {process.steps.map((step, index) => (
          <li key={step.title} className="border-border border-t pt-5">
            <p className="text-subtle font-mono text-xs tracking-[0.18em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-2 text-xl">{step.title}</h3>
            <p className="text-muted mt-2">{step.body}</p>
            <p className="text-subtle mt-4 font-mono text-xs tracking-wide">{step.artifact}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
