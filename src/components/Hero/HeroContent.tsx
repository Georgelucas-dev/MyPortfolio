import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HeroContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-line",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.4,
          ease: "expo.out",
          stagger: 0.15,
        },
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contentRef}
      className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 pointer-events-none"
    >
      <div className="flex flex-col items-start">
        <h1 className="text-[18vw] md:text-[13vw] font-display font-black uppercase leading-[0.82] tracking-[-0.04em] text-sage text-left overflow-hidden">
          <span className="hero-title-line block">George</span>
        </h1>
      </div>
    </div>
  );
}
