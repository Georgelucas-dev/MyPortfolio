import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { House, User, FolderGit2, Mail } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "motion/react";

function DesktopNavbar() {
  const links = [
    {
      label: "Início",
      href: "#home",
      icon: House,
    },
    {
      label: "Sobre",
      href: "#about",
      icon: User,
    },
    {
      label: "Projetos",
      href: "#projects",
      icon: FolderGit2,
    },
    {
      label: "Contato",
      href: "#contact",
      icon: Mail,
    },
  ];

  const { heroVisivel } = useHero();
  const expandida = heroVisivel;

  const { theme, toggleTheme } = useTheme();

  // Função que intercepta o clique, calcula as coordenadas e dispara a transição global
  const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Suporte seguro para TypeScript e navegadores que não possuem a API
    const doc = document as any;
    if (!doc.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    // Calcula o raio perfeito para cobrir a tela toda a partir do ponto do clique
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    // Dispara a transição nativa enquanto o React altera o estado do tema
    doc.startViewTransition(() => {
      toggleTheme();
    });
  };

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
      className="
        fixed
        top-0
        h-screen
        flex
        z-[9999]
        items-center
        overflow-hidden
      "
    >
      <ul className="flex flex-col gap-6">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.href}>
              <a href={link.href} className="flex items-center gap-3">
                <Icon size={18} />

                <motion.span
                  animate={{
                    opacity: expandida ? 1 : 0,
                    x: expandida ? 0 : -10,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="whitespace-nowrap"
                >
                  {link.label}
                </motion.span>
              </a>
            </li>
          );
        })}

        {/* Botão atualizado para usar o handleThemeChange */}
        <button 
          onClick={handleThemeChange} 
          className="flex items-center gap-3 cursor-pointer hover:text-muted-foreground transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <motion.span
            animate={{
              opacity: expandida ? 1 : 0,
              x: expandida ? 0 : -10,
            }}
            transition={{
              duration: 0.25,
            }}
            className="whitespace-nowrap"
          >
            {theme === "light" ? "Escuro" : "Claro"}
          </motion.span>
        </button>
      </ul>
    </motion.nav>
  );
}

export default DesktopNavbar;