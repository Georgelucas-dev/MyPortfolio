import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from "@/components/animate-ui/components/animate/cursor";
import { useEffect, useState } from "react";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import About from "./sections/about/about";
import Projects from "./sections/projects";
import Contact from "./sections/contact";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/navbar";
import Skills from "./sections/skills";

function App() {
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
          <main>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </div>
      </CursorProvider>
    </ThemeProvider>
  );
}

export default App;
