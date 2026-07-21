// src/sections/AboutMe.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "../data/about-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ==========================================
      // 1. ANIMAÇÃO DE ENTRADA (Blur + Revelação)
      // ==========================================
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 25%",
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
        imageRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 1 },
        0,
      );

      // ==========================================
      // 2. EFEITO PARALLAX EXTREMO (Velocidades)
      // ==========================================
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // TEXTO: Aumentado de 80 para 200. Ele vai percorrer 400px no total, movendo-se MUITO rápido.
      parallaxTl.fromTo(
        textContainerRef.current,
        { y: 400 },
        { y: -400, ease: "none" },
        0,
      );

      // IMAGEM: Aumentado levemente de 20 para 30 para manter a diferença de velocidade brutal.
      parallaxTl.fromTo(
        imageWrapperRef.current,
        { y: 30 },
        { y: -30, ease: "none" },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      data-theme="dark"
      className="relative min-h-[100svh] w-full bg-background text-ink flex items-center overflow-hidden py-24 md:py-32"
    >
      <div className="w-full pl-6 md:pl-16 lg:pl-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* COLUNA ESQUERDA - TEXTO (Animação Muito Rápida) */}
        <div
          ref={textContainerRef}
          className="w-full md:w-7/12 flex flex-col justify-center pr-6 md:pr-0 will-change-transform"
        >
          <p className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-ink-soft mb-8 md:mb-10">
            {aboutData.eyebrow}
          </p>

          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight max-w-4xl">
            {aboutData.segments.map((segment, i) =>
              segment.type === "highlight" ? (
                <span
                  key={i}
                  className="inline-block italic font-serif text-ink-soft mx-1"
                >
                  {segment.content}
                </span>
              ) : (
                <span key={i}>{segment.content}</span>
              ),
            )}
          </h2>

          <div className="mt-12 md:mt-16 pl-0 md:pl-[15%] flex flex-col gap-4">
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

        {/* COLUNA DIREITA - IMAGEM (Animação Lenta) */}
        <div className="w-full md:w-5/12 h-[60vh] md:h-[80vh] flex justify-end">
          <div
            ref={imageWrapperRef}
            className="relative w-full h-full rounded-l-3xl md:rounded-l-[5rem] overflow-hidden bg-card will-change-transform"
          >
            <img
              ref={imageRef}
              src={aboutData.defaultImage}
              alt="Retrato"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Overlay sutil de contraste */}
            <div className="absolute inset-0 bg-background/10 mix-blend-overlay pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
