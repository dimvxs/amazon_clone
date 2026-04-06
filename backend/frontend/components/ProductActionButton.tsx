"use client";

interface ProductActionButtonProps {
  children: string;
  onClick?: () => void;
}

export default function ProductActionButton({
  children,
  onClick,
}: ProductActionButtonProps) {
  return (
    <button
      className="w-full h-[32px] font-inter font-normal text-[14px] leading-[19px] text-center align-middle bg-button-muted rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
}