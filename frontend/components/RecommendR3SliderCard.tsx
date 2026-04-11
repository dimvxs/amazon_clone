import Link from "next/link";
import Image from 'next/image';

interface ProductSliderCardProps {
  requestTitle: string;
  productName: string;
  price: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendR3SliderCard({ 
  requestTitle, 
  productName, 
  price, 
  imageSrc, 
  href = '#' 
}: ProductSliderCardProps) {
  return (
    <div className="
      flex flex-col bg-surface-11 rounded-[15px] border border-[#2F3A52] overflow-hidden shrink-0 shadow-lg
      w-full md:w-[373px] h-[454px] max-md:h-[486px]">
      
      <div className="px-[26px] pt-[24px]">
        <h2 className="font-sans font-bold text-[20px] text-main-p-text leading-[27px]">
          {requestTitle}
        </h2>
      </div>


      <div className="relative flex-grow flex items-center justify-center">
        
        <button className="absolute left-[16px] z-10 w-[45px] h-[55px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center hover:bg-[#1A2030]/70 transition-colors">
          <svg width="20" height="34" className="md:w-[26px] md:h-[44px]" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4L6 22L22 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>


        <div className="relative w-[150px] h-[210px] md:w-[181px] md:h-[255px]">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            className="object-contain"
          />
        </div>


        <button className="absolute right-[16px] z-10 w-[45px] h-[55px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center hover:bg-[#1A2030]/70 transition-colors">
          <svg width="20" height="34" className="md:w-[26px] md:h-[44px]" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L20 22L4 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>


      <Link href={href} className="h-[112px] bg-[#1F2636] px-[26px] flex flex-col justify-center hover:bg-[#2A3347] transition-colors">
        <div className="text-white font-sans font-bold text-[18px] leading-[27px] mb-0.5 truncate">
          {productName}
        </div>
        
        <div className="text-white flex items-start">
          <span className="text-[20px] font-bold mt-1.5 mr-0.5">$</span>
          <span className="text-[36px] font-bold leading-none">{price}</span>
        </div>
      </Link>
      
    </div>
  );
}