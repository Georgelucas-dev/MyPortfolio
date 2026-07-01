// sections/contact.tsx
import { useState, type FormEvent } from "react";

import { motion } from "motion/react";

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/SEU_ID_AQUI", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("sent");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-background text-foreground font-sans lg:px-30 px-6 py-24 flex flex-col justify-center">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <p className="text-4xl text-zinc-500 mb-4">Contact</p>
      <h2 className="text-5xl font-bold mb-16 max-w-xl">
        Vamos conversar sobre seu próximo projeto.
      </h2>

      <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b-2 border-zinc-300 pb-2">
          <label htmlFor="name" className="text-xs text-zinc-500">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="bg-transparent text-lg outline-none placeholder:text-zinc-400"
            placeholder="Seu nome"
          />
        </div>

        <div className="flex flex-col gap-2 border-b-2 border-zinc-300 pb-2">
          <label htmlFor="email" className="text-xs text-zinc-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="bg-transparent text-lg outline-none placeholder:text-zinc-400"
            placeholder="voce@email.com"
          />
        </div>

        <div className="flex flex-col gap-2 border-b-2 border-zinc-300 pb-2">
          <label htmlFor="message" className="text-xs text-zinc-500">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={3}
            className="bg-transparent text-lg outline-none resize-none placeholder:text-zinc-400"
            placeholder="Conta um pouco sobre o projeto..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="self-start text-sm border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensagem →"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-zinc-500">Mensagem enviada. Te respondo em breve.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">Algo deu errado. Tenta de novo ou manda um email direto.</p>
        )}
        </form>
      </motion.div>
    </section>
  );
}

export default Contact;