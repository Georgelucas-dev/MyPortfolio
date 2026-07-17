import { useEffect, useRef, useState } from "react";
import "./cursor.css";

/**
 * AwwwardsCursor
 * - Dot + Ring com lerp (movimento suave)
 * - mix-blend-mode: difference => "mask effect" sobre textos claros/escuros
 * - Hover em [data-cursor="link"], a, button => vira "pill" envolvendo o alvo
 * - Hover em [data-cursor="text"] ou headings => cresce + blend
 * - Some em dispositivos touch
 *
 * Uso: <AwwwardsCursor /> no root (App.tsx), UMA vez.
 * Marque elementos opcionalmente com:
 *   data-cursor="link"  | "text" | "hidden"
 */

type CursorState = "default" | "link" | "text" | "hidden";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(true);
  const [pressed, setPressed] = useState(false);

  // detecta touch
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) setEnabled(false);
  }, []);

  // movimento + interações
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setState("hidden");
    const onEnter = () => setState("default");

    const isLinkLike = (el: Element | null): HTMLElement | null => {
      if (!el) return null;
      const node = (el as HTMLElement).closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], [data-cursor="link"]',
      );
      return node as HTMLElement | null;
    };

    const isTextLike = (el: Element | null): HTMLElement | null => {
      if (!el) return null;
      const node = (el as HTMLElement).closest(
        'h1, h2, h3, h4, h5, h6, p, span',
      );
      return node as HTMLElement | null;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;

      if ((t as HTMLElement)?.closest?.('[data-cursor="hidden"]')) {
        setState("hidden");
        return;
      }

      if (isLinkLike(t)) {
        setState("link");
        return;
      }

      if (isTextLike(t)) {
        setState("text");
        return;
      }

      setState("default");
    };

    const onOut = (e: MouseEvent) => {
      const rel = e.relatedTarget as Element | null;
      if (!rel) return;
      setState("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.8 : 1})`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, pressed]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`aw-cursor aw-cursor-dot aw-state-${state}`}
        aria-hidden
      />
    </>
  );
}
