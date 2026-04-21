"use client";

import { useState } from "react";

import CheckboxIcon from "@/assets/icons/check_box_empty.svg?react";
import CheckboxCheckedIcon from "@/assets/icons/check_box.svg?react";

type CheckboxProps = {
  label: string;
  name: string;
  error?: string;
  labelClassName?: string;
};

export function Checkbox({
  label,
  name,
  error,
  labelClassName = "text-[11px] leading-none",
}: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const Icon = checked ? CheckboxCheckedIcon : CheckboxIcon;

  return (
    <div>
      <label className="flex items-center justify-center gap-[13px] cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="hidden"
        />

        <div className="size-[18px] flex items-center justify-center shrink-0">
          <Icon width={18} height={18} />
        </div>

        <span className={labelClassName}>{label}</span>
      </label>

      {error && <p className="text-center error-text">{error}</p>}
    </div>
  );
}