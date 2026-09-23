import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { profile } from "@content/profile";

export function About() {
  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">About</p>
      <Heading id="about-heading" className="mt-3 max-w-2xl">
        Planner. Builder. Shipper.
      </Heading>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">{profile.about}</p>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2">
        {profile.principles.map((principle) => (
          <li key={principle.title} className="border-border border-t pt-5">
            <h3 className="font-display text-xl">{principle.title}</h3>
            <p className="text-muted mt-2">{principle.body}</p>
          </li>
        ))}
      </ul>

      <p className="text-subtle mt-14 max-w-3xl font-mono text-xs leading-relaxed tracking-wide">
        Toolchain: {profile.toolchain.join(" · ")}
      </p>
    </Section>
  );
}
