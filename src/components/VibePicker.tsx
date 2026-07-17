// src/components/VibePicker.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import OptionWheel from "./OptionWheel";
import { VIBES, VIBE_NAMES } from "@/config/vibes";
import { Headphones } from "lucide-react";

export default function VibePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVibe, setCurrentVibe] = useState("Dark");
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const config = VIBES[currentVibe];
    const root = document.documentElement;

    root.style.setProperty("--background", config.background);
    root.style.setProperty("--foreground", config.foreground);
    root.style.setProperty("--ink", config.foreground);
    root.style.setProperty("--ink-soft", config.soft);
    root.style.setProperty("--card", config.surface);
    root.style.setProperty("--paper", config.surface);
    root.style.setProperty("--selection-background", config.foreground);
    root.style.setProperty("--selection-foreground", config.background);
  }, [currentVibe]);

  const handleVibeChange = (index: number, item: string) => {
    setCurrentVibe(item);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-[9999] flex items-end gap-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-none border border-border bg-paper/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        aria-label="Vibe Check"
      >
        <Headphones size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
