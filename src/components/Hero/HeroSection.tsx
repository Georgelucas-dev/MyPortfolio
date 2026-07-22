import { useEffect, useRef, useMemo } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import HeroContentMinimal from "./HeroContentMinimal";
import FilmGrain from "./FilmGrain";
import ImageRevealContainer from "./ImageRevealContainer";
import HeroImg from "./heroImg.jpg";

const HERO_IMAGE = HeroImg;

const COLS = 20;
const ROWS = 12;
const TOTAL_PIXELS = COLS * ROWS;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { heroVisivel } = useHero();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Gera o grid apenas uma vez, de forma estável
  const pixelGrid = useMemo(
    () =>
      Array.from({ length: TOTAL_PIXELS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            pixelsRef.current[i] = el;
          }}
          className="bg-background w-full h-full will-change-transform"
        />
      )),
    [],
  );

  useEffect(() => {
    if (!heroVisivel) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(
        pixelsRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: { amount: 1.2, from: "random" },
        },
        0,
      );
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 120 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" },
        0.5,
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
          <div className="flex-1 min-h-0 relative rounded-3xl overflow-hidden">
            <ImageRevealContainer
              imageSrc={HERO_IMAGE}
              enableReveal={!isMobile}
            />
            <div
              className="absolute inset-0 pointer-events-none grid z-10"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              }}
            >
              {pixelGrid}
            </div>
          </div>
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
