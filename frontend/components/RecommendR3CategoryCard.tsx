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
    <div className="flex flex-col bg-surface-11 rounded-[15px] border border-main p-[26px] w-full h-[454px] md:h-full overflow-hidden">

      <div className="flex justify-between items-center w-full mb-[16px] shrink-0">
        <h2 className="font-sans font-bold text-[19px] text-main-p-text truncate mr-2">
          {title}
        </h2>
        <Link href={url} className="text-[14px] text-gray-600 font-bold hover:text-main-p-text shrink-0 whitespace-nowrap">
          More &rarr;
        </Link>
      </div>

      {/* flex-1 и min-h-0 позволяют контейнеру уменьшаться, подстраиваясь под жесткую высоту карточки */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-[10px]">
         <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain object-center" 
        /> 
      </div>
    </div>
  );
}