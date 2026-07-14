import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ScatterWordProps {
  word: string;
  index: number;
  progress: MotionValue<number>;
}

function ScatterWord({ word, index, progress }: ScatterWordProps) {
  const isEven = index % 2 === 0;
  const isDivBy3 = index % 3 === 0;

  const initialY = (isEven ? 1 : -1) * (120 + index * 30);
  const initialX = (isDivBy3 ? -1 : 1) * (100 + index * 15);
  const initialRotation = isEven ? 12 : -12;

  const y = useTransform(progress, [0, 0.8], [initialY, 0]);
  const x = useTransform(progress, [0, 0.8], [initialX, 0]);
  const rotate = useTransform(progress, [0, 0.8], [initialRotation, 0]);
  const opacity = useTransform(progress, [0, 0.2, 0.8], [0, 1, 1]);

  return (
    <motion.span
      style={{ y, x, rotate, opacity }}
      className="inline-block mr-3 md:mr-6 mb-2 md:mb-4 font-display text-4xl md:text-4xl lg:text-[4vw] leading-[1.1] font-medium tracking-tight text-foreground will-change-transform"
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
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const text =
    "Transformando ideias complexas em experiências digitais memoráveis e de alta performance.";
  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-background w-full"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-4 md:px-12 bg-background pb-16 md:pb-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-muted)/20%_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl flex flex-wrap justify-center text-center">
          {words.map((word, i) => (
            <ScatterWord
              key={i}
              word={word}
              index={i}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}