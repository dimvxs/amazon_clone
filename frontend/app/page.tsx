import promises from "fs/promises";
import path from "path";
import Link from "next/link"; 

import SalesBanner from "@/components/SalesBanner";
import RecommendRow1 from "@/components/RecommendRow1";
import RecommendRow2 from "@/components/RecommendRow2";
import RecommendRow3 from "@/components/RecommendRow3";
import BestSellersBanner from "@/components/BestSellersBanner";
import CatalogSlider from "@/components/CatalogSlider";

async function getHomepageData() {
  const API_URL = "http://localhost:5012/api/homepage";

  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (res.ok) {
      console.log("Данные главной страницы успешно загружены с API!");
      return await res.json();
    }
    throw new Error(`Бэкенд ответил со статусом: ${res.status}`);

  } catch (error) {
    console.warn(
      `Бэкенд (${API_URL}) недоступен. Переключаюсь на резервный public/data/homepage.json...`
    );

    try {
      const filePath = path.join(process.cwd(), "public", "data", "homepage.json");
      const jsonData = await promises.readFile(filePath, "utf-8");
      
      console.log("Данные успешно восстановлены из локального кэша JSON");
      return JSON.parse(jsonData);
      
    } catch (fileError) {
      console.error("Критическая ошибка: Резервный файл JSON тоже недоступен:", fileError);
      return null;
    }
  }
}

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-[100px] text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Ошибка загрузки данных</h1>
        <p className="text-gray-600 max-w-[500px]">
          Не удалось подключиться к бэкенду, а резервный файл данных отсутствует или поврежден.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-0 sm:px-4 flex flex-col items-center gap-[40px] pt-[60px] relative bg-top bg-no-repeat home-responsive-bg">
      <span className="is-homepage_desktop_bg_active hidden" />
      <div className="hidden layout-sm:block h-[140px] w-full shrink-0" />

      <RecommendRow1 data={data.recommendedRow1 || []} />

      <BestSellersBanner
        title="Best Sellers in Grocery & Gourmet Food"
        imageSrc="/images/homepage/best_sellers.jpg"
        href="/catalog?department=grocery"
      />

      <RecommendRow2 data={data.recommendedRow2 || []} />
      
      <CatalogSlider data={data.catalogSlider || []} />

      <SalesBanner
        title="Cosmic Sale"
        imageSrc="/images/homepage/cosmic_sales1.png" 
      >
        <div className="flex flex-col gap-[6px] sm:gap-[10px] items-start select-none">
          <h2 className="font-anta text-[clamp(28px,5vw,96px)] leading-[100%] text-white tracking-normal font-normal">
            Cosmic <span className="text-[#AFCBFF]">Sale</span>
          </h2>

          <div className="
            relative flex items-center justify-center
            rounded-[12px] sm:rounded-[20px] 
            py-[6px] sm:py-[10px] px-[16px] sm:px-[24px] 
            bg-[#090d1b]/60 backdrop-blur-md
            before:absolute before:inset-0 before:rounded-[12px] sm:before:rounded-[20px] before:p-[1.5px] sm:before:p-[2px]
            before:bg-gradient-to-r before:from-[#4D7EFF] before:to-[#AFCBFF]
            before:content-[''] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
            before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]
          ">
            <span className="font-sans italic font-semibold text-[clamp(12px,2.5vw,48px)] leading-[100%] text-[#e6ecf5]">
              Up to <span className="text-[#AFCBFF]">50%</span> off
            </span>
          </div>
        </div>

        <Link href="/catalog?sale=true" passHref legacyBehavior>
          <a className="
            bg-[#4D7EFF] hover:bg-[#3b66dd] text-white rounded-[100px] 
            w-[130px] sm:w-[180px] md:w-[263px] 
            h-[34px] sm:h-[48px] md:h-[68px]
            font-sans font-semibold 
            text-[clamp(12px,2vw,36px)] leading-[100%] 
            flex items-center justify-center text-center
            cursor-pointer transition-colors shadow-lg whitespace-nowrap
            no-underline
          ">
            Shop Now
          </a>
        </Link>
      </SalesBanner>

      <RecommendRow3 data={data.recommendedRow3 || []} />

      <div className="pb-[80px]" />
    </div>
  );
}