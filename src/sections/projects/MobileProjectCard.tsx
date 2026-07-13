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
        "flex h-96 items-center justify-center lg:h-125 xl:h-150 2xl:h-175",
        className,
      )}
    >
      <motion.img
        src={image}
        alt=""
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "h-full object-contain rounded-xl will-change-transform",
          variant === "desktop" ? "w-[88%]" : "w-[72%]",
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
        "grid grid-cols-1 gap-4 lg:gap-6",
        desktopFirst
          ? "lg:grid-cols-[1.4fr_0.6fr]"
          : "lg:grid-cols-[0.6fr_1.4fr]",
      )}
    >
      <Showcase image={section.desktopImage} variant="desktop" delay={0} />
      <Showcase image={section.mobileImage} variant="mobile" delay={0.15} />
    </div>
  );
}

function ProjectCard({ project }: Props) {
  return (
    <article className="group mb-32 last:mb-0">
      <div className="flex flex-col gap-8">
        {project.sections.map((section, i) => (
          <ShowcaseRow key={i} section={section} index={i} />
        ))}
      </div>

      <div className="mt-8 flex flex-col lg:flex-row justify-between items-start gap-10">
        <div>
          <p className="text-sm uppercase tracking-[.3em] text-zinc-400">
            {project.subtitle}
          </p>

          <h2 className="text-5xl font-bold mt-2">{project.title}</h2>

          <p className="mt-6 max-w-xl text-zinc-500 leading-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto lg:text-right">
          <p className="text-zinc-400">{project.year}</p>

          <a
            href={project.href}
            className="mt-6 inline-flex items-center gap-2 text-lg"
          >
            Ver projeto →
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;