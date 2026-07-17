import { useEffect, useRef, useState } from "react";
import "./cursor.css";

type CursorState = "default" | "link" | "text" | "hidden";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Posição real do mouse
  const mouse = useRef({ x: 0, y: 0 });

  // Posições animadas
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);

  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(true);
  const [pressed, setPressed] = useState(false);

  // Detecta se é touch para desativar
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) setEnabled(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    // Esconde ao sair da janela do navegador
    const onLeave = () => setState("hidden");
    const onEnter = () => setState("default");

    // Lógica para achar interações
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;

      // 1. Esconder forçado
      if (t.closest('[data-cursor="hidden"]')) {
        setState("hidden");
        return;
      }

      // 2. Elementos Interativos Naturais e explícitos
      const isLink = t.closest(
        'a, button, [role="button"], input, [data-cursor="link"]',
      );
      if (isLink) {
        setState("link");
        return;
      }

      // 3. Textos Exclusivos (Você precisa adicionar data-cursor="text" no HTML agora)
      const isText = t.closest('[data-cursor="text"]');
      if (isText) {
        setState("text");
        return;
      }

      setState("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Loop de Animação (Lerp)
    const tick = () => {
      // Bolinha (rápida, lerp alto ou 1.0 para colar no mouse)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.8;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.8;

      // Anel Seguidor (mais lento, cria o rastro)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`aw-cursor-ring aw-state-${state} ${pressed ? "aw-pressed" : ""}`}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`aw-cursor-dot aw-state-${state}`}
        aria-hidden
      />
    </>
  );
}
