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

  const desktopFirst = index % 2 === 0;
  const backgroundMoves = desktopFirst;

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-4 lg:gap-6",
        !desktopFirst && "lg:grid-cols-[0.6fr_1.4fr]",
      )}
    >
      {/* Desktop */}
      <div className="relative flex h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] items-center justify-center overflow-hidden border border-zinc-200/80 bg-zinc-100/70 px-2 py-4 lg:px-4">
        <motion.img
          src={section.backgroundImage}
          alt=""
          aria-hidden
          style={{
            y: backgroundMoves ? move : 0,
            scale: 1.08,
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.img
          src={section.desktopImage}
          alt=""
          style={{
            y: backgroundMoves ? 0 : move,
          }}
          className="relative z-10 h-full w-full object-contain"
        />
      </div>

      {/* Mobile */}
      <div className="relative flex h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] items-center justify-center overflow-hidden border border-zinc-200/80 bg-zinc-100/70 px-2 py-4 lg:px-4">
        <motion.img
          src={section.backgroundImageMobile}
          alt=""
          aria-hidden
          style={{
            y: backgroundMoves ? 0 : move,
            scale: 1.08,
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.img
          src={section.mobileImage}
          alt=""
          style={{
            y: backgroundMoves ? move : 0,
          }}
          className="relative z-10 h-full w-full object-contain"
        />
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
