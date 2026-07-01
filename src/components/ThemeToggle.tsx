import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  dark: boolean;
  toggle: () => void;
}

export function ThemeButton({ dark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        bg-background
        overflow-hidden
      "
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.div
            key="moon"
            initial={{
              rotate: -90,
              scale: 0,
              opacity: 0
            }}
            animate={{
              rotate: 0,
              scale: 1,
              opacity: 1
            }}
            exit={{
              rotate: 90,
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.45
            }}
          >
            <Moon size={22} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{
              rotate: 90,
              scale: 0,
              opacity: 0
            }}
            animate={{
              rotate: 0,
              scale: 1,
              opacity: 1
            }}
            exit={{
              rotate: -90,
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.45
            }}
          >
            <Sun size={22} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}