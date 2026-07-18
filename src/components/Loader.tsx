// components/Loader.tsx
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { preloadPillarImages } from "../utils/preload-images";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isImageLoaded = false;
    const counter = { val: 0 };

    // Instancia o contexto do GSAP para controle total de memória
    const ctx = gsap.context(() => {
      // 1. TIMELINE DE ENTRADA (Animação dos Textos)
      const introTl = gsap.timeline();

      introTl
        .fromTo(
          ".loader-header",
          { opacity: 0, y: -10 },
          { opacity: 0.6, y: 0, duration: 0.6, ease: "power2.out" },
        )
        .fromTo(
          ".loader-title-1",
          { y: "100%", skewY: 4 },
          { y: 0, skewY: 0, duration: 1.2, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          ".loader-title-2",
          { y: "100%", skewY: 6 },
          { y: 0, skewY: 0, duration: 1.2, ease: "power4.out" },
          "-=1",
        );

      // 2. TWEEN DO CONTADOR (Flui suave até 99%)
      const progressTween = gsap.to(counter, {
        val: 99,
        duration: 2.5, // Garante um tempo mínimo elegante de tela ligada
        ease: "power1.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counter.val));
        },
        onComplete: () => {
          // Se as imagens já tiverem carregado enquanto o contador subia, finaliza!
          if (isImageLoaded) {
            triggerExitSequence();
          }
        },
      });

      // 3. GATILHO DO PRELOADER REAL
      preloadPillarImages().then(() => {
        isImageLoaded = true;
        // Se o contador travou em 99% esperando a imagem, destrava agora
        if (!progressTween.isActive() && counter.val >= 99) {
          triggerExitSequence();
        }
      });

      // 4. TIMELINE DE SAÍDA (O Gran Finale)
      function triggerExitSequence() {
        const exitTl = gsap.timeline({
          onComplete: () => {
            // Avisa o React para desmontar o Loader permanentemente
            onComplete();
          },
        });

        exitTl
          // Dá o "snap" final no contador para 100% de forma rápida
          .to(counter, {
            val: 100,
            duration: 0.3,
            ease: "power4.out",
            onUpdate: () => setProgress(Math.floor(counter.val)),
          })
          // Os textos internos sobem elegantemente com velocidades diferentes (Paralaxe)
          .to(
            ".loader-title-1",
            { y: "-120%", scaleY: 0.8, duration: 0.8, ease: "power4.in" },
            "+=0.2",
          )
          .to(
            ".loader-title-2",
            { y: "-140%", scaleY: 0.7, duration: 0.8, ease: "power4.in" },
            "-=0.75",
          )
          .to(
            ".loader-header, .loader-footer",
            { opacity: 0, duration: 0.3 },
            "-=0.6",
          )

          // A Cortina se recolhe para cima usando clip-path de alta performance
          .to(
            containerRef.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            "-=0.5",
          );
      }
    }, containerRef);

    return () => ctx.revert(); // Evita vazamento de memória se o componente sumir
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        clipPath: "inset(0% 0% 0% 0%)",
        willChange: "clip-path",
      }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-foreground text-background px-6 md:px-12 py-8 overflow-hidden pointer-events-none"
    >
      {/* Header do Loader */}
      <div className="loader-header flex justify-between items-center font-mono text-xs uppercase tracking-widest opacity-0">
        <span>Portfólio</span>
        <span>© 2026</span>
      </div>

      {/* Centro: Nome com efeito Mask Reveal puro */}
      <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 md:gap-0 select-none">
        <div className="overflow-hidden py-2">
          <h1 className="loader-title-1 font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase transform-gpu">
            George
          </h1>
        </div>

        <div className="overflow-hidden py-2">
          <h1 className="loader-title-2 font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase ml-[15vw] md:ml-[10vw] text-background/80 transform-gpu">
            Lucas
          </h1>
        </div>
      </div>

      {/* Footer do Loader: Contador */}
      <div className="loader-footer flex justify-end items-end">
        <div className="font-display font-light text-6xl md:text-8xl tabular-nums tracking-tighter">
          {progress}
          <span className="text-3xl md:text-5xl opacity-50">%</span>
        </div>
      </div>
    </div>
  );
}
