interface ImageGrayProps {
  src: string;
  grayscale?: boolean;
}

export default function ImageGray({ src, grayscale = true }: ImageGrayProps) {
  return (
    <img
      src={src}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover ${
        grayscale ? "filter grayscale contrast-110" : ""
      }`}
      draggable={false}
    />
  );
}
