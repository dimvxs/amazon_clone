"use client";

import { useEffect, useState } from "react";
import RecommendR1CardBlock from "./RecommendR1CardBlock";
import RecommendR1CardTablet1 from "./RecommendR1CardTablet1";
import RecommendR1DoubleBlock from "./RecommendR1DoubleBlock";

export default function RecommendRow1() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    async function loadData() {
      try {
        const response = await fetch('~/api/homepage/row1');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch row1 data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Если данные еще грузятся, можно вернуть пустой контейнер или скелетон
  if (isLoading || data.length === 0) {
    return <div className="w-full h-[300px] flex items-center justify-center text-white">Loading recommendations...</div>;
  }

  return (
    <section className="w-full px-4 md:px-0">
      <div className="max-w-[1528px] mx-auto">
        
        {/* ВЕРСИЯ ДЛЯ MOBILE И DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden lg:grid lg:grid-cols-4 gap-[12px]">
          {data.map((card, idx) => (
            <RecommendR1CardBlock 
              key={idx} 
              mainTitle={card.title} 
              items={card.items} 
            />
          ))}
        </div>

        {/* ВЕРСИЯ ДЛЯ ПЛАНШЕТА (MD) */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-[14px]">
          {/* Используем данные из загруженного массива */}
          <RecommendR1CardTablet1 
            mainTitle={data[0]?.title} 
            items={data[0]?.items} 
          />

          <RecommendR1DoubleBlock 
            topCardData={{
              mainTitle: data[1]?.title,
              items: data[1]?.items
            }} 
            bottomCardData={{
              mainTitle: data[2]?.title,
              items: data[2]?.items
            }} 
          />

          <RecommendR1CardTablet1 
            mainTitle={data[3]?.title} 
            items={data[3]?.items} 
          />
        </div>

      </div>
    </section>
  );
}