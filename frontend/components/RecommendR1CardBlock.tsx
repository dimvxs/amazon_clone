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
      className="flex flex-col w-[373px] h-[383px] rounded-[15px] border shrink-0 shadow-xl"
      style={{ backgroundColor: '#1F2636', borderColor: '#2F3A52', padding: '20px 28px 28px 28px' }}
    >
      <h2 className="text-white font-sans font-bold text-[24px] mb-[12px] leading-[27px]">
        {mainTitle}
      </h2>

      <div className="grid grid-cols-2 gap-x-[28px] gap-y-[12px]">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-[5px] w-[146px]">
            
           
            <div 
              className="relative w-[146px] h-[120px] rounded-[10px] overflow-hidden"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
                sizes="146px"
              />
            </div>

           
            <span 
              className="font-sans text-[16px] leading-[18px] truncate"
              style={{ color: '#E6EAF2', opacity: 0.5 }} 
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}