// src/components/services/ServicesSection.tsx
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { services, type Service } from "../../data/services-data";
import { ServiceDrawer } from "./ServiceDrawer";

export function ServicesSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [leftOffset, setLeftOffset] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBoundaryState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setAtStart(container.scrollLeft <= 1);
    setAtEnd(container.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    const update = () => {
      if (titleRef.current) {
        setLeftOffset(titleRef.current.getBoundingClientRect().left);
      }
      updateBoundaryState();
    };

    update();
    const timeout = setTimeout(update, 100);

    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", update);
    };
  }, [updateBoundaryState]);

  // Mede a posição REAL do card no DOM (sub-pixel), em vez de somar uma
  // distância aproximada — assim o alvo sempre coincide com um ponto de
  // snap válido, e o snap-mandatory nunca "corrige" para trás.
  const goToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const target = Math.min(
      Math.max(cardRect.left - containerRect.left + container.scrollLeft, 0),
      maxScroll,
    );

    container.scrollTo({ left: target, behavior: "smooth" });
    setActiveIndex(index);
  };

  const scroll = (direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? Math.min(activeIndex + 1, services.length - 1)
        : Math.max(activeIndex - 1, 0);

    goToIndex(nextIndex);
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[750px] bg-background text-foreground py-12 lg:py-16 overflow-hidden flex flex-col justify-between">
      {/* 1. TOPO: Título */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 grid grid-cols-12 shrink-0">
        <div className="hidden lg:col-span-1 lg:flex flex-col justify-start">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground origin-left rotate-90 translate-y-24 whitespace-nowrap">
            Tipo de Serviço
          </span>
        </div>
        <div className="col-span-12 lg:mb-5 lg:col-span-11">
          <h2
            ref={titleRef}
            className="font-display font-extrabold text-5xl md:text-7xl lg:text-7xl tracking-tighter"
          >
            O que eu faço
          </h2>
        </div>
      </div>

      {/* 2. CARROSSEL */}
      <div className="w-full flex-1 flex flex-col justify-center my-6 lg:my-0">
        <div
          ref={scrollContainerRef}
          onScroll={updateBoundaryState}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pr-6 md:pr-16"
          style={{
            marginLeft: leftOffset !== null ? `${leftOffset}px` : "1.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => (
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              key={service.id}
              onClick={() => setSelectedService(service)}
              style={{
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                WebkitFontSmoothing: "antialiased",
              }}
              className={`snap-start shrink-0 w-[80vw] sm:w-[40vw] lg:w-[380px] xl:w-[420px] aspect-[4/5] rounded-none p-6 md:p-8 bg-gradient-to-br ${service.bgGradient} flex flex-col justify-between cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] shadow-xl will-change-transform origin-center`}
            >
              <div className="flex justify-end opacity-40 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 ease-out text-white">
                <svg
                  className="w-5 h-5 rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              <h3 className="font-display font-bold text-2xl md:text-3xl text-center mb-8 text-white">
                {service.title}
              </h3>

              <div className="w-full h-1/4 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-4/5 h-[1px] bg-white/20 relative">
                  <div className="absolute top-[-4px] right-[20%] w-2 h-2 rounded-full bg-white shadow-lg group-hover:right-[10%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RODAPÉ */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 grid grid-cols-12 pt-6 shrink-0">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-12 lg:col-span-11 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={atStart}
              aria-label="Anterior"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-foreground active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={atEnd}
              aria-label="Próximo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-foreground active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 font-sans text-sm md:max-w-[500px] md:text-right">
            <p className="text-foreground font-medium leading-relaxed">
              Meu foco é entregar sites e aplicações que não só ficam bonitos,
              mas realmente geram resultados para quem contrata.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed hidden sm:block">
              Com conhecimento sólido em React, Node.js e design de interfaces,
              crio experiências modernas, rápidas e fáceis de usar.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDrawer
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
