import { useRealTime } from "@/hooks/useRealTime";

function Footer() {
  const year = new Date().getFullYear();
  const time = useRealTime();

  return (
    <footer className="relative mt-40 bg-background pb-32 md:pb-14">
      <div className="mx-3 md:mx-30">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-background backdrop-blur-xl">
          {/* Conteúdo */}
          <div className="grid gap-10 p-6 md:grid-cols-3 md:p-10">
            {/* Left */}
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  © {year}
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-wide">
                  G. L. DESIGN
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Todos os direitos reservados.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block transition-opacity hover:opacity-60"
                >
                  Política de Privacidade
                </a>

                <a
                  href="#"
                  className="block transition-opacity hover:opacity-60"
                >
                  Termos e condições
                </a>

                <a
                  href="#"
                  className="block transition-opacity hover:opacity-60"
                >
                  Site Map
                </a>
              </div>
            </div>

            {/* Middle */}
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  ( ONLINE )
                </p>

                <p className="mt-2 text-lg">Agora, {time} BRT</p>
              </div>

              <div className="space-y-1 text-muted-foreground">
                <p>Seg a Sex, 9AM – 6PM</p>
                <p>Atualmente disponível para projetos selecionados.</p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4 md:text-right">
              <div>
                <p className="text-muted-foreground">Based in Brazil</p>
              </div>

              <div className="space-y-1 font-mono text-sm text-muted-foreground">
                <p>27° 06' 17" S</p>
                <p>52° 36' 51" W</p>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div 
            className="relative w-full overflow-hidden border-t border-border/60 pt-6 md:pt-10"
            style={{ containerType: "inline-size" }}
          >
            <h1
              className="
                w-full
                text-center
                whitespace-nowrap
                font-black
                uppercase
                leading-none
                tracking-[-0.08em]
                
                /* Tamanho dinâmico baseado na largura do contêiner e não da tela */
                text-[14.2cqw]
                
                /* Empurra o texto para baixo para criar o efeito de corte na base */
                translate-y-[35%]
              "
            >
              GEORGE&nbsp;LUCAS
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;