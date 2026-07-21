import { useRef, useEffect, RefObject } from "react";
import gsap from "gsap";

interface RevealLayerProps {
  imageSrc: string;
  containerRef: RefObject<HTMLDivElement>;
  isHovering: boolean;
  targetPos: RefObject<{ x: number; y: number }>;
  currentPos: RefObject<{ x: number; y: number }>;
}

const WINDOW_WIDTH = 300;
const WINDOW_HEIGHT = 180;

export default function RevealLayer({
  imageSrc,
  containerRef,
  isHovering,
  targetPos,
  currentPos,
}: RevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const windowRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const border = borderRef.current;
    const rect = windowRectRef.current;
    if (!reveal || !border || !rect) return;

    const lerpFactor = 0.12;

    const update = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      const left = currentPos.current.x - WINDOW_WIDTH / 2;
      const top = currentPos.current.y - WINDOW_HEIGHT / 2;

      rect.setAttribute("x", String(left));
      rect.setAttribute("y", String(top));
      border.style.transform = `translate(${left}px, ${top}px)`;
    };

    gsap.ticker.add(update);

    // Controle de visibilidade baseado no hover
    if (isHovering) {
      gsap.to([reveal, border], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to([reveal, border], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, [isHovering, targetPos, currentPos]);

  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="reveal-mask">
            <rect width="100%" height="100%" fill="black" />
            <rect
              ref={windowRectRef}
              x={-WINDOW_WIDTH / 2}
              y={-WINDOW_HEIGHT / 2}
              width={WINDOW_WIDTH}
              height={WINDOW_HEIGHT}
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div
        ref={revealRef}
        className="absolute inset-0"
        style={{
          mask: "url(#reveal-mask)",
          WebkitMask: "url(#reveal-mask)",
          opacity: 0,
          transform: "scale(0.8)",
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div
        ref={borderRef}
        className="absolute border border-foreground/30 shadow-2xl will-change-transform pointer-events-none"
        style={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          top: 0,
          left: 0,
          opacity: 0,
          transform: "scale(0.8)",
          boxShadow:
            "inset 0 0 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      />
    </>
  );
}
