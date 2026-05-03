"use client";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ProductThumbnail({
  src,
  alt,
  selected = false,
  onClick,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className="
        w-[50px] h-[50px] rounded-[10px] shrink-0 cursor-pointer
        overflow-hidden relative
      "
    >
      <img
        src={src || ""}
        alt={alt || ""}
        className="w-full h-full object-cover object-center"
      />

      {selected && (
        <div className="absolute inset-0 border-2 border-accent pointer-events-none rounded-[10px]" />
      )}
    </button>
  );
}