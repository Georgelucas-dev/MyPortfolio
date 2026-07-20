// components/Loader.tsx
import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const barRowRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  // Refs para injetar texto direto no DOM (evita re-renders do React)
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const asciiBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let isImageLoaded = false;
    const counter = { val: 0 };

    const ctx = gsap.context((self) => {
      // Cursor pisca desde o início
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // 1. BOOT SEQUENCE
      const introTl = gsap.timeline();

      introTl.fromTo(
        ".loader-header",
        { opacity: 0, y: -12 },
        { opacity: 0.6, y: 0, duration: 0.6, ease: "power3.out" },
      );

      // Usando array nativo do utilitário GSAP ao invés de Refs complexas
      const bootLines = self.selector?.(".boot-line");
      
      bootLines?.forEach((line: HTMLElement, i: number) => {
        const textLength = line.textContent?.length || 20;
        introTl.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: Math.max(textLength * 0.028, 0.3),
            ease: `steps(${textLength})`,
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
        // Stagger cascata para as letras do nome
        .fromTo(
          ".name-char",
          { y: "110%", opacity: 0 },
          { 
            y: "0%", 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.04, 
            ease: "back.out(1.2)" 
          },
          ">-0.1",
        )
        .fromTo(
          ".loader-footer-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "<0.1",
        );

      // 2. PROGRESS COUNTER (Injeção direta no DOM)
      const progressTween = gsap.to(counter, {
        val: 99,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentProg = Math.floor(counter.val);
          const filled = Math.round((currentProg / 100) * BAR_LENGTH);
          const barString = "█".repeat(filled) + "░".repeat(BAR_LENGTH - filled);
          
          if (progressTextRef.current) progressTextRef.current.innerText = `${currentProg}%`;
          if (asciiBarRef.current) asciiBarRef.current.innerText = barString;
        },
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

      // 4. EXIT SEQUENCE (Efeito CRT)
      function triggerExitSequence() {
        gsap.killTweensOf(cursorRef.current);

        const exitTl = gsap.timeline({ onComplete });

        exitTl
          .to(counter, {
            val: 100,
            duration: 0.3,
            ease: "power3.out",
            onUpdate: () => {
              if (progressTextRef.current) progressTextRef.current.innerText = "100%";
              if (asciiBarRef.current) asciiBarRef.current.innerText = "█".repeat(BAR_LENGTH);
            },
          })
          .to(cursorRef.current, { opacity: 0, duration: 0.15 }, "<")
          .to(
            [".loader-header", barRowRef.current, ".loader-footer-meta", bootLines],
            { opacity: 0, y: -8, duration: 0.25, stagger: 0.02, ease: "power2.in" },
            "<",
          )
          .to(".name-char", { opacity: 0, duration: 0.2, stagger: -0.02 }, "<") // Some ao contrário
          
          // Flash CRT intenso antes de desligar
          .to(containerRef.current, {
             backgroundColor: "#ffffff",
             duration: 0.08,
             ease: "none"
          }, "+=0.1")
          
          // Achata na vertical (fechando o tubo)
          .to(
            containerRef.current,
            {
              scaleY: 0.005,
              duration: 0.35,
              ease: "expo.in",
              transformOrigin: "50% 50%",
            },
            "<", // Inicia logo após o flash
          )
          
          // Colapsa na horizontal e some como uma TV velha
          .to(containerRef.current, {
            scaleX: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power4.in",
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{ willChange: "transform, background-color" }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-foreground text-background px-6 md:px-12 py-8 overflow-hidden pointer-events-none font-mono"
    >
      {/* Scanlines sutis */}
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
        {BOOT_LINES.map((line) => (
          <p
            key={line}
            style={{ clipPath: "inset(0 100% 0 0)" }}
            className="boot-line whitespace-nowrap text-sm md:text-base will-change-[clip-path]"
          >
            <span className="text-background">$</span>{" "}
            <span className="text-background/70">{line}</span>
          </p>
        ))}

        <p ref={barRowRef} className="text-sm md:text-base">
          <span className="text-background">$</span>{" "}
          {/* Refs vazias para injeção de alta performance */}
          <span ref={asciiBarRef} className="tabular-nums"></span>{" "}
          <span ref={progressTextRef} className="text-background/50"></span>
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="overflow-hidden">
          <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter text-[11vw] md:text-[6vw] transform-gpu overflow-hidden flex">
            {/* Split do nome para o efeito Stagger cascata */}
            {"George Lucas".split("").map((char, i) => (
              <span key={i} className="name-char inline-block will-change-transform">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
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