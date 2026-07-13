import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import type { Project, ProjectSection } from "../../data/Projects";

interface Props {
  project: Project;
}

interface ShowcaseProps {
  image: string;
  variant: "desktop" | "mobile";
  delay?: number;
  className?: string;
}

function Showcase({ image, variant, delay = 0, className }: ShowcaseProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        variant === "desktop" ? "h-48 sm:h-56" : "h-72 sm:h-80",
        className,
      )}
    >
      <motion.img
        src={image}
        alt=""
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(
          "h-full object-contain rounded-lg will-change-transform",
          variant === "desktop" ? "w-full" : "w-[60%]",
        )}
      />
    </div>
  );
}

interface RowProps {
  section: ProjectSection;
  index: number;
}

function ShowcaseRow({ section, index }: RowProps) {
  const desktopFirst = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex gap-3",
        desktopFirst ? "flex-col" : "flex-col-reverse",
      )}
    >
      <Showcase image={section.desktopImage} variant="desktop" delay={0} />
      <Showcase image={section.mobileImage} variant="mobile" delay={0.1} />
    </div>
  );
}

function ProjectCard({ project }: Props) {
  return (
    <article className="mb-20 last:mb-0">
      <div className="flex flex-col gap-6">
        {project.sections.map((section, i) => (
          <ShowcaseRow key={i} section={section} index={i} />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[.25em] text-zinc-400">
            {project.subtitle}
          </p>

          <h2 className="text-3xl font-bold mt-2">{project.title}</h2>

          <p className="mt-4 text-zinc-500 leading-7">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">{project.year}</p>

          <a href={project.href} className="inline-flex items-center gap-2">
            Ver projeto →
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
