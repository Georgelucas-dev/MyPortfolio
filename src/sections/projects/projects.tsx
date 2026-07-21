import DesktopProjects from "./DesktopProjects";
import MobileProjects from "./MobileProjects";

function Projects() {
  return (
    <section id="projetos" data-theme="dark">
      <div className="hidden lg:block">
        <DesktopProjects />
      </div>

      <div className="lg:hidden">
        <MobileProjects />
      </div>
    </section>
  );
}

export default Projects;