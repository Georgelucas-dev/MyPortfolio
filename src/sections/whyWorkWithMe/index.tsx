// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

const MOBILE_QUERY = "(max-width: 767px)";
const VH_PER_ITEM = 35;
const ITEM_HEIGHT = 120;

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Índice fracionado (contínuo) — usado só para a lista deslizar suavemente.
  // NÃO dispara re-render em React.
  const fractionalIndex = useTransform(scrollYProgress, (v) => {
    const raw = v * pillars.length;
    return Math.max(0, Math.min(raw, pillars.length - 1));
  });

  // Alvo do Y da lista, também contínuo.
  const rawY = useTransform(
    fractionalIndex,
    (i) => ((pillars.length - 1) / 2 - Math.floor(i)) * ITEM_HEIGHT,
  );

  // Spring aplicada uma única vez sobre o MotionValue.
  // A spring nunca "reinicia" — apenas persegue o alvo continuamente.
  const smoothY = useSpring(rawY, {
    stiffness: 90,
    damping: 22,
    mass: 0.7,
  });

  // Índice discreto (para textos/imagem) — só muda quando muda.
  useMotionValueEvent(fractionalIndex, "change", (latest) => {
    if (isMobile) return;
    const next = Math.floor(latest);
    setActiveIndex((cur) => (next !== cur ? next : cur));
  });

  return (
    <>
      <div className="px-6 lg:px-16 xl:px-30 pt-16 md:pt-24 bg-background">
        <h2 className="font-display text-5xl md:text-5xl font-bold tracking-tight text-foreground">
          Por que trabalhar comigo
        </h2>
      </div>

      {isMobile ? (
        <section className="w-full bg-background min-h-screen">
          <MobileAccordion pillars={pillars} />
        </section>
      ) : (
        <section
          ref={containerRef}
          className="relative bg-background w-full"
          style={{ height: `${pillars.length * VH_PER_ITEM}vh` }}
        >
          <div
            className="sticky top-0 flex h-svh w-full grid-cols-12 overflow-hidden px-6 lg:px-16 xl:px-30 bg-background md:grid"
            style={{
              contain: "layout paint",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <PillarDetails pillars={pillars} activeIndex={activeIndex} />
            <PillarList
              pillars={pillars}
              activeIndex={activeIndex}
              itemHeight={ITEM_HEIGHT}
              y={smoothY}
            />
          </div>
        </section>
      )}
    </>
  );
}
