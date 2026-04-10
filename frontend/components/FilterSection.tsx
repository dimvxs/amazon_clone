"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-down.svg";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="flex flex-col gap-[24px] border-t pt-[14px]">
      <div className="flex flex-col gap-[16px]">

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <h3 className="font-medium text-[18px] leading-[16px]">
            {title}
          </h3>

          <Image
            src={arrowDown}
            alt="arrow down"
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          {children}
        </div>

      </div>
    </div>
  );
}