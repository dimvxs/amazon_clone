"use client";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import PriceInput from "./PriceInput";

export default function PriceRange() {
  const [value, setValue] = useState([50, 1000]);

  return (
    <>
      <div className="flex gap-[10px] text-[14px]">
        <PriceInput
          value={value[0]}
          onChange={(e) => setValue([Number(e.target.value), value[1]])}
        />
        <span>-</span>
        <PriceInput
          value={value[1]}
          onChange={(e) => setValue([value[0], Number(e.target.value)])}
        />
        <input type="checkbox"></input>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-[20px]"
        min={50}
        max={1000}
        step={10}
        value={value}
        onValueChange={setValue}
      >
        <Slider.Track className="bg-gray-500 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gray-700 rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-[27px] h-[27px] bg-white rounded-full focus:outline-none focus:border-transparent" />
        <Slider.Thumb className="block w-[27px] h-[27px] bg-white rounded-full focus:outline-none focus:border-transparent" />
      </Slider.Root>
    </>
  );
}
