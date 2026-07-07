// sections/hero.tsx
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useHero } from "@/context/HeroContext";

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  const { setHeroVisivel } = useHero();

  useEffect(() => {
    const elemento = heroRef.current;

    if (!elemento) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisivel(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(elemento);

    return () => {
      observer.disconnect();
    };
  }, [setHeroVisivel]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="flex flex-col bg-background min-h-[90svh] justify-center lg:h-screen text-foreground font-sans"
    >
      <div className="flex flex-row px-10 h-full justify-center">
        <div className="flex flex-col justify-center font-extrabold">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Olá,
          </motion.p>

          <motion.h1
            className="lg:text-9xl md:text-8xl text-6xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            Sou George
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            um engenheiro de software
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
