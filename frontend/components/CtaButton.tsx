import React from "react";

type CtaButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function CtaButton({
  children,
  onClick,
  type = "button",
  className = "",
}: CtaButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-surface-accent
        h-[32px]
        rounded-[100px]
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}