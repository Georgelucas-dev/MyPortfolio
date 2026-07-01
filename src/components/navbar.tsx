import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { House, User, FolderGit2, Mail } from "lucide-react";
import { useHero } from "@/context/HeroContext";
import { motion } from "motion/react";

function Navbar() {
  const links = [
    {
      label: "Home",
      href: "#home",
      icon: House,
    },
    {
      label: "About",
      href: "#about",
      icon: User,
    },
    {
      label: "Projects",
      href: "#projects",
      icon: FolderGit2,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: Mail,
    },
  ];

  const { heroVisivel } = useHero();
  const expandida = heroVisivel;

  console.log(heroVisivel);

  const { theme, toggleTheme } = useTheme();

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

        <button
          onClick={toggleTheme}
          className="flex items-center gap-3"
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
            {theme === "light" ? "Dark" : "Light"}
          </motion.span>
        </button>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
