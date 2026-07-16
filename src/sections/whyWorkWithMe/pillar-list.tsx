// src/sections/whyWorkWithMe/pillar-list.tsx
import type { Pillar } from "../../data/pillars-data";
import { motion, type MotionValue } from "motion/react";

interface PillarListProps {
  pillars: Pillar[];
  activeIndex: number;
  itemHeight: number;
  /** MotionValue contínua para o deslocamento vertical. */
  y: MotionValue<number>;
}

export function PillarList({
  pillars,
  activeIndex,
  itemHeight,
  y,
}: PillarListProps) {
  const activePillar = pillars[activeIndex];

  return (
    <div className="col-span-12 md:col-span-7 relative flex items-center justify-center h-[35svh] md:h-full border-t md:border-t-0 md:border-l border-border/10">
      <div className="absolute left-4 md:left-8 font-mono text-xs md:text-sm text-muted-foreground tracking-widest hidden sm:block">
        {activePillar?.index || "01"}
      </div>

      {/* Wrapper da máscara isolado — evita repaint amplo durante o scroll. */}
      <div
        className="relative flex items-center justify-center w-full h-full overflow-hidden px-4 md:px-24"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          contain: "layout paint",
        }}
      >
        <motion.div
          style={{ y, willChange: "transform" }}
          className="absolute flex flex-col items-center w-full transform-gpu"
        >
          {pillars.map((pillar, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={pillar.id}
                style={{ height: itemHeight }}
                className="flex items-center justify-center w-full text-center"
              >
                <h2
                  className={`font-display font-black uppercase tracking-[-0.05em] select-none text-2xl md:text-[3.5vw] transition-colors duration-500 ease-out ${
                    isActive ? "text-foreground" : "text-muted-foreground/35"
                  }`}
                >
                  {pillar.title}
                </h2>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
