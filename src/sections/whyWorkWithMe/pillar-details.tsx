// src/sections/whyWorkWithMe/pillar-details.tsx
import type { Pillar } from "../../data/pillars-data";
import { motion } from "motion/react";

interface PillarDetailsProps {
  pillars: Pillar[];
  activeIndex: number;
}

export function PillarDetails({ pillars, activeIndex }: PillarDetailsProps) {
  const activePillar = pillars[activeIndex];
  if (!activePillar) return null;

  return (
    <div className="col-span-12 md:col-span-5 flex flex-col justify-center h-[50svh] md:h-full py-8 md:py-16 pr-0 md:pr-10 lg:pr-16 pt-8 md:pt-0">
      <div className="flex flex-col gap-6 md:gap-10 w-full">
        {/* IMAGEM — crossfade em camadas, sem remount. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 shadow-2xl shrink-0 mt-6 md:mt-8">
          {pillars.map((pillar, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.img
                key={pillar.id}
                src={pillar.image}
                alt={pillar.title}
                loading="eager"
                decoding="async"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  zIndex: isActive ? 10 : 1,
                  willChange: "opacity",
                }}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none transform-gpu"
              />
            );
          })}
        </div>

        {/* TEXTOS — crossfade em camadas empilhadas, sem AnimatePresence. */}
        <div className="relative w-full min-h-[260px] md:min-h-[320px]">
          {pillars.map((pillar, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={pillar.id}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 6,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                  willChange: "opacity, transform",
                }}
                className="absolute top-0 left-0 w-full flex flex-col font-sans text-foreground transform-gpu"
                aria-hidden={!isActive}
              >
                <div className="grid grid-cols-4 border-t border-border/40 py-5 md:py-6">
                  <span className="text-muted-foreground uppercase tracking-wider text-[11px] md:text-sm">
                    Overview
                  </span>
                  <p className="col-span-3 text-muted-foreground leading-relaxed text-sm md:text-lg">
                    {pillar.overview}
                  </p>
                </div>

                <div className="grid grid-cols-4 border-t border-b border-border/40 py-5 md:py-6">
                  <span className="text-muted-foreground uppercase tracking-wider text-[11px] md:text-sm">
                    Garantia
                  </span>
                  <div className="col-span-3 grid grid-cols-3 gap-3 md:gap-6">
                    {pillar.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="text-[10px] md:text-sm text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className="text-sm md:text-xl font-semibold mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
