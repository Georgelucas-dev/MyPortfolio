import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from "@/components/animate-ui/components/animate/cursor";
import { useEffect, useState } from "react";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import About from "./sections/about";
import Projects from "./sections/projects/projects";
import Contact from "./sections/contact";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/navbar";
import WhyWorkWithMe from "./sections/whyWorkWithMe/index";
import { ServicesSection } from "./sections/services/ServicesSection";
import { motion, AnimatePresence } from "motion/react";

import Loader from "./components/Loader";

import ScatterTextSection from "./sections/ScatterReveal";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

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

  return (
    <ThemeProvider>
      <CursorProvider global>
        {showCursor ? (
          <>
            <Cursor />
            <CursorFollow>Developer</CursorFollow>
          </>
        ) : null}

        <div className="relative">
          {/* O Loader é o único elemento que existe de imediato */}
          <Loader onComplete={() => setLoadingComplete(true)} />

          {/* O conteúdo só é montado (e animado) quando loadingComplete for true */}
          <AnimatePresence>
            {loadingComplete && (
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Navbar />
                <Hero />
                <ScatterTextSection />
                <ServicesSection />
                <Projects />
                <About />
                <WhyWorkWithMe />
                <Contact />
                <Footer />
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </CursorProvider>
    </ThemeProvider>
  );
}

export default App;
