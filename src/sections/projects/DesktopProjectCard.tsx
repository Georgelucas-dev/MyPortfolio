import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "../../lib/utils";
import type { Project, ProjectSection } from "../../data/Projects";
import type { MotionValue } from "motion/react";

interface Props {
  project: Project;
}

interface ShowcaseProps {
  background: string;
  foreground: string;
  backgroundY: MotionValue<number>;
  foregroundY: MotionValue<number>;
  variant: "desktop" | "mobile";
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

function Showcase({
  background,
  foreground,
  backgroundY,
  foregroundY,
  variant,
  offsetX = 0,
  offsetY = 0,
  className,
}: ShowcaseProps) {
  return (
    <div
      className={cn(
        "relative flex h-96 items-center justify-center overflow-hidden lg:h-125 xl:h-150 2xl:h-175",
        className,
      )}
    >
      <motion.img
        src={background}
        alt=""
        aria-hidden
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full object-cover scale-125 will-change-transform"
      />

      <motion.img
        src={foreground}
        alt=""
        style={{
          y: foregroundY,
          x: offsetX,
          marginTop: offsetY,
        }}
        className={cn(
          "relative z-10 h-full object-contain rounded-xl will-change-transform",
          variant === "desktop" ? "w-[88%]" : "w-[72%]",
        )}
      />
    </div>
  );
}

interface RowProps {
  section: ProjectSection;
  index: number;
  scrollYProgress: MotionValue<number>;
}

function ShowcaseRow({ section, index, scrollYProgress }: RowProps) {
  const desktopFirst = index % 2 === 0;
  const backgroundMoves = desktopFirst;

  const backgroundMove = useTransform(
    scrollYProgress,
    [0, 1],
    backgroundMoves ? [40, -40] : [0, 0],
  );

  const foregroundMove = useTransform(
    scrollYProgress,
    [0, 1],
    backgroundMoves ? [0, 0] : [70, -70],
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 lg:gap-6",
        desktopFirst
          ? "lg:grid-cols-[1.4fr_0.6fr]"
          : "lg:grid-cols-[0.6fr_1.4fr]",
      )}
    >
      <Showcase
        background={section.backgroundImage}
        foreground={section.desktopImage}
        backgroundY={backgroundMove}
        foregroundY={foregroundMove}
        variant="desktop"
      />

      <Showcase
        background={section.backgroundImageMobile}
        foreground={section.mobileImage}
        backgroundY={foregroundMove}
        foregroundY={backgroundMove}
        variant="mobile"
      />
    </div>
  );
}

function ProjectCard({ project }: Props) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <motion.article ref={ref} className="group mb-32 last:mb-0">
      <div className="flex flex-col gap-8">
        {project.sections.map((section, i) => (
          <ShowcaseRow
            key={i}
            section={section}
            index={i}
            scrollYProgress={scrollYProgress}
          />
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