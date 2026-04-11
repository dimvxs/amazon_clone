import Image from 'next/image';

interface GridItem {
  title: string;
  imageSrc: string;
}

interface RecommendR1CardProps {
  mainTitle: string;
  items: GridItem[];
}

export default function RecommendR1CardBlock({ mainTitle, items = [] }: RecommendR1CardProps) {
  return (
    <div 
      className="flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] shrink-0 shadow-xl
      md:w-[373px] md:min-h-[383px]  md:p-[28px] md:gap-[12px]
      w-full min-h-[313px] p-[16px] gap-[10px]"
    >
      
      <h2 className="text-white font-sans font-bold text-[18px] md:text-[24px] leading-tight">
        {mainTitle}
      </h2>

     
      <div className="grid grid-cols-2 gap-x-[12px] md:gap-x-[28px] gap-y-[12px] max-md:gap-x-[6px] max-md:gap-y-[12px]">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-[5px] w-full ">
            
           
            <div className="relative w-full aspect-[70/84] md:w-[146px] md:h-[120px] rounded-[10px] overflow-hidden bg-white/5">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            
            <span className="font-sans text-[10px] md:text-[16px] leading-tight text-[#E6EAF2] opacity-50 truncate">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}