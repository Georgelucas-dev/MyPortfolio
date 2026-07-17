// sections/hero.tsx
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";
import NoiseGradient from "@/components/NoiseGradient";

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 animate-bounce text-ink-soft"
    >
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
      { threshold: 0.35 },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, [setHeroVisivel]);

  const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

  return (
    <section
      id="home"
      ref={heroRef}
      /* Espaçamento esquerdo inteligente para desviar do menu expandido (lg:pl-64 xl:pl-72) */
      className="relative flex flex-col justify-between w-full min-h-svh bg-background text-ink overflow-hidden px-6 md:px-12 lg:pl-64 lg:pr-16 xl:pl-72 xl:pr-24 pt-10 lg:pt-32 pb-12"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NoiseGradient
          colors={[
            [0.02, 0.02, 0.02],
            [0.04, 0.04, 0.04],
            [0.07, 0.07, 0.07],
            [0.1, 0.1, 0.1],
          ]}
          speed={0.6}
          noiseScale={1.4}
          grainIntensity={0.01}
        />
        {/* opcional: máscara para o texto respirar */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      {/* Row 1 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 flex justify-between items-start font-mono text-xs md:text-sm uppercase tracking-widest text-ink-soft"
      >
        <div className="flex flex-col gap-1">
          <p>Localização</p>
          <p className="text-ink">Chapecó, SC — BR</p>
        </div>
      </motion.div>

      {/* Row 2 */}
      <div className="relative z-10 flex flex-col justify-center flex-1 mt-12 md:mt-0">
        <div className="overflow-hidden mb-2 md:mb-6">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="font-mono text-xs md:text-xl tracking-[0.3em] uppercase text-ink-soft"
          >
            Olá, meu nome é
          </motion.p>
        </div>

        <h1 className="font-display font-extrabold leading-[0.85] tracking-tighter text-[15vw] md:text-[14vw] lg:text-[11vw] uppercase ml-[-0.05em] break-words">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="block text-ink"
            >
              George
            </motion.span>
          </div>
        </h1>
      </div>

      {/* Row 3 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="lg:col-span-4 hidden lg:flex items-center gap-4 text-ink-soft font-mono text-xs uppercase tracking-widest"
        >
          <ArrowDownIcon />
          <span>Scroll down</span>
        </motion.div>

        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6 lg:text-right">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              className="font-display text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight break-words text-ink"
            >
              Construindo experiências digitais.
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="text-base md:text-xl text-ink-soft font-light leading-relaxed lg:ml-auto max-w-lg"
            >
              Construindo arquiteturas robustas e interfaces de alta
              performance. Elevando a qualidade de produtos digitais através de
              código limpo e design impecável.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
