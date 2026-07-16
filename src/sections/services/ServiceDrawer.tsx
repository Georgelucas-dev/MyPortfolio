// src/components/services/ServiceDrawer.tsx
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Service } from "../../data/services-data";

interface ServiceDrawerProps {
  service: Service;
  onClose: () => void;
}

export function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 h-[100dvh] w-[100vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] z-[10001] text-white bg-gradient-to-b ${service.drawerGradient} shadow-2xl overflow-y-auto transform-gpu`}
      >
        <div
          className="flex flex-col min-h-full p-6 md:p-8"
          style={{
            paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight">
              {service.title}
            </h3>
            <button
              onClick={onClose}
              className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 active:scale-95 transition duration-200"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1 py-6">
            <div className="flex flex-col gap-3">
              <p className="text-base md:text-lg font-medium leading-relaxed">
                {service.tagline}
              </p>
              <p className="text-sm md:text-sm text-white/70 leading-relaxed font-sans">
                {service.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 font-display text-xl md:text-2xl font-extrabold tracking-tight mt-2">
              {service.items.map((item, index) => (
                <span
                  key={index}
                  className="block hover:translate-x-2 transition-transform duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 w-full pt-4 border-t border-white/10 mt-auto">
            <button className="flex-1 py-3 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 active:scale-98 transition duration-200 text-sm md:text-base">
              Get in touch
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/25 active:scale-98 border border-white/10 rounded-2xl transition duration-200">
              <span className="font-semibold text-sm">TG</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>,
    document.body,
  );
}
