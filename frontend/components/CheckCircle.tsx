function CheckCircle({
  checked,
  onClick,
  disabled,
}: {
  checked?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        size-[28px] rounded-full flex items-center justify-center shrink-0 transition
        ${
          disabled
            ? "bg-non-active cursor-not-allowed opacity-50"
            : "bg-main cursor-pointer"
        }
      `}
    >
      {checked && (
        <div className="size-[20px] rounded-full bg-surface-accent" />
      )}
    </div>
  );
}

export default CheckCircle;