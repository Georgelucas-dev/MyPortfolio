import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroNav() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power4.inOut", delay: 0.1 },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="md:flex hidden justify-between items-center w-full px-6 md:px-12 pt-8 shrink-0"
    >
      <div className="w-1/3">
        <a
          href="#home"
          className="font-display text-xl md:text-2xl font-bold tracking-tight uppercase"
        >
          George Lucas
        </a>
      </div>

      <div className="hidden md:flex w-1/3 justify-center gap-8 text-sm font-medium text-ink/70">
        <a href="#servicos" className="hover:text-ink transition-colors">
          Serviços
        </a>
        <a href="#sobre" className="hover:text-ink transition-colors">
          Por que trabalhar comigo?
        </a>
      </div>

      <div className="w-1/3 flex justify-end">
        <a
          href="#contato"
          className="px-5 py-2.5 bg-ink text-background hover:opacity-80 flex items-center gap-2 text-sm font-medium transition-opacity"
        >
          Contato <span className="text-xs">↗</span>
        </a>
      </div>
    </nav>
  );
}