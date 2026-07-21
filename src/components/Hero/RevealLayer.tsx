import { useRef, useEffect } from "react";
import gsap from "gsap";

interface RevealLayerProps {
  imageSrc: string;
}

const WINDOW_WIDTH = 300;
const WINDOW_HEIGHT = 180;

export default function RevealLayer({ imageSrc }: RevealLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRectRef = useRef<SVGRectElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // Posições alvo (mouse) e interpoladas
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const rect = windowRectRef.current;
    const border = borderRef.current;
    if (!rect || !border) return;

    // Atualiza alvo com o mouse
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    // Lerp suave e aplicação simultânea
    const lerpFactor = 0.12; // ajuste para mais/menos inércia

    const update = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      current.current.x += dx * lerpFactor;
      current.current.y += dy * lerpFactor;

      const left = current.current.x - WINDOW_WIDTH / 2;
      const top = current.current.y - WINDOW_HEIGHT / 2;

      // Atualiza a máscara SVG
      rect.setAttribute("x", String(left));
      rect.setAttribute("y", String(top));

      // Atualiza a borda visual (mesmo deslocamento)
      border.style.transform = `translate(${left}px, ${top}px)`;
    };

    gsap.ticker.add(update);
    window.addEventListener("mousemove", onMouseMove);

    // Animação de surgimento da borda
    gsap.fromTo(
      border,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", delay: 1 },
    );

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {/* Máscara SVG (invisível) que controla a revelação */}
      <svg className="absolute inset-0 w-full h-full">
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

      {/* Camada colorida com a máscara aplicada */}
      <div
        className="absolute inset-0"
        style={{ mask: "url(#reveal-mask)", WebkitMask: "url(#reveal-mask)" }}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Borda visual – mesma posição da máscara, sincronizada via JS */}
      <div
        ref={borderRef}
        className="absolute border border-foreground/30 shadow-2xl will-change-transform"
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
    </div>
  );
}
