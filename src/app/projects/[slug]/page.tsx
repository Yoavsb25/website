import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy, getProjectBySlug, getProjectSlugs } from "@/features/projects";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return createMetadata({ title: "Not found" });
  return createMetadata({
    title: project.title,
    description: project.summary,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
