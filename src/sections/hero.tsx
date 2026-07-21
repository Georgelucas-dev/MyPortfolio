import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const centerTextRef = useRef<HTMLSpanElement | null>(null);
  const { heroVisivel } = useHero(); // agora consumimos também o estado
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // (seu observer de visibilidade, se houver, pode ficar em outro useEffect)

  useEffect(() => {
    // Só inicia a animação quando o loader der o sinal verde
    if (!heroVisivel) return;

    // Garante os estados iniciais (caso alguma recarga atrase)
    gsap.set(nameRef.current, {
      opacity: 0,
      y: 35,
      scale: 1.12,
      transformOrigin: "center bottom",
    });
    gsap.set(centerTextRef.current, {
      opacity: 0,
      y: 20,
    });
    gsap.set(".hero-nav-item", {
      opacity: 0,
      y: -12,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    })
      .to(centerTextRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.65")
      .to(
        ".hero-nav-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.45",
      );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [heroVisivel]); // gatilho único

  return (
    <section
      ref={heroRef}
      id="home"
      data-theme="dark"
      className="relative sticky top-0 w-full h-svh bg-background flex flex-col justify-between overflow-hidden select-none z-0"
    >
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <span
          ref={centerTextRef}
          className="font-display text-sm sm:text-base md:text-xl uppercase tracking-[0.35em] text-foreground/80 font-light will-change-transform"
        >
          Clean & Smooth
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
