export default function FilmGrain() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 opacity-70 mix-blend-soft-light">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="4"
            stitchTiles="stitch"
          />

          <feColorMatrix type="saturate" values="0" />

          <feComponentTransfer>
            <feFuncR type="linear" slope="1.8" intercept="-0.4" />
            <feFuncG type="linear" slope="1.8" intercept="-0.4" />
            <feFuncB type="linear" slope="1.8" intercept="-0.4" />
          </feComponentTransfer>
        </filter>

        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
