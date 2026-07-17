// src/config/vibes.ts

export type VibeConfig = {
  label: string;
  background: string;
  foreground: string;
  surface: string;
  soft: string;
};

export const VIBES: Record<string, VibeConfig> = {
  Dark: {
    label: "Dark",
    background: "oklch(0.1 0 0)",
    foreground: "oklch(0.96 0.01 260)",
    surface: "oklch(0.15 0.01 260)",
    soft: "oklch(0.7 0.01 260)",
  },
  "Lo-Fi": {
    label: "Lo-Fi",
    // Tons pastéis / bege estilo papel antigo
    background: "oklch(0.96 0.02 85)",
    foreground: "oklch(0.25 0.03 45)",
    surface: "oklch(0.92 0.02 85)",
    soft: "oklch(0.5 0.03 45)",
  },
  Cyberpunk: {
    label: "Cyberpunk",
    // Fundo azul escuro, texto verde neon
    background: "oklch(0.15 0.05 280)",
    foreground: "oklch(0.85 0.15 150)",
    surface: "oklch(0.20 0.05 280)",
    soft: "oklch(0.7 0.1 150)",
  },
  Synthwave: {
    label: "Synthwave",
    // Fundo roxo profundo, texto rosa neon
    background: "oklch(0.18 0.08 320)",
    foreground: "oklch(0.8 0.18 340)",
    surface: "oklch(0.25 0.08 320)",
    soft: "oklch(0.65 0.1 340)",
  },
  Dracula: {
    label: "Dracula",
    // Tema escuro puxado pro grafite com destaques sutis
    background: "oklch(0.2 0.02 280)",
    foreground: "oklch(0.95 0.01 280)",
    surface: "oklch(0.25 0.02 280)",
    soft: "oklch(0.75 0.02 280)",
  },
};

export const VIBE_NAMES = Object.keys(VIBES);
