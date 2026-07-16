import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, House, User, FolderGit2, Mail } from "lucide-react";
import { motion } from "motion/react";

function MobileNavbar() {
  const links = [
    { label: "Início", href: "#home", icon: House },
    { label: "Sobre", href: "#about", icon: User },
    { label: "Projetos", href: "#projects", icon: FolderGit2 },
    { label: "Contato", href: "#contact", icon: Mail },
  ];

  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as any;
    if (!doc.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${endRadius}px`);

    doc.startViewTransition(() => {
      toggleTheme();
    });
  };

  return (
    <nav
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
      className="
        fixed
        left-1/2
        -translate-x-1/2
        z-[9999]
        w-[calc(100%-2rem)]
        max-w-md
        md:hidden
      "
    >
      {/* 
        A MÁGICA ESTÁ AQUI: 
        Animamos apenas a div interna para não quebrar a centralização da tag <nav>.
        Ela começa 120px para baixo (escondida) e sobe suavemente com um efeito de mola.
      */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          mass: 0.8,
          stiffness: 200,
          damping: 20,
          delay: 0.3, // Um pequeno respiro de 300ms antes de surgir
        }}
        className="
          flex 
          items-center 
          justify-between 
          bg-background/80 
          backdrop-blur-xl 
          border 
          border-border/50 
          rounded-full 
          px-4 
          h-16 
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        "
      >
        <div className="flex items-center justify-around flex-1 pr-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.href}
                href={link.href}
                className="
                  flex 
                  items-center 
                  justify-center 
                  w-11 
                  h-11 
                  rounded-full 
                  text-ink-soft 
                  hover:text-ink
                  active:scale-90 
                  active:bg-ink/5 
                  transition-all
                "
              >
                <Icon size={20} className="stroke-[1.75]" />
                <span className="sr-only">{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="w-px h-6 bg-border/80" />

        <button
          onClick={handleThemeChange}
          className="
            flex 
            items-center 
            justify-center 
            w-11 
            h-11 
            rounded-full 
            text-ink-soft
            hover:text-ink
            active:scale-90 
            active:bg-ink/5
            cursor-pointer 
            transition-all
            pl-2
          "
        >
          {theme === "light" ? (
            <Moon size={20} className="stroke-[1.75]" />
          ) : (
            <Sun size={20} className="stroke-[1.75]" />
          )}
        </button>
      </motion.div>
    </nav>
  );
}

export default MobileNavbar;
