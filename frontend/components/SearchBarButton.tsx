"use client";

import Image from "next/image";

interface SearchBarButtonProps {
  icon: string;
  label?: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

export default function SearchBarButton({
  icon,
  label,
  className = "",
  hiddenOnMobile = false,
}: SearchBarButtonProps) {
  return (
    <button
      className={`w-[45px] h-full gap-1 flex items-center justify-center flex-shrink-0 cursor-pointer ${hiddenOnMobile ? "hidden layout-sm:flex" : ""} ${className}`}
    >
      <span className="text-[11px]">{label}</span>
      <Image src={icon} alt={label ?? "icon" } width={22} height={2} className="object-contain" />
    </button>
  );
}
