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
  const { heroVisivel } = useHero();
  const isMobile = useMediaQuery("(max-width: 1023px)"); // tablets e abaixo

  useEffect(() => {
    if (!heroVisivel) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.2 },
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
        <div ref={contentRef} className="flex flex-col h-full gap-4">
          <div className="flex-1 min-h-0">
            <ImageRevealContainer
              imageSrc={HERO_IMAGE}
              enableReveal={!isMobile}
            />
          </div>
          <div className="shrink-0">
            <HeroContentMinimal />
          </div>
        </div>
      </div>
    </section>
  );
}
