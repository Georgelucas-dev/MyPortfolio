import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScatterTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const text =
    "Desenvolvo interfaces modernas, rápidas e intuitivas. Transformo ideias em produtos digitais com foco em performance, experiência do usuário e atenção aos detalhes.";
  const words = text.split(" ");

  useLayoutEffect(() => {
    if (!containerRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      // Setup inicial
      gsap.set(wordsRef.current, { x: "100vw", opacity: 0 });
      gsap.set(maskRef.current, { clipPath: "circle(0px at 50% 50%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8, // scrub mais responsivo
        },
      });

      // Dead zone reduzida
      tl.to({}, { duration: 0.3 });

      // Máscara expande
      tl.to(maskRef.current, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.5,
        ease: "power2.inOut",
      });

      // PASSO 2.5: DESLIGA O HERO
      // Seleciona o Hero pela ID e faz ele sumir do DOM (autoAlpha)
      // O "-=0.2" faz isso acontecer sutilmente antes do portal terminar de abrir
      tl.to("#home", { opacity: 0, duration: 0.1 }, "-=0.15");

      // Palavras entram
      tl.to(
        wordsRef.current,
        {
          x: "0vw",
          opacity: 1,
          stagger: 0.12,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.05",
      ); // Inicia levemente antes do Hero sumir 100%
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      ata-theme="light"
      className="relative -mt-svh h-[400svh] w-full z-10 pointer-events-none"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden pointer-events-none">
        <div
          ref={maskRef}
          className="w-full h-full bg-foreground text-background flex items-center px-6 md:px-20 pointer-events-auto will-change-[clip-path]"
          style={{ clipPath: "circle(0px at 50% 50%)" }}
        >
          <div className="relative z-10 w-full flex flex-wrap justify-start text-left">
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block mr-3 md:mr-4 lg:mr-5 mb-2 md:mb-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[4vw] leading-[1.1] font-medium tracking-tight will-change-transform"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
