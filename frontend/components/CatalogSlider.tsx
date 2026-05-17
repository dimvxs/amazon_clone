'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CatalogSliderCard from "./CatalogSliderCard";

interface CatalogItemJSON {
  title: string;
  imageSrc: string;
  price: string;
  url: string;
}

interface CatalogSliderProps {
  data: CatalogItemJSON[];
}

export default function CatalogSlider({ data }: CatalogSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Безопасная проверка: если в массиве пусто, не рендерим пустой слайдер
  if (!data || data.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector('.catalog-card') as HTMLElement;
      
      if (card) {
        const scrollAmount = card.offsetWidth + 31;
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="w-full max-w-[1528px] mx-auto px-4 md:px-0">

      <h2 className="text-[#E6ECF5] font-bold text-[20px] mb-4 md:hidden">
        Catalog slider
      </h2>

      <div className="relative flex items-center group">
        
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-12 z-20 p-2 text-[#E6ECF5] transition-all hover:scale-110 active:scale-95 disabled:opacity-20"
          aria-label="Scroll left"
        >
          <ChevronLeft size={44} strokeWidth={2}/>
        </button>

        <div 
          ref={scrollRef}
          className="
            grid grid-cols-2 gap-[8px] 
            md:flex md:flex-row md:overflow-x-auto md:gap-[31px] md:py-4 md:scrollbar-hide
            md:snap-x md:snap-mandatory md:scroll-smooth w-full
            scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {data.map((item, idx) => (
            <div 
              key={idx} 
              className="
                catalog-card shrink-0
                w-full
                md:snap-start md:w-[calc((100%-124px)/5)]
              "
            >
              <CatalogSliderCard 
                title={item.title}
                price={item.price}
                imageSrc={item.imageSrc} 
                href={item.url} // <--- Передаем url из JSON в проп href карточки
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-12 z-20 p-2 text-[#E6ECF5] transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={44} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}