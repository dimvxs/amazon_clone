"use client";

import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";
import DropdownArrow from "./DropdownArrow";

type Props = {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelectChild?: (value: string) => void;
  type: "list" | "price" | "rating";
  options?: string[];
  isLast?: boolean;
};

export default function FilterCategoryItem({
  name,
  type,
  isOpen,
  options,
  isLast,
  onToggle,
  onSelectChild,
}: Props) {
  return (
    <li
      className={`
        text-[14px] text-black
        ${!isLast ? "border-b pb-[16px]" : ""}
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <span className="font-medium text-[18px] leading-tight text-left">
          {name}
        </span>
        <DropdownArrow isOpen={isOpen} className="text-black" />
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
          {type === "rating" && <StarsRating size={13} dark />}
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
