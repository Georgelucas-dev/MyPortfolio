import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";
import HeroNav from "@/components/Navbar/HeroNavbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const centerTextRef = useRef<HTMLSpanElement | null>(null);
  const { setHeroVisivel } = useHero();

  useEffect(() => {
    // ... seu código de observer
  }, [setHeroVisivel]);

  useEffect(() => {
    // ... suas animações do Hero
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      // ADICIONADO: sticky top-0 e z-0
      className="relative sticky top-0 w-full h-svh bg-background flex flex-col justify-between overflow-hidden select-none z-0"
    >
      <HeroNav />

      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <span
          ref={centerTextRef}
          className="font-display text-sm sm:text-base md:text-xl uppercase tracking-[0.35em] text-foreground/80 font-light will-change-transform"
        >
          DESIGN & CÓDIGO
        </span>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex justify-center overflow-hidden z-0 pointer-events-none pb-1 md:pb-2">
        <h1
          ref={nameRef}
          className="font-display font-black text-[17vw] sm:text-[18vw] leading-[0.72] tracking-[-0.09em] text-[var(--color-sage)] uppercase whitespace-nowrap will-change-transform"
        >
          George
        </h1>
      </div>
    </section>
  );
}
