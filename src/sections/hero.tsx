// sections/hero.tsx
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useHero } from "@/context/HeroContext";

import mockupImg from "../assets/image/image.png";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { setHeroVisivel } = useHero();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elemento = heroRef.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisivel(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [setHeroVisivel]);

  const transition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex flex-col w-full min-h-svh bg-background text-ink px-6 md:px-12 lg:pl-64 lg:pr-16 xl:pl-72 xl:pr-24 pt-8 lg:pt-12 pb-8 overflow-hidden"
    >
      {/* HEADER (Top Nav Interno) — segue oculto no mobile, o MobileNavbar cobre esse papel */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
        className="hidden md:flex justify-between items-center w-full mb-12 lg:mb-20"
      >
        <div className="w-1/4">
          <a
            href="#home"
            className="font-display text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2"
          >
            George Lucas
          </a>
        </div>

        <div className="hidden md:flex flex-1 justify-center lg:justify-start lg:pl-8 xl:pl-12 gap-8 lg:gap-12 text-sm text-ink-soft">
          <a href="#servicos" className="hover:text-ink transition-colors">
            Serviços
          </a>
          <a href="#sobre" className="hover:text-ink transition-colors">
            Por que trabalhar comigo?
          </a>
        </div>

        <div className="w-auto lg:w-1/4 flex justify-end">
          <a
            href="#contato"
            className="px-5 py-2 lg:px-6 lg:py-2.5 rounded-full border border-ink/20 text-sm hover:bg-ink hover:text-background transition-all duration-300"
          >
            Contato
          </a>
        </div>
      </motion.nav>

      {/* ROW 1: Filosofia e Localização — no mobile vira o 3º bloco (depois da linha) */}
      <div className="order-3 md:order-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <h3 className="font-mono text-xs md:text-sm text-ink-soft">
            Nossa filosofia
          </h3>
          <p className="text-sm text-ink-soft font-light leading-relaxed max-w-sm">
            Construindo arquiteturas robustas e interfaces de alta performance.
            Elevando a qualidade através de código limpo e design impecável.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.3 }}
          className="lg:col-span-7 flex flex-col gap-1 text-sm font-light text-ink-soft lg:items-start"
        >
          <p>
            Baseado em Chapecó, SC — BR{" "}
            {time && <span className="text-ink">({time})</span>}
          </p>
          <p className="flex items-center gap-2">
            Desenvolvedor Front-end
          </p>
        </motion.div>
      </div>

      {/* Linha Divisória — no mobile vira o 2º bloco, entre o texto grande e a filosofia */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
        className="order-2 md:order-none w-full h-[1px] bg-ink/10 origin-left mb-6 md:mb-8 lg:mb-10"
      />

      {/* ROW 2: Texto Gigante e Imagem — no mobile vira o 1º bloco (fica em cima) */}
      <div className="order-1 md:order-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 flex-none md:flex-1 items-end pb-2 mb-6 md:mb-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.8 }}
          className="lg:col-span-4 hidden lg:flex flex-col justify-end h-full pb-2"
        >
          <div className="w-full max-w-[260px] xl:max-w-[300px] aspect-[4/3] bg-ink/5 flex items-center justify-center relative overflow-hidden group">
            <img
              src={mockupImg}
              alt="Mockup do projeto"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <div className="lg:col-span-8 flex flex-col items-start w-full">
          <div className="overflow-hidden mb-4 lg:mb-6">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.5 }}
              className="font-mono text-xs md:text-sm text-ink-soft flex items-center gap-2"
            >
              Disponível para novos projetos
            </motion.p>
          </div>

          <h1 className="font-display font-medium text-[8.5vw] sm:text-[7vw] lg:text-[4.5vw] xl:text-[4vw] leading-[0.95] tracking-tighter text-ink mb-8 lg:mb-10 w-fit">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.55 }}
                className="block"
              >
                Desenvolvimento
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.6 }}
                className="block"
              >
                como equilíbrio
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.65 }}
                className="block"
              >
                entre estrutura
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.7 }}
                className="block"
              >
                e emoção.
              </motion.span>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.9 }}
            className="flex flex-col gap-2"
          >
            <p className="text-xs md:text-sm text-ink-soft">
              Vamos construir algo incrível
            </p>
            <a
              href="#contato"
              className="text-base md:text-lg font-medium border-b border-ink/30 pb-1 w-fit hover:border-ink transition-colors duration-300"
            >
              Iniciar um projeto
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
