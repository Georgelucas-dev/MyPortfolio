import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesCards } from "../../src/data/services-cards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-bounce">
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Quebra o texto em linhas > palavras. Cada palavra fica dentro de uma
// máscara (overflow-hidden) pra permitir o reveal via translateY no GSAP.
// O pb/-mb compensa descendentes (g, p, y) pra não cortar a letra.
function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
              >
                <span className="split-word inline-block will-change-transform">
                  {word}
                  {wi < words.length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = String(servicesCards.length).padStart(2, "0");

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP: só a tela inicial faz o fade quando o primeiro card sobe.
      // Os cards empilham via CSS puro (sticky).
      mm.add("(min-width: 1024px)", () => {
        const wrappers = gsap.utils.toArray<HTMLElement>(".service-wrapper");

        gsap.to(".intro-screen", {
          scrollTrigger: {
            trigger: wrappers[0],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          opacity: 0,
          y: -50,
          ease: "none",
        });
      });

      // Reveal das palavras do título — roda em qualquer largura de tela,
      // sem animar a posição do card (ele fica parado, só o texto aparece).
      const wrappers = gsap.utils.toArray<HTMLElement>(".service-wrapper");
      wrappers.forEach((wrapper) => {
        const words = wrapper.querySelectorAll(".split-word");
        if (!words.length) return;

        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background">
      {/* TELA DE ABERTURA */}
      <section className="intro-screen relative w-full min-h-[70vh] lg:min-h-[80vh] bg-background text-foreground flex flex-col justify-between px-6 md:px-12 pt-12 md:pt-16 pb-12 will-change-transform">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
            O que eu ofereço
          </span>
          <span className="font-mono text-xs md:text-sm text-muted-foreground">
            {total} serviços
          </span>
        </div>

        <div className="my-auto py-12">
          <h2 className="font-display font-medium text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tighter">
            Meus
            <br />
            Serviços
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
            Do primeiro esboço à entrega final — cada projeto combina design,
            código e performance sob medida para o seu negócio.
          </p>

          <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs uppercase tracking-widest">
            <ArrowDownIcon />
            <span>Role para explorar</span>
          </div>
        </div>
      </section>

      {/* CARDS COLAPSÁVEIS (MEIA TELA) */}
      <div className="pb-[20vh]">
        {servicesCards.map((service, index) => (
          <div
            key={service.id}
            className="service-wrapper relative lg:sticky w-full min-h-[50vh] lg:h-[52vh] my-2 lg:my-0 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            style={{
              top: `${index * 56}px`,
              zIndex: index + 1,
            }}
          >
            <section
              className={`service-inner w-full h-full p-6 md:p-10 lg:p-12 flex flex-col justify-between overflow-hidden transition-colors duration-300 will-change-transform ${service.bgClass} ${service.textClass}`}
            >
              {/* TOPO: só a tag, sem número e sem linha */}
              <div className="flex justify-between items-center pb-4">
                <span className="font-mono text-xs uppercase tracking-widest opacity-80">
                  {service.label}
                </span>
              </div>

              {/* MEIO: Título e Descrição Lado a Lado (Estilo Editorial) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 my-auto py-4 items-center">
                <div className="col-span-1 lg:col-span-7">
                  <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tighter">
                    <SplitWords text={service.title} />
                  </h2>
                </div>

                <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
                  <p className="text-sm md:text-base leading-relaxed opacity-90">
                    {service.text1}
                  </p>
                  <p className="text-xs md:text-sm leading-relaxed opacity-75 hidden sm:block">
                    {service.text2}
                  </p>
                </div>
              </div>

              {/* BASE: Ação / Call to Action */}
              <div className="flex justify-between items-end pt-4">
                <button className="group inline-flex items-center gap-2 text-sm md:text-base font-semibold tracking-tight hover:opacity-75 transition-opacity">
                  <span>{service.actionText}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
