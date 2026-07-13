import ProjectCard from "./MobileProjectCard";
import { projectsData } from "../../data/Projects";

function MobileProjects() {
  return (
    <section id="projects" className="bg-background text-foreground px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Projetos</h1>

      {projectsData.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
}

export default MobileProjects;