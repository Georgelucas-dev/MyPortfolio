import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import HeroContentMinimal from "./HeroContentMinimal";
import FilmGrain from "./FilmGrain";
import ImageRevealContainer from "./ImageRevealContainer";
import HeroImg from "./heroImg.jpg";

const HERO_IMAGE = HeroImg;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Ref para armazenar todos os nossos "pixels" da grade
  const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { heroVisivel } = useHero();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Configuração da densidade dos pixels (quanto maior, menores os blocos)
  const cols = 20;
  const rows = 12;
  const totalPixels = cols * rows;

  useEffect(() => {
    if (!heroVisivel) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Efeito de Revelação em Pixels na Imagem
      // Faz os quadrados desaparecerem aleatoriamente para revelar a imagem
      tl.to(
        pixelsRef.current,
        {
          opacity: 0,
          scale: 0.5, // Encolhe os pixels enquanto somem para um efeito mais digital
          duration: 0.6,
          ease: "power2.inOut",
          stagger: {
            amount: 1.2, // Tempo total que a animação dos pixels vai durar
            from: "random", // A mágica acontece aqui: somem em ordem aleatória
          },
        },
        0, // Inicia no tempo zero
      );

      // 2. George (Conteúdo) subindo para a posição dele
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 120 }, // Começa bem mais abaixo (120px)
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out", // Desaceleração suave no final
        },
        0.5, // Começa a subir um pouquinho depois que os pixels começam a sumir
      );
    }, heroRef);

    return () => ctx.revert();
  }, [heroVisivel]);

  return (
    <section
      ref={heroRef}
      id="home"
      data-theme="dark"
      className="relative sticky top-0 w-full h-dvh overflow-hidden bg-background select-none z-0"
    >
      <FilmGrain />

      <div className="absolute inset-0 pt-20 px-4 md:px-12">
        <div className="flex flex-col h-full gap-4">
          {/* CONTAINER DA IMAGEM + MÁSCARA DE PIXELS */}
          <div className="flex-1 min-h-0 relative rounded-3xl overflow-hidden">
            <ImageRevealContainer
              imageSrc={HERO_IMAGE}
              enableReveal={!isMobile}
            />

            {/* Grid Overlay (Efeito de Pixels) */}
            <div
              className="absolute inset-0 pointer-events-none grid z-10"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
              }}
            >
              {Array.from({ length: totalPixels }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    pixelsRef.current[i] = el;
                  }}
                  className="bg-background w-full h-full will-change-transform"
                />
              ))}
            </div>
          </div>

          {/* ÁREA DO GEORGE (Conteúdo) */}
          {/* O overflow-hidden aqui cria a "linha de chão" de onde ele emerge */}
          <div className="shrink-0 overflow-hidden pb-4">
            <div ref={contentRef} className="will-change-transform">
              <HeroContentMinimal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
