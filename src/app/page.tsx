import { About } from "@/features/about";
import { Contact } from "@/features/contact";
import { Experience } from "@/features/experience";
import { GithubActivity, getGithubProfile } from "@/features/github";
import { Hero } from "@/features/hero";
import { LiveWorkStrip, SelectedWork, getFeaturedProjects } from "@/features/projects";

export default async function HomePage() {
  const projects = getFeaturedProjects();
  const github = await getGithubProfile();

  return (
    <>
      <Hero />
      <LiveWorkStrip projects={projects} />
      <SelectedWork projects={projects} />
      <About />
      <Experience />
      <GithubActivity data={github} />
      <Contact />
    </>
  );
}
