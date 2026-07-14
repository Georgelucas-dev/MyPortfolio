// sections/hero.tsx
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";

// Ícone de seta apontando para baixo (Scroll)
function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-bounce">
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { setHeroVisivel } = useHero();

  useEffect(() => {
    const elemento = heroRef.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisivel(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [setHeroVisivel]);

  // Curva de animação "premium"
  const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex flex-col justify-between w-full min-h-[100svh] bg-background text-foreground overflow-hidden px-6 md:px-12 lg:px-50 pt-10 lg:pt-32 pb-12"
    >
      {/* Grid de fundo com máscara para não vazar nas bordas */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] overflow-hidden"></div>

      {/* Row 1: Metadados Estruturais */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 flex justify-between items-start font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground"
      >
        <div className="flex flex-col gap-1">
          <p>Localização</p>
          <p className="text-foreground">Chapecó, SC — BR</p>
        </div>
      </motion.div>

      {/* Row 2: Tipografia Massiva */}
      <div className="relative z-10 flex flex-col justify-center flex-1 mt-12 md:mt-0">
        
        {/* Título Menor */}
        <div className="overflow-hidden mb-2 md:mb-6">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="font-mono text-xs md:text-xl tracking-[0.3em] uppercase text-muted-foreground"
          >
            Olá, meu nome é
          </motion.p>
        </div>

        {/* Nome Massivo - Ajustado para [15vw] no mobile para evitar overflow */}
        <h1 className="font-display font-extrabold leading-[0.85] tracking-tighter text-[15vw] md:text-[14vw] lg:text-[12vw] uppercase ml-[-0.05em] wrap-break-word">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="block text-foreground"
            >
              George
            </motion.span>
          </div>
        </h1>
      </div>

      {/* Row 3: Assimetria */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-12">
        
        {/* Scroll Indicator (Esquerda) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="md:col-span-4 hidden md:flex items-center gap-4 text-muted-foreground font-mono text-xs uppercase tracking-widest"
        >
          <ArrowDownIcon />
          <span>Scroll down</span>
        </motion.div>

        {/* Cargo e Resumo (Direita) */}
        <div className="md:col-span-8 lg:col-span-6 lg:col-start-7 flex flex-col gap-4 md:gap-6 md:text-right">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight break-words"
            >
              Software Engineer
            </motion.h2>
          </div>
          
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="text-base md:text-xl text-muted-foreground font-light leading-relaxed md:ml-auto max-w-lg"
            >
              Construindo arquiteturas robustas e interfaces de alta performance. 
              Elevando a qualidade de produtos digitais através de código limpo e design impecável.
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;