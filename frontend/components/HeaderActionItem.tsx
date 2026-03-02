"use client";

interface HeaderActionItemProps {
  label: string;
  hideOnMobile?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function HeaderActionItem({
  label,
  hideOnMobile = false,
  className = "",
  onClick,
}: HeaderActionItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center text-surface-3 cursor-pointer font-[700] text-[13px] leading-[18px]
        ${hideOnMobile ? "hidden layout-xs:flex" : "flex"}
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
}