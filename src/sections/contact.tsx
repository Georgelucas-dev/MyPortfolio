// sections/contact.tsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animação usando clip-path em vez de scale.
      // Resolve FOUC e não causa pixelização ou estouro de layout.
      tl.fromTo(
        circleRef.current,
        {
          clipPath: () => `circle(${window.innerWidth * 0.05}px at 50% 100%)`,
        },
        {
          clipPath: () => {
            // Pega a maior dimensão da tela e multiplica por 1.5
            // para garantir que o raio cubra até o topo do celular
            const maxDim = Math.max(window.innerWidth, window.innerHeight);
            return `circle(${maxDim * 1.5}px at 50% 100%)`;
          },
          ease: "power2.inOut",
        },
        0,
      );

      tl.fromTo(
        titleRef.current,
        { x: "100%" },
        {
          x: 0,
          ease: "power2.out",
        },
        0,
      );

      tl.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0.3,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-x-clip bg-background">
      <section
        id="contato" data-theme="light"
        ref={containerRef}
        className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center"
      >
        {/* 
          A BOLA GIGANTE AGORA USA CLIP-PATH
          Ela ocupa o exato tamanho da tela, mas a máscara esconde tudo.
          O FOUC é eliminado porque o estado inicial está engessado no atributo style.
        */}
        <div
          ref={circleRef}
          className="absolute inset-0 bg-foreground will-change-[clip-path]"
          style={{ clipPath: "circle(5vw at 50% 100%)" }}
        />

        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-24 pb-12 text-background pointer-events-none">
          <div className="flex-1 flex items-center">
            <h2
              ref={titleRef}
              className="font-display font-bold text-[14vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap will-change-transform"
            >
              Contato
            </h2>
          </div>

          <div
            ref={linksRef}
            className="flex flex-col gap-1 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold will-change-transform pointer-events-auto"
          >
            <a
              href="https://wa.me/55SEUNUMEROAQUI"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              WhatsApp
            </a>
            <a
              href="mailto:seuemail@gmail.com"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              Gmail
            </a>
            <a
              href="https://github.com/seugithub"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/seulinkedin"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity w-fit py-1"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
