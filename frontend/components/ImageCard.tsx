import Image from "next/image";

type ImageCardProps = {
  label: string;
  image?: string;
  onClick?: () => void;
};

export default function ImageCard({ label, image, onClick }: ImageCardProps) {
  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
      <div className="w-full aspect-[146/120] bg-gray-200 rounded-[10px] overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={label}
            width={146}
            height={120}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <span className="text-category-card mt-[8px]">{label}</span>
    </div>
  );
}
