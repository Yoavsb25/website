import { About } from "@/features/about";
import { AiEngineering } from "@/features/ai";
import { Contact } from "@/features/contact";
import { Experience } from "@/features/experience";
import { GithubActivity, getGithubProfile } from "@/features/github";
import { Hero } from "@/features/hero";
import { Process } from "@/features/process";
import { LiveWorkStrip, SelectedWork, getFeaturedProjects } from "@/features/projects";

export default async function HomePage() {
  const projects = getFeaturedProjects();
  const github = await getGithubProfile();

  return (
    <>
      <Hero />
      <Process />
      <LiveWorkStrip projects={projects} />
      <SelectedWork projects={projects} />
      <AiEngineering />
      <About />
      <Experience />
      <GithubActivity data={github} />
      <Contact />
    </>
  );
}
