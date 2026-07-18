// src/sections/whyWorkWithMe/pillar-list.tsx
import type { Pillar } from "../../data/pillars-data";

interface PillarListProps {
  pillars: Pillar[];
  itemHeight: number;
}

export function PillarList({ pillars, itemHeight }: PillarListProps) {
  const initialY = ((pillars.length - 1) / 2) * itemHeight;

  return (
    <div className="col-span-12 md:col-span-7 relative flex items-center justify-center h-[35svh] md:h-full border-t md:border-t-0 md:border-l border-border/10">
      {/* NÚMERO INDICADOR LATERAL — Empilhado e mutado via GSAP sem re-render */}
      <div className="absolute left-4 md:left-8 font-mono text-xs md:text-sm text-muted-foreground tracking-widest hidden sm:block h-[20px] w-[40px] overflow-hidden">
        <div className="relative w-full h-full">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              style={{ opacity: i === 0 ? 1 : 0 }}
              className={`pillar-idx-${i} absolute inset-0`}
            >
              {pillar.index}
            </div>
          ))}
        </div>
      </div>

      {/* Máscara de Opacidade */}
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
        {/* Track principal movido por GSAP */}
        <div
          style={{
            transform: `translateY(${initialY}px)`,
            willChange: "transform",
          }}
          className="pillar-list-track absolute flex flex-col items-center w-full transform-gpu"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              style={{ height: itemHeight }}
              className="flex items-center justify-center w-full text-center"
            >
              <h2
                style={{
                  color:
                    i === 0
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.35)",
                }}
                className={`pillar-title-${i} font-display font-black uppercase tracking-[-0.05em] select-none text-2xl md:text-[3.5vw] transform-gpu`}
              >
                {pillar.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
