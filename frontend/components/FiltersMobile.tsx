"use client";

import { useState } from "react";
import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-back.svg";

export default function FiltersMobile() {
  const [open, setOpen] = useState(false);
  const categories: string[] = [
    "Electronic Devices",
    "Mobile Phones",
    "Laptops & Notebooks",
    "Tablets & eReaders",
    "Smart Watches & Wearables",
    "Headphones & Earbuds",
    "Speakers & Audio Systems",
    "Gaming Consoles",
    "PC Components",
    "Computer Accessories",
    "Cameras & Photography",
    "Smart Home Devices",
    "Storage Devices",
    "Networking Equipment",
  ];

  return (
    <div className="flex gap-[18px] relative z-50 text-black">
      <div className="relative inline-block bg-blue-200 rounded-[20px] px-[12px]">
        {/* ghost element */}
        <div className="invisible h-0 overflow-visible">
          <ul className="flex flex-col gap-[20px] pt-[20px] pb-[16px] whitespace-nowrap pl-[12px] pr-[25px]">
            {categories.map((item, index) => (
              <li key={index} className="text-[14px] leading-[16px]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex justify-between items-center w-full h-[34px] gap-5"
        >
          <span>Department</span>
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
            rounded-b-[13px]
            transform -translate-y-[16px]
            transition-all duration-300
            grid
            overflow-hidden
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-[20px] pt-[20px] pb-[16px] whitespace-nowrap  pl-[12px] pr-[25px]">
              {categories.map((item, index) => (
                <li key={index} className="text-[14px] leading-[16px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}