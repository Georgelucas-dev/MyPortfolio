// components/Loader.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Lógica do contador (simulando um carregamento)
  useEffect(() => {
    let currentProgress = 0;

    // Aumenta o progresso de forma orgânica e não linear
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 1;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(currentProgress);
        clearInterval(interval);

        // Aguarda um instante em 100% antes de iniciar a saída
        setTimeout(() => {
          setIsFinished(true);
        }, 600);
      } else {
        setProgress(currentProgress);
      }
    }, 100); // Velocidade do contador

    return () => clearInterval(interval);
  }, []);

  // Curva de animação Premium (usada por estúdios high-end)
  const curve = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence
      onExitComplete={onComplete} // Avisa o app que a animação de saída acabou
    >
      {!isFinished && (
        <motion.div
          // A tela inteira vai deslizar para cima no final
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: curve }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-foreground text-background px-6 md:px-12 py-8 overflow-hidden pointer-events-none"
        >
          {/* Header do Loader */}
          <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest opacity-60">
            <span>Portfólio</span>
            <span>© 2026</span>
          </div>

          {/* Centro: Nome com efeito Reveal (Máscara) */}
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 md:gap-0">
            {/* Primeira palavra: GEORGE */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: curve, delay: 0.1 }}
                className="font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase"
              >
                George
              </motion.h1>
            </div>

            {/* Segunda palavra: LUCAS */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: curve, delay: 0.2 }}
                className="font-display font-extrabold text-[20vw] md:text-[16vw] leading-[0.8] tracking-tighter uppercase ml-[15vw] md:ml-[10vw] text-background/80"
              >
                Lucas
              </motion.h1>
            </div>
          </div>

          {/* Footer do Loader: Contador */}
          <div className="flex justify-end items-end">
            <div className="font-display font-light text-6xl md:text-8xl tabular-nums tracking-tighter">
              {progress}
              <span className="text-3xl md:text-5xl opacity-50">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
