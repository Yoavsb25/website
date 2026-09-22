import { describe, expect, it } from "vitest";

import { profile } from "../../content/profile";
import { experience } from "../../content/experience";
import { githubFallback } from "../../content/github-fallback";
import {
  experienceSchema,
  githubRepoSchema,
  profileSchema,
  projectFrontmatterSchema,
} from "@/lib/schemas";

describe("content schemas", () => {
  it("parses profile", () => {
    expect(profileSchema.parse(profile).name).toBe("Yoav Sborovsky");
  });

  it("parses experience", () => {
    expect(experienceSchema.parse(experience).length).toBeGreaterThan(0);
  });

  it("parses github fallback repos", () => {
    for (const repo of githubFallback.pinned) {
      expect(githubRepoSchema.parse(repo).url).toMatch(/^https:\/\//);
    }
  });

  it("rejects empty project title", () => {
    expect(() =>
      projectFrontmatterSchema.parse({
        title: "",
        slug: "x",
        summary: "s",
        year: 2026,
        problem: "p",
        plan: "p",
        design: "d",
        build: "b",
        outcome: "o",
      }),
    ).toThrow();
  });
});
