import { useRef, useState } from "react";
import ImageGray from "./ImageGray";
import RevealLayer from "./RevealLayer";

interface ImageRevealContainerProps {
  imageSrc: string;
}

export default function ImageRevealContainer({
  imageSrc,
}: ImageRevealContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });

  const handlePointerEnter = () => setIsHovering(true);
  const handlePointerLeave = () => setIsHovering(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current.x = e.clientX - rect.left;
    targetPos.current.y = e.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-3xl overflow-hidden cursor-none"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ImageGray src={imageSrc} />
      <RevealLayer
        imageSrc={imageSrc}
        containerRef={containerRef}
        isHovering={isHovering}
        targetPos={targetPos}
        currentPos={currentPos}
      />
    </div>
  );
}
