import Image from "next/image";
import SalesBanner from "@/components/SalesBanner";
import RecommendRow3 from "@/components/RecommendRow3";
import RecommendRow2 from "@/components/RecommendRow2";
import RecommendRow1 from "@/components/RecommendRow1";
import BestSellersBanner from "@/components/BestSellersBanner";
import CatalogSlider from "@/components/CatalogSlider";

export default function Home() {
  return (
    /* Внешний слой: Темный фон на всю высоту, центрирует содержимое */
    <div className="relative min-h-screen bg-[#131921] flex flex-col items-center font-sans overflow-x-hidden" style={{ backgroundColor: '#070913' }}>
      <div className="absolute top-0 left-0 w-full h-[1024px] z-[1] pointer-events-none">
        <Image
          src="/images-temp/bg-stars.png"
          alt="Stars background"
          fill
          className="object-cover"
          priority
          
          
        />
        
        {/* 2. СИНИЙ НАЛЕТ (Rectangle 41) поверх фото */}
        {/* <div 
          className="absolute inset-0" 
          style={{ backgroundColor: '#0B1020', opacity: 0.55 }} 
        /> */}
        
        {/* 3. ГРАДИЕНТ (чтобы фото плавно переходило в цвет фона при прокрутке) */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[400px] z-[2]" 
          style={{ 
            background: 'linear-gradient(to bottom, transparent, #070913)' 
          }} 
        />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center pt-[40px] gap-[40px]">
        <RecommendRow1 />
        <BestSellersBanner
        title="Best Sellers in Grocery & Gourmet Food"
        imageSrc="/images-temp/best_sellers.jpg" 
        href="#" />
        <RecommendRow2 />
        <CatalogSlider/>
        <SalesBanner
        title="banner"
        imageSrc="/images-temp/sales.jpg" 
        href="#" />
        <RecommendRow3 />
        
        {/* Запас места снизу, чтобы проверить, как фото уходит вверх при скролле */}
        <div className="h-[1000px] w-full" />
      </div>
     
      </div>
   
  );
}