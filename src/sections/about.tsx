// src/sections/AboutMe.tsx
import { useState } from "react";
import { aboutData } from "../data/about-data";

export function About() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="w-full bg-background text-ink py-16 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-10 md:items-start">
        {/* Imagem — mesma largura do texto no mobile, quadrada em qualquer breakpoint */}
        <div className="w-full md:col-span-3">
          <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
            <img
              src={aboutData.defaultImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: activeId ? 0 : 1 }}
            />

            {aboutData.images.map((img) => (
              <img
                key={img.id}
                src={img.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: activeId === img.id ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Texto */}
        <div className="md:col-span-9">
          <p className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-ink mb-4">
            {aboutData.eyebrow}
          </p>

          <p className="font-display text-base md:text-2xl lg:text-3xl leading-[1.4] tracking-tight">
            {aboutData.segments.map((segment, i) =>
              segment.type === "highlight" ? (
                <span
                  key={i}
                  onMouseEnter={() => setActiveId(segment.imageId)}
                  onMouseLeave={() => setActiveId(null)}
                  className="text-destructive underline decoration-destructive/40 underline-offset-4 decoration-2"
                >
                  {segment.content}
                </span>
              ) : (
                <span key={i}>{segment.content}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
