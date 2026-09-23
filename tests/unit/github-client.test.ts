import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@t3-oss/env-nextjs", () => ({
  createEnv: (config: { runtimeEnv: Record<string, string | undefined> }) => ({
    SITE_URL: config.runtimeEnv.SITE_URL ?? "http://localhost:3000",
    GH_PROFILE_TOKEN: config.runtimeEnv.GH_PROFILE_TOKEN,
    NEXT_PUBLIC_GITHUB_USERNAME: config.runtimeEnv.NEXT_PUBLIC_GITHUB_USERNAME ?? "Yoavsb25",
  }),
}));

describe("getGithubProfile", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("returns fallback when token is missing", async () => {
    process.env.SITE_URL = "http://localhost:3000";
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = "Yoavsb25";
    delete process.env.GH_PROFILE_TOKEN;

    const { getGithubProfile } = await import("@/features/github/server/github-client");
    const data = await getGithubProfile();
    expect(data.source).toBe("fallback");
    expect(data.pinned.length).toBeGreaterThan(0);
  });

  it("returns fallback when fetch fails", async () => {
    process.env.SITE_URL = "http://localhost:3000";
    process.env.GH_PROFILE_TOKEN = "fake-token";
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = "Yoavsb25";

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const { getGithubProfile } = await import("@/features/github/server/github-client");
    const data = await getGithubProfile();
    expect(data.source).toBe("fallback");
  });

  it("returns fallback and warns when the response is not ok (e.g. 401)", async () => {
    process.env.SITE_URL = "http://localhost:3000";
    process.env.GH_PROFILE_TOKEN = "fake-token";
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = "Yoavsb25";

    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    const { getGithubProfile } = await import("@/features/github/server/github-client");
    const data = await getGithubProfile();
    expect(data.source).toBe("fallback");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("401"));
    warn.mockRestore();
  });

  it("returns fallback and warns when the payload fails schema validation", async () => {
    process.env.SITE_URL = "http://localhost:3000";
    process.env.GH_PROFILE_TOKEN = "fake-token";
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = "Yoavsb25";

    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ data: { user: { login: "Yoavsb25" } } }), {
          status: 200,
        }),
      ),
    );

    const { getGithubProfile } = await import("@/features/github/server/github-client");
    const data = await getGithubProfile();
    expect(data.source).toBe("fallback");
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("returns the live profile on a successful, schema-valid response", async () => {
    process.env.SITE_URL = "http://localhost:3000";
    process.env.GH_PROFILE_TOKEN = "fake-token";
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = "Yoavsb25";

    const user = {
      login: "Yoavsb25",
      name: "Yoav Sborovsky",
      url: "https://github.com/Yoavsb25",
      repositories: { totalCount: 12 },
      pinnedItems: {
        nodes: [
          {
            name: "website",
            description: "Portfolio site",
            url: "https://github.com/Yoavsb25/website",
            stargazerCount: 3,
            primaryLanguage: { name: "TypeScript", color: "#3178c6" },
          },
        ],
      },
      contributionsCollection: {
        contributionCalendar: { totalContributions: 456 },
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { user } }), { status: 200 })),
    );

    const { getGithubProfile } = await import("@/features/github/server/github-client");
    const data = await getGithubProfile();

    expect(data.source).toBe("live");
    expect(data.login).toBe("Yoavsb25");
    expect(data.totalRepositories).toBe(12);
    expect(data.totalContributions).toBe(456);
    expect(data.pinned).toHaveLength(1);
    expect(data.pinned[0]?.name).toBe("website");
  });
});
