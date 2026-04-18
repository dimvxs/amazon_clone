import Image from "next/image";
import remove from "@/assets/icons/remove.svg";
import add from "@/assets/icons/add.svg";

function CartQuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  function ControlButton({
    icon,
    onClick,
    alt,
  }: {
    icon: any;
    onClick?: () => void;
    alt: string;
  }) {
    return (
      <button
        onClick={onClick}
        className="size-[22px] rounded-full bg-surface-accent flex items-center justify-center sm:size-[32px] cursor-pointer"
      >
        <Image
          src={icon}
          alt={alt}
          width={12}
          height={12}
          className="sm:w-[initial]"
        />
      </button>
    );
  }
  return (
    <div className="flex items-center sm:gap-[14px] gap-[8px]">
      <ControlButton icon={remove} onClick={onDecrease} alt="Decrease" />
      <span className="text-center text-[clamp(12px,2vw,20px)]">
        {quantity}
      </span>
      <ControlButton icon={add} onClick={onIncrease} alt="Increase" />
    </div>
  );
}

export default CartQuantityControl;
