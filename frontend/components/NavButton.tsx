import ArrowIcon from "@/assets/icons/page-nav.svg?react";

export default function NavButton({
  direction,
  children,
  onClick,
}: {
  direction: "prev" | "next";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      onClick={onClick}
      className="w-[95px] px-[10px] flex items-center justify-center gap-[6px] cursor-pointer"
    >
      <span
        className={`
          flex items-center gap-[6px]
          ${isPrev ? "text-accent-muted" : "text-dark"}
        `}
      >
        {isPrev && <ArrowIcon className="size-[12px] text-current" />}
        {children}
        {!isPrev && (
          <ArrowIcon className="size-[12px] rotate-180 text-current" />
        )}
      </span>
    </button>
  );
}
