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
  isHovering,
  targetPos,
  currentPos,
}: RevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const border = borderRef.current;
    const maskGroup = maskGroupRef.current;
    if (!reveal || !border || !maskGroup) return;

    gsap.set([maskGroup, border], { transformOrigin: "center center" });

    const lerpFactor = 0.12;

    const update = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      gsap.set([maskGroup, border], {
        x: currentPos.current.x,
        y: currentPos.current.y,
      });
    };

    gsap.ticker.add(update);

    if (isHovering) {
      gsap.to(reveal, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to([maskGroup, border], {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(border, { opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(reveal, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to([maskGroup, border], {
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(border, { opacity: 0, duration: 0.3, ease: "power2.in" });
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
            <g ref={maskGroupRef}>
              <rect
                x={-WINDOW_WIDTH / 2}
                y={-WINDOW_HEIGHT / 2}
                width={WINDOW_WIDTH}
                height={WINDOW_HEIGHT}
                fill="white"
              />
            </g>
          </mask>
        </defs>
      </svg>

      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          mask: "url(#reveal-mask)",
          WebkitMask: "url(#reveal-mask)",
          opacity: 0,
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* BORDA DE VIDRO AQUI */}
      <div
        ref={borderRef}
        className="absolute border-[3px] border-white/40 mix-blend-overlay will-change-transform pointer-events-none"
        style={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          top: 0,
          left: 0,
          marginTop: -WINDOW_HEIGHT / 2,
          marginLeft: -WINDOW_WIDTH / 2,
          opacity: 0,
          transform: "scale(0.8)",
          // Removidas as propriedades de boxShadow e shadow do tailwind!
        }}
      />
    </>
  );
}
