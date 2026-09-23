import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Project } from "@/features/projects/lib/get-projects";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <Section id="work" ariaLabelledBy="work-heading">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">Selected work</p>
      <Heading id="work-heading" className="mt-3 max-w-2xl">
        Built from scratch. Shipped to production.
      </Heading>
      <p className="text-muted mt-3 max-w-xl">Case studies from blank page to live systems.</p>
      <ul className="divide-border border-border mt-12 divide-y border-y">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}/`}
              className="group hover:bg-surface/50 grid gap-6 py-8 no-underline transition-colors sm:grid-cols-[1.2fr_1fr] sm:items-center"
            >
              <div className="space-y-3 px-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{project.year}</Badge>
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <Heading as="h3" className="group-hover:text-accent">
                  {project.title}
                </Heading>
                <p className="text-muted max-w-xl">{project.summary}</p>
                <span className="text-accent font-mono text-xs">Open case study →</span>
              </div>
              {project.coverImage ? (
                <div className="bg-surface relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LiveWorkStrip({ projects }: { projects: Project[] }) {
  const live = projects.filter((p) => p.liveUrl || p.coverImage).slice(0, 4);
  if (live.length === 0) return null;

  return (
    <Section id="live" className="py-12 sm:py-16" ariaLabelledBy="live-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">Not mockups</p>
          <Heading as="h2" id="live-heading" className="mt-2 text-2xl sm:text-3xl">
            Production surfaces.
          </Heading>
        </div>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((project) => (
          <li key={project.slug}>
            <a
              href={project.liveUrl ?? `/projects/${project.slug}/`}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noreferrer" : undefined}
              className="group block no-underline"
            >
              <div className="bg-surface-2 relative aspect-[16/10] overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <p className="text-muted mt-3 font-mono text-xs">
                {project.liveUrl ? new URL(project.liveUrl).hostname : project.title}
                {project.liveUrl ? " ↗" : ""}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const stages = [
    { label: "Problem", body: project.problem },
    { label: "Plan", body: project.plan },
    { label: "Build", body: project.build },
    { label: "Deploy", body: project.deploy },
    ...(project.ai ? [{ label: "AI in the loop", body: project.ai }] : []),
    { label: "Outcome", body: project.outcome },
  ];

  return (
    <article>
      <Section className="pt-28 pb-8 sm:pt-32">
        <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">
          Case study · {project.year}
        </p>
        <Heading as="h1" className="mt-4 max-w-3xl">
          {project.title}
        </Heading>
        <p className="text-muted mt-5 max-w-2xl text-lg">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Live site ↗
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Repository ↗
            </a>
          ) : null}
        </div>
      </Section>

      {project.coverImage ? (
        <Section className="py-0">
          <div className="bg-surface relative aspect-[16/9] overflow-hidden">
            <Image
              src={project.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </Section>
      ) : null}

      <Section>
        <ol className="space-y-12">
          {stages.map((stage) => (
            <li key={stage.label} className="grid gap-3 sm:grid-cols-[8rem_1fr]">
              <p className="text-subtle font-mono text-xs tracking-[0.18em] uppercase">
                {stage.label}
              </p>
              <p className="text-fg text-lg leading-relaxed">{stage.body}</p>
            </li>
          ))}
        </ol>
        {project.content.trim() ? (
          <div className="prose prose-neutral dark:prose-invert mt-16 max-w-none">
            <div className="text-muted whitespace-pre-wrap">{project.content.trim()}</div>
          </div>
        ) : null}
      </Section>
    </article>
  );
}
