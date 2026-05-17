import Image from "next/image";
import promises from "fs/promises";
import path from "path";

import SalesBanner from "@/components/SalesBanner";
import RecommendRow1 from "@/components/RecommendRow1";
import RecommendRow2 from "@/components/RecommendRow2";
import RecommendRow3 from "@/components/RecommendRow3";
import BestSellersBanner from "@/components/BestSellersBanner";
import CatalogSlider from "@/components/CatalogSlider";

async function getHomepageData() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "homepage.json");
    const jsonData = await promises.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to read homepage.json:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    return <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center">Error loading page data.</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center font-sans overflow-x-hidden" style={{ backgroundColor: '#070913' }}>
      
      {/* Динамический бэкграунд из JSON */}
      <div className="absolute top-0 left-0 w-full h-[1024px] z-[1] pointer-events-none">
        <Image
          src={data.background_image || "/images-temp/bg-stars.png"}
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

      {/* Контентная зона */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[40px] gap-[40px]">
        
        <RecommendRow1 data={data.recommendRow1} />
        
        {data.bestSellersBanner && (
          <BestSellersBanner
            title={data.bestSellersBanner.title}
            imageSrc={data.bestSellersBanner.imageSrc} 
            href={data.bestSellersBanner.url} 
          />
        )}
        
        <RecommendRow2 data={data.recommendRow2} />
        
        <CatalogSlider data={data.catalogSlider} />

        {data.salesBanner && (
          <SalesBanner
            title={data.salesBanner.title}
            imageSrc={data.salesBanner.imageSrc} 
            href={data.salesBanner.url} 
          />
        )}
        
        <RecommendRow3 data={data.recommendRow3} />
        
        <div className="pb-[80px]" />
      </div>
    </div>
  );
}