import CartQuantityControl from "./CartQuantityControl";
import Image from "next/image";
import placeholder from "@/assets/icons/delete.svg";
import CheckCircle from "./CheckCircle";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  inStock?: boolean;
  checked?: boolean;
  onToggleCheck: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartItem({
  title,
  price,
  quantity,
  image,
  checked,
  inStock = true,
  onToggleCheck,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-[12px]">
      <CheckCircle checked={checked} onClick={onToggleCheck} />
      <div
        className="sm:px-[20px] sm:py-[17px] p-[10px] gap-[12px] 
      w-full flex 
      card-default !rounded-[10px]"
      >
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

          <div className="flex flex-col gap-[12.5px]">
            <div className="flex sm:flex-row flex-col justify-between items-start w-full">
              <div className="shrink flex w-full items-center justify-between gap-2 border-t border-card-border pt-[5px]">
                <CartQuantityControl
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
                <div className="flex flex-col items-end ">
                  <span className="flex gap-1">
                    <span className="cart-price-text text-text-accent-muted">
                      -16%
                    </span>
                    <span className="cart-price-text">
                      {totalPrice}$
                    </span>
                  </span>
                  <span className="text-right whitespace-nowrap hidden sm:block text-[12px] leading-[16px] text-non-active">
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
