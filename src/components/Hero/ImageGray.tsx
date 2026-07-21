interface ImageGrayProps {
  src: string;
}

export default function ImageGray({ src }: ImageGrayProps) {
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110"
      draggable={false}
    />
  );
}
