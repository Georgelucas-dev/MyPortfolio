import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from "@/components/animate-ui/components/animate/cursor";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import About from "./sections/about/about";
import Projects from "./sections/projects";
import Contact from "./sections/contact";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/navbar";
import Skills from "./sections/skills";

function App() {
  return (
    <ThemeProvider>
      <CursorProvider global>
        <Cursor />
        <CursorFollow>Developer</CursorFollow>

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
