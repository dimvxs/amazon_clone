import Image from 'next/image';

interface CardProps {
  title: string;
  price: string;
  imageSrc: string;
  href?: string;
}

export default function CatalogSliderCard({ 
  title,  
  price, 
  imageSrc, 
  href = '#' 
}: CardProps) {
  return (
    <div className="flex flex-col w-[258px] h-[366px] flex-shrink-0 gap-[10px]">
        {/* Изображение (img) */}
        <div className="relative w-[258px] h-[258px] rounded-[15px] border border-[#2F3A52] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
        <p className="font-sans font-bold text-[20px] tracking-normal leading-[27px] text-[#E6ECF5]">
        {title}
        </p>   
        <div className="flex flex-row w-[95px] h-[34px]">
        <span className="text-[36px] font-bold text-[#E6ECF5B2]">$</span>
        <span className="text-[36px] font-bold text-[#E6ECF5B2] ">{price}</span>
        </div>
        </div>
    </div>
  );
}