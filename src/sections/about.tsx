// src/sections/AboutMe.tsx
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "../data/about-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ==========================================
      // 1. ANIMAÇÃO DE ENTRADA (Blur e Imagem)
      // ==========================================
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      entranceTl.fromTo(
        containerRef.current,
        { filter: "blur(20px)", opacity: 0 },
        { filter: "blur(0px)", opacity: 1, duration: 1 },
        0,
      );

      entranceTl.fromTo(
        imageWrapperRef.current,
        { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
        { clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)", duration: 1 },
        0,
      );

      entranceTl.fromTo(
        imagesRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 1 },
        0,
      );

      // ==========================================
      // 2. PARALLAX CONTÍNUO (Texto)
      // ==========================================
      const parallaxTexts = gsap.utils.toArray(".gsap-parallax-text");

      gsap.fromTo(
        parallaxTexts,
        { y: -40 }, // Começa 40px acima da posição original
        {
          y: 40, // Termina 40px abaixo (movimento oposto ao scroll)
          stagger: 0.05, // Um leve atraso entre cada palavra/frase
          ease: "none", // Mantém a velocidade constante em relação ao scroll
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Inicia assim que a seção aponta na tela
            end: "bottom top", // Termina quando a seção sai da tela
            scrub: 1, // Suaviza o movimento acompanhando o scroll
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[100svh] w-full bg-background text-ink flex items-center overflow-hidden py-24 md:py-32"
    >
      <div className="w-full pl-6 md:pl-16 lg:pl-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* COLUNA ESQUERDA - TEXTO */}
        <div className="w-full md:w-7/12 flex flex-col justify-center pr-6 md:pr-0">
          <p className="gsap-parallax-text inline-block text-xs font-mono uppercase tracking-[0.2em] text-ink-soft mb-8 md:mb-10 will-change-transform">
            {aboutData.eyebrow}
          </p>

          <h2 className="font-display text-xl md:text-3xl lg:text-4xl leading-[1.25] tracking-tight max-w-4xl">
            {aboutData.segments.map((segment, i) =>
              segment.type === "highlight" ? (
                <span
                  key={i}
                  onMouseEnter={() => setActiveId(segment.imageId)}
                  onMouseLeave={() => setActiveId(null)}
                  className="gsap-parallax-text inline-block italic font-serif text-ink-soft hover:text-ink transition-colors duration-300 cursor-pointer relative z-10 mx-1 will-change-transform"
                >
                  {segment.content}
                </span>
              ) : (
                <span
                  key={i}
                  className="gsap-parallax-text inline-block will-change-transform"
                >
                  {segment.content}
                </span>
              ),
            )}
          </h2>

          <div className="gsap-parallax-text mt-10 md:mt-12 pl-0 md:pl-[20%] flex flex-col gap-4 will-change-transform">
            <p className="text-xs md:text-sm text-ink-soft max-w-sm leading-relaxed font-sans">
              Meu nome é Seu Nome. Um criador apaixonado por resolver problemas
              complexos através de interfaces intuitivas, sempre buscando a
              simbiose perfeita entre arte visual e tecnologia da informação.
            </p>
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest mt-4 opacity-70">
              Info
            </p>
          </div>
        </div>

        {/* COLUNA DIREITA - IMAGENS */}
        <div className="w-full md:w-5/12 h-[55vh] md:h-[82vh] flex justify-end">
          <div
            ref={imageWrapperRef}
            className="relative w-full h-full rounded-l-3xl md:rounded-l-[5rem] overflow-hidden bg-card"
          >
            <div ref={imagesRef} className="w-full h-full">
              <img
                src={aboutData.defaultImage}
                alt="Retrato"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out will-change-[opacity,filter]"
                style={{
                  opacity: activeId ? 0 : 1,
                  filter: activeId ? "blur(14px)" : "blur(0px)",
                }}
              />

              {aboutData.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={`Representação de ${img.id}`}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out will-change-[opacity,filter]"
                  style={{
                    opacity: activeId === img.id ? 1 : 0,
                    filter: activeId === img.id ? "blur(0px)" : "blur(14px)",
                  }}
                />
              ))}

              <div className="absolute inset-0 bg-background/10 mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
