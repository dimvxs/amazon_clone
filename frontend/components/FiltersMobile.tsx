"use client";

import { useState } from "react";
import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-back.svg";
import FilterCategoryItem from "./FilterCategoryItem";

type Category = {
  name: string;
  children: string[];
};

export default function FiltersMobile() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: "Departments",
      children: ["Electronics", "Fashion", "Home", "Beauty"],
    },
    {
      name: "Customer Reviews",
      children: ["5 stars", "4 stars & up", "3 stars & up"],
    },
    {
      name: "Featured Brands",
      children: ["Nike", "Apple", "Samsung", "Adidas"],
    },
    {
      name: "Price",
      children: ["Under $50", "$50 - $200", "$200+"],
    },
    {
      name: "Condition",
      children: ["New", "Used", "Refurbished"],
    },
  ];

  return (
    <div className="flex gap-[18px] relative z-50 text-black">
      <div className="relative inline-block bg-blue-200 rounded-[20px] px-[12px] w-[220px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex justify-between items-center w-full h-[34px] gap-5"
        >
          <span>Filters</span>
          <Image
            src={arrowDown}
            alt="Toggle dropdown"
            width={11}
            height={6}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`
            absolute left-0 top-full w-full
            bg-blue-200 z-10
            rounded-[13px]
            mt-[10px]
            transition-all duration-300
            grid overflow-hidden
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col p-[12px] gap-[14px]">
              {categories.map((cat) => (
                <FilterCategoryItem
                  key={cat.name}
                  name={cat.name}
                  children={cat.children}
                  isOpen={activeCategory === cat.name}
                  onToggle={() =>
                    setActiveCategory((prev) =>
                      prev === cat.name ? null : cat.name,
                    )
                  }
                  onSelectChild={(value) => console.log(value)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
