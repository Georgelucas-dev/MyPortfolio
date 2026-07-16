import ProjectCard from "./DesktopProjectCard";
import { projectsData } from "../../data/Projects";

function DesktopProjects() {
  return (
    <section
      id="projects"
      className="
        bg-background
        text-foreground
        px-6
        py-24
        lg:px-16
        xl:px-30
        2xl:px-32
      "
    >
      <h1 className="text-5xl font-bold mb-10">Projetos</h1>

      {projectsData.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
}

export default DesktopProjects;
