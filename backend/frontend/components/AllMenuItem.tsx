"use client";

interface AllMenuItemProps {
  label?: string;
  mobile?: boolean;
  desktop?: boolean;
  onClick?: () => void;
}

export default function AllMenuItem({
  label = "All",
  mobile = false,
  desktop = false,
  onClick,
}: AllMenuItemProps) {
  const visibilityClass = mobile
    ? "flex layout-sm:hidden"
    : desktop
    ? "hidden layout-sm:flex"
    : "flex";

  return (
     <div
      onClick={onClick}
      className={`${visibilityClass} items-center gap-[5px] cursor-pointer font-sans font-bold text-[13px] leading-[12px] `}
    >
      <div className="w-[16px] h-[14px] bg-icon-surface-light flex-shrink-0" />
      <span className="translate-y-px text-surface-light">{label}</span>
    </div>
  );
}