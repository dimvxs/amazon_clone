"use client";

import CheckoutCard from "@/components/CheckoutCard";

type CheckoutCardListProps<T> = {
  items: T[];
  renderItem: (item: T) => string[];
  onEdit: (index: number) => void;
  onAdd: () => void;
  addLabel: string;
};

export default function CheckoutCardList<T>({
  items,
  renderItem,
  onEdit,
  onAdd,
  addLabel,
}: CheckoutCardListProps<T>) {
  if (!items.length) return null;

  return (
    <>
      <div className="flex flex-col gap-[15px]">
        {items.map((item, index) => (
          <CheckoutCard
            key={index}
            data={renderItem(item)}
            onEdit={() => onEdit(index)}
          />
        ))}
      </div>

      <button
        onClick={onAdd}
        className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
        font-semibold text-[20px] leading-[100%] text-center cursor-pointer"
      >
        {addLabel}
      </button>
    </>
  );
}