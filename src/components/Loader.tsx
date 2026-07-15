// components/Loader.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Importe a função que criamos (ajuste o caminho da pasta se necessário)
import { preloadPillarImages } from "../utils/preload-images";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Flag invisível que avisa quando a placa de vídeo está pronta
    let isGpuReady = false;

    // 1. Dispara a decodificação em background assim que o Loader monta
    preloadPillarImages().then(() => {
      isGpuReady = true;
    });

    let currentProgress = 0;

    const interval = setInterval(() => {
      // 2. A MÁGICA: Se as imagens não decodificaram, o máximo é 99.
      // Se já decodificaram, o teto sobe para 100.
      const maxLimit = isGpuReady ? 100 : 99;

      currentProgress += Math.floor(Math.random() * 15) + 1;

      if (currentProgress >= maxLimit) {
        currentProgress = maxLimit;
      }

      setProgress(currentProgress);

      // 3. Só inicia a saída do Loader se chegar de fato aos 100%
      if (currentProgress === 100) {
        clearInterval(interval);

        setTimeout(() => {
          setIsFinished(true);
        }, 600);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const curve = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
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

          {/* Centro: Nome com efeito Reveal */}
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 md:gap-0">
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
