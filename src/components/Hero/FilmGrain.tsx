export default function FilmGrain() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 opacity-30 mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
