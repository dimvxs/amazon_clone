import CloseIcon from "@/assets/icons/close_small.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";


type FilterChipProps = {
  label: string;
  onClick: () => void;
};

export default function FilterChip({ label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center
        px-3 py-1 rounded-full border text-sm
        bg-white text-black border-gray-300
        hover:border-black transition
        whitespace-nowrap
        gap-[4px]
      "
    >
      <CheckIcon className="w-[9px] h-[9px] flex-shrink-0" />

      <span className="whitespace-nowrap">{label}</span>

      <CloseIcon className="w-[6px] h-[6px] flex-shrink-0 ml-auto" />
    </button>
  );
}