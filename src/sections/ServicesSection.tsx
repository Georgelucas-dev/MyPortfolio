import { motion } from "motion/react";
import { servicesCards } from "../../src/data/services-cards";

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

export function ServicesSection() {
  const total = String(servicesCards.length).padStart(2, "0");

  return (
    <div className="relative w-full">
      {/* Tela de abertura — não é sticky, só rola normalmente antes dos cards */}
      <section className="relative w-full min-h-[100svh] bg-background text-foreground flex flex-col justify-between px-6 md:px-12 pt-12 md:pt-16 pb-12">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
            O que eu ofereço
          </span>
          <span className="font-mono text-xs md:text-sm text-muted-foreground">
            {total} serviços
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <h2 className="font-display font-medium text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tighter">
            Meus
            <br />
            Serviços
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
            Do primeiro esboço à entrega final — cada projeto combina design,
            código e performance sob medida pro que o seu negócio precisa.
          </p>

          <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs uppercase tracking-widest">
            <ArrowDownIcon />
            <span>Role para explorar</span>
          </div>
        </div>
      </section>

      {servicesCards.map((service, index) => (
        <section
          key={service.id}
          className={`relative lg:sticky lg:top-0 w-full min-h-[100svh] lg:h-[100svh] flex flex-col justify-between overflow-hidden ${service.bgColor} ${service.textColor}`}
          style={{ zIndex: index + 1 }}
        >
          <div className="flex-1 px-6 md:px-12 pb-8 lg:pb-16 pt-12 md:pt-16 flex justify-between items-start">
            <h2 className="font-display font-medium text-2xl sm:text-7xl md:text-6xl lg:text-[5rem] xl:text-[7rem] leading-[0.85] tracking-tighter whitespace-pre-line">
              {service.title}
            </h2>
            <span
              className={`font-display font-medium text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] leading-[0.85] tracking-tighter ${service.numberColor}`}
            >
              {service.id}
            </span>
          </div>

          <div
            className={`h-auto lg:h-[40%] border-t ${service.borderColor} grid grid-cols-1 lg:grid-cols-12 mb-20 lg:mb-28`}
          >
            <div className="col-span-1 lg:col-span-8 p-6 md:p-10 lg:p-12 flex flex-col justify-between gap-10 lg:gap-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
                <div className="col-span-1">
                  <span className="text-sm font-medium uppercase tracking-widest opacity-90">
                    {service.label}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                    {service.text1}
                  </p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                    {service.text2}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 lg:pt-0">
                <button
                  className={`pb-1 border-b ${service.borderColor} hover:opacity-60 transition-opacity text-sm font-medium`}
                >
                  {service.actionText}
                </button>
              </div>
            </div>

            <div
              className={`col-span-1 lg:col-span-4 relative border-t lg:border-t-0 lg:border-l ${service.borderColor} bg-black/5 flex items-end justify-center min-h-[25vh] lg:min-h-full overflow-hidden`}
            >
              <div className="w-[85%] h-[80%] bg-[#111] mt-8 rounded-t-xl shadow-2xl border border-white/10 flex items-center justify-center relative">
                <span className="text-white/30 text-xs">Image / Mockup</span>
                <div className="absolute -bottom-2 w-[110%] h-4 bg-[#222] rounded-b-xl shadow-xl"></div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
