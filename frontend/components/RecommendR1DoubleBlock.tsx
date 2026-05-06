import RecommendR1CardBlock from './RecommendR1CardBlock';
import RecommendR1CardTablet2 from './RecommendR1CardTablet2';

interface GridItem {
  title: string;
  imageSrc: string;
}

interface RecommendDoubleProps {
  topCardData: {
    mainTitle: string;
    items: GridItem[];
  };
  bottomCardData: {
    mainTitle: string;
    items: GridItem[];
  };
  className?: string;
}

export default function RecommendR1DoubleBlock({ 
  topCardData, 
  bottomCardData, 
  className = '' 
}: RecommendDoubleProps) {
  return (
    // В Figma указан gap: 14px или 16px между блоками в зависимости от фрейма. 
    // Используем flex-col для вертикального стека.
    <div className={`flex flex-col gap-[14px] w-full max-w-[344px] ${className}`}>
      
      {/* Верхняя карточка (Список) */}
      <RecommendR1CardTablet2 
        mainTitle={topCardData.mainTitle} 
        items={topCardData.items} 
      />

      {/* Нижняя карточка (Грид 2х2) */}
      <RecommendR1CardBlock 
        mainTitle={bottomCardData.mainTitle} 
        items={bottomCardData.items} 
      />
      
    </div>
  );
}