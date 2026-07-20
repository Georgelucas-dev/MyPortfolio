import MobileProjectCard from "./MobileProjectCard";
import { ActiveRowProvider } from "./ActiveRowContext";
import { projectsData } from "../../data/Projects";

function MobileProjects() {
  return (
    <ActiveRowProvider>
      <section
        id="projects"
        className="bg-background text-foreground px-4 py-16"
      >
        <h1 className="text-3xl font-bold mb-8">Projetos</h1>

        {projectsData.map((project, i) => (
          <MobileProjectCard
            key={project.title}
            project={project}
            index={i}
            total={projectsData.length}
          />
        ))}
      </section>
    </ActiveRowProvider>
  );
}

export default MobileProjects;
