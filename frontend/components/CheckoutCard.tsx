"use client";

interface CheckoutCardProps {
  data: string[];
  onEdit?: () => void;
}

export default function CheckoutCard({ data, onEdit }: CheckoutCardProps) {
  return (
    <div className="bg-non-active rounded-[20px] max-w-[650px] px-[20px] py-[33px] flex items-center gap-[10px]">
      <span className="size-[21px] rounded-full bg-gray-200 shrink-0" />

      <span className="flex flex-col text-accent-muted">
        {data.map((text, index) => (
          <span
            key={index}
            className={
              index === 0
                ? "text-[20px] leading-[28px] mb-[5px] font-semibold"
                : "text-[16px] font-normal leading-[18px]"
            }
          >
            {text}
          </span>
        ))}
      </span>

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="ml-auto flex items-center gap-[10px] font-[Inter] font-semibold text-[16px] leading-[32px] text-accent"
        >
          <span>Icon</span>
          Edit
        </button>
      )}
    </div>
  );
}