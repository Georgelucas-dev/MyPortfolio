import { useRef, useState } from "react";
import ImageGray from "./ImageGray";
import RevealLayer from "./RevealLayer";

interface ImageRevealContainerProps {
  imageSrc: string;
  enableReveal?: boolean;
}

export default function ImageRevealContainer({
  imageSrc,
  enableReveal = true,
}: ImageRevealContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (!enableReveal || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Atualiza imediatamente a posição atual para o local de entrada.
    // Isso evita que o revelador venha "voando" de (-200, -200) e faça
    // a transição de scale() exatamente no ponto do cursor.
    targetPos.current = { x, y };
    currentPos.current = { x, y };

    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    if (!enableReveal) return;
    setIsHovering(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!enableReveal || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current.x = e.clientX - rect.left;
    targetPos.current.y = e.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${
        enableReveal ? "cursor-none" : ""
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ImageGray src={imageSrc} grayscale={enableReveal} />
      {enableReveal && (
        <RevealLayer
          imageSrc={imageSrc}
          containerRef={containerRef}
          isHovering={isHovering}
          targetPos={targetPos}
          currentPos={currentPos}
        />
      )}
    </div>
  );
}
