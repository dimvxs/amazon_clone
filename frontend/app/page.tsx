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
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Error loading page data.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-[40px] pt-[60px]">
      
      <RecommendRow1 data={data.recommendedRow1} />
      
      {/* Хардкодим данные баннера бакалеи, так как бэк их не пришлет */}
      <BestSellersBanner
        title="Best Sellers in Grocery & Gourmet Food"
        imageSrc="/images/homepage/best_sellers.jpg" 
        href="/catalog?department=grocery" 
      />
      
      <RecommendRow2 data={data.recommendedRow2} />
      
      <CatalogSlider data={data.catalogSlider} />

      {/* Хардкодим сезонный баннер распродажи */}
      <SalesBanner
        title="Big Seasonal Sale"
        imageSrc="/images/homepage/sales.jpg" 
        href="/catalog?sale=true" 
      />
      
      <RecommendRow3 data={data.recommendedRow3} />
      
      <div className="pb-[80px]" />
    </div>
  );
}