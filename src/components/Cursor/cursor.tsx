import { useEffect, useRef, useState } from "react";
import "./cursor.css";

type CursorState = "default" | "link" | "text" | "hidden";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const scale = useRef(1); // escala atual do anel (lerp)
  const pressedRef = useRef(false);
  const hasMoved = useRef(false);

  const raf = useRef<number | null>(null);

  const [state, setState] = useState<CursorState>("hidden"); // some até o 1º movimento
  const [enabled, setEnabled] = useState(true);
  const [pressed, setPressed] = useState(false);

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

      // Primeiro movimento: teletransporta o cursor pra posição real
      // em vez de deixar ele "voar" do canto (0,0) até o mouse.
      if (!hasMoved.current) {
        hasMoved.current = true;
        dotPos.current.x = ringPos.current.x = e.clientX;
        dotPos.current.y = ringPos.current.y = e.clientY;
        setState((s) => (s === "hidden" ? "default" : s));
      }
    };

    const onDown = () => {
      pressedRef.current = true;
      setPressed(true);
    };
    const onUp = () => {
      pressedRef.current = false;
      setPressed(false);
    };

    const onLeave = () => setState("hidden");
    const onEnter = () => {
      if (hasMoved.current) setState("default");
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t?.closest) return;

      if (t.closest('[data-cursor="hidden"]')) {
        setState("hidden");
        return;
      }

      const isLink = t.closest(
        'a, button, [role="button"], input, [data-cursor="link"]',
      );
      if (isLink) {
        setState("link");
        return;
      }

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

    const tick = () => {
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.8;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.8;

      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      // Escala do anel também "lerpada" — dá o feedback suave no clique
      const targetScale = pressedRef.current ? 0.85 : 1;
      scale.current += (targetScale - scale.current) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale.current})`;
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
