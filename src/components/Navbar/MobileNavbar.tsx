import { House, User, FolderGit2, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

function MobileNavbar() {
  const { theme, toggleTheme } = useTheme();

  const links = [
    {
      href: "#home",
      icon: House,
    },
    {
      href: "#about",
      icon: User,
    },
    {
      href: "#projects",
      icon: FolderGit2,
    },
    {
      href: "#contact",
      icon: Mail,
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-4
        left-1/2
        -translate-x-1/2
        z-50

        flex
        items-center
        gap-6

        rounded-full
        border
        bg-background/80
        backdrop-blur-lg

        px-6
        py-5

        shadow-lg
      "
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.href}
            href={link.href}
            className="transition-transform hover:scale-110"
          >
            <Icon size={20} />
          </a>
        );
      })}

      <button
        onClick={toggleTheme}
        className="transition-transform hover:scale-110"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  );
}

export default MobileNavbar;
