// sections/projects.tsx

import { motion } from "motion/react";

interface Project {
  title: string;
  description: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Pitaya",
    description:
      "Assistente de voz full-stack com IA, TTS local e roteamento de agentes por terminal.",
    year: "2026",
    tags: ["Node", "React", "PostgreSQL"],
  },
  {
    title: "BancoJS",
    description:
      "Sistema bancário orientado a objetos, construído como exercício de mentoria em JavaScript.",
    year: "2025",
    tags: ["JavaScript", "OOP"],
  },
  {
    title: "Este portfolio",
    description:
      "O site que você está vendo agora — layout minimalista, construído do zero.",
    year: "2026",
    tags: ["React", "Tailwind"],
  },
];

function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-background text-foreground font-sans lg:px-30 px-6 py-24">

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

      <p className="text-4xl text-zinc-500 mb-16">Projects</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-16 gap-y-20">
        {projects.map((project) => (
          <div key={project.title} className="group cursor-pointer">
            <div className="flex items-baseline justify-between mb-3 border-b-2 border-zinc-300 pb-3">
              <h3 className="text-4xl font-bold group-hover:text-zinc-500 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm text-zinc-500">{project.year}</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-95 mb-3">
              {project.description}
            </p>
            <div className="flex gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;
