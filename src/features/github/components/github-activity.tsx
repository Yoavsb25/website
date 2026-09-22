import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { GithubViewModel } from "@/features/github/server/github-client";

export function GithubActivity({ data }: { data: GithubViewModel }) {
  return (
    <Section id="github" ariaLabelledBy="github-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">GitHub</p>
          <Heading id="github-heading" className="mt-3">
            Recent signal from the workbench.
          </Heading>
        </div>
        <Badge>{data.source === "live" ? "Live at build" : "Fallback data"}</Badge>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="border-border border-t pt-3">
          <dt className="text-subtle font-mono text-xs">Repositories</dt>
          <dd className="font-display mt-1 text-3xl">{data.totalRepositories}</dd>
        </div>
        <div className="border-border border-t pt-3">
          <dt className="text-subtle font-mono text-xs">Contributions (year)</dt>
          <dd className="font-display mt-1 text-3xl">{data.totalContributions}</dd>
        </div>
      </dl>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {data.pinned.map((repo) => (
          <li key={repo.url}>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="border-border bg-surface/40 hover:bg-surface block border p-5 no-underline transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-accent font-mono text-sm">{repo.name}</h3>
                <span className="text-subtle font-mono text-xs">★ {repo.stargazerCount}</span>
              </div>
              <p className="text-muted mt-2 text-sm">{repo.description ?? "No description"}</p>
              {repo.primaryLanguage ? (
                <p className="text-subtle mt-4 font-mono text-xs">{repo.primaryLanguage.name}</p>
              ) : null}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="text-accent mt-8 inline-block font-mono text-sm hover:underline"
      >
        View profile ↗
      </a>
    </Section>
  );
}
