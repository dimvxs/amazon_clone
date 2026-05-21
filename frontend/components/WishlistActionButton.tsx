type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
};

export default function WishlistActionButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}: Props) {
  const baseStyles = `
    whitespace-nowrap text-[14px] leading-[20px] text-center align-middle
    h-[30px] px-[22.5px] rounded-[20px] cursor-pointer
  `;

  const variantStyles = {
    primary: "bg-surface-accent",
    secondary:
      "bg-transparent border border-accent-muted text-accent-muted",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}