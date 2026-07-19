// sections/hero.tsx
import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const { setHeroVisivel } = useHero();

  useEffect(() => {
    const elemento = heroRef.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisivel(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [setHeroVisivel]);

  // GSAP Animations
  useEffect(() => {
    // Easing equivalente: [0.76, 0, 0.24, 1] = "power4.inOut"
    const ease = "power4.inOut";
    const duration = 1.4;

    // Nav animation
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration, ease, delay: 0.1 },
    );

    // Icon animation
    gsap.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, ease, delay: 0.4 },
    );

    // Text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, ease, delay: 0.5 },
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: "100%" },
      { y: 0, duration, ease, delay: 0.6 },
    );
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex flex-col w-full h-svh bg-background text-ink overflow-hidden"
    >
      {/* 1. HEADER (Top Nav) */}
      <nav
        ref={navRef}
        className="lg:flex hidden justify-between items-center w-full px-6 md:px-12 pt-8 shrink-0"
      >
        <div className="w-1/3">
          <a
            href="#home"
            className="font-display text-xl md:text-2xl font-bold tracking-tight uppercase"
          >
            George Lucas
          </a>
        </div>

        <div className="hidden md:flex w-1/3 justify-center gap-8 text-sm font-medium text-ink/70">
          <a href="#servicos" className="hover:text-ink transition-colors">
            Serviços
          </a>
          <a href="#sobre" className="hover:text-ink transition-colors">
            Por que trabalhar comigo?
          </a>
        </div>

        <div className="w-1/3 flex justify-end">
          <a
            href="#contato"
            className="px-5 py-2.5 bg-ink text-background hover:opacity-80 flex items-center gap-2 text-sm font-medium transition-opacity"
          >
            Contato <span className="text-xs">↗</span>
          </a>
        </div>
      </nav>

      {/* 2. CONTEÚDO CENTRAL */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-6 text-center z-10 -mt-12 md:-mt-20">
        <div ref={iconRef} className="mb-6 text-ink/40">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>

        <p
          ref={textRef}
          className="max-w-md text-sm md:text-base text-ink/70 font-light leading-relaxed"
        >
          Construindo arquiteturas robustas e interfaces de alta performance.
          <br />
          <br />
          Elevando a qualidade através de código limpo e design impecável.
        </p>
      </div>

      {/* 3. TIPOGRAFIA GIGANTE NO RODAPÉ — agora sempre grudada no fim do viewport */}
      <div className="flex-1 min-h-0 w-full flex justify-center items-end overflow-hidden">
        <h1
          ref={titleRef}
          className="font-display font-bold text-[18vw] leading-[0.75] tracking-tighter text-ink uppercase whitespace-nowrap select-none"
        >
          FRONT-END
        </h1>
      </div>
    </section>
  );
}
