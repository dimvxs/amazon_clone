import Link from "next/link";
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendR3CategoryCard({ title, imageSrc, href = '#' }: CategoryCardProps) {
  return (
    <div className="flex flex-col bg-surface-11 rounded-[15px] border border-main p-[26px] w-full h-full">
      {/* Шапка карточки */}
      <div className="flex justify-between items-center w-full mb-[16px] shrink-0">
        <h2 className="font-sans font-bold text-[19px] text-main-p-text truncate mr-2">
          {title}
        </h2>
        <Link href={href} className="text-[14px] text-gray-600 font-bold hover:text-main-p-text shrink-0 whitespace-nowrap">
          More &rarr;
        </Link>
      </div>

      {/* Контейнер изображения с фиксированными пропорциями */}
      <div className="relative w-full aspect-[371/321] overflow-hidden rounded-[10px] mt-auto">
         <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        /> 
      </div>
    </div>
  );
}