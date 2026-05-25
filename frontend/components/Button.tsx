import React from "react";

type ButtonVariant = "primary" | "ternary";
type ButtonHoverVariant = "primary" | "ternary" | "accent_muted";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  hoverVariant?: ButtonHoverVariant;
  px?: number;
  py?: number;
}

const baseStyles =
  "rounded-[20px] w-fit text-center align-middle text-[14px] leading-[20px] font-semibold transition-colors duration-200 cursor-pointer";

const variantBaseStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-surface-accent
    text-white
  `,
  ternary: `
    bg-transparent
    border border-main
  `,
};

const hoverVariantStyles: Record<ButtonHoverVariant, string> = {
  primary: `
    hover:bg-button-hover
  `,
  ternary: `
    hover:text-button-hover
    hover:border-button-hover
  `,
  accent_muted: `
    hover:bg-surface-accent-muted
    hover:text-button-hover
    hover:border-transparent
  `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  hoverVariant = variant,
  px = 24,
  py = 6,
  className = "",
  children,
  ...props
}) => {
  const padding = `px-[${px}px] py-[${py}px]`;

  return (
    <button
      className={`
        ${baseStyles}
        ${padding}
        ${variantBaseStyles[variant]}
        ${hoverVariantStyles[hoverVariant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
