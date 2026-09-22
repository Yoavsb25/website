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
});
