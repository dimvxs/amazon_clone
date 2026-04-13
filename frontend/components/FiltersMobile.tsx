"use client";

import { useState } from "react";
import Image from "next/image";
import filters from "@/assets/icons/filters.svg";

import FilterCategoryItem from "./FilterCategoryItem";
import DropdownArrow from "./DropdownArrow";

type Category =
  | {
      type: "list";
      name: string;
      options: string[];
    }
  | {
      type: "price";
      name: string;
    }
  | {
      type: "rating";
      name: string;
    };
export default function FiltersMobile() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories: Category[] = [
    {
      type: "list",
      name: "Departments",
      options: ["Electronics", "Fashion", "Home", "Beauty"],
    },
    {
      type: "rating",
      name: "Customer Reviews",
    },
    {
      type: "list",
      name: "Featured Brands",
      options: ["Nike", "Apple", "Samsung", "Adidas"],
    },
    {
      type: "price",
      name: "Price",
    },
    {
      type: "list",
      name: "Condition",
      options: ["New", "Used", "Refurbished"],
    },
  ];
  return (
    <div className="gap-[18px] relative z-50 layout-product-px layout-catalog-lg:hidden flex">
      <div className="relative inline-block bg-gray-600 rounded-[20px] px-[12px] w-[220px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex justify-between items-center w-full h-[34px] gap-5"
        >
          <div className="flex items-center gap-[6px]">
            <Image src={filters} alt="filters" width={19} height={16.5} />
            <span className="font-medium text-[14px] leading-[16px] text-main">
              Filters
            </span>
          </div>

          <DropdownArrow isOpen={open} className="text-main" />
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
              {categories.map((cat, index) => (
                <FilterCategoryItem
                  key={cat.name}
                  name={cat.name}
                  type={cat.type}
                  options={cat.type === "list" ? cat.options : undefined}
                  isOpen={activeCategory === cat.name}
                  isLast={index === categories.length - 1}
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
