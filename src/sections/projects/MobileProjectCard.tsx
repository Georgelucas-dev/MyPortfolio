import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import type { Project, ProjectSection } from "../../data/Projects";

interface Props {
  project: Project;
  projectIndex: number;
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden>
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CompositionProps {
  section: ProjectSection;
  index: number;
}

function Composition({ section, index }: CompositionProps) {
  const flip = index % 2 !== 0;

  return (
    <div className="relative px-3">
      {/* índice fantasma — estrutura real (ordem da narrativa), não decoração */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 z-0 select-none font-display text-[5.5rem] sm:text-[6.5rem] leading-none text-sage/15",
          flip ? "right-2" : "left-2",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Desktop: espia atrás, ângulo leve, imagem inteira (sem crop) */}
      <motion.img
        src={section.desktopImage}
        alt=""
        initial={{ opacity: 0, x: flip ? -30 : 30, rotate: flip ? -5 : 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: flip ? -3 : 3 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "absolute top-10 z-[1] w-[58%] rounded-lg shadow-lg",
          flip ? "left-0" : "right-0",
        )}
      />

      {/* Mobile: na frente, define a altura da composição, sem corte */}
      <div
        className={cn(
          "relative z-10 w-[64%]",
          flip ? "ml-auto" : "mr-auto",
        )}
      >
        <motion.img
          src={section.mobileImage}
          alt=""
          initial={{ opacity: 0, y: 32, rotate: flip ? 5 : -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: flip ? 3 : -3 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-full rounded-2xl shadow-2xl ring-1 ring-ink/5"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, projectIndex }: Props) {
  return (
    <article className="mb-20 last:mb-0">
      {/* meta do projeto: número, subtítulo, ano */}
      <div className="flex items-baseline justify-between border-t border-sage/20 pt-4 px-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
          {String(projectIndex + 1).padStart(2, "0")} · {project.subtitle}
        </p>
        <p className="font-mono text-[11px] text-inkSoft">{project.year}</p>
      </div>

      {/* composições — uma por seção, alternando lado/rotação */}
      <div className="mt-8 flex flex-col gap-14">
        {project.sections.map((section, i) => (
          <Composition key={i} section={section} index={i} />
        ))}
      </div>

      {/* título, descrição, tags, cta */}
      <div className="mt-10 px-2">
        <h2 className="font-display text-4xl leading-[1.05] text-ink">
          {project.title}
        </h2>

        <p className="mt-4 text-inkSoft leading-relaxed">
          {project.description}
        </p>

        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-clay">
          {project.tags.join(" · ")}
        </p>

        <a
          href={project.href}
          className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-sm uppercase tracking-widest text-ink"
        >
          Ver projeto
          <ArrowUpRightIcon />
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;