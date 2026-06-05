"use client";

import RecommendR1CardBlock from "./RecommendR1CardBlock";
import RecommendR1CardTablet1 from "./RecommendR1CardTablet1";
import RecommendR1DoubleBlock from "./RecommendR1DoubleBlock";

// Обновленный интерфейс элемента под DTO бэкенда
interface Row1Item {
  id: number;          // Бэк теперь присылает id вместо url
  name: string;
  imageUrl: string;    // Переименовано из image в imageUrl
}

// Обновленный интерфейс блока под DTO бэкенда
interface Row1Block {
  title: string;
  items: Row1Item[];
}

interface RecommendRow1Props {
  data: Row1Block[];
}

export default function RecommendRow1({ data }: RecommendRow1Props) {
  if (!data || data.length === 0) {
    return null;
  }

  // Обновленный маппинг под новые ключи бэкенда
  const formatItems = (items: Row1Item[] = []) => {
    return items.map((item) => ({
      id: item.id,            // Передаем id дальше в дочерние карточки
      title: item.name,
      imageSrc: item.imageUrl, // Мапим imageUrl на внутренний imageSrc компонента карточки
    }));
  };

  return (
    <section className="w-full px-4 md:px-0">
      <div className="max-w-[1528px] mx-auto">
        
        {/* Mobile & Desktop Viewports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden lg:grid lg:grid-cols-4 gap-[12px]">
          {data.map((card, idx) => (
            <RecommendR1CardBlock 
              key={idx} 
              mainTitle={card.title} 
              items={formatItems(card.items)}
            />
          ))}
        </div>

        {/* Tablet Viewport (3-column layout layout-md/lg-hidden) */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-[14px]">
          <RecommendR1CardTablet1 
            mainTitle={data[0]?.title} 
            items={formatItems(data[0]?.items)}
          />

          <RecommendR1DoubleBlock 
            topCardData={{
              mainTitle: data[1]?.title,
              items: formatItems(data[1]?.items)
            }} 
            bottomCardData={{
              mainTitle: data[2]?.title,
              items: formatItems(data[2]?.items)
            }} 
          />

          <RecommendR1CardTablet1 
            mainTitle={data[3]?.title} 
            items={formatItems(data[3]?.items)}
          />
        </div>

      </div>
    </section>
  );
}