"use client";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
}

export default function ProductThumbnail({ src, alt }: ProductThumbnailProps) {
  return (
    <div className="w-[50px] h-[50px] rounded-[10px] bg-surface-1 shrink-0 flex items-center justify-center overflow-hidden">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
        />
      ) : null}
    </div>
  );
}