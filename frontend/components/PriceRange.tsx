"use client";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import PriceInput from "./PriceInput";

type PriceRangeProps = {
  min: number;
  max: number;
  onChange?: (value: [number, number]) => void;
};

export default function PriceRange({ min, max, onChange }: PriceRangeProps) {
  const [value, setValue] = useState<[number, number]>([min, max]);

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  return (
    <>
      <div className="flex gap-[10px] text-[14px]">
        <PriceInput
          value={value[0]}
          onChange={(e) =>
            handleChange([Number(e.target.value), value[1]])
          }
        />
        <span>-</span>
        <PriceInput
          value={value[1]}
          onChange={(e) =>
            handleChange([value[0], Number(e.target.value)])
          }
        />
        <input type="checkbox" />
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-[20px]"
        min={min}
        max={max}
        value={value}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-gray-500 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gray-700 rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-[27px] h-[27px] bg-white rounded-full" />
        <Slider.Thumb className="block w-[27px] h-[27px] bg-white rounded-full" />
      </Slider.Root>
    </>
  );
}