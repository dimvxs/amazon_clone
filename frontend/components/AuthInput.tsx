'use client'
import { useState } from "react";
import hidePasswordIcon from "@/assets/icons/visibility_off.svg";
import Image from "next/image";

type AuthInputProps = {
  placeholder?: string;
  type?: string;
  name?: string;
};

export function AuthInput({
  placeholder,
  type = "text",
  name,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative text-surface-10">
      <input
        name={name}
        type={inputType}
        placeholder={placeholder}
        className={`w-full h-[40px] bg-surface-1 p-[15px] rounded-[10px]
          font-normal text-[13px] placeholder:text-surface-10 
          focus:outline-none ${
          type === "password" ? "pr-[45px]" : ""
        }`}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-[15px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] cursor-pointer"
        >
          <Image alt="" src={hidePasswordIcon} className="w-full h-full" />
        </button>
      )}
    </div>
  );
}