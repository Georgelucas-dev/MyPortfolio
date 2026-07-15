// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

const MOBILE_QUERY = "(max-width: 767px)"; // espelha o breakpoint md: do Tailwind
const VH_PER_ITEM = 35; // 8 itens * 56.25 = 450vh

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;

    const calculatedIndex = Math.floor(latest * pillars.length);
    const clampedIndex = Math.max(
      0,
      Math.min(calculatedIndex, pillars.length - 1),
    );

    setActiveIndex((current) =>
      clampedIndex !== current ? clampedIndex : current,
    );
  });

  const itemHeight = 120;
  const yOffset = ((pillars.length - 1) / 2 - activeIndex) * itemHeight;

  return (
    <>
      {/* Título — fora da área travada, sem numeração */}
      <div className="px-12 lg:px-24 pt-16 pb-8 md:pt-24 md:pb-12 bg-background">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
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
          <div className="sticky top-0 flex h-[100svh] w-full grid-cols-12 overflow-hidden px-12 lg:px-24 bg-background md:grid">
            <PillarDetails activePillar={pillars[activeIndex]} />
            <PillarList
              pillars={pillars}
              activeIndex={activeIndex}
              itemHeight={itemHeight}
              yOffset={yOffset}
            />
          </div>
        </section>
      )}
    </>
  );
}
