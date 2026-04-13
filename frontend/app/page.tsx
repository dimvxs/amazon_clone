import Image from "next/image";
import SalesBanner from "@/components/SalesBanner";
import RecommendRow3 from "@/components/RecommendRow3";
import RecommendRow2 from "@/components/RecommendRow2";
import RecommendRow1 from "@/components/RecommendRow1";
import BestSellersBanner from "@/components/BestSellersBanner";
import CatalogSlider from "@/components/CatalogSlider";

export default function Home() {
  return (
   
    <div className="relative min-h-screen bg-[#131921] flex flex-col items-center font-sans overflow-x-hidden" style={{ backgroundColor: '#070913' }}>
      
    
      <div className="absolute top-0 left-0 w-full h-[1024px] z-[1] pointer-events-none">
        <Image
          src="/images-temp/bg-stars.png"
          alt="Stars background"
          fill
          className="object-cover"
          priority
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-[400px] z-[2]" 
          style={{ 
            background: 'linear-gradient(to bottom, transparent, #070913)' 
          }} 
        />
      </div>

      {/* Контентный слой */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[40px] gap-[40px]">
        <RecommendRow1 />
        
        <BestSellersBanner
          title="Best Sellers in Grocery & Gourmet Food"
          imageSrc="/images-temp/best_sellers.jpg" 
          href="#" 
        />
        
        <RecommendRow2 />
        
        <CatalogSlider/>
        
        <SalesBanner
          title="banner"
          imageSrc="/images-temp/sales.jpg" 
          href="#" 
        />
        
        <RecommendRow3 />
        
        <div className="pb-[80px]" />
      </div>
    </div>
  );
}