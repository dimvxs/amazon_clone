import Link from "next/link";
import Image from 'next/image';

interface CategoryData {
  type: "category";
  title: string;
  imageSrc: string;
  url: string;
}

interface CategoryCardProps {
  category: CategoryData;
}

export default function RecommendR3CategoryCard({ category }: CategoryCardProps) {
  const { title, imageSrc, url = '#' } = category;

  return (
    <div className="flex flex-col bg-surface-11 rounded-[15px] border border-main p-[26px] w-full h-[454px] md:h-full">
      {/* Шапка карточки */}
      <div className="flex justify-between items-center w-full mb-[16px] shrink-0">
        <h2 className="font-sans font-bold text-[19px] text-main-p-text truncate mr-2">
          {title}
        </h2>
        <Link href={url} className="text-[14px] text-gray-600 font-bold hover:text-main-p-text shrink-0 whitespace-nowrap">
          More &rarr;
        </Link>
      </div>

      {/* 
        Контейнер изображения изменен на flex-1. 
        Теперь картинка идеально занимает всё оставшееся пространство карточки, 
        не выдавливая шапку и не ломая высоту h-[454px]
      */}
      <div className="relative flex-1 w-full overflow-hidden rounded-[10px]">
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