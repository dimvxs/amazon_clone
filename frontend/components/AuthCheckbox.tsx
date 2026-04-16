"use client";

import { useState } from "react";
import Image from "next/image";

import checkboxCheckedIcon from "@/assets/icons/placeholder.svg";
import checkboxUncheckedIcon from "@/assets/icons/placeholder.svg";

type AuthCheckboxProps = {
  label: string;
  name: string;
};

export function AuthCheckbox({ label, name }: AuthCheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    console.log("Checkbox checked:", value);
  };

  return (
    <label className="flex items-center justify-center gap-[13px] text-surface-10 text-[11px] cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        className="hidden"
      />

      <div className="w-[24px] h-[24px] flex items-center justify-center bg-surface-3 shrink-0">
        <Image
          alt=""
          width={24}
          height={24}
          src={checked ? checkboxCheckedIcon : checkboxUncheckedIcon}
        />
      </div>

      <span>{label}</span>
    </label>
  );
}
