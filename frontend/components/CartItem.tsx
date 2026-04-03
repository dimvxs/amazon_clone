import CartQuantityControl from "./CartQuantityControl";
import Image from "next/image";
import placeholder from "@/assets/icons/delete.svg";

type CartItemProps = {
  title: string;
  price: number;
  quantity: number;
  inStock?: boolean;
  image?: string; // optional if you add real images later
};

export default function CartItem({
  title,
  price,
  quantity,
  inStock = true,
  image,
}: CartItemProps) {
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-[12px]">
      <div className="size-[28px] rounded-full bg-gray-200 flex items-center justify-center shrink-0" />

      <div className="p-[10px] rounded-[10px] bg-white w-full flex gap-[12px]">
        <div className="size-[60px] sm:size-[135px] rounded-[10px] bg-gray-200 shrink-0" />

        <div className="flex flex-col gap-[8px] w-full">
          <div className="flex justify-between items-start gap-[12px]">
            <span className="max-w-[90%]">
              {title}
            </span>
            <Image
              src={placeholder}
              alt="delete"
              className="shrink-0 cursor-pointer"
            />
          </div>

          <span className="sm:block hidden">{inStock ? "In Stock" : "Out of Stock"}</span>
          <hr />

          <div className="flex sm:flex-row flex-col justify-between items-start w-full">
            <div className=" shrink flex bg-red-200 w-full items-center justify-between">
              <CartQuantityControl /> <span>{totalPrice.toLocaleString()}$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
