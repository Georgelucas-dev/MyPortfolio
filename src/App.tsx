import { useEffect, useState, useRef } from "react";
import Footer from "./sections/footer";
import Projects from "./sections/projects/projects";
import Contact from "./sections/contact";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/navbar";
import WhyWorkWithMe from "./sections/WhyWorkWithMe";
import { ServicesSection } from "./sections/services/ServicesSection";
import HeroSection from "./components/Hero/HeroSection";
import ScatterTextSection from "./sections/ScatterReveal";
import Loader from "./components/Loader";
import gsap from "gsap";
import { About } from "./sections/about";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Trava o scroll enquanto o loader estiver ativo
  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
  }, [loadingComplete]);

  // Animação de fade-in no main após o loader
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
      <div className="relative">
        {!loadingComplete && (
          <Loader onComplete={() => setLoadingComplete(true)} />
        )}

        {loadingComplete && (
          <main ref={mainRef} style={{ opacity: 0 }}>
            <Navbar />
            <div className="relative w-full">
              <HeroSection />
              <ScatterTextSection />
            </div>
            <ServicesSection />
            <Projects />
            {/* <About /> */}
            <WhyWorkWithMe />
            {/* <Contact /> */}
            <Footer />
          </main>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
