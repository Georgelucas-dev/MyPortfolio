// src/sections/WhyWorkWithMe.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../data/pillars-data";
import { whyWorkWithMeData } from "../data/whyWorkWithMe";
import DecorativeCurve from "@/components/DecorativeCurve";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".pillar-card");
      const mm = gsap.matchMedia();

      // DESKTOP: Entrada em Z-Pattern com mais suavidade
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, index) => {
          const isLeft = index % 2 === 0;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              x: isLeft ? -50 : 50,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%", // O card aparece quando atinge 80% da tela
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      // MOBILE: Entrada linear
      mm.add("(max-width: 767px)", () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="diferenciais"
      data-theme="dark"
      /* Atualizado para usar as variáveis globais dark do CSS */
      className="relative w-full bg-background text-foreground overflow-clip"
    >
      <div className="sticky top-0 w-full h-svh flex flex-col items-center justify-center pointer-events-none z-0 px-6">
        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-ink-soft mb-6 text-center">
          {whyWorkWithMeData.badge}
        </p>
        <h2 className="font-display font-bold text-[12vw] leading-[0.8] tracking-tighter text-ink/10 uppercase whitespace-nowrap select-none text-center">
          O QUE VOCÊ
          <br />
          LEVA
        </h2>
      </div>

      {/* 
        start="20% bottom": Inicia o desenho somente após rolar 20% da seção.
        end="95% top": A linha termina de "sumir" exatamente antes da seção sair da tela.
        strokeClass: text-clay aplica aquele tom dourado no SVG.
      */}
      <DecorativeCurve
        className="z-5"
        viewBox="0 0 1920 5000"
        d="M 0 500 C 1056 200, -192 1900, 960 2500 C 2112  3100, 864 4800, 1920 4500"
        strokeClass="stroke-[40px] md:stroke-[120px] text-clay/80"
        start="20% bottom"
        end="95% top"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 -mt-svh">
        {/* Usando height dinâmico nas margens verticais e no gap para dar muito mais espaço à linha */}
        <div className="pt-[100svh] pb-[80svh] flex flex-col gap-[25vh] md:gap-[35vh]">
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={pillar.id}
                className={`pillar-card flex flex-col gap-3 md:gap-4 w-full md:w-[45%] ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <h3 className="font-display text-2xl md:text-4xl font-bold text-ink uppercase tracking-tight leading-[0.95]">
                  {pillar.title}
                </h3>
                <p className="font-sans text-base md:text-lg text-ink-soft leading-relaxed font-light">
                  {pillar.paragraph}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
