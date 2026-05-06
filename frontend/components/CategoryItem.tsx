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
      className="cursor-pointer flex items-center sm:h-fit h-[50px]
      gap-[16px] text-black px-[12px] sm:py-[9px] sm:px-[30px] "
    >
      <CategoryIcon className="w-[32px] h-[32px] shrink-0 text-black sm:block hidden" />
      <span className="text-category-md">
        {label}
      </span>
    </li>
  );
}
