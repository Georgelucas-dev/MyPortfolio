import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface HeroContextType {
  heroVisivel: boolean;
  setHeroVisivel: (value: boolean) => void;
}

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [heroVisivel, setHeroVisivel] = useState(true);

  return (
    <HeroContext.Provider
      value={{
        heroVisivel,
        setHeroVisivel,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);

  if (context === null) {
    throw new Error("useHero deve ser usado dentro do HeroProvider");
  }

  return context;
}