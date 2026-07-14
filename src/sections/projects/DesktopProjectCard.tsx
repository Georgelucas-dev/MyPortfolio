import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { cn } from "../../lib/utils";
import type { Project, ProjectSection } from "../../data/Projects";
import type { MotionValue } from "motion/react";

interface Props {
  project: Project;
}

interface ShowcaseProps {
  foreground: string;
  backgroundY: MotionValue<number>;
  foregroundY: MotionValue<number>;
  variant: "desktop" | "mobile";
  gradientDirection: "br" | "tl";
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

function Showcase({
  foreground,
  backgroundY,
  foregroundY,
  variant,
  gradientDirection,
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
      {/* Fundo: gradiente com mais contraste nas bordas pra separar do print claro */}
      <motion.div
        aria-hidden
        style={{ y: backgroundY }}
        className={cn(
          "absolute -inset-16 will-change-transform",
          gradientDirection === "br"
            ? "bg-linear-to-br from-zinc-400 via-zinc-100 to-zinc-500"
            : "bg-linear-to-tl from-zinc-500 via-zinc-200 to-zinc-400",
        )}
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
          "relative z-10 h-[80%] object-contain  will-change-transform",
          variant === "desktop" ? "w-[88%]" : "w-[72%]",
        )}
      />
    </div>
  );
}

interface RowProps {
  section: ProjectSection;
  index: number;
  smoothProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function ShowcaseRow({
  section,
  index,
  smoothProgress,
  shouldReduceMotion,
}: RowProps) {
  const desktopFirst = index % 2 === 0;
  const backgroundMoves = desktopFirst;

  const backgroundMove = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : backgroundMoves ? [40, -40] : [0, 0],
  );

  const foregroundMove = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : backgroundMoves ? [0, 0] : [70, -70],
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 lg:gap-4",
        desktopFirst
          ? "lg:grid-cols-[1.4fr_0.6fr]"
          : "lg:grid-cols-[0.6fr_1.4fr]",
      )}
    >
      <Showcase
        foreground={section.desktopImage}
        backgroundY={backgroundMove}
        foregroundY={foregroundMove}
        variant="desktop"
        gradientDirection={desktopFirst ? "br" : "tl"}
      />

      <Showcase
        foreground={section.mobileImage}
        backgroundY={foregroundMove}
        foregroundY={backgroundMove}
        variant="mobile"
        gradientDirection={desktopFirst ? "tl" : "br"}
      />
    </div>
  );
}

function ProjectCard({ project }: Props) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <motion.article ref={ref} className="group mb-32 last:mb-0">
      <div className="flex flex-col gap-4">
        {project.sections.map((section, i) => (
          <ShowcaseRow
            key={i}
            section={section}
            index={i}
            smoothProgress={smoothProgress}
            shouldReduceMotion={!!shouldReduceMotion}
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
