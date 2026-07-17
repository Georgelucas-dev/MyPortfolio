import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

interface ScatterWordProps {
  word: string;
  index: number;
  totalWords: number;
  progress: MotionValue<number>;
}

function ScatterWord({ word, index, totalWords, progress }: ScatterWordProps) {
  // Mantemos a matemática sequencial para elas virem em ordem
  const startRange = (index / totalWords) * 0.8;
  const endRange = Math.min(startRange + 0.2, 1);

  // A MÁGICA DA LINHA RETA ESTÁ AQUI:
  // "100vw" significa que a palavra começa exilada 1 tela inteira para a direita.
  // Ela corre em linha reta (apenas no eixo X) até a posição "0px" (seu lugar no texto).
  const x = useTransform(progress, [startRange, endRange], ["100vw", "0px"]);

  // Opacidade para um fade-in rápido enquanto desliza para dentro da tela
  const opacity = useTransform(
    progress,
    [startRange, startRange + 0.1],
    [0, 1],
  );

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block mr-3 md:mr-4 lg:mr-5 mb-2 md:mb-4 font-display text-4xl md:text-5xl lg:text-[4vw] leading-[1.1] font-medium tracking-tight text-foreground will-change-transform"
    >
      {word}
    </motion.span>
  );
}

export default function ScatterTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, // Suavizado para o movimento horizontal ficar bem fluido
    damping: 20,
    mass: 0.5,
  });

  const text =
    "Established in 2021, SIRNIK is a design and development studio working on digital products and websites. Our approach is built around structure, systems, and clear design decisions.";
  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background w-full"
    >
      {/* 
        A classe overflow-hidden é crucial aqui. Ela impede que as 
        palavras aguardando no "100vw" gerem uma barra de rolagem horizontal.
      */}
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden px-6 md:pl-32 lg:pl-48 md:pr-12 bg-background pb-16 md:pb-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-muted)/20%_0%,transparent_70%)]" />

        <div className="relative z-10 w-full flex flex-wrap justify-start text-left">
          {words.map((word, i) => (
            <ScatterWord
              key={i}
              word={word}
              index={i}
              totalWords={words.length}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
