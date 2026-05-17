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
    <div className={`flex flex-col gap-[14px] w-full max-w-[344px] ${className}`}>
      
      {/* Верхняя карточка (Компактный список) */}
      <RecommendR1CardTablet2 
        mainTitle={topCardData.mainTitle} 
        items={topCardData.items} 
      />

      {/* Нижняя карточка (Плитка 2х2) */}
      <RecommendR1CardBlock 
        mainTitle={bottomCardData.mainTitle} 
        items={bottomCardData.items} 
      />
      
    </div>
  );
}