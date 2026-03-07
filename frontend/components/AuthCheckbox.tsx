"use client";

import { useState } from "react";
import Image from "next/image";

import checkboxCheckedIcon from "@/assets/icons/placeholder.svg";
import checkboxUncheckedIcon from "@/assets/icons/placeholder.svg";

type AuthCheckboxProps = {
  label: string;
};

export function AuthCheckbox({ label }: AuthCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className="flex items-center justify-center gap-[13px] text-surface-10 text-[11px] cursor-pointer"
      onClick={() => setChecked((v) => !v)}
    >
      <div className="w-[24px] h-[24px] flex items-center justify-center bg-surface-3 shrink-0">
        <Image
          alt=""
          src={checked ? checkboxCheckedIcon : checkboxUncheckedIcon}
          className="w-full h-full"
        />
      </div>

      <span>{label}</span>
    </label>
  );
}
