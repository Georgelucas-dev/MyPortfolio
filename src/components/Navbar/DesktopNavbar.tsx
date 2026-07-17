// src/components/DesktopNavbar.tsx
import { House, User, FolderGit2, Mail } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "motion/react";

function DesktopNavbar() {
  const links = [
    { label: "Início", href: "#home", icon: House },
    { label: "Sobre", href: "#about", icon: User },
    { label: "Projetos", href: "#projects", icon: FolderGit2 },
    { label: "Contato", href: "#contact", icon: Mail },
  ];

  const { heroVisivel } = useHero();
  const expandida = heroVisivel;

  return (
    <motion.nav
      animate={{
        width: expandida ? 190 : 72,
        left: expandida ? 32 : 16,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-0 h-screen flex z-[9999] items-center overflow-hidden"
    >
      <ul className="flex flex-col gap-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex items-center w-fit text-ink-soft hover:text-ink transition-colors duration-200 font-mono text-xs uppercase tracking-widest"
              >
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  <Icon size={18} />
                </div>

                <motion.span
                  initial={false}
                  animate={{
                    opacity: expandida ? 1 : 0,
                    width: expandida ? "auto" : 0,
                    marginLeft: expandida ? 16 : 0,
                    x: expandida ? 0 : -10,
                  }}
                  transition={{ duration: 0.25 }}
                  className="whitespace-nowrap overflow-hidden block"
                >
                  {link.label}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

export default DesktopNavbar;