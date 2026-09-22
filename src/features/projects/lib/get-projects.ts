import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { projectFrontmatterSchema, type ProjectFrontmatter } from "@/lib/schemas";

export type Project = ProjectFrontmatter & { content: string };

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = projectFrontmatterSchema.parse(data);
    return { ...frontmatter, content };
  });

  return projects.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
