// components/Navbar/Navbar.tsx
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useNavTheme } from "@/hooks/useNavTheme";
import { useHero } from "@/context/HeroContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "About", href: "#about" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const theme = useNavTheme();
  const { heroVisivel } = useHero();
  const [menuOpen, setMenuOpen] = useState(false);

  const navBarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isDark = theme === "dark";
  const logoColor = isDark ? "text-foreground" : "text-background";

  // Animação de entrada da barra após loader
  useEffect(() => {
    if (heroVisivel && navBarRef.current) {
      gsap.fromTo(
        navBarRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );
    }
  }, [heroVisivel]);

  // Timeline única do menu (play/reverse)
  useLayoutEffect(() => {
    const linkElements = gsap.utils.toArray<HTMLAnchorElement>(
      linksContainerRef.current?.querySelectorAll(".menu-link") ?? [],
    );

    gsap.set(overlayRef.current, { display: "none" });
    gsap.set(linkElements, { y: 40, opacity: 0 });
    gsap.set(footerRef.current, { opacity: 0, y: 20 });
    gsap.set([line1Ref.current, line2Ref.current], { rotate: 0, y: 0 });

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
      },
    });

    tl.set(overlayRef.current, { display: "flex" })
      .to([line1Ref.current, line2Ref.current], {
        rotate: (i) => (i === 0 ? 45 : -45),
        y: (i) => (i === 0 ? 6 : -6),
        duration: 0.3,
        ease: "power2.inOut",
      })
      .fromTo(
        overlayRef.current,
        { clipPath: "circle(0% at calc(100% - 30px) 30px)" },
        {
          clipPath: "circle(150% at calc(100% - 30px) 30px)",
          duration: 1,
          ease: "expo.inOut",
        },
        0,
      )
      .to(
        linkElements,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    if (menuOpen) {
      timelineRef.current.reverse();
    } else {
      timelineRef.current.play(0);
    }
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (menuOpen && timelineRef.current) {
      timelineRef.current.reverse();
      setMenuOpen(false);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Barra fixa */}
      <div
        ref={navBarRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 opacity-0 pointer-events-none"
      >
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className={`text-xl font-dirty font-bold tracking-tight transition-colors duration-300 ${logoColor}`}
        >
          GL
        </a>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleMenu}
            aria-label="Abrir menu"
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
          >
            <span
              ref={line1Ref}
              className={`block w-6 h-0.5 transition-colors duration-300 ${
                menuOpen
                  ? "bg-background"
                  : isDark
                    ? "bg-foreground"
                    : "bg-background"
              }`}
            />
            <span
              ref={line2Ref}
              className={`block w-6 h-0.5 transition-colors duration-300 ${
                menuOpen
                  ? "bg-background"
                  : isDark
                    ? "bg-foreground"
                    : "bg-background"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Overlay fullscreen */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex-col justify-between p-6 md:p-12 bg-foreground text-background"
      >
        <div ref={linksContainerRef} className="flex flex-col gap-6 mt-24">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="menu-link text-5xl md:text-7xl font-display font-extrabold uppercase leading-none tracking-tight hover:text-sage transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          ref={footerRef}
          className="flex justify-between items-end text-sm uppercase tracking-widest text-background/40"
        >
          <span>© 2026 George Lucas</span>
          <span>Portfolio</span>
        </div>
      </div>
    </>
  );
}
