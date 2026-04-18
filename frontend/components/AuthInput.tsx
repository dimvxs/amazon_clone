"use client";
import { useState } from "react";

import VisibilityIcon from "@/assets/icons/visibility.svg?react";
import VisibilityOffIcon from "@/assets/icons/visibility_off.svg?react";

type AuthInputProps = {
  placeholder?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  error?: string;
};
export function AuthInput({
  placeholder,
  autoComplete,
  error,
  type = "text",
  name,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div
        className={`relative text-surface-10 flex bg-input-surface-default rounded-[10px] overflow-hidden 
          ${error ? "border border-error" : "border border-transparent"}`}
      >
        <input
          name={name}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full h-[40px] bg-input-surface-default p-[15px] 
          font-normal text-[13px] placeholder:text-surface-10 focus:outline-none `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={`bg-input-surface-default h-[40px] cursor-pointer flex items-start pr-[15px] ${
              showPassword ? "pt-[11px]" : "pt-[9px]"
            }`}
          >
            <div>
              {showPassword ? (
                <VisibilityIcon className="w-[22px] h-[17px]" />
              ) : (
                <VisibilityOffIcon className="w-[22px] h-[24px]" />
              )}
            </div>
          </button>
        )}
      </div>
      {error && (
        <p className="mt-[10px] text-right text-error text-[13px] leading-[13px] ">
          {error}
        </p>
      )}
    </div>
  );
}
