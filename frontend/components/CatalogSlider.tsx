'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CatalogSliderCard from "./CatalogSliderCard";


export default function CatalogSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Расчет: ширина карточки (258) + отступ (в данном примере сделаем его адаптивным)
    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        // Ширина одной карточки + расстояние между ними
        // Чтобы скроллило ровно на одну карточку:
        const cardWidth = 258;
        const gap = 31; 
        const scrollAmount = cardWidth + gap;
  
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };
  return (
    <div className="relative flex items-center group">
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 z-10 p-2 text-[#E6ECF5] bg-[#1F2636] rounded-full border border-[#2F3A52] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={30} />
        </button>
    <div className="flex flex-row gap-[31px] overflow-x-auto no-scrollbar w-full max-w-[1528px] mx-auto py-2.5">
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
    </div>
    <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 z-10 p-2 text-[#E6ECF5] bg-[#1F2636] rounded-full border border-[#2F3A52] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={30} />
        </button>
    </div>
   
  );
}
