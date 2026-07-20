import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";
import HeroNav from "@/components/Navbar/HeroNavbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
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
    const ease = "power4.inOut";
    const duration = 1.4;

    gsap.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, ease, delay: 0.4 },
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, ease, delay: 0.5 },
    );

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
      <HeroNav />

      {/* CONTEÚDO CENTRAL — Agora com o mesmo padding idêntico ao do Nav */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-6 md:px-12 text-center z-10">
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

      {/* TÍTULO — Fixado de forma absoluta no fundo para consistência total */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-0">
        <h1
          ref={titleRef}
          className="font-display font-bold text-[18vw] leading-[0.75] tracking-tighter text-ink uppercase whitespace-nowrap select-none will-change-transform"
        >
          FRONT-END
        </h1>
      </div>
    </section>
  );
}
