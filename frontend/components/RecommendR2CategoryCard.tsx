import Link from "next/link";
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
  isDoubleMobile?: boolean;
  secondItem?: { title: string; imageSrc: string };
  hideOnMobile?: boolean;
}

export default function RecommendR2CategoryCard({ 
  title, 
  imageSrc, 
  href = '#', 
  isDoubleMobile = false, 
  secondItem,
  hideOnMobile = false
}: CategoryCardProps) {
  
  
  const RenderItem = (itemTitle: string, itemImg: string, mode: 'double' | 'single') => (
    <div className="flex flex-col w-full h-full min-h-0">
      
      <div className="flex justify-between items-center w-full mb-2 shrink-0 gap-2">
        <h2 className="font-sans font-bold text-[16px] md:text-[19px] text-[#E6EAF2] truncate">
          {itemTitle}
        </h2>
        <Link 
          href={href} 
          className="text-[14px] text-[#E6EAF2] font-bold opacity-30 hover:opacity-100 transition-opacity shrink-0"
        >
          More &rarr;
        </Link>
      </div>

      
      <div className={`
        relative w-full rounded-[10px] overflow-hidden bg-white/5
        ${mode === 'double' ? 'h-[140px] shrink-0' : 'flex-1 min-h-0'} 
      `}>
        <Image 
          src={itemImg} 
          alt={itemTitle} 
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, 373px"
        />
      </div>
    </div>
  );

  return (
    <div className={`
      ${hideOnMobile ? 'hidden md:flex' : 'flex'} 
      flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] p-[20px] shrink-0
      
      /* Адаптив размеров */
      w-[calc(100vw-32px)] h-auto min-h-[402px]
      md:w-full md:max-w-[373px] md:h-[454px] md:p-[26px]
    `}>
      
      {isDoubleMobile && secondItem ? (
        <div className="h-full w-full flex flex-col">
         
          <div className="hidden md:flex flex-col h-full w-full">
            {RenderItem(title, imageSrc, 'single')}
          </div>
          
         
          <div className="flex flex-col gap-6 w-full h-full md:hidden">
            {RenderItem(title, imageSrc, 'double')}
            {RenderItem(secondItem.title, secondItem.imageSrc, 'double')}
          </div>
        </div>
      ) : (
        
        <div className="h-full w-full">
          {RenderItem(title, imageSrc, 'single')}
        </div>
      )}
      
    </div>
  );
}