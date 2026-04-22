export default function StepHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="size-[48px] rounded-full shrink-0 flex items-center justify-center border-accent text-accent border font-semibold text-[24px] leading-[28px] text-center">
        1
      </div>

      <span className="font-semibold text-[24px] leading-[28px]">
        Select delivery address
      </span>

      <span className="ml-auto font-semibold text-[20px] leading-[28px] text-right underline">
        Change
      </span>
    </div>
  );
}