"use client";

import { useRef } from "react";
import CatalogSliderCard from "./CatalogSliderCard";
import Arrow from "@/assets/icons/arrow-back.svg?react";

interface CatalogItemJSON {
  id: number;
  title: string;
  price: number;
  rating?: number;
  imageUrl: string;
}

interface CatalogSliderProps {
  data: CatalogItemJSON[];
}
export default function CatalogSlider({ data }: CatalogSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector(".catalog-card") as HTMLElement;

      if (card) {
        const scrollAmount = card.offsetWidth + 31;

        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-[1528px] mx-auto px-4 md:px-0 overflow-x-hidden">
      <h2 className="text-[#E6ECF5] font-bold text-[20px] mb-4">
        Catalog slider
      </h2>
      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex shrink-0 text-[#E6ECF5] transition-all hover:scale-110 active:scale-95 disabled:opacity-20 cursor-pointer"
          aria-label="Scroll left"
        >
       <Arrow className="w-[26px] h-[44px] rotate-90" />

        </button>
        <div
          ref={scrollRef}
          className="
          grid grid-cols-2 gap-[8px]
          md:flex md:flex-row md:overflow-x-auto md:gap-[31px]
          md:py-4 md:scrollbar-hide
          md:snap-x md:snap-mandatory md:scroll-smooth
          w-full
          scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
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
                price={String(item.price)}
                imageSrc={item.imageUrl}
                href={`/product/${item.id}`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex shrink-0 p-0 leading-none text-[#E6ECF5] transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Scroll right"
        >
       <Arrow className="w-[26px] h-[44px] -rotate-90" />
        </button>
      </div>
    </div>
  );
}
