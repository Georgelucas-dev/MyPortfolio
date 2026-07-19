import Cursor from "./components/animate-ui/components/Cursor/cursor";
import { useEffect, useState, useRef } from "react";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import About from "./sections/about";
import Projects from "./sections/projects/projects";
import Contact from "./sections/contact";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/navbar";
import WhyWorkWithMe from "./sections/whyWorkWithMe/index";
import { ServicesSection } from "./sections/ServicesSection";
import gsap from "gsap"; // Importação do GSAP adicionada

import VibePicker from "@/components/VibePicker";
import Loader from "./components/Loader";
import ScatterTextSection from "./sections/ScatterReveal";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const mainRef = useRef<HTMLElement>(null); // Referência para animar o main

  // Opcional: Trava o scroll da página enquanto o loader está ativo
  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0); // Garante que a página comece no topo
    }
  }, [loadingComplete]);

  const [showCursor, setShowCursor] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return !window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateShowCursor = () => setShowCursor(!mediaQuery.matches);

    updateShowCursor();
    mediaQuery.addEventListener("change", updateShowCursor);

    return () => mediaQuery.removeEventListener("change", updateShowCursor);
  }, []);

  // Animação do GSAP quando o main é montado
  useEffect(() => {
    if (loadingComplete && mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
      );
    }
  }, [loadingComplete]);

  return (
    <ThemeProvider>
      {/* Adicionei a validação do showCursor que você havia criado, mas não estava usando na tag */}
      {showCursor && <Cursor />}

      <div className="relative">
        {/* O Loader é o único elemento que existe de imediato */}
        {!loadingComplete && (
          <Loader onComplete={() => setLoadingComplete(true)} />
        )}

        {/* O conteúdo só é montado (e animado) quando loadingComplete for true */}
        {loadingComplete && (
          <main ref={mainRef} style={{ opacity: 0 }}>
            <Navbar />
            <Hero />
            <ScatterTextSection />
            <ServicesSection />
            <Projects />
            <About />
            <WhyWorkWithMe />
            <Contact />
            <VibePicker />
            <Footer />
          </main>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
