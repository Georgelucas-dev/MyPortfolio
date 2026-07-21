import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesCards } from "../../data/services-cards";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-bounce">
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
              >
                <span className="split-word inline-block will-change-transform">
                  {word}
                  {wi < words.length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

export function ServicesSectionMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = String(servicesCards.length).padStart(2, "0");

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".service-wrapper");
      wrappers.forEach((wrapper) => {
        const words = wrapper.querySelectorAll(".split-word");
        if (!words.length) return;

        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="servicos"
      data-theme="dark"
      className="relative w-full bg-background"
    >
      {/* Tela de abertura */}
      <section className="relative w-full min-h-[70vh] bg-background text-foreground flex flex-col justify-between px-6 pt-12 pb-12">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            O que eu ofereço
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {total} serviços
          </span>
        </div>

        <div className="my-auto py-12">
          <h2 className="font-display font-medium text-[14vw] sm:text-[11vw] leading-[0.85] tracking-tighter">
            Meus
            <br />
            Serviços
          </h2>
        </div>

        <div className="flex flex-col justify-between items-start gap-6">
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Do primeiro esboço à entrega final — cada projeto combina design,
            código e performance sob medida para o seu negócio.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs uppercase tracking-widest">
            <ArrowDownIcon />
            <span>Role para explorar</span>
          </div>
        </div>
      </section>

      {/* Cards em fluxo normal, sem sticky, sem sombras, sem margens */}
      <div className="flex flex-col gap-0 pb-[20vh]">
        {servicesCards.map((service) => (
          <div key={service.id} className="service-wrapper w-full m-0 p-0">
            <section
              className={`service-inner w-full p-6 flex flex-col justify-between ${service.bgClass} ${service.textClass}`}
            >
              <div className="flex justify-between items-center pb-4">
                <span className="font-mono text-xs uppercase tracking-widest opacity-80">
                  {service.label}
                </span>
              </div>

              <div className="flex flex-col gap-4 my-auto py-4">
                <h2 className="font-display font-medium text-3xl leading-[0.9] tracking-tighter">
                  <SplitWords text={service.title} />
                </h2>
                <p className="text-sm leading-relaxed opacity-90">
                  {service.text1}
                </p>
                <p className="text-xs leading-relaxed opacity-75">
                  {service.text2}
                </p>
              </div>

              <div className="flex justify-between items-end pt-4">
                <button className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight hover:opacity-75 transition-opacity">
                  <span>{service.actionText}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
