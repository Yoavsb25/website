import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { experience } from "@content/experience";
import { profile } from "@content/profile";

export function Experience() {
  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">Experience</p>
          <Heading id="experience-heading" className="mt-3">
            Where the craft was practiced.
          </Heading>
        </div>
        <a
          href={profile.resumePath}
          className="text-accent font-mono text-sm hover:underline"
          download
        >
          Download resume ↓
        </a>
      </div>

      <ol className="mt-12 space-y-10">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.start}`}
            className="border-border grid gap-4 border-t pt-8 sm:grid-cols-[10rem_1fr]"
          >
            <p className="text-subtle font-mono text-xs">
              {item.start} — {item.end}
            </p>
            <div>
              <h3 className="font-display text-2xl">
                {item.role}
                <span className="text-muted"> · {item.company}</span>
              </h3>
              <p className="text-subtle mt-1 font-mono text-xs">{item.location}</p>
              <p className="text-muted mt-4">{item.summary}</p>
              {item.highlights.length > 0 ? (
                <ul className="text-muted mt-4 list-disc space-y-2 pl-5 text-sm">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
