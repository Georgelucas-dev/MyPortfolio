import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { HeroProvider } from "./context/HeroContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HeroProvider>
      <App />
    </HeroProvider>
  </ThemeProvider>,
);
