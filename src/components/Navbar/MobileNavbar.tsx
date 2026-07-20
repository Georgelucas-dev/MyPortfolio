// src/components/Navbar/MobileNavbar.tsx
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <header
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        className="fixed top-0 inset-x-0 z-[9999] md:hidden bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="flex items-center justify-between h-16 px-4">
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            George Lucas
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full border border-ink/20 text-xs text-ink"
            >
              Contato
            </a>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="relative h-8 w-8 flex items-center justify-center text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X size={22} strokeWidth={1.75} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu size={22} strokeWidth={1.75} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* O SPACER QUE ESTAVA AQUI FOI REMOVIDO PARA NÃO EMPURRAR O HERO */}

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9998] md:hidden bg-background flex flex-col"
              style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
            >
              {/* Este spacer interno continua aqui para o menu aberto ficar correto */}
              <div className="h-16 shrink-0" aria-hidden />

              <nav className="flex-1 relative overflow-hidden flex flex-col justify-center px-6">
                <ul className="flex flex-col">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 * i,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="border-t border-border/40 last:border-b"
                    >
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex items-center py-5 font-display text-4xl font-medium text-ink hover:text-ink-soft transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className="pointer-events-none select-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-display font-bold text-[22vw] leading-none text-ink/5 whitespace-nowrap"
                >
                  GEORGE
                </span>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default MobileNavbar;
