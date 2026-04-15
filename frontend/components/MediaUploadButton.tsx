import { useRef } from "react";
import Image from "next/image";

type MediaUploadButtonProps = {
  icon: any;
  alt: string;
  type: "image" | "video";
  onFilesSelect?: (files: File[]) => void;
};
export default function MediaUploadButton({
  icon,
  alt,
  type,
  onFilesSelect,
}: MediaUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !onFilesSelect) return;

    onFilesSelect(Array.from(files));
  };

  const accept = type === "image" ? "image/*" : "video/*";

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handleClick}
        className="w-[72px] h-[72px] bg-white flex items-center justify-center"
      >
        <Image src={icon} alt={alt} width={34} height={34} />
      </button>
    </>
  );
}
