import { createContext, useContext, useRef, type ReactNode } from "react";

interface ActiveRowController {
  activate: (id: string, deactivate: () => void) => void;
  release: (id: string) => void;
}

function createController(): ActiveRowController {
  let activeId: string | null = null;
  let activeDeactivate: (() => void) | null = null;

  return {
    activate(id, deactivate) {
      if (activeId === id) return;
      // desativa à força quem estava ativo antes, não importa a ordem
      // em que os ScrollTriggers dispararam
      activeDeactivate?.();
      activeId = id;
      activeDeactivate = deactivate;
    },
    release(id) {
      // só limpa se ESTE ainda for o ativo registrado — evita apagar
      // o estado de quem já assumiu o lugar dele
      if (activeId === id) {
        activeId = null;
        activeDeactivate = null;
      }
    },
  };
}

const ActiveRowContext = createContext<ActiveRowController | null>(null);

export function ActiveRowProvider({ children }: { children: ReactNode }) {
  const controllerRef = useRef<ActiveRowController | null>(null);
  if (!controllerRef.current) controllerRef.current = createController();

  return (
    <ActiveRowContext.Provider value={controllerRef.current}>
      {children}
    </ActiveRowContext.Provider>
  );
}

export function useActiveRowController() {
  const ctx = useContext(ActiveRowContext);
  if (!ctx) {
    throw new Error(
      "useActiveRowController precisa estar dentro de <ActiveRowProvider>",
    );
  }
  return ctx;
}
