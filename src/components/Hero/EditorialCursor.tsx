import { useRef, useEffect } from "react";
import gsap from "gsap";

interface EditorialCursorProps {
  image: string;
}

export default function EditorialCursor({ image }: EditorialCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Animação de entrada
    gsap.fromTo(
      cursor,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", delay: 1 },
    );

    // Interpolação suave da posição
    const lerpX = gsap.quickTo(cursor, "left", {
      duration: 0.6,
      ease: "power3.out",
    });
    const lerpY = gsap.quickTo(cursor, "top", {
      duration: 0.6,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    let rafId: number;
    const update = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      pos.current.x = mx - 140; // metade da largura
      pos.current.y = my - 90; // metade da altura

      lerpX(pos.current.x);
      lerpY(pos.current.y);

      // Atualiza a posição do background para revelar a parte correta
      if (cursor) {
        cursor.style.backgroundPosition = `${-pos.current.x}px ${-pos.current.y}px`;
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        editorial-cursor fixed z-10 
        w-[280px] h-[180px] 
        border border-white/30 
        pointer-events-none
        overflow-hidden
      "
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "0 0", // será sobrescrito inline pelo JS
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4)",
        opacity: 0, // inicial para animação
        scale: 0.8,
        left: 0,
        top: 0,
      }}
    />
  );
}
