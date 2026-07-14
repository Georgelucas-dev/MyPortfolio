// components/sections/whyWorkWithMe.tsx
import { useRef, useState, useEffect } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

interface Pillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
}

const pillars: Pillar[] = [
  {
    id: "performance",
    index: "01",
    title: "PERFORMANCE",
    subtitle: "Velocidade Extrema",
    overview:
      "Sistemas lentos custam caro. Desenvolvo aplicações com foco absoluto em carregamento instantâneo, otimização de renderização e arquiteturas limpas, alcançando notas máximas no Lighthouse.",
    tags: ["Next.js", "Vite", "Turbopack", "Clean Code"],
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Carregamento", value: "< 1.2s" },
      { label: "SEO Otimizado", value: "Excelente" },
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", // Reduzido o tamanho para otimizar banda
  },
  {
    id: "design",
    index: "02",
    title: "DESIGN SYSTEM",
    subtitle: "Estética Refinada",
    overview:
      "Seu produto com visual de nível internacional. Transições fluidas, micro-interações táteis e um design system modular que garante consistência total entre Figma e código.",
    tags: ["Framer Motion", "Tailwind CSS", "UI/UX Premium", "Figma Sync"],
    metrics: [
      { label: "Taxa de Retenção", value: "+40%" },
      { label: "Fidelidade de UI", value: "Pixel Perfect" },
      { label: "Interações", value: "60 FPS" },
    ],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "strategy",
    index: "03",
    title: "ENGENHARIA",
    subtitle: "Pronto Para Escalar",
    overview:
      "Não crio apenas telas. Desenvolvo soluções robustas preparadas para tráfegos pesados. Código estritamente tipado, segurança corporativa e integrações sem fricção.",
    tags: ["TypeScript", "Node.js", "CI/CD", "Clean Architecture"],
    metrics: [
      { label: "Escalabilidade", value: "Pronta" },
      { label: "Code Coverage", value: "90%+" },
      { label: "Segurança", value: "Enterprise" },
    ],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
  },
];

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90, // Suavizado um pouco mais para evitar oscilações bruscas
    damping: 25,
    mass: 0.8,
  });

  // Atualiza o índice ativo baseado no progresso do scroll de forma segura
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    const calculatedIndex = Math.floor(latest * pillars.length);
    
    // CORREÇÃO CRÍTICA: Força o índice a ficar estritamente entre 0 e (tamanho - 1)
    const clampedIndex = Math.max(0, Math.min(calculatedIndex, pillars.length - 1));
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  const itemHeight = isMobile ? 70 : 120;
  const yOffset = ((pillars.length - 1) / 2 - activeIndex) * itemHeight;

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-background w-full"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col md:grid md:grid-cols-12 overflow-hidden px-6 md:px-12 lg:px-24 bg-background pb-20 md:pb-0 will-change-transform">
        
        {/* LADO ESQUERDO: Mockup e Tabelas */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center h-[50svh] md:h-full pr-0 md:pr-12 lg:pr-20 pt-8 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">
                Por que trabalhar comigo / {pillars[activeIndex]?.index || "01"}
              </p>

              {/* Mockup Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-border/50 shadow-xl will-change-transform">
                <img
                  src={pillars[activeIndex]?.image}
                  alt={pillars[activeIndex]?.title}
                  className="h-full w-full object-cover brightness-[0.85] contrast-[1.05]"
                  loading="eager"
                />
              </div>

              {/* Detalhes Estilo Tabela */}
              <div className="mt-2 flex flex-col font-sans text-xs md:text-sm text-foreground">
                <div className="grid grid-cols-4 border-t border-border/40 py-3">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                    Overview
                  </span>
                  <p className="col-span-3 text-muted-foreground leading-relaxed text-[11px] md:text-sm">
                    {pillars[activeIndex]?.overview}
                  </p>
                </div>

                <div className="grid grid-cols-4 border-t border-border/40 py-3 hidden md:grid">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                    Skills
                  </span>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {pillars[activeIndex]?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-foreground font-mono text-[10px] bg-muted/40 px-2.5 py-1 rounded-full border border-border/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 border-t border-b border-border/40 py-3">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
                    Garantia
                  </span>
                  <div className="col-span-3 grid grid-cols-3 gap-2 md:gap-4">
                    {pillars[activeIndex]?.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="text-[9px] md:text-xs text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className="text-xs md:text-sm font-semibold mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LADO DIREITO: Coluna de Palavras-Chave */}
        <div className="col-span-12 md:col-span-5 relative flex items-center justify-center h-[35svh] md:h-full border-t md:border-t-0 md:border-l border-border/10">
          
          <div className="absolute left-6 md:left-12 font-mono text-xs md:text-sm text-muted-foreground tracking-widest hidden sm:block">
            {pillars[activeIndex]?.index || "01"}
          </div>

          <div 
            className="relative flex items-center justify-center w-full overflow-hidden"
            style={{ height: itemHeight * 3 }}
          >
            <motion.div
              animate={{ y: yOffset }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.8,
              }}
              className="absolute flex flex-col items-center will-change-transform"
            >
              {pillars.map((pillar, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={pillar.id}
                    style={{ height: itemHeight }}
                    className="flex items-center justify-center"
                  >
                    <h2
                      className={`
                        transition-all duration-300 font-display font-black uppercase tracking-[-0.05em] select-none
                        ${
                          isActive
                            ? "text-3xl md:text-[4vw] text-foreground scale-100 opacity-100"
                            : "text-xl md:text-[2.2vw] text-muted-foreground/15 scale-90 opacity-20"
                        }
                      `}
                    >
                      {pillar.title}
                    </h2>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}