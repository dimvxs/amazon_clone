"use client";

import Link from "next/link";

interface HeaderActionItemProps {
  label: string;
  hideOnMobile?: boolean;
  className?: string;
  onClick?: () => void;
  fixedWidth?: boolean;
  href?: string;
}

export default function HeaderActionItem({
  label,
  hideOnMobile = false,
  className = "",
  onClick,
  fixedWidth = false,
  href,
}: HeaderActionItemProps) {

  const content = (
    <div
      onClick={onClick}
      className={`
        flex items-center text-surface-3 cursor-pointer font-[700] text-[13px] leading-[18px]
        ${hideOnMobile ? "hidden layout-xs:flex" : "flex"}
        ${fixedWidth ? "w-auto layout-xs:w-[92px]" : ""}
      `}
    >
      <div className="w-6 h-6 rounded-full bg-surface-3 flex-shrink-0" />

      <span
        className={`
          ml-2
          hidden layout-xs:inline
          ${className}
        `}
      >
        {label}
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}