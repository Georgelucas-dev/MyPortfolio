// components/Loader.tsx
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { preloadPillarImages } from "../utils/preload-images";

interface LoaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "connecting to george.dev",
  "fetching project assets",
  "rendering interface",
];

const BAR_LENGTH = 24;

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const barRowRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let isImageLoaded = false;
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      // Cursor pisca desde o início, independente do resto — igual um prompt de shell
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // 1. BOOT SEQUENCE — linhas de terminal digitando uma por uma
      const introTl = gsap.timeline();

      introTl.fromTo(
        ".loader-header",
        { opacity: 0, y: -12 },
        { opacity: 0.6, y: 0, duration: 0.6, ease: "power3.out" },
      );

      BOOT_LINES.forEach((line, i) => {
        introTl.fromTo(
          lineRefs.current[i],
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: Math.max(line.length * 0.028, 0.3),
            ease: `steps(${line.length})`,
          },
          i === 0 ? "-=0.1" : ">+0.15",
        );
      });

      introTl
        .fromTo(
          barRowRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          ">+0.1",
        )
        .fromTo(
          nameRef.current,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1, ease: "power4.out" },
          ">-0.1",
        )
        .fromTo(
          ".loader-footer-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "<0.1",
        );

      // 2. PROGRESS COUNTER (mesma lógica de antes — dirige o ASCII bar via state)
      const progressTween = gsap.to(counter, {
        val: 99,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(counter.val)),
        onComplete: () => {
          if (isImageLoaded) triggerExitSequence();
        },
      });

      // 3. PRELOAD TRIGGER
      preloadPillarImages().then(() => {
        isImageLoaded = true;
        if (!progressTween.isActive() && counter.val >= 99) {
          triggerExitSequence();
        }
      });

      // 4. EXIT — "desliga" a tela como um CRT antigo
      function triggerExitSequence() {
        gsap.killTweensOf(cursorRef.current);

        const exitTl = gsap.timeline({ onComplete });

        exitTl
          .to(counter, {
            val: 100,
            duration: 0.3,
            ease: "power3.out",
            onUpdate: () => setProgress(Math.floor(counter.val)),
          })
          .to(cursorRef.current, { opacity: 0, duration: 0.15 }, "<")
          .to(
            [".loader-header", barRowRef.current, ".loader-footer-meta"],
            { opacity: 0, y: -8, duration: 0.25, ease: "power2.in" },
            "<",
          )
          .to(
            lineRefs.current,
            { opacity: 0, duration: 0.2, stagger: 0.03 },
            "<",
          )
          .to(nameRef.current, { opacity: 0, duration: 0.2 }, "<")
          // achata na vertical até virar uma linha
          .to(
            containerRef.current,
            {
              scaleY: 0.006,
              duration: 0.4,
              ease: "power4.in",
              transformOrigin: "50% 50%",
            },
            "+=0.05",
          )
          // depois colapsa na horizontal e some
          .to(containerRef.current, {
            scaleX: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const filled = Math.round((progress / 100) * BAR_LENGTH);
  const bar = "█".repeat(filled) + "░".repeat(BAR_LENGTH - filled);

  return (
    <div
      ref={containerRef}
      style={{ willChange: "transform" }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-foreground text-background px-6 md:px-12 py-8 overflow-hidden pointer-events-none font-mono"
    >
      {/* Scanlines sutis — textura, não protagonismo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Header */}
      <div className="loader-header flex justify-between items-center text-xs uppercase tracking-widest opacity-0 relative z-10">
        <span>george.dev</span>
        <span>boot sequence</span>
      </div>

      {/* Terminal body */}
      <div className="flex flex-col gap-2 max-w-xl relative z-10">
        {BOOT_LINES.map((line, i) => (
          <p
            key={line}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            style={{ clipPath: "inset(0 100% 0 0)" }}
            className="whitespace-nowrap text-sm md:text-base"
          >
            <span className="text-background">$</span>{" "}
            <span className="text-background/70">{line}</span>
          </p>
        ))}

        <p ref={barRowRef} className="text-sm md:text-base">
          <span className="text-background">$</span>{" "}
          <span className="tabular-nums">{bar}</span>{" "}
          <span className="text-background/50">{progress}%</span>
        </p>
      </div>

      {/* Footer: nome + cursor piscando */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="overflow-hidden">
          <h1
            ref={nameRef}
            className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter text-[11vw] md:text-[6vw] transform-gpu"
          >
            George Lucas
          </h1>
          <p className="loader-footer-meta mt-2 text-xs uppercase tracking-widest opacity-0 text-background/50">
            Front-end Developer
          </p>
        </div>

        <div className="loader-footer-meta opacity-0 flex items-baseline gap-1 text-sm md:text-base">
          <span className="text-background/50">ready in</span>
          <span
            ref={cursorRef}
            className="inline-block h-[1em] w-[0.5ch] bg-background align-[-0.15em] ml-1"
          />
        </div>
      </div>
    </div>
  );
}
