interface StepHeaderProps {
  step?: number;
  title?: string;
  onChange?: () => void;
  changeLabel?: string;
}

export default function StepHeader({
  step = 1,
  title = "Select delivery address",
  onChange,
  changeLabel,
}: StepHeaderProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-3 w-full text-left cursor-pointer"
    >
      <div className="size-[48px] rounded-full shrink-0 flex items-center justify-center border-accent text-accent border font-semibold text-[24px] leading-[28px] text-center">
        {step}
      </div>

      <span className="font-semibold text-[24px] leading-[28px]">
        {title}
      </span>

      {changeLabel && (
        <span className="ml-auto font-semibold text-[20px] leading-[28px] underline">
          {changeLabel}
        </span>
      )}
    </button>
  );
}