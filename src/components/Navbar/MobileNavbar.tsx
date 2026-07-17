import { House, User, FolderGit2, Mail } from "lucide-react";
import { motion } from "motion/react";

function MobileNavbar() {
  const links = [
    { label: "Início", href: "#home", icon: House },
    { label: "Sobre", href: "#about", icon: User },
    { label: "Projetos", href: "#projects", icon: FolderGit2 },
    { label: "Contato", href: "#contact", icon: Mail },
  ];

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
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          mass: 0.8,
          stiffness: 200,
          damping: 20,
          delay: 0.3,
        }}
        className="
          flex 
          items-center 
          justify-around 
          bg-background/80 
          backdrop-blur-xl 
          border 
          border-border/50 
          rounded-full 
          px-4 
          h-16 
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        "
      >
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
      </motion.div>
    </nav>
  );
}

export default MobileNavbar;