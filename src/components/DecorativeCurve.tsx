// src/components/DecorativePath.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DecorativeCurveProps {
  className?: string;
  d: string;
  viewBox?: string;
  // Retiramos o strokeWidth numérico. Vamos usar o strokeClass para isso!
  strokeClass?: string;
  start?: string;
  end?: string;
}

export default function DecorativeCurve({
  className = "",
  d,
  viewBox = "0 0 1920 5000",
  strokeClass = "stroke-[40px] md:stroke-[120px] text-ink/10", // Valores default com Tailwind
  start = "20% bottom",
  end = "bottom top",
}: DecorativeCurveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: -length,
        ease: "none",
        scrollTrigger: {
          trigger: svgRef.current!.closest("section"),
          start,
          end,
          scrub: true,
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, [start, end]);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
      viewBox={viewBox}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke" /* A MÁGICA: Mantém o traço uniforme sem deformar */
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClass} /* O Tailwind injeta a espessura aqui */
        d={d}
      />
    </svg>
  );
}
