import ProjectHoverRow from "@/components/Projects/ProjectHoverRow";
import { projectsData } from "../../data/Projects";

function DesktopProjects() {
  return (
    <section
      id="projects"
      className="bg-background text-foreground px-6 py-24 lg:px-16 xl:px-30 2xl:px-32"
    >
      <div className="mb-16 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-clay" />
        <p className="font-mono text-sm uppercase tracking-[.3em] text-ink-soft">
          Projetos
        </p>
      </div>

      {projectsData.map((project, i) => (
        <ProjectHoverRow
          key={project.title}
          project={project}
          index={i}
          total={projectsData.length}
        />
      ))}
    </section>
  );
}

export default DesktopProjects;
