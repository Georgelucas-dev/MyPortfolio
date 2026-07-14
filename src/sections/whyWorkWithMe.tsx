import { whyWorkWithMeData } from "../data/whyWorkWithMe";
import { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import type { WhyWorkWithMeItem } from "../data/whyWorkWithMe";

const { badge, title, items } = whyWorkWithMeData;

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 md:w-8 md:h-8"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StackCardProps {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  data: WhyWorkWithMeItem;
}

function StackCard({ index, total, scrollYProgress, data }: StackCardProps) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;

  const local = useTransform(scrollYProgress, [start, end], [0, 1], {
    clamp: true,
  });

  const rotate = useTransform(local, [0, 0.3], [index % 2 === 0 ? -1.5 : 1.5, 0]);
  const y = useTransform(local, [0, 0.25, 0.88, 1], [120, 0, 0, -100]);
  const scale = useTransform(local, [0, 0.25, 0.88, 1], [0.92, 1, 1, 0.96]);
  const opacity = useTransform(local, [0, 0.9, 1], [1, 1, 0]);

  const contentY = useTransform(local, [0, 0.4], [50, 0]);
  const contentOpacity = useTransform(local, [0, 0.3], [0, 1]);

  const bg = index % 2 === 0 ? "bg-card dark:bg-black" : "bg-paper dark:bg-black";
  const indexStr = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  const tags = ["Estratégia", "Design System", "Performance"];

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        opacity,
        zIndex: total - index,
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,calc(100%-2rem))] h-[70vh] md:h-[80vh] rounded-3xl md:rounded-[2.5rem] overflow-hidden ${bg}`}
    >
      {/* Watermark — escala progressiva pra não dominar um card estreito */}
      <div className="absolute -top-4 -right-2 md:-top-12 md:-right-8 font-display text-[6rem] sm:text-[8rem] md:text-[16rem] lg:text-[25rem] font-bold text-foreground/3 leading-none select-none pointer-events-none">
        {indexStr}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="h-full flex flex-col p-5 md:p-12 lg:p-16 relative z-10"
      >
        {/* Cabeçalho — ícone/label à esquerda, contador de progresso à direita */}
        <div className="flex justify-between items-center border-b border-border/60 pb-3 md:pb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-9 h-9 md:w-16 md:h-16 rounded-full bg-foreground text-background flex items-center justify-center">
              <ArrowUpRightIcon />
            </div>
            <span className="font-mono text-xs md:text-base tracking-[0.2em] uppercase text-muted-foreground">
              {data.id || `Fase — ${indexStr}`}
            </span>
          </div>

          <span className="font-mono text-[11px] md:text-sm tracking-widest text-muted-foreground/70">
            {indexStr} / {totalStr}
          </span>
        </div>

        {/* Corpo — grid assimétrico só a partir do lg */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-16 items-start lg:items-end pt-3 md:pt-0 pb-2 md:pb-4">
          <div className="lg:col-span-7">
            <h3 className="font-display text-3xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight">
              {data.title}
            </h3>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 md:gap-8">
            {data.description && (
              <p className="text-sm md:text-2xl text-muted-foreground font-light leading-relaxed line-clamp-4 md:line-clamp-none">
                {data.description}
              </p>
            )}

            <ul className="flex flex-wrap gap-2 md:gap-3">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border/80 text-[10px] md:text-xs font-mono uppercase tracking-widest text-foreground/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyWorkWithMe() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="por-que-trabalhar-comigo"
      className="relative z-10 border-0 min-h-screen bg-paper dark:bg-black text-foreground font-sans lg:px-30 px-6 py-24 flex flex-col justify-center"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs md:text-sm tracking-[0.25em] text-muted-foreground uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-muted-foreground/50"></span>
            {badge}
          </p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight">
            {title}
          </h2>
        </div>
        <div className="md:max-w-xs text-muted-foreground font-light text-lg">
          Uma abordagem focada em qualidade, performance e atenção a cada pixel.
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ height: `${items.length * 100}vh` }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-0">
          {items.map((item, i) => (
            <StackCard
              key={item.id}
              index={i}
              total={items.length}
              scrollYProgress={scrollYProgress}
              data={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}