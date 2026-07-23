// components/FitText.tsx
import { useRef, useLayoutEffect, useCallback, useState } from "react";

interface FitTextProps {
  children: React.ReactNode;
  className?: string;
  maxFontSize?: number;
  minFontSize?: number;
}

export default function FitText({
  children,
  className = "",
  maxFontSize,
  minFontSize,
}: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number>(100);

  const baseFontSize = 100; // tamanho de referência para medição

  const updateFontSize = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.clientWidth;
    measure.style.fontSize = `${baseFontSize}px`;
    const measureWidth = measure.scrollWidth;

    if (measureWidth === 0) return;

    const targetWidth = containerWidth * 0.985;
    const scale = targetWidth / measureWidth;
    let newSize = baseFontSize * scale;

    if (maxFontSize !== undefined) newSize = Math.min(newSize, maxFontSize);
    if (minFontSize !== undefined) newSize = Math.max(newSize, minFontSize);

    setFontSize(newSize);
  }, [maxFontSize, minFontSize]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => updateFontSize());
    observer.observe(container);
    updateFontSize();

    document.fonts?.ready.then(() => updateFontSize());

    return () => observer.disconnect();
  }, [updateFontSize]);

  return (
    <div ref={containerRef} className="w-full overflow-visible">
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${className}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </span>
      <span
        ref={measureRef}
        className={`absolute invisible whitespace-nowrap ${className}`}
        style={{ fontSize: `${baseFontSize}px` }}
        aria-hidden="true"
      >
        {children}
      </span>
    </div>
  );
}
