"use client";

import { useState, useRef, useEffect } from "react";
import arrowDown from "@/assets/icons/arrow-down-quantity.svg";
import Image from "next/image";

interface QuantitySelectorProps {
  maxCount?: number;
}

export default function QuantitySelector({
  maxCount = 5,
}: QuantitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEM_HEIGHT = 32;
  const MAX_VISIBLE_ITEMS = 5;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const numbers = Array.from({ length: maxCount }, (_, i) => i + 1);
  const dropdownMaxHeight = MAX_VISIBLE_ITEMS * ITEM_HEIGHT;

  return (
    <div className="w-full relative text-text-dark" ref={containerRef}>
      <div
        className="w-full flex items-center justify-between bg-white cursor-pointer py-[5px] px-[9px] rounded-lg border-interactive"
        style={{ height: ITEM_HEIGHT }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-[13px] font-inter font-normal leading-[20px]">
          Quantity: {selected}
        </span>
        <Image
          src={arrowDown}
          alt="arrow down"
          width={10}
          height={8}
          className="object-contain"
        />
      </div>

      {open && (
        <div
          className="absolute left-0 w-full bg-white border border-interactive z-10 overflow-y-auto"
          style={{ top: ITEM_HEIGHT, maxHeight: dropdownMaxHeight }}
        >
          {numbers.map((num) => (
            <div
              key={num}
              className="px-2 text-[13px] font-inter font-normal cursor-pointer hover:bg-gray-100"
              style={{ height: ITEM_HEIGHT, lineHeight: `${ITEM_HEIGHT}px` }}
              onClick={() => {
                setSelected(num);
                setOpen(false);
              }}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
