import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { HeroProvider } from "./context/HeroContext.tsx";
import { ReactLenis } from "lenis/react";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HeroProvider>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
          syncTouch: true,
        }}
      >
        <App />
      </ReactLenis>
    </HeroProvider>
  </ThemeProvider>,
);
