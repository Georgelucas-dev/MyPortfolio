// sections/hero.tsx
import { motion } from "motion/react";

function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col bg-zinc-100 h-screen text-black"
    >
      <div className="flex flex-row px-10 h-full justify-center">
        <div className="flex flex-col justify-center font-extrabold">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Hello,
          </motion.p>

          <motion.h1
            className="text-9xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            I'm George
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            a software engineer
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
