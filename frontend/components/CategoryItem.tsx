import CategoryIcon from "@/assets/icons/charger.svg?react";

type CategoryItemProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function CategoryItem({
  label,
  isActive = false,
  onClick,
}: CategoryItemProps) {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer flex items-center gap-[16px] text-black py-[11.5px] items-center px-[30px]"
    >
      <CategoryIcon className="w-[32px] h-[32px] shrink-0 text-black" />
      <span className="font-[Inter] font-bold text-[20px] leading-[27px]">
        {label}
      </span>
    </li>
  );
}
