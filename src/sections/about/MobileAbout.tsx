// sections/MobileAbout.tsx

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

function MobileAbout() {
  return (
    <section className="min-h-screen bg-background text-foreground px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Sobre
        </p>

        <p className="text-lg font-medium mb-2">Um pouco sobre mim</p>

        <h1 className="text-5xl font-extrabold leading-none mb-6">
          Sou George
          <span className="text-blue-500">*</span>
        </h1>

        <p className="text-muted-foreground leading-8 text-lg">
          Oi! Sou George Lucas, estudante de Engenharia de Software e entusiasta
          de LLM. Adoro construir projetos do mundo real, aprender novas
          tecnologias e criar software que resolve problemas de forma simples e
          elegante.
        </p>

        <div className="h-px bg-border my-10" />

        <div className="flex flex-col gap-5">
          <a
            href="#projects"
            className="flex items-center justify-between text-lg font-medium"
          >
            Ver Projetos
            <ArrowUpRight size={20} />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-between text-lg font-medium"
          >
            Envie uma Mensagem
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="h-px bg-border my-10" />

        <div className="flex gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com/Georgelucas-dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/george-lucas/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="mailto:george.lucas@example.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>

        <div className="mt-12 space-y-2">
          <p className="text-sm text-blue-500">
            * Focado em construir projetos reais, não apenas estudar teoria.
          </p>

          <p className="text-sm text-blue-500">
            ** Apaixonado por IA, LLMs e desenvolvimento web moderno.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default MobileAbout;
