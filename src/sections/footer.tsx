function Footer() {
  const year = new Date().getFullYear();

  const time = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

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
                  All Rights Reserved.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <a
                  href="#"
                  className="block transition-opacity hover:opacity-60"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="block transition-opacity hover:opacity-60"
                >
                  Terms & Conditions
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

                <p className="mt-2 text-lg">Now, {time} BRT</p>
              </div>

              <div className="space-y-1 text-muted-foreground">
                <p>Mon to Fri, 9AM – 6PM</p>
                <p>Currently available for selected projects.</p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4 md:text-right">
              <div>
                <p className="text-muted-foreground">Based in Brazil</p>
              </div>

              <div className="space-y-1 font-mono text-sm text-muted-foreground">
                <p>23.5505° S</p>
                <p>46.6333° W</p>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div className="relative h-24 md:h-40 overflow-hidden border-t border-border/60 flex justify-center items-end">
            <h1
              className="
      whitespace-nowrap
      font-black
      uppercase
      leading-none
      tracking-[-0.08em]

      text-[20vw]
      md:text-[11vw]

      mb-[-0.45em]
      md:mb-[-0.5em]
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
