import { describe, expect, it } from "vitest";

import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/features/projects/lib/get-projects";

describe("get-projects", () => {
  it("loads and sorts projects", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects[0]?.year).toBeGreaterThanOrEqual(projects[1]?.year ?? 0);
  });

  it("returns featured projects", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });

  it("looks up by slug", () => {
    const slug = getProjectSlugs()[0];
    expect(slug).toBeDefined();
    if (!slug) return;
    expect(getProjectBySlug(slug)?.slug).toBe(slug);
    expect(getProjectBySlug("missing-slug")).toBeUndefined();
  });
});
