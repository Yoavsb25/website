import "server-only";

import { githubFallback } from "@content/github-fallback";
import { env } from "@/lib/env";
import { githubProfileSchema, type GithubRepo } from "@/lib/schemas";

export type GithubViewModel = {
  login: string;
  url: string;
  totalRepositories: number;
  totalContributions: number;
  pinned: GithubRepo[];
  source: "live" | "fallback";
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      url
      repositories { totalCount }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            primaryLanguage { name color }
          }
        }
      }
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
    }
  }
`;

export async function getGithubProfile(): Promise<GithubViewModel> {
  const login = env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = env.GH_PROFILE_TOKEN;

  if (!token) {
    return { ...githubFallback, source: "fallback" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "yoavsb25-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      signal: controller.signal,
      // Static export: fetch at build time only
      cache: "force-cache",
    });

    if (!response.ok) {
      console.warn(`GitHub profile fetch failed: HTTP ${response.status}`);
      return { ...githubFallback, source: "fallback" };
    }

    const json: unknown = await response.json();
    const user = (json as { data?: { user?: unknown } }).data?.user;
    if (!user) {
      console.warn("GitHub profile fetch failed: response missing data.user");
      return { ...githubFallback, source: "fallback" };
    }

    const parsed = githubProfileSchema.parse(user);
    return {
      login: parsed.login,
      url: parsed.url,
      totalRepositories: parsed.repositories.totalCount,
      totalContributions: parsed.contributionsCollection.contributionCalendar.totalContributions,
      pinned: parsed.pinnedItems.nodes,
      source: "live",
    };
  } catch (error) {
    console.warn("GitHub profile fetch failed:", error);
    return { ...githubFallback, source: "fallback" };
  } finally {
    clearTimeout(timeout);
  }
}
