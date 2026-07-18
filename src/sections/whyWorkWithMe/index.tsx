// src/sections/whyWorkWithMe/index.tsx
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../../data/pillars-data";
import { PillarDetails } from "./pillar-details";
import { PillarList } from "./pillar-list";
import { MobileAccordion } from "./mobile-accordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_QUERY = "(max-width: 767px)";
const ITEM_HEIGHT = 120;

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    if (isMobile || !containerRef.current) return;

    // Instancia o Context do GSAP (Garbage Collector limpo)
    const ctx = gsap.context(() => {
      const totalItems = pillars.length;

      // O deslocamento máximo que a lista (Track) precisa dar
      // InitialY: Posiciona o primeiro item no meio
      const initialY = ((totalItems - 1) / 2) * ITEM_HEIGHT;
      // FinalY: Posiciona o último item no meio
      const finalY = initialY - (totalItems - 1) * ITEM_HEIGHT;

      // Cria a timeline atrelada ao scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Diminuímos de 80% para 40%.
          // Quanto menor o número, menos você precisa dar scroll.
          end: `+=${totalItems * 40}%`,
          pin: true,
          // Diminuímos de 1 para 0.5.
          // Isso deixa a resposta do movimento mais "seca" e conectada ao mouse.
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // 1. ANIMAÇÃO DA LISTA DE TEXTOS DIREITA (Track contínuo)
      // O movimento da lista leva 100% da duração da timeline
      tl.to(
        ".pillar-list-track",
        {
          y: finalY,
          ease: "none", // Mantém velocidade constante no scroll
          duration: totalItems, // Duração "lógica" total
        },
        0,
      ); // O "0" crava o início no marco zero da timeline

      // 2. SINCRONIA DE ESTILOS E TROCA DE PAINEIS (ESQUERDA E DIREITA)
      pillars.forEach((_, i) => {
        const img = `.pillar-img-${i}`;
        const text = `.pillar-text-${i}`;
        const title = `.pillar-title-${i}`;
        const idx = `.pillar-idx-${i}`;

        // Tempo exato na timeline lógica onde esse item está centralizado.
        const centerTime = i;

        // Animação de Entrada (Ocorre no segundo que antecede o centerTime)
        if (i !== 0) {
          const inTime = centerTime - 0.5;
          const duration = 0.5;

          tl.fromTo(
            img,
            { opacity: 0 },
            { opacity: 1, duration, ease: "power1.inOut" },
            inTime,
          )
            .fromTo(
              text,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration, ease: "power1.out" },
              inTime,
            )
            .to(
              title,
              {
                color: "rgba(255, 255, 255, 1)",
                duration,
                ease: "power1.inOut",
              },
              inTime,
            )
            .fromTo(
              idx,
              { opacity: 0, y: -5 },
              { opacity: 1, y: 0, duration, ease: "power1.inOut" },
              inTime,
            );
        }

        // Animação de Saída (Ocorre no segundo após o centerTime)
        if (i !== totalItems - 1) {
          const outTime = centerTime;
          const duration = 0.5;

          tl.to(img, { opacity: 0, duration, ease: "power1.inOut" }, outTime)
            .to(
              text,
              { opacity: 0, y: -15, duration, ease: "power1.in" },
              outTime,
            )
            .to(
              title,
              {
                color: "rgba(255, 255, 255, 0.35)",
                duration,
                ease: "power1.inOut",
              },
              outTime,
            )
            .to(
              idx,
              { opacity: 0, y: 5, duration, ease: "power1.inOut" },
              outTime,
            );
        }
      });
    }, containerRef);

    // Reverte (Destrói) e limpa classes quando componente desmonta
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      {/* Título Fixo */}
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
        /* 👇 A MÁGICA AQUI: O wrapper com overflow-x-clip */
        <div className="w-full overflow-x-clip bg-background">
          <section ref={containerRef} className="relative w-full h-svh">
            <div
              className="sticky top-0 flex h-full w-full overflow-hidden px-6 lg:px-16 xl:px-30 bg-background md:grid md:grid-cols-12"
              style={{
                contain: "layout paint",
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              <PillarDetails pillars={pillars} />
              <PillarList pillars={pillars} itemHeight={ITEM_HEIGHT} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
