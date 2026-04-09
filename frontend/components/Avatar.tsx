import Image, { StaticImageData } from "next/image";
import placeholder from "@/assets/icons/placeholder.svg";
interface AvatarProps {
  src?: string | StaticImageData;
  alt?: string;
  size?: number; 
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = 70,
}: AvatarProps) {
  const imageSrc = src || placeholder;

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}