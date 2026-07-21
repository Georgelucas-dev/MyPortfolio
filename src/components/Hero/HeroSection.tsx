import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import { gsap } from "gsap";
import HeroContent from "./HeroContent";
import FilmGrain from "./FilmGrain";
import ImageGray from "./ImageGray";
import RevealLayer from "./RevealLayer";

import HeroImg from "./heroImg.jpg"

const HERO_IMAGE = HeroImg;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const centerTextRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { heroVisivel } = useHero();

  useEffect(() => {
    if (!heroVisivel) return;

    const ctx = gsap.context(() => {
      gsap.set(nameRef.current, {
        opacity: 0,
        y: 35,
        scale: 1.12,
        transformOrigin: "center bottom",
      });
      gsap.set(centerTextRef.current, { opacity: 0, y: 20 });
      gsap.set(".hero-detail", { opacity: 0, y: -10 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".hero-footer-detail", { opacity: 0, x: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-detail",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
      )
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
        })
        .to(
          centerTextRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.65",
        )
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(
          ".hero-footer-detail",
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3",
        );

      return () => tl.kill();
    }, contentRef);

    return () => ctx.revert();
  }, [heroVisivel]);

  return (
    <section
      ref={heroRef}
      id="home"
      data-theme="dark"
      className="relative sticky top-0 w-full h-screen overflow-hidden bg-background cursor-none select-none z-0"
    >
      <ImageGray src={HERO_IMAGE} />
      <RevealLayer imageSrc={HERO_IMAGE} />
      <HeroContent
        ref={contentRef}
        nameRef={nameRef}
        centerTextRef={centerTextRef}
      />
      <FilmGrain />
      <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />
    </section>
  );
}
