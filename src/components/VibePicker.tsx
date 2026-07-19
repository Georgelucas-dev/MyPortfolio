// src/components/VibePicker.tsx
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import OptionWheel from "./OptionWheel";
import { VIBES, VIBE_NAMES } from "@/config/vibes";
import { Headphones } from "lucide-react";

export default function VibePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVibe, setCurrentVibe] = useState("Dark");

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);

  // GSAP: Animação de entrada e saída
  useLayoutEffect(() => {
    if (!panelRef.current) return;

    if (isOpen) {
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      });
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    root.style.setProperty("--selection-background", config.foreground);
    root.style.setProperty("--selection-foreground", config.background);
  };

  useEffect(() => {
    applyVibeStyles(currentVibe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVibeChange = (index: number, item: string) => {
    const commit = () => {
      applyVibeStyles(item);
      setCurrentVibe(item);
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

    doc.startViewTransition(() => {
      commit();
    });
  };

  // avança/volta um item na lista de vibes, com wraparound (igual ao loop do OptionWheel)
  const navigateVibe = (direction: 1 | -1) => {
    const total = VIBE_NAMES.length;
    const currentIndex = VIBE_NAMES.indexOf(currentVibe);
    const nextIndex = (currentIndex + direction + total) % total;
    handleVibeChange(nextIndex, VIBE_NAMES[nextIndex]);
  };

  // Scroll do mouse sobre o painel: troca a vibe E trava o scroll do fundo de verdade
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // só funciona pq o listener é passive:false
      e.stopPropagation();

      if (wheelLockRef.current) return;

      navigateVibe(e.deltaY > 0 ? 1 : -1);

      // pequeno "cooldown" pra cada scroll mover só um item por vez (efeito de picker)
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 180);
    };

    const stopTouch = (e: TouchEvent) => e.stopPropagation();

    panel.addEventListener("wheel", handleWheel, { passive: false });
    panel.addEventListener("touchmove", stopTouch, { passive: true });

    return () => {
      panel.removeEventListener("wheel", handleWheel);
      panel.removeEventListener("touchmove", stopTouch);
    };
  }, [isOpen, currentVibe]);

  // Fallback / reforço: setas do teclado enquanto o painel estiver aberto
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateVibe(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateVibe(-1);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentVibe]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-[9999] flex items-end gap-4"
    >
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-none border border-border bg-paper/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        aria-label="Vibe Check"
      >
        <Headphones size={20} />
      </button>

      <div
        ref={panelRef}
        style={{
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(20px) scale(0.95)",
        }}
        data-lenis-prevent
        className="w-64 h-80 bg-paper/90 backdrop-blur-xl border border-border rounded-none shadow-2xl relative"
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
            soundUrl="/assets/sounds/click-soft.mp3"
            soundVolume={0.3}
            onChange={handleVibeChange}
          />
        </div>
      </div>
    </div>
  );
}
