import Link from "next/link";
import Image from 'next/image';
interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendR2CategoryCard({ title, imageSrc, href = '#' }: CategoryCardProps) {
  return (
    <div className="flex flex-col w-[373px] h-[454px] bg-[#1F2636] rounded-[15px] border border-[#2F3A52] p-[26px] shrink-0">
      
     
      <div className="flex justify-between items-center w-full h-[27px] mb-1">
        <h2 className="font-sans font-bold text-[19px] text-[#E6EAF2]">
          {title}
        </h2>
        
     
        <Link 
          href={href} 
          className="flex items-center gap-1 text-[14px] text-[#E6EAF2] font-bold !opacity-10 hover:!opacity-100 transition-opacity">
          More 
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Контейнер для изображения */}
     
      <div className="relative w-[321px] h-[371px] rounded-[10px] overflow-hidden mt-1">
         <Image
          src={imageSrc}
          alt={`Category ${title}`}
          fill
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, 321px"
        /> 
      </div>
      
    </div>
  );
}