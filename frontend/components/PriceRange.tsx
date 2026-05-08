"use client";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import PriceInput from "./PriceInput";
import LineIcon from "@/assets/icons/line.svg?react";

type PriceRangeProps = {
  min: number;
  max: number;
  dark?: boolean;
  onChange?: (value: [number, number]) => void;
};

export default function PriceRange({
  min,
  max,
  onChange,
  dark,
}: PriceRangeProps) {
  const [value, setValue] = useState<[number, number]>([min, max]);

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const theme = {
    input: dark ? "bg-card-dark text-main" : "bg-main text-card-dark",
    thumb: dark ? "bg-surface-accent" : "bg-main",
    track: dark ? "bg-card-dark" : "bg-main",
    line: dark ? "text-card-dark" : "text-main",
  };

  return (
    <>
      <div
        className={`flex gap-[10px] text-[14px] ${
          dark ? "justify-center" : ""
        }`}
      >
        <PriceInput
          value={value[0]}
          onChange={(e) => handleChange([Number(e.target.value), value[1]])}
          className={theme.input}
        />
        <LineIcon className={`w-[12px] h-[12px] self-center ${theme.line}`} />
        <PriceInput
          value={value[1]}
          onChange={(e) => handleChange([value[0], Number(e.target.value)])}
          className={theme.input}
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
        <Slider.Track
          className={`${theme.track} relative grow rounded-full h-[3px]`}
        >
          <Slider.Range
            className={`${theme.track} absolute rounded-full h-full`}
          />
        </Slider.Track>
        <Slider.Thumb
          className={`block w-[27px] h-[27px] rounded-full ${theme.thumb}`}
        />
        <Slider.Thumb
          className={`block w-[27px] h-[27px] rounded-full ${theme.thumb}`}
        />
      </Slider.Root>
    </>
  );
}
