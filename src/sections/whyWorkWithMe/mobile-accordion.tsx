// src/sections/whyWorkWithMe/mobile-accordion.tsx
import { useState } from "react";
import { cn } from "../../lib/utils";
import type { Pillar } from "../../data/pillars-data";

export function MobileAccordion({ pillars }: { pillars: Pillar[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col py-20 px-6 bg-background">
      <div className="flex flex-col gap-2">
        {pillars.map((pillar, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={pillar.id}
              className="flex flex-col w-full transform-gpu"
              style={{ contain: "layout paint" }}
            >
              <button
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="py-2 text-left w-full outline-none"
              >
                <h2
                  className={cn(
                    "font-display font-black uppercase tracking-[-0.05em] select-none text-[8vw] transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground/35",
                  )}
                >
                  {pillar.title}
                </h2>
              </button>

              {/*
                Grid resolve altura no compositor.
                content-visibility: auto libera trabalho de layout/paint
                nos itens colapsados sem removê-los do DOM.
              */}
              <div
                className={cn(
                  "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none",
                )}
                style={{
                  willChange: isActive ? "grid-template-rows, opacity" : "auto",
                  contentVisibility: isActive ? "visible" : "auto",
                  containIntrinsicSize: "0 600px",
                }}
                aria-hidden={!isActive}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-6 pb-12 pt-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 shrink-0 transform-gpu">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col font-sans text-sm text-foreground transform-gpu">
                      <div className="flex flex-col border-t border-border/40 py-4 gap-2">
                        <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                          Overview
                        </span>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {pillar.overview}
                        </p>
                      </div>

                      <div className="flex flex-col border-t border-b border-border/40 py-4 gap-2">
                        <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
                          Garantia
                        </span>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                          {pillar.metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground">
                                {metric.label}
                              </span>
                              <span className="text-sm font-semibold mt-0.5">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
