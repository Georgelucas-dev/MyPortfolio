// components/VibePickerInline.tsx
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import OptionWheel from "./OptionWheel";
import { VIBES, VIBE_NAMES } from "@/config/vibes";
import { Headphones } from "lucide-react";
import clickSound from "../assets/sounds/click-soft.wav";

interface Props {
  currentVibe: string;
  onVibeChange: (vibe: string) => void;
}

export default function VibePickerInline({ currentVibe, onVibeChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Abre/fecha com GSAP
  useLayoutEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
        onComplete: () => {
          panelRef.current
            ?.querySelector<HTMLElement>('[role="listbox"]')
            ?.focus();
        },
      });
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: 10,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Bloqueia scroll no painel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isOpen) return;
    const preventScroll = (e: WheelEvent | TouchEvent) => e.preventDefault();
    panel.addEventListener("wheel", preventScroll, { passive: false });
    panel.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      panel.removeEventListener("wheel", preventScroll);
      panel.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  const applyVibeStyles = (name: string) => {
    const config = VIBES[name];
    const root = document.documentElement;
    root.style.setProperty("--background", config.background);
    root.style.setProperty("--foreground", config.foreground);
    root.style.setProperty("--ink", config.foreground);
    root.style.setProperty("--ink-soft", config.soft);
    root.style.setProperty("--card", config.surface);
    root.style.setProperty("--paper", config.surface);
    root.style.setProperty("--clay", config.clay);
    root.style.setProperty("--sage", config.sage);
    root.style.setProperty("--selection-background", config.foreground);
    root.style.setProperty("--selection-foreground", config.background);
  };

  const handleVibeChange = (index: number, item: string) => {
    const commit = () => {
      applyVibeStyles(item);
      onVibeChange(item);
      // Pequena animação no item ativo (opcional)
    };

    const doc = document as any;
    if (!doc.startViewTransition || !buttonRef.current) {
      commit();
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    doc.startViewTransition(() => commit());
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center text-foreground hover:text-sage transition-colors"
        aria-label="Vibe Check"
      >
        <Headphones size={18} />
      </button>

      <div
        ref={panelRef}
        style={{
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(10px) scale(0.95)",
          transformOrigin: "top right",
        }}
        className="absolute top-full right-0 mt-2 w-64 h-80 bg-paper/95 backdrop-blur-xl border border-border shadow-2xl z-45"
      >
        <div className="absolute top-6 left-0 w-full text-center text-xs font-sans uppercase tracking-widest text-ink-soft z-10 pointer-events-none">
          Soundtrack / Vibe
        </div>
        <div className="w-full h-full pt-8">
          <OptionWheel
            items={VIBE_NAMES}
            defaultSelected={VIBE_NAMES.indexOf(currentVibe)}
            textColor="var(--ink-soft)"
            activeColor="var(--ink)"
            side="left"
            fontSize={2}
            spacing={1.8}
            curve={1}
            tilt={10}
            blur={2}
            fade={0.3}
            inset={30}
            loop={true}
            draggable={true}
            soundUrl={clickSound}
            soundVolume={0.3}
            onChange={handleVibeChange}
          />
        </div>
      </div>
    </div>
  );
}
