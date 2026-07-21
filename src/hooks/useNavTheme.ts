// hooks/useNavTheme.ts
import { useEffect, useState } from "react";

export function useNavTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-theme]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pega a entrada com maior área visível
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const sectionTheme = (visible.target as HTMLElement).dataset.theme;
          setTheme(sectionTheme === "dark" ? "dark" : "light");
        }
      },
      {
        root: null,
        threshold: [0.3, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return theme;
}
