import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import type { Project } from "../../data/Projects";

interface Props {
  project: Project;
  index: number;
  total: number;
}

const CYCLE_MS = 1400; // intervalo de troca entre as imagens relacionadas
const BASE_SCALE = 1.18; // "sobra" de imagem pra cobrir o movimento do parallax sem estourar borda
const HOVER_SCALE = 1.28; // zoom extra só no hover

function ProjectHoverRow({ project, index, total }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRefs = useRef<(HTMLImageElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const bg = bgRef.current;
      if (!bg) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // estado base: imagem já maior que o container, sem blur/escurecimento
      gsap.set(bg, {
        scale: BASE_SCALE,
        filter: "blur(0px) brightness(1)",
      });

      // parallax de scroll: se move DENTRO da margem que o BASE_SCALE criou,
      // por isso nunca alcança a borda real da imagem
      if (!reduceMotion) {
        gsap.fromTo(
          bg,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }
    },
    { scope: rowRef },
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const showAt = contextSafe((i: number) => {
    const el = overlayRefs.current[i];
    if (!el) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 1.04 },
      { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" },
    );
  });

  const hideAt = contextSafe((i: number) => {
    const el = overlayRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      autoAlpha: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.inOut",
    });
  });

  const handleEnter = contextSafe(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.to(bgRef.current, {
      scale: HOVER_SCALE,
      filter: "blur(6px) brightness(0.72)",
      duration: 0.6,
      ease: "power3.out",
    });

    activeIndexRef.current = 0;
    showAt(0);

    if (project.relatedImages.length > 1 && !reduceMotion) {
      intervalRef.current = window.setInterval(() => {
        const prev = activeIndexRef.current;
        const next = (prev + 1) % project.relatedImages.length;
        hideAt(prev);
        showAt(next);
        activeIndexRef.current = next;
      }, CYCLE_MS);
    }
  });

  const handleLeave = contextSafe(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // volta pro BASE_SCALE, nunca pra 1 — senão a margem do parallax some
    gsap.to(bgRef.current, {
      scale: BASE_SCALE,
      filter: "blur(0px) brightness(1)",
      duration: 0.6,
      ease: "power3.out",
    });

    hideAt(activeIndexRef.current);
  });

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group border-b border-border py-10 first:pt-0 last:border-b-0"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        {/* Stage de imagem */}
        <div className="relative h-80 overflow-hidden bg-ink/5 lg:h-[26rem]">
          <img
            ref={bgRef}
            src={project.backgroundImage}
            alt={project.title}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />

          {project.relatedImages.map((src, i) => (
            <img
              key={src}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 z-10 m-auto h-[85%] w-[85%] object-contain opacity-0 drop-shadow-2xl will-change-transform"
            />
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.3em] text-ink-soft">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>

            <h3 className="font-display mt-3 text-3xl font-bold text-ink lg:text-4xl">
              {project.title}
            </h3>

            <p className="mt-4 max-w-md leading-7 text-ink-soft">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-sm text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            href={project.href}
            className="mt-8 inline-flex w-fit items-center gap-2 text-ink transition-colors hover:text-clay"
          >
            Ver projeto →
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectHoverRow;
