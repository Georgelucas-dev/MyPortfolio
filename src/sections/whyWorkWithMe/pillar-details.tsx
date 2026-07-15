import { useEffect } from "react";
import type { Pillar } from "../../data/pillars-data";
import { motion, AnimatePresence } from "motion/react";

interface PillarDetailsProps {
  pillars: Pillar[];
  activeIndex: number;
}

export function PillarDetails({ pillars, activeIndex }: PillarDetailsProps) {
  const activePillar = pillars[activeIndex];

  // Pré-carrega todas as imagens uma vez
  useEffect(() => {
    pillars.forEach((pillar) => {
      const img = new Image();
      img.src = pillar.image;
    });
  }, [pillars]);

  if (!activePillar) return null;

  return (
    <div className="col-span-12 md:col-span-5 flex flex-col justify-center h-[50svh] md:h-full py-8 md:py-16 pr-0 md:pr-10 lg:pr-16 pt-8 md:pt-0">
      <div className="flex flex-col gap-6 md:gap-10 w-full">
        {/* IMAGEM: Adicionado mt-6 md:mt-8 para dar um respiro no topo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-900 border border-border/50 shadow-2xl shrink-0 mt-6 md:mt-8">
          {pillars.map((pillar, i) => (
            <motion.img
              key={pillar.id}
              src={pillar.image}
              alt={pillar.title}
              loading="eager"
              decoding="async"
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.85] contrast-[1.05] will-change-transform pointer-events-none"
            />
          ))}
        </div>

        {/* CONTAINER DE TEXTO */}
        <div className="relative w-full min-h-[260px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-0 left-0 w-full flex flex-col font-sans text-foreground"
            >
              <div className="grid grid-cols-4 border-t border-border/40 py-5 md:py-6">
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] md:text-sm">
                  Overview
                </span>
                <p className="col-span-3 text-muted-foreground leading-relaxed text-sm md:text-lg">
                  {activePillar.overview}
                </p>
              </div>

              <div className="grid grid-cols-4 border-t border-b border-border/40 py-5 md:py-6">
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] md:text-sm">
                  Garantia
                </span>
                <div className="col-span-3 grid grid-cols-3 gap-3 md:gap-6">
                  {activePillar.metrics.map((metric) => (
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
