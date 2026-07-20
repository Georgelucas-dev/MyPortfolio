import { useEffect, useId, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import type { Project } from "../../data/Projects";
import { useActiveRowController } from "./ActiveRowContext";

interface Props {
  project: Project;
  index: number;
  total: number;
}

const CYCLE_MS = 1400;
const BASE_SCALE = 1.18;
const ACTIVE_SCALE = 1.28;

function MobileProjectCard({ project, index, total }: Props) {
  const id = useId();
  const controller = useActiveRowController();

  const rowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRefs = useRef<(HTMLImageElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);

  const clearCycle = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const { contextSafe } = useGSAP(
    () => {
      const bg = bgRef.current;
      if (!bg) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(bg, { scale: BASE_SCALE, filter: "blur(0px) brightness(1)" });

      // parallax de scroll — independente de estar ativo ou não
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

  const showAt = contextSafe((i: number) => {
    const el = overlayRefs.current[i];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 1.04 },
      { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" },
    );
  });

  const hideAt = contextSafe((i: number) => {
    const el = overlayRefs.current[i];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { autoAlpha: 0, scale: 0.98, duration: 0.4, ease: "power2.inOut" });
  });

  const hideAllOverlays = contextSafe(() => {
    overlayRefs.current.forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.set(el, { autoAlpha: 0 });
    });
  });

  const activate = contextSafe(() => {
    if (isActiveRef.current) return;
    isActiveRef.current = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.killTweensOf(bgRef.current);
    gsap.to(bgRef.current, {
      scale: ACTIVE_SCALE,
      filter: "blur(6px) brightness(0.72)",
      duration: 0.6,
      ease: "power3.out",
    });

    activeIndexRef.current = 0;
    showAt(0);

    if (project.relatedImages.length > 1 && !reduceMotion) {
      intervalRef.current = window.setInterval(() => {
        if (!isActiveRef.current) return;
        const prev = activeIndexRef.current;
        const next = (prev + 1) % project.relatedImages.length;
        hideAt(prev);
        showAt(next);
        activeIndexRef.current = next;
      }, CYCLE_MS);
    }
  });

  const deactivate = contextSafe(() => {
    if (!isActiveRef.current) return;
    isActiveRef.current = false;
    clearCycle();

    gsap.killTweensOf(bgRef.current);
    gsap.to(bgRef.current, {
      scale: BASE_SCALE,
      filter: "blur(0px) brightness(1)",
      duration: 0.6,
      ease: "power3.out",
    });

    hideAllOverlays();
  });

  // decide quando ESTE card está "em foco" na tela — a zona ativa é o
  // trecho central do viewport; ajuste os 65%/35% se quiser mais ou
  // menos sensibilidade
  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: rowRef.current,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => controller.activate(id, deactivate),
        onEnterBack: () => controller.activate(id, deactivate),
        onLeave: () => {
          controller.release(id);
          deactivate();
        },
        onLeaveBack: () => {
          controller.release(id);
          deactivate();
        },
      });

      return () => st.kill();
    },
    { scope: rowRef },
  );

  useEffect(() => {
    return () => {
      clearCycle();
      controller.release(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rowRef}
      className="border-b border-border py-8 first:pt-0 last:border-b-0"
    >
      {/* Stage de imagem */}
      <div className="relative h-72 overflow-hidden bg-ink/5">
        <img
          ref={bgRef}
          src={project.backgroundImage}
          alt={project.title}
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
      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[.3em] text-ink-soft">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>

        <h3 className="font-display mt-3 text-2xl font-bold text-ink">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-ink-soft">{project.description}</p>

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

        <a
          href={project.href}
          className="mt-8 inline-flex w-fit items-center gap-2 text-ink transition-colors hover:text-clay"
        >
          Ver projeto →
        </a>
      </div>
    </div>
  );
}

export default MobileProjectCard;