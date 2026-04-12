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
    <li className="text-[14px] border-b pb-[16px] text-black">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <span className="font-medium text-[18px] leading-[16px] align-middle">
          {name}
        </span>

        <Image
          src={arrowDown}
          alt="toggle"
          width={11}
          height={6}
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
        <div
          className={`flex flex-col gap-2 text-[13px] pb-1 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
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
