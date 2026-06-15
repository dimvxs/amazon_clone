import promises from "fs/promises";
import path from "path";

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
      console.log("Успешно загрузили данные главной страницы с бэкенда!");
      return await res.json();
    }
    
    throw new Error(`Server responded with status: ${res.status}`);
    
  } catch (error) {
    console.warn(
      `Бэкенд (${API_URL}) недоступен или выдал ошибку. Переключаюсь на локальный homepage.json...`
    );
    
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        "homepage.json",
      );
      const jsonData = await promises.readFile(filePath, "utf-8");
      
      console.log("Успешно загружены резервные данные из public/data/homepage.json");
      return JSON.parse(jsonData);
      
    } catch (fileError) {
      console.error("Критическая ошибка: Не удалось прочитать даже локальный JSON-файл:", fileError);
      return null;
    }
  }
}

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-[100px] text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">������ �������� ������</h1>
        <p className="text-gray-600 max-w-[500px]">
          �� ������� ������������ � �������, � ��������� ���� ������ ����������� ��� ���������.
        </p>
      </div>
    );
  }

  return (
    /* �����������: px-0 ��� ������� (������� ������������ ��������), sm:px-4 ��� ��������� � ��������� */
    /* ������ �� ������� �� ������� �� ������� �������� �����������, � �� ������� ������� �������� ����� */
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
        title="Big Seasonal Sale"
        imageSrc="/images/homepage/sales.jpg"
        href="/catalog?sale=true"
      />

      <RecommendRow3 data={data.recommendedRow3 || []} />

      <div className="pb-[80px]" />
    </div>
  );
}