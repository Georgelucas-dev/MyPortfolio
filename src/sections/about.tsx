// sections/about.tsx

import { motion } from "motion/react";

function About() {
  return (
    <section className="min-h-screen bg-zinc-100 text-black flex items-center">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div className="w-full border-b-2 border-zinc-300">
        <div className="grid grid-cols-[1fr_2fr_1fr_44px]">
          {/* linha 1 — espaço vazio superior */}
          <div className="col-span-3 border-b-2 border-zinc-300 h-full" />
          <div className="border-b-2 border-l-2 border-zinc-300" />

          <div className="col-span-1 border-r-2 px-10 pt-10 pb-8 border-b-2 border-zinc-300"></div>

          {/* linha 2 — título */}
          <div className="col-span-2 px-10 pt-10 pb-8 border-b-2 border-r-2 border-zinc-300">
            <p className="text-base mb-3">Hello,</p>
            <h1 className="text-8xl font-bold leading-none">
              I'm George<span className="text-blue-500">*</span>
            </h1>
          </div>

          <div className="border-b-2 border-zinc-300 flex items-center justify-center">
            <span className="text-xl tracking-widest text-zinc-500 [writing-mode:vertical-rl]">
              <a
                href="https://github.com/Georgelucas-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </span>
          </div>

          {/* linha 3 — bio + links */}
          <div className="px-10 py-8 border-r-2 border-zinc-300"></div>
          <div className="px-10 py-8 border-r-2 border-zinc-300">
            <p className="text-xl text-zinc-500 leading-relaxed max-w-80">
              Hi! I'm George Lucas, a software engineer student and LLm
              enthusiast. I have a strong passion for technology and enjoy
              exploring new tools and frameworks. My goal is to create
              innovative solutions that make a positive impact on people's
              lives.
            </p>
          </div>

          <div className="px-10 py-8 border-r-2  border-zinc-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">See Projects</span>
              <span className="text-blue-500 text-xl">
                <a href="#projects">Give a look</a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">Or talk to me</span>
              <span className="text-blue-500 text-xl">
                <a href="#contact">Send a message</a>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl tracking-widest text-zinc-500 [writing-mode:vertical-rl]">
              <a
                href="https://www.linkedin.com/in/george-lucas/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
            </span>
          </div>

          {/* linha 4 — notas de rodapé */}
          <div className="col-span-3 px-10 py-6 border-t-2 border-r-2 border-zinc-300">
            <p className="text-xl text-blue-500 mb-1">
              * dev focused in building real projects, not just theory.
            </p>
            <p className="text-xl text-blue-500">
              ** llm enthusiast, exploring the potential of AI in software
              development.
            </p>
          </div>
          <div className="border-t-2 border-zinc-300 flex items-center justify-center">
            <span className="text-xl tracking-widest text-zinc-500 [writing-mode:vertical-rl]">
              <a
                href="mailto:george.lucas@example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                email
              </a>
            </span>
          </div>
        </div>
        </div>
        </motion.div>
    </section>
  );
}

export default About;
