import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

function Lightbox({ src, onClose }: LightboxProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (src) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
        >
          <motion.img
            src={src}
            alt=""
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CompositionProps {
  section: ProjectSection;
  index: number;
  onOpen: (src: string) => void;
}

function Composition({ section, index, onOpen }: CompositionProps) {
  const flip = index % 2 !== 0;

  return (
    <div className="relative px-3 md:px-4">
      {/* Índice fantasma */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 z-0 select-none font-display text-[5.5rem] sm:text-[6.5rem] leading-none text-ink/10",
          flip ? "right-4" : "left-4",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Desktop: espia atrás */}
      <motion.button
        type="button"
        onClick={() => onOpen(section.desktopImage)}
        initial={{ opacity: 0, y: 20, scale: 0.95, rotate: flip ? -5 : 5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: flip ? -3 : 3 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "absolute top-10 z-[1] w-[58%] cursor-zoom-in appearance-none bg-transparent p-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
          flip ? "left-2" : "right-2",
        )}
      >
        <img
          src={section.desktopImage}
          alt=""
          className="w-full rounded-lg shadow-lg ring-1 ring-ink/5"
        />
      </motion.button>

      {/* Mobile: na frente */}
      <div
        className={cn("relative z-10 w-[64%]", flip ? "ml-auto" : "mr-auto")}
      >
        <motion.button
          type="button"
          onClick={() => onOpen(section.mobileImage)}
          initial={{ opacity: 0, y: 32, scale: 0.95, rotate: flip ? 5 : -5 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: flip ? 3 : -3 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="block w-full cursor-zoom-in appearance-none bg-transparent p-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
        >
          <img
            src={section.mobileImage}
            alt=""
            className="w-full rounded-2xl shadow-2xl ring-1 ring-ink/5"
          />
        </motion.button>
      </div>
    </div>
  );
}

function ProjectCard({ project, projectIndex }: Props) {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <article className="mb-20 last:mb-0 w-full overflow-x-clip">
      {/* meta do projeto */}
      <div className="flex items-baseline justify-between border-t border-border pt-4 px-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          {String(projectIndex + 1).padStart(2, "0")} · {project.subtitle}
        </p>
        <p className="font-mono text-[11px] text-ink-soft">{project.year}</p>
      </div>

      {/* composições */}
      <div className="mt-12 flex flex-col gap-16">
        {project.sections.map((section, i) => (
          <Composition
            key={i}
            section={section}
            index={i}
            onOpen={setOpenImage}
          />
        ))}
      </div>

      {/* título, descrição, tags */}
      <div className="mt-12 px-2">
        <h2 className="font-display text-4xl leading-[1.05] text-ink">
          {project.title}
        </h2>

        <p className="mt-4 text-ink-soft leading-relaxed max-w-xl">
          {project.description}
        </p>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-soft">
          {project.tags.join(" · ")}
        </p>

        <a
          href={project.href}
          className="group mt-8 inline-flex items-center gap-3 border-b border-border hover:border-ink transition-colors pb-1.5 font-mono text-sm uppercase tracking-widest text-ink"
        >
          Ver projeto
          <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            <ArrowUpRightIcon />
          </span>
        </a>
      </div>

      <Lightbox src={openImage} onClose={() => setOpenImage(null)} />
    </article>
  );
}

export default ProjectCard;
