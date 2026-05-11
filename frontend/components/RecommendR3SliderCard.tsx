"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

interface ProductItem {
  productName: string;
  price: string;
  imageSrc: string;
  href?: string;
}

interface ProductSliderCardProps {
  requestTitle: string;
  items: ProductItem[];
}

export default function RecommendR3SliderCard({ 
  requestTitle, 
  items 
}: ProductSliderCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Обработка случая, если массив пуст
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col bg-surface-11 rounded-[15px] border border-[#2F3A52] overflow-hidden shrink-0 shadow-lg w-full h-full min-h-[400px] items-center justify-center">
        <p className="text-white/50">No items available</p>
      </div>
    );
  }

  const currentProduct = items[currentIndex];

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Чтобы не срабатывал переход по ссылке, если кнопки внутри нее (хотя здесь они снаружи)
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col bg-surface-11 rounded-[15px] border border-[#2F3A52] overflow-hidden shrink-0 shadow-lg w-full h-full">
      
      {/* Заголовок группы */}
      <div className="px-[26px] pt-[24px] shrink-0">
        <h2 className="font-sans font-bold text-[20px] text-main-p-text leading-[27px] truncate">
          {requestTitle}
        </h2>
      </div>

      {/* Центральная часть со слайдером */}
      <div className="relative flex-grow flex items-center justify-center min-h-[200px] py-4">
        {/* Кнопка Назад */}
        <button 
          onClick={prevSlide}
          className="absolute left-[16px] z-10 w-[40px] h-[50px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center hover:bg-[#1A2030]/70 transition-colors group"
          aria-label="Previous slide"
        >
          <svg width="20" height="34" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4L6 22L22 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative w-[80%] aspect-[255/181]">
          <Image
            key={currentIndex} // Перерисовка при смене слайда
            src={currentProduct.imageSrc}
            alt={currentProduct.productName}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-contain transition-opacity duration-300"
            priority={currentIndex === 0}
          />
        </div>

        {/* Кнопка Вперед */}
        <button 
          onClick={nextSlide}
          className="absolute right-[16px] z-10 w-[40px] h-[50px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center hover:bg-[#1A2030]/70 transition-colors group"
          aria-label="Next slide"
        >
          <svg width="20" height="34" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L20 22L4 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Футер карточки (ссылка на товар) */}
      <Link 
        href={currentProduct.href || '#'} 
        className="h-[112px] bg-[#1F2636] px-[26px] flex flex-col justify-center hover:bg-[#2A3347] transition-colors shrink-0"
      >
        <div className="text-white font-sans font-bold text-[18px] leading-[27px] mb-0.5 truncate">
          {currentProduct.productName}
        </div>
        
        <div className="text-white flex items-start">
          <span className="text-[20px] font-bold mt-1.5 mr-0.5">$</span>
          <span className="text-[36px] font-bold leading-none">{currentProduct.price}</span>
        </div>
      </Link>
      
    </div>
  );
}