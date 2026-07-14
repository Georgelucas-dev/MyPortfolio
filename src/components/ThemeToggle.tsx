import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; // ou "framer-motion" conforme seu projeto

interface Props {
  dark: boolean;
  toggle: () => void;
}

export function ThemeButton({ dark, toggle }: Props) {
  
  const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Se o navegador não suportar a API de transição, muda o tema instantaneamente
    if (!document.startViewTransition) {
      toggle();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    
    // Calcula a distância até o canto mais distante da tela para cobrir tudo perfeitamente
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    
    // Passa as coordenadas dinâmicas do clique para as variáveis do CSS
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    // Dispara a transição de visualização
    document.startViewTransition(() => {
      // Como o React atualiza o DOM de forma assíncrona, chamamos o toggle aqui dentro
      toggle();
    });
  };

  return (
    <button
      onClick={handleThemeChange}
      className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-border/60
        bg-background
        overflow-hidden
        cursor-pointer
        shadow-sm
        hover:scale-105
        active:scale-95
        transition-transform
      "
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Moon size={20} className="text-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Sun size={20} className="text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}