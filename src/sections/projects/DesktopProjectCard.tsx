import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "../../lib/utils";
import type { Project, ProjectSection } from "../../data/Projects";

interface Props {
  project: Project;
}

interface RowProps {
  section: ProjectSection;
  index: number;
}

function ShowcaseRow({ section, index }: RowProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const move = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const mobileFirst = index % 2 !== 0;
  const backgroundParallax = index % 2 === 0;

  const backgroundY = backgroundParallax ? move : 0;
  const foregroundY = backgroundParallax ? 0 : move;

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.40fr_0.60fr] lg:gap-6 items-center h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        <div
          className={cn(
            "relative flex h-full items-center justify-center overflow-hidden border border-zinc-200/80 bg-zinc-100/70 px-2 sm:px-3 lg:px-4 py-4",
            index % 2 === 0 ? "lg:order-1" : "lg:order-2",
          )}
          style={{ order: index % 2 === 0 ? 1 : 2 }}
        >
          <motion.img
            src={section.desktopImage}
            alt=""
            aria-hidden
            style={{ y: backgroundY, scale: 1.08 }}
            className="absolute inset-0 h-full w-full object-cover opacity-35 blur-sm"
          />

          <motion.img
            src={section.desktopImage}
            alt=""
            style={{ y: foregroundY }}
            className="relative z-10 w-full h-full object-contain"
          />
        </div>

        <div
          className={cn(
            "relative flex h-full items-center justify-center overflow-hidden border border-zinc-200/80 bg-zinc-100/70 px-2 sm:px-3 lg:px-4 py-4",
            index % 2 === 0 ? "lg:order-2" : "lg:order-1",
          )}
          style={{ order: index % 2 === 0 ? 2 : 1 }}
        >
          <motion.img
            src={section.mobileImage}
            alt=""
            aria-hidden
            style={{ y: backgroundParallax ? 0 : move, scale: 1.08 }}
            className="absolute inset-0 h-full w-full object-cover opacity-35 blur-sm"
          />

          <motion.img
            src={section.mobileImage}
            alt=""
            style={{ y: foregroundY }}
            className="relative z-10 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: Props) {
  return (
    <motion.article className="group mb-32 last:mb-0">
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
    </motion.article>
  );
}

export default ProjectCard;
