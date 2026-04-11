import Link from "next/link";
import Image from 'next/image';
interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendR3CategoryCard({ title, imageSrc, href = '#' }: CategoryCardProps) {
  return (
    <div className="
      flex flex-col bg-surface-11 rounded-[15px] border border-main p-[26px] shrink-0
     
      w-full md:w-[373px] h-[486px] md:h-[454px]
    ">
      <div className="flex justify-between items-center w-full h-[27px] mb-1">
        <h2 className="font-sans font-bold text-[19px] text-main-p-text">{title}</h2>
        <Link href={href} className="text-[14px] text-gray-600 font-bold hover:text-main-p-text">
          More &rarr;
        </Link>
      </div>


      <div className="relative w-full max-w-[321px] h-[371px] mx-auto rounded-[10px] overflow-hidden mt-1">
         <Image src={imageSrc} alt={title} fill className="object-cover" /> 
      </div>
    </div>
  );
}