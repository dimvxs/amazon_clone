"use client";

import arrowDown from "@/assets/icons/arrow-back.svg";
import Image from "next/image";
import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";

type Props = {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelectChild?: (value: string) => void;
  type: "list" | "price" | "rating";
  options?: string[];
};

export default function FilterCategoryItem({
  name,
  type,
  isOpen,
  options,
  onToggle,
  onSelectChild,
}: Props) {
  return (
    <li className="text-[14px] bg-red-200 border-b pb-[16px]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center"
      >
        <span className="font-medium text-[18px] leading-[16px] align-middle">
          {name}
        </span>

        <Image
          src={arrowDown}
          alt="toggle"
          width={12}
          height={12}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
  className={`overflow-hidden transition-all duration-300 ${
    isOpen ? "max-h-[500px] mt-[16px]" : "max-h-0"
  }`}
>
  <div className="flex flex-col gap-2 text-[13px] pb-1">
    {type === "price" && <PriceRange />}

    {type === "rating" && <StarsRating size={13} />}

    {type === "list" && (
      <ul className="flex flex-col gap-2">
        {options?.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              className="text-left w-full"
              onClick={() => onSelectChild?.(opt)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
    </li>
  );
}
