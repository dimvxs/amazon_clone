import CartQuantityControl from "./CartQuantityControl";
import Image from "next/image";
import placeholder from "@/assets/icons/delete.svg";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  inStock?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartItem({
  title,
  price,
  quantity,
  image,
  inStock = true,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-[12px]">
      <div className="size-[28px] rounded-full bg-gray-200 flex items-center justify-center shrink-0" />
      <div className="p-[10px] rounded-[10px] bg-gray-300 w-full flex gap-[12px]">
        <div className="relative size-[60px] sm:size-[135px] rounded-[10px] overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 60px, 135px"
            className="object-cover"
          />
        </div>

        <div
          className="flex flex-col layout-account-sm:min-h-[138px] justify-between w-full
        gap-[12.5px] layout-account-sm:gap-[8px] "
        >
          <div>
            <div className="flex justify-between items-start gap-[6px]">
              <span className="max-w-[80%] text-[clamp(12px,2.5vw,24px)] leading-[1.3] font-normal align-middle">
                {title}
              </span>

              <Image
                src={placeholder}
                alt="delete"
                className="w-[20px] h-[23px] shrink-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[12.5px] ">
            <div className="flex sm:flex-row flex-col justify-between items-start w-full">
              <div className="shrink flex w-full items-center justify-between gap-2 border-t pt-[5px]">
                <CartQuantityControl
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
                <div className="flex flex-col items-end ">
                  <span className="flex gap-1">
                    <span className="text-[clamp(16px,2.5vw,24px)] leading-[100%] font-normal align-middle">
                      -16%
                    </span>
                    <span className="text-[clamp(16px,2.5vw,24px)] leading-[100%] font-normal align-middle">
                      {totalPrice}$
                    </span>
                  </span>
                  <span className="text-right whitespace-nowrap hidden sm:block">
                    List Price: $1,899.30$
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
